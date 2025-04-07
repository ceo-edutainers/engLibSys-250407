import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
// const [homework_id, sethomework_id] = useState()

const ViewSetHW = ({ mbn, homework_id }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [homeworkIdMaincourse, setHomeworkIDMaincourse] = useState(homework_id)
  const [homeworkIdShadowing, setHomeworkIDShadowing] = useState()
  const [selectedMainCourseHW, setSelectedMainCourseHW] = useState()
  const [selectedShadowingHW, setSelectedShadowingHW] = useState()
  const [shadowingMaterial, setShadowingMaterial] = useState()
  const [selectedPhonicsHW, setSelectedPhonicsHW] = useState()
  const [selectedConversationHW, setSelectedConversationHW] = useState()
  const [youtubeID, setYoutubeID] = useState([])

  const [youtubeIframUrl, setYoutubeIframUrl] = useState([])
  const [dataInfo, setDataInfo] = useState([])
  const [dataShadowingInfo, setDataShadowingInfo] = useState([])
  const [readingListInfo, setReadingListInfo] = useState([])
  const [shadowingListInfo, setShadowingListInfo] = useState([])
  const [phonicsListInfo, setPhonicsListInfo] = useState([])

  const [conversationListInfo, setConversationListInfo] = useState([])

  const [conversationQuestionCourse, setConversationQuestionCourse] = useState()
  // const [conversationQuestion, setConversationQuestion] = useState()

  const [inputCourseDataInfo, setInputCourseDataInfo] = useState([])

  const [teacher_name, setTeacher_name] = useState()
  const [name_eng, setname_eng] = useState()
  const [isSelf, setisSelf] = useState()
  const [course, setcourse] = useState()
  const [courseName, setcourseName] = useState()
  const [subject, setsubject] = useState()
  const [material_sort, setmaterial_sort] = useState()
  const [seriesName, setseriesName] = useState()
  const [readingLevel, setreadingLevel] = useState()
  const [mainSubject, setMainSubject] = useState()
  const [mainCourseName, setMainCourseName] = useState()

  const [bookTitle, setbookTitle] = useState()
  const [bookNum, setbookNum] = useState()
  const [storyNum, setstoryNum] = useState()
  const [support_listOrder, setsupport_listOrder] = useState()
  const [storyTitle, setstoryTitle] = useState()
  const [hw_page_start, sethw_page_start] = useState()
  const [hw_page_end, sethw_page_end] = useState()
  const [phonicsBigCourse, setphonicsBigCourse] = useState()
  const [phonicsLessonTitle, setphonicsLessonTitle] = useState()
  const [phonicsLessonOrder, setphonicsLessonOrder] = useState()
  const [questionBigCourse, setquestionBigCourse] = useState()
  const [questionLessonOrder, setquestionLessonOrder] = useState()
  const [lessonStatus, setlessonStatus] = useState()
  const [when_detail, setwhen_detail] = useState()
  const [lessonDate, setlessonDate] = useState()
  const [lessonStartTime, setlessonStartTime] = useState()
  const [lessonEndTime, setlessonEndTime] = useState()
  const [yoyakuWeekday, setyoyakuWeekday] = useState()
  const [yoyakuDate, setyoyakuDate] = useState()
  const [yoyakuTime, setyoyakuTime] = useState()
  const [finishDate, setfinishDate] = useState()
  const [finishTime, setfinishTime] = useState()
  const [duringTime, setduringTime] = useState()
  const [regdate, setregdate] = useState()
  const [regtime, setregtime] = useState()
  const [lessonMemo, setlessonMemo] = useState()
  const [lessonMemoOnlyTeacher, setlessonMemoOnlyTeacher] = useState()
  const [lessonMemoForMom, setlessonMemoForMom] = useState()
  const [chkMemo, setchkMemo] = useState()
  const [replyFromMom, setreplyFromMom] = useState()
  const [shadowingLevel, setshadowingLevel] = useState()
  const [movieNum, setmovieNum] = useState()
  const [youtubeURL, setyoutubeURL] = useState()
  const [lessonOrder, setlessonOrder] = useState()
  const [shadowingTitle, setshadowingTitle] = useState()
  const [dictation_startdictation_start, setdictation_startdictation_start] =
    useState()
  const [shadowingSpeed, setshadowingSpeed] = useState()
  const [dictationMin, setdictationMin] = useState()
  const [dictationHow, setdictationHow] = useState()
  const [discuss_title, setdiscuss_title] = useState()
  const [discuss_correction, setdiscuss_correction] = useState()
  const [discuss_correction_extra, setdiscuss_correction_extra] = useState()
  const [google_doc_link, setgoogle_doc_link] = useState()
  const [showandtell_outline_limit_words, setshowandtell_outline_limit_words] =
    useState()
  const [showandtell_script_limit_words, setshowandtell_script_limit_words] =
    useState()
  const [classLink, setclassLink] = useState()

  const [bookCoverImgUrl, setBookCoverImgUrl] = useState('')
  const [bookImgUrl, setBookImgUrl] = useState('')
  const [bookAudioUrl, setBookAudioUrl] = useState('')

  //All Reading Stories of this book
  function getReadingInfo(cN, rL, bN, sN) {
    var readingLevel = rL
    var bookNum = bN
    var storyNum = sN
    // var courseName = cN

    if (cN.indexOf('CourseA') !== -1) {
      var seriesName = 'Reading Triumphs'
      var Url =
        DB_CONN_URL +
        '/get-reading-story-Reading-Triumphs-same-textbook/' +
        seriesName +
        '&' +
        readingLevel
    }
    if (cN.indexOf('CourseB') !== -1) {
      var seriesName = 'Blackcat Series'
      var Url =
        DB_CONN_URL +
        '/get-reading-story-Blackcat/' +
        seriesName +
        '&' +
        readingLevel +
        '&' +
        storyNum
    }
    if (cN.indexOf('CourseZ') !== -1) {
      var seriesName = 'Oxford Reading Tree'
      var Url =
        DB_CONN_URL +
        '/get-reading-story-ORT/' +
        seriesName +
        '&' +
        readingLevel +
        '&' +
        bookNum +
        '&' +
        storyNum
    }
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setReadingListInfo(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  //All Shadowing Info of this Series
  function getShadowingInfo(shL) {
    // alert('shL' + shL)
    var shadowingLevel = shL
    var Url =
      DB_CONN_URL + '/get-movie-shadowing-info-same-level/' + shadowingLevel
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setShadowingListInfo(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  //All Phonics Info
  function getPhonicsInfo() {
    var Url = DB_CONN_URL + '/get-phonics-info'
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setPhonicsListInfo(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  //All Conversation Info
  function getConversationInfo() {
    var Url = DB_CONN_URL + '/get-conversation-info'
    // alert('Url:' + Url)

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)

          if (response.data.length > 0) {
            setConversationListInfo(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  //My conversationInfo

  // //無限ループしない
  // const bar2 = {}
  //SHADOWING INFO
  useEffect(() => {
    // if (localStorage.getItem('T_loginStatus') == 'true') {

    var subject = 'READING'
    var Url = DB_CONN_URL + '/get-hw-lesson/' + mbn + '&' + subject
    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)
          if (response.data.length > 0) {
            setDataInfo(response.data)
            // var splitString = myFun_getYoutubeID(response.data[0].youtubeURL)
            // setYoutubeID(splitString)
            // var youtubeIframeUrl =
            //   'https://www.youtube.com/embed/' + splitString
            // setYoutubeIframUrl(youtubeIframeUrl)
            setMainSubject(response.data[0].subject)
            setreadingLevel(response.data[0].readingLevel)
            setMainCourseName(response.data[0].courseName)
            // setshadowingLevel(response.data[0].shadowingLevel)
            // setmovieNum(response.data[0].movieNum)
            // setyoutubeURL(response.data[0].youtubeURL)
            setphonicsBigCourse(response.data[0].phonicsBigCourse)
            setphonicsLessonOrder(response.data[0].phonicsLessonOrder)
            setphonicsLessonTitle(response.data[0].phonicsLessonTitle)
            setphonicsBigCourse(response.data[0].phonicsBigCourse)
            setquestionBigCourse(response.data[0].questionBigCourse)
            setquestionLessonOrder(response.data[0].questionLessonOrder)

            setstoryNum(response.data[0].storyNum)
            const bci =
              'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Reading+Triumphs/' +
              response.data[0].readingLevel +
              '/img/' +
              response.data[0].readingLevel +
              '-Cover.png'
            setBookCoverImgUrl(bci)

            const bim =
              'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Reading+Triumphs/' +
              response.data[0].readingLevel +
              '/img/' +
              response.data[0].storyNum +
              '.png'
            setBookImgUrl(bim)

            const baudio =
              'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Reading/Reading+Triumphs/' +
              response.data[0].readingLevel +
              '/audio/' +
              response.data[0].audio1

            setBookAudioUrl(baudio)
            //Get Reading Info
            var cN = response.data[0].courseName
            var rL = response.data[0].readingLevel
            var bN = response.data[0].bookNum
            var sN = response.data[0].storyNum
            // alert('courseName' + response.data[0].courseName)
            getReadingInfo(cN, rL, bN, sN)
            // var shL = response.data[0].shadowingLevel
            // var mvN = response.data[0].movieNum
            // var leO = response.data[0].lessonOrder
            // var shT = response.data[0].shadowingTitle

            // getShadowingInfo(shL)

            var phLO = response.data[0].phonicsLessonOrder
            getPhonicsInfo(phLO)
            getConversationInfo()
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData2()
    // }
  }, [])

  useEffect(() => {
    // if (localStorage.getItem('T_loginStatus') == 'true') {

    var subject = 'SHADOWING'
    var Url = DB_CONN_URL + '/get-hw-lesson-shadowing/' + mbn + '&' + subject
    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)
          if (response.data.length > 0) {
            setDataShadowingInfo(response.data)
            var splitString = myFun_getYoutubeID(response.data[0].youtubeURL)
            setYoutubeID(splitString)
            setHomeworkIDShadowing(response.data[0].homework_id)
            var youtubeIframeUrl =
              'https://www.youtube.com/embed/' + splitString
            setYoutubeIframUrl(youtubeIframeUrl)
            setShadowingMaterial(response.data[0].material_sort)
            setshadowingLevel(response.data[0].shadowingLevel)
            setmovieNum(response.data[0].movieNum)
            setyoutubeURL(response.data[0].youtubeURL)

            var shL = response.data[0].shadowingLevel
            getShadowingInfo(shL)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData2()
    // }
  }, [])

  function saveHW() {
    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/New-HW-SET'

        axios
          .post(url, {
            mbn: mbn,
            main_course_subject: mainSubject,
            mian_course_name: mainCourseName,
            homework_id_main: homeworkIdMaincourse,
            homework_id_shadow: homeworkIdShadowing,
            maincourse_autoid: selectedMainCourseHW,
            shadowing_material: shadowingMaterial,
            shadowing_autoid: selectedShadowingHW,
            phonics_autoid: selectedPhonicsHW,
            conversation_autoid: selectedConversationHW,
          })
          .then((response) => {
            alert('Saved!')
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <center>
        <div className="row pt-4" style={{ backgroundColor: 'white' }}>
          <div className="col-lg-12 col-md-12">
            <h1 style={{ fontSize: '25px', fontWeight: '600' }}>
              HOMEWORK SETTING <br />
              <span
                className="btn btn-danger mt-2"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  saveHW()
                }}
              >
                <b>CLICK THIS BUTTON TO SET THE NEXT HOMEWORK</b>
                <br />
                このボタンを押して次の課題を設定する
              </span>
              {/* <br />
              main_course_name: {mainCourseName} <br />
              main_course_subject: {mainSubject} <br />
              maincourse_autoid:{selectedMainCourseHW} <br />
              <br />
              shadowing_autoid:{selectedShadowingHW}
              <br />
              phonics_autoid:
              {selectedPhonicsHW}
              <br />
              conversation_autoid:{selectedConversationHW}
              <p>mainid:{homeworkIdMaincourse}</p>
              <p>shid:{homeworkIdShadowing}</p>
              <p>setShadowingMaterial:{shadowingMaterial}</p> */}
            </h1>
            <p style={{ color: 'red' }}>
              課題設定は必ずレッスンが終わってから行って下さい。レッスンの途中で課題を設定するとレッスンページが次の課題に変わります。
            </p>
            {dataInfo?.map((val, key) => {
              return (
                <>
                  <table
                    className="table table-bordered"
                    style={{
                      width: '80%',
                      // border: '1px solid #dedede',
                      // borderRadius: '10px',
                    }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">{mainSubject}</th>
                        <th scope="col">SHADOWING</th>
                        <th scope="col">PHONICS</th>
                        <th scope="col">CONVERSATION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row" style={{ width: '20%' }}>
                          {/* {selectedMainCourseHW} */}
                          <select
                            style={{ width: '250px' }}
                            onChange={(e) => {
                              setSelectedMainCourseHW(e.target.value)
                            }}
                          >
                            {readingListInfo?.map((val2, key2) => {
                              return (
                                <option
                                  selected={
                                    readingLevel == val2.readingLevel &&
                                    storyNum == val2.storyNum &&
                                    'selected'
                                  }
                                  value={val2.autoid}
                                >
                                  {readingLevel == val2.readingLevel &&
                                    storyNum == val2.storyNum &&
                                    '[TODAY]'}
                                  &nbsp;{val2.storyNum}&nbsp;[{val2.storyTitle}]
                                </option>
                              )
                            })}
                          </select>
                        </th>
                        <td style={{ width: '40%' }}>
                          {' '}
                          {/* {selectedShadowingHW} */}
                          <select
                            style={{ width: '250px' }}
                            onChange={(e) => {
                              setSelectedShadowingHW(e.target.value)
                            }}
                          >
                            {shadowingListInfo?.map((val2, key2) => {
                              return (
                                <option
                                  selected={
                                    shadowingLevel == val2.shadowingLevel &&
                                    movieNum == val2.movieNum &&
                                    youtubeURL == val2.youtubeURL &&
                                    'selected'
                                  }
                                  value={val2.autoid}
                                >
                                  {shadowingLevel == val2.shadowingLevel &&
                                    movieNum == val2.movieNum &&
                                    youtubeURL == val2.youtubeURL &&
                                    '[TODAY]'}
                                  &nbsp;[{key2 + 1}]&nbsp;
                                  {val2.shadowingTitle}
                                </option>
                              )
                            })}
                          </select>
                        </td>
                        <td style={{ width: '40%' }}>
                          {/* {selectedPhonicsHW} */}
                          <select
                            style={{ width: '250px' }}
                            onChange={(e) => {
                              setSelectedPhonicsHW(e.target.value)
                            }}
                          >
                            {phonicsListInfo?.map((val2, key2) => {
                              return (
                                <option
                                  selected={
                                    phonicsLessonOrder == val2.lessonOrder &&
                                    'selected'
                                  }
                                  value={val2.autoid}
                                >
                                  {phonicsLessonOrder == val2.lessonOrder &&
                                    '[TODAY]'}
                                  &nbsp;{val2.lessonOrder}&nbsp; &nbsp;[
                                  {val2.phonicsTitle}]
                                </option>
                              )
                            })}
                          </select>{' '}
                        </td>
                        <td>
                          {' '}
                          {/* {selectedConversationHW} */}
                          <select
                            style={{ width: '250px' }}
                            onChange={(e) => {
                              setSelectedConversationHW(e.target.value)
                            }}
                          >
                            {conversationListInfo?.map((val2, key2) => {
                              return (
                                <option
                                  selected={
                                    questionLessonOrder == val2.lessonOrder &&
                                    'selected'
                                  }
                                  value={val2.autoid}
                                >
                                  {questionLessonOrder == val2.lessonOrder &&
                                    '[TODAY]'}
                                  &nbsp;[{val2.questionCourse}]
                                  {val2.lessonOrder}
                                  &nbsp; &nbsp;[
                                  {val2.lessonTitle}]
                                </option>
                              )
                            })}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <img
                            src={bookCoverImgUrl}
                            className="mr-2 mb-3"
                            style={{
                              border: '4px solid #dedede',
                              width: '100px',
                              height: 'auto',
                            }}
                          />
                          <img
                            src={bookImgUrl}
                            className="mb-3"
                            style={{
                              border: '4px solid #dedede',
                              width: '100px',
                              height: 'auto',
                            }}
                          />
                        </th>
                        <td>
                          {' '}
                          <iframe
                            width="300"
                            height="200"
                            src={youtubeIframUrl}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            style={{
                              border: '1px 0.0001em solid',
                              borderRadius: '10px',
                            }}
                          ></iframe>
                        </td>
                        <td>
                          <p>
                            終了後も、もう一度やりたい場合は上記のリストから設定をしてください。
                          </p>
                          {/* {phonicsLessonTitle == 'Finished[終了]' ||
                            (phonicsBigCourse == '' && (
                              <p>
                                Finished[終了]
                                <br />
                                もう一度やりたい場合は上記のリストから設定をしてください。
                              </p>
                            ))} */}
                        </td>
                        <td>
                          <p>
                            終了後も、もう一度やりたい場合は上記のリストから設定をしてください。
                          </p>
                          {/* {conversationQuestionCourse == 'Finished' && (
                            <p>
                              Finished[終了]
                              <br />
                              もう一度やりたい場合は上記のリストから設定をしてください。
                            </p>
                          )} */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )
            })}
          </div>
        </div>
      </center>
    </>
  )
}

export default ViewSetHW
