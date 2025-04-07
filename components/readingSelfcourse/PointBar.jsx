import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import { QuizContext } from './ContextsB'
import Router from 'next/router'
import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import SweetAlert from 'react-bootstrap-sweetalert'

const PointBar = ({ cStep, pageTitle, pageSubTitle, bcolor, pointKeyNum }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [thisBgColor, setThisBgColor] = useState(bcolor)
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [pointInfo, setPointInfo] = useState([])
  const [thisStepPoint, setThisStepPoint] = useState()
  const [thisStepPointMulti, setThisStepPointMulti] = useState('')
  const [totalPoint, setTotalPoint] = useState()
  const [todaysPoint, setTodaysPoint] = useState()
  const [HWtotalPoint, setHWtotalPoint] = useState()
  const [pointNoMulti, setPointNoMulti] = useState(
    'このステップでゲットできるポイントです。次のステップに行く時にポイントが加算されます。'
  )

  const [pointNoMulti2, setPointNoMulti2] = useState(
    'このステップでゲットできるポイントです。次のステップに行く時にポイントが加算されます(200単語以上書いた場合1回のみ)'
  )
  const [pointNoMulti3, setPointNoMulti3] = useState(
    'このステップでゲットできるポイントです。次のステップ(終了ページ)に行く時にポイントが加算されます(300単語以上書いた場合1回のみ)'
  )

  const [pointMulti, setPointMulti] = useState(
    'このステップでゲットできるポイントです。次のステップに行く時にポイントが加算されます(毎回)'
  )
  const { HWID, setHWID, userName, setUserName } = useContext(QuizContext)

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

  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    //console.log('step2/myMbn:', myMbn)

    var Url = DB_CONN_URL + '/get-member-point-history/' + mbn + '&' + HWID

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        //alert(response.data.totalPoint)

        setTotalPoint(response.data.totalPoint)
        setTodaysPoint(response.data.todaysPoint)
        setHWtotalPoint(response.data.HWtotalPoint)
        console.log('totalPoint', totalPoint)
        console.log('todaysPoint', todaysPoint)
        console.log('HWtotalPoint', HWtotalPoint)
        // setHWbookInfo(response.data)
        // setAudioDurtaionFromDB(response.data[0].audioDuration)
        // setHWID(response.data[0].homework_id)
      } catch (error) {
        console.log(error)
        alert(error)
        // setError(true)
      }

      // setLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    // alert(pointKeyNum)
    var url = DB_CONN_URL + '/get-point-set-info/'
    var Url = url + pointKeyNum

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        //alert(response.data.message)
        //alert(response.data.length)
        //setHWbookInfo(response.data)
        setPointInfo(response.data)
        setThisStepPoint(response.data[0].getPoint)
        setThisStepPointMulti(response.data[0].multiplePointAdd)
        //alert(pointInfo)
        console.log('pointInfo', pointInfo)
        console.log('thisStepPoint', thisStepPoint)
        console.log('thisStepPointMulti', thisStepPointMulti)
      } catch (error) {
        console.log(error)
        alert(error)
      }

      // setLoading(false)
    }

    fetchData()
  }, [])
  return (
    <>
      <div
        className="QuizBig mb-0 mt-1"
        style={{ backgroundColor: '#c799ff', border: 0, color: 'white' }}
      >
        {/* <MediaQuery query="(max-width: 414px">test ~414</MediaQuery> */}
        {/* <MediaQuery query="(min-width: 414px) and (max-width: 767px"> */}

        {/* test 415~991 */}
        {/* <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12">
              <div
                className="col-lg-5 col-md-12"
                style={{
                  textAlign: 'left',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className="banner-content">
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      fontSize: '25px',
                    }}
                  >
                    <font color="black">
                      <b>{pageTitle}</b>
                    </font>
                  </span>
                  <p
                    style={{
                      color: 'black',
                      paddingTop: 0,
                      marginTopo: 0,
                      fontWeight: '600',
                      fontSize: '15px',
                    }}
                  >
                    {pageSubTitle}
                  </p>
                </div>
              </div>
              <div
                className="col-lg-12 col-md-12 p-0"
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
             
                <p style={{ fontSize: '10px' }}>{userName}</p>
              </div>

              <div
                className="col-lg-12 col-md-12  "
                style={{
                  textAlign: 'center',
                }}
              >
                <div className="banner-content">
                  <h4
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    <span
                      style={{ color: '#2C3E50' }}
                      aria-label="全てのコースからゲットした今日のポイント"
                      data-balloon-pos="left"
                      data-balloon-length="medium"
                    >
                      Today:{!todaysPoint ? 0 : todaysPoint}point
                    </span>
                  </h4>
                  <span
                    aria-label="全てのコースからゲットした今までのトータルポイント"
                    data-balloon-pos="right"
                    data-balloon-length="medium"
                    style={{ color: 'black' }}
                  >
                    Total:
                    {!totalPoint ? 0 : totalPoint}point
                  </span>
                </div>

                {pointInfo.map((val, key) => {
                  return (
                    <>
                      <p
                        style={{
                          fontSize: '20px',
                          color: 'black',
                          // paddingTop: '5px',
                          paddingBottom: 0,
                          marginBottom: 0,
                          lineHeight: 2.5,
                          marginTop: 0,
                          fontWeight: 'bold',
                        }}
                      >
                        １録音: {thisStepPoint}p
                      </p>
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </div> */}

        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-5 col-md-12"
              style={{
                textAlign: 'left',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div className="banner-content">
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: '25px',
                  }}
                >
                  <font color="black">
                    <b>{pageTitle}</b>
                  </font>
                </span>
                <p
                  style={{
                    color: 'black',
                    paddingTop: 0,
                    marginTopo: 0,
                    fontWeight: '600',
                    fontSize: '15px',
                  }}
                >
                  {pageSubTitle}
                </p>
              </div>
            </div>
            <div
              className="col-lg-2 col-md-12 p-0"
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src="images/logo-tomei.png"
                style={{ width: '50%', maxWidth: '50px' }}
              />
              <p style={{ fontSize: '10px' }}>{userName}</p>
            </div>

            <div
              className="col-lg-4 col-md-12  "
              style={{
                textAlign: 'right',
              }}
            >
              <div className="banner-content">
                <h4
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  <span
                    style={{ color: '#2C3E50' }}
                    aria-label="全てのコースからゲットした今日のポイント"
                    data-balloon-pos="left"
                    data-balloon-length="medium"
                  >
                    Today:{!todaysPoint ? 0 : todaysPoint}point
                  </span>
                </h4>
                <span
                  aria-label="全てのコースからゲットした今までのトータルポイント"
                  data-balloon-pos="right"
                  data-balloon-length="medium"
                  style={{ color: 'black' }}
                >
                  Total:
                  {!totalPoint ? 0 : totalPoint}point
                </span>
              </div>
            </div>
            <div
              className="col-lg-1 col-md-12 mr-0 pr-0"
              style={{
                textAlign: 'right',
              }}
            >
              {pointInfo.map((val, key) => {
                return (
                  <>
                    <div className="single-courses-item-box  mr-0 pr-0">
                      {val.multiplePointAdd == '' ? (
                        <div
                          className="courses-image mt-3  mr-0 pr-0"
                          aria-label={pointMulti}
                          data-balloon-pos="right"
                          data-balloon-length="medium"
                        >
                          <div className="price shadow  mr-0 pr-0">
                            <p
                              style={{
                                fontSize: '10px',
                                color: 'white',
                                paddingTop: '5px',
                                paddingBottom: 0,
                                marginBottom: 0,
                                lineHeight: 2.5,
                                marginTop: 0,
                              }}
                            >
                              1回録音
                            </p>
                            {thisStepPoint}p
                          </div>
                        </div>
                      ) : (
                        <div
                          className="courses-image mt-3  mr-0 pr-0"
                          aria-label={pointNoMulti}
                          data-balloon-pos="right"
                          data-balloon-length="medium"
                        >
                          <div
                            className="price shadow  mr-0 pr-0"
                            style={{ lineHeight: 1 }}
                          >
                            <p
                              style={{
                                fontSize: '10px',
                                color: 'white',
                                paddingTop: '5px',
                                paddingBottom: 0,
                                marginBottom: 0,
                                lineHeight: 2.5,
                                marginTop: 0,
                              }}
                            >
                              １録音
                            </p>
                            {thisStepPoint}p
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>

        <SweetAlert
          title="前のページに戻ることはできません。"
          show={isOpenBackMypage}
          onConfirm={() => setIsOpenBackMypage(false)}
          confirmBtnText="OK"
          cancelBtnText=""
          showCancel={false}
          reverseButtons={true}
          style={{ width: '600px' }}
        >
          <p>
            前のページに戻るとこのステップのポイントは無効になりますので、ご注意ください。
          </p>
        </SweetAlert>
      </div>
    </>
  )
}

export default PointBar
