/** @format */
import react, { useContext, useState, useEffect } from 'react'
import { QuizContext } from './ContextsZ'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
function MainMenuZ() {
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
  } = useContext(QuizContext)

  useEffect(() => {
    var url = DB_CONN_URL + '/get-englib-level-info'
    var Url = url

    const fetchData1 = async () => {
      try {
        axios.get(Url).then((response) => {
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
    // alert('nStep: ' + nStep)
    //次のstep1のsys_hw_historyテーブルのstatusがendになっている場合は、step2にいく。
    //왜냐하면, step1은 처음 한번만 하는 step이므로.
    var homework_id = HWID
    // var nextStep = 'Step1b'
    var nextStep = nStep //Step1b
    // alert('nextStep')
    // alert(nextStep)

    //Step1bのstepStatus==endなのかをチェック

    const fetchData = async () => {
      var url = DB_CONN_URL + '/get-step-sys-hw-history/'
      var Url =
        url + myMbn + '&' + homework_id + '&' + nextStep + '&' + thisSubject
      // alert('-0')
      try {
        const response = await axios.get(Url)
        // alert(response.data.message)
        //stepStatus='end'があるものがあるのあk
        // alert('0')
        if (response.data.length > 0) {
          var url = DB_CONN_URL + '/get-step-sys-hw-history-holding/'
          var Url = url + myMbn + '&' + homework_id + '&' + thisSubject

          const fetchData2 = async () => {
            try {
              const response = await axios.get(Url)

              if (response.data.length > 0) {
                if (response.data.response[0].stepStatus == 'holding') {
                  var thisStep = response.data.response[0].step

                  //alert('tempid' + response.data.response[0].practiceTempId)
                  practiceStart(thisStep)
                  console.log('thisStep1:', thisStep)
                } else {
                  //holdingではない場合、Step1は終わってるので、step2へへ行く。
                  // alert('4')
                  var thisStep = 'Step2'
                  practiceStart(thisStep)
                  console.log('thisStep2:', thisStep)
                }
              } else {
                // alert('5')
                var thisStep = 'Step2'
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
          //step1をまだ終わってない場合。stepstatus!=end
          //아직 아무런 end history가 들어 있지 않을 경우 (처음으로 이  스토리를 공부하는 경우)
          var thisStep = 'Step1'
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
    //次のstep1Bのsys_hw_historyテーブルのstepStatusがendになっている場合は、step2にいく。
    //왜냐하면, step1B은 처음 한번만 하는 step이므로.

    localStorage.removeItem('holdTempId', '')

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
              setPageView('Step1')
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
              <p style={{ color: 'black' }}>{userName}</p>
              <h2
                className="mb-1"
                style={{
                  color: 'black',
                  fontWeight: '900',
                  marginBottom: '15px',
                }}
              >
                {readingLevel == 'Stage1plus' && 'Level1plus'}
                {readingLevel == 'Stage2' && 'Level2'}
                {readingLevel == 'Stage3' && 'Level3'}
                {readingLevel == 'Stage4' && 'Level4'}
                {readingLevel == 'Stage5' && 'Level5'}
                {readingLevel == 'Stage6' && 'Level6'}
                {readingLevel == 'Stage7' && 'Level7'}
                {readingLevel == 'Stage8' && 'Level8'}
                {readingLevel == 'Stage9' && 'Level9'}
              </h2>
              <img
                src={bookCoverImgUrl}
                className="mr-2 mb-3"
                style={{
                  border: '4px solid #dedede',
                  width: '170px',
                  height: '200px',
                }}
              />
              {/* 
              <h5 style={{ fontWeight: 'bold' }}>
                {storyNum}
                <br />
                教材の{storyStartPage}ページから
              </h5> */}

              <p
                style={{
                  border: '1px solid #dedede',
                  borderRadius: '10px',
                  padding: 10,
                }}
              >
                <a
                  href="https://www.oxfordreadingclub.jp/my/bookshelf"
                  target="_blank"
                >
                  <button className="btn btn-primary">
                    <img src="/images/orc-logo.png" width="200px" />
                  </button>
                </a>
                <p>
                  ①上記のボタンを押して「Oxford Reading Club」にログインします。
                  <br />
                  ②この画面の上に見える本のタイトルを「Oxford Reading
                  Club」で検索し、
                  <img src="/images/orc-view.png" width="20px" />
                  を押してそのタイトルのストーリーが見える状態にします。
                  <br />
                  ③以下の「Start Reading」ボタンを押して学習をスタートします。
                </p>
              </p>
              <button
                className="startBtnBig mt-5"
                onClick={() => {
                  nextStepCheck('Step1')
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
                  BEN TOPへ
                </button>
              </Link>
            </div>
            <div
              className="col-lg-3 col-md-12 mt-5 pt-5"
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

export default MainMenuZ
