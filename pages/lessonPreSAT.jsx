// CSS mypage_for_adult.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import GoogleDoc from '@/components/GoogleDoc/GoogleDoc'
import Router, { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MyHeaderMenu from '@/components/MypageGroup/myHeaderMenu'
import { QuizContext } from '@/components/MypageGroup/Contexts'
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
} from '@fortawesome/free-solid-svg-icons'

// ['menu', 'playing', 'finished']

function lessonPre() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const { myMbn, setMyMbn, userName, setUserName } = useContext(QuizContext)
  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const router = useRouter() //使い方：router.replace('/')
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isNotReady, setIsNotReady] = useState(false)
  const [isTodayLessonDay, setIsTodayLessonDay] = useState(false)
  const [isTodayLessonTime, setIsTodayLessonTime] = useState(false)

  const [myCourseList, setMyCourseList] = useState([])
  // const [HWID, setHWID] = useState('') //homework_idを入れる
  const [practiceTempId, setPracticeTempId] = useState('')
  // const [eikenLevel, setEikenLevel] = useState('')
  const [nokoriMin, setNokoriMin] = useState()

  const [google_doc_link, setGoogleDocLink] = useState()
  const [classLink, setClassLink] = useState()

  //今日がレッスン日なのかをチェック
  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')

      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/'
          var Url = url + mbn
          const response = await axios.get(Url)

          var yoyakuDate = response.data[0].yoyakuDate
          var yoyakuTime = response.data[0].yoyakuTime

          //regdate & regtime START
          var d = ''
          var d = new Date()
          var Y = d.getFullYear()
          var M = d.getMonth() + 1
          var D = d.getDate()
          var h = d.getHours()
          var m = d.getMinutes()
          var s = d.getSeconds()
          // let ms = myFun_addZero(d.getMilliseconds())

          if (M < 10) {
            M = '0' + M
          }
          if (D < 10) {
            D = '0' + D
          }
          if (h < 10) {
            h = '0' + h
          }
          if (m < 10) {
            m = '0' + m
          }
          if (s < 10) {
            s = '0' + s
          }
          var NowRegdate = Y + '-' + M + '-' + D
          var NowRegtime = h + ':' + m + ':' + s

          if (NowRegdate !== yoyakuDate) {
            // alert(
            //   '本日はレッスン日では有りません。' + yoyakuDate + '/' + NowRegdate
            // )
            //setIsTodayLessonDay(true)
            alert(
              'レッスン日ではないため、アクセスできません。過去の添削ドキュメントはマイページのレッスン歴からアクセスできます。'
            )

            redirectToTop()
            return false
          } else {
            // alert(response.data[0].name_eng)
            // alert(response.data[0].lessonStatus)
            setGoogleDocLink(response.data[0].google_doc_link)
            setClassLink(response.data[0].classLink)
          }
        } catch (error) {
          alert(error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }, [])

  const redirectToTop = () => {
    router.replace('/mytopGroup')
    return false
  }

  // //今日がレッスン日なのかをチェック
  // useEffect(() => {
  //   if (localStorage.getItem('loginStatus') == 'true') {
  //     var mbn = localStorage.getItem('MypageMbn')

  //     const fetchData2 = async () => {
  //       try {
  //         var url = DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/'
  //         var Url = url + mbn
  //         const response = await axios.get(Url)
  //         if (response.data[0].lessonStatus == 'finished') {
  //           alert(response.data[0].name_eng)
  //           alert(response.data[0].lessonStatus)
  //           router.push('/myGroupTop')
  //         } else {
  //           alert(response.data[0].name_eng)
  //           alert(response.data[0].lessonStatus)
  //           setGoogleDocLink(response.data[0].google_doc_link)
  //           setClassLink(response.data[0].classLink)
  //         }
  //       } catch (error) {
  //         alert(error)
  //         console.log(error)
  //       }
  //     }

  //     fetchData2()
  //   }
  // }, [])
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

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      var url = DB_CONN_URL + '/get-all-list-sys_member_lesson_set_BtoB/'
      var Url = url + mbn

      const fetchData1 = async () => {
        try {
          axios.get(Url).then((response) => {
            if (response.data.status == false) {
              alert('db select failed')
            } else {
              //メンバーデーターが登録されてない時に以下のようにエラーを出して、ログアウトされる
              // alert(response.data.status)
              if (response.data.length) {
                alert(response.data.message)
                // alert(response.data.mbn)
                localStorage.removeItem('token', '')
                localStorage.removeItem('loginStatus', '')
                localStorage.removeItem('email', '')
                localStorage.removeItem('mbn', '')
                router.replace('/loginGroup') // ここでリダイレクト
                // return false
              } else {
                // alert(response.data.message)
                setMyCourseList(response.data.response)
                console.log('myCourseList', myCourseList)
              }
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
        <MyHeaderMenu />
        <div className="row pt-3">
          <div className="col-lg-12 col-md-12 mt-3">
            <h1
              style={{
                fontWeight: '900',
                fontSize: '30px',
                marginBottom: 0,
                paddingBottom: 0,
              }}
            >
              Show And Tell Lesson Page
            </h1>
          </div>
        </div>
        <div
          className="QuizMpa p-0"
          style={{ backgroundColor: 'white', border: '0px' }}
        >
          <div
            className="col-lg-12 col-md-12  p-0"
            style={{
              textAlign: 'center',
            }}
          >
            <a href={classLink} target="_blank">
              <button
                className="btn btn-primary"
                style={{
                  // backgroundColor: '#F7DC6F',
                  width: '99%',
                  height: '50px',
                  // border: '1px solid #cc99ff',
                  borderRadius: '10px',
                  margin: 0,
                  padding: 0,
                  // marginLeft: '10px',

                  fontSize: '20px',
                  fontWeight: 'normal',
                  color: 'white',
                  opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                  // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                }}
              >
                <FontAwesomeIcon icon={faLaptop} size="1x" color="black" />
                このボタンを押すとZoomレッスンに参加できます。
              </button>
              <p className="mt-3" style={{ color: 'red' }}>
                以下のGoogle-Docを開けた状態のままZoomに入ってください。
                <br />
                もしGoogle-Docが見えない場合は、先生がGoogle-Docを生成するまでお待ちください。
              </p>
              <p className="mt-3" style={{ color: 'red' }}>
                レッスン時間に遅れるとレッスン時間が短くなりますのでご注意ください。
              </p>
            </a>
          </div>
        </div>
        <div className="mb-3 p-0 mt-1" style={{ width: '1000px' }}>
          {google_doc_link && <GoogleDoc embedUrl={google_doc_link} />}
        </div>
        <CopyrightFooter />
      </div>
      <SweetAlert
        title="レッスン日ではないため、アクセスできません。"
        show={isTodayLessonDay}
        onConfirm={() => setIsTodayLessonDay(false)}
        // onCancel={() => {
        //   setIsTodayLessonDay(false)
        // }}
        confirmBtnText="OK"
        // cancelBtnText="戻る"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p></p>
      </SweetAlert>
    </>
  )
}

export default lessonPre
