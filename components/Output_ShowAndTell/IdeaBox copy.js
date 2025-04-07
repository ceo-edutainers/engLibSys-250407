import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from './Contexts'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
const IdeaBox = () => {
  const [mindmapView, setMindmapView] = useState(false) //IdeaView
  const [ideaBoxList, setIdeaBoxList] = useState([])
  const {
    myMbn,
    setMyMbn,
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

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    var Url = DB_CONN_URL + '/get-hw-show-and-tell-idea-box'

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setIdeaBoxList(response.data)

        //setAudioDurtaionFromDB(response.data[0].audioDuration)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

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
            backgroundColor: '#F9EBEA',
            marginTop: '20px',
            marginBottom: '15px',
            color: 'black',
            fontWeight: '600',
            border: '1px solid #FCD2CF',
          }}
          onClick={() => {
            setMindmapView(!mindmapView)
          }}
        >
          <img
            src="/images/icon-mouseclick.png"
            style={{ height: '40px', width: 'auto' }}
          />
          トピックアイディアボックスを
          {mindmapView ? '隠す' : '見る'}
          <p>Topicがまだ決まってない場合、アイディアボックスを見てみよう！</p>
        </h5>
      </span>
      <div
        className="col-lg-12 col-md-12"
        style={{ display: mindmapView ? 'block' : 'none' }}
      >
        {ideaBoxList.map((val, key) => {
          return (
            <>
              <div
                className="col-lg-12 col-md-12"
                style={{ textAlign: 'left' }}
              >
                <span>
                  <b>{val.bigCat}</b>
                </span>
                <span>{val.title}</span>
              </div>
            </>
          )
        })}
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
                <h5>マインドマップのサンプルをみる</h5>
              </b>
            </p>
          </center>
        </div>
      </MediaQuery> */}
    </>
  )
}

export default IdeaBox
