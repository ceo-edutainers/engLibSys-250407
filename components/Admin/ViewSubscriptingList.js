import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const ViewMemberList = ({ sort }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [memberDetailView, setMemberDetailView] = useState(false)
  const [memberDetailViewMember, setMemberDetailViewMember] = useState(false)

  const [memberInfo, setMemberInfo] = useState([])
  const [memberDetailInfo, setMemberDetailInfo] = useState([])
  const [memberDetailInfoMore, setMemberDetailInfoMore] = useState([])

  useEffect(() => {
    // if (localStorage.getItem('T_loginStatus') == 'true') {
    var Url = DB_CONN_URL + '/check-mail-subscription'

    axios.get(Url).then((response) => {
      // alert(response.data.message)
      if (!response.data.status) {
      } else {
        setMemberInfo(response.data.response)
      }
    })
    // }
  }, [])

  const handleViewDetail = (email) => {
    setMemberDetailView(!memberDetailView)

    var Url = DB_CONN_URL + '/member_info_email'

    axios
      .post(Url, {
        email: email,
      })
      .then((response) => {
        // alert(response.data.message) //for test
        if (!response.data.status) {
        } else {
          // alert(response.data.message) //for test
          setMemberDetailInfo(response.data.response)
        }
      })
  }

  const handleViewDetailMember = (mbn) => {
    setMemberDetailViewMember(!memberDetailViewMember)

    var Url = DB_CONN_URL + '/member_info_mbn'

    axios
      .post(Url, {
        mbn: mbn,
      })
      .then((response) => {
        // alert(response.data.message) //for test
        if (!response.data.status) {
        } else {
          // alert(response.data.message) //for test
          setMemberDetailInfoMore(response.data.response)
        }
      })
  }
  return (
    <>
      <div className="courses-meta">
        <div className="row">
          <div className="col-lg-12 col-md-12 text-center">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">email</th>
                  <th scope="col">Join Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">入会状況</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {memberInfo.map((val, key) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{val.email}</th>
                        <td>{val.regDate}</td>
                        <td> {val.regTime}</td>
                        <td>{val.joinStatus}</td>
                        <td>
                          <span
                            className="btn-sm btn-primary mr-2"
                            onClick={() => {
                              handleViewDetail(val.email)
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            このメールを使用しているメンバー
                          </span>
                          <span
                            className="btn-sm btn-primary"
                            onClick={() => {
                              handleViewDetail(val.email)
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            Modify
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

export default ViewMemberList
