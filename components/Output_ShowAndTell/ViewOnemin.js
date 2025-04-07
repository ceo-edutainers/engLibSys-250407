import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import ReactAudioPlayer from 'react-audio-player'
import Link from '@/utils/ActiveLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHandPointer,
  faDesktop,
  faLaptop,
  faFileAudio,
  faPlay,
  faPause,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons'
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
  const DB_CONN_URL = process.env.DB_CONN_URL
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

  ////////////////////////////////////////////////////////////
  //one minute speaking
  const [oneMinSpeakingDailyLevel, setOneMinSpeakingDailyLevel] = useState('') //1min-input
  const [oneMinSpeakingDaily, setOneMinSpeakingDaily] = useState('')[0] //Day3
  const [oneMinSpeakingBusinessLevel, setOneMinSpeakingBusinessLevel] =
    useState('') //1min-input
  const [oneMinSpeakingBusiness, setOneMinSpeakingBusiness] = useState('') //Day10

  const [thisDailyHwNumber, setThisDailyHwNumber] = useState()
  const [thisBusinessHwNumber, setThisBusinessHwNumber] = useState()
  const [viewDaily, setViewDaily] = useState(false)
  const [viewBusiness, setViewBusiness] = useState(false)

  const [oneMinDaily, setOneMinDaily] = useState([])
  const [oneMinBusiness, setOneMinBusiness] = useState([])
  const [hwInfo, setHwInfo] = useState()
  const [hw1minSpeakingDailyLevel, setHw1minSpeakingDailyLevel] = useState() //1min-input
  const [hw1minSpeakingDaily, setHw1minSpeakingDaily] = useState() //Day3
  const [hw1minSpeakingBusinessLevel, setHw1minSpeakingBusinessLevel] =
    useState() //1min-input
  const [hw1minSpeakingBusiness, setHw1minSpeakingBusiness] = useState() //Day3

  useEffect(() => {
    var category = 'Daily'

    var url = DB_CONN_URL + '/get-sys-1min-list/'
    var Url = url + category

    const fetchData1 = async () => {
      try {
        axios.get(Url).then((response) => {
          if (response.data.status == false) {
            // alert(response.date.message)
          } else {
            setOneMinDaily(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData1()
  }, [])

  useEffect(() => {
    var category = 'Business'

    var url = DB_CONN_URL + '/get-sys-1min-list/'
    var Url = url + category

    const fetchData1 = async () => {
      try {
        axios.get(Url).then((response) => {
          if (response.data.status == false) {
            // alert(response.date.message)
          } else {
            setOneMinBusiness(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData1()
  }, [])

  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')

    var subject = '1MIN_SPEAKING'

    const fetchData = async () => {
      var url = DB_CONN_URL + '/get-sys-hw-1min/'
      var Url = url + mbn + '&' + subject
      // alert(Url)
      try {
        const response = await axios.get(Url)
        // alert(response.data.message)

        if (response.data.length > 0) {
          setHwInfo(response.data.response)
          // alert(response.data.response[0].oneMinSpeakingDailyLevel)
          setHw1minSpeakingDailyLevel(
            response.data.response[0].oneMinSpeakingDailyLevel
          )
          setHw1minSpeakingDaily(response.data.response[0].oneMinSpeakingDaily)
          setHw1minSpeakingBusinessLevel(
            response.data.response[0].oneMinSpeakingBusinessLevel
          )
          setHw1minSpeakingBusiness(
            response.data.response[0].oneMinSpeakingBusiness
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (hw1minSpeakingDaily) {
      const match = hw1minSpeakingDaily.match(/\d+/)
      const number = match ? match[0] : null
      setThisDailyHwNumber(number)
      // alert(number)
    }
  }, [hw1minSpeakingDaily])

  useEffect(() => {
    if (hw1minSpeakingBusiness) {
      const match = hw1minSpeakingBusiness.match(/\d+/)
      const number = match ? match[0] : null
      setThisBusinessHwNumber(number)
      // alert(number)
    }
  }, [hw1minSpeakingBusiness])

  const checkAudioFileExists = async (url) => {
    try {
      const response = await axios.head(url)
      return response.status === 200
    } catch (error) {
      return false
    }
  }

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
      <div className="row">
        <div
          className="col-lg-12 col-md-12 mt-3"
          style={{ textAlign: 'center' }}
        >
          <span
            className="btn btn-danger pt-1 "
            style={{
              fontWeight: '900',
              color: 'white',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
            onClick={() => {
              setViewDaily(!viewDaily)
              setViewBusiness(false)
            }}
          >
            Daily 1-min Speaking
          </span>
          <span
            className="btn btn-danger pt-1 ml-3"
            style={{
              fontWeight: '900',
              color: 'white',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
            onClick={() => {
              setViewBusiness(!viewBusiness)
              setViewDaily(false)
            }}
          >
            Business 1-min Speaking
          </span>
        </div>
        <div
          className="col-lg-12 col-md-12"
          style={{
            display: viewDaily ? 'block' : 'none',
            textAlign: 'center',
          }}
        >
          <center>
            <h6>
              <b>Daily 1-minute Speaking</b>
            </h6>

            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col" style={{ paddingLeft: '20px' }}>
                    英語のみ音声
                  </th>
                  <th scope="col" style={{ paddingLeft: '20px' }}>
                    日本語＆英語音声
                  </th>
                </tr>
              </thead>

              {hwInfo &&
                hw1minSpeakingDailyLevel &&
                oneMinDaily?.map((val, key) => {
                  if (val.level == '1min-input') {
                    var materialDir = '1min-speaking'
                    var whatMinDir = '1min'
                    var catDir = 'input'
                  }
                  if (val.level == '2min-input') {
                    var materialDir = '2min-speaking'
                    var whatMinDir = '2min'
                    var catDir = 'input'
                  }
                  if (val.level == '3min-input') {
                    var materialDir = '3min-speaking'
                    var whatMinDir = '3min'
                    var catDir = 'input'
                  }

                  if (
                    val.category == 'Daily' &&
                    val.level == hw1minSpeakingDailyLevel
                  ) {
                    var docFileLink =
                      // 'https://www.myenglib.com/myenglib/materials/' +
                      '/files/myenglib/materials/' +
                      materialDir +
                      '/' +
                      whatMinDir +
                      '/doc/' +
                      catDir +
                      '/' +
                      val.fileName

                    //forTutor
                    var docFileTutorLink =
                      '/files/myenglib/materials/' +
                      materialDir +
                      '/' +
                      whatMinDir +
                      '/doc/' +
                      catDir +
                      '/forTutor/' +
                      val.fileName
                    var engAudio =
                      // 'https://www.myenglib.com/myenglib/materials/' +
                      '/files/myenglib/materials/' +
                      materialDir +
                      '/' +
                      whatMinDir +
                      '/audio/' +
                      catDir +
                      '/' +
                      val.audioEngOnly

                    var engJpAudio =
                      // 'https://www.myenglib.com/myenglib/materials/' +
                      '/files/myenglib/materials/' +
                      materialDir +
                      '/' +
                      whatMinDir +
                      '/audio/' +
                      catDir +
                      '/Jpn-Eng/' +
                      val.audioJpyToEng

                    var targetWhere = '_blank'
                    var noCursor = ''
                    var fileColor = 'black'
                  }

                  if (thisDailyHwNumber == key + 1) {
                    var tdBgColor = '#F5B041'
                  }
                  var objPageLink =
                    '../../../oneMinuteDocument?fileName=' + docFileLink

                  return (
                    <>
                      <tbody>
                        <tr>
                          <td
                            colSpan={2}
                            style={{
                              backgroundColor: tdBgColor,
                              textAlign: 'center',
                            }}
                          >
                            {val.level} {val.orderTitle}
                            {/* <br />
                                {docFileLink} */}
                            <br />
                            {thisDailyHwNumber >= key + 1 ? (
                              // <a href={docFileLink} target={targetWhere}>
                              <a href={docFileTutorLink} target={targetWhere}>
                                <FontAwesomeIcon
                                  icon={faFilePdf}
                                  size="2x"
                                  color="black"
                                />
                              </a>
                            ) : (
                              <FontAwesomeIcon
                                icon={faFilePdf}
                                size="2x"
                                color="#dedede"
                              />
                            )}
                          </td>

                          <td style={{ backgroundColor: tdBgColor }}>
                            <AudioPlayer key={key} src={engAudio} />
                          </td>
                          <td style={{ backgroundColor: tdBgColor }}>
                            <AudioPlayer key={key} src={engJpAudio} />
                          </td>
                        </tr>
                      </tbody>
                    </>
                  )
                })}
            </table>
          </center>
        </div>

        <div
          className="col-lg-12 col-md-12 pt-2 pb-2"
          style={{
            display: viewBusiness ? 'block' : 'none',
            textAlign: 'center',
          }}
        >
          <center>
            <h6>
              <b>Business 1-minute Speaking</b>
            </h6>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col" style={{ paddingLeft: '20px' }}>
                    英語のみ音声
                  </th>
                  <th scope="col" style={{ paddingLeft: '20px' }}>
                    日本語＆英語音声
                  </th>
                </tr>
              </thead>

              {hwInfo &&
                hw1minSpeakingBusinessLevel &&
                oneMinBusiness?.map((val, key) => {
                  if (val.level == '1min-input') {
                    var materialDir = '1min-speaking-business'
                    var whatMinDir = '1min'
                    var catDir = 'input'
                  }
                  if (val.level == '2min-input') {
                    var materialDir = '2min-speaking-business'
                    var whatMinDir = '2min'
                    var catDir = 'input'
                  }
                  if (val.level == '3min-input') {
                    var materialDir = '3min-speaking-business'
                    var whatMinDir = '3min'
                    var catDir = 'input'
                  }

                  if (
                    val.category == 'Business' &&
                    val.level == hw1minSpeakingBusinessLevel
                  ) {
                    // var docFileLink =
                    //   'https://www.myenglib.com/myenglib/materials/' +
                    //   materialDir +
                    //   '/' +
                    //   whatMinDir +
                    //   '/doc/' +
                    //   catDir +
                    //   '/' +
                    //   val.fileName

                    var docFileLink =
                      // 'https://www.myenglib.com/myenglib/materials/' +
                      '/files/myenglib/materials/' +
                      materialDir +
                      '/' +
                      whatMinDir +
                      '/doc/' +
                      catDir +
                      '/' +
                      val.fileName

                    var docFileTutorLink =
                      '/files/myenglib/materials/' +
                      materialDir +
                      '/' +
                      whatMinDir +
                      '/doc/' +
                      catDir +
                      '/forTutor/' +
                      val.fileName

                    var engAudio =
                      // 'https://www.myenglib.com/myenglib/materials/' +
                      '/files/myenglib/materials/' +
                      materialDir +
                      '/' +
                      whatMinDir +
                      '/audio/' +
                      catDir +
                      '/' +
                      val.audioEngOnly

                    var engJpAudio =
                      // 'https://www.myenglib.com/myenglib/materials/' +
                      '/files/myenglib/materials/' +
                      materialDir +
                      '/' +
                      whatMinDir +
                      '/' +
                      '/audio/' +
                      catDir +
                      '/Jpn-Eng/' +
                      val.audioJpyToEng

                    //www.myenglib.com/myenglib/materials/1min-speaking-business/1min/input/audio/IN01_1.MP3

                    var targetWhere = '_blank'
                    var noCursor = ''
                    var fileColor = 'black'
                  }
                  if (thisBusinessHwNumber == key + 1) {
                    var tdBgColor = '#F5B041'
                  }

                  return (
                    <>
                      <tbody>
                        <tr>
                          <td
                            colSpan={2}
                            style={{
                              backgroundColor: tdBgColor,
                              textAlign: 'center',
                            }}
                          >
                            {val.level} {val.orderTitle}
                            <br />
                            {thisBusinessHwNumber >= key + 1 ? (
                              <a href={docFileTutorLink} target={targetWhere}>
                                <FontAwesomeIcon
                                  icon={faFilePdf}
                                  size="2x"
                                  color="black"
                                />
                              </a>
                            ) : (
                              <FontAwesomeIcon
                                icon={faFilePdf}
                                size="2x"
                                color="#dedede"
                              />
                            )}
                          </td>

                          {thisBusinessHwNumber >= key + 1 ? (
                            <>
                              <td style={{ backgroundColor: tdBgColor }}>
                                <AudioPlayer key={key} src={engAudio} />
                              </td>
                              <td style={{ backgroundColor: tdBgColor }}>
                                <AudioPlayer key={key} src={engJpAudio} />
                              </td>
                            </>
                          ) : (
                            <>
                              <td style={{ backgroundColor: tdBgColor }}>
                                <AudioPlayer key={key} src={engAudio} />
                              </td>
                              <td style={{ backgroundColor: tdBgColor }}>
                                <AudioPlayer key={key} src={engJpAudio} />
                              </td>
                            </>
                          )}
                        </tr>
                      </tbody>
                    </>
                  )
                })}
            </table>
          </center>
        </div>

        <div
          className={isSizeBig ? bookSize2 : bookSize}
          style0={{
            width: '100%',
            padding: 0,
          }}
        >
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
              className="col-lg-12 col-md-12"
              style={{ textAlign: 'center' }}
            >
              <span
                className="btn btn-warning"
                style={{ width: '100%' }}
                onClick={() => {
                  // setViewWord(false)
                  // setViewQuestion(false)
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
            style={{
              width: '100%',
              display: viewEditor ? 'block' : 'none',
            }}
          >
            <h1>test</h1>
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
        </div>
      </div>

      {/** ここから Original */}
      {/* <MediaQuery query="(min-width: 767px)"> */}
    </>
  )
}

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // formatTime 함수 추가
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * duration
    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }
  // 인라인 스타일 정의
  const styles = {
    audioPlayer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    playPauseButton: {
      width: '50px',
      background: 'none',
      border: 'none',
      fontSize: '24px', // 아이콘 크기 조정
      cursor: 'pointer',
      marginLeft: '10px', // 오른쪽에 위치하도록 간격 추가
    },
    timeDisplay: {
      // marginRight: '10px',
      paddingTop: 0,
      marginTop: 0,
      marginLeft: '10px',
      textAlign: 'left',
    },
    seekBarContainer: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      // backgroundColor: 'red',
      paddingBottom: 0,
      marginBottom: 0,
    },
    seekBar: {
      flexGrow: 1,
    },
  }

  return (
    <>
      <div style={styles.audioPlayer}>
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src={src} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <div style={styles.seekBarContainer}>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            style={styles.seekBar}
          />
          <button style={styles.playPauseButton} onClick={togglePlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <p>
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>
      </div>
      <div style={styles.timeDisplay}></div>
    </>
  )
}

export default ViewReading
