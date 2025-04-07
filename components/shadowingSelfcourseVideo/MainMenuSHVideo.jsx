/** @format */
import react, { useContext } from 'react'
import { QuizContext } from '@/components/shadowingSelfcourseVideo/Contexts'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
// import Upload from '@/components/shadowingSelfcourseVideo/uploadDictation'
// import ViewDictationFile from '@/components/shadowingSelfcourseVideo/viewDictationFile'
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
    // audioDuration,
    // setAudioDuration,
    qrLinkVideoDictation,
    setQrLinkVideoDictation,
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    youtubeID,
    setYoutubeID,
    // dictationMin,
    // setDictationMin,
    // shadowingSpeed,
    // setShadowingSpeed,
    // dictationHow,
    // setDictationHow,
    // lessonOrder,
    // setLessonOrder,
    thisSubject,
    setThisSubject,
    // leastRecordCount_ondoku,
    // setLeastRecordCount_ondoku,
    // leastRecordCount_shadowing,
    // setLeastRecordCount_shadowing,
    // bookCoverImgUrl,
    // setBookCoverImgUrl,
    // bookImgUrl,
    // setBookImgUrl,
    shadowingLevel,
    setShadowingLevel,
    // storyTitle,
    // setStoryTitle,
    // storyStartPage,
    // setStoryStartPage,
    practiceTempId,
    setPracticeTempId,
    // audioOnOff,
    // setAudioOnOff,
    // course,
    // setCourse,
    // courseName,
    // setCourseName,
    pageView,
    setPageView,
    courseLevel,
    setCourseLevel,
    // textbook,
    // setTextbook,
    // eikenLevel,
    // setEikenLevel,
    userName,
    setUserName,
    // point,
    // setPoint,
    // totalQuestion,
    // setTotalQuestion,
  } = useContext(QuizContext)

  const nextStepCheck = (nStep) => {
    //次のstep1のsys_hw_historyテーブルのstatusがendになっている場合は、step2にいく。
    //왜냐하면, step1은 처음 한번만 하는 step이므로.
    var homework_id = HWID
    // var nextStep = 'Step1b'
    var nextStep = nStep //Step1b
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
        //alert(response.data.message)
        //stepStatus='end'があるものがあるのあk

        if (response.data.length > 0) {
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

          const fetchData2 = async () => {
            try {
              const response = await axios.get(Url)

              if (response.data.length > 0) {
                // if (response.data.response[0].stepStatus == 'holding') {

                //   var thisStep = response.data.response[0].step
                //   practiceStart(thisStep)
                //   console.log('thisStep1:', thisStep)
                // } else {
                //holdingではない場合、Step1は終わってるので、step2へへ行く。
                var thisStep = 'StepSH2'
                practiceStart(thisStep)
                console.log('thisStep2:', thisStep)
                // }
              } else {
                var thisStep = 'StepSH2'
                practiceStart(thisStep)
                console.log('thisStep3:', thisStep)
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

  // const nextStepCheck = (nStep) => {
  //   //次のStepSH1のsys_hw_historyテーブルのstatusがendになっている場合は、step2にいく。
  //   //왜냐하면, StepSH1은 처음 한번만 하는 step이므로.
  //   // alert(HWID)
  //   var homework_id = HWID
  //   // var nextStep = 'StepSH1'
  //   var nextStep = nStep
  //   var url = DB_CONN_URL + '/get-step-sys-hw-history/'
  //   var Url =
  //     url + myMbn + '&' + homework_id + '&' + nextStep + '&' + thisSubject

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(Url)

  //       if (response.data.length > 0) {
  //         //StepSH1の stepStatus==endがある場合
  //         if (response.data.response[0].step == 'StepSH1') {
  //           //alert('first')
  //           var thisStep = 'StepSH2'
  //           //console.log('thisStep-first:', thisStep)
  //         } else {
  //           var thisStep = response.data.response[0].step
  //           //alert('second')

  //           // console.log('thisStep-second:', thisStep)
  //         }
  //       } else {
  //         //아직 아무런 history가 들어 있지 않을 경우 (처음으로 이  스토리를 공부하는 경우)

  //         var thisStep = 'StepSH1'
  //         // alert('3')
  //         // console.log('###-3:', thisStep)
  //       }

  //       practiceStart(thisStep)
  //       console.log('thisStep:', thisStep)

  //       //setTotalQuestion(response.data.response.length)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  // }

  const practiceStart = (nextStep) => {
    // localStorage.removeItem('holdTempIdSH', '')
    //次のStepSH1のsys_hw_historyテーブルのstepStatusがendになっている場合は、step2にいく。
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
              // alert(nextStep)
              setPageView(nextStep)
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  // useEffect(() => {
  //   var url = DB_CONN_URL + '/get-hw-and-Shadowing-info-split-concat/'
  //   var Url = url + bookTitle + '&' + bookNum + '&' + storyNum

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(Url)
  //       let arr = []
  //       arr = response.data

  //       const sentences = arr.map(({ sentence }) => sentence).join('')

  //       // alert('sentences' + sentences)
  //       setBookStory(sentences)

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  // }, [])
  return (
    <>
      <div
        className="MenuBig p-3"
        style={{ backgroundColor: '#F5B041', color: 'white', height: 'auto' }}
      >
        <div className="col-lg-12 col-md-12" style={{ textAlign: 'center' }}>
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
          {/* <span className="ml-3" style={{ color: 'black', fontWeight: 'bold' }}>
            {userName}
          </span> */}
        </div>
        <h1 className="mb-1" style={{ fontWeight: '900' }}>
          {/* {seriesName} */}
        </h1>

        <h3 className="mb-3" style={{ color: 'white' }}>
          {courseLevel}
        </h3>

        {/* <div className="col-lg-12 col-md-12 mt-2 ">
        <img
          src={bookCoverImgUrl}
          width="150px"
          className="mr-2 mb-3"
          style={{ border: '4px solid #dedede' }}
        />
        <img
          src={bookImgUrl}
          width="150px"
          className="mb-3"
          style={{ border: '4px solid #dedede' }}
        />
      </div> */}

        {shadowingLevel == 'START' && (
          <>
            {' '}
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
              }}
              style={{ fontSize: '30px' }}
            >
              Start Video Shadowing
              <p style={{ color: 'black' }}>{userName}</p>
            </button>
          </>
        )}

        {/* <Link href="/mytopGroup">
          <button
            className="btn btn-danger mt-4 mb-4"
            style={{ fontWeight: '900', color: 'white', marginTop: '10px' }}
          >
            BEN TOPへ
            <ruby>
              戻<rt>もど</rt>
            </ruby>
            る
          </button>
        </Link> */}

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
