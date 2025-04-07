import React, { useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import NavbarEnglib_Tutor from '@/components/_App/NavbarEnglib_Tutor'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { myfun_getLessonPage } from '@/components/FunctionComponent'
import Modal from '@/components/modal/ModalMemberInfo'

const myLesson = () => {
  const { query } = useRouter() //값이 get url로 넘어왔을 경우 사용

  //modal
  const [openModal, setOpenModal] = useState(false)
  const [mbnModal, setMbnModal] = useState()

  const [tbn, setTbn] = useState(query.tbn)
  const [lessonInfo, setLessonInfo] = useState([])
  const DB_CONN_URL = process.env.DB_CONN_URL
  console.log('query.tbn:', query.tbn)

  useEffect(() => {
    // var tbn = query.tbn

    var status = 'ok'
    var Url = DB_CONN_URL + '/tutor_lesson_list_ok/' + tbn + '&' + status
    console.log(Url)
    axios.get(Url).then((response) => {
      //errorの場合
      if (!response.data.status) {
        alert(response.data.message) //for test
        //alert('test')
      } else {
        setLessonInfo(response.data.response)
        //alert('ok')
        //console.log('tbn', response.data.response[0].teacher_barcode_num)
      }
    })
  }, [])

  //For tab start
  const [value, setValue] = React.useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [clearBtn, setClearBtn] = useState('')
  const inputRef = useRef()
  const handleClear = () => {
    setSearchTermWeekday('')
    setSearchTermName('')
    setClearBtn('clear')
    inputRef.current.value = ''
  }

  //for filtering
  const [searchTermWeekday, setSearchTermWeekday] = useState('')
  const [searchTermName, setSearchTermName] = useState('')

  //For tab end
  return (
    <React.Fragment>
      <NavbarEnglib_Tutor />

      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-6">
            {/* modal start */}
            {openModal && (
              <Modal
                closeModal={setOpenModal}
                mbn={mbnModal}
                // tbn={localStorage.getItem('tbn')}
                // email={localStorage.getItem('email')}
                // T_email={localStorage.getItem('T_email')}
              />
            )}
            {/* modal end */}
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="My Lesson " value="1" />
                    <Tab label="Makaup Lesson" value="3" />
                    <Tab label="Pay History" value="4" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 ,mb-2 pl-3">
                      <select
                        onChange={(e) => {
                          setSearchTermWeekday(e.target.value)
                          setClearBtn('')
                        }}
                        className="form-control-sm "
                        style={{ width: '100%' }}
                      >
                        <option
                          value=""
                          selected={clearBtn == 'clear' && 'selected'}
                        >
                          All Day
                        </option>

                        <option value="MON">MON</option>
                        <option value="TUE">TUE</option>
                        <option value="WED">WED</option>
                        <option value="THUR">THUR</option>
                        <option value="FRI">FRI</option>
                        <option value="SAT">SAT</option>
                        <option value="SUN">SUN</option>
                      </select>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                      <input
                        className="form-control-md mb-2"
                        style={{ width: '100%' }}
                        ref={inputRef}
                        type="text"
                        placeholder="Name Search..."
                        onChange={(e) => {
                          setClearBtn('')
                          setSearchTermName(e.target.value)
                        }}
                      />
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                      <button
                        className="btn-sm btn-secondary "
                        onClick={() => {
                          handleClear()
                        }}
                      >
                        Reset(All Data)
                      </button>
                    </div>
                    <div
                      className="col-lg-3 col-md-6 pr-4"
                      style={{ textAlign: 'right' }}
                    >
                      <b>
                        Total：
                        {/* {lessonInfo.length} */}
                      </b>
                    </div>
                  </div>
                  <p>
                    (Emergency)
                    <br /> Show if left in less than 24 hours from lesson time
                    <br />
                    照明書類などを二週間以内に出さないと無断欠席扱いになる。
                    <br />
                    ボタン押す->管理者と生徒さんにメール送信->管理者が他の先生をマッチングさせてあげる。
                    (makeup)
                    <br />
                    レッスン時間が24時間より少なく残った場合は見せない。 or
                    見えるけど押せない。
                  </p>
                  <table className="table table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>Weekday</th>
                        <th>LessonPage</th>
                        <th>Name</th>
                        <th>Emergency</th>
                        <th>Make-up</th>

                        <th>Course</th>

                        <th>Time</th>
                        <th>During</th>
                        <th>Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lessonInfo
                        .filter((val) => {
                          // For One item search
                          // if (searchTermName == '') {
                          //   return val //everything data
                          // } else if (
                          //   val.name_eng
                          //     .toLowerCase()
                          //     .includes(searchTermName.toLowerCase())
                          // ) {
                          //   return val
                          // }

                          //For Two Item search
                          if (searchTermName == '' && searchTermWeekday == '') {
                            return val //everything data
                          } else if (
                            searchTermWeekday == '' &&
                            val.name_eng
                              .toLowerCase()
                              .includes(searchTermName.toLowerCase())
                          ) {
                            return val
                          } else if (
                            searchTermName == '' &&
                            val.weekday.includes(searchTermWeekday)
                          ) {
                            return val
                          } else if (
                            val.name_eng
                              .toLowerCase()
                              .includes(searchTermName.toLowerCase()) &&
                            val.weekday.includes(searchTermWeekday)
                          ) {
                            return val
                          }
                        })
                        .map((val, key) => {
                          var c = val.course
                          var cn = val.courseName
                          var pageName = myfun_getLessonPage(c, cn)

                          var pageUrl =
                            '/tutor/panel/' +
                            pageName +
                            '?m=' +
                            val.member_barcode_num +
                            '&cN=' +
                            val.courseName +
                            '&tbn=' +
                            val.teacher_barcode_num

                          return (
                            <tr key={key}>
                              <td>{val.weekday}</td>
                              <td>
                                {' '}
                                <Link href={pageUrl}>
                                  <a
                                    className="btn btn-secondary text-white"
                                    onClick={() => {}}
                                  >
                                    Lesson Page
                                  </a>
                                </Link>
                              </td>
                              <td>
                                {val.name_eng}
                                {/* <button
                                  className="btn-sm btn-info"
                                  onClick={() => {
                                    setOpenModal(true)
                                    setMbnModal(val.member_barcode_num)
                                  }}
                                >
                                  detail
                                </button> */}

                                <a
                                  className="btn-sm btn-info text-white"
                                  onClick={() => {
                                    setOpenModal(true)
                                    setMbnModal(val.member_barcode_num)
                                  }}
                                >
                                  detail
                                </a>
                              </td>
                              <td>
                                {/* <button
                                  className="btn-sm btn-danger"
                                  onClick={() => {
                                    // setOpenModal(true)
                                    // setMbnModal(val.member_barcode_num)
                                  }}
                                >
                                  emergency
                                </button> */}
                                <a
                                  className="btn-sm btn-danger mr-2 text-white"
                                  onClick={() => {}}
                                >
                                  emergency
                                </a>
                              </td>
                              <td>
                                <Link href="/tutor/hurikaeT">
                                  {/* <button
                                    className="btn-sm btn-primary"
                                    onClick={() => {
                                      // setOpenModal(true)
                                      // setMbnModal(val.member_barcode_num)
                                    }}
                                  >
                                    Makeup(振替)
                                  </button> */}
                                  <a
                                    className="btn-sm btn-primary text-white"
                                    onClick={() => {}}
                                  >
                                    Makeup
                                  </a>
                                </Link>
                              </td>

                              <td>
                                {val.course}
                                <br />
                                {val.subject}
                              </td>

                              <td>
                                {val.start_time}~{val.end_time}
                              </td>
                              <td>{val.duringTime}</td>
                              <td>{val.courseLevel}</td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item Four</TabPanel>
              </TabContext>
            </Box>
          </div>
          {/* //tabend */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default myLesson
