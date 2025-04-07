// import './App.css'
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MainMenu from '@/components/quizapp5000/MainMenu'
import Quiz from '@/components/quizapp5000/Quiz'
import EndScreen from '@/components/quizapp5000/EndScreen'
// import { QuizContext } from './quizhelper/Contexts'
import { QuizContext } from '@/components/quizapp/Contexts'
// ['menu', 'playing', 'finished']
function App() {
  //初期設定 : quizapp.js
  /*const [course, setCourse] = useState('Input Course')
  const [courseName, setCourseName] = useState('CourseA')
  const [gameTitle, setGameTitle] = useState('Word Quiz')
  const [englib_level, setEnglib_level] = useState('A1')
  const [test_group, setTest_group] = useState('1') //同じレベルの中で何番目のテストなのか
*/

  //初期設定: quizapp5000.js
  // const [mbn, myMbn] = useState(localStorage.getItem('MypageMbn'))
  const [group, setGroup] = useState('100')
  const [day, setDay] = useState('Day1')
  const [gameTitle, setGameTitle] = useState('5000  Word Quiz')
  const [englib_level, setEnglib_level] = useState('A1')
  const [eikenLevel, setEikenLevel] = useState('')
  const [quizTempId, setQuizTempId] = useState('')

  const [userName, setUserName] = useState('')
  const [gameState, setGameState] = useState('menu')
  const [score, setScore] = useState(0)
  const [totalQuestion, setTotalQuestion] = useState(0)
  const [audioOnOff, setAudioOnOff] = useState('on')
  const DB_CONN_URL = process.env.DB_CONN_URL
  //get member info : name_eng +  quizTempIdを発行
  useEffect(() => {
    if (quizTempId == '') {
      var tempid = Math.floor(Math.random() * 999999999999999)
      setQuizTempId(tempid)
    }

    var mbn = localStorage.getItem('MypageMbn')

    var url = DB_CONN_URL + '/get-member-info/'
    var Url = url + mbn
    // alert(Url)
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
      {/* {mbn} */}
      <QuizContext.Provider
        value={{
          // course,
          // setCourse,
          // courseName,
          // setCourseName,
          // test_group,
          // setTest_group,
          // mbn,
          // myMbn,
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
