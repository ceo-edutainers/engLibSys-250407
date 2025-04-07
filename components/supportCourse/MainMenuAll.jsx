/** @format */
import react, { useContext, useState, useEffect, useRef } from 'react'
import { QuizContext } from '@/components/supportCourse/ContextsB'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
// import BookContents from '@/components/supportCourse/BookContents'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Upload from '@/components/supportCourse/uploadBookQuestion'
import UploadSchoolPrint from '@/components/supportCourse/uploadSchoolPrint'

import QrcodeGenerator from '@/components/supportCourse/QrcodeGenerator'
//import { Questions } from '../../pages/quizhelper/Questions'
import ViewBookQuestionFile from '@/components/supportCourse/viewBookQuestionFileB'
import ViewBookSchoolPrintFile from '@/components/supportCourse/viewBookSchoolPrintFile'

function MainMenuB() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [englibLevelAllInfo, setEnglibLevelAllInfo] = useState([])

  const {
    storyEndNum,
    setStoryEndNum,
    bookSeries,
    setBookSeries,
    UrlContents1,
    setUrlContents1,
    UrlContents2,
    setUrlContents2,
    hw_page_start,
    setHwPageStart,
    hw_page_end,
    setHwPageEnd,
    HWbookInfo,
    setHWbookInfo,
    audioDurtaionFromDB,
    setAudioDurtaionFromDB,
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
    thisSubject,
    englibLevelColor,
    setEnglibLevelColor,
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
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
    storyTitle,
    setStoryTitle,
    storyStartPage,
    setStoryStartPage,
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

  const [value, setValue] = useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [clearBtn, setClearBtn] = useState('')
  const inputRef = useRef()
  const handleClear = () => {
    setSearchTermWeekday('')
    setSearchTermName('')
    setClearBtn('clear')
    inputRef.current.value = ''
  }

  return (
    <>
      {/* <h1>
        {readingLevel}/{bookNum}/{answerFile}
      </h1> */}
      <div
        className="MenuBig p-3"
        style={{
          // backgroundColor: englibLevelColor,
          color: 'white',
          height: 'auto',
          border: '10px solid #dedede',
          borderRadius: '20px',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 text-left">
              <a href="/mytopGroup">
                <button
                  className="btn btn-info mt-2 mb-2"
                  style={{
                    fontWeight: '900',
                    color: 'white',
                    marginTop: '10px',
                  }}
                >
                  トップページへ戻る
                </button>
              </a>
            </div>
            <div className="col-lg-12 col-md-12 mt-5  ">
              <h1 className="mb-1" style={{ fontWeight: '900' }}>
                {seriesName}
              </h1>
              <p style={{ color: 'black', fontSize: '20px' }}>{userName}</p>
              {courseName != 'CourseZ' &&
                courseName != 'CourseZN' &&
                courseName != 'CourseZ_SC' && (
                  <h2
                    className="mb-1"
                    style={{ color: 'black', fontWeight: '900' }}
                  >
                    {readingLevel}
                  </h2>
                )}
              <br />
              <img
                src={bookCoverImgUrl}
                className="mr-2 mb-3"
                style={{
                  border: '4px solid #dedede',
                  width: '150px',
                  height: '200px',
                }}
              />
              <hr />

              <h5 style={{ fontWeight: 'bold' }}> 今回の課題</h5>
              <h4 style={{ fontWeight: 'bold', color: 'red' }}>
                {storyNum}&nbsp;〜&nbsp;{storyEndNum}まで
              </h4>

              {/* <div
                style={{
                  border: '5px solid #dedede',
                  borderRadius: '10px',
                  padding: 10,
                }}
              >
                <h5>
                  <ruby>
                    課題<rt>かだい</rt>
                  </ruby>
                  のやり
                  <ruby>
                    方<rt>かた</rt>(サンプル)
                  </ruby>
                </h5>
                <table className="table">
                  <tbody>
                    <tr>
                      <td scope="col" style={{ width: '50%' }}>
                        <img
                          src={UrlContents1}
                          className="mr-2 mb-3"
                          style={{
                            border: '2px solid black',
                            width: '150px',
                            height: '200px',
                          }}
                        />
                      </td>
                      <td scope="col" style={{ width: '50%' }}>
                        <span>
                          <strong>文法の説明ページ</strong>
                          <br />
                          説明の部分をよく読んで理解します。
                          レッスンの最初に生徒さんが先生に説明することが決まりですので、自分が先生になったつもりで説明できるように繰り返し練習をします。わからないところはレッスン時に先生に質問します。
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">
                        {' '}
                        <img
                          src={UrlContents2}
                          className="mr-2 mb-3"
                          style={{
                            border: '2px solid black',
                            width: '150px',
                            height: '200px',
                          }}
                        />
                      </th>
                      <td>
                        <span>
                          <strong>問題ページ</strong>
                          <br />
                          問題を解いて、間違った部分は赤ペンでマークをして直します。写真を撮ってファイルををアップロードします。
                          <br />
                          課題をアップロードすることでポイントをゲットできます。
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr /> */}
              <Box
                sx={{ width: '100%', typography: 'body1', textAlign: 'center' }}
              >
                <TabContext value={value}>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                      textAlign: 'center',
                    }}
                  >
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        label="今回の課題のアップロード"
                        value="1"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '18px',
                          color: 'gray',
                        }}
                      />
                      {/* <Tab
                        label="学校プリントのアップロード"
                        value="2"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '18px',
                          color: 'gray',
                        }}
                      /> */}
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div className="row">
                      <div
                        className="col-lg-12 col-md-12 p-3"
                        style={{
                          border: '5px solid #5719E5',
                          borderRadius: '10px',
                          color: '#2C3E50',
                          textAlign: 'left',
                        }}
                      >
                        <center>
                          <h1
                            style={{
                              color: '#5719E5',
                              fontSize: '30px',
                              fontWeight: 'bold',
                              marginBottom: 0,
                            }}
                          >
                            今週の課題のアップロード
                          </h1>
                          <p
                            style={{
                              border: '0.1em solid #b0c4de',
                              borderRadius: '10px',
                              padding: '10px',
                            }}
                          >
                            {/* {qrLinkBookQuestion} */}

                            <QrcodeGenerator
                              url={qrLinkBookQuestion}
                              title="課題アップロード"
                            />
                            <p style={{ color: 'blue', fontSize: '15px' }}>
                              スマートフォン用の課題アップロードページ
                              <br />
                              (QRコードをスマートフォンにかざしてください)
                            </p>
                          </p>
                          <p style={{ color: 'red', fontSize: '12px' }}>
                            1枚アップロードで5Pointゲットできますので、
                            課題提出をお勧めします。
                          </p>
                        </center>

                        <Upload
                          // mbn={myMbn}
                          // homework_id={HWID}
                          currentStep="MainMenuAll"
                          stepStatus="ThisWeekHW"
                          pointKeyNum="RR-4"
                          homework_id={HWID}

                          // practiceTempId={practiceTempId}
                          // thisSubject={thisSubject}
                        />
                        <ViewBookQuestionFile
                          currentStep="MainMenuAll"
                          stepStatus="ThisWeekHW"
                        />
                      </div>
                    </div>
                  </TabPanel>
                  {/* <TabPanel value="2">
                    <div className="row">
                      <div
                        className="col-lg-12 col-md-12 p-3"
                        style={{
                          border: '5px solid #AD850D',
                          borderRadius: '10px',
                          color: '#2C3E50',
                          textAlign: 'center',
                        }}
                      >
                        <center>
                          <h1
                            style={{
                              color: '#AD850D',
                              fontSize: '30px',
                              fontWeight: 'bold',
                              marginBottom: 0,
                            }}
                          >
                            学校プリントのアップロード
                          </h1>
                          <p
                            style={{
                              border: '0.1em solid #b0c4de',
                              borderRadius: '10px',
                              padding: '10px',
                            }}
                          >
                            <QrcodeGenerator
                              url={qrLinkOtherHW}
                              title="課題アップロード"
                            />
                            <p style={{ color: 'blue', fontSize: '15px' }}>
                              スマホ用の課題アップロードのためのQRコードです。
                              <br />
                              (QRコードをスマホで読み込んでください。)
                            </p>
                          </p>
                          <p style={{ color: 'red', fontSize: '12px' }}></p>
                        </center>
                        学校で配られた英語関連のプリントは全て(答えを含む)こちらの方にアップロードします。前にアップロードしたプリントがあっても、削除せず追加でアップロードします。
                        テストプリントは間違った部分を赤ペンでマークをしてアップロードしてください。
                        <UploadSchoolPrint
                          currentStep="MainMenuAll"
                          stepStatus="School Print"
                          pointKeyNum="no point"
                          homework_id={HWID}
                        />
                        <ViewBookSchoolPrintFile
                          currentStep="MainMenuAll"
                          stepStatus="School Print"
                        />
                      </div>
                    </div>
                  </TabPanel> */}
                </TabContext>
              </Box>

              {/* <button
                className="startBtnBig mt-5"
                onClick={() => {
                  nextStepCheck('Step1B')
                }}
              >
                Start Reading
              </button> */}
              <a href="/mytopGroup">
                <button
                  className="btn btn-info mt-2 mb-5"
                  style={{
                    fontWeight: '900',
                    color: 'white',
                    marginTop: '10px',
                  }}
                >
                  トップページへ戻る
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <CopyrightFooter />
    </>
  )
}

export default MainMenuB
