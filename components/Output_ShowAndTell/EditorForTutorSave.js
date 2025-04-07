import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import Link from '@/utils/ActiveLink'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})
import 'react-quill/dist/quill.snow.css'

// import { EditorState } from 'draft-js'
// import { Editor } from 'react-draft-wysiwyg'

const EditorForTutorSave = ({
  homework_id,
  // tbn,
  // tutorNameEng,
  // subject,
  // course,
  // courseName,
  // seriesName,
  // readingLevel,
  // bookNum,
  // bookTitle,
  // storyNum,
  // storyTitle,
}) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const [tbn2, settbn2] = useState()
  const [tutorNameEng2, settutorNameEng2] = useState()
  const [subject2, setsubject2] = useState()
  const [material_sort, setmaterial_sort] = useState()
  const [course2, setcourse2] = useState()
  const [courseName2, setcourseName2] = useState()
  const [seriesName2, setseriesName2] = useState()
  const [readingLevel2, setreadingLevel2] = useState()
  const [bookNum2, setbookNum2] = useState()
  const [bookTitle2, setbookTitle2] = useState()
  const [storyNum2, setstoryNum2] = useState()
  const [storyTitle2, setstoryTitle2] = useState()

  useEffect(() => {
    //select-lesson-info
    // alert(homework_id)
    // const lessonExtendedSet = () => {
    var url = DB_CONN_URL + '/select-lesson-info/'

    axios.get(url + homework_id).then((response) => {
      // alert('length:' + response.data.length)
      if (response.data.length > 0) {
        settbn2(response.data[0].teacher_barcode_num)
        settutorNameEng2(response.data[0].teacher_name)
        setsubject2(response.data[0].subject)
        setmaterial_sort(response.data[0].material_sort)
        setcourse2(response.data[0].course)
        setcourseName2(response.data[0].courseName)
        setseriesName2(response.data[0].seriesName)
        setreadingLevel2(response.data[0].readingLevel)
        setbookNum2(response.data[0].bookNum)
        setbookTitle2(response.data[0].bookTitle)
        setstoryNum2(response.data[0].storyNum)
        setstoryTitle2(response.data[0].storyTitle)
        var tbn3 = response.data[0].teacher_barcode_num
        var tutorNameEng3 = response.data[0].teacher_name
        var subject3 = response.data[0].subject
        var course3 = response.data[0].course
        var courseName3 = response.data[0].courseName
        var seriesName3 = response.data[0].seriesName
        var readingLevel3 = response.data[0].readingLevel
        var bookNum3 = response.data[0].bookNum
        var bookTitle3 = response.data[0].bookTitle
        var storyNum3 = response.data[0].storyNum
        var storyTitle3 = response.data[0].storyTitle
        // alert('select-lesson-info' + tbn3)
        // alert('select-lesson-info' + subject3)
        // alert('select-lesson-info' + course3) //undefined
        // alert('select-lesson-info' + courseName3)
        // alert('select-lesson-info' + seriesName3) //undefined
        // alert('select-lesson-info' + readingLevel3) //undefined
        // alert('select-lesson-info' + bookNum3) //undefined
        // alert('select-lesson-info' + storyNum3) //undefined
        selectMemo(
          tbn3,
          subject3,
          course3,
          courseName3,
          seriesName3,
          readingLevel3,
          bookNum3,
          storyNum3
        )
      }
    })
    // }
  }, [])

  const [dbValue, setDbValue] = useState()

  function selectMemo(
    tbn,
    subject,
    course,
    courseName,
    seriesName,
    readingLevel,
    bookNum,
    storyNum
  ) {
    // alert('here')
    var url = DB_CONN_URL + '/select-tutor-materials/'

    const fetchData = async () => {
      // alert(tbn)
      // alert(subject)
      // alert(course) //undefined
      // alert(courseName)
      // alert(seriesName) //undefined
      // alert(readingLevel) //undefined
      // alert(bookNum) //undefined
      // alert(storyNum) //undefined

      try {
        axios
          .post(url, {
            tbn: tbn,
            subject: subject,
            course: course,
            courseName: courseName,
            seriesName: seriesName,
            readingLevel: readingLevel,
            bookNum: bookNum,
            storyNum: storyNum,
          })
          .then((response) => {
            // alert(response.data.length)
            // if (response.data.length > 0) {
            // alert(response.data[0].lessonMemo)
            setDbValue(response.data[0].lessonMemo)
            // } else {
            // }
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function saveEditor(
    tbn,
    teacher_name,
    subject,
    course,
    courseName,
    seriesName,
    readingLevel,
    bookTitle,
    bookNum,
    storyNum,
    storyTitle,
    vlu
  ) {
    //次のStepSH1のsys_hw_historyテーブルのstepStatusがendになっている場合は、StepSH2にいく。
    //왜냐하면, StepSH1은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/save-lesson-edit-for-tutor-materials-READING'
        // alert(url)
        // alert('tbn2' + tbn2)
        // alert(tutorNameEng2)
        // alert(subject2)
        // alert(course2)
        // alert(courseName2)
        // alert(seriesName2)
        // alert(readingLevel2)
        // alert(bookTitle2)
        // alert(bookNum2)
        // alert(storyNum2)
        // alert(storyTitle2)
        // alert(vlu)
        axios
          .post(url, {
            tbn: tbn,
            teacher_name: teacher_name,
            subject: subject,
            material_sort: material_sort,
            course: course,
            courseName: courseName,
            seriesName: seriesName,
            readingLevel: readingLevel,
            bookTitle: bookTitle,
            bookNum: bookNum,
            storyNum: storyNum,
            storyTitle: storyTitle,
            memo: vlu,
          })
          .then((response) => {
            alert(response.data.message)
            alert('Updated!')
          })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  // const [dbValue, setDbValue] = useState()

  //Editor
  const [value, setValue] = useState('')
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

  return (
    <>
      {/* dbValue:{dbValue}
      {dbValue == '' ? (
        <p>ない</p>
      ) : (
        <ReactQuill
          theme="snow"
          value={dbValue}
          modules={modules}
          onChange={setValue}
          style={{ backgroundColor: '#FFE9D9' }}
        />
      )} */}
      {/* <p>
        tbn2 ={tbn2}
        <br />
        tutorNameEng2 ={tutorNameEng2} <br />
        subject2 ={subject2} <br />
        course2 ={course2} <br />
        courseName2 ={courseName2} <br />
        seriesName2 ={seriesName2} <br />
        readingLevel2 ={readingLevel2} <br />
        bookNum2 ={bookNum2} <br />
        bookTitle2 ={bookTitle2} <br />
        storyNum2 ={storyNum2} <br />
        storyTitle2 ={storyTitle2} <br />
      </p> */}
      {dbValue != '' && value == '' ? (
        <ReactQuill
          theme="snow"
          value={dbValue}
          modules={modules}
          onChange={setValue}
          style={{ backgroundColor: '#FFE9D9' }}
        />
      ) : (
        <ReactQuill
          theme="snow"
          value={value}
          modules={modules}
          onChange={setValue}
          style={{ backgroundColor: '#FFE9D9' }}
        />
      )}
      <p> &uarr;ここに書くと、生徒の復習に使われます。</p>
      <span
        className="btn btn-danger mt-2"
        onClick={() => {
          // saveEditor(value)
          saveEditor(
            tbn2,
            tutorNameEng2,
            subject2,
            course2,
            courseName2,
            seriesName2,
            readingLevel2,
            bookTitle2,
            bookNum2,
            storyNum2,
            storyTitle2,
            value
          )
          selectMemo(
            tbn2,
            subject2,
            course2,
            courseName2,
            seriesName2,
            readingLevel2,
            bookNum2,
            storyNum2
          )
        }}
      >
        Save For Teacher
      </span>
    </>
  )
}

export default EditorForTutorSave
