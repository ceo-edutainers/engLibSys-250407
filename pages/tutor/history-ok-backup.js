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

const LessonHistory = () => {
  const [lessonInfo, setLessonInfo] = useState([])

  const { query } = useRouter()
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  console.log('query.tbn:', query.tbn)

  useEffect(() => {
    if (localStorage.getItem('T_loginStatus') == 'true') {
      var tbn = query.tbn
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
    }
  }, [])

  //POST Last Version
  // useEffect(() => {
  //   if (localStorage.getItem('T_loginStatus') == 'true') {
  //     var tbn = localStorage.getItem('tbn')

  //     axios
  //       .post(DB_CONN_URL + '/tutor_lesson_list_ok', {
  //         tbn: tbn,
  //         status: 'ok',
  //       })
  //       .then((response) => {
  //         //errorの場合
  //         if (!response.data.status) {
  //           alert(response.data.message) //for test
  //         } else {
  //           setLessonInfo(response.data.response)
  //           //console.log('tbn', response.data.response[0].teacher_barcode_num)
  //         }
  //       })
  //   }
  // }, [])

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
          {/* //tabstart */}

          <div className="col-lg-12 col-md-6">
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
                    <div className="col-lg-3 col-md-6 mb-2 pl-3">
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
                      <b>Total：{lessonInfo.length}</b>
                    </div>
                  </div>
                  <table className="table table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>Name</th>
                        <th>subject</th>

                        <th>Course Group</th>
                        <th>Course Name</th>
                        <th>Course Detail</th>
                        <th>Student(Day)</th>
                        <th>Student(Time)</th>
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
                          return (
                            <tr key={key}>
                              <td>{val.name_eng}</td>
                              <td>{val.subject}</td>

                              <td>{val.course}</td>
                              <td>{val.courseName}</td>
                              <td>{val.courseNameDetail}</td>
                              <td>{val.weekday}</td>
                              <td>
                                {val.start_time}~{val.end_time}
                              </td>
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

export default LessonHistory
