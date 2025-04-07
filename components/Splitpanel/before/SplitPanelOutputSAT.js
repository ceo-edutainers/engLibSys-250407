import React, { useState, useEffect, useRef } from 'react'
import Split from 'react-split'
import axios from 'axios'
//css: split.css

import GoogleDoc from '@/components/GoogleDoc/GoogleDoc'
// import GoogleDocCreator from '@/components/GoogleDoc/GoogleDocCreator'
import GoogleDocCreatorCourseST from '@/components/GoogleDoc/GoogleDocCreatorCourseST'
import VoiceRecorderToS3ForLessonPage from '@/components/VoiceRecorder/VoiceRecorderToS3ForLessonPage'
import ViewMindmapForTutor from '@/components/Output_ShowAndTell/ViewMindmapForTutor'
import PdfViewer from '@/components/PdfViewer/PdfViewer'
// import SinglePage from '@/components/PdfViewer/singlePage'
// import ViewOption3Presentation from '@/components/Output_ShowAndTell/ViewOption3Presentation'
// import VoiceRecorderToS3ForLessonPage2 from '@/components/VoiceRecorder/VoiceRecorderTest'
//import VoiceTest from '@/components/VoiceRecorder/VoiceTest'

//import VoiceRecorderToS3ForLessonPageForHomework from '@/components/VoiceRecorder/VoiceRecorderToS3ForLessonPageForHomework'

import { Rnd } from 'react-rnd'
import DiscussionMultiQuestionBox from '@/components/Tutor/DiscussionMultiQuestionBox'

import DiscussionStudentWorkBox from '@/components/Tutor/DiscussionStudentWorkBox'
//left Panel
import YoutubeScriptTimeInsert from '@/components/Youtube/YoutubeScriptTimeInsert'
import { MdBeenhere } from 'react-icons/md'
//For Test
//import YoutubeScriptTimeInsert from '@/components/Youtube/YoutubeScriptTimeInsertTest'

