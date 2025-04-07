import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const ViewPaymentStudentList = ({ status, orderby }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [memberDetailView, setMemberDetailView] = useState(false)
  const [memberDetailViewMember, setMemberDetailViewMember] = useState(false)

  const [memberInfo, setMemberInfo] = useState([])
  const [memberPayInfo, setMemberPayInfo] = useState([])
  const [memberDetailInfo, setMemberDetailInfo] = useState([])
  const [memberDetailInfoMore, setMemberDetailInfoMore] = useState([])

  useEffect(() => {
    // if (localStorage.getItem('T_loginStatus') == 'true') {
    var Url = DB_CONN_URL + '/member_list_payment'

    axios.get(Url).then((response) => {
      // alert(response.data.message)
      if (!response.data.status) {
      } else {
        setMemberPayInfo(response.data.response)
      }
    })
    // }
  }, [])

  useEffect(() => {
    handleMemberListOrderbyDate(status)
    handleMemberListOrderbyName(status)
  }, [])

  const handleMemberListOrderbyDate = (status) => {
    var currentStatus = status

    var Url = DB_CONN_URL + '/current_member_info_orderby_date/'
    var Url = Url + currentStatus
    axios.get(Url).then((response) => {
      // alert(response.data.message)
      if (!response.data.status) {
      } else {
        setMemberInfo(response.data.response)
      }
    })
    // }
  }

  const handleMemberListOrderbyName = (status) => {
    var currentStatus = status

    var Url = DB_CONN_URL + '/current_member_info_orderby_name/'
    var Url = Url + currentStatus
    axios.get(Url).then((response) => {
      // alert(response.data.message)
      if (!response.data.status) {
      } else {
        setMemberInfo(response.data.response)
      }
    })
    // }
  }

  const handleStatusModify = (mbn, modifyStatus) => {
    var modifyStatus = modifyStatus
    var Url = DB_CONN_URL + '/modify_member_status/'
    var Url = Url + mbn + '&' + modifyStatus

    axios.get(Url).then((response) => {
      alert(response.data.message)
      // alert(response.data.message + '/' + response.data.modifiedStatus)
    })
    // }
  }

  // const handleViewDetailMember = (mbn) => {
  //   setMemberDetailViewMember(!memberDetailViewMember)

  //   var Url = DB_CONN_URL + '/member_info_mbn'

  //   axios
  //     .post(Url, {
  //       mbn: mbn,
  //     })
  //     .then((response) => {
  //       // alert(response.data.message) //for test
  //       if (!response.data.status) {
  //       } else {
  //         // alert(response.data.message) //for test
  //         setMemberDetailInfoMore(response.data.response)
  //       }
  //     })
  // }

  return (
    <>
      <div className="courses-meta">
        <div className="row">
          <div className="col-lg-12 col-md-12 text-center">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">email</th>
                  <th scope="col">Join Date</th>

                  <th scope="col">入会状況</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {memberInfo.map((val, key) => {
                  const isValidDate = !isNaN(Date.parse(val.apply_date))
                  const formattedDate = isValidDate
                    ? new Date(val.apply_date).toISOString().split('T')[0]
                    : 'Invalid Date' // 유효하지 않을 경우 기본값 설정

                  return (
                    <>
                      <tr>
                        <th scope="row">{val.name_eng}</th>
                        <th scope="row">{val.email}</th>
                        <td>{formattedDate}</td>

                        <td>{val.status}</td>
                        <td>
                          {/* <span
                            className="btn-sm btn-primary mr-2"
                            onClick={() => {
                              handleViewDetail(val.email)
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            このメールを使用しているメンバー
                          </span> */}
                          <span
                            className="btn-sm btn-primary mr-2"
                            onClick={() => {
                              handleStatusModify(val.member_barcode_num, 'stop')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            STOP
                          </span>

                          <span
                            className="btn-sm btn-secondary"
                            onClick={() => {
                              handleStatusModify(val.member_barcode_num, 'ing')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            ING
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={6}>
                          {memberDetailView &&
                            memberDetailInfoMore?.map((val2, key2) => {
                              return (
                                <>
                                  <table
                                    className="table table-striped table-dark"
                                    style={{
                                      width: '100%',
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <th style={{ width: '20%' }}> Name</th>
                                        <td
                                          style={{
                                            width: '60%',
                                            textAlign: 'left',
                                          }}
                                        >
                                          {' '}
                                          {val2.name_eng}
                                        </td>
                                        <td
                                          style={{
                                            width: '20%',
                                            textAlign: 'right',
                                          }}
                                        >
                                          <span
                                            className="btn-sm btn-secondary"
                                            onClick={() => {
                                              handleViewDetailMember(
                                                val.member_barcode_num
                                              )
                                            }}
                                            style={{ cursor: 'pointer' }}
                                          >
                                            Detail
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </>
                              )
                            })}
                        </td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewPaymentStudentList
