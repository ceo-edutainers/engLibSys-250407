/** @format */
import react, { useContext } from 'react'

import { QuizContext } from './Contexts'
function MainMenu() {
  const {
    quizTempId,
    setQuizTempId,
    audioOnOff,
    setAudioOnOff,
    gameTitle,
    setGameTitle,
    gameState,
    setGameState,
    englib_level,
    setEnglib_level,
    test_group,
    setTest_group,
    eikenLevel,
    setEikenLevel,
    userName,
    setUserName,
    totalQuestion,
    setTotalQuestion,
  } = useContext(QuizContext)

  return (
    <div className="Menu" style={{ backgroundColor: 'lightseagreen' }}>
      <h1 className="mb-5 text-white" style={{ fontWeight: '600' }}>
        {gameTitle}
      </h1>
      <h3 className="mb-5">{englib_level}</h3>
      <h3 className="mb-5">{userName}</h3>
      <button
        className="startBtn"
        onClick={() => {
          setGameState('playing')
        }}
      >
        Start Quiz
      </button>
      {/* Quiz-Id: {quizTempId} */}
      <br />
      Copyright ©︎ by engLib
    </div>
  )
}

export default MainMenu
