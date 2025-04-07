import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from './Contexts'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'

const ViewOutlineInfo = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [outlineView, setOutlineView] = useState(false)
  const [VIEWoutlineTopic, setVIEWOutlineTopic] = useState()
  const [VIEWoutlineIntroduction, setVIEWOutlineIntroduction] = useState()
  const [VIEWoutlineBody, setVIEWOutlineBody] = useState()
  const [VIEWoutlineConclusion, setVIEWOutlineConclusion] = useState()

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

  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる

  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')

    var url = DB_CONN_URL + '/get-hw-show-and-tell-writing-info/'
    var Url = url + mbn + '&' + HWID + '&' + 'Step2OST'

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        if (response.data.length > 0) {
          // setVIEWOutlineTopic(response.data[0].outline_topic.trim())
          // setVIEWOutlineIntroduction(
          //   response.data[0].outline_introduction.trim()
          // )
          setVIEWOutlineBody(response.data[0].outline_body.trim())
          // setVIEWOutlineConclusion(response.data[0].outline_conclusion.trim())
        } else {
        }
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
            backgroundColor: '#dedede',
            marginTop: '20px',
            marginBottom: '15px',
            color: 'black',
            fontWeight: '600',
          }}
          onClick={() => {
            setOutlineView(!outlineView)
          }}
        >
          <img
            src="/images/icon-mouseclick.png"
            style={{ height: '40px', width: 'auto' }}
          />
          私が書いたアウトラインを
          {outlineView ? '隠す' : '見る'}
          {outlineView && (
            <p style={{ fontSize: '12px', fontWeight: '200' }}>
              自分が書いたアウトラインを元に最終スクリプトを作成する
            </p>
          )}
        </h5>
      </span>
      <div
        className="col-lg-12 col-md-12"
        style={{
          display: outlineView ? 'block' : 'none',
          textAlign: 'left',
          backgroundColor: '#F5F5F5',
        }}
      >
        {/* <p>
          <b>[TOPIC]</b>
          <br />
          {VIEWoutlineTopic}
        </p>
        <p>
          <b>[INTRODUCTION]</b>
          <br />
          {VIEWoutlineIntroduction}
        </p> */}
        <p>
          <b>[OUTLINE]</b>
          <br />
          {VIEWoutlineBody}
        </p>
        {/* <p>
          <b>[CONCLUSION]</b>
          <br />
          {VIEWoutlineConclusion}
        </p> */}
      </div>
      <hr />
      {/* </MediaQuery> */}

      {/* <MediaQuery query="(max-width: 767px)">
        <span style={{ cursor: 'pointer' }}>
          <h5
            style={{
              // width: '100%',
              width: '100',
              fontSize: '18px',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: '#dedede',
              marginTop: '20px',
              marginBottom: '15px',
              color: 'black',
              fontWeight: '600',
            }}
            onClick={() => {
              setOutlineView(!outlineView)
            }}
          >
            <img
              src="/images/icon-mouseclick.png"
              style={{ height: '40px', width: 'auto' }}
            />
            私が書いたアウトラインを
            {outlineView ? '隠す' : '見る'}
          </h5>
        </span>
        <div
          className="col-lg-12 col-md-12"
          style={{ display: outlineView ? 'block' : 'none', textAlign: 'left' }}
        >
          <p>
            <b>[TOPIC]</b>
            <br />
            {VIEWoutlineTopic}
          </p>
          <p>
            <b>[INTRODUCTION]</b>
            <br />
            {VIEWoutlineIntroduction}
          </p>
          <p>
            <b>[BODY]</b>
            <br />
            {VIEWoutlineBody}
          </p>
          <p>
            <b>[CONCLUSION]</b>
            <br />
            {VIEWoutlineConclusion}
          </p>
        </div>
        <hr />
      </MediaQuery> */}
    </>
  )
}

export default ViewOutlineInfo
