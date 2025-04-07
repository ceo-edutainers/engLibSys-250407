import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import ReactAudioPlayer from 'react-audio-player'
// const [homework_id, sethomework_id] = useState()
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import WordListReadingBookAForTutor from '@/components/readingSelfcourse/WordListReadingBookAForTutor' //単語リスト
import RndBlackcatAnswer from '@/components/Output_ShowAndTell/RndBlackcatAnswer'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})
import 'react-quill/dist/quill.snow.css'

const ViewReading = ({
  course,
  courseName,
  seriesName1,
  bookNum1,
  storyNum1,
  mbn,
  tbn,
  teacher_name,
  homework_id,
  readingLevel1,
}) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [bookUrl, setBookUrl] = useState()

  //book window size change
  const [isSizeBig, setIsSizeBig] = useState(false)
  const [bookSize, setBookSize] = useState('col-lg-8 col-md-12 p-0 pl-3 m-0')
  const [rightSideSize, setRightSideSize] = useState(
    'col-lg-4 col-md-12 p-0 pl-3 m-0'
  )

  const [bookSize2, setBookSize2] = useState('col-lg-10 col-md-12 p-0 pl-3 m-0')
  const [rightSideSize2, setRightSideSize2] = useState(
    'col-lg-2 col-md-12 p-0 pl-3 m-0'
  )

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  const [dbValue, setDbValue] = useState('')

  const [viewQuestion, setViewQuestion] = useState(false)
  const [viewWord, setViewWord] = useState(true)
  const [viewEditor, setViewEditor] = useState(false)

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

  //one minute speaking
  const [oneMinSpeakingDailyLevel, setOneMinSpeakingDailyLevel] = useState('') //1min-input
  const [oneMinSpeakingDaily, setOneMinSpeakingDaily] = useState('')[0] //Day3
  const [oneMinSpeakingBusinessLevel, setOneMinSpeakingBusinessLevel] =
    useState('') //1min-input
  const [oneMinSpeakingBusiness, setOneMinSpeakingBusiness] = useState('') //Day10

  useEffect(() => {
    if (courseName == 'Course1MIN') {
      oneMinInfo()
    }
  }, [mbn])

  function oneMinInfo() {
    const fetchData2 = async () => {
      try {
        // alert('courseName' + courseName)

        //   -- subject:1MIN_SPEAKING
        // -- course:INPUT COURSE - X
        // -- courseName=Course1MIN
        // -- oneMinSpeakingDailyLevel:1min-input - level
        // -- oneMinSpeakingDaily:Day3 - orderTitle
        // -- ======category: Daily(from list db)
        // -- oneMinSpeakingBusinessLevel:1min-input
        // -- oneMinSpeakingBusiness:Day10

        var url = DB_CONN_URL + '/get-hw-and-Onemin-Speaking-info/'

        var Url = url + mbn
        // alert(Url)

        setOneMinSpeakingDailyLevel() //1min-input
        setOneMinSpeakingDaily() //Day3
        setOneMinSpeakingBusinessLevel() //1min-input
        setOneMinSpeakingBusiness() //Day10

        setBookStory(response.data[0].story)
        setSeriesName(response.data[0].seriesName)
        setBookTitle(response.data[0].bookTitle)
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
          // selectMemo(
          //   response.data[0].seriesName,
          //   response.data[0].bookNum,
          //   response.data[0].storyNum
          // )
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

        var rL = response.data[0].readingLevel
        var bN = response.data[0].bookNum
        var pdf = response.data[0].pdf

        //www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage1plus&file=myenglib/materials/reading/ORT/Stage1plus/book/At_the_Park.pdf
        //www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage1plus&file=myenglib/materials/reading/ORT/Stage1plus/book/At_the_Park.pdf

        //  var fsl =
        //    'https://www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=' +
        //    rL +
        //    '&file=myenglib/materials/reading/ORT/' +
        //    rL +
        //    '/book/' +
        //    pdf
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
        // selectMemo(
        //   response.data[0].seriesName,
        //   response.data[0].bookNum,
        //   response.data[0].storyNum
        // )
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }

  // useEffect(() => {
  //   selectMemo()
  // }, [])

  function selectMemo() {
    const fetchData = async () => {
      // alert('tbn' + tbn)
      // alert('seriesName:' + seriesName1)
      // alert('course' + course)
      // alert('courseName' + courseName)
      // alert('bookNum:' + bookNum1)
      // alert('storyNum:' + storyNum1)
      // alert('readingLevel:' + readingLevel1)

      var url = DB_CONN_URL + '/select-lesson-memo-tutor-reading'
      try {
        axios
          .post(url, {
            tbn: tbn,
            seriesName: seriesName1,
            course: course,
            courseName: courseName,
            bookNum: bookNum1,
            storyNum: storyNum1,
            readingLevel: readingLevel1,
          })
          .then((response) => {
            // alert('length:' + response.data.length)
            // alert(response.data.message)
            //  alert(response.data.length)
            if (response.data.length > 0) {
              // alert(response.data.length)
              // alert(response.data.response[0].lessonMemo)
              setDbValue(response.data.response[0].lessonMemo)
            }
          })
      } catch (error) {
        alert('error1')
        console.log(error)
      }
    }
    fetchData()
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

  function saveEditor(vlu, noalert) {
    const fetchData = async () => {
      // alert('course' + course)
      // alert('teacher_name' + teacher_name)
      // alert('courseName' + courseName)
      // alert('seriesName' + seriesName)
      // alert('readingLevel' + readingLevel)
      // alert('bookTitle' + bookTitle)
      // alert('bookNum:' + bookNum)
      // alert('storyNum:' + storyNum)
      // alert('storyTitle:' + storyTitle)
      try {
        // var url = DB_CONN_URL + '/save-shadowing-script-editor'
        var url = DB_CONN_URL + '/save-lesson-edit-for-tutor-materials-reading'

        axios
          .post(url, {
            tbn: tbn,
            teacher_name: teacher_name,
            subject: 'READING',
            course: course,
            courseName: courseName,
            seriesName: seriesName,
            readingLevel: readingLevel,
            bookTitle: bookTitle,
            bookNum: bookNum,
            storyNum: storyNum,
            storyTitle: storyTitle,
            memo: vlu,
          })
          .then((response) => {
            // alert(response.data.message)

            if (noalert == '' || noalert == null) {
              alert('Saved!')
            }
            selectMemo()
          })
      } catch (error) {
        alert('error- save')
        console.log(error)
      }
    }
    fetchData()
  }

  function sentMemoToStudent(vlu) {
    //次のStepSH1のsys_hw_historyテーブルのstepStatusがendになっている場合は、StepSH2にいく。
    //왜냐하면, StepSH1은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/send-lesson-edit-for-student'

        axios
          .post(url, {
            homework_id: homework_id,
            memo: vlu,
          })
          .then((response) => {
            // alert(response.data.message)
            alert("Tutor's memo has been sent to the student successfully!")
          })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
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
              {seriesName == 'Blackcat Series' && (
                <>
                  <span style={{ color: 'blue' }}>{bookTitle}</span>
                  <br />
                </>
              )}
              [{readingLevel}]{storyNum && <span>&nbsp;[{storyNum}]</span>}
              &nbsp;
              {storyTitle}
            </span>
            <span
              className="btn btn-danger ml-2 pt-0 pb-0"
              onClick={() => setIsSizeBig(!isSizeBig)}
            >
              {isSizeBig ? 'small' : 'big'}
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
            className={isSizeBig ? bookSize2 : bookSize}
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
            className={isSizeBig ? rightSideSize2 : rightSideSize}
            style={{ textAlign: 'center' }}
          >
            <div className="row">
              <div
                className="col-lg-4 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <span
                  className="btn btn-info"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setViewWord(true)
                    setViewQuestion(false)
                    setViewEditor(false)
                  }}
                >
                  {isSizeBig ? 'W' : 'Words'}
                </span>
              </div>
              <div
                className="col-lg-4 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <span
                  className="btn btn-secondary "
                  style={{ width: '100%' }}
                  onClick={() => {
                    setViewQuestion(true)
                    setViewWord(false)
                    setViewEditor(false)
                  }}
                >
                  {isSizeBig ? 'Q' : 'Questions'}
                </span>
              </div>
              <div
                className="col-lg-4 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <span
                  className="btn btn-warning"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setViewWord(false)
                    setViewQuestion(false)
                    setViewEditor(true)
                    {
                      dbValue == '' ? selectMemo() : console.log('1')
                    }
                    // saveEditor(dbValue, 'no-alert')
                  }}
                >
                  {isSizeBig ? 'E' : 'Editor'}
                </span>
              </div>
            </div>

            <div
              className="pt-2"
              style={{ width: '100%', display: viewEditor ? 'block' : 'none' }}
            >
              {/* homework_id: {homework_id} */}
              <>
                <div
                  className="col-lg-12 col-md-12 mb-2 pl-0 ml-0"
                  style={{ textAlign: 'center' }}
                >
                  <hr />
                  <span
                    className="btn btn-danger mt-2"
                    onClick={() => {
                      // saveEditor(value)
                      saveEditor(dbValue)
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    Save as your material
                  </span>
                  <span
                    className="btn btn-primary mt-2 ml-2"
                    onClick={() => {
                      // saveEditor(value)
                      sentMemoToStudent(dbValue)
                    }}
                  >
                    Send to student
                  </span>
                </div>
                {/* dbvalue {dbValue} */}
                {/* <br />
                {seriesName}/{bookNum}/{storyNum} */}
                {seriesName != '' && bookNum != '' && storyNum != '' && (
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    onChange={setDbValue}
                    value={dbValue && dbValue}
                    style={{ backgroundColor: '#FEF9E7' }}
                  />
                )}
              </>
            </div>
            <div
              style={{ width: '100%', display: viewWord ? 'block' : 'none' }}
            >
              {/* homework_id: {homework_id} */}
              <>
                {readingLevel && homework_id && (
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
                paddingTop: '20px',
              }}
            >
              {tutorQuestionLength > 0 && tutorQuestion ? (
                tutorQuestion.map((val, key) => {
                  var qnum = key + 1
                  return (
                    <>
                      <p style={{ color: 'black' }}>
                        <font color="gray">[{val.page}p]&nbsp;</font>

                        <font color="red"> [Q]&nbsp;{val.question}</font>
                      </p>
                      <p>
                        <font
                          style={{
                            color: 'blue',
                            // textDecoration: 'underline'
                          }}
                        >
                          [A]&nbsp;
                          {val.sample_answer}
                        </font>
                      </p>
                      <p>
                        [The answer's part of p.{val.page}] <br />
                        {val.script_place}
                      </p>
                      <hr
                        style={{
                          borderColor: '#273746',
                          borderWidth: '3px',
                        }}
                      />
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
