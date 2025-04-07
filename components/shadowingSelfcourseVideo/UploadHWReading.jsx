import react, { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'

import { QuizContext } from './Contexts'

import next from 'next'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Upload from '@/components/readingSelfcourse/uploadCopyVocaForLesson'
import ViewBookQuestionFile from '@/components/readingSelfcourse/viewBookQuestionFileB'
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/

const UploadHWShadowing = () => {
  ////////////////////////////////////////////////////////////////////
  //SETTING END
  ////////////////////////////////////////////////////////////////////
  const [dictText, setDictText] = useState([])
  const [dictTextRight, setDictTextRight] = useState(false)
  const [viewNum, setViewNum] = useState('')
  const [endButton, setEndButton] = useState('')
  const [viewSentence, setViewSentence] = useState(false)
  // const [rightAnswer, setRightAnswer] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false) //Main Storyの音声がPlayされたらtrueになる。必ず音声を聴きながらやるページで必要
  // const [bookSplitAudioUrl, setBookSplitAudioUrl] = useState([])
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  const [isGiveUp, setIsGiveUp] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味
  const [Questions, setQuestions] = useState([]) //DBから本ののデータを持ってきて入れる
  const [HWbookInfo, setHWbookInfo] = useState([]) //DBからHW bookののデータを持ってきて入れる
  // const [thisBookTitle, setThisBookTitle] = useState()
  // const [thisBookNum, setThisBookNum] = useState()
  // const [thisStoryNum, setThisStoryNum] = useState()
  const [SplitHWbookInfo, setSplitHWbookInfo] = useState([]) //DBからHW bookの詳細なデータを持ってくる
  const [runSplitHW, setRunSplitHW] = useState(false)
  const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  const [nowClickedColor, setNowClickedColor] = useState('') //クリックした答えのボタンの色が変わる
  const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる
  const [audioDurtaionFromDB, setAudioDurtaionFromDB] = useState(0)
  const [recordingCountForNextStep, setRecordingCountForNextStep] = useState(0)
  // const [nextQInsert, setNextQInsert] = useState('')
  const [thisRightAnswerAru, setThisRightAnswerAru] = useState([])
  // const [breakCondition, setBreakCondition] = useState([])

  const [gotPointAri, setGotPointAri] = useState(false)
  const [thisDisable, setThisDisable] = useState('')
  const {
    audioDuration,
    setAudioDuration,
    qrLinkVideoDictation,
    setQrLinkVideoDictation,
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    youtubeID,
    setYoutubeID,
    dictationMin,
    setDictationMin,
    shadowingSpeed,
    setShadowingSpeed,
    dictationHow,
    setDictationHow,
    lessonOrder,
    setLessonOrder,
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
    shadowingLevel,
    setShadowingLevel,
    storyTitle,
    setStoryTitle,
    storyStartPage,
    setStoryStartPage,
    dictationStart,
    setDictationStart,
    movieNum,
    setMovieNum,
    youtubeURL,
    setYoutubeURL,
    shadowingTitle,
    setShadowingTitle,
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
      <div
        className="row mt-3  mb-3"
        style={{
          border: '1px solid white',
          borderRadius: '10px',
          padding: '10px',
          width: '100%',
        }}
      >
        <div className="col-lg-12 col-md-12">
          <h5 style={{ fontWeight: 'bold' }}>
            ディクテーション課題をアップロード
          </h5>
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
          {/* <b>注意事項：</b>
                巻末問題の課題はどのタイミングでもアップロードすることができますが、ステップ１から３までのリーディングの課題目標ポイント合計が
                {cutlinePointToNextStory}ポイントに
                達成していない場合、次のストーリーに行けません。 */}
        </div>
        <div className="col-lg-12 col-md-12">
          <ViewBookQuestionFile
            currentStep="Endscreen"
            stepStatus="BookQuestion"
          />
        </div>
      </div>
    </>
  )
}

export default UploadHWShadowing
