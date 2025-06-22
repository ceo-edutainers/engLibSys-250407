import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from './Contexts'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const OutlineSample = () => {
  const [mindmapView, setMindmapView] = useState(false)
  const {
    myMbn,
    setMyMbn,
    teacherName,
    setTeacherName,
    tbn,
    setTbn,
    HWID,
    setHWID,
    yoyakuDate,
    setYoyakuDate,
    yoyakuTime,
    setYoyakuTime,
    thisSubject,
    setThisSubject,
    storyTitle,
    setStoryTitle,
    practiceTempId,
    setPracticeTempId,
    audioOnOff,
    setAudioOnOff,
    course,
    setCourse,
    courseName,
    setCourseName,
    pageView,
    setPageView,
    courseLevel,
    setCourseLevel,
    userName,
    setUserName,
    point,
    setPoint,
  } = useContext(QuizContext)

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <span style={{ cursor: 'pointer' }}>
        <h5
          style={{
            // width: '100%',
            width: '100',
            fontSize: '18px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#e6e6fa',
            marginTop: '20px',
            marginBottom: '15px',
            color: 'black',
            fontWeight: '600',
          }}
          onClick={() => {
            setMindmapView(!mindmapView)
          }}
        >
          <img
            src="/images/icon-mouseclick.png"
            style={{ height: '40px', width: 'auto' }}
          />
          アウトラインの宿題サンプルを
          {mindmapView ? '隠す' : '見る'}(クリック)
        </h5>
      </span>
      <div
        className="col-lg-12 col-md-12"
        style={{ display: mindmapView ? 'block' : 'none' }}
      >
        <img src="https://englib-public-worker.englib-new-materials.workers.dev/hwSample/show-and-tell-example1_Page_2-2.jpg" />
      </div>

      {/* </MediaQuery> */}
      {/* <MediaQuery query="(max-width: 767px)">
        <div
          className="col-lg-12 col-md-12 mt-4 mb-3"
          // style={{
          //   backgroundColor: 'white',
          //   padding: '15px',
          //   color: 'black',
          //   borderRadius: '10px',
          //   marginTop: '0px',
          //   marginBottom: '0px',
          // }}
        >
          <center>
            <p
              style={{
                // width: '100%',
                width: '50%',
                fontSize: '16px',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#dedede',

                color: 'black',
              }}
            >
              <b>
                <h5>アウトラインのサンプルをみる</h5>
              </b>
            </p>
          </center>
        </div>
      </MediaQuery> */}
    </>
  )
}

export default OutlineSample
