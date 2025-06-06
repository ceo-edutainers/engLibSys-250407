import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import TextareaAutosize from 'react-textarea-autosize'
import SweetAlert from 'react-bootstrap-sweetalert'
import { VALID_LOADERS } from 'next/dist/server/image-config'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import { FaEye } from 'react-icons/fa'
import BookZaikoInfo from '@/components/Output_ShowAndTell/BookZaikoInfo'
// const [homework_id, sethomework_id] = useState()

const ViewSetNoShadowing = ({
  mbn,
  name_eng,
  homework_id,
  tbn,
  teacher_name,
  subject,
  doShadowingForThisCourse,
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

  const [copyHW, setCopyHW] = useState()
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
  const [viewReadingLevel, setViewReadingLevel] = useState(false)

  const [dataShadowingInfo, setDataShadowingInfo] = useState([])
  const [readingListHistoryInfo, setReadingListHistoryInfo] = useState([])
  const [readingListInfo, setReadingListInfo] = useState([])
  const [readingAllLevelInfo, setReadingAllLevelInfo] = useState([])
  const [shadowingListInfo, setShadowingListInfo] = useState([])
  const [shadowingLevelInfo, setShadowingLevelInfo] = useState([])
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

  const [shadowingSpeed, setshadowingSpeed] = useState()
  const [dictationStart, setdictationStart] = useState()
  const [dictationSecond, setdictationSecond] = useState()

  const [newShadowingLevel, setNewShadowingLevel] = useState()
  const [newReadingLevel, setNewReadingLevel] = useState()
  // //無限ループしない
  // const bar2 = {}
  //SHADOWING INFO

  const [viewMyReadingHistory, setViewMyReadingHistory] = useState(false)

  useEffect(() => {
    dbMemberSetInfo()
  }, [])

  function dbMemberSetInfo() {
    // var subject = 'READING'

    var Url = DB_CONN_URL + '/get-member-set-info/' + mbn + '&' + subject
    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)
          if (response.data.length > 0) {
            // alert('dbMemberSetInfo')
            setDataMemberSetInfo(response.data)
            setTodayHwReadingTextBook(response.data[0].textbookName)
            setSelectedReadingTextbook(response.data[0].textbookName)
            setTodayHwReadingLevel(response.data[0].courseLevel)
            setSelectedReadingLevel(response.data[0].courseLevel)
            setTodayHwReadingCourseName(response.data[0].courseName)
            setTodayEnglibLevel(response.data[0].englibLevel)

            // setMainSubject(response.data[0].subject)

            //Get Reading Info
            var cN = response.data[0].courseName
            var rL = response.data[0].courseLevel //reading level

            // alert('courseName' + response.data[0].courseName)

            if (subject == 'READING') {
              getReadingInfo(cN, rL) //setReadingListInfo
              getReadingALlLevelInfo(cN, rL)
            }
            // getShadowingLevelInfo()

            // var phLO = response.data[0].phonicsLessonOrder
            // getPhonicsInfo(phLO)
            // getConversationInfo()
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData2()
  }

  useEffect(() => {
    dbMainDataInfo()
  }, [])

  function dbMainDataInfo() {
    // var subject = 'READING'
    var Url = DB_CONN_URL + '/get-hw-lesson/' + mbn + '&' + subject
    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)
          if (response.data.length > 0) {
            setDataInfo(response.data)

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
            setCopyHW(response.data[0].copyHW)

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

  // useEffect(() => {
  //   dbShadowingDataInfo()
  // }, [])

  function dbShadowingDataInfo() {
    // if (localStorage.getItem('T_loginStatus') == 'true') {

    var subject = 'SHADOWING'
    var Url = DB_CONN_URL + '/get-hw-lesson-shadowing/' + mbn + '&' + subject
    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)
          if (response.data.length > 0) {
            setDataShadowingInfo(response.data)
            sethw_page_start(response.data[0].storyStartPage)
            var shadowingM = response.data[0].material_sort
            if (shadowingM == 'BOOK') {
              //seriesName:English Power
              // bookTitle:Power Listening in English
              // bookNum:Section1
              // storyNum:Unit1
              // storyTitle:Conversation About Presentation Materials
              setShadowSeriesName(response.data[0].seriesName)
              setShadowBookTitle(response.data[0].bookTitle)
              setShadowBookNum(response.data[0].bookNum)
              setShadowStoryNum(response.data[0].storyNum)
              setShadowStoryTitle(response.data[0].storyTitle)
            } else if (shadowingM == 'VIDEO') {
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
              // getShadowingInfo(shL)
              setshadowingSpeed(response.data[0].shadowing_speed)
              setdictationStart(response.data[0].dictation_start)
              setdictationSecond(response.data[0].dictationSec)
              setShadowingHWAmount(response.data[0].shadowingHWAmount)
              setSelectedShadowingLevel(response.data[0].shadowingLevel)
            }
            setShadowingMaterial(response.data[0].material_sort)

            getShadowingHWAutoid(
              response.data[0].movieNum,
              response.data[0].youtubeURL
            )
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
    if (courseName.indexOf('CourseA') !== -1) {
      // var seriesName = 'Reading Triumphs'

      var mbn = localStorage.getItem('mbn')
      var Url =
        DB_CONN_URL + '/get-reading-history-RT/' + mbn + '&' + readingLevel
    } else if (courseName.indexOf('CourseB') !== -1) {
      // var seriesName = 'Blackcat Series'
      var mbn = localStorage.getItem('mbn')
      var Url =
        DB_CONN_URL + '/get-reading-history-BC/' + mbn + '&' + readingLevel
    } else if (courseName.indexOf('CourseZ') !== -1) {
      // var seriesName = 'Oxford Reading Tree'

      var mbn = localStorage.getItem('mbn')
      var Url =
        DB_CONN_URL + '/get-reading-history-ORT/' + mbn + '&' + readingLevel
    }
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)
          // alert('1')
          if (response.data.length > 0) {
            // alert(response.data.length)
            setReadingListHistoryInfo(response.data.response)
            console.log('setReadingListHistoryInfo', response.data.response)
            // alert('2')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  //この教材の全てのレベル
  function getReadingALlLevelInfo(cN, rL) {
    // var readingLevel = rL
    // var bookNum = bN
    // var storyNum = sN
    // var courseName = cN

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
            setReadingAllLevelInfo(response.data.response)
            // setCourseName(cN)
            getReadingInfo(cN, rL)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  //この教材の全てのレベル
  function getReadingALlLevelInfo2(cN) {
    // var readingLevel = rL
    // var bookNum = bN
    // var storyNum = sN
    // var courseName = cN
    // alert('getReadingALlLevelInfo2', cN)
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
            setReadingAllLevelInfo(response.data.response)
            // setCourseName(cN)
            // getReadingInfo(cN, rL)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  // //All Shadowing Info of this Series
  // function getShadowingLevelInfo() {
  //   // alert('shL' + shL)

  //   var Url = DB_CONN_URL + '/get-movie-shadowing-info-same-All-Level'
  //   // alert('Url:' + Url)

  //   const fetchData = async () => {
  //     try {
  //       axios.get(Url).then((response) => {
  //         // alert('length' + response.data.length)

  //         if (response.data.length > 0) {
  //           setShadowingLevelInfo(response.data.response)
  //         }
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData()
  // }

  //All Shadowing Info of this Series
  // function getShadowingInfo(shL) {
  //   // alert('shL' + shL)
  //   var shadowingLevel = shL
  //   var Url =
  //     DB_CONN_URL + '/get-movie-shadowing-info-same-level/' + shadowingLevel
  //   // alert('Url:' + Url)

  //   const fetchData = async () => {
  //     try {
  //       axios.get(Url).then((response) => {
  //         // alert('length' + response.data.length)

  //         if (response.data.length > 0) {
  //           setShadowingListInfo(response.data.response)
  //         }
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData()
  // }

  //All Grammar Book Info
  function getGrammarBookInfoStart(
    GSeriesName,
    GReadingLevel,
    GBookTitle,
    grLO
  ) {
    // alert('Phonics' + PhLO)
    var subject = 'GRAMMAR'
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
                console.log('setSelectedGrammarBookHW', val.autoid)
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
    var subject = 'GRAMMAR'
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
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setPhonicsListInfo(response.data.response)
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

  //教材変更
  function changeReadingTextbook(newTextBook) {
    if (newTextBook == 'Reading Triumphs') {
      var mcn = 'CourseA'
    } else if (newTextBook == 'Blackcat Series') {
      var mcn = 'CourseB'
    } else if (newTextBook == 'Oxford Reading Tree') {
      var mcn = 'CourseZ'
    }
    // setSelectedReadingTextbook(newTextBook)
    // setMainCourseName(mcn)
    // getReadingALlLevelInfo2(mcn)
    // setSelectedReadingLevel() //selected reading levelのValueを削除

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
    // alert('1' + newReadingLevel)
    // alert('2' + cN)
    // var rL = newReadingLevel
    // setNewReadingLevel(rL)

    // setSelectedReadingLevel(rL)
    // getReadingInfo(cN, rL)
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

  function handleViewMyReadingHistory(courseName) {
    var url = DB_CONN_URL + '/get-my-reading-history-info/'
    var Url = url + mbn + '&' + courseName
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setViewMyReadingHistoryList(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function NextLessonDate(sort) {
    setIsFinishThisLesson(false)
    setIsLeaveEarly(false)
    setIsNoShow(false)
    setIsModifyThisLesson(false)
    // alert(subject)
    var mainSubject = subject
    var Url = DB_CONN_URL + '/NEXT-LESSON-DATE-FOR-EVERYWEEK'

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
    var nn = nextLessonDate
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

    // if (checkedOneMoreShadowing == true) {
    //   var oneMoreShadowing = 'ok'
    //   // alert('checkedOneMoreShadowing' + checkedOneMoreShadowing)
    // } else {
    //   // alert('checkedOneMoreShadowing' + checkedOneMoreShadowing)
    //   var oneMoreShadowing = 'no'
    // }

    if (selectedReadingTextbook == 'Reading Triumphs') {
      var newMainCourse = 'CourseA'
    } else if (selectedReadingTextbook == 'Blackcat Series') {
      var newMainCourse = 'CourseB'
    } else if (selectedReadingTextbook == 'Oxford Reading Tree') {
      var newMainCourse = 'CourseZ'
    }

    var main_course_subject = subject //READING,GRAMMAR,SCHOOL ENGLISH...
    var url = DB_CONN_URL

    var url = url + '/HW-SET-NEW-READING-NO-SHADOWING'

    // console.log('nextLessonDate', nextLessonDate)
    // console.log('homeworkIdMaincourse', homeworkIdMaincourse)
    // console.log('sort', sort)
    // console.log('mbn', mbn)
    // console.log('name_eng', name_eng)
    // console.log('copyHW', copyHW)
    // console.log('main_course_subject', main_course_subject)
    // console.log('newMainCourse', newMainCourse)
    // console.log('oneMoreReading', oneMoreReading)
    // console.log('whySameReadingReason', whySameReadingReason)
    // console.log('whySameReadingReasonDetail', whySameReadingReasonDetail)
    // console.log('selectedMainCourseHW', selectedMainCourseHW)
    // console.log('selectedReadingTextbook', selectedReadingTextbook)
    // console.log('selectedReadingLevel', selectedReadingLevel)
    // alert('selectedReadingLevel' + selectedReadingLevel)

    // console.log('readingHWAmount', readingHWAmount)
    // console.log('hw_page_start', hw_page_start)
    // console.log('hw_page_end', hw_page_end)
    // console.log('selectedPhonicsHW', selectedPhonicsHW)
    // console.log('selectedConversationHW', selectedConversationHW)
    // console.log('lessonMemoOnlyTeacher', lessonMemoOnlyTeacher)

    const fetchData = async () => {
      try {
        axios
          .post(url, {
            doShadowingForThisCourse: doShadowingForThisCourse,
            nextLessonDate: nextLessonDate,
            homeworkIdMaincourse: homeworkIdMaincourse,
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
            selectedPhonicsHW: selectedPhonicsHW,
            selectedConversationHW: selectedConversationHW,
            lessonMemoOnlyTeacher: lessonMemoOnlyTeacher, //undefined
            lessonMemoForMom: lessonMemoForMom,
          })
          .then((response) => {
            alert(response.data.message)

            setIsSuccessSetNewLesson(true)
          })
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
    fetchData()
  }

  //GRAMMAR,SCHOOL ENGLISH
  function saveNewHWSupport(nextLessonDate, sort) {
    // alert(nn)
    //sort: new or modify
    // alert(nextLessonDate)
    setIsFinishThisLesson(false)

    ////START undefined 設定////////////////////
    //////////////////////////////////////////

    // if (checkedOneMoreShadowing == true) {
    //   var oneMoreShadowing = 'ok'
    //   // alert('checkedOneMoreShadowing' + checkedOneMoreShadowing)
    // } else {
    //   // alert('checkedOneMoreShadowing' + checkedOneMoreShadowing)
    //   var oneMoreShadowing = 'no'
    // }

    var main_course_subject = subject //READING,GRAMMAR,SCHOOL ENGLISH...
    if (main_course_subject == 'GRAMMAR') {
      var newMainCourse = 'CourseGR'
    } else if (main_course_subject == 'SCHOOL ENGLISH') {
      var newMainCourse = 'CourseSE'
    }

    var url = DB_CONN_URL
    if (
      sort == 'finished' ||
      sort == 'no-show' ||
      sort == 'leave-early' ||
      sort == 'modified'
    ) {
      var url = url + '/HW-SET-NEW-GRAMMAR-NO-SHADOWING'
    }
    // alert('grammarUrl' + url)
    // console.log('nextLessonDate', nextLessonDate)
    // console.log('homeworkIdMaincourse', homeworkIdMaincourse)
    // console.log('sort', sort)
    // console.log('mbn', mbn)
    // console.log('name_eng', name_eng)
    // console.log('main_course_subject', main_course_subject)
    // console.log('newMainCourse', newMainCourse)

    // console.log('grammarBookTitle', grammarBookTitle)
    // console.log('grammarSupportListOrder', grammarSupportListOrder)
    // console.log('grammarStoryNum', grammarStoryNum)
    // console.log('grammarReadingLevel', grammarReadingLevel)
    // console.log('grammarSeriesName', grammarSeriesName)
    // console.log('selectedGrammarBookHW', selectedGrammarBookHW)
    // console.log('selectedGrammarBookHW2', selectedGrammarBookHW2)

    // //ALL
    // console.log('lessonMemoOnlyTeacher', lessonMemoOnlyTeacher)
    // console.log('lessonMemoForMom', lessonMemoForMom)
    // alert(url)

    const fetchData = async () => {
      try {
        axios
          .post(url, {
            doShadowingForThisCourse: doShadowingForThisCourse,
            nextLessonDate: nextLessonDate,
            homeworkIdMaincourse: homeworkIdMaincourse,
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
            lessonMemoOnlyTeacher: lessonMemoOnlyTeacher, //undefined
            lessonMemoForMom: lessonMemoForMom,
          })
          .then((response) => {
            // alert(response.data.message)
            setIsSuccessSetNewLesson(true)
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
                  HOMEWORK SETTING
                </h1>
                <h5> (No Shadowing)</h5>
                {/* <h1>doShadowingForThisCourse:{doShadowingForThisCourse}</h1> */}
                {/* <p
                  className="pb-0 mb-0"
                  style={{ color: 'red', fontSize: '13px' }}
                >
                  同じ課題は、練習ができてなくても2回までが課題設定制限となります。
                </p> */}

                {/* <h1 style={{ fontSize: '30px' }}>
              <input
                type="checkbox"
                onClick={() => {
                  setCheckedOneMoreAll(!checkedOneMoreAll)
                  setCheckedOneMoreMaincourse(true)
                  setCheckedOneMoreShadowing(true)
                  setCheckedOneMorePhonics(true)
                  setCheckedOneMoreQuestion(true)
                }}
                selected={checkedOneMoreAll && 'selected'}
                style={{
                  width: '40px',
                  height: '40px',
                  verticalAlign: 'sub',
                }}
              />
              &nbsp; 全て変更なし
            </h1>
            checkedOneMoreAll:&nbsp;
            {checkedOneMoreAll ? 'true' : 'false'}
            <br /> */}
              </div>
              <div className="col-lg-4 col-md-12">&nbsp;</div>
              <div className="col-lg-4 col-md-12">
                <span
                  className="btn btn-outline-danger mb-3"
                  onClick={() => {
                    setViewReadingLevel(!viewReadingLevel)
                  }}
                >
                  READING LEVEL INDEX
                </span>
              </div>
              <div
                className="col-lg-4 col-md-12 p-0 m-0"
                style={{ textAlign: 'right' }}
              >
                <span
                  className="btn btn-info mb-3"
                  onClick={() => {
                    setIsModifyThisLesson(true)
                  }}
                >
                  MODIFY H.W
                </span>
              </div>
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
                              {/* &nbsp;
                              <a href="#" target="_blank">
                                <span className="btn btn-secondary">
                                  Materials
                                </span>
                              </a> */}
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
                              {/* selectedGrammarBookHW:{selectedGrammarBookHW}
                              <br />
                              grammarSupportListOrder:{grammarSupportListOrder} */}
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
                                        &nbsp;Chapger{val2.listOrder}&nbsp;
                                        &nbsp;[
                                        {val2.Use}&nbsp;|&nbsp;{val2.Title}]
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
                              {/* selectedGrammarBookHW2:{selectedGrammarBookHW2}
                              <br />
                              grammarSupportListOrder2:
                              {grammarSupportListOrder2} */}
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
                                        &nbsp;Chapger{val2.listOrder}&nbsp;
                                        &nbsp;[
                                        {val2.Use}&nbsp;|&nbsp;{val2.Title}]
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
                            style={{ verticalAlign: 'middle', width: '12%' }}
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
                            {/* &nbsp;
                            <a href="#" target="_blank">
                              <span className="btn btn-secondary">
                                Materials
                              </span>
                            </a> */}
                            <hr />
                            <span className="mt-5">
                              Copy &nbsp;
                              <select
                                onChange={(e) => {
                                  setCopyHW(e.target.value)
                                  changeCopyHW(e.target.value)
                                }}
                              >
                                <option
                                  value="ok"
                                  selected={val.copyHW == 'ok' && 'selected'}
                                >
                                  OK
                                </option>
                                <option
                                  value="no"
                                  selected={val.copyHW == 'no' && 'selected'}
                                >
                                  NO
                                </option>
                              </select>
                              {/* {val.copyHW} */}
                            </span>
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
                            SET THE SAME STORY ONE MORE TIME
                            {/* <br />
                            setWhySameReadingReason:{whySameReadingReason} */}
                            &nbsp;{' '}
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
                              {/* <br />
                            setWhySameReadingReasonDetail:
                            {whySameReadingReasonDetail} */}
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
                                      {/* {readingLevel == val2.readingLevel &&
                                        storyNum == val2.storyNum &&
                                        '*'} */}
                                      {val2.readingLevel}&nbsp;[{val2.bookTitle}
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
                                        {markBook == 'ok' && '[*]'}
                                        {/* {readingLevel == val2.readingLevel &&
                                        storyNum == val2.storyNum &&
                                        '[*]'} */}
                                        {val2.readingLevel}&nbsp;[
                                        {val2.bookTitle}
                                        ]&nbsp;[{val2.storyNum}
                                        ]&nbsp;[
                                        {val2.storyTitle}]
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
                                All
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
                                    ORT本のリストは優しい順番です。&nbsp;[*]&nbsp;読み終わった本
                                  </span>
                                </>
                              ))}
                            {selectedReadingTextbook == 'CourseA' ||
                              (todayHwReadingCourseName == 'CourseA' && (
                                <>
                                  <br />
                                  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                  &nbsp;&nbsp;&nbsp;
                                  <span style={{ fontSize: '12px' }}>
                                    [*]&nbsp;読み終わった本
                                  </span>
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
                                </>
                              ))}
                            {/* &nbsp;
                            {readingHWAmount == 'second half' && (
                              <>
                                <input
                                  type="number"
                                  style={{ width: '60px' }}
                                  onChange={(e) => {
                                    sethw_page_start(e.target.value)
                                  }}
                                />
                                &nbsp; p 〜 ストーリの最後{' '}
                              </>
                            )}
                            {readingHWAmount == 'first half' && (
                              <>
                                &nbsp;<b>{hw_page_start}</b>p 〜
                                <input
                                  type="number"
                                  style={{ width: '60px' }}
                                  onChange={(e) => {
                                    sethw_page_end(e.target.value)
                                  }}
                                />
                                &nbsp; p
                              </>
                            )}{' '} */}
                            {/* <span
                              className="btn btn-danger ml-2"
                              onClick={() => {
                                setBookView(!bookView)
                              }}
                            >
                              <FaEye size="20" />
                              BOOK
                            </span>
                            <div
                              style={{
                                display: bookView ? 'block' : 'none',
                              }}
                            >

                            </div> */}
                            {/* <br />
                            readingHWAmount:{readingHWAmount} */}
                            {/* <br />
                            　###sethw_page_start
                            {hw_page_start}〜 ###sethw_page_end
                            {hw_page_end} */}
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
                            {/* <br />
                            selectedReadingTextbook：{selectedReadingTextbook} */}
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
                                      {/* {returnTodayInfo ? (
                                      <option
                                        value="Reading Triumphs"
                                        selected={
                                          returnTodayInfo &&
                                          todayHwReadingTextBook ==
                                            'Reading Triumphs' &&
                                          'selected'
                                        }
                                      >
                                        {todayHwReadingTextBook ==
                                          val2.textbookName && '*'}
                                        Reading Triumphs
                                      </option> */}
                                      {/* // ) : ( */}
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
                            <span style={{ color: 'red' }}>Level Change</span>
                            {/* 
                            selectedReadingTextbook：{selectedReadingTextbook}
                            <br /> */}
                            {/* <br />
                            selectedReadingLevel:{selectedReadingLevel} */}
                            <div
                              className="pt-0 mt-0"
                              style={{
                                display: checkedSetReadingLevel
                                  ? 'block'
                                  : 'none',
                              }}
                            >
                              {/* se:{selectedReadingLevel} */}
                              <select
                                //  disabled={
                                //     (checkedOneMoreMaincourse ||
                                //     !checkedSetTextbook) && 'disabled'
                                //   }

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
                                レベル変更後には課題の変更を必ず一緒におこなって下さい。そうしない場合は、必ず元のレベルを選択して元に戻して下さい。
                              </h5>
                            </div>
                          </td>
                          {/* <td
                            scope="col"
                            style={{
                              textAlign: 'left',
                              // verticalAlign: 'middle',
                            }}
                          >
                           
                          </td> */}
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
                            {/* <br />
                          <input
                            type="checkbox"
                            onClick={() => {
                              setCheckedOneMorePhonics(!checkedOneMorePhonics)
                            }}
                            selected={checkedOneMorePhonics && 'selected'}
                          />
                          変更なし */}
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
                              QUESTIONS
                            </span>
                            {/* <br />
                          <input
                            type="checkbox"
                            onClick={() => {
                              setCheckedOneMoreQuestion(!checkedOneMoreQuestion)
                            }}
                            selected={checkedOneMoreQuestion && 'selected'}
                          />
                          変更なし */}
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
                      Lesson Comment for Mom
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
                            <b>No Show</b>
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

export default ViewSetNoShadowing
