import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import PageBanner from '@/components/SingleCoursesTwo/PageBanner'
import AdminTopRight from '@/components/GAdmin/AdminTopRight'
import AdminTopLeft from '@/components/GAdmin/AdminTopLeft'

import Link from 'next/link'
import { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import NavbarEnglib_GAdmin from '@/components/_App/NavbarEnglib_GAdmin'
//Chart
import { LineChart, PieChart } from 'react-chartkick'
// import 'chartkick/chart.js'

import ChartBalanceLine from '@/components/GAdmin/Chart/ChartBalanceLine'

const SingleCourses = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  // const [myMbn, setMyMbn] = useState()
  const [monsterInfo, setMonsterInfo] = useState([])

  const [pointInfo, setPointInfo] = useState([])
  const [readingPointInfo, setReadingPointInfo] = useState([])
  const [showandtellPointInfo, setShowandtellPointInfo] = useState([])
  const [shadowingPointInfo, setShadowingPointInfo] = useState([])
  const router = useRouter() //使い方：router.replace('/')
  const { query } = useRouter()

  useEffect(() => {
    if (router.isReady) {
      var mbn = router.query.mbn
      var url = DB_CONN_URL + '/get-member-monster-history-detail-monthly/'
      var Url = url + mbn
      // alert(Url)
      const fetchData = async () => {
        try {
          const response = await axios.get(Url)
          if (response.data.length) {
            // alert(response.data.length)
            setMonsterInfo(response.data.response)

            // console.log('info:', response.data.response)
          } else {
            // setPointInfo()
          }
        } catch (error) {
          alert(error)
        }
      }
      fetchData()
    }
  }, [router.isReady])

  useEffect(() => {
    if (router.isReady) {
      var mbn = router.query.mbn
      var url = DB_CONN_URL + '/get-member-point-history-detail-monthly/'
      var Url = url + mbn
      // alert(Url)
      const fetchData = async () => {
        try {
          const response = await axios.get(Url)
          if (response.data.length) {
            // alert(response.data.length)
            setPointInfo(response.data.response)

            // console.log('info:', response.data.response)
          } else {
            // setPointInfo()
          }
        } catch (error) {
          alert(error)
        }
      }
      fetchData()
    }
  }, [router.isReady])

  useEffect(() => {
    if (router.isReady) {
      var mbn = router.query.mbn
      var url =
        DB_CONN_URL + '/get-member-point-history-detail-monthly-by-subject/'
      var subject = 'READING'
      var Url = url + mbn + '&' + subject
      // alert(Url)
      const fetchData = async () => {
        try {
          const response = await axios.get(Url)
          // alert(response.data.message)
          if (response.data.length) {
            // alert(response.data.length)
            setReadingPointInfo(response.data.response)

            // console.log('info:', response.data.response)
          } else {
            // setReadingPointInfo()
          }
        } catch (error) {
          alert(error)
        }
      }
      fetchData()
    }
  }, [router.isReady])

  useEffect(() => {
    if (router.isReady) {
      var mbn = router.query.mbn
      var url =
        DB_CONN_URL + '/get-member-point-history-detail-monthly-by-subject/'
      var subject = 'SHADOWING'
      var Url = url + mbn + '&' + subject
      // alert(Url)
      const fetchData = async () => {
        try {
          const response = await axios.get(Url)
          // alert(response.data.message)
          if (response.data.length) {
            // alert(response.data.length)
            setShadowingPointInfo(response.data.response)

            // console.log('info:', response.data.response)
          } else {
            // setShadowingPointInfo()
          }
        } catch (error) {
          alert(error)
        }
      }
      fetchData()
    }
  }, [router.isReady])

  useEffect(() => {
    if (router.isReady) {
      var mbn = router.query.mbn
      var url =
        DB_CONN_URL + '/get-member-point-history-detail-monthly-by-subject/'
      var subject = 'SHOW AND TELL'
      var Url = url + mbn + '&' + subject
      // alert(Url)
      const fetchData = async () => {
        try {
          const response = await axios.get(Url)
          // alert(response.data.message)
          if (response.data.length) {
            // alert(response.data.length)
            setShowandtellPointInfo(response.data.response)

            // console.log('info:', response.data.response)
          } else {
            // setShowandtellPointInfo()
          }
        } catch (error) {
          alert(error)
        }
      }
      fetchData()
    }
  }, [router.isReady])

  const [thisData, setThisData] = useState([])
  useEffect(() => {
    pointInfo.map((val, key) => {
      setThisData((thisData) => [
        ...thisData,
        [val.grouping_column, val.totalPoint],
      ])
    })
  }, [pointInfo])

  // useEffect(() => {
  //   console.log('thisData', thisData)
  // }, [thisData])

  return (
    <React.Fragment>
      <NavbarEnglib_GAdmin />
      {/* {thisData && <LineChart data={thisData} />} */}

      <div className="courses-details-area pb-100 ">
        <div className="container p-0">
          <div className="courses-details-header">
            <div className="row align-items-center"></div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 mb-3">
              <h2 style={{ fontWeight: '600' }}>
                Monthly Point
                <a href="./">
                  <span className="btn btn-info ml-5">TOPへ</span>
                </a>
              </h2>
            </div>
            <div className="col-lg-12 col-md-12">
              {/* <div
                className=" pb-2 pt-2 pl-3 pr-3"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #dedede',
                  borderRadius: '10px',
                }}
              > */}
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style={{ textAlign: 'right', width: '8%' }}>
                      Name
                    </th>
                    <th scope="col" style={{ textAlign: 'right', width: '8%' }}>
                      Date
                    </th>
                    <th
                      scope="col"
                      style={{ textAlign: 'right', width: '10%' }}
                    >
                      Reading
                    </th>
                    <th
                      scope="col"
                      style={{ textAlign: 'right', width: '10%' }}
                    >
                      Shadowing
                    </th>
                    <th
                      scope="col"
                      style={{ textAlign: 'right', width: '10%' }}
                    >
                      Show and Tell
                    </th>
                    <th
                      scope="col"
                      style={{
                        textAlign: 'right',
                        backgroundColor: '#ABDFFD',
                        width: '10%',
                      }}
                    >
                      Total Point
                    </th>{' '}
                    <th
                      scope="col"
                      style={{
                        textAlign: 'right',
                        backgroundColor: '#FDE2AB',
                        width: '28%',
                      }}
                    >
                      Total Monster
                    </th>{' '}
                  </tr>
                </thead>
                <tbody>
                  {pointInfo &&
                    pointInfo
                      // .slice(0)
                      // .reverse()
                      .map((val, key) => {
                        return (
                          <>
                            <tr>
                              <td style={{ textAlign: 'right' }}>
                                {val.name_eng}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                {val.grouping_column}
                              </td>

                              <td style={{ textAlign: 'right' }}>
                                {readingPointInfo &&
                                  readingPointInfo.map((val2, key2) => {
                                    if (
                                      val.grouping_column ==
                                      val2.grouping_column
                                    ) {
                                      var readingValue = val2.totalPoint
                                    }
                                    return <>{readingValue}</>
                                  })}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                {shadowingPointInfo &&
                                  shadowingPointInfo.map((val2, key2) => {
                                    if (
                                      val.grouping_column ==
                                      val2.grouping_column
                                    ) {
                                      var shadowingValue = val2.totalPoint
                                    }
                                    return <>{shadowingValue}</>
                                  })}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                {showandtellPointInfo &&
                                  showandtellPointInfo.map((val2, key2) => {
                                    if (
                                      val.grouping_column ==
                                      val2.grouping_column
                                    ) {
                                      var showandtellValue = val2.totalPoint
                                    }
                                    return <>{showandtellValue}</>
                                  })}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                {val.totalPoint.toLocaleString()}
                              </td>
                              <td style={{ textAlign: 'right', width: '28%' }}>
                                {monsterInfo &&
                                  monsterInfo.map((val2, key2) => {
                                    if (
                                      val.grouping_column ==
                                      val2.grouping_column
                                    ) {
                                      var monsterValue = val2.totalPoint
                                    }
                                    return <>{monsterValue}</>
                                  })}
                              </td>
                            </tr>
                          </>
                        )
                      })}
                </tbody>
              </table>
              {/* </div> */}
            </div>
            <div className="col-lg-12 col-md-12 mt-5">
              {' '}
              {pointInfo &&
                readingPointInfo &&
                shadowingPointInfo &&
                showandtellPointInfo && (
                  <>
                    {/* {' '}
                    <ChartBalanceLine
                      pointInfo={pointInfo}
                      readingPointInfo={readingPointInfo}
                      shadowingPointInfo={shadowingPointInfo}
                      showandtellPointInfo={showandtellPointInfo}
                    /> */}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SingleCourses
