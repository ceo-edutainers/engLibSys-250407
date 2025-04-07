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

  function saveEditor(vlu) {
    //次のStepSH1のsys_hw_historyテーブルのstepStatusがendになっている場合は、StepSH2にいく。
    //왜냐하면, StepSH1은 처음 한번만 하는 step이므로.
    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/save-lesson-editor'

        axios
          .post(url, {
            mbn: mbn,
            homework_id: homework_id,
            memo: vlu,
          })
          .then((response) => {
            alert('Saved!')
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  const [dbValue, setDbValue] = useState()
  useEffect(() => {
    selectMemo()
  }, [])
  function selectMemo() {
    //次のStepSH1のsys_hw_historyテーブルのstepStatusがendになっている場合は、StepSH2にいく。
    //왜냐하면, StepSH1은 처음 한번만 하는 step이므로.

    var url = DB_CONN_URL + '/select-lesson-memo/'
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
          style={{ backgroundColor: '#FEF9E7' }}
        />
      ) : (
        <ReactQuill
          theme="snow"
          value={value}
          modules={modules}
          onChange={setValue}
          style={{ backgroundColor: '#FEF9E7' }}
        />
      )}
      <p> &uarr;ここに書くと、生徒の復習に使われます。</p>
      <span
        className="btn btn-primary mt-2"
        onClick={() => {
          saveEditor(value)
          selectMemo()
        }}
      >
        Save For Student
      </span>
    </>
  )
}

export default RndEditor
