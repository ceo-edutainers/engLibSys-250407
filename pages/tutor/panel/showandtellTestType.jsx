import React, { useState, useEffect } from 'react'
import SplitPanelOutputSAT from '@/components/Splitpanel/SplitPanelOutputSATTestType'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import ViewGrammraTerms from '@/components/Output_ShowAndTell/ViewGrammarTerms'
import ViewGrammarBooks from '@/components/Output_ShowAndTell/ViewGrammarBooks'
//
import ViewEnglibLevel from '@/components/Output_ShowAndTell/ViewEnglibLevel'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import MonsterGetTotal from '@/components/Tutor/MonsterGetTotal'
import ViewToMomAdd from '@/components/Output_ShowAndTell/ViewToMomAddShowandtell'
import ViewTutorOnlyMemo from '@/components/Output_ShowAndTell/ViewTutorOnlyMemoShowandtell'
import VoiceRecorderToS3ForSelfLessonPage from '@/components/VoiceRecorder/VoiceRecorderToS3ForSelfLessonPageFromTutorPage'

import emailjs from 'emailjs-com'

const SHOWANDTELL = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const [setUsePreviousHomework, usePreviousHomework] = useState(false)

  const [writingView, setWritingView] = useState(false)
  const [searchTermName, setSearchTermName] = useState('')
  const [isChangeWritingLevel, setIsChangeWritingLevel] = useState(false)
  const [writingBoxList, setWritingBoxList] = useState([])
  const [writingLevel, setWritingLevel] = useState('')

  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isFinishThisLesson, setIsFinishThisLesson] = useState(false)
  const [isNoShow, setIsNoShow] = useState(false)
  const [isSuccessSetNewLesson, setIsSuccessSetNewLesson] = useState(false)
  const [isNoshowAndSuccessSetNewLesson, setIsNoshowAndSuccessSetNewLesson] =
    useState(false)

  const [showandtellLevel, setShowandtellLevel] = useState('')

  const [showandtellTitle, setShowandtellTitle] = useState('')
  //get값이 넘어왔을 경우
  const router = useRouter()
  const { query } = useRouter()

  const [mbn, setMbn] = useState('')
  const [homework_id, setHomework_id] = useState('')
  const [tbn, setTbn] = useState('')
  const [course, setCourse] = useState('')
  const [courseName, setCourseName] = useState('')
  const [subject, setSubject] = useState('')
  const [subJ, setSubj] = useState()

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

  const [isGetMonster, setIsGetMonster] = useState(false)
  // const [practiceTempId, setPracticeTempId] = useState(null)

  // function generateRandomString(length) {
  //   const characters =
  //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  //   let result = ''
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * characters.length))
  //   }
  //   return result
  // }

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
    // setPracticeTempId(generateRandomString(12))

    // alert(router.query.m)
  }, [router.isReady])

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
  //for no show -> end here
  useEffect(() => {
    if (router.isReady) {
      // console.log('router.query', router.query)
      setMbn(router.query.m)
      setHomework_id(router.query.homework_id)
      setTbn(router.query.tbn)
      setCourse(router.query.course)
      setCourseName(router.query.cN)
      setSubject(router.query.sB)
      // const homework_id = query.homework_id

      // const tbn = query.tbn
      // const course = query.course
      // const courseName = query.cN
      // const subject = query.sB
    }
    // alert(router.query.m)
  }, [router.isReady])
  // const mbn = query.m
  // const homework_id = query.homework_id
  // // console.log('mbn:', mbn)
  // const tbn = query.tbn
  // const course = query.course
  // const courseName = query.cN
  // const subject = query.sB

  const [toMomAddView, setToMomAddView] = useState(false)
  const [toAudioMessageAddView, setToAudioMessageAddView] = useState(false)
  const [tutorOnlyMemoView, setTutorOnlyMemoView] = useState(false)

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

  //戻るページ(ログイン後最初に行くページへ)
  const [RedirectTopPage, setRedirectTopPage] = useState()
  useEffect(() => {
    var alr = localStorage.getItem('afterLoginRedirect')
    var alr = '/tutor/' + alr + tbn
    setRedirectTopPage(alr)
  }, [])

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

  const functionFinishThisLesson = (newstatus) => {
    // alert(nextnextWeekday('MON'))
    // alert(newstatus)
    setNewLesson(true)
    setIsFinishThisLesson(false)

    if (whenDetail == 'every week') {
      //ENGLIBのカレンダー通りのスケジュール
      // var url = DB_CONN_URL + '/finish-show-and-tell-lesson-year-plan/'
      var url =
        DB_CONN_URL +
        '/finish-lesson-and-show-and-tell-set-by-year-plan-test-type/'
    }
    var newstatus = newstatus

    if (usePreviousHomework == true) {
      var useThisHW = 'ok'
    } else if (usePreviousHomework == false) {
      var useThisHW = 'no'
    }

    var Url =
      url +
      mbn +
      '&' +
      homework_id +
      '&' +
      newstatus +
      '&' +
      subject +
      '&' +
      courseName +
      '&' +
      course +
      '&' +
      useThisHW

    const fetchData = async () => {
      try {
        // alert('1')
        axios.get(Url).then((response) => {
          // alert('2')
          // alert(response.data.status)
          // alert(response.data.message)
          // alert('weekday' + response.data.weekday)
          // alert(response.data.new_homework_id)
          // alert(response.data.mbn)
          // alert(response.data.name_eng)
          // alert(response.data.teacher_barcode_num)
          // alert(response.data.teacher_name_eng)
          // alert(response.data.showandtell_outline_limit_words)
          // alert(response.data.showandtell_script_limit_words)
          // alert('newYoyakuTime' + response.data.newYoyakuTime)
          // alert('duringTime' + response.data.duringTime)
          // alert('NowRegdate' + response.data.NowRegdate)
          // alert('NowRegtime' + response.data.NowRegtime)
          // alert('next_weekdate' + response.data.next_weekdate)
          // alert('newYoyakuTime' + response.data.newYoyakuTime)
        })
      } catch (error) {
        console.log(error)
        alert('error1')
      }
    }

    fetchData()
    if (newstatus == 'finished') {
      // var alr = localStorage.getItem('afterLoginRedirect')
      // var tbn = localStorage.getItem('tbn')
      // var alr = '/tutor/' + alr + tbn
      // alert('1' + alr)
      // router.push(alr)
      setIsSuccessSetNewLesson(true)
    } else if (newstatus == 'no show') {
      //   var alr = localStorage.getItem('afterLoginRedirect')
      //   var tbn = localStorage.getItem('tbn')
      //   var alr = '/tutor/' + alr + tbn
      //   alert('1' + alr)
      //   router.push(alr)
      setIsNoshowAndSuccessSetNewLesson(true)
    }
  }

  function updateWritingHw() {
    setIsChangeWritingLevel(false)
    var level = writingLevel

    var Url = DB_CONN_URL + '/update-show-and-tell-level/' + mbn + '&' + level

    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('1')
          if (response.data.status) {
            // alert('2')

            alert(response.data.message)
            // alert('Modified Successfully!')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData2()
  }

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  //無限ループしない
  const bar2 = {}
  useEffect(() => {
    // console.log('newLesson', newLesson)
    if (router.isReady) {
      // setMbn(router.query.m)
      var mbn = router.query.m
      // alert('mbn' + mbn)
      if (
        localStorage.getItem('T_loginStatus') == 'true' &&
        newLesson == false
      ) {
        var Url = DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/' + mbn

        const fetchData2 = async () => {
          try {
            axios.get(Url).then((response) => {
              // alert('length' + response.data.length)
              if (response.data.length > 0) {
                setNameEng(response.data[0].name_eng)
                setTutorNameEng(response.data[0].teacher_name)
                setClassLink(response.data[0].classLink)
                setHomeworkID(response.data[0].homework_id)

                setOsusumeLetterSumOutline(
                  response.data[0].showandtell_outline_limit_words
                )
                setOsusumeLetterSumScript(
                  response.data[0].showandtell_script_limit_words
                )
                setWhenDetail(response.data[0].when_detail)

                // setSearchTermName(response.data[0].showandtellTitle_Level)
                setShowandtellTitle(response.data[0].showandtellTitle)

                //追加
                setLessonSubject(response.data[0].subject)
                setYoyakuDate(response.data[0].yoyakuDate)
                setYoyakuTime(response.data[0].yoyakuTime)
                setYoyakuWeekday(response.data[0].yoyakuWeekday)
              }
            })
          } catch (error) {
            alert('error1' + error)
            console.log(error)
          }
        }

        fetchData2()
      }
    }
  }, [router.isReady])

  if (isError) return <h1>Error, try again showandtell!</h1>
  if (isLoading) return <h1>Loading..........................</h1>

  //無限ループしない

  useEffect(() => {
    // console.log('newLesson', newLesson)
    if (router.isReady) {
      var mbn = router.query.m
      var Url =
        DB_CONN_URL + '/get-hw-show-and-tell-info-member-set-table/' + mbn
      // alert(Url)
      const fetchData2 = async () => {
        try {
          axios.get(Url).then((response) => {
            // alert('message' + response.data.message)
            // alert('length2:' + response.data.length)

            if (response.data.length > 0) {
              setShowandtellLevel(response.data.response[0].showandtell_Level)
              // alert(
              //   'showandtellTitle_Level' +
              //     response.data.response[0].showandtell_Level
              // )
            }
          })
        } catch (error) {
          alert('error1' + error)
          // console.log(error)
        }
      }

      fetchData2()
    }
  }, [router.isReady])

  //Writing DB List
  useEffect(() => {
    var Url = DB_CONN_URL + '/get-hw-show-and-tell-writing-box'
    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setWritingBoxList(response.data)

        //setAudioDurtaionFromDB(response.data[0].audioDuration)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

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
    var mbn = localStorage.getItem('MypageMbn')
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
              timer: 5000,
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
          {/* <Link href={alr}>
            <a
              className="btn btn-danger text-white ml-4 mr-2 mt-2"
              style={{ height: 35 }}
            >
              Finish This Lesson
            </a>
          </Link> */}

          {/* <Link href=""> */}
          {/* {RedirectTopPage} */}
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
            <span className=" p-1 mr-2" style={{ fontSize: '25px' }}>
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
              Use this assignment again
            </span>
            {!isCheckedAbsentBtn ? (
              <span
                className="btn btn-danger ml-3"
                style={{ fontSize: '23px' }}
                onClick={() => {
                  setIsSendEmailToAbsentStudent(true)
                  setIsCheckedAbsentBtn(true)
                }}
              >
                NO SHOW EMAIL
              </span>
            ) : (
              <span
                className="btn btn-primary ml-3"
                style={{ fontSize: '23px' }}
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
        style={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <MonsterGetTotal mbn={mbn} homework_id={homework_id} />
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
              // audioDurationFromDB={audioDurtaionFromDB}
              // pointKeyNum={pointKeyNum}
              // pointStep={currentStep}
              // leastRecordCount={leastRecordCount}
              // pageView={pageView}
              // readingHWAmount={readingHWAmount}
            />
          </>
        )}
      </div>

      <div className="col-lg-12 col-md-12" style={{ textAlign: 'right' }}>
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
          mbn:{mbn}
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
        <div
          className="col-lg-3 col-md-12  pr-0 mr-0 pt-2"
          style={{ textAlign: 'left' }}
        >
          <span
            style={{
              // width: '100%',
              width: '100%',
              fontSize: '18px',
              padding: '5px',
              borderRadius: '10px',
              backgroundColor: '#F9EBEA',
              // marginTop: '20px',
              // marginBottom: '15px',
              color: 'black',
              fontWeight: '600',
              border: '1px solid #FCD2CF',
            }}
          >
            Level Change :{' '}
            <select
              onChange={(e) => {
                setWritingLevel(e.target.value)
                setIsChangeWritingLevel(true)
              }}
            >
              <option
                value="Level1"
                selected={showandtellLevel == 'Level1' && 'selected'}
              >
                Level1
              </option>
              <option
                value="Level2"
                selected={showandtellLevel == 'Level2' && 'selected'}
              >
                Level2
              </option>
              <option
                value="Level3"
                selected={showandtellLevel == 'Level3' && 'selected'}
              >
                Level3
              </option>
              <option
                value="Level4"
                selected={showandtellLevel == 'Level4' && 'selected'}
              >
                Level4
              </option>
              <option
                value="Level5"
                selected={showandtellLevel == 'Level5' && 'selected'}
              >
                Level5
              </option>
              <option
                value="Level6"
                selected={showandtellLevel == 'Level6' && 'selected'}
              >
                Level6
              </option>
            </select>
          </span>
        </div>
        <div
          className="col-lg-3 col-md-12  pr-0 mr-0 pt-2"
          style={{ textAlign: 'left' }}
        >
          <span
            className="btn btn-primary mb-2 mt-0 "
            onClick={() => setWritingView(!writingView)}
          >
            Writing Samples by Level
          </span>
        </div>

        <div
          className="col-lg-12 col-md-12 mt-2 mb-2"
          style={{
            textAlign: 'center',
            display: writingView ? 'block' : 'none',
          }}
        >
          {searchTermName == 'Level2' ? (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setSearchTermName('Level2')
              }}
              style={{ cursor: 'pointer' }}
            >
              Level-2
            </span>
          ) : (
            <span
              className="btn btn-warning mr-2"
              onClick={() => {
                setSearchTermName('Level2')
              }}
              style={{ cursor: 'pointer' }}
            >
              Level-2
            </span>
          )}

          {searchTermName == 'Level3' ? (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setSearchTermName('Level3')
              }}
              style={{ cursor: 'pointer' }}
            >
              Level-3
            </span>
          ) : (
            <span
              className="btn btn-warning mr-2"
              onClick={() => {
                setSearchTermName('Level3')
              }}
              style={{ cursor: 'pointer' }}
            >
              Level-3
            </span>
          )}

          {searchTermName == 'Level4' ? (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setSearchTermName('Level4')
              }}
              style={{ cursor: 'pointer' }}
            >
              Level-4
            </span>
          ) : (
            <span
              className="btn btn-warning mr-2"
              onClick={() => {
                setSearchTermName('Level4')
              }}
              style={{ cursor: 'pointer' }}
            >
              Level-4
            </span>
          )}

          {searchTermName == 'Level5' ? (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setSearchTermName('Level5')
              }}
              style={{ cursor: 'pointer' }}
            >
              Level-5
            </span>
          ) : (
            <span
              className="btn btn-warning mr-2"
              onClick={() => {
                setSearchTermName('Level5')
              }}
              style={{ cursor: 'pointer' }}
            >
              Level-5
            </span>
          )}

          {searchTermName == 'Level6' ? (
            <span
              className="btn btn-danger"
              onClick={() => {
                setSearchTermName('Level6')
              }}
              style={{ cursor: 'pointer' }}
            >
              Level-6
            </span>
          ) : (
            <span
              className="btn btn-warning"
              onClick={() => {
                setSearchTermName('Level6')
              }}
              style={{ cursor: 'pointer' }}
            >
              Level-6
            </span>
          )}
          <hr />
          <center>
            <select
              className="selectpicker form-control"
              data-live-search="true"
              id="subject_teacher_drop_down"
              style={{ maxWidth: '800px', width: '70%' }}
            >
              {writingBoxList

                .filter((val) => {
                  if (searchTermName == '' || searchTermName == null) {
                    return val //everything data
                  } else if (
                    searchTermName !== '' &&
                    val.level.includes(searchTermName)
                  ) {
                    return val
                  }
                })
                .map((val, key) => {
                  return (
                    <>
                      <option value={val.title}>
                        [{val.level}]{val.title}
                      </option>
                    </>
                  )
                })}
            </select>
          </center>

          <div>
            <p style={{ color: 'red' }}>
              Please use the following sample to adjust the level of your
              students.
            </p>

            {(searchTermName == 'Level2' || showandtellLevel == null) && (
              <img
                src="/images/writing-sample/outline-example-level2.png"
                style={{
                  border: '1px solid darkgray',
                  borderRadius: '10px',
                  maxWidth: '800px',
                  width: '70%',
                }}
              />
            )}
            {searchTermName == 'Level3' && (
              <img
                src="/images/writing-sample/outline-example-level3.png"
                style={{
                  border: '1px solid darkgray',
                  borderRadius: '10px',
                  maxWidth: '800px',
                  width: '70%',
                }}
              />
            )}
            {searchTermName == 'Level4' && (
              <img
                src="/images/writing-sample/outline-example-level4.png"
                style={{
                  border: '1px solid darkgray',
                  borderRadius: '10px',
                  maxWidth: '800px',
                  width: '70%',
                }}
              />
            )}
            {searchTermName == 'Level5' && (
              <img
                src="/images/writing-sample/outline-example-level5.png"
                style={{
                  border: '1px solid darkgray',
                  borderRadius: '10px',
                  maxWidth: '800px',
                  width: '70%',
                }}
              />
            )}
            {searchTermName == 'Level6' && (
              <img
                src="/images/writing-sample/outline-example-level6.png"
                style={{
                  border: '1px solid darkgray',
                  borderRadius: '10px',
                  maxWidth: '800px',
                  width: '70%',
                }}
              />
            )}
          </div>
          {/* )} */}
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
              stLevel={showandtellLevel}
              stTitle={showandtellTitle}
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
        title="Do you want to change the student's writing level?"
        show={isChangeWritingLevel}
        onConfirm={() => updateWritingHw()}
        onCancel={() => {
          setIsChangeWritingLevel(false)
        }}
        confirmBtnText="YES"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      ></SweetAlert>

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
