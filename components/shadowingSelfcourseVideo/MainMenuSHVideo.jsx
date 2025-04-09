/** @format */
import react, { useContext, useEffect, useState } from 'react'
import { QuizContext } from '@/components/shadowingSelfcourseVideo/Contexts'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import ReactPlayer from 'react-player/youtube'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import UploadHWShadowing from '@/components/shadowingSelfcourseVideo/UploadHWShadowing'
import YoutubeScriptTimeInsertForStudentStepStart from '@/components/Youtube/YoutubeScriptTimeInsertForStudentStepStart'

function MainMenuSH() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const {
    shadowingHWAmount,
    setShadowingHWAmount,
    dictationStart,
    setDictationStart,
    qrLinkVideoDictation,
    setQrLinkVideoDictation,
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    youtubeID,
    setYoutubeID,

    thisSubject,
    setThisSubject,

    shadowingLevel,
    setShadowingLevel,

    practiceTempId,
    setPracticeTempId,

    pageView,
    setPageView,
    courseLevel,
    setCourseLevel,

    userName,
    setUserName,
  } = useContext(QuizContext)

  const [url, setUrl] = useState('') // 컴포넌트 최상단에서 선언

  useEffect(() => {
    const youID = youtubeID
    if (youID) {
      setUrl('https://www.youtube.com/embed/' + youID)
    }
  }, [youtubeID])

  const nextStepCheck = (nStep) => {
    //次のstep1のsys_hw_historyテーブルのstatusがendになっている場合は、step2にいく。
    //왜냐하면, step1은 처음 한번만 하는 step이므로.
    var homework_id = HWID
    // console.log('TEST:homework_id', homework_id)
    // var nextStep = 'Step1b'
    var nextStep = nStep //Step1b
    // console.log('TEST:nextStep', nStep)
    // alert('nextStep')
    // alert(nextStep)

    //Step1bのstepStatus==endなのかをチェック

    const fetchData = async () => {
      //Server側で、step1 AND stepStatus='end'もチェックする
      var url = DB_CONN_URL + '/get-step-sys-hw-history/'

      var Url =
        url + myMbn + '&' + homework_id + '&' + nextStep + '&' + thisSubject

      try {
        const response = await axios.get(Url)
        // console.log('TEST:response.data.message', response.data.message)
        // console.log('TEST:return_mbn', response.data.mbn)
        // console.log('TEST:return_homework_id', response.data.homework_id)
        // console.log('TEST:return_nextStep', response.data.nextStep)
        // console.log('TEST:return_thisSubject', response.data.thisSubject)
        // console.log('TEST:data.length', response.data.length)
        // console.log('TEST:response.data.message', response.data.message)

        if (response.data.length > 0) {
          // alert(response.data.message)
          //step1をすでに終わった場合
          //step1bの stepStatus==endがある場合 最後のデーター(response[0]が Step1B、stepStatus=endの場合)、つまりこの宿題でStep1Bを終わらせた場合は
          //いつもstep2からスタートする
          // if (response.data.response[0].step == 'Step1B') {
          //最後のhw-historyデーターのstepStatus==holdingの場合をチェック

          //step1が終わったら、次はどのstepにいけばいい？ここから。
          //その１）step2へ行く。
          //その２）holdingをチェックしてあったらそのstepに行く
          var url = DB_CONN_URL + '/get-step-sys-hw-history-holding/'
          var Url = url + myMbn + '&' + homework_id + '&' + thisSubject
          alert(Url)
          const fetchData2 = async () => {
            try {
              const response = await axios.get(Url)
              alert(response.data.message)
              console.log('TEST:response.data.message', response.data.message)
              if (response.data.length > 0) {
                //holdingではない場合、Step1は終わってるので、step2へへ行く。
                var thisStep = 'StepSH2'
                practiceStart(thisStep)
                // console.log('thisStep2:', thisStep)
                alert('2')
                // }
              } else {
                alert('1')
              }

              // practiceStart(thisStep)
              // console.log('thisStep4:', thisStep)
            } catch (error) {
              console.log(error)
            }
          }
          fetchData2()
          // } else {
          //   // step1が endではない場合、
          //   var thisStep = 'Step1B'
          //   practiceStart(thisStep)
          //   console.log('thisStep-no-step1-end:', thisStep)
          // }
        } else {
          //step1をまだ終わってない場合。
          //아직 아무런 history가 들어 있지 않을 경우 (처음으로 이  스토리를 공부하는 경우)
          var thisStep = 'StepSH1'
          practiceStart(thisStep)
          console.log('thisStep-no-history2:', thisStep)
        }

        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  const practiceStart = (nextStep) => {
    // localStorage.removeItem('holdTempIdSH', '')
    //次のStepSH1のsys_hw_historyテーブルのstepStatusがendになっている場合は、step2にいく。
    //왜냐하면, StepSH1은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
        var homework_id = HWID
        var step = nextStep
        var pti = practiceTempId
        var url = DB_CONN_URL + '/reg-sys-hw-history'
        // console.log('2TEST:url', url)
        axios
          .post(url, {
            mbn: myMbn,
            homework_id: homework_id,
            step: step,
            practiceTempId: pti,
            thisSubject: thisSubject,
          })
          .then((response) => {
            console.log('2TEST:response.data.status', response.data.status)
            console.log('2TEST:response.data.message', response.data.message)
            console.log('2TEST:myMbn', myMbn)
            console.log('2TEST:homework_id', homework_id)
            console.log('2TEST:step', step)
            console.log('2TEST:pti', pti)
            console.log('2TEST:thisSubject', thisSubject)

            console.log('2TEST:return_mbn', response.data.mbn)
            console.log('2TEST:return_homework_id', response.data.homework_id)
            console.log('2TEST:step', response.data.step)
            console.log('2TEST:return_thisSubject', response.data.thisSubject)
            console.log('2TEST:NowRegdate', response.data.NowRegdate)
            console.log('2TEST:NowRegtime', response.data.NowRegtime)
            console.log('2TEST:youtube', youtubeID)
            if (!response.data.status) {
            } else {
              // alert(nextStep)
              setPageView(nextStep)
              // console.log('2TEST:nextStep', nextStep)
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  return (
    <>
      <div
        className="MenuBig p-3"
        style={{ backgroundColor: '#F5B041', color: 'white', height: 'auto' }}
      >
        {' '}
        <div
          className="col-lg-12 col-md-12 mb-0"
          style={{ textAlign: 'center' }}
        >
          <Link href="/mytopGroup">
            <span
              className="btn btn-info"
              style={{
                fontWeight: '900',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              トップページへ戻る
            </span>
          </Link>
        </div>
        {/* <div className="col-lg-12 col-md-12" style={{ textAlign: 'center' }}>
          <Link href="/mytopGroup">
            <span
              className="btn btn-info"
              style={{
                fontWeight: '900',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              トップページへ戻る
            </span>
          </Link>
          <br />
          <br />
          <p style={{ color: 'black', fontWeight: 'bold' }}>
            現在、シャドーイングのシステムがまだ復旧できてない状況ですので、以下のビデオで練習を行なってください。
          </p>
          <br />
          <br />

          {!youtubeID ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="spinner"></div>
              <p>ビデオがすぐ表示されます。</p>
              <style jsx>{`
                .spinner {
                  border: 6px solid #f3f3f3;
                  border-top: 6px solid #3498db;
                  border-radius: 50%;
                  width: 40px;
                  height: 40px;
                  animation: spin 1s linear infinite;
                  margin: 0 auto 10px;
                }
                @keyframes spin {
                  0% {
                    transform: rotate(0deg);
                  }
                  100% {
                    transform: rotate(360deg);
                  }
                }
              `}</style>
            </div>
          ) : (
            <iframe
              width="100%"
              height="360"
              src={`https://www.youtube.com/embed/${youtubeID}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ marginBottom: '10px' }}
            ></iframe>
          )}
        </div> */}
        <h1 className="mb-1" style={{ fontWeight: '900' }}>
          {/* {seriesName} */}
        </h1>
        <h3 className="mb-3" style={{ color: 'white' }}>
          {courseLevel}
        </h3>
        {shadowingLevel == 'START' && (
          <>
            <div
              className="col-lg-12 col-md-12"
              style={{ textAlign: 'center' }}
            >
              {/* {HWID} */}
              <YoutubeScriptTimeInsertForStudentStepStart
                yID={youtubeID}
                homework_id={HWID}
                mbn={myMbn}
                shadowingLevel={shadowingLevel}
              />
            </div>
          </>
        )}
        {shadowingLevel != 'START' && (
          <>
            <div className="col-lg-12 col-md-12 mt-2 ">
              <h5 style={{ fontWeight: 'bold' }}>
                {/* {storyNum} */}
                <br />
                {/* 教材の{storyStartPage}ページから */}
              </h5>
              <img
                src="/images/tv.png"
                onClick={() => {
                  nextStepCheck('StepSH1')
                }}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <button
              className="startBtnBig mt-5"
              onClick={() => {
                nextStepCheck('StepSH1')
                console.log('start')
                // alert('start')
              }}
              style={{ fontSize: '30px' }}
            >
              Start Video Shadowing
              <p style={{ color: 'black' }}>{userName}</p>
            </button>
          </>
        )}
        {qrLinkVideoDictation && shadowingLevel != 'START' && (
          <>
            <div
              className="col-lg-12 col-md-12 mt-3"
              style={{
                backgroundColor: 'white',
                border: '1px solid white',
                borderRadius: '10px',
              }}
            >
              {/* {dictationStart} */}
              <center>
                <UploadHWShadowing
                  dictationStart={dictationStart}
                  currentStep="StepSH2"
                  stepStatus="Dictation Upload"
                  pointKeyNum="DIC-4"
                  homework_id={HWID}
                  qrLinkVideoDictation={qrLinkVideoDictation}
                />
              </center>
              {/* <Upload
                currentStep="StepSH2"
                stepStatus="Dictation Upload"
                pointKeyNum="DIC-4"
                homework_id={HWID}
                qrLinkVideoDictation={qrLinkVideoDictation}
              /> */}
            </div>
            <div className="col-lg-12 col-md-12">
              {/* <ViewDictationFile
                currentStep="StepSH2"
                stepStatus="Dictation Upload"
              /> */}
            </div>
          </>
        )}
      </div>
      <CopyrightFooter />
    </>
  )
}

export default MainMenuSH
