/// <reference types="vite/client" />

declare module 'virtual:content' {
  export interface Post {
    id: string
    title: string
    date?: string
    excerpt: string
    html: string
    hide?: boolean
    permalink?: string
  }

  export interface Project {
    id: string
    slug: string
    title: string
    summary: string
    image: string
    html: string
    permalink?: string
    redirect?: boolean
    hide?: boolean
    mathjax?: boolean
  }

  export const posts: Post[]
  export const projects: Project[]
  export const about: string
}
