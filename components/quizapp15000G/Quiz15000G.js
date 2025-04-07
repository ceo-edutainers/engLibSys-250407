import react, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import axios from 'axios'

import { QuizContext } from '@/components/quizapp15000G/Contexts'
import next from 'next'
import Router, { useRouter } from 'next/router'
import SweetAlert from 'react-bootstrap-sweetalert'
import { myFun_vocaFormJapanese } from '@/components/FunctionComponent'
import SpeechToText from '@/components/voice-to-text/SpeechToText'

const Quiz = () => {
  // const { speak } = useSpeechSynthesis()
  const router = useRouter() //使い方：router.replace('/')
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
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

    axios
      .post(DB_CONN_URL + '/word-study5000-result-insert', {
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
          DB_CONN_URL + '/word-quiz5000-cancel/' + mbn + '&' + quizTempId
        )
      } catch (error) {
        setError5(true)
      }
      setLoading5(false)
    }
    fetchData5()
    router.replace('/mypage') // ここでリダイレクト
  }

  //Study Finish
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
          DB_CONN_URL + '/word-quiz5000-result-finish-insert',
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
      'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/' +
      Questions[currentQuestion].img_ex

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
      // alert('1')
      try {
        const response = await axios.post(
          DB_CONN_URL + '/get-word-study-talkstation',
          {
            quizTempId: quizTempId,
            mbn: mbn,
            voca_group: group,
            voca_day: day,
          }
        )
        // alert(response.data.message)
        // alert(response.data.response[0].img_ex1)
        //alert(response.data.response)
        setQuestions(response.data.response)
        setTotalQuestion(response.data.response.length)
      } catch (error) {
        //alert('catcherror')
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (isError) return <h1>Error, try again!! quiz15000</h1>
  if (isLoading) return <h1>Loading Question..........................</h1>

  return (
    <div>
      <div className="Quiz">
        <div
          className="row"
          style={{
            width: '100%',
            // backgroundColor: 'skyblue',
            borderBottom: '1px solid #dedede',
          }}
        >
          <div className="col-lg-12 text-left"></div>
          <div className="col-lg-10 text-left col-md-10 m-0 pl-2">
            <h5
              style={{
                fontWeight: '600',
                alignItems: 'center',
                color: 'black',
              }}
            >
              {group}-{day}&nbsp;&nbsp;
            </h5>
          </div>
          <div
            className="col-lg-2 text-right col-md-2 m-0 pr-2"
            // style={{ backgroundColor: 'blue' }}
          >
            <a
              className="btn btn-primary font-weight-bold text-white"
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
          </div>
        </div>

        {Questions.filter((val) => val.qNum == currentQuestion + 1).map(
          (val, key) => {
            return (
              <>
                <h2
                  style={{
                    // backgroundColor: '#ececec',
                    fontFamily: 'sans-serif',
                    width: '100%',
                    fontWeight: '800',
                    color: 'blue',
                    marginBottom: 0,
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    paddingBottom: 0,
                    paddingTop: 10,
                  }}
                ></h2>

                <h6 style={{ color: 'black', marginTop: 0, paddingTop: 0 }}>
                  {myFun_vocaFormJapanese(val.voca_form)}
                  &nbsp;/&nbsp; {val.voca_form}
                </h6>

                {val.img_ex != '' && (
                  <img
                    src={thisImage()}
                    style={{
                      marginBottom: '20px',
                      marginTop: '0px',
                      width: '300px',
                      height: 'auto',
                      border: '1px solid #dedede',
                    }}
                  />
                )}
                {/* {val.ex != '' && (
                  <>
                    <TextToSpeechSentence
                      textvalue={val.ex}
                      voiceIndexNum={49}
                      textcolor={'red'}
                      fontsize={'25px'}
                      rates={0.8}
                    />
                   
                  </>
                )}

                {val.Japanese != '' && (
                  <>
                    <TextToSpeechSentence
                      textvalue={val.Japanese}
                      voiceIndexNum={58}
                      textcolor={'black'}
                      fontsize={'15px'}
                      rates={1}
                    />
                  </>
                )} */}

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
                        className="btn btn-danger mt-4 mb-2"
                        onClick={() => {
                          //setNextQInsert('insert')
                          setOptionChosen('') //答えを選ばなかった時に、前の質問の答えが残らないようにする
                          nextQuestion(optionChosen, currentQuestion)
                        }}
                        id="nextQuestion"
                      >
                        NEXT 次
                      </button>
                    </div>
                  </>
                )}
                <p style={{ marginBottom: 0, paddingBottom: 0 }}>
                  {/* {currentQuestion + 1}/{Questions.length}問 */}
                  {val.qNum}/{Questions.length}単語中&nbsp;
                </p>
              </>
            )
          }
        )}
        <SweetAlert
          title="練習をやめますか？"
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
