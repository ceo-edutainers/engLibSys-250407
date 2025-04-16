import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { QuizContext } from './Contexts'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
//import { Questions } from '../../pages/quizhelper/Questions'

const EndScreenOST = () => {
  const {
    myMbn,
    setMyMbn,
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
  const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN
  const restartPractice = () => {
    // setPoint(0)
    localStorage.removeItem('holdTempIdOST', '')
    var tempid = Math.floor(Math.random() * 999999999999999)
    setPracticeTempId(tempid)
    setPageView('menu')
  }

  useEffect(() => {
    let audioEndAlert = new Audio(
      // `https://${PUBLIC_R2_DOMAIN}/sound-effect/complete.mp3`
      `https://${PUBLIC_R2_DOMAIN}/sound-effect/complete.mp3`
    )
    audioEndAlert.play()
  }, [])

  useEffect(() => {
    function endSoundPlay() {
      if (audioOnOff == 'on') {
        let audioEndAlert = new Audio(
          // `https://${PUBLIC_R2_DOMAIN}/sound-effect/complete.mp3`
          `https://${PUBLIC_R2_DOMAIN}/sound-effect/complete.mp3`
        )
        audioEndAlert.play()
      }
    }
  }, [])

  return (
    <>
      <div
        className="QuizBig mt-5"
        style={{ backgroundColor: '#3498DB', height: '500px' }}
      >
        <h1 style={{ fontWeight: '800' }}>終&nbsp;了</h1>

        <div>
          <p style={{ color: 'white' }}>
            決まっている単語数以上のスクリプトを書きましたか？
            <br />
            書き終わっていない場合は、レッスンまでに終わらせてください。
            <br />
            50分レッスンをフル活用するために、毎日課題に取り組んでください。
          </p>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 mt-5">
            <Link href="outputShowAndTellCourse">
              <button onClick={restartPractice}>もう一度スタート</button>
            </Link>
          </div>
          <div className="col-lg-6 col-md-12 mt-5">
            <Link href="mytopGroup">
              <button onClick={restartPractice}>マイページトップへ</button>
            </Link>
          </div>
        </div>
      </div>
      <CopyrightFooter />
    </>
  )
}

export default EndScreenOST
