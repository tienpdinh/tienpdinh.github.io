import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')

// GitHub Pages serves /404.html for unmatched paths; the SSG writes the route
// out as /404/index.html.
const source = path.join(dist, '404', 'index.html')
if (fs.existsSync(source)) {
  fs.copyFileSync(source, path.join(dist, '404.html'))
  console.log('postbuild: wrote dist/404.html')
} else {
  console.warn('postbuild: no 404 route found, skipping dist/404.html')
}

// Pages would otherwise run the output through Jekyll and drop _-prefixed files.
fs.writeFileSync(path.join(dist, '.nojekyll'), '')
