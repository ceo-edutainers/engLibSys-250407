import React, { useState, useEffect, useMemo, useRef } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})
import 'react-quill/dist/quill.snow.css'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

const EditorBookShadowingScript = ({
  mbn,
  homework_id,
  tbn,
  teacher_name,
  seriesName,
  bookTitle,
  bookNum,
  storyNum,
  storyTitle,
}) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [viewSentence, setViewSentence] = useState(false)
  // const youtubeID = yID

  //For tab start
  const [value, setValue] = React.useState('')
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
  // alert(youtubeID)
  function saveEditor(vlu) {
    // alert(teacher_name)
    // alert(seriesName)
    // alert(bookTitle)
    // alert(bookNum)
    // alert(storyNum)
    // alert(storyTitle)
    // alert(vlu)
    // alert(tbn)

    const fetchData = async () => {
      // var bookTitle = bt
      // var bookNum = bn
      // var storyNum = sn
      var subject = 'SHADOWING'
      var material_sort = 'BOOK'
      var course = 'INPUT COURSE'
      var courseName = 'courseSD'

      try {
        var url =
          DB_CONN_URL + '/save-lesson-edit-for-tutor-materials-shadowing-book'
        await axios
          .post(url, {
            tbn,
            teacher_name,
            subject,
            material_sort,
            course,
            courseName,
            seriesName,
            bookTitle,
            bookNum,
            storyNum,
            storyTitle,
            vlu,
          })
          .then((response) => {
            alert('saved')
            selectMemo()
          })
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }

  const [value2, setValue2] = useState('')
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }

  const [dbValue, setDbValue] = useState('')
  useEffect(() => {
    selectMemo()
  }, [])
  function selectMemo() {
    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/select-lesson-memo-tutor-shadowing'

        axios
          .post(url, {
            tbn: tbn,
            subject: 'SHADOWING',
            material_sort: 'BOOK',
            course: 'INPUT COURSE',
            courseName: 'courseSD',
            seriesName: seriesName,
            bookTitle: bookTitle,
            bookNum: bookNum,
            storyNum: storyNum,
          })
          .then((response) => {
            // alert(response.data.message)

            if (response.data.length > 0) {
              // alert(response.data.length)
              // alert(response.data.response[0].lessonMemo)
              setDbValue(response.data.response[0].lessonMemo)
            }
          })
      } catch (error) {
        alert('error1')
        console.log(error)
      }
    }
    fetchData()
  }

  function sentMemoToStudent(vlu) {
    //次のStepSH1のsys_hw_historyテーブルのstepStatusがendになっている場合は、StepSH2にいく。
    //왜냐하면, StepSH1은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/send-lesson-edit-for-student'

        axios
          .post(url, {
            homework_id: homework_id,
            memo: vlu,
          })
          .then((response) => {
            // alert(response.data.message)
            alert("Tutor's memo has been sent to the student successfully!")
          })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }
  return (
    <>
      {/* dbValue: {dbValue} */}

      {/* {script == '' && value == '' ? ( */}
      {/* {script  && ( */}

      {/* <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Video Script" value="1" />
              <Tab label="Editor" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="row">
              <div className="col-lg-12 col-md-12 mb-2 pl-3">
                {' '}
                {movieInfo &&
                  movieInfoLength > 0 &&
                  movieInfo.map((val, key) => {
                    return (
                      <>
                        <span style={{ fontSize: '20px' }}>
                          {' '}
                          {val.sentenceOrder}.
                        </span>
                        &nbsp;
                        <span
                          style={{ fontSize: '20px' }}
                          dangerouslySetInnerHTML={{ __html: val.sentence }}
                        ></span>
                        &nbsp;
                        <br />
                      </>
                    )
                  })}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <div className="row">
              <div
                className="col-lg-12 col-md-12 mb-2 ml-2"
                style={{ textAlign: 'left' }}
              >
                <span
                  className="btn btn-primary mt-2"
                  onClick={() => {
                    saveEditor(value)
                    selectMemo()
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  先生のShadowing Materialに保存(BOOK)
                </span>
              </div>
              <div className="col-lg-12 col-md-12 mb-2 pl-3">
                <ReactQuill
                  theme="snow"
                  // value={script ? script : value2}
                  // value="<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>"
                  // value={
                  //   value2 != ''
                  //     ? value2
                  //     : '<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>'
                  // }
                  value={value2}
                  modules={modules}
                  onChange={setValue2}
                  style={{ backgroundColor: '#FEF9E7' }}
                />
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </Box> */}
      <div className="col-lg-12 col-md-12 mb-2">
        <div
          className="col-lg-12 col-md-12 mb-2 pl-0 ml-0"
          style={{ textAlign: 'left' }}
        >
          {/* {dbValue} */}
          <span
            className="btn btn-danger mt-2"
            onClick={() => {
              // saveEditor(value)
              saveEditor(dbValue)
            }}
            style={{ cursor: 'pointer' }}
          >
            Save as your material
          </span>
          <span
            className="btn btn-primary mt-2 ml-3"
            onClick={() => {
              // saveEditor(value)
              sentMemoToStudent(dbValue)
            }}
          >
            Send to student
          </span>
        </div>
        {/* {dbValue} */}
        <ReactQuill
          theme="snow"
          value={dbValue ? dbValue : value}
          modules={modules}
          onChange={setDbValue}
          style={{ backgroundColor: '#FEF9E7' }}
        />
      </div>
    </>
  )
}

export default EditorBookShadowingScript
