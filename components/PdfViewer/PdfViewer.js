// import SinglePage from '@/components/PdfViewer/singlePage'
// import AllPages from '@/components/PdfViewer/allPages'

//import { sampleBase64pdf } from 'sampleBase64pdf'
// import lessonfile "./3min-Presentation_PART1_Lesson_1.pdf"
//import samplePDF from '/files/book1.pdf'
//import samplePDF from '/src/3min-presentation/'

export default function PdfViewer(props) {
  return (
    // <div
    //   className="all-page-container"
    //   style={{ scroll: 'flow', width: '100%', height: '800px' }}
    // >
    <div style={{ overflow: 'scroll', height: '900px' }}>
      {/* <SinglePage pdf={props.file} /> */}

      {/* <h4>All Pages</h4> */}

      {/* <AllPages pdf={props.file} /> */}
    </div>
  )
}

//Componentとして使い方
//  <PdfViewer file="/files/book1.pdf" />
