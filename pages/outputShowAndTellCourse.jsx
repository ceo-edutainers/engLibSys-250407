// CSS quiz_big_design.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MainMenuOST from '@/components/Output_ShowAndTell/MainMenuOST'
import Step1OST from '@/components/Output_ShowAndTell/Step1OST'
import Step2OST from '@/components/Output_ShowAndTell/Step2OST'
import Step3OST from '@/components/Output_ShowAndTell/Step3OST'
import Step1OST_TEST_TYPE from '@/components/Output_ShowAndTell/Step1OST_TEST_TYPE'
import Step2OST_TEST_TYPE from '@/components/Output_ShowAndTell/Step2OST_TEST_TYPE'
import Step3OST_TEST_TYPE from '@/components/Output_ShowAndTell/Step3OST_TEST_TYPE'
import EndScreenOST from '@/components/Output_ShowAndTell/EndScreenOST'
import { QuizContext } from '@/components/Output_ShowAndTell/Contexts'
import Router, { useRouter } from 'next/router'

function outputShowAndTellCourse() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')
  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const [myMbn, setMyMbn] = useState('')

  //初期設定
  const [course, setCourse] = useState('Output_Course')
  const [courseName, setCourseName] = useState('CourseST') //self-CourseA, self-CourseB, self-CourseZ

  //SUBJECT

  const [showandtellTitle, setShowandtellTitle] = useState()
  const [showandtellTitle_Level, setShowandtellTitle_Level] = useState()
  const [showandtellTitle_yourLanguage, setShowandtellTitle_yourLanguage] =
    useState()
  const [thisSubject, setThisSubject] = useState('SHOW AND TELL')
  const [showandtell_type, setShowandtell_type] = useState()
  const [courseLevel, setCourseLevel] = useState('')
  const [HWID, setHWID] = useState('') //homework_idを入れる
  const [practiceTempId, setPracticeTempId] = useState('')
  const [userName, setUserName] = useState('')
  const [pageView, setPageView] = useState('menu')
  const [audioOnOff, setAudioOnOff] = useState('on')
  const [point, setPoint] = useState(0)
  const [yoyakuDate, setYoyakuDate] = useState()
  const [yoyakuTime, setYoyakuTime] = useState()
  const [storyTitle, setStoryTitle] = useState('')
  const [teacherName, setTeacherName] = useState('')
  const [tbn, setTbn] = useState('')
  const [outlineLimitWords, setOutlineLimitWords] = useState('200')
  const [scriptLimitWords, setScriptLimitWords] = useState('300')
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
        var holdTempIdOST = localStorage.getItem('holdTempIdOST')
        // alert(holdTempId)
        try {
          if (!holdTempIdOST) {
            var tempid = Math.floor(Math.random() * 999999999999999)
            setPracticeTempId(tempid)
            console.log(
              'practiceTempId&& holdtempidost-ない時:',
              practiceTempId
            )
          } else if (holdTempIdOST) {
            setPracticeTempId(holdTempIdOST)
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
      // console.log('Url1:', Url)
      const fetchData1 = async () => {
        try {
          axios.get(Url).then((response) => {
            if (!response.data.status) {
              alert(response.data.message)
              localStorage.removeItem('token', '')
              localStorage.removeItem('loginStatus', '')
              localStorage.removeItem('email', '')
              localStorage.removeItem('MypageMbn', '')
              router.replace('/loginGroup') // ここでリダイレクト
            } else {
            }
          })
        } catch (error) {
          console.log(error)
        }
      }

      fetchData1()
    }
  }, [])
  // const bar2 = {}

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)

      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/'
          var Url = url + mbn
          // alert(Url)
          const response = await axios.get(Url)
          // alert(response.data.status)
          // alert(response.data.result[0].homework_id)
          // setHWbookInfo(response.data)
          // alert('homework_id' + response.data[0].homework_id)
          // alert(response.data.result[0].homework_id)

          // setUserName(response.data.name_eng)

          setYoyakuDate(response.data.result[0].yoyakuDate)
          setHWID(response.data.result[0].homework_id)
          setYoyakuTime(response.data.result[0].yoyakuTime)
          setTeacherName(response.data.result[0].teacher_name)
          setTbn(response.data.result[0].teacher_barcode_num)
          setOutlineLimitWords(
            response.data.result[0].showandtell_outline_limit_words
          )
          setScriptLimitWords(
            response.data.result[0].showandtell_script_limit_words
          )
          setShowandtell_type(response.data.result[0].showandtell_type)
          setShowandtellTitle(response.data.result[0].showandtellTitle)
          setShowandtellTitle_Level(
            response.data.result[0].showandtellTitle_Level
          )
          setShowandtellTitle_yourLanguage(
            response.data.result[0].showandtellTitle_yourLanguage
          )
          // alert(response.data[0].showandtell_type)
        } catch (error) {
          alert(error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }, [])

  // useEffect(() => {
  //   const fetchData2 = async () => {
  //     // if (localStorage.getItem('loginStatus') == 'true') {
  //     var mbn = localStorage.getItem('MypageMbn')
  //     setMyMbn(mbn)

  //     try {
  //       const { data } = await axios.get(
  //         `${DB_CONN_URL}/get-hw-show-and-tell-info-first-page/${mbn}`
  //       )
  //       // const id = data.result[0].homework_id
  //       // setHWID(id) // ① 비동기 상태 업데이트
  //       alert(id)
  //       setHWID(data.result[0].homework_id)
  //       setShowandtell_type(data.result[0].showandtell_type)
  //       setYoyakuDate(data.result[0].yoyakuDate)
  //       setYoyakuTime(data.result[0].yoyakuTime)
  //       setTeacherName(data.result[0].teacher_name)
  //       setTbn(data.result[0].teacher_barcode_num)
  //       setOutlineLimitWords(data.result[0].showandtell_outline_limit_words)
  //       setScriptLimitWords(data.result[0].showandtell_script_limit_words)
  //       setShowandtell_type(data.result[0].showandtell_type)
  //       setShowandtellTitle(data.result[0].showandtellTitle)
  //       setShowandtellTitle_Level(data.result[0].showandtellTitle_Level)
  //       setShowandtellTitle_yourLanguage(
  //         data.result[0].showandtellTitle_yourLanguage
  //       )
  //       /* ...나머지 setState... */

  //       // ② HWID가 준비된 뒤에야 페이지 이동
  //       setPageView('Step1OST')
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
  //   fetchData2()
  //   // }
  // }, [])

  return (
    <div className="AppBig">
      <QuizContext.Provider
        value={{
          myMbn,
          setMyMbn,
          teacherName,
          setTeacherName,
          tbn,
          setTbn,
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
          outlineLimitWords,
          setOutlineLimitWords,
          scriptLimitWords,
          setScriptLimitWords,
          showandtell_type,
          setShowandtell_type,
          showandtellTitle,
          setShowandtellTitle,
          showandtellTitle_yourLanguage,
          setShowandtellTitle_yourLanguage,
          showandtellTitle_Level,
          setShowandtellTitle_Level,
        }}
      >
        {pageView === 'menu' && <MainMenuOST />}
        {pageView === 'Step1OST' && showandtell_type === 'normal type' && (
          <Step1OST />
        )}
        {pageView === 'Step2OST' && showandtell_type === 'normal type' && (
          <Step2OST />
        )}
        {pageView === 'Step3OST' && showandtell_type === 'normal type' && (
          <Step3OST />
        )}{' '}
        {/* {HWID && HWID} */}
        {pageView === 'Step1OST' &&
          showandtell_type === 'test type' &&
          HWID != '' && <Step1OST_TEST_TYPE hwid={HWID} />}
        {pageView === 'Step2OST' && showandtell_type === 'test type' && (
          <Step2OST_TEST_TYPE />
        )}
        {pageView === 'Step3OST' && showandtell_type === 'test type' && (
          <Step3OST_TEST_TYPE />
        )}
        {pageView === 'finished' && <EndScreenOST />}
      </QuizContext.Provider>
    </div>
  )
}

export default outputShowAndTellCourse
