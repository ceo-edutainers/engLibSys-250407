import React, { useEffect, useState } from 'react'
import PageBanner from '@/components/SingleCoursesTwo/PageBanner'
import YouMightLikeTheCourses from '@/components/Courses/YouMightLikeTheCourses'
import CoursesDetailsSidebar from '@/components/SingleCoursesTwo/CoursesDetailsSidebar'

import axios from 'axios'
import Link from '@/utils/ActiveLink'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faTrash,
  faLockOpen,
  faArrowCircleRight,
  faArrowAltCircleRight,
  faCircle,
  faEye,
} from '@fortawesome/free-solid-svg-icons'
const SingleCourses = () => {
  const [testMemberList, setTestMemberList] = useState([])
  const [memberTestDetail, setMemberTestDetail] = useState([])
  const [viewDetail, setViewDetail] = useState(false)
  const [totalQuestionLength, setTotalQuestionLength] = useState()
  const [rightCorrectCnt, setRightCorrectCnt] = useState()
  const [detailMbn, setDetailMbn] = useState()

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        var Url = DB_CONN_URL + '/get-sys-test-online-member-list_end'
        const response = await axios.get(Url)

        //setHWbookInfo(response.data)

        setTestMemberList(response.data.response)

        // alert(testMemberList)
        //console.log('testMemberList', testMemberList)
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }

    fetchData2()
  }, [])

  const getMemberCorrectCount = (mbn) => {
    const fetchData2 = async () => {
      try {
        var Url =
          DB_CONN_URL + '/get-sys-test-online-member-list-correct-cnt/' + mbn
        const response = await axios.get(Url)

        //setHWbookInfo(response.data)

        //setTestMemberList(response.data.response)
        setRightCorrectCnt(response.data.length)
        // alert(testMemberList)
        //console.log('testMemberList', testMemberList)
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }

    fetchData2()
  }

  const getMemberDetail = (mbn) => {
    const fetchData = async () => {
      try {
        var Url = DB_CONN_URL + '/get-sys-test-online-member-list/' + mbn
        const response = await axios.get(Url)

        setMemberTestDetail(response.data.response)
        setDetailMbn(mbn)
        //console.log('memberTestDetail', memberTestDetail)
        setTotalQuestionLength(response.data.length - 1)
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
    fetchData()
  }
  return (
    <React.Fragment>
      {/* <PageBanner
        pageTitle="Test Result"
        homePageUrl="/"
        homePageText="Home"
        innerPageUrl=""
        innerPageText=""
        activePageText=""
      /> */}
      <div className="col-lg-12 col-md-12 mt-3">
        <center>
          <h1>
            <b>Test Results</b>
          </h1>
          <hr />
        </center>
      </div>
      <div className="courses-details-area">
        <div className="container">
          <div className="courses-details-header">
            <div className="row align-items-center">
              {testMemberList.map((val, key) => {
                return (
                  <>
                    <div className="col-lg-12 col-md-12 mt-2">
                      <h5>
                        <b>
                          [&nbsp;{val.test_group}&nbsp;]&nbsp;
                          <font color="darkgreen">{val.name_eng}</font>
                        </b>
                        :{val.test_startdate}-{val.test_starttime}~
                        {val.test_endtime}&nbsp;
                        <button
                          onClick={() => {
                            getMemberDetail(val.member_barcode_num),
                              getMemberCorrectCount(val.member_barcode_num),
                              setViewDetail(!viewDetail)
                          }}
                          style={{ width: '100px' }}
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            size="1x"
                            color="blue"
                          />
                        </button>
                        {detailMbn == val.member_barcode_num &&
                          viewDetail &&
                          memberTestDetail.map((val2, key2) => {
                            var totalQuestion =
                              parseInt(memberTestDetail.length) - 1
                            var audioFile =
                              'https://englib.s3.ap-northeast-1.amazonaws.com/' +
                              val2.member_barcode_num +
                              '_' +
                              val2.quizTempId +
                              '_' +
                              memberTestDetail.length
                            //   +
                            //   '.wav'
                            return (
                              <>
                                <div className="col-lg-12 col-md-12 mt-2">
                                  {key2 == 0 && (
                                    <h4 style={{ color: 'black' }}>
                                      Result:{rightCorrectCnt}/{totalQuestion}
                                      &nbsp;Question
                                    </h4>
                                  )}
                                  <h6>
                                    <b>No.{val2.qNum}</b>&nbsp;[ Eiken&nbsp;
                                    {val2.englib_level} &nbsp;|&nbsp;
                                    {val2.questionCatEng}]{' '}
                                    {val2.correct == 0 &&
                                      val2.questionCatEng !== 'Recording' && (
                                        <>
                                          <font color="red">
                                            <b>X</b>
                                          </font>
                                        </>
                                      )}
                                    {val2.questionCatEng == 'Recording' && (
                                      <>
                                        <audio
                                          src={audioFile}
                                          controls="controls"
                                          style={{
                                            alignItems: 'center',
                                            height: '25px',
                                            paddingTop: '10px',
                                            width: '40%',
                                            textAlign: 'center',
                                          }}
                                        />
                                      </>
                                    )}
                                  </h6>
                                </div>
                              </>
                            )
                          })}
                        {/* <Link href="/testResultDetail">
                          <a>
                            <FontAwesomeIcon
                              icon={faEye}
                              size="1x"
                              color="blue"
                            />
                          </a>
                        </Link> */}
                      </h5>
                      {/* {() => getMemberDetail(val.member_barcode_num)}
                      {testMemberList.map((val2, key) => {
                        return <>{val.</>
                      })} */}
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SingleCourses
