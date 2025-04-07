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
      var url = DB_CONN_URL + '/get-member-point-history-total/'
      var Url = url + cbn

      const fetchData = async () => {
        try {
          const response = await axios.get(Url)

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
        className="courses-details-desc-style-two pb-2 pt-2 pl-3 pr-3"
        style={{ backgroundColor: '#dedede' }}
      >
        <h2 style={{ fontWeight: '600' }}>Total Point Ranking</h2>

        {userInfo &&
          userInfo.map((val, key) => {
            var tp = val.totalPoint / 3
            return (
              <>
                <p>
                  <strong>
                    {key + 1}.&nbsp;{val.name_eng}[{tp}]
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
