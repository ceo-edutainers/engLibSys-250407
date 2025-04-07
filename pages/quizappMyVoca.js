// import './App.css'
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

import MainMenu from '@/components/quizappMyVoca/MainMenu_myvoca'
import Quiz from '@/components/quizappMyVoca/Quiz_myvoca'
import EndScreen from '@/components/quizappMyVoca/EndScreen_myvoca'

import { QuizContext } from '@/components/quizappMyVoca/Contexts'
import Router, { useRouter } from 'next/router'
// ['menu', 'playing', 'finished']

function App() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')

  //初期設定
  const [gameTitle, setGameTitle] = useState('My Word Quiz')
  // const [englib_level, setEnglib_level] = useState('eiken_level参考')
  const [test_group, setTest_group] = useState('') //同じレベルの中で何番目のテストなのか

  const [quizTempId, setQuizTempId] = useState('')
  const [eikenLevel, setEikenLevel] = useState('')
  const [userName, setUserName] = useState('')
  const [gameState, setGameState] = useState('menu')
  const [score, setScore] = useState(0)
  const [totalQuestion, setTotalQuestion] = useState(0)
  const [audioOnOff, setAudioOnOff] = useState('on')
  const [HWID, setHWID] = useState()
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
        // setTest_group(response.data.response[0].levelTest)
        // setEnglib_level(response.data.response[0].englibLevel)
      }
    })
  }, [])

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')

      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-quizappVoca-first-page/'
          var Url = url + mbn
          const response = await axios.get(Url)

          if (response.data.length > 0) {
            setHWID(response.data[0].homework_id)
          }
        } catch (error) {
          alert(error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }, [])

  return (
    <div className="AppBig">
      <QuizContext.Provider
        value={{
          HWID,
          setHWID,
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
