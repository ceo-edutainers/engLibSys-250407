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
  firstOrder2,
  secondOrder,
  // thirdOrder,
  fourthOrder,
  fifthOrder,
  startPageNum,
  subpageTitle,
}) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
    englibLevel,
    setEnglibLevel,
    englibLevelColor,
    setEnglibLevelColor,
    thisSubject,
    setThisSubject,
    leastRecordCount_step2,
    setLeastRecordCount_step2,
    leastRecordCount_step3,
    setLeastRecordCount_step3,
    bookCoverImgUrl,
    setBookCoverImgUrl,
    bookImgUrl,
    setBookImgUrl,
    bookAudioUrl,
    setBookAudioUrl,
    bookIntroAudioUrl,
    setBookIntroAudioUrl,
    bookIntro2AudioUrl,
    setBookIntro2AudioUrl,
    bookAuthorAudioUrl,
    setBookAuthorAudioUrl,
    bookAudio2Url,
    setBookAudio2Url,
    bookAudio2TitleUrl,
    setBookAudio2TitleUrl,
    bookAudio3TitleUrl,
    setBookAudio3TitleUrl,
    bookAudio3Url,
    setBookAudio3Url,
    bookAudio4TitleUrl,
    setBookAudio4TitleUrl,
    bookAudio4Url,
    setBookAudio4Url,
    bookAudio5TitleUrl,
    setBookAudio5TitleUrl,
    bookAudio5Url,
    setBookAudio5Url,
    bookAudio6TitleUrl,
    setBookAudio6TitleUrl,
    bookAudio6Url,
    setBookAudio6Url,
    bookAudio7TitleUrl,
    setBookAudio7TitleUrl,
    bookAudio7Url,
    setBookAudio7Url,
    seriesName,
    setSeriesName,
    bookStory,
    setBookStory,
    readingLevel,
    setReadingLevel,
    bookTitle,
    setBookTitle,
    storyStartPage,
    setStoryStartPage,
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
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
    textbook,
    setTextbook,
    eikenLevel,
    setEikenLevel,
    userName,
    setUserName,
    point,
    setPoint,
    totalQuestion,
    setTotalQuestion,
  } = useContext(QuizContext)

  const restartQuiz = () => {
    setPoint(0)
    var tempid = Math.floor(Math.random() * 999999999999999)
    setPracticeTempId(tempid)
    setPageView('menu')
  }

  useEffect(() => {
    function endSoundPlay() {
      if (audioOnOff == 'on') {
        let audioEndAlert = new Audio(
          'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/complete.mp3'
        )
        audioEndAlert.play()
      }
    }
  }, [])

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <div
        className="col-lg-12 col-md-12 mt-0 mb-3"
        style={{
          backgroundColor: '#ffe4e1',
          padding: '15px',
          color: 'black',
          borderRadius: '10px',
        }}
      >
        <b dangerouslySetInnerHTML={{ __html: subpageTitle }}></b>
        <br />

        {firstOrder && (
          <span dangerouslySetInnerHTML={{ __html: firstOrder }}></span>
        )}
        <span>
          &nbsp;
          <FontAwesomeIcon icon={faMicrophone} size="1x" color="red" />
          &nbsp;
        </span>
        {firstOrder2 && (
          <span dangerouslySetInnerHTML={{ __html: firstOrder2 }}></span>
        )}
        {secondOrder && (
          <div dangerouslySetInnerHTML={{ __html: secondOrder }}></div>
        )}
        {/* {thirdOrder && (
            <div dangerouslySetInnerHTML={{ __html: thirdOrder }}></div>
          )} */}
        {fourthOrder && (
          <div dangerouslySetInnerHTML={{ __html: fourthOrder }}></div>
        )}
        {fifthOrder && (
          <div dangerouslySetInnerHTML={{ __html: fifthOrder }}></div>
        )}
      </div>
      {/* </MediaQuery> */}
      {/* <MediaQuery query="(max-width: 767px)">
        <div className="col-lg-12 col-md-12 mt-0 mb-3">
          <center>
            <p
              style={{
                width: '50%',
                fontSize: '16px',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#ffe4e1',
                color: 'black',
              }}
            >
              <b dangerouslySetInnerHTML={{ __html: subpageTitle }}></b>
              <br />

              {firstOrder && (
                <div dangerouslySetInnerHTML={{ __html: firstOrder }}></div>
              )}
              {secondOrder && (
                <div dangerouslySetInnerHTML={{ __html: secondOrder }}></div>
              )}
            
              {fourthOrder && (
                <div dangerouslySetInnerHTML={{ __html: fourthOrder }}></div>
              )}
              {fifthOrder && (
                <div dangerouslySetInnerHTML={{ __html: fifthOrder }}></div>
              )}
            
            </p>
          </center>
        </div>
      </MediaQuery> */}
    </>
  )
}

export default Subpage
