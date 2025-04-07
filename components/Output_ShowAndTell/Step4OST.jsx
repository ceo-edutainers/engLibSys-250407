//quizapp_big_design.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { QuizContext } from './Contexts'

import next from 'next'
import Router, { useRouter } from 'next/router'
import ReactAudioPlayer from 'react-audio-player'
import PointBar from '@/components/Output_ShowAndTell/PointBar'
import MonsterGet from '@/components/Output_ShowAndTell/MonsterGet'
import FireView from '@/components/Output_ShowAndTell/FireView'
import StepBarOST from '@/components/Output_ShowAndTell/StepBarOST'

import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import VoiceRecorderToS3ForSelfLessonPage from '@/components/VoiceRecorder/VoiceRecorderToS3ForSelfLessonPage'
import SpeechToText from '@/components/voice-to-text/SpeechToText'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import fireRed from './img/fire.png'
import fireGray from './img/fire-gray.png'
import { Repeat } from '@material-ui/icons'

import StepTitle from '@/components/Output_ShowAndTell/StepTitle'
// import StepImportantWords from '@/components/Output_ShowAndTell/StepImportantWords'
import StepImportantWords2 from '@/components/Output_ShowAndTell/StepImportantWords2'
import StepGoal from '@/components/Output_ShowAndTell/StepGoal'
import KizukiPoint from '@/components/Output_ShowAndTell/kizukiPoint'
import Subpage from '@/components/Output_ShowAndTell/Subpage'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faTrash,
  faLockOpen,
  faArrowCircleRight,
  faArrowAltCircleRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'
