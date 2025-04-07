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
    var url = '/detail?pn=DetailRankingPoint&cbn=' + cbn
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
        className=" pb-2 pt-2 pl-3 pr-3"
        style={{
          backgroundColor: '#F7F7F7',
          border: '1px solid #dedede',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontWeight: '600' }}>Point Ranking</h2>
        <hr />
        <b>
          {' '}
          <span style={{ color: 'green' }}>練習量が多い順</span>
        </b>

        <table className="table table-striped text-right mt-3">
          <thead>
            <tr>
              {/* <th style={{ width: '15px' }}>#</th> */}

              <th scope="col">Name</th>
              <th scope="col">Total Point</th>
              <th scope="col" style={{ width: '10%', textAlign: 'center' }}>
                詳細
              </th>
            </tr>
          </thead>
          <tbody>
            {userInfo &&
              userInfo.map((val, key) => {
                var tp = parseInt(val.totalPoint / 3)
                var detailRankingPoint =
                  '/GAdmin/detailRankingPoint?mbn=' + val.member_barcode_num
                return (
                  <>
                    <tr>
                      {/* <th style={{ width: '15px' }}> {key + 1}.</th> */}

                      <td
                        style={{
                          width: '45%px',
                        }}
                      >
                        {val.name_eng}
                      </td>
                      <td
                        style={{
                          width: '45%px',
                        }}
                      >
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                          {tp.toLocaleString()}
                        </span>
                      </td>
                      <td
                        style={{
                          width: '10%',
                          fontSize: '15px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        <a
                          className="btn btn-primary"
                          href={detailRankingPoint}
                          target="_blank"
                        >
                          詳細
                        </a>
                      </td>
                    </tr>
                  </>
                )
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
