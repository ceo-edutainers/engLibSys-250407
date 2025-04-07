import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import Router from 'next/router'

const PointBar = ({
  cStep,
  pageTitle,
  pageSubTitle,
  bcolor,
  pointKeyNum,
  HWID,
  mbn,
}) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [thisBgColor, setThisBgColor] = useState(bcolor)
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [pointInfo, setPointInfo] = useState([])
  const [thisStepPoint, setThisStepPoint] = useState()
  const [thisStepPointMulti, setThisStepPointMulti] = useState('')

  // const [nextQInsert, setNextQInsert] = useState('')
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

  useEffect(() => {
    // ブラウザバックを禁止する
    const fetchData = async () => {
      try {
        history.pushState(null, null, location.href)
        window.addEventListener('popstate', (e) => {
          setIsOpenBackMypage(true)
          // alert(
          //   'ブラウザバックはできません。練習をやめる時はページの下にある練習を止めるボタンを押してください。'
          // )
          // history.go(1)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return false
  }, [])

  // useEffect(() => {
  //   // ブラウザリロード禁止
  //   const fetchData = async () => {
  //     try {
  //       // history.pushState(null, null, location.href)
  //       window.addEventListener('beforeunload', (event) => {
  //         event.preventDefault()
  //         event.returnValue = 'Are you sure you want to exit?'
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  //   return false
  // }, [])

  useEffect(() => {
    //console.log('step2/myMbn:', myMbn)

    var Url = DB_CONN_URL + '/get-member-point-history/' + mbn + '&' + HWID

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        //alert(response.data.totalPoint)

        // setTotalPoint(response.data.totalPoint)
        const formattedTotalPoint = new Intl.NumberFormat('ja-JP').format(
          response.data.totalPoint || 0
        )
        setTotalPoint(formattedTotalPoint)

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
  }, [mbn])

  // useEffect(() => {
  //   // alert(pointKeyNum)
  //   var url = DB_CONN_URL + '/get-point-set-info/'
  //   var Url = url + pointKeyNum

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(Url)

  //       //alert(response.data.message)
  //       //alert(response.data.length)
  //       //setHWbookInfo(response.data)
  //       setPointInfo(response.data)
  //       setThisStepPoint(response.data[0].getPoint)
  //       setThisStepPointMulti(response.data[0].multiplePointAdd)
  //       //alert(pointInfo)
  //       console.log('pointInfo', pointInfo)
  //       console.log('thisStepPoint', thisStepPoint)
  //       console.log('thisStepPointMulti', thisStepPointMulti)
  //     } catch (error) {
  //       console.log(error)
  //       alert(error)
  //     }

  //     // setLoading(false)
  //   }

  //   fetchData()
  // }, [])
  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-lg-12 col-md-12  "
            style={{
              textAlign: 'center',
            }}
          >
            <div className="banner-content">
              <h6
                style={{
                  // fontWeight: 'bold',
                  color: 'white',
                }}
              >
                <span style={{ color: '#2C3E50' }}>
                  {/* This H.W:{' '} */}
                  earned from this homework{' '}
                  <span
                    style={{
                      fontWeight: '900',
                      color: 'red',
                      fontSize: '20px',
                    }}
                  >
                    {!HWtotalPoint ? 0 : HWtotalPoint}
                  </span>
                  {HWtotalPoint < 2 ? ' pt' : ' pt'}
                </span>
              </h6>
              <span style={{ color: 'black' }}>
                Total Point: {!totalPoint ? 0 : totalPoint}&nbsp;pt
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* </MediaQuery> */}
    </>
  )
}

export default PointBar
