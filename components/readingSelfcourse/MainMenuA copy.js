/** @format */
import react, { useContext, useState, useEffect } from 'react'
import { QuizContext } from './ContextsA'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
function MainMenuA() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
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
    //次のstep1のsys_hw_historyテーブルのstatusがendになっている場合は、step2にいく。
    //왜냐하면, step1은 처음 한번만 하는 step이므로.
    var homework_id = HWID
    // var nextStep = 'Step1'
    var nextStep = nStep
    var url = DB_CONN_URL + '/get-step-sys-hw-history/'
    var Url =
      url + myMbn + '&' + homework_id + '&' + nextStep + '&' + thisSubject

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)
        //alert(response.data.message)
        if (response.data.length > 0) {
          //step1の stepStatus==endがある場合
          if (response.data.response[0].step == 'Step1') {
            //alert('first')
            var thisStep = 'Step2'
            //console.log('thisStep-first:', thisStep)
          } else {
            var thisStep = response.data.response[0].step
            //alert('second')

            // console.log('thisStep-second:', thisStep)
          }
        } else {
          //아직 아무런 history가 들어 있지 않을 경우 (처음으로 이  스토리를 공부하는 경우)

          var thisStep = 'Step1'
          // alert('3')
          // console.log('###-3:', thisStep)
        }

        practiceStart(thisStep)
        console.log('thisStep:', thisStep)

        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
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
        // alert(thisSubject)
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
              alert(response.data.message)
            } else {
              // alert(response.data.message)
              setPageView(nextStep)
            }
          })
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
    fetchData()
  }

  return (
    <>
      <div
        className="MenuBig p-3"
        style={{ backgroundColor: '#6666cc', color: 'white', height: 'auto' }}
      >
        <h1 className="mb-1" style={{ fontWeight: '900' }}>
          {seriesName}
        </h1>
        <h3 className="mb-3" style={{ color: 'white' }}>
          {courseLevel}
        </h3>
        {/* <h7>
        <b>{bookTitle}</b>
        <br />
        <b>{storyTitle}</b>
        <br />
        {storyNum}&nbsp;&nbsp;|&nbsp;&nbsp;
        {storyStartPage}
        page~
      </h7> */}
        <div className="col-lg-12 col-md-12 mt-2 ">
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
        </div>
        <div className="col-lg-12 col-md-12 mt-2 ">
          <h5 style={{ fontWeight: 'bold' }}>
            {storyNum}
            <br />
            教材の{storyStartPage}ページから
          </h5>
        </div>
        <button
          className="startBtnBig"
          onClick={() => {
            nextStepCheck('Step1')
          }}
        >
          Start Reading
        </button>
        <Link href="/mytopGroup">
          <button
            className="btn btn-danger mt-4"
            style={{ fontWeight: '900', color: 'white', marginTop: '10px' }}
          >
            GO BACK TO MYPAGE
          </button>
        </Link>
      </div>
      <CopyrightFooter />
    </>
  )
}

export default MainMenuA
