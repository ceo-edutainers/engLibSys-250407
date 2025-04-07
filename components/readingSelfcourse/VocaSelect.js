import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { QuizContext } from './Contexts'
import next from 'next'

import Router, { useRouter } from 'next/router'

import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import WordListReadingBook from '@/components/WordList/WordListReadingBookNoMeaning' //単語リスト

const VocaSelect = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')
  //import useWindowDimensionsを使う
  // const { height, width } = useWindowDimensions()
  // const thisWidth = width - 10 + 'px'

  // const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  // const [isGoNextPage, setIsGoNextPage] = useState(false)
  // const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味
  const [HWbookInfo, setHWbookInfo] = useState([]) //DBからHWのデータを持ってきて入れる

  // const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる
  // const [nextQInsert, setNextQInsert] = useState('')

  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
    englibLevel,
    setEnglibLevel,
    englibLevelColor,
    setEnglibLevelColor,
    thisSubject,
    setThisSubject,
    leastRecordCount_step2,
    setLeastRecordCount_step2,
    leastRecordCount_step3,
    setLeastRecordCount_step3,
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
    readingLevel,
    setReadingLevel,
    bookTitle,
    setBookTitle,
    storyStartPage,
    setStoryStartPage,
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
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
  } = useContext(QuizContext)

  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')

    //console.log('Step4/myMbn:', myMbn)
    setMyMbn(mbn)

    // alert(myMbn)
    var Url = DB_CONN_URL + '/get-hw-and-Reading-Triumphs-info/' + myMbn

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)

        setHWbookInfo(response.data)
        // setAudioDurtaionFromDB(response.data[0].audioDuration)

        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
        setError(true)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (isError) return <h1>Error, try again!!!! </h1>
  if (isLoading) return <h1>Loading Page..........................</h1>

  return (
    // <div>
    <>
      {/* <MonsterGet />
      <PointBar cStep={pageView} pageTitle="Input-Self-Reading" />
      <StepBarA cStep={pageView} /> */}
      <div className="QuizBig">
        <div className="container">
          {HWbookInfo.map((val, key) => {
            return (
              <>
                <div className="row align-items-center">
                  {/* <div
                    className="col-lg-8 col-md-6"
                    style={{ textAlign: 'center' }}
                  >
                    <StepTitle
                      pageTitle={pageTitle}
                      pageTitleSub={pageTitleSub}
                    />
                  </div> */}
                  {/* <div
                    className="col-lg-4 col-md-12 pt-1 pb-1 mt-0 "
                    style={{
                      backgroundColor: '#white',
                      height: '70px',
                      textAlign: 'center',
                    }}
                  >
                    <StepGoal goalText={goalText} />
                  </div> */}
                  {/* <div
                    className="col-lg-12 col-md-6"
                    style={{ textAlign: 'center' }}
                  > */}
                  {/*  <KizukiPoint
                      kizukiTitle={kizukiTitle}
                      kizukiDetail={kizukiDetail}
                    /> */}
                  {/* </div> */}
                  {/* </div> */}
                  {/* <div className="col-lg-12 col-md-12  ">
                      <img
                        src={bookCoverImgUrl}
                        width="150px"
                        className="mr-2"
                      />
                      <img src={bookImgUrl} width="150px" />
                    </div> */}

                  {/* {Responsive END2} */}
                  <div className="col-lg-12 col-md-12"></div>
                </div>
              </>
            )
          })}
          <div
            className="col-lg-12 mb-2 pt-3"
            style={{ textAlign: 'left', padding: 0, margin: 0 }}
          >
            <WordListReadingBook homework_id={HWID} mbn={myMbn} />
          </div>
          <hr />

          <div className="row">
            {/* <MediaQuery query="(min-width: 767px)"> */}
            <div className="col-lg-6 col-md-12">
              <div className="banner-content" style={{ paddingTop: '20px' }}>
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
                    今日の練習をやめる
                  </button>
                </a>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="banner-content" style={{ paddingTop: '20px' }}>
                <button
                  style={{
                    width: '200px',
                    fontWeight: 'bold',
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
              <div className="col-lg-4 col-md-12 mt-1">
                <div className="banner-content" style={{ paddingTop: '0px' }}>
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
                      今日の練習をやめる
                    </button>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-12">
                <div className="banner-content">
                  <button
                    style={{
                      width: '200px',
                      fontWeight: 'bold',
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
        </div>
      </div>
    </>
  )
}

export default VocaSelect
