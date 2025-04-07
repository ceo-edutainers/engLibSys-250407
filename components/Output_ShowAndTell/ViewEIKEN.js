import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import ReactAudioPlayer from 'react-audio-player'
// const [homework_id, sethomework_id] = useState()
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import WordListReadingBookAForTutor from '@/components/readingSelfcourse/WordListReadingBookAForTutor' //単語リスト
import { MdBlender } from 'react-icons/md'

const ViewEiken = ({
  courseName,
  mbn,
  tbn,
  homework_id,
  subject,
  bookTitle,
  bookNum,
  storyNum,
  listOrder,
  readingLevel,
}) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [bookUrl, setBookUrl] = useState()

  const [viewQuestion, setViewQuestion] = useState(false)
  const [viewWord, setViewWord] = useState(true)

  const [tutorQuestion, setTutorQuestion] = useState([])

  const [bookCoverImgUrl, setBookCoverImgUrl] = useState('')
  const [bookImgUrl, setBookImgUrl] = useState('')
  const [bookIntroAudioUrl, setBookIntroAudioUrl] = useState('') //for Blackcat Seriese  //Introduction
  const [bookIntro2AudioUrl, setBookIntro2AudioUrl] = useState('') //for Blackcat Seriese //Introduction2
  const [bookAuthorAudioUrl, setBookAuthorAudioUrl] = useState('') //for Blackcat Seriese //Author
  const [bookAudioUrl, setBookAudioUrl] = useState('') //for All Reading Materials : Main Story Audio

  const [bookAudio2Url, setBookAudio2Url] = useState('') //for Blackcat Seriese
  const [bookAudio2TitleUrl, setBookAudio2TitleUrl] = useState('') //for Blackcat Seriese
  const [bookAudio3TitleUrl, setBookAudio3TitleUrl] = useState('') //for Blackcat Seriese
  const [bookAudio3Url, setBookAudio3Url] = useState('') //for Blackcat Seriese
  const [bookAudio4TitleUrl, setBookAudio4TitleUrl] = useState('') //for Blackcat Seriese
  const [bookAudio4Url, setBookAudio4Url] = useState('') //for Blackcat Seriese
  const [bookAudio5TitleUrl, setBookAudio5TitleUrl] = useState('') //for Blackcat Seriese
  const [bookAudio5Url, setBookAudio5Url] = useState('') //for Blackcat Seriese
  const [bookAudio6TitleUrl, setBookAudio6TitleUrl] = useState('') //for Blackcat Seriese
  const [bookAudio6Url, setBookAudio6Url] = useState('') //for Blackcat Seriese
  const [bookAudio7TitleUrl, setBookAudio7TitleUrl] = useState('') //for Blackcat Seriese
  const [bookAudio7Url, setBookAudio7Url] = useState('') //for Blackcat Seriese

  const [levelOrder, setLevelOrder] = useState('')
  // const [readingLevel, setReadingLevel] = useState('')
  // const [bookNum, setBookNum] = useState()
  // const [storyNum, setStoryNum] = useState('')
  // const [bookTitle, setBookTitle] = useState('')
  // const [listOrder, setListOrder] = useState('')
  const [bookLevel, setBookLevel] = useState('')
  const [bookStory, setBookStory] = useState('')
  const [storyTitle, setStoryTitle] = useState('')
  const [seriesName, setSeriesName] = useState('')
  const [storyStartPage, setStoryStartPage] = useState('')
  const [answerFile, setAnswerFile] = useState('')

  if (readingLevel == 'Eiken5') {
    var fsl =
      'https://www.myenglib.com/onlesson/pdfviewergrammar.php?sort=eiken&level=5&file=https://www.myenglib/materials/eiken/Eiken5/Eiken5.pdf'
  } else if (readingLevel == 'Eiken4') {
    var fsl =
      'https://www.myenglib.com/onlesson/pdfviewergrammar.php?sort=eiken&level=4&file=https://www.myenglib/materials/eiken/Eiken4/Eiken4.pdf'
  } else if (readingLevel == 'Eiken3') {
    var fsl =
      'https://www.myenglib.com/onlesson/pdfviewergrammar.php?sort=eiken&level=3&file=https://www.myenglib/materials/eiken/Eiken3/Eiken3.pdf'
  } else if (readingLevel == 'EikenPre2') {
    var fsl =
      'https://www.myenglib.com/onlesson/pdfviewergrammar.php?sort=eiken&level=pre2&file=https://www.myenglib/materials/eiken/EikenPre2/EikenPre2.pdf'
  } else if (readingLevel == 'Eiken2') {
    var fsl =
      'https://www.myenglib.com/onlesson/pdfviewergrammar.php?sort=eiken&level=2&file=https://www.myenglib/materials/eiken/Eiken2/Eiken2.pdf'
  } else if (readingLevel == 'EikenPre1') {
    var fsl =
      'https://www.myenglib.com/onlesson/pdfviewergrammar.php?sort=eiken&level=pre1&file=https://www.myenglib/materials/eiken/EikenPre1/EikenPre1.pdf'
  } else if (readingLevel == 'Eiken1') {
    var fsl =
      'https://www.myenglib.com/onlesson/pdfviewergrammar.php?sort=eiken&level=1&file=https://www.myenglib/materials/eiken/Eiken1/Eiken1.pdf'
  }
  //

  // useEffect(() => {
  //   GrammarInfo()
  // }, [])

  // function GrammarInfo() {
  //   const fetchData2 = async () => {
  //     try {
  //       var bL = readingLevel
  //       alert(bL)
  //       if (bL == 'Grade1') {
  //         var fsl =
  //           'https://www.myenglib.com/onlesson/pdfviewergrammar.php?sort=mgrammar&grade=1&file=materials/grammar/Gakuen%20Middle%20School%20English%20Grade1/MiddleSchoolGrammar_Grade1.pdf'
  //       } else if (bL == 'Grade2') {
  //         var fsl =
  //           'https://www.myenglib.com/onlesson/pdfviewergrammar.php?sort=mgrammar&grade=2&file=materials/grammar/Gakuen%20Middle%20School%20English%20Grade2/MiddleSchoolGrammar_Grade2.pdf'
  //       } else if (bL == 'Grade3') {
  //         var fsl =
  //           'https://www.myenglib.com/onlesson/pdfviewergrammar.php?sort=mgrammar&grade=3&file=materials/grammar/Gakuen%20Middle%20School%20English%20Grade3/MiddleSchoolGrammar_Grade3.pdf'
  //       }
  //       // alert(fsl)
  //       setBookUrl(fsl)
  //     } catch (error) {
  //       // alert('error1' + error)
  //       console.log(error)
  //     }
  //   }

  //   fetchData2()
  // }
  // function GrammarInfo() {
  //   const fetchData2 = async () => {
  //     try {
  //       alert('subject' + subject)
  //       var url = DB_CONN_URL + '/get-hw-and-Per-Subject-info/'
  //       var Url = url + mbn + '&' + subject + '&' + courseName

  //       axios.get(Url).then((response) => {
  //         alert(response.data.status)
  //         alert(response.data.message)
  //         // alert(response.data.mbn)
  //         // alert(response.data.subject)
  //         // alert(response.data.courseName)
  //         setBookTitle(response.data[0].book)

  //         setBookNum(response.data[0].unit)
  //         setStoryNum(response.data[0].unitDetail)

  //         setStoryTitle(response.data[0].grammarTitle)

  //         setListOrder(response.data[0].listOrder)

  //         setBookLevel(response.data[0].grammarLevel)

  //         var bL = response.data[0].grammarLevel
  //         alert(bL)
  //         if (bL == 'Grade1') {
  //           var fsl =
  //             'myenglib.com/onlesson/pdfviewergrammar.php?sort=mgrammar&grade=1&file=materials/grammar/Gakuen%20Middle%20School%20English%20Grade1/MiddleSchoolGrammar_Grade1.pdf'
  //         } else if (bL == 'Grade2') {
  //           var fsl =
  //             'myenglib.com/onlesson/pdfviewergrammar.php?sort=mgrammar&grade=2&file=materials/grammar/Gakuen%20Middle%20School%20English%20Grade2/MiddleSchoolGrammar_Grade2.pdf'
  //         } else if (bL == 'Grade3') {
  //           var fsl =
  //             'myenglib.com/onlesson/pdfviewergrammar.php?sort=mgrammar&grade=3&file=materials/grammar/Gakuen%20Middle%20School%20English%20Grade3/MiddleSchoolGrammar_Grade3.pdf'
  //         }

  //         setBookUrl(fsl)
  //       })
  //     } catch (error) {
  //       // alert('error1' + error)
  //       console.log(error)
  //     }
  //   }

  //   fetchData2()
  // }

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <center>
        <div className="row pt-4" style={{ backgroundColor: 'white' }}>
          <div className="col-lg-12 col-md-12">
            <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>
              [{readingLevel}]&nbsp;{bookTitle}
              <br />
              {bookNum}/{storyNum}
            </h1>
          </div>
          <div
            className="col-lg-12 col-md-12 p-0 pl-3 m-0"
            style0={{
              width: '100%',
              padding: 0,
            }}
          >
            {/* {fsl} */}
            {fsl && (
              <object
                // data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage1plus&file=myenglib/materials/reading/ORT/Stage1plus/book/At_the_Park.pdf"
                data={fsl}
                style={{
                  width: '100%',
                  height: '820px',
                  border: '1px solid white',
                  borderRadius: '20px',
                  backgroundColor: 'white',
                  margin: 0,
                  padding: 0,
                }}
              />
            )}
          </div>

          {/* <div
            className="col-lg-2 col-md-12 mt-2"
            style={{ textAlign: 'center' }}
          >
            <div className="row">
              <div
                className="col-lg-6 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <span
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setViewQuestion(true)
                    setViewWord(false)
                  }}
                >
                  Question
                </span>
              </div>
              <div
                className="col-lg-6 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <span
                  className="btn btn-info"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setViewWord(true)
                    setViewQuestion(false)
                  }}
                >
                  Words
                </span>
              </div>
            </div>

            <div
              style={{ width: '100%', display: viewWord ? 'block' : 'none' }}
            >
              {(courseName == 'CourseA' || courseName == 'CourseAN') && (
                <WordListReadingBookAForTutor
                  mbn={mbn}
                  tbn={tbn}
                  homework_id={homework_id}
                  bookStory={bookStory}
                  seriesName={seriesName}
                  readingLevel={readingLevel}
                  bookNum={bookNum}
                  storyNum={storyNum}
                />
              )}
            </div>
            <div
              style={{
                width: '100%',
                height: '750px',
                textAlign: 'left',
                overflow: 'scroll',
                display: viewQuestion ? 'block' : 'none',
              }}
            >
              {tutorQuestion?.map((val, key) => {
                var qnum = key + 1
                return (
                  <>
                    <p style={{ color: 'black' }}>
                      {qnum}.{val.question}
                    </p>
                  </>
                )
              })}
            </div>
          </div> */}
        </div>
      </center>
    </>
  )
}

export default ViewEiken
