/** @format */
import react, { useContext, useState, useEffect } from 'react'
import { QuizContext } from './Contexts'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
function MainMenuA() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
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

  const nextStepCheck = (nStep) => {
    //次のstep1のsys_hw_historyテーブルのstatusがendになっている場合は、step2にいく。
    //왜냐하면, step1은 처음 한번만 하는 step이므로.
    var homework_id = HWID
    // var nextStep = 'Step1'
    var nextStep = nStep

    var Url =
      DB_CONN_URL +
      '/get-step-sys-hw-history/' +
      myMbn +
      '&' +
      homework_id +
      '&' +
      nextStep

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        if (response.data.length > 0) {
          //step1の stepStatus==endがある場合
          if (response.data.response[0].step == 'Step1') {
            //alert('first')
            var thisStep = 'Step2'
            //console.log('thisStep-first:', thisStep)
          } else {
            var thisStep = response.data.response[0].step
            //alert('second')

            // console.log('thisStep-second:', thisStep)
          }
        } else {
          //아직 아무런 history가 들어 있지 않을 경우 (처음으로 이  스토리를 공부하는 경우)

          var thisStep = 'Step1'
          // alert('3')
          // console.log('###-3:', thisStep)
        }

        practiceStart(thisStep)
        console.log('thisStep:', thisStep)

        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  const practiceStart = (nextStep) => {
    //次のstep1のsys_hw_historyテーブルのstepStatusがendになっている場合は、step2にいく。
    //왜냐하면, step1은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
        // alert(nextStep)
        // alert('testend')
        var homework_id = HWID
        var step = nextStep
        var pti = practiceTempId

        axios
          .post(DB_CONN_URL + '/reg-sys-hw-history', {
            mbn: myMbn,
            homework_id: homework_id,
            step: step,
            practiceTempId: pti,
          })
          .then((response) => {
            if (!response.data.status) {
            } else {
              setPageView(nextStep)
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  return (
    <div
      className="MenuBig p-3"
      style={{ backgroundColor: '#6666cc', color: 'white', height: 'auto' }}
    >
      <h1 className="mb-1" style={{ fontWeight: '900' }}>
        {seriesName}
      </h1>

      <h3 className="mb-3" style={{ color: 'white' }}>
        {courseLevel}
      </h3>
      {/* <h7>
        <b>{bookTitle}</b>
        <br />
        <b>{storyTitle}</b>
        <br />
        {storyNum}&nbsp;&nbsp;|&nbsp;&nbsp;
        {storyStartPage}
        page~
      </h7> */}

      <div className="col-lg-12 col-md-12 mt-2 ">
        <img
          src={bookCoverImgUrl}
          width="150px"
          className="mr-2 mb-3"
          style={{ border: '4px solid #dedede' }}
        />
        <img
          src={bookImgUrl}
          width="150px"
          className="mb-3"
          style={{ border: '4px solid #dedede' }}
        />
      </div>

      <button
        className="startBtnBig"
        onClick={() => {
          nextStepCheck('Step1')
        }}
      >
        Start Reading
      </button>
      <Link href="/mytopGroup">
        <button
          className="btn btn-danger mt-4"
          style={{ fontWeight: '900', color: 'white', marginTop: '10px' }}
        >
          GO BACK TO MYPAGE
        </button>
      </Link>
      {/* <p>{HWID}</p>
      Quiz-Id: {practiceTempId}
      <br />
      Copyright 2022 ©︎ by engLib */}
    </div>
  )
}

export default MainMenuA
