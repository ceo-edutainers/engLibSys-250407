import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { QuizContext } from './ContextsB'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import Upload from '@/components/readingSelfcourse/uploadBookQuestion'

//import { Questions } from '../../pages/quizhelper/Questions'

const EndScreenB = () => {
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
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
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  //////////////////////////////////////////////
  //BASIC SETTING NEED START
  //////////////////////////////////////////////
  //この学習では120ポイント以上をゲットすると次のstoryへ行ける
  const [cutlinePointToNextStory, setCutlinePointToNextStory] = useState(120)

  const [HWPointInfo, setHWPointInfo] = useState([])
  const [totalLastPoint, setTotalLastPoint] = useState()
  const [firstLastRecording, setFirstLastRecording] = useState([])
  const [firstRecordFile, setFirstRecordFile] = useState()
  const [lastRecordFile, setLastRecordFile] = useState()

  useEffect(() => {
    getYourTotalPoint()
  }, [])
  const getYourTotalPoint = () => {
    // var mbn = localStorage.getItem('MypageMbn')
    //console.log('StepSH3/myMbn:', myMbn)

    var url = DB_CONN_URL + '/get-this-hw-point-info/'
    var Url = url + myMbn + '&' + HWID

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setTotalLastPoint(response.data[0].totalPoint)
        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  useEffect(() => {
    getYourAudioFirstAndLastForReading()
  }, [])
  const getYourAudioFirstAndLastForReading = () => {
    // var mbn = localStorage.getItem('MypageMbn')
    //console.log('StepSH3/myMbn:', myMbn)
    var homework_id = HWID
    var url = DB_CONN_URL + '/record-select-first-and-last-for-reading/'
    var Url = url + homework_id

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        var awsUrl =
          'https://englib.s3.ap-northeast-1.amazonaws.com/uploadrecording/' +
          response.data[0].filaname

        setFirstLastRecording(response.data)
        setFirstRecordFile(awsUrl + response.data[0].filename)
        setLastRecordFile(awsUrl + response.data[1].filename)
        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  const restartQuiz = () => {
    setPoint(0)
    var tempid = Math.floor(Math.random() * 999999999999999)
    setPracticeTempId(tempid)
    setPageView('menu')
  }

  useEffect(() => {
    let audioEndAlert = new Audio(
      'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/complete.mp3'
    )
    audioEndAlert.play()
  }, [])

  // useEffect(() => {
  //   function endSoundPlay() {
  //     if (audioOnOff == 'on') {
  //       let audioEndAlert = new Audio(
  //         'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/complete.mp3'
  //       )
  //       audioEndAlert.play()
  //     }
  //   }
  // }, [])

  return (
    <>
      <div
        className="EndScreenBig"
        style={{ backgroundColor: 'lightseagreen' }}
      >
        <h1 className="mb-3" style={{ fontWeight: '800', color: '#2C3E50' }}>
          終&nbsp;了
        </h1>

        <h5>
          今回の課題習得ポイント<b>{totalLastPoint}</b>point
        </h5>
        <h5>
          今回の課題の目標ポイント<b>{cutlinePointToNextStory}</b>point
        </h5>
        <br />
        <h6 style={{ textDecoration: 'blue solid underline' }}>
          以下の音声を毎回聴いてみて、自分の成長を感じてください。
        </h6>
        {firstLastRecording.map((val, key) => {
          var diff = totalLastPoint - cutlinePointToNextStory

          var audioFile =
            'https://englib.s3.ap-northeast-1.amazonaws.com/uploadrecording/' +
            val.filename
          return (
            <>
              <h6>
                {key == 0 ? '最初の録音音声' : '最後の録音音声'}
                <audio
                  src={audioFile}
                  controls="controls"
                  style={{
                    alignItems: 'center',
                    height: '25px',
                    paddingTop: '10px',
                    width: '40%',
                    textAlign: 'center',
                  }}
                />
              </h6>
            </>
          )
        })}

        <div
          className="col-lg-12 col-md-12 p-3 m-3"
          style={{
            border: '5px solid #E59866',
            borderRadius: '10px',
            color: '#2C3E50',
            textAlign: 'left',
          }}
        >
          <h1>TEST</h1>
          <center>
            <h1
              style={{
                color: 'blue',
                fontSize: '30px',
                fontWeight: 'bold',
                marginBottom: 0,
              }}
            >
              問題課題提出&nbsp;&nbsp;
              <span style={{ fontSize: '15px' }}>
                <a>問題サンプルを見る</a>
              </span>
            </h1>
            <p style={{ color: 'red', fontSize: '12px' }}>
              1枚アップロードで5Pointゲットできます。
            </p>
          </center>
          {/* お手元のテキストの中の問題(本によってはチャプター毎の終わり、または本の巻末にまとめてあります)は、
          ある程度ストーリー自体を理解できるようになったらテキストに直接書いてください。問題を解いた後は、間違えを赤ペンで必ず直し、その写真を撮ってアップロードしてください。
          <Upload
            // mbn={myMbn}
            // homework_id={HWID}
            currentStep="Endscreen"
            stepStatus="BookQuestion"
            pointKeyNum="RR-4"
            homework_id={HWID}

            // practiceTempId={practiceTempId}
            // thisSubject={thisSubject}
          />
          <b>注意事項：</b>
          巻末問題の課題はどのタイミングでもアップロードすることができますが、ステップ１から３までのリーディングの課題目標ポイント合計が
          {cutlinePointToNextStory}ポイントに
          達成していない場合、次のストーリーに行けません。 */}
        </div>

        <Link href="mypage">
          <button>このレベルは簡単すぎ</button>
        </Link>
        <Link href="mypage">
          <button onClick={restartQuiz}>マイページへ戻る</button>
        </Link>
      </div>
      <CopyrightFooter />
    </>
  )
}

export default EndScreenB
