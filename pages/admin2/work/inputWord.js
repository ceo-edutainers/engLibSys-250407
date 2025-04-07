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

const Upcoming = () => {
  //get값이 넘어왔을 경우

  const { query } = useRouter()
  const DB_CONN_URL = process.env.DB_CONN_URL
  // const tbn = query.tbn

  const [myWord, setMyWord] = useState()
  const [myMeaning, setMyMeaning] = useState()
  const [listView, setListView] = useState(false)

  //modal
  const [openModal, setOpenModal] = useState(false)
  const [mbnModal, setMbnModal] = useState()
  const [todayDate, setTodayDate] = useState(null)
  // const [tbn, setTbn] = useState(query.tbn)
  const [lessonInfo, setLessonInfo] = useState([])

  const [oshiraseInfo, setOshiraseInfo] = useState([])
  // const [lessonHistoryInfo, setLessonHistoryInfo] = useState(null)
  // console.log('query.tbn:', query.tbn)
  // console.log('tbn:', tbn)
  useEffect(() => {
    // var tbn = query.tbn
    // alert(tbn)
    const tbn = localStorage.getItem('tbn')
    // alert('tbn' + tbn)
    var status = 'homework'
    var Url = DB_CONN_URL + '/select-all-word-material/'
    // console.log('Url', Url)
    axios.get(Url).then((response) => {
      //errorの場合

      if (!response.data.status) {
        alert(response.data.message) //for test
      } else {
        if (response.data.length > 0) {
          // alert(response.data.message)
          setLessonInfo(response.data.response)
        } else {
          alert(response.data.message)
          setLessonInfo([])
        }
      }
    })
  }, [])

  useEffect(() => {
    // var tbn = query.tbn
    // alert(tbn)
    const tbn = localStorage.getItem('tbn')
    // alert('tbn' + tbn)
    var toWho = 'tutor'
    var status = 'ing'
    var Url = DB_CONN_URL + '/englib_oshirase/' + toWho + '&' + status

    axios.get(Url).then((response) => {
      //errorの場合

      if (!response.data.status) {
        // alert(response.data.message) //for test
      } else {
        // alert(response.data.length)
        if (response.data.length > 0) {
          setOshiraseInfo(response.data.response)
        }
      }
    })
  }, [])

  useEffect(() => {
    getToday()
  }, [])
  const getToday = () => {
    var d = ''
    var d = new Date()
    var Y = d.getFullYear()
    var M = d.getMonth() + 1
    var D = d.getDate()
    var h = d.getHours()
    var m = d.getMinutes()
    var s = d.getSeconds()
    // let ms = myFun_addZero(d.getMilliseconds())

    if (M < 10) {
      M = '0' + M
    }
    if (D < 10) {
      D = '0' + D
    }
    if (h < 10) {
      h = '0' + h
    }
    if (m < 10) {
      m = '0' + m
    }
    if (s < 10) {
      s = '0' + s
    }
    var NowRegdate = Y + '-' + M + '-' + D
    var NowRegtime = h + ':' + m + ':' + s

    setTodayDate(NowRegdate)
  }
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
                    <Tab label="Lesson History" value="4" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="row">
                    <div className="col-lg-12 col-md-6">
                      SHADOWING :{' '}
                      <input
                        type="radiobutton"
                        name="subject"
                        value="SHADOWING"
                      />
                      READING :
                      <input
                        type="radiobutton"
                        name="subject"
                        value="READING"
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 mb-2">
                      <input
                        className="form-control-md mb-2"
                        style={{ width: '100%' }}
                        ref={inputRef}
                        type="text"
                        placeholder="Word Search..."
                        onChange={(e) => {
                          setClearBtn('')
                          setSearchTermName(e.target.value)
                          setMyWord(e.target.value)
                          setListView(true)
                        }}
                      />
                      {/* {myWord}/{searchTermName} */}
                      <input
                        className="ml-2"
                        type="text"
                        name="meaning"
                        onChange={(e) => {
                          setMyMeaning(e.target.value)
                        }}
                        placeholder="meaning"
                      />
                    </div>
                    <div className="col-lg-4 col-md-6 mb-2">
                      <span
                        className="btn-sm btn-secondary mr-2 "
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleClear()
                        }}
                      >
                        Reset(All Data)
                      </span>
                      <span
                        className="btn-sm btn-primary "
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          getToday()
                        }}
                      >
                        Today
                      </span>
                    </div>

                    <div
                      className="col-lg-2 col-md-6 pr-4"
                      style={{ textAlign: 'right' }}
                    >
                      <b>Total：{lessonInfo.length}</b>
                    </div>
                  </div>

                  <div
                  // style={{
                  //   display: listView ? 'block' : 'none',
                  // }}
                  >
                    {' '}
                    {/* <table className="table table table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th>book title</th>
                          <th>word</th>
                          <th>meaning for adult</th>
                          <th>meaning for kids</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lessonInfo &&
                          lessonInfo
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

                              if (
                                searchTermName == '' &&
                                searchTermWeekday == ''
                              ) {
                                return val //everything data
                              } else if (
                                searchTermWeekday == '' &&
                                val.word
                                  .toLowerCase()
                                  .includes(searchTermName.toLowerCase())
                              ) {
                                // setListView(true)
                                return val
                              }
                            })
                            .map((val, key) => {
                              return (
                                <tr key={key}>
                                  <td>{val.bookTitle}</td>
                                  <td>{val.word}</td>

                                  <td>{val.meaning_adult}</td>
                                  <td>{val.meaning_kids}</td>
                                </tr>
                              )
                            })}
                      </tbody>
                    </table> */}
                  </div>
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

export default Upcoming
