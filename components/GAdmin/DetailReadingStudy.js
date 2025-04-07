import react, { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import Link from 'next/link'

const AlertTop1 = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
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
      var url = DB_CONN_URL + '/get-member-cancel-history-total/'
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
          リーディング勉強履歴nbsp;{' '}
          {/* <span className="btn btn-info pt-0 pb-0 mr-2">詳細</span> */}
        </h4>
        <hr />
        <b>
          {' '}
          <span style={{ color: 'green' }}>
            リーディングの勉強をした最近の日
          </span>
        </b>
        <hr />
        {userInfo &&
          userInfo.map((val, key) => {
            return (
              <>
                <p>
                  <strong>
                    {key + 1}.&nbsp;{val.name_eng}
                    <span style={{ color: 'red' }}>[{val.yoyakuDate}]</span>
                    <p style={{ color: 'blue' }}></p>
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
