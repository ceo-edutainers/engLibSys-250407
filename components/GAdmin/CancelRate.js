import react, { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import Link from 'next/link'
import SweetAlert from 'react-bootstrap-sweetalert'

const AlertTop1 = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [userInfo, setUserInfo] = useState([])
  const [basicInfo, setBasicInfo] = useState([])

  const [isNotReady, setIsNotReady] = useState(false)

  const [goUrl, setGoUrl] = useState()
  useEffect(() => {
    var cbn = localStorage.getItem('cbm')
    var url = '/detail?pn=DetailCancelRate&cbn=' + cbn
    setGoUrl(url)
    // alert(url)
  }, [])
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
          backgroundColor: '#F7F7F7',
          border: '1px solid #dedede',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontWeight: '600' }}>
          Cancellation History
          {/* <span className="btn btn-info pt-0 pb-0 mr-2">詳細</span> */}
        </h2>
        <hr />
        <b>
          {' '}
          <span style={{ color: 'green' }}>１０ Latest Cancellation</span>{' '}
          <a
            className="btn btn-danger ml-2"
            // href={detailRankingPoint}
            // target="_blank"
            onClick={() => {
              setIsNotReady(true)
            }}
            style={{ color: 'white' }}
          >
            more
          </a>
        </b>
        <table className="table table-striped text-right mt-3">
          <thead>
            <tr>
              {/* <th style={{ width: '15px' }}>#</th> */}

              <th scope="col">Name</th>
              <th scope="col">Lesson</th>
              <th scope="col">Time</th>
              <th
                scope="col"
                style={{
                  textAlign: 'left',
                }}
              >
                Absent Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {userInfo &&
              userInfo.map((val, key) => {
                if (key < 10) {
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
                      <tr>
                        {/* <th style={{ width: '15px' }}> {key + 1}.</th> */}

                        <td
                          style={{
                            width: '15%px',
                          }}
                        >
                          {val.name_eng}
                        </td>
                        <td
                          style={{
                            width: '30%px',
                          }}
                        >
                          {val.yoyakuDate}
                        </td>

                        <td
                          style={{
                            width: '5%px',
                          }}
                        >
                          {val.duringTime}
                        </td>
                        <td
                          style={{
                            width: '50%',
                            fontSize: '15px',
                            textAlign: 'left',
                          }}
                        >
                          <span style={{ color: 'blue', fontSize: '13px' }}>
                            {reason}
                          </span>
                        </td>
                      </tr>
                      {/* <p>
                        <strong>
                          {key + 1}.&nbsp;{val.name_eng}
                          <span style={{ color: 'red' }}>
                            [{val.yoyakuDate}]
                          </span>
                          &nbsp;[{val.duringTime}分]&nbsp;{' '}
                        </strong>
                        <span style={{ color: 'blue', fontSize: '13px' }}>
                          {reason}
                        </span>
                      </p> */}
                    </>
                  )
                }
              })}{' '}
          </tbody>
        </table>
      </div>
      <SweetAlert
        title="近日中にサービス開始予定です。"
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
    </>
  )
}

export default AlertTop1