const Step4OST = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const router = useRouter() //使い方：router.replace('/')
  //import useWindowDimensionsを使う
  const { height, width } = useWindowDimensions()
  const thisWidth = width - 10 + 'px'
  //console.log('thisWidth:', thisWidth)

  let audioRightAnswer = new Audio(
    'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/dingdongdang.mp3'
  )
  let audioWrongAnswer = new Audio(
    'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/wrong-answer.mp3'
  )
  ////////////////////////////////////////////////////////////////////
  //SETTING START
  ////////////////////////////////////////////////////////////////////
  const [leastRecordCount, setLeaseRecordCount] = useState(
    leastRecordCount_shadowing
  ) //最低何回録音すれば次のステップへ行けるのか
  //最低何回録音すれば次のステップへ行けるのか

  const [currentStep, setCurrentStep] = useState('StepSH4') //
  const [pointKeyNum, setPointKeyNum] = useState('SSH-2') //DBのsys_point_set テーブルの pointKeyNum
  const [pageTitle, setPageTitle] = useState('自身つくまでシャドーイング')
  const [pageTitleSub, setPageTitleSub] = useState(
    '自身がつくまでシャドーイングをしよう！'
  )
  const [subpageTitle, setSubpageTitle] = useState('練習の順番')
  const [firstOrder, setFirstOrder] = useState(
    '①&nbsp;音声を聴きながらシャドーイングを録音する'
  )
  const [secondOrder, setSecondOrder] = useState(
    '②&nbsp;録音した音声を聴きてみる'
  )
  const [thirdOrder, setThirdOrder] = useState(
    '③&nbsp;終わったら次のステップボタンを押す'
  )
  const [fourthOrder, setFourthOrder] = useState('')
  const [fifthOrder, setFifthOrder] = useState('')
  const [kizukiTitle, setKizukiTitle] = useState('このステップの気づきポイント')
  const [kizukiDetail, setKizukiDetail] = useState(
    '最初に聴く音声でシャドーイングをしてみることで、自分ができない部分を気づくことができます。そして、この音声を練習最後の日の録音音声と比較することで、成長を感じることができます。'
  )

  const [stepWords1, setStepWords1] = useState('意味想像')
  const [stepWords2, setStepWords2] = useState('発音意識')
  const [stepWords3, setStepWords3] = useState('声を出す')

  ////////////////////////////////////////////////////////////////////
  //SETTING END
  ////////////////////////////////////////////////////////////////////
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味

  const [HWbookInfo, setHWbookInfo] = useState([]) //DBからHWのデータを持ってきて入れる
  const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる
  const [audioDurtaionFromDB, setAudioDurtaionFromDB] = useState(0)
  // const [nextQInsert, setNextQInsert] = useState('')

  const {
    myMbn,
    setMyMbn,
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
  } = useContext(QuizContext)

  const handlePracticeGiveup = () => {
    //練習をやめる時
    setIsOpenBackMypage(false)

    const fetchData5 = async () => {
      try {
        var stepStatus = 'giveup'
        var nextStep = ''
        hwHistoryUpdate(currentStep, stepStatus, HWID, practiceTempId, nextStep)
        todaysThisStepsPointUpdateGiveup(
          currentStep,
          HWID,
          practiceTempId,
          stepStatus
        )
      } catch (error) {}
    }
    fetchData5()
    // router.replace('/shadowingSelfcourse') // ここでリダイレクト
    router.reload('/shadowingSelfcourse') // ここでリロード
  }

  const todaysThisStepsPointUpdateGiveup = (
    currentStep,
    homework_id,
    practiceTempId,
    stepStatus
  ) => {
    const fetchData = async () => {
      try {
        var mbn = localStorage.getItem('MypageMbn')
        var url = DB_CONN_URL + '/update-todays-this-stages-point-giveup/'
        axios
          .get(
            url +
              mbn +
              '&' +
              homework_id +
              '&' +
              practiceTempId +
              '&' +
              currentStep +
              '&' +
              stepStatus
          )
          .then((response) => {
            router.reload('/shadowingSelfcourse') // ここでリロード
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  const hwHistoryUpdate = (
    currentStep,
    stepStatus,
    homework_id,
    practiceTempId,
    nextStep
  ) => {
    var mbn = localStorage.getItem('MypageMbn')
    const fetchData = async () => {
      // alert('here1')
      // alert(homework_id)
      // alert(practiceTempId)
      // alert(currentStep)
      // alert(stepStatus)
      // alert(thisSubject)
      try {
        var url = DB_CONN_URL + '/update-sys-hw-history-finished/'
        const response = await axios.put(
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

        if (!response.data.status) {
          alert(response.data.message) //for test
        } else {
          if (stepStatus == 'giveup') {
            alert('here-giveup')
            router.reload('/shadowingSelfcourse') // ここでリロード
          } else if (stepStatus == 'end') {
            // alert('here3')
            // alert('message')
            // alert(response.data.message)
            // alert('length')
            // alert(response.data.length)
            // alert('beforePracticeTempId')
            // alert(response.data.beforePracticeTempId)

            // alert('beforePracticeTempId')
            // alert(response.data.beforePracticeTempId)
            // alert('practiceTempId')
            // alert(response.data.practiceTempId)
            // alert('bStartDate')
            // alert(response.data.bStartDate)
            // alert('beforeStartDate2')
            // alert(response.data.beforeStartDate2)
            // alert('thisStartDate')
            // alert(response.data.thisStartDate)
            // alert('thisStartDate2')
            // alert(response.data.thisStartDate2)
            // alert('differenceDay')
            // alert(response.data.differenceDay)
            // alert('beforeFireView')
            // alert(response.data.beforeFireView)
            // alert('beforeFireView2')
            // alert(response.data.beforeFireView2)
            // alert('autoid')
            // alert(response.data.autoid)

            setPageView(nextStep)
          }
        }
      } catch (error) {
        alert('errorhere')
        alert(error)
      }
    }

    fetchData()
  }

  const nextStepCheck = (option, arrayNum) => {
    setIsGoNextPage(true)
  }
  const nextStep = (option, arrayNum) => {
    // if (!isGotPoint || 録音ファイルが0ではない時) {
    if (!isGotPoint) {
      //1分以上録音をするとpointをもらう、pointをもらったときに true, ここではfalseの時に録音をするように
      //StepSH1のFirst録音ポイント:5
      //答えを選んでなかった時
      var step = 'StepSH4'
      var homework_id = HWID
      var url = DB_CONN_URL + '/record-select-step/'
      var Url = url + step + '&' + homework_id + '&' + practiceTempId

      const fetchData = async () => {
        try {
          // const response =
          await axios.get(Url).then((response) => {
            if (response.data.length >= leastRecordCount_shadowing) {
              var stepStatus = 'end'
              var nextStep = 'finish'
              hwHistoryUpdate(
                currentStep,
                stepStatus,
                HWID,
                practiceTempId,
                nextStep
              )
            } else {
              //alert('次のステップに行くためには録音をしてください。')
              setIsGoNextPage(false)
              setIsCantGoNextPage(true)
              return false
            }
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
    //次のStepSH1のsys_hw_historyテーブルのstepStatusがendになっている場合は、StepSH2にいく。
    //왜냐하면, StepSH1은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
        // alert(nextStep)
        // alert('testend')
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
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    //console.log('StepSH4/myMbn:', myMbn)
    var url = DB_CONN_URL + '/get-hw-and-Shadowing-info/'
    var Url = url + mbn

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)

        setHWbookInfo(response.data)
        setAudioDurtaionFromDB(response.data[0].audioDuration)
        setBookTitle(response.data[0].bookTitle)
        setStoryTitle(response.data[0].storyTitle)
        setShadowingLevel(response.data[0].shadowingLevel)
        setStoryNum(response.data[0].storyNum)
        setStoryStartPage(response.data[0].storyStartPage)
        // setHWID(response.data[0].homework_id)

        console.log('setHWID', HWID)

        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
        setError(true)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (isError) return <h1>Error, try again!!!! </h1>
  if (isLoading) return <h1>Loading Page..........................</h1>

  return (
    // <div>
    <>
      <div className="QuizBig mb-0 pb-0" style={{ border: 0 }}>
        <div className="row">
          <div className="col-lg-12 col-md-6">
            <MonsterGet />
          </div>
          {/* <div className="col-lg-3 col-md-6">
            <FireView thisSubject={thisSubject} />
          </div> */}
        </div>
      </div>

      <PointBar cStep={pageView} pageTitle="SHADOWING" bcolor="orange" />
      <StepBarOST cStep={pageView} />
      <div className="QuizBigShadowing" style={{ backgroundColor: 'white' }}>
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
                      src="/images/homework-listening.png"
                      style={{
                        height: '50px',
                        width: 'auto',
                        marginRight: '20px',
                      }}
                    />
                    <img
                      src="/images/homework-recording.png"
                      style={{ height: '50px', width: 'auto' }}
                    />
                  </div>
                  <div
                    className="col-lg-4 col-md-6"
                    style={{ textAlign: 'center' }}
                  >
                    <StepImportantWords2
                      stepWords1={stepWords1}
                      stepWords2={stepWords2}
                      stepWords3={stepWords3}
                    />
                  </div>
                  {/* <div
                    className="col-lg-4 col-md-12 pt-1 pb-1 mt-0 "
                    style={{
                      backgroundColor: '#white',
                      height: '70px',
                      textAlign: 'center',
                    }}
                  >
                    <StepGoal goalText={goalText} />
                  </div> */}

                  <div className="col-lg-12 col-md-12  ">
                    <KizukiPoint
                      kizukiTitle={kizukiTitle}
                      kizukiDetail={kizukiDetail}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 mb-3 mt-0 ">
                    <Subpage
                      firstOrder={firstOrder}
                      secondOrder={secondOrder}
                      thirdOrder={thirdOrder}
                      fourthOrder={fourthOrder}
                      fifthOrder={fifthOrder}
                      subpageTitle={subpageTitle}
                    />
                  </div>
                </div>
                <center>
                  <div
                    className="row mt-3  mb-3"
                    style={{
                      border: '1px solid #b0c4de',
                      borderRadius: '10px',
                      padding: '10px',
                      width: '100%',
                    }}
                  >
                    <div
                      className="col-lg-7 col-md-12"
                      style={{ textAlign: 'center' }}
                    >
                      <p
                        style={{ textAlign: 'center' }}
                        className="tooltip-big-text tooltip-red"
                        data-balloon-visible
                        aria-label="ストーリーの音源を先にプレイしてからマイクを押してね！"
                        data-balloon-pos="up"
                      ></p>
                      <ReactAudioPlayer
                        src={bookAudioUrl}
                        // autoPlay
                        controls
                        onPlay={() => {
                          // alert('playing')
                          setIsAudioPlaying(true)
                        }}
                        onPause={() => {
                          // alert('paused')
                          setIsAudioPlaying(false)
                        }}
                        style={{
                          backgroundColor: '#b0c4de',
                          padding: '15px',
                          width: '80%',
                          borderRadius: '10px',
                        }}
                      />
                    </div>
                    <div
                      className="col-lg-5 col-md-12 "
                      style={{
                        margin: 'auto',
                        width: '100%',
                        // border: '1px solid violet',
                        // borderRadius: '10px',
                        padding: '10px',
                        textAlign: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: '600',
                          padding: '10px',
                          color: 'black',
                          fontSize: '20px',
                          borderRadius: '10px',
                          backgroundColor: '#F0E5F7',
                          verticalAlign: 'middle',
                          height: '200px',
                          width: '100%',
                          marginLeft: 0,
                          marginRight: 0,
                        }}
                      >
                        教材の{storyStartPage}ページから
                      </span>
                      <p
                        style={{
                          fontSize: '15px',
                          marginTop: '5px',
                          color: 'darkgray',
                        }}
                      >
                        {storyTitle}
                      </p>
                    </div>
                    {/* <div className="col-lg-1 col-md-12 mb-3">&nbsp;</div> */}
                  </div>
                </center>

                {/* {Responsive END} */}
                {/* </div> */}
                <VoiceRecorderToS3ForSelfLessonPage
                  mbn={myMbn}
                  homework_id={HWID}
                  practiceTempId={practiceTempId}
                  audioDurationFromDB={audioDurtaionFromDB}
                  pointKeyNum={pointKeyNum}
                  pointStep={currentStep}
                  leastRecordCount={leastRecordCount_shadowing}
                />
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
                Finish Study
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
                        今日の練習をやめる
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
                      学習終了
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
            title="今日の練習を本当にやめますか？"
            show={isOpenBackMypage}
            onConfirm={() => handlePracticeGiveup()}
            onCancel={() => {
              setIsOpenBackMypage(false)
            }}
            confirmBtnText="今日の練習をやめる"
            cancelBtnText="やめずに練習をする"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '600px' }}
          >
            <p>
              次のステップに行く前に途中でやめると、このステップでゲットしたポイントは消えてしまいます。
            </p>
          </SweetAlert>
          <SweetAlert
            title="学習を終了しますか？"
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
            title="録音が終わっていません。"
            show={isCantGoNextPage}
            onConfirm={() => setIsCantGoNextPage(false)}
            onCancel={() => {
              setIsCantGoNextPage(false)
            }}
            confirmBtnText="練習を続ける"
            // cancelBtnText="OK"
            showCancel={false}
            reverseButtons={true}
            style={{ width: '600px', backgroundColor: '#afeeee' }}
          >
            <p>
              決まった回数以上の録音が終わってないと次のステップに行けません。
            </p>
          </SweetAlert>
        </div>
      </div>
    </>
  )
}

export default Step4OST
