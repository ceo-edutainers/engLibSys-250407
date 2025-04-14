//quizapp_big_design.css
import react, { useState, useContext, useEffect, useMemo } from 'react'
import axios from 'axios'

import { QuizContext } from './Contexts'
import Upload from '@/components/Output_ShowAndTell/upload'
import Router, { useRouter } from 'next/router'
import PointBar from '@/components/Output_ShowAndTell/PointBar_2'
import MonsterGet from '@/components/Output_ShowAndTell/MonsterGet'
import StepBarOST from '@/components/Output_ShowAndTell/StepBarOST'
import WritingBox from '@/components/Output_ShowAndTell/WritingBox'
import YourSelect from '@/components/Output_ShowAndTell/YourSelect'
import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる

import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/

import StepTitle from '@/components/Output_ShowAndTell/StepTitle'

import StepImportantWords2 from '@/components/Output_ShowAndTell/StepImportantWords2'

import SampleWriting from '@/components/Output_ShowAndTell/SampleWriting'
import Subpage from '@/components/Output_ShowAndTell/Subpage'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { MdBeenhere } from 'react-icons/md'

const Step1OST = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')

  const [mindmapView, setMindmapView] = useState(false) //IdeaView
  const [writingBoxList, setWritingBoxList] = useState([])
  const [searchTermName, setSearchTermName] = useState()
  const [selectedWriting, setSelectedWriting] = useState()
  const [exampleView, setExampleView] = useState(false)

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
  const [pageTitle, setPageTitle] = useState('課題のトピックを選ぶ')
  const [pageTitleSub, setPageTitleSub] = useState(
    '発表したい課題トピックを選びましょう！'
  )
  const [subpageTitle, setSubpageTitle] = useState('マインドマップの書き方')

  const [firstOrder, setFirstOrder] = useState(
    '①&nbsp;自分が発表したいトピックを決める'
  )
  const [secondOrder, setSecondOrder] = useState(
    '②&nbsp;トピックのキーワードをマインドマップで書いて頭の整理をする。'
  )
  const [thirdOrder, setThirdOrder] = useState(
    '③&nbsp;写真を撮ってアップロードして、次のページへ。'
  )
  const [fourthOrder, setFourthOrder] = useState('')
  const [fifthOrder, setFifthOrder] = useState('')
  const [kizukiTitle, setKizukiTitle] = useState('このステップの気づきポイント')
  const [kizukiDetail, setKizukiDetail] = useState(
    '最初に聴く音声でシャドーイングをしてみることで、自分ができない部分を気づくことができます。そして、この音声を練習最後の日の録音音声と比較することで、成長を感じることができます。'
  )

  const [stepWords1, setStepWords1] = useState('あなたのレベル')
  const [stepWords2, setStepWords2] = useState('')
  const [stepWords3, setStepWords3] = useState('')

  ////////////////////////////////////////////////////////////////////
  //SETTING END
  ////////////////////////////////////////////////////////////////////

  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  const [isGoNextPage2, setIsGoNextPage2] = useState(false)
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
    showandtellTitle,
    setShowandtellTitle,
    showandtellTitle_yourLanguage,
    setShowandtellTitle_yourLanguage,
    showandtellTitle_Level,
    setShowandtellTitle_Level,
  } = useContext(QuizContext)

  const handlePracticeRest = () => {
    setIsOpenBackMypage(false)

    const nextStep = ''
    localStorage.setItem('holdTempIdOST', practiceTempId)

    hwHistoryUpdate(
      currentStep,
      'holding',
      HWID,
      practiceTempId,
      nextStep,
      true
    )
  }

  const hwHistoryUpdate = async (
    currentStep,
    stepStatus,
    homework_id,
    practiceTempId,
    nextStep,
    goToMypage // ← 새 파라미터 추가
  ) => {
    const mbn = localStorage.getItem('MypageMbn')

    // console.log('TEST-homework_id', homework_id)
    // console.log('TEST-practiceTempId', practiceTempId)
    // console.log('TEST-currentStep', currentStep)
    // console.log('TEST-stepStatus', stepStatus)
    // console.log('TEST-thisSubject', thisSubject)
    try {
      const response = await axios.post(
        `${DB_CONN_URL}/update-sys-hw-history`,
        {
          mbn,
          homework_id,
          practiceTempId,
          currentStep,
          stepStatus,
          thisSubject, // thisSubject는 컴포넌트 내에서 선언된 상태값으로 유지
        }
      )

      if (response.data.status) {
        // alert('here1-1', response.data.status)
        if (stepStatus === 'holding') {
          addWriting()
          // router.reload('/outputShowAndTellCourse')
          if (goToMypage) {
            // alert('1')
            router.push('/outputShowAndTellCourse') // ← router.reload에서 push로 변경
          } else {
            // alert('2')
          }
        } else if (stepStatus === 'end') {
          addWriting()
          insertPointToDB()
          setPageView(nextStep)
        }
      } else {
        console.warn('⚠️ DB update failed:', response.data.message)
      }
    } catch (error) {
      console.error('❌ Failed to update hwHistory:', error)
    }
  }
  const nextStepCheck = (option, arrayNum) => {
    setIsGoNextPage(true)
  }
  const nextStepCheck2 = (option, arrayNum) => {
    setIsGoNextPage2(true)
  }
  const nextStep = (option, arrayNum) => {
    const fetchData = async () => {
      // alert(selectedWriting)
      alert(HWID)
      try {
        var mbn = localStorage.getItem('MypageMbn')
        // alert(HWID)
        // const response =
        // await axios.get(Url).then((response) => {

        var url = DB_CONN_URL + '/update-shadowing-title'

        axios
          .post(url, {
            mbn: mbn,
            homework_id: HWID,
            selectedWriting: selectedWriting,
          })
          .then((response) => {
            // alert(response.data.message)
            if (response.data.status) {
              var stepStatus = 'end'
              var nextStep = 'Step2OST'
              hwHistoryUpdate(
                currentStep,
                stepStatus,
                HWID,
                practiceTempId,
                nextStep
              )

              practiceStart(nextStep)
            }
          })

        // })
      } catch (error) {
        alert('select error!')
      }
    }

    fetchData()
    // }
  }

  const nextStep2 = (option, arrayNum) => {
    const fetchData = async () => {
      // alert(selectedWriting)

      try {
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
    <>
      <div className="QuizBigShowandtell mb-0 pb-0" style={{ border: 0 }}>
        <div className="row">
          <div className="col-lg-12 col-md-6">
            <MonsterGet />
            HWID:{HWID}
          </div>
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
              className="col-lg-8 col-md-6 mt-2"
              style={{ textAlign: 'center' }}
            >
              <StepTitle pageTitle={pageTitle} pageTitleSub={pageTitleSub} />
            </div>
            <div className="col-lg-4 col-md-0" style={{ textAlign: 'center' }}>
              <StepImportantWords2
                stepWords1={stepWords1}
                stepWords2={showandtellTitle_Level}
                stepWords3={stepWords3}
              />
            </div>

            <YourSelect
              stitle={showandtellTitle}
              syouttitle={showandtellTitle_yourLanguage}
              slevel={showandtellTitle_Level}
            />

            <div className="col-lg-12 col-md-12 mt-0 mb-0 pt-0 ">
              {/* <WritingBox /> */}
              <span style={{ cursor: 'pointer' }}>
                <h5
                  style={{
                    // width: '100%',
                    width: '100',
                    fontSize: '18px',
                    padding: '10px',
                    marginTop: '20px',
                    marginBottom: '15px',
                    color: 'black',
                    fontWeight: '600',
                    border: '1px solid #FCD2CF',
                    borderRadius: '10px',
                    backgroundColor: '#afeeee',
                  }}
                  onClick={() => {
                    setMindmapView(!mindmapView)
                    setSearchTermName(showandtellTitle_Level)
                  }}
                >
                  {/* HWID: {HWID} */}
                  <img
                    src="/images/icon-mouseclick.png"
                    style={{ height: '40px', width: 'auto' }}
                  />
                  クリックして課題トピックのリストを
                  {mindmapView ? '隠す' : '見る'}
                  <p>
                    課題トピックがまだ決まったら、左側のボタンをクリックして次のステップへ！
                  </p>
                </h5>
              </span>
              <div
                className="col-lg-12 col-md-12 pt-2 pb-2"
                style={{
                  display: mindmapView ? 'block' : 'none',
                  textAlign: 'center',
                }}
              >
                <p style={{ color: 'red' }}>
                  あなたのレベルは&nbsp;<b>{showandtellTitle_Level}</b>
                  &nbsp;です。<b>{showandtellTitle_Level}</b>
                  の課題からトピックを選んでください。
                  <br />
                  レベルが合わない場合は講師と相談してレベルを調整してください。
                </p>
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
              </div>{' '}
              <div
                className="col-lg-12 col-md-12 mt-2 mb-2"
                style={{
                  display: mindmapView ? 'block' : 'none',
                  textAlign: 'center',
                }}
              >
                <span
                  className="btn btn-primary"
                  onClick={() => setExampleView(!exampleView)}
                >
                  {searchTermName == '' || searchTermName == null
                    ? 'Level2'
                    : searchTermName}
                  のライティングのサンプルを
                  {exampleView ? '隠す' : '見る'}
                </span>
                <br />
                {searchTermName == 'Level2' && (
                  <span>目安の単語数：50〜60単語</span>
                )}
                {searchTermName == 'Level3' && (
                  <span>目安の単語数：80〜100単語</span>
                )}
                {searchTermName == 'Level4' && (
                  <span>目安の単語数：120〜150単語</span>
                )}
                {searchTermName == 'Level5' && (
                  <span>目安の単語数：200〜240単語</span>
                )}
                {searchTermName == 'Level6' && (
                  <span>目安の単語数：300〜350単語</span>
                )}
              </div>
              <div
                className="col-lg-12 col-md-12 "
                style={{
                  display: mindmapView ? 'block' : 'none',
                  textAlign: 'left',
                }}
              >
                <table className="table table mt-2">
                  <thead>
                    <tr>
                      <th style={{ width: '5%' }}></th>
                      <th style={{ width: '5%' }}>Level</th>
                      <th style={{ width: '45%' }}>Title</th>
                      <th style={{ width: '45%' }}>Japanese</th>
                    </tr>
                  </thead>
                  <tbody style={{ width: '100%' }}>
                    {exampleView && (
                      <tr>
                        <td colspan="4">
                          {(searchTermName == 'Level2' ||
                            searchTermName == null) && (
                            <img
                              src="/images/writing-sample/outline-example-level2.png"
                              style={{
                                border: '1px solid darkgray',
                                borderRadius: '10px',
                              }}
                            />
                          )}
                          {searchTermName == 'Level3' && (
                            <img
                              src="/images/writing-sample/outline-example-level3.png"
                              style={{
                                border: '1px solid darkgray',
                                borderRadius: '10px',
                              }}
                            />
                          )}
                          {searchTermName == 'Level4' && (
                            <img
                              src="/images/writing-sample/outline-example-level4.png"
                              style={{
                                border: '1px solid darkgray',
                                borderRadius: '10px',
                              }}
                            />
                          )}
                          {searchTermName == 'Level5' && (
                            <img
                              src="/images/writing-sample/outline-example-level5.png"
                              style={{
                                border: '1px solid darkgray',
                                borderRadius: '10px',
                              }}
                            />
                          )}
                          {searchTermName == 'Level6' && (
                            <img
                              src="/images/writing-sample/outline-example-level6.png"
                              style={{
                                border: '1px solid darkgray',
                                borderRadius: '10px',
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    )}
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
                            <tr>
                              <td style={{ width: '5%' }}>
                                {/* selectedWriting:{selectedWriting} */}
                                <input
                                  type="radio"
                                  name="selWriting"
                                  onClick={() => {
                                    setSelectedWriting(val.autoid)
                                    setIsGoNextPage(true)
                                  }}
                                />
                              </td>
                              <td style={{ width: '5%' }}>{val.level}</td>
                              <td style={{ width: '50%' }}>{val.title}</td>
                              <td style={{ width: '45%' }}>
                                {val.title_japanese}
                              </td>
                            </tr>
                            {/* {val.example_yes !== '' && (
                    <tr style={{ backgroundColor: 'skyblue' }}>
                      <td style={{ width: '5%' }}>サンプル</td>
                      <td style={{ width: '50%' }}>{val.example_yes}</td>
                      <td style={{ width: '45%' }}>
                        {val.example_no !== '' && val.example_no}
                      </td>
                    </tr>
                  )} */}
                          </>
                        )
                      })}{' '}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* <Upload
            // mbn={myMbn}
            HWID={HWID}
            currentStep={currentStep}
            stepStatus="Mindmap"
            pointKeyNum={pointKeyNum}
            practiceTempId={practiceTempId}
            thisSubject={thisSubject}
          /> */}

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
                {/* <div className="col-lg-6 col-md-12">
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
                        一旦休憩する--
                      </button>
                    </a>
                  </div>
                </div> */}

                <div className="col-lg-12 col-md-12">
                  <div
                    className="banner-content"
                    style={{ paddingTop: '20px' }}
                  >
                    <button
                      style={{
                        // width: '200px',
                        fontWeight: 'bold',
                        backgroundColor: '#333888',
                        border: 0,
                      }}
                      className="btn btn-primary mt-0 mb-2"
                      onClick={() => {
                        nextStepCheck2()
                      }}
                      id="nextStep"
                    >
                      トピックを選んだら次のステップへ
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
            <p>選択されたライティング課題でよろしければYESを押してください。</p>
          </SweetAlert>
          <SweetAlert
            title="次のステップに行きますか？"
            show={isGoNextPage2}
            onConfirm={() => nextStep2()}
            onCancel={() => {
              setIsGoNextPage2(false)
            }}
            confirmBtnText="YES"
            cancelBtnText="NO"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '500px' }}
          >
            <p>選択されたライティング課題でよろしければYESを押してください。</p>
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
