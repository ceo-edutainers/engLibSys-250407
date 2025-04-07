import React, { useEffect, useState, useRef, Component } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import { Rnd } from 'react-rnd'
import Link from '@/utils/ActiveLink'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import dynamic from 'next/dynamic'
import Editor from '@/components/Output_ShowAndTell/Editor'
import EditorForTutorSave from '@/components/Output_ShowAndTell/EditorForTutorSave'
// import Editor from '@/components/Editor/Editor'
// import EditorForTutorSaveShadowing from '@/components/Output_ShowAndTell/EditorForTutorSaveShadowing'

const RndEditor = ({
  homework_id,
  mbn,
  tbn,
  // tutorNameEng,
  // subject,
  // course,
  // courseName,
  // seriesName,
  // readingLevel,
  // bookTitle,
  // bookNum,
  // storyNum,
  // storyTitle,
}) => {
  // const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [rndWidth1, setRndWidth1] = useState(300)
  const [rndHeight1, setRndHeight1] = useState(60)
  const [defaultX, setDefaultX] = useState(1100)
  const [defaultY, setDefaultY] = useState(0)

  const [rndZIndex, setRndZIndex] = useState(2) //-1 後ろ

  function rndResize(width, height, x, y, zIndex) {
    setRndWidth1(width)
    setRndHeight1(height)
    setDefaultX(x)
    setDefaultY(y)
    setRndZIndex(zIndex)
  }

  return (
    <>
      <Rnd
        default={{
          x: defaultX,
          y: defaultY,
          width: rndWidth1,
          height: rndHeight1,
        }}
        size={{
          width: rndWidth1,
          height: rndHeight1,
        }}
        style={{
          // display: 'flex',
          alignItems: 'top',
          overflow: 'scroll',
          justifyContent: 'left',
          paddingTop: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
          border: 'solid 1px #dedede',
          borderRadius: '10px',
          background: 'white',
          border: '1px solid darkgray',
          overflow: 'auto',
          zIndex: rndZIndex,
        }}
        minWidth={300}
        minHeight={50}

        // bounds="window"
      >
        <p>
          <a
            className="btn btn-light ml-3 mr-2"
            //width, height, x, y, zIndex
            onClick={() => {
              rndResize(600, 800, 0, -50, 4)
              //alert(rndWidth1)
            }}
          >
            EDITOR
          </a>
          <a
            className="btn btn-light"
            style={{ color: 'red' }}
            onClick={() => {
              rndResize(300, 60, 0, -50, 3)
              //alert(rndWidth1)
            }}
          >
            X
          </a>
        </p>
        {/* <b>MultiQ</b> */}
        <a
          className="btn btn-light ml-3 mr-2"
          //width, height, x, y, zIndex
          onClick={() => {
            rndResize(800, 800, 0, -50, 4)
            //alert(rndWidth1)
          }}
        >
          (Large)
        </a>
        <a
          className="btn btn-light ml-3 mr-2"
          //width, height, x, y, zIndex
          onClick={() => {
            rndResize(600, 800, 0, -50, 4)
            //alert(rndWidth1)
          }}
        >
          (Medium)
        </a>
        <a
          className="btn btn-light ml-3 mr-2"
          //width, height, x, y, zIndex
          onClick={() => {
            rndResize(400, 800, 0, -50, 4)
            //alert(rndWidth1)
          }}
        >
          (Small)
        </a>

        {/* {rndWidth1} */}
        <br />
        {/* {rndZIndex == 3 && ( */}
        <div className="mt-3">
          {/* <ReactQuill
            theme="snow"
            value={value}
            modules={modules}
            onChange={setValue}
          /> */}
          {/* <Editor homework_id={homework_id} mbn={mbn} /> */}

          {/* <Editor /> */}
        </div>
        <div className="mt-3">
          {/* homework_id={homework_id}
          <br />
          mbn={mbn}
          <br />
          tbn={tbn}
          <br />
          tutorNameEng={tutorNameEng}
          <br />
          subject={subject}
          <br />
          course={course}
          <br />
          courseName={courseName}
          <br />
          seriesName={seriesName}
          <br />
          readingLevel={readingLevel}
          <br />
          bookTitle={bookTitle}
          <br />
          bookNum={bookNum}
          <br />
          storyNum={storyNum}
          <br />
          storyTitle={storyTitle}
          <br /> */}
          {/* <EditorForTutorSave homework_id={homework_id} /> */}
          {/* {subject == 'READING' && (
            <>
              <hr />
            </>
          )} */}
          {/* <hr />
          <EditorForTutorSaveShadowing homework_id={homework_id} mbn={mbn} /> */}
        </div>
        {/* )} */}
      </Rnd>
    </>
  )
}

export default RndEditor
