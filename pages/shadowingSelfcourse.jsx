// CSS quiz_big_design.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

import MainMenuSH from '@/components/shadowingSelfcourse/MainMenuSH'
import StepSH1 from '@/components/shadowingSelfcourse/StepSH1'
import StepSH2 from '@/components/shadowingSelfcourse/StepSH2'
import StepSH3 from '@/components/shadowingSelfcourse/StepSH3'
import StepSH4 from '@/components/shadowingSelfcourse/StepSH4'
import EndScreenSH from '@/components/shadowingSelfcourse/EndScreenSH'
import EndScreenSHLESSON from '@/components/shadowingSelfcourse/EndScreenSHLESSON'

import { QuizContext } from '@/components/shadowingSelfcourse/Contexts'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우

function shadowingSelfcourse() {
  //get값이 넘어왔을 경우
  const { query } = useRouter()
  const cN = query.cN //courseName
  const cS = query.cS //courseSelf
  const sB = query.sB //subject

  const DB_CONN_URL = process.env.DB_CONN_URL
  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const [myMbn, setMyMbn] = useState('')
  const router = useRouter() //使い方：router.replace('/')

  // const [fromStage, setFromStage] = useState()
  //初期設定
  const [course, setCourse] = useState('Input_Course')
  // const [courseSelf, setCourseSelf] = useState('self')
  // const [courseName, setCourseName] = useState('CourseSD_SC') //self-CourseA, self-CourseB, self-CourseZ
  // //SUBJECT
  // const [thisSubject, setThisSubject] = useState('SELF SHADOWING')
  const [courseSelf, setCourseSelf] = useState(cS)
  const [courseName, setCourseName] = useState(cN) //self-CourseA, self-CourseB, self-CourseZ
  const [thisSubject, setThisSubject] = useState(sB) //SUBJECT
  const [textbook, setTextbook] = useState('')
  // const [textbook, setTextbook] = useState('English Listening Power')
  const [courseLevel, setCourseLevel] = useState('')

  // const [test_group, setTest_group] = useState('1') //同じレベルの中で何番目のテストなのか
  const [HWID, setHWID] = useState('') //homework_idを入れる
  const [practiceTempId, setPracticeTempId] = useState('')
  const [eikenLevel, setEikenLevel] = useState('')
  const [userName, setUserName] = useState('')
  const [pageView, setPageView] = useState('menu')

  //最低何回練習しないといけないのか(DBから持ってくる) for Reading Course
  const [leastRecordCount_ondoku, setLeastRecordCount_ondoku] = useState()
  const [leastRecordCount_shadowing, setLeastRecordCount_shadowing] = useState()
  const [lessonOrder, setLessonOrder] = useState()
  const [point, setPoint] = useState(0)
  const [totalQuestion, setTotalQuestion] = useState(0)
  const [audioOnOff, setAudioOnOff] = useState('on')
  const [bookCoverImgUrl, setBookCoverImgUrl] = useState('')
  const [bookImgUrl, setBookImgUrl] = useState('')
  const [bookAudioUrl, setBookAudioUrl] = useState('')
  const [shadowingLevel, setShadowingLevel] = useState('')
  const [bookNum, setBookNum] = useState('')
  const [storyNum, setStoryNum] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [bookStory, setBookStory] = useState('')
  const [storyTitle, setStoryTitle] = useState('')
  const [seriesName, setSeriesName] = useState('')
  const [storyStartPage, setStoryStartPage] = useState('')
  const [dictationStart, setDictationStart] = useState('')
  const [dictationHow, setDictationHow] = useState('')
  const [qrLinkVideoDictation, setQrLinkVideoDictation] = useState()
  const [shadowingHWAmount, setShadowingHWAmount] = useState()
  const [dictationSec, setDictationSec] = useState()

  let logOut = () => {
    // setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('MypageMbn', '')
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
  //useEffectの無限ループしないために
  const bar = {}
  const bar2 = {}
  const bar3 = {}

  // useEffect(() => {
  //   if (
  //     localStorage.getItem('loginStatus') !== 'true' ||
  //     !localStorage.getItem('loginStatus')
  //   ) {
  //     alert('先にログインしてください。1')
  //     router.push('/loginGroup/')
  //   }
  // }, [G_loginStatus])

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      const fetchData1 = async () => {
        var holdTempIdSH = localStorage.getItem('holdTempIdSH')
        // alert(holdTempIdSH)
        try {
          if (!holdTempIdSH) {
            var tempid = Math.floor(Math.random() * 999999999999999)
            setPracticeTempId(tempid)
            console.log(
              'practiceTempId&& holdtempidost-ない時:',
              practiceTempId
            )
          } else if (holdTempIdSH) {
            setPracticeTempId(holdTempIdSH)
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
    } else {
      alert('先にログインしてください。')
      router.push('/loginGroup/')
    }
  }, [])

  useEffect(() => {
    // const firstLoad1 = (val, index) => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)

      // alert('どこ？２')
      // alert(pageView)
      //alert(courseName)
      var url = DB_CONN_URL + '/get-sys_member_lesson_set_BtoB/'
      var Url = url + mbn + '&' + courseName

      const fetchData1 = async () => {
        try {
          axios.get(Url).then((response) => {
            if (!response.data.status) {
              // alert(response.data.message)
              localStorage.removeItem('token', '')
              localStorage.removeItem('loginStatus', '')
              localStorage.removeItem('email', '')
              localStorage.removeItem('mbn', '')
              router.replace('/loginGroup') // ここでリダイレクト
            } else {
              // alert(response.data.message)
              setUserName(response.data.response[0].name_eng)
              setLeastRecordCount_ondoku(
                response.data.response[0].howmany_sh_practice_record_ondoku
              )
              setLeastRecordCount_shadowing(
                response.data.response[0].howmany_sh_practice_record_shadowing
              )
            }
          })
        } catch (error) {
          console.log(error)
        }
      }

      fetchData1()
    }
    // }
  }, [bar2])

  //無限ループしない

  useEffect(() => {
    // const firstLoad2 = (val, index) => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)

      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-and-Shadowing-info/'
          var Url = url + mbn
          const response = await axios.get(Url)
          setHWID(response.data[0].homework_id)
          setDictationHow(response.data[0].dictationHow)
          alert(response.data[0].homework_id)
          setShadowingHWAmount(response.data[0].shadowingHWAmount)
          setCourseLevel(response.data[0].shdaowingLevel)
          setBookStory(response.data[0].story)
          setSeriesName(response.data[0].seriesName)
          setBookTitle(response.data[0].bookTitle)
          setBookNum(response.data[0].bookNum)
          setStoryNum(response.data[0].storyNum)
          setStoryTitle(response.data[0].storyTitle)
          setShadowingLevel(response.data[0].shadowingLevel)
          setSeriesName(response.data[0].seriesName)
          setStoryStartPage(response.data[0].storyStartPage)
          setLessonOrder(response.data[0].lessonOrder)
          setDictationStart(response.data[0].dictation_start)
          setDictationSec(response.data[0].dictationSec)

          var fStage = localStorage.getItem('nowStep')

          //for homework upload
          getQrLinkVideo(response.data[0].homework_id)

          // console.log('shadowingLevel', response.data[0].shdaowingLevel)

          const baudio =
            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Shadowing/' +
            response.data[0].seriesName +
            '/' +
            response.data[0].bookTitle +
            '/audio_5times/5times_' +
            response.data[0].audio_all

          setBookAudioUrl(baudio)
        } catch (error) {
          alert(error)

          console.log(error)
        }
      }

      fetchData2()
    }
    // }
  }, [bar3])

  function getQrLinkVideo(hwid) {
    // alert(hwid)
    var mbn = localStorage.getItem('MypageMbn')
    var pointkey = 'DIC-4'
    var fileDetail = 'Dictation'
    var ql =
      'https://myben.app/upload/hwup?m=' +
      mbn +
      '&sb=' +
      'SHADOWING' +
      '&hid=' +
      hwid +
      '&pti=' +
      practiceTempId +
      '&cstep=' +
      'Endscreen' +
      '&sS=' +
      'Dictation' +
      '&pntKN=' +
      pointkey +
      '&fD=' +
      fileDetail

    setQrLinkVideoDictation(ql)
  }

  return (
    <div className="AppBig">
      {/* <h1>tempid:{practiceTempId}</h1> */}
      <QuizContext.Provider
        value={{
          qrLinkVideoDictation,
          setQrLinkVideoDictation,
          dictationHow,
          setDictationHow,
          shadowingHWAmount,
          setShadowingHWAmount,
          dictationSec,
          setDictationSec,
          myMbn,
          setMyMbn,
          HWID,
          setHWID,
          lessonOrder,
          setLessonOrder,
          thisSubject,
          setThisSubject,
          leastRecordCount_ondoku,
          setLeastRecordCount_ondoku,
          leastRecordCount_shadowing,
          setLeastRecordCount_shadowing,
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
          shadowingLevel,
          setShadowingLevel,
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
          dictationStart,
          setDictationStart,
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
        }}
      >
        {/* {dictationHow}test */}
        {pageView === 'menu' &&
          (dictationHow !== '' || dictationHow !== null) && <MainMenuSH />}
        {/* {pageView === 'menu' && <MainMenuSH />} */}
        {pageView === 'StepSH1' && <StepSH1 />}
        {pageView === 'StepSH2' && <StepSH2 />}
        {pageView === 'StepSH3' && <StepSH3 />}
        {pageView === 'StepSH4' && <StepSH4 />}
        {/* {pageView === 'finished' && <EndScreenSH />} */}
        {pageView === 'finished' && courseSelf == 'SELF' && <EndScreenSH />}
        {pageView === 'finished' && courseSelf != 'SELF' && (
          <EndScreenSHLESSON />
        )}
        {/* {pageView === 'menu' && <MainMenuSH />}
        {pageView === 'StepSH1' && <EndScreenSH />}
        {pageView === 'StepSH2' && <EndScreenSH />}
        {pageView === 'StepSH3' && <EndScreenSH />}
        {pageView === 'StepSH4' && <EndScreenSH />}
        {pageView === 'finished' && <EndScreenSH />} */}
        {/* {pageView === 'menu' && fromStage == '' && <MainMenuSH />}
        {(pageView === 'StepSH1' || fromStage == 'StepSH1') && <StepSH1 />}
        {(pageView === 'StepSH2' || fromStage == 'StepSH2') && <StepSH2 />}
        {(pageView === 'StepSH3' || fromStage == 'StepSH3') && <StepSH3 />}
        {pageView === 'StepSH4' && <StepSH4 />}
        {pageView === 'finished' && <EndScreenSH />} */}
      </QuizContext.Provider>
    </div>
  )
}

export default shadowingSelfcourse
