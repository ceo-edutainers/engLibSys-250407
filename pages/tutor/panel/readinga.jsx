import React, { useState, useEffect } from 'react'
import SplitPanelReading from '@/components/Splitpanel/SplitPanelReading'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import axios from 'axios'

import { Rnd } from 'react-rnd'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import ViewGrammraTerms from '@/components/Output_ShowAndTell/ViewGrammarTerms'
import ViewEnglibLevel from '@/components/Output_ShowAndTell/ViewEnglibLevel2'
import ViewTrouble from '@/components/Output_ShowAndTell/ViewTrouble'
import ViewSetHW from '@/components/Output_ShowAndTell/ViewSetHW'
import ViewReading from '@/components/Output_ShowAndTell/ViewReading'
import ViewPhonics from '@/components/Output_ShowAndTell/ViewPhonics'
import ViewConversation from '@/components/Output_ShowAndTell/ViewConversation'
import ViewGrammar from '@/components/Output_ShowAndTell/ViewGrammar'
import ViewSchoolEnglish from '@/components/Output_ShowAndTell/ViewSchoolEnglish'
import TextareaAutosize from 'react-textarea-autosize'
import ViewShadowingVideo from '@/components/Output_ShowAndTell/ViewShadowingVideo'
import ViewShadowingBook from '@/components/Output_ShowAndTell/ViewShadowingBook'
// import ReadingStudentWorkBox from '@/components/Tutor/ReadingStudentWorkBox'
// import { myFun_getYoutubeID } from '@/components/FunctionComponent'

