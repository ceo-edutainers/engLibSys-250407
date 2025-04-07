// CSS quiz_big_design.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MainMenuOST from '@/components/Output_ShowAndTell/MainMenuOST'
import Step1OST from '@/components/Output_ShowAndTell/Step1OST'
import Step2OST from '@/components/Output_ShowAndTell/Step2OST'
import Step3OST from '@/components/Output_ShowAndTell/Step3OST'
import EndScreenOST from '@/components/Output_ShowAndTell/EndScreenOST'
import { QuizContext } from '@/components/Output_ShowAndTell/Contexts'
import Router, { useRouter } from 'next/router'

function outputShowAndTellCourse() {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const router = useRouter() //使い方：router.replace('/')
  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const [myMbn, setMyMbn] = useState('')

  //初期設定
  const [course, setCourse] = useState('Output_Course')
  const [courseName, setCourseName] = useState('CourseST') //self-CourseA, self-CourseB, self-CourseZ

  //SUBJECT
  const [thisSubject, setThisSubject] = useState('SHOW AND TELL')
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
    const fetchData1 = async () => {
      var holdTempIdOST = localStorage.getItem('holdTempIdOST')
      // alert(holdTempId)
      try {
        if (!holdTempIdOST) {
          var tempid = Math.floor(Math.random() * 999999999999999)
          setPracticeTempId(tempid)
          console.log('practiceTempId&& holdtempidost-ない時:', practiceTempId)
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
  }, [])

  // useEffect(() => {
  //   const fetchData1 = async () => {
  //     // alert('3')
  //     var holdTempIdOST = localStorage.getItem('holdTempIdOST')
  //     // alert('4')
  //     try {
  //       // if (practiceTempId == '' && !holdTempIdOST) {
  //       //   alert('1')
  //       //   var tempid = Math.floor(Math.random() * 999999999999999)
  //       //   setPracticeTempId(tempid)
  //       //   console.log('practiceTempId-ない時:', practiceTempId)
  //       // } else if (holdTempIdOST) {
  //       //   // alert('2')
  //       //   setPracticeTempId(holdTempIdOST)
  //       //   console.log('practiceTempId-ある時:', practiceTempId)
  //       // } else {
  //       // }

  //       if (!holdTempIdOST || holdTempIdOST == '') {
  //         setPracticeTempId(holdTempIdOST)
  //       } else {
  //         var tempid = Math.floor(Math.random() * 999999999999999)
  //         setPracticeTempId(tempid)
  //       }

  //       // }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData1()
  // }, [])

  //無限ループしない
  const bar = {}

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)
      var url = DB_CONN_URL + '/get-sys_member_lesson_set_BtoB/'
      var Url = url + mbn + '&' + courseName
      console.log('Url1:', Url)
      const fetchData1 = async () => {
        try {
          axios.get(Url).then((response) => {
            if (!response.data.status) {
              alert(response.data.message)
              localStorage.removeItem('token', '')
              localStorage.removeItem('loginStatus', '')
              localStorage.removeItem('email', '')
              localStorage.removeItem('mbn', '')
              router.replace('/loginGroup') // ここでリダイレクト
            } else {
              // alert(response.data.message)
              // setUserName(response.data.response[0].name_eng)
              //メンバーデーターが登録されてない時に以下のようにエラーを出して、ログアウトされる
              // if (response.data.response[0]) {
              //   alert('no registered member')
              //   localStorage.removeItem('token', '')
              //   localStorage.removeItem('loginStatus', '')
              //   localStorage.removeItem('email', '')
              //   localStorage.removeItem('mbn', '')
              //   router.replace('/loginGroup') // ここでリダイレクト
              //   return false
              // } else {
              // }
            }
          })
        } catch (error) {
          console.log(error)
        }
      }

      fetchData1()
    }
  }, [bar])
  const bar2 = {}
  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)

      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/'
          var Url = url + mbn
          const response = await axios.get(Url)

          //setHWbookInfo(response.data)

          setHWID(response.data[0].homework_id)
          // setUserName(response.data.name_eng)
          setYoyakuDate(response.data[0].yoyakuDate)
          setYoyakuTime(response.data[0].yoyakuTime)
          setTeacherName(response.data[0].teacher_name)
          setTbn(response.data[0].teacher_barcode_num)
        } catch (error) {
          alert(error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }, [bar2])

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
        }}
      >
        {/* <div>tempid:{practiceTempId}</div> */}
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

        {/* <MonsterGet />
        <PointBar cStep={pageView} pageTitle="Input-Self-Reading" />
        <StepBarB cStep={pageView} /> */}

        {pageView === 'menu' && <MainMenuOST />}
        {pageView === 'Step1OST' && <Step1OST />}
        {pageView === 'Step2OST' && <Step2OST />}
        {pageView === 'Step3OST' && <Step3OST />}
        {pageView === 'finished' && <EndScreenOST />}
      </QuizContext.Provider>
    </div>
  )
}

export default outputShowAndTellCourse
