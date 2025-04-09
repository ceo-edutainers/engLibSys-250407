import react, { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { QuizContext } from './ContextsB'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Router, { useRouter } from 'next/router'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import Floater from 'react-floater'
import PointBar from '@/components/readingSelfcourse/PointBar'
import MonsterGet from '@/components/readingSelfcourse/MonsterGet'
import FireView from '@/components/readingSelfcourse/FireView'
import StepBarB from '@/components/readingSelfcourse/StepBar'
import WordListReadingBook from '@/components/readingSelfcourse/WordListReadingBookB' //単語リスト
import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import VoiceRecorderToS3ForSelfLessonPage from '@/components/VoiceRecorder/VoiceRecorderToS3ForSelfLessonPage2'
import SpeechToText from '@/components/voice-to-text/SpeechToText'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import StepTitle from '@/components/readingSelfcourse/StepTitle'
import StepImportantWordstep1 from '@/components/readingSelfcourse/StepImportantWordstep1'

const Step1B = () => {
  const { query } = useRouter()
  const cN = query.cN //courseName
  const cS = query.cS //courseSelf
  const sB = query.sB //subject
  const TOUR_STEPS = [
    {
      target: '.tour-step0',
      content: 'このステップのやり方ツアーを始めますか？',
      title: 'ツアーをはじめる',
      // disableBeacon: true,
    },
    {
      target: '.tour-step1',
      title: '① テキスト用意',
      content: '今回の課題ページを開きます。',
      // disableBeacon: true,
    },

    {
      target: '.tour-step2',
      title: '② 録音をスタートする',
      content: '録音ボタンを押して、最初の音読を録音します。',
    },
    {
      target: '.tour-step3',
      title: '③ ストップボタンを押す',
      content: '音読が終わったらストップボタンを押します。',
      backgroundColor: 'red',
    },
    {
      target: '.tour-step4',
      title: '④ 自分の録音した音声をチェック',
      content: '自分の音声を一度聴いて、できない部分を確認します。',
    },
    {
      target: '.tour-step5',
      title: '⑤ 単語登録ボタンを押す',
      content: '知らない単語があったらクリックして登録します。',
    },
    {
      target: '.tour-step6',
      title: '⑥ 次のステップへ',
      content: '全て終わったら次のステップに行きます。',
    },
  ]
  // Define our state
  const INITIAL_STATE = {
    key: new Date(),
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: TOUR_STEPS,
  }

  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'START':
        return { ...state, run: true }
      case 'RESET':
        return { ...state, stepIndex: 0 }
      case 'STOP':
        return { ...state, run: false }
      case 'NEXT_OR_PREV':
        return { ...state, ...action.payload }
      case 'RESTART':
        return {
          ...state,
          stepIndex: 0,
          run: true,
          loading: false,
          key: new Date(),
        }
      default:
        return state
    }
  }
  // Define the Tour component
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE)
  useEffect(() => {
    if (!localStorage.getItem('tour')) {
      dispatch({ type: 'START' })
    }
  }, [])
  const callback = (data) => {
    const { action, index, type, status } = data
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: 'STOP' })
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: 'NEXT_OR_PREV',
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      })
    }
  }
  const startTour = () => {
    dispatch({ type: 'RESTART' })
  }

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')
  // const MySwal = withReactContent(Swal)
  // Swal.fire({
  //   // position: 'top-end',
  //   showConfirmButton: false,
  //   timer: 3000,
  //   timerProgressBar: true,
  //   html: '<h1><b>おめでとう！</b></h1><br/><br/><h5>20ポイントゲット！</h5>',
  //   // title: '20ポイントゲット！',
  //   width: '600px',
  //   height: '600px',
  //   opacity: 0,
  //   padding: '3em',
  //   border: '1px solid #F1C40F',
  //   borderRadius: '20px',
  //   color: '#F1C40F',
  //   background: '#F1C40F',
  //   // imageUrl: 'https://unsplash.it/400/200',
  //   // imageWidth: 400,
  //   // imageHeight: 200,
  //   // imageAlt: 'Custom image',
  //   // background: '#fff url(/images/about-img5.jpg)',
  //   backdrop: `
  //             rgba(0,0,123,0.4)
  //             url("/images/animated-icons/bf6.gif")
  //             center top
  //             no-repeat
  //           `,
  // })
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
  const [leastRecordCount, setLeaseRecordCount] = useState(1) //最低何回録音すれば次のステップへ行けるのか
  // const [goalText, setGoalText] = useState('最低' + leastRecordCount + '回音読')
  const [currentStep, setCurrentStep] = useState('Step1B') //
  const [pointKeyNum, setPointKeyNum] = useState('RR-1') //DBのsys_point_set テーブルの pointKeyNum
  const [pageTitle, setPageTitle] = useState(
    '<ruby>最初<rt>さいしょ</rt></ruby>の<ruby>録音<rt>ろくおん</rt></ruby>'
  )
  const [pageTitleSub, setPageTitleSub] = useState(
    'まずは<ruby>今<rt>いま</rt></ruby>の<ruby>自分<rt>じぶん</rt></ruby>をチェックしてみよう！'
  )

  const [stepWords1, setStepWords1] = useState(
    '<ruby>練習<rt>れんしゅう</rt></ruby>の<ruby>順番<rt>じゅんばん</rt></ruby>'
  )
  const [stepWords2, setStepWords2] = useState(
    '<ruby>気<rt>き</rt></ruby>をつけよう'
  )
  const [stepWords3, setStepWords3] = useState(
    '<ruby>気付<rt>きづ</rt></ruby>きポイント'
  )
  // const [stepWords1, setStepWords1] = useState('意味を想像する')
  // const [stepWords2, setStepWords2] = useState('発音を意識する')
  // const [stepWords3, setStepWords3] = useState('大きく声を出す')

  ////////////////////////////////////////////////////////////////////
  //SETTING END
  ////////////////////////////////////////////////////////////////////
  const [vocaPartView, setVocaPartView] = useState(false)
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味
  const [Questions, setQuestions] = useState([]) //DBから本ののデータを持ってきて入れる

  const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  const [nowClickedColor, setNowClickedColor] = useState('') //クリックした答えのボタンの色が変わる
  const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる
  // const [HWbookInfo, setHWbookInfo] = useState([]) //DBからHWのデータを持ってきて入れる
  // const [audioDurtaionFromDB, setAudioDurtaionFromDB] = useState(0)
  const [recordingCountForNextStep, setRecordingCountForNextStep] = useState(0)
  // const [nextQInsert, setNextQInsert] = useState('')

  const {
    readingHWAmount,
    setReadingHWAmount,
    copyHW,
    setCopyHW,
    HWbookInfo,
    setHWbookInfo,
    audioDurtaionFromDB,
    setAudioDurtaionFromDB,
    firstStoryLink,
    setFirstStoryLink,
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
    bookIntroAudioUrl,
    setBookIntroAudioUrl,
    bookIntro2AudioUrl,
    setBookIntro2AudioUrl,
    bookAuthorAudioUrl,
    setBookAuthorAudioUrl,
    bookAudio2Url,
    setBookAudio2Url,
    bookAudio2TitleUrl,
    setBookAudio2TitleUrl,
    bookAudio3TitleUrl,
    setBookAudio3TitleUrl,
    bookAudio3Url,
    setBookAudio3Url,
    bookAudio4TitleUrl,
    setBookAudio4TitleUrl,
    bookAudio4Url,
    setBookAudio4Url,
    bookAudio5TitleUrl,
    setBookAudio5TitleUrl,
    bookAudio5Url,
    setBookAudio5Url,
    bookAudio6TitleUrl,
    setBookAudio6TitleUrl,
    bookAudio6Url,
    setBookAudio6Url,
    bookAudio7TitleUrl,
    setBookAudio7TitleUrl,
    bookAudio7Url,
    setBookAudio7Url,
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
    localStorage.setItem('holdTempId', practiceTempId)
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
        if (stepStatus == 'holding') {
          router.reload('/readingSelfcourseB') // ここでリロード
        } else if (stepStatus == 'end') {
          setPageView(nextStep)
        }
      })
  }

  //다음 스텝으로 가는 코드, 일시 정지중

  const nextStepCheck = (option, arrayNum) => {
    setIsGoNextPage(true)
  }

  const nextStep = (option, arrayNum) => {
    // if (!isGotPoint || 録音ファイルが0ではない時) {

    if (!isGotPoint) {
      // alert(arrayNum)
      //1分以上録音をするとpointをもらう、pointをもらったときに true, ここではfalseの時に録音をするように
      //Step1BのFirst録音ポイント:5
      //答えを選んでなかった時
      var step = 'Step1B'
      var homework_id = HWID
      var url = DB_CONN_URL + '/record-select-step/'
      var Url = url + step + '&' + homework_id + '&' + practiceTempId
      console.log('TEST-Step01.jsx: ', Url)
      const fetchData = async () => {
        try {
          // const response =
          await axios.get(Url).then((response) => {
            console.log('TEST-message: ', response.data.message)
            if (response.data.length >= leastRecordCount) {
              var stepStatus = 'end'
              var nextStep = 'Step2B'
              console.log('TEST-Length: ', response.data.length)
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

              /**以下のコードは後で削除 end */
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
        var url = DB_CONN_URL + '/reg-sys-hw-history/'
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

  return (
    // <div>
    <>
      {/* <div className="col-lg-1 col-md-6">
        <span className="tour-step0"></span>

        <button
          className="btn btn-primary"
          onClick={startTour}
          style={{
            width: '30px',
            height: '150px',
            paddingRight: 30,
            position: 'fixed',
            right: '0',
            top: '0',
            zIndex: 500,
            opacity: '0.7',
            // bottom: '500px',
            transition: '1s',
          }}
        >
          <span
            style={{
              writingMode: 'vertical-lr',
              fontSize: '15px',
              letterSpacing: '3px',

              // , textOrientation: 'upright'
            }}
          >
        
          </span>
        </button>
      </div> */}
      <div className="QuizBig mb-0 pb-0" style={{ border: 0 }}>
        {/* <div className="row"> */}
        {/* <div className="col-lg-2 col-md-6"></div> */}
        <div className="col-lg-12 col-md-12">
          <MonsterGet />
        </div>
        {/* <div className="col-lg-2 col-md-6">
            <FireView thisSubject={thisSubject} />
          </div>
          <div className="col-lg-1 col-md-6"></div> */}
        {/* </div> */}
      </div>

      {/* <PointBar cStep={pageView} pageTitle="Input-Self-Reading" /> */}
      <PointBar
        cStep={pageView}
        pageTitle="INTENSIVE READING"
        bcolor="orange"
        pageSubTitle="精読&nbsp;(細かいところまで丁寧に読むこと)"
        pointKeyNum={pointKeyNum}
      />
      <StepBarB cStep={pageView} />
      <div className="QuizBig" style={{ backgroundColor: 'white' }}>
        {/* test: {readingLevel}/{storyTitle}/{storyNum}/{seriesName}/{bookNum} */}
        <div className="container">
          <Joyride
            {...tourState}
            callback={callback}
            showSkipButton={true}
            scrollToFirstStep={true}
            showProgress={true}
            spotlightClicks={true}
            styles={{
              tooltipContainer: {
                textAlign: 'left',
              },
              buttonClose: {
                display: 'none',
              },
              buttonBack: {
                marginRight: 10,
              },
              buttonNext: {
                backgroundColor: 'green',
              },
              buttonSkip: {
                color: 'red',
                textAlign: 'center',
                border: '1px solid red',
                borderRadius: '5px',
                width: '150px',
              },
              options: {
                primaryColor: '#000',
                textColor: '#004a14',
                width: 500,
                zIndex: 1000,
              },
              title: {
                textAlign: 'center',
                color: 'red',
              },
            }}
            locale={{
              last: 'ツアー終了',
              skip: 'ツアーをやめる',
              next: '次へ',
              back: '前に戻る',
            }}
          />
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
                    <Floater
                      content={
                        <div
                          style={{ textAlign: 'center', lineHeight: '1.8em' }}
                        >
                          <img
                            src={bookCoverImgUrl}
                            className="mr-2 mb-3"
                            style={{
                              border: '1px solid #dedede',
                              width: '150px',
                              height: '200px',
                              opacity: '1',
                            }}
                          />{' '}
                          {bookImgUrl && (
                            <img
                              src={bookImgUrl}
                              className="mr-2 mb-3"
                              style={{
                                border: '1px solid #dedede',
                                width: '150px',
                                height: '200px',
                                opacity: '1',
                              }}
                            />
                          )}
                          <p style={{ color: 'white' }}>{storyTitle}</p>
                        </div>
                      }
                      footer=""
                      offset={0}
                      // event="hover"
                      event="click"
                      placement="left-end"
                      styles={{
                        floater: {
                          filter: 'none',
                        },
                        container: {
                          backgroundColor: '#F94545',
                          borderRadius: 5,
                          color: '#fff',
                          filter: 'none',
                          minHeight: 'none',
                          maxWidth: 400,
                          padding: 10,
                          textAlign: 'center',
                        },
                        arrow: {
                          color: '#000',
                          length: 8,
                          spread: 10,
                        },
                      }}
                      title={
                        <>
                          <h3
                            style={{
                              margin: '0 0 5px',
                              lineHeight: 1,
                              fontSize: '18px',
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}
                          >
                            {readingLevel}
                            {/* <span aria-label="Smile with Sunglasses" role="img">
                              😎
                            </span>{' '} */}
                            <hr
                              style={{ border: '0.000000001em solid white' }}
                            />
                          </h3>
                        </>
                      }
                    >
                      <img
                        className="tour-step1"
                        src="/images/homework-openbook.png"
                        style={{
                          height: '70px',
                          width: 'auto',
                          marginRight: '20px',
                        }}
                      />
                    </Floater>
                    {/* <img
                      className="tour-step1"
                      src="/images/homework-openbook.png"
                      style={{
                        height: '70px',
                        width: 'auto',
                        marginRight: '20px',
                      }}
                    /> */}
                    <img
                      src="/images/homework-listening-x.png"
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
                    <StepImportantWordstep1
                      stepWords1={stepWords1}
                      stepWords2={stepWords2}
                      stepWords3={stepWords3}
                    />
                  </div>
                </div>
              </>
            )
          })}
          <hr />
          <span className="tour-step2 tour-step3 tour-step4">
            <VoiceRecorderToS3ForSelfLessonPage
              mbn={myMbn}
              homework_id={HWID}
              practiceTempId={practiceTempId}
              audioDurationFromDB={audioDurtaionFromDB}
              pointKeyNum={pointKeyNum}
              pointStep={currentStep}
              leastRecordCount={leastRecordCount}
              pageView={pageView}
              readingHWAmount={readingHWAmount}
              readingLevel={readingLevel}
              storyTitle={storyTitle}
              storyNum={storyNum}
              seriesName={seriesName}
              bookNum={bookNum}
            />
          </span>
          <hr />

          {currentStep == 'Step5' ? (
            <>
              <button
                className="btn btn-danger mt-3"
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
                {/* <div className="col-lg-6 col-md-12">
                  <div
                    className="banner-content"
                    style={{ paddingTop: '15px' }}
                  >
                    <button
                      className="btn btn-secondary tour-step5"
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
                      }}
                      className="btn btn-primary mt-0 mb-2 tour-step6"
                      onClick={() => {
                        nextStepCheck()
                      }}
                      id="nextStep"
                    >
                      Step2へ
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* <div>
            <h1>Reading{readingLevel}</h1>
          </div> */}
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

export default Step1B
