import 'vite'

// vite-react-ssg reads its options off the Vite config but ships no
// augmentation for them.
declare module 'vite' {
  interface UserConfig {
    ssgOptions?: import('vite-react-ssg').ViteReactSSGOptions
  }
}
