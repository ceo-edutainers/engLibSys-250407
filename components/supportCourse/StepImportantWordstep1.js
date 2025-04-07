import React, { useContext, useEffect } from 'react'
import { QuizContext } from './Contexts'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import Floater from 'react-floater'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faTrash,
  faPlay,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'
const StepImportantWordstep1 = ({ stepWords1, stepWords2, stepWords3 }) => {
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
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
      <center>
        <div className="col-lg-12 col-md-12">
          <Floater
            content={
              <div style={{ textAlign: 'left', lineHeight: '1.8em' }}>
                ①テキストとヘッドセットを用意します。
                <br />
                ②録音ボタン{' '}
                <FontAwesomeIcon
                  icon={faMicrophone}
                  size="1x"
                  color="red"
                  spin
                />
                を押して、『テキストを見ながら』音読する（音源なし）。
                <br />③ 音読が終わったらストップボタンを押す。
                <br />④ 録音した自分の声を一度聞いてみる。
                <br />⑤ 知らない単語があったら画面の左下のボタンから登録する。
                <br /> ⑥ 全て終わったら次のステップへ。
              </div>
            }
            footer=""
            offset={0}
            event="hover"
            placement="left-end"
            styles={{
              floater: {
                filter: 'none',
              },
              container: {
                backgroundColor: '#36454F',
                borderRadius: 5,
                color: '#fff',
                filter: 'none',
                minHeight: 'none',
                maxWidth: 400,
                padding: 10,
                textAlign: 'center',
              },
              arrow: {
                color: '#000',
                length: 8,
                spread: 10,
              },
            }}
            title={
              <>
                <h3
                  style={{
                    margin: '0 0 5px',
                    lineHeight: 1,
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  このステップの練習の順番{' '}
                  <span aria-label="Smile with Sunglasses" role="img">
                    😎
                  </span>{' '}
                  <hr style={{ border: '0.000000001em solid white' }} />
                </h3>
              </>
            }
          >
            <img src="/images/animated-icons/arrow-down.gif" width="50px" />
            <p
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '100%',
                backgroundColor: '#cc0000',
                marginRight: '5px',
                marginTop: '0px',
                marginBottom: '5px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: '10px 0px 10px 10px',
              }}
              dangerouslySetInnerHTML={{ __html: stepWords1 }}
            >
              {/* <FontAwesomeIcon icon={faHandPointer} size="1x" color="white" />
              &nbsp; */}
            </p>
          </Floater>

          <Floater
            content={
              <div
                style={{
                  textAlign: 'left',
                  lineHeight: '1.8em',
                  color: 'white',
                  fontSize: '18px',
                }}
              >
                ① 大きい声を出す。
                <br />
                ② 英語らしい発音を心がける。
                <br />③ 意味を考えながら。
              </div>
            }
            footer=""
            offset={0}
            event="hover"
            placement="left-end"
            styles={{
              floater: {
                filter: 'none',
              },
              container: {
                backgroundColor: '#F94545',
                borderRadius: 5,
                color: 'black',
                filter: 'none',
                minHeight: 'none',
                maxWidth: 400,
                padding: 10,
                textAlign: 'right',
              },
              arrow: {
                color: '#000',
                length: 8,
                spread: 10,
              },
            }}
            title={
              <>
                <h3
                  style={{
                    margin: '0 0 5px',
                    lineHeight: 1,
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#000',
                  }}
                >
                  気をつけよう{' '}
                  <span aria-label="Smile with Sunglasses" role="img">
                    😎
                  </span>{' '}
                  <hr style={{ border: '0.000000001em solid white' }} />
                </h3>
              </>
            }
          >
            <p
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '100%',
                backgroundColor: '#cc0000',
                marginRight: '5px',
                marginTop: '5px',
                marginBottom: '5px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: '10px 0px 10px 10px',
              }}
              dangerouslySetInnerHTML={{ __html: stepWords2 }}
            >
              {/* <FontAwesomeIcon icon={faHandPointer} size="1x" color="white" />
              &nbsp; */}
            </p>
          </Floater>
          <Floater
            content={
              <div
                style={{
                  textAlign: 'center',
                  lineHeight: '1.5em',
                  fontSize: '17px',
                }}
              >
                テキストの音源を聴いていない段階で自分の音読の音声を録音して聴いてみることで、自分ができない部分(発音、意味、すらすら読めてるかなど)を気づくことができます。そして、この音声を練習最後の日の録音音声と比較することで、成長を感じることができます。
              </div>
            }
            footer=""
            offset={0}
            event="hover"
            placement="left-end"
            styles={{
              floater: {
                filter: 'none',
              },
              container: {
                backgroundColor: '#463BF7',
                borderRadius: 5,
                color: '#fff',
                filter: 'none',
                minHeight: 'none',
                maxWidth: 400,
                padding: 10,
                textAlign: 'right',
              },
              arrow: {
                color: '#000',
                length: 8,
                spread: 10,
              },
            }}
            title={
              <>
                <h3
                  style={{
                    margin: '0 0 5px',
                    lineHeight: 1,
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  気づきポイント{' '}
                  <span aria-label="Smile with Sunglasses" role="img">
                    😎
                  </span>{' '}
                  <hr style={{ border: '0.000000001em solid white' }} />
                </h3>
              </>
            }
          >
            <p
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '100%',
                backgroundColor: '#cc0000',
                marginRight: '5px',
                marginTop: '5px',
                marginBottom: '5px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: '10px 0px 10px 10px',
              }}
              dangerouslySetInnerHTML={{ __html: stepWords3 }}
            >
              {/* <FontAwesomeIcon icon={faHandPointer} size="1x" color="white" />
              &nbsp; */}
            </p>
          </Floater>
        </div>
      </center>
    </>
  )
}

export default StepImportantWordstep1
