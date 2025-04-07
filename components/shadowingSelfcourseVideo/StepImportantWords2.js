import React, { useContext, useEffect } from 'react'
import { QuizContext } from './Contexts'

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
const StepImportantWords2 = ({ stepWords1, stepWords2, stepWords3 }) => {
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    thisSubject,
    setThisSubject,
    leastRecordCount_ondoku,
    setLeastRecordCount_ondoku,
    leastRecordCount_shadowing,
    setLeastRecordCount_shadowing,
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
          <p
            style={{
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
              width: '100%',
              backgroundColor: '#cc0000',
              marginRight: '5px',
              marginTop: '5px',
              marginBottom: '5px',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              fontSize: '17px',
              fontWeight: 'bold',
            }}
          >
            {stepWords1}
          </p>

          {/* <FontAwesomeIcon
              size="1x"
              color="black"
              icon={faCircle}
              style={{ marginRight: '5px' }}
            /> */}
          <p
            style={{
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
              width: '100%',
              backgroundColor: '#cc0000',
              // marginRight: '5px',
              marginTop: '5px',
              marginBottom: '5px',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              fontSize: '17px',
              fontWeight: 'bold',
            }}
          >
            {stepWords2}
          </p>

          {/* <FontAwesomeIcon
              size="1x"
              color="black"
              icon={faCircle}
              style={{ marginRight: '5px' }}
            /> */}
          <p
            style={{
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
              width: '100%',
              backgroundColor: '#cc0000',
              // marginRight: '5px',
              marginTop: '5px',
              marginBottom: '5px',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              fontSize: '17px',
              fontWeight: 'bold',
            }}
          >
            {stepWords3}
          </p>
        </div>
      </center>
      {/* </MediaQuery> */}

      {/* <MediaQuery query="(max-width: 767px)">
        <center>
          <div className="col-lg-12 col-md-12 mb-0">
            <p
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '50%',
                backgroundColor: '#cc0000',
                // marginRight: '5px',
                marginTop: '5px',
                marginBottom: '5px',
                padding: '5px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '17px',
                fontWeight: 'bold',
              }}
            >
              {stepWords1}
            </p>

         
            <p
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '50%',
                backgroundColor: '#cc0000',
                // marginRight: '5px',
                marginTop: '5px',
                marginBottom: '5px',
                padding: '5px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '17px',
                fontWeight: 'bold',
              }}
            >
              {stepWords2}
            </p>

        
            <p
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '50%',
                backgroundColor: '#cc0000',
                // marginRight: '5px',
                marginBottom: '5px',
                padding: '5px',
                padding: '5px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '17px',
                fontWeight: 'bold',
              }}
            >
              {stepWords3}
            </p>
          </div>
        </center>
        <hr />
      </MediaQuery> */}
    </>
  )
}

export default StepImportantWords2
