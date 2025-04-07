import React, { useState, useEffect } from 'react'

// import PdfViewer from '@/components/pdfViewer/PdfViewer'

function ViewOption3Presentation({ fileName }) {
  const [fileUrl, setFileUrl] = useState(
    'https://englib-materials.s3.ap-northeast-1.amazonaws.com/3min-presentation/' +
      fileName
  )

  return <>{/* <PdfViewer /> */}</>
}

export default ViewOption3Presentation
