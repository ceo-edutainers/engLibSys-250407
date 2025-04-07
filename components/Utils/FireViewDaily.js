/** @format */
import React, { useState, useEffect } from 'react'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import fireRed from './img/fire.png'
import fireGray from './img/fire-gray.png'

const FireViewDaily = ({ mbn, thisSubject, date }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [fireViewCount, setFireViewCount] = useState()
  const [fireInfo, setFireInfo] = useState([])

  // const [thisSubject, setThisSubject] = useState(subject)

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        var Url =
          DB_CONN_URL +
          '/get-hw-history-fireView-view-daily/' +
          mbn +
          '&' +
          thisSubject +
          '&' +
          date

        // alert(Url)

        const response = await axios.get(Url)
        // alert(response.data.length)
        setFireInfo(response.data.response)
        setFireViewCount(response.data.response[0].fireView)
      } catch (error) {
        console.log(error)
        // alert(error)
      }
    }

    fetchData2()
  }, [])

  return (
    <>
      {/* {fireInfo.map((item, index) => (
        <>
          {item.autoid}
          <br />
          {item.endDate}
          <br />
          {item.member_barcode_num}
          <br />
          {item.fireView}
          <br />
        </>
      ))} */}

      {fireViewCount > 0 ? (
        <div
          style={{
            backgroundImage: `url(${fireRed.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            // backgroundSize: '50%', // 画像サイズを50%に変更
            backgroundRepeat: 'no-repeat',
            width: 'auto',
            height: '100px',
            textAlign: 'center',
            paddingTop: '50px',
          }}
          // aria-label="毎日続けて練習すると(最後のステップまで終了する)、その日数がここに表示されます。1日でもできない日があった場合、この数字はリセットされます。7日達成毎にモンスターを一個ゲットできます。ゲットしたモンスターは色が変わります。"
          data-balloon-pos="right"
          data-balloon-length="large"
        >
          <span
            style={{
              fontSize: '30px',
              fontWeight: '600',
              color: 'white',

              // paddingRight: '12px',
            }}
          >
            {fireViewCount}
          </span>
        </div>
      ) : (
        <div
          style={{
            // backgroundImage: `url(${fireGray.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: 'auto',
            height: '100px',
            textAlign: 'center',
            paddingTop: '50px',
          }}
          // aria-label="毎日続けて練習すると(最後のステップまで終了する)、その日数がここに表示されます。1日でもできない日があった場合、この数字はリセットされます。7日達成毎にモンスターを一個ゲットできます。ゲットしたモンスターは色が変わります。"
          data-balloon-pos="right"
          data-balloon-length="large"
        >
          <span
            style={{
              fontSize: '30px',
              fontWeight: '600',
              color: 'white',
            }}
          >
            X
          </span>
        </div>
      )}
    </>
  )
}

export default FireViewDaily
