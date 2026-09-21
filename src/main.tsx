import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import 'katex/dist/katex.min.css'
import './styles/index.css'

export const createRoot = ViteReactSSG({ routes })
