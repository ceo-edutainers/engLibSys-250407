//quizapp_big_deesign.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import { QuizContext } from './Contexts'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import { EcoSharp } from '@material-ui/icons'
const MonsterGet = () => {
  // const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  // const [isGoNextPage, setIsGoNextPage] = useState(false)
  // const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  // // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味
  // // const [currentStep, setCurrentStep] = useState('Step1') //
  // const [Questions, setQuestions] = useState([]) //DBから本ののデータを持ってきて入れる
  // const [HWbookInfo, setHWbookInfo] = useState([]) //DBからHWのデータを持ってきて入れる
  // const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  // const [nowClickedColor, setNowClickedColor] = useState('') //クリックした答えのボタンの色が変わる
  const [pointKeyNum, setPointKeyNum] = useState('RR-1') //DBのsys_point_set テーブルの pointKeyNum
  const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる
  const DB_CONN_URL = process.env.DB_CONN_URL
  // const [audioDurtaionFromDB, setAudioDurtaionFromDB] = useState(0)

  // const [recordingCountForNextStep, setRecordingCountForNextStep] = useState(0)
  // const [nextQInsert, setNextQInsert] = useState('')
  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx)
  }
  var imgarray = range(1, 234)
  const [imgArray, setImgArray] = useState(imgarray)

  //fireView
  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')

      const fetchData2 = async () => {
        try {
          var Url =
            DB_CONN_URL + '/get-hw-history-fireView/' + mbn + '&' + thisSubject
          const response = await axios.get(Url)

          setFireViewCount(response.data.response[0].fireView)
        } catch (error) {
          console.log(error)
        }
      }

      fetchData2()
    }
  }, [])

  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    thisSubject,
    lessonOrder,
    setLessonOrder,
    setThisSubject,
    leastRecordCount_ondoku,
    setLeastRecordCount_ondoku,
    leastRecordCount_shadowing,
    setLeastRecordCount_shadowing,
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
    shadowingLevel,
    setShadowingLevel,
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

  return (
    <>
      <div
        className="QuizBig mt-2 pb-0 mb-0"
        style={{ backgroundColor: 'white', border: 0 }}
      >
        {/* <MediaQuery query="(min-width: 767px)"> */}
        <div
          className="row align-items-center"
          aria-label="横にスクロールすると全てのモンスターが見えます! ポイントをゲットしてモンスターを増やそう！ゲットしたモンスターには色がつきます。"
          data-balloon-pos="down"
          data-balloon-length="large"
        >
          <div
            className="col-lg-12 col-md-12 p-0"
            style={{
              textAlign: 'left',
              justifyContent: 'left',
              alignItems: 'left',
              margin: '4px, 4px',
              padding: '4px',
              backgroundColor: 'white',
              width: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap',
              fontColor: 'black',
            }}
          >
            {/* <div className="single-features-box"> */}

            {imgArray.map((val, key) => {
              var fileNum = key + 1
              var fileName =
                'https://englib.s3.ap-northeast-1.amazonaws.com/monster/' +
                fileNum +
                '.png'

              return (
                <>
                  {key == 0 || key == 1 || key == 2 ? (
                    <img
                      src={fileName}
                      width="40px"
                      height="40px"
                      style={{
                        filter: 'grayscale(0)',
                        opacity: '100%',
                      }}
                      className="img-bigger"
                    />
                  ) : (
                    <img
                      src={fileName}
                      width="40px"
                      height="40px"
                      style={{
                        filter: 'grayscale(1)',
                        opacity: '50%',
                      }}
                      className="img-bigger"
                    />
                  )}
                  &nbsp;&nbsp;
                </>
              )
            })}
          </div>

          {/* <div
              className="col-lg-2 col-md-12 p-0"
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
             
              <div className="single-features-box m-0 p-0 bg-white">
                <FireView thisSubject={thisSubject} />
              </div>
            </div> */}
        </div>
        {/* </MediaQuery> */}

        {/* <MediaQuery query="(max-width: 767px)">
          <div
            className="row"
            aria-label="横にスクロールすると全てのモンスターが見えます! ポイントをゲットしてモンスターを増やそう！ゲットしたモンスターには色がつきます。"
            data-balloon-pos="down"
            data-balloon-length="large"
          >
            <center>
              <div
                className="col-lg-12 col-md-12 p-0"
                style={{
                
                  margin: '4px, 4px',
                  padding: '4px',
                  backgroundColor: 'white',
                  width: '40%',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  whiteSpace: 'nowrap',
                  fontColor: 'black',
                }}
              >
             

                {imgArray.map((val, key) => {
                  var fileNum = key + 1
                  var fileName =
                    'https://englib.s3.ap-northeast-1.amazonaws.com/monster/' +
                    fileNum +
                    '.png'

                  return (
                    <>
                      {key == 0 || key == 1 || key == 2 ? (
                        <img
                          src={fileName}
                          width="40px"
                          height="40px"
                          style={{
                            filter: 'grayscale(0)',
                            opacity: '100%',
                          }}
                          className="img-bigger"
                        />
                      ) : (
                        <img
                          src={fileName}
                          width="40px"
                          height="40px"
                          style={{
                            filter: 'grayscale(1)',
                            opacity: '50%',
                          }}
                          className="img-bigger"
                        />
                      )}
                      &nbsp;&nbsp;
                    </>
                  )
                })}
              </div>

           
            </center>
          </div>
        </MediaQuery> */}

        <div className="container"></div>
      </div>
    </>
  )
}

export default MonsterGet
