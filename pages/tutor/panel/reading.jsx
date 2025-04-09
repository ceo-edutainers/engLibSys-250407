import React, { useState, useEffect } from 'react'
import SplitPanelReading from '@/components/Splitpanel/SplitPanelReading'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'

import ViewGrammraTerms from '@/components/Output_ShowAndTell/ViewGrammarTerms'
import ViewEnglibLevel from '@/components/Output_ShowAndTell/ViewEnglibLevel2'
import ViewTrouble from '@/components/Output_ShowAndTell/ViewTrouble'
import ViewSetHW from '@/components/Output_ShowAndTell/ViewSetHW'
import ViewSetHWNoShadowing from '@/components/Output_ShowAndTell/ViewSetHWNoShadowing'
import ViewReading from '@/components/Output_ShowAndTell/ViewReading'
import ViewPhonics from '@/components/Output_ShowAndTell/ViewPhonics'
import ViewPastVerb from '@/components/Output_ShowAndTell/ViewPastVerb'
import ViewTutorOnlyMemo from '@/components/Output_ShowAndTell/ViewTutorOnlyMemo'
import ViewToMomAdd from '@/components/Output_ShowAndTell/ViewToMomAdd'
import ViewConversation from '@/components/Output_ShowAndTell/ViewConversation'

import ViewGrammar from '@/components/Output_ShowAndTell/ViewGrammar'
import ViewSchoolEnglish from '@/components/Output_ShowAndTell/ViewSchoolEnglish'
import ViewVerbalWriting from '@/components/Output_ShowAndTell/ViewVerbalWriting'
import ViewShadowingVideo from '@/components/Output_ShowAndTell/ViewShadowingVideo'
// import ViewShadowingBook from '@/components/Output_ShowAndTell/ViewShadowingBook'
import ViewEIKEN from '@/components/Output_ShowAndTell/ViewEIKEN'
import ViewIELTS from '@/components/Output_ShowAndTell/ViewIELTS'
import ViewTOEFL from '@/components/Output_ShowAndTell/ViewTOEFL'
import ViewTOEIC from '@/components/Output_ShowAndTell/ViewTOEIC'
import ViewSSAT from '@/components/Output_ShowAndTell/ViewSSAT'
import ViewSAT from '@/components/Output_ShowAndTell/ViewSAT'

import RndHomework from '@/components/Output_ShowAndTell/RndHomework'

import RndStudyHistory from '@/components/Output_ShowAndTell/RndStudyHistory'
import RndFeedback from '@/components/Output_ShowAndTell/RndFeedback'
// import RndEditor from '@/components/Output_ShowAndTell/RndEditor'

import emailjs from 'emailjs-com'

