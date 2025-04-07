import React, { useState, useEffect } from 'react'
import SplitPanelReading from '@/components/Splitpanel/SplitPanelReading'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'

import ViewGrammraTerms from '@/components/Output_ShowAndTell/ViewGrammarTerms'
import ViewEnglibLevel from '@/components/Output_ShowAndTell/ViewEnglibLevel2'
import ViewTrouble from '@/components/Output_ShowAndTell/ViewTrouble'
import ViewSetHW from '@/components/Output_ShowAndTell/ViewSetHW'
import ViewSetHWNoShadowing from '@/components/Output_ShowAndTell/ViewSetHWNoShadowing'
import ViewReading from '@/components/Output_ShowAndTell/ViewReading'
import ViewPhonics from '@/components/Output_ShowAndTell/ViewPhonics'
import ViewPastVerb from '@/components/Output_ShowAndTell/ViewPastVerb'
import ViewTutorOnlyMemo from '@/components/Output_ShowAndTell/ViewTutorOnlyMemo'
import ViewToMomAdd from '@/components/Output_ShowAndTell/ViewToMomAdd'
import ViewConversation from '@/components/Output_ShowAndTell/ViewConversation'

import ViewGrammar from '@/components/Output_ShowAndTell/ViewGrammar'
import ViewSchoolEnglish from '@/components/Output_ShowAndTell/ViewSchoolEnglish'
import ViewVerbalWriting from '@/components/Output_ShowAndTell/ViewVerbalWriting'
import ViewShadowingVideo from '@/components/Output_ShowAndTell/ViewShadowingVideo'
// import ViewShadowingBook from '@/components/Output_ShowAndTell/ViewShadowingBook'
import ViewEIKEN from '@/components/Output_ShowAndTell/ViewEIKEN'
import ViewIELTS from '@/components/Output_ShowAndTell/ViewIELTS'
import ViewTOEFL from '@/components/Output_ShowAndTell/ViewTOEFL'
import ViewTOEIC from '@/components/Output_ShowAndTell/ViewTOEIC'
import ViewSSAT from '@/components/Output_ShowAndTell/ViewSSAT'
import ViewSAT from '@/components/Output_ShowAndTell/ViewSAT'

import RndHomework from '@/components/Output_ShowAndTell/RndHomework'

import RndStudyHistory from '@/components/Output_ShowAndTell/RndStudyHistory'
import RndFeedback from '@/components/Output_ShowAndTell/RndFeedback'
// import RndEditor from '@/components/Output_ShowAndTell/RndEditor'

import emailjs from 'emailjs-com'

