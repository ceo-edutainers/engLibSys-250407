/** @format */
import React, { useState, useEffect } from 'react'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import fireRed from './img/fire_showandtell.png'

const FireView = ({ thisSubject }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [fireViewCount, setFireViewCount] = useState()

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      // alert(thisSubject)
      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-history-fireView/'
          var Url = url + mbn + '&' + thisSubject
          const response = await axios.get(Url)
          //console.log('fireView', response.data.response[0].fireView)

          if (!response.data.length) {
            // alert(response.data.message)
            setFireViewCount(0)
          } else {
            // alert(response.data.message)
            if (response.data.response[0].fireView == '') {
              setFireViewCount(0)
            } else {
              setFireViewCount(response.data.response[0].fireView)
            }
          }
        } catch (error) {
          console.log(error)
          alert(error)
        }
      }

      fetchData2()
    }
  }, [])
  return (
    <div>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <div
        style={{
          backgroundImage: `url(${fireRed.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: 'auto',
          height: '100px',
          textAlign: 'center',
          paddingTop: '50px',
        }}
        aria-label="毎日続けて練習すると、その日数がここに表示されます。1日でもできない日があった場合、この数字は０にリセットされます。7日達成毎にモンスターを一個ゲットできます。ゲットしたモンスターは色が変わります。"
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
      {/* </MediaQuery> */}
      {/* <MediaQuery query="(max-width: 767px)">
      <div
        style={{
          backgroundImage: `url(${fireRed.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          paddingTop: '40px',
          // width: 'auto', //no mobile view
          // height: '140px', //no mobile view
        }}
        aria-label="毎日続けて練習する場合、続けて練習した日数が表示されます。1日でも練習できなかった日があったら「0」に戻ります。"
        data-balloon-pos="up"
        data-balloon-length="large"
      >
        <span
          style={{
            fontSize: '35px',
            fontWeight: '600',
            color: 'white',
          }}
        >
          {fireViewCount}
        </span>
      </div>
      </MediaQuery> */}
    </div>
  )
}

export default FireView
