import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import ReactAudioPlayer from 'react-audio-player'
// const [homework_id, sethomework_id] = useState()
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import WordListReadingBookAForTutor from '@/components/readingSelfcourse/WordListReadingBookAForTutor' //単語リスト
import RndBlackcatAnswer from '@/components/Output_ShowAndTell/RndBlackcatAnswer'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})
import 'react-quill/dist/quill.snow.css'

const ViewReading = ({
  course,
  courseName,
  seriesName1,
  bookNum1,
  storyNum1,
  mbn,
  tbn,
  teacher_name,
  homework_id,
  readingLevel1,
}) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [bookUrl, setBookUrl] = useState()

  //book window size change
  const [isSizeBig, setIsSizeBig] = useState(false)
  const [bookSize, setBookSize] = useState('col-lg-8 col-md-12 p-0 pl-3 m-0')
  const [rightSideSize, setRightSideSize] = useState(
    'col-lg-4 col-md-12 p-0 pl-3 m-0'
  )

  const [bookSize2, setBookSize2] = useState('col-lg-10 col-md-12 p-0 pl-3 m-0')
  const [rightSideSize2, setRightSideSize2] = useState(
    'col-lg-2 col-md-12 p-0 pl-3 m-0'
  )

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  const [dbValue, setDbValue] = useState('')

  const [viewQuestion, setViewQuestion] = useState(false)
  const [viewWord, setViewWord] = useState(true)
  const [viewEditor, setViewEditor] = useState(false)

  const [tutorQuestion, setTutorQuestion] = useState([])
  const [tutorQuestionLength, setTutorQuestionLength] = useState([])

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

  //Rnd
  const [viewRndAnswer, setViewRndAnswer] = useState(false)

  const [levelOrder, setLevelOrder] = useState('')
  const [readingLevel, setReadingLevel] = useState('')
  const [bookNum, setBookNum] = useState('')
  const [storyNum, setStoryNum] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [bookStory, setBookStory] = useState('')
  const [storyTitle, setStoryTitle] = useState('')
  const [seriesName, setSeriesName] = useState('')
  const [storyStartPage, setStoryStartPage] = useState('')

  const [storyEndPage, setStoryEndPage] = useState('')
  const [readingHWAmount, setReadingHWAmount] = useState('')
  const [oneMore, setOneMore] = useState('')
  const [whySameReadingReason, setWhySameReadingReason] = useState('')
  const [whySameReadingReasonDetail, setWhySameReadingReasonDetail] =
    useState('')
  const [answerFile, setAnswerFile] = useState('')

  const [copyHW, setCopyHW] = useState()
  const [copyHWAmount, setCopyHWAmount] = useState()

  // useEffect(() => {
  //   if (courseName.indexOf('CourseA') !== -1) {
  //     readingTriumphsInfo()
  //   } else if (courseName.indexOf('CourseB') !== -1) {
  //     // alert('B')
  //     blackcatInfo()
  //   } else if (courseName.indexOf('CourseZ') !== -1) {
  //     // alert('Z')
  //     ortInfo()
  //   }
  // }, [])
  // useEffect(() => {
  // alert(courseName)
  useEffect(() => {
    if (courseName == 'CourseA') {
      readingTriumphsInfo()
    } else if (courseName == 'CourseB') {
      // alert('B')
      blackcatInfo()
    } else if (courseName == 'CourseZ') {
      // alert('Z')
      ortInfo()
    }
  }, [mbn])

  function readingTriumphsInfo() {
    const fetchData2 = async () => {
      try {
        // alert('courseName' + courseName)

        var url = DB_CONN_URL + '/get-hw-and-Reading-Triumphs-info/'

        var Url = url + mbn
        // alert(Url)
        const response = await axios.get(Url)

        // alert('length' + response.data.length)
        // alert(response.data.message)

        setBookStory(response.data[0].story)
        setSeriesName(response.data[0].seriesName)
        setBookTitle(response.data[0].bookTitle)
        setBookNum(response.data[0].bookNum)
        setStoryNum(response.data[0].storyNum)
        setStoryTitle(response.data[0].storyTitle)
        setReadingLevel(response.data[0].readingLevel)
        // setLessonOrder(response.data[0].lessonOrder)
        // setStoryStartPage(response.data[0].storyStartPage)
        getTutorQuestionReadingTriumphs(
          response.data[0].readingLevel,
          response.data[0].storyNum
        )

        setStoryStartPage(response.data[0].hw_page_start)
        setStoryEndPage(response.data[0].hw_page_end)
        setReadingHWAmount(response.data[0].readingHWAmount)
        setOneMore(response.data[0].oneMore)

        setWhySameReadingReason(response.data[0].whySameReadingReason)
        setWhySameReadingReasonDetail(
          response.data[0].whySameReadingReasonDetail
        )

        var sN = response.data[0].storyNum
        var rL = response.data[0].readingLevel
        var bN = response.data[0].bookNum
        var pdf1 = response.data[0].pdf1

        var fsl =
          'https://myenglibold.mycafe24.com/myenglib/backup/ebook/pdfviewer.php?sort=reading_triumphs&file=' +
          pdf1 +
          '&readingLevel=' +
          rL

        setBookUrl(fsl)

        const bci =
          'Reading/ReadingTriumphs/' +
          response.data[0].readingLevel +
          '/img/' +
          response.data[0].readingLevel +
          '-Cover.png'

        const encodedPath = encodeURIComponent(bci)
        setBookCoverImgUrl(
          process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
            encodedPath +
            '?alt=media'
        )

        const bim =
          'Reading/ReadingTriumphs/' +
          response.data[0].readingLevel +
          '/img/' +
          response.data[0].storyNum +
          '.png'

        const encodedPath_bim = encodeURIComponent(bim)
        setBookImgUrl(
          process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
            encodedPath_bim +
            '?alt=media'
        )

        const baudio =
          'Reading/ReadingTriumphs/' +
          response.data[0].readingLevel +
          '/audio/' +
          response.data[0].audio1

        const encodedPath_baudio = encodeURIComponent(baudio)
        setBookAudioUrl(
          process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
            encodedPath_baudio +
            '?alt=media'
        )
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }

  function blackcatInfo() {
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-and-Blackcat-Series-info/'
        // alert('blackcat')
        var Url = url + mbn
        // alert(Url)
        const response = await axios.get(Url)

        if (response.data.length > 0) {
          // setHWID(response.data[0].homework_id)
          // setEnglibLevel(response.data[0].englibLevel)
          setBookStory(response.data[0].story)
          setSeriesName(response.data[0].seriesName)
          // setBookTitle(response.data[0].bookTitle)
          setBookNum(response.data[0].bookNum)
          setStoryNum(response.data[0].storyNum)
          setStoryTitle(response.data[0].storyTitle)
          setReadingLevel(response.data[0].readingLevel)

          setBookTitle(response.data[0].bookTitle)

          setReadingLevel(response.data[0].readingLevel)
          setStoryStartPage(response.data[0].hw_page_start)
          setStoryEndPage(response.data[0].hw_page_end)
          setReadingHWAmount(response.data[0].readingHWAmount)
          setOneMore(response.data[0].oneMore)

          setWhySameReadingReason(response.data[0].whySameReadingReason)
          setWhySameReadingReasonDetail(
            response.data[0].whySameReadingReasonDetail
          )

          var sN = response.data[0].storyNum
          var rL = response.data[0].readingLevel
          var bN = response.data[0].bookNum
          var pdf1 = response.data[0].pdf1
          // if (sN.indexOf('_Story1') !== -1) {
          if (sN.indexOf('_Story') !== -1) {
            if (
              rL == 'A2' ||
              rL == 'B1_1' ||
              rL == 'B1_2' ||
              rL == 'B1_1' ||
              rL == 'B2_1' ||
              rL == 'B2_2' ||
              rL == 'C1'
            ) {
              var rC = 'BCat_RTraining'
            } else {
              var rC = 'BCat_GreenApple'
            }
            var fsl =
              'https://myenglibold.mycafe24.com/myenglib/backup/ebook/pdfviewer.php?sort=blackcat&file=' +
              pdf1 +
              '&readingLevel=' +
              rL +
              '&readingCourse=' +
              rC +
              '&bookNum=' +
              bN

            setBookUrl(fsl)
          }

          // setAnswerFile
          // setBookCoverImgUrl
          // setBookImgUrl
          // setBookAudioUrl
          var af =
            'Reading/Blackcat/' +
            response.data[0].readingLevel +
            '/' +
            response.data[0].bookNum +
            '/answer/answer.pdf'

          const encodedPath_af = encodeURIComponent(af)

          setAnswerFile(
            process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
              encodedPath_af +
              '?alt=media'
          )

          const bci =
            'Reading/Blackcat/img/' +
            response.data[0].readingLevel +
            '/' +
            response.data[0].bookNum +
            '_Cover.png'
          const encodedPath_bci = encodeURIComponent(bci)

          setBookCoverImgUrl(
            process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
              encodedPath_bci +
              '?alt=media'
          )

          //https://englib-public-worker.englib-new-materials.workers.dev/Reading/Blackcat/img/B2_2/Book1_Story1.png
          const bim =
            'Reading/Blackcat/img/' +
            response.data[0].readingLevel +
            '/' +
            response.data[0].storyNum +
            '.png'

          const encodedPath_bim = encodeURIComponent(bim)

          setBookImgUrl(
            process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
              encodedPath_bim +
              '?alt=media'
          )

          //https://englib-public-worker.englib-new-materials.workers.dev/Reading/Blackcat/A1_Starter/Book1/audio/10_Whales.mp3

          //Main Story audio
          const baudio =
            'Reading/Blackcat/' +
            response.data[0].readingLevel +
            '/' +
            response.data[0].bookNum +
            '/audio/' +
            response.data[0].audio1

          const encodedPath_baudio = encodeURIComponent(baudio)

          setBookAudioUrl(
            process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
              encodedPath_baudio +
              '?alt=media'
          )

          if (response.data[0].audio_intro != '') {
            const baudio_intro =
              'Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio_intro

            const encodedPath_baudio_intro = encodeURIComponent(baudio_intro)

            setBookIntroAudioUrl(
              process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                encodedPath_baudio_intro +
                '?alt=media'
            )
          }

          if (response.data[0].audio_intro2 != '') {
            const baudio_intro2 =
              'Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio_intro2

            const encodedPath_baudio_intro2 = encodeURIComponent(baudio_intro2)

            setBookIntro2AudioUrl(
              process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                encodedPath_baudio_intro2 +
                '?alt=media'
            )
          }

          if (response.data[0].audio_author != '') {
            const baudio_author =
              'Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio_author

            const encodedPath_baudio_author = encodeURIComponent(baudio_author)

            setBookAuthorAudioUrl(
              process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                encodedPath_baudio_author +
                '?alt=media'
            )
          }

          if (response.data[0].audio2 != '') {
            const baudio2 =
              'Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio2
            const encodedPath_baudio2 = encodeURIComponent(baudio2)
            setBookAudio2Url(
              process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                encodedPath_baudio2 +
                '?alt=media'
            )
            setBookAudio2TitleUrl(response.data[0].title_audio2)
          }

          if (response.data[0].audio3 != '') {
            const baudio3 =
              'Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio3
            const encodedPath_baudio3 = encodeURIComponent(baudio3)
            setBookAudio3Url(
              process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                encodedPath_baudio3 +
                '?alt=media'
            )

            setBookAudio3TitleUrl(response.data[0].title_audio3)
          }

          if (response.data[0].audio4 != '') {
            const baudio4 =
              'Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio4
            const encodedPath_baudio4 = encodeURIComponent(baudio4)

            setBookAudio4Url(
              process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                encodedPath_baudio4 +
                '?alt=media'
            )
            setBookAudio4TitleUrl(response.data[0].title_audio4)
          }

          if (response.data[0].audio5 != '') {
            const baudio5 =
              'Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio5
            const encodedPath_baudio5 = encodeURIComponent(baudio5)
            setBookAudio5Url(
              process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                encodedPath_baudio5 +
                '?alt=media'
            )

            setBookAudio5TitleUrl(response.data[0].title_audio5)
          }
          if (response.data[0].audio6 != '') {
            const baudio6 =
              'Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio6

            const encodedPath_baudio6 = encodeURIComponent(baudio6)
            setBookAudio6Url(
              process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                encodedPath_baudio6 +
                '?alt=media'
            )
            setBookAudio6TitleUrl(response.data[0].title_audio6)
          }
          if (response.data[0].audio7 != '') {
            const baudio7 =
              'Reading/Blackcat/' +
              response.data[0].readingLevel +
              '/' +
              response.data[0].bookNum +
              '/audio/' +
              response.data[0].audio7
            const encodedPath_baudio7 = encodeURIComponent(baudio7)
            setBookAudio7Url(
              process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN +
                encodedPath_baudio7 +
                '?alt=media'
            )
            setBookAudio7TitleUrl(response.data[0].title_audio7)
          }
          // selectMemo(
          //   response.data[0].seriesName,
          //   response.data[0].bookNum,
          //   response.data[0].storyNum
          // )
        }
      } catch (error) {
        alert('viewreading-error1:' + error)
        console.log(error)
      }
    }

    fetchData2()
  }

  function ortInfo() {
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-and-ORT-info/'
        var Url = url + mbn

        const response = await axios.get(Url)

        //setHWbookInfo(response.data)
        // setHWID(response.data[0].homework_id)
        // setEnglibLevel(response.data[0].englibLevel)

        // setBookStory(response.data[0].story)
        setSeriesName(response.data[0].seriesName)
        // setBookTitle(response.data[0].bookTitle)
        setBookNum(response.data[0].bookNum)
        // alert(response.data[0].bookNum)
        setStoryNum(response.data[0].storyNum)
        setStoryTitle(response.data[0].storyTitle)
        setReadingLevel(response.data[0].readingLevel)
        setBookTitle(response.data[0].bookTitle)

        setReadingLevel(response.data[0].readingLevel)
        setStoryStartPage(response.data[0].hw_page_start)
        setStoryEndPage(response.data[0].hw_page_end)
        setReadingHWAmount(response.data[0].readingHWAmount)
        setOneMore(response.data[0].oneMore)

        setWhySameReadingReason(response.data[0].whySameReadingReason)
        setWhySameReadingReasonDetail(
          response.data[0].whySameReadingReasonDetail
        )

        var rL = response.data[0].readingLevel
        var bN = response.data[0].bookNum
        // var pdf = response.data[0].pdf
        var pdf = response.data[0].pdf.replace(/\s+/g, '_')

        var fsl =
          'https://myenglibold.mycafe24.com/myenglib/backup/ebook/pdfviewer.php?sort=ort&readingLevel=' +
          rL +
          // '&file=myenglib/materials/Reading/ORT/' +
          '&file=' +
          // rL +
          // '/book/' +
          pdf

        setBookUrl(fsl)
        // alert(fsl)
        const baudio =
          'Reading/ORT/' +
          response.data[0].readingLevel +
          '/audio/' +
          response.data[0].audio1
        const encodedPath_baudio = encodeURIComponent(baudio)
        setBookAudioUrl(
          process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DOMAIN + encodedPath_baudio
          // +'?alt=media'
        )

        // selectMemo(
        //   response.data[0].seriesName,
        //   response.data[0].bookNum,
        //   response.data[0].storyNum
        // )
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }

  useEffect(() => {
    selectMemo()
  }, [])

  function selectMemo() {
    const fetchData = async () => {
      try {
        const url = `${DB_CONN_URL}/select-lesson-memo-tutor-reading`

        const res = await axios.post(url, {
          tbn,
          seriesName: seriesName1,
          subject: 'READING',
          course,
          courseName,
          bookNum: bookNum1,
          storyNum: storyNum1,
          readingLevel: readingLevel1,
        })
        // 성공 응답 처리
        // alert(res.data.message)
        if (res.data.status) {
          if (res.data.data) {
            setDbValue(res.data.data)
          } else {
            // alert(res.data.message) // “저장된 메모가 없습니다.”
          }
        } else {
          alert(`오류: ${res.data.message}`)
        }
      } catch (error) {
        console.error(error)
        alert('network error -select-lesson-memo-tutor-reading ')
      }
    }

    fetchData()
  }
  // function selectMemo() {
  //   const fetchData = async () => {
  //     var url = DB_CONN_URL + '/select-lesson-memo-tutor-reading'
  //     try {
  //       axios
  //         .post(url, {
  //           tbn: tbn,
  //           seriesName: seriesName1,
  //           subject: subject,
  //           course: course,
  //           courseName: courseName,
  //           bookNum: bookNum1,
  //           storyNum: storyNum1,
  //           readingLevel: readingLevel1,
  //         })
  //         .then((response) => {
  //           // alert('length:' + response.data.length)
  //           alert(response.data.message)
  //           //  alert(response.data.length)

  //           if (response.data.length > 0) {
  //             setDbValue(response.data.response[0].lessonMemo)
  //           }
  //         })
  //     } catch (error) {
  //       alert('error1-select-lesson-memo-tutor-reading')
  //       console.log(error)
  //     }
  //   }
  //   fetchData()
  // }

  function getTutorQuestionReadingTriumphs(readingLevel, storyNum) {
    const fetchData2 = async () => {
      try {
        // alert('readingLevel' + readingLevel)
        // alert('storyNum' + storyNum)

        var url = DB_CONN_URL + '/get-tutor-question-Reading-Triumphs/'

        var Url = url + readingLevel + '&' + storyNum
        // alert(Url)
        const response = await axios.get(Url)
        setTutorQuestionLength(response.data.length)
        if (response.data.length > 0) {
          setTutorQuestion(response.data)
        }

        // alert(response.data.message)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }

  function saveEditor(vlu, noalert) {
    const fetchData = async () => {
      // alert('course' + course)
      // alert('teacher_name' + teacher_name)
      // alert('courseName' + courseName)
      // alert('seriesName' + seriesName)
      // alert('readingLevel' + readingLevel)
      // alert('bookTitle' + bookTitle)
      // alert('bookNum:' + bookNum)
      // alert('storyNum:' + storyNum)
      // alert('storyTitle:' + storyTitle)
      try {
        // var url = DB_CONN_URL + '/save-shadowing-script-editor'
        var url = DB_CONN_URL + '/save-lesson-edit-for-tutor-materials-reading'

        axios
          .post(url, {
            tbn: tbn,
            teacher_name: teacher_name,
            subject: 'READING',
            course: course,
            courseName: courseName,
            seriesName: seriesName,
            readingLevel: readingLevel,
            bookTitle: bookTitle,
            bookNum: bookNum,
            storyNum: storyNum,
            storyTitle: storyTitle,
            memo: vlu,
          })
          .then((response) => {
            alert(response.data.message)

            if (response.data.status == false) {
              alert('saveError: ' + response.data.message)
            }
            // if (noalert == '' || noalert == null) {
            //   alert('Saved!')
            // }
            selectMemo()
          })
      } catch (error) {
        alert('error- save')
        console.log(error)
      }
    }
    fetchData()
  }

  function sentMemoToStudent(vlu) {
    //次のStepSH1のsys_hw_historyテーブルのstepStatusがendになっている場合は、StepSH2にいく。
    //왜냐하면, StepSH1은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/send-lesson-edit-for-student'

        axios
          .post(url, {
            homework_id: homework_id,
            memo: vlu,
          })
          .then((response) => {
            // alert(response.data.message)
            alert("Tutor's memo has been sent to the student successfully!")
          })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  useEffect(() => {
    getCopyInfo(mbn)
  }, [mbn])

  function getCopyInfo(mbn) {
    const fetchData = async () => {
      const Url = DB_CONN_URL + '/get-copy-info'
      try {
        const response = await axios.post(Url, { mbn: mbn })

        if (
          response.data &&
          response.data.length > 0 &&
          response.data[0].copyHW !== undefined
        ) {
          setCopyHW(response.data[0].copyHW)
          setCopyHWAmount(response.data[0].copyHWAmount)
        } else {
          console.error('Unexpected response structure: ', response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function changeCopyHW(copyhw) {
    const fetchData = async () => {
      try {
        var Url = DB_CONN_URL + '/change-new-copy-hw'
        axios
          .post(Url, {
            mbn: mbn,
            copyhw: copyhw,
          })
          .then((response) => {
            getCopyInfo(mbn)
            alert('Copy H.W  Changed to ' + copyhw)
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function changeCopyHWAmount(copyHWAmount) {
    const fetchData = async () => {
      try {
        var Url = DB_CONN_URL + '/change-new-copy-hw-amount'
        axios
          .post(Url, {
            mbn: mbn,
            copyHWAmount: copyHWAmount,
          })
          .then((response) => {
            getCopyInfo(mbn)
            alert('The Number of pages to copy changed to ' + copyHWAmount)
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  //   'SELECT * FROM sys_member_lesson_set WHERE member_barcode_num = ? AND courseName = ? AND status=?',

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <center>
        <div
          className="col-lg-12 col-md-12 p-3"
          style={{
            width: '100%',
            display: viewRndAnswer ? 'block' : 'none',
          }}
        >
          {readingLevel && bookNum && (
            <RndBlackcatAnswer readingLevel={readingLevel} bookNum={bookNum} />
          )}
        </div>

        <div className="row pt-4" style={{ backgroundColor: 'white' }}>
          <div className="col-lg-12 col-md-12">
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
              {seriesName == 'Blackcat Series' && (
                <>
                  <span style={{ color: 'blue' }}>{bookTitle}</span>
                  <br />
                </>
              )}
              [{readingLevel}]{storyNum && <span>&nbsp;[{storyNum}]</span>}
              &nbsp;
              {storyTitle}
            </span>
            <span
              className="btn btn-danger ml-2 pt-0 pb-0"
              onClick={() => setIsSizeBig(!isSizeBig)}
            >
              {isSizeBig ? 'small' : 'big'}
            </span>
            <p>
              {oneMore == 'ok' && <b>same homework as last time [reason:</b>}
              {whySameReadingReason &&
                whySameReadingReason != 'others' &&
                whySameReadingReason + '] <br />'}
              {whySameReadingReason == 'others' &&
                whySameReadingReasonDetail &&
                whySameReadingReasonDetail + '] <br />'}
              {/* <b>今回の課題の量&nbsp;</b> */}
              <b>The reading amount for this homework&nbsp;</b>
              <span
                style={{
                  fontSize: '20px',
                  color: 'red',
                  fontWeight: 'bold',
                  marginRight: '10px',
                  // textDecorationLine: 'underline',
                  // textDecorationThickness: '3px',
                  // textDecorationColor: 'red',
                }}
              >
                {readingHWAmount != ''
                  ? readingHWAmount
                  : '課題の量が設定されてないです。管理者へお問合せください。'}
              </span>
              <br />{' '}
              <span
                className="mr-2"
                style={{ fontWeight: 'bold', color: 'red' }}
              >
                for the next h.w &#9654;
              </span>
              <b>copying a book</b>{' '}
              <span className="mt-5" style={{ marginRight: '10px' }}>
                {/* {copyHW} */}
                <select
                  onChange={(e) => {
                    setCopyHW(e.target.value)
                    changeCopyHW(e.target.value)
                  }}
                >
                  {copyHW == '' && <option>Please set this up</option>}
                  <option value="ok" selected={copyHW == 'ok' && 'selected'}>
                    OK
                  </option>
                  <option value="no" selected={copyHW == 'no' && 'selected'}>
                    NO
                  </option>
                </select>
              </span>
              {copyHW == 'ok' && (
                <>
                  <b>The number of pages to copy</b>{' '}
                  <select
                    onChange={(e) => {
                      setCopyHWAmount(e.target.value)
                      changeCopyHWAmount(e.target.value)
                    }}
                  >
                    {copyHWAmount == '' ||
                      (!copyHWAmount && (
                        <option>Please set the number of pages to copy</option>
                      ))}
                    <option
                      value="All"
                      selected={copyHWAmount == 'All' && 'selected'}
                    >
                      All
                    </option>
                    <option
                      value="half of the book"
                      selected={
                        copyHWAmount == 'half of the book' && 'selected'
                      }
                    >
                      half of the book
                    </option>
                    <option
                      value="up to 2 pages"
                      selected={copyHWAmount == 'up to 2 pages' && 'selected'}
                    >
                      up to 2 pages{' '}
                    </option>
                    <option
                      value="up to 4 pages"
                      selected={copyHWAmount == 'up to 4 pages' && 'selected'}
                    >
                      up to 4 pages{' '}
                    </option>
                    <option
                      value="up to 6 pages"
                      selected={copyHWAmount == 'up to 6 pages' && 'selected'}
                    >
                      up to 6 pages{' '}
                    </option>
                    <option
                      value="up to 8 pages"
                      selected={copyHWAmount == 'up to 8 pages' && 'selected'}
                    >
                      up to 8 pages{' '}
                    </option>
                    <option
                      value="up to 10 pages"
                      selected={copyHWAmount == 'up to 10 pages' && 'selected'}
                    >
                      up to 10 pages{' '}
                    </option>
                    <option
                      value="up to 12 pages"
                      selected={copyHWAmount == 'up to 12 pages' && 'selected'}
                    >
                      up to 12 pages{' '}
                    </option>
                  </select>
                </>
              )}
            </p>
            {courseName == 'CourseB' && (
              <span
                className="btn btn-outline-danger ml-2"
                onClick={() => {
                  setViewRndAnswer(!viewRndAnswer)
                }}
              >
                ANSWER
              </span>
            )}
          </div>
          <div
            className={isSizeBig ? bookSize2 : bookSize}
            style0={{
              width: '100%',
              padding: 0,
            }}
          >
            {/* <p>bookUrl{bookUrl}</p> */}

            <object
              // data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage1plus&file=myenglib/materials/reading/ORT/Stage1plus/book/At_the_Park.pdf"
              data={bookUrl}
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

            <div
              className="col-lg-12 col-md-12 mt-2 mb-3"
              style={{ textAlign: 'center' }}
            >
              {/* {bookAudioUrl} */}
              {/* https://englib-public-worker.englib-new-materials.workers.devReading/Blackcat/A1_Starter/Book1/audio/10_Whales.mp3 */}
              <ReactAudioPlayer
                src={bookAudioUrl}
                // autoPlay
                controls
                onPlay={() => {
                  // alert('playing')
                  // setIsAudioPlaying(true)
                }}
                onPause={() => {
                  // alert('paused')
                  // setIsAudioPlaying(false)
                }}
                style={{
                  backgroundColor: '#b0c4de',
                  padding: '15px',
                  width: '80%',
                  borderRadius: '10px',
                }}
              />{' '}
            </div>
          </div>

          <div
            className={isSizeBig ? rightSideSize2 : rightSideSize}
            style={{ textAlign: 'center' }}
          >
            <div className="row">
              <div
                className="col-lg-4 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <span
                  className="btn btn-info"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setViewWord(true)
                    setViewQuestion(false)
                    setViewEditor(false)
                  }}
                >
                  {isSizeBig ? 'W' : 'Words'}
                </span>
              </div>
              <div
                className="col-lg-4 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <span
                  className="btn btn-secondary "
                  style={{ width: '100%' }}
                  onClick={() => {
                    setViewQuestion(true)
                    setViewWord(false)
                    setViewEditor(false)
                  }}
                >
                  {isSizeBig ? 'Q' : 'Questions'}
                </span>
              </div>
              <div
                className="col-lg-4 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <span
                  className="btn btn-warning"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setViewWord(false)
                    setViewQuestion(false)
                    setViewEditor(true)
                    {
                      dbValue == '' ? selectMemo() : console.log('1')
                    }
                    // saveEditor(dbValue, 'no-alert')
                  }}
                >
                  {isSizeBig ? 'E' : 'Editor'}
                </span>
              </div>
            </div>

            <div
              className="pt-2"
              style={{ width: '100%', display: viewEditor ? 'block' : 'none' }}
            >
              {/* homework_id: {homework_id} */}
              <>
                <div
                  className="col-lg-12 col-md-12 mb-2 pl-0 ml-0"
                  style={{ textAlign: 'center' }}
                >
                  <hr />
                  <span
                    className="btn btn-danger mt-2"
                    onClick={() => {
                      saveEditor(dbValue)
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    Save as your material
                  </span>
                  <span
                    className="btn btn-primary mt-2 ml-2"
                    onClick={() => {
                      sentMemoToStudent(dbValue)
                    }}
                  >
                    Send to student
                  </span>
                </div>
                {/* dbvalue {dbValue} */}
                {/* <br />
                {seriesName}/{bookNum}/{storyNum} */}
                {seriesName != '' && bookNum != '' && storyNum != '' && (
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    onChange={setDbValue}
                    value={dbValue && dbValue}
                    style={{ backgroundColor: '#FEF9E7' }}
                  />
                )}
              </>
            </div>
            <div
              style={{ width: '100%', display: viewWord ? 'block' : 'none' }}
            >
              {/* homework_id: {homework_id} */}
              <>
                {readingLevel && homework_id && (
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
              </>
            </div>
            <div
              style={{
                width: '100%',
                height: '750px',
                textAlign: 'left',
                overflow: 'scroll',
                display: viewQuestion ? 'block' : 'none',
                paddingTop: '20px',
              }}
            >
              {tutorQuestionLength > 0 && tutorQuestion ? (
                tutorQuestion.map((val, key) => {
                  var qnum = key + 1
                  return (
                    <>
                      <p style={{ color: 'black' }}>
                        <font color="gray">[{val.page}p]&nbsp;</font>

                        <font color="red"> [Q]&nbsp;{val.question}</font>
                      </p>
                      <p>
                        <font
                          style={{
                            color: 'blue',
                            // textDecoration: 'underline'
                          }}
                        >
                          [A]&nbsp;
                          {val.sample_answer}
                        </font>
                      </p>
                      <p>
                        [The answer's part of p.{val.page}] <br />
                        {val.script_place}
                      </p>
                      <hr
                        style={{
                          borderColor: '#273746',
                          borderWidth: '3px',
                        }}
                      />
                    </>
                  )
                })
              ) : (
                <>
                  <p>質問準備中...</p>
                </>
              )}
            </div>
          </div>
        </div>
      </center>
    </>
  )
}

export default ViewReading
