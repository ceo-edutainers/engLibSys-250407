import React, { useContext, useEffect, useState, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'
import { QuizContext } from '@/components/readingSelfcourse/ContextsB'

const App = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [bookContents, setBookContents] = useState([])
  const [viewContents, setViewContents] = useState(false)

  function getContents(rl, bn) {
    // alert(readingLevel)
    var rl = readingLevel
    var bn = bookNum
    var url = DB_CONN_URL + '/get-black-contents/'
    var Url = url + rl + '&' + bn

    const fetchData1 = async () => {
      try {
        axios.get(Url).then((response) => {
          setBookContents(response.data.response)

          //console.log('bookContents', bookContents)
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData1()
  }
  const {
    qrLinkOtherHW,
    setQrLinkOtherHW,
    qrLinkBookQuestion,
    setQrLinkBookQuestion,
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
    englibLevel,
    setEnglibLevel,
    englibLevelColor,
    setEnglibLevelColor,
    thisSubject,
    setThisSubject,
    leastRecordCount_step2,
    setLeastRecordCount_step2,
    leastRecordCount_step3,
    setLeastRecordCount_step3,
    bookCoverImgUrl,
    setBookCoverImgUrl,
    bookImgUrl,
    setBookImgUrl,
    bookAudioUrl,
    setBookAudioUrl,
    seriesName,
    setSeriesName,
    bookStory,
    setBookStory,
    levelOrder,
    setLevelOrder,
    readingLevel,
    setReadingLevel,
    bookTitle,
    setBookTitle,
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
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
    textbook,
    setTextbook,
    eikenLevel,
    setEikenLevel,
    userName,
    setUserName,
    point,
    setPoint,
    totalQuestion,
    setTotalQuestion,
    answerFile,
    setAnswerFile,
  } = useContext(QuizContext)

  return (
    <>
      <div
        className="m-3 p-3"
        style={{
          border: '1px solid #dedede',
          borderRadius: '15px',
          textAlign: 'center',
          backgroundColor: '#fcedec',
        }}
      >
        <p
          style={{
            fontSize: '20px',
            cursor: 'pointer',
            paddingTop: '10px',
          }}
          onClick={() => {
            setViewContents(!viewContents)
            getContents()
          }}
        >
          <b>この本の課題の順番を{viewContents ? '隠す' : '確認する'}</b>
        </p>
        <span
          style={{
            display: viewContents ? 'block' : 'none',
            textAlign: 'center',
            color: 'black',
          }}
        >
          {bookContents.map((val, key) => {
            return (
              <>
                {val.storyNum == storyNum ? (
                  <p style={{ color: 'red' }}>
                    <b>
                      <b>現在&#x27A0;&nbsp;[Story{key + 1}]</b> {val.storyTitle}
                    </b>
                  </p>
                ) : val.lessonOrder == '' ? (
                  <p style={{ color: '#FB9B97' }}>
                    [課題無:個別に音読] <b>[Story{key + 1}]</b>
                    {val.storyTitle}
                  </p>
                ) : (
                  <p>
                    <b>[Story{key + 1}]</b> {val.storyTitle}
                  </p>
                )}
              </>
            )
          })}
        </span>
      </div>
    </>
  )
}

export default App
