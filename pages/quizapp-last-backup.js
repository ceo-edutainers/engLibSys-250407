// import './App.css'
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MainMenu from '@/components/quizapp/MainMenu'
import Quiz from '@/components/quizapp/Quiz'
import EndScreen from '@/components/quizapp/EndScreen'
// import { QuizContext } from './quizhelper/Contexts'
import { QuizContext } from '@/components/quizapp/Contexts'
// ['menu', 'playing', 'finished']
function App() {
  //初期設定
  const [gameTitle, setGameTitle] = useState('Level Test')
  const [englib_level, setEnglib_level] = useState('B1')
  const [test_group, setTest_group] = useState('1') //同じレベルの中で何番目のテストなのか

  const [quizTempId, setQuizTempId] = useState('')
  const [eikenLevel, setEikenLevel] = useState('')
  const [userName, setUserName] = useState('')
  const [gameState, setGameState] = useState('menu')
  const [score, setScore] = useState(0)
  const [totalQuestion, setTotalQuestion] = useState(0)
  const [audioOnOff, setAudioOnOff] = useState('on')
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  //get member info : name_eng +  quizTempIdを発行
  useEffect(() => {
    if (quizTempId == '') {
      var tempid = Math.floor(Math.random() * 999999999999999)
      setQuizTempId(tempid)
    }

    var mbn = localStorage.getItem('MypageMbn')
    var Url = DB_CONN_URL + '/get-member-info/' + mbn
    axios.get(Url).then((response) => {
      if (!response.data.status) {
        alert(response.data.message)
      } else {
        //console.log('submit-login-ok-response in LoginFormNEw', response.data)
        setUserName(response.data.response[0].name_eng)
      }
    })
  }, [])

  return (
    <div className="App">
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
          englib_level,
          setEnglib_level,
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
