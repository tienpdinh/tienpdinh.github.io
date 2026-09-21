import type { RouteRecord } from 'vite-react-ssg'
import { posts, projects } from 'virtual:content'
import Layout from './Layout'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Work from './pages/Work'
import ProjectPage from './pages/Project'
import NotFound from './pages/NotFound'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/Layout.tsx',
    children: [
      { index: true, Component: Home },
      { path: 'work', Component: Work },
      { path: 'about', Component: About },
      { path: 'blog', Component: Blog },
      {
        path: 'posts/:id',
        Component: Post,
        getStaticPaths: () => posts.map((post) => `posts/${post.id}`),
      },
      {
        path: 'projects/:slug',
        Component: ProjectPage,
        getStaticPaths: () => projects.map((project) => `projects/${project.slug}`),
      },
      // Emitted as dist/404.html by scripts/postbuild.mjs for GitHub Pages.
      { path: '404', Component: NotFound },
      { path: '*', Component: NotFound },
    ],
  },
]
