import React, { useState, useEffect, useRef } from 'react'
import Split from 'react-split'
import axios from 'axios'
//css: split.css
import ViewTestType from '@/components/Output_ShowAndTell/ViewTestType'
import PdfViewer from '@/components/PdfViewer/PdfViewer'
import GoogleDoc from '@/components/GoogleDoc/GoogleDoc'

import GoogleDocCreatorCourseST from '@/components/GoogleDoc/GoogleDocCreatorCourseST'

const SplitPanelOutputSAT = ({
  mbn,
  tbn,
  homework_id,
  name_eng,
  thisOsusumeLetterSumScript,
  thisOsusumeLetterSumOutline,
  stLevel,
  stTitle,
}) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const [file1, setFile1] = useState(
    'https://englib-materials.s3.ap-northeast-1.amazonaws.com/3min-presentation/3min-Presentation_PART1_Lesson_1.pdf'
  )
  const [google_doc_link, setGoogleDocLink] = useState()

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  //無限ループしない

  const bar2 = {}
  useEffect(() => {
    if (localStorage.getItem('T_loginStatus') == 'true' && mbn) {
      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/'
          var Url = url + mbn
          // alert(Url)
          const response = await axios.get(Url)
          // alert(response.data[0].google_doc_link)
          // if (response.data[0].google_doc_link) {
          setGoogleDocLink(response.data[0].google_doc_link)
          // }
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
          <div className="mt-2" style={{ paddingLeft: '20px' }}>
            <ViewTestType
              mbn={mbn}
              homework_id={homework_id}
              thisOsusumeLetterSumScript={thisOsusumeLetterSumScript}
              thisOsusumeLetterSumOutline={thisOsusumeLetterSumOutline}
              stLevel={stLevel}
              stTitle={stTitle}
            />
            <PdfViewer file="/src/3min-presentation/3min-Presentation_PART1_Lesson_1.pdf" />
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
                <GoogleDoc embedUrl={google_doc_link} />
              </>
            )}
          </div>
        </Split>
      </div>
    </>
  )
}
export default SplitPanelOutputSAT