const READINGA = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
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

  const tbn = query.tbn
  const courseName = query.cN

  const [shadowingView, setShadowingView] = useState(false)
  const [readingView, setReadingView] = useState(true)
  const [phonicsView, setPhonicsView] = useState(false)
  const [conversationView, setConversationView] = useState(false)
  const [grammarView, setGrammarView] = useState(false)
  const [schoolEnglishView, setSchoolEnglishView] = useState(false)
  const [readingLevelView, setReadingLevelView] = useState(false)
  const [troubleShootView, setTroubleShootView] = useState(false)
  const [hwSetView, setHwSetView] = useState(false)
  // const [youtubeID, setYoutubeID] = useState()
  const [homeworkID, setHomeworkID] = useState()
  const [lessonPageTitle, setLessonPageTitle] = useState()
  const [googleDocLink, setGoogleDocLink] = useState()
  const [nameEng, setNameEng] = useState()
  const [tutorNameEng, setTutorNameEng] = useState()
  const [classLink, setClassLink] = useState()

  const [newLesson, setNewLesson] = useState(false)
  const [whenDetail, setWhenDetail] = useState()
  // console.log('query.mbn:', mbn)
  // console.log('query.course:', courseName)
  // console.log('query.courseName:', query.cN)

  //For Feedback
  const [feedbackPronounciation, setFeedbackPronounciation] = useState()
  const [feedbackPhonics, setFeedbackPhonics] = useState()
  const [feedbackGrammar, setFeedbackGrammar] = useState()
  const [feedbackProblemTechnical, setFeedbackProblemTechnical] = useState()
  const [feedbackProblemLessonContrate, setFeedbackProblemLessonContrate] =
    useState()
  const [feedbackProblemHW, setFeedbackProblemHW] = useState()
  const [feedbackMemoToMom, setFeedbackMemoToMom] = useState()

  //Rnd
  const [rndWidth1, setRndWidth1] = useState(300)
  const [rndHeight1, setRndHeight1] = useState(300)
  const [defaultX, setDefaultX] = useState(0)
  const [defaultY, setDefaultY] = useState(0)
  const [rndZIndex, setRndZIndex] = useState(2) //-1 後ろ

  function rndResize(width, height, x, y, zIndex) {
    setRndWidth1(width)
    setRndHeight1(height)
    setDefaultX(x)
    setDefaultY(y)
    setRndZIndex(zIndex)
  }
  const [rndSwWidth1, setRndSwWidth1] = useState(300)
  const [rndSwHeight1, setRndSwHeight1] = useState(300)
  const [defaultSwX, setDefaultSwX] = useState(0)
  const [defaultSwY, setDefaultSwY] = useState(200)
  const [rndSwZIndex, setRndSwZIndex] = useState(2) //-1 後ろ

  function rndStudentWorkResize(width, height, x, y, zIndex) {
    setRndSwWidth1(width)
    setRndSwHeight1(height)
    setDefaultSwX(x)
    setDefaultSwY(y)
    setRndSwZIndex(zIndex)
  }

  const [rndSwWidth2, setRndSwWidth2] = useState(300)
  const [rndSwHeight2, setRndSwHeight2] = useState(300)
  const [defaultSwX2, setDefaultSwX2] = useState(0)
  const [defaultSwY2, setDefaultSwY2] = useState(400)
  const [rndSwZIndex2, setRndSwZIndex2] = useState(2) //-1 後ろ

  function rndFeedbackResize(width, height, x, y, zIndex) {
    setRndSwWidth2(width)
    setRndSwHeight2(height)
    setDefaultSwX2(x)
    setDefaultSwY2(y)
    setRndSwZIndex2(zIndex)
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

  const functionFinishThisLesson = (newstatus) => {
    // alert(nextnextWeekday('MON'))
    setNewLesson(true)
    setIsFinishThisLesson(false)

    var url = DB_CONN_URL + '/finish-show-and-tell-lesson-year-plan/'

    var newstatus = newstatus
    var Url = url + mbn + '&' + homework_id + '&' + newstatus

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
          // alert('next_weekdate' + response.data.next_weekdate)
          // alert(response.data.newYoyakuTime)
          // alert(response.data.duringTime)
          // alert(response.data.NowRegdate)
          // alert(response.data.NowRegtime)
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
      setIsSuccessSetNewLesson(true)
    } else if (newstatus == 'no show') {
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

      var Url = DB_CONN_URL + '/get-hw-reading-first-page-for-tutor-page/' + mbn

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

  if (isError) return <h1>Error, try again reading!</h1>
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
        <div>
          <Rnd
            default={{
              x: defaultX,
              y: defaultY,
              width: rndWidth1,
              height: rndHeight1,
            }}
            size={{
              width: rndWidth1,
              height: rndHeight1,
            }}
            style={{
              // display: 'flex',
              alignItems: 'top',
              overflow: 'scroll',
              justifyContent: 'left',
              paddingTop: '10px',
              paddingLeft: '10px',
              paddingRight: '10px',

              border: 'solid 1px #dedede',
              borderRadius: '10px',
              background: '#2C3E50',
              border: '1px solid darkgray',
              //overflow: 'auto',
              zIndex: rndZIndex,
            }}
            minWidth={300}
            minHeight={50}
            // bounds="window"
          >
            {/* <b>MultiQ</b> */}

            <a
              className="btn btn-light ml-2 mr-2"
              //width, height, x, y, zIndex
              onClick={() => {
                rndResize(600, 800, 0, -50, 3)
                //alert(rndWidth1)
              }}
            >
              HOMEWORK
            </a>

            <a
              className="btn btn-light"
              style={{ color: 'red' }}
              onClick={() => {
                rndResize(300, 50, 0, -50, 4)
                //alert(rndWidth1)
              }}
            >
              X
            </a>
            {/* {rndWidth1} */}
            <br />
            {rndZIndex == 3 && (
              <div className="mt-3">
                <p>
                  <img src="/hwimg/file_1.jpg" />
                </p>

                <img src="/hwimg/file_2.jpg" />
                <img src="/hwimg/file_3.jpg" />
                <img src="/hwimg/file_4.jpg" />
                <img src="/hwimg/file_5.jpg" />
                <img src="/hwimg/file_6.jpg" />
                <img src="/hwimg/file_7.jpg" />
                {/* <DiscussionMultiQuestionBox
                  youtubeID={youtubeID}
                  homework_id={homework_id}
                /> */}
              </div>
            )}
          </Rnd>
          <Rnd
            default={{
              x: defaultSwX,
              y: defaultSwY,
              width: rndSwWidth1,
              height: rndSwHeight1,
            }}
            size={{
              width: rndSwWidth1,
              height: rndSwHeight1,
            }}
            style={{
              //display: 'flex',
              //display: 'flex',
              //alignItems: 'top',
              overflow: 'scroll',
              justifyContent: 'left',
              paddingTop: '10px',
              paddingLeft: '10px',
              paddingRight: '10px',

              border: 'solid 1px #dedede',
              borderRadius: '10px',
              background: '#ececec',
              border: '1px solid darkgray',
              //overflow: 'auto',
              zIndex: rndSwZIndex,
            }}
            minWidth={300}
            minHeight={50}
            // bounds="window"
          >
            <a
              className="btn btn-light ml-2 mr-2"
              onClick={() => {
                rndStudentWorkResize(300, 800, 0, -50, 3)
                //alert(rndWidth1)
              }}
            >
              Student's Study History
            </a>

            <a
              className="btn btn-light"
              style={{ color: 'red' }}
              onClick={() => {
                rndStudentWorkResize(300, 50, 0, -50, 4)
                //alert(rndWidth1)
              }}
            >
              X
            </a>
            {/* {rndWidth1} */}
            <br />
            {rndSwZIndex == 3 && (
              <div className="mt-2">
                <ReadingStudentWorkBox
                  // youtubeID={youtubeID}
                  homework_id={homework_id}
                />
              </div>
            )}
          </Rnd>
          <Rnd
            default={{
              x: defaultSwX2,
              y: defaultSwY2,
              width: rndSwWidth2,
              height: rndSwHeight2,
            }}
            size={{
              width: rndSwWidth2,
              height: rndSwHeight2,
            }}
            // position={{ x: defaultSwX2, y: defaultSwY2 }}
            style={{
              //display: 'flex',
              //display: 'flex',
              //alignItems: 'top',
              overflow: 'scroll',
              justifyContent: 'left',
              paddingTop: '10px',
              paddingLeft: '10px',
              paddingRight: '10px',

              border: 'solid 1px #dedede',
              borderRadius: '10px',
              background: '#F7DC6F',
              border: '1px solid darkgray',
              //overflow: 'auto',
              zIndex: rndSwZIndex2,
            }}
            minWidth={300}
            minHeight={50}
            // bounds="window"
          >
            <a
              className="btn btn-light ml-2 mr-2"
              onClick={() => {
                rndFeedbackResize(500, 1000, 0, 500, 3)
                //alert(rndWidth1)
              }}
            >
              Feedback
            </a>

            <a
              className="btn btn-light"
              style={{ color: 'red' }}
              onClick={() => {
                rndFeedbackResize(300, 50, 0, 500, 4)
                //alert(rndWidth1)
              }}
            >
              X
            </a>
            {/* {rndWidth1} */}
            <br />
            {rndSwZIndex2 == 3 && (
              <div style={{ overflow: 'scroll' }}>
                <hr />
                <h1
                  className="p-0"
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  Message to Mom
                  <p style={{ fontSize: '12px', fontWeight: '500' }}>
                    親にメッセージ
                  </p>
                  <TextareaAutosize
                    row="3"
                    style={{
                      width: '90%',
                      height: '50px',
                      margin: 0,
                      color: 'black',
                      border: '1px solid #dedede',
                      borderRadius: '5px',
                      fontSize: '15px',
                    }}
                  />
                </h1>
                <hr />{' '}
                <h1
                  className="p-0"
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  レベル・コース提案
                </h1>
                <div
                  style={{
                    overflow: 'scroll',
                    height: '100px',
                    backgroundColor: 'green',
                    textAlign: 'left',
                    color: 'white',
                    padding: 5,
                  }}
                >
                  <input type="checkbox" selected />
                  &nbsp;教材の変更をお勧めします。
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;本のレベルを下げます。
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;本のレベルを上げます。
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;本のレベルの変更なし
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;文法クラスを提案します
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;学校サポートクラスを提案します。
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;リーディングクラスに戻ることを提案します。
                </div>
                <hr />
                <h1
                  className="p-0"
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  Pronounciation Rules
                  <p style={{ fontSize: '12px', fontWeight: '500' }}>
                    発音ルール
                  </p>
                </h1>
                <div
                  style={{
                    overflow: 'scroll',
                    height: '200px',
                    backgroundColor: 'green',
                    color: 'white',
                    padding: 5,
                    textAlign: 'left',
                  }}
                >
                  <input type="checkbox" selected />
                  {/* */}
                  &nbsp; 子音＋母音のリンキング
                  <br />
                  pick up | picked up //check in | checked in //send out | sent
                  out// stop it | stopped it //pick it up | picked it up
                  {/* */}
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;アクセントのある「A」/ӕ/
                  <br />
                  cat, apple, ask
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;アクセントの無い母音(shuwaサウンと/ə/)
                  <br />
                  Adam, Atom, memorial
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;子音＋母音(put it up)
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;弱くなる「T」「D」(wanted to/twenty)
                  <br />
                  photo meeting waiting computer water better bitter waiter
                  cheating
                  <br />
                  not at all /a lot of money/ I got to (gotta) go/ bread and
                  butter /what do you do? /I don’t know /You didn’t know? /He
                  doesn’t know.
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;「N」の次に来る「T」(wanted to/twenty)
                  <br />
                  center winter gentleman Santa Clause entertain plenty twenty
                  internet I wanted to I want to
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;「TH」/ð/that, the, this
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;R(run) vs R(car)
                  <br />
                  run round rest right read rice pray
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;R(run) vs W(want)
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;S(sing) vs TH(thing)
                  <br />
                  sing - thing/sigh - thigh/mass - math
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;S(snake) vs SH(sheep)
                  <br />
                  see - she /self - shelf /save - shave /sell - shell /sort -
                  short
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;音の出し方：Z(zebra)
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;O(stop) vs O(robot)
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;アクセントのある「O」は/お/ではない
                  <br />
                  no go so ago old cold bold fold sold rose
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;V(voice) & F(face)
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;dr(drink) & tr(train)
                  <br />
                  dream drink drive drug drawing drag
                  <br />
                  truck try tree trunk trust trial triple
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;機能語の「of 」の/v/は発音しない
                  <br />
                  I’m kind of tired./ a piece of cake./ a lot of time.
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;機能語の最初の「h」は発音しない。
                  <br />I hate him./ I asked him./ I pushed him./ I wrote her./
                  I called her.
                  <br />
                  <input type="checkbox" selected />
                  &nbsp; 子音の音が三つ一緒になった時、 真ん中の音は発音しない。
                  <br />
                  asked exactly correctly perfectly restless
                  <br />
                  <input type="checkbox" selected />
                  &nbsp; 最初の単語の最後の子音が p,t,k,b,d,gの場合、発音しない
                  <br />
                  tap dance /stop sign /good plan /cook dinner /keep quite
                  /backpack
                  <br />
                  <input type="checkbox" selected />
                  &nbsp; 二つの単語が同じ子音で始まって終わる場合。
                  <br />
                  bus stop /hot tea/ gas station /short tower/ at twelve/ big
                  guy/ bad dream
                  <br />
                </div>
                <hr />
                <h1
                  className="p-0"
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  Concentration Problem
                  <p style={{ fontSize: '12px', fontWeight: '500' }}>
                    集中力問題
                  </p>
                </h1>
                <div
                  style={{
                    overflow: 'scroll',
                    height: '150px',
                    backgroundColor: 'green',
                    color: 'white',
                    textAlign: 'left',
                    padding: 5,
                  }}
                >
                  <input type="checkbox" selected />
                  &nbsp;周りに気が散るもの(おもちゃなど)がある
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;動き回る
                  <br />
                  <input type="checkbox" />
                  &nbsp;周りの音がうるさくて集中が切れる
                  <br />
                  <input type="checkbox" />
                  &nbsp;親が話しかける時が多くて、先生と１：１のレッスンにならない
                  <br />
                  <input type="checkbox" />
                  &nbsp;パソコンで他のをことを見てる気がする
                  <br />
                  <input type="checkbox" />
                  &nbsp;適切なヘッドセットがなく、生徒の発音がよく聞こえない
                </div>
                <hr />
                <h1
                  className="p-0"
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  H.W Feedback
                </h1>
                <div
                  style={{
                    overflow: 'scroll',
                    height: '100px',
                    backgroundColor: 'green',
                    textAlign: 'left',
                    color: 'white',
                    padding: 5,
                  }}
                >
                  <input type="checkbox" selected />
                  &nbsp;キャピタル文字エラー
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;Dictationで自分で丸付をしてない
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;.をつけない時が多い
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;文字を丁寧に書かない
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;音を聞く回数が少ない
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;練習量が足りない
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;知らない単語を選んでない
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;単語の理解が足りない
                  <br />
                  <input type="checkbox" selected />
                  &nbsp;すらすら読めるけど、意味を考えながら読まない
                </div>
                <hr />
                <h1
                  className="p-0"
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  Technical Problem
                  <p style={{ fontSize: '12px', fontWeight: '500' }}>
                    テクニカル問題
                  </p>
                </h1>
                <div
                  style={{
                    overflow: 'scroll',
                    height: '100px',
                    backgroundColor: 'green',
                    textAlign: 'left',
                    color: 'white',
                    padding: 5,
                  }}
                >
                  <input type="checkbox" />
                  &nbsp;ヘッドセット用意。
                  <br />
                  <input type="checkbox" />
                  &nbsp;レッスンの前にパソコン再起動
                </div>
              </div>
            )}
          </Rnd>
        </div>
        <div className="col-lg-4 col-md-12 text-left">
          {/* <Link href="/tutor/tutor-temporary-page">
            <a
              className="btn btn-danger text-white ml-4 mr-2 mt-2"
              style={{ height: 35 }}
            >
              Finish This Lesson
            </a>
          </Link> */}

          <Link href="/tutor/tutor-temporary-page">
            <a
              className="btn btn-danger text-white ml-4 mr-2 mt-2"
              style={{ height: 35 }}
            >
              Back to home
            </a>
          </Link>

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
            {lessonPageTitle && lessonPageTitle}
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
            <span
              className="btn btn-warning p-1"
              style={{ fontSize: '25px' }}
              onClick={() => {
                setIsNoShow(true)
                setNewLesson(true)
              }}
            >
              No Show
            </span>
          </h1>

          <p>
            Tutor:&nbsp;<b>{tutorNameEng}</b>
            &nbsp;&nbsp;|&nbsp;&nbsp;Student:&nbsp;
            <b>{nameEng}</b>
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
        {/* <div
          className="col-lg-4 col-md-12 pr-0 mr-0"
          style={{ textAlign: 'right' }}
        >
          <ViewGrammraTerms />
        </div> */}

        <div className="col-lg-12 col-md-12" style={{ textAlign: 'center' }}>
          <span
            className="btn btn-danger mr-2"
            onClick={() => {
              setReadingView(!readingView)
              // handleClear()
            }}
          >
            READING
          </span>
          <span
            className="btn btn-danger mr-2"
            onClick={() => {
              setShadowingView(!shadowingView)
              // handleClear()
            }}
          >
            SHADOWING
          </span>
          <span
            className="btn btn-danger mr-2"
            onClick={() => {
              setPhonicsView(!phonicsView)
              // handleClear()
            }}
          >
            PHONICS
          </span>
          <span
            className="btn btn-danger mr-2"
            onClick={() => {
              setConversationView(!conversationView)
              // handleClear()
            }}
          >
            CONVERSATION
          </span>
          <span
            className="btn btn-danger mr-2"
            onClick={() => {
              setGrammarView(!grammarView)
              // handleClear()
            }}
          >
            GRAMMAR
          </span>
          <span
            className="btn btn-danger mr-2"
            onClick={() => {
              setSchoolEnglishView(!schoolEnglishView)
              // handleClear()
            }}
          >
            SCHOOL ENGLISH
          </span>
          <span
            className="btn btn-danger mr-2"
            onClick={() => {
              setReadingLevelView(!readingLevelView)
              // handleClear()
            }}
          >
            Reading Level
          </span>
          <span
            className="btn btn-danger mr-2"
            onClick={() => {
              setTroubleShootView(!troubleShootView)
              // handleClear()
            }}
          >
            Trouble Shooting
          </span>
          <span
            className="btn btn-danger mr-2"
            onClick={() => {
              setHwSetView(!hwSetView)
              // handleClear()
            }}
          >
            H.W Setting
          </span>
        </div>
        <div className="col-lg-12 col-md-12" style={{ textAlign: 'right' }}>
          <div
            style={{ width: '100%', display: shadowingView ? 'block' : 'none' }}
          >
            <ViewShadowingVideo mbn={mbn} tbn={tbn} />
          </div>
          <div
            style={{
              textAlign: 'center',
              display: readingLevelView ? 'block' : 'none',
            }}
          >
            <ViewEnglibLevel mbn={mbn} courseName={courseName} />
          </div>
          <div
            style={{
              width: '100%',
              display: troubleShootView ? 'block' : 'none',
            }}
          >
            <ViewTrouble mbn={mbn} />
          </div>
          <div style={{ width: '100%', display: hwSetView ? 'block' : 'none' }}>
            <ViewSetHW mbn={mbn} homework_id={homework_id} />
          </div>
          <div
            style={{ width: '100%', display: readingView ? 'block' : 'none' }}
          >
            <ViewReading
              courseName={courseName}
              mbn={mbn}
              tbn={tbn}
              homework_id={homework_id}
            />
          </div>
          <div
            style={{ width: '100%', display: phonicsView ? 'block' : 'none' }}
          >
            <ViewPhonics
              courseName={courseName}
              mbn={mbn}
              tbn={tbn}
              homework_id={homework_id}
            />
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
            />
          </div>
          <div
            style={{
              width: '100%',
              display: conversationView ? 'block' : 'none',
            }}
          >
            <ViewSchoolEnglish
              courseName={courseName}
              mbn={mbn}
              tbn={tbn}
              homework_id={homework_id}
            />
          </div>
          <div
            style={{
              width: '100%',
              display: grammarView ? 'block' : 'none',
            }}
          >
            <ViewGrammar
              courseName={courseName}
              mbn={mbn}
              tbn={tbn}
              homework_id={homework_id}
            />
          </div>
        </div>
        <div
          className="col-lg-2 col-md-12"
          style={{ textAlign: 'right' }}
        ></div>
        <div className="col-lg-12 col-md-12">
          {/* <div
            className="p-0 pl-3 m-0"
            style0={{
              width: '100%',
              padding: 0,
              display: readingView ? 'block' : 'none',
            }}
          >
            <object
              data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage1plus&file=myenglib/materials/reading/ORT/Stage1plus/book/At_the_Park.pdf"
              // data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=reading_triumphs&file=Triumph_G1_BOOK1_Unit1_Story1.pdf&readingLevel=G1_1"
              style={{
                width: '100%',
                height: '820px',
                border: '1px solid white',
                borderRadius: '20px',
                backgroundColor: 'white',
                margin: 0,
                padding: 0,
              }}
            />
          </div> */}
          {/* <hr
            style={{ border: '1px solid white', paddingTop: 0, marginTop: 0 }}
          /> */}

          {newLesson === false && (
            <SplitPanelReading
              mbn={mbn}
              tbn={tbn}
              homework_id={homework_id}
              // youtubeID={youtubeID}
              name_eng={nameEng}
              // thisOsusumeLetterSumScript={osusumeLetterSumScript}
              // thisOsusumeLetterSumOutline={osusumeLetterSumOutline}
            />
          )}
        </div>
        <div
          className="row pt-1 mr-0 pr-0"
          style={{
            top: '0px',
            width: '100%',
            height: '50px',
            zIndex: 1,
            backgroundColor: '#ececec',
            border: '1px solid #dedede',
            textAlign: 'center',
          }}
        >
          <div className="col-lg-12 col-md-12">
            <span className="btn btn-primary">READING</span>
          </div>
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
      </SweetAlert>
    </>
  )
}
export default READINGA
