/** @format */
import react, { useContext, useState, useEffect } from 'react'
import { QuizContext } from './Contexts'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function MainMenuOST() {
  function firstMessage() {
    const MySwal = withReactContent(Swal)
    Swal.fire({
      // position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      html: '<h1><b>今日も頑張りましょう！</b></h1>',
      // title: '20ポイントゲット！',
      width: '600px',
      height: '600px',
      opacity: 0,
      padding: '3em',
      border: '1px solid #F1C40F',
      borderRadius: '30px',
      color: '#F1C40F',
      background: '#F1C40F',
      // imageUrl: 'https://unsplash.it/400/200',
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
      // background: '#fff url(/images/about-img5.jpg)',
      backdrop: `
    rgba(0,0,0,0.5) 
    url("/images/animated-icons/double-five-support.gif")
    center top
    no-repeat
  `,
    })
  }
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

  const [beforeHwData, setBeforeHwData] = useState(null)
  const [messageNoBeforeLessonData, setMessageNoBeforeLessonData] =
    useState(null)

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-sys-before-hw/'
        var Url = url + myMbn + '&' + thisSubject

        const response = await axios.get(Url)

        // alert(response.data.length)
        // alert(response.data)
        if (response.data.length > 0) {
          setBeforeHwData(response.data)

          getFileFromAws(myMbn, response.data[0].homework_id)
          // alert('homework_id' + response.data[0].homework_id)
          getGoogleLinkFromPreviousLesson(myMbn, response.data[0].homework_id)
        } else {
          //初めてのレッスンで、前回のレッスンのデーターがない場合
          // alert(response.data.length)
          setMessageNoBeforeLessonData('No-Prev-Lesson-Data')
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData2()
  }, [myMbn, HWID])

  const [recordFileList, setRecordFileList] = useState([])
  const [recordListView, setRecordListView] = useState(false)

  const getFileFromAws = (mbn, homework_id) => {
    const fetchData4 = async () => {
      try {
        // alert(this.state.practiceTempId)
        var url =
          DB_CONN_URL +
          '/get-tutor-before-hw-record-file-during-lesson-into-member-page'
        const response = await axios.post(url, {
          mbn: mbn,
          homework_id: homework_id,
        })

        if (!response.data.status) {
          alert(response.data.message) //for test
        } else {
          setRecordFileList(response.data.result)
          setRecordListView(true)
        }
      } catch (error) {
        alert('db insert error 1')
      }
    }

    fetchData4()
  }

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

  const [myHistoryList, setMyHistoryList] = useState([])

  const getGoogleLinkFromPreviousLesson = (mbn, homework_id) => {
    //Show and Tellでは最後のhw_historyのstepStatus="holding"の場合(休んだ場合)、そのStepに飛ぶ、そうではない場合は最初のstep1に行く。

    var url = DB_CONN_URL + '/get-this-hw-show-and-tell-google-link/'
    var Url = url + mbn + '&' + homework_id
    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        if (response.data.length > 0) {
          // alert('response.data:' + response.data)
          setMyHistoryList(response.data)
        } else {
          // alert(response.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  return (
    <>
      {messageNoBeforeLessonData ? (
        <>
          {/*前回の課題の履歴がない場合、*/}
          {/* <div
            className="MenuBig mt-5 p-5"
            style={{
              backgroundColor: '#FFB533',
              color: 'white',
              height: 'auto',
            }}
          >
            <h1 className="mb-1" style={{ fontWeight: '900' }}>
              前回レッスンの復習 (Review)
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
              前回のレッスン履歴がありません。
            </h4>
          </div> */}
        </>
      ) : (
        <div
          className="MenuBig mt-5 p-5"
          style={{ backgroundColor: '#FFB533', color: 'white', height: 'auto' }}
        >
          <h2 className="mb-1" style={{ fontWeight: '900' }}>
            前回レッスンの復習 (REVIEW)
          </h2>
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
            新しい課題に進む前に、前のレッスンの添削ファイルと講師の音声を必ずご確認ください。
          </h4>
          {recordListView && (
            <h4
              className="mb-0 mt-3"
              style={{ color: 'black', fontWeight: '600' }}
            >
              先生の録音ファイル[最新順]
            </h4>
          )}
          {recordListView &&
            recordFileList.map((val, key) => {
              var audioFile =
                'https://englib.s3.ap-northeast-1.amazonaws.com/uploadrecording/' +
                val.filename

              return (
                <>
                  <div className="col-lg-12 col-md-12">
                    <div className="banner-content">
                      <audio
                        src={audioFile}
                        controls="controls"
                        style={{
                          alignItems: 'center',
                          height: '30px',
                          paddingTop: '10px',
                          paddingRight: 0,
                          marginRight: 0,
                          width: '50%',
                          maxWidth: '95%',
                          textAlign: 'center',
                        }}
                      />
                    </div>
                  </div>
                </>
              )
            })}

          {myHistoryList &&
            myHistoryList.map((val2, key) => {
              return (
                <>
                  <a href={val2.google_doc_link} target="_blank">
                    <span
                      className="btn btn-danger mt-4"
                      style={{
                        fontWeight: '900',
                        color: 'white',
                        marginTop: '10px',
                      }}
                    >
                      前回の添削ファイルを見る
                    </span>
                  </a>
                  {/* </Link> */}
                </>
              )
            })}
        </div>
      )}

      <div
        className="MenuBig mt-5 p-5"
        style={{ backgroundColor: '#3498DB', color: 'white', height: 'auto' }}
      >
        {/* <MediaQuery query="(min-width: 767px)">
          <div className="col-lg-6 col-md-12">
            <h1>TEST</h1>
          </div>
        </MediaQuery> */}
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
        {/* <h5
          className="mb-0 mt-1 mb-2"
          style={{ color: 'white', fontWeight: '600' }}
        >
          Tutor: {teacherName}
        </h5> */}
        <h1
          className="startBtnBig"
          // onClick={() => {
          //   firstMessage()
          //   nextStepCheck('Step1OST')
          // }}
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
            BEN TOPへ
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