const READINGA = () => {
  useEffect(() => {
    localStorage.setItem('mbn', '')
    localStorage.setItem('email', '')
  }, [])

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  // const [isFinishThisLesson, setIsFinishThisLesson] = useState(false)
  // const [isNoShow, setIsNoShow] = useState(false)
  // const [isSuccessSetNewLesson, setIsSuccessSetNewLesson] = useState(false)
  // const [isNoshowAndSuccessSetNewLesson, setIsNoshowAndSuccessSetNewLesson] =
  //   useState(false)
  //get값이 넘어왔을 경우

  const [mbn, setMbn] = useState()
  const [homework_id, setHomework_id] = useState()
  const [subJ, setSubj] = useState()
  const [tbn, setTbn] = useState()
  const [courseName, setCourseName] = useState()

  const [stepStatus, setStepStatus] = useState()
  const [pointKeyNum, setPointKeyNum] = useState()
  const [fileDetail, setFileDetail] = useState()
  // const router = useRouter()
  // const { query } = useRouter()
  const router = useRouter()
  const query = router.query // 중복 제거

  // const mbn = query.m
  // const homework_id = query.homework_id
  // const subJ = query.subJ
  // const tbn = query.tbn
  // const courseName = query.cN

  useEffect(() => {
    if (router.isReady) {
      // console.log('router.query', router.query)
      setMbn(router.query.m)
      setHomework_id(router.query.homework_id)
      setSubj(router.query.subJ)
      setTbn(router.query.tbn)
      setCourseName(router.query.cN)
      functionMemberInfo(router.query.m)
    }
    // alert(router.query.m)
  }, [router.isReady])

  //reading materials open
  const [isNowOpen, setIsNowOpen] = useState(false)
  const [openMaterialPage, setOpenMaterialPage] = useState()
  useEffect(() => {
    var page = 'https://www.myben.app/materials/readingMaterials'
    // 'https://www.myenglib.com/onlesson/teacher_book_list_bc.php?mbn=123'

    setOpenMaterialPage(page)
  })
  const handleMaterialPage = () => {
    setIsNowOpen(false)
    window.open(openMaterialPage, '_blank', 'noopener,noreferrer')
  }

  const backUrl = '/tutor/upcoming?tbn=' + tbn
  const [course, setCourse] = useState()
  const [dictationHow, setDictationHow] = useState('')
  const [bookPhonicsUrl, setBookPhonicsUrl] = useState()
  const [bookConversationUrl, setBookConversationUrl] = useState()
  const [shadowingView, setShadowingView] = useState(false)
  const [readingView, setReadingView] = useState(false)
  const [phonicsView, setPhonicsView] = useState(false)
  const [pastverbView, setPastverbView] = useState(false)
  const [conversationView, setConversationView] = useState(false)
  const [grammarView, setGrammarView] = useState(false)
  const [eikenView, setEikenView] = useState(false)
  const [ieltsView, setIeltsView] = useState(false)
  const [toeflView, setToeflView] = useState(false)
  const [toeicView, setToeicView] = useState(false)
  const [ssatView, setSsatView] = useState(false)
  const [satView, setSatView] = useState(false)
  const [schoolEnglishView, setSchoolEnglishView] = useState(false)
  const [verbalWritingView, setVerbalWritingView] = useState(false)
  const [readingLevelView, setReadingLevelView] = useState(false)
  const [troubleShootView, setTroubleShootView] = useState(false)
  const [prolongLessonView, setProlongLessonView] = useState(false)
  const [errorReportView, setErrorReportView] = useState(false)

  const [toMomAddView, setToMomAddView] = useState(false)
  const [viewFinishLesson, setViewFinishLesson] = useState(false)

  const [sendEmail, setSendEmail] = useState()
  const [yoyakuDate, setYoyakuDate] = useState()
  const [yoyakuTime, setYoyakuTime] = useState()
  const [yoyakuWeekday, setYoyakuWeekday] = useState()
  const [studentNameEng, setStudentNameEng] = useState()

  const [lessonSubject, setLessonSubject] = useState()
  const [pageError, setPageError] = useState()
  // const [viewPageError, setViewPageError] = useState()
  const [hwSetView, setHwSetView] = useState(false)
  const [tutorOnlyMemoView, setTutorOnlyMemoView] = useState(false)
  const [homeworkID, setHomeworkID] = useState()
  const [lessonPageTitle, setLessonPageTitle] = useState()
  const [subject, setSubject] = useState(subJ)
  const [googleDocLink, setGoogleDocLink] = useState()
  const [nameEng, setNameEng] = useState()
  const [tutorNameEng, setTutorNameEng] = useState()
  const [classLink, setClassLink] = useState()

  const [bookTitle, setBookTitle] = useState()
  const [bookNum, setBookNum] = useState()
  const [storyNum, setStoryNum] = useState()
  const [storyEndNum, setStoryEndNum] = useState()
  const [storyTitle, setStoryTitle] = useState()
  const [listOrder, setListOrder] = useState()
  const [seriesName, setSeriesName] = useState()
  const [readingLevel, setReadingLevel] = useState()
  const [newLesson, setNewLesson] = useState(false)
  const [whenDetail, setWhenDetail] = useState()
  const [dictationSt, setDictationSt] = useState()
  const [extendedLessonHours, setExtendedLessonHours] = useState()
  const [extendedLessonMin, setExtendedLessonMin] = useState()
  const [extendedLessonMemo, setExtendedLessonMemo] = useState()
  const [doShadowingForThisCourse, setDoShadowingForThisCourse] = useState()
  // console.log('query.mbn:', mbn)
  // console.log('query.course:', courseName)
  // console.log('query.courseName:', query.cN)

  const [isSendEmailToAbsentStudent, setIsSendEmailToAbsentStudent] =
    useState(false)

  const [isAbsentStudentJoined, setIsAbsentStudentJoined] = useState(false)
  const [isBackConfirm, setIsBackConfirm] = useState(false)

  const [isCheckedAbsentBtn, setIsCheckedAbsentBtn] = useState(false)

  const [phonicsBigCourse, setPhonicsBigCourse] = useState()
  const [phonicsLessonTitle, setPhonicsLessonTitle] = useState()
  const [phonicsLessonOrder, setPhonicsLessonOrder] = useState()

  const [questionBigCourse, setQuestionBigCourse] = useState()
  const [questionLessonOrder, setQuestionLessonOrder] = useState()

  const [converFinishAlert, setConverFinishAlert] = useState()
  // useEffect(() => {
  //   functionMemberInfo()
  // }, [router.isReady])
  const functionMemberInfo = (mbn) => {
    // alert(mbn)
    axios
      .post(DB_CONN_URL + '/member_info_mbn', {
        mbn: mbn,
      })
      .then((response) => {
        if (response.data.status) {
          setSendEmail(response.data.response[0].email)
          // alert(response.data.response[0].email)
          var first_name = response.data.response[0].first_name
          var last_name = response.data.response[0].last_name
          var fullName = first_name + ' ' + last_name
          setStudentNameEng(fullName)

          //alert('yes') //for test
          // console.log('ok', response.data.response[0].email)
        }
      })
  }

  const sendEmailtoAbsentStudent = () => {
    setIsSendEmailToAbsentStudent(false)
    setIsCheckedAbsentBtn(true)
    // if (!sendEmail || !studentNameEng) {
    //   alert('The email information has not been loaded yet. Please try again.')
    //   return
    // } else {
    //   alert('success')
    // }
    var templateParams = {
      to_admin: 'online-help@edutainers.jp',
      to_email: sendEmail,
      to_student_name: studentNameEng,
      tutor_name: tutorNameEng,
      classLink: classLink,
      lessonSubject: lessonSubject,
      yoyakuDate: yoyakuDate,
      yoyakuTime: yoyakuTime,
      yoyakuWeekday: yoyakuWeekday,
      reply_to: 'online-help@edutainers.jp',
      from_name: 'engLib-support',
    }

    // env環境設定=next.config.js
    const YOUR_SERVICE_ID = process.env.REACT_APP_YOUR_SERVICE_ID
    const YOUR_USER_ID = process.env.REACT_APP_YOUR_USER_ID
    const YOUR_TEMPLATE_ID_to_student = 'template_gxxau1a'
    const YOUR_TEMPLATE_ID_to_admin = 'template_s3mzdps'

    emailjs.init(YOUR_USER_ID)
    emailjs
      .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID_to_student, templateParams)
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        function (error) {
          console.log('FAILED...', error)
          return false
        }
      )
    emailjs
      .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID_to_admin, templateParams)
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        function (error) {
          console.log('FAILED...', error)
          return false
        }
      )
  }

  const sendEmailJoinedStudent = () => {
    setIsSendEmailToAbsentStudent(false)
    setIsCheckedAbsentBtn(false)
    setIsAbsentStudentJoined(false)

    var d = ''
    d = new Date()
    var Y = d.getFullYear()
    var M = d.getMonth() + 1
    var D = d.getDate()
    var h = d.getHours()
    var m = d.getMinutes()
    var s = d.getSeconds()
    // let ms = myFun_addZero(d.getMilliseconds())

    if (M < 10) {
      M = '0' + M
    }
    if (D < 10) {
      D = '0' + D
    }
    if (h < 10) {
      h = '0' + h
    }
    if (m < 10) {
      m = '0' + m
    }
    if (s < 10) {
      s = '0' + s
    }
    var NowRegdate = Y + '-' + M + '-' + D
    var NowRegtime = h + ':' + m + ':' + s
    var Joined_Time = NowRegdate + ' ' + NowRegtime

    var templateParams = {
      to_admin: 'online-help@edutainers.jp',
      to_email: sendEmail,
      to_student_name: studentNameEng,
      tutor_name: tutorNameEng,
      classLink: classLink,
      lessonSubject: lessonSubject,
      yoyakuDate: yoyakuDate,
      yoyakuTime: yoyakuTime,
      yoyakuWeekday: yoyakuWeekday,
      Joined_Time: Joined_Time,
      reply_to: 'online-help@edutainers.jp',
      from_name: 'engLib-support',
    }

    // env環境設定=next.config.js
    // const YOUR_SERVICE_ID = process.env.REACT_APP_YOUR_SERVICE_ID
    const YOUR_SERVICE_ID = process.env.NEXT_PUBLIC_YOUR_SERVICE_ID
    // const YOUR_USER_ID = process.env.REACT_APP_YOUR_USER_ID
    const YOUR_USER_ID = process.env.NEXT_PUBLIC_YOUR_USER_ID
    const YOUR_TEMPLATE_ID_to_student = 'template_rggl66c'
    const YOUR_TEMPLATE_ID_to_admin = 'template_09netzr'

    if (!YOUR_SERVICE_ID || !YOUR_USER_ID || !YOUR_TEMPLATE_ID_to_student) {
      console.error('Missing EmailJS configuration.')
      alert('Email Setting Error. Please contact to Admin.')
      return
    } else {
      emailjs.init(YOUR_USER_ID)
    }

    emailjs
      .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID_to_student, templateParams)
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        function (error) {
          console.log('FAILED...', error)
          return false
        }
      )
    emailjs
      .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID_to_admin, templateParams)
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        function (error) {
          console.log('FAILED...', error)
          return false
        }
      )
  }

  useEffect(() => {
    // ブラウザバックを禁止する
    const fetchData = async () => {
      try {
        history.pushState(null, null, location.href)
        window.addEventListener('popstate', (e) => {
          setIsOpenBackMypage(true)
          // alert(
          //   'ブラウザバックはできません。練習をやめる時はページの下にある練習を止めるボタンを押してください。'
          // )
          // history.go(1)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return false
  }, [])

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  //無限ループしない
  // const bar2 = {}
  useEffect(() => {
    // console.log('newLesson', newLesson)
    if (router.isReady) {
      if (
        localStorage.getItem('T_loginStatus') == 'true' &&
        newLesson == false
      ) {
        var subject = router.query.subJ
        localStorage.setItem('mbn', query.m)
        // var mbn = localStorage.getItem('mbn', query.m)
        var mbn = router.query.m

        var Url =
          DB_CONN_URL +
          '/get-hw-reading-first-page-for-tutor-page-per-subject/' +
          mbn +
          '&' +
          subject

        // alert('Url' + Url)
        console.log('Url1:' + Url)
        const fetchData2 = async () => {
          try {
            axios.get(Url).then((response) => {
              // alert('length' + response.data.length)
              if (response.data.length > 0) {
                setNameEng(response.data[0].name_eng)
                setTutorNameEng(response.data[0].teacher_name)
                setClassLink(response.data[0].classLink)
                setHomeworkID(response.data[0].homework_id)
                setLessonPageTitle(response.data[0].lessonPageTitle)
                setSubject(response.data[0].subject)
                setCourse(response.data[0].course)
                setSeriesName(response.data[0].seriesName)
                setBookTitle(response.data[0].bookTitle)
                setBookNum(response.data[0].bookNum)
                setStoryNum(response.data[0].storyNum)
                setStoryEndNum(response.data[0].storyEndNum)
                setStoryTitle(response.data[0].storyTitle)
                setListOrder(response.data[0].support_listOrder)
                setReadingLevel(response.data[0].readingLevel)
                setPhonicsBigCourse(response.data[0].phonicsBigCourse)
                setPhonicsLessonTitle(response.data[0].phonicsLessonTitle)
                setPhonicsLessonOrder(response.data[0].phonicsLessonOrder)
                setQuestionBigCourse(response.data[0].questionBigCourse)
                setQuestionLessonOrder(response.data[0].questionLessonOrder)
                setYoyakuDate(response.data[0].yoyakuDate)
                setYoyakuTime(response.data[0].yoyakuTime)
                setYoyakuWeekday(response.data[0].yoyakuWeekday)
                setLessonSubject(response.data[0].subject)
                setDoShadowingForThisCourse(
                  response.data[0].doShadowingForThisCourse
                )
                setDictationHow(response.data[0].dictationHow)
                // alert(response.data[0].doShadowingForThisCourse)
                var pA = response.data[0].phonicsBigCourse
                var pB = response.data[0].phonicsLessonTitle
                var pC = response.data[0].phonicsLessonOrder
                var fsl =
                  'https://myenglib.com/myenglib/backup/lesson_sub_phonics.php?num_p=&test=test1&phonicsBigCourse=' +
                  pA +
                  '&phonicsLessonTitle=' +
                  pB +
                  '&phonicsLessonOrder=' +
                  pC
                setBookPhonicsUrl(fsl)

                var cA = response.data[0].questionBigCourse
                var cB = response.data[0].questionLessonOrder
                //myenglib.com/myenglib/backup/lesson_sub_question.php?questionBigCourse=".$row_p[questionBigCourse]."&questionLessonOrder=".$row_p[questionLessonOrder]

                //終了しても、見せる。
                if (cB == '3-1') {
                  var fsl2 =
                    'https://myenglib.com/myenglib/backup/lesson_sub_question.php?questionBigCourse=START&questionLessonOrder=1-1'
                  setConverFinishAlert(
                    'This student has completed all the lessons.'
                  )
                } else {
                  var fsl2 =
                    'https://myenglib.com/myenglib/backup/lesson_sub_question.php?questionBigCourse=' +
                    cA +
                    '&questionLessonOrder=' +
                    cB
                }
                setBookConversationUrl(fsl2)
              }
            })
          } catch (error) {
            // alert('error1' + error)
            console.log(error)
          }
        }

        fetchData2()
      }
    }
  }, [router.isReady])

  if (isError) return <h1>Error, try again reading!</h1>
  if (isLoading) return <h1>Loading..........................</h1>

  const lessonExtendedSet = () => {
    var url = DB_CONN_URL + '/update-lesson-extended/'

    axios
      .get(
        url +
          mbn +
          '&' +
          extendedLessonHours +
          '&' +
          extendedLessonMin +
          '&' +
          extendedLessonMemo +
          '&' +
          homework_id
      )
      .then((response) => {
        setExtendedLessonHours()
        setExtendedLessonMin()
        setExtendedLessonMemo()
        lessonExtendedList()
        alert('recorded extended lesson time')
      })
  }

  useEffect(() => {
    lessonExtendedList
  }, [])
  const [extendedLessonInfo, setExtendedLessonInfo] = useState()
  const lessonExtendedList = () => {
    var url = DB_CONN_URL + '/get-lesson-extended/'

    axios.get(url + mbn + '&' + homework_id).then((response) => {
      // alert('url' + url)
      // alert(response.data.length)
      // alert(response.data[0].extended_memo)
      setExtendedLessonHours()
      setExtendedLessonMin()
      setExtendedLessonMemo()
      setExtendedLessonInfo(response.data)
    })
  }

  const delExtendedLessonInfo = (autoid) => {
    var url = DB_CONN_URL + '/cancel-lesson-extended/'
    axios.get(url + mbn + '&' + autoid).then((response) => {
      setExtendedLessonHours()
      setExtendedLessonMin()
      setExtendedLessonMemo()
      setExtendedLessonInfo()
      lessonExtendedList()
      alert('cancelled extended lesson time')
    })
  }

  const sendPageError = () => {
    var tutor_name = tutorNameEng
    var tutor_memo = pageError
    var howmuch = 50

    var url = DB_CONN_URL + '/send-lesson-page-error-from-tutor/'
    axios
      .get(
        url +
          tbn +
          '&' +
          homework_id +
          '&' +
          tutor_name +
          '&' +
          tutor_memo +
          '&' +
          howmuch
      )
      .then((response) => {
        setPageError()
        setViewPageError(false)
        alert('Reported an Error.')
      })
  }

  function handleGoBackPage() {
    ///tutor/tutor-temporary-page
  }
  // const selectNumList = (val, setMode) => {
  //   const PERCENTAGES = [...new Array(val)].map((each, key) => {
  //     var num = key + 1
  //     return (
  //       <option value={num} selected={setMode == '1' && selected}>
  //         {num}
  //       </option>
  //     )
  //   })
  // }

  const [shadowingMaterial, setShadowingMaterial] = useState()
  useEffect(() => {
    if (router.isReady) {
      var mbn = router.query.m

      var Url = DB_CONN_URL + '/get-hw-shadowing-lesson/' + mbn

      // alert('Url' + Url)
      // console.log('###Url', Url)
      // const fetchData2 = async () => {
      //   try {
      //
      axios.get(Url).then((response) => {
        setShadowingMaterial(response.data[0].material_sort)
      })
    }
  }, [router.isReady])
  return (
    <>
      <div
        className="row pt-1 mr-0 pr-0"
        style={{
          top: '0px',
          width: '100%',
          zIndex: 1,
          backgroundColor: 'white',
          border: '1px solid #dedede',
          textAlign: 'center',
        }}
      >
        <div>
          {homework_id && (
            <RndHomework homework_id={homework_id} subject={subject} />
          )}

          {mbn && (
            <RndStudyHistory
              homework_id={homework_id}
              mbn={mbn}
              courseName={courseName}
            />
          )}
          {/* <RndFeedback homework_id={homework_id} /> */}
          {/* <RndEditor
            homework_id={homework_id}
            mbn={mbn}
            tbn={tbn}
            // tutorNameEng={tutorNameEng}
            // subject={subject}
            // course={course}
            // seriesName={seriesName}
            // courseName={courseName}
            // readingLevel={readingLevel}
            // bookTitle={bookTitle}
            // bookNum={bookNum}
            // storyNum={storyNum}
            // storyTitle={storyTitle}
          /> */}
        </div>
        <div className="col-lg-4 col-md-12 text-left">
          {/* <Link href="/tutor/tutor-temporary-page">
            <a
              className="btn btn-danger text-white ml-1 mr-2 mt-2"
              style={{ height: 35 }}
            >
              Back
            </a>
          </Link> */}

          {/* <a
            className="btn btn-warning text-#2C3E50 ml-4 mr-2 mt-2"
            onClick={() => window.location.reload(false)}
            style={{ height: 35, fontWeight: '600' }}
          >
            Update to the latest H.W
          </a> */}
        </div>

        <div className="col-lg-12 col-md-12 text-center pb-1">
          <h1>
            {lessonPageTitle && lessonPageTitle}
            <br />
            {/* <span
              className="btn btn-danger p-1 mr-2"
              style={{ fontSize: '25px' }}
              onClick={() => {
                setViewFinishLesson(!viewFinishLesson)
              }}
            >
              レッスンが終了しました。
            </span> */}
          </h1>
          {/* <div
            className="p-3"
            style={{
              width: '100%',
              display: viewFinishLesson ? 'block' : 'none',
              textAlign: 'center',
              backgroundColor: '#dedede',
            }}
          >
            <h1>
              <span
                className="btn btn-primary p-1 mr-3"
                style={{ fontSize: '25px' }}
                onClick={() => {
                  setIsFinishThisLesson(true)
                  setNewLesson(true)
                }}
              >
                <p style={{ color: 'white', fontSize: '13px' }}>
                  問題なくレッスンが終わった。
                </p>
                Finish this Lesson
              </span>
              <span
                className="btn btn-danger p-1 mr-3"
                style={{ fontSize: '25px' }}
                onClick={() => {
                  setIsNoShow(true)
                  setNewLesson(true)
                }}
              >
                <p style={{ color: 'white', fontSize: '13px' }}>
                  生徒が最後まで来てない
                </p>
                No-Show
              </span>
            </h1>
          </div> */}

          <p>
            Tutor:&nbsp;<b>{tutorNameEng}</b>
            &nbsp;&nbsp;|&nbsp;&nbsp;Student:&nbsp;
            <b>{nameEng}</b>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            {yoyakuDate}[{yoyakuWeekday}]&nbsp;{yoyakuTime}
            {/* <br />
            {sendEmail}/{mbn} */}
            <br />
            <a href={classLink} target="_blank">
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/31X9eeywR3L.jpg"
                style={{ width: '40px', height: 'auto' }}
              />
            </a>
            {/* <Link href={backUrl}> */}
            <span
              className="btn btn-secondary text-white ml-3"
              style={{ height: 35 }}
              onClick={() => {
                setIsBackConfirm(true)
              }}
            >
              Back
            </span>
            {/* {troubleShootView ? (
              <>
                <span
                  className="btn btn-danger ml-3"
                  onClick={() => {
                    setTroubleShootView(!troubleShootView)
                    // handleClear()
                  }}
                >
                  Trouble
                </span>
              </>
            ) : (
              <>
                <span
                  className="btn btn-secondary ml-3"
                  onClick={() => {
                    setTroubleShootView(!troubleShootView)

                    // handleClear()
                  }}
                >
                  {' '}
                  Trouble
                </span>
              </>
            )} */}
            {/* {prolongLessonView ? (
              <>
                <span
                  className="btn btn-danger ml-3"
                  onClick={() => {
                    // setProlongLesson(!prolongLesson)
                    setProlongLessonView(!prolongLessonView)
                  }}
                >
                 
                  REPORT EXTENDED TIME
                </span>
              </>
            ) : (
              <>
                <span
                  className="btn btn-secondary ml-3"
                  onClick={() => {
                    // setProlongLesson(!prolongLesson)
                    setProlongLessonView(!prolongLessonView)
                    // handleClear()
                  }}
                >
                  {' '}
                  REPORT EXTENDED TIME
                </span>
              </>
            )} */}
            {!isCheckedAbsentBtn ? (
              <span
                className="btn btn-danger ml-3"
                onClick={() => {
                  setIsSendEmailToAbsentStudent(true)
                  // setIsCheckedAbsentBtn(true)
                }}
              >
                NO SHOW EMAIL
              </span>
            ) : (
              <span
                className="btn btn-primary ml-3"
                onClick={() => {
                  setIsAbsentStudentJoined(true)
                }}
              >
                STUDENT JOINED
              </span>
            )}
            {/* <p>
              {email} / {yoyakuWeekday}/{yoyakuDate}/{yoyakuTime}/
              {lessonSubject}
            </p> */}
            {errorReportView ? (
              <>
                {/* <span
                  className="btn btn-danger ml-3"
                  onClick={() => {
                    setErrorReportView(!errorReportView)
                  }}
                >
                  エラー報告
                </span> */}
              </>
            ) : (
              <>
                {/* <span
                  className="btn btn-secondary ml-3"
                  onClick={() => {
                    setErrorReportView(!errorReportView)
                    // handleClear()
                  }}
                >
                  {' '}
                  エラー報告
                </span> */}
              </>
            )}
          </p>
        </div>
        <div className="col-lg-12 col-md-12 text-center pb-1">
          Important Notice Regarding This Student
        </div>
        <div className="col-lg-2 col-md-12 text-center pb-1"></div>
        <div className="col-lg-1 col-md-12 pt-2" style={{ textAlign: 'right' }}>
          {/* <a href={classLink} target="_blank">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/31X9eeywR3L.jpg"
              style={{ width: '50px', height: 'auto' }}
            />
          </a> */}
        </div>
        <div className="col-lg-1 col-md-12 pt-2" style={{ textAlign: 'right' }}>
          {/* <img
            src="/images/logo-tomei.png"
            style={{ height: '50px', width: 'auto' }}
          /> */}
        </div>
      </div>
      <div className="row">
        <div
          className="col-lg-12 col-md-12 p-3"
          style={{
            width: '100%',
            display: errorReportView ? 'block' : 'none',
            textAlign: 'center',
            backgroundColor: '#dedede',
          }}
        >
          レッスンページのエラー報告で、一レッスン当たり50円のインセンティブが付きます。詳細な内容を書いて送って下さい。
          <hr />
          <TextareaAutosize
            className="tour-step2 tour-step5"
            aria-label="minimum height"
            minRows={1}
            onChange={(e) => {
              setPageError(e.target.value)
            }}
            type="text"
            style={{ width: '500px', verticalAlign: 'middle' }}
          />
          {/* {pageError} */}
          <span
            className="btn btn-primary ml-2 pt-1 pb-1"
            onClick={() => {
              sendPageError()
            }}
          >
            Send an Error
          </span>
        </div>

        <div
          className="col-lg-12 col-md-12 p-3"
          style={{
            width: '100%',
            display: troubleShootView ? 'block' : 'none',
          }}
        >
          <ViewTrouble />
        </div>
        <div
          className="col-lg-12 col-md-12 p-3"
          style={{
            width: '100%',
            display: prolongLessonView ? 'block' : 'none',
            textAlign: 'center',
            backgroundColor: '#dedede',
          }}
        >
          レッスン時間が延長された場合、正確に終わった時間を入力します。
          先生の任意で延長した場合、延長分として認められません。
          <br />
          In case the lesson was extended, write down the exact time that it
          ended. The extended time would not be paid if it was done with your
          own decision.
          <hr />
          {/* {extendedLessonHours} */}
          Finish Time&nbsp;
          <select
            onChange={(e) => {
              setExtendedLessonHours(e.target.value)
            }}
          >
            <option value="" selected>
              =Hourse=
            </option>

            <option
              value="1"
              selected={extendedLessonHours == '1' && 'selected'}
            >
              1
            </option>
            <option
              value="2"
              selected={extendedLessonHours == '2' && 'selected'}
            >
              2
            </option>
            <option
              value="3"
              selected={extendedLessonHours == '3' && 'selected'}
            >
              3
            </option>
            <option
              value="4"
              selected={extendedLessonHours == '4' && 'selected'}
            >
              4
            </option>
            <option
              value="5"
              selected={extendedLessonHours == '5' && 'selected'}
            >
              5
            </option>
            <option
              value="6"
              selected={extendedLessonHours == '6' && 'selected'}
            >
              6
            </option>
            <option
              value="7"
              selected={extendedLessonHours == '7' && 'selected'}
            >
              7
            </option>
            <option
              value="8"
              selected={extendedLessonHours == '8' && 'selected'}
            >
              8
            </option>
            <option
              value="9"
              selected={extendedLessonHours == '9' && 'selected'}
            >
              9
            </option>
            <option
              value="10"
              selected={extendedLessonHours == '10' && 'selected'}
            >
              10
            </option>
            <option
              value="11"
              selected={extendedLessonHours == '11' && 'selected'}
            >
              11
            </option>
            <option
              value="12"
              selected={extendedLessonHours == '12' && 'selected'}
            >
              12
            </option>
            <option
              value="13"
              selected={extendedLessonHours == '13' && 'selected'}
            >
              13
            </option>
            <option
              value="14"
              selected={extendedLessonHours == '14' && 'selected'}
            >
              14
            </option>
            <option
              value="15"
              selected={extendedLessonHours == '15' && 'selected'}
            >
              15
            </option>
            <option
              value="16"
              selected={extendedLessonHours == '16' && 'selected'}
            >
              16
            </option>
            <option
              value="17"
              selected={extendedLessonHours == '17' && 'selected'}
            >
              17
            </option>
            <option
              value="18"
              selected={extendedLessonHours == '18' && 'selected'}
            >
              18
            </option>
            <option
              value="19"
              selected={extendedLessonHours == '19' && 'selected'}
            >
              19
            </option>
            <option
              value="20"
              selected={extendedLessonHours == '20' && 'selected'}
            >
              20
            </option>
            <option
              value="21"
              selected={extendedLessonHours == '21' && 'selected'}
            >
              21
            </option>
            <option
              value="22"
              selected={extendedLessonHours == '22' && 'selected'}
            >
              22
            </option>
            <option
              value="23"
              selected={extendedLessonHours == '23' && 'selected'}
            >
              23
            </option>
            <option
              value="24"
              selected={extendedLessonHours == '24' && 'selected'}
            >
              24
            </option>
          </select>
          &nbsp;h&nbsp;
          {/* {extendedLessonMin} */}
          <select
            onChange={(e) => {
              setExtendedLessonMin(e.target.value)
            }}
          >
            <option value="">=Minutes=</option>
            <option value="1" selected={extendedLessonMin == '1' && 'selected'}>
              1
            </option>
            <option value="2" selected={extendedLessonMin == '2' && 'selected'}>
              2
            </option>
            <option value="3" selected={extendedLessonMin == '3' && 'selected'}>
              3
            </option>
            <option value="4" selected={extendedLessonMin == '4' && 'selected'}>
              4
            </option>
            <option value="5" selected={extendedLessonMin == '5' && 'selected'}>
              5
            </option>
            <option value="6" selected={extendedLessonMin == '6' && 'selected'}>
              6
            </option>
            <option value="7" selected={extendedLessonMin == '7' && 'selected'}>
              7
            </option>
            <option value="8" selected={extendedLessonMin == '8' && 'selected'}>
              8
            </option>
            <option value="9" selected={extendedLessonMin == '9' && 'selected'}>
              9
            </option>
            <option
              value="10"
              selected={extendedLessonMin == '10' && 'selected'}
            >
              10
            </option>
            <option
              value="11"
              selected={extendedLessonMin == '11' && 'selected'}
            >
              11
            </option>
            <option
              value="12"
              selected={extendedLessonMin == '12' && 'selected'}
            >
              12
            </option>
            <option
              value="13"
              selected={extendedLessonMin == '13' && 'selected'}
            >
              13
            </option>
            <option
              value="14"
              selected={extendedLessonMin == '14' && 'selected'}
            >
              14
            </option>
            <option
              value="15"
              selected={extendedLessonMin == '15' && 'selected'}
            >
              15
            </option>
            <option
              value="16"
              selected={extendedLessonMin == '16' && 'selected'}
            >
              16
            </option>
            <option
              value="17"
              selected={extendedLessonMin == '17' && 'selected'}
            >
              17
            </option>
            <option
              value="18"
              selected={extendedLessonMin == '18' && 'selected'}
            >
              18
            </option>
            <option
              value="19"
              selected={extendedLessonMin == '19' && 'selected'}
            >
              19
            </option>
            <option
              value="20"
              selected={extendedLessonMin == '20' && 'selected'}
            >
              20
            </option>
            <option
              value="21"
              selected={extendedLessonMin == '21' && 'selected'}
            >
              21
            </option>
            <option
              value="22"
              selected={extendedLessonMin == '22' && 'selected'}
            >
              22
            </option>
            <option
              value="23"
              selected={extendedLessonMin == '23' && 'selected'}
            >
              23
            </option>
            <option
              value="24"
              selected={extendedLessonMin == '24' && 'selected'}
            >
              24
            </option>
            <option
              value="25"
              selected={extendedLessonMin == '25' && 'selected'}
            >
              25
            </option>
            <option
              value="26"
              selected={extendedLessonMin == '26' && 'selected'}
            >
              26
            </option>
            <option
              value="27"
              selected={extendedLessonMin == '27' && 'selected'}
            >
              27
            </option>
            <option
              value="28"
              selected={extendedLessonMin == '28' && 'selected'}
            >
              28
            </option>
            <option
              value="29"
              selected={extendedLessonMin == '29' && 'selected'}
            >
              29
            </option>
            <option
              value="30"
              selected={extendedLessonMin == '30' && 'selected'}
            >
              30
            </option>
            <option
              value="31"
              selected={extendedLessonMin == '31' && 'selected'}
            >
              31
            </option>
            <option
              value="32"
              selected={extendedLessonMin == '32' && 'selected'}
            >
              32
            </option>
            <option
              value="33"
              selected={extendedLessonMin == '33' && 'selected'}
            >
              33
            </option>
            <option
              value="34"
              selected={extendedLessonMin == '34' && 'selected'}
            >
              34
            </option>
            <option
              value="35"
              selected={extendedLessonMin == '35' && 'selected'}
            >
              35
            </option>
            <option
              value="36"
              selected={extendedLessonMin == '36' && 'selected'}
            >
              36
            </option>
            <option
              value="37"
              selected={extendedLessonMin == '37' && 'selected'}
            >
              37
            </option>
            <option
              value="38"
              selected={extendedLessonMin == '38' && 'selected'}
            >
              38
            </option>
            <option
              value="39"
              selected={extendedLessonMin == '39' && 'selected'}
            >
              39
            </option>
            <option
              value="40"
              selected={extendedLessonMin == '40' && 'selected'}
            >
              40
            </option>
            <option
              value="41"
              selected={extendedLessonMin == '41' && 'selected'}
            >
              41
            </option>
            <option
              value="42"
              selected={extendedLessonMin == '42' && 'selected'}
            >
              42
            </option>
            <option
              value="43"
              selected={extendedLessonMin == '43' && 'selected'}
            >
              43
            </option>
            <option
              value="44"
              selected={extendedLessonMin == '44' && 'selected'}
            >
              44
            </option>
            <option
              value="45"
              selected={extendedLessonMin == '45' && 'selected'}
            >
              45
            </option>
            <option
              value="46"
              selected={extendedLessonMin == '46' && 'selected'}
            >
              46
            </option>
            <option
              value="47"
              selected={extendedLessonMin == '47' && 'selected'}
            >
              47
            </option>
            <option
              value="48"
              selected={extendedLessonMin == '48' && 'selected'}
            >
              48
            </option>
            <option
              value="49"
              selected={extendedLessonMin == '49' && 'selected'}
            >
              49
            </option>
            <option
              value="50"
              selected={extendedLessonMin == '50' && 'selected'}
            >
              50
            </option>
            <option
              value="51"
              selected={extendedLessonMin == '51' && 'selected'}
            >
              51
            </option>
            <option
              value="52"
              selected={extendedLessonMin == '52' && 'selected'}
            >
              52
            </option>
            <option
              value="53"
              selected={extendedLessonMin == '53' && 'selected'}
            >
              53
            </option>
            <option
              value="54"
              selected={extendedLessonMin == '54' && 'selected'}
            >
              54
            </option>
            <option
              value="55"
              selected={extendedLessonMin == '55' && 'selected'}
            >
              55
            </option>
            <option
              value="56"
              selected={extendedLessonMin == '56' && 'selected'}
            >
              56
            </option>
            <option
              value="57"
              selected={extendedLessonMin == '57' && 'selected'}
            >
              57
            </option>
            <option
              value="58"
              selected={extendedLessonMin == '58' && 'selected'}
            >
              58
            </option>
            <option
              value="59"
              selected={extendedLessonMin == '59' && 'selected'}
            >
              59
            </option>
          </select>
          &nbsp;m
          <br />
          write the reason&nbsp;&nbsp;
          <input
            type="text"
            style={{ width: '500px' }}
            onChange={(e) => {
              setExtendedLessonMemo(e.target.value)
            }}
          />
          <span
            className="btn btn-primary ml-2 pt-1 pb-1"
            onClick={() => {
              lessonExtendedSet()
            }}
          >
            Save
          </span>
          <span
            className="btn btn-secondary ml-2 pt-1 pb-1"
            onClick={() => {
              setExtendedLessonHours()
              setExtendedLessonMin()
              setExtendedLessonMemo()
            }}
          >
            Reset
          </span>
          <hr />
          {extendedLessonInfo ? (
            extendedLessonInfo.map((val, key) => {
              return (
                <>
                  <span style={{ color: 'black' }}>
                    Finish Time：
                    {val.extended_hours}:{val.extended_min} [{val.extended_memo}
                    ]
                  </span>
                  &nbsp;
                  <span
                    className="btn btn-danger"
                    onClick={() => {
                      delExtendedLessonInfo(val.autoid)
                    }}
                  >
                    DEL
                  </span>
                </>
              )
            })
          ) : (
            <p>no information</p>
          )}
        </div>
      </div>
      <div
        className="row pt-1 mr-0 pr-0"
        style={{
          top: '0px',
          width: '100%',
          zIndex: 1,
          backgroundColor: '#ececec',
          border: '1px solid #dedede',
          textAlign: 'center',
        }}
      >
        <div
          className="col-lg-4 col-md-12 pr-0 mr-0"
          style={{ textAlign: 'right' }}
        >
          {/* <ViewGrammraTerms /> */}
        </div>
        <div
          className="col-lg-12 col-md-12 p-2"
          style={{ textAlign: 'center' }}
        >
          {readingView &&
            (courseName == 'CourseA' ||
              courseName == 'CourseB' ||
              courseName == 'CourseZ') && (
              <span
                className="btn btn-danger mr-2"
                onClick={() => {
                  setReadingView(!readingView)
                  // handleClear()
                }}
              >
                READING
              </span>
            )}
          {!readingView &&
            (courseName == 'CourseA' ||
              courseName == 'CourseB' ||
              courseName == 'CourseZ') && (
              <span
                className="btn btn-info mr-2"
                onClick={() => {
                  setReadingView(!readingView)
                  // handleClear()
                }}
              >
                READING
              </span>
            )}
          {grammarView && courseName == 'CourseGR' && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setGrammarView(!grammarView)
                // handleClear()
              }}
            >
              GRAMMAR
            </span>
          )}
          {!grammarView && courseName == 'CourseGR' && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setGrammarView(!grammarView)
                // handleClear()
              }}
            >
              GRAMMAR
            </span>
          )}
          {schoolEnglishView && courseName == 'CourseSE' && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setSchoolEnglishView(!schoolEnglishView)
                // handleClear()
              }}
            >
              SCHOOL ENGLISH
            </span>
          )}
          {!schoolEnglishView && courseName == 'CourseSE' && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setSchoolEnglishView(!schoolEnglishView)
                // handleClear()
              }}
            >
              SCHOOL ENGLISH
            </span>
          )}
          {verbalWritingView && courseName == 'CourseVR' && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setVerbalWritingView(!verbalWritingView)
                // handleClear()
              }}
            >
              VERBAL WRITING
            </span>
          )}
          {!verbalWritingView && courseName == 'CourseVR' && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setVerbalWritingView(!verbalWritingView)
                // handleClear()
              }}
            >
              VERBAL WRITING
            </span>
          )}
          {eikenView && courseName == 'CourseEK' && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setEikenView(!eikenView)
                // handleClear()
              }}
            >
              EIKEN
            </span>
          )}
          {!eikenView && courseName == 'CourseEK' && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setEikenView(!eikenView)
                // handleClear()
              }}
            >
              EIKEN
            </span>
          )}
          {ieltsView && courseName == 'CourseIEL' && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setIeltsView(!ieltsView)
                // handleClear()
              }}
            >
              IELTS
            </span>
          )}
          {!ieltsView && courseName == 'CourseIEL' && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setIeltsView(!ieltsView)
                // handleClear()
              }}
            >
              IELTS
            </span>
          )}
          {toeflView && courseName == 'CourseTFL' && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setToeflView(!toeflView)
                // handleClear()
              }}
            >
              TOEFL
            </span>
          )}
          {!toeflView && courseName == 'CourseTFL' && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setToeflView(!toeflView)
                // handleClear()
              }}
            >
              TOEFL
            </span>
          )}
          {toeicView && courseName == 'CourseTOE' && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setToeicView(!toeicView)
                // handleClear()
              }}
            >
              TOEIC
            </span>
          )}
          {!toeicView && courseName == 'CourseTOE' && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setToeicView(!toeicView)
                // handleClear()
              }}
            >
              TOEIC
            </span>
          )}
          {satView && courseName == 'CourseSAT' && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setSatView(!satView)
                // handleClear()
              }}
            >
              SAT
            </span>
          )}
          {!satView && courseName == 'CourseSAT' && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setSatView(!satView)
                // handleClear()
              }}
            >
              SAT
            </span>
          )}
          {/* {shadowingView ? 'true' : 'false'} /{doShadowingForThisCourse} */}
          {shadowingView &&
            (doShadowingForThisCourse === null ||
              doShadowingForThisCourse == '') && (
              <>
                <span
                  className="btn btn-danger mr-2"
                  onClick={() => {
                    setShadowingView(!shadowingView)
                    // handleClear()
                  }}
                >
                  {' '}
                  SHADOWING
                </span>
              </>
            )}
          {!shadowingView &&
            (doShadowingForThisCourse === null ||
              doShadowingForThisCourse == '') && (
              <>
                <span
                  className="btn btn-info mr-2"
                  onClick={() => {
                    setShadowingView(!shadowingView)
                    // handleClear()
                  }}
                >
                  {' '}
                  SHADOWING
                </span>
              </>
            )}
          {(courseName == 'CourseA' ||
            courseName == 'CourseB' ||
            courseName == 'CourseZ') &&
            phonicsView && (
              <span
                className="btn btn-danger mr-2"
                onClick={() => {
                  setPhonicsView(!phonicsView)
                  // handleClear()
                }}
              >
                PHONICS
              </span>
            )}
          {(courseName == 'CourseA' ||
            courseName == 'CourseB' ||
            courseName == 'CourseZ') &&
            !phonicsView && (
              <span
                className="btn btn-info mr-2"
                onClick={() => {
                  setPhonicsView(!phonicsView)
                  // handleClear()
                }}
              >
                PHONICS
              </span>
            )}
          {(courseName == 'CourseA' ||
            courseName == 'CourseB' ||
            courseName == 'CourseZ') &&
            conversationView && (
              <span
                className="btn btn-danger mr-2"
                onClick={() => {
                  setConversationView(!conversationView)
                  // handleClear()
                }}
              >
                200 QUESTIONS
              </span>
            )}
          {(courseName == 'CourseA' ||
            courseName == 'CourseB' ||
            courseName == 'CourseZ') &&
            !conversationView && (
              <span
                className="btn btn-info mr-2"
                onClick={() => {
                  setConversationView(!conversationView)
                  // handleClear()
                }}
              >
                200 QUESTIONS
              </span>
            )}
          {/* {pastverbView ? (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setPastverbView(!pastverbView)
                // handleClear()
              }}
            >
              VERB CONJUGATION
            </span>
          ) : (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setPastverbView(!pastverbView)
                // handleClear()
              }}
            >
              VERB CONJUGATION
            </span>
          )} */}
          {ssatView && courseName == 'CourseSSAT' && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setSsatView(!ssatView)
                // handleClear()
              }}
            >
              SSAT
            </span>
          )}
          {!ssatView && courseName == 'CourseSSAT' && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setSsatView(!ssatView)
                // handleClear()
              }}
            >
              SSAT
            </span>
          )}
          {/* {readingLevelView &&
            (courseName == 'CourseA' ||
              courseName == 'CourseB' ||
              courseName == 'CourseZ') && (
              <span
                className="btn btn-danger mr-2"
                onClick={() => {
                  setReadingLevelView(!readingLevelView)
                  // handleClear()
                }}
              >
                Reading Level
              </span>
            )}

          {!readingLevelView &&
            (courseName == 'CourseA' ||
              courseName == 'CourseB' ||
              courseName == 'CourseZ') && (
              <span
                className="btn btn-info mr-2"
                onClick={() => {
                  setReadingLevelView(!readingLevelView)
                  // handleClear()
                }}
              >
                Reading Level
              </span>
            )} */}
          {/* {hwSetView ? 'true' : 'false'} */}
          {hwSetView ? (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setHwSetView(!hwSetView)
                // handleClear()
              }}
            >
              H.W Setting
            </span>
          ) : (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setHwSetView(!hwSetView)
                // handleClear()
              }}
            >
              H.W Setting
            </span>
          )}
          {tutorOnlyMemoView ? (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setTutorOnlyMemoView(!tutorOnlyMemoView)
                // handleClear()
              }}
            >
              Tutor's Memo
            </span>
          ) : (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setTutorOnlyMemoView(!tutorOnlyMemoView)
                // handleClear()
              }}
            >
              Tutor's Memo
            </span>
          )}
          {toMomAddView ? (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setToMomAddView(!toMomAddView)
                // handleClear()
              }}
            >
              Message to Mom
            </span>
          ) : (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setToMomAddView(!toMomAddView)
                // handleClear()
              }}
            >
              Message to Mom
            </span>
          )}

          <span
            className="btn btn-info mr-2"
            onClick={() => {
              setIsNowOpen(true)
            }}
          >
            Reading Materials
          </span>
        </div>

        <div className="col-lg-12 col-md-12" style={{ textAlign: 'right' }}>
          <div
            style={{
              width: '100%',
              display: toMomAddView ? 'block' : 'none',
            }}
          >
            {/* subJ:{subJ} */}
            {mbn && (
              <>
                <ViewToMomAdd
                  mbn={mbn}
                  name_eng={nameEng}
                  tbn={tbn}
                  teacher_name={tutorNameEng}
                  homework_id={homework_id}
                  subject={subJ}
                />
              </>
            )}
          </div>
        </div>

        <div className="col-lg-12 col-md-12" style={{ textAlign: 'right' }}>
          <div
            style={{
              width: '100%',
              display: tutorOnlyMemoView ? 'block' : 'none',
            }}
          >
            {/* subJ:{subJ} */}
            {mbn && (
              <ViewTutorOnlyMemo
                mbn={mbn}
                name_eng={nameEng}
                tbn={tbn}
                teacher_name={tutorNameEng}
                homework_id={homework_id}
                subject={subJ}
              />
            )}
          </div>
        </div>

        <div className="col-lg-12 col-md-12" style={{ textAlign: 'right' }}>
          <div style={{ width: '100%', display: hwSetView ? 'block' : 'none' }}>
            {/* <ViewSetHW
              mbn={mbn}
              name_eng={nameEng}
              tbn={tbn}
              teacher_name={tutorNameEng}
              homework_id={homework_id}
              subject={subJ}
            /> */}
            {doShadowingForThisCourse == 'no' ? (
              <ViewSetHWNoShadowing
                mbn={mbn}
                name_eng={nameEng}
                tbn={tbn}
                teacher_name={tutorNameEng}
                homework_id={homework_id}
                subject={subJ}
                doShadowingForThisCourse={doShadowingForThisCourse}
              />
            ) : (
              <>
                {/* <ViewSetHW
                  mbn={mbn}
                  name_eng={nameEng}
                  tbn={tbn}
                  teacher_name={tutorNameEng}
                  homework_id={homework_id}
                  subject={subJ}
                /> */}
              </>
            )}
          </div>

          <div
            style={{ width: '100%', display: pastverbView ? 'block' : 'none' }}
          >
            <ViewPastVerb
              courseName={courseName}
              mbn={mbn}
              tbn={tbn}
              homework_id={homework_id}
            />
          </div>
          <div
            style={{
              textAlign: 'center',
              display: readingLevelView ? 'block' : 'none',
            }}
          >
            {/* <ViewEnglibLevel mbn={mbn} courseName={courseName} /> */}
          </div>
          <div
            style={{ width: '100%', display: readingView ? 'block' : 'none' }}
          >
            {/* {course}/{mbn}/{tbn}/{homework_id} */}
            {/* {seriesName}/{bookNum}/{storyNum} */}
            {/* readingLevel: {readingLevel} */}
            {course && courseName && (
              <ViewReading
                courseName={courseName}
                course={course}
                seriesName1={seriesName}
                bookNum1={bookNum}
                storyNum1={storyNum}
                mbn={mbn}
                tbn={tbn}
                homework_id={homework_id}
                teacher_name={tutorNameEng}
                readingLevel1={readingLevel}
              />
            )}
          </div>
          <div
            style={{
              width: '100%',
              display: shadowingView ? 'block' : 'none',
            }}
          >
            {mbn &&
              tbn &&
              tutorNameEng &&
              doShadowingForThisCourse !== 'no' &&
              shadowingMaterial == 'VIDEO' && (
                <>
                  <ViewShadowingVideo
                    mbn={mbn}
                    tbn={tbn}
                    teacher_name={tutorNameEng}
                  />
                </>
              )}
            {mbn &&
              tbn &&
              tutorNameEng &&
              doShadowingForThisCourse !== 'no' &&
              shadowingMaterial == 'BOOK' && (
                //<ViewShadowingBook>는 react-media-player의 호환성에러로 일단 사용않함.
                <>
                  {/* <ViewShadowingBook
                    mbn={mbn}
                    tbn={tbn}
                    teacher_name={tutorNameEng}
                  /> */}
                </>
              )}
          </div>
          <div
            style={{
              width: '100%',
              display: verbalWritingView ? 'block' : 'none',
            }}
          >
            {/* <ViewVerbalWriting
              courseName={courseName}
              mbn={mbn}
              tbn={tbn}
              homework_id={homework_id}
            /> */}
          </div>
          <div
            style={{
              width: '100%',

              display: phonicsView ? 'block' : 'none',
            }}
          >
            <center>
              {phonicsLessonOrder && <ViewPhonics fsl={bookPhonicsUrl} />}
            </center>
          </div>
          <div
            style={{
              width: '100%',
              display: conversationView ? 'block' : 'none',
            }}
          >
            <ViewConversation
              courseName={courseName}
              mbn={mbn}
              tbn={tbn}
              homework_id={homework_id}
              fsl={bookConversationUrl}
              converFinishAlert={converFinishAlert}
            />
          </div>
          {courseName == 'CourseSE' && (
            <div
              style={{
                width: '100%',
                display: schoolEnglishView ? 'block' : 'none',
              }}
            >
              <ViewSchoolEnglish
                courseName={courseName}
                subject={subject}
                mbn={mbn}
                tbn={tbn}
                homework_id={homework_id}
                bookTitle={bookTitle}
                bookNum={bookNum}
                storyNum={storyNum}
                storyEndNum={storyEndNum}
                listOrder={listOrder}
                readingLevel={readingLevel}
              />
            </div>
          )}
          {courseName == 'CourseGR' && (
            <div
              style={{
                width: '100%',
                display: grammarView ? 'block' : 'none',
              }}
            >
              {/* {courseName}/{subject}/{homework_id} */}

              <ViewGrammar
                courseName={courseName}
                subject={subject}
                mbn={mbn}
                tbn={tbn}
                homework_id={homework_id}
                bookTitle={bookTitle}
                bookNum={bookNum}
                storyNum={storyNum}
                storyEndNum={storyEndNum}
                listOrder={listOrder}
                readingLevel={readingLevel}
              />
            </div>
          )}
          {courseName == 'CourseEK' && (
            <div
              style={{
                width: '100%',
                display: eikenView ? 'block' : 'none',
              }}
            >
              <ViewEIKEN
                courseName={courseName}
                subject={subject}
                mbn={mbn}
                tbn={tbn}
                homework_id={homework_id}
                bookTitle={bookTitle}
                bookNum={bookNum}
                storyNum={storyNum}
                listOrder={listOrder}
                readingLevel={readingLevel}
              />
            </div>
          )}
          {courseName == 'CourseIEL' && (
            <div
              style={{
                width: '100%',
                display: ieltsView ? 'block' : 'none',
              }}
            >
              <ViewIELTS
                courseName={courseName}
                mbn={mbn}
                tbn={tbn}
                homework_id={homework_id}
              />
            </div>
          )}
          {courseName == 'CourseTFL' && (
            <div
              style={{
                width: '100%',
                display: toeflView ? 'block' : 'none',
              }}
            >
              <ViewTOEFL
                courseName={courseName}
                mbn={mbn}
                tbn={tbn}
                homework_id={homework_id}
              />
            </div>
          )}
          {courseName == 'CourseTOE' && (
            <div
              style={{
                width: '100%',
                display: toeicView ? 'block' : 'none',
              }}
            >
              <ViewTOEIC
                courseName={courseName}
                mbn={mbn}
                tbn={tbn}
                homework_id={homework_id}
              />
            </div>
          )}
          {courseName == 'CourseSAT' && (
            <div
              style={{
                width: '100%',
                display: satView ? 'block' : 'none',
              }}
            >
              <ViewSAT
                courseName={courseName}
                mbn={mbn}
                tbn={tbn}
                homework_id={homework_id}
              />
            </div>
          )}
          {courseName == 'CourseSSAT' && (
            <div
              style={{
                width: '100%',
                display: ssatView ? 'block' : 'none',
              }}
            >
              <ViewSSAT
                courseName={courseName}
                mbn={mbn}
                tbn={tbn}
                homework_id={homework_id}
              />
            </div>
          )}
        </div>
        <div
          className="col-lg-2 col-md-12"
          style={{ textAlign: 'right' }}
        ></div>
        {/* <div className="col-lg-12 col-md-12">
          {newLesson === false && (
            <>
              <SplitPanelReading
                mbn={mbn}
                tbn={tbn}
                homework_id={homework_id}
                name_eng={nameEng}
              />
             
            </>
          )}
        </div> */}
      </div>
      <SweetAlert
        title="Browser back is prohibited"
        show={isOpenBackMypage}
        onConfirm={() => setIsOpenBackMypage(false)}
        confirmBtnText="OK"
        cancelBtnText=""
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>Please use [Back to home] button to go back to tutor's page.</p>
      </SweetAlert>
      <SweetAlert
        title="新しい課題設定を忘れてませんか？FORGOT TO SET HOMEWORK?"
        show={isBackConfirm}
        onConfirm={() => router.push('/tutor/upcoming?tbn=' + tbn)}
        onCancel={() => {
          setIsBackConfirm(false)
        }}
        confirmBtnText="EXIT FOR NOW"
        cancelBtnText="GO BACK TO SET HOMEWORK"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>レッスンが終わったら次のレッスンに入る前に課題を設定して下さい。</p>
        <p>
          Please set homework right after every lesson for your student to
          review.
        </p>
      </SweetAlert>
      <SweetAlert
        title="Are you  going to send an email to the absent student?"
        show={isSendEmailToAbsentStudent}
        onConfirm={() => sendEmailtoAbsentStudent()}
        onCancel={() => {
          setIsSendEmailToAbsentStudent(false)
        }}
        confirmBtnText="YES"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          レッスンがスタートして1分が過ぎても生徒が現れない場合、このボタンを押して生徒と管理者へお知らせください。
        </p>
        <p>
          If the student does not show up within a minute, please press this
          button to inform the student and administrator.
        </p>
      </SweetAlert>
      <SweetAlert
        title="Did the student come to this lesson?"
        show={isAbsentStudentJoined}
        onConfirm={() => sendEmailJoinedStudent()}
        onCancel={() => {
          setIsAbsentStudentJoined(false)
        }}
        confirmBtnText="YES"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          生徒さんがレッスンに参加したら、すぐこのボタンを押して生徒の保護者と管理者へお知らせください。
        </p>
        <p>
          If the student joined this lesson, please press this button to inform
          the student's parents and administrator.
        </p>
      </SweetAlert>
      <SweetAlert
        title="Would you like to move to the reading materials page?"
        show={isNowOpen}
        onConfirm={() => handleMaterialPage()}
        onCancel={() => {
          setIsNowOpen(false)
        }}
        confirmBtnText="YES"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          当社では、ウェブセキュリティチェックツールを使用して、教材リストページが第三者に公開されないようにしています。レッスン時に使用するコンピュータのブラウザ以外で開けたり、イングリブの講師ではない第３者に公開しないよう注意してください。
        </p>
        <p>
          At our company, we use web security check tools to prevent the course
          material list page from being made public to unauthorized third
          parties. Please ensure that it is not opened with anything other than
          the browser on the computer used during lessons, and do not share it
          with third parties who are not instructors at engLib."
        </p>
      </SweetAlert>
      {/* <SweetAlert
        title="Press yes to confirm."
        show={isFinishThisLesson}
        onConfirm={() => functionFinishThisLesson('finished')}
        onCancel={() => {
          setIsFinishThisLesson(false)
        }}
        confirmBtnText="Yes"
        cancelBtnText="No"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      ></SweetAlert>
      <SweetAlert
        title="[No Show] Press yes to confirm"
        show={isNoShow}
        onConfirm={() => functionFinishThisLesson('no show')}
        onCancel={() => {
          setIsNoShow(false)
        }}
        confirmBtnText="Yes"
        cancelBtnText="No"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      ></SweetAlert>
      <SweetAlert
        title="Created a new lesson successfully."
        show={isSuccessSetNewLesson}
        onConfirm={() => router.push('/tutor/tutor-temporary-page')}
        onCancel={() => {
          setIsSuccessSetNewLesson(false)
        }}
        confirmBtnText="OK"
        // cancelBtnText="No"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      ></SweetAlert>
      <SweetAlert
        title="Set successfully."
        show={isNoshowAndSuccessSetNewLesson}
        onConfirm={() => router.push('/tutor/tutor-temporary-page')}
        onCancel={() => {
          setIsNoshowAndSuccessSetNewLesson(false)
        }}
        confirmBtnText="OK"
        // cancelBtnText="No"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          Set this lesson as a No-Show And created a next lesson successfully.
        </p>
      </SweetAlert> */}
    </>
  )
}
export default READINGA
