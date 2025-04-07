import React, { useState, useEffect, useRef } from 'react'
import Split from 'react-split'
//css: split.css

import GoogleDoc from '@/components/GoogleDoc/GoogleDoc'
import GoogleDocCreator from '@/components/GoogleDoc/GoogleDocCreator'
import VoiceRecorderToS3ForLessonPage from '@/components/VoiceRecorder/VoiceRecorderToS3ForLessonPage'
// import VoiceRecorderToS3ForLessonPage2 from '@/components/VoiceRecorder/VoiceRecorderTest'
//import VoiceTest from '@/components/VoiceRecorder/VoiceTest'

//import VoiceRecorderToS3ForLessonPageForHomework from '@/components/VoiceRecorder/VoiceRecorderToS3ForLessonPageForHomework'

import { Rnd } from 'react-rnd'
import DiscussionMultiQuestionBox from '@/components/Tutor/DiscussionMultiQuestionBox'

import DiscussionStudentWorkBox from '@/components/Tutor/DiscussionStudentWorkBox'
//left Panel
import YoutubeScriptTimeInsert from '@/components/Youtube/YoutubeScriptTimeInsert'
//For Test
//import YoutubeScriptTimeInsert from '@/components/Youtube/YoutubeScriptTimeInsertTest'

const SplitPanelOutput = ({
  mbn,
  homework_id,
  youtubeID,
  google_doc_link,
  tbn,
}) => {
  //const { query } = useRouter() //값이 get url로 넘어왔을 경우 사용

  // console.log('1.mbn', mbn)
  // console.log('2.homework_id', homework_id)
  // console.log('3.youtubeID', youtubeID)
  // console.log('4.google_doc_link', google_doc_link)

  //multiQuestion
  const [rndWidth1, setRndWidth1] = useState(300)
  const [rndHeight1, setRndHeight1] = useState('auto')
  const [defaultX, setDefaultX] = useState(900)
  const [defaultY, setDefaultY] = useState(-50)
  const [rndZIndex, setRndZIndex] = useState(-1) //-1 後ろ

  function rndResize(width, height, x, y, zIndex) {
    setRndWidth1(width)
    setRndHeight1(height)
    setDefaultX(x)
    setDefaultY(y)
    setRndZIndex(zIndex)
  }

  //student Information
  const [rndSwWidth1, setRndSwWidth1] = useState(300)
  const [rndSwHeight1, setRndSwHeight1] = useState('auto')
  const [defaultSwX, setDefaultSwX] = useState(600)
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
          sizes={[45, 55]}
          minSize={100}
          expandToMin={false}
          gutterAlign="left"
          snapOffset={30}
          dragInterval={0}
          direction="horizontal"
          cursor="col-resize"
          backgroundColor="#dedede"
        >
          {/* Left Panel */}
          <div style={{ paddingLeft: '20px' }}>
            <YoutubeScriptTimeInsert
              yID={youtubeID}
              homework_id={homework_id}
              mbn={mbn}
              tbn={tbn}
            />
          </div>
          {/* Right Panel */}
          <div
            style={{
              top: '60px',
              width: '650px',
              zIndex: 1,
              backgroundColor: '#ececec',
              //border: '1px solid #dedede',
              textAlign: 'center',
            }}
          >
            <VoiceRecorderToS3ForLessonPage
              mbn={mbn}
              homework_id={homework_id}
              tbn={tbn}
            />

            {/* <VoiceRecorderToS3ForLessonPage2
              mbn={mbn}
              homework_id={homework_id}
              tbn={tbn}
            /> */}
            {/* <VoiceRecorderToS3ForLessonPage
              mbn={mbn}
              homework_id={homework_id}
            /> */}
            {/* <VoiceRecorderToS3ForLessonPage
            homework_id={homework_id}/> */}
            {google_doc_link == '' ? (
              <GoogleDocCreator
                mbn={mbn}
                tbn={tbn}
                //name_eng={name_eng}
                homework_id={homework_id}
                youtubeID={youtubeID}
              />
            ) : (
              <>
                <GoogleDoc embedUrl={google_doc_link} />
              </>
            )}

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
                  //alert(rndWidth1)
                }}
              >
                X
              </a>
              {/* {rndWidth1} */}
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
              {/* <b>MultiQ</b> */}

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
              {/* {rndWidth1} */}
              <br />
              {rndZIndex == 0 && (
                <div>
                  <DiscussionMultiQuestionBox
                    youtubeID={youtubeID}
                    homework_id={homework_id}
                  />
                </div>
              )}
            </Rnd>
          </div>
        </Split>
      </div>
    </>
  )
}
export default SplitPanelOutput
