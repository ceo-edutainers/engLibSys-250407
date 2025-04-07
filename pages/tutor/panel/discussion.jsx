import React, { useState, useEffect } from 'react'
import SplitPanelOutput from '@/components/Splitpanel/SplitPanelOutput'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'

const Discussion = () => {
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
  const [classLink, setClassLink] = useState()

  console.log('query.mbn:', mbn)
  console.log('query.course:', courseName)
  console.log('query.courseName:', query.cN)

  //無限ループしない
  const bar = {}
  const bar2 = {}
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('T_loginStatus') == 'true') {
      localStorage.setItem('mbn', query.m)
      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-discussion-info-first-page/'
          var Url = url + mbn
          const response = await axios.get(Url)

          var splitString = myFun_getYoutubeID(response.data[0].youtubeURL)
          setYoutubeID(splitString)

          setGoogleDocLink(response.data[0].google_doc_link)
          setNameEng(response.data[0].name_eng)
          setTutorNameEng(response.data[0].teacher_name)
          setHomeworkID(response.data[0].homework_id)
          setClassLink(response.data[0].classLink)
          // console.log('***youtubeID:', youtubeID)
          // console.log('***googleDocLink:', googleDocLink)
          // console.log('***mbn:', mbn)
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

  return (
    <>
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
          <Link href="/tutor/tutor-temporary-page">
            <a
              className="btn btn-danger text-white ml-4 mr-2 mt-2"
              style={{ height: 35 }}
            >
              Back to home
            </a>
          </Link>
          <a
            className="btn btn-danger text-white ml-4 mr-2 mt-2"
            style={{ height: 35 }}
          >
            Finish This Lesson
          </a>
          <SplitPanelOutput
            mbn={mbn}
            tbn={tbn}
            homework_id={homeworkID}
            youtubeID={youtubeID}
            name_eng={nameEng}
            google_doc_link={googleDocLink}
          />
        </div>
      </div>
    </>
  )
}
export default Discussion
