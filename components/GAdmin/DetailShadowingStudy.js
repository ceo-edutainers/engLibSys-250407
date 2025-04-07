import react, { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import Link from 'next/link'

const AlertTop1 = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [userInfo, setUserInfo] = useState([])
  const [basicInfo, setBasicInfo] = useState([])

  // useEffect(() => {
  //   if (localStorage.getItem('G_loginStatus') == 'true') {
  //     var cbn = localStorage.getItem('cbm')
  //     var url = DB_CONN_URL + '/get-sys_member_lesson_set_GroupAdmin/'
  //     var Url = url + cbn
  //     const fetchData1 = async () => {
  //       try {
  //         axios.get(Url).then((response) => {
  //           if (!response.data.status) {
  //           } else {
  //             setBasicInfo(response.data.response)
  //           }
  //         })
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }

  //     fetchData1()
  //   }
  // }, [])

  useEffect(() => {
    if (localStorage.getItem('G_loginStatus') == 'true') {
      var cbn = localStorage.getItem('cbm')
      var url = DB_CONN_URL + '/get-member-reading-history-total/'
      var Url = url + cbn

      const fetchData = async () => {
        try {
          const response = await axios.get(Url)
          // alert(response.data.status)
          setUserInfo(response.data.response)
          // alert(response.data.totalPoint)
          console.log('info:', response.data.response)
        } catch (error) {
          alert(error)
        }
      }
      fetchData()
    }
  }, [])
  return (
    <>
      <div
        className=" pb-2 pt-3 pl-3 pr-3"
        style={{
          backgroundColor: '#dedede',
          border: '1px solid #dedede',
          borderRadius: '10px',
        }}
      >
        <h4 style={{ fontWeight: '600' }}>
          リーディング勉強履歴&nbsp;{' '}
          {/* <span className="btn btn-info pt-0 pb-0 mr-2">詳細</span> */}
        </h4>
        <hr />
        <b>
          {' '}
          <span style={{ color: 'green' }}>
            シャドーイングの勉強をした最近の日
          </span>
        </b>
        <hr />
        {userInfo &&
          userInfo.map((val, key) => {
            if (val.lessonStatusReason != '') {
              var reason = val.lessonStatusReason
            } else {
              if (val.lessonStatus == 'no show') {
                var reason = '連絡なしでレッスンに現れない'
              } else if (val.lessonStatus == 'no hw') {
                var reason =
                  'レッスン10分前まで課題提出がなかったため、自動キャンセル'
              } else if (val.lessonStatus == 'today-cancelled') {
                var reason = '当日キャンセル[理由不明]'
              } else if (val.lessonStatus == 'cancelled') {
                var reason = '個人的な理由でキャンセル'
              } else if (val.lessonStatus == 'ill-cancelled') {
                var reason = '病気'
              }
            }

            return (
              <>
                <p>
                  <strong>
                    {key + 1}.&nbsp;{val.name_eng}
                    <span style={{ color: 'red' }}>[{val.yoyakuDate}]</span>
                    <p style={{ color: 'blue' }}>&nbsp;&nbsp;{reason}</p>
                  </strong>
                </p>
              </>
            )
          })}
      </div>
    </>
  )
}

export default AlertTop1
