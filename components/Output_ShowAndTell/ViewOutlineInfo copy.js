import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from './Contexts'
import axios from 'axios'

const ViewOutlineInfo = () => {
  const [outlineView, setOutlineView] = useState(false)
  const [outlineTopic, setOutlineTopic] = useState()
  const [outlineIntroduction, setOutlineIntroduction] = useState()
  const [outlineBody, setOutlineBody] = useState()
  const [outlineConclusion, setOutlineConclusion] = useState()

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
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const DB_CONN_URL = process.env.DB_CONN_URL
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')

    var Url = DB_CONN_URL + '/get-hw-show-and-tell-info/' + mbn + '&' + HWID

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)

        setOutlineTopic(response.data[0].outline_topic.trim())
        setOutlineIntroduction(response.data[0].outline_introduction.trim())
        setOutlineBody(response.data[0].outline_body.trim())
        setOutlineConclusion(response.data[0].outline_conclusion.trim())

        // setOutlineTopicWordLength(
        //   response.data[0].outline_topic.split(' ').length
        // )
        // setOutlineIntroductionWordLength(
        //   response.data[0].outline_introduction.split(' ').length
        // )
        // setOutlineBodyWordLength(
        //   response.data[0].outline_body.split(' ').length
        // )
        // setOutlineConclusionWordLength(
        //   response.data[0].outline_conclusion.split(' ').length
        // )
        //ページloading時の計算

        // var sum = parseInt(
        //   response.data[0].outline_topic.split(' ').length +
        //     response.data[0].outline_introduction.split(' ').length +
        //     response.data[0].outline_body.split(' ').length +
        //     response.data[0].outline_conclusion.split(' ').length
        // )
        // setWordsum(sum)
        // alert(sum)
      } catch (error) {
        console.log(error)
        setError(true)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (isError) return <h1>Error, try again! viewOutline </h1>
  if (isLoading) return <h1>Loading Page..........................</h1>

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
        <p>
          <b>[TOPIC]</b>
          <br />
          {outlineTopic}
        </p>
        <p>
          <b>[INTRODUCTION]</b>
          <br />
          {outlineIntroduction}
        </p>
        <p>
          <b>[BODY]</b>
          <br />
          {outlineBody}
        </p>
        <p>
          <b>[CONCLUSION]</b>
          <br />
          {outlineConclusion}
        </p>
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
            {outlineTopic}
          </p>
          <p>
            <b>[INTRODUCTION]</b>
            <br />
            {outlineIntroduction}
          </p>
          <p>
            <b>[BODY]</b>
            <br />
            {outlineBody}
          </p>
          <p>
            <b>[CONCLUSION]</b>
            <br />
            {outlineConclusion}
          </p>
        </div>
        <hr />
      </MediaQuery> */}
    </>
  )
}

export default ViewOutlineInfo
