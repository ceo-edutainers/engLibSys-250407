// CSS quiz_big_design.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import PointBar from '@/components/readingSelfcourse/PointBar'
import MonsterGet from '@/components/readingSelfcourse/MonsterGet'
import MainMenu from '@/components/readingSelfcourse/MainMenu'
import Step1 from '@/components/readingSelfcourse/Step1'
import Step2 from '@/components/readingSelfcourse/Step2'
import Step3 from '@/components/readingSelfcourse/Step3'
// import Step4 from '@/components/readingSelfcourse/Step4'
import EndScreen from '@/components/readingSelfcourse/EndScreen'
import { QuizContext } from '@/components/readingSelfcourse/Contexts'
import Router, { useRouter } from 'next/router'

function showandtellCourse() {
  const [myMbn, setMyMbn] = useState('')
  const router = useRouter() //使い方：router.replace('/')
  const DB_CONN_URL = process.env.DB_CONN_URL
  //初期設定
  const [course, setCourse] = useState('Input_Course')
  const [courseSelf, setCourseSelf] = useState('self')
  const [courseName, setCourseName] = useState('CourseA_SC') //self-CourseA, self-CourseB, self-CourseZ
  const [textbook, setTextbook] = useState('Reading Triumphs')
  const [courseLevel, setCourseLevel] = useState('')
  // const [test_group, setTest_group] = useState('1') //同じレベルの中で何番目のテストなのか
  const [HWID, setHWID] = useState('') //homework_idを入れる
  const [practiceTempId, setPracticeTempId] = useState('')
  const [eikenLevel, setEikenLevel] = useState('')
  const [userName, setUserName] = useState('')
  const [pageView, setPageView] = useState('menu')

  const [point, setPoint] = useState(0)
  const [totalQuestion, setTotalQuestion] = useState(0)
  const [audioOnOff, setAudioOnOff] = useState('on')
  const [bookCoverImgUrl, setBookCoverImgUrl] = useState('')
  const [bookImgUrl, setBookImgUrl] = useState('')
  const [bookAudioUrl, setBookAudioUrl] = useState('')
  const [readingLevel, setReadingLevel] = useState('')
  const [bookNum, setBookNum] = useState('')
  const [storyNum, setStoryNum] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [bookStory, setBookStory] = useState('')
  const [storyTitle, setStoryTitle] = useState('')
  const [seriesName, setSeriesName] = useState('')

  //get member info : name_eng +  practiceTempIdを発行

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        if (myMbn == null) {
          alert('先にログインしてください。')
          router.replace('/loginBtoB') // ここでリダイレクト
          return false
        } else {
          if (practiceTempId == '') {
            //practiceTempIdはこのページをリロードしたら新しくなる。

            var tempid = Math.floor(Math.random() * 999999999999999)
            setPracticeTempId(tempid)
            console.log('practiceTempId-ない時:', practiceTempId)
          } else {
            console.log('practiceTempId-ある時:', practiceTempId)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData1()
  }, [])

  useEffect(() => {
    // ブラウザバックを禁止する
    const fetchData = async () => {
      try {
        history.pushState(null, null, location.href)
        window.addEventListener('popstate', (e) => {
          alert(
            'ブラウザバックはできません。練習をやめる時はページの下にある練習を止めるボタンを押してください。'
          )
          history.go(1)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return false
  }, [])

  useEffect(() => {
    // console.log('myMbn##', myMbn)

    var mbn = localStorage.getItem('MypageMbn')
    setMyMbn(mbn)

    var Url = DB_CONN_URL + '/get-sys_member_lesson_set_BtoB/' + mbn

    const fetchData1 = async () => {
      try {
        axios.get(Url).then((response) => {
          if (!response.data.status) {
            alert(response.data.message)
          } else {
            //メンバーデーターが登録されてない時に以下のようにエラーを出して、ログアウトされる
            if (!response.data.response[0]) {
              alert('no registered member')
              localStorage.removeItem('token', '')
              localStorage.removeItem('loginStatus', '')
              localStorage.removeItem('email', '')
              localStorage.removeItem('mbn', '')
              router.replace('/loginBtoB') // ここでリダイレクト
              return false
            } else {
              setUserName(response.data.response[0].name_eng)
              // alert(userName)
            }
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
    setMyMbn(mbn)

    const fetchData2 = async () => {
      try {
        var Url = DB_CONN_URL + '/get-hw-and-Reading-Triumphs-info/' + mbn
        const response = await axios.get(Url)

        //setHWbookInfo(response.data)

        setHWID(response.data[0].homework_id)
        setCourseLevel(response.data[0].readingLevel)
        setBookStory(response.data[0].story)
        setReadingLevel(response.data[0].seriesName)
        setBookTitle(response.data[0].bookTitle)
        setBookNum(response.data[0].bookNum)
        setStoryNum(response.data[0].storyNum)
        setStoryTitle(response.data[0].storyTitle)
        setReadingLevel(response.data[0].readingLevel)

        console.log('readingLevel', courseLevel)

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

        // console.log('bci:', bci)
        // console.log('setHWID', HWID)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }, [])

  return (
    <div className="AppBig">
      <QuizContext.Provider
        value={{
          myMbn,
          setMyMbn,
          HWID,
          setHWID,
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
        <MonsterGet />
        <PointBar cStep={pageView} pageTitle="Input-Self-Reading" />

        {pageView === 'menu' && <MainMenu />}
        {pageView === 'Step1' && <Step1 />}
        {pageView === 'Step2' && <Step2 />}
        {pageView === 'Step3' && <Step3 />}
        {pageView === 'Step4' && <Step4 />}
        {/* {pageView === 'Step5' && <Step5 />} */}
        {pageView === 'finished' && <EndScreen />}
      </QuizContext.Provider>
    </div>
  )
}

export default showandtellCourse
