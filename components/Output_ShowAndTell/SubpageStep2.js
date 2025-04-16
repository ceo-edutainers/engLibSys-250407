import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { QuizContext } from './Contexts'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faTrash,
  faLockOpen,
  faArrowCircleRight,
  faArrowAltCircleRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'
//import { Questions } from '../../pages/quizhelper/Questions'

const Subpage = ({
  firstOrder,
  secondOrder,
  thirdOrder,
  fourthOrder,
  fifthOrder,
  subpageTitle,
  whyThisStepTitle,
  whyThisStep,
}) => {
  const {
    myMbn,
    setMyMbn,
    teacherName,
    setTeacherName,
    tbn,
    setTbn,
    HWID,
    setHWID,
    yoyakuDate,
    setYoyakuDate,
    yoyakuTime,
    setYoyakuTime,
    thisSubject,
    setThisSubject,
    storyTitle,
    setStoryTitle,
    practiceTempId,
    setPracticeTempId,
    audioOnOff,
    setAudioOnOff,
    course,
    setCourse,
    courseName,
    setCourseName,
    pageView,
    setPageView,
    courseLevel,
    setCourseLevel,
    userName,
    setUserName,
    point,
    setPoint,
  } = useContext(QuizContext)

  const restartQuiz = () => {
    setPoint(0)
    var tempid = Math.floor(Math.random() * 999999999999999)
    setPracticeTempId(tempid)
    setPageView('menu')
  }
  const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN
  useEffect(() => {
    function endSoundPlay() {
      if (audioOnOff == 'on') {
        let audioEndAlert = new Audio(
          `https://${PUBLIC_R2_DOMAIN}/sound-effect/complete.mp3`
        )
        audioEndAlert.play()
      }
    }
  }, [])

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      {/* <div className="container"> */}
      <div className="row align-items-center m-0 p-0">
        {/* <div
            className="col-lg-12 col-md-6 mt-0 mb-3"
            style={{
              backgroundColor: '#ececec',
              padding: '15px',
              color: 'black',
              borderRadius: '10px',
              textAlign: 'left',
              fontSize: '15px',
              border: '1px solid #dedede',
            }}
          > */}

        <div
          className="col-lg-7 col-md-12 mt-0 mb-3"
          style={{
            backgroundColor: '#ececec',
            padding: '15px',
            color: 'black',
            borderRadius: '10px',
            textAlign: 'left',
            fontSize: '15px',
            border: '1px solid #566573',
            lineHeight: '25.5px',
          }}
        >
          <b dangerouslySetInnerHTML={{ __html: subpageTitle }}></b>

          {firstOrder && (
            <div dangerouslySetInnerHTML={{ __html: firstOrder }}></div>
          )}
          {secondOrder && (
            <div dangerouslySetInnerHTML={{ __html: secondOrder }}></div>
          )}
          {thirdOrder && (
            <div dangerouslySetInnerHTML={{ __html: thirdOrder }}></div>
          )}
          {fourthOrder && (
            <div dangerouslySetInnerHTML={{ __html: fourthOrder }}></div>
          )}
          {fifthOrder && (
            <div dangerouslySetInnerHTML={{ __html: fifthOrder }}></div>
          )}
        </div>

        <div className="col-lg-5 col-md-12 mt-0 mb-3">
          <p
            style={{
              width: '100%',
              fontSize: '12px',
              padding: '10px',
              border: '1px solid darkred',
              borderRadius: '10px',
              backgroundColor: '#ffe4e1',
              color: 'black',
              textAlign: 'left',
            }}
          >
            {whyThisStepTitle && (
              <font size="15px">
                <b dangerouslySetInnerHTML={{ __html: whyThisStepTitle }}></b>
              </font>
            )}

            {whyThisStep && (
              <div dangerouslySetInnerHTML={{ __html: whyThisStep }}></div>
            )}
          </p>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
      {/* </MediaQuery> */}
    </>
  )
}

export default Subpage
