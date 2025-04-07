import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const ViewMemberList = ({ sort }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [memberDetailView, setMemberDetailView] = useState(false)

  const [memberInfo, setMemberInfo] = useState([])
  const [memberDetailInfo, setMemberDetailInfo] = useState([])
  useEffect(() => {
    // if (localStorage.getItem('T_loginStatus') == 'true') {
    var Url = DB_CONN_URL + '/current_member_info_mbn'
    axios
      .post(Url, {
        currentStatus: 'ing',
        sort: sort,
      })
      .then((response) => {
        if (!response.data.status) {
          // alert(response.data.message) //for test
        } else {
          setMemberInfo(response.data.response)
        }
      })
    // }
  }, [])

  const handleViewDetail = (mbn) => {
    setMemberDetailView(!memberDetailView)
    var Url = DB_CONN_URL + '/member_info_mbn'
    axios
      .post(Url, {
        mbn: mbn,
      })
      .then((response) => {
        if (!response.data.status) {
          alert(response.data.message) //for test
        } else {
          // alert(response.data.message) //for test
          setMemberDetailInfo(response.data.response)
        }
      })
  }

  return (
    <>
      <div className="courses-meta">
        <div className="row">
          <div className="col-lg-12 col-md-12 text-left">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Sort</th>
                  <th scope="col">Name</th>
                  <th scope="col">Num</th>
                  <th scope="col">tel</th>
                  <th scope="col">email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {memberInfo.map((val, key) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{val.sort}</th>
                        <td>{val.name_eng}</td>
                        <td> {val.member_barcode_num}</td>
                        <td>
                          {' '}
                          {val.mobilephone}
                          {val.tel != '' && (
                            <>
                              <br />*{val.tel}
                            </>
                          )}
                        </td>
                        <td> {val.email}</td>
                        <td>
                          {' '}
                          <span
                            className="btn-sm btn-primary mr-2"
                            onClick={() => {
                              handleViewDetail(val.member_barcode_num)
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            Detail
                          </span>
                          <span
                            className="btn-sm btn-primary"
                            onClick={() => {
                              handleViewDetail(val.member_barcode_num)
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
                            memberDetailInfo?.map((val2, key2) => {
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
                                              handleViewDetail(
                                                val.member_barcode_num
                                              )
                                            }}
                                            style={{ cursor: 'pointer' }}
                                          >
                                            Modify
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th style={{ width: '20%' }}>
                                          {' '}
                                          Country
                                        </th>
                                        <td
                                          style={{
                                            width: '60%',
                                            textAlign: 'left',
                                          }}
                                        >
                                          {' '}
                                          {val2.country}
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
                                              handleViewDetail(
                                                val.member_barcode_num
                                              )
                                            }}
                                            style={{ cursor: 'pointer' }}
                                          >
                                            Modify
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
