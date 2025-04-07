import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
// import { QuizContext } from '../../pages/quizhelper/Contexts'
// import { QuizContext } from 'pages/quizhelper/Contexts'
// import QrcodeGenerator from '@/components/readingSelfcourse/QrcodeGenerator'
import { QuizContext } from './ContextsB'
import next from 'next'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PointBar from '@/components/readingSelfcourse/PointBarB'
import MonsterGet from '@/components/readingSelfcourse/MonsterGet'
import FireView from '@/components/readingSelfcourse/FireView'
import StepBarB from '@/components/readingSelfcourse/StepBarB'
import WordListReadingBook from '@/components/readingSelfcourse/WordListReadingBookB' //単語リスト
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
import Router, { useRouter } from 'next/router'
import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import VoiceRecorderToS3ForSelfLessonPage from '@/components/VoiceRecorder/VoiceRecorderToS3ForSelfLessonPage'

import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import StepTitle from '@/components/readingSelfcourse/StepTitle'

import StepImportantWords2 from '@/components/readingSelfcourse/StepImportantWords2'
import StepGoal from '@/components/readingSelfcourse/StepGoal'
import KizukiPoint from '@/components/readingSelfcourse/kizukiPoint'
import Subpage from '@/components/readingSelfcourse/Subpage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faTrash,
  faPlay,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'

