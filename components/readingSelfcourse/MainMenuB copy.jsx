/** @format */
import react, { useContext, useState, useEffect } from 'react'
import { QuizContext } from './ContextsB'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
function MainMenuB() {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [englibLevelAllInfo, setEnglibLevelAllInfo] = useState([])
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
    englibLevel,
    setEnglibLevel,
    thisSubject,
    englibLevelColor,
    setEnglibLevelColor,
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
    readingLevel,
    setReadingLevel,
    bookTitle,
    setBookTitle,
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
    storyTitle,
    setStoryTitle,
    storyStartPage,
    setStoryStartPage,
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
  } = useContext(QuizContext)

  useEffect(() => {
    var url = DB_CONN_URL + '/get-englib-level-info'

    const fetchData1 = async () => {
      try {
        axios.get(url).then((response) => {
          setEnglibLevelAllInfo(response.data.response)

          console.log('englibLevelAllInfo', englibLevelAllInfo)
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData1()
  }, [])

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

              //alert(response.data.response[0].stepStatus)
              if (response.data.length > 0) {
                if (response.data.response[0].stepStatus == 'holding') {
                  //alert(response.data.response[0].stepStatus)
                  var thisStep = response.data.response[0].step
                  practiceStart(thisStep)
                  console.log('thisStep1:', thisStep)
                } else {
                  //holdingではない場合、Step1は終わってるので、step2へへ行く。
                  var thisStep = 'Step2B'
                  practiceStart(thisStep)
                  console.log('thisStep2:', thisStep)
                }
              } else {
                var thisStep = 'Step2B'
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
          var thisStep = 'Step1B'
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
    localStorage.removeItem('holdTempId', '')
    //次のstep1Bのsys_hw_historyテーブルのstepStatusがendになっている場合は、step2にいく。
    //왜냐하면, step1B은 처음 한번만 하는 step이므로.

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
            // if (!response.data.status) {
            // } else {
            // if (response.data.length > 0) {
            // alert(response.data.status)
            if (response.data.status) {
              setPageView(nextStep)
            } else {
              setPageView('Step1B')
            }
            // }
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
        style={{
          // backgroundColor: englibLevelColor,
          color: 'white',
          height: 'auto',
          border: '10px solid #dedede',
          borderRadius: '20px',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-12 mt-5  ">
              <h1 className="mb-1" style={{ fontWeight: '900' }}>
                {seriesName}
              </h1>
              <p style={{ color: 'white' }}>{userName}</p>
              <h2
                className="mb-1"
                style={{ color: 'white', fontWeight: '900' }}
              >
                {readingLevel}
              </h2>
              <img
                src={bookCoverImgUrl}
                className="mr-2 mb-3"
                style={{
                  border: '4px solid #dedede',
                  width: '150px',
                  height: '200px',
                }}
              />
              <img
                src={bookImgUrl}
                className="mb-3"
                style={{
                  border: '4px solid #dedede',
                  width: '150px',
                  height: '200px',
                }}
              />
              <h5 style={{ fontWeight: 'bold' }}>
                {storyNum}
                <br />
                教材の{storyStartPage}ページから
              </h5>
              <button
                className="startBtnBig mt-5"
                onClick={() => {
                  nextStepCheck('Step1B')
                }}
              >
                Start Reading
              </button>
              <Link href="/mytopGroup">
                <button
                  className="btn btn-info mt-5"
                  style={{
                    fontWeight: '900',
                    color: 'white',
                    marginTop: '10px',
                  }}
                >
                  GO BACK TO MYPAGE
                </button>
              </Link>
            </div>
            <div
              className="col-lg-3 col-md-12"
              style={{
                backgroundColor: 'white',
                border: '1px solid white',
                borderRadius: '10px',
                color: 'black',
                textAlign: 'center',
                padding: '5px',
              }}
            >
              <h6>
                <b>レベル表</b>
              </h6>
              {englibLevelAllInfo.map((val, key) => {
                return (
                  <>
                    {val.englib_reading_level == englibLevel ? (
                      <p
                        style={{
                          backgroundColor: val.level_color,
                          marginBottom: 1,
                          color: 'black',
                          fontSize: '12px',
                          padding: '6px',
                          // width: '60%',
                        }}
                        data-balloon-visible
                        aria-label="あなたのリーディングレベル"
                        data-balloon-pos="right"
                        data-balloon-length="medium"
                      >
                        {setEnglibLevelColor(val.color)}
                        {val.englib_reading_level}
                        {val.eiken_level !== ''
                          ? ' | 英検' + val.eiken_level
                          : ' | Starter'}
                      </p>
                    ) : (
                      <p
                        style={{
                          backgroundColor: val.level_color,
                          marginBottom: 1,
                          color: 'black',
                          fontSize: '12px',
                          padding: '6px',
                          // width: '60%',
                        }}
                      >
                        {val.englib_reading_level}
                        {val.eiken_level !== ''
                          ? ' | 英検' + val.eiken_level
                          : ' | Starter'}
                      </p>
                    )}
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <CopyrightFooter />
    </>
  )
}

export default MainMenuB
