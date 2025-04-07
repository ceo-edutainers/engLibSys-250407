import React, { useState, useEffect } from 'react'
import SplitPanelOutputSAT from '@/components/Splitpanel/SplitPanelOutputSAT'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import ViewGrammraTerms from '@/components/Output_ShowAndTell/ViewGrammarTerms'
import ViewGrammarBooks from '@/components/Output_ShowAndTell/ViewGrammarBooks'

import ViewEnglibLevel from '@/components/Output_ShowAndTell/ViewEnglibLevel'
// import { myFun_getYoutubeID } from '@/components/FunctionComponent'

import ViewToMomAdd from '@/components/Output_ShowAndTell/ViewToMomAddShowandtell'
import ViewTutorOnlyMemo from '@/components/Output_ShowAndTell/ViewTutorOnlyMemoShowandtell'

const SHOWANDTELL = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const router = useRouter() //使い方：router.replace('/')
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isFinishThisLesson, setIsFinishThisLesson] = useState(false)
  const [isNoShow, setIsNoShow] = useState(false)
  const [isSuccessSetNewLesson, setIsSuccessSetNewLesson] = useState(false)
  const [isNoshowAndSuccessSetNewLesson, setIsNoshowAndSuccessSetNewLesson] =
    useState(false)
  //get값이 넘어왔을 경우
  const { query } = useRouter()
  const mbn = query.m
  const homework_id = query.homework_id
  // console.log('mbn:', mbn)
  const tbn = query.tbn
  const course = query.course
  const courseName = query.cN
  const subject = query.sB

  const [isCheckedAbsentBtn, setIsCheckedAbsentBtn] = useState(false)

  const [toMomAddView, setToMomAddView] = useState(false)
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
        DB_CONN_URL + '/finish-lesson-and-show-and-tell-set-by-year-plan/'
    }
    var newstatus = newstatus

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
      course

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

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  //無限ループしない
  const bar2 = {}
  useEffect(() => {
    // console.log('newLesson', newLesson)
    if (localStorage.getItem('T_loginStatus') == 'true' && newLesson == false) {
      localStorage.setItem('mbn', query.m)

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
            }
          })
        } catch (error) {
          // alert('error1' + error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }, [bar2])

  if (isError) return <h1>Error, try again showandtell!</h1>
  if (isLoading) return <h1>Loading..........................</h1>

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
            {/* <span
              className="btn btn-warning p-1"
              style={{ fontSize: '25px' }}
              onClick={() => {
                setIsNoShow(true)
                setNewLesson(true)
              }}
            >
              No Show
            </span> */}
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
              Message to Mom
            </span>
            <span
              className="btn-sm btn-primary ml-2"
              onClick={() => {
                setTutorOnlyMemoView(!tutorOnlyMemoView)
                // handleClear()
              }}
              style={{ cursor: 'pointer' }}
            >
              Message History
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
    </>
  )
}
export default SHOWANDTELL
