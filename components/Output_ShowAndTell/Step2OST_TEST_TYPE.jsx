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
import YourSelect from '@/components/Output_ShowAndTell/YourSelectStep2'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/

import StepTitle from '@/components/Output_ShowAndTell/StepTitle'
import StepImportantWords2 from '@/components/Output_ShowAndTell/StepImportantWords2'
import OutlineSample from '@/components/Output_ShowAndTell/SampleOutline'
import Subpage from '@/components/Output_ShowAndTell/SubpageStep2_2'

const Step2OST = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')
  const [testwriting, setTestwriting] = useState('')
  const viewTest =
    '[意見 your opinion]<br /> <br />&nbsp;&nbsp;&nbsp;&nbsp;&#8594;[理由 reason①]<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8594;[具体例 example①] <br /> <br />&nbsp;&nbsp;&nbsp;&nbsp;&#8594;[理由 reason②] <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8594;[具体例 example②]'

  const [exampleView, setExampleView] = useState(false)

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
  const [pageTitle, setPageTitle] = useState('メモを書く')
  const [pageTitleSub, setPageTitleSub] = useState(
    '本格的にスクリプトを書く前にメモを書こう！'
  )

  const [subpageTitle, setSubpageTitle] = useState('メモの書き方')
  const [firstOrder, setFirstOrder] = useState(
    '①&nbsp;選んだトピックをセンテンス毎に箇条書きにしてみる。'
  )
  const [secondOrder, setSecondOrder] = useState(
    // '②&nbsp;英語で思いつかない単語は、日英辞書で調べて使ってみる。'
    '②&nbsp;英語で書けない場合は、日本語で書いて英語で直してみる'
  )
  const [thirdOrder, setThirdOrder] = useState('')
  const [fourthOrder, setFourthOrder] = useState('')
  const [fifthOrder, setFifthOrder] = useState('')
  const [kizukiTitle, setKizukiTitle] = useState('このステップの気づきポイント')
  const [kizukiDetail, setKizukiDetail] = useState(
    '最初に聴く音声でシャドーイングをしてみることで、自分ができない部分を気づくことができます。そして、この音声を練習最後の日の録音音声と比較することで、成長を感じることができます。'
  )
  const [whyThisStepTitle, setWhythisStepTitle] = useState(
    'なぜスクリプトを書く前にメモを書くのか?'
  )
  const [whyThisStep, setWhythisStep] = useState(
    'メモを書くと、文章のポイントを忘れずに、それぞれのセンテンスを指針に詳しい説明を付け加えていくことでスクリプトを書くことができます。メモを書く際には、文章の流れを考えながら自分の要点を簡単な単語・フレーズにしてください。'
  )

  const [stepWords1, setStepWords1] = useState('あなたのレベル')
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
    showandtellTitle,
    setShowandtellTitle,
    showandtellTitle_yourLanguage,
    setShowandtellTitle_yourLanguage,
    showandtellTitle_Level,
    setShowandtellTitle_Level,
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
  // const hwHistoryUpdate = (
  //   currentStep,
  //   stepStatus,
  //   homework_id,
  //   practiceTempId,
  //   nextStep
  // ) => {
  //   var mbn = localStorage.getItem('MypageMbn')
  //   var url = DB_CONN_URL + '/update-sys-hw-history/'
  //   axios

  //     .put(
  //       url +
  //         mbn +
  //         '&' +
  //         homework_id +
  //         '&' +
  //         practiceTempId +
  //         '&' +
  //         currentStep +
  //         '&' +
  //         stepStatus +
  //         '&' +
  //         thisSubject
  //     )

  //     .then((response) => {
  //       if (stepStatus == 'holding') {
  //         addWriting()
  //         router.reload('/outputShowAndTellCourse') // ここでリロード
  //       } else if (stepStatus == 'end') {
  //         addWriting()
  //         insertPointToDB()
  //         setPageView(nextStep)
  //       }
  //     })
  // }

  const hwHistoryUpdate = async (
    currentStep,
    stepStatus,
    homework_id,
    practiceTempId,
    nextStep
  ) => {
    const mbn = localStorage.getItem('MypageMbn')

    try {
      const response = await axios.post(
        `${DB_CONN_URL}/update-sys-hw-history`,
        {
          mbn,
          homework_id,
          practiceTempId,
          currentStep,
          stepStatus,
          thisSubject, // thisSubject는 컴포넌트 내에서 선언된 상태값으로 유지
        }
      )

      if (response.data.status) {
        // alert('here1-1', response.data.message)
        if (stepStatus === 'holding') {
          addWriting()
          router.reload('/outputShowAndTellCourse')
        } else if (stepStatus === 'end') {
          addWriting()
          insertPointToDB()
          setPageView(nextStep)
        }
      } else {
        console.warn('❌ DB update failed:', response.data.message)
      }
    } catch (error) {
      console.error('❌ Failed to update hwHistory:', error)
    }
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
    var url = DB_CONN_URL + '/reg-sys-hw-show-and-tell-writing-for-test-type'
    axios
      .post(url, {
        mbn: mbn,
        subject: thisSubject,
        homework_id: HWID,
        practiceTempId: practiceTempId,
        step: currentStep,
        // outline_topic: outlineTopic,
        // outline_introduction: outlineIntroduction,
        outline_body: outlineBody,
        // outline_conclusion: outlineConclusion,
      })
      .then((response) => {
        console.log('❌ TEST-response-1:', response.data.message)

        if (!response.data.status) {
          //alert(response.data.message)
        } else {
        }
      })
  }

  const nextStepCheck = (option, arrayNum) => {
    //check word total <200

    setIsGoNextPage(true)
  }
  const nextStep = (option, arrayNum) => {
    const fetchData = async () => {
      try {
        var stepStatus = 'end'
        var nextStep = 'Step3OST'
        hwHistoryUpdate(currentStep, stepStatus, HWID, practiceTempId, nextStep)

        practiceStart(nextStep)
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

    // if (wordsum > 199) {
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
        } else {
          // alert(response.data.message)
        }
      })
    // }
  }
  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  // useEffect(() => {
  //   var mbn = localStorage.getItem('MypageMbn')

  //   // var url = DB_CONN_URL + '/get-hw-show-and-tell-writing-info/'
  //   // var Url = url + mbn + '&' + HWID + '&' + currentStep

  //   const Url = `${DB_CONN_URL}/get-hw-show-and-tell-writing-info?mbn=${mbn}&hwid=${HWID}&step=${currentStep}`

  //   const fetchData = async () => {
  //     setError(false)
  //     setLoading(true)

  //     try {
  //       const response = await axios.get(Url)

  //       if (response.data.length > 0) {
  //         //setHWWritingInfo(response.data)
  //         setOutlineTopic(response.data[0].outline_topic.trim())

  //         // setOutlineTopic(response.data[0].outline_topic.trim())
  //         setOutlineIntroduction(response.data[0].outline_introduction.trim())
  //         setOutlineBody(response.data[0].outline_body.trim())
  //         setOutlineConclusion(response.data[0].outline_conclusion.trim())
  //         // alert('here2')
  //         setOutlineTopicWordLength(
  //           response.data[0].outline_topic.trim().split(' ').length
  //         )
  //         setOutlineIntroductionWordLength(
  //           response.data[0].outline_introduction.trim().split(' ').length
  //         )
  //         setOutlineBodyWordLength(
  //           response.data[0].outline_body.trim().split(' ').length
  //         )
  //         setOutlineConclusionWordLength(
  //           response.data[0].outline_conclusion.trim().split(' ').length
  //         )

  //         var sum = parseInt(
  //           response.data[0].outline_topic.trim().split(' ').length +
  //             response.data[0].outline_introduction.trim().split(' ').length +
  //             response.data[0].outline_body.trim().split(' ').length +
  //             response.data[0].outline_conclusion.trim().split(' ').length
  //         )

  //         if (
  //           response.data[0].outline_topic.trim() == '' &&
  //           response.data[0].outline_introduction.trim() == '' &&
  //           response.data[0].outline_body.trim() == '' &&
  //           response.data[0].outline_conclusion.trim() == ''
  //         ) {
  //           // alert('here1')
  //           setWordsum(0)
  //         } else {
  //           // alert('here2')
  //           setWordsum(sum)
  //         }
  //       } else {
  //         setOutlineTopic('')

  //         // setOutlineTopic(response.data[0].outline_topic.trim())
  //         setOutlineIntroduction('')
  //         setOutlineBody('')
  //         setOutlineConclusion('')
  //         // alert('here2')
  //         setOutlineTopicWordLength(0)
  //         setOutlineIntroductionWordLength(0)
  //         setOutlineBodyWordLength(0)
  //         setOutlineConclusionWordLength(0)
  //         setWordsum(0)
  //       }
  //       // alert(sum)
  //     } catch (error) {
  //       // alert('3')
  //       console.log(error)
  //       setError(true)
  //     }

  //     setLoading(false)
  //   }

  //   fetchData()
  // }, [])

  useEffect(() => {
    const mbn = localStorage.getItem('MypageMbn')
    // const Url = `${DB_CONN_URL}/get-hw-show-and-tell-writing-info?mbn=${mbn}&hwid=${HWID}&step=${currentStep}`
    const Url = `${DB_CONN_URL}/get-hw-show-and-tell-writing-info/${mbn}&${HWID}&${currentStep}`

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)
        console.log('❌ message', response.data.message)
        if (Array.isArray(response.data) && response.data.length > 0) {
          console.log('❌ length', response.data.length)
          const data = response.data[0]

          const topic = data.outline_topic?.trim() || ''
          const intro = data.outline_introduction?.trim() || ''
          const body = data.outline_body?.trim() || ''
          const concl = data.outline_conclusion?.trim() || ''

          setOutlineTopic(topic)
          setOutlineIntroduction(intro)
          setOutlineBody(body)
          setOutlineConclusion(concl)

          setOutlineTopicWordLength(topic.split(' ').length)
          setOutlineIntroductionWordLength(intro.split(' ').length)
          setOutlineBodyWordLength(body.split(' ').length)
          setOutlineConclusionWordLength(concl.split(' ').length)

          const sum =
            topic.split(' ').length +
            intro.split(' ').length +
            body.split(' ').length +
            concl.split(' ').length

          if (topic === '' && intro === '' && body === '' && concl === '') {
            setWordsum(0)
          } else {
            setWordsum(sum)
          }
        } else {
          // 데이터가 없을 때 초기화
          setOutlineTopic('')
          setOutlineIntroduction('')
          setOutlineBody('')
          setOutlineConclusion('')
          setOutlineTopicWordLength(0)
          setOutlineIntroductionWordLength(0)
          setOutlineBodyWordLength(0)
          setOutlineConclusionWordLength(0)
          setWordsum(0)
        }
      } catch (error) {
        console.error('❌ fetchData error:', error)
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
                {/* <img
                  src="/images/homework-upload.png"
                  style={{ height: '50px', width: 'auto' }}
                /> */}
              </div>
              <div
                className="col-lg-4 col-md-0"
                style={{ textAlign: 'center' }}
              >
                <StepImportantWords2
                  stepWords1={stepWords1}
                  stepWords2={showandtellTitle_Level}
                  stepWords3={stepWords3}
                />
              </div>

              {/* <div className="col-lg-12 col-md-12 mb-0 mt-3 ">
                <Subpage
                  firstOrder={firstOrder}
                  secondOrder={secondOrder}
                  // thirdOrder={thirdOrder}
                  // fourthOrder={fourthOrder}
                  // fifthOrder={fifthOrder}
                  subpageTitle={subpageTitle}
                  whyThisStepTitle={whyThisStepTitle}
                  whyThisStep={whyThisStep}
                  currentStep={currentStep}
                />
              </div> */}
              <div className="col-lg-12 col-md-12 mt-0 mb-3 pt-0 ">
                <YourSelect
                  stitle={showandtellTitle}
                  syouttitle={showandtellTitle_yourLanguage}
                  slevel={showandtellTitle_Level}
                />
              </div>

              <div className="col-lg-12 col-md-12 mt-0 mb-3 pt-0 ">
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
                    <b>メモを書く</b>&nbsp;
                    {/* <font color="darkgreen">
                      <b>{outlineIntroductionWordLength}</b>/Total:{wordsum}
                    </font> */}
                  </h5>
                  <p>
                    以下のテンプレートを参考にしてメモ書いてください。もっと追加したい場合は項目を追加して書いても大丈夫です。{' '}
                    <br />
                    最初から英語で書けない場合は、まず日本語で書いてから英語で直してください。
                  </p>
                  <p>&#9635;[意見 your opinion]</p>
                  <p>&#9654;[理由 reason①]</p>
                  <p>&#8594;[具体例 example①]</p>
                  <p>&#9654;[理由 reason②]</p>
                  <p>&#8594;[具体例 example②]</p>
                  {showandtellTitle_Level == 'Level5' ||
                    (showandtellTitle_Level == 'Level6' && (
                      <>
                        <p>&#8594;[理由 reason③] </p>
                        <p>&#8594;&#8594;[具体例 example③]</p>
                      </>
                    ))}
                  {/* <span className="btn btn-primary" onClick={() => {}}>
                    トピックを変更する
                  </span> */}
                </label>

                <textarea
                  spellcheck="false"
                  id="story"
                  name="outline_body"
                  rows="13"
                  cols="33"
                  style={{
                    marginTop: '15px',
                    fontSize: '.8rem',
                    letterSpacing: '1px',
                    padding: '10px',
                    width: '100%',
                    maxWidth: '100%',
                    lineHeight: '1.5',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '1px 1px 1px #999',
                    fontSize: '15px',
                  }}
                  value={outlineBody}
                  onChange={(e) => {
                    setOutlineBody(
                      e.target.value.replace('  ', ' ').replace('　', ' ')
                    )
                    setOutlineBodyWordLength(e.target.value.split(' ').length)
                    wordTotalSum()
                  }}
                ></textarea>
                {/* {outlineBody ? (
                  <textarea
                    spellcheck="false"
                    id="story"
                    name="outline_body"
                    rows="13"
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
                  ></textarea>
                ) : (
                  <textarea
                    spellcheck="false"
                    id="story"
                    name="outline_body"
                    rows="13"
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
                  ></textarea>
                )} */}

                <div
                  className="col-lg-12 col-md-12 mt-2 mb-2"
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <span
                    className="btn btn-primary mb-2"
                    onClick={() => setExampleView(!exampleView)}
                  >
                    {showandtellTitle_Level == '' ||
                    showandtellTitle_Level == null
                      ? 'Level2'
                      : showandtellTitle_Level}
                    のメモの書き方サンプルを
                    {exampleView ? '隠す' : '見る'}
                  </span>

                  {exampleView && (
                    <div>
                      <p style={{ color: 'red' }}>
                        以下のサンプルからメモの部分をご参考にして書いてください。
                      </p>
                      {(showandtellTitle_Level == 'Level2' ||
                        showandtellTitle_Level == null) && (
                        <img
                          src="/images/writing-sample/outline-example-level2.png"
                          style={{
                            border: '1px solid darkgray',
                            borderRadius: '10px',
                          }}
                        />
                      )}
                      {showandtellTitle_Level == 'Level3' && (
                        <img
                          src="/images/writing-sample/outline-example-level3.png"
                          style={{
                            border: '1px solid darkgray',
                            borderRadius: '10px',
                          }}
                        />
                      )}
                      {showandtellTitle_Level == 'Level4' && (
                        <img
                          src="/images/writing-sample/outline-example-level4.png"
                          style={{
                            border: '1px solid darkgray',
                            borderRadius: '10px',
                          }}
                        />
                      )}
                      {showandtellTitle_Level == 'Level5' && (
                        <img
                          src="/images/writing-sample/outline-example-level5.png"
                          style={{
                            border: '1px solid darkgray',
                            borderRadius: '10px',
                          }}
                        />
                      )}
                      {showandtellTitle_Level == 'Level6' && (
                        <img
                          src="/images/writing-sample/outline-example-level6.png"
                          style={{
                            border: '1px solid darkgray',
                            borderRadius: '10px',
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
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
                {/* <div className="col-lg-6 col-md-12">
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
                </div> */}

                <div className="col-lg-12 col-md-12">
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
