import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import { QuizContext } from './ContextsB'
import Router from 'next/router'
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
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons'

const StepBarB = ({ cStep }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
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
    bookCoverImgUrl,
    setBookCoverImgUrl,
    bookImgUrl,
    setBookImgUrl,
    bookAudioUrl,
    setBookAudioUrl,
    seriesName,
    setSeriesName,
    bookStory,
    setBookStory,
    readingLevel,
    setReadingLevel,
    bookTitle,
    setBookTitle,
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
  // alert(cStep)
  return (
    <>
      {cStep == 'menu' ? (
        <></>
      ) : (
        <div
          className="QuizBig mb-0 mt-1 mb-0 p-0"
          style={{
            backgroundColor: 'white',
            border: 0,
            color: '#dedede',
            // borderRadius: '10px',
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-lg-12 col-md-12"
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {cStep == 'Step1B' && (
                  <div>
                    <font
                      style={{
                        fontWeight: '900',
                        fontSize: '25px',
                        color: 'red',
                      }}
                    >
                      STEP1
                    </font>
                    &nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;<b>STEP2</b>
                    &nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;<b>STEP3</b>&nbsp;
                  </div>
                )}
                {cStep == 'Step2B' && (
                  <div>
                    <b>STEP1</b>&nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;
                    <font
                      style={{
                        fontWeight: '900',
                        fontSize: '25px',
                        color: 'red',
                      }}
                    >
                      STEP2
                    </font>
                    &nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;<b>STEP3</b>&nbsp;
                  </div>
                )}
                {cStep == 'Step3B' && (
                  <div>
                    STEP1&nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;STEP2&nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;
                    <font
                      style={{
                        fontWeight: '900',
                        fontSize: '25px',
                        color: 'red',
                      }}
                    >
                      STEP3
                    </font>
                  </div>
                )}
                {cStep == 'Step4B' && (
                  <div>
                    <b>STEP1</b>&nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;<b>STEP2</b>&nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;
                    <b>STEP3</b>&nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;
                    <font
                      style={{
                        fontWeight: '900',
                        fontSize: '25px',
                        color: 'red',
                      }}
                    >
                      STEP4
                    </font>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StepBarB
