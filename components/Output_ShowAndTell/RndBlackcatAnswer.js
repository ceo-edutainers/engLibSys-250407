import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import { Rnd } from 'react-rnd'
import Link from '@/utils/ActiveLink'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import TextareaAutosize from 'react-textarea-autosize'

const RndBlackcatAnswer = ({ readingLevel, bookNum }) => {
  // alert(readingLevel)
  // alert(bookNum)
  // const [rL, setRL] = useState(readingLevel)
  // const [bN, setBN] = useState(bookNum)
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [bookUrl, setBookUrl] = useState()
  //For Feedback
  const [feedbackPronounciation, setFeedbackPronounciation] = useState()
  const [feedbackPhonics, setFeedbackPhonics] = useState()
  const [feedbackGrammar, setFeedbackGrammar] = useState()
  const [feedbackProblemTechnical, setFeedbackProblemTechnical] = useState()
  const [feedbackProblemLessonContrate, setFeedbackProblemLessonContrate] =
    useState()
  const [feedbackProblemHW, setFeedbackProblemHW] = useState()
  const [feedbackMemoToMom, setFeedbackMemoToMom] = useState()

  const [rndSwWidth2, setRndSwWidth2] = useState(1000) //300
  const [rndSwHeight2, setRndSwHeight2] = useState(600) //60
  const [defaultSwX2, setDefaultSwX2] = useState(500)
  const [defaultSwY2, setDefaultSwY2] = useState(100)
  const [rndSwZIndex2, setRndSwZIndex2] = useState(2) //-1 後ろ

  const [answerFile, setAnswerFile] = useState()
  const [viewFrame, setViewFrame] = useState(true)
  function rndFeedbackResize(width, height, x, y, zIndex) {
    setRndSwWidth2(width)
    setRndSwHeight2(height)
    setDefaultSwX2(x)
    setDefaultSwY2(y)
    setRndSwZIndex2(zIndex)
  }

  useEffect(() => {
    handleFile(readingLevel, bookNum)
  }, [readingLevel, bookNum])

  function handleFile(readingLevel, bookNum) {
    var af =
      'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/' +
      readingLevel +
      '/' +
      bookNum +
      '/answer/answer.pdf'
    // alert(af)
    setAnswerFile(af)
  }

  return (
    <>
      {answerFile && viewFrame && (
        <Rnd
          default={{
            x: defaultSwX2,
            y: defaultSwY2,
            width: rndSwWidth2,
            height: rndSwHeight2,
          }}
          size={{
            width: rndSwWidth2,
            height: rndSwHeight2,
          }}
          // position={{ x: defaultSwX2, y: defaultSwY2 }}
          style={{
            //display: 'flex',
            //display: 'flex',
            //alignItems: 'top',
            overflow: 'scroll',
            justifyContent: 'left',
            paddingTop: '10px',
            paddingLeft: '10px',
            paddingRight: '10px',

            border: 'solid 1px #dedede',
            borderRadius: '10px',
            background: '#F9D2B0',
            border: '1px solid darkgray',
            //overflow: 'auto',
            zIndex: rndSwZIndex2,
          }}
          minWidth={1000}
          minHeight={50}
          // bounds="window"
        >
          {' '}
          {/* <a
          className="btn btn-light ml-2 mr-2"
          // onClick={() => {
          //   rndFeedbackResize(1000, 600, 0, 500, 4)
          //   //alert(rndWidth1)
          // }}
          onClick={() => {
            rndFeedbackResize(1000, 600, 0, 500, 4)
            handleFile(readingLevel, bookNum)
          }}
        >
          ANSWER
        </a> */}
          {/* <a
          className="btn btn-light ml-2 mr-2"
          // onClick={() => {
          //   rndFeedbackResize(1000, 600, 0, 500, 4)
          //   //alert(rndWidth1)
          // }}
          onClick={() => {
            rndFeedbackResize(1000, 600, 0, 500, 4)
            handleFile(readingLevel, bookNum)
          }}
        >
          Check the Answer
        </a> */}
          <a
            className="btn btn-light"
            style={{ color: 'red' }}
            onClick={() => {
              rndFeedbackResize(200, 60, 0, 500, 3)
              setViewFrame(false)

              //alert(rndWidth1)
            }}
          >
            X
          </a>
          <div className="col-lg-12 col-md-12 mt-3">
            <iframe
              src={answerFile}
              style={{
                width: '900px',
                padding: '0',
                height: '500px',
                border: '1px solid #dedede',
              }}
            />
          </div>
        </Rnd>
      )}
    </>
  )
}

export default RndBlackcatAnswer
