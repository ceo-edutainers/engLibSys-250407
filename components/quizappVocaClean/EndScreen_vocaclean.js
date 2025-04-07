import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { QuizContext } from './Contexts'
import Router from 'next/router'

//import { Questions } from '../../pages/quizhelper/Questions'

const EndScreen = () => {
  const {
    quizTempId,
    setQuizTempId,
    audioOnOff,
    setAudioOnOff,
    score,
    setScore,
    gameTitle,
    setGameTitle,
    // englib_level,
    // setEnglib_level,
    eikenLevel,
    setEikenLevel,
    test_level,
    setTest_level,
    bigCat,
    setBigCat,
    cat,
    setCat,
    level,
    setLevel,
    grammarForm,
    setGrammarForm,
    unit,
    setUnit,
    userName,
    setUserName,
    gameState,
    setGameState,
    totalQuestion,
    setTotalQuestion,
  } = useContext(QuizContext)

  const restartQuiz = () => {
    setScore(0)
    var tempid = Math.floor(Math.random() * 999999999999999)
    setQuizTempId(tempid)
    setGameState('menu')
  }
  const [loginStatus, setLoginStatus] = useState(false) //login時
  let logOut = () => {
    setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
    localStorage.removeItem('name_eng', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginLevelTest')
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
    <div
      className="EndScreenBig mt-5 p-5"
      style={{
        backgroundColor: 'lightseagreen',
        height: 'auto',
        width: '800px',
      }}
    >
      <h1 style={{ fontWeight: '800', color: 'black' }}>テスト終了</h1>
      <br />
      <h5>お疲れ様でした。以下のボタンを押してログアウトしてください。</h5>
      <br />
      <h3 style={{ fontWeight: '300' }}>
        {score}問正解 / {totalQuestion}問中
      </h3>
      {/* <Link href="quizapp">
        <button onClick={restartQuiz}>Restart Quiz</button>
      </Link> */}
      <button
        style={{
          textAlign: 'center',
          cursor: 'grab',
          fontWeight: '600',
          fontSize: '20px',
        }}
        className="btn btn-warning p-3 mt-5"
        onClick={logOut}
      >
        LOGOUT
      </button>
      <div className="mt-3">
        <p style={{ color: 'black' }}>Copyright 2022 ©︎ by engLib</p>
      </div>
    </div>
  )
}

export default EndScreen
