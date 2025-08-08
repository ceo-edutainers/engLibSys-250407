// CSS quiz_big_design.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MainMenu from '@/components/readingSelfcourse/MainMenuAll'
import Step1 from '@/components/readingSelfcourse/Step01'
import Step2 from '@/components/readingSelfcourse/Step02'
import Step3 from '@/components/readingSelfcourse/Step03'
import EndScreenSelf from '@/components/readingSelfcourse/EndScreenSelf'
import EndScreenLesson from '@/components/readingSelfcourse/EndScreenLesson'

import { QuizContext } from '@/components/readingSelfcourse/ContextsB'

import Router, { useRouter } from 'next/router'

function readingSelfCourseA() {
  const { query } = useRouter()
  const cN = query.cN //courseName
  const cS = query.cS //SELF
  const sB = query.sB //subject

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const [HWbookInfo, setHWbookInfo] = useState([]) //DBからHWのデータを持ってきて入れる
  const [audioDurtaionFromDB, setAudioDurtaionFromDB] = useState(0)

  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const [myMbn, setMyMbn] = useState('')
  const router = useRouter() //使い方：router.replace('/')

  const [firstStoryLink, setFirstStoryLink] = useState(null)

  //初期設定
  const [course, setCourse] = useState('Input Course')
  const [courseSelf, setCourseSelf] = useState(cS)
  const [courseName, setCourseName] = useState(cN) //self-CourseA, self-CourseB, self-CourseZ
  const [textbook, setTextbook] = useState()
  // const [textbook, setTextbook] = useState('Blackcat Series')
  //SUBJECT

  const [thisSubject, setThisSubject] = useState(sB)
  const [courseLevel, setCourseLevel] = useState('')
  // const [test_group, setTest_group] = useState('1') //同じレベルの中で何番目のテストなのか
  const [HWID, setHWID] = useState('') //homework_idを入れる
  const [practiceTempId, setPracticeTempId] = useState('')
  const [eikenLevel, setEikenLevel] = useState('')
  const [userName, setUserName] = useState('')
  const [pageView, setPageView] = useState('menu')

  const [audioOnOff, setAudioOnOff] = useState('on')
  const [point, setPoint] = useState(0)
  const [totalQuestion, setTotalQuestion] = useState(0)

  //最低何回練習しないといけないのか(DBから持ってくる) for Reading Course

  const [englibLevelColor, setEnglibLevelColor] = useState()
  const [lessonOrder, setLessonOrder] = useState() //教材一冊の中のレッスン順番
  const [englibLevel, setEnglibLevel] = useState()
  const [leastRecordCount_step2, setLeastRecordCount_step2] = useState()
  const [leastRecordCount_step3, setLeastRecordCount_step3] = useState()

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
  //get member info : name_eng +  practiceTempIdを発行
  //get member info : name_eng +  practiceTempIdを発行
  const [copyHW, setCopyHW] = useState('')
  const [qrLinkBookQuestion, setQrLinkBookQuestion] = useState('')
  const [qrLinkOtherHW, setQrLinkOtherHW] = useState('')

  const [readingHWAmount, setReadingHWAmount] = useState('')

  let logOut = () => {
    // setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('MypageMbn', '')
    localStorage.removeItem('userName', '')
    localStorage.removeItem('cbn', '')
    localStorage.removeItem('bbn', '')
    localStorage.removeItem('memberSort', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginGroup')
  }
  useEffect(() => {
    if (!cN || cN == '') {
      logOut()
    }
  }, [])

  // useEffect(() => {
  //   if (
  //     localStorage.getItem('loginStatus') !== 'true' ||
  //     !localStorage.getItem('loginStatus')
  //   ) {
  //     alert('先にログインしてください。')
  //     router.push('/loginGroup/')
  //   }
  // }, [G_loginStatus])

  // localStorage.setItem('practiceTempId', practiceTempId)

  useEffect(() => {
    if (practiceTempId == '') {
      var tempid = Math.floor(Math.random() * 999999999999999)
      setPracticeTempId(tempid)
    }
  }, [])

  // useEffect(() => {
  //   if (localStorage.getItem('loginStatus') == 'true') {
  //     const fetchData1 = async () => {
  //       var holdTempId = localStorage.getItem('holdTempId')

  //       // alert(holdTempId)
  //       try {
  //         if (!holdTempId) {
  //           var tempid = Math.floor(Math.random() * 999999999999999)
  //           setPracticeTempId(tempid)
  //           console.log(
  //             'practiceTempId&& holdtempidost-ない時:',
  //             practiceTempId
  //           )
  //         } else if (holdTempId) {
  //           setPracticeTempId(holdTempId)
  //           console.log('practiceTempId-ある時:', practiceTempId)
  //         } else {
  //           var tempid = Math.floor(Math.random() * 999999999999999)
  //           setPracticeTempId(tempid)
  //         }

  //         // }
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //     fetchData1()
  //   }
  // }, [])

  //無限ループしない
  // const bar = {}
  // const bar2 = {}

  function getQrLinkOtherHW(hwid) {
    var mbn = localStorage.getItem('MypageMbn')
    var pointkey = 'RR-5'
    var fileDetail = 'OtherHWUpload'

    var ql =
      'https://myben.app/upload/hwup?m=' +
      mbn +
      '&sb=' +
      sB +
      '&hid=' +
      hwid +
      '&pti=' +
      practiceTempId +
      '&cstep=' +
      'MainMenuB' +
      '&sS=' +
      'OtherHWUpload' +
      '&pntKN=' +
      pointkey +
      '&fD=' +
      fileDetail

    setQrLinkOtherHW(ql)
  }
  function getQrLinkBookQuestion(hwid) {
    var mbn = localStorage.getItem('MypageMbn')
    var pointkey = 'RR-4'
    var fileDetail = 'BookQuestion'
    var ql =
      'https://myben.app/upload/hwup?m=' +
      mbn +
      '&sb=' +
      sB +
      '&hid=' +
      hwid +
      '&pti=' +
      practiceTempId +
      '&cstep=' +
      'Endscreen' +
      '&sS=' +
      'BookQuestion' +
      '&pntKN=' +
      pointkey +
      '&fD=' +
      fileDetail

    setQrLinkBookQuestion(ql)
  }

  useEffect(() => {
    bookInfo()
    // return () => {
    //   console.log('This will be logged on unmount')
    // }
  }, [])

  function bookInfo() {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)

      const fetchData2 = async () => {
        try {
          // var url = DB_CONN_URL + '/get-hw-and-Blackcat-Series-info/'
          if (cN == 'CourseA' || cN == 'CourseA_SC') {
            var url = DB_CONN_URL + '/get-hw-and-Reading-Triumphs-info/'
          } else if (cN == 'CourseB' || cN == 'CourseB_SC') {
            var url = DB_CONN_URL + '/get-hw-and-Blackcat-Series-info/'
          } else if (cN == 'CourseZ' || cN == 'CourseZ_SC') {
            var url = DB_CONN_URL + '/get-hw-and-ORT-info/'
          }

          var Url = url + mbn
          // alert(Url)
          const response = await axios.get(Url)
          // alert('here' + response.data.length)
          if (response.data.length > 0) {
            setHWbookInfo(response.data)
            setAudioDurtaionFromDB(response.data[0].audioDuration)
            setHWID(response.data[0].homework_id)
            setEnglibLevel(response.data[0].englibLevel)

            setBookStory(response.data[0].story)
            setSeriesName(response.data[0].seriesName)
            setBookTitle(response.data[0].bookTitle)
            setBookNum(response.data[0].bookNum)
            setStoryNum(response.data[0].storyNum)
            setStoryTitle(response.data[0].storyTitle)
            setReadingHWAmount(response.data[0].readingHWAmount)
            // setLevelOrder(response.data.response[0].levelOrder)
            setReadingLevel(response.data[0].readingLevel)
            setStoryStartPage(response.data[0].storyStartPage)
            setLessonOrder(response.data[0].lessonOrder)
            getQrLinkOtherHW(response.data[0].homework_id)
            getQrLinkBookQuestion(response.data[0].homework_id)

            setCopyHW(response.data[0].copyHW)
            if (cN == 'CourseA' || cN == 'CourseA_SC') {
              const bci =
                'Reading/ReadingTriumphs/' +
                response.data[0].readingLevel +
                '/img/' +
                response.data[0].readingLevel +
                '-Cover.png'

              const encodedPath = encodeURIComponent(bci)

              setBookCoverImgUrl(
                process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                  encodedPath +
                  '?alt=media'
              )

              const bim =
                'Reading/ReadingTriumphs/' +
                response.data[0].readingLevel +
                '/img/' +
                response.data[0].storyNum +
                '.png'
              const encodedPath_bim = encodeURIComponent(bim)
              setBookImgUrl(
                process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                  encodedPath_bim +
                  '?alt=media'
              )

              const baudio =
                'Reading/ReadingTriumphs/' +
                response.data[0].readingLevel +
                '/audio/' +
                response.data[0].audio1 +
                ''
              const encodedPath_baudio = encodeURIComponent(baudio)
              setBookAudioUrl(
                process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                  encodedPath_baudio +
                  '?alt=media'
              )
            } else if (cN == 'CourseB' || cN == 'CourseB_SC') {
              //first Story View
              //'father'が含まれるかどうか確認。
              //myenglibold.mycafe24.com/onlesson/pdfviewer.php?sort=blackcat&file=Wicked_and_Humorous_Tales_Part1.pdf&readingLevel=B2_1&readingCourse=BCat_RTraining&bookNum=Book2
              var sN = response.data[0].storyNum
              var rL = response.data[0].readingLevel
              var bN = response.data[0].bookNum
              var pdf1 = response.data[0].pdf1
              console.log('rL', rL)
              var storySplit = []
              storySplit = sN.split('Story')
              var newSnum = storySplit[1]

              if (newSnum < 2) {
                // if (sN.indexOf('_Story1') !== -1) {
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
                  'https://myenglibold.mycafe24.com/onlesson/pdfviewer.php?sort=blackcat&file=' +
                  pdf1 +
                  '&readingLevel=' +
                  rL +
                  '&readingCourse=' +
                  rC +
                  '&bookNum=' +
                  bN

                setFirstStoryLink(fsl)
              }

              var af =
                'Reading/Blackcat/' +
                response.data[0].readingLevel +
                '/' +
                response.data[0].bookNum +
                '/answer/answer.pdf'

              const encodedPath_af = encodeURIComponent(af)
              setAnswerFile(
                process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                  encodedPath_af +
                  '?alt=media'
              )

              const bci =
                'Reading/Blackcat/img/' +
                response.data[0].readingLevel +
                '/' +
                response.data[0].bookNum +
                '_Cover.png'
              const encodedPath_bci = encodeURIComponent(bci)
              setBookCoverImgUrl(
                process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                  encodedPath_bci +
                  '?alt=media'
              )

              const bim =
                'Reading/Blackcat/img/' +
                response.data[0].readingLevel +
                '/' +
                response.data[0].storyNum +
                '.png'
              const encodedPath_bim = encodeURIComponent(bim)
              setBookImgUrl(
                process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                  encodedPath_bim +
                  '?alt=media'
              )

              //Main Story audio
              const baudio =
                'Reading/Blackcat/' +
                response.data[0].readingLevel +
                '/' +
                response.data[0].bookNum +
                '/audio/' +
                response.data[0].audio1 +
                ''
              const encodedPath_baudio = encodeURIComponent(baudio)
              setBookAudioUrl(
                process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                  encodedPath_baudio +
                  '?alt=media'
              )

              if (response.data[0].audio_intro != '') {
                const baudio_intro =
                  'Reading/Blackcat/' +
                  response.data[0].readingLevel +
                  '/' +
                  response.data[0].bookNum +
                  '/audio/' +
                  response.data[0].audio_intro +
                  ''
                const encodedPath_baudio_intro =
                  encodeURIComponent(baudio_intro)
                setBookIntroAudioUrl(
                  process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                    encodedPath_baudio_intro +
                    '?alt=media'
                )
              }

              if (response.data[0].audio_intro2 != '') {
                const baudio_intro2 =
                  'Reading/Blackcat/' +
                  response.data[0].readingLevel +
                  '/' +
                  response.data[0].bookNum +
                  '/audio/' +
                  response.data[0].audio_intro2 +
                  ''
                const encodedPath_baudio_intro2 =
                  encodeURIComponent(baudio_intro2)
                setBookIntro2AudioUrl(
                  process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                    encodedPath_baudio_intro2 +
                    '?alt=media'
                )
              }

              if (response.data[0].audio_author != '') {
                const baudio_author =
                  'Reading/Blackcat/' +
                  response.data[0].readingLevel +
                  '/' +
                  response.data[0].bookNum +
                  '/audio/' +
                  response.data[0].audio_author +
                  ''
                const encodedPath_baudio_author =
                  encodeURIComponent(baudio_author)
                setBookAuthorAudioUrl(
                  process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                    encodedPath_baudio_author +
                    '?alt=media'
                )
              }

              if (response.data[0].audio2 != '') {
                const baudio2 =
                  'Reading/Blackcat/' +
                  response.data[0].readingLevel +
                  '/' +
                  response.data[0].bookNum +
                  '/audio/' +
                  response.data[0].audio2 +
                  ''
                const encodedPath_baudio2 = encodeURIComponent(baudio2)
                setBookAudio2Url(
                  process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                    encodedPath_baudio2 +
                    '?alt=media'
                )
                setBookAudio2TitleUrl(response.data[0].title_audio2)
              }

              if (response.data[0].audio3 != '') {
                const baudio3 =
                  'Reading/Blackcat/' +
                  response.data[0].readingLevel +
                  '/' +
                  response.data[0].bookNum +
                  '/audio/' +
                  response.data[0].audio3 +
                  ''
                const encodedPath_baudio3 = encodeURIComponent(baudio3)
                setBookAudio3Url(
                  process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                    encodedPath_baudio3 +
                    '?alt=media'
                )
                setBookAudio3TitleUrl(response.data[0].title_audio3)
              }

              if (response.data[0].audio4 != '') {
                const baudio4 =
                  'Reading/Blackcat/' +
                  response.data[0].readingLevel +
                  '/' +
                  response.data[0].bookNum +
                  '/audio/' +
                  response.data[0].audio4 +
                  ''
                const encodedPath_baudio4 = encodeURIComponent(baudio4)
                setBookAudio4Url(
                  process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                    encodedPath_baudio4 +
                    '?alt=media'
                )
                setBookAudio4TitleUrl(response.data[0].title_audio4)
              }

              if (response.data[0].audio5 != '') {
                const baudio5 =
                  'Reading/Blackcat/' +
                  response.data[0].readingLevel +
                  '/' +
                  response.data[0].bookNum +
                  '/audio/' +
                  response.data[0].audio5 +
                  ''
                const encodedPath_baudio5 = encodeURIComponent(baudio5)
                setBookAudio5Url(
                  process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                    encodedPath_baudio5 +
                    '?alt=media'
                )
                setBookAudio5TitleUrl(response.data[0].title_audio5)
              }
              if (response.data[0].audio6 != '') {
                const baudio6 =
                  'Reading/Blackcat/' +
                  response.data[0].readingLevel +
                  '/' +
                  response.data[0].bookNum +
                  '/audio/' +
                  response.data[0].audio6
                setBookAudio6Url(
                  process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                    baudio6 +
                    '?alt=media'
                )
                setBookAudio6TitleUrl(response.data[0].title_audio6)
              }
              if (response.data[0].audio7 != '') {
                const baudio7 =
                  'Reading/Blackcat/' +
                  response.data[0].readingLevel +
                  '/' +
                  response.data[0].bookNum +
                  '/audio/' +
                  response.data[0].audio7 +
                  ''
                const encodedPath_baudio7 = encodeURIComponent(baudio7)
                setBookAudio7Url(
                  process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                    encodedPath_baudio7 +
                    '?alt=media'
                )
                setBookAudio7TitleUrl(response.data[0].title_audio7)
              }
            } else if (cN == 'CourseZ' || cN == 'CourseZ_SC') {
              //ORT
              const bci = response.data[0].imgURL
              setBookCoverImgUrl(bci)

              const baudio =
                'Reading/ORT/' +
                response.data[0].readingLevel +
                '/audio/' +
                response.data[0].audio1 +
                ''
              const encodedPath_baudio = encodeURIComponent(baudio)
              setBookAudioUrl(
                process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                  encodedPath_baudio +
                  '?alt=media'
              )
            }
          }
        } catch (error) {
          alert(error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }

  const [rediriectPageView, setRediriectPageView] = useState('')
  useEffect(() => {
    setRediriectPageView(localStorage.getItem('rediriectPageView'))
  }, [])

  useEffect(() => {
    lessonSet()
  }, [courseName])
  function lessonSet() {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)
      // console.log('courseName:', courseName)
      var url = DB_CONN_URL + '/get-sys_member_lesson_set_BtoB/'
      var Url = url + mbn + '&' + courseName

      const fetchData1 = async () => {
        try {
          axios.get(Url).then((response) => {
            if (!response.data.status) {
              //response.data.message)
              localStorage.removeItem('token', '')
              localStorage.removeItem('loginStatus', '')
              localStorage.removeItem('email', '')
              localStorage.removeItem('MypageMbn', '')
              router.replace('/loginGroup') // ここでリダイレクト
            } else {
              //  alert(response.data.message)
              setUserName(response.data.response[0].name_eng)
              setReadingLevel(response.data.response[0].courseLevel)
              setLeastRecordCount_step2(
                response.data.response[0].howmany_r_practice_record_with_audio
              )
              setLeastRecordCount_step3(
                response.data.response[0].howmany_r_practice_record_no_audio
              )
              setEnglibLevelColor(response.data.response[0].level_color)

              // alert(userName)
              // }
            }
          })
        } catch (error) {
          console.log(error)
        }
      }

      fetchData1()
    }
  }

  return (
    <div className="AppBig">
      {/* <h2> {readingHWAmount}</h2> */}
      <QuizContext.Provider
        value={{
          readingHWAmount,
          setReadingHWAmount,
          copyHW,
          setCopyHW,
          HWbookInfo,
          setHWbookInfo,
          audioDurtaionFromDB,
          setAudioDurtaionFromDB,
          firstStoryLink,
          setFirstStoryLink,
          qrLinkOtherHW,
          setQrLinkOtherHW,
          qrLinkBookQuestion,
          setQrLinkBookQuestion,
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
          bookIntroAudioUrl,
          setBookIntroAudioUrl,
          bookIntro2AudioUrl,
          setBookIntro2AudioUrl,
          bookAuthorAudioUrl,
          setBookAuthorAudioUrl,
          bookAudio2Url,
          setBookAudio2Url,
          bookAudio2TitleUrl,
          setBookAudio2TitleUrl,
          bookAudio3TitleUrl,
          setBookAudio3TitleUrl,
          bookAudio3Url,
          setBookAudio3Url,
          bookAudio4TitleUrl,
          setBookAudio4TitleUrl,
          bookAudio4Url,
          setBookAudio4Url,
          bookAudio5TitleUrl,
          setBookAudio5TitleUrl,
          bookAudio5Url,
          setBookAudio5Url,
          bookAudio6TitleUrl,
          setBookAudio6TitleUrl,
          bookAudio6Url,
          setBookAudio6Url,
          bookAudio7TitleUrl,
          setBookAudio7TitleUrl,
          bookAudio7Url,
          setBookAudio7Url,
          seriesName,
          setSeriesName,
          bookStory,
          setBookStory,
          answerFile,
          setAnswerFile,
          levelOrder,
          setLevelOrder,
          readingLevel,
          setReadingLevel,
          bookTitle,
          setBookTitle,
          bookNum,
          setBookNum,
          storyNum,
          setStoryNum,
          storyTitle,
          setStoryTitle,
          storyStartPage,
          setStoryStartPage,
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
        }}
      >
        {pageView === 'menu' && <MainMenu />}
        {pageView === 'Step1B' && <Step1 />}
        {pageView === 'Step2B' && <Step2 />}
        {pageView === 'Step3B' && <Step3 />}

        {pageView === 'finished' && courseSelf == 'SELF' && <EndScreenSelf />}
        {pageView === 'finished' && courseSelf != 'SELF' && <EndScreenLesson />}

        {/* //TEST// */}
        {/* {pageView === 'menu' && <MainMenu />}
        {pageView === 'Step1B' && <EndScreenLesson />}
        {pageView === 'Step2B' && <EndScreenLesson />}
        {pageView === 'Step3B' && <EndScreenLesson />}
        {pageView === 'finished' && <EndScreenLesson />} */}
        {/* //TEST// */}
        {/* {pageView === 'menu' && <MainMenuB />}
        {pageView === 'Step1B' && <Step2 />}
        {pageView === 'Step2B' && <Step2 />}
        {pageView === 'Step3B' && <Step2 />}
        {pageView === 'finished' && <Step2 />} */}
      </QuizContext.Provider>
    </div>
  )
}

export default readingSelfCourseA
