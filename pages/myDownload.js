// CSS mypage_for_adult.css

import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
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

function App() {
  const { myMbn, setMyMbn, userName, setUserName } = useContext(QuizContext)
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const router = useRouter() //使い方：router.replace('/')
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isNotReady, setIsNotReady] = useState(false)
  const [myHistoryList, setMyHistoryList] = useState([])
  // const [HWID, setHWID] = useState('') //homework_idを入れる
  const [practiceTempId, setPracticeTempId] = useState('')
  // const [eikenLevel, setEikenLevel] = useState('')

  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')

    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-show-and-tell-member-history/'
        var Url = url + mbn
        // alert(mbn)
        const response = await axios.get(Url)
        // alert(response.data.message)
        if (response.data.length > 0) {
          setMyHistoryList(response.data)
        } else {
        }

        console.log(response.data)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }

    fetchData2()
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

  const [loginStatus, setLoginStatus] = useState(false) //login時
  let logOut = () => {
    setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
    localStorage.removeItem('name_eng', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginGroup')
  }

  return (
    <div className="AppBig">
      {/* <MonsterGet /> */}
      {/* <p> {practiceTempId}</p> */}

      <MyHeaderMenu />
      <div
        className="QuizMpa"
        style={{
          backgroundColor: 'white',
          border: '10px solid #EBEDEF',
          width: '90%',
          margin: '20px',
        }}
      >
        <div className="row">
          <div
            className="col-lg-12 col-md-12 mt-3 mb-3"
            style={{
              width: '100%',
              textAlign: 'center',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          >
            <p
              style={{
                backgroundColor: '#F7DC6F',
                width: '100%',
                border: '1px solid #dedede',
                borderRadius: '10px',
                margin: '0px',
                padding: '10px',
                fontSize: '20px',
                fontWeight: 'normal',
                color: 'black',
                textAling: 'center',
              }}
            >
              ダウンロード
              <br />
              <p>{userName}</p>
            </p>
            <p style={{ color: '#212F3D', fontSize: '15px' }}>
              単語帳など、必要なファイルをダウンロードしてご利用ください。
            </p>
          </div>

          <div className="col-lg-12 col-md-12 mt-3 mb-3">
            <table className="table">
              <thead>
                <tr>
                  <th>カテゴリ</th>
                  <th>内容</th>

                  <th>カテゴリ</th>

                  <th>ダウンロード</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>単語帳</td>
                  <td>単語帳6</td>
                  <td>小学校低学年</td>
                  <td>
                    {' '}
                    <a
                      href="https://myenglib.com/onlesson/online_material/homeworksheet/Voca6-online.pdf"
                      target="_blank"
                    >
                      <span className="btn btn-danger">ダウンロード</span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>単語帳</td>
                  <td>単語帳10</td>
                  <td>小学校高学年以上</td>
                  <td>
                    {' '}
                    <a
                      href="https://myenglib.com/onlesson/online_material/homeworksheet/Voca10-online.pdf"
                      target="_blank"
                    >
                      <span className="btn btn-danger">ダウンロード</span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>単語帳</td>
                  <td>単語帳20</td>
                  <td>小学校高学年以上</td>
                  <td>
                    {' '}
                    <a
                      href="https://myenglib.com/onlesson/online_material/homeworksheet/Voca20-online.pdf"
                      target="_blank"
                    >
                      <span className="btn btn-danger">ダウンロード</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

      <CopyrightFooter />
    </div>
  )
}

export default App
