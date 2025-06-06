// CSS quiz_big_design.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

import MainMenuB from '@/components/readingSelfcourse/MainMenuB'
import Step1B from '@/components/readingSelfcourse/Step1B'
import Step2B from '@/components/readingSelfcourse/Step2B'
import Step3B from '@/components/readingSelfcourse/Step3B'
import EndScreenB from '@/components/readingSelfcourse/EndScreenB'

import { QuizContext } from '@/components/readingSelfcourse/ContextsB'
import Router, { useRouter } from 'next/router'

function readingSelfCourseA() {
  const { query } = useRouter()
  const cN = query.cN //courseName
  const cS = query.cS //courseSelf
  const sB = query.sB //subject

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const [myMbn, setMyMbn] = useState('')
  const router = useRouter() //使い方：router.replace('/')

  const [firstStoryLink, setFirstStoryLink] = useState(null)

  //初期設定
  const [course, setCourse] = useState('Input_Course')
  const [courseSelf, setCourseSelf] = useState(cS)
  const [courseName, setCourseName] = useState(cN) //self-CourseA, self-CourseB, self-CourseZ
  const [textbook, setTextbook] = useState('Blackcat Series')
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

  const [qrLinkBookQuestion, setQrLinkBookQuestion] = useState('')
  const [qrLinkOtherHW, setQrLinkOtherHW] = useState('')

  let logOut = () => {
    // setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
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

  useEffect(() => {
    if (
      localStorage.getItem('loginStatus') !== 'true' ||
      !localStorage.getItem('loginStatus')
    ) {
      alert('先にログインしてください。')
      router.push('/loginGroup/')
    }
  }, [G_loginStatus])

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      const fetchData1 = async () => {
        var holdTempId = localStorage.getItem('holdTempId')
        // alert(holdTempId)
        try {
          if (!holdTempId) {
            var tempid = Math.floor(Math.random() * 999999999999999)
            setPracticeTempId(tempid)
            console.log(
              'practiceTempId&& holdtempidost-ない時:',
              practiceTempId
            )
          } else if (holdTempId) {
            setPracticeTempId(holdTempId)
            console.log('practiceTempId-ある時:', practiceTempId)
          } else {
            var tempid = Math.floor(Math.random() * 999999999999999)
            setPracticeTempId(tempid)
          }

          // }
        } catch (error) {
          console.log(error)
        }
      }
      fetchData1()
    }
  }, [])

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
      'SELF READING' +
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
      'SELF READING' +
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
    blackcatInfo()
    // return () => {
    //   console.log('This will be logged on unmount')
    // }
  }, [])
  function blackcatInfo() {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)

      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-and-Blackcat-Series-info/'
          var Url = url + mbn
          const response = await axios.get(Url)

          if (response.data.length > 0) {
            setHWID(response.data[0].homework_id)
            setEnglibLevel(response.data[0].englibLevel)

            setBookStory(response.data[0].story)
            setSeriesName(response.data[0].seriesName)
            setBookTitle(response.data[0].bookTitle)
            setBookNum(response.data[0].bookNum)
            setStoryNum(response.data[0].storyNum)
            setStoryTitle(response.data[0].storyTitle)
            // alert('levelOrder' + response.data[0].levelOrder)
            setLevelOrder(response.data[0].levelOrder)
            setReadingLevel(response.data[0].readingLevel)
            setStoryStartPage(response.data[0].storyStartPage)
            setLessonOrder(response.data[0].lessonOrder)
            getQrLinkOtherHW(response.data[0].homework_id)
            getQrLinkBookQuestion(response.data[0].homework_id)

            //first Story View
            //'father'が含まれるかどうか確認。
            //www.myenglib.com/onlesson/pdfviewer.php?sort=blackcat&file=Wicked_and_Humorous_Tales_Part1.pdf&readingLevel=B2_1&readingCourse=BCat_RTraining&bookNum=Book2
            var sN = response.data[0].storyNum
            var rL = response.data[0].readingLevel
            var bN = response.data[0].bookNum
            var pdf1 = response.data[0].pdf1
            console.log('rL', rL)

            var storySplit = []
            storySplit = sN.split('Story')
            var newSnum = storySplit[1]

            // if (sN.indexOf('_Story1') !== -1) {
            if (newSnum < 2) {
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

              setFirstStoryLink(fsl)
            }

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
              localStorage.removeItem('mbn', '')
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
      <QuizContext.Provider
        value={{
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
        {/* <p>test:{firstStoryLink}</p> */}
        {/* <div>
          <b>myMbn:</b>
          {myMbn}
          <br />
          <b>bookCoverImgUrl:</b> {bookCoverImgUrl}
          <br /> <b>bookImgUrl:</b>
          {bookImgUrl}
          <br /> <b>bookAudioUrl:</b>
          {bookAudioUrl}
          <br />
          <b>bookStory:</b>
          {bookStory}
          <br />
          <b>practiceTempId:</b>
          {practiceTempId}
          <br />
          <b>audioOnOff:</b>
          {audioOnOff}
          <br />
          <b>point:</b>
          {point}
          <br />
          <b>
            userName:
            <b />
            {userName}
            <br />
            <b>course:</b>
            {course}
            <br /> courseName:{courseName}
            <br />
            <b>textbook:</b>
            {textbook}
            <br /> <b>pageView:</b>
            {pageView}
            <br /> <b>courseLevel:</b>
          </b>
          {courseLevel}
          <br />
          <b>bookTitle:</b>
          {bookTitle}
          <br />
          <b>storyTitle:</b>
          {storyTitle}
          <br />
          <b> bookNum:</b>
          {bookNum}
          <br />
          <b> storyNum:</b>
          {storyNum}
          <br />
          <b>totalQuestion:</b>
          {totalQuestion}
          <br />
        </div> */}
        {/* {<div>bookContents:{bookContents}</div>} */}
        {/* {pageView != 'menu' && (
          <div
            style={{
              paddingRight: 0,
              marginRight: 0,
              position: 'fixed',
              right: '0',
              top: '0',
              marginTop: '170px',
              zIndex: 500,
            }}
          >
            <img
              src={bookCoverImgUrl}
              className="mr-2 mb-3"
              style={{
                border: '1px solid #dedede',
                width: '150px',
                height: '200px',
                opacity: '1',
              }}
            />
          </div>
        )} */}
        {firstStoryLink && pageView !== 'menu' && pageView !== 'finished' && (
          <iframe
            src={firstStoryLink}
            style={{
              width: '100%',
              height: '800px',
              border: '1px solid white',
              borderRadius: '20px',
              backgroundColor: 'white',
              margin: 0,
              padding: 0,
            }}
          />
        )}
        {pageView === 'menu' && <MainMenuB />}
        {pageView === 'Step1B' && <Step1B />}
        {pageView === 'Step2B' && <Step2B />}
        {pageView === 'Step3B' && <Step3B />}
        {pageView === 'finished' && <EndScreenB />}
        {/* //TEST// */}
        {/* {pageView === 'menu' && <MainMenuB />}
        {pageView === 'Step1B' && <EndScreenB />}
        {pageView === 'Step2B' && <EndScreenB />}
        {pageView === 'Step3B' && <EndScreenB />}
        {pageView === 'finished' && <EndScreenB />} */}
      </QuizContext.Provider>
    </div>
  )
}

export default readingSelfCourseA
