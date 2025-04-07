// CSS quiz_big_design.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MainMenuA from '@/components/readingSelfcourse/MainMenuA'
import Step1 from '@/components/readingSelfcourse/Step1'
import Step2 from '@/components/readingSelfcourse/Step2'
import Step3 from '@/components/readingSelfcourse/Step3'
import EndScreen from '@/components/readingSelfcourse/EndScreenA'
import { QuizContext } from '@/components/readingSelfcourse/ContextsA'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우

function readingSelfCourseA() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  //get값이 넘어왔을 경우
  const { query } = useRouter()
  const cN = query.cN //courseName
  const cS = query.cS //courseSelf
  const sB = query.sB //subject
  const [redirectTopGruopUrl, setRedirectTopGruopUrl] = useState('/loginGroup')
  // const [redirectTopPersonalUrl, setRedirectTopPersonalUrl] =
  //   useState('/loginPersonal')
  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const [myMbn, setMyMbn] = useState('')
  const router = useRouter() //使い方：router.replace('/')

  //初期設定
  const [course, setCourse] = useState('Input_Course')

  // const [courseName, setCourseName] = useState('CourseA_SC') //self-CourseA, self-CourseB, self-CourseZ
  const [courseName, setCourseName] = useState(cN) //self-CourseA, self-CourseB, self-CourseZ
  // const [courseSelf, setCourseSelf] = useState('self')
  const [courseSelf, setCourseSelf] = useState(cS)
  // const [thisSubject, setThisSubject] = useState('SELF READING')
  const [thisSubject, setThisSubject] = useState(sB)
  const [textbook, setTextbook] = useState('Reading Triumphs')
  //SUBJECT

  const [courseLevel, setCourseLevel] = useState('')
  // const [test_group, setTest_group] = useState('1') //同じレベルの中で何番目のテストなのか
  const [HWID, setHWID] = useState('') //homework_idを入れる
  const [practiceTempId, setPracticeTempId] = useState('')
  const [eikenLevel, setEikenLevel] = useState('')
  const [userName, setUserName] = useState('')
  const [pageView, setPageView] = useState('menu')

  //最低何回練習しないといけないのか(DBから持ってくる) for Reading Course
  const [lessonOrder, setLessonOrder] = useState() //
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
    Router.push('/loginGroup')
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
      router.push(redirectTopGruopUrl)
    }
  }, [])
  // }, [G_loginStatus])

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

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)
      var url = DB_CONN_URL + '/get-sys_member_lesson_set_BtoB/'
      var Url = url + mbn + '&' + courseName

      const fetchData1 = async () => {
        try {
          axios.get(Url).then((response) => {
            // alert(response.data.status)
            if (!response.data.status) {
              localStorage.removeItem('token', '')
              localStorage.removeItem('loginStatus', '')
              localStorage.removeItem('email', '')
              localStorage.removeItem('mbn', '')
              // router.replace('/loginGroup') // ここでリダイレクト
              // if (localStorage.getItem('memberSort') !== 'PERSONAL') {
              //   router.replace(redirectTopPersonalUrl)
              // } else {
              //   router.replace(redirectTopGruopUrl)
              // }
              router.replace(redirectTopGruopUrl)
            } else {
              setUserName(response.data.response[0].name_eng)
              setReadingLevel(response.data.response[0].readingLevel)
              // setLevelOrder(response.data.response[0].levelOrder)
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
          // alert('courseName' + courseName)

          var url = DB_CONN_URL + '/get-hw-and-Reading-Triumphs-info/'

          var Url = url + mbn
          const response = await axios.get(Url)

          //setHWbookInfo(response.data)

          setHWID(response.data[0].homework_id)
          setEnglibLevel(response.data[0].englibLevel)
          // setCourseLevel(response.data[0].readingLevel)
          setBookStory(response.data[0].story)
          setSeriesName(response.data[0].seriesName)
          setBookTitle(response.data[0].bookTitle)
          setBookNum(response.data[0].bookNum)
          setStoryNum(response.data[0].storyNum)
          setStoryTitle(response.data[0].storyTitle)
          setReadingLevel(response.data[0].readingLevel)
          setLessonOrder(response.data[0].lessonOrder)
          setStoryStartPage(response.data[0].storyStartPage)

          console.log('testreadingLevel', courseLevel)

          const bci =
            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Reading+Triumphs/' +
            response.data[0].readingLevel +
            '/img/' +
            response.data[0].readingLevel +
            '-Cover.png'
          setBookCoverImgUrl(bci)

          const bim =
            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Reading+Triumphs/' +
            response.data[0].readingLevel +
            '/img/' +
            response.data[0].storyNum +
            '.png'
          setBookImgUrl(bim)

          const baudio =
            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Reading+Triumphs/' +
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
        {/* {cN}/{cS}/{sB} */}
        {/* <div>
          readingLevel: {readingLevel}
          <br />
          courseLevel: {courseLevel}
          <br />
          {LEVEL_school_level}
          <br />
          {LEVEL_eiken_level} <br />
          {LEVEL_toeic_level}
          <br />
          {LEVEL_self_course_ok} <br />
          {LEVEL_level} <br />
          {LEVEL_englib_reading_level}
          <br />
          {LEVEL_level_color}
        </div> */}
        {/* <div>
          <b>myMbn:</b>
          {myMbn}
          <br />
          <b>bookCoverImgUrl:</b> {bookCoverImgUrl}
          <br /> <b>bookImgUrl:</b>
          {bookImgUrl}
          <br /> <b>bookAudioUrl:</b>
          {bookAudioUrl}
          <br />
          <b>bookStory:</b>
          {bookStory}
          <br />
          <b>practiceTempId:</b>
          {practiceTempId}
          <br />
          <b>audioOnOff:</b>
          {audioOnOff}
          <br />
          <b>point:</b>
          {point}
          <br />
          <b>
            userName:
            <b />
            {userName}
            <br />
            <b>course:</b>
            {course}
            <br /> courseName:{courseName}
            <br />
            <b>textbook:</b>
            {textbook}
            <br /> <b>pageView:</b>
            {pageView}
            <br /> <b>courseLevel:</b>
          </b>
          {courseLevel}
          <br />
          <b>bookTitle:</b>
          {bookTitle}
          <br />
          <b>storyTitle:</b>
          {storyTitle}
          <br />
          <b> bookNum:</b>
          {bookNum}
          <br />
          <b> storyNum:</b>
          {storyNum}
          <br />
          <b>totalQuestion:</b>
          {totalQuestion}
          <br />
        </div> */}
        {pageView === 'menu' && <MainMenuA />}
        {pageView === 'Step1' && <Step1 />}
        {pageView === 'Step2' && <Step2 />}
        {pageView === 'Step3' && <Step3 />}
        {pageView === 'finished' && <EndScreen />}
      </QuizContext.Provider>
    </div>
  )
}

export default readingSelfCourseA
