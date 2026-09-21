import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'
import type { Element, ElementContent, Root, RootContent } from 'hast'

const VIRTUAL_ID = 'virtual:content'
const RESOLVED_ID = '\0' + VIRTUAL_ID

const postsDir = '_posts'
const projectsDir = '_projects'

export interface Post {
  id: string
  title: string
  date?: string
  excerpt: string
  html: string
  [key: string]: unknown
}

export interface Project {
  id: string
  slug: string
  title: string
  summary: string
  image: string
  permalink?: string
  redirect?: boolean
  hide?: boolean
  html: string
  [key: string]: unknown
}

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractDateFromFilename(filename: string): string | null {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/)
  return match ? match[1] : null
}

function extractTitleFromFilename(filename: string): string {
  return filename
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

/**
 * These files came over from Jekyll and still carry Liquid tags. Nothing
 * renders them any more, so they would otherwise show up as literal text.
 */
function stripLiquid(markdown: string): string {
  return markdown.replace(/\{%-?\s*(end)?raw\s*-?%\}/g, '')
}

function isElement(node: RootContent | ElementContent | undefined, tagName: string): node is Element {
  return !!node && node.type === 'element' && node.tagName === tagName
}

function isBlankText(node: RootContent | ElementContent): boolean {
  return node.type === 'text' && node.value.trim() === ''
}

const MEDIA = ['img', 'iframe', 'video']

function isMedia(node: RootContent | ElementContent): boolean {
  return node.type === 'element' && MEDIA.includes(node.tagName)
}

/**
 * Markdown that puts an image on the line directly below its sentence, with no
 * blank line between, parses as one paragraph holding both. Split those so the
 * media becomes a block of its own and can be treated as a figure below.
 */
function rehypeSplitMedia() {
  return (tree: Root) => {
    const out: RootContent[] = []

    for (const node of tree.children) {
      if (!isElement(node, 'p') || !node.children.some(isMedia)) {
        out.push(node)
        continue
      }

      let run: ElementContent[] = []
      const flushText = () => {
        if (run.some((child) => !isBlankText(child))) {
          out.push({ type: 'element', tagName: 'p', properties: {}, children: run })
        }
        run = []
      }

      for (const child of node.children) {
        if (isMedia(child)) {
          flushText()
          out.push(child)
        } else {
          run.push(child)
        }
      }
      flushText()
    }

    tree.children = out
  }
}

/**
 * Markdown here writes captions as a blockquote directly after an image or
 * video embed. Fold those pairs into real <figure>/<figcaption> markup so the
 * caption can be styled as a caption rather than as a pull quote.
 */
function rehypeFigures() {
  return (tree: Root) => {
    const children = tree.children
    const out: RootContent[] = []
    let i = 0

    while (i < children.length) {
      const node = children[i]
      const media = mediaOf(node)

      if (!media) {
        out.push(node)
        i++
        continue
      }

      // Look past insignificant whitespace for a blockquote acting as a caption.
      let nextIndex = i + 1
      while (nextIndex < children.length && isBlankText(children[nextIndex])) nextIndex++

      const next = children[nextIndex]
      const caption = isElement(next, 'blockquote') ? next : undefined
      i = caption ? nextIndex + 1 : i + 1

      const isEmbed = media.tagName === 'iframe'
      const wrapped: Element = isEmbed
        ? { type: 'element', tagName: 'div', properties: { className: ['embed'] }, children: [media] }
        : media

      const figure: Element = {
        type: 'element',
        tagName: 'figure',
        properties: { className: [isEmbed ? 'figure-embed' : 'figure-image'] },
        children: [wrapped],
      }

      if (caption) {
        figure.children.push({
          type: 'element',
          tagName: 'figcaption',
          properties: {},
          children: unwrapParagraph(caption),
        })
      }

      out.push(figure)
    }

    tree.children = out
  }
}

/** An <img>/<iframe>/<video>, either bare or alone inside a paragraph. */
function mediaOf(node: RootContent): Element | undefined {
  if (node.type !== 'element') return undefined
  if (MEDIA.includes(node.tagName)) return node

  if (node.tagName === 'p') {
    const children = node.children.filter((child) => !isBlankText(child))
    const only = children[0]
    if (children.length === 1 && only?.type === 'element' && MEDIA.includes(only.tagName)) {
      return only
    }
  }
  return undefined
}

function unwrapParagraph(blockquote: Element): ElementContent[] {
  const children = blockquote.children.filter((child) => !isBlankText(child))
  const only = children[0]
  return children.length === 1 && isElement(only, 'p') ? only.children : children
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  // allowDangerousHtml + rehype-raw keep the hand-written <iframe> embeds that
  // most project pages rely on. Without them the videos silently disappear.
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSplitMedia)
  .use(rehypeFigures)
  .use(rehypeSlug)
  .use(rehypeKatex)
  .use(rehypeShiki, {
    themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
    defaultColor: false,
    fallbackLanguage: 'text',
  })
  .use(rehypeStringify, { allowDangerousHtml: true })

async function render(markdown: string): Promise<string> {
  const file = await processor.process(stripLiquid(markdown))
  return String(file)
}

function excerptOf(html: string): string {
  const withoutHeading = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '')
  const paragraph = withoutHeading.match(/<p[^>]*>[\s\S]*?<\/p>/i)
  if (paragraph) return paragraph[0]

  const text = withoutHeading.replace(/<[^>]*>/g, '').trim()
  return text.slice(0, 200) + (text.length > 200 ? '…' : '')
}

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x27;': "'",
  '&nbsp;': ' ',
}

