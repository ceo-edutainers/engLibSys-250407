import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import ReactAudioPlayer from 'react-audio-player'
// const [homework_id, sethomework_id] = useState()
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import WordListReadingBookAForTutor from '@/components/readingSelfcourse/WordListReadingBookAForTutor' //単語リスト
import RndBlackcatAnswer from '@/components/Output_ShowAndTell/RndBlackcatAnswer'

const ViewReading = ({ courseName, mbn, tbn, homework_id }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [bookUrl, setBookUrl] = useState()

  const [viewQuestion, setViewQuestion] = useState(false)
  const [viewWord, setViewWord] = useState(true)

  const [tutorQuestion, setTutorQuestion] = useState([])
  const [tutorQuestionLength, setTutorQuestionLength] = useState([])

  const [bookCoverImgUrl, setBookCoverImgUrl] = useState('')
  const [bookImgUrl, setBookImgUrl] = useState('')
  const [bookIntroAudioUrl, setBookIntroAudioUrl] = useState('') //for Blackcat Seriese  //Introduction
  const [bookIntro2AudioUrl, setBookIntro2AudioUrl] = useState('') //for Blackcat Seriese //Introduction2
  const [bookAuthorAudioUrl, setBookAuthorAudioUrl] = useState('') //for Blackcat Seriese //Author
  const [bookAudioUrl, setBookAudioUrl] = useState('') //for All Reading Materials : Main Story Audio

  const [bookAudio2Url, setBookAudio2Url] = useState('') //for Blackcat Seriese
  const [bookAudio2TitleUrl, setBookAudio2TitleUrl] = useState('') //for Blackcat Seriese
  const [bookAudio3TitleUrl, setBookAudio3TitleUrl] = useState('') //for Blackcat Seriese
  const [bookAudio3Url, setBookAudio3Url] = useState('') //for Blackcat Seriese
  const [bookAudio4TitleUrl, setBookAudio4TitleUrl] = useState('') //for Blackcat Seriese
  const [bookAudio4Url, setBookAudio4Url] = useState('') //for Blackcat Seriese
  const [bookAudio5TitleUrl, setBookAudio5TitleUrl] = useState('') //for Blackcat Seriese
  const [bookAudio5Url, setBookAudio5Url] = useState('') //for Blackcat Seriese
  const [bookAudio6TitleUrl, setBookAudio6TitleUrl] = useState('') //for Blackcat Seriese
  const [bookAudio6Url, setBookAudio6Url] = useState('') //for Blackcat Seriese
  const [bookAudio7TitleUrl, setBookAudio7TitleUrl] = useState('') //for Blackcat Seriese
  const [bookAudio7Url, setBookAudio7Url] = useState('') //for Blackcat Seriese

  //Rnd
  const [viewRndAnswer, setViewRndAnswer] = useState(false)

  const [levelOrder, setLevelOrder] = useState('')
  const [readingLevel, setReadingLevel] = useState('')
  const [bookNum, setBookNum] = useState('')
  const [storyNum, setStoryNum] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [bookStory, setBookStory] = useState('')
  const [storyTitle, setStoryTitle] = useState('')
  const [seriesName, setSeriesName] = useState('')
  const [storyStartPage, setStoryStartPage] = useState('')

  const [storyEndPage, setStoryEndPage] = useState('')
  const [readingHWAmount, setReadingHWAmount] = useState('')
  const [oneMore, setOneMore] = useState('')
  const [whySameReadingReason, setWhySameReadingReason] = useState('')
  const [whySameReadingReasonDetail, setWhySameReadingReasonDetail] =
    useState('')
  const [answerFile, setAnswerFile] = useState('')
  // useEffect(() => {
  //   if (courseName.indexOf('CourseA') !== -1) {
  //     readingTriumphsInfo()
  //   } else if (courseName.indexOf('CourseB') !== -1) {
  //     // alert('B')
  //     blackcatInfo()
  //   } else if (courseName.indexOf('CourseZ') !== -1) {
  //     // alert('Z')
  //     ortInfo()
  //   }
  // }, [])
  // useEffect(() => {
  // alert(courseName)
  useEffect(() => {
    if (courseName == 'CourseA') {
      readingTriumphsInfo()
    } else if (courseName == 'CourseB') {
      // alert('B')
      blackcatInfo()
    } else if (courseName == 'CourseZ') {
      // alert('Z')
      ortInfo()
    }
  }, [mbn])
  function readingTriumphsInfo() {
    const fetchData2 = async () => {
      try {
        // alert('courseName' + courseName)

        var url = DB_CONN_URL + '/get-hw-and-Reading-Triumphs-info/'

        var Url = url + mbn
        // alert(Url)
        const response = await axios.get(Url)

        // alert('length' + response.data.length)
        // alert(response.data.message)

        setBookStory(response.data[0].story)
        setSeriesName(response.data[0].seriesName)
        // setBookTitle(response.data[0].bookTitle)
        setBookNum(response.data[0].bookNum)
        setStoryNum(response.data[0].storyNum)
        setStoryTitle(response.data[0].storyTitle)
        setReadingLevel(response.data[0].readingLevel)
        // setLessonOrder(response.data[0].lessonOrder)
        // setStoryStartPage(response.data[0].storyStartPage)
        getTutorQuestionReadingTriumphs(
          response.data[0].readingLevel,
          response.data[0].storyNum
        )

        setStoryStartPage(response.data[0].hw_page_start)
        setStoryEndPage(response.data[0].hw_page_end)
        setReadingHWAmount(response.data[0].readingHWAmount)
        setOneMore(response.data[0].oneMore)

        setWhySameReadingReason(response.data[0].whySameReadingReason)
        setWhySameReadingReasonDetail(
          response.data[0].whySameReadingReasonDetail
        )

        var sN = response.data[0].storyNum
        var rL = response.data[0].readingLevel
        var bN = response.data[0].bookNum
        var pdf1 = response.data[0].pdf1

        var fsl =
          'https://www.myenglib.com/onlesson/pdfviewer.php?sort=reading_triumphs&file=' +
          pdf1 +
          '&readingLevel=' +
          rL

        setBookUrl(fsl)

        const bci =
          'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Reading+Triumphs/' +
          response.data[0].readingLevel +
          '/img/' +
          response.data[0].readingLevel +
          '-Cover.png'
        setBookCoverImgUrl(bci)

        const bim =
          'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Reading+Triumphs/' +
          response.data[0].readingLevel +
          '/img/' +
          response.data[0].storyNum +
          '.png'
        setBookImgUrl(bim)

        const baudio =
          'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Reading+Triumphs/' +
          response.data[0].readingLevel +
          '/audio/' +
          response.data[0].audio1

        setBookAudioUrl(baudio)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }

  function blackcatInfo() {
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-and-Blackcat-Series-info/'
        // alert('blackcat')
        var Url = url + mbn

        const response = await axios.get(Url)

        if (response.data.length > 0) {
          // setHWID(response.data[0].homework_id)
          // setEnglibLevel(response.data[0].englibLevel)
          setBookStory(response.data[0].story)
          setSeriesName(response.data[0].seriesName)
          // setBookTitle(response.data[0].bookTitle)
          setBookNum(response.data[0].bookNum)
          setStoryNum(response.data[0].storyNum)
          setStoryTitle(response.data[0].storyTitle)
          setReadingLevel(response.data[0].readingLevel)

          setBookTitle(response.data[0].bookTitle)

          setReadingLevel(response.data[0].readingLevel)
          setStoryStartPage(response.data[0].hw_page_start)
          setStoryEndPage(response.data[0].hw_page_end)
          setReadingHWAmount(response.data[0].readingHWAmount)
          setOneMore(response.data[0].oneMore)

          setWhySameReadingReason(response.data[0].whySameReadingReason)
          setWhySameReadingReasonDetail(
            response.data[0].whySameReadingReasonDetail
          )

          var sN = response.data[0].storyNum
          var rL = response.data[0].readingLevel
          var bN = response.data[0].bookNum
          var pdf1 = response.data[0].pdf1
          // if (sN.indexOf('_Story1') !== -1) {
          if (sN.indexOf('_Story') !== -1) {
            if (
              rL == 'A2' ||
              rL == 'B1_1' ||
              rL == 'B1_2' ||
              rL == 'B1_1' ||
              rL == 'B2_1' ||
              rL == 'B2_2' ||
              rL == 'C1'
            ) {
              var rC = 'BCat_RTraining'
            } else {
              var rC = 'BCat_GreenApple'
            }
            var fsl =
              'https://www.myenglib.com/onlesson/pdfviewer.php?sort=blackcat&file=' +
              pdf1 +
              '&readingLevel=' +
              rL +
              '&readingCourse=' +
              rC +
              '&bookNum=' +
              bN

            setBookUrl(fsl)
          }

          // setAnswerFile
          // setBookCoverImgUrl
          // setBookImgUrl
          // setBookAudioUrl
          var af =
            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/' +
            response.data[0].readingLevel +
            '/' +
            response.data[0].bookNum +
            '/answer/answer.pdf'
          setAnswerFile(af)

          const bci =
            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/img/' +
            response.data[0].readingLevel +
            '/' +
            response.data[0].bookNum +
            '_Cover.png'
          setBookCoverImgUrl(bci)

          //https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/img/B2_2/Book1_Story1.png
          const bim =
            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/img/' +
            response.data[0].readingLevel +
            '/' +
            response.data[0].storyNum +
            '.png'
          setBookImgUrl(bim)

          //https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/A1_Starter/Book1/audio/10_Whales.mp3

          //Main Story audio
          const baudio =
            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/' +
            response.data[0].readingLevel +
            '/' +
            response.data[0].bookNum +
            '/audio/' +
            response.data[0].audio1

          setBookAudioUrl(baudio)

          if (response.data[0].audio_intro != '') {
            const baudio_intro =
              'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio_intro
            setBookIntroAudioUrl(baudio_intro)
          }

          if (response.data[0].audio_intro2 != '') {
            const baudio_intro2 =
              'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio_intro2
            setBookIntro2AudioUrl(baudio_intro2)
          }

          if (response.data[0].audio_author != '') {
            const baudio_author =
              'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio_author
            setBookAuthorAudioUrl(baudio_author)
          }

          if (response.data[0].audio2 != '') {
            const baudio2 =
              'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio2
            setBookAudio2Url(baudio2)
            setBookAudio2TitleUrl(response.data[0].title_audio2)
          }

          if (response.data[0].audio3 != '') {
            const baudio3 =
              'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio3
            setBookAudio3Url(baudio3)
            setBookAudio3TitleUrl(response.data[0].title_audio3)
          }

          if (response.data[0].audio4 != '') {
            const baudio4 =
              'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio4
            setBookAudio4Url(baudio4)
            setBookAudio4TitleUrl(response.data[0].title_audio4)
          }

          if (response.data[0].audio5 != '') {
            const baudio5 =
              'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio5
            setBookAudio5Url(baudio5)
            setBookAudio5TitleUrl(response.data[0].title_audio5)
          }
          if (response.data[0].audio6 != '') {
            const baudio6 =
              'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio6
            setBookAudio6Url(baudio6)
            setBookAudio6TitleUrl(response.data[0].title_audio6)
          }
          if (response.data[0].audio7 != '') {
            const baudio7 =
              'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio7
            setBookAudio7Url(baudio7)
            setBookAudio7TitleUrl(response.data[0].title_audio7)
          }
        }
      } catch (error) {
        alert('viewreading-error1:' + error)
        console.log(error)
      }
    }

    fetchData2()
  }

  function ortInfo() {
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-and-ORT-info/'
        var Url = url + mbn

        const response = await axios.get(Url)

        //setHWbookInfo(response.data)
        // setHWID(response.data[0].homework_id)
        // setEnglibLevel(response.data[0].englibLevel)

        // setBookStory(response.data[0].story)
        setSeriesName(response.data[0].seriesName)
        // setBookTitle(response.data[0].bookTitle)
        setBookNum(response.data[0].bookNum)
        // alert(response.data[0].bookNum)
        setStoryNum(response.data[0].storyNum)
        setStoryTitle(response.data[0].storyTitle)
        setReadingLevel(response.data[0].readingLevel)
        setBookTitle(response.data[0].bookTitle)

        setReadingLevel(response.data[0].readingLevel)
        setStoryStartPage(response.data[0].hw_page_start)
        setStoryEndPage(response.data[0].hw_page_end)
        setReadingHWAmount(response.data[0].readingHWAmount)
        setOneMore(response.data[0].oneMore)

        setWhySameReadingReason(response.data[0].whySameReadingReason)
        setWhySameReadingReasonDetail(
          response.data[0].whySameReadingReasonDetail
        )
        // alert(response.data[0].readingLevel)
        // setLessonOrder(response.data[0].lessonOrder)
        // setStoryStartPage(response.data[0].storyStartPage)

        // const bci = response.data[0].imgURL
        // setBookCoverImgUrl(bci)

        var rL = response.data[0].readingLevel
        var bN = response.data[0].bookNum
        var pdf = response.data[0].pdf

        //www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage1plus&file=myenglib/materials/reading/ORT/Stage1plus/book/At_the_Park.pdf
        //www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage1plus&file=myenglib/materials/reading/ORT/Stage1plus/book/At_the_Park.pdf
        var fsl =
          'https://www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=' +
          rL +
          '&file=myenglib/materials/reading/ORT/' +
          rL +
          '/book/' +
          pdf

        setBookUrl(fsl)
        // alert(fsl)
        const baudio =
          'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/ORT/' +
          response.data[0].readingLevel +
          '/audio/' +
          response.data[0].audio1

        setBookAudioUrl(baudio)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }

  function getTutorQuestionReadingTriumphs(readingLevel, storyNum) {
    const fetchData2 = async () => {
      try {
        // alert('readingLevel' + readingLevel)
        // alert('storyNum' + storyNum)

        var url = DB_CONN_URL + '/get-tutor-question-Reading-Triumphs/'

        var Url = url + readingLevel + '&' + storyNum
        // alert(Url)
        const response = await axios.get(Url)
        setTutorQuestionLength(response.data.length)
        if (response.data.length > 0) {
          setTutorQuestion(response.data)
        }

        // alert(response.data.message)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <center>
        <div
          className="col-lg-12 col-md-12 p-3"
          style={{
            width: '100%',
            display: viewRndAnswer ? 'block' : 'none',
          }}
        >
          {readingLevel && bookNum && (
            <RndBlackcatAnswer readingLevel={readingLevel} bookNum={bookNum} />
          )}
        </div>

        <div className="row pt-4" style={{ backgroundColor: 'white' }}>
          <div className="col-lg-12 col-md-12">
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
              [{readingLevel}]{storyNum && <span>&nbsp;[{storyNum}]</span>}
              &nbsp;
              {storyTitle}
            </span>
            <p>
              {oneMore == 'ok' && <b>same homework as last time [reason:</b>}
              {whySameReadingReason &&
                whySameReadingReason != 'others' &&
                whySameReadingReason + '] <br />'}
              {whySameReadingReason == 'others' &&
                whySameReadingReasonDetail &&
                whySameReadingReasonDetail + '] <br />'}
              {/* <b>今回の課題の量&nbsp;</b> */}
              <b>[HOW MUCH TO READ FOR TODAY’S LESSON]&nbsp;</b>

              <span
                style={{
                  fontSize: '20px',
                  color: 'red',
                  fontWeight: 'bold',
                  // textDecorationLine: 'underline',
                  // textDecorationThickness: '3px',
                  // textDecorationColor: 'red',
                }}
              >
                {readingHWAmount != ''
                  ? readingHWAmount
                  : '課題の量が設定されてないです。管理者へお問合せください。'}
              </span>

              {/* &nbsp;
              {readingHWAmount == 'first half' &&
                '[First page 〜' + storyEndPage + 'pages]'}
              {readingHWAmount == 'second half' &&
                '[' + storyStartPage + 'Pages 〜 ' + 'Last Pages]'} */}
            </p>
            {courseName == 'CourseB' && (
              <span
                className="btn btn-outline-danger ml-2"
                onClick={() => {
                  setViewRndAnswer(!viewRndAnswer)
                }}
              >
                ANSWER
              </span>
            )}
          </div>
          <div
            className="col-lg-10 col-md-12 p-0 pl-3 m-0"
            style0={{
              width: '100%',
              padding: 0,
            }}
          >
            {/* <h1>bookUrl{bookUrl}</h1> */}
            <object
              // data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage1plus&file=myenglib/materials/reading/ORT/Stage1plus/book/At_the_Park.pdf"
              data={bookUrl}
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

            <div
              className="col-lg-12 col-md-12 mt-2 mb-3"
              style={{ textAlign: 'center' }}
            >
              {/* {bookAudioUrl} */}
              <ReactAudioPlayer
                src={bookAudioUrl}
                // autoPlay
                controls
                onPlay={() => {
                  // alert('playing')
                  // setIsAudioPlaying(true)
                }}
                onPause={() => {
                  // alert('paused')
                  // setIsAudioPlaying(false)
                }}
                style={{
                  backgroundColor: '#b0c4de',
                  padding: '15px',
                  width: '80%',
                  borderRadius: '10px',
                }}
              />
            </div>
          </div>

          <div
            className="col-lg-2 col-md-12 mt-2"
            style={{ textAlign: 'center' }}
          >
            <div className="row">
              <div
                className="col-lg-6 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <span
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setViewQuestion(true)
                    setViewWord(false)
                  }}
                >
                  Question
                </span>
              </div>
              <div
                className="col-lg-6 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <span
                  className="btn btn-info"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setViewWord(true)
                    setViewQuestion(false)
                  }}
                >
                  Words
                </span>
              </div>
            </div>

            <div
              style={{ width: '100%', display: viewWord ? 'block' : 'none' }}
            >
              {/* homework_id: {homework_id} */}
              <>
                {readingLevel && (
                  <WordListReadingBookAForTutor
                    mbn={mbn}
                    tbn={tbn}
                    homework_id={homework_id}
                    bookStory={bookStory}
                    seriesName={seriesName}
                    readingLevel={readingLevel}
                    bookNum={bookNum}
                    storyNum={storyNum}
                  />
                )}
              </>
            </div>
            <div
              style={{
                width: '100%',
                height: '750px',
                textAlign: 'left',
                overflow: 'scroll',
                display: viewQuestion ? 'block' : 'none',
              }}
            >
              {tutorQuestionLength > 0 && tutorQuestion ? (
                tutorQuestion.map((val, key) => {
                  var qnum = key + 1
                  return (
                    <>
                      <p style={{ color: 'black' }}>
                        {qnum}.{val.question}
                      </p>
                    </>
                  )
                })
              ) : (
                <>
                  <p>質問準備中...</p>
                </>
              )}
            </div>
          </div>
        </div>
      </center>
    </>
  )
}

export default ViewReading
