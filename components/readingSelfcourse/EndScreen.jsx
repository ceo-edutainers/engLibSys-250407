import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { QuizContext } from './Contexts'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
//import { Questions } from '../../pages/quizhelper/Questions'

const EndScreen = () => {
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
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

  const restartQuiz = () => {
    setPoint(0)
    var tempid = Math.floor(Math.random() * 999999999999999)
    setPracticeTempId(tempid)
    setPageView('menu')
  }

  const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN
  useEffect(() => {
    let audioEndAlert = new Audio(
      `https://${PUBLIC_R2_DOMAIN}/sound-effect/complete.mp3`
    )
    audioEndAlert.play()
  }, [])

  // useEffect(() => {
  //   function endSoundPlay() {
  //     if (audioOnOff == 'on') {
  //       let audioEndAlert = new Audio(
  //         `https://${PUBLIC_R2_DOMAIN}/sound-effect/complete.mp3`
  //       )
  //       audioEndAlert.play()
  //     }
  //   }
  // }, [])

  return (
    <>
      <div
        className="QuizBig mt-5"
        style={{ backgroundColor: 'lightseagreen' }}
      >
        <h1 style={{ fontWeight: '800' }}>リーディング練習終了</h1>
        <h5>以下の個別のメニュからもっと練習して、ポイントをゲットしよう。</h5>
        <br />

        <button
          className="startBtnBig"
          onClick={() => {
            nextStepCheck('Step1')
          }}
        >
          Start Reading
        </button>

        <Link href="readingSelfcourseA">
          <button onClick={restartQuiz}>練習を再スタート</button>
        </Link>

        <Link href="mytopGroup">
          <button onClick={restartQuiz}>マイページへ戻る</button>
        </Link>
      </div>
      <CopyrightFooter />
    </>
  )
}

export default EndScreen
