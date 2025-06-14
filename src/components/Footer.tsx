'use client'

import { useEffect } from 'react'

interface FooterProps {
  mathjax?: boolean
  flickity?: boolean
  masonry?: boolean
}

export default function Footer({ mathjax, flickity, masonry }: FooterProps) {

  useEffect(() => {
    // Initialize Masonry if needed
    if (masonry && typeof window !== 'undefined') {
      const loadMasonry = async () => {
        const Masonry = (await import('masonry-layout')).default
        const elems = document.querySelectorAll('.grid')
        
        elems.forEach((elem) => {
          new Masonry(elem as HTMLElement, {
            itemSelector: '.grid_item',
            columnWidth: '.grid_item',
            gutter: '.gutter',
          })
        })
      }
      
      loadMasonry()
    }
  }, [masonry])

  return (
    <footer>
      <noscript>
        <style>{`
          header, main { display: none; }
          #no_js_enabled {
            display: absolute;
            text-align: center;
            margin-top: 50vh;
          }
        `}</style>
        <div id="no_js_enabled">
          <p>JavaScript is either disabled, or not supported by your current browser.</p>
          <p>Please enable JavaScript, or upgrade to a modern web browser such as{' '}
            <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">Chrome</a> or{' '}
            <a href="https://www.mozilla.org/en-US/firefox/" target="_blank" rel="noopener noreferrer">Firefox</a>.
          </p>
        </div>
      </noscript>

      {mathjax && (
        <>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML" async></script>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                MathJax.Hub.Config({
                  TeX: { equationNumbers: { autoNumber: "all" } },
                  tex2jax: {
                    inlineMath: [['$','$'], ["\\\\(","\\\\)"]],
                    processEscapes: true
                  }
                });
              `
            }}
          />
        </>
      )}
    </footer>
  )
}