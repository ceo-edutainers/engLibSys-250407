import React, { useState } from 'react'
// import { Document, Page, pdfjs } from 'react-pdf'
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function SinglePage(props) {
  // const [numPages, setNumPages] = useState(null)
  // const [pageNumber, setPageNumber] = useState(1) //setting 1 to show fisrt page
  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages)
  //   setPageNumber(1)
  // }
  // function changePage(offset) {
  //   setPageNumber((prevPageNumber) => prevPageNumber + offset)
  // }
  // function previousPage() {
  //   changePage(-1)
  // }
  // function nextPage() {
  //   changePage(1)
  // }
  // const { pdf } = props
  // // const mypdf = props.pdf
  // return (
  //   <>
  //     <div className="pdfMain">
  //       <Document
  //         file={pdf}
  //         //options={{ workerSrc: '/pdf.worker.js' }}
  //         onLoadSuccess={onDocumentLoadSuccess}
  //       >
  //         <Page pageNumber={pageNumber} />
  //       </Document>
  //       <div>
  //         <p>
  //           Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
  //         </p>
  //         {/* <p> Total {numPages} pages</p> */}
  //         <button
  //           className="btn btn-info"
  //           style={{ marginRight: '20px' }}
  //           type="button"
  //           disabled={pageNumber <= 1}
  //           onClick={previousPage}
  //         >
  //           Previous
  //         </button>
  //         <button
  //           className="btn btn-info"
  //           type="button"
  //           disabled={pageNumber >= numPages}
  //           onClick={nextPage}
  //         >
  //           Next
  //         </button>
  //       </div>
  //     </div>
  //   </>
  // )
}
