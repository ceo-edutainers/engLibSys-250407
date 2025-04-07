import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import YoutubeScriptTimeInsertForShadowing from '@/components/Youtube/YoutubeScriptTimeInsertForShadowing'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import RndHomeworkShadowing from '@/components/Output_ShowAndTell/RndHomeworkShadowing'
const ViewShadowing = ({ mbn, tbn }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [englibLevelAllInfo, setEnglibLevelAllInfo] = useState([])
  const [levelView, setLevelView] = useState(false) //IdeaView
  const [englibLevel, setEnglibLevel] = useState()
  const [courseLevel, setCourseLevel] = useState()
  const [textBookName, setTextBookName] = useState()

  const [homeworkID, setHomeworkID] = useState()
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [shadowingInfo, setShadowingInfo] = useState([])
  const [movieNum, setMovieNum] = useState()
  const [youtubeURL, setYoutubeURL] = useState()
  const [youtubeID, setYoutubeID] = useState()
  const [lessonOrder, setLessonOrder] = useState()
  const [dictationHow, setDictationHow] = useState()
  const [dictationStart, setDictationStart] = useState()
  const [dictationSec, setDictationSec] = useState()
  const [shadowingSpeed, setShadowingSpeed] = useState()

  const [shadowingLevel, setShadowingLevel] = useState()

  const [tutorNameEng, setTutorNameEng] = useState()

  const [shadowingTitle, setShadowingTitle] = useState()

  useEffect(() => {
    // if (localStorage.getItem('T_loginStatus') == 'true') {
    var Url = DB_CONN_URL + '/get-hw-shadowing-lesson/' + mbn
    // alert('Url' + Url)
    // console.log('###Url', Url)
    // const fetchData2 = async () => {
    //   try {
    axios.get(Url).then((response) => {
      // alert('response.data' + response.data)
      // if (response.data.length > 0) {
      // alert(response.data.length)
      console.log('response.data2', response.data)
      setShadowingInfo(response.data)
      // setNameEng(response.data[0].name_eng)
      setTutorNameEng(response.data[0].teacher_name)
      setHomeworkID(response.data[0].homework_id)

      setMovieNum(response.data[0].movieNum)
      setYoutubeURL(response.data[0].youtubeURL)
      var yID = myFun_getYoutubeID(response.data[0].youtubeURL)
      setYoutubeID(yID)
      setLessonOrder(response.data[0].lessonOrder)
      setDictationHow(response.data[0].dictationHow)
      setDictationStart(response.data[0].dictation_start)
      setDictationSec(response.data[0].dictationSec)
      setShadowingSpeed(response.data[0].shadowing_speed)
      setShadowingTitle(response.data[0].shadowingTitle)
      setShadowingLevel(response.data[0].shadowingLevel)
      // }
    })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // fetchData2()
    // }
  }, [mbn])

  // useEffect(() => {
  //   var url = DB_CONN_URL + '/get-englib-level-info'

  //   const fetchData1 = async () => {
  //     try {
  //       // alert('here')
  //       axios.get(url).then((response) => {
  //         // alert('level-status2' + response.data.status)
  //         setEnglibLevelAllInfo(response.data.response)
  //         console.log('englibLevelAllInfo', englibLevelAllInfo)
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData1()
  // }, [])

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}

      <center>
        {/* <span
          style={{
            // width: '100%',

            fontSize: '18px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#F9EBEA',
            marginTop: '20px',
            marginBottom: '15px',
            color: 'black',
            fontWeight: '600',
            border: '1px solid #FCD2CF',
          }}
        >
          <button
            className="btn-sm btn-info"
            onClick={() => {
              setLevelView(!levelView)
              // handleClear()
            }}
            style={{ width: '150px' }}
          >
            SHADOWING
          </button>
        </span> */}

        <div className="col-lg-12 col-md-12 mb-0 mt-0">
          {homeworkID && <RndHomeworkShadowing homework_id={homeworkID} />}

          {shadowingInfo?.map((val, key) => {
            return (
              <>
                <span
                  style={{
                    // backgroundColor: 'white',
                    padding: '10px',
                    fontWeight: 'bold',
                    fontSize: '13px',
                  }}
                >
                  [{val.shadowingLevel}]
                </span>
                <span
                  style={{
                    // backgroundColor: 'white',
                    padding: '10px',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  {val.shadowingTitle}
                </span>
                &nbsp;
                <br />
                {/* <b>今回のシャドーイング課題の量&nbsp;</b> */}
                <b>The shadowing amount for this homework :&nbsp;</b>
                <span
                  style={{
                    fontSize: '20px',
                    color: 'red',
                    fontWeight: 'bold',
                    // textDecorationLine: 'underline',
                    // textDecorationThickness: '3px',
                    // textDecorationColor: 'red',
                  }}
                >
                  {val.shadowingHWAmount != ''
                    ? val.shadowingHWAmount
                    : '課題の量が設定されてないです。管理者へお問合せください。'}
                </span>
              </>
            )
          })}

          {shadowingInfo && (
            <YoutubeScriptTimeInsertForShadowing
              // yID={youtubeURL}

              yID={youtubeID}
              homework_id={homeworkID}
              shadowingSpeed={shadowingSpeed}
              dictationStart={dictationStart}
              dictationSecond={dictationSec}
              mbn={mbn}
              tbn={tbn}
              teacher_name={tutorNameEng}
              shdaowingLevel={shadowingLevel}
            />
          )}
        </div>
      </center>
    </>
  )
}

export default ViewShadowing
