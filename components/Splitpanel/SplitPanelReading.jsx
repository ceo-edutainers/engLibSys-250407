import React, { useState, useEffect, useRef } from 'react'
import Split from 'react-split'
import axios from 'axios'
import { Rnd } from 'react-rnd'
//css: split.css
import ViewUploadedHomework from '@/components/Output_ShowAndTell/ViewUploadedHomework'
import PdfViewer from '@/components/PdfViewer/PdfViewer'
import GoogleDoc from '@/components/GoogleDoc/GoogleDoc'
import DiscussionStudentWorkBox from '@/components/Tutor/DiscussionStudentWorkBox'
import DiscussionMultiQuestionBox from '@/components/Tutor/DiscussionMultiQuestionBox'
import GoogleDocCreatorCourseST from '@/components/GoogleDoc/GoogleDocCreatorCourseST'

const SplitPanelReading = ({
  mbn,
  tbn,
  homework_id,
  name_eng,
  // thisOsusumeLetterSumScript,
  // thisOsusumeLetterSumOutline,
}) => {
  const DB_CONN_URL = process.env.DB_CONN_URL

  const [file1, setFile1] = useState(
    'https://englib-materials.s3.ap-northeast-1.amazonaws.com/3min-presentation/3min-Presentation_PART1_Lesson_1.pdf'
  )
  const [google_doc_link, setGoogleDocLink] = useState()

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  //無限ループしない
  const bar = {}
  const bar2 = {}
  useEffect(() => {
    if (localStorage.getItem('T_loginStatus') == 'true') {
      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-reading-first-page/'
          var Url = url + mbn
          const response = await axios.get(Url)
          if (response.data[0].google_doc_link != '') {
            // alert('no google doc')
            setGoogleDocLink(response.data[0].google_doc_link)
          }
        } catch (error) {
          alert(error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }, [bar2])

  if (isError)
    return <h1>discussion.js Error, try again hw info in splitpanel!</h1>
  if (isLoading) return <h1>{youtubeID}Loading..........................</h1>

  return (
    <>
      <div>
        {/* <div
          className="p-0 pl-3 m-0"
          style0={{
            width: '100%',
            padding: 0,
          }}
        >
          <object
            data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage1plus&file=myenglib/materials/reading/ORT/Stage1plus/book/At_the_Park.pdf"
            // data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=reading_triumphs&file=Triumph_G1_BOOK1_Unit1_Story1.pdf&readingLevel=G1_1"
            style={{
              width: '100%',
              height: '820px',
              border: '1px solid white',
              borderRadius: '20px',
              backgroundColor: 'white',
              margin: 0,
              padding: 0,
            }}
          />
        </div> */}
        <Split
          className="split"
          gutterSize={5}
          sizes={[50, 50]}
          minSize={100}
          expandToMin={false}
          gutterAlign="left"
          snapOffset={30}
          dragInterval={0}
          direction="horizontal"
          cursor="col-resize"
        >
          {/* Left Panel */}
          <div className="mt-2">
            <ViewUploadedHomework
              mbn={mbn}
              homework_id={homework_id}
              // thisOsusumeLetterSumScript={thisOsusumeLetterSumScript}
              // thisOsusumeLetterSumOutline={thisOsusumeLetterSumOutline}
            />
            {/* <PdfViewer file="/src/3min-presentation/3min-Presentation_PART1_Lesson_1.pdf" /> */}
          </div>
          {/* Right Panel */}
          <div
            className="mt-2"
            style={{
              width: '650px',
              zIndex: 1,
              backgroundColor: '#ececec',
              //border: '1px solid #dedede',
              textAlign: 'center',
            }}
          >
            {google_doc_link == '' ? (
              <GoogleDocCreatorCourseST
                mbn={mbn}
                tbn={tbn}
                name_eng={name_eng}
                homework_id={homework_id}
              />
            ) : (
              <>
                {/* <GoogleDoc embedUrl={google_doc_link} /> */}
                <iframe
                  style={{ border: 0, width: '100%', height: '1200px' }}
                  src="https://docs.google.com/document/d/1UpXORBJPLBuK2y3DO2ndcMzXStiqV5lQV-Oj4he8mN8/edit?usp=sharing"
                ></iframe>
              </>
            )}
          </div>
        </Split>
      </div>
    </>
  )
}
export default SplitPanelReading
