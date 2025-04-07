/** @format */
import react, { useContext } from 'react'
import { QuizContext } from '@/components/quizapp15000G/Contexts'

function MainMenu() {
  const {
    // course,
    // setCourse,
    // courseName,
    // setCourseName,
    // test_group,
    // setTest_group,
    group,
    setGroup,
    day,
    setDay,
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
    eikenLevel,
    setEikenLevel,
    userName,
    setUserName,
    totalQuestion,
    setTotalQuestion,
  } = useContext(QuizContext)

  return (
    <div className="Menu" style={{ backgroundColor: '#A850F9' }}>
      <h1 className="mb-5 text-white" style={{ fontWeight: '600' }}>
        {gameTitle}
      </h1>
      <h3 className="mb-5">{englib_level}</h3>
      <h3 className="mb-5">{userName}</h3>
      {/* <input
        type="text"
        placeholder="Ex. John Smith"
        onChange={(event) => {
          setUserName(event.target.value)
        }}
      /> */}
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
