import React, { useContext, useEffect } from 'react'
// import { QuizContext } from './Contexts'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const StepGoal = ({ leastRecordCount, pageView }) => {
  // const {
  //   myMbn,
  //   setMyMbn,
  //   HWID,
  //   setHWID,
  //  lessonOrder,
  //   setLessonOrder,
  //   thisSubject,
  //   setThisSubject,
  //   leastRecordCount_ondoku,
  //   setLeastRecordCount_ondoku,
  //   leastRecordCount_shadowing,
  //   setLeastRecordCount_shadowing,
  //   bookCoverImgUrl,
  //   setBookCoverImgUrl,
  //   bookImgUrl,
  //   setBookImgUrl,
  //   bookAudioUrl,
  //   setBookAudioUrl,
  //   bookIntroAudioUrl,
  //   setBookIntroAudioUrl,
  //   bookIntro2AudioUrl,
  //   setBookIntro2AudioUrl,
  //   bookAuthorAudioUrl,
  //   setBookAuthorAudioUrl,
  //   bookAudio2Url,
  //   setBookAudio2Url,
  //   bookAudio2TitleUrl,
  //   setBookAudio2TitleUrl,
  //   bookAudio3TitleUrl,
  //   setBookAudio3TitleUrl,
  //   bookAudio3Url,
  //   setBookAudio3Url,
  //   bookAudio4TitleUrl,
  //   setBookAudio4TitleUrl,
  //   bookAudio4Url,
  //   setBookAudio4Url,
  //   bookAudio5TitleUrl,
  //   setBookAudio5TitleUrl,
  //   bookAudio5Url,
  //   setBookAudio5Url,
  //   bookAudio6TitleUrl,
  //   setBookAudio6TitleUrl,
  //   bookAudio6Url,
  //   setBookAudio6Url,
  //   bookAudio7TitleUrl,
  //   setBookAudio7TitleUrl,
  //   bookAudio7Url,
  //   setBookAudio7Url,
  //   seriesName,
  //   setSeriesName,
  //   bookStory,
  //   setBookStory,
  //   readingLevel,
  //   setReadingLevel,
  //   bookTitle,
  //   setBookTitle,
  //   storyStartPage,
  //   setStoryStartPage,
  //   bookNum,
  //   setBookNum,
  //   storyNum,
  //   setStoryNum,
  //   storyTitle,
  //   setStoryTitle,
  //   practiceTempId,
  //   setPracticeTempId,
  //   audioOnOff,
  //   setAudioOnOff,
  //   course,
  //   setCourse,
  //   courseName,
  //   setCourseName,
  //   pageView,
  //   setPageView,
  //   courseLevel,
  //   setCourseLevel,
  //   textbook,
  //   setTextbook,
  //   eikenLevel,
  //   setEikenLevel,
  //   userName,
  //   setUserName,
  //   point,
  //   setPoint,
  //   totalQuestion,
  //   setTotalQuestion,
  // } = useContext(QuizContext)

  return (
    <>
      <div
        className="banner-content pt-2 "
        style={{
          backgroundColor: '#cc0000',
          borderRadius: '10px',
          paddingBottom: '1px',
        }}
      >
        <h6 style={{ color: 'white', paddingBottom: 0, marginBottom: 0 }}>
          次のステップまで
        </h6>
        <h4
          style={{
            color: 'white',
            fontWeight: '600',
            paddingTop: 0,
            marginTop: 0,
            paddingBottom: 0,
            marginBottom: 0,
          }}
        >
          {pageView}
          {pageView == 'Step1' && '初回'}
          <span
            style={{ color: 'yellow', fontWeight: '900', fontSize: '40px' }}
          >
            {leastRecordCount}
          </span>
          {pageView == 'Step1' ? '回のみ録音' : '回以上録音'}
        </h4>
      </div>
      {pageView != 'Step1' && (
        <p style={{ fontSize: '10px', color: 'black' }}>
          どんどんやってポイントをゲットしよう
        </p>
      )}
    </>
  )
}

export default StepGoal