/**
 * Plain-text opening paragraph, used as the card description on the projects
 * index. The markdown is the only place a project describes itself — there is
 * no description in the frontmatter.
 */
function summaryOf(html: string, limit = 180): string {
  const body = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '')
  const paragraph = body.match(/<p[^>]*>([\s\S]*?)<\/p>/i)

  const text = (paragraph ? paragraph[1] : body)
    // Inline tags are dropped outright; only line breaks become whitespace, so
    // stripping <strong> does not leave a gap before the next punctuation.
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity.toLowerCase()] ?? entity)
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= limit) return text
  return text.slice(0, limit).replace(/\s+\S*$/, '') + '…'
}

function readDir(root: string, dir: string): string[] {
  const full = path.join(root, dir)
  if (!fs.existsSync(full)) return []
  return fs.readdirSync(full).filter((name) => name.endsWith('.md'))
}

async function loadPosts(root: string): Promise<Post[]> {
  const posts = await Promise.all(
    readDir(root, postsDir).map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const parsed = matter(fs.readFileSync(path.join(root, postsDir, fileName), 'utf8'))
      const html = await render(parsed.content)

      return {
        ...parsed.data,
        id,
        html,
        excerpt: excerptOf(html),
        date: extractDateFromFilename(id) || parsed.data.date,
        title: parsed.data.title || extractTitleFromFilename(id),
      } as Post
    }),
  )

  return posts.sort((a, b) => (a.date && b.date ? (a.date < b.date ? 1 : -1) : 0))
}

async function loadProjects(root: string): Promise<Project[]> {
  return Promise.all(
    readDir(root, projectsDir).map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const parsed = matter(fs.readFileSync(path.join(root, projectsDir, fileName), 'utf8'))
      const title = parsed.data.title || id
      const html = await render(parsed.content)

      return {
        ...parsed.data,
        id,
        title,
        html,
        summary: summaryOf(html),
        slug: createSlug(title),
        image: parsed.data.image || '/img/placeholder.jpg',
      } as Project
    }),
  )
}

async function buildModule(root: string): Promise<string> {
  const [posts, projects, about] = await Promise.all([
    loadPosts(root),
    loadProjects(root),
    render(matter(fs.readFileSync(path.join(root, 'about.md'), 'utf8')).content),
  ])

  return [
    `export const posts = ${JSON.stringify(posts)}`,
    `export const projects = ${JSON.stringify(projects)}`,
    `export const about = ${JSON.stringify(about)}`,
  ].join('\n')
}

export default function content(): Plugin {
  let root = process.cwd()

  return {
    name: 'site-content',

    configResolved(config) {
      root = config.root
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },

    load(id) {
      if (id === RESOLVED_ID) return buildModule(root)
    },

    configureServer(server) {
      const watched = [path.join(root, postsDir), path.join(root, projectsDir), path.join(root, 'about.md')]
      server.watcher.add(watched)

      server.watcher.on('all', (_event, file) => {
        if (!file.endsWith('.md')) return

        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      })
    },
  }
}
