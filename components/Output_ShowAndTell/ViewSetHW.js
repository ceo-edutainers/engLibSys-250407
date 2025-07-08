import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import TextareaAutosize from 'react-textarea-autosize'
import SweetAlert from 'react-bootstrap-sweetalert'
import { VALID_LOADERS } from 'next/dist/server/image-config'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import { FaEye } from 'react-icons/fa'
import { alertTitleClasses } from '@mui/material'
import BookZaikoInfo from '@/components/Output_ShowAndTell/BookZaikoInfo'

// const [homework_id, sethomework_id] = useState()

const ViewSetHW = ({
  mbn,
  name_eng,
  homework_id,
  tbn,
  teacher_name,
  subject,
}) => {
  const router = useRouter() //使い方：router.replace('/')
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [isNotReady, setIsNotReady] = useState(false)

  //今日の宿題・最初の設定

  const [returnTodayInfo, setReturnTodayInfo] = useState(false)
  const [dataMemberSetInfo, setDataMemberSetInfo] = useState([])
  const [todayHwReadingTextBook, setTodayHwReadingTextBook] = useState('')
  const [todayHwReadingLevel, setTodayHwReadingLevel] = useState('')
  const [newHwReadingLevel, setNewHwReadingLevel] = useState('')
  const [todayHwReadingCourseName, setTodayHwReadingCourseName] = useState('')
  const [todayEnglibLevel, setTodayEnglibLevel] = useState('')

  //課題設定ボタン
  const [isFinishThisLesson, setIsFinishThisLesson] = useState(false)

  const [isModifyThisLesson, setIsModifyThisLesson] = useState(false)
  const [isNoShow, setIsNoShow] = useState(false)
  const [isLeaveEarly, setIsLeaveEarly] = useState(false)
  const [isSuccessSetNewLesson, setIsSuccessSetNewLesson] = useState(false)
  const [isNoshowAndSuccessSetNewLesson, setIsNoshowAndSuccessSetNewLesson] =
    useState(false)

  //All 変更なし
  const [checkedOneMoreAll, setCheckedOneMoreAll] = useState(false)
  const [whySameReadingReason, setWhySameReadingReason] = useState()
  const [whySameReadingReasonDetail, setWhySameReadingReasonDetail] = useState()
  const [whySameShadowingReason, setWhySameShadowingReason] = useState()
  const [whySameShadowingReasonDetail, setWhySameShadowingReasonDetail] =
    useState()
  //readingもう一度
  const [checkedOneMoreMaincourse, setCheckedOneMoreMaincourse] =
    useState(false)
  const [twoWakeReading, setTwoWakeReading] = useState(false)
  const [hw_page_start, sethw_page_start] = useState()
  const [hw_page_end, sethw_page_end] = useState()

  // const [readingFirstAutoidByLevel, setReadingFirstAutoidByLevel] = useState()
  // const [shadowingFirstAutoidByLevel, setShadowingFirstAutoidByLevel] =
  //   useState()

  const [afterHWsetUrl, setAfterHWsetUrl] = useState()

  const [copyHW, setCopyHW] = useState()
  const [copyHWAmount, setCopyHWAmount] = useState()
  //phonics もう一度
  // const [checkedOneMorePhonics, setCheckedOneMorePhonics] = useState(false)

  //Question　もう一度
  // const [checkedOneMoreQuestion, setCheckedOneMoreQuestion] = useState(false)

  //shadowingもう一度
  const [checkedOneMoreShadowing, setCheckedOneMoreShadowing] = useState(false)
  const [twoWakeShadowing, setTwoWakeShadowing] = useState(false)
  const [hw_shadowing_wake, setHw_shadowing_wake] = useState()
  const [hw_reading_wake, setHw_reading_wake] = useState()
  const [hw_shadowing_start, setHw_shadowing_start] = useState()
  const [hw_shadowing_end, setHw_shadowing_end] = useState()
  const [readingHWAmount, setReadingHWAmount] = useState('')
  const [shadowingHWAmount, setShadowingHWAmount] = useState('')
  //宿題設定
  const [checkedSetTextbook, setCheckedSetTextbook] = useState(false)
  const [checkedSetReadingLevel, setCheckedSetReadingLevel] = useState(false)
  const [checkedSetShadowingLevel, setCheckedSetShadowingLevel] =
    useState(false)
  const [selectedReadingTextbook, setSelectedReadingTextbook] = useState()
  const [selectedReadingLevel, setSelectedReadingLevel] = useState()
  const [selectedMainCourseHW, setSelectedMainCourseHW] = useState()
  const [selectedShadowingLevel, setSelectedShadowingLevel] = useState()
  const [selectedShadowingHW, setSelectedShadowingHW] = useState()
  const [selectedPhonicsHW, setSelectedPhonicsHW] = useState()
  const [selectedConversationHW, setSelectedConversationHW] = useState()
  const [selectedGrammarBookHW, setSelectedGrammarBookHW] = useState()
  const [selectedGrammarBookHW2, setSelectedGrammarBookHW2] = useState()
  //今まで読んだ本のリスト
  const [viewMyReadingHistoryList, setViewMyReadingHistoryList] = useState([])

  const [phonicsBigCourse, setphonicsBigCourse] = useState()
  const [phonicsLessonTitle, setphonicsLessonTitle] = useState()
  const [questionBigCourse, setquestionBigCourse] = useState()
  const [youtubeID, setYoutubeID] = useState()
  const [youtubeIframUrl, setYoutubeIframUrl] = useState()
  const [homeworkIdMaincourse, setHomeworkIDMaincourse] = useState(homework_id)
  const [homeworkIdShadowing, setHomeworkIDShadowing] = useState()
  const [shadowingMaterial, setShadowingMaterial] = useState()

  //Grammar
  const [grammarSeriesCourse, setGrammarSeriesCourse] = useState()
  const [grammarCourseName, setGrammarCourseName] = useState()
  const [grammarHwStartPage, setGrammarHwStartPage] = useState()
  const [grammarHwEndPage, setGrammarHwEndPage] = useState()
  const [grammarStoryNum, setGrammarStoryNum] = useState()
  const [grammarSupportListOrder, setGrammarSupportListOrder] = useState()
  const [grammarSupportListOrder2, setGrammarSupportListOrder2] = useState()
  const [grammarBookTitle, setGrammarBookTitle] = useState()
  const [grammarSeriesName, setGrammarSeriesName] = useState()
  const [grammarReadingLevel, setGrammarReadingLevel] = useState()
  //One More Checkbox
  // const [checkedOneMoreMaincourse, setCheckedOneMoreMaincourse] =
  //   useState(false)
  // const [checkedOneMoreShadowing, setCheckedOneMoreShadowing] = useState(false)

  const [dataInfo, setDataInfo] = useState([])

  const [bookView, setBookView] = useState(false)
  //alert
  const [isSetTheSameHW, setIsSetTheSameHW] = useState(false)

  //view Reading Level
  //no Shadowing
  const [doShadowingForThisCourse, setDoShadowingForThisCourse] = useState()
  const [viewReadingLevel, setViewReadingLevel] = useState(false)

  const [viewBookStock, setViewBookStock] = useState(false)

  const [dataShadowingInfo, setDataShadowingInfo] = useState([])
  const [readingListHistoryInfo, setReadingListHistoryInfo] = useState([])
  const [readingListInfo, setReadingListInfo] = useState([])
  const [readingAllLevelInfo, setReadingAllLevelInfo] = useState([])
  const [shadowingListInfo, setShadowingListInfo] = useState([])
  const [shadowingBookListInfo, setShadowingBookListInfo] = useState([])
  const [shadowingLevelInfo, setShadowingLevelInfo] = useState([])
  const [shadowingBookLevelInfo, setShadowingBookLevelInfo] = useState([])
  const [phonicsListInfo, setPhonicsListInfo] = useState([])
  const [conversationListInfo, setConversationListInfo] = useState([])
  const [grammarBookListInfoStart, setGrammarBookListInfoStart] = useState([])
  const [grammarBookListInfoEnd, setGrammarBookListInfoEnd] = useState([])
  const [readingLevel, setreadingLevel] = useState()
  const [mainSubject, setMainSubject] = useState(subject)
  const [mainCourseName, setMainCourseName] = useState()
  const [storyNum, setstoryNum] = useState()
  const [phonicsLessonOrder, setphonicsLessonOrder] = useState()

  const [questionLessonOrder, setquestionLessonOrder] = useState()
  const [lessonMemoOnlyTeacher, setlessonMemoOnlyTeacher] = useState()
  const [lessonMemoForMom, setlessonMemoForMom] = useState()
  const [shadowingLevel, setshadowingLevel] = useState()
  const [movieNum, setmovieNum] = useState()
  const [youtubeURL, setyoutubeURL] = useState()

  //Shadown Book
  const [shadowSeriesName, setShadowSeriesName] = useState()
  const [shadowBookTitle, setShadowBookTitle] = useState()
  const [shadowBookNum, setShadowBookNum] = useState()
  const [shadowStoryNum, setShadowStoryNum] = useState()
  const [shadowStoryTitle, setShadowStoryTitle] = useState()

  const [shadowingSpeed, setshadowingSpeed] = useState()
  const [dictationStart, setdictationStart] = useState()
  const [dictationSecond, setdictationSecond] = useState()

  const [newShadowingLevel, setNewShadowingLevel] = useState()
  const [newReadingLevel, setNewReadingLevel] = useState()
  // //無限ループしない
  // const bar2 = {}
  //SHADOWING INFO

  const [viewMyReadingHistory, setViewMyReadingHistory] = useState(false)

  //processing popup
  const [processingPopup, setProcessingPopup] = useState(false)

  useEffect(() => {
    dbMemberSetInfo()
  }, [mbn, subject])

  function dbMemberSetInfo() {
    // var subject = 'READING'

    var Url = DB_CONN_URL + '/get-member-set-info/' + mbn + '&' + subject
    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert(Url)
          // alert('length' + response.data.length)

          console.log('✅ response from backend:', response.data)

          if (
            response.data &&
            response.data.status === true &&
            Array.isArray(response.data.response) &&
            response.data.response.length > 0
          ) {
            // alert('dbMemberSetInfo')
            const hwInfo = response.data.response[0] // ✅ 여기!!
            setDataMemberSetInfo(response.data.response)
            setTodayHwReadingTextBook(hwInfo.textbookName)
            setSelectedReadingTextbook(hwInfo.textbookName)
            setTodayHwReadingLevel(hwInfo.courseLevel)
            setSelectedReadingLevel(hwInfo.courseLevel)
            setTodayHwReadingCourseName(hwInfo.courseName)
            setTodayEnglibLevel(hwInfo.englibLevel)
            setMainSubject(hwInfo.subject)
            // setDataMemberSetInfo(response.data)
            // setTodayHwReadingTextBook(response.data[0].textbookName)
            // setSelectedReadingTextbook(response.data[0].textbookName)
            // setTodayHwReadingLevel(response.data[0].courseLevel)
            // setSelectedReadingLevel(response.data[0].courseLevel)
            // setTodayHwReadingCourseName(response.data[0].courseName)
            // setTodayEnglibLevel(response.data[0].englibLevel)

            // setMainSubject(response.data[0].subject)

            //Get Reading Info
            // var cN = response.data[0].courseName
            var cN = hwInfo.courseName
            // var rL = response.data[0].courseLevel //reading level
            var rL = hwInfo.courseLevel //reading level

            // alert('courseName' + response.data[0].courseName)

            if (subject == 'READING') {
              getReadingInfo(cN, rL) //setReadingListInfo
              getReadingALlLevelInfo(cN, rL)
            }

            getShadowingLevelInfo()
            getShadowingBookLevelInfo()

            // var phLO = response.data[0].phonicsLessonOrder
            // getPhonicsInfo(phLO)
            // getConversationInfo()
          } else {
            console.warn('❌ No valid homework data:', response.data)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData2()
  }

  //課題がどれだけ残っているのかをチェック：次の教材の発送のために必要。
  function howManyStoryLeft() {
    var Url = DB_CONN_URL + '/get-hw-lesson/' + mbn + '&' + subject
  }

  useEffect(() => {
    dbMainDataInfo()
  }, [mbn, subject])

  function dbMainDataInfo() {
    // var subject = 'READING'
    var Url = DB_CONN_URL + '/get-hw-lesson/' + mbn + '&' + subject
    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert(Url)
          // alert('length' + response.data.length)
          if (response.data.length > 0) {
            setDataInfo(response.data)

            setDoShadowingForThisCourse(
              response.data[0].doShadowingForThisCourse
            )
            // alert(response.data[0].doShadowingForThisCourse)
            // setMainSubject(response.data[0].subject)
            setreadingLevel(response.data[0].readingLevel)
            setMainCourseName(response.data[0].courseName)

            setphonicsBigCourse(response.data[0].phonicsBigCourse)
            setphonicsLessonOrder(response.data[0].phonicsLessonOrder)
            setphonicsLessonTitle(response.data[0].phonicsLessonTitle)
            setphonicsBigCourse(response.data[0].phonicsBigCourse)
            setquestionBigCourse(response.data[0].questionBigCourse)
            setquestionLessonOrder(response.data[0].questionLessonOrder)
            setstoryNum(response.data[0].storyNum)
            setReadingHWAmount(response.data[0].readingHWAmount)

            //for Grammar
            setGrammarSeriesCourse(response.data[0].course)
            setGrammarCourseName(response.data[0].courseName)
            setGrammarHwStartPage(response.data[0].hw_page_start)
            setGrammarHwEndPage(response.data[0].hw_page_end)
            setGrammarStoryNum(response.data[0].storyNum)
            setGrammarSupportListOrder(response.data[0].support_listOrder)
            setGrammarSupportListOrder2(response.data[0].support_listOrderEnd)
            setGrammarBookTitle(response.data[0].bookTitle)
            setGrammarSeriesName(response.data[0].seriesName)
            setGrammarReadingLevel(response.data[0].readingLevel)

            if (response.data[0].courseName == 'CourseA') {
              getRTtoryAutoid(
                response.data[0].readingLevel,
                response.data[0].bookNum,
                response.data[0].storyNum
              )
            } else if (response.data[0].courseName == 'CourseB') {
              getBlackStoryAutoid(
                response.data[0].readingLevel,
                response.data[0].bookNum,
                response.data[0].storyNum
              )
            } else if (response.data[0].courseName == 'CourseZ') {
              getORTStoryAutoid(
                response.data[0].readingLevel,
                response.data[0].bookNum,
                response.data[0].storyNum
              )
            }

            if (response.data[0].subject == 'READING') {
              var phLO = response.data[0].phonicsLessonOrder
              getPhonicsInfo(phLO)
              var cvLO = response.data[0].questionLessonOrder
              getConversationInfo(cvLO)
            }
            if (
              response.data[0].subject == 'GRAMMAR' ||
              response.data[0].subject == 'EIKEN' ||
              response.data[0].subject == 'SCHOOL ENGLISH'
            ) {
              var GSeriesName = response.data[0].seriesName
              var GReadingLevel = response.data[0].readingLevel
              var GBookTitle = response.data[0].bookTitle
              var grLO = response.data[0].support_listOrder
              var grLOEnd = response.data[0].support_listOrderEnd
              getGrammarBookInfoStart(
                GSeriesName,
                GReadingLevel,
                GBookTitle,
                grLO
              )
              getGrammarBookInfoEnd(
                GSeriesName,
                GReadingLevel,
                GBookTitle,
                grLOEnd
              )
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData2()
    // }
  }

  //Reading Triuphs H.W Autoid Info
  function getRTtoryAutoid(rL, bN, sN) {
    var Url = DB_CONN_URL + '/get-rt-autoid-info/' + rL + '&' + bN + '&' + sN

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          if (response.data.length > 0) {
            setSelectedMainCourseHW(response.data[0].autoid)
            sethw_page_start(response.data[0].storyStartPage)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  //BlackCatStoryAutoid Info
  function getBlackStoryAutoid(rL, bN, sN) {
    var Url =
      DB_CONN_URL + '/get-blackcat-autoid-info/' + rL + '&' + bN + '&' + sN
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setSelectedMainCourseHW(response.data[0].autoid)
            sethw_page_start(response.data[0].storyStartPage)
            // alert(response.data[0].autoid)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  //ORT H.W Autoid Info
  function getORTStoryAutoid(rL, bN, sN) {
    var Url = DB_CONN_URL + '/get-ort-autoid-info/' + rL + '&' + bN + '&' + sN
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setSelectedMainCourseHW(response.data[0].autoid)
            sethw_page_start(response.data[0].storyStartPage)
            // alert(response.data[0].autoid)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  useEffect(() => {
    // alert('test')
    if (doShadowingForThisCourse != 'no') {
      dbShadowingDataInfo()
    }
  }, [mbn, subject])

  function dbShadowingDataInfo() {
    // if (localStorage.getItem('T_loginStatus') == 'true') {

    var subject = 'SHADOWING'

    var Url = DB_CONN_URL + '/get-hw-lesson-shadowing/' + mbn + '&' + subject

    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)
          // alert(response.data[0].material_sort)
          if (response.data.length > 0) {
            setDataShadowingInfo(response.data)
            sethw_page_start(response.data[0].storyStartPage)
            setShadowingMaterial(response.data[0].material_sort)

            if (response.data[0].material_sort == 'BOOK') {
              setHomeworkIDShadowing(response.data[0].homework_id)
              setshadowingLevel(response.data[0].shadowingLevel)
              setShadowSeriesName(response.data[0].seriesName)
              setShadowBookTitle(response.data[0].bookTitle)
              setShadowBookNum(response.data[0].bookNum)
              setShadowStoryNum(response.data[0].storyNum)
              setShadowStoryTitle(response.data[0].storyTitle)

              setdictationStart(response.data[0].dictation_start)
              setdictationSecond(response.data[0].dictationSec)
              setShadowingHWAmount(response.data[0].shadowingHWAmount)
              setSelectedShadowingLevel(response.data[0].shadowingLevel)
              var shL = response.data[0].shadowingLevel
              var seR = response.data[0].seriesName
              var bookT = response.data[0].bookTitle
              var bookN = response.data[0].bookNum
              var storyN = response.data[0].storyNum
              getBookShadowingInfo(shL, seR)

              getBookShadowingHWAutoid(shL, seR, bookT, bookN, storyN)
            } else if (response.data[0].material_sort == 'VIDEO') {
              var splitString = myFun_getYoutubeID(response.data[0].youtubeURL)
              setYoutubeID(splitString)
              setHomeworkIDShadowing(response.data[0].homework_id)
              var youtubeIframeUrl =
                'https://www.youtube.com/embed/' + splitString
              setYoutubeIframUrl(youtubeIframeUrl)

              setshadowingLevel(response.data[0].shadowingLevel)
              setmovieNum(response.data[0].movieNum)
              setyoutubeURL(response.data[0].youtubeURL)
              var shL = response.data[0].shadowingLevel

              getShadowingInfo(shL)

              setshadowingSpeed(response.data[0].shadowing_speed)
              setdictationStart(response.data[0].dictation_start)
              setdictationSecond(response.data[0].dictationSec)
              setShadowingHWAmount(response.data[0].shadowingHWAmount)
              setSelectedShadowingLevel(response.data[0].shadowingLevel)
              getShadowingHWAutoid(
                response.data[0].movieNum,
                response.data[0].youtubeURL
              )
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData2()
    // }
  }

  function getFirstAutoidByReadingLevel(selectedRTextbook, rL) {
    var readingLevel = rL
    // alert(selectedRTextbook)
    // alert(readingLevel)

    var Url =
      DB_CONN_URL +
      '/get-first-autoid-by-readingLevel/' +
      selectedRTextbook +
      '&' +
      readingLevel

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)
          // alert('1')
          if (response.data.length > 0) {
            setSelectedMainCourseHW(response.data.response[0].autoid)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function getFirstAutoidByShadowingLevel(shadowingLevel) {
    // alert(shadowingLevel)

    var Url =
      DB_CONN_URL + '/get-first-autoid-by-shadowingLevel/' + shadowingLevel

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)
          // alert('1')
          if (response.data.length > 0) {
            setSelectedShadowingHW(response.data.response[0].autoid)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function getFirstAutoidByShadowingLevelBook(shadowingLevel) {
    // alert(shadowingLevel)

    var Url =
      DB_CONN_URL + '/get-first-autoid-by-shadowingLevel-Book/' + shadowingLevel

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)
          // alert('1')
          if (response.data.length > 0) {
            // alert(response.data.response[0].autoid)
            setSelectedShadowingHW(response.data.response[0].autoid)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  //ORT H.W Autoid Info
  function getShadowingHWAutoid(mN, yUrl) {
    // alert(mN)
    // alert(yUrl)

    var Url = DB_CONN_URL + '/get-movie-shadowing-hw-autoid-info/' + mN

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('status' + response.data.status)

          if (response.data.length > 0) {
            setSelectedShadowingHW(response.data[0].autoid)

            // alert(response.data[0].autoid)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function getBookShadowingHWAutoid(shL, seR, bookT, bookN, storyN) {
    var Url =
      DB_CONN_URL +
      '/get-book-shadowing-hw-autoid-info/' +
      shL +
      '&' +
      seR +
      '&' +
      bookT +
      '&' +
      bookN +
      '&' +
      storyN

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          if (response.data.length > 0) {
            setSelectedShadowingHW(response.data[0].autoid)

            // alert(response.data[0].autoid)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  //All Reading Stories of this book
  function getReadingInfo(cN, rL) {
    // alert('cL' + cN)
    // alert('rL' + rL)
    var readingLevel = rL
    // var bookNum = bN
    var courseName = cN
    // var storyNum = sN
    // alert(cN)
    if (courseName.indexOf('CourseA') !== -1) {
      // var seriesName = 'Reading Triumphs'
      var Url =
        DB_CONN_URL +
        '/get-reading-story-Reading-Triumphs-same-textbook/' +
        readingLevel
    }
    if (courseName.indexOf('CourseB') !== -1) {
      // var seriesName = 'Blackcat Series'
      var Url =
        DB_CONN_URL +
        '/get-reading-story-Blackcat/' +
        // bookNum +
        // '&' +
        readingLevel
    }
    if (courseName.indexOf('CourseZ') !== -1) {
      // var seriesName = 'Oxford Reading Tree'
      var Url = DB_CONN_URL + '/get-reading-story-ORT/' + readingLevel
    }
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)
          // alert('1')
          if (response.data.length > 0) {
            setReadingListInfo(response.data.response)
            if (
              courseName.indexOf('CourseZ') !== -1 ||
              courseName.indexOf('CourseB') !== -1 ||
              courseName.indexOf('CourseA') !== -1
            ) {
              getReadingHistoryInfo(cN, rL)
            }
            // alert('2')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  // Reading Stories that student had read before

  function getReadingHistoryInfo(cN, rL) {
    // alert('cL' + cN)
    // alert('rL' + rL)
    var readingLevel = rL
    // var bookNum = bN
    var courseName = cN
    // var storyNum = sN
    // alert(cN)
    var mbn = localStorage.getItem('mbn')
    if (courseName.indexOf('CourseA') !== -1) {
      var Url =
        DB_CONN_URL + '/get-reading-history-RT/' + mbn + '&' + readingLevel
    } else if (courseName.indexOf('CourseB') !== -1) {
      // var seriesName = 'Blackcat Series'

      var Url =
        DB_CONN_URL + '/get-reading-history-BC/' + mbn + '&' + readingLevel
    } else if (courseName.indexOf('CourseZ') !== -1) {
      // var seriesName = 'Oxford Reading Tree'

      var Url =
        DB_CONN_URL + '/get-reading-history-ORT/' + mbn + '&' + readingLevel
    }
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        await axios.get(Url).then((response) => {
          // alert(Url)
          if (response.data.length > 0) {
            // alert('here')
            setReadingListHistoryInfo(response.data.response)
          }
        })
      } catch (error) {
        // alert('viewsethw1:' + error)
        console.log(error)
      }
    }
    fetchData()
  }

  //この教材の全てのレベル
  function getReadingALlLevelInfo(cN, rL) {
    if (cN.indexOf('CourseA') !== -1) {
      // var seriesName = 'Reading Triumphs'
      var Url =
        DB_CONN_URL +
        '/get-reading-story-Reading-Triumphs-same-textbook-All-Level'
    }
    if (cN.indexOf('CourseB') !== -1) {
      // var seriesName = 'Blackcat Series'
      var Url = DB_CONN_URL + '/get-reading-story-Blackcat-All-Level'
    }
    if (cN.indexOf('CourseZ') !== -1) {
      // var seriesName = 'Oxford Reading Tree'
      var Url = DB_CONN_URL + '/get-reading-story-ORT-All-Level'
    }
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            // alert('length>0' + response.data.message)
            setReadingAllLevelInfo(response.data.response)
            // setCourseName(cN)
            getReadingInfo(cN, rL)
          } else {
            // alert('length==0' + response.data.message)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  // //この教材の全てのレベル
  // function getReadingALlLevelInfo2(cN) {
  //   // var readingLevel = rL
  //   // var bookNum = bN
  //   // var storyNum = sN
  //   // var courseName = cN
  //   // alert('getReadingALlLevelInfo2', cN)
  //   if (cN.indexOf('CourseA') !== -1) {
  //     // var seriesName = 'Reading Triumphs'
  //     var Url =
  //       DB_CONN_URL +
  //       '/get-reading-story-Reading-Triumphs-same-textbook-All-Level'
  //   }
  //   if (cN.indexOf('CourseB') !== -1) {
  //     // var seriesName = 'Blackcat Series'
  //     var Url = DB_CONN_URL + '/get-reading-story-Blackcat-All-Level'
  //   }
  //   if (cN.indexOf('CourseZ') !== -1) {
  //     // var seriesName = 'Oxford Reading Tree'
  //     var Url = DB_CONN_URL + '/get-reading-story-ORT-All-Level'
  //   }
  //   // alert('Url:' + Url)

  //   const fetchData = async () => {
  //     try {
  //       axios.get(Url).then((response) => {
  //         // alert('length' + response.data.length)

  //         if (response.data.length > 0) {
  //           setReadingAllLevelInfo(response.data.response)
  //           // setCourseName(cN)
  //           // getReadingInfo(cN, rL)
  //         }
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData()
  // }

  //Movie Shadowing Info of this Series
  function getShadowingLevelInfo() {
    // alert('shL' + shL)

    var Url = DB_CONN_URL + '/get-movie-shadowing-info-same-All-Level'
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setShadowingLevelInfo(response.data.response)
            // alert(response.data.message)
          } else {
            // alert(response.data.message)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  //Book Shadowing Info of this Series
  function getShadowingBookLevelInfo() {
    // alert('shL' + shL)

    var Url = DB_CONN_URL + '/get-book-shadowing-info-same-All-Level'
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setShadowingBookLevelInfo(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  //Book Shadowing Info of this Series
  function getBookShadowingInfo(shL, seR) {
    // alert('shL' + shL)
    var shadowingLevel = shL
    var shadowSeriesName = seR

    var Url =
      DB_CONN_URL +
      '/get-book-shadowing-info-same-level/' +
      shadowingLevel +
      '&' +
      shadowSeriesName
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setShadowingBookListInfo(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  //Movie Shadowing Info of this Series
  function getShadowingInfo(shL) {
    // alert('shL' + shL)
    var shadowingLevel = shL
    var Url =
      DB_CONN_URL + '/get-movie-shadowing-info-same-level/' + shadowingLevel
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setShadowingListInfo(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  //All Grammar Book Info
  function getGrammarBookInfoStart(
    GSeriesName,
    GReadingLevel,
    GBookTitle,
    grLO
  ) {
    var Url =
      DB_CONN_URL +
      '/get-grammar-book-info/' +
      GSeriesName +
      '&' +
      GReadingLevel +
      '&' +
      GBookTitle +
      '&' +
      subject

    // alert('Url:' + Url)
    // alert(grLO)
    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setGrammarBookListInfoStart(response.data.response)
            var grArray = []
            grArray = response.data.response
            console.log('grArray', grArray)
            grArray.map((val, key) => {
              if (val.listOrder == grLO) {
                // alert(val.listOrder)
                setSelectedGrammarBookHW(val.autoid)
                // console.log('setSelectedGrammarBookHW', val.autoid)
              }
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  //All Grammar Book Info
  function getGrammarBookInfoEnd(GSeriesName, GReadingLevel, GBookTitle, grLO) {
    // alert('Phonics' + PhLO)
    // var subject = 'GRAMMAR'

    var Url =
      DB_CONN_URL +
      '/get-grammar-book-info/' +
      GSeriesName +
      '&' +
      GReadingLevel +
      '&' +
      GBookTitle +
      '&' +
      subject

    // alert('Url:' + Url)
    // alert(grLO)
    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setGrammarBookListInfoEnd(response.data.response)
            var grArray = []
            grArray = response.data.response
            console.log('grArray', grArray)
            grArray.map((val, key) => {
              if (val.listOrder == grLO) {
                // alert(val.listOrder)
                setSelectedGrammarBookHW2(val.autoid)
                console.log('setSelectedGrammarBookHW2', val.autoid)
              }
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  //All Phonics Info
  function getPhonicsInfo(PhLO) {
    // alert('Phonics' + PhLO)
    var Url = DB_CONN_URL + '/get-phonics-info'
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('phonicslength' + response.data.length)

          if (response.data.length > 0) {
            setPhonicsListInfo(response.data.response)
            // alert(response.data.response)
            var phArray = []
            phArray = response.data.response
            console.log('phArray', phArray)
            phArray.map((val, key) => {
              if (val.lessonOrder == PhLO) {
                setSelectedPhonicsHW(val.autoid)
                console.log('setSelectedPhonicsHW', val.autoid)
              }
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  //All Conversation Info
  function getConversationInfo(cvLO) {
    // alert(cvLO)
    var Url = DB_CONN_URL + '/get-conversation-info'
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setConversationListInfo(response.data.response)
            var cvArray = []
            cvArray = response.data.response
            console.log('cvArray', cvArray)
            cvArray.map((val, key) => {
              if (val.lessonOrder == cvLO) {
                setSelectedConversationHW(val.autoid)
                console.log('setSelectedConversationHW', val.autoid)
              }
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  //My conversationInfo

  const [dictationSt, setDictationSt] = useState()
  const [shadowingSp, setShadowingSp] = useState()
  const [dictationSec, setDictationSec] = useState()
  const changeShadowingSpeed = (val) => {
    var shadowingSp = val
    setShadowingSp(shadowingSp)
    var url = DB_CONN_URL + '/change-shadowing-speed/'
    axios.get(url + mbn + '&' + shadowingSp).then((response) => {
      alert('set shadowing speed to ' + val)
    })
  }
  const changeDicStart = (val) => {
    var dictationStatus = val
    setDictationSt(dictationStatus)
    var url = DB_CONN_URL + '/change-dictation-start/'

    axios.get(url + mbn + '&' + dictationStatus).then((response) => {
      dbShadowingDataInfo()
      alert('set dictation to ' + val)
    })
  }
  const changeDictationSec = (val) => {
    var dictationSec = val
    setDictationSec(dictationSec)
    // alert(dictationSec)
    // alert(mbn)
    var url = DB_CONN_URL + '/change-dictation-sec/'
    axios.get(url + mbn + '&' + dictationSec).then((response) => {
      alert('set dictation length to ' + val)
    })
  }

  //教材変更
  function changeReadingTextbook(newTextBook) {
    if (newTextBook == 'Reading Triumphs') {
      var mcn = 'CourseA'
    } else if (newTextBook == 'Blackcat Series') {
      var mcn = 'CourseB'
    } else if (newTextBook == 'Oxford Reading Tree') {
      var mcn = 'CourseZ'
    }

    const fetchData = async () => {
      try {
        var Url = DB_CONN_URL + '/change-new-reading-textbook'
        axios
          .post(Url, {
            mbn: mbn,
            newTextbook: newTextBook,
            mainCourseName: mcn,
          })
          .then((response) => {
            alert('Textbook Changed to ' + newTextBook)
            // var rL = newReadingLevel
            setSelectedReadingTextbook(newTextBook)
            setMainCourseName(mcn)
            getReadingALlLevelInfo2(mcn)
            setSelectedReadingLevel() //selected reading levelのValueを削除

            // getReadingInfo(cN, rL)
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function changeCopyHW(copyhw) {
    const fetchData = async () => {
      try {
        var Url = DB_CONN_URL + '/change-new-copy-hw'
        axios
          .post(Url, {
            mbn: mbn,
            copyhw: copyhw,
          })
          .then((response) => {
            alert('Copy HW  Changed to ' + copyhw)
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  function changeReadingLevel(newReadingLevel, cN) {
    const fetchData = async () => {
      try {
        var Url = DB_CONN_URL + '/change-new-reading-level'
        axios
          .post(Url, {
            mbn: mbn,
            newReadingLevel: newReadingLevel,
          })
          .then((response) => {
            alert('Reading Level Changed to ' + newReadingLevel)
            var rL = newReadingLevel
            // setSelectedReadingLevel(cN)
            setSelectedReadingLevel(newReadingLevel)
            getReadingInfo(cN, rL)
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function changeShadowingLevel(newShadowingLevel) {
    var sL = newShadowingLevel
    setNewShadowingLevel(sL)
    getShadowingInfo(sL)
    getFirstAutoidByShadowingLevel(sL)

    try {
      var Url = DB_CONN_URL + '/change-new-shadowing-level'
      // alert('shadowingLevel: ' + value_array[0])
      // alert('shadowingCourseName: ' + value_array[1])
      axios
        .post(Url, {
          mbn: mbn,
          shadowingLevel: newShadowingLevel,
        })
        .then((response) => {
          if (response.data.status) {
            alert('Video Shadowing Level Changed to ' + sL)

            // setSelectedReadingLevel(cN)
            setSelectedShadowingLevel(sL)
            setNewShadowingLevel(sL)
            getShadowingInfo(sL)
            getFirstAutoidByShadowingLevel(sL)
          } else {
            alert('status false')
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  function changeBookShadowingLevel(thisValue) {
    const value_array = thisValue.split('/')

    try {
      var Url = DB_CONN_URL + '/change-new-shadowing-level-BOOK'
      // alert('shadowingLevel: ' + value_array[0])
      // alert('shadowingCourseName: ' + value_array[1])
      axios
        .post(Url, {
          mbn: mbn,
          shadowingLevel: value_array[0],
          shadowingCourseName: value_array[1],
        })
        .then((response) => {
          if (response.data.status) {
            alert('Shadowing Level Changed to ' + value_array[0])
            // setSelectedReadingLevel(cN)
            setSelectedShadowingLevel(value_array[0])
            setNewShadowingLevel(value_array[0])
            getBookShadowingInfo(value_array[0], value_array[1])
            getFirstAutoidByShadowingLevelBook(value_array[0])
          } else {
            alert('status false')
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  function handleViewMyReadingHistory(courseName) {
    var url = DB_CONN_URL + '/get-my-reading-history-info/'
    var Url = url + mbn + '&' + courseName
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            // alert(response.data.message)
            setViewMyReadingHistoryList(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  const [zaikoInfo, setZaikoInfo] = useState([])
  const [zaikoInfoLength, setZaikoInfoLength] = useState()
  useEffect(() => {
    var Url = DB_CONN_URL + '/check-zaiko/'

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setZaikoInfo(response.data)
        setZaikoInfoLength(response.data.length)
        // setAudioDurtaionFromDB(response.data[0].audioDuration)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  function NextLessonDate(sort) {
    setIsFinishThisLesson(false)
    setIsLeaveEarly(false)
    setIsNoShow(false)
    setIsModifyThisLesson(false)
    // alert(subject)
    var mainSubject = subject
    var Url = DB_CONN_URL + '/NEXT-LESSON-DATE-FOR-EVERYWEEK-VER2'

    const fetchData = async () => {
      try {
        axios
          .post(Url, {
            mbn: mbn,
            mainSubject: mainSubject,
          })
          .then((response) => {
            // alert(response.data.message)
            // alert(response.data.nextLessonDate)
            var nextLessonDate = response.data.nextLessonDate
            // console.log('HERE-nextLessonDate', nextLessonDate)
            // console.log('HERE-sort', sort)
            if (mainSubject == 'READING') {
              saveNewHW(nextLessonDate, sort)
            } else if (
              mainSubject == 'GRAMMAR' ||
              mainSubject == 'SCHOOL ENGLISH' ||
              mainSubject == 'EIKEN'
            ) {
              // alert(mainSubject)
              saveNewHWSupport(nextLessonDate, sort)
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function saveNewHW(nextLessonDate, sort) {
    setProcessingPopup(true)

    // alert(nextLessonDate)
    // alert(sort)
    var nn = nextLessonDate
    // alert('sort', sort)
    // return false
    // alert(nn)
    //sort: new or modify
    setIsFinishThisLesson(false)

    ////START undefined 設定////////////////////
    //////////////////////////////////////////
    if (checkedOneMoreMaincourse == true) {
      // alert('checkedOneMoreMaincourse' + checkedOneMoreMaincourse)
      var oneMoreReading = 'ok'
    } else {
      // alert('checkedOneMoreMaincourse' + checkedOneMoreMaincourse)
      var oneMoreReading = 'no'
    }

    if (checkedOneMoreShadowing == true) {
      var oneMoreShadowing = 'ok'
      // alert('checkedOneMoreShadowing' + checkedOneMoreShadowing)
    } else {
      // alert('checkedOneMoreShadowing' + checkedOneMoreShadowing)
      var oneMoreShadowing = 'no'
    }

    // alert(sort)
    if (selectedReadingTextbook == 'Reading Triumphs') {
      var newMainCourse = 'CourseA'
    } else if (selectedReadingTextbook == 'Blackcat Series') {
      var newMainCourse = 'CourseB'
    } else if (selectedReadingTextbook == 'Oxford Reading Tree') {
      var newMainCourse = 'CourseZ'
    }

    var main_course_subject = subject //READING,GRAMMAR,SCHOOL ENGLISH...
    var url = DB_CONN_URL

    if (shadowingMaterial == 'VIDEO') {
      var url = url + '/HW-SET-NEW-READING'
    } else if (shadowingMaterial == 'BOOK') {
      var url = url + '/HW-SET-NEW-READING-SH-BOOK'
    }

    const fetchData = async () => {
      try {
        axios
          .post(url, {
            doShadowingForThisCourse: doShadowingForThisCourse,
            nextLessonDate: nextLessonDate,
            homeworkIdMaincourse: homework_id,
            homeworkIdShadowing: homeworkIdShadowing,
            sort: sort,
            mbn: mbn,
            name_eng: name_eng,
            main_course_subject: main_course_subject, //READING,GRAMMAR,SCHOOL ENGLISH,EIKEN
            newMainCourse: newMainCourse, //CourseA
            oneMoreReading: oneMoreReading, //undefined
            whySameReadingReason: whySameReadingReason, //undefined
            whySameReadingReasonDetail: whySameReadingReasonDetail, //undefined
            selectedMainCourseHW: selectedMainCourseHW,
            selectedReadingTextbook: selectedReadingTextbook,
            selectedReadingLevel: selectedReadingLevel,
            readingHWAmount: readingHWAmount,
            hw_page_start: hw_page_start, //undefined
            hw_page_end: hw_page_end, //undefined
            shadowingMaterial: shadowingMaterial, //BOOK or VIDEO
            oneMoreShadowing: oneMoreShadowing, //undefined
            whySameShadowingReason: whySameShadowingReason, //undefined
            whySameShadowingReasonDetail: whySameShadowingReasonDetail, //undefined
            selectedShadowingHW: selectedShadowingHW,
            selectedShadowingLevel: selectedShadowingLevel,
            shadowingHWAmount: shadowingHWAmount,
            //Phonics From Here
            selectedPhonicsHW: selectedPhonicsHW,
            selectedConversationHW: selectedConversationHW,
            lessonMemoOnlyTeacher: lessonMemoOnlyTeacher, //undefined
            lessonMemoForMom: lessonMemoForMom,
          })
          .then((response) => {
            // alert(response.data.message)
            if (response.data.message != 'Success') {
              // alert(
              //   'Some error occurred when setting the homework  ' +
              //     response.data.message
              // )
              // alert(JSON.stringify('1:', response.data.error, null, 2))

              console.log('TEST-error:', response.data.error)
            } else {
              setIsSuccessSetNewLesson(true)
            }
          })
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
    fetchData()

    setTimeout(() => {
      setProcessingPopup(false)
    }, 2000) // Change the timeout value as per your requirement
  }

  //GRAMMAR,SCHOOL ENGLISH
  function saveNewHWSupport(nextLessonDate, sort) {
    // alert(nextLessonDate)
    // alert(sort)

    //sort: new or modify
    setIsFinishThisLesson(false)

    ////START undefined 設定////////////////////
    //////////////////////////////////////////

    if (checkedOneMoreShadowing == true) {
      var oneMoreShadowing = 'ok'
      // alert('checkedOneMoreShadowing' + checkedOneMoreShadowing)
    } else {
      // alert('checkedOneMoreShadowing' + checkedOneMoreShadowing)
      var oneMoreShadowing = 'no'
    }

    var main_course_subject = subject //READING,GRAMMAR,SCHOOL ENGLISH...
    if (main_course_subject == 'GRAMMAR') {
      var newMainCourse = 'CourseGR'
    } else if (main_course_subject == 'SCHOOL ENGLISH') {
      var newMainCourse = 'CourseSE'
    } else if (main_course_subject == 'EIKEN') {
      var newMainCourse = 'CourseEK'
    }

    var url = DB_CONN_URL
    if (
      sort == 'finished' ||
      sort == 'no-show' ||
      sort == 'leave-early' ||
      sort == 'modified'
    ) {
      var url = url + '/HW-SET-NEW-GRAMMAR'
    }

    const fetchData = async () => {
      try {
        axios
          .post(url, {
            doShadowingForThisCourse: doShadowingForThisCourse,
            nextLessonDate: nextLessonDate,
            homeworkIdMaincourse: homework_id,
            homeworkIdShadowing: homeworkIdShadowing,
            sort: sort,
            mbn: mbn,
            name_eng: name_eng,
            main_course_subject: main_course_subject, //READING,GRAMMAR,SCHOOL ENGLISH,EIKEN
            newMainCourse: newMainCourse, //Course
            grammarSeriesName: grammarSeriesName,
            grammarBookTitle: grammarBookTitle, //Gakuen Middle School English Grade2
            grammarReadingLevel: grammarReadingLevel, //Grade2
            selectedGrammarBookHW: selectedGrammarBookHW, //autoid
            selectedGrammarBookHW2: selectedGrammarBookHW2, //autoid
            shadowingMaterial: shadowingMaterial,
            oneMoreShadowing: oneMoreShadowing, //undefined
            whySameShadowingReason: whySameShadowingReason, //undefined
            whySameShadowingReasonDetail: whySameShadowingReasonDetail, //undefined
            selectedShadowingHW: selectedShadowingHW,
            selectedShadowingLevel: selectedShadowingLevel,
            shadowingHWAmount: shadowingHWAmount,
            lessonMemoOnlyTeacher: lessonMemoOnlyTeacher, //undefined
            lessonMemoForMom: lessonMemoForMom,
          })
          .then((response) => {
            if (response.data.message !== 'Success') {
              alert(
                'Some error occurred when setting the homework' +
                  response.data.message
              )
            } else {
              setIsSuccessSetNewLesson(true)
            }
          })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  //宿題設定後にもう一度同じページを開く..///
  function funcGoAfterSetUrl() {
    setIsSuccessSetNewLesson(false)
    // alert(afterHWsetUrl)
    router.replace(afterHWsetUrl)
  }

  function handleSetSelectedHWAutoid(autoid) {
    setSelectedShadowingHW(autoid)
  }

  useEffect(() => {
    getCopyInfo(mbn)
  }, [mbn])

  function getCopyInfo(mbn) {
    const fetchData = async () => {
      const Url = DB_CONN_URL + '/get-copy-info'
      try {
        const response = await axios.post(Url, { mbn: mbn })

        if (
          response.data &&
          response.data.length > 0 &&
          response.data[0].copyHW !== undefined
        ) {
          setCopyHW(response.data[0].copyHW)
          setCopyHWAmount(response.data[0].copyHWAmount)
        } else {
          console.error('Unexpected response structure: ', response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function changeCopyHW(copyhw) {
    const fetchData = async () => {
      var Url = DB_CONN_URL + '/change-new-copy-hw'
      try {
        axios
          .post(Url, {
            mbn: mbn,
            copyhw: copyhw,
          })
          .then((response) => {
            getCopyInfo(mbn)
            alert('Copy H.W  Changed to ' + copyhw)
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function changeCopyHWAmount(copyHWAmount) {
    var Url = DB_CONN_URL + '/change-new-copy-hw-amount'
    const fetchData = async () => {
      try {
        axios
          .post(Url, {
            mbn: mbn,
            copyHWAmount: copyHWAmount,
          })
          .then((response) => {
            getCopyInfo(mbn)
            alert('The Number of pages to copy changed to ' + copyHWAmount)
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
        <div className="row pt-4" style={{ backgroundColor: 'white' }}>
          <div className="container p-0">
            <div className="row p-0">
              <div className="col-lg-12 col-md-12">
                {/* {subject && <h1>mainSubject:{subject}</h1>} */}
                <h1 style={{ fontSize: '30px', fontWeight: '600' }}>
                  HOMEWORK SETTING&nbsp;
                </h1>
              </div>
              <div className="col-lg-2 col-md-12">&nbsp;</div>
              <div className="col-lg-8 col-md-12">
                <span
                  className="btn btn-outline-danger mb-3"
                  onClick={() => {
                    setViewReadingLevel(!viewReadingLevel)
                  }}
                >
                  Reading Level Index
                </span>
                <span
                  className="btn btn-outline-primary mb-3 ml-2"
                  onClick={() => {
                    setViewBookStock(!viewBookStock)
                  }}
                >
                  Book Stock List
                </span>
              </div>
              <div className="col-lg-2 col-md-12">&nbsp;</div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <p
              style={{
                width: '100%',
                display: viewReadingLevel ? 'block' : 'none',
              }}
            >
              <img
                src="/images/readingLevel2.png"
                width="500px"
                style={{ border: 0 }}
              />
            </p>
          </div>
          <div className="col-lg-12 col-md-12 pb-2">
            <div className="col-lg-3 col-md-12"></div>
            <div className="col-lg-6 col-md-12 ">
              <p
                style={{
                  width: '100%',
                  display: viewBookStock ? 'block' : 'none',
                  textAlign: 'left',
                  marginBottom: '15px',
                }}
              >
                <hr />
                Please choose a new book at least two weeks before the start of
                the next book.
                <hr />
                <BookZaikoInfo
                  mbn={mbn}
                  tbn={tbn}
                  teacher_name={teacher_name}
                />
              </p>
            </div>
            <div className="col-lg-3 col-md-12"></div>
            {dataInfo?.map((val, key) => {
              return (
                <>
                  {(subject == 'GRAMMAR' ||
                    subject == 'SCHOOL ENGLISH' ||
                    subject == 'EIKEN') && (
                    <>
                      {' '}
                      <table
                        className="table table-bordered"
                        style={{
                          width: '90%',
                          border: '10px solid #dedede',
                          borderRadius: '10px',
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              rowSpan="2"
                              style={{
                                verticalAlign: 'middle',
                                width: '12%',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '20px',
                                  verticalAlign: 'middle',
                                  fontWeight: '900',
                                }}
                              >
                                {mainSubject}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                fontWeight: 'bold',
                              }}
                            >
                              {/* {selectedPhonicsHW} */}
                              <h5>{grammarBookTitle}</h5>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              {/* {selectedGrammarBookHW}
                              <br />
                              {grammarSupportListOrder} */}
                              <select
                                style={{ width: '400px' }}
                                onChange={(e) => {
                                  setSelectedGrammarBookHW(e.target.value)
                                }}
                              >
                                {grammarBookListInfoStart?.map((val2, key2) => {
                                  return (
                                    <>
                                      <option
                                        selected={
                                          grammarSupportListOrder ==
                                            val2.listOrder && 'selected'
                                        }
                                        value={val2.autoid}
                                      >
                                        {grammarSupportListOrder ==
                                          val2.listOrder && '*'}
                                        &nbsp;Chapter{val2.listOrder}&nbsp;
                                        &nbsp;[{val2.Title}]
                                        {/* {val2.Use}&nbsp;|&nbsp;{val2.Title}] */}
                                        {grammarSupportListOrder ==
                                          val2.listOrder &&
                                          "********TODAY'S LESSON*********"}
                                      </option>
                                    </>
                                  )
                                })}
                              </select>{' '}
                              から
                              <br />〜<br />
                              <select
                                style={{ width: '400px' }}
                                onChange={(e) => {
                                  setSelectedGrammarBookHW2(e.target.value)
                                }}
                              >
                                {grammarBookListInfoEnd?.map((val2, key2) => {
                                  return (
                                    <>
                                      <option
                                        selected={
                                          grammarSupportListOrder2 ==
                                            val2.listOrder && 'selected'
                                        }
                                        value={val2.autoid}
                                      >
                                        {grammarSupportListOrder2 ==
                                          val2.listOrder && '*'}
                                        &nbsp;Chapter{val2.listOrder}&nbsp;
                                        &nbsp;[
                                        {val2.Title}]
                                        {/* {val2.Use}&nbsp;|&nbsp;{val2.Title}] */}
                                        {grammarSupportListOrder2 ==
                                          val2.listOrder &&
                                          "********TODAY'S LESSON*********"}
                                      </option>
                                    </>
                                  )
                                })}
                              </select>{' '}
                              まで
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
                  {subject == 'READING' && (
                    <table
                      className="table table-bordered"
                      style={{
                        width: '90%',
                        border: '10px solid #dedede',
                        borderRadius: '10px',
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            rowSpan="3"
                            style={{
                              verticalAlign: 'middle',
                              width: '12%',
                              textAlign: 'center',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '20px',

                                verticalAlign: 'middle',
                                fontWeight: '900',
                              }}
                            >
                              {mainSubject}
                            </span>
                            {todayHwReadingTextBook !==
                              'Oxford Reading Tree' && (
                              <p
                                style={{
                                  lineHeight: '1.2em',
                                  color: 'blue',
                                  fontWeight: '300',
                                  fontSize: '0.9em',
                                  display: 'flex',
                                  alignItems: 'center', // Centers all inline elements vertically
                                  flexWrap: 'wrap', // Ensures text wraps if needed
                                }}
                              >
                                Please check the student's level and select the
                                next book from the 'Book Stock List' at least
                                two weeks before they finish their current book.
                                This will ensure that the new assignment book
                                arrives on time for the student.
                              </p>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3">
                            {/* checkedOneMoreMaincourse(false/true)
                            <br /> */}
                            <input
                              type="checkbox"
                              onClick={() => {
                                setCheckedOneMoreMaincourse(
                                  !checkedOneMoreMaincourse
                                )
                                setWhySameReadingReason()
                                setWhySameReadingReasonDetail()
                                dbMemberSetInfo()
                                dbMainDataInfo()
                              }}
                              style={{
                                width: '19px',
                                height: '19px',
                                verticalAlign: 'sub',
                              }}
                              selected={checkedOneMoreMaincourse && 'selected'}
                            />{' '}
                            Set the same story as the task one more time &nbsp;{' '}
                            <span
                              style={{
                                display: checkedOneMoreMaincourse
                                  ? 'block'
                                  : 'none',
                              }}
                            >
                              <select
                                onChange={(e) => {
                                  setWhySameReadingReason(e.target.value)
                                }}
                                disabled={
                                  !checkedOneMoreMaincourse && 'disabled'
                                }
                                style={{
                                  height: '30px',
                                  width: '100%',
                                  border: '1px solid',
                                  fontSize: '12px',
                                }}
                              >
                                <option selected="selected">
                                  ====Select Reason====
                                </option>
                                <option value=" ただの練習不足">
                                  ただの練習不足(Not practicing enough)
                                </option>
                                <option value="振替によりレッスン日の間隔が短くなったため練習できる日数不足">
                                  振替によりレッスン日の間隔が短くなったため練習日数不足(Not
                                  enough days to practice due to the shorter
                                  time span in between lessons after make-up
                                  lesson.)
                                </option>
                                <option value="旅行や学校行事などの特別な行事により練習できる日数不足">
                                  旅行や学校行事などの特別な行事により練習できる日数不足(Not
                                  enough days to practice due to a special event
                                  such as a family trip and school events.)
                                </option>
                                <option value="病気や緊急の事情により練習ができない状況だったため">
                                  病気や緊急の事情により練習ができない状況だったため(Not
                                  being able to practice due to sickness and
                                  other emergency situations.)
                                </option>
                                <option value="others">
                                  Others (Please enter texts)
                                </option>
                              </select>
                              &nbsp;
                              <input
                                type="text"
                                onChange={(e) => {
                                  setWhySameReadingReasonDetail(e.target.value)
                                }}
                                disabled={whySameReadingReason != 'others'}
                                style={{ width: '300px' }}
                              />
                            </span>
                            <p className="pt-1"></p>
                            <span style={{ color: 'red' }}>Story</span>
                            {/* &nbsp; selectedMainCourseHW:{selectedMainCourseHW} */}
                            &nbsp;
                            {selectedReadingTextbook == 'CourseB' ||
                            todayHwReadingCourseName == 'CourseB' ? (
                              <select
                                disabled={
                                  checkedOneMoreMaincourse && 'disabled'
                                }
                                style={{ width: '250px' }}
                                onChange={(e) => {
                                  setSelectedMainCourseHW(e.target.value)
                                }}
                              >
                                <option
                                  value=""
                                  selected={
                                    selectedMainCourseHW == '' && 'selected'
                                  }
                                >
                                  =======Please Select Story======
                                </option>
                                {readingListInfo?.map((val2, key2) => {
                                  //Blackcat読んだ本チェック

                                  const search = (obj) =>
                                    obj.storyNum === val2.storyNum
                                  console.log(
                                    readingListHistoryInfo.findIndex(search)
                                  )
                                  var myBook =
                                    readingListHistoryInfo.findIndex(search)

                                  if (myBook > -1) {
                                    var markBook = 'ok'
                                  } else {
                                    var markBook = ''
                                  }
                                  //読んだ本チェックEND

                                  return (
                                    <option
                                      selected={
                                        readingLevel == val2.readingLevel &&
                                        storyNum == val2.storyNum &&
                                        'selected'
                                      }
                                      value={val2.autoid}
                                    >
                                      {markBook == 'ok' && '[*]'}
                                      {val2.readingLevel}&nbsp;
                                      {val2.audio_pronounciation ==
                                        'American' && '[AM]'}
                                      {val2.audio_pronounciation == 'British' &&
                                        '[BR]'}
                                      {val2.audio_pronounciation ==
                                        'American/British' && '[AM/BR]'}
                                      &nbsp;[
                                      {val2.bookTitle}
                                      ]&nbsp;[Story{val2.lessonOrder}:&nbsp;
                                      {val2.storyTitle}]
                                      {readingLevel == val2.readingLevel &&
                                        storyNum == val2.storyNum &&
                                        "********TODAY'S LESSON*********"}
                                    </option>
                                  )
                                })}
                              </select>
                            ) : (
                              <>
                                <select
                                  disabled={
                                    checkedOneMoreMaincourse && 'disabled'
                                  }
                                  style={{ width: '250px' }}
                                  onChange={(e) => {
                                    setSelectedMainCourseHW(e.target.value)
                                  }}
                                >
                                  {readingListInfo?.map((val2, key2) => {
                                    //ORTの読んだ本チェックSTART
                                    if (
                                      selectedReadingTextbook == 'CourseA' ||
                                      todayHwReadingCourseName == 'CourseA'
                                    ) {
                                      const search = (obj) =>
                                        obj.storyNum === val2.storyNum
                                      var myBook =
                                        readingListHistoryInfo.findIndex(search)

                                      if (myBook > -1) {
                                        var markBook = 'ok'
                                      } else {
                                        var markBook = ''
                                      }
                                    }
                                    if (
                                      selectedReadingTextbook == 'CourseZ' ||
                                      todayHwReadingCourseName == 'CourseZ'
                                    ) {
                                      const search = (obj) =>
                                        obj.storyTitle === val2.storyTitle
                                      var myBook =
                                        readingListHistoryInfo.findIndex(search)

                                      if (myBook > -1) {
                                        var markBook = 'ok'
                                      } else {
                                        var markBook = ''
                                      }
                                    }

                                    if (val2.pageCountNew != '') {
                                      var countView =
                                        val2.wordCountNew +
                                        'w' +
                                        '/' +
                                        val2.pageCountNew +
                                        'p'
                                    } else {
                                      var countView = val2.wordCountNew + 'w'
                                    }

                                    // const search = (obj) =>
                                    //   obj.storyTitle === val2.storyTitle

                                    //読んだ本チェックEND
                                    return (
                                      <option
                                        selected={
                                          readingLevel == val2.readingLevel &&
                                          storyNum == val2.storyNum &&
                                          'selected'
                                        }
                                        value={val2.autoid}
                                      >
                                        {key2 + 1})&nbsp;
                                        {markBook == 'ok' && '[*]'}
                                        {countView}&nbsp;
                                        {/* {readingLevel == val2.readingLevel &&
                                        storyNum == val2.storyNum &&
                                        '[*]'} */}
                                        {val2.readingLevel}
                                        &nbsp;[
                                        {val2.bookTitle}]
                                        {/* &nbsp;[{val2.storyNum}
                                        ] */}
                                        &nbsp;
                                        {/* [ */}
                                        {val2.storyTitle}
                                        {/* ] */}
                                        &nbsp;
                                        {/* {wordCnt != '' && <>W:{wordCnt}</>}
                                        {pageCnt != '' && <>/P:{pageCnt}</>} */}
                                        {readingLevel == val2.readingLevel &&
                                          storyNum == val2.storyNum &&
                                          "********TODAY'S LESSON*********"}
                                      </option>
                                    )
                                  })}
                                </select>
                              </>
                            )}
                            &nbsp;
                            <select
                              disabled={checkedOneMoreMaincourse && 'disabled'}
                              onChange={(e) =>
                                setReadingHWAmount(e.target.value)
                              }
                              style={{ backgroundColor: '#fffacd' }}
                            >
                              <option
                                value="all"
                                selected={
                                  readingHWAmount == 'ALL' && 'selected'
                                }
                              >
                                全体(All)
                              </option>
                              <option
                                value="first half"
                                selected={
                                  readingHWAmount == 'first half' && 'selected'
                                }
                              >
                                前半(first half)
                              </option>
                              <option
                                value="second half"
                                selected={
                                  readingHWAmount == 'second half' && 'selected'
                                }
                              >
                                後半(second half)
                              </option>
                            </select>
                            {selectedReadingTextbook == 'CourseZ' ||
                              (todayHwReadingCourseName == 'CourseZ' && (
                                <>
                                  <br />
                                  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                  &nbsp;&nbsp;&nbsp;
                                  <span style={{ fontSize: '12px' }}>
                                    [*]&nbsp;Completed stories will be marked
                                    with this symbol.
                                  </span>
                                  <p
                                    style={{
                                      color: 'black',
                                      fontSize: '15px',
                                      backgroundColor: 'yellow',
                                      padding: '5px',
                                    }}
                                  >
                                    When there are about two lessons remaining
                                    in the current textbook, it is time to order
                                    the next one. Adjusting the reading level is
                                    left to the teacher’s discretion, but if
                                    you're unsure, please contact the
                                    administrative office. If you wish to change
                                    the type of textbook, be sure to discuss it
                                    with the student first and then contact the
                                    office. (*Exception: Oxford Reading Tree
                                    textbooks are e-books, so there is no need
                                    to order them.)
                                  </p>
                                </>
                              ))}
                            {selectedReadingTextbook == 'CourseA' ||
                              (todayHwReadingCourseName == 'CourseA' && (
                                <>
                                  <br />
                                  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                  &nbsp;&nbsp;&nbsp;
                                  <span style={{ fontSize: '12px' }}>
                                    [*]&nbsp;Completed stories will be marked
                                    with this symbol.
                                  </span>
                                  <p
                                    style={{
                                      color: 'black',
                                      fontSize: '13px',
                                      backgroundColor: 'yellow',
                                    }}
                                  >
                                    When there are about two lessons remaining
                                    in the current textbook, it is time to order
                                    the next one. Adjusting the reading level is
                                    left to the teacher’s discretion, but if
                                    you're unsure, please contact the
                                    administrative office. If you wish to change
                                    the type of textbook, be sure to discuss it
                                    with the student first and then contact the
                                    office. (*Exception: Oxford Reading Tree
                                    textbooks are e-books, so there is no need
                                    to order them.)
                                  </p>
                                </>
                              ))}
                            {selectedReadingTextbook == 'CourseB' ||
                              (todayHwReadingCourseName == 'CourseB' && (
                                <>
                                  <br />
                                  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                  &nbsp;&nbsp;&nbsp;
                                  <span style={{ fontSize: '12px' }}>
                                    [*]&nbsp;読み終わった本
                                  </span>
                                  <p
                                    style={{
                                      color: 'black',
                                      fontSize: '13px',
                                      backgroundColor: 'yellow',
                                    }}
                                  >
                                    When there are about two lessons remaining
                                    in the current textbook, it is time to order
                                    the next one. Adjusting the reading level is
                                    left to the teacher’s discretion, but if
                                    you're unsure, please contact the
                                    administrative office. If you wish to change
                                    the type of textbook, be sure to discuss it
                                    with the student first and then contact the
                                    office. (*Exception: Oxford Reading Tree
                                    textbooks are e-books, so there is no need
                                    to order them.)
                                  </p>
                                </>
                              ))}
                          </td>
                          <td rowSpan="2">
                            <span
                              className="btn btn-outline-primary"
                              style={{ cursor: 'pointer', fontSize: '15px' }}
                              onClick={() => {
                                setViewMyReadingHistory(!viewMyReadingHistory)
                                handleViewMyReadingHistory(mainCourseName)
                              }}
                            >
                              Student's Reading Level History
                            </span>
                            <p style={{ color: 'red', fontSize: '14px' }}>
                              You can only view the history of when the reading
                              level changed. Please check the story list to see
                              the books this student has read so far.
                            </p>
                            <div
                              style={{
                                width: '100%',
                                display: viewMyReadingHistory
                                  ? 'block'
                                  : 'none',
                              }}
                            >
                              {viewMyReadingHistoryList?.map((val, key) => {
                                return (
                                  <>
                                    <p style={{ fontSize: '13px' }}>
                                      {/* <strong>[{key + 1}]</strong>&nbsp; */}
                                      <b>[{val.regdate}]</b>
                                      &nbsp; [{val.bookTitle}]&nbsp;
                                      {val.seriesName}/{val.readingLevel}
                                    </p>
                                  </>
                                )
                              })}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              disabled={checkedOneMoreMaincourse && 'disabled'}
                              type="checkbox"
                              onClick={() => {
                                // setCheckedSetTextbook(!checkedSetTextbook)
                                setCheckedSetReadingLevel(
                                  !checkedSetReadingLevel
                                )
                              }}
                              style={{
                                width: '19px',
                                height: '19px',
                                verticalAlign: 'sub',
                              }}
                            />
                            &nbsp;
                            <span style={{ color: 'red' }}>
                              Reading Level Change
                            </span>
                            <div
                              className="pt-0 mt-0"
                              style={{
                                display: checkedSetReadingLevel
                                  ? 'block'
                                  : 'none',
                              }}
                            >
                              <select
                                disabled={
                                  checkedOneMoreMaincourse ||
                                  (!checkedSetReadingLevel && 'disabled')
                                }
                                style={{ width: '250px' }}
                                onChange={(e) => {
                                  setSelectedReadingLevel(e.target.value)
                                  setSelectedMainCourseHW()
                                  // getReadingInfo(,selectedReadingLevel)
                                  getFirstAutoidByReadingLevel(
                                    selectedReadingTextbook,
                                    e.target.value
                                  )
                                  changeReadingLevel(
                                    e.target.value,
                                    mainCourseName
                                  )
                                }}
                              >
                                <option>===Level Change===</option>
                                {readingAllLevelInfo?.map((val2, key2) => {
                                  return (
                                    <option
                                      selected={
                                        todayHwReadingLevel ==
                                          val2.readingLevel &&
                                        // selectedReadingTextbook == '' &&
                                        // selectedReadingLevel == '' &&
                                        'selected'
                                      }
                                      value={val2.readingLevel}
                                    >
                                      {todayHwReadingLevel ==
                                        val2.readingLevel && '*'}
                                      {val2.seriesName} [{val2.readingLevel}]
                                    </option>
                                  )
                                })}
                              </select>
                              <h5
                                className="mt-3"
                                style={{ color: 'green', fontSize: '15px' }}
                              >
                                教材レベルを変更する際は、生徒に必ずお知らせください。
                              </h5>
                            </div>
                          </td>
                          <td scope="col">
                            <input
                              disabled={checkedOneMoreMaincourse && 'disabled'}
                              type="checkbox"
                              onClick={() => {
                                setCheckedSetTextbook(!checkedSetTextbook)
                                // setCheckedSetReadingLevel(true)
                              }}
                              style={{
                                width: '19px',
                                height: '19px',
                                verticalAlign: 'sub',
                              }}
                            />
                            &nbsp;
                            <span style={{ color: 'red' }}>
                              Textbook Change
                            </span>
                            <div
                              className="pt-0 mt-0"
                              style={{
                                display: checkedSetTextbook ? 'block' : 'none',
                              }}
                            >
                              <select
                                disabled={
                                  checkedOneMoreMaincourse ||
                                  (!checkedSetTextbook && 'disabled')
                                }
                                onChange={(e) => {
                                  setSelectedReadingTextbook(e.target.value)
                                  changeReadingTextbook(e.target.value)
                                }}
                              >
                                {dataMemberSetInfo?.map((val2, key2) => {
                                  return (
                                    <>
                                      <option
                                        value="Reading Triumphs"
                                        selected={
                                          val2.textbookName ==
                                            'Reading Triumphs' && 'selected'
                                        }
                                      >
                                        {todayHwReadingTextBook ==
                                          'Reading Triumphs' && '*'}
                                        Reading Triumphs
                                      </option>
                                      {/* // )} */}

                                      <option
                                        value="Blackcat Series"
                                        selected={
                                          val2.textbookName ==
                                            'Blackcat Series' && 'selected'
                                        }
                                      >
                                        {todayHwReadingTextBook ==
                                          'Blackcat Series' && '*'}
                                        Blackcat Series
                                      </option>
                                      <option
                                        value="Oxford Reading Tree"
                                        selected={
                                          val2.textbookName ==
                                            'Oxford Reading Tree' && 'selected'
                                        }
                                      >
                                        {todayHwReadingTextBook ==
                                          'Oxford Reading Tree' && '*'}
                                        Oxford Reading Tree
                                      </option>
                                    </>
                                  )
                                })}
                              </select>
                              <br />
                              <h5
                                className="mt-3"
                                style={{ color: 'green', fontSize: '15px' }}
                              >
                                教材変更後にはレベルの変更と課題の変更を必ず一緒におこなって下さい。そうしない場合は、必ず元の教材を選択して元に戻して下さい。
                              </h5>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}

                  {shadowingMaterial && shadowingMaterial == 'BOOK' && (
                    <table
                      className="table table-bordered mt-5"
                      style={{
                        width: '90%',
                        border: '10px solid #dedede',
                        borderRadius: '10px',
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            rowSpan="3"
                            style={{
                              textAlign: 'left',
                              verticalAlign: 'middle',
                              width: '12%',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '20px',
                                verticalAlign: 'middle',
                                fontWeight: '900',
                              }}
                            >
                              BOOK SHADOWING
                            </span>{' '}
                            <table className="table p-0 m-0">
                              <tr className="p-0 m-0">
                                <td style={{ padding: 0, margin: 0 }}>
                                  {' '}
                                  <span
                                    className="mr-5"
                                    style={{ fontWeight: 'bold' }}
                                  >
                                    Dictation:&nbsp;{dictationStart}
                                  </span>
                                  <br />
                                  {(dictationSt == 'ok' ||
                                    dictationStart == 'ok') && (
                                    <span
                                      className="mr-5"
                                      style={{ fontWeight: 'bold' }}
                                    >
                                      Length:{dictationSecond}
                                    </span>
                                  )}
                                </td>
                                <td
                                  style={{
                                    width: '30%',
                                    padding: 0,
                                    margin: 0,
                                    fontSize: '12px',
                                    color: 'green',
                                    textAlign: 'left',
                                  }}
                                >
                                  Change the length of dictation assignment on
                                  the Shadowing page when necessary.
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <input
                              type="checkbox"
                              onClick={() => {
                                setCheckedOneMoreShadowing(
                                  !checkedOneMoreShadowing
                                )
                                setWhySameShadowingReason()
                                setWhySameShadowingReasonDetail()
                                dbShadowingDataInfo()
                              }}
                              style={{
                                width: '19px',
                                height: '19px',
                                verticalAlign: 'sub',
                              }}
                              selected={checkedOneMoreShadowing && 'selected'}
                            />{' '}
                            Set the same video as the task one more time
                            {/* <br />
                          setWhySameShadowingReason:{whySameShadowingReason} */}
                            &nbsp;{' '}
                             
                            <span
                              style={{
                                display: checkedOneMoreShadowing
                                  ? 'block'
                                  : 'none',
                              }}
                            >
                              <select
                                onChange={(e) => {
                                  setWhySameShadowingReason(e.target.value)
                                }}
                                disabled={
                                  !checkedOneMoreShadowing && 'disabled'
                                }
                                style={{
                                  height: '30px',
                                  width: '100%',
                                  border: '1px solid',
                                  fontSize: '12px',
                                }}
                              >
                                <option selected="selected">
                                  ====Select Reason====
                                </option>

                                <option value=" ただの練習不足">
                                  ただの練習不足(Not practicing enough)
                                </option>
                                <option value="振替によりレッスン日の間隔が短くなったため練習日数不足">
                                  振替によりレッスン日の間隔が短くなったため練習日数不足(Not
                                  enough days to practice due to the shorter
                                  time span in between lessons after make-up
                                  lesson.)
                                </option>
                                <option value="旅行や学校行事などの特別な行事により練習できる日数不足">
                                  旅行や学校行事などの特別な行事により練習できる日数不足(Not
                                  enough days to practice due to a special event
                                  such as a family trip and school events.)
                                </option>
                                <option value="病気や緊急の事情により練習ができない状況だったため">
                                  病気や緊急の事情により練習ができない状況だったため(Not
                                  being able to practice due to sickness and
                                  other emergency situations.)
                                </option>
                                <option value="others">
                                  Others (Please enter texts)
                                </option>
                              </select>
                              &nbsp;
                              <input
                                type="text"
                                onChange={(e) => {
                                  setWhySameShadowingReasonDetail(
                                    e.target.value
                                  )
                                }}
                                disabled={whySameShadowingReason != 'others'}
                                style={{ width: '400px' }}
                              />
                            </span>
                            <p className="pt-1"></p>
                          </td>
                        </tr>

                        <tr>
                          <td scope="row">
                            <input
                              type="checkbox"
                              onClick={() => {
                                setCheckedSetShadowingLevel(
                                  !checkedSetShadowingLevel
                                )
                              }}
                              style={{
                                width: '19px',
                                height: '19px',
                                verticalAlign: 'sub',
                              }}
                              disabled={checkedOneMoreShadowing && 'disabled'}
                            />
                            &nbsp;
                            <span style={{ color: 'red' }}> Level Change</span>
                            <div
                              className="pt-0 mt-0"
                              style={{
                                display: checkedSetShadowingLevel
                                  ? 'block'
                                  : 'none',
                              }}
                            >
                              {' '}
                              <select
                                disabled={
                                  (checkedOneMoreShadowing ||
                                    !checkedSetShadowingLevel) &&
                                  'disabled'
                                }
                                style={{ width: '250px' }}
                                onChange={(e) => {
                                  setSelectedShadowingLevel(e.target.value)
                                  changeBookShadowingLevel(e.target.value)
                                }}
                              >
                                {' '}
                                <option>===Book Level/Series Change===</option>
                                {shadowingBookLevelInfo?.map((val2, key2) => {
                                  var thisValue =
                                    val2.shadowingLevel + '/' + val2.seriesName
                                  return (
                                    <option
                                      selected={
                                        shadowingLevel == val2.shadowingLevel &&
                                        'selected'
                                      }
                                      // value={val2.shadowingLevel}
                                      value={thisValue}
                                    >
                                      {shadowingLevel == val2.shadowingLevel &&
                                        '*'}{' '}
                                      [{val2.shadowingLevel}
                                      ]&nbsp;[{val2.seriesName}]&nbsp;
                                      {val2.bookTitle}
                                    </option>
                                  )
                                })}
                              </select>
                              <h5
                                className="mt-3"
                                style={{ color: 'green', fontSize: '15px' }}
                              >
                                レベルを変更する際は、生徒にお知らせください。
                              </h5>
                            </div>
                          </td>
                          <td style={{ width: '33%' }}>
                            <span style={{ color: 'red' }}>Book Shadowing</span>
                            <select
                              disabled={checkedOneMoreShadowing && 'disabled'}
                              style={{ width: '50%' }}
                              onChange={(e) => {
                                setSelectedShadowingHW(e.target.value)
                              }}
                            >
                              {shadowingBookListInfo?.map((val2, key2) => {
                                return (
                                  <option
                                    selected={
                                      shadowingLevel == val2.shadowingLevel &&
                                      shadowSeriesName == val2.seriesName &&
                                      shadowBookTitle == val2.bookTitle &&
                                      shadowBookNum == val2.bookNum &&
                                      shadowStoryNum == val2.storyNum &&
                                      'selected'
                                    }
                                    value={val2.autoid}
                                  >
                                    [{val2.autoid}]
                                    {shadowingLevel == val2.shadowingLevel &&
                                      shadowSeriesName == val2.seriesName &&
                                      shadowBookTitle == val2.bookTitle &&
                                      shadowBookNum == val2.bookNum &&
                                      shadowStoryNum == val2.storyNum &&
                                      '*'}
                                    &nbsp;[{val2.bookNum}-{val2.storyNum}
                                    ]&nbsp; [{val2.shadowingLevel}]&nbsp;
                                    {val2.seriesName}&nbsp;|&nbsp;
                                    {val2.bookTitle}
                                    {shadowingLevel == val2.shadowingLevel &&
                                      shadowSeriesName == val2.seriesName &&
                                      shadowBookTitle == val2.bookTitle &&
                                      shadowBookNum == val2.bookNum &&
                                      shadowStoryNum == val2.storyNum &&
                                      "********TODAY'S LESSON*********"}
                                  </option>
                                )
                              })}
                            </select>
                            &nbsp; &nbsp;
                            <select
                              onChange={(e) => {
                                setShadowingHWAmount(e.target.value)
                              }}
                              disabled={checkedOneMoreShadowing && 'disabled'}
                            >
                              <option
                                value="ALL"
                                selected={
                                  shadowingHWAmount == 'ALL' && 'selected'
                                }
                              >
                                全体(All)
                              </option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                  {/**VIDEO SHADOWING */}
                  {shadowingMaterial && shadowingMaterial == 'VIDEO' && (
                    <table
                      className="table table-bordered mt-5"
                      style={{
                        width: '90%',
                        border: '10px solid #dedede',
                        borderRadius: '10px',
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            rowSpan="3"
                            style={{
                              textAlign: 'center',
                              verticalAlign: 'middle',
                              width: '12%',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '20px',
                                verticalAlign: 'middle',
                                fontWeight: '900',
                              }}
                            >
                              SHADOWING
                            </span>{' '}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <input
                              type="checkbox"
                              onClick={() => {
                                setCheckedOneMoreShadowing(
                                  !checkedOneMoreShadowing
                                )
                                setWhySameShadowingReason()
                                setWhySameShadowingReasonDetail()
                                dbShadowingDataInfo()
                              }}
                              style={{
                                width: '19px',
                                height: '19px',
                                verticalAlign: 'sub',
                              }}
                              selected={checkedOneMoreShadowing && 'selected'}
                            />{' '}
                            SET THE SAME VIDEO ONE MORE TIME &nbsp;{' '}
                             <p
                                    style={{
                                      color: 'black',
                                      fontSize: '16px',
                                      backgroundColor: 'yellow',
                                      padding: '5px',
                                    }}
                                  >
                                   Students who have not reached the reading level below will keep working on the BASIC SHADOWING level.
Please do not give them Dictation tasks yet.
Instead, give them a copying task using the reading material.　<br/>Students who can do the Shadowing Dictation task should be set to PRE-INTERMEDIATE level or higher.
If you don’t understand this, feel free to contact us on LINE support.<br/>
                                   ⭕️Oxford Reading Tree: Level5<br/>
                                   ⭕️Reading Triumphs: G2-2<br/>
                                   ⭕️Blackcat Series: A2_Step1

                                  </p>
                            <span
                              style={{
                                display: checkedOneMoreShadowing
                                  ? 'block'
                                  : 'none',
                              }}
                            >
                              <select
                                onChange={(e) => {
                                  setWhySameShadowingReason(e.target.value)
                                }}
                                disabled={
                                  !checkedOneMoreShadowing && 'disabled'
                                }
                                style={{
                                  height: '30px',
                                  width: '100%',
                                  border: '1px solid',
                                  fontSize: '12px',
                                }}
                              >
                                <option selected="selected">
                                  ====Select Reason====
                                </option>

                                <option value=" ただの練習不足">
                                  ただの練習不足(Not practicing enough)
                                </option>
                                <option value="振替によりレッスン日の間隔が短くなったため練習日数不足">
                                  振替によりレッスン日の間隔が短くなったため練習日数不足(Not
                                  enough days to practice due to the shorter
                                  time span in between lessons after make-up
                                  lesson.)
                                </option>
                                <option value="旅行や学校行事などの特別な行事により練習できる日数不足">
                                  旅行や学校行事などの特別な行事により練習できる日数不足(Not
                                  enough days to practice due to a special event
                                  such as a family trip and school events.)
                                </option>
                                <option value="病気や緊急の事情により練習ができない状況だったため">
                                  病気や緊急の事情により練習ができない状況だったため(Not
                                  being able to practice due to sickness and
                                  other emergency situations.)
                                </option>
                                <option value="others">
                                  Others (Please enter texts)
                                </option>
                              </select>
                              &nbsp;
                              <input
                                type="text"
                                onChange={(e) => {
                                  setWhySameShadowingReasonDetail(
                                    e.target.value
                                  )
                                }}
                                disabled={whySameShadowingReason != 'others'}
                                style={{ width: '400px' }}
                              />
                            </span>
                            <p className="pt-1"></p>
                            <span style={{ color: 'red' }}>Video</span>
                            &nbsp;
                            <select
                              disabled={checkedOneMoreShadowing && 'disabled'}
                              style={{ width: '50%' }}
                              onChange={(e) => {
                                setSelectedShadowingHW(e.target.value)
                              }}
                            >
                              {shadowingListInfo?.map((val2, key2) => {
                                return (
                                  <option
                                    selected={
                                      shadowingLevel == val2.shadowingLevel &&
                                      movieNum == val2.movieNum &&
                                      youtubeURL == val2.youtubeURL &&
                                      'selected'
                                    }
                                    value={val2.autoid}
                                  >
                                    {shadowingLevel == val2.shadowingLevel &&
                                      movieNum == val2.movieNum &&
                                      youtubeURL == val2.youtubeURL &&
                                      '*'}
                                    &nbsp;[{key2 + 1}]&nbsp;
                                    {val2.shadowingLevel}&nbsp;|&nbsp;
                                    {val2.shadowingTitle}
                                    {shadowingLevel == val2.shadowingLevel &&
                                      movieNum == val2.movieNum &&
                                      youtubeURL == val2.youtubeURL &&
                                      "********TODAY'S LESSON*********"}
                                  </option>
                                )
                              })}
                            </select>
                            &nbsp;
                            {/* <br />
                            shadowingHWAmount:{shadowingHWAmount} */}
                            &nbsp;
                            

                            <select
                           
                              onChange={(e) => {
                                setShadowingHWAmount(e.target.value)
                              }}
                              disabled={checkedOneMoreShadowing && 'disabled'}
                            >
                              <option
                                value="ALL"
                                selected={
                                  shadowingHWAmount == 'ALL' && 'selected'
                                }
                              >
                                全体(All)
                              </option>
                              <option
                                value="first half"
                                selected={
                                  shadowingHWAmount == 'first half' &&
                                  'selected'
                                }
                              >
                                前半[first half]
                              </option>
                              <option
                                value="second half"
                                selected={
                                  shadowingHWAmount == 'second half' &&
                                  'selected'
                                }
                              >
                                後半[second half]
                              </option>
{/*                          
                               <option
                                value=" 最初〜1分前後まで[From the start to about 1 minute]"
                                selected={
                                  shadowingHWAmount == ' 最初〜1分前後まで[From the start to about 1 minute]' &&
                                  'selected'
                                }
                              >
                                最初〜1分前後まで[From the start to about 1 minute]
                              </option>

                               <option
                                value="1分〜2分前後まで[From 1 minute to about 2 minutes]"
                                selected={
                                  shadowingHWAmount == '1分〜2分前後まで[From 1 minute to about 2 minutes]' &&
                                  'selected'
                                }
                              >
                                1分〜2分前後まで[From 1 minute to about 2 minutes]
                              </option>

                                 <option
                                value="2分〜3分前後まで[From 2 minute to about 3 minutes]"
                                selected={
                                  shadowingHWAmount == '2分〜3分前後まで[From 2 minute to about 3 minutes]' &&
                                  'selected'
                                }
                              >
                                2分〜3分前後まで[From 2 minute to about 3 minutes]
                              </option>
                                    <option
                                value="3分〜4分前後まで[From 3 minute to about 4 minutes]"
                                selected={
                                  shadowingHWAmount == '3分〜4分前後まで[From 3 minute to about 4 minutes]' &&
                                  'selected'
                                }
                              >
                                3分〜4分前後まで[From 3 minute to about 4 minutes]
                              </option>

                                   <option
                                value="4分〜最後[From 4 minute to the end]"
                                selected={
                                  shadowingHWAmount == '4分〜最後[From 4 minute to the end]' &&
                                  'selected'
                                }
                              >
                                4分〜最後[From 4 minute to the end]
                              </option> */}
                            </select>
                          </td>
                        </tr>

                        <tr>
                          <td scope="row">
                            <input
                              type="checkbox"
                              onClick={() => {
                                setCheckedSetShadowingLevel(
                                  !checkedSetShadowingLevel
                                )
                              }}
                              style={{
                                width: '19px',
                                height: '19px',
                                verticalAlign: 'sub',
                              }}
                              disabled={checkedOneMoreShadowing && 'disabled'}
                            />
                            &nbsp;
                            <span style={{ color: 'red' }}>
                              {' '}
                              Shadowing Level Change
                            </span>
                            <div
                              className="pt-0 mt-0"
                              style={{
                                display: checkedSetShadowingLevel
                                  ? 'block'
                                  : 'none',
                              }}
                            >
                              <select
                                disabled={
                                  (checkedOneMoreShadowing ||
                                    !checkedSetShadowingLevel) &&
                                  'disabled'
                                }
                                style={{ width: '250px' }}
                                onChange={(e) => {
                                  setSelectedShadowingLevel(e.target.value)
                                  changeShadowingLevel(e.target.value)
                                }}
                              >
                                {' '}
                                <option>===Level Change===</option>
                                {shadowingLevelInfo?.map((val2, key2) => {
                                  return (
                                    <option
                                      selected={
                                        shadowingLevel == val2.shadowingLevel &&
                                        'selected'
                                      }
                                      value={val2.shadowingLevel}
                                    >
                                      {shadowingLevel == val2.shadowingLevel &&
                                        '*'}{' '}
                                      Shadowing [{val2.shadowingLevel}]
                                    </option>
                                  )
                                })}
                              </select>
                              <h5
                                className="mt-3"
                                style={{ color: 'green', fontSize: '15px' }}
                              >
                                シャドーイングのレベルを変更する際は、生徒にお知らせください。
                              </h5>
                            </div>
                          </td>
                          <td style={{ width: '33%' }}>&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  )}

                  {mainSubject == 'READING' && (
                    <table
                      className="table table-bordered mt-5"
                      style={{
                        width: '90%',
                        border: '10px solid #dedede',
                        borderRadius: '10px',
                      }}
                    >
                      <tbody>
                        <tr>
                          <td style={{ textAlign: 'center' }}>
                            <span
                              style={{
                                fontSize: '20px',
                                verticalAlign: 'middle',
                                fontWeight: '900',
                              }}
                            >
                              PHONICS
                            </span>
                            <p>
                              Please choose the section to cover in the next
                              lesson.
                            </p>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {' '}
                            <span
                              style={{
                                fontSize: '20px',
                                verticalAlign: 'middle',
                                fontWeight: '900',
                              }}
                            >
                              QUESTIONS-
                            </span>
                            <p>
                              Please choose the section to cover in the next
                              lesson.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <td style={{ width: '50%', textAlign: 'center' }}>
                            {/* {selectedPhonicsHW} */}
                            {/* selectedPhonicsHW:{selectedPhonicsHW} */}
                            <select
                              style={{ width: '400px' }}
                              onChange={(e) => {
                                setSelectedPhonicsHW(e.target.value)
                              }}
                            >
                              {phonicsBigCourse == '' ? (
                                // <option>レッスン終了</option>
                                <></>
                              ) : (
                                <option>Select Lesson</option>
                              )}
                              {phonicsListInfo?.map((val2, key2) => {
                                return (
                                  <>
                                    <option
                                      selected={
                                        phonicsLessonOrder ==
                                          val2.lessonOrder && 'selected'
                                      }
                                      value={val2.autoid}
                                    >
                                      {phonicsLessonOrder == val2.lessonOrder &&
                                        '*'}
                                      &nbsp;{val2.lessonOrder}&nbsp; &nbsp;[
                                      {val2.phonicsTitle}]
                                      {phonicsLessonOrder == val2.lessonOrder &&
                                        val2.lessonOrder != '3-1' &&
                                        "********TODAY'S LESSON*********"}
                                    </option>
                                  </>
                                )
                              })}
                            </select>{' '}
                          </td>
                          <td style={{ width: '50%', textAlign: 'center' }}>
                            {/* {selectedConversationHW} */}
                            {/* selectedConversationHW:{selectedConversationHW} */}
                            <select
                              style={{ width: '400px' }}
                              onChange={(e) => {
                                setSelectedConversationHW(e.target.value)
                              }}
                            >
                              {questionBigCourse == '' ? (
                                // <option>レッスン終了</option>
                                <></>
                              ) : (
                                <option>Select Lesson</option>
                              )}
                              {conversationListInfo?.map((val2, key2) => {
                                return (
                                  <option
                                    selected={
                                      questionLessonOrder == val2.lessonOrder &&
                                      'selected'
                                    }
                                    value={val2.autoid}
                                  >
                                    {questionLessonOrder == val2.lessonOrder &&
                                      '*'}
                                    &nbsp;[{val2.questionCourse}]
                                    {val2.lessonOrder}
                                    &nbsp; &nbsp;[
                                    {val2.lessonTitle}]
                                    {questionLessonOrder == val2.lessonOrder &&
                                      val2.lessonOrder != '3-1' &&
                                      "********TODAY'S LESSON*********"}
                                  </option>
                                )
                              })}
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                  <div className="row">
                    <div className="col-lg-6 col-md-12  pb-1">
                      Lesson Memo for Tutor
                      <br />
                      <TextareaAutosize
                        className="tour-step2 tour-step5 mb-3"
                        aria-label="minimum height"
                        minRows={2}
                        onChange={(e) => {
                          setlessonMemoOnlyTeacher(e.target.value)
                        }}
                        type="text"
                        style={{ width: '60%', verticalAlign: 'middle' }}
                        placeholder="This comment is only viewable to the tutor."
                      />
                      {/* <br />
                      lessonMemoOnlyTeacher: {lessonMemoOnlyTeacher} */}
                    </div>
                    <div className="col-lg-6 col-md-12  pb-1">
                      Message for Mom
                      <br />
                      <TextareaAutosize
                        className="tour-step2 tour-step5 mb-3"
                        aria-label="minimum height"
                        minRows={2}
                        onChange={(e) => {
                          setlessonMemoForMom(e.target.value)
                        }}
                        type="text"
                        style={{
                          width: '80%',
                          verticalAlign: 'middle',
                          backgroundColor: '#ffe4e1',
                        }}
                      />
                    </div>
                  </div>
                  {/* <p style={{ color: 'red' }}>
                    ＊課題設定は必ずレッスンが終わってから行って下さい。レッスンの途中で課題を設定するとレッスンページが次の課題に変わります。
                  </p> */}
                  <div className="container mb-5">
                    {/* <div
                      className="col-lg-6 col-md-12 pb-1"
                      style={{ textAlign: 'left' }}
                    >
                      <span
                        className="btn btn-primary mt-2 mb-5"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          saveNewHW('modify')
                        }}
                      >
                        <b>MODIFY LATEST H.W</b>
                        <br />
                        このボタンを押して次の課題を修正
                        /修正はここでやらない、別のページでやる
                      </span>
                    </div> */}
                    <div className="row" style={{ textAlign: 'center' }}>
                      <div
                        className="col-lg-4 col-md-12  pb-1"
                        style={{ textAlign: 'right' }}
                      >
                        <h1>
                          <span
                            className="btn btn-info mt-2 mb-3 mr-3"
                            style={{ fontSize: '25px', width: '90%' }}
                            onClick={() => {
                              setIsLeaveEarly(true)
                              // setNewLesson(true)
                              // setIsSetTheSameHW(true)
                            }}
                          >
                            <b>Leave Early</b>
                            <p
                              style={{
                                fontSize: '15px',
                                // fontWeight: 'bold',
                                color: 'white',
                              }}
                            >
                              {/* The student will not join this lesson. <br /> */}
                              生徒がレッスンに参加できないと管理者から連絡が来たら、素早くこのボタンを押して、退室する。
                              この場合同じ課題が設定されます。
                              <br />
                              Click, as soon as you are informed your student
                              will not show up in the lesson. By clicking this,
                              the same set of homework will be set once again.
                            </p>
                          </span>
                        </h1>
                      </div>

                      <div
                        className="col-lg-4 col-md-12  pb-1"
                        style={{ textAlign: 'right' }}
                      >
                        <h1>
                          <span
                            className="btn btn-warning mt-2 mb-3 mr-3"
                            style={{ fontSize: '25px', width: '90%' }}
                            onClick={() => {
                              setIsNoShow(true)
                              // setNewLesson(true)
                              // setIsSetTheSameHW(true)
                            }}
                          >
                            <b>No Show H.W</b>
                            <p
                              style={{
                                fontSize: '15px',
                                // fontWeight: 'bold',
                                color: '#555555',
                              }}
                            >
                              {/* The student didn't show up. <br /> */}
                              生徒が最後まで現れなく、先生がレッスン時間の最後(25分過ぎた時間)まで待機した場合、このボタンを押して、同じ課題を設定します。
                              <br />
                              Click, in case you waited for your student to show
                              up til the end of scheduled lesson time. By
                              clicking this, the same set of homework will be
                              set once again.
                            </p>
                          </span>
                        </h1>
                      </div>

                      {/* <div
                          className="col-lg-4 col-md-12  pb-1"
                          style={{ textAlign: 'center' }}
                        >
                          <h1>
                            <span
                              className="btn btn-danger mt-2 mb-3"
                              style={{ fontSize: '25px', width: '90%' }}
                              onClick={() => {
                                setIsSetTheSameHW(true)
                              }}
                            >
                              <b>SAME H.W SET</b>
                              <p
                                style={{
                                  fontSize: '15px',
                                  // fontWeight: 'bold',
                                  color: 'white',
                                }}
                              >
                                This lesson finished without any problems.
                                <br />
                                このボタンを押すと、
                                <br />
                                上記で変更があっても、反映されません。
                                <br />
                                現在の課題と同じ課題が設定されます。
                              </p>
                            </span>{' '}
                          </h1>
                        </div> */}
                      <div
                        className="col-lg-4 col-md-12  pb-1"
                        style={{ textAlign: 'left' }}
                      >
                        <h1>
                          <span
                            className="btn btn-primary mt-2 mb-3"
                            style={{ fontSize: '25px', width: '90%' }}
                            onClick={() => {
                              setIsFinishThisLesson(true)
                            }}
                          >
                            <b>NEW H.W SET</b>

                            <p
                              style={{
                                fontSize: '15px',
                                // fontWeight: 'bold',
                                color: 'white',
                              }}
                            >
                              {/* This lesson finished without any problems.
                              <br /> */}
                              上記で設定された通りに課題が設定されます。同じ課題を設定する場合その理由を必ず選択して下さい。
                              <br />
                              Click this to set new homework as selected above.
                              In case you set the same set of homework once
                              again, please make sure to indicate the reason.
                            </p>
                          </span>{' '}
                        </h1>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </center>
      {processingPopup && (
        <SweetAlert
          title="Please wait"
          onConfirm={() => {}}
          showConfirm={false}
        >
          Setting a new homework....
        </SweetAlert>
      )}
      <SweetAlert
        title="[NEW H.W] Press yes to set the new homework."
        show={isFinishThisLesson}
        // onConfirm={() => saveNewHW('new')}
        onConfirm={() => NextLessonDate('finished')}
        onCancel={() => {
          setIsFinishThisLesson(false)
        }}
        confirmBtnText="OK"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          課題設定は必ずレッスンが終わってから行って下さい。レッスンの途中で課題を設定するとレッスンページが次の課題に変わります。
        </p>
      </SweetAlert>
      <SweetAlert
        title="[MODIFY H.W] Press yes to modify the homework."
        show={isModifyThisLesson}
        onConfirm={() => NextLessonDate('modified')}
        onCancel={() => {
          setIsModifyThisLesson(false)
        }}
        confirmBtnText="OK"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      ></SweetAlert>
      <SweetAlert
        title="[No Show]"
        show={isNoShow}
        onConfirm={() => NextLessonDate('no-show')}
        onCancel={() => {
          setIsNoShow(false)
        }}
        confirmBtnText="OK"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        {' '}
        <p>
          生徒が連絡なしで最後まで現れなく、先生が最後まで待機した場合、このボタンを押します。同じ課題が設定されます。
        </p>
      </SweetAlert>
      <SweetAlert
        title="[Leave Early] Press yes to set the same homework"
        show={isLeaveEarly}
        onConfirm={() => NextLessonDate('leave-early')}
        onCancel={() => {
          setIsLeaveEarly(false)
        }}
        confirmBtnText="OK"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          生徒さんがレッスンに参加できないと管理者から連絡をもらった時に、素早くこのボタンを押して退室して下さい。
        </p>
      </SweetAlert>

      <SweetAlert
        title="Created a new homework successfully."
        show={isSuccessSetNewLesson}
        onConfirm={() => router.push('/tutor/upcoming?tbn=' + tbn)}
        // onConfirm={() => funcGoAfterSetUrl()}
        // onCancel={() => {
        //   setIsSuccessSetNewLesson(false)
        // }}
        confirmBtnText="OK"
        // cancelBtnText="No"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      ></SweetAlert>
      <SweetAlert
        title="Set successfully."
        show={isNoshowAndSuccessSetNewLesson}
        onConfirm={() => router.push('/tutor/upcoming?tbn=' + tbn)}
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
      <SweetAlert
        title="We are currently preparing this function."
        show={isNotReady}
        onConfirm={() => setIsNotReady(false)}
        onCancel={() => {
          setIsNotReady(false)
        }}
        confirmBtnText="OK"
        // cancelBtnText="戻る"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>近日中にサービス開始予定です。</p>
      </SweetAlert>
    </>
  )
}

export default ViewSetHW
