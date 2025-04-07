// CSS quiz_big_design.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MainMenuZ from '@/components/readingSelfcourse/MainMenuZ'
import Step1 from '@/components/readingSelfcourse/Step1Z'
import Step2 from '@/components/readingSelfcourse/Step2Z'
import Step3 from '@/components/readingSelfcourse/Step3Z'
import EndScreen from '@/components/readingSelfcourse/EndScreenZ'
import { QuizContext } from '@/components/readingSelfcourse/ContextsZ'
import Router, { useRouter } from 'next/router'

function readingSelfCourseZ() {
  //get값이 넘어왔을 경우
  const { query } = useRouter()
  const cN = query.cN //courseName
  const cS = query.cS //courseSelf
  const sB = query.sB //subject
  const DB_CONN_URL = process.env.DB_CONN_URL

  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const [myMbn, setMyMbn] = useState('')
  const router = useRouter() //使い方：router.replace('/')

  //初期設定
  const [course, setCourse] = useState('Input_Course')
  const [courseSelf, setCourseSelf] = useState(cS)
  const [courseName, setCourseName] = useState(cN) //self-CourseA, self-CourseB, self-CourseZ
  const [textbook, setTextbook] = useState('Oxford Reading tree')
  //SUBJECT
  const [thisSubject, setThisSubject] = useState(sB)
  const [courseLevel, setCourseLevel] = useState('')
  // const [test_group, setTest_group] = useState('1') //同じレベルの中で何番目のテストなのか
  const [HWID, setHWID] = useState('') //homework_idを入れる

  const [practiceTempId, setPracticeTempId] = useState('')

  const [eikenLevel, setEikenLevel] = useState('')
  const [userName, setUserName] = useState('')
  const [pageView, setPageView] = useState('menu')

  //最低何回練習しないといけないのか(DBから持ってくる) for Reading Course
  const [lessonOrder, setLessonOrder] = useState() //ORT教材本のレッスン順番/同じレベルの中
  const [englibLevelColor, setEnglibLevelColor] = useState()
  const [englibLevel, setEnglibLevel] = useState()
  const [leastRecordCount_step2, setLeastRecordCount_step2] = useState()
  const [leastRecordCount_step3, setLeastRecordCount_step3] = useState()

  const [point, setPoint] = useState(0)
  const [totalQuestion, setTotalQuestion] = useState(0)
  const [audioOnOff, setAudioOnOff] = useState('on')
  const [bookCoverImgUrl, setBookCoverImgUrl] = useState('')
  const [bookImgUrl, setBookImgUrl] = useState('')
  const [bookAudioUrl, setBookAudioUrl] = useState('')
  const [levelOrder, setLevelOrder] = useState('')
  const [readingLevel, setReadingLevel] = useState('')
  const [bookNum, setBookNum] = useState('')
  const [storyNum, setStoryNum] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [bookStory, setBookStory] = useState('')
  const [storyTitle, setStoryTitle] = useState('')
  const [seriesName, setSeriesName] = useState('')
  const [storyStartPage, setStoryStartPage] = useState('')

  const [LEVEL_school_level, setLEVEL_school_level] = useState('')
  const [LEVEL_eiken_level, setLEVEL_eiken_level] = useState('')
  const [LEVEL_toeic_level, setLEVEL_toeic_level] = useState('')
  const [LEVEL_self_course_ok, setLEVEL_self_course_ok] = useState('')
  const [LEVEL_level, setLEVEL_level] = useState('')
  const [LEVEL_englib_reading_level, setLEVEL_englib_reading_level] =
    useState('')
  const [LEVEL_level_color, setLEVEL_level_color] = useState('')
  let logOut = () => {
    // setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
    localStorage.removeItem('userName', '')
    localStorage.removeItem('cbn', '')
    localStorage.removeItem('bbn', '')
    localStorage.removeItem('memberSort', '')
    //console.log('bar reload', loginStatus)
    Router.replace('/loginGroup')
  }
  useEffect(() => {
    if (!cN || cN == '') {
      logOut()
    }
  }, [])

  useEffect(() => {
    if (
      localStorage.getItem('loginStatus') !== 'true' ||
      !localStorage.getItem('loginStatus')
    ) {
      alert('先にログインしてください。')
      router.push('/loginGroup/')
    }
  }, [G_loginStatus])

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      const fetchData1 = async () => {
        var holdTempId = localStorage.getItem('holdTempId')
        // alert(holdTempId)
        try {
          if (!holdTempId) {
            var tempid = Math.floor(Math.random() * 999999999999999)
            setPracticeTempId(tempid)
            console.log(
              'practiceTempId&& holdtempidost-ない時:',
              practiceTempId
            )
          } else if (holdTempId) {
            setPracticeTempId(holdTempId)
            console.log('practiceTempId-ある時:', practiceTempId)
          } else {
            var tempid = Math.floor(Math.random() * 999999999999999)
            setPracticeTempId(tempid)
          }

          // }
        } catch (error) {
          console.log(error)
        }
      }
      fetchData1()
    }
  }, [])

  //無限ループしない
  const bar = {}
  const bar2 = {}

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)
      var url = DB_CONN_URL + '/get-sys_member_lesson_set_BtoB/'
      var Url = url + mbn + '&' + courseName

      const fetchData1 = async () => {
        try {
          axios.get(Url).then((response) => {
            if (!response.data.status) {
              //alert(response.data.message)
              localStorage.removeItem('token', '')
              localStorage.removeItem('loginStatus', '')
              localStorage.removeItem('email', '')
              localStorage.removeItem('mbn', '')
              router.replace('/loginGroup') // ここでリダイレクト
            } else {
              setUserName(response.data.response[0].name_eng)

              setReadingLevel(response.data.response[0].readingLevel)
              setLeastRecordCount_step2(
                response.data.response[0].howmany_r_practice_record_with_audio
              )
              setLeastRecordCount_step3(
                response.data.response[0].howmany_r_practice_record_no_audio
              )
              setEnglibLevelColor(response.data.response[0].level_color)
            }
          })
        } catch (error) {
          console.log(error)
        }
      }

      fetchData1()
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)

      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-and-ORT-info/'
          var Url = url + mbn
          const response = await axios.get(Url)

          //setHWbookInfo(response.data)
          setHWID(response.data[0].homework_id)
          setEnglibLevel(response.data[0].englibLevel)
          setBookStory(response.data[0].story)
          setSeriesName(response.data[0].seriesName)
          setBookTitle(response.data[0].bookTitle)
          setBookNum(response.data[0].bookNum)
          setStoryNum(response.data[0].storyNum)
          setStoryTitle(response.data[0].storyTitle)
          setLevelOrder(response.data[0].levelOrder)
          setReadingLevel(response.data[0].readingLevel)
          setLessonOrder(response.data[0].lessonOrder)
          setStoryStartPage(response.data[0].storyStartPage)

          const bci = response.data[0].imgURL
          setBookCoverImgUrl(bci)

          const baudio =
            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/ORT/' +
            response.data[0].readingLevel +
            '/audio/' +
            response.data[0].audio1

          setBookAudioUrl(baudio)
        } catch (error) {
          console.log(error)
        }
      }

      fetchData2()
    }
  }, [])

  return (
    <div className="AppBig">
      {/* <h1>lessonorder:{lessonOrder}</h1> */}
      {/* <h1>p:{practiceTempId}</h1> */}

      <QuizContext.Provider
        value={{
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
          LEVEL_school_level,
          setLEVEL_school_level,
          LEVEL_eiken_level,
          setLEVEL_eiken_level,
          LEVEL_toeic_level,
          setLEVEL_toeic_level,
          LEVEL_self_course_ok,
          setLEVEL_self_course_ok,
          LEVEL_level,
          setLEVEL_level,
          LEVEL_englib_reading_level,
          setLEVEL_englib_reading_level,
          LEVEL_level_color,
          setLEVEL_level_color,
        }}
      >
        {pageView === 'menu' && <MainMenuZ />}
        {pageView === 'Step1' && <Step1 />}
        {pageView === 'Step2' && <Step2 />}
        {pageView === 'Step3' && <Step3 />}
        {pageView === 'finished' && <EndScreen />}

        {/* {pageView === 'menu' && <MainMenuZ />}
        {pageView === 'Step1' && <EndScreen />}
        {pageView === 'Step2' && <EndScreen />}
        {pageView === 'Step3' && <EndScreen />}
        {pageView === 'finished' && <EndScreen />} */}
      </QuizContext.Provider>
    </div>
  )
}

export default readingSelfCourseZ
