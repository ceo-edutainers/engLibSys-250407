/** @format */
import react, { useContext, useState } from 'react'
import Router from 'next/router'
// import { QuizContext } from '../../pages/quizhelper/Contexts'
// import { QuizContext } from 'pages/quizhelper/Contexts'
import { QuizContext } from './Contexts'
import logoimg from './img/logo-white.png'

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
    // englib_level,
    // setEnglib_level,
    test_group,
    setTest_group,
    eikenLevel,
    setEikenLevel,
    userName,
    setUserName,
    totalQuestion,
    setTotalQuestion,
  } = useContext(QuizContext)
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

  return (
    <div
      className="MenuBig mt-5 p-5"
      // style={{  padding: '20px', height: 'auto' }}
      style={{
        backgroundColor: '#333399',
        // backgroundImage: `url(${logoimg.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: 'auto',
        height: 'auto',
        textAlign: 'center',
        paddingTop: '20px',
      }}
    >
      <img src="/images/logo-white.png" width="20%" height="auto" />
      <h1 className="mb-2 mt-4 text-white" style={{ fontWeight: '600' }}>
        {gameTitle}
        <br />
        {test_group}
      </h1>
      {/* <h3 className="mb-2">{englib_level}</h3> */}
      <hr style={{ border: '0.3px solid #ececec', width: '100%' }} />
      <h3 className="mb-5">{userName}</h3>
      <button
        className="startBtnBig mb-3"
        onClick={() => {
          setGameState('playing')
        }}
      >
        START TEST
      </button>
      <p style={{ color: 'yellow' }}>
        一度スタートすると前に戻ることはできません。
        <br />
        正確なレベル測定のために、
        <br />
        辞書など参考になるものは使わないようにお願い申し上げます。
      </p>
      {/* Quiz-Id: {quizTempId} */}
      <button className="mt-5" style={{ color: 'black' }} onClick={logOut}>
        今はテストをやらない
      </button>
      Copyright 2022 ©︎ by engLib
    </div>
  )
}

export default MainMenu
