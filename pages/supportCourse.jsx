// CSS quiz_big_design.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

import MainMenu from '@/components/supportCourse/MainMenuAll'
import Step1 from '@/components/supportCourse/Step01'
import Step2 from '@/components/supportCourse/Step02'
import Step3 from '@/components/supportCourse/Step03'
import EndScreenSelf from '@/components/supportCourse/EndScreenSelf'
import EndScreenLesson from '@/components/supportCourse/EndScreenLesson'

import { QuizContext } from '@/components/supportCourse/ContextsB'
import Router, { useRouter } from 'next/router'

function readingSelfCourseA() {
  const { query } = useRouter()
  const cN = query.cN //courseName
  const cS = query.cS //SELF
  const sB = query.sB //subject

  const DB_CONN_URL = process.env.DB_CONN_URL

  const [UrlContents1, setUrlContents1] = useState()
  const [UrlContents2, setUrlContents2] = useState()
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

  const [bookSeries, setBookSeries] = useState()
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

  const [levelOrder, setLevelOrder] = useState('')
  const [readingLevel, setReadingLevel] = useState('')
  const [bookNum, setBookNum] = useState('')
  const [storyNum, setStoryNum] = useState('')
  const [storyEndNum, setStoryEndNum] = useState('')

  const [bookTitle, setBookTitle] = useState('')
  const [bookStory, setBookStory] = useState('')
  const [storyTitle, setStoryTitle] = useState('')
  const [seriesName, setSeriesName] = useState('')
  const [storyStartPage, setStoryStartPage] = useState('')
  const [answerFile, setAnswerFile] = useState('')
  const [hw_page_start, setHwPageStart] = useState('')
  const [hw_page_end, setHwPageEnd] = useState('')
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
      alert('先にログインしてください2。')
      router.push('/loginGroup/')
    }
  }, [G_loginStatus])

  // localStorage.setItem('practiceTempId', practiceTempId)

  useEffect(() => {
    if (practiceTempId == '') {
      var tempid = Math.floor(Math.random() * 999999999999999)
      setPracticeTempId(tempid)
    }
  }, [])

  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    const fetchData = async () => {
      var subject = thisSubject
      var url = DB_CONN_URL + '/get-sys-hw-grammar/'
      var Url = url + mbn + '&' + subject

      try {
        const response = await axios.get(Url)
        //alert(response.data.message)
        //stepStatus='end'があるものがあるのあk
        // alert(response.data.length)
        if (response.data.length > 0) {
          setStoryEndNum(response.data.response[0].storyEndNum)
          // alert(response.data.response[0].storyEndNum)
        }
        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  function getQrLinkOtherHW(hwid) {
    var mbn = localStorage.getItem('MypageMbn')
    // var pointkey = 'RR-5'
    var fileDetail = 'School Print Upload'
    var ql =
      'https://myben.app/upload/hwupSupport?m=' +
      mbn +
      '&sb=' +
      sB +
      '&hid=' +
      hwid +
      '&pti=' +
      practiceTempId +
      '&cstep=' +
      'MainMenuAll' +
      '&sS=' +
      'School Print' +
      '&pntKN=' +
      'no point' +
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
      'MainMenuAll' +
      '&sS=' +
      'ThisWeekHW' +
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
          // if (cN == 'CourseSE') {
          //   var url = DB_CONN_URL + '/get-hw-and-Support-School-English-info/'
          // } else if (cN == 'CourseGR') {
          //   var url = DB_CONN_URL + '/get-hw-and-Support-Grammar-Course-info/'
          // } else if (cN == 'CourseEK') {
          //   var url = DB_CONN_URL + '/get-hw-and-Support-Eiken-Course-info/'
          // }

          var url = DB_CONN_URL + '/get-hw-and-OTHER-BOOK-Course-info/'
          var Url = url + mbn + '&' + thisSubject
          // alert(Url)
          const response = await axios.get(Url)

          setHWbookInfo(response.data)

          setHWID(response.data[0].homework_id)
          setBookTitle(response.data[0].book)
          // alert(response.data[0].bookTitle)
          // setBookNum(response.data[0].unit)
          setStoryNum(response.data[0].unit)

          setStoryTitle(response.data[0].Title)
          setLevelOrder(response.data[0].levelOrder)
          setReadingLevel(response.data[0].Level)
          setLessonOrder(response.data[0].listOrder)
          setHwPageStart(response.data[0].hw_page_start)
          setHwPageEnd(response.data[0].hw_page_end)
          setBookSeries(response.data[0].bookSeries)

          // setStoryStartPage(response.data[0].storyStartPage)
          getQrLinkOtherHW(response.data[0].homework_id)
          getQrLinkBookQuestion(response.data[0].homework_id)

          //  https://englib-materials.s3.ap-northeast-1.amazonaws.com/OTHER/SCHOOL+ENGLISH/CourseSE/Grade2/Bookcover.png
          //   https://englib-materials.s3.ap-northeast-1.amazonaws.com/OTHER/SCHOOL%20ENGLISH/CourseSE/Grade2/Bookcover.png
          /*
<Eiken>
bookSeries:Gakuen Eiken English
Level:Grade1
book：Gakuen Middle School English Grade1
unit:Chapter10



s3://englib-materials/OTHER/GRAMMAR/CourseGR/Gakuen Middle School English/Grade1/


OTHER/GRAMMAR/CourseGR/Gakuen Middle School English/Grade3
*/
          //Eiken
          //https://englib-materials.s3.ap-northeast-1.amazonaws.com/OTHER/EIKEN/CourseEK/Eiken3/Bookcover.png
          const bci =
            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/OTHER/' +
            sB +
            '/' +
            cN +
            '/' +
            response.data[0].bookSeries +
            '/' +
            response.data[0].Level +
            '/' +
            'Bookcover.png'
          setBookCoverImgUrl(bci)
          // alert(bci)
          const bc1 =
            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/OTHER/' +
            sB +
            '/' +
            cN +
            '/' +
            response.data[0].bookSeries +
            '/' +
            'Contents1.png'
          setUrlContents1(bc1)
          const bc2 =
            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/OTHER/' +
            sB +
            '/' +
            cN +
            '/' +
            response.data[0].bookSeries +
            '/' +
            'Contents2.png'
          setUrlContents2(bc2)
          //  const bim =
          //    'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Reading+Triumphs/' +
          //    response.data[0].readingLevel +
          //    '/img/' +
          //    response.data[0].storyNum +
          //    '.png'
          //  setBookImgUrl(bim)
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
              // setReadingLevel(response.data.response[0].courseLevel)
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
          storyEndNum,
          setStoryEndNum,
          bookSeries,
          setBookSeries,
          UrlContents1,
          setUrlContents1,
          UrlContents2,
          setUrlContents2,
          hw_page_start,
          setHwPageStart,
          hw_page_end,
          setHwPageEnd,
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
          // bookAudioUrl,
          // setBookAudioUrl,
          // bookIntroAudioUrl,
          // setBookIntroAudioUrl,
          // bookIntro2AudioUrl,
          // setBookIntro2AudioUrl,
          // bookAuthorAudioUrl,
          // setBookAuthorAudioUrl,
          // bookAudio2Url,
          // setBookAudio2Url,
          // bookAudio2TitleUrl,
          // setBookAudio2TitleUrl,
          // bookAudio3TitleUrl,
          // setBookAudio3TitleUrl,
          // bookAudio3Url,
          // setBookAudio3Url,
          // bookAudio4TitleUrl,
          // setBookAudio4TitleUrl,
          // bookAudio4Url,
          // setBookAudio4Url,
          // bookAudio5TitleUrl,
          // setBookAudio5TitleUrl,
          // bookAudio5Url,
          // setBookAudio5Url,
          // bookAudio6TitleUrl,
          // setBookAudio6TitleUrl,
          // bookAudio6Url,
          // setBookAudio6Url,
          // bookAudio7TitleUrl,
          // setBookAudio7TitleUrl,
          // bookAudio7Url,
          // setBookAudio7Url,
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
        {/* <h1>{practiceTempId}</h1> */}
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

        {pageView === 'menu' && <MainMenu />}
        {pageView === 'Step1B' && <Step1 />}
        {pageView === 'Step2B' && <Step2 />}
        {pageView === 'Step3B' && <Step3 />}

        {pageView === 'finished' && courseSelf == 'SELF' && <EndScreenSelf />}
        {pageView === 'finished' && courseSelf != 'SELF' && <EndScreenLesson />}
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
