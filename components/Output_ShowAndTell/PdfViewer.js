import React, { useEffect, useRef } from 'react'

export default function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    let PSPDFKit
    ;(async function () {
      PSPDFKit = await import('pspdfkit')

      if (PSPDFKit) {
        PSPDFKit.unload(container)
      }
      //https://englib-materials.s3.ap-northeast-1.amazonaws.com/ShadowingQuestion/Video/BASIC/1_Penguins-QUESTION.pdf
      //
      await PSPDFKit.load({
        container,
        document: './document/1_Penguins-QUESTION.pdf',
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      })
    })()

    return () => PSPDFKit && PSPDFKit.unload(container)
  }, [])

  return <div ref={containerRef} style={{ height: '100vh' }} />
}
