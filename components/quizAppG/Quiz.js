import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { QuizContext } from '@/components/quizAppG/Contexts'
import next from 'next'
import Router, { useRouter } from 'next/router'
import SweetAlert from 'react-bootstrap-sweetalert'

const Quiz = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const router = useRouter() //使い方：router.replace('/')

  let audioRightAnswer = new Audio(
    'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/dingdongdang.mp3'
  )
  let audioWrongAnswer = new Audio(
    'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/wrong-answer.mp3'
  )
  //For sweet alert
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)

  const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味
  const [Questions, setQuestions] = useState([]) //DBから問題のデータを持ってきて入れる
  const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  const [nowClickedColor, setNowClickedColor] = useState('') //クリックした答えのボタンの色が変わる
  // const [nextQInsert, setNextQInsert] = useState('')

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
    score,
    setScore,
    userName,
    setUserName,
    gameTitle,
    setGameTitle,
    gameState,
    setGameState,
    englib_level,
    setEnglib_level,
    eikenLevel,
    setEikenLevel,
    totalQuestion,
    setTotalQuestion,
  } = useContext(QuizContext)

  const chooseOption = (option) => {
    setOptionChosen(option)
  }

  const nextQuestion = (option, arrayNum) => {
    if (option == '') {
      //答えを選んでなかった時
      alert('答えを選んでください。')
      return false
    }
    if (Questions[currentQuestion].answer == option) {
      if (audioOnOff == 'on') {
        audioRightAnswer.play()
      }
      setScore(score + 1)

      var correct = 1
    } else {
      if (audioOnOff == 'on') {
        audioWrongAnswer.play()
      }
      correct = 0
    }
    setCurrentQuestion(currentQuestion + 1)

    var mbn = localStorage.getItem('MypageMbn')
    var url = DB_CONN_URL + '/word-quiz5000-result-insert'
    axios
      .post(url, {
        quizTempId: quizTempId,
        mbn: mbn,
        test_title: Questions[arrayNum].test_title,
        test_group: Questions[arrayNum].test_group,
        englib_level: Questions[arrayNum].englib_level,
        questionCatEng: Questions[arrayNum].questionCatEng,
        bigNum: Questions[arrayNum].bigNum,
        qNum: Questions[arrayNum].qNum,
        answer_member: option,
        answer_original: Questions[arrayNum].answer,
        correct: correct,
      })
      .then((response) => {
        if (!response.data.status) {
          //console.log('no information', response)
          alert(response.data.message) //for test
        } else {
          // setCurrentQuestion(currentQuestion + 1)
          setNowClickedColor('')
        }
      })
    //alert(currentQuestion + 1)
  }

  const [isLoading5, setLoading5] = useState(false)
  const [isError5, setError5] = useState(false)
  const handleQuizCancel = () => {
    setIsOpenBackMypage(false)

    var mbn = localStorage.getItem('MypageMbn')
    const fetchData5 = async () => {
      try {
        var url = DB_CONN_URL + '/word-quiz5000-cancel/'
        const response = await axios.put(url + mbn + '&' + quizTempId)
      } catch (error) {
        setError5(true)
      }
      setLoading5(false)
    }
    fetchData5()
    router.replace('/mypage') // ここでリダイレクト
  }

  const [isLoading4, setLoading4] = useState(false)
  const [isError4, setError4] = useState(false)
  const finishQuiz = (option, arrayNum) => {
    // if (Questions[currentQuestion].answer == optionChosen) {
    //   setScore(score + 1)
    // }
    //alert('koko')

    if (Questions[currentQuestion].answer == option) {
      if (audioOnOff == 'on') {
        audioRightAnswer.play()
      }
      setScore(score + 1)

      var correct = 1
    } else {
      correct = 0
    }

    var mbn = localStorage.getItem('MypageMbn')
    const fetchData4 = async () => {
      setError4(false)
      setLoading4(true)
      try {
        var url = DB_CONN_URL + '/word-quiz5000-result-finish-insert'
        const response = await axios.post(url, {
          quizTempId: quizTempId,
          mbn: mbn,
          test_title: Questions[arrayNum].test_title,
          test_group: Questions[arrayNum].test_group,
          englib_level: Questions[arrayNum].englib_level,
          questionCatEng: Questions[arrayNum].questionCatEng,
          bigNum: Questions[arrayNum].bigNum,
          qNum: Questions[arrayNum].qNum,
          answer_member: option,
          answer_original: Questions[arrayNum].answer,
          correct: correct,
        })
        setCurrentQuestion(currentQuestion + 1)
        setNowClickedColor('')
      } catch (error) {
        setError4(true)
      }
      setLoading4(false)
    }
    setGameState('finished')
    fetchData4()
  }

  const thisImage = (imgName) => {
    // alert(imgName)
    if (imgName == 'img_ex1') {
      var imgsrc =
        'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/' +
        Questions[currentQuestion].img_ex1
    }
    if (imgName == 'img_ex2') {
      var imgsrc =
        'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/' +
        Questions[currentQuestion].img_ex2
    }
    if (imgName == 'img_ex3') {
      var imgsrc =
        'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/' +
        Questions[currentQuestion].img_ex3
    }

    // var imgsrc =
    //   'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/' +
    //   Questions[currentQuestion].imgName

    return imgsrc
  }

  const clickedColor = (option) => {
    setNowClickedColor(option)
  }

  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        var url = DB_CONN_URL + '/get-word-quiz-talkstation'
        const response = await axios.post(url, {
          quizTempId: quizTempId,
          mbn: mbn,
          voca_group: group,
          voca_day: day,
        })
        alert('here2')
        alert(response.data.length)
        setQuestions(response.data.response)
        // alert(response.data.response[0].img_ex1)
        //alert(response.data.response)
        setTotalQuestion(response.data.response.length)
      } catch (error) {
        //alert('catcherror')
        setError(true)
        alert('chatc error')
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (isError) return <h1>Error, try again!! My Voca Quiz</h1>
  if (isLoading) return <h1>Loading Question..........................</h1>

  return (
    <div>
      <div className="Quiz">
        {/* {Questions.filter((val) => { */}
        Q:{Questions.length}
        {Questions.filter((val) => val.qNum == currentQuestion + 1).map(
          (val, key) => {
            return (
              <>
                <div className="container mb-3">
                  <div>
                    <h1
                      style={{
                        fontWeight: '900',
                        alignItems: 'center',
                      }}
                    >
                      {val.voca_group}-{val.voca_day}&nbsp;&nbsp;
                      <a
                        className="btn btn-primary font-weight-bold text-white"
                        onClick={() => {
                          setIsOpenBackMypage(true)
                        }}
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        X
                      </a>
                    </h1>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <span
                      style={{
                        fontWeight: '900',
                        fontSize: '70px',
                        color: 'green',
                        margin: '0px',
                        padding: '0px',
                        paddingTop: 0,
                        textAlign: 'center',
                      }}
                    >
                      {score}
                    </span>
                    <p
                      style={{
                        padding: '0px',
                        margin: '0px',
                        textAlign: 'center',
                      }}
                    >
                      score
                    </p>
                  </div>

                  <hr />
                </div>
                <h1 style={{ fontWeight: '800', color: 'blue' }}>{val.word}</h1>

                {val.img_ex1 != '' && (
                  <img
                    src={thisImage('img_ex1')}
                    style={{
                      marginBottom: '20px',
                      width: '300px',
                      height: 'auto',
                    }}
                  />
                )}
                {val.ex1 != '' && (
                  <p
                    style={{
                      width: '350px',
                      fontSize: '20px',
                      padding: '15px',
                    }}
                  >
                    {val.ex1}
                  </p>
                )}
                <hr />
                {val.img_ex2 != '' && (
                  <img
                    src={thisImage('img_ex2')}
                    style={{
                      marginBottom: '20px',
                      width: '300px',
                      height: 'auto',
                    }}
                  />
                )}
                {val.ex2 != '' && (
                  <p
                    style={{
                      width: '350px',
                      fontSize: '20px',
                      padding: '15px',
                    }}
                  >
                    {val.ex2}
                  </p>
                )}
                <hr />
                {val.img_ex3 != '' && (
                  <img
                    src={thisImage('img_ex3')}
                    style={{
                      marginBottom: '20px',
                      width: '300px',
                      height: 'auto',
                    }}
                  />
                )}
                {val.ex3 != '' && (
                  <p
                    style={{
                      width: '350px',
                      fontSize: '20px',
                      padding: '15px',
                    }}
                  >
                    {val.ex2}
                  </p>
                )}
                <div className="questions">
                  {val.a != '' &&
                    (nowClickedColor == 'a' ? (
                      <button
                        onClick={() => {
                          chooseOption('a')
                          clickedColor('a')
                        }}
                        style={{ backgroundColor: 'blue', color: 'white' }}
                      >
                        {val.a}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          chooseOption('a')
                          clickedColor('a')
                        }}
                      >
                        {val.a}
                      </button>
                    ))}

                  {val.b != '' &&
                    (nowClickedColor == 'b' ? (
                      <button
                        onClick={() => {
                          chooseOption('b')
                          clickedColor('b')
                        }}
                        style={{ backgroundColor: 'blue', color: 'white' }}
                      >
                        {val.b}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          chooseOption('b')
                          clickedColor('b')
                        }}
                      >
                        {val.b}
                      </button>
                    ))}

                  {val.c != '' &&
                    (nowClickedColor == 'c' ? (
                      <button
                        onClick={() => {
                          chooseOption('c')
                          clickedColor('c')
                        }}
                        style={{ backgroundColor: 'blue', color: 'white' }}
                      >
                        {val.c}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          chooseOption('c')
                          clickedColor('c')
                        }}
                      >
                        {val.c}
                      </button>
                    ))}

                  {val.d != '' &&
                    (nowClickedColor == 'd' ? (
                      <button
                        onClick={() => {
                          chooseOption('d')
                          clickedColor('d')
                        }}
                        style={{ backgroundColor: 'blue', color: 'white' }}
                      >
                        {val.d}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          chooseOption('d')
                          clickedColor('d')
                        }}
                      >
                        {val.d}
                      </button>
                    ))}
                  <hr style={{ marginTop: '30px' }} />
                </div>

                {currentQuestion + 1 == Questions.length ? (
                  <>
                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => {
                        finishQuiz(optionChosen, currentQuestion)
                      }}
                      id="nextQuestion"
                    >
                      Finish Quiz
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <button
                        className="btn btn-danger mt-2 mb-2"
                        onClick={() => {
                          //setNextQInsert('insert')
                          setOptionChosen('') //答えを選ばなかった時に、前の質問の答えが残らないようにする
                          nextQuestion(optionChosen, currentQuestion)
                        }}
                        id="nextQuestion"
                      >
                        NEXT QUESTION
                      </button>
                    </div>
                  </>
                )}
                <p style={{ marginBottom: 0, paddingBottom: 0 }}>
                  {/* {currentQuestion + 1}/{Questions.length}問 */}
                  {val.qNum}問目/{Questions.length}問中&nbsp;
                  {audioOnOff == 'on' ? (
                    <a onClick={() => setAudioOnOff('off')}>
                      <img
                        src="https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/sound-on.jpg"
                        style={{
                          marginLeft: '10px',
                          width: '30px',
                          height: '30px',
                          border: 0,
                          cursor: 'pointer',
                        }}
                      />
                    </a>
                  ) : (
                    <a onClick={() => setAudioOnOff('on')}>
                      <img
                        src="https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/sound-off.jpg"
                        style={{
                          marginLeft: '10px',
                          width: '30px',
                          height: '30px',
                          border: 0,
                          cursor: 'pointer',
                        }}
                      />
                    </a>
                  )}
                </p>
              </>
            )
          }
        )}
        <SweetAlert
          title="テストをやめて、マイページに戻りますか？"
          show={isOpenBackMypage}
          onConfirm={() => handleQuizCancel()}
          onCancel={() => {
            setIsOpenBackMypage(false)
          }}
          confirmBtnText="テストをやめる"
          cancelBtnText="テストを続ける"
          showCancel={true}
          reverseButtons={true}
        >
          <p>マイページに戻るとテストの履歴が消えます。</p>
        </SweetAlert>
      </div>
    </div>
  )
}

export default Quiz
