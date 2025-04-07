// CSS quiz_big_design.css
import react, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'
import Router, { useRouter } from 'next/router'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import dynamic from 'next/dynamic'
import Link from 'next/link'
const ModalVideo = dynamic(import('react-modal-video'))
const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

function DiscussionVideoList() {
  const [display, setDisplay] = useState(false)
  const inputRef = useRef()
  //get값이 넘어왔을 경우
  const { query } = useRouter()
  const cN = query.cN //courseName
  const cS = query.cS //courseSelf
  const sB = query.sB //subject
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const [myMbn, setMyMbn] = useState('')
  const router = useRouter() //使い方：router.replace('/')

  //初期設定
  const [course, setCourse] = useState('Input_Course')
  const [courseSelf, setCourseSelf] = useState(cS)
  const [courseName, setCourseName] = useState(cN) //self-CourseA, self-CourseB, self-CourseZ
  const [textbook, setTextbook] = useState('')
  // const [textbook, setTextbook] = useState('English Listening Power')
  const [courseLevel, setCourseLevel] = useState('')
  //SUBJECT
  const [thisSubject, setThisSubject] = useState(sB)
  // const [test_group, setTest_group] = useState('1') //同じレベルの中で何番目のテストなのか
  const [HWID, setHWID] = useState('') //homework_idを入れる
  const [practiceTempId, setPracticeTempId] = useState('')
  const [eikenLevel, setEikenLevel] = useState('')
  const [userName, setUserName] = useState('')
  const [pageView, setPageView] = useState('menu')

  //最低何回練習しないといけないのか(DBから持ってくる) for Reading Course
  // const [leastRecordCount_ondoku, setLeastRecordCount_ondoku] = useState()
  // const [leastRecordCount_shadowing, setLeastRecordCount_shadowing] = useState()
  // const [lessonOrder, setLessonOrder] = useState()
  // const [point, setPoint] = useState(0)
  // const [totalQuestion, setTotalQuestion] = useState(0)
  // const [audioOnOff, setAudioOnOff] = useState('on')
  // const [shadowingLevel, setShadowingLevel] = useState('')
  // const [storyStartPage, setStoryStartPage] = useState('')

  // const [movieNum, setMovieNum] = useState('')
  // const [youtubeURL, setYoutubeURL] = useState('')
  // const [shadowingTitle, setShadowingTitle] = useState('')
  // const [youtubeID, setYoutubeID] = useState()
  // const [dictationStart, setDictationStart] = useState('')
  // const [dictationSec, setDictationSec] = useState('')
  // const [shadowingHWAmount, setShadowingHWAmount] = useState('')
  // const [shadowingSpeed, setShadowingSpeed] = useState('')
  // const [dictationHow, setDictationHow] = useState('')
  // const [qrLinkVideoDictation, setQrLinkVideoDictation] = useState('')
  // const [audioDuration, setAudioDuration] = useState()

  const [tedData, setTedData] = useState([])
  let logOut = () => {
    // setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
    localStorage.removeItem('userName', '')
    localStorage.removeItem('cbn', '')
    localStorage.removeItem('bbn', '')
    localStorage.removeItem('memberSort', '')
    //console.log('bar reload', loginStatus)
    Router.replace('/loginGroup')
  }
  // useEffect(() => {
  //   if (!cN || cN == '') {
  //     logOut()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (
  //     localStorage.getItem('loginStatus') !== 'true' ||
  //     !localStorage.getItem('loginStatus')
  //   ) {
  //     alert('先にログインしてください。')
  //     router.push('/loginGroup/')
  //   }
  // }, [G_loginStatus])

  useEffect(() => {
    setDisplay(true)
  }, [])

  //Discussion 課題を設定
  function goToDiscussionHwSet() {
    var mbn = localStorage.getItem('MypageMbn')
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-discussion-info-first-page/'
        var Url = url + mbn
        const response = await axios.get(Url)
        if (response.data.message == 'no data') {
          router.push('/discussVideoSet')
        }
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }

    fetchData2()
  }
  useEffect(() => {
    goToDiscussionHwSet()
  }, [])

  //search
  const [videoLevel, setVideoLevel] = useState('Elementary')
  const [searchWord, setSearchWord] = useState()

  useEffect(() => {
    getTedVideoList()
  }, [searchWord == ''])
  useEffect(() => {
    getTedVideoList()
  }, [videoLevel])

  function getTedVideoList() {
    // alert(youtubeID)

    var url = DB_CONN_URL + '/get-ted-video-list/'
    var Url = url + videoLevel

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        if (response.data.response.length > 0) {
          setTedData(response.data.response)
        }
      } catch (error) {
        alert('error')
      }
    }
    fetchData()
  }

  function getSearchFunc() {
    if (searchWord !== '') {
      var url = DB_CONN_URL + '/get-ted-video-search/'
      var Url = url + searchWord + '&' + videoLevel
    } else {
      var url = DB_CONN_URL + '/get-ted-video-search/'
      var Url = url + videoLevel
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        if (response.data.response.length > 0) {
          setTedData(response.data.response)
        } else {
          setTedData([])
        }
      } catch (error) {
        alert('error')
      }
    }
    fetchData()
  }

  //popup video
  const [isOpen, setIsOpen] = useState(true)
  const [clickedVideoID, setClickedVideoID] = useState()
  const openModal = () => {
    setIsOpen(!isOpen)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getSearchFunc()
      // 원하는 동작 수행, 예: 입력된 값을 처리하거나 상태를 초기화
      // 예시: setInputValue(''); // input 폼을 비웁니다.
    }
  }

  const handleChooseVideo = (videoTitle, videoId) => {
    NextLessonDate(videoTitle, videoId)
  }

  function NextLessonDate(videoTitle, videoId) {
    // setIsFinishThisLesson(false)
    // setIsLeaveEarly(false)
    // setIsNoShow(false)
    // setIsModifyThisLesson(false)
    // alert(subject)
    var mbn = localStorage.getItem('MypageMbn')

    var mainSubject = 'DISCUSSION'
    var Url = DB_CONN_URL + '/NEXT-LESSON-DATE-FOR-EVERYWEEK-VER2'

    const fetchData = async () => {
      try {
        axios
          .post(Url, {
            mbn: mbn,
            mainSubject: mainSubject,
          })
          .then((response) => {
            // alert(response.data.message)
            alert(
              'Checkする次の曜日のDate/nextLessonDate: ' +
                response.data.nextLessonDate
            )
            alert('weekday:' + response.data.now_weekday)
            // alert('now_weekday: ' + response.data.now_weekday)
            // alert('rightNextWeekdate: ' + response.data.rightNextWeekdate)
            var nextLessonDate = response.data.nextLessonDate

            var Url = DB_CONN_URL + '/reg-discussion-hw'

            axios
              .post(Url, {
                mbn: mbn,
                // clickedVideoID: clickedVideoID,
                clickedVideoID: videoId,
                nextLessonDate: nextLessonDate,
                videoTitle: videoTitle,
              })
              .then((response) => {
                if (response.data.status) {
                  alert('redirect')
                  router.push('/mytopGroup')
                } else {
                  alert(response.data.message)
                }
              })
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 p-2 text-center">
            <h2>DISCUSSION COURSE VIDEO MATERIALS</h2>
          </div>
          <div
            className="col-lg-12 col-md-12 p-2 text-center"
            style={{ backgroundColor: '#FAD163' }}
          >
            <label>Level&nbsp;&nbsp;</label>
            <select
              onChange={(e) => {
                setVideoLevel(e.target.value), getTedVideoList()
              }}
              style={formSelectStyle}
            >
              <option
                value="All Level"
                selected={videoLevel == 'All Level' && 'selected'}
              >
                All Level
              </option>
              <option
                value="Elementary"
                selected={videoLevel == 'Elementary' && 'selected'}
              >
                Elementary〜Middle School程度
              </option>
              <option
                value="Middle School"
                selected={videoLevel == 'Middle School' && 'selected'}
              >
                Middle School〜High School程度
              </option>
              <option
                value="High School"
                selected={videoLevel == 'High School' && 'selected'}
              >
                High School〜Adult
              </option>
            </select>
            {/* {searchYear} */}&nbsp;&nbsp;
            <input
              style={formInputStyle}
              type="text"
              ref={inputRef}
              placeholder="Search Word...."
              value={searchWord}
              onClick={() => setSearchWord('')}
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={(e) => getSearchFunc()}
              style={{
                fontSize: '20px',
                padding: '8px',
                backgroundColor: '#FA9A63',
                width: '200px',
                color: '#000',
              }}
            >
              <FaSearch size="20px" />
              検索する
            </button>
            <br />
          </div>

          <div className="col-lg-12 col-md-12 p-2 text-center">
            <div style={galleryStyle}>
              {tedData?.map((val, key) => {
                var videoId = myFun_getYoutubeID(val.youtubeURL)

                var thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`

                return (
                  <>
                    <div key={val.autoid} style={videoItemStyle}>
                      <hr
                        style={{ border: '1px dotted green', width: '100%' }}
                      />
                      <Link href="#play-video">
                        <img
                          src={thumbnailUrl}
                          alt={val.title}
                          style={videoItemImageStyle}
                          onClick={(e) => {
                            e.preventDefault()
                            setClickedVideoID(videoId)
                            openModal(videoId)
                          }}
                        />
                      </Link>
                      <div>
                        <button
                          className="btn-sm btn-info"
                          style={{ width: '100%', marginBottom: 0 }}
                          onClick={() => {
                            handleChooseVideo(val.title, videoId)
                          }}
                        >
                          choose this video
                        </button>
                      </div>
                      <div style={videoItemLevelStyle}>
                        [{val.courseLevel}]<font color="red">[{val.time}]</font>
                      </div>
                      <div style={videoItemTitleStyle}>{val.title}</div>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* If you want to change the video need to update videoID */}
      {display ? (
        <ModalVideo
          channel="youtube"
          isOpen={!isOpen}
          videoId={clickedVideoID}
          onClose={() => setIsOpen(!isOpen)}
        />
      ) : (
        ''
      )}
    </>
  )
}

// 갤러리 스타일
const galleryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
  padding: '20px',
}

// 비디오 아이템 스타일
const videoItemStyle = {
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

// 비디오 아이템 이미지 스타일
const videoItemImageStyle = {
  width: '80%', // 이미지가 컨테이너를 꽉 채우도록
  height: 'auto', // 비율을 유지하면서 높이 조정
  borderRadius: '5%',
  border: '1px solid #dedede',
}

// 비디오 아이템 제목 스타일
const videoItemTitleStyle = {
  width: '90%',
  marginTop: '0px',
  fontWeight: '600',
  fontSize: '20px',
  lineHeight: '1em',
}

// 비디오 아이템 레벨 스타일
const videoItemLevelStyle = {
  width: '90%',
  marginTop: '0px',
  fontWeight: '600',
  fontSize: '20px',
  color: 'blue',
}

//form Input Style
const formInputStyle = {
  width: '300px',
  padding: '5px',
  fontWeight: '600',
  fontSize: '20px',
}
const formSelectStyle = {
  // width: '200px',
  padding: '7px',
  fontWeight: '600',
  fontSize: '20px',
}

export default DiscussionVideoList
