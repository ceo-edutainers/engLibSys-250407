/** @format */
import react, { useContext, useState, useEffect } from 'react'
import { QuizContext } from './Contexts'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import SweetAlert from 'react-bootstrap-sweetalert'
function MainMenuOST() {
  const {
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
  } = useContext(QuizContext)
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [isGoBeforeHoldingPage, setIsGoBeforeHoldingPage] = useState(false)

  const nextStepCheck = (nStep) => {
    //Show and Tellでは最後のhw_historyのstepStatus="holding"の場合(休んだ場合)、そのStepに飛ぶ、そうではない場合は最初のstep1に行く。

    var homework_id = HWID
    // var nextStep = 'Step1OST'
    var nextStep = nStep
    //alert(thisSubject)//SHOW AND TELL
    //alert(nextStep) //Step1OST
    var url = DB_CONN_URL + '/get-step-sys-hw-history-holding/'
    var Url = url + myMbn + '&' + homework_id + '&' + thisSubject

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        //alert(response.data.response[0].stepStatus)
        if (response.data.length > 0) {
          if (response.data.response[0].stepStatus == 'holding') {
            //alert(response.data.response[0].stepStatus)
            var thisStep = response.data.response[0].step
          } else {
            //holdingではない場合、最初のstep1ページへ行く。
            var thisStep = 'Step1OST'
          }
        } else {
          var thisStep = 'Step1OST'
        }
        practiceStart(thisStep)
        console.log('thisStep:', thisStep)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  const practiceStart = (nextStep) => {
    //次のStep1OSTのsys_hw_historyテーブルのstepStatusがendになっている場合は、step2にいく。
    //왜냐하면, Step1OST은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
        // alert(nextStep)
        // alert('testend')
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
            } else {
              setPageView(nextStep)
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  return (
    <>
      <div
        className="MenuBig mt-5 p-5"
        style={{ backgroundColor: '#3498DB', color: 'white', height: 'auto' }}
      >
        <h1 className="mb-1" style={{ fontWeight: '900' }}>
          SHOW AND TELL
        </h1>
        <p style={{ color: 'white' }}>{userName}</p>
        <h4
          style={{
            border: '1px solid white',
            borderRadius: '10px',
            padding: '20px',
            marginTop: '20px',
            fontWeight: '600',
          }}
        >
          自分の意見を言える・書けるようになるトレーニング
        </h4>
        <h6 className="mb-3 mt-5" style={{ color: 'black' }}>
          レッスンに参加するためには、この課題が必須です。
          <br />
          ライティングの量が少ない場合、レッスン時間を十分に活用できなくなります。
        </h6>
        <h4 className="mb-0 mt-3" style={{ color: 'white', fontWeight: '600' }}>
          レッスン日
        </h4>
        <p style={{ color: 'white', fontWeight: 'bold' }}>
          {yoyakuDate} &nbsp;{yoyakuTime}
        </p>
        <h5
          className="mb-0 mt-1 mb-2"
          style={{ color: 'white', fontWeight: '600' }}
        >
          Tutor: {teacherName}
        </h5>
        <h1
          className="startBtnBig"
          onClick={() => {
            nextStepCheck('Step1OST')
          }}
          style={{ fontSize: '30px', fontWeight: '900', paddingTop: '30px' }}
        >
          START WRITING
        </h1>
        <Link href="/mytopGroup">
          <button
            className="btn btn-danger mt-4"
            style={{ fontWeight: '900', color: 'white', marginTop: '10px' }}
          >
            マイページトップへ
          </button>
        </Link>
        <SweetAlert
          title="休憩前のページへ戻ります。"
          show={isGoBeforeHoldingPage}
          onConfirm={() => setIsGoBeforeHoldingPage(false)}
          onCancel={() => {
            setIsGoBeforeHoldingPage(false)
          }}
          confirmBtnText="OK"
          cancelBtnText="NO"
          showCancel={true}
          reverseButtons={true}
          style={{ width: '600px' }}
        >
          {/* <p>
              次のステップに行く前に途中でやめると、このステップでゲットしたポイントは消えてしまいます。
            </p> */}
        </SweetAlert>
      </div>
      <CopyrightFooter />
    </>
  )
}

export default MainMenuOST
