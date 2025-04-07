// import './App.css'
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MainMenu from '@/components/quizappEiken/MainMenu_eiken'
import Quiz from '@/components/quizappEiken/Quiz_eiken'
import EndScreen from '@/components/quizappEiken/EndScreen_eiken'
// import { QuizContext } from './quizhelper/Contexts'
import { QuizContext } from '@/components/quizappEiken/Contexts'
import Router, { useRouter } from 'next/router'
// ['menu', 'playing', 'finished']

function App() {
  const router = useRouter() //使い方：router.replace('/')
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  //初期設定
  const [gameTitle, setGameTitle] = useState('Level Test')
  // const [englib_level, setEnglib_level] = useState('eiken_level参考')
  const [test_group, setTest_group] = useState('') //同じレベルの中で何番目のテストなのか

  const [quizTempId, setQuizTempId] = useState('')
  const [eikenLevel, setEikenLevel] = useState('')
  const [userName, setUserName] = useState('')
  const [gameState, setGameState] = useState('menu')
  const [score, setScore] = useState(0)
  const [totalQuestion, setTotalQuestion] = useState(0)
  const [audioOnOff, setAudioOnOff] = useState('on')

  //get member info : name_eng +  quizTempIdを発行
  useEffect(() => {
    if (quizTempId == '') {
      var tempid = Math.floor(Math.random() * 999999999999999)
      setQuizTempId(tempid)
    }

    var mbn = localStorage.getItem('MypageMbn')

    if (mbn == null) {
      alert('先にログインしてください。')
      router.replace('/loginLevelTest') // ここでリダイレクト
      return false
    }
    var Url = DB_CONN_URL + '/get-sys_member_Level_Test/' + mbn
    axios.get(Url).then((response) => {
      if (!response.data.status) {
        alert(response.data.message)
      } else {
        //console.log('submit-login-ok-response in LoginFormNEw', response.data)
        setUserName(response.data.response[0].name_eng)
        setTest_group(response.data.response[0].levelTest)
        // setEnglib_level(response.data.response[0].englibLevel)
      }
    })
  }, [])

  return (
    <div className="AppBig">
      <QuizContext.Provider
        value={{
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
          score,
          setScore,
          totalQuestion,
          setTotalQuestion,
        }}
      >
        {gameState === 'menu' && <MainMenu />}
        {gameState === 'playing' && <Quiz />}
        {gameState === 'finished' && <EndScreen />}
      </QuizContext.Provider>
    </div>
  )
}

export default App
