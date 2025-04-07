//quizapp_big_design.css
import react, { useState, useContext, useEffect, useMemo } from 'react'
import axios from 'axios'
import { QuizContext } from './Contexts'
import Router, { useRouter } from 'next/router'
import PointBar from '@/components/Output_ShowAndTell/PointBar'
import MonsterGet from '@/components/Output_ShowAndTell/MonsterGet'

import StepBarOST from '@/components/Output_ShowAndTell/StepBarOST'

import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/

import StepTitle from '@/components/Output_ShowAndTell/StepTitle'
import StepImportantWords2 from '@/components/Output_ShowAndTell/StepImportantWords2'

import ScriptSample from '@/components/Output_ShowAndTell/SampleScript'
import Subpage from '@/components/Output_ShowAndTell/SubpageStep2_2'

// import GoogleDocCreatorCourseST from '@/components/GoogleDoc/GoogleDocCreatorCourseST'
// import GoogleDoc from '@/components/GoogleDoc/GoogleDoc'
import ViewOutlineInfo from '@/components/Output_ShowAndTell/ViewOutlineInfo_step3'

const Step3OST = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const router = useRouter() //使い方：router.replace('/')
  //import useWindowDimensionsを使う
  const { height, width } = useWindowDimensions()
  const thisWidth = width - 10 + 'px'
  //console.log('thisWidth:', thisWidth)

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
  const [leastRecordCount, setLeaseRecordCount] = useState(1) //最低何回録音すれば次のステップへ行けるのか
  //最低何回録音すれば次のステップへ行けるのか
  // const [goalText, setGoalText] = useState('最低' + leastRecordCount + '回音読')
  const [currentStep, setCurrentStep] = useState('Step3OST') //
  const [pointKeyNum, setPointKeyNum] = useState('ST-3') //DBのsys_point_set テーブルの pointKeyNum
  // const [osusumeLetterSum, setOsusumeLetterSum] = useState(300)
  const [pageTitle, setPageTitle] = useState('最後にスクリプトを書く')
  const [pageTitleSub, setPageTitleSub] =
    useState('メモを元にスクリプトを書こう！')

  const [subpageTitle, setSubpageTitle] = useState('スクリプトの書き方')
  const [firstOrder, setFirstOrder] = useState(
    '①&nbsp;前ステップのメモを元に、描写を加えたり、より詳細な説明を加えて文章を作成します。'
  )
  const [secondOrder, setSecondOrder] = useState(
    '②&nbsp;Introduction・Body・Conclusionに分けて書きます。'
  )
  const [thirdOrder, setThirdOrder] = useState('')
  const [fourthOrder, setFourthOrder] = useState('')
  const [fifthOrder, setFifthOrder] = useState('')
  const [kizukiTitle, setKizukiTitle] = useState('このステップの気づきポイント')
  const [kizukiDetail, setKizukiDetail] = useState(
    '最初に聴く音声でシャドーイングをしてみることで、自分ができない部分を気づくことができます。そして、この音声を練習最後の日の録音音声と比較することで、成長を感じることができます。'
  )

  const [stepWords1, setStepWords1] = useState('文法意識')
  const [stepWords2, setStepWords2] = useState('')
  const [stepWords3, setStepWords3] = useState('')

  // const [outlineTitle, setOutlineTitle] = useState()
  // const [outlineIntroduction, setOutlineIntroduction] = useState()
  // const [outlineBody, setOutlineBody] = useState()
  // const [outlineConclusion, setOutlineConclusion] = useState()
  const [wholeScript, setWholeScript] = useState()
  const [wholeScriptWordLength, setWholeScriptWordLength] = useState(0)
  const [wordsum, setWordsum] = useState()
  ////////////////////////////////////////////////////////////////////
  //SETTING END
  ////////////////////////////////////////////////////////////////////
  const [isAudioPlaying, setIsAudioPlaying] = useState(false) //Main Storyの音声がPlayされたらtrueになる。必ず音声を聴きながらやるページで必要

  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  // const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味
  const [Questions, setQuestions] = useState([]) //DBから本ののデータを持ってきて入れる
  const [HWbookInfo, setHWbookInfo] = useState([]) //DBからHWのデータを持ってきて入れる
  const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  const [nowClickedColor, setNowClickedColor] = useState('') //クリックした答えのボタンの色が変わる
  const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる
  const [audioDurtaionFromDB, setAudioDurtaionFromDB] = useState(0)
  const [recordingCountForNextStep, setRecordingCountForNextStep] = useState(0)
  // const [nextQInsert, setNextQInsert] = useState('')

  const [googleDocLink, setGoogleDocLink] = useState('')
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
  const insertPointToDB = () => {
    var mbn = localStorage.getItem('MypageMbn')
    var pointStep = currentStep
    //alert(pointKeyNum)
    if (wordsum > 80) {
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
          if (!response.data.status) {
            // alert(response.data.message) //for test
            //alert('ポイントゲット!!!')
            // console.log('##pointKeyNum', pointKeyNum)
            // console.log('##HWID', HWID)
            // console.log('##currentStep', currentStep)
            // console.log('##practiceTempId', practiceTempId)
          } else {
            //alert(response.data.message)
          }
        })
    }
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
    if (wholeScript == '') {
      setWholeScript('&nbps;')
    }

    var url = DB_CONN_URL + '/reg-sys-hw-show-and-tell-writing-script'
    axios
      .post(url, {
        mbn: mbn,
        subject: thisSubject,
        homework_id: HWID,
        practiceTempId: practiceTempId,
        step: currentStep,
        wholeScript: wholeScript,
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
    // if (wordsum < scriptLimitWords) {
    //   setIsCantGoNextPage(true)
    // } else {
    setIsGoNextPage(true)
    // }
  }
  const nextStep = (option, arrayNum) => {
    // if (!isGotPoint || 録音ファイルが0ではない時) {
    if (!isGotPoint) {
      //1分以上録音をするとpointをもらう、pointをもらったときに true, ここではfalseの時に録音をするように
      //Step3OSTのFirst録音ポイント:5
      //答えを選んでなかった時
      var step = 'Step3OST'
      var homework_id = HWID
      var url = DB_CONN_URL + '/record-select-step/'
      var Url = url + step + '&' + homework_id + '&' + practiceTempId

      const fetchData = async () => {
        try {
          // const response =
          await axios.get(Url).then((response) => {
            var stepStatus = 'end'
            var nextStep = 'finished'
            hwHistoryUpdate(
              currentStep,
              stepStatus,
              HWID,
              practiceTempId,
              nextStep
            )

            practiceStart(nextStep)
            // console.log('thisStep:', thisStep)
          })
        } catch (error) {
          alert('select error!')
        }
      }

      fetchData()
    }
  }

  const practiceStart = (nextStep) => {
    //次のStep3OSTのsys_hw_historyテーブルのstepStatusがendになっている場合は、Step4OSTにいく。
    //왜냐하면, Step3OST은 처음 한번만 하는 step이므로.

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

  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる

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
          // setHWWritingInfo(response.data)
          setWholeScript(response.data[0].script)
          setWholeScriptWordLength(response.data[0].script.split(' ').length)

          //ページloading時の計算
          //  var sum = parseInt(
          //    response.data[0].outline_topic.split(' ').length +
          //      response.data[0].outline_introduction.split(' ').length +
          //      response.data[0].outline_body.split(' ').length +
          //      response.data[0].outline_conclusion.split(' ').length
          //  )

          var sum = parseInt(response.data[0].script.split(' ').length)
          setWordsum(sum)
          // setWordsum(response.data[0].script.split(' ').length - 1)
        } else {
          setWholeScript('')
          setWholeScriptWordLength(0)
          setWordsum(0)
        }
        // alert(sum)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const wordTotalSum = () => {
    //var ws = parseInt(wholeScript.split(' ').length)
    var ws = parseInt(wholeScriptWordLength)
    setWordsum(ws)
  }
  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    console.log('Step3OST/myMbn:', myMbn)
    var url = DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/'
    var Url = url + mbn

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)

        setHWbookInfo(response.data)
        setGoogleDocLink(response.data[0].google_doc_link)
        // alert(googleDocLink)
      } catch (error) {
        console.log(error)
        setError(true)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (isError) return <h1>Error, try again! step3 </h1>
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
          {HWbookInfo.map((val, key) => {
            return (
              <>
                <div className="row align-items-center">
                  <div
                    className="col-lg-8 col-md-6"
                    style={{ textAlign: 'center' }}
                  >
                    <StepTitle
                      pageTitle={pageTitle}
                      pageTitleSub={pageTitleSub}
                    />
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
                    <StepImportantWords2
                      stepWords1={stepWords1}
                      stepWords2={stepWords2}
                      stepWords3={stepWords3}
                    />
                  </div>

                  <div className="col-lg-12 col-md-12 mb-0 mt-3 ">
                    <Subpage
                      firstOrder={firstOrder}
                      secondOrder={secondOrder}
                      thirdOrder={thirdOrder}
                      fourthOrder={fourthOrder}
                      fifthOrder={fifthOrder}
                      subpageTitle={subpageTitle}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 mt-0 mb-2 pt-0 ">
                    <ViewOutlineInfo />
                  </div>
                  {/* <div className="col-lg-12 col-md-12 mt-0 mb-0 pt-0 ">
                    <ScriptSample />
                  </div> */}
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
                          以下のサンプルから「答え」の部分をご参考にしてください。
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

                  <div className="col-lg-12 col-md-12 mt-0 mb-3 pt-0">
                    {/* <h5>アウトラインを書きましょう！</h5>
                    <hr /> */}
                    <center>
                      <h1>
                        <b>SCRIPT</b>
                      </h1>
                    </center>
                    <label
                      for="story"
                      style={{
                        display: 'block',
                        marginBottom: '5px',
                        textAlign: 'center',
                        marginTop: '20px',
                      }}
                    >
                      {/* <h5>
                        <font color="darkgreen">
                          現在単語数：<b>{wholeScriptWordLength}</b>
                        </font>
                      </h5> */}
                      <h5>
                        <font>現在</font>
                        <font style={{ color: 'red', fontSize: '40px' }}>
                          <b>{wordsum == 1 ? '0' : wordsum}</b>
                        </font>
                        <font>単語</font>
                        {/* &nbsp;/&nbsp;
                        <font size="8px" color="darkgreen">
                          <b>{scriptLimitWords}</b>単語以上
                        </font> */}
                      </h5>
                    </label>
                    <textarea
                      spellcheck="false"
                      id="story"
                      name="whole_script"
                      rows="30"
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
                      value={wholeScript}
                      onChange={(e) => {
                        setWholeScript(
                          e.target.value.replace('  ', ' ').replace('　', ' ')
                        )
                        setWholeScriptWordLength(
                          e.target.value.split(' ').length
                        )
                        wordTotalSum()
                      }}
                    ></textarea>

                    {/* {googleDocLink == '' && (
                      <GoogleDocCreatorCourseST
                        mbn={myMbn}
                        homework_id={HWID}
                        name_eng={userName}
                      />
                    )}
                    {googleDocLink != '' && (
                      <div style={{ height: '800px' }}>
                        <GoogleDoc embedUrl={googleDocLink} />
                      </div>
                    )} */}
                    <h5>
                      <font>現在</font>
                      <font style={{ color: 'red', fontSize: '40px' }}>
                        <b>{wordsum}</b>
                      </font>
                      <font>単語</font>
                      {/* &nbsp;/&nbsp;
                      <font size="8px" color="darkgreen">
                        <b>{scriptLimitWords}</b>単語以上
                      </font> */}
                    </h5>
                  </div>
                </div>

                {/* <Upload
                  // mbn={myMbn}
                  // homework_id={HWID}
                  currentStep={currentStep}
                  stepStatus="Outline"
                /> */}
                {/* {Responsive START} */}

                {/* <div className="col-lg-12 col-md-12  ">
                  <StepImportantWords
                    stepWords1={stepWords1}
                    stepWords2={stepWords2}
                    stepWords3={stepWords3}
                  />
                </div> */}

                {/* {Responsive END} */}
                {/* </div> */}
                {/* <VoiceRecorderToS3ForSelfLessonPage
                  mbn={myMbn}
                  homework_id={HWID}
                  practiceTempId={practiceTempId}
                  audioDurationFromDB={audioDurtaionFromDB}
                  pointKeyNum={pointKeyNum}
                  pointStep={currentStep}
                  leastRecordCount={leastRecordCount}
                /> */}
                <hr />

                {/* {Responsive START2} */}

                {/* {Responsive END2} */}
              </>
            )
          })}
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
                      今日の学習を終了
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
            title="学習を終了しますか？"
            show={isGoNextPage}
            onConfirm={() => nextStep()}
            onCancel={() => {
              setIsGoNextPage(false)
            }}
            confirmBtnText="終了する"
            cancelBtnText="もっと書く"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '500px' }}
          >
            <p>終了しても、再開できます。</p>
          </SweetAlert>
          <SweetAlert
            title="単語数が足りません。"
            show={isCantGoNextPage}
            onConfirm={() => nextStep()}
            onCancel={() => {
              setIsCantGoNextPage(false)
            }}
            confirmBtnText="今は書かずにそのまま終了する"
            cancelBtnText="戻って書く"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '600px', backgroundColor: '#afeeee' }}
          >
            <p>
              {scriptLimitWords}単語以上書いてください。 {scriptLimitWords}
              単語以上で50ポイント獲得できます。
            </p>
          </SweetAlert>
        </div>
      </div>
    </>
  )
}

export default Step3OST
