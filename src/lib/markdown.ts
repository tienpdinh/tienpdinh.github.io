import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), '_posts')
const projectsDirectory = path.join(process.cwd(), '_projects')

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

function extractDateFromFilename(filename: string): string | null {
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/)
  return dateMatch ? dateMatch[1] : null
}

function extractTitleFromFilename(filename: string): string {
  // Remove date prefix and convert to title case
  const withoutDate = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '')
  return withoutDate
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

export interface Post {
  id: string
  title: string
  date?: string
  content: string
  [key: string]: any
}

export interface Project {
  id: string
  slug: string
  title: string
  image: string
  permalink: string
  redirect?: boolean
  hide?: boolean
  content: string
  [key: string]: any
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Extract date from filename (preferred) or fallback to frontmatter
  const date = extractDateFromFilename(id) || matterResult.data.date
  
  // Generate title from frontmatter or filename
  const title = matterResult.data.title || extractTitleFromFilename(id)

  return {
    id,
    content: contentHtml,
    date,
    title,
    ...matterResult.data,
  } as Post
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) return []
  
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        
        const processedContent = await remark()
          .use(html)
          .process(matterResult.content)
        const contentHtml = processedContent.toString()

        // Extract date from filename (preferred) or fallback to frontmatter
        const date = extractDateFromFilename(id) || matterResult.data.date
        
        // Generate title from frontmatter or filename
        const title = matterResult.data.title || extractTitleFromFilename(id)

        return {
          id,
          content: contentHtml,
          date,
          title,
          ...matterResult.data,
        } as Post
      })
  )

  return allPostsData.sort((a, b) => {
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1
    }
    return 0
  })
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  // Get all projects and find by slug
  const projects = await getAllProjects()
  const project = projects.find(p => p.slug === slug)
  
  if (!project) {
    throw new Error(`Project not found: ${slug}`)
  }
  
  return project
}

export async function getProjectData(id: string): Promise<Project> {
  // Try to find the file by matching against available files
  const fileNames = fs.readdirSync(projectsDirectory)
  
  // Decode the id, potentially multiple times if it's been double-encoded
  let decodedId = id
  try {
    while (decodedId !== decodeURIComponent(decodedId)) {
      decodedId = decodeURIComponent(decodedId)
    }
  } catch (e) {
    // If decoding fails, use the original
  }
  
  // Find exact match
  const fileName = fileNames.find(name => 
    name.replace('.md', '') === decodedId
  )
  
  if (!fileName) {
    console.error(`No matching file found for: ${id} (final decoded: ${decodedId})`)
    console.error(`Available files:`, fileNames)
    throw new Error(`Project file not found: ${id}`)
  }
  
  const fullPath = path.join(projectsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  const title = matterResult.data.title || fileName.replace('.md', '')
  const slug = createSlug(title)

  return {
    id,
    slug,
    content: contentHtml,
    image: matterResult.data.image || '/img/placeholder.jpg',
    title,
    ...matterResult.data,
  } as Project
}

export async function getAllProjects(): Promise<Project[]> {
  if (!fs.existsSync(projectsDirectory)) return []
  
  const fileNames = fs.readdirSync(projectsDirectory)
  const allProjectsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(projectsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        
        const processedContent = await remark()
          .use(html)
          .process(matterResult.content)
        const contentHtml = processedContent.toString()

        const title = matterResult.data.title || id
        const slug = createSlug(title)

        return {
          id: id,
          slug,
          content: contentHtml,
          image: matterResult.data.image || '/img/placeholder.jpg',
          title,
          ...matterResult.data,
        } as Project
      })
  )

  return allProjectsData
}

export async function getVisibleProjects(): Promise<Project[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(project => !project.hide)
}

export async function getMarkdownContent(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const matterResult = matter(fileContents)
  
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    content: contentHtml,
    ...matterResult.data,
  }
}

export function createPostPreview(content: string): string {
  // Remove the first H1 heading and get the first paragraph
  const withoutFirstH1 = content.replace(/<h1[^>]*>.*?<\/h1>/i, '')
  
  // Find the first paragraph
  const firstParagraphMatch = withoutFirstH1.match(/<p[^>]*>.*?<\/p>/i)
  
  if (firstParagraphMatch) {
    return firstParagraphMatch[0]
  }
  
  // Fallback: return first 200 characters without HTML tags
  const textOnly = withoutFirstH1.replace(/<[^>]*>/g, '').trim()
  return textOnly.substring(0, 200) + (textOnly.length > 200 ? '...' : '')
}