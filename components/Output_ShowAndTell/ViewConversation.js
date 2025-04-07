import React, { useEffect, useState } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import ReactAudioPlayer from 'react-audio-player'
// const [homework_id, sethomework_id] = useState()
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import WordListReadingBookAForTutor from '@/components/readingSelfcourse/WordListReadingBookAForTutor' //単語リスト

const ViewReading = ({
  courseName,
  mbn,
  tbn,
  homework_id,
  fsl,
  converFinishAlert,
}) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  return (
    <>
      {/* {phonicsBigCourse}/{phonicsLessonTitle}/{phonicsLessonOrder}
      <br />
      {fsl} */}

      <center>
        <div className="row pt-4" style={{ backgroundColor: 'white' }}>
          {/* <div className="col-lg-12 col-md-12">
            <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>
              [{phonicsLessonTitle}]&nbsp;{phonicsLessonOrder}/ {bookUrl}
            </h1>
          </div> */}
          <div className="col-lg-12 col-md-12 p-0 pl-3 m-0">
            {' '}
            <h5 style={{ color: 'blue' }}>{converFinishAlert}</h5>
          </div>
          <div
            className="col-lg-12 col-md-12 p-0 pl-3 m-0"
            style0={{
              width: '100%',
              height: '820px',
              padding: 0,
            }}
          >
            <object
              data={fsl}
              style={{
                width: '70%',
                height: '820px',
                border: '1px solid white',
                borderRadius: '20px',
                backgroundColor: 'white',
                margin: 0,
                padding: 0,
              }}
            />
          </div>
        </div>
      </center>
    </>
  )
}

export default ViewReading
