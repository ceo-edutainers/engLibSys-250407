import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import ReactAudioPlayer from 'react-audio-player'
// const [homework_id, sethomework_id] = useState()
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import WordListReadingBookAForTutor from '@/components/readingSelfcourse/WordListReadingBookAForTutor' //単語リスト

const ViewReading = ({ courseName, mbn, tbn, homework_id }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [bookUrl, setBookUrl] = useState()

  const [viewQuestion, setViewQuestion] = useState(false)
  const [viewWord, setViewWord] = useState(true)

  const [tutorQuestion, setTutorQuestion] = useState([])

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

  const [levelOrder, setLevelOrder] = useState('')
  const [readingLevel, setReadingLevel] = useState('')
  const [bookNum, setBookNum] = useState('')
  const [storyNum, setStoryNum] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [bookStory, setBookStory] = useState('')
  const [storyTitle, setStoryTitle] = useState('')
  const [seriesName, setSeriesName] = useState('')
  const [storyStartPage, setStoryStartPage] = useState('')
  const [answerFile, setAnswerFile] = useState('')
  useEffect(() => {
    if (
      courseName.indexOf('CourseA') !== -1 ||
      courseName.indexOf('CourseAN') !== -1
    ) {
      readingTriumphsInfo()
    } else if (
      courseName.indexOf('CourseB') !== -1 ||
      courseName.indexOf('CourseBN') !== -1
    ) {
      blackcatInfo()
    } else if (
      courseName.indexOf('CourseZ') !== -1 ||
      courseName.indexOf('CourseZN') !== -1
    ) {
      ortInfo()
    }
  }, [])

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
        var Url = url + mbn
        const response = await axios.get(Url)

        if (response.data.length > 0) {
          // setHWID(response.data[0].homework_id)
          // setEnglibLevel(response.data[0].englibLevel)

          // setBookStory(response.data[0].story)
          // setSeriesName(response.data[0].seriesName)
          // setBookTitle(response.data[0].bookTitle)
          // setBookNum(response.data[0].bookNum)
          // setStoryNum(response.data[0].storyNum)
          // setStoryTitle(response.data[0].storyTitle)
          // // setLevelOrder(response.data.response[0].levelOrder)
          // setReadingLevel(response.data[0].readingLevel)
          // setStoryStartPage(response.data[0].storyStartPage)
          // setLessonOrder(response.data[0].lessonOrder)
          // getQrLinkOtherHW(response.data[0].homework_id)
          // getQrLinkBookQuestion(response.data[0].homework_id)

          //first Story View
          //'father'が含まれるかどうか確認。
          //www./onlesson/pdfviewer.php?sort=blackcat&file=Wicked_and_Humorous_Tales_Part1.pdf&readingLevel=B2_1&readingCourse=BCat_RTraining&bookNum=Book2
          var sN = response.data[0].storyNum
          var rL = response.data[0].readingLevel
          var bN = response.data[0].bookNum
          var pdf1 = response.data[0].pdf1

          if (sN.indexOf('_Story1') !== -1) {
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
          setAnswerFile
          setBookCoverImgUrl
          setBookImgUrl
          setBookAudioUrl
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
        alert(error)
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
        // setSeriesName(response.data[0].seriesName)
        // setBookTitle(response.data[0].bookTitle)
        // setBookNum(response.data[0].bookNum)
        // setStoryNum(response.data[0].storyNum)
        // setStoryTitle(response.data[0].storyTitle)
        // setLevelOrder(response.data[0].levelOrder)
        // setReadingLevel(response.data[0].readingLevel)
        // setLessonOrder(response.data[0].lessonOrder)
        // setStoryStartPage(response.data[0].storyStartPage)

        // const bci = response.data[0].imgURL
        // setBookCoverImgUrl(bci)

        var rL = response.data[0].readingLevel
        var bN = response.data[0].bookNum
        var pdf = response.data[0].pdf
        var fsl =
          'https://www.myenglib.com/onlesson/pdfviewer.php?sort=blackcat&file=myenglib/materials/reading/ORT/Stage1plus/book/' +
          +pdf
        '&readingLevel=' + rL + '&readingCourse=' + rC + '&bookNum=' + bN

        setBookUrl(fsl)

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
        // alert('courseName' + courseName)

        var url = DB_CONN_URL + '/get-tutor-question-Reading-Triumphs/'

        var Url = url + readingLevel + '&' + storyNum
        // alert(Url)
        const response = await axios.get(Url)

        setTutorQuestion(response.data)
        // alert('length' + response.data.length)
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
        <div className="row pt-4" style={{ backgroundColor: 'white' }}>
          <div className="col-lg-12 col-md-12">
            <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>
              [{readingLevel}]&nbsp;{storyTitle}
            </h1>
          </div>
          <div
            className="col-lg-10 col-md-12 p-0 pl-3 m-0"
            style0={{
              width: '100%',
              padding: 0,
            }}
          >
            {/* bookUrl{bookUrl} */}
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
              {/* {' '}
              mbn={mbn}
              <br />
              tbn={tbn}
              <br />
              homework_id={homework_id}
              <br />
              seriesName={seriesName}
              <br />
              readingLevel={readingLevel}
              <br />
              bookNum={bookNum}
              <br />
              storyNum={storyNum}
              <br /> */}
              {(courseName == 'CourseA' || courseName == 'CourseAN') && (
                <>
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
                </>
              )}
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
              {tutorQuestion?.map((val, key) => {
                var qnum = key + 1
                return (
                  <>
                    <p style={{ color: 'black' }}>
                      {qnum}.{val.question}
                    </p>
                  </>
                )
              })}
            </div>
          </div>
          <div
            className="col-lg-3 col-md-12 mt-2"
            style={{ textAlign: 'center' }}
          ></div>
          <div
            className="col-lg-6 col-md-12 mt-2"
            style={{ textAlign: 'center' }}
          >
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
          <div
            className="col-lg-3 col-md-12 mt-2"
            style={{ textAlign: 'center' }}
          ></div>
        </div>
      </center>
    </>
  )
}

export default ViewReading
