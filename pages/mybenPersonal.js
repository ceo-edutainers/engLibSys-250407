// CSS mypage_for_adult.css

import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { QuizContext } from '@/components/MypagePersonal/Contexts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MyHeaderMenu from '@/components/MypagePersonal/myHeaderMenu'
import FireViewReading from '@/components/readingSelfcourse/FireView'
import FireViewShadowing from '@/components/shadowingSelfcourse/FireView'
import AnimatedModal from '@/components/AnimatedModal/PointModal'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faDoorOpen,
  faChartBar,
  faTrash,
  faPenSquare,
  faFileAudio,
  faHeadphones,
  faCubes,
  faLaptop,
  faFile,
  faHandPointer,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function App() {
  const DB_CONN_URL = process.env.DB_CONN_URL

  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const [myMbn, setMyMbn] = useState('')
  const router = useRouter() //使い方：router.replace('/')
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isNotReady, setIsNotReady] = useState(false)
  const [myCourseList, setMyCourseList] = useState([])
  const [practiceTempId, setPracticeTempId] = useState('')
  const [userName, setUserName] = useState('')
  useEffect(() => {
    if (
      localStorage.getItem('loginStatus') !== 'true' ||
      !localStorage.getItem('loginStatus')
    ) {
      router.push('/loginPersonal') // ここでリダイレクト
      return
    }
  }, [])

  useEffect(() => {
    // ブラウザバックを禁止する
    const fetchData = async () => {
      try {
        history.pushState(null, null, location.href)
        window.addEventListener('popstate', (e) => {
          setIsOpenBackMypage(true)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return false
  }, [])

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      const fetchData1 = async () => {
        try {
          if (practiceTempId == '') {
            //practiceTempIdはこのページをリロードしたら新しくなる。

            var tempid = Math.floor(Math.random() * 999999999999999)
            setPracticeTempId(tempid)
            console.log('practiceTempId-ない時:', practiceTempId)
          } else {
            console.log('practiceTempId-ある時:', practiceTempId)
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchData1()
    }
  }, [])

  const [loginStatus, setLoginStatus] = useState(false) //login時
  let logOut = () => {
    setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
    localStorage.removeItem('userName', '')
    localStorage.removeItem('loginusername', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginPersonal')
  }
  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)
      var url = DB_CONN_URL + '/get-all-list-sys_member_lesson_set_Personal/'
      var Url = url + mbn

      const fetchData1 = async () => {
        try {
          axios.get(Url).then((response) => {
            if (response.data.status == false) {
              alert('db select failed')
            } else {
              //alert(response.data.message)
              setUserName(response.data.response[0].name_eng)
              // alert(response.data.response[0].englibLevel)

              setMyCourseList(response.data.response)
              console.log('myCourseList', myCourseList)
            }
          })
        } catch (error) {
          console.log(error)
        }
      }

      fetchData1()
    }
  }, [])

  return (
    <>
      <div className="AppBig">
        <QuizContext.Provider
          value={{
            myMbn,
            setMyMbn,
            userName,
            setUserName,
            // englibLevel,
            // setEnglibLevel,
          }}
        >
          <MyHeaderMenu />
          <div
            className="QuizMpa mt-0"
            // style={{ backgroundColor: 'white', border: '10px solid #EBEDEF' }}
            style={{
              backgroundColor: 'white',
              border: '10px solid #EBEDEF',
              width: '90%',
              margin: '20px',
            }}
          >
            <div className="row">
              {myCourseList.map((val, key) => {
                return (
                  <>
                    {val.courseName == 'CourseA_SC' && (
                      <div className="col-lg-6 col-md-12 mt-5">
                        {/* <Link href="/readingSelfcourseB"> */}
                        <button
                          className="banner-content"
                          style={{
                            backgroundColor: '#EBF5FB',
                            height: 'auto',
                            border: '5px solid #2C3E50',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            alignItems: 'center',
                            padding: 0,
                          }}
                          // onClick={() => {
                          //   setIsNotReady(true)
                          // }}
                        >
                          <div className="single-courses-box ">
                            <div className="courses-image ">
                              <div
                                // className="price shadow"
                                style={{
                                  display: 'inline-block',
                                  // backgroundColor: '#fe4a55',
                                  color: '#ffffff',
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '50%',
                                  position: 'absolute',
                                  right: '10px',
                                  bottom: '-29.5px',
                                  textAlign: 'center',
                                  lineHeight: '67px',
                                  fontSize: '24px',
                                  fontWeight: 800,
                                }}
                              >
                                <FireViewReading thisSubject="SELF READING" />
                                {/* セルフ学習 */}
                              </div>
                            </div>
                          </div>
                          <h5
                            style={{
                              color: '#808B96',
                              fontWeight: '900',
                              fontSize: '15px',
                            }}
                          >
                            INPUT PROGRAM
                          </h5>

                          <h5
                            style={{
                              color: 'black',
                              fontWeight: '900',
                            }}
                          >
                            INTENSIVE READING
                          </h5>
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                              fontWeight: 'normal',
                            }}
                          >
                            精読プログラム
                          </p>
                          <img
                            src="images/icon-a-reading.png"
                            style={{ width: '45%' }}
                          />
                          <br />
                          <h6 style={{ color: '#666666', marginTop: '10px' }}>
                            SELF STUDY
                          </h6>

                          {/* <button
                            className="btn mt-0 pt-0"
                            style={{ width: '100%' }}
                          >
                            <FireViewReading thisSubject="READING" />
                          </button> */}

                          <button
                            className="btn btn-warning"
                            style={{ width: '45%', fontSize: '20px' }}
                            onClick={() => {
                              setIsNotReady(true)
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faHandPointer}
                              size="1x"
                              color="black"
                            />{' '}
                            教材の
                            <br />
                            進捗状況
                          </button>
                          <Link href="/readingSelfcourseA">
                            <button
                              className="btn btn-danger"
                              style={{ width: '45%', fontSize: '20px' }}
                            >
                              <FontAwesomeIcon
                                icon={faHandPointer}
                                size="1x"
                                color="white"
                              />{' '}
                              毎日練習をスタート
                            </button>
                          </Link>
                        </button>
                        {/* </Link> */}
                      </div>
                    )}
                    {val.courseName == 'CourseA' && (
                      <div className="col-lg-6 col-md-12 mt-5">
                        {/* <Link href="/readingSelfcourseB"> */}
                        <button
                          className="banner-content"
                          style={{
                            backgroundColor: '#EBF5FB',
                            height: 'auto',
                            border: '5px solid #2C3E50',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            alignItems: 'center',
                            padding: 0,
                          }}
                          // onClick={() => {
                          //   setIsNotReady(true)
                          // }}
                        >
                          <div className="single-courses-box ">
                            <div className="courses-image ">
                              <div
                                // className="price shadow"
                                style={{
                                  display: 'inline-block',
                                  // backgroundColor: '#fe4a55',
                                  color: '#ffffff',
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '50%',
                                  position: 'absolute',
                                  right: '10px',
                                  bottom: '-29.5px',
                                  textAlign: 'center',
                                  lineHeight: '67px',
                                  fontSize: '24px',
                                  fontWeight: 800,
                                }}
                              >
                                <FireViewReading thisSubject="READING" />
                                {/* セルフ学習 */}
                              </div>
                            </div>
                          </div>
                          <h5
                            style={{
                              color: '#808B96',
                              fontWeight: '900',
                              fontSize: '15px',
                            }}
                          >
                            INPUT PROGRAM
                          </h5>

                          <h5
                            style={{
                              color: 'black',
                              fontWeight: '900',
                            }}
                          >
                            INTENSIVE READING
                          </h5>
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                              fontWeight: 'normal',
                            }}
                          >
                            精読プログラム
                          </p>
                          <img
                            src="images/icon-a-reading.png"
                            style={{ width: '45%' }}
                          />
                          <br />
                          <h6 style={{ color: '#666666', marginTop: '10px' }}>
                            SELF STUDY FOR LESSON
                          </h6>

                          <button
                            className="btn btn-warning"
                            style={{ width: '45%', fontSize: '20px' }}
                            onClick={() => {
                              setIsNotReady(true)
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faHandPointer}
                              size="1x"
                              color="black"
                            />{' '}
                            教材の
                            <br />
                            進捗状況
                          </button>
                          <Link href="/readingcourseA">
                            <button
                              className="btn btn-danger"
                              style={{ width: '45%', fontSize: '20px' }}
                            >
                              <FontAwesomeIcon
                                icon={faHandPointer}
                                size="1x"
                                color="white"
                              />{' '}
                              毎日練習をスタート
                            </button>
                          </Link>
                        </button>
                        {/* </Link> */}
                      </div>
                    )}
                    {val.courseName == 'CourseB_SC' && (
                      <div className="col-lg-6 col-md-12 mt-5">
                        {/* <Link href="/readingSelfcourseB"> */}
                        <button
                          className="banner-content"
                          style={{
                            backgroundColor: '#EBF5FB',
                            height: 'auto',
                            border: '5px solid #2C3E50',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            alignItems: 'center',
                            padding: 0,
                          }}
                          // onClick={() => {
                          //   setIsNotReady(true)
                          // }}
                        >
                          <div className="single-courses-box ">
                            <div className="courses-image ">
                              <div
                                // className="price shadow"
                                style={{
                                  display: 'inline-block',
                                  // backgroundColor: '#fe4a55',
                                  color: '#ffffff',
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '50%',
                                  position: 'absolute',
                                  right: '10px',
                                  bottom: '-29.5px',
                                  textAlign: 'center',
                                  lineHeight: '67px',
                                  fontSize: '24px',
                                  fontWeight: 800,
                                }}
                              >
                                <FireViewReading thisSubject="SELF READING" />
                                {/* セルフ学習 */}
                              </div>
                            </div>
                          </div>
                          <h5
                            style={{
                              color: '#808B96',
                              fontWeight: '900',
                              fontSize: '15px',
                            }}
                          >
                            INPUT PROGRAM
                          </h5>

                          <h5
                            style={{
                              color: 'black',
                              fontWeight: '900',
                            }}
                          >
                            INTENSIVE READING
                          </h5>
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                              fontWeight: 'normal',
                            }}
                          >
                            精読プログラム
                          </p>
                          <img
                            src="images/icon-a-reading.png"
                            style={{ width: '45%' }}
                          />
                          <br />
                          <h6 style={{ color: '#666666', marginTop: '10px' }}>
                            SELF STUDY
                          </h6>

                          {/* <button
                            className="btn mt-0 pt-0"
                            style={{ width: '100%' }}
                          >
                            <FireViewReading thisSubject="READING" />
                          </button> */}

                          <button
                            className="btn btn-warning"
                            style={{ width: '45%', fontSize: '20px' }}
                            onClick={() => {
                              setIsNotReady(true)
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faHandPointer}
                              size="1x"
                              color="black"
                            />{' '}
                            教材の
                            <br />
                            進捗状況
                          </button>
                          <Link href="/readingSelfcourseB">
                            <button
                              className="btn btn-danger"
                              style={{ width: '45%', fontSize: '20px' }}
                            >
                              <FontAwesomeIcon
                                icon={faHandPointer}
                                size="1x"
                                color="white"
                              />{' '}
                              毎日練習をスタート
                            </button>
                          </Link>
                        </button>
                        {/* </Link> */}
                      </div>
                    )}
                    {val.courseName == 'CourseB' /*readingSelfCourse*/ && (
                      <div className="col-lg-6 col-md-12 mt-5">
                        {/* <Link href="/readingSelfcourseB"> */}
                        <button
                          className="banner-content"
                          style={{
                            backgroundColor: '#EBF5FB',
                            height: 'auto',
                            border: '5px solid #2C3E50',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            alignItems: 'center',
                            padding: 0,
                          }}
                          // onClick={() => {
                          //   setIsNotReady(true)
                          // }}
                        >
                          <div className="single-courses-box ">
                            <div className="courses-image ">
                              <div
                                // className="price shadow"
                                style={{
                                  display: 'inline-block',
                                  // backgroundColor: '#fe4a55',
                                  color: '#ffffff',
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '50%',
                                  position: 'absolute',
                                  right: '10px',
                                  bottom: '-29.5px',
                                  textAlign: 'center',
                                  lineHeight: '67px',
                                  fontSize: '24px',
                                  fontWeight: 800,
                                }}
                              >
                                <FireViewReading thisSubject="READING" />
                                {/* セルフ学習 */}
                              </div>
                            </div>
                          </div>
                          <h5
                            style={{
                              color: '#808B96',
                              fontWeight: '900',
                              fontSize: '15px',
                            }}
                          >
                            INPUT PROGRAM
                          </h5>

                          <h5
                            style={{
                              color: 'black',
                              fontWeight: '900',
                            }}
                          >
                            INTENSIVE READING
                          </h5>
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                              fontWeight: 'normal',
                            }}
                          >
                            精読プログラム
                          </p>
                          <img
                            src="images/icon-a-reading.png"
                            style={{ width: '45%' }}
                          />
                          <br />
                          <h6 style={{ color: '#666666', marginTop: '10px' }}>
                            SELF STUDY FOR LESSON
                          </h6>

                          {/* <button
                            className="btn mt-0 pt-0"
                            style={{ width: '100%' }}
                          >
                            <FireViewReading thisSubject="READING" />
                          </button> */}

                          <button
                            className="btn btn-warning"
                            style={{ width: '45%', fontSize: '20px' }}
                            onClick={() => {
                              setIsNotReady(true)
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faHandPointer}
                              size="1x"
                              color="black"
                            />{' '}
                            教材の
                            <br />
                            進捗状況
                          </button>
                          <Link href="/readingcourseB">
                            <button
                              className="btn btn-danger"
                              style={{ width: '45%', fontSize: '20px' }}
                            >
                              <FontAwesomeIcon
                                icon={faHandPointer}
                                size="1x"
                                color="white"
                              />{' '}
                              毎日練習をスタート
                            </button>
                          </Link>
                        </button>
                        {/* </Link> */}
                      </div>
                    )}
                    {val.courseName == 'CourseZ_SC' && (
                      <div className="col-lg-6 col-md-12 mt-5">
                        {/* <Link href="/readingSelfcourseZ"> */}
                        <button
                          className="banner-content"
                          style={{
                            backgroundColor: '#EBF5FB',
                            height: 'auto',
                            border: '5px solid #2C3E50',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            alignItems: 'center',
                            padding: 0,
                          }}
                          // onClick={() => {
                          //   setIsNotReady(true)
                          // }}
                        >
                          <div className="single-courses-box ">
                            <div className="courses-image ">
                              <div
                                // className="price shadow"
                                style={{
                                  display: 'inline-block',
                                  // backgroundColor: '#fe4a55',
                                  color: '#ffffff',
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '50%',
                                  position: 'absolute',
                                  right: '10px',
                                  bottom: '-29.5px',
                                  textAlign: 'center',
                                  lineHeight: '67px',
                                  fontSize: '24px',
                                  fontWeight: 800,
                                }}
                              >
                                <FireViewReading thisSubject="SELF READING" />
                                {/* セルフ学習 */}
                              </div>
                            </div>
                          </div>
                          <h5
                            style={{
                              color: '#808B96',
                              fontWeight: '900',
                              fontSize: '15px',
                            }}
                          >
                            INPUT PROGRAM
                          </h5>

                          <h5
                            style={{
                              color: 'black',
                              fontWeight: '900',
                            }}
                          >
                            INTENSIVE READING
                          </h5>
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                              fontWeight: 'normal',
                            }}
                          >
                            精読プログラム
                          </p>
                          <img
                            src="images/icon-a-reading.png"
                            style={{ width: '45%' }}
                          />
                          <br />
                          <h6 style={{ color: '#666666', marginTop: '10px' }}>
                            SELF STUDY
                          </h6>

                          {/* <button
                            className="btn mt-0 pt-0"
                            style={{ width: '100%' }}
                          >
                            <FireViewReading thisSubject="READING" />
                          </button> */}
                          <button
                            className="btn btn-warning"
                            style={{ width: '45%', fontSize: '20px' }}
                            onClick={() => {
                              setIsNotReady(true)
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faHandPointer}
                              size="1x"
                              color="black"
                            />{' '}
                            教材の
                            <br />
                            進捗状況
                          </button>
                          <Link href="/readingSelfcourseZ">
                            <button
                              className="btn btn-danger"
                              style={{ width: '45%', fontSize: '20px' }}
                            >
                              <FontAwesomeIcon
                                icon={faHandPointer}
                                size="1x"
                                color="white"
                              />{' '}
                              毎日練習をスタート
                            </button>
                          </Link>
                        </button>
                        {/* </Link> */}
                      </div>
                    )}
                    {val.courseName == 'CourseZ' && (
                      <div className="col-lg-6 col-md-12 mt-5">
                        {/* <Link href="/readingSelfcourseZ"> */}
                        <button
                          className="banner-content"
                          style={{
                            backgroundColor: '#EBF5FB',
                            height: 'auto',
                            border: '5px solid #2C3E50',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            alignItems: 'center',
                            padding: 0,
                          }}
                          // onClick={() => {
                          //   setIsNotReady(true)
                          // }}
                        >
                          <div className="single-courses-box ">
                            <div className="courses-image ">
                              <div
                                // className="price shadow"
                                style={{
                                  display: 'inline-block',
                                  // backgroundColor: '#fe4a55',
                                  color: '#ffffff',
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '50%',
                                  position: 'absolute',
                                  right: '10px',
                                  bottom: '-29.5px',
                                  textAlign: 'center',
                                  lineHeight: '67px',
                                  fontSize: '24px',
                                  fontWeight: 800,
                                }}
                              >
                                <FireViewReading thisSubject="READING" />
                                {/* セルフ学習 */}
                              </div>
                            </div>
                          </div>
                          <h5
                            style={{
                              color: '#808B96',
                              fontWeight: '900',
                              fontSize: '15px',
                            }}
                          >
                            INPUT PROGRAM
                          </h5>

                          <h5
                            style={{
                              color: 'black',
                              fontWeight: '900',
                            }}
                          >
                            INTENSIVE READING
                          </h5>
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                              fontWeight: 'normal',
                            }}
                          >
                            精読プログラム
                          </p>
                          <img
                            src="images/icon-a-reading.png"
                            style={{ width: '45%' }}
                          />
                          <br />
                          <h6 style={{ color: '#666666', marginTop: '10px' }}>
                            SELF STUDY FOR LESSON
                          </h6>

                          {/* <button
                            className="btn mt-0 pt-0"
                            style={{ width: '100%' }}
                          >
                            <FireViewReading thisSubject="READING" />
                          </button> */}
                          <button
                            className="btn btn-warning"
                            style={{ width: '45%', fontSize: '20px' }}
                            onClick={() => {
                              setIsNotReady(true)
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faHandPointer}
                              size="1x"
                              color="black"
                            />{' '}
                            教材の
                            <br />
                            進捗状況
                          </button>
                          <Link href="/readingcourseZ">
                            <button
                              className="btn btn-danger"
                              style={{ width: '45%', fontSize: '20px' }}
                            >
                              <FontAwesomeIcon
                                icon={faHandPointer}
                                size="1x"
                                color="white"
                              />{' '}
                              毎日練習をスタート
                            </button>
                          </Link>
                        </button>
                        {/* </Link> */}
                      </div>
                    )}
                    {val.courseName == 'CourseSD_SC' && (
                      /*shadowingSelfCourse*/
                      <div className="col-lg-6 col-md-12 mt-5">
                        <button
                          className="banner-content"
                          style={{
                            backgroundColor: '#EBF5FB',
                            height: 'auto',
                            border: '5px solid #2C3E50',
                            borderRadius: '10px',

                            marginBottom: '10px',
                            alignItems: 'center',
                            padding: 0,
                          }}
                        >
                          <div className="single-courses-box ">
                            <div className="courses-image ">
                              <div
                                // className="price shadow"
                                style={{
                                  display: 'inline-block',
                                  // backgroundColor: '#fe4a55',
                                  color: '#ffffff',
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '50%',
                                  position: 'absolute',
                                  right: '10px',
                                  bottom: '-29.5px',
                                  textAlign: 'center',
                                  lineHeight: '67px',
                                  fontSize: '24px',
                                  fontWeight: 800,
                                }}
                              >
                                <FireViewShadowing thisSubject="SELF SHADOWING" />
                                {/* セルフ学習 */}
                              </div>
                            </div>
                          </div>
                          <h5
                            style={{
                              color: '#808B96',
                              fontWeight: '900',
                              fontSize: '15px',
                            }}
                          >
                            INPUT PROGRAM
                          </h5>

                          <h5
                            style={{
                              color: 'black',
                              fontWeight: '900',
                            }}
                          >
                            SHADOWING & DICTATION
                          </h5>
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                              fontWeight: 'normal',
                            }}
                          >
                            シャドーイング&ディクテーション
                          </p>
                          <img
                            src="images/icon-a-shadowing.png"
                            style={{ width: '45%' }}
                          />
                          <br />
                          <h6 style={{ color: '#666666', marginTop: '10px' }}>
                            SELF STUDY
                          </h6>

                          <button
                            className="btn btn-warning"
                            style={{ width: '45%', fontSize: '20px' }}
                            onClick={() => {
                              setIsNotReady(true)
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faHandPointer}
                              size="1x"
                              color="black"
                            />{' '}
                            教材の
                            <br />
                            進捗状況
                          </button>
                          <Link href="/shadowingSelfcourse">
                            <button
                              className="btn btn-danger"
                              style={{ width: '45%', fontSize: '20px' }}
                            >
                              <FontAwesomeIcon
                                icon={faHandPointer}
                                size="1x"
                                color="white"
                              />
                              毎日練習をスタート
                            </button>
                          </Link>
                        </button>
                      </div>
                    )}
                    {val.courseName == 'CourseSD' && (
                      /*shadowingSelfCourse*/
                      <div className="col-lg-6 col-md-12 mt-5">
                        <button
                          className="banner-content"
                          style={{
                            backgroundColor: '#EBF5FB',
                            height: 'auto',
                            border: '5px solid #2C3E50',
                            borderRadius: '10px',

                            marginBottom: '10px',
                            alignItems: 'center',
                            padding: 0,
                          }}
                        >
                          <div className="single-courses-box ">
                            <div className="courses-image ">
                              <div
                                // className="price shadow"
                                style={{
                                  display: 'inline-block',
                                  // backgroundColor: '#fe4a55',
                                  color: '#ffffff',
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '50%',
                                  position: 'absolute',
                                  right: '10px',
                                  bottom: '-29.5px',
                                  textAlign: 'center',
                                  lineHeight: '67px',
                                  fontSize: '24px',
                                  fontWeight: 800,
                                }}
                              >
                                <FireViewShadowing thisSubject="SHADOWING" />
                                {/* セルフ学習 */}
                              </div>
                            </div>
                          </div>
                          <h5
                            style={{
                              color: '#808B96',
                              fontWeight: '900',
                              fontSize: '15px',
                            }}
                          >
                            INPUT PROGRAM
                          </h5>

                          <h5
                            style={{
                              color: 'black',
                              fontWeight: '900',
                            }}
                          >
                            SHADOWING & DICTATION
                          </h5>
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                              fontWeight: 'normal',
                            }}
                          >
                            シャドーイング&ディクテーション
                          </p>
                          <img
                            src="images/icon-a-shadowing.png"
                            style={{ width: '45%' }}
                          />
                          <br />
                          <h6 style={{ color: '#666666', marginTop: '10px' }}>
                            SELF STUDY FOR LESSON
                          </h6>

                          <button
                            className="btn btn-warning"
                            style={{ width: '45%', fontSize: '20px' }}
                            onClick={() => {
                              setIsNotReady(true)
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faHandPointer}
                              size="1x"
                              color="black"
                            />{' '}
                            教材の
                            <br />
                            進捗状況
                          </button>
                          <Link href="/shadowingcourse">
                            <button
                              className="btn btn-danger"
                              style={{ width: '45%', fontSize: '20px' }}
                            >
                              <FontAwesomeIcon
                                icon={faHandPointer}
                                size="1x"
                                color="white"
                              />
                              毎日練習をスタート
                            </button>
                          </Link>
                        </button>
                      </div>
                    )}

                    {val.courseName == 'CourseST' && (
                      <div className="col-lg-6 col-md-12 mt-5">
                        <button
                          className="banner-content"
                          style={{
                            backgroundColor: '#FDEDEC',
                            // width: '90%',
                            border: '5px solid #2C3E50',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            alignItems: 'center',
                            paddingTop: '30px',
                            paddingLeft: '0px',
                            paddingRight: '0px',
                            paddingBottom: '0px',
                          }}
                        >
                          <h5
                            style={{
                              color: '#808B96',
                              fontWeight: '900',
                              fontSize: '15px',
                            }}
                          >
                            OUTPUT PROGRAM
                          </h5>
                          <h5
                            style={{
                              color: 'black',
                              fontWeight: '900',
                            }}
                          >
                            SHOW AND TELL
                          </h5>
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                              fontWeight: 'normal',
                            }}
                          >
                            ショー&テル
                          </p>
                          <img
                            src="images/icon-a-showandtell.png"
                            style={{ height: '100px' }}
                          />
                          <h6 style={{ color: '#666666', marginTop: '10px' }}>
                            50-MIN LESSON PER WEEK
                          </h6>
                          <button
                            className="btn btn-primary"
                            style={{ width: '45%', fontSize: '20px' }}
                          >
                            <FontAwesomeIcon
                              icon={faDesktop}
                              size="1x"
                              color="white"
                            />
                            <br />
                            レッスン有
                          </button>
                          <Link href="/outputShowAndTellCourse">
                            <button
                              className="btn btn-danger"
                              style={{ width: '45%', fontSize: '20px' }}
                            >
                              <FontAwesomeIcon
                                icon={faHandPointer}
                                size="1x"
                                color="white"
                              />{' '}
                              毎日練習をスタート
                            </button>
                          </Link>
                        </button>
                      </div>
                    )}
                    {val.courseName == 'CourseDI' && (
                      <div className="col-lg-6 col-md-12 mt-2">
                        <Link href="/">
                          <button
                            className="banner-content"
                            style={{
                              backgroundColor: '#FDEDEC',
                              // width: '90%',
                              border: '5px solid #2C3E50',
                              borderRadius: '10px',
                              marginBottom: '10px',
                              alignItems: 'center',
                              paddingTop: '30px',
                              paddingLeft: '0px',
                              paddingRight: '0px',
                              paddingBottom: '0px',
                            }}
                          >
                            <h5
                              style={{
                                color: '#808B96',
                                fontWeight: '900',
                                fontSize: '15px',
                              }}
                            >
                              OUTPUT PROGRAM
                            </h5>
                            <h5
                              style={{
                                color: 'black',
                                fontWeight: '900',
                              }}
                            >
                              DISCUSSION
                            </h5>
                            <p
                              style={{
                                color: '#666666',
                                fontSize: '12px',
                                fontWeight: 'normal',
                              }}
                            >
                              ディスカッション
                            </p>
                            <img
                              src="images/icon-a-shadowing.png"
                              style={{ width: '50%' }}
                            />
                            <h6 style={{ color: '#666666', marginTop: '10px' }}>
                              50-MIN LESSON PER WEEK
                            </h6>
                            <span
                              className="btn btn-primary"
                              style={{ width: '40%' }}
                            >
                              レッスン有
                            </span>{' '}
                            <button
                              className="btn btn-danger"
                              style={{ width: '40%' }}
                            >
                              毎日練習
                            </button>
                          </button>
                        </Link>
                      </div>
                    )}
                    {val.courseName == 'CourseGR' && <p>grammarCourse</p>}
                    {val.courseName == 'CourseEK' && <p>EikenCourse</p>}
                    {val.courseName == 'CourseMR' && <p>mouthWritingCourse</p>}
                  </>
                )
              })}
            </div>
            <SweetAlert
              title="前のページに戻ることはできません。"
              show={isOpenBackMypage}
              onConfirm={() => setIsOpenBackMypage(false)}
              confirmBtnText="戻らない"
              cancelBtnText=""
              showCancel={false}
              reverseButtons={true}
              style={{ width: '600px' }}
            >
              <p>
                前のページに戻るとこのステップのポイントは無効になりますので、ご注意ください。
              </p>
            </SweetAlert>
            <SweetAlert
              title="サービス準備中です。"
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
          </div>
          {/* <div>
            <AnimatedModal />
          </div> */}
        </QuizContext.Provider>
        <CopyrightFooter />
      </div>
    </>
  )
}

export default App
