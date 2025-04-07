import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import NavbarEnglib_Tutor from '@/components/_App/NavbarEnglib_Tutor'

import YouMightLikeTheCourses from '@/components/Courses/YouMightLikeTheCourses'
import TutorpageDetailsSidebar from '@/components/SingleCoursesTwo/TutorpageDetailsSidebar'
import { EcoSharp } from '@material-ui/icons'
import Recorder from '@/components/VoiceRecorder/VoiceRecorder'

function TutorTop() {
  //number format
  // var nf = new Intl.NumberFormat()
  const [tutorInfo, setTutorInfo] = useState([])
  const [lessonHistoryUrl, setLessonHistoryUrl] = useState('')
  const [lessonListUrl, setLessonListUrl] = useState('')
  const [upcomingLessonList, setUpcomingLessonList] = useState('')
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  useEffect(() => {
    var tbn = localStorage.getItem('tbn')
    setLessonHistoryUrl('/tutor/history?tbn=' + tbn)
    setLessonListUrl('/tutor/myLesson?tbn=' + tbn)
    setUpcomingLessonList('/tutor/upcoming?tbn=' + tbn)
  }, [])

  useEffect(() => {
    var tbn = localStorage.getItem('tbn')
    if (localStorage.getItem('T_loginStatus') == 'true') {
      axios
        .post(DB_CONN_URL + '/tutor_info_tbn', {
          tbn: tbn,
        })
        .then((response) => {
          //errorの場合
          if (!response.data.status) {
            alert(response.data.message) //for test
          } else {
            setTutorInfo(response.data.response[0])

            //console.log('tbn', response.data.response[0].teacher_barcode_num)
          }
        })
    }
  }, [])
  const [TloginStatus, setT_LoginStatus] = useState()
  useEffect(() => {
    if (localStorage.getItem('T_token')) {
      setT_LoginStatus(true)
    } else {
      setT_LoginStatus(false)
    }
  })

  let logOut = () => {
    setT_LoginStatus(false)
    localStorage.removeItem('T_token')
    localStorage.removeItem('T_loginStatus')
    localStorage.removeItem('T_email')
    localStorage.removeItem('tbn')
    router.push('/t_login')
  }

  return (
    <React.Fragment>
      <NavbarEnglib_Tutor />

      <div className="courses-details-area ptb-25">
        <hr />
        <div className="container">
          <div className="row pb-50">
            <div
              className="col-lg-12"
              style={{
                textAlign: 'center',
              }}
            >
              <h2 style={{ fontWeight: '600' }}>
                {/* {tutorInfo.map((val, key) => {
                  return(
                  ;<h2>
                    {val.first_name}&nbsp;{val.middle_name}&nbsp;
                    {val.last_name}
                  </h2>
                  )
                })} */}
                {tutorInfo.first_name} {tutorInfo.middle_name}{' '}
                {tutorInfo.last_name}
                {/* <button className="btn btn-info mr-2"> */}
                {/* <a className="btn btn-primary mr-2">
                  <i className="bx bx-book"></i>
                </a> */}
                <Link href="/tutor/tutor-set">
                  <a className="btn btn-primary mr-2">My Info</a>
                </Link>
                {TloginStatus ? (
                  <Link href="/t_login">
                    <a className="btn btn-primary" onClick={logOut}>
                      LOGOUT
                    </a>
                  </Link>
                ) : (
                  <Link href="/t_login">
                    <a className="btn btn-primary">
                      <i className="flaticon-user"></i>LOGIN
                      {TloginStatus}
                    </a>
                  </Link>
                )}
              </h2>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12 col-sm-6 col-md-6">
              <div className="btn-box">
                {/* <Link href="/tutor/history?tbn=1"> */}
                <Link href="/tutor/tutor-set">
                  <a className="default-btn mr-2">
                    <i className="flaticon-teacher"></i>
                    Tutor SET
                    <span></span>
                  </a>
                </Link>
                <Link href={lessonListUrl}>
                  <a className="default-btn mr-2">
                    <i className="flaticon-teacher"></i>
                    My Class
                    <span></span>
                  </a>
                </Link>
                <Link href={upcomingLessonList}>
                  <a className="default-btn mr-2">
                    <i className="flaticon-teacher"></i>
                    Upcoming Lesson
                    <span></span>
                  </a>
                </Link>
                <Link href={lessonHistoryUrl}>
                  <a className="default-btn mr-2">
                    <i className="flaticon-teacher"></i>
                    Lesson History
                    <span></span>
                  </a>
                </Link>
                <Link href="/tutor/tutor-calendar-reg">
                  <a className="default-btn mr-2">
                    <i className="flaticon-teacher"></i>
                    Schedule
                    <span></span>
                  </a>
                </Link>
                <Link href="/youtube-script-time">
                  <a className="default-btn mr-2">
                    <i className="flaticon-teacher"></i>
                    Youtube Script Time
                    <span></span>
                  </a>
                </Link>

                <Link href="/googleDocCreator">
                  <a className="default-btn mr-2">
                    <i className="flaticon-teacher"></i>
                    google doc creator
                    <span></span>
                  </a>
                </Link>

                <Link href="/tutor/panel/discussion">
                  <a className="default-btn mr-2">
                    <i className="flaticon-teacher"></i>
                    discussion tutor page
                    <span></span>
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="courses-details-header">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-12">
                <div className="courses-title">
                  <p></p>
                </div>
                <div className="courses-meta">
                  <ul>
                    <li>
                      <i className="bx bx-group"></i>
                      <span>Today's Lesson&nbsp;</span>
                      <Link href="#">
                        <h1 style={{ fontColor: 'red' }}>10</h1>
                      </Link>
                    </li>
                    <li>
                      <i className="bx bx-folder-open"></i>
                      <span>Makaup Alert</span>
                      <Link href="#">
                        <h1 style={{ fontColor: 'red' }}>2</h1>
                      </Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar"></i>
                      <span>Trial Lesson</span>
                      <Link href="#">
                        <h1 style={{ fontColor: 'red' }}>2</h1>
                      </Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar"></i>
                      <span>
                        Get Makeup Lesson
                        <br />
                        other tutor's lesson
                      </span>

                      <Link href="#">
                        <h1 style={{ fontColor: 'red' }}>2</h1>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4 col-md-12">
                <div className="courses-price">
                  <div className="courses-review">
                    <span className="reviews-total d-inline-block pr-3">
                      ランキング
                    </span>
                  </div>

                  <div className="price">
                    <div className="review-stars">
                      <i
                        className="bx bxs-star"
                        style={{ color: 'orange' }}
                      ></i>
                      23/521
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 col-md-12">
              {/* <div className="courses-details-image-style-two text-center">
                <img src="/images/courses/courses2.jpg" alt="image" />
              </div> */}

              <div className="courses-details-desc-style-two">
                <h3>Courses Video</h3>
                <div className="courses-curriculum">
                  <h3>Python Introduction</h3>
                  <ul>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          Python Introduction
                        </span>
                        <div className="courses-meta">
                          <span className="questions">5 questions</span>
                          <span className="duration">01 Hour</span>
                          <span className="status">Preview</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <h3>Stepping into the World of Python</h3>
                  <ul>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">NumPy Introduction</span>
                        <div className="courses-meta">
                          <span className="duration">15 Min</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          NumPy Getting Started
                        </span>
                        <div className="courses-meta">
                          <span className="duration">30 Min</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          NumPy Creating Arrays
                        </span>
                        <div className="courses-meta">
                          <span className="duration">45 Min</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          NumPy Array Indexing
                        </span>
                        <div className="courses-meta">
                          <span className="questions">4 questions</span>
                          <span className="duration">1 Hour</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          NumPy Array Slicing
                        </span>
                        <div className="courses-meta">
                          <span className="duration">1.5 Hour</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                  </ul>

                  <h3>Python MySQL</h3>
                  <ul>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">Python MySQL</span>
                        <div className="courses-meta">
                          <span className="duration">01 Hour</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          Python MySQL Create Database
                        </span>
                        <div className="courses-meta">
                          <span className="questions">3 questions</span>
                          <span className="duration">1.1 Hour</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          Python MySQL Create Table
                        </span>
                        <div className="courses-meta">
                          <span className="duration">1.5 Hour</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>

                <h3>What you'll learn</h3>
                <div className="why-you-learn">
                  <ul>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Become an expert in Statistics
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Boost your resume with skills
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Gather, organize, data
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Use data for improved
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Present information KPIs
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Perform quantitative
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Analyze current data
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Discover how to find trends
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Understand the fundamentals
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Use SQL to create, design
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <TutorpageDetailsSidebar />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TutorTop
