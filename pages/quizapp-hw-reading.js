// import './App.css'
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MainMenu from '@/components/quizapp-hw-reading/MainMenu'
import Quiz from '@/components/quizapp-hw-reading/Quiz'
import EndScreen from '@/components/quizapp-hw-reading/EndScreen'
// import { QuizContext } from './quizhelper/Contexts'
import { QuizContext } from '@/components/quizapp-hw-reading/Contexts'

// ['menu', 'playing', 'finished']
function App() {
  //初期設定
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [course, setCourse] = useState('Input Course')
  const [courseName, setCourseName] = useState('CourseA')
  const [gameTitle, setGameTitle] = useState('Word Quiz')
  const [englib_level, setEnglib_level] = useState('A1')
  const [test_group, setTest_group] = useState('1') //同じレベルの中で何番目のテストなのか

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
    <div className="App mt-20">
      <QuizContext.Provider
        value={{
          course,
          setCourse,
          courseName,
          setCourseName,
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
