import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from './Contexts'
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
  faMousePointer,
  faHandPointer,
} from '@fortawesome/free-solid-svg-icons'
const StepImportantWordsSHstep4 = ({ stepWords1, stepWords2, stepWords3 }) => {
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    thisSubject,
    setThisSubject,
    leastRecordCount_ondoku,
    setLeastRecordCount_ondoku,
    leastRecordCount_shadowing,
    setLeastRecordCount_shadowing,
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

  const [stepWords1View, setStepWords1View] = useState(false)
  return (
    <>
      <center>
        <div className="col-lg-12 col-md-12">
          <Floater
            content={
              <div
                style={{
                  textAlign: 'left',
                  lineHeight: '1.8em',
                  fontSize: '17px',
                }}
              >
                ① 録音ボタン を押して、音声を聴きながらシャドーイングを録音する
                <br />② 録音した音声を聴いてみる
                <br />③ このステップは、自信がつくまで何度も繰り返し練習する
              </div>
            }
            footer=""
            offset={0}
            event="click"
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
                  fontSize: '17px',
                  color: 'white',
                }}
              >
                このステップでは。。
                <br />
                ① まずは、音について行くように何度も繰り返し練習する。
                <br />② 意味までわかるようになることを目指す。
              </div>
            }
            footer=""
            offset={0}
            event="click"
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
                何度も繰り返し同じ音源でシャドーイング練習をすることで、聴き取れなかった単語も段々と聴き取れるようになります。また、音源のマネを続けることで、発音やイントネーションが改善します{' '}
              </div>
            }
            footer=""
            offset={0}
            event="click"
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

export default StepImportantWordsSHstep4
