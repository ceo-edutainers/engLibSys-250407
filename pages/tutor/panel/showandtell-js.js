import React, { useState, useEffect } from 'react'
import SplitPanelOutputSAT from '@/components/Splitpanel/SplitPanelOutputSAT'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import axios from 'axios'

import { myFun_getYoutubeID } from '@/components/FunctionComponent'

const SHOWANDTELL = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  //get값이 넘어왔을 경우
  const { query } = useRouter()
  const mbn = query.m
  const tbn = query.tbn
  const courseName = query.cN

  const [youtubeID, setYoutubeID] = useState()
  const [homeworkID, setHomeworkID] = useState()
  const [googleDocLink, setGoogleDocLink] = useState()
  const [nameEng, setNameEng] = useState()
  const [tutorNameEng, setTutorNameEng] = useState()

  // console.log('query.mbn:', mbn)
  // console.log('query.course:', courseName)
  // console.log('query.courseName:', query.cN)

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  //無限ループしない
  const bar = {}
  const bar2 = {}
  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/'
          var Url = url + mbn
          const response = await axios.get(Url)

          //setHWbookInfo(response.data)

          //  setHWID(response.data[0].homework_id)
          //  // setUserName(response.data.name_eng)
          //  setYoyakuDate(response.data[0].yoyakuDate)
          //  setYoyakuTime(response.data[0].yoyakuTime)
          //  setTeacherName(response.data[0].teacher_name)
          //  setTbn(response.data[0].teacher_barcode_num)
          setGoogleDocLink(response.data[0].google_doc_link)
          setNameEng(response.data[0].name_eng)
          setTutorNameEng(response.data[0].teacher_name)
          setHomeworkID(response.data[0].homework_id)
        } catch (error) {
          alert(error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }, [bar2])

  if (isError) return <h1>discussion.js Error, try again showandtell!</h1>
  if (isLoading) return <h1>{youtubeID}Loading..........................</h1>

  // useEffect(() => {
  //   var url = DB_CONN_URL + '/get-member-output-homework2/'
  //   var Url = url + mbn + '&' + courseName

  //   console.log('Url:', Url)

  //   const fetchData = async () => {
  //     //alert(Url)
  //     setError(false)
  //     setLoading(true)
  //     try {
  //       const response = await axios.get(Url)
  //       //get youtubeID
  //       var splitString = myFun_getYoutubeID(
  //         response.data.response[0].youtubeURL
  //       )
  //       setYoutubeID(splitString)

  //       //(response.data.response[0].homework_id)
  //       setGoogleDocLink(response.data.response[0].google_doc_link)
  //       setNameEng(response.data.response[0].name_eng)
  //       setHomeworkID(response.data.response[0].homework_id)
  //       console.log('***youtubeID:', youtubeID)
  //       //console.log('***homeworkID:', homeworkID)
  //       console.log('***googleDocLink:', googleDocLink)
  //       console.log('***mbn:', mbn)
  //     } catch (error) {
  //       setError(true)
  //     }
  //     setLoading(false)
  //   }
  //   fetchData()
  // }, [])

  return (
    <>
      <div
        className="row pt-1 mr-0 pr-0"
        style={{
          top: '0px',
          width: '100%',
          zIndex: 1,
          backgroundColor: 'white',
          border: '1px solid #dedede',
          textAlign: 'center',
        }}
      >
        <div className="col-lg-4 col-md-12 text-left">
          <a
            className="btn btn-danger text-white ml-4 mr-2 mt-2"
            style={{ height: 35 }}
          >
            Finish This Lesson
          </a>
          <a
            className="btn btn-warning text-#2C3E50 ml-4 mr-2 mt-2"
            onClick={() => window.location.reload(false)}
            style={{ height: 35, fontWeight: '600' }}
          >
            Bring the last data
          </a>
        </div>
        <div className="col-lg-4 col-md-12 text-center pb-1">
          <h1>SHOW AND TELL</h1>
          <p>
            Tutor:&nbsp;<b>{tutorNameEng}</b>
            &nbsp;&nbsp;|&nbsp;&nbsp;Student:&nbsp;
            <b>{nameEng}</b>
          </p>
        </div>
        <div className="col-lg-4 col-md-12 text-right">
          <img
            src="/images/logo-tomei.png"
            style={{ height: '50px', width: 'auto' }}
          />
        </div>
      </div>
      <div
        className="row pt-1 mr-0 pr-0"
        style={{
          top: '0px',
          width: '100%',
          zIndex: 1,
          backgroundColor: '#ececec',
          border: '1px solid #dedede',
          textAlign: 'center',
        }}
      >
        <div className="col-lg-12 col-md-12 text-left">
          <SplitPanelOutputSAT
            mbn={mbn}
            tbn={tbn}
            homework_id={homeworkID}
            // youtubeID={youtubeID}
            name_eng={nameEng}
          />
        </div>
      </div>
    </>
  )
}
export default SHOWANDTELL