import { Repeat } from '@material-ui/icons'
const Step3B = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
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
    leastRecordCount_step3
  ) //最低何回録音すれば次のステップへ行けるのか
  const [currentStep, setCurrentStep] = useState('Step3B') //
  const [pointKeyNum, setPointKeyNum] = useState('RR-3') //DBのsys_point_set テーブルの pointKeyNum
  const [pageTitle, setPageTitle] = useState('音を聴かずに録音する')
  const [pageTitleSub, setPageTitleSub] = useState(
    '自分の力で読めるようになったかチェックしよう！'
  )
  const [subpageTitle, setSubpageTitle] = useState('練習の順番')
  const [firstOrder, setFirstOrder] = useState('①&nbsp;録音ボタン')
  const [firstOrder2, setFirstOrder2] =
    useState('を押して、音読する(音源なしで)')
  const [secondOrder, setSecondOrder] = useState(
    '②&nbsp;録音した音声を聴いてみる'
  )
  // const [thirdOrder, setThirdOrder] = useState(
  //   '③&nbsp;終わったら次のステップボタンを押す'
  // )
  const [fourthOrder, setFourthOrder] = useState('')
  const [fifthOrder, setFifthOrder] = useState('')
  const [kizukiTitle, setKizukiTitle] = useState('このステップの気づきポイント')
  const [kizukiDetail, setKizukiDetail] = useState(
    '前のステップで練習した発音を思い出しながら、音源を聴かずに音読します。まだ身についてない発音やイントネーションなどに気づくことができます。'
  )
  const [stepWords1, setStepWords1] = useState('意味を想像する')
  const [stepWords2, setStepWords2] = useState('発音を意識する')
  const [stepWords3, setStepWords3] = useState('大きく声を出す')

  ////////////////////////////////////////////////////////////////////
  //SETTING END
  ////////////////////////////////////////////////////////////////////
  //For sweet alert

  const [showAudio, setShowAudio] = useState(false)
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味

  const [Questions, setQuestions] = useState([]) //DBから本ののデータを持ってきて入れる
  const [HWbookInfo, setHWbookInfo] = useState([]) //DBからHWのデータを持ってきて入れる
  const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  const [nowClickedColor, setNowClickedColor] = useState('') //クリックした答えのボタンの色が変わる

  const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる

  const [audioDurtaionFromDB, setAudioDurtaionFromDB] = useState(0)

  const [recordingCountForNextStep, setRecordingCountForNextStep] = useState(0)
  const [vocaPartView, setVocaPartView] = useState(false)
  // const [nextQInsert, setNextQInsert] = useState('')

  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
    englibLevel,
    setEnglibLevel,
    englibLevelColor,
    setEnglibLevelColor,
    thisSubject,
    setThisSubject,
    leastRecordCount_step2,
    setLeastRecordCount_step2,
    leastRecordCount_step3,
    setLeastRecordCount_step3,
    bookCoverImgUrl,
    setBookCoverImgUrl,
    bookImgUrl,
    setBookImgUrl,
    bookAudioUrl,
    setBookAudioUrl,
    seriesName,
    setSeriesName,
    bookStory,
    setBookStory,
    levelOrder,
    setLevelOrder,
    readingLevel,
    setReadingLevel,
    bookTitle,
    setBookTitle,
    storyStartPage,
    setStoryStartPage,
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
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
    textbook,
    setTextbook,
    eikenLevel,
    setEikenLevel,
    userName,
    setUserName,
    point,
    setPoint,
    totalQuestion,
    setTotalQuestion,
    answerFile,
    setAnswerFile,
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
    localStorage.setItem('holdTempId', practiceTempId)
    hwHistoryUpdate(currentStep, 'holding', HWID, practiceTempId, nextStep)
  }

  const nextStepCheck = (option, arrayNum) => {
    setIsGoNextPage(true)
  }
  const nextStep = (option, arrayNum) => {
    // if (!isGotPoint || 録音ファイルが0ではない時) {
    if (!isGotPoint) {
      //1分以上録音をするとpointをもらう、pointをもらったときに true, ここではfalseの時に録音をするように
      //step1のFirst録音ポイント:5
      //答えを選んでなかった時
      var step = 'Step3B'
      var homework_id = HWID
      var url = DB_CONN_URL + '/record-select-step/'
      var Url = url + step + '&' + homework_id + '&' + practiceTempId

      const fetchData = async () => {
        try {
          // const response =
          await axios.get(Url).then((response) => {
            // alert(response.data.status)
            // alert('step:')
            // alert(step)
            // alert('homework_id;')
            // alert(homework_id)
            // alert('length:')
            // alert(response.data.length)
            if (response.data.length >= leastRecordCount_step3) {
              var stepStatus = 'end'
              var nextStep = 'finished' //これが元々
              // var nextStep = 'Step4B' //TEST
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
          })
        } catch (error) {
          alert('select error!')
        }
      }

      fetchData()
    }

    const practiceStart = (nextStep) => {
      //次のstep1のsys_hw_historyテーブルのstepStatusがendになっている場合は、step2にいく。
      //왜냐하면, step1은 처음 한번만 하는 step이므로.

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
  }
  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    // var mbn = localStorage.getItem('MypageMbn')
    //console.log('Step3/myMbn:', myMbn)
    var url = DB_CONN_URL + '/get-hw-and-Blackcat-Series-info/'
    var Url = url + myMbn

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)

        setHWbookInfo(response.data)
        setAudioDurtaionFromDB(response.data[0].audioDuration)
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

  const hwHistoryUpdate = (
    currentStep,
    stepStatus,
    homework_id,
    practiceTempId,
    nextStep
  ) => {
    const fetchData = async () => {
      try {
        var mbn = localStorage.getItem('MypageMbn')
        var url = DB_CONN_URL + '/update-sys-hw-history-finished/'
        const response = await axios.get(
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
        } else {
          // alert(response.data.message) //for test
          if (stepStatus == 'holding') {
            router.reload('/readingSelfcourseB') // ここでリロード
          } else if (stepStatus == 'end') {
            // alert(response.data.message) //for test
            if (response.data.updateFireView == '0') {
              const MySwal = withReactContent(Swal)
              Swal.fire({
                // position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                html: '<h1><b>おめでとう！</b></h1><br/><br/><h5>モンスターをゲットしました！</h5>',
                // title: '20ポイントゲット！',
                width: '600px',
                height: '600px',
                opacity: 0,
                padding: '3em',
                border: '1px solid #F1C40F',
                borderRadius: '20px',
                color: '#F1C40F',
                background: '#F44640',
                // imageUrl: 'https://unsplash.it/400/200',
                // imageWidth: 400,
                // imageHeight: 200,
                // imageAlt: 'Custom image',
                // background: '#fff url(/images/about-img5.jpg)',
                backdrop: `
              rgba(0,0,123,0.4)
              url("/images/animated-icons/bf6.gif")
              center top
              no-repeat
            `,
              })
            } else {
              const MySwal = withReactContent(Swal)
              Swal.fire({
                // position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                html: '<h1><b>おめでとう！</b></h1><br/><br/><h5>ポイントゲット！</h5>',
                // title: '20ポイントゲット！',
                width: '600px',
                height: '600px',
                opacity: 0,
                padding: '3em',
                border: '1px solid #F1C40F',
                borderRadius: '20px',
                color: '#F1C40F',
                background: '#F1C40F',
                // imageUrl: 'https://unsplash.it/400/200',
                // imageWidth: 400,
                // imageHeight: 200,
                // imageAlt: 'Custom image',
                // background: '#fff url(/images/about-img5.jpg)',
                backdrop: `
              rgba(0,0,123,0.4)
              url("/images/animated-icons/bf6.gif")
              center top
              no-repeat
            `,
              })
            }
            setPageView(nextStep)
          } else {
            alert('stepStatue error step3b')
          }
        }
      } catch (error) {
        alert('error-update-sys-hw-history-finished')
        alert(error)
      }
    }

    fetchData()
  }
  return (
    // <div>
    <>
      <div className="QuizBig mb-0 pb-0" style={{ border: 0 }}>
        <div className="row">
          <div className="col-lg-10 col-md-6">
            <MonsterGet />
          </div>
          <div className="col-lg-2 col-md-6">
            <FireView thisSubject={thisSubject} />
            {/* <p style={{ color: 'black', marginBottom: 0, paddingBottom: 0 }}>
              {thisSubject}
            </p>
            <p style={{ color: 'black', marginTop: 0, paddingTop: 0 }}>
              連続練習日
            </p> */}
          </div>
        </div>
      </div>

      {/* <PointBar cStep={pageView} pageTitle="Input-Self-Reading" /> */}
      <PointBar
        cStep={pageView}
        pageTitle="INTENSIVE READING"
        bcolor="orange"
        pointKeyNum={pointKeyNum}
      />
      <StepBarB cStep={pageView} />
      <div className="QuizBig" style={{ backgroundColor: 'white' }}>
        <div className="container">
          {/* <QrcodeGenerator url="https://www.google.com" /> */}
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
                      src="/images/homework-openbook.png"
                      style={{
                        height: '70px',
                        width: 'auto',
                        marginRight: '20px',
                      }}
                    />

                    <img
                      src="/images/homework-not-listening.png"
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

                  <div className="col-lg-12 col-md-12">
                    <KizukiPoint
                      kizukiTitle={kizukiTitle}
                      kizukiDetail={kizukiDetail}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 ">
                    <Subpage
                      firstOrder={firstOrder}
                      firstOrder2={firstOrder2}
                      secondOrder={secondOrder}
                      // thirdOrder={thirdOrder}
                      fourthOrder={fourthOrder}
                      fifthOrder={fifthOrder}
                      startPageNum={storyStartPage}
                      subpageTitle={subpageTitle}
                    />
                  </div>
                </div>
                {/* <div className="col-lg-12 col-md-12  ">
                  <StepImportantWords
                    stepWords1={stepWords1}
                    stepWords2={stepWords2}
                    stepWords3={stepWords3}
                  />
                </div> */}
                {/* {Responsive END2} */}
                <div className="col-lg-12 col-md-12 mb-2">
                  <button
                    className="btn btn-warning font-weight-bold"
                    onClick={() => {
                      setShowAudio(!showAudio)
                    }}
                  >
                    {showAudio ? '音源を隠す' : 'もう一度音源を聴いてみる'}
                  </button>
                </div>
                <div
                  className="col-lg-12 col-md-12"
                  style={{ display: showAudio ? 'block' : 'none' }}
                >
                  <ReactAudioPlayer
                    src={bookAudioUrl}
                    // autoPlay
                    controls
                    onPlay={() => {
                      // alert('playing')
                    }}
                    onPause={() => {
                      // alert('paused')
                    }}
                    style={{
                      backgroundColor: '#b0c4de',
                      padding: '15px',
                      width: '50%',
                      borderRadius: '10px',
                    }}
                  />
                </div>

                {/* <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" /> //for video */}
              </>
            )
          })}
          <VoiceRecorderToS3ForSelfLessonPage
            mbn={myMbn}
            homework_id={HWID}
            practiceTempId={practiceTempId}
            audioDurationFromDB={audioDurtaionFromDB}
            pointKeyNum={pointKeyNum}
            pointStep={currentStep}
            leastRecordCount={leastRecordCount_step3}
            pageView={pageView}
          />
          <hr />
          {currentStep == 'Step3' ? (
            <>
              <button
                className="btn btn-danger mt-3"
                onClick={() => {
                  // finishQuiz(optionChosen, currentStep)
                  nextStepCheck()
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
                <div className="col-lg-6 col-md-12">
                  <div
                    className="banner-content"
                    style={{ paddingTop: '15px' }}
                  >
                    <button
                      className="btn btn-secondary"
                      style={{
                        width: '100%',
                        fontWeight: 'bold',

                        border: 0,
                      }}
                      onClick={() => {
                        setVocaPartView(!vocaPartView)
                      }}
                    >
                      知らない単語を登録する
                      {vocaPartView && (
                        <span
                          style={{
                            backgroundColor: 'yellow',
                            marginLeft: 10,
                            color: 'black',
                            fontWeight: '900',
                            padding: '5px',
                            border: '1px solid yellow',
                            borderRadius: '5px',
                          }}
                          onClick={() => {
                            setVocaPartView(!vocaPartView)
                          }}
                        >
                          X
                        </span>
                      )}
                    </button>
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
                      }}
                      className="btn btn-primary mt-0 mb-2"
                      onClick={() => {
                        nextStepCheck()
                      }}
                      id="nextStep"
                    >
                      練習を終了する
                    </button>
                  </div>
                </div>
                {/* </MediaQuery> */}
                {/* <MediaQuery query="(max-width: 767px)">
                  <div className="col-lg-4 col-md-12 mt-1">
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
                          style={{ width: '200px', fontWeight: 'bold' }}
                          className="btn btn-info mt-0 mb-2"
                          id="nextStep"
                        >
                          一旦休憩する
                        </button>
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="banner-content">
                      <button
                        style={{
                          width: '200px',
                          fontWeight: 'bold',
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
             
            </p> */}
          </SweetAlert>
          <SweetAlert
            title="本日のリーディング課題を終了しますか？"
            show={isGoNextPage}
            onConfirm={() => nextStep()}
            onCancel={() => {
              setIsGoNextPage(false)
            }}
            confirmBtnText="終了する"
            cancelBtnText="もっと練習する"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '500px' }}
          >
            {/* <p></p> */}
          </SweetAlert>
          <SweetAlert
            title="録音がまだ終わってないです。"
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
      {vocaPartView && (
        <div
          className="QuizBig"
          style={{ backgroundColor: 'white', border: '10px solid #ffcc66' }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-lg-12 col-md-12"
                style={{ padding: 0, margin: 0 }}
              >
                <div className="">
                  {/* {vocaPartView && <VocaSelect />} */}

                  <WordListReadingBook mbn={myMbn} homework_id={HWID} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Step3B
