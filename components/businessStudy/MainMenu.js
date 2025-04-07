/** @format */
import React, { useContext } from 'react'
import { QuizContext } from '../../pages/quizhelper/Contexts'

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
    <div className="BSMenu">
      <h1 className="mb-5 mt-5 text-white font-weight-bold">{gameTitle}</h1>
      <div>
        <a
          className="btn btn-info BSLessonBtn"
          onClick={() => {
            setGameState('playing')
          }}
        >
          LESSON
          {/* <p>Speaking/Listening</p> */}
          <p style={{ color: 'blue' }}>
            DISCUSSION
            <br />
            Once a week
          </p>
        </a>
        <a
          className="btn btn-info BSLessonBtn"
          onClick={() => {
            setGameState('playing')
          }}
        >
          LESSON
          <p style={{ color: 'blue' }}>
            FREE TALKING
            <br />
            everyday
          </p>
        </a>
      </div>
      <div>
        <a
          className="btn btn-info BSstartBtn"
          onClick={() => {
            setGameState('playing')
          }}
        >
          Shadowing
          {/* <p>Speaking/Listening</p> */}
          <p style={{ color: 'blue' }}>10回終了</p>
        </a>
        <a
          className="btn btn-info BSstartBtn"
          onClick={() => {
            setGameState('playing')
          }}
        >
          Dictation
          <p style={{ color: 'blue' }}>10センテンス終了</p>
        </a>
      </div>
      <div>
        <a
          className="btn btn-info BSstartBtn"
          onClick={() => {
            setGameState('playing')
          }}
        >
          Reading音読
          <p style={{ color: 'blue' }}>5回終了</p>
        </a>
        <a
          className="btn btn-info BSstartBtn "
          onClick={() => {
            setGameState('playing')
          }}
        >
          3分口英作文
          <p style={{ color: 'blue' }}>
            135センテンス終了
            <br />
            Total:500
            <br />
            口頭 or タイピング
          </p>
        </a>
      </div>
      <div>
        <a
          className="btn btn-info BSstartBtn"
          onClick={() => {
            setGameState('playing')
          }}
        >
          Word Quiz
          <p style={{ color: 'blue' }}>
            50 new words today
            <br />
            25 words completed
          </p>
        </a>
        <a
          className="btn btn-info BSstartBtn"
          onClick={() => {
            setGameState('playing')
          }}
        >
          Grammar Quiz
          <p style={{ color: 'blue' }}>10 question completed</p>
        </a>
      </div>
      <div>
        <a
          className="btn btn-info BSstartBtn"
          onClick={() => {
            setGameState('playing')
          }}
        >
          Listening Quiz
          <p style={{ color: 'blue' }}>10 question completed</p>
        </a>
        <a
          className="btn btn-info BSstartBtn"
          onClick={() => {
            setGameState('playing')
          }}
        >
          3 video arrived
          <p style={{ color: 'blue' }}>
            発音：1 video
            <br />
            文法: 2 video
          </p>
        </a>
      </div>
      {/* Quiz-Id: {quizTempId} */}
      <br />
      Copyright ©︎ by engLib
    </div>
  )
}

export default MainMenu
