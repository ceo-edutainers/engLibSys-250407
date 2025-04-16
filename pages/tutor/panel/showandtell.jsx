import React, { useState, useEffect } from 'react'
import SplitPanelOutputSAT from '@/components/Splitpanel/SplitPanelOutputSAT'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import ViewGrammraTerms from '@/components/Output_ShowAndTell/ViewGrammarTerms'
import ViewGrammarBooks from '@/components/Output_ShowAndTell/ViewGrammarBooks'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ViewEnglibLevel from '@/components/Output_ShowAndTell/ViewEnglibLevel'
// import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import MonsterGetTotal from '@/components/Tutor/MonsterGetTotal'
import ViewToMomAdd from '@/components/Output_ShowAndTell/ViewToMomAddShowandtell'
import VoiceRecorderToS3ForSelfLessonPage from '@/components/VoiceRecorder/VoiceRecorderToS3ForSelfLessonPageFromTutorPage'

import ViewTutorOnlyMemo from '@/components/Output_ShowAndTell/ViewTutorOnlyMemoShowandtell'
import emailjs from 'emailjs-com'

const SHOWANDTELL = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const [usePreviousHomework, setUsePreviousHomework] = useState(false)

  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isFinishThisLesson, setIsFinishThisLesson] = useState(false)
  const [isNoShow, setIsNoShow] = useState(false)
  const [isSuccessSetNewLesson, setIsSuccessSetNewLesson] = useState(false)
  const [isNoshowAndSuccessSetNewLesson, setIsNoshowAndSuccessSetNewLesson] =
    useState(false)

  //get값이 넘어왔을 경우
  const router = useRouter()
  const { query } = useRouter()
  const mbn = query.m
  const homework_id = query.homework_id
  // console.log('mbn:', mbn)
  const tbn = query.tbn
  const course = query.course
  const courseName = query.cN
  const subject = query.sB

  // const [mbn, setMbn] = useState('')
  // const [homework_id, setHomework_id] = useState('')
  // const [tbn, setTbn] = useState('')
  // const [course, setCourse] = useState('')
  // const [courseName, setCourseName] = useState('')
  // const [subject, setSubject] = useState('')
  // const [subJ, setSubj] = useState()
  const [sendEmail, setSendEmail] = useState()
  const [studentNameEng, setStudentNameEng] = useState()
  const [yoyakuDate, setYoyakuDate] = useState()
  const [yoyakuTime, setYoyakuTime] = useState()
  const [yoyakuWeekday, setYoyakuWeekday] = useState()
  const [lessonSubject, setLessonSubject] = useState()
  //for no show -> start here
  const [isCheckedAbsentBtn, setIsCheckedAbsentBtn] = useState(false)
  const [isAbsentStudentJoined, setIsAbsentStudentJoined] = useState(false)
  const [isSendEmailToAbsentStudent, setIsSendEmailToAbsentStudent] =
    useState(false)

  const [monsterRefreshKey, setMonsterRefreshKey] = useState(0)

  useEffect(() => {
    if (router.isReady) {
      // console.log('router.query', router.query)
      // setMbn(router.query.m)
      // setHomework_id(router.query.homework_id)
      // setSubj(router.query.subJ)
      // setTbn(router.query.tbn)
      // setCourseName(router.query.cN)
      functionMemberInfo(router.query.m)
    }
    // alert(router.query.m)
  }, [router.isReady])

  const [toMomAddView, setToMomAddView] = useState(false)
  const [toAudioMessageAddView, setToAudioMessageAddView] = useState(false)
  const [tutorOnlyMemoView, setTutorOnlyMemoView] = useState(false)
  const [giveMonster, setGiveMonster] = useState(false)

  // const [youtubeID, setYoutubeID] = useState()
  const [homeworkID, setHomeworkID] = useState()
  const [googleDocLink, setGoogleDocLink] = useState()
  const [nameEng, setNameEng] = useState()
  const [tutorNameEng, setTutorNameEng] = useState()
  const [classLink, setClassLink] = useState()
  const [osusumeLetterSumOutline, setOsusumeLetterSumOutline] = useState()
  const [osusumeLetterSumScript, setOsusumeLetterSumScript] = useState()

  const [newLesson, setNewLesson] = useState(false)
  const [whenDetail, setWhenDetail] = useState()
  // console.log('query.mbn:', mbn)
  // console.log('query.course:', courseName)
  // console.log('query.courseName:', query.cN)

  const [isGetMonster, setIsGetMonster] = useState(false)

  //戻るページ(ログイン後最初に行くページへ)
  const [RedirectTopPage, setRedirectTopPage] = useState()
  // useEffect(() => {
  //   var alr = localStorage.getItem('afterLoginRedirect')
  //   var alr = '/tutor/' + alr + tbn
  //   setRedirectTopPage(alr)
  // }, [])

  useEffect(() => {
    if (router.isReady && router.query.tbn) {
      const alr = localStorage.getItem('afterLoginRedirect')
      const redirectUrl = '/tutor/' + alr + router.query.tbn
      setRedirectTopPage(redirectUrl)
    }
  }, [router.isReady, router.query.tbn])

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
    const YOUR_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_YOUR_SERVICE_ID
    const YOUR_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_YOUR_USER_ID
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
    const tokyoTime = new Date(
      d.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
    )

    let Y = tokyoTime.getFullYear()
    let M = tokyoTime.getMonth() + 1
    let D = tokyoTime.getDate()
    let h = tokyoTime.getHours()
    let m = tokyoTime.getMinutes()
    let s = tokyoTime.getSeconds()

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
    const YOUR_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_YOUR_SERVICE_ID
    const YOUR_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_YOUR_USER_ID
    const YOUR_TEMPLATE_ID_to_student = 'template_rggl66c'
    const YOUR_TEMPLATE_ID_to_admin = 'template_09netzr'

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

  // //for no show -> end here
  // const functionFinishThisLesson = (newstatus) => {
  //   setNewLesson(true)
  //   setIsFinishThisLesson(false)

  //   if (whenDetail == 'every week') {
  //     var Url =
  //       DB_CONN_URL +
  //       '/finish-lesson-and-show-and-tell-set-by-year-plan2' +
  //       `?mbn=${mbn}&homework_id=${homework_id}&newstatus=${newstatus}` +
  //       `&subject=${subject}&courseName=${courseName}&course=${course}&useThisHW=${useThisHW}`
  //   }
  //   var newstatus = newstatus

  //   if (usePreviousHomework == true) {
  //     var useThisHW = 'ok'
  //   } else if (usePreviousHomework == false) {
  //     var useThisHW = 'no'
  //   }

  //   const fetchData = async () => {
  //     try {
  //       // alert('1')
  //       axios.get(Url).then((response) => {
  //         alert(response.data.message)
  //         console.log('✅ FinishLesson response:', response.data.message)
  //       })
  //     } catch (error) {
  //       console.log(error)
  //       alert('error1')
  //     }
  //   }

  //   fetchData()
  //   if (newstatus == 'finished') {
  //     setIsSuccessSetNewLesson(true)
  //   } else if (newstatus == 'no show') {
  //     setIsNoshowAndSuccessSetNewLesson(true)
  //   }
  // }

  const functionFinishThisLesson = (newstatus) => {
    setNewLesson(true)
    setIsFinishThisLesson(false)

    // ✅ 먼저 useThisHW부터 정의
    let useThisHW = usePreviousHomework ? 'ok' : 'no'

    // ✅ Url 정의 전에 모든 값이 준비되어 있어야 함
    let Url = ''

    // if (whenDetail === 'every week') {
    Url =
      DB_CONN_URL +
      '/finish-lesson-and-show-and-tell-set-by-year-plan2' +
      `?mbn=${mbn}&homework_id=${homework_id}&newstatus=${newstatus}` +
      `&subject=${subject}&courseName=${courseName}&course=${course}&useThisHW=${useThisHW}`
    // }

    console.log('Url:', Url)
    // ✅ 서버 호출
    const fetchData = async () => {
      try {
        const response = await axios.get(Url)
        // alert(response.data.message)
        console.log('✅ FinishLesson response:', response.data.message)
      } catch (error) {
        console.error('❌ Axios error:', error)
        alert('エラーが発生しました。もう一度お試しください。')
      }
    }

    fetchData()

    // ✅ 결과 처리
    if (newstatus === 'finished') {
      setIsSuccessSetNewLesson(true)
    } else if (newstatus === 'no show') {
      setIsNoshowAndSuccessSetNewLesson(true)
    }
  }

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  //無限ループしない

  // useEffect(() => {
  //   const mbnFromQuery = router.query.m
  //   if (!router.isReady || !mbnFromQuery) return

  //   // setMbn(mbnFromQuery) // 이건 그대로

  //   if (
  //     localStorage.getItem('T_loginStatus') === 'true' &&
  //     newLesson === false
  //   ) {
  //     localStorage.setItem('mbn', mbnFromQuery)

  //     var Url =
  //       DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/' + mbnFromQuery

  //     const fetchData2 = async () => {
  //       try {
  //         axios.get(Url).then((response) => {
  //           // alert(Url)
  //           // alert(response.data.status)
  //           // alert(response.data.result[0].name_eng)
  //           // alert(response.data.result?.length)
  //           if (response.data.result?.length > 0) {
  //             // if (response.data.status && response.data.result.length > 0) {
  //             // alert(response.data.result[0])
  //             setGoogleDocLink(response.data.result[0].google_doc_link)
  //             setNameEng(response.data.result[0].name_eng)
  //             setTutorNameEng(response.data.result[0].teacher_name)
  //             setClassLink(response.data.result[0].classLink)
  //             setHomeworkID(response.data.result[0].homework_id)
  //             setOsusumeLetterSumOutline(
  //               response.data.result[0].showandtell_outline_limit_words
  //             )
  //             setOsusumeLetterSumScript(
  //               response.data.result[0].showandtell_script_limit_words
  //             )
  //             setWhenDetail(response.data.result[0].when_detail)

  //             //追加 for no-show email start
  //             setLessonSubject(response.data.result[0].subject)
  //             setYoyakuDate(response.data.result[0].yoyakuDate)
  //             setYoyakuTime(response.data.result[0].yoyakuTime)
  //             setYoyakuWeekday(response.data.result[0].yoyakuWeekday)
  //             //追加 for no-show email end
  //           }
  //         })
  //       } catch (error) {
  //         // alert('error1' + error)
  //         console.log(error)
  //       }
  //     }

  //     fetchData2()
  //   }
  // }, [])
  useEffect(() => {
    if (!router.isReady) return

    const mbnFromQuery = router.query.m
    if (!mbnFromQuery) return

    if (
      localStorage.getItem('T_loginStatus') === 'true' &&
      newLesson === false
    ) {
      localStorage.setItem('mbn', mbnFromQuery)

      const Url =
        DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/' + mbnFromQuery

      const fetchData2 = async () => {
        try {
          const response = await axios.get(Url)
          if (response.data.result?.length > 0) {
            const data = response.data.result[0]
            setGoogleDocLink(data.google_doc_link)
            setNameEng(data.name_eng)
            setTutorNameEng(data.teacher_name)
            setClassLink(data.classLink)
            setHomeworkID(data.homework_id)
            setOsusumeLetterSumOutline(data.showandtell_outline_limit_words)
            setOsusumeLetterSumScript(data.showandtell_script_limit_words)
            setWhenDetail(data.when_detail)
            setLessonSubject(data.subject)
            setYoyakuDate(data.yoyakuDate)
            setYoyakuTime(data.yoyakuTime)
            setYoyakuWeekday(data.yoyakuWeekday)
          }
        } catch (error) {
          console.error('❌ fetchData2 error:', error)
        }
      }

      fetchData2()
    }
  }, [router.isReady, router.query.m, newLesson])

  if (isError) return <h1>Error, try again showandtell!</h1>
  if (isLoading) return <h1>Loading..........................</h1>

  const getOrdinalSuffix = (number) => {
    const j = number % 10
    const k = number % 100
    if (j === 1 && k !== 11) {
      return number + 'st'
    }
    if (j === 2 && k !== 12) {
      return number + 'nd'
    }
    if (j === 3 && k !== 13) {
      return number + 'rd'
    }
    return number + 'th'
  }

  const handleGiveMonsterFromHistory = () => {
    // const fetchData = async () => {
    setIsGetMonster(false)
    // var mbn = localStorage.getItem('MypageMbn')
    var url = DB_CONN_URL + '/give-monster-from-tutor'

    axios
      .post(url, {
        mbn: mbn,
        homework_id: homework_id,
        thisSubject: 'show and tell',
      })
      .then((response) => {
        if (!response.data.status) {
        } else {
          if (response.data.message == 'monster') {
            const MySwal = withReactContent(Swal)
            var monsterNum = response.data.monsterNum
            var imgUrl = '/images/monster/' + monsterNum + '.png'
            var imgCount = getOrdinalSuffix(monsterNum)
            Swal.fire({
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              html:
                "<h1><b>Congratulations！</b></h1><h5>You've got the " +
                imgCount +
                ' monster！</h5>',
              width: '600px',
              height: '20px',
              opacity: 0,
              padding: '1em',
              marginTop: '100px',
              border: '1px solid #F1C40F',
              borderRadius: '20px',
              color: '#F1C40F',
              background: 'white',
              backdrop: `
            rgba(0,0,123,0.4)
            url('${imgUrl}')
            center top
            no-repeat
        `,
            })
            // 👇 이 부분이 중요!
            setMonsterRefreshKey((prev) => prev + 1)
          }
        }
      })
  }

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
        <div className="col-lg-4 col-md-12 text-left">
          <a
            className="btn btn-danger text-white ml-4 mr-2 mt-2"
            style={{ height: 35 }}
            href={RedirectTopPage}
          >
            Back to home
          </a>
          {/* </Link> */}
          <a
            className="btn btn-warning text-#2C3E50 ml-4 mr-2 mt-2"
            onClick={() => window.location.reload(false)}
            style={{ height: 35, fontWeight: '600' }}
          >
            Update to the latest H.W
          </a>
        </div>
        <div className="col-lg-4 col-md-12 text-center pb-1">
          <h1>
            SHOW AND TELL <br />
            <span
              className="btn btn-info p-1 mr-2"
              style={{ fontSize: '25px' }}
              onClick={() => {
                setIsFinishThisLesson(true)
                setNewLesson(true)
              }}
            >
              Finish this Lesson
            </span>
            <span className=" p-1 mr-2" style={{ fontSize: '15px' }}>
              <input
                type="checkbox"
                value="adult"
                onClick={() => {
                  setUsePreviousHomework(!usePreviousHomework)
                }}
                style={{
                  width: '20px',
                  height: '20px',
                  verticalAlign: 'middle',
                  marginRight: '5px',
                }}
              />
              Use this h.w again
            </span>
            <br />
            {!isCheckedAbsentBtn ? (
              <span
                className="btn btn-danger ml-3"
                onClick={() => {
                  setIsSendEmailToAbsentStudent(true)
                  setIsCheckedAbsentBtn(true)
                }}
              >
                NO SHOW EMAIL
              </span>
            ) : (
              <span
                className="btn btn-secondly ml-3"
                onClick={() => {
                  setIsAbsentStudentJoined(true)
                }}
              >
                STUDENT JOINED
              </span>
            )}
          </h1>

          <p>
            Tutor:&nbsp;<b>{tutorNameEng}</b>
            &nbsp;&nbsp;|&nbsp;&nbsp;Student:&nbsp;
            <b>{nameEng}</b> <br />
          </p>
        </div>

        <div className="col-lg-2 col-md-12 text-center pb-1"></div>
        <div className="col-lg-1 col-md-12 pt-2" style={{ textAlign: 'right' }}>
          <a href={classLink} target="_blank">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/31X9eeywR3L.jpg"
              style={{ width: '50px', height: 'auto' }}
            />
          </a>
        </div>
        <div className="col-lg-1 col-md-12 pt-2" style={{ textAlign: 'right' }}>
          <img
            src="/images/logo-tomei.png"
            style={{ height: '50px', width: 'auto' }}
          />
        </div>
      </div>

      <div
        className="col-lg-12 col-md-12 pt-3 pb-3 text-center"
        style={{ textAlign: 'right' }}
      >
        <span
          className="btn-sm btn-danger mr-2"
          onClick={() => {
            setToMomAddView(!toMomAddView)
            // handleClear()
          }}
          style={{ cursor: 'pointer' }}
        >
          Text Message
        </span>
        <span
          className="btn-sm btn-primary ml-2 mr-2"
          onClick={() => {
            setTutorOnlyMemoView(!tutorOnlyMemoView)
            // handleClear()
          }}
          style={{ cursor: 'pointer' }}
        >
          Text Message History
        </span>
        <span
          className="btn-sm btn-success ml-2 mr-2"
          onClick={() => {
            setToAudioMessageAddView(!toAudioMessageAddView)
            // handleClear()
          }}
          style={{ cursor: 'pointer' }}
        >
          Voice Message
        </span>
        <span
          className="btn-sm btn-info ml-2"
          onClick={() => {
            // setGiveMonster(!giveMonster)
            setIsGetMonster(true)
          }}
          style={{ cursor: 'pointer' }}
        >
          Monster
        </span>
      </div>

      <div
        className="col-lg-12 col-md-12 pt-3 pb-3 text-center"
        style={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* <MonsterGetTotal mbn={mbn} homework_id={homework_id} /> */}

        <MonsterGetTotal
          key={monsterRefreshKey} // 이게 바뀌면 컴포넌트가 강제로 리렌더링 됨
          mbn={mbn}
          homework_id={homework_id}
        />
      </div>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          display: toAudioMessageAddView ? 'block' : 'none',
        }}
      >
        {mbn && (
          <>
            <VoiceRecorderToS3ForSelfLessonPage
              mbn={mbn}
              homework_id={homework_id}
              // practiceTempId={practiceTempId}
              tbn={tbn}
              tutorNameEng={tutorNameEng}
            />
          </>
        )}
      </div>

      <div
        className="col-lg-12 col-md-12 pt-3 pb-3 text-center"
        style={{ textAlign: 'right' }}
      >
        <div
          style={{
            width: '100%',
            display: toMomAddView ? 'block' : 'none',
          }}
        >
          {mbn && (
            <>
              <ViewToMomAdd
                mbn={mbn}
                name_eng={nameEng}
                tbn={tbn}
                teacher_name={tutorNameEng}
                homework_id={homework_id}
                subject="show and tell"
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
          {mbn && (
            <>
              <ViewTutorOnlyMemo
                mbn={mbn}
                name_eng={nameEng}
                tbn={tbn}
                teacher_name={tutorNameEng}
                homework_id={homework_id}
                subject="show and tell"
              />
            </>
          )}
        </div>
      </div>
      {/* <div className="col-lg-12 col-md-12 p-3" style={{ textAlign: 'center' }}>
        <ViewGrammarBooks />
        &nbsp;{' '}
        {!isCheckedAbsentBtn ? (
          <span
            className="btn btn-danger ml-3"
            onClick={() => {
              setIsSendEmailToAbsentStudent(true)
              setIsCheckedAbsentBtn(true)
            }}
          >
            NO SHOW EMAIL
          </span>
        ) : (
          <span
            className="btn btn-danger ml-3"
            onClick={() => {
              setIsAbsentStudentJoined(true)
            }}
          >
            STUDENT JOINED
          </span>
        )}
      </div> */}
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
          className="col-lg-6 col-md-12 pr-0 mr-0"
          style={{ textAlign: 'right' }}
        >
          <ViewGrammraTerms />
        </div>
        <div className="col-lg-6 col-md-12" style={{ textAlign: 'left' }}>
          {/* <ViewEnglibLevel mbn={mbn} /> */}
        </div>

        <div className="col-lg-12 col-md-12">
          <hr
            style={{ border: '1px solid white', paddingTop: 0, marginTop: 0 }}
          />
          {/* mbn:{mbn}/tbn:{tbn}/homeworkID{homeworkID}/nameEng{nameEng} */}

          {newLesson === false && (
            <SplitPanelOutputSAT
              mbn={mbn}
              tbn={tbn}
              homework_id={homework_id}
              // youtubeID={youtubeID}
              name_eng={nameEng}
              thisOsusumeLetterSumScript={osusumeLetterSumScript}
              thisOsusumeLetterSumOutline={osusumeLetterSumOutline}
            />
          )}
        </div>
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
        onConfirm={() => router.push(RedirectTopPage)}
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
        onConfirm={() => router.push(RedirectTopPage)}
        //RedirectTopPage
        ///tutor/tutor-temporary-page
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
        title="Are you sure you want to give this monster to this student?"
        show={isGetMonster}
        onConfirm={() => handleGiveMonsterFromHistory()}
        onCancel={() => {
          setIsGetMonster(false)
        }}
        confirmBtnText="YES"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '500px' }}
      >
        <p>
          Please give this monster to the student who has completed the
          assignment properly.
        </p>
      </SweetAlert>
    </>
  )
}
export default SHOWANDTELL
