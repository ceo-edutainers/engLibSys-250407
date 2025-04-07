//quizapp_big_design.css
import react, { useState, useContext, useEffect, useMemo } from 'react'
import axios from 'axios'

import { QuizContext } from './Contexts'
import Upload from '@/components/Output_ShowAndTell/upload'
import Router, { useRouter } from 'next/router'
import PointBar from '@/components/Output_ShowAndTell/PointBar'
import MonsterGet from '@/components/Output_ShowAndTell/MonsterGet'
import StepBarOST from '@/components/Output_ShowAndTell/StepBarOST'
import IdeaBox from '@/components/Output_ShowAndTell/IdeaBox'
import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる

import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/

import StepTitle from '@/components/Output_ShowAndTell/StepTitle'

import StepImportantWords2 from '@/components/Output_ShowAndTell/StepImportantWords2'

import MindmapSample from '@/components/Output_ShowAndTell/SampleMap'
import Subpage from '@/components/Output_ShowAndTell/Subpage'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'

const Step1OST = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const router = useRouter() //使い方：router.replace('/')
  //import useWindowDimensionsを使う
  const { height, width } = useWindowDimensions()
  const thisWidth = width - 10 + 'px'
  //console.log('thisWidth:', thisWidth)

  let audioRightAnswer = new Audio(
    'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/dingdongdang.mp3'
  )
  let audioWrongAnswer = new Audio(
    'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/wrong-answer.mp3'
  )
  ////////////////////////////////////////////////////////////////////
  //SETTING START
  ////////////////////////////////////////////////////////////////////
  const [leastRecordCount, setLeaseRecordCount] = useState(1) //最低何回録音すれば次のステップへ行けるのか
  //最低何回録音すれば次のステップへ行けるのか
  // const [goalText, setGoalText] = useState('最低' + leastRecordCount + '回音読')
  const [currentStep, setCurrentStep] = useState('Step1OST') //
  const [pointKeyNum, setPointKeyNum] = useState('ST-1') //DBのsys_point_set テーブルの pointKeyNum
  const [pageTitle, setPageTitle] = useState('アイディアマインドマップ')
  const [pageTitleSub, setPageTitleSub] = useState(
    '発表したいことをマインドマップで書いてアップロードしよう！'
  )
  const [subpageTitle, setSubpageTitle] = useState('マインドマップの書き方')

  const [firstOrder, setFirstOrder] = useState(
    '①&nbsp;自分が発表したいトピックを決める'
  )
  const [secondOrder, setSecondOrder] = useState(
    '②&nbsp;トピックに関連するキーワードをマインドマップで整理しましょう。1〜2日かけて、できるだけ多くのキーワードを書き出してください。(1枚の紙にまとめる)'
  )
  const [thirdOrder, setThirdOrder] = useState(
    '③&nbsp;内容がよく見えるように、クリアな写真を撮ってアップロードし、次のステップに進んでください。'
  )
  const [fourthOrder, setFourthOrder] = useState('')
  const [fifthOrder, setFifthOrder] = useState('')
  // const [kizukiTitle, setKizukiTitle] = useState('このステップの気づきポイント')
  // const [kizukiDetail, setKizukiDetail] = useState(
  //   '最初に聴く音声でシャドーイングをしてみることで、自分ができない部分を気づくことができます。そして、この音声を練習最後の日の録音音声と比較することで、成長を感じることができます。'
  // )

  const [stepWords1, setStepWords1] =
    useState('アイディアをブレーンストーミング')
  const [stepWords2, setStepWords2] = useState('')
  const [stepWords3, setStepWords3] = useState('')

  ////////////////////////////////////////////////////////////////////
  //SETTING END
  ////////////////////////////////////////////////////////////////////

  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味

  const [HWbookInfo, setHWbookInfo] = useState([]) //DBからHWのデータを持ってきて入れる
  const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる

  const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる

  // const [nextQInsert, setNextQInsert] = useState('')

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
    outlineLimitWords,
    setOutlineLimitWords,
    scriptLimitWords,
    setScriptLimitWords,
    showandtell_type,
    setShowandtell_type,
  } = useContext(QuizContext)

  const handlePracticeRest = () => {
    //練習をやめる時

    setIsOpenBackMypage(false)

    var nextStep = ''
    // alert('in handlePracticeRest')
    // alert(stepStatus)
    // alert('currentStep')
    // alert(currentStep)
    // alert('nextStep')
    // alert(nextStep)
    localStorage.setItem('holdTempIdOST', practiceTempId)
    hwHistoryUpdate(currentStep, 'holding', HWID, practiceTempId, nextStep)
  }
  const hwHistoryUpdate = (
    currentStep,
    stepStatus,
    homework_id,
    practiceTempId,
    nextStep
  ) => {
    var mbn = localStorage.getItem('MypageMbn')
    //alert(stepStatus)
    //alert(practiceTempId)
    var url = DB_CONN_URL + '/update-sys-hw-history/'
    axios

      .put(
        url +
          mbn +
          '&' +
          homework_id +
          '&' +
          practiceTempId +
          '&' +
          currentStep +
          '&' +
          stepStatus +
          '&' +
          thisSubject
      )

      .then((response) => {
        if (stepStatus == 'holding') {
          router.reload('/outputShowAndTellCourse') // ここでリロード
        } else if (stepStatus == 'end') {
          setPageView(nextStep)
        }
      })
  }

  const nextStepCheck = (option, arrayNum) => {
    setIsGoNextPage(true)
  }
  const nextStep = (option, arrayNum) => {
    const fetchData = async () => {
      try {
        // const response =
        // await axios.get(Url).then((response) => {
        var stepStatus = 'end'
        var nextStep = 'Step2OST'
        hwHistoryUpdate(currentStep, stepStatus, HWID, practiceTempId, nextStep)

        practiceStart(nextStep)

        // })
      } catch (error) {
        alert('select error!')
      }
    }

    fetchData()
    // }
  }

  const practiceStart = (nextStep) => {
    //次のStep1OSTのsys_hw_historyテーブルのstepStatusがendになっている場合は、Step2OSTにいく。
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
    // <div>
    <>
      <div className="QuizBigShowandtell mb-0 pb-0" style={{ border: 0 }}>
        <div className="row">
          <div className="col-lg-12 col-md-6">
            <MonsterGet />
          </div>
          {/* <div className="col-lg-3 col-md-6">
            <FireView thisSubject={thisSubject} />
           
          </div> */}
        </div>
      </div>

      <PointBar
        cStep={pageView}
        pageTitle="SHOW AND TELL"
        bcolor="orange"
        pointKeyNum={pointKeyNum}
      />
      <StepBarOST cStep={pageView} />
      <div className="QuizBigShowandtell" style={{ backgroundColor: 'white' }}>
        <div className="container">
          {/* {HWbookInfo.map((val, key) => { */}
          {/* return (
              <> */}
          <div className="row align-items-center">
            <div
              className="col-lg-12 col-md-6 mt-2"
              style={{ textAlign: 'center' }}
            >
              <StepTitle pageTitle={pageTitle} pageTitleSub={pageTitleSub} />
              <img
                src="/images/homework-writing.png"
                style={{
                  height: '50px',
                  width: 'auto',
                  marginRight: '20px',
                }}
              />
              <img
                src="/images/homework-upload.png"
                style={{ height: '50px', width: 'auto' }}
              />
            </div>
            {/* <div className="col-lg-4 col-md-0" style={{ textAlign: 'center' }}>
              <StepImportantWords2
                stepWords1={stepWords1}
                stepWords2={stepWords2}
                stepWords3={stepWords3}
              />
            </div> */}

            <div className="col-lg-12 col-md-12 mb-0 mt-3 ">
              <Subpage
                firstOrder={firstOrder}
                secondOrder={secondOrder}
                thirdOrder={thirdOrder}
                fourthOrder={fourthOrder}
                fifthOrder={fifthOrder}
                subpageTitle={subpageTitle}
              />
            </div>

            {/* <div className="col-lg-12 col-md-12 mt-0 mb-0 pt-0 ">
              <IdeaBox />
            </div> */}
            <div className="col-lg-12 col-md-12 mt-0 mb-3 pt-0 ">
              <MindmapSample />
            </div>
          </div>

          <Upload
            // mbn={myMbn}
            HWID={HWID}
            currentStep={currentStep}
            stepStatus="Mindmap"
            pointKeyNum={pointKeyNum}
            practiceTempId={practiceTempId}
            thisSubject={thisSubject}
          />
          {/* {Responsive START} */}

          {/* <div className="col-lg-12 col-md-12  ">
                  <StepImportantWords
                    stepWords1={stepWords1}
                    stepWords2={stepWords2}
                    stepWords3={stepWords3}
                  />
                </div> */}

          {/* {Responsive END} */}
          {/* </div> */}
          {/* <VoiceRecorderToS3ForSelfLessonPage
                  mbn={myMbn}
                  homework_id={HWID}
                  practiceTempId={practiceTempId}
                  audioDurationFromDB={audioDurtaionFromDB}
                  pointKeyNum={pointKeyNum}
                  pointStep={currentStep}
                  leastRecordCount={leastRecordCount}
                /> */}

          {/* {Responsive START2} */}

          {/* {Responsive END2} */}
          {/* </>
            )
          })} */}
          {/* <SpeechToText mbn={myMbn} /> */}
          {currentStep == 'Step5' ? (
            <>
              <button
                className="btn btn-danger mt-1"
                onClick={() => {
                  finishQuiz(optionChosen, currentStep)
                }}
                id="nextStep"
              >
                Finish Today's Study
              </button>
            </>
          ) : (
            <>
              <div className="row">
                {/* <MediaQuery query="(min-width: 767px)"> */}
                <div className="col-lg-6 col-md-12">
                  <div
                    className="banner-content"
                    style={{ paddingTop: '20px' }}
                  >
                    <a
                      onClick={() => {
                        setIsOpenBackMypage(true)
                      }}
                    >
                      <button
                        style={{ width: '200px', fontWeight: 'bold' }}
                        className="btn btn-info mt-0 mb-2"
                        id="nextStep"
                      >
                        一旦休憩する
                      </button>
                    </a>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div
                    className="banner-content"
                    style={{ paddingTop: '20px' }}
                  >
                    <button
                      style={{
                        width: '200px',
                        fontWeight: 'bold',
                        backgroundColor: '#333888',
                        border: 0,
                      }}
                      className="btn btn-primary mt-0 mb-2"
                      onClick={() => {
                        nextStepCheck()
                      }}
                      id="nextStep"
                    >
                      次のステップへ
                    </button>
                  </div>
                </div>
                {/* </MediaQuery> */}
                {/* <MediaQuery query="(max-width: 767px)">
                  <div className="col-lg-6 col-md-12 mt-5">
                    <div
                      className="banner-content"
                      style={{ paddingTop: '0px' }}
                    >
                      <a
                        onClick={() => {
                          setIsOpenBackMypage(true)
                        }}
                      >
                        <button
                          style={{
                            width: '200px',
                            fontWeight: 'bold',
                          }}
                          className="btn btn-info mt-0 mb-2"
                          id="nextStep"
                        >
                          今日の練習をやめる
                        </button>
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="banner-content">
                      <button
                        style={{
                          width: '200px',
                          fontWeight: 'bold',
                          backgroundColor: '#333888',
                          border: 0,
                        }}
                        className="btn btn-primary mt-0 mb-2"
                        onClick={() => {
                          nextStepCheck()
                        }}
                        id="nextStep"
                      >
                        次のステップへ
                      </button>
                    </div>
                  </div>
                </MediaQuery> */}
              </div>
            </>
          )}
          {/* })} */}
          <SweetAlert
            title="一旦休憩しますか？"
            show={isOpenBackMypage}
            onConfirm={() => handlePracticeRest()}
            onCancel={() => {
              setIsOpenBackMypage(false)
            }}
            confirmBtnText="休憩する"
            cancelBtnText="戻る"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '600px' }}
          >
            {/* <p>
             
            </p> */}
          </SweetAlert>
          <SweetAlert
            title="次のステップに行きますか？"
            show={isGoNextPage}
            onConfirm={() => nextStep()}
            onCancel={() => {
              setIsGoNextPage(false)
            }}
            confirmBtnText="YES"
            cancelBtnText="NO"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '500px' }}
          >
            {/* <p></p> */}
          </SweetAlert>
          <SweetAlert
            title="録音が終わっていません。"
            show={isCantGoNextPage}
            onConfirm={() => setIsCantGoNextPage(false)}
            onCancel={() => {
              setIsCantGoNextPage(false)
            }}
            confirmBtnText="練習を続ける"
            // cancelBtnText="OK"
            showCancel={false}
            reverseButtons={true}
            style={{ width: '600px', backgroundColor: '#afeeee' }}
          >
            <p>
              決まった回数以上の録音が終わってないと次のステップに行けません。
            </p>
          </SweetAlert>
        </div>
      </div>
      <CopyrightFooter />
    </>
  )
}

export default Step1OST