const READINGA = () => {
  useEffect(() => {
    localStorage.setItem('mbn', '')
    localStorage.setItem('email', '')
  }, [])

  const DB_CONN_URL = process.env.DB_CONN_URL

  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  // const [isFinishThisLesson, setIsFinishThisLesson] = useState(false)
  // const [isNoShow, setIsNoShow] = useState(false)
  // const [isSuccessSetNewLesson, setIsSuccessSetNewLesson] = useState(false)
  // const [isNoshowAndSuccessSetNewLesson, setIsNoshowAndSuccessSetNewLesson] =
  //   useState(false)
  //get값이 넘어왔을 경우

  const [mbn, setMbn] = useState()
  const [homework_id, setHomework_id] = useState()
  const [subJ, setSubj] = useState()
  const [tbn, setTbn] = useState()
  const [courseName, setCourseName] = useState()

  const [stepStatus, setStepStatus] = useState()
  const [pointKeyNum, setPointKeyNum] = useState()
  const [fileDetail, setFileDetail] = useState()
  const router = useRouter()
  const { query } = useRouter()

  // const mbn = query.m
  // const homework_id = query.homework_id
  // const subJ = query.subJ
  // const tbn = query.tbn
  // const courseName = query.cN

  //reading materials open
  const [isNowOpen, setIsNowOpen] = useState(false)
  const [openMaterialPage, setOpenMaterialPage] = useState()

  const backUrl = '/tutor/upcoming?tbn=' + tbn
  const [course, setCourse] = useState()
  const [dictationHow, setDictationHow] = useState('')
  const [bookPhonicsUrl, setBookPhonicsUrl] = useState()
  const [bookConversationUrl, setBookConversationUrl] = useState()
  const [shadowingView, setShadowingView] = useState(false)
  const [readingViewRT, setReadingViewRT] = useState(false)
  const [readingViewBK, setReadingViewBK] = useState(false)
  const [readingViewORT, setReadingViewORT] = useState(false)

  const [phonicsView, setPhonicsView] = useState(false)
  const [pastverbView, setPastverbView] = useState(false)
  const [conversationView, setConversationView] = useState(false)
  const [grammarView, setGrammarView] = useState(false)
  const [eikenView, setEikenView] = useState(false)
  const [ieltsView, setIeltsView] = useState(false)
  const [toeflView, setToeflView] = useState(false)
  const [toeicView, setToeicView] = useState(false)
  const [ssatView, setSsatView] = useState(false)
  const [satView, setSatView] = useState(false)
  const [schoolEnglishView, setSchoolEnglishView] = useState(false)
  const [verbalWritingView, setVerbalWritingView] = useState(false)
  const [readingLevelView, setReadingLevelView] = useState(false)
  const [troubleShootView, setTroubleShootView] = useState(false)
  const [prolongLessonView, setProlongLessonView] = useState(false)
  const [errorReportView, setErrorReportView] = useState(false)

  const [toMomAddView, setToMomAddView] = useState(false)
  const [viewFinishLesson, setViewFinishLesson] = useState(false)

  const [sendEmail, setSendEmail] = useState()
  const [yoyakuDate, setYoyakuDate] = useState()
  const [yoyakuTime, setYoyakuTime] = useState()
  const [yoyakuWeekday, setYoyakuWeekday] = useState()
  const [studentNameEng, setStudentNameEng] = useState()

  const [lessonSubject, setLessonSubject] = useState()
  const [pageError, setPageError] = useState()
  // const [viewPageError, setViewPageError] = useState()
  const [hwSetView, setHwSetView] = useState(false)
  const [tutorOnlyMemoView, setTutorOnlyMemoView] = useState(false)
  const [homeworkID, setHomeworkID] = useState()
  const [lessonPageTitle, setLessonPageTitle] = useState()
  const [subject, setSubject] = useState(subJ)
  const [googleDocLink, setGoogleDocLink] = useState()
  const [nameEng, setNameEng] = useState()
  const [tutorNameEng, setTutorNameEng] = useState()
  const [classLink, setClassLink] = useState()

  const [bookTitle, setBookTitle] = useState()
  const [bookNum, setBookNum] = useState()
  const [storyNum, setStoryNum] = useState()
  const [storyEndNum, setStoryEndNum] = useState()
  const [storyTitle, setStoryTitle] = useState()
  const [listOrder, setListOrder] = useState()
  const [seriesName, setSeriesName] = useState()
  const [readingLevel, setReadingLevel] = useState()
  const [newLesson, setNewLesson] = useState(false)
  const [whenDetail, setWhenDetail] = useState()
  const [dictationSt, setDictationSt] = useState()
  const [extendedLessonHours, setExtendedLessonHours] = useState()
  const [extendedLessonMin, setExtendedLessonMin] = useState()
  const [extendedLessonMemo, setExtendedLessonMemo] = useState()
  const [doShadowingForThisCourse, setDoShadowingForThisCourse] = useState()
  // console.log('query.mbn:', mbn)
  // console.log('query.course:', courseName)
  // console.log('query.courseName:', query.cN)

  const [isSendEmailToAbsentStudent, setIsSendEmailToAbsentStudent] =
    useState(false)

  const [isAbsentStudentJoined, setIsAbsentStudentJoined] = useState(false)
  const [isBackConfirm, setIsBackConfirm] = useState(false)

  const [isCheckedAbsentBtn, setIsCheckedAbsentBtn] = useState(false)

  const [phonicsBigCourse, setPhonicsBigCourse] = useState()
  const [phonicsLessonTitle, setPhonicsLessonTitle] = useState()
  const [phonicsLessonOrder, setPhonicsLessonOrder] = useState()

  const [questionBigCourse, setQuestionBigCourse] = useState()
  const [questionLessonOrder, setQuestionLessonOrder] = useState()

  return (
    <>
      <div
        className="row pt-1 mr-0 pr-0"
        style={{
          top: '0px',
          width: '100%',
          zIndex: 1,
          backgroundColor: 'white',
          border: '1px solid #dedede',
          textAlign: 'center',
        }}
      >
        <div className="col-lg-12 col-md-12 text-center pb-1"></div>
        <div className="col-lg-2 col-md-12 text-center pb-1"></div>
        <div className="col-lg-1 col-md-12 pt-2" style={{ textAlign: 'right' }}>
          {/* <a href={classLink} target="_blank">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/31X9eeywR3L.jpg"
              style={{ width: '50px', height: 'auto' }}
            />
          </a> */}
        </div>
        <div className="col-lg-1 col-md-12 pt-2" style={{ textAlign: 'right' }}>
          {/* <img
            src="/images/logo-tomei.png"
            style={{ height: '50px', width: 'auto' }}
          /> */}
        </div>
      </div>

      <div
        className="row pt-1 mr-0 pr-0"
        style={{
          top: '0px',
          width: '100%',
          zIndex: 1,
          backgroundColor: '#ececec',
          border: '1px solid #dedede',
          textAlign: 'center',
        }}
      >
        {/* <div
          className="col-lg-12 col-md-12 p-2"
          style={{ textAlign: 'center' }}
        >
          {phonicsView && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setPhonicsView(!phonicsView)
              }}
            >
              PHONICS
            </span>
          )}
          {!phonicsView && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setPhonicsView(!phonicsView)
                setReadingViewORT(false)
                setReadingViewRT(false)
                setReadingViewBK(false)
              }}
            >
              PHONICS
            </span>
          )}

          {readingViewORT && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setReadingViewORT(!readingViewORT)
              }}
            >
              READING-ORT
            </span>
          )}
          {!readingViewORT && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setReadingViewORT(!readingViewORT)
                setPhonicsView(false)
                setReadingViewBK(false)
                setReadingViewRT(false)
              }}
            >
              READING-ORT
            </span>
          )}

          {readingViewBK && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setReadingViewORT(!readingViewBK)
              }}
            >
              READING-BK
            </span>
          )}
          {!readingViewBK && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setReadingViewBK(!readingViewBK)
                setPhonicsView(false)
                setReadingViewORT(false)
                setReadingViewRT(false)
              }}
            >
              READING-BK
            </span>
          )}

          {readingViewRT && (
            <span
              className="btn btn-danger mr-2"
              onClick={() => {
                setReadingViewRT(!readingViewRT)
              }}
            >
              READING-RT
            </span>
          )}
          {!readingViewRT && (
            <span
              className="btn btn-info mr-2"
              onClick={() => {
                setReadingViewRT(!readingViewRT)
                setPhonicsView(false)
                setReadingViewORT(false)
                setReadingViewBK(false)
              }}
            >
              READING-RT
            </span>
          )}
        </div> */}

        <div className="col-lg-12 col-md-12" style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '100%',

              // display: phonicsView ? 'block' : 'none',
            }}
          >
            <center>
              {phonicsView && (
                <ViewPhonics fsl="https://myenglib.com/myenglib/backup/lesson_sub_phonics.php?num_p=&test=test1&phonicsBigCourse=START&phonicsLessonTitle=BASIC-CARD-LESSON1&phonicsLessonOrder=1-1" />
              )}
            </center>
          </div>
        </div>

        {readingViewORT && (
          <div className="col-lg-12 col-md-12" style={{ textAlign: 'center' }}>
            <object
              // data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage1plus&file=myenglib/materials/reading/ORT/Stage1plus/book/At_the_Park.pdf"
              // data={bookUrl}
              data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage3Name&file=myenglib/materials/reading/ORT/Stage3/book/At_the_Seaside.pdf"
              style={{
                width: '70%',
                height: '1000px',
                border: '1px solid white',
                borderRadius: '20px',
                backgroundColor: 'white',
                margin: 0,
                padding: 0,
              }}
            />
            {/* <object
              data="https://www.myenglib.com/onlesson/teacher_book_list_bc.php?mbn=123"
              style={{
                width: '70%',
                height: '2000px',
                border: '1px solid white',
                borderRadius: '20px',
                backgroundColor: 'white',
                margin: 0,
                padding: 0,
              }}
            /> */}
          </div>
        )}

        {readingViewBK && (
          <div className="col-lg-12 col-md-12" style={{ textAlign: 'center' }}>
            <object
              // data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage1plus&file=myenglib/materials/reading/ORT/Stage1plus/book/At_the_Park.pdf"
              // data={bookUrl}
              data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=blackcat&file=Part1_The%20Tragedy%20of%20Birlstone_Chapter1.pdf&readingLevel=B2_1&readingCourse=BCat_RTraining&bookNum=Book7"
              style={{
                width: '70%',
                height: '1000px',
                border: '1px solid white',
                borderRadius: '20px',
                backgroundColor: 'white',
                margin: 0,
                padding: 0,
              }}
            />
          </div>
        )}

        {readingViewRT && (
          <div className="col-lg-12 col-md-12" style={{ textAlign: 'center' }}>
            <object
              // data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=ort&readingLevel=Stage1plus&file=myenglib/materials/reading/ORT/Stage1plus/book/At_the_Park.pdf"
              // data={bookUrl}
              data="https://www.myenglib.com/onlesson/pdfviewer.php?sort=reading_triumphs&file=Triumph_G4_BOOK2_Unit5_Story8.pdf&readingLevel=G4_2"
              style={{
                width: '70%',
                height: '1000px',
                border: '1px solid white',
                borderRadius: '20px',
                backgroundColor: 'white',
                margin: 0,
                margin: 0,
                padding: 0,
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}
export default READINGA
