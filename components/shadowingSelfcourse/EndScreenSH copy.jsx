import React, { useContext, useEffect } from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'
import { QuizContext } from './Contexts'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
//import { Questions } from '../../pages/quizhelper/Questions'

const EndScreenSH = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
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
    seriesName,
    setSeriesName,
    bookStory,
    setBookStory,
    shadowingLevel,
    setShadowingLevel,
    bookTitle,
    setBookTitle,
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
    storyTitle,
    setStoryTitle,
    storyStartPage,
    setStoryStartPage,
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
    let audioEndAlert = new Audio(
      'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/complete.mp3'
    )
    audioEndAlert.play()
  }, [])

  // useEffect(() => {
  //   function endSoundPlay() {
  //     if (audioOnOff == 'on') {
  //       let audioEndAlert = new Audio(
  //         'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/complete.mp3'
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

        <h1>以下の音声を比較してみると成長を感じることができます。</h1>
        <h4>あなたが最初に録音した音声</h4>
        <h4>最後のレッスン時に録音した音声</h4>
        {/* <button
          className="startBtnBig"
          onClick={() => {
            nextStepCheck('Step1')
          }}
        >
          Start Shadowing
        </button> */}

        <Link href="shadowingSelfcourse">
          <button onClick={restartQuiz}>もう一度練習をスタート</button>
        </Link>
        <h1>このレベルはあなたにとってどうですか？</h1>
        <h4>
          必ずフィードバックにお答えください。これを元にレベルの見直しが入ります。
          <br />
          ①と④の答えが3回続いた場合、レベル調整に入ります。管理者からの連絡をお待ちください。
        </h4>

        <p>
          [check-次のストーリへ]まだ練習が十分ではない場合：知らない単語があんまりない場合、Dictationで最初の日に正解が80%以上多かった場合、
        </p>
        <Link href="">
          <button>①簡単すぎて、レベルをあげたい</button>
        </Link>
        <Link href="">
          <button>ちょうどいい</button>
        </Link>
        <Link href="">
          <button>少し難しいけどこのレベルを続けたい</button>
        </Link>
        <Link href="">
          <button>④難しすぎてレベルを下げたい</button>
        </Link>
        <Link href="mytopGroup">
          <button onClick={restartQuiz}>マイページへ戻る</button>
        </Link>
      </div>
      <CopyrightFooter />
    </>
  )
}

export default EndScreenSH
