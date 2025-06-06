import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { QuizContext } from '../../pages/quizhelper/Contexts'

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
    englib_level,
    setEnglib_level,
    eikenLevel,
    setEikenLevel,
    test_group,
    setTest_group,
    userName,
    setUserName,
    gameState,
    setGameState,
    totalQuestion,
    setTotalQuestion,
  } = useContext(QuizContext)
  const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN

  const restartQuiz = () => {
    setScore(0)
    var tempid = Math.floor(Math.random() * 999999999999999)
    setQuizTempId(tempid)
    setGameState('menu')
  }

  useEffect(() => {
    function endSoundPlay() {
      if (audioOnOff == 'on') {
        let audioEndAlert = new Audio(
          `https://${PUBLIC_R2_DOMAIN}/sound-effect/complete.mp3`
        )
        audioEndAlert.play()
      }
    }
  }, [])

  return (
    <div className="BSEndScreen" style={{ backgroundColor: 'lightseagreen' }}>
      <h1 style={{ fontWeight: '800' }}>テスト終了</h1>
      <h5>Test Finished</h5>
      <br />
      <h1>
        {score} / {totalQuestion}
      </h1>
      {/* <Link href="quizapp">
        <button onClick={restartQuiz}>Restart Quiz</button>
      </Link> */}
      <Link href="mypage">
        <button onClick={restartQuiz}>マイページへ戻る</button>
      </Link>
    </div>
  )
}

export default EndScreen
