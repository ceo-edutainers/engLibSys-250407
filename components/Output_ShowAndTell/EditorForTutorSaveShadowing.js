import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})
import 'react-quill/dist/quill.snow.css'

// import { EditorState } from 'draft-js'
// import { Editor } from 'react-draft-wysiwyg'

const RndEditor = ({ homework_id, mbn }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

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
        var url =
          DB_CONN_URL + '/save-lesson-edit-for-tutor-materials-shadowing-BOOK'
        //  alert(url)
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
        //         seriesName:English Power
        // bookTitle:Power Listening in English
        // bookNum:bookNum
        // storyNum:storyNum
        // storyTitle
        axios
          .post(url, {
            tbn: tbn,
            teacher_name: teacher_name,
            subject: subject,
            material_sort: material_sort,
            course: course,
            courseName: courseName,
            seriesName: seriesName,
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

  const [dbValue, setDbValue] = useState()
  // useEffect(() => {
  //   selectMemo()
  // }, [])
  function selectMemo() {
    var url = DB_CONN_URL + '/select-lesson-memo-tutor-shadowing/'
    var Url = url + mbn + '&' + homework_id
    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setDbValue(response.data[0].lessonMemo)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }
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
      {/* dbValue: {dbValue} */}
      {dbValue != '' && value == '' ? (
        <ReactQuill
          theme="snow"
          value={dbValue}
          modules={modules}
          onChange={setValue}
          style={{ backgroundColor: '#F9EBEA' }}
        />
      ) : (
        <ReactQuill
          theme="snow"
          value={value}
          modules={modules}
          onChange={setValue}
          style={{ backgroundColor: '#F9EBEA' }}
        />
      )}
      <p>
        {' '}
        &uarr;<strong>[SHADOWING]</strong>
        <br />
        ここに書くと、先生の記録として残ります。
      </p>
      <span
        className="btn btn-danger mt-2 mb-2"
        onClick={() => {
          saveEditor(value)
          selectMemo()
        }}
      >
        Save For Tutor
      </span>
    </>
  )
}

export default RndEditor
