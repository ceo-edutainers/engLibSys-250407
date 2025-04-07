//quizapp_big_design.css
import react, { useState, useContext, useEffect, useMemo } from 'react'
import axios from 'axios'
import { QuizContext } from './Contexts'
import Router, { useRouter } from 'next/router'

import PointBar from '@/components/Output_ShowAndTell/PointBar'
import MonsterGet from '@/components/Output_ShowAndTell/MonsterGet'
import StepBarOST from '@/components/Output_ShowAndTell/StepBarOST'
import WordCounter from '@/components/Output_ShowAndTell/WordCounter'
import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/

import StepTitle from '@/components/Output_ShowAndTell/StepTitle'
import StepImportantWords2 from '@/components/Output_ShowAndTell/StepImportantWords2'
import OutlineSample from '@/components/Output_ShowAndTell/SampleOutline'
import Subpage from '@/components/Output_ShowAndTell/SubpageStep2'

const Step2OST = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const router = useRouter() //使い方：router.replace('/')

  let audioRightAnswer = new Audio(
    'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/dingdongdang.mp3'
  )
  let audioWrongAnswer = new Audio(
    'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/wrong-answer.mp3'
  )
  ////////////////////////////////////////////////////////////////////
  //SETTING START
  ////////////////////////////////////////////////////////////////////
  //最低何回録音すれば次のステップへ行けるのか
  // const [goalText, setGoalText] = useState('最低' + leastRecordCount + '回音読')
  const [currentStep, setCurrentStep] = useState('Step2OST') //
  const [pointKeyNum, setPointKeyNum] = useState('ST-2') //DBのsys_point_set テーブルの pointKeyNum
  // const [osusumeLetterSum, setOsusumeLetterSum] = useState(200)
  const [pageTitle, setPageTitle] = useState('アウトラインを書く')
  const [pageTitleSub, setPageTitleSub] = useState(
    'マインドマップを元にアウトラインを書こう！'
  )

  const [subpageTitle, setSubpageTitle] = useState('アウトラインの書き方')
  const [firstOrder, setFirstOrder] = useState(
    '①&nbsp;Step1で作成したマインドマップに書いた単語や表現を使って、短い文章をたくさん作成してみます。'
  ) //Step1で作成したマインドマップに書いた単語や表現を使って、短い文章をたくさん作成してみましょう。
  const [secondOrder, setSecondOrder] = useState(
    '②&nbsp;文章を書くときに、知らない単語や表現は日英辞書で調べて使ってみます。'
  )
  const [thirdOrder, setThirdOrder] = useState(
    '③&nbsp;決められた単語数以上を書いてください。(レッスン前までに指定された単語数以上書かないとポイントは獲得できません。)'
  )
  const [fourthOrder, setFourthOrder] = useState('')
  const [fifthOrder, setFifthOrder] = useState('')
  const [kizukiTitle, setKizukiTitle] = useState('このステップの気づきポイント')
  const [kizukiDetail, setKizukiDetail] = useState(
    '最初に聴く音声でシャドーイングをしてみることで、自分ができない部分を気づくことができます。そして、この音声を練習最後の日の録音音声と比較することで、成長を感じることができます。'
  )
  const [whyThisStepTitle, setWhythisStepTitle] = useState(
    'なぜスクリプトの前にアウトラインを書くのか?'
  )
  const [whyThisStep, setWhythisStep] = useState(
    'アウトラインを書く際には、Introduction、 Body、 Conclusionのパーツ毎に文章の流れを考えながら自分の要点を簡単なセンテンスでリスト化します。アウトラインを作成すると、文章のポイントを忘れずに、それぞれのセンテンスを指針に詳しい説明を付け加えていくことでスクリプトを書くことができます。'
  )

  const [stepWords1, setStepWords1] = useState('文法意識')
  const [stepWords2, setStepWords2] = useState('')
  const [stepWords3, setStepWords3] = useState('')

  const [outlineTopic, setOutlineTopic] = useState('')
  const [outlineIntroduction, setOutlineIntroduction] = useState('')
  const [outlineBody, setOutlineBody] = useState('')
  const [outlineConclusion, setOutlineConclusion] = useState('')

  const [outlineTopicWordLength, setOutlineTopicWordLength] = useState(0)
  const [outlineIntroductionWordLength, setOutlineIntroductionWordLength] =
    useState(0)
  const [outlineBodyWordLength, setOutlineBodyWordLength] = useState(0)
  const [outlineConclusionWordLength, setOutlineConclusionWordLength] =
    useState(0)

  const [wordsum, setWordsum] = useState()

  ////////////////////////////////////////////////////////////////////
  //SETTING END
  ////////////////////////////////////////////////////////////////////
  const [isAudioPlaying, setIsAudioPlaying] = useState(false) //Main Storyの音声がPlayされたらtrueになる。必ず音声を聴きながらやるページで必要

  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味
  const [Questions, setQuestions] = useState([]) //DBから本ののデータを持ってきて入れる
  const [HWWritingInfo, setHWWritingInfo] = useState([]) //DBからHWのデータを持ってきて入れる
  const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  const [nowClickedColor, setNowClickedColor] = useState('') //クリックした答えのボタンの色が変わる
  const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる
  const [audioDurtaionFromDB, setAudioDurtaionFromDB] = useState(0)
  const [recordingCountForNextStep, setRecordingCountForNextStep] = useState(0)
  // const [nextQInsert, setNextQInsert] = useState('')

  const {
    myMbn,
    setMyMbn,
    teacherName,
    setTeacherName,
    tbn,
    setTbn,
    HWID,
    setHWID,
    yoyakuDate,
    setYoyakuDate,
    yoyakuTime,
    setYoyakuTime,
    thisSubject,
    setThisSubject,
    storyTitle,
    setStoryTitle,
    practiceTempId,
    setPracticeTempId,
    audioOnOff,
    setAudioOnOff,
    course,
    setCourse,
    courseName,
    setCourseName,
    pageView,
    setPageView,
    courseLevel,
    setCourseLevel,
    userName,
    setUserName,
    point,
    setPoint,
    outlineLimitWords,
    setOutlineLimitWords,
    scriptLimitWords,
    setScriptLimitWords,
    showandtell_type,
    setShowandtell_type,
  } = useContext(QuizContext)
  const handlePracticeRest = () => {
    //練習をやめる時

    setIsOpenBackMypage(false)

    var nextStep = ''
    // alert('in handlePracticeRest')
    // alert(stepStatus)
    // alert('currentStep')
    // alert(currentStep)
    // alert('nextStep')
    // alert(nextStep)
    localStorage.setItem('holdTempIdOST', practiceTempId)
    hwHistoryUpdate(currentStep, 'holding', HWID, practiceTempId, nextStep)
  }
  const hwHistoryUpdate = (
    currentStep,
    stepStatus,
    homework_id,
    practiceTempId,
    nextStep
  ) => {
    var mbn = localStorage.getItem('MypageMbn')
    var url = DB_CONN_URL + '/update-sys-hw-history/'
    axios

      .put(
        url +
          mbn +
          '&' +
          homework_id +
          '&' +
          practiceTempId +
          '&' +
          currentStep +
          '&' +
          stepStatus +
          '&' +
          thisSubject
      )

      .then((response) => {
        if (stepStatus == 'holding') {
          addWriting()
          router.reload('/outputShowAndTellCourse') // ここでリロード
        } else if (stepStatus == 'end') {
          addWriting()
          insertPointToDB()
          setPageView(nextStep)
        }
      })
  }
  const addWriting = () => {
    var mbn = localStorage.getItem('MypageMbn')
    if (outlineTopic == '') {
      setOutlineTopic('&nbps;')
    }
    if (outlineIntroduction == '') {
      setOutlineIntroduction('&nbps;')
    }
    if (outlineBody == '') {
      setOutlineBody('&nbps;')
    }
    if (outlineConclusion == '') {
      setOutlineConclusion('&nbps;')
    }
    var url = DB_CONN_URL + '/reg-sys-hw-show-and-tell-writing'
    axios
      .post(url, {
        mbn: mbn,
        subject: thisSubject,
        homework_id: HWID,
        practiceTempId: practiceTempId,
        step: currentStep,
        outline_topic: outlineTopic,
        outline_introduction: outlineIntroduction,
        outline_body: outlineBody,
        outline_conclusion: outlineConclusion,
      })
      .then((response) => {
        //console.log(response.data.message)
        if (!response.data.status) {
          //alert(response.data.message)
        } else {
        }
      })
  }

  const nextStepCheck = (option, arrayNum) => {
    //check word total <200

    // alert(wordsum)
    if (wordsum < outlineLimitWords) {
      setIsCantGoNextPage(true)
    } else {
      setIsGoNextPage(true)
    }
  }
  const nextStep = (option, arrayNum) => {
    const fetchData = async () => {
      try {
        // const response =
        // await axios.get(Url).then((response) => {
        var stepStatus = 'end'
        var nextStep = 'Step3OST'
        hwHistoryUpdate(currentStep, stepStatus, HWID, practiceTempId, nextStep)

        practiceStart(nextStep)

        // })
      } catch (error) {
        alert('select error!')
      }
    }

    fetchData()
    // }
  }

  const practiceStart = (nextStep) => {
    //次のStep2OSTのsys_hw_historyテーブルのstepStatusがendになっている場合は、Step3OSTにいく。
    //왜냐하면, Step2OST은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
        var homework_id = HWID
        var step = nextStep
        var pti = practiceTempId
        var url = DB_CONN_URL + '/reg-sys-hw-history'
        axios
          .post(url, {
            mbn: myMbn,
            homework_id: homework_id,
            step: step,
            practiceTempId: pti,
            thisSubject: thisSubject,
          })
          .then((response) => {
            if (!response.data.status) {
            } else {
              setPageView(nextStep)
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  const wordTotalSum = () => {
    // console.log('#outlineTopicWordLength', outlineTopicWordLength)
    // console.log('#outlineIntroductionWordLength', outlineIntroductionWordLength)
    // console.log('#outlineBodyWordLength', outlineBodyWordLength)
    // console.log('#outlineConclusionWordLength', outlineConclusionWordLength)

    // var ws = parseInt(
    //   outlineTopic.split(' ').length +
    //     outlineIntroduction.split(' ').length +
    //     outlineBody.split(' ').length +
    //     outlineConclusion.split(' ').length
    // )
    var ws = parseInt(
      outlineTopicWordLength +
        outlineIntroductionWordLength +
        outlineBodyWordLength +
        outlineConclusionWordLength
    )

    console.log('ws', ws)
    setWordsum(ws)
  }

  const insertPointToDB = () => {
    var mbn = localStorage.getItem('MypageMbn')
    var pointStep = currentStep
    //alert(pointKeyNum)

    if (wordsum > 199) {
      var url = DB_CONN_URL + '/sys-point-member-history-insert-show-and-tell'
      axios
        .post(url, {
          mbn: mbn,
          homework_id: HWID,
          pointKeyNum: pointKeyNum,
          pointStep: pointStep,
          practiceTempId: practiceTempId,
        })
        .then((response) => {
          // alert(response.data.status)
          if (!response.data.status) {
            // alert(response.data.message) //for test
            //alert('ポイントゲット!!!')
            // console.log('##pointKeyNum', pointKeyNum)
            // console.log('##HWID', HWID)
            // console.log('##currentStep', currentStep)
            // console.log('##practiceTempId', practiceTempId)
          } else {
            // alert(response.data.message)
          }
        })
    }
  }
  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')

    var url = DB_CONN_URL + '/get-hw-show-and-tell-writing-info/'
    var Url = url + mbn + '&' + HWID + '&' + currentStep

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)

        if (response.data.length > 0) {
          //setHWWritingInfo(response.data)
          setOutlineTopic(response.data[0].outline_topic.trim())

          // setOutlineTopic(response.data[0].outline_topic.trim())
          setOutlineIntroduction(response.data[0].outline_introduction.trim())
          setOutlineBody(response.data[0].outline_body.trim())
          setOutlineConclusion(response.data[0].outline_conclusion.trim())
          // alert('here2')
          setOutlineTopicWordLength(
            response.data[0].outline_topic.trim().split(' ').length
          )
          setOutlineIntroductionWordLength(
            response.data[0].outline_introduction.trim().split(' ').length
          )
          setOutlineBodyWordLength(
            response.data[0].outline_body.trim().split(' ').length
          )
          setOutlineConclusionWordLength(
            response.data[0].outline_conclusion.trim().split(' ').length
          )

          var sum = parseInt(
            response.data[0].outline_topic.trim().split(' ').length +
              response.data[0].outline_introduction.trim().split(' ').length +
              response.data[0].outline_body.trim().split(' ').length +
              response.data[0].outline_conclusion.trim().split(' ').length
          )

          if (
            response.data[0].outline_topic.trim() == '' &&
            response.data[0].outline_introduction.trim() == '' &&
            response.data[0].outline_body.trim() == '' &&
            response.data[0].outline_conclusion.trim() == ''
          ) {
            // alert('here1')
            setWordsum(0)
          } else {
            // alert('here2')
            setWordsum(sum)
          }
        } else {
          setOutlineTopic('')

          // setOutlineTopic(response.data[0].outline_topic.trim())
          setOutlineIntroduction('')
          setOutlineBody('')
          setOutlineConclusion('')
          // alert('here2')
          setOutlineTopicWordLength(0)
          setOutlineIntroductionWordLength(0)
          setOutlineBodyWordLength(0)
          setOutlineConclusionWordLength(0)
          setWordsum(0)
        }
        // alert(sum)
      } catch (error) {
        // alert('3')
        console.log(error)
        setError(true)
      }

      setLoading(false)
    }

    fetchData()
  }, [])
  // alert(isError)
  if (isError) return <h1>Error, try again! step..2 </h1>
  if (isLoading) return <h1>Loading Page..........................</h1>

  return (
    // <div>
    <>
      <div className="QuizBigShowandtell mb-0 pb-0" style={{ border: 0 }}>
        <div className="row">
          <div className="col-lg-12 col-md-6">
            <MonsterGet />
          </div>
          {/* <div className="col-lg-3 col-md-6">
            <FireView thisSubject={thisSubject} />
         
          </div> */}
        </div>
      </div>

      <PointBar
        cStep={pageView}
        pageTitle="SHOW AND TELL"
        bcolor="orange"
        pointKeyNum={pointKeyNum}
      />
      <StepBarOST cStep={pageView} />
      <div className="QuizBigShowandtell" style={{ backgroundColor: 'white' }}>
        <div className="container">
          {/* {HWWritingInfo.map((val, key) => { */}
          {/* return ( */}
          <>
            <div className="row align-items-center">
              <div
                className="col-lg-8 col-md-6"
                style={{ textAlign: 'center' }}
              >
                <StepTitle pageTitle={pageTitle} pageTitleSub={pageTitleSub} />
                <img
                  src="/images/homework-typing.png"
                  style={{
                    height: '50px',
                    width: 'auto',
                    marginRight: '20px',
                  }}
                />
                <img
                  src="/images/homework-upload.png"
                  style={{ height: '50px', width: 'auto' }}
                />
              </div>
              <div
                className="col-lg-4 col-md-0"
                style={{ textAlign: 'center' }}
              >
                <StepImportantWords2 stepWords1={stepWords1} />
              </div>

              <div className="col-lg-12 col-md-12 mb-0 mt-3 ">
                <Subpage
                  firstOrder={firstOrder}
                  secondOrder={secondOrder}
                  thirdOrder={thirdOrder}
                  fourthOrder={fourthOrder}
                  fifthOrder={fifthOrder}
                  subpageTitle={subpageTitle}
                  whyThisStepTitle={whyThisStepTitle}
                  whyThisStep={whyThisStep}
                  currentStep={currentStep}
                />
              </div>
              <div className="col-lg-12 col-md-12 mt-0 mb-3 pt-0 ">
                <OutlineSample />
              </div>

              <div className="col-lg-12 col-md-12 mt-0 mb-3 pt-0 ">
                <h5>
                  <font>現在</font>
                  <font style={{ color: 'red', fontSize: '40px' }}>
                    <b>{wordsum}</b>
                  </font>
                  <font>単語</font>&nbsp;/&nbsp;
                  <font size="8px" color="darkgreen">
                    <b>{outlineLimitWords}</b>単語以上
                  </font>
                </h5>
                <label
                  for="story"
                  style={{
                    display: 'block',
                    marginBottom: '10px',
                    textAlign: 'left',
                  }}
                >
                  <h5>
                    <b>TOPIC</b>&nbsp;
                    <font color="darkgreen">
                      <b>{outlineTopicWordLength}</b>/Total:{wordsum}
                    </font>
                  </h5>
                </label>
                <textarea
                  spellcheck="false"
                  id="story"
                  name="outline_topic"
                  rows="2"
                  cols="33"
                  style={{
                    fontSize: '.8rem',
                    letterSpacing: '1px',
                    padding: '10px',
                    width: '100%',
                    maxWidth: '100%',
                    lineHeight: '1.5',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '1px 1px 1px #999',
                    fontSize: '20px',
                  }}
                  value={outlineTopic}
                  onChange={(e) => {
                    setOutlineTopic(
                      e.target.value.replace('  ', ' ').replace('　', ' ')
                    )
                    setOutlineTopicWordLength(e.target.value.split(' ').length)

                    wordTotalSum()
                  }}
                ></textarea>
                {/* {outlineTopicWordLength} */}
                <label
                  for="story"
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    textAlign: 'left',
                    marginTop: '20px',
                  }}
                >
                  <h5>
                    <b>INTRODUCTION</b>&nbsp;
                    <font color="darkgreen">
                      <b>{outlineIntroductionWordLength}</b>/Total:{wordsum}
                    </font>
                  </h5>
                </label>
                <textarea
                  spellcheck="false"
                  id="story"
                  name="outline_introduction"
                  rows="10"
                  cols="33"
                  style={{
                    fontSize: '.8rem',
                    letterSpacing: '1px',
                    padding: '10px',
                    width: '100%',
                    maxWidth: '100%',
                    lineHeight: '1.5',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '1px 1px 1px #999',
                    fontSize: '20px',
                    paddingTop: 0,
                    backgroundColor: 'white',
                    overflowY: 'auto',
                    overflowX: 'auto',
                  }}
                  value={outlineIntroduction}
                  onChange={(e) => {
                    setOutlineIntroduction(
                      e.target.value.replace('  ', ' ').replace('　', ' ')
                    )
                    setOutlineIntroductionWordLength(
                      e.target.value.split(' ').length
                    )
                    wordTotalSum()
                  }}
                ></textarea>
                <label
                  for="story"
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    textAlign: 'left',
                    marginTop: '20px',
                  }}
                >
                  <h5>
                    <b>BODY</b>&nbsp;
                    <font color="darkgreen">
                      <b>{outlineBodyWordLength}</b>/Total:{wordsum}
                    </font>
                  </h5>
                </label>
                <textarea
                  spellcheck="false"
                  id="story"
                  name="outline_introduction"
                  rows="20"
                  cols="33"
                  style={{
                    fontSize: '.8rem',
                    letterSpacing: '1px',
                    padding: '10px',
                    width: '100%',
                    maxWidth: '100%',
                    lineHeight: '1.5',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '1px 1px 1px #999',
                    fontSize: '20px',
                  }}
                  value={outlineBody}
                  onChange={(e) => {
                    setOutlineBody(
                      e.target.value.replace('  ', ' ').replace('　', ' ')
                    )
                    setOutlineBodyWordLength(e.target.value.split(' ').length)
                    wordTotalSum()
                  }}
                ></textarea>{' '}
                <label
                  for="story"
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    textAlign: 'left',
                    marginTop: '20px',
                  }}
                >
                  <h5>
                    <b>CONCLUSION</b>&nbsp;
                    <font color="darkgreen">
                      <b>{outlineConclusionWordLength}</b>/Total:{wordsum}
                    </font>
                  </h5>
                </label>
                <textarea
                  spellcheck="false"
                  id="story"
                  name="outline_introduction"
                  rows="5"
                  cols="33"
                  style={{
                    fontSize: '.8rem',
                    letterSpacing: '1px',
                    padding: '10px',
                    width: '100%',
                    maxWidth: '100%',
                    lineHeight: '1.5',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '1px 1px 1px #999',
                    fontSize: '20px',
                  }}
                  value={outlineConclusion}
                  onChange={(e) => {
                    setOutlineConclusion(
                      e.target.value.replace('  ', ' ').replace('　', ' ')
                    )
                    setOutlineConclusionWordLength(
                      e.target.value.split(' ').length
                    )
                    wordTotalSum()
                  }}
                ></textarea>
              </div>
            </div>
          </>
          {/* // ) // })} */}
          {/* <SpeechToText mbn={myMbn} /> */}
          {currentStep == 'Step5' ? (
            <>
              <button
                className="btn btn-danger mt-1"
                onClick={() => {
                  finishQuiz(optionChosen, currentStep)
                }}
                id="nextStep"
              >
                Finish Today's Study
              </button>
            </>
          ) : (
            <>
              <div className="row">
                {/* <MediaQuery query="(min-width: 767px)"> */}
                <div className="col-lg-6 col-md-12">
                  <div
                    className="banner-content"
                    style={{ paddingTop: '20px' }}
                  >
                    <a
                      onClick={() => {
                        setIsOpenBackMypage(true)
                      }}
                    >
                      <button
                        style={{ width: '200px', fontWeight: 'bold' }}
                        className="btn btn-info mt-0 mb-2"
                        id="nextStep"
                      >
                        一旦休憩する
                      </button>
                    </a>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div
                    className="banner-content"
                    style={{ paddingTop: '20px' }}
                  >
                    <button
                      style={{
                        width: '200px',
                        fontWeight: 'bold',
                        backgroundColor: '#333888',
                        border: 0,
                      }}
                      className="btn btn-primary mt-0 mb-2"
                      onClick={() => {
                        nextStepCheck()
                      }}
                      id="nextStep"
                    >
                      次のステップへ
                    </button>
                  </div>
                </div>
                {/* </MediaQuery> */}
                {/* <MediaQuery query="(max-width: 767px)">
                  <div className="col-lg-6 col-md-12 mt-5">
                    <div
                      className="banner-content"
                      style={{ paddingTop: '0px' }}
                    >
                      <a
                        onClick={() => {
                          setIsOpenBackMypage(true)
                        }}
                      >
                        <button
                          style={{
                            width: '200px',
                            fontWeight: 'bold',
                          }}
                          className="btn btn-info mt-0 mb-2"
                          id="nextStep"
                        >
                          今日の練習をやめる
                        </button>
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="banner-content">
                      <button
                        style={{
                          width: '200px',
                          fontWeight: 'bold',
                          backgroundColor: '#333888',
                          border: 0,
                        }}
                        className="btn btn-primary mt-0 mb-2"
                        onClick={() => {
                          nextStepCheck()
                        }}
                        id="nextStep"
                      >
                        次のステップへ
                      </button>
                    </div>
                  </div>
                </MediaQuery> */}
              </div>
            </>
          )}
          {/* })} */}
          <SweetAlert
            title="一旦休憩しますか？"
            show={isOpenBackMypage}
            onConfirm={() => handlePracticeRest()}
            onCancel={() => {
              setIsOpenBackMypage(false)
            }}
            confirmBtnText="休憩する"
            cancelBtnText="戻る"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '600px' }}
          >
            {/* <p>
              次のステップに行く前に途中でやめると、このステップでゲットしたポイントは消えてしまいます。
            </p> */}
          </SweetAlert>
          <SweetAlert
            title="次のステップに行きますか？"
            show={isGoNextPage}
            onConfirm={() => nextStep()}
            onCancel={() => {
              setIsGoNextPage(false)
            }}
            confirmBtnText="YES"
            cancelBtnText="NO"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '500px' }}
          >
            {/* <p></p> */}
          </SweetAlert>
          <SweetAlert
            title="単語数が足りません。"
            show={isCantGoNextPage}
            onConfirm={() => nextStep()}
            onCancel={() => {
              setIsCantGoNextPage(false)
            }}
            confirmBtnText="今は書かずにそのまま次に進む"
            cancelBtnText="戻って書く"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '600px', backgroundColor: '#afeeee' }}
          >
            <p>
              {outlineLimitWords}
              単語以上書いてください。 {outlineLimitWords}
              単語以上で30ポイント獲得できます。
            </p>
          </SweetAlert>
        </div>
      </div>
    </>
  )
}

export default Step2OST
