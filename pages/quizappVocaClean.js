// import './App.css'
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import MainMenu from '@/components/quizappVocaClean/MainMenu_vocaclean'
import Quiz from '@/components/quizappVocaClean/Quiz_vocaclean'
import EndScreen from '@/components/quizappVocaClean/EndScreen_vocaclean'

import { QuizContext } from '@/components/quizappVocaClean/Contexts'
import Router, { useRouter } from 'next/router'
// ['menu', 'playing', 'finished']

function App() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')

  //初期設定
  const [gameTitle, setGameTitle] = useState('Voca Cleaner')

  // const [englib_level, setEnglib_level] = useState('eiken_level参考')
  const [bigCat, setBigCat] = useState('word')
  const [cat, setCat] = useState('英検')
  const [test_level, setTest_level] = useState('5級')
  const [grammarForm, setGrammarForm] = useState('noun')
  const [unit, setUnit] = useState('Unit1')

  const [quizTempId, setQuizTempId] = useState('')
  const [eikenLevel, setEikenLevel] = useState('')
  const [userName, setUserName] = useState('')
  const [gameState, setGameState] = useState('menu')
  const [score, setScore] = useState(0)
  const [totalQuestion, setTotalQuestion] = useState(0)
  const [audioOnOff, setAudioOnOff] = useState('on')
  // const [HWID, setHWID] = useState()
  //get member info : name_eng +  quizTempIdを発行
  useEffect(() => {
    if (quizTempId == '') {
      var tempid = Math.floor(Math.random() * 999999999999999)
      setQuizTempId(tempid)
    }

    var mbn = localStorage.getItem('MypageMbn')

    if (mbn == null) {
      alert('先にログインしてください。')
      router.replace('/loginVocaClean') // ここでリダイレクト
      return false
    }
    var Url = DB_CONN_URL + '/get-sys_member_Level_Test/' + mbn
    axios.get(Url).then((response) => {
      if (!response.data.status) {
        alert(response.data.message)
      } else {
        //console.log('submit-login-ok-response in LoginFormNEw', response.data)
        setUserName(response.data.response[0].name_eng)
        // setTest_level(response.data.response[0].levelTest)
        // setEnglib_level(response.data.response[0].englibLevel)
      }
    })
  }, [])

  // useEffect(() => {
  //   if (localStorage.getItem('loginStatus') == 'true') {
  //     var mbn = localStorage.getItem('MypageMbn')

  //     const fetchData2 = async () => {
  //       try {
  //         var url = DB_CONN_URL + '/get-hw-quiz-grammar-spaeking-first-page/'
  //         var Url = url + mbn
  //         const response = await axios.get(Url)

  //         if (response.data.length > 0) {
  //           setGrammarInfo(response.data)
  //         }
  //       } catch (error) {
  //         alert(error)
  //         console.log(error)
  //       }
  //     }

  //     fetchData2()
  //   }
  // }, [])

  return (
    <div className="AppBig">
      <QuizContext.Provider
        value={{
          // HWID,
          // setHWID,
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
          test_level,
          setTest_level,
          bigCat,
          setBigCat,
          cat,
          setCat,
          unit,
          setUnit,
          eikenLevel,
          setEikenLevel,
          grammarForm,
          setGrammarForm,
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
