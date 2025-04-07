import React, { useEffect, useState, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'
import YoutubeScriptTimeInsertForShadowing from '@/components/Admin/YoutubeScriptTimeInsertForShadowing'

import { myFun_getYoutubeID } from '@/components/FunctionComponent'
const SingleCourses = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [shadowingAllInfo, setShadowingAllInfo] = useState([])
  const [shadowingView, setShadowingView] = useState(false)
  const [youtubeID, setYoutubeID] = useState()

  useEffect(() => {
    // console.log('newLesson', newLesson)
    // if (localStorage.getItem('T_loginStatus') == 'true') {
    var status = 'ok'
    var Url = DB_CONN_URL + '/select-shadowing-all/' + status

    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data)
          // alert('1')

          setShadowingAllInfo(response.data)
        })
      } catch (error) {
        alert('error1' + error)
        // console.log(error)
      }
    }

    fetchData2()
    // }
  }, [])

  function youID(youtubeURL) {
    var yID = myFun_getYoutubeID(youtubeURL)
    setYoutubeID(yID)
  }
  return (
    <React.Fragment>
      {/* <NavbarEnglib_Admin /> */}
      <hr />
      <div className="courses-details-area pb-100 ">
        <div className="container">
          <div className="courses-details-header">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12">
                <div className="col-lg-12 col-md-12">
                  <select
                    className="mb-3"
                    onChange={(e) => {
                      setShadowingView(true)
                      youID(e.target.value)
                    }}
                  >
                    <option>SELECT VIDEO</option>
                    {shadowingAllInfo?.map((val, key) => {
                      return (
                        <>
                          <option value={val.youtubeURL}>
                            [{val.shadowingLevel}]{val.shadowingTitle}
                          </option>
                        </>
                      )
                    })}{' '}
                  </select>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: shadowingView ? 'block' : 'none',
                  }}
                >
                  {/* <ViewShadowingVideoList yID={youtubeID} /> */}
                  {youtubeID}
                  <YoutubeScriptTimeInsertForShadowing yID={youtubeID} />
                  {/* <YoutubeScriptTimeInsertForShadowing yID={youtubeID} /> */}
                </div>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SingleCourses
