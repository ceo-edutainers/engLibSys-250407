import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import BookShadowingForTutorPage from '@/components/Youtube/BookShadowingForTutorPage'
// import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import RndHomeworkShadowing from '@/components/Output_ShowAndTell/RndHomeworkShadowing'
const ViewShadowing = ({ mbn, tbn, teacher_name }) => {
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

  const [shadowingTitle, setShadowingTitle] = useState()

  const [seriesName, setSeriesName] = useState()
  const [bookTitle, setBookTitle] = useState()
  const [bookNum, setBookNum] = useState()
  const [storyNum, setStoryNum] = useState()
  const [storyTitle, setStoryTitle] = useState()

  useEffect(() => {
    var Url = DB_CONN_URL + '/get-hw-shadowing-lesson/' + mbn
    // alert(Url)
    axios.get(Url).then((response) => {
      console.log('response.data2', response.data)
      setShadowingInfo(response.data)
      console.log('test:', response.data)
      setHomeworkID(response.data[0].homework_id)

      // setMovieNum(response.data[0].movieNum)
      // setYoutubeURL(response.data[0].youtubeURL)
      // var yID = myFun_getYoutubeID(response.data[0].youtubeURL)
      // setYoutubeID(yID)
      //       seriesName:English Power
      // bookTitle:Power Listening in English
      // bookNum:bookNum
      // storyNum:storyNum
      // storyTitle:storyTitle
      setSeriesName(response.data[0].seriesName)
      setBookTitle(response.data[0].bookTitle)
      setBookNum(response.data[0].bookNum)
      setStoryNum(response.data[0].storyNum)
      setStoryTitle(response.data[0].storyTitle)

      // setLessonOrder(response.data[0].lessonOrder)
      setDictationHow(response.data[0].dictationHow)
      setDictationStart(response.data[0].dictation_start)
      setDictationSec(response.data[0].dictationSec)
      setShadowingSpeed(response.data[0].shadowing_speed)
      setShadowingTitle(response.data[0].shadowingTitle)
      // }
    })
  }, [mbn])

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

        <div className="col-lg-12 col-md-12">
          {homeworkID && dictationHow == 'Handwriting' && (
            <>
              <RndHomeworkShadowing homework_id={homeworkID} />
            </>
          )}
          {shadowingInfo?.map((val, key) => {
            return (
              <>
                <span
                  style={{
                    // backgroundColor: 'white',
                    padding: '10px',
                    fontWeight: 'bold',
                    fontSize: '15px',
                  }}
                >
                  [{val.bookNum}-{val.storyNum}]&nbsp;{val.bookTitle}
                  &nbsp;|&nbsp;
                  {val.storyTitle}
                </span>
                &nbsp;
                <br />
                {/* <b>今回のシャドーイング課題の量&nbsp;</b> */}
                <b>
                  <b>The shadowing amount for this homework :&nbsp;</b>
                </b>
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
                  All
                  {/* {val.shadowingHWAmount != '' ? val.shadowingHWAmount : 'All'} */}
                </span>
              </>
            )
          })}

          <br />
          {shadowingInfo &&
            teacher_name &&
            homeworkID &&
            mbn &&
            tbn &&
            bookTitle &&
            bookNum &&
            storyNum &&
            storyTitle && (
              <>
                {/* {homeworkID}/{shadowingSpeed}/{dictationStart}/{dictationSec}/
              {bookTitle}/{bookNum}/{storyNum}/{storyTitle}/{dictationHow} */}
                <BookShadowingForTutorPage
                  // yID={youtubeURL}

                  // yID={youtubeID}
                  homework_id={homeworkID}
                  shadowingSpeed={shadowingSpeed}
                  dictationStart={dictationStart}
                  dictationSecond={dictationSec}
                  mbn={mbn}
                  tbn={tbn}
                  teacher_name={teacher_name}
                  bookTitle={bookTitle}
                  bookNum={bookNum}
                  storyNum={storyNum}
                  storyTitle={storyTitle}
                  dictationHow={dictationHow}
                />
              </>
            )}
        </div>
      </center>
    </>
  )
}

export default ViewShadowing
