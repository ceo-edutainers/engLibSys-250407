import React, { useContext, useEffect } from 'react'
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
  faPlay,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'
const StepImportantWords = ({ stepWords1, stepWords2, stepWords3 }) => {
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
    englibLevel,
    setEnglibLevel,
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

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <center>
        <div className="col-lg-12 col-md-12">
          <span
            style={{
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
              width: '50%',
              backgroundColor: '#cc0000',
              marginRight: '5px',
              marginTop: '10px',
              marginBottom: '10px',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              fontSize: '17px',
              fontWeight: 'bold',
            }}
          >
            {stepWords1}
          </span>
          <FontAwesomeIcon
            size="1x"
            color="black"
            icon={faCircle}
            style={{ marginRight: '5px' }}
          />
          <span
            style={{
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
              width: '50%',
              backgroundColor: '#cc0000',
              marginRight: '5px',
              marginTop: '10px',
              marginBottom: '10px',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              fontSize: '17px',
              fontWeight: 'bold',
            }}
          >
            {stepWords2}
          </span>
          <FontAwesomeIcon
            size="1x"
            color="black"
            icon={faCircle}
            style={{ marginRight: '5px' }}
          />
          <span
            style={{
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
              width: '50%',
              backgroundColor: '#cc0000',
              marginRight: '5px',
              marginTop: '10px',
              marginBottom: '10px',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              fontSize: '17px',
              fontWeight: 'bold',
            }}
          >
            {stepWords3}
          </span>
        </div>
        <hr />
      </center>
      {/* </MediaQuery> */}

      {/* <MediaQuery query="(max-width: 767px)">
        <center>
          <div className="col-lg-12 col-md-12">
            <span
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '50%',
                backgroundColor: '#cc0000',
                marginRight: '5px',
                marginTop: '10px',
                marginBottom: '10px',
                padding: '5px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '17px',
                fontWeight: 'bold',
              }}
            >
              {stepWords1}
            </span>
            <FontAwesomeIcon
              size="1x"
              color="black"
              icon={faCircle}
              style={{ marginRight: '5px' }}
            />
            <span
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '50%',
                backgroundColor: '#cc0000',
                marginRight: '5px',
                marginTop: '10px',
                marginBottom: '10px',
                padding: '5px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '17px',
                fontWeight: 'bold',
              }}
            >
              {stepWords2}
            </span>
            <FontAwesomeIcon
              size="1x"
              color="black"
              icon={faCircle}
              style={{ marginRight: '5px' }}
            />
            <span
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '50%',
                backgroundColor: '#cc0000',
                marginRight: '5px',
                marginTop: '10px',
                marginBottom: '10px',
                padding: '5px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '17px',
                fontWeight: 'bold',
              }}
            >
              {stepWords3}
            </span>
          </div>
        </center>
        <hr />
      </MediaQuery> */}
    </>
  )
}

export default StepImportantWords
