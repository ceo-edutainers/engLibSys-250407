/** @format */
import React, { useState, useEffect, useContext } from 'react'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { QuizContext } from '@/components/readingSelfcourse/ContextsB'

const LevelChange = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [isLevelUpChangeConfirm, setIsLevelUpChangeConfirm] = useState(false)
  const [isLevelDownChangeConfirm, setIsLevelDownChangeConfirm] =
    useState(false)
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

  /////////////////////////////////////////////////////////////////
  //Level Change
  /////////////////////////////////////////////////////////////////

  const handleLevelDownChange = (how) => {
    //練習をやめる時

    //test
    setIsLevelDownChangeConfirm(false)

    var url = DB_CONN_URL + '/ask-book-level-change'
    axios
      .post(url, {
        mbn: myMbn,
        userName: userName,
        courseName: courseName,
        seriesName: seriesName,
        readingLevel: readingLevel,
        bookTitle: bookTitle,
        bookNum: bookNum,
        storyNum: storyNum,
        storyTitle: storyTitle,
        levelChange: 'down',
        lessonOrder: lessonOrder,
      })
      .then((response) => {
        if (response.data.status) {
        } else {
          alert('sending error')
        }
      })
  }

  const handleLevelUpChange = (how) => {
    //練習をやめる時

    //test
    setIsLevelUpChangeConfirm(false)

    var url = DB_CONN_URL + '/ask-book-level-change/'
    axios
      .post(url, {
        mbn: myMbn,
        userName: userName,
        courseName: courseName,
        seriesName: seriesName,
        readingLevel: readingLevel,
        bookTitle: bookTitle,
        bookNum: bookNum,
        storyNum: storyNum,
        storyTitle: storyTitle,
        levelChange: 'up',
        lessonOrder: lessonOrder,
      })
      .then((response) => {
        if (response.data.status) {
          // setIsLevelUpChangeConfirm(false)
        } else {
          alert('sending error')
        }
      })
  }
  return (
    <>
      <div
        className="col-lg-12 col-md-12 p-3"
        style={{
          border: '1px solid white',
          borderRadius: '10px',
          backgroundColor: 'white',
        }}
      >
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <h1
              style={{ fontWeight: 'bold', fontSize: '30px', color: '#04284C' }}
            >
              レベル調整
            </h1>
            <h6
              style={{
                color: '#04284C',
                lineHeight: '1.5em',
                textAlign: 'justify',
                padding: '10px',
              }}
            >
              今のリーディング教材のレベルが合わない場合（下記目安をご参考ください）、左下のボタンをクリックして調整依頼をしてください。
              調整が確定するまで2〜3日かかる場合がありますので、イングリブから確定の連絡が来るまでの間、現在設定されているレベル内の課題で学習を続けてください。
            </h6>
          </div>
          <div className="col-lg-12 col-md-12 p-3">
            <div className="row">
              <div className="col-lg-5 col-md-12">
                <button
                  className="btn btn-primary p-3 "
                  onClick={() => {
                    setIsLevelUpChangeConfirm(true)
                  }}
                  style={{ width: 'auto', fontSize: '20px' }}
                >
                  この本は
                  <br />
                  レベルが低すぎる
                </button>
              </div>
              <div
                className="col-lg-6 col-md-12 p-2"
                style={{
                  backgroundColor: '#ececec',
                  textAlign: 'left',
                }}
              >
                <b style={{ color: '#04284C' }}>[調整目安]</b>
                <br />
                <p
                  style={{
                    fontSize: '14px',
                  }}
                >
                  ●&nbsp;一つのストーリー（課題）で初めて読む際に知らない単語が５個未満の場合
                  <br />
                  ●&nbsp;最初からスラスラと読むことができ、読みながら意味がすぐにわかる場合
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 mt-3 p-3">
            <div className="row">
              <div className="col-lg-5 col-md-12  ">
                <button
                  className="btn btn-danger p-3 "
                  onClick={() => {
                    setIsLevelDownChangeConfirm(true)
                  }}
                  style={{ width: 'auto', fontSize: '20px' }}
                >
                  この本は
                  <br />
                  レベルが高すぎる
                </button>
              </div>
              <div
                className="col-lg-6 col-md-12 p-2"
                style={{
                  backgroundColor: '#ececec',
                  textAlign: 'left',
                }}
              >
                <b style={{ color: '#04284C' }}>[調整目安]</b>
                <br />
                <p
                  style={{
                    fontSize: '14px',
                  }}
                >
                  ●&nbsp;一つのストーリー（課題）で初めて読む際に知らない単語が約20個以上の場合
                  <br />
                  ●&nbsp;単語の意味を調べても文章自体を理解するのが非常に困難な場合
                </p>
                <p>
                  ＊上記に該当しない場合は、現在適切なリーディングレベルで課題を進めています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SweetAlert
        title="レベルダウン調整依頼を送信しますか？"
        show={isLevelDownChangeConfirm}
        onConfirm={() => handleLevelDownChange()}
        onCancel={() => {
          setIsLevelDownChangeConfirm(false)
        }}
        confirmBtnText="YES"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          レベル調整査定が終わるまで2~3日かかる場合があります。しばらくお待ちください。
        </p>
      </SweetAlert>

      <SweetAlert
        title="レベルアップ調整依頼を送信しますか？"
        show={isLevelUpChangeConfirm}
        onConfirm={() => handleLevelUpChange()}
        onCancel={() => {
          setIsLevelUpChangeConfirm(false)
        }}
        confirmBtnText="YES"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          レベル調整査定が終わるまで2~3日かかる場合があります。しばらくお待ちください。
        </p>
      </SweetAlert>
    </>
  )
}

export default LevelChange
