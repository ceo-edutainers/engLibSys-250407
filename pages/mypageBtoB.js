import React, { useState, useEffect } from 'react'
// import NavbarEnglib from '@/components/_App/NavbarEnglib'
import PageBanner from '@/components/SingleCoursesTwo/PageBanner'
import YouMightLikeTheCourses from '@/components/Courses/YouMightLikeTheCourses'
import CoursesDetailsSidebar from '@/components/SingleCoursesTwo/MypageDetailsSidebar'
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
// import Youtube from '@/components/Youtube/Youtube'

const SingleCourses = () => {
  //tab start
  const [value, setValue] = React.useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  //tab end
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [memberInfo, setMemberInfo] = useState([])
  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')

      axios
        .post(DB_CONN_URL + '/member_info_mbn_BtoB', {
          mbn: mbn,
        })
        .then((response) => {
          if (!response.data.status) {
            //console.log('no information', response)
            alert(response.data.message) //for test
          } else {
            setMemberInfo(response.data.response[0])
            //alert('yes') //for test
            console.log('mbn', response.data.response[0].member_barcode_num)
          }
        })
    }
  }, [])

  ///////Tab関連 END
  return (
    <React.Fragment>
      {/* <NavbarEnglib /> */}
      {/* <PageBanner
        //pageTitle="Kei Tonooka"
        homePageUrl="/"
        homePageText="HOME"
        innerPageUrl="/mypage"
        innerPageText="マイページ"
        activePageText="Kei Tonooka"
      /> */}

      <div className="courses-details-area">
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <ReactPlayer url="https://www.youtube.com/watch?v=YVfyYrEmzgM-U" /> */}
              {/* <Youtube /> */}
            </div>
            <div className="col-lg-12" style={{ textAlign: 'left' }}>
              <h3 style={{ fontWeight: '600' }}>{memberInfo.name_eng} </h3>
              <a className="btn btn-dark text-white">先生が来ない</a>
              <Link href="/practice">
                <a
                  className="btn btn-dark text-white ml-2 w-300 h-50"
                  target="_blank"
                >
                  練習をする
                </a>
              </Link>
              <hr />
              <button className="btn btn-danger">Emergencyボタン</button>->
              レッスンが24時間以内に残ってる場合押せる。24時間以上残ってる場合、見えるけど押せない。病院の書類など証明できるものを送ったら、後で3〜６ヶ月有効なTicketとして保存される。ただボタンを押すだけだと、Ticketとして保存されない。
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-12" style={{ textAlign: 'center' }}>
              <Link href="/makeup">
                <a>
                  <button
                    className="btn btn-info mb-2"
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '30px',
                      width: '100%',
                    }}
                  >
                    <h2 style={{ fontWeight: '900' }}>Today's Lesson</h2>
                    <p style={{ fontSize: '15px', color: 'white' }}>
                      クリックして今日のレッスンに参加しましょう。 レッスンまで
                      20分30秒
                    </p>
                  </button>
                </a>
              </Link>
            </div>
            <div className="col-lg-4 col-md-12" style={{ textAlign: 'center' }}>
              <Link href="/hurikae">
                <a>
                  <button
                    className="btn btn-primary mb-2"
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '30px',
                      width: '100%',
                    }}
                  >
                    <h2 style={{ fontWeight: '600' }}>振替依頼</h2>
                    <p style={{ fontSize: '15px', color: 'white' }}>
                      レッスン日の２４時間前まで
                      <br />
                      振替を設定が可能です。
                    </p>
                  </button>
                </a>
              </Link>
            </div>
            <div
              className="col-lg-4  col-md-12"
              style={{ textAlign: 'center' }}
            >
              <Link href="/hurikae">
                <a>
                  <button
                    className="btn btn-danger mr-2 mb-2"
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '30px',
                      width: '100%',
                    }}
                  >
                    <h2 style={{ fontWeight: '600' }}>振替無しで休む</h2>
                    <p style={{ fontSize: '15px', color: 'white' }}>
                      このボタンは次のレッスンが24時間以下
                      <br />
                      このボタンを押すと振替は設定できないのでご注意ください。
                    </p>
                  </button>
                </a>
              </Link>
            </div>
          </div>

          <div className="courses-details-header">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-4">
                <div className="courses-price  text-left">
                  <div className="courses-review">
                    <span className="reviews-total d-inline-block">
                      {/* ランキング */}
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
              <div className="col-lg-8  col-md-8">
                {/* <div className="courses-title"></div> */}
                <div className="courses-meta">
                  <ul>
                    <li>
                      <i className="bx bx-folder-open"></i>
                      <span>
                        Your Lesson&nbsp;
                        <b style={{ fontColor: 'red' }}>[3]</b>
                      </span>
                      <Link href="#">
                        <a>Photography</a>
                      </Link>
                    </li>
                    <li>
                      <i className="bx bx-group"></i>
                      <span>Students</span>
                      <Link href="#">
                        <a>541,214</a>
                      </Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar"></i>
                      <span>YOUR HOMEWORK</span>
                      <Link href="#">
                        <a>70% 完了</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* //tabstart */}
            <div className="col-lg-4 col-md-12">
              <CoursesDetailsSidebar />
            </div>
            <div className="col-lg-8 col-md-12">
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Item One" value="1" />
                      <Tab label="Item Two" value="2" />
                      <Tab label="Item Three" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">Item One</TabPanel>
                  <TabPanel value="2">Item Two</TabPanel>
                  <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
              </Box>
            </div>
            {/* //tabend */}

            {/* <div className="col-lg-4 col-md-12">
              <CoursesDetailsSidebar />
            </div> */}
            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="single-events-box">
                <div className="image">
                  <Link href="/single-events">
                    <a className="d-block">
                      <img src="/images/events/events1.jpg" alt="image" />
                    </a>
                  </Link>
                  <span className="date">Homework</span>
                </div>

                <div className="content">
                  <h3>
                    <Link href="/single-events">
                      <a>宿題ページへ</a>
                    </Link>
                  </h3>
                  {/* <span className="location">
                    <i className="bx bx-map"></i>Click
                  </span> */}
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="single-events-box">
                <div className="image">
                  <Link href="/single-events">
                    <a className="d-block">
                      <img src="/images/events/events2.jpg" alt="image" />
                    </a>
                  </Link>
                  <span className="date">Input/Output Course</span>
                </div>

                <div className="content">
                  <h3>
                    <Link href="/single-events">
                      <a>全てのコース案内</a>
                    </Link>
                  </h3>
                  {/* <span className="location">
                    <i className="bx bx-map"></i>Sydney, Australia
                  </span> */}
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="single-events-box">
                <div className="image">
                  <Link href="/single-events">
                    <a className="d-block">
                      <img src="/images/events/events1.jpg" alt="image" />
                    </a>
                  </Link>
                  <span className="date">Shop</span>
                </div>

                <div className="content">
                  <h3>
                    <Link href="/shop">
                      <a>教材購入</a>
                    </Link>
                  </h3>
                  {/* <span className="location">
                    <i className="bx bx-map"></i>Istanbul, Turkey
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <YouMightLikeTheCourses />
    </React.Fragment>
  )
}

export default SingleCourses
