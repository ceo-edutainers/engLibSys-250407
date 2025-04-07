import React, { useContext, useEffect } from 'react'
import { QuizContext } from './ContextsB'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const KizukiPoint = ({ kizukiTitle, kizukiDetail }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const {
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
    bookIntroAudioUrl,
    setBookIntroAudioUrl,
    bookIntro2AudioUrl,
    setBookIntro2AudioUrl,
    bookAuthorAudioUrl,
    setBookAuthorAudioUrl,
    bookAudio2Url,
    setBookAudio2Url,
    bookAudio2TitleUrl,
    setBookAudio2TitleUrl,
    bookAudio3TitleUrl,
    setBookAudio3TitleUrl,
    bookAudio3Url,
    setBookAudio3Url,
    bookAudio4TitleUrl,
    setBookAudio4TitleUrl,
    bookAudio4Url,
    setBookAudio4Url,
    bookAudio5TitleUrl,
    setBookAudio5TitleUrl,
    bookAudio5Url,
    setBookAudio5Url,
    bookAudio6TitleUrl,
    setBookAudio6TitleUrl,
    bookAudio6Url,
    setBookAudio6Url,
    bookAudio7TitleUrl,
    setBookAudio7TitleUrl,
    bookAudio7Url,
    setBookAudio7Url,
    seriesName,
    setSeriesName,
    bookStory,
    setBookStory,
    readingLevel,
    setReadingLevel,
    bookTitle,
    setBookTitle,
    storyStartPage,
    setStoryStartPage,
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
  } = useContext(QuizContext)

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <p
        style={{
          // width: '100%',
          width: '100',
          fontSize: '12px',
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: '#e6e6fa',
          marginTop: '20px',
          marginBottom: '15px',
          color: 'black',
        }}
      >
        <h5
          style={{ fontSize: '16px', fontWeight: 'bold' }}
          dangerouslySetInnerHTML={{ __html: kizukiTitle }}
        ></h5>
        <span dangerouslySetInnerHTML={{ __html: kizukiDetail }}></span>
      </p>
      {/* </MediaQuery> */}

      {/* <MediaQuery query="(max-width: 767px)">
        <div className="col-lg-12 col-md-12 mt-0 mb-3">
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
              <b dangerouslySetInnerHTML={{ __html: kizukiTitle }}></b>
              <br />
              <span dangerouslySetInnerHTML={{ __html: kizukiDetail }}></span>
            </p>
          </center>
        </div>
      </MediaQuery> */}
    </>
  )
}

export default KizukiPoint
