import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { QuizContext } from './Contexts'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'

//import { Questions } from '../../pages/quizhelper/Questions'

const EndScreenB = () => {
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
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
        className="EndScreenBig"
        style={{ backgroundColor: 'lightseagreen' }}
      >
        <h1 style={{ fontWeight: '800' }}>テスト終了</h1>
        <h5>Test Finished</h5>
        <br />
        <h1>
          {point} / {totalQuestion}
        </h1>
        {/* <Link href="quizapp">
        <button onClick={restartQuiz}>Restart Quiz</button>
      </Link> */}
        <Link href="mypage">
          <button>このレベルは簡単すぎ</button>
        </Link>
        <Link href="mypage">
          <button onClick={restartQuiz}>マイページへ戻る</button>
        </Link>
      </div>
      <CopyrightFooter />
    </>
  )
}

export default EndScreenB