const SplitPanelOutputSAT = ({ mbn, tbn, homework_id, name_eng }) => {
  //const { query } = useRouter() //값이 get url로 넘어왔을 경우 사용

  // console.log('1.mbn', mbn)
  // console.log('2.homework_id', homework_id)
  // console.log('3.youtubeID', youtubeID)
  // console.log('4.google_doc_link', google_doc_link)

  const DB_CONN_URL = process.env.DB_CONN_URL

  // const [file1, setFile1] = useState('./3min-Presentation_PART1_Lesson_1.pdf')
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
    if (localStorage.getItem('loginStatus') == 'true') {
      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/'
          var Url = url + mbn
          const response = await axios.get(Url)

          //setHWbookInfo(response.data)
          // alert(response.data[0].google_doc_link)
          //  setHWID(response.data[0].homework_id)
          //  // setUserName(response.data.name_eng)
          //  setYoyakuDate(response.data[0].yoyakuDate)
          //  setYoyakuTime(response.data[0].yoyakuTime)
          //  setTeacherName(response.data[0].teacher_name)
          //  setTbn(response.data[0].teacher_barcode_num)
          setGoogleDocLink(response.data[0].google_doc_link)
          // setNameEng(response.data[0].name_eng)
          // setHomeworkID(response.data[0].homework_id)
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

  const [rndWidth1, setRndWidth1] = useState(300)
  const [rndHeight1, setRndHeight1] = useState('auto')
  const [defaultX, setDefaultX] = useState(1000)
  const [defaultY, setDefaultY] = useState(-50)
  const [rndZIndex, setRndZIndex] = useState(-1) //-1 後ろ

  function rndResize(width, height, x, y, zIndex) {
    setRndWidth1(width)
    setRndHeight1(height)
    setDefaultX(x)
    setDefaultY(y)
    setRndZIndex(zIndex)
  }

  const [rndSwWidth1, setRndSwWidth1] = useState(300)
  const [rndSwHeight1, setRndSwHeight1] = useState('auto')
  const [defaultSwX, setDefaultSwX] = useState(700)
  const [defaultSwY, setDefaultSwY] = useState(-50)
  const [rndSwZIndex, setRndSwZIndex] = useState(-1) //-1 後ろ

  function rndStudentWorkResize(width, height, x, y, zIndex) {
    setRndSwWidth1(width)
    setRndSwHeight1(height)
    setDefaultSwX(x)
    setDefaultSwY(y)
    setRndSwZIndex(zIndex)
  }

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
            {/* <YoutubeScriptTimeInsert
              yID={youtubeID}
              homework_id={homework_id}
              mbn={mbn}
              tbn={tbn}
            /> */}
            {/* <ViewOption3Presentation fileName="3min-Presentation_PART1_Lesson_1.pdf" /> */}
            <ViewMindmapForTutor
              mbn={mbn}
              homework_id={homework_id}
              // currentStep={currentStep}
              // stepStatus="Mindmap"
              // pointKeyNum={pointKeyNum}
              // practiceTempId={practiceTempId}
              // thisSubject={thisSubject}
            />{' '}
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
            {/* <VoiceRecorderToS3ForLessonPage
              mbn={mbn}
              homework_id={homework_id}
              tbn={tbn}
            /> */}

            {/* {!google_doc_link && 'no link'} */}
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
            {/* 
            <Rnd
              default={{
                x: defaultSwX,
                y: defaultSwY,
                width: rndSwWidth1,
                height: rndSwHeight1,
              }}
              style={{
                //display: 'flex',
                //display: 'flex',
                //alignItems: 'top',

                justifyContent: 'left',
                paddingTop: '10px',
                paddingLeft: '10px',
                paddingRight: '10px',

                //border: 'solid 1px #dedede',
                background: '#ececec',
                border: '1px solid darkgray',
                //overflow: 'auto',
                zIndex: rndSwZIndex,
              }}
              minWidth={200}
              minHeight={50}
              // bounds="window"
            >
              <a
                className="btn btn-light ml-2 mr-2"
                onClick={() => {
                  rndStudentWorkResize('400px', '800px', 0, -50, 0)
                  //alert(rndWidth1)
                }}
              >
                Student's Effort
              </a>

              <a
                className="btn btn-light"
                style={{ color: 'red' }}
                onClick={() => {
                  rndStudentWorkResize('400px', '50px', 0, -50, -1)
                }}
              >
                X
              </a>

              <br />
              {rndSwZIndex == 0 && (
                <div>
                  <DiscussionStudentWorkBox
                    youtubeID={youtubeID}
                    homework_id={homework_id}
                  />
                </div>
              )}
            </Rnd>
            <Rnd
              default={{
                x: defaultX,
                y: defaultY,
                width: rndWidth1,
                height: rndHeight1,
              }}
              style={{
                //display: 'flex',
                //display: 'flex',
                //alignItems: 'top',

                justifyContent: 'left',
                paddingTop: '10px',
                paddingLeft: '10px',
                paddingRight: '10px',

                //border: 'solid 1px #dedede',
                background: '#ececec',
                border: '1px solid darkgray',
                //overflow: 'auto',
                zIndex: rndZIndex,
              }}
              minWidth={200}
              minHeight={50}
              // bounds="window"
            >
              <a
                className="btn btn-light ml-2 mr-2"
                onClick={() => {
                  rndResize('400px', '800px', 0, -50, 0)
                  //alert(rndWidth1)
                }}
              >
                Multi-Question
              </a>

              <a
                className="btn btn-light"
                style={{ color: 'red' }}
                onClick={() => {
                  rndResize('400px', '50px', 0, -50, -1)
                  //alert(rndWidth1)
                }}
              >
                X
              </a>

              <br />
              {rndZIndex == 0 && (
                <div>
                  <DiscussionMultiQuestionBox
                    youtubeID={youtubeID}
                    homework_id={homework_id}
                  />
                </div>
              )}
            </Rnd> */}
          </div>
        </Split>
      </div>
    </>
  )
}
export default SplitPanelOutputSAT
