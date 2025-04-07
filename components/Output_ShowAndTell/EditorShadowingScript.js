import React, { useState, useEffect, useMemo, useRef } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})

// import PdfViewer from './PdfViewer'
import 'react-quill/dist/quill.snow.css'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

const EditorShadowingScript = ({
  yID,
  teacher_name,
  tbn,
  shdaowingLevel,
  homework_id,
}) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  // const youtubeID = yID

  // const [shadowLevel, setShadowLevel] = useState()
  // const [shadowQuestionFile, setShadowQuestionFile] = useState()
  const [questionUrl, setQuestionUrl] = useState('')

  //For tab start
  const [value, setValue] = React.useState('1')

  const [dbValue, setDbValue] = useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [clearBtn, setClearBtn] = useState('')

  const [movieInfo, setMovieInfo] = useState()
  const [movieInfoLength, setMovieInfoLength] = useState()

  const inputRef = useRef()
  // const handleClear = () => {
  //   setSearchTermWeekday('')
  //   setSearchTermName('')
  //   setClearBtn('clear')
  //   inputRef.current.value = ''
  // }

  // const [value2, setValue2] = useState('')
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

  useEffect(() => {
    getMovieScript()
    getScript()
  }, [yID])

  function getMovieScript() {
    const fetchData = async () => {
      try {
        var url =
          DB_CONN_URL + '/get-hw-and-Shadowing-movie-script-for-how-page'
        var youtubeURL = 'https://youtu.be/' + yID
        // alert(youtubeURL)
        axios
          .post(url, {
            youtubeURL,
          })
          .then((response) => {
            if (response.data.length > 0) {
              // setShadowLevel(response.data.result[0].shadowingLevel)
              // setShadowQuestionFile(response.data.result[0].serverURL)
              var qUrl =
                'https://englib-materials.s3.ap-northeast-1.amazonaws.com/ShadowingQuestion/Video/' +
                response.data.result[0].shadowingLevel +
                '/' +
                response.data.result[0].serverURL +
                '-QUESTION.pdf'

              //TEST
              // var qUrl =
              //   'https://englib-materials.s3.ap-northeast-1.amazonaws.com/ShadowingQuestion/Video/BASIC/1_Penguins-QUESTION.pdf'

              setQuestionUrl(qUrl)
            }
          })
      } catch (error) {
        alert('test error 1')
      }
    }
    fetchData()
  }

  // useEffect(() => {
  //   getScript()
  // }, [yID])

  function getScript() {
    const fetchData = async () => {
      var url = DB_CONN_URL + '/get-hw-and-Shadowing-movie-script-by-time2'
      var yid = yID
      try {
        axios
          .post(url, {
            yid,
          })
          .then((response) => {
            if (response.data.length > 0) {
              setMovieInfoLength(response.data.length)
              setMovieInfo(response.data.response)
              selectMemo()
            }
          })
      } catch (error) {
        alert('error 2')
      }
    }
    fetchData()
  }

  useEffect(() => {
    // selectMemo()
  }, [yID])
  function selectMemo() {
    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/select-lesson-memo-tutor-shadowing-VIDEO'
        var youtubeURL = 'https://youtu.be/' + yID

        axios
          .post(url, {
            tbn: tbn,
            youtubeURL: youtubeURL,
          })
          .then((response) => {
            // alert(response.data.message)
            // alert('length:' + response.data.length)

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

  // alert(yID)
  function saveEditor(vlu) {
    const fetchData = async () => {
      try {
        // var url = DB_CONN_URL + '/save-shadowing-script-editor'
        var url =
          DB_CONN_URL + '/save-lesson-edit-for-tutor-materials-shadowing-VIDEO'
        // alert(url)
        // alert('tbn' + tbn)
        // alert('teacher_name:' + teacher_name)
        var youtubeURL = 'https://youtu.be/' + yID

        axios
          .post(url, {
            tbn: tbn,
            teacher_name: teacher_name,
            subject: 'SHADOWING',
            material_sort: 'VIDEO',
            youtubeURL: youtubeURL,
            memo: vlu,
          })
          .then((response) => {
            // alert(response.data.message)
            alert('Saved!')
            selectMemo()
          })
      } catch (error) {
        alert('error save')
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

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Video Script" value="1" sx={{ width: '30%' }} />
              <Tab label="Questions" value="2" sx={{ width: '30%' }} />
              <Tab label="Editor" value="3" sx={{ width: '30%' }} />
            </TabList>
          </Box>
          <TabPanel value="1">
            {/* <div className="row">
              <div className="col-lg-12 col-md-12 mb-2 pl-3"> */}{' '}
            {movieInfoLength > 0 &&
              movieInfo &&
              movieInfo.map((val, key) => {
                return (
                  <>
                    <span
                      style={{ fontSize: '18px' }}
                      dangerouslySetInnerHTML={{ __html: val.script }}
                    ></span>
                    &nbsp;
                    <br />
                  </>
                )
              })}
            {/* </div>
            </div> */}
          </TabPanel>
          <TabPanel value="2">
            {/* <div className="row">
              <div
                className="col-lg-12 col-md-12 mb-2 pl-0 ml-0"
                style={{ textAlign: 'left' }}
              > */}
            {questionUrl && (
              <object
                // data="https://englib-materials.s3.ap-northeast-1.amazonaws.com/ShadowingQuestion/Video/BASIC/1_Penguins-QUESTION.pdf"
                data={questionUrl}
                style={{
                  width: '100%',
                  height: '820px',
                  border: '1px solid white',
                  borderRadius: '20px',
                  backgroundColor: 'white',
                  margin: 0,
                  padding: 0,
                }}
              />
            )}
            {/* </div>
            </div> */}
          </TabPanel>
          <TabPanel value="3">
            {/* <div className="row">
              <div
                className="col-lg-12 col-md-12 mb-2 pl-0 ml-0"
                style={{ textAlign: 'left' }}
              > */}
            <span
              className="btn btn-danger mt-2 mb-2"
              onClick={() => {
                // saveEditor(value)
                saveEditor(dbValue)
              }}
              style={{ cursor: 'pointer' }}
            >
              Save as your material
            </span>
            <span
              className="btn btn-primary mt-2 ml-3 mb-2"
              onClick={() => {
                sentMemoToStudent(dbValue)
              }}
            >
              Send to student
            </span>
            {/* </div> */}
            <br />
            <ReactQuill
              theme="snow"
              modules={modules}
              onChange={setDbValue}
              value={dbValue && dbValue}
              style={{ backgroundColor: '#FEF9E7' }}
            />
            {/* </div> */}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}

export default EditorShadowingScript
