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

import ChartBalanceLineForMonster from '@/components/GAdmin/Chart/ChartBalanceLineForMonster'

const SingleCourses = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  // const [myMbn, setMyMbn] = useState()
  const [monsterInfo, setMonsterInfo] = useState([])

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

  const [thisData, setThisData] = useState([])
  useEffect(() => {
    monsterInfo.map((val, key) => {
      setThisData((thisData) => [
        ...thisData,
        [val.grouping_column, val.totalPoint],
      ])
    })
  }, [monsterInfo])

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
                Monthly Monster
                <a href="./">
                  <span className="btn btn-info ml-5">TOPへ</span>
                </a>
              </h2>
            </div>
            <div className="col-lg-12 col-md-12">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style={{ textAlign: 'right' }}>
                      Name
                    </th>
                    <th scope="col" style={{ textAlign: 'right' }}>
                      Date
                    </th>
                    <th scope="col" style={{ textAlign: 'right' }}>
                      Total Monster
                    </th>{' '}
                  </tr>
                </thead>
                <tbody>
                  {monsterInfo &&
                    monsterInfo
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
                                {val.totalPoint.toLocaleString()}
                              </td>
                            </tr>
                          </>
                        )
                      })}
                </tbody>
              </table>
            </div>
            <div className="col-lg-12 col-md-12 mt-5">
              {' '}
              {monsterInfo && (
                <>
                  {/* <ChartBalanceLineForMonster monsterInfo={monsterInfo} /> */}
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
