import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
// import { QuizContext } from '../../pages/quizhelper/Contexts'
// import { QuizContext } from 'pages/quizhelper/Contexts'
import { QuizContext } from './Contexts'
import next from 'next'
import Router, { useRouter } from 'next/router'
import SweetAlert from 'react-bootstrap-sweetalert'

const Quiz = () => {
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
    test_group,
    setTest_group,
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

    axios
      .post(DB_CONN_URL + '/leveltest-quiz-result-insert', {
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
        const response = await axios.put(
          DB_CONN_URL + '/leveltest-quiz-cancel/' + mbn + '&' + quizTempId
        )
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
        const response = await axios.post(
          DB_CONN_URL + '/leveltest-quiz-result-finish-insert',
          {
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
          }
        )
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

  const thisImage = () => {
    var imgsrc =
      'https://englib.s3.ap-northeast-1.amazonaws.com/leveltest-eiken/' +
      Questions[currentQuestion].questionPic +
      '.jpg'
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

    // alert(quizTempId)
    var Url =
      DB_CONN_URL +
      '/get-leveltest-quiz/' +
      quizTempId +
      '&' +
      englib_level +
      '&' +
      mbn +
      '&' +
      test_group
    //console.log('Url:', Url)
    //alert(Url)
    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)
        setQuestions(response.data)
        setTotalQuestion(response.data.length)
        console.log('****', response.data)
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (isError) return <h1>Error, try again!</h1>
  if (isLoading) return <h1>Loading Question..........................</h1>

  return (
    <div>
      <div className="Quiz">
        {/* {Questions.filter((val) => { */}

        {Questions.filter((val) => val.qNum == currentQuestion + 1).map(
          (val, key) => {
            return (
              <>
                {/* <div className="container mb-3"> */}
                <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                  <p>
                    {val.test_title}:&nbsp;{englib_level}[ 英検
                    {val.eikenLevel}級レベル]&nbsp;
                    <a
                      className="btn-sm btn-primary font-weight-bold mt-3 text-white"
                      onClick={() => {
                        setIsOpenBackMypage(true)
                      }}
                      style={{
                        cursor: 'pointer',
                        paddingLeft: '3px',
                        paddingRight: '3px',
                        paddingTop: '1px',
                        paddingBottom: '3px',
                        width: '25px',
                        height: '25px',
                      }}
                    >
                      X
                    </a>
                  </p>
                </div>
                {/* <h1>
                    {val.qNum}/C.Q:{currentQuestion}/ Length:
                    {Questions.length}/
                  </h1> */}
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
                    {/* /{Questions.length} */}
                    {/* {score}/{currentQuestion} */}
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
                {/* </div> */}
                {val.questionContent != '' && (
                  <div
                    style={{
                      fontSize: '20px',
                      backgroundColor: 'skyblue',
                      padding: '15px',
                      color: 'black',
                      margin: '10px',
                      // marginBottom: '10px',
                      width: '90%',
                      textAlign: 'left',
                    }}
                  >
                    {val.questionContent}
                  </div>
                )}
                {val.questionPic != '' && (
                  <img
                    src={thisImage()}
                    style={{
                      marginBottom: '20px',
                      width: '90%',
                      maxWidth: '780px',
                      height: 'auto',
                    }}
                  />
                )}
                <h5 style={{ fontWeight: 'bold' }}>[Q.{val.qNum}]</h5>

                {val.questionLine1 != '' && (
                  <p
                    style={{
                      width: '90%',
                      maxWidth: '780px',
                      fontSize: '20px',
                      // padding: '15px',
                    }}
                  >
                    {val.questionLine1}
                  </p>
                )}
                {val.questionLine2 != '' && (
                  <p
                    style={{
                      width: '90%',
                      maxWidth: '780px',
                      fontSize: '20px',
                      // padding: '15px',
                    }}
                  >
                    {val.questionLine2}
                  </p>
                )}
                {val.questionLine3 != '' && (
                  <p
                    style={{
                      width: '90%',
                      maxWidth: '780px',
                      fontSize: '20px',
                      // padding: '15px',
                    }}
                  >
                    {val.questionLine3}
                  </p>
                )}
                {val.questionLine4 != '' && (
                  <p
                    style={{
                      width: '90%',
                      maxWidth: '780px',
                      fontSize: '20px',
                      // padding: '15px',
                    }}
                  >
                    {val.questionLine4}
                  </p>
                )}
                {val.questionLine5 != '' && (
                  <p
                    style={{
                      width: '90%',
                      maxWidth: '780px',
                      fontSize: '20px',
                      // padding: '15px',
                    }}
                  >
                    {val.questionLine5}
                  </p>
                )}
                {val.questionLine6 != '' && (
                  <p
                    style={{
                      width: '90%',
                      maxWidth: '780px',
                      fontSize: '20px',
                      // padding: '15px',
                    }}
                  >
                    {val.questionLine6}
                  </p>
                )}
                {val.questionLine8 != '' && (
                  <p
                    style={{
                      width: '90%',
                      maxWidth: '780px',
                      fontSize: '20px',
                      // padding: '15px',
                    }}
                  >
                    {val.questionLine7}
                  </p>
                )}
                {val.questionLine8 != '' && (
                  <p
                    style={{
                      width: '90%',
                      maxWidth: '780px',
                      fontSize: '20px',
                      // padding: '15px',
                    }}
                  >
                    {val.questionLine8}
                  </p>
                )}
                <div className="questions">
                  {val.a != '' &&
                    (nowClickedColor == 'a' ? (
                      <p className="optionSelect">
                        <button
                          onClick={() => {
                            chooseOption('a')
                            clickedColor('a')
                          }}
                          style={{ backgroundColor: 'blue', color: 'white' }}
                        >
                          {val.a}
                        </button>
                      </p>
                    ) : (
                      <p className="optionSelect">
                        <button
                          onClick={() => {
                            chooseOption('a')
                            clickedColor('a')
                          }}
                        >
                          {val.a}
                        </button>
                      </p>
                    ))}

                  {val.b != '' &&
                    (nowClickedColor == 'b' ? (
                      <p className="optionSelect">
                        {' '}
                        <button
                          onClick={() => {
                            chooseOption('b')
                            clickedColor('b')
                          }}
                          style={{ backgroundColor: 'blue', color: 'white' }}
                        >
                          {val.b}
                        </button>
                      </p>
                    ) : (
                      <p className="optionSelect">
                        {' '}
                        <button
                          onClick={() => {
                            chooseOption('b')
                            clickedColor('b')
                          }}
                        >
                          {val.b}
                        </button>
                      </p>
                    ))}

                  {val.c != '' &&
                    (nowClickedColor == 'c' ? (
                      <p className="optionSelect">
                        <button
                          onClick={() => {
                            chooseOption('c')
                            clickedColor('c')
                          }}
                          style={{ backgroundColor: 'blue', color: 'white' }}
                        >
                          {val.c}
                        </button>
                      </p>
                    ) : (
                      <p className="optionSelect">
                        {' '}
                        <button
                          onClick={() => {
                            chooseOption('c')
                            clickedColor('c')
                          }}
                        >
                          {val.c}
                        </button>
                      </p>
                    ))}

                  {val.d != '' &&
                    (nowClickedColor == 'd' ? (
                      <p className="optionSelect">
                        {' '}
                        <button
                          onClick={() => {
                            chooseOption('d')
                            clickedColor('d')
                          }}
                          style={{ backgroundColor: 'blue', color: 'white' }}
                        >
                          {val.d}
                        </button>
                      </p>
                    ) : (
                      <p className="optionSelect">
                        {' '}
                        <button
                          onClick={() => {
                            chooseOption('d')
                            clickedColor('d')
                          }}
                        >
                          {val.d}
                        </button>
                      </p>
                    ))}
                  <hr style={{ marginTop: '30px' }} />
                </div>
                {/* {currentQuestion + 1 == Questions.length ? ( */}
                {/* <h1>
                  {currentQuestion + 1}/{Questions.length}
                </h1> */}
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
          title="テストをやめますか？"
          show={isOpenBackMypage}
          onConfirm={() => handleQuizCancel()}
          onCancel={() => {
            setIsOpenBackMypage(false)
          }}
          confirmBtnText="YES"
          cancelBtnText="NO"
          showCancel={true}
          reverseButtons={true}
          style={{ width: '95%' }}
        >
          <p>途中でやめると練習の履歴が消えます。</p>
        </SweetAlert>
      </div>
    </div>
  )
}

export default Quiz
