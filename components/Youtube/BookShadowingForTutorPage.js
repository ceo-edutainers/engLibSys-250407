import React, { useEffect, useState, useRef, useMemo } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { FaPause, FaPlay } from 'react-icons/fa'
import RndHomeworkShadowing from '@/components/Output_ShowAndTell/RndHomeworkShadowing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})
import TextareaAutosize from 'react-textarea-autosize'
import ReactAudioPlayer from 'react-audio-player'
import EditorBookShadowingScript from '@/components/Output_ShowAndTell/EditorBookShadowingScript'
import WordListTedScript from '@/components/WordList/WordListTedScript' //単語リスト
import { faEye } from '@fortawesome/free-solid-svg-icons'

// import { Media, Player, controls } from 'react-media-player'
// const { PlayPause, MuteUnmute } = controls

export default function BookShadowingForTutorPage({
  homework_id,
  mbn,
  tbn,
  teacher_name,
  shadowingSpeed,
  dictationStart,
  dictationSecond,
  bookTitle,
  bookNum,
  storyNum,
  storyTitle,
  dictationHow,
}) {
  //const [youtubeID, setYoutubeID] = useState(youtubeID)
  const DB_CONN_URL = process.env.DB_CONN_URL

  const [seriesName, setSeriesName] = useState()
  // const [bookTitle, setBookTitle] = useState()
  // const [bookNum, setBookNum] = useState()
  // const [storyNum, setStoryNum] = useState()
  // const [storyTitle, setStoryTitle] = useState()

  const [isAudioPlaying, setIsAudioPlaying] = useState(false) //Main Storyの音声がPlayされたらtrueになる。必ず音声を聴きながらやるページで必要

  const [pauseState, setPauseState] = useState(true)
  //const [inputValue, setInputValue] = useState('')
  const [dictationSt, setDictationSt] = useState(dictationStart)
  const [dictationSec, setDictationSec] = useState(dictationSecond)
  const [shadowingSp, setShadowingSp] = useState(shadowingSpeed)
  const [playStatus, setPlayStatus] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [subTitleStatus, setSubTitleStatus] = useState(false)
  //for Loop Button
  const [playLoop, setPlayLoop] = useState(true)
  const [labelColorLoop, setLabelColorLoop] = useState('Looping...')
  const [btnColorLoop, setBtnColorLoop] = useState(
    'btn btn-dark text-white ml-2 mr-2'
  )
  const [speedBar, setSpeedBar] = useState(1)

  //for filtering
  const inputRef = useRef()
  const [searchWord, setSearchWord] = useState('')

  const [checkedboxClear, setCheckedboxClear] = useState('')

  const [youtubeList, setYoutubeList] = useState([])
  const [url, setUrl] = useState()
  const [hwInfo, setHwInfo] = useState([])
  const [thisRightAnswerAru, setThisRightAnswerAru] = useState([])
  const [thisAllAnswer, setThisAllAnswer] = useState([])

  const [viewSentence, setViewSentence] = useState(false)
  const [viewNum, setViewNum] = useState('')

  const [bookAudioUrl, setBookAudioUrl] = useState()

  const [SplitHWbookInfo, setSplitHWbookInfo] = useState([])

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-and-Shadowing-info/'
        var Url = url + mbn
        const response = await axios.get(Url)
        // setHWID(response.data[0].homework_id)
        // setCourseLevel(response.data[0].shdaowingLevel)
        // setBookStory(response.data[0].story)
        // infoSplit(
        //   response.data[0].bookTitle,
        //   response.data[0].bookNum,
        //   response.data[0].storyNum
        // )
        // getBookScript(
        //   response.data[0].bookTitle,
        //   response.data[0].bookNum,
        //   response.data[0].storyNum
        // )

        setSeriesName(response.data[0].seriesName)
        // setBookTitle(response.data[0].bookTitle)
        // setBookNum(response.data[0].bookNum)
        // setStoryNum(response.data[0].storyNum)
        // setStoryTitle(response.data[0].storyTitle)
        var fStage = localStorage.getItem('nowStep')

        // const baudio =
        //   'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Shadowing/' +
        //   response.data[0].seriesName +
        //   '/' +
        //   response.data[0].bookTitle +
        //   '/audio/' +
        //   response.data[0].audio_all

        const baudio =
          'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Shadowing/' +
          response.data[0].seriesName +
          '/' +
          bookTitle +
          '/audio/' +
          response.data[0].audio_all

        setBookAudioUrl(baudio)
      } catch (error) {
        alert('error8' + error)

        console.log(error)
      }
    }

    fetchData2()

    // }
  }, [mbn])

  // useEffect(() => {
  //   getBookScript()
  //   // }, [])
  // }, [seriesName])

  // useEffect(() => {
  //   infoSplit()
  // }, [bookTitle != '', bookNum != '', storyNum != ''])

  // function infoSplit(bookTitle, bookNum, storyNum) {
  //   // const fetchData = async () => {

  //     try {
  //       var url = DB_CONN_URL + '/get-hw-and-Shadowing-info-split2/'
  //       var Url = url + bookTitle + '&' + bookNum + '&' + storyNum
  //       alert(Url)
  //       const response = await axios.get(Url)

  //       setSplitHWbookInfo(response.data.result)

  //       var splitInfo = []
  //       splitInfo = response.data.result

  //       splitInfo.map((val, key) => {
  //         console.log('A:', val.sentenceOrder)
  //         splitDataRightCheck(val.sentenceOrder)
  //       })
  //     } catch (error) {
  //       alert('error3:' + error)
  //       console.log(error)
  //     }

  // }

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [id, setId] = useState(0)
  // function infoSplit(bookTitle, bookNum, storyNum) {
  useEffect(() => {
    var url = DB_CONN_URL + '/get-hw-and-Shadowing-info-split2/'
    var Url = url + bookTitle + '&' + bookNum + '&' + storyNum

    const fetchData = async () => {
      // setError(false)
      // setLoading(true)

      try {
        const response = await axios.get(Url)

        setSplitHWbookInfo(response.data.result)
        // console.log('test2-url:', Url)
        console.log('test1:', response.data.result)

        var splitInfo = []
        splitInfo = response.data.result

        splitInfo.map((val, key) => {
          console.log('A:', val.sentenceOrder)
          splitDataRightCheck(val.sentenceOrder)
        })
        // funcSplitInfo()
      } catch (error) {
        console.log(error)
        alert('error3' + error)
        // setError(true)
      }

      // setLoading(false)
    }

    fetchData()
  }, [id])
  if (isError) return <h1>Error, try again!!!! </h1>
  if (isLoading) return <h1>Loading Page..........................</h1>

  const [movieInfo, setMovieInfo] = useState()
  const [movieInfoLength, setMovieInfoLength] = useState()

  // function getBookScript(bt, bn, sn) {
  useEffect(() => {
    const fetchData = async () => {
      // var bookTitle = bt
      // var bookNum = bn
      // var storyNum = sn

      try {
        var url = DB_CONN_URL + '/get-hw-and-Shadowing-book-script'
        await axios
          .post(url, {
            bookTitle,
            bookNum,
            storyNum,
          })
          .then((response) => {
            // alert('length' + response.data.length)
            if (response.data.length > 0) {
              setMovieInfo(response.data.response)
              console.log('setMovieInfo', response.data)
              setMovieInfoLength(response.data.length)
            }
          })
      } catch (error) {
        alert('error4')
      }
    }
    fetchData()
    // }
  }, [bookTitle])
  // const [id, setId] = useState(0)

  // const splitDataRightCheck = (thisSentenceOrder) => {
  //   const fetchData = async () => {
  //     try {
  //       var HWID = homework_id
  //       var url =
  //         DB_CONN_URL + '/get-hw-and-Shadowing-info-split-right-answer-check/'
  //       var Url =
  //         url +
  //         bookTitle +
  //         '&' +
  //         bookNum +
  //         '&' +
  //         storyNum +
  //         '&' +
  //         HWID +
  //         '&' +
  //         thisSentenceOrder

  //       const response = await axios.get(Url)
  //       // alert('1')
  //       // alert(response.data.message)

  //       setThisRightAnswerAru((thisRightAnswerAru) => [
  //         ...thisRightAnswerAru,
  //         response.data.message,
  //       ])
  //       alert('3')
  //       console.log('B:' + thisSentenceOrder + '/' + response.data.message)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  //   // console.log('run')
  // }

  // const splitDataRightCheck = (thisSentenceOrder) => {
  function splitDataRightCheck(thisSentenceOrder) {
    const fetchData = async () => {
      var HWID = homework_id
      try {
        var url =
          DB_CONN_URL + '/get-hw-and-Shadowing-info-split-right-answer-check/'
        var Url =
          url +
          bookTitle +
          '&' +
          bookNum +
          '&' +
          storyNum +
          '&' +
          HWID +
          '&' +
          thisSentenceOrder

        await axios.get(Url).then((response) => {
          setThisRightAnswerAru((thisRightAnswerAru) => [
            ...thisRightAnswerAru,
            response.data.message,
          ])
        })
      } catch (error) {
        alert(error)
        console.log(error)
      }
      fetchData()
    }
  }
  const [scriptChecked, setScriptChecked] = useState([])

  function scriptCheckboxDelete(scriptToDelete) {
    setScriptChecked(
      scriptChecked.filter((val) => {
        return val !== scriptToDelete
      })
    )
  }

  const changeShadowingSpeed = (val) => {
    alert("can't change speed for the book shadowing.")
    // var shadowingSp = val
    // setShadowingSp(shadowingSp)
    // var url = DB_CONN_URL + '/change-shadowing-speed/'
    // axios.get(url + mbn + '&' + shadowingSp).then((response) => {
    //   alert('set shadowing speed to ' + val)
    // })
  }
  const changeDicStart = (val) => {
    var dictationStatus = val
    setDictationSt(dictationStatus)
    var url = DB_CONN_URL + '/change-dictation-start/'

    axios.get(url + mbn + '&' + dictationStatus).then((response) => {
      getCourseShadowing()
      alert('set dictation to ' + val)
    })
  }
  const changeDictationSec = (val) => {
    var dictationSec = val
    setDictationSec(dictationSec)
    // alert(dictationSec)
    // alert(mbn)
    var url = DB_CONN_URL + '/change-dictation-sec/'
    axios.get(url + mbn + '&' + dictationSec).then((response) => {
      alert('set dictation length to ' + val)
    })
  }

  // useEffect(() => {
  //   youtubeList?.map((val, key) => {
  //     console.log('AAAA:', key + 1)
  //     checkDicFinished(key + 1)
  //   })
  //   // }
  // }, [youtubeList])

  // function checkDicFinished(thisSentenceOrder) {
  //   const fetchData = async () => {
  //     var mbn = localStorage.getItem('mbn')
  //     // var dictationStatus = 'completed-FeelsWrong'
  //     try {
  //       var url =
  //         DB_CONN_URL + '/check-shadowing-book-dictation-history-completed'
  //       // alert(mbn)
  //       // alert(homework_id)
  //       // alert(yID)
  //       // alert(thisSentenceOrder)
  //       axios
  //         .post(url, {
  //           mbn: mbn,
  //           homework_id: homework_id,
  //           sentenceOrder: thisSentenceOrder,
  //           seriesName: seriesName,
  //           bookTitle: bookTitle,
  //           bookNum: bookNum,
  //           storyNum: storyNum,
  //         })
  //         .then((response) => {
  //           setThisRightAnswerAru((thisRightAnswerAru) => [
  //             ...thisRightAnswerAru,
  //             response.data.message,
  //           ])
  //           // alert(response.data.message)

  //           // console.log(
  //           //   'BBBB:' + thisSentenceOrder + '/' + response.data.message
  //           // )
  //         })
  //     } catch (error) {
  //       alert('error5:' + error)
  //     }
  //   }
  //   fetchData()
  // }

  useEffect(() => {
    checkDicGiveup()
  }, [mbn, homework_id])

  function checkDicGiveup() {
    const fetchData = async () => {
      var mbn = localStorage.getItem('mbn')
      try {
        var url = DB_CONN_URL + '/check-shadowing-book-dictation-history-all'
        // alert('homework_id' + homework_id)
        // alert('mbn' + mbn)

        axios
          .post(url, {
            mbn: mbn,
            homework_id: homework_id,
          })
          .then((response) => {
            setThisAllAnswer(response.data.response)
            // }

            console.log('CCCC:', response.data.response)
          })
      } catch (error) {
        alert('error6' + error)
      }
    }
    fetchData()
  }

  const [dictationInfo, setDictationInfo] = useState([])

  useEffect(() => {
    getDictationInfo()
    // }, [])
  }, [homework_id])

  function getDictationInfo() {
    // var mbn = localStorage.getItem('MypageMbn')

    var url = DB_CONN_URL + '/get-hw-and-Dictation-info/'
    var Url = url + homework_id
    // alert(Url)

    axios.get(Url).then((response) => {
      // alert(response.data.message)
      if (response.data.length) {
        setDictationInfo(response.data.response)
      } else {
        // alert(response.data.message)
      }
    })
  }

  return (
    <>
      {/* <div className="row"> */}
      <div className="col-lg-12">
        {/* {dictationInfo.length == 0 && <h1>Dictation課題してない</h1>}
        {dictationInfo?.map((val, key) => {
          return <>{val.sentence}</>
        })} */}
      </div>
      <div
        className="col-lg-12 col-md-12 mb-2 pt-3"
        style={{
          // position: 'fixed',
          // top: '200px',
          // width: '750px',
          // zIndex: 1,
          backgroundColor: '#dedede',
          border: '1px solid #dedede',
          textAlign: 'center',
        }}
      >
        <div className="row">
          <div className="col-lg-6 mb-2 pt-3 mb-5 text-left">
            {/* <b>
              {bookTitle}/{bookNum}/{storyNum}/{bookAudioUrl}
            </b> */}

            <div className="col-lg-12 mt-2 mb-2 text-left">
              <span className="mr-5" style={{ fontWeight: 'bold' }}>
                Shadowing Speed&nbsp;&nbsp;
                <select
                  onChange={(e) => {
                    changeShadowingSpeed(e.target.value)
                  }}
                >
                  <option
                    value="1"
                    selected={shadowingSpeed == '1' && 'selected'}
                  >
                    x 1
                  </option>
                </select>
              </span>
              <span>
                &nbsp; Dictation: &nbsp;&nbsp;
                <select
                  onChange={(e) => {
                    changeDicStart(e.target.value)
                  }}
                >
                  <option
                    value="ok"
                    selected={dictationStart == 'ok' && 'selected'}
                  >
                    OK
                  </option>
                  <option
                    value="no"
                    selected={dictationStart == 'no' && 'selected'}
                  >
                    NO
                  </option>
                </select>
              </span>
              {(dictationSt == 'ok' || dictationStart == 'ok') && (
                <span>
                  Length：
                  <select
                    onChange={(e) => {
                      changeDictationSec(e.target.value)
                    }}
                  >
                    <option>select</option>
                    <option
                      value="30s"
                      selected={dictationSecond == '1m' && 'selected'}
                    >
                      30s
                    </option>
                    <option value="1m">1m</option>
                    <option
                      value="1m 30s"
                      selected={dictationSecond == '1m 30s' && 'selected'}
                    >
                      1m 30s
                    </option>
                    <option
                      value="2m"
                      selected={dictationSecond == '2m' && 'selected'}
                    >
                      2m
                    </option>
                    <option
                      value="2m 30s"
                      selected={dictationSecond == '2m 30s' && 'selected'}
                    >
                      2m 30s
                    </option>
                    <option
                      value="3m"
                      selected={dictationSecond == '3m' && 'selected'}
                    >
                      3m
                    </option>
                    <option
                      value="3m 30s"
                      selected={dictationSecond == '3m 30s' && 'selected'}
                    >
                      3m 30s
                    </option>
                    <option
                      value="4m"
                      selected={dictationSecond == '4m' && 'selected'}
                    >
                      4m
                    </option>
                    <option
                      value="all"
                      selected={dictationSecond == 'all' && 'selected'}
                    >
                      All Script
                    </option>
                  </select>
                </span>
              )}
              {playStatus != true && (
                <>
                  {/* <a
              className="btn btn-danger text-white ml-2 mr-2"
              onClick={() => {
                handleStart()
              }}
            >
              <FaPlay />
            </a> */}
                </>
              )}
            </div>
            <hr />
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <center>
                  {bookAudioUrl && (
                    <>
                      <ReactPlayer
                        url={bookAudioUrl}
                        // controls={true}
                        playbackRate={playbackRate}
                        // loop={playLoop}
                        // playbackRate={1.4}

                        //textTracks={subTitleStatus}
                        volume={null}
                        top="0"
                        left="0"
                        width="100%"
                        height="30px"
                        padding="0px"
                        marginTop="0"
                        style={
                          {
                            // border: '1px solid #ececec',
                          }
                        }
                        onReady={() => {
                          console.log('onReady')
                        }}
                        onStart={() => {
                          console.log('onStart')
                        }}
                        onPause={() => {
                          setPlayStatus(false)
                          console.log('onPause')
                        }}
                        onEnded={() => {
                          setPlayStatus(false)
                          console.log('onEnded')
                        }}
                        onError={() => {
                          console.log('onError')
                        }}
                      />
                    </>
                  )}

                  <br />

                  {playbackRate == 0.8 ? (
                    <a
                      className="btn btn-danger m-2"
                      onClick={() => {
                        setPlaybackRate(0.8)
                      }}
                    >
                      x0.8
                    </a>
                  ) : (
                    <a
                      className="btn btn-light border border-1-dark m-2"
                      onClick={() => {
                        setPlaybackRate(0.8)
                      }}
                    >
                      x0.8
                    </a>
                  )}
                  {playbackRate == 0.9 ? (
                    <a
                      className="btn btn-danger m-2"
                      onClick={() => {
                        setPlaybackRate(0.9)
                      }}
                    >
                      x0.9
                    </a>
                  ) : (
                    <a
                      className="btn btn-light border border-1-dark m-2"
                      onClick={() => {
                        setPlaybackRate(0.9)
                      }}
                    >
                      x0.9
                    </a>
                  )}
                  {playbackRate == 1 ? (
                    <a
                      className="btn btn-danger m-2"
                      onClick={() => {
                        setPlaybackRate(1)
                      }}
                    >
                      x1
                    </a>
                  ) : (
                    <a
                      className="btn btn-light border border-1-dark m-2"
                      onClick={() => {
                        setPlaybackRate(1)
                      }}
                    >
                      x1
                    </a>
                  )}
                  {playbackRate == 1.1 ? (
                    <a
                      className="btn btn-danger m-2"
                      onClick={() => {
                        setPlaybackRate(1.1)
                      }}
                    >
                      x1.1
                    </a>
                  ) : (
                    <a
                      className="btn btn-light border border-1-dark m-2"
                      onClick={() => {
                        setPlaybackRate(1.1)
                      }}
                    >
                      x1.1
                    </a>
                  )}

                  {playbackRate == 1.2 ? (
                    <a
                      className="btn btn-danger m-2"
                      onClick={() => {
                        setPlaybackRate(1.2)
                      }}
                    >
                      x1.2
                    </a>
                  ) : (
                    <a
                      className="btn btn-light border border-1-dark m-2"
                      onClick={() => {
                        setPlaybackRate(1.2)
                      }}
                    >
                      x1.2
                    </a>
                  )}
                  {playbackRate == 1.3 ? (
                    <a
                      className="btn btn-danger m-2"
                      onClick={() => {
                        setPlaybackRate(1.3)
                      }}
                    >
                      x1.3
                    </a>
                  ) : (
                    <a
                      className="btn btn-light border border-1-dark m-2"
                      onClick={() => {
                        setPlaybackRate(1.3)
                      }}
                    >
                      x1.3
                    </a>
                  )}
                  {playbackRate == 1.4 ? (
                    <a
                      className="btn btn-danger m-2"
                      onClick={() => {
                        setPlaybackRate(1.4)
                      }}
                    >
                      x1.4
                    </a>
                  ) : (
                    <a
                      className="btn btn-light border border-1-dark m-2"
                      onClick={() => {
                        setPlaybackRate(1.4)
                      }}
                    >
                      x1.4
                    </a>
                  )}
                  {playbackRate == 1.5 ? (
                    <a
                      className="btn btn-danger m-2"
                      onClick={() => {
                        setPlaybackRate(1.5)
                      }}
                    >
                      x1.5
                    </a>
                  ) : (
                    <a
                      className="btn btn-light border border-1-dark m-2"
                      onClick={() => {
                        setPlaybackRate(1.5)
                      }}
                    >
                      x1.5
                    </a>
                  )}
                </center>
                <hr />
              </div>

              {SplitHWbookInfo &&
                movieInfoLength > 0 &&
                SplitHWbookInfo.map((val, key) => {
                  var fileNum = parseInt(key + 1)
                  const splitaudio =
                    'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Shadowing/' +
                    val.seriesName +
                    '/' +
                    val.bookTitle +
                    '/audio_split/' +
                    val.audio_per_sentence_head_wav +
                    val.storyNum.toLowerCase() +
                    '_' +
                    fileNum +
                    '.wav'
                  return (
                    <>
                      <div
                        className="col-lg-1 col-md-12 mb-1"
                        style={{ textAlign: 'right' }}
                      >
                        <span style={{ fontSize: '18px' }}>
                          {val.sentenceOrder}.
                        </span>
                      </div>
                      <div
                        className="col-lg-3 col-md-12  mb-1"
                        style={{ textAlign: 'left' }}
                      >
                        <ReactPlayer
                          url={splitaudio}
                          // controls={true}
                          playbackRate={playbackRate}
                          // loop={playLoop}
                          // playbackRate={1.4}

                          //textTracks={subTitleStatus}
                          volume={null}
                          top="0"
                          left="0"
                          width="100%"
                          height="30px"
                          padding="0px"
                          marginTop="0"
                          style={
                            {
                              // border: '1px solid #ececec',
                            }
                          }
                          onReady={() => {
                            console.log('onReady')
                          }}
                          onStart={() => {
                            console.log('onStart')
                          }}
                          onPause={() => {
                            setPlayStatus(false)
                            console.log('onPause')
                          }}
                          onEnded={() => {
                            setPlayStatus(false)
                            console.log('onEnded')
                          }}
                          onError={() => {
                            console.log('onError')
                          }}
                        />
                        {/* <ReactAudioPlayer
                        className=" mt-3"
                        src={splitaudio}
                        playbackRate={playbackRate}
                        // autoPlay

                        controls
                        onPlay={() => {
                          // alert('playing')
                          setIsAudioPlaying(true)
                        }}
                        onPause={() => {
                          // alert('paused')
                          setIsAudioPlaying(false)
                        }}
                        style={{
                          // backgroundColor: '#b0c4de',
                          // padding: '0',
                          width: '100px',
                          height: '30px',
                          marginTop: '20px',
                          marginBottom: 0,
                          // borderRadius: '10px',
                        }}
                      /> */}
                      </div>
                      <div
                        className="col-lg-8 col-md-12  mb-1"
                        style={{ textAlign: 'left' }}
                      >
                        <span
                          style={{
                            fontSize: '18px',
                          }}
                          dangerouslySetInnerHTML={{ __html: val.sentence }}
                        ></span>
                      </div>
                      <div
                        className="col-lg-12 col-md-12  mb-1"
                        style={{ textAlign: 'left' }}
                      >
                        <hr />
                      </div>
                    </>
                  )
                })}
            </div>
          </div>
          <div
            className="col-lg-6 mb-2 pt-3"
            style={{
              textAlign: 'left',
              padding: 0,
              margin: 0,
              overflow: 'scroll',
              height: '540px',
            }}
          >
            {seriesName && bookTitle && bookNum && storyNum && teacher_name && (
              <EditorBookShadowingScript
                mbn={mbn}
                tbn={tbn}
                teacher_name={teacher_name}
                homework_id={homework_id}
                seriesName={seriesName}
                bookTitle={bookTitle}
                bookNum={bookNum}
                storyNum={storyNum}
                storyTitle={storyTitle}
              />
            )}
          </div>
        </div>
      </div>

      {/* <div className="row"> */}
      {dictationHow == 'Typing' && (
        <>
          <div
            className="col-lg-12  mb-3 text-left"
            style={{
              // position: 'absolute',
              // top: '10px',
              marginTop: '0px',
              width: '100%',
              paddingLeft: 10,
              backgroundColor: '#dedede',
              // zIndex: -1,
            }}
          >
            <div className="row">
              <div className="col-lg-12 text-left mb-5 mt-1 pt-3">
                {/* <span
              style={{
                // fontSize: '32px',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                padding: '8px',
                // background: '#fff',
                background: '#17a2b8',
                border: '2px solid #666',
                color: '#17a2b8',
                textAlign: 'center',
                font: '20px Arial, sans-serif',
                verticalAlign: 'baseline',
              }}
            >
              01
            </span>{' '}
            The number of sentence that your student tried or finished
            dictation&nbsp;&nbsp; */}
                <input
                  className="form-control-md ml-2 mr-1"
                  style={{ width: '400px' }}
                  ref={inputRef}
                  type="text"
                  value={searchWord}
                  placeholder="Word Search in Showing Script..."
                  onChange={(e) => {
                    setSearchWord(e.target.value)
                  }}
                />
                <a
                  style={{ width: '15%', cursor: 'pointer', color: 'white' }}
                  className="btn-sm btn-primary mr-2"
                  onClick={() => {
                    setSearchWord('')
                  }}
                >
                  CLEAR
                </a>
                <hr />
                {SplitHWbookInfo &&
                  thisRightAnswerAru &&
                  SplitHWbookInfo.filter((val) => {
                    if (searchWord == '') {
                      return val //everything data
                    } else if (
                      val.sentence
                        .toLowerCase()
                        .includes(searchWord.toLowerCase())
                    ) {
                      return val
                    }
                  }).map((val, key) => {
                    var newScript = val.sentence

                    //word highlight
                    var sWord = searchWord
                    if (sWord) {
                      var script = val.sentence.toString()

                      var pattern = new RegExp('(' + sWord + ')', 'gi')
                      var newScript = script.replace(
                        pattern,
                        '<mark>' + sWord + '</mark>'
                      )
                    }

                    var fileNum = parseInt(key + 1)
                    if (fileNum < 10) {
                      var fileNumCicle = '0' + fileNum
                    } else {
                      var fileNumCicle = fileNum
                    }

                    var fileNum = parseInt(key + 1)
                    if (fileNum < 10) {
                      var fileNumCicle = '0' + fileNum
                    } else {
                      var fileNumCicle = fileNum
                    }
                    var num = key + 1
                    // var raWrong = num + 'Right Answer'
                    // var raWrong = num + 'give-up'
                    // console.log('raWrong', raWrong)
                    var ra = num + 'Right'

                    if (thisRightAnswerAru.indexOf(ra) > -1) {
                      var roundColor = '#17a2b8'
                      var fontColor = 'white'
                      console.log('###red')
                    } else {
                      console.log('###white')
                      var roundColor = 'white'
                      var fontColor = '#666'
                    }

                    // if (thisRightAnswerAru.indexOf(ra) > -1) {
                    //   var roundColor = 'red'
                    //   var fontColor = 'white'
                    // } else
                    // if (thisRightAnswerAru.indexOf(ra) > -1) {
                    //   var roundColor = '#17a2b8'
                    //   var fontColor = 'white'
                    // } else {
                    //   var roundColor = 'white'
                    //   var fontColor = '#666'
                    // }

                    var fileNum = parseInt(key + 1)
                    const splitaudio =
                      'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Shadowing/' +
                      val.seriesName +
                      '/' +
                      val.bookTitle +
                      '/audio_split/' +
                      val.audio_per_sentence_head_wav +
                      val.storyNum.toLowerCase() +
                      '_' +
                      fileNum +
                      '.wav'

                    newScript = newScript.trim()
                    var fileNum = parseInt(key + 1)
                    return (
                      <>
                        <div className="row">
                          <div
                            className="col-lg-1 text-right"
                            style={{ paddingTop: '55px' }}
                          >
                            <span
                              style={{
                                // fontSize: '32px',

                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                padding: '8px',
                                background: roundColor,
                                color: fontColor,
                                border: '2px solid #666',
                                // color: '#666',
                                textAlign: 'center',
                                font: '20px Arial, sans-serif',
                                verticalAlign: 'middle',
                              }}
                            >
                              {fileNumCicle}
                            </span>
                          </div>

                          <div className="col-lg-3 text-left mb-1 mt-1">
                            &nbsp;&nbsp;
                            {bookAudioUrl && (
                              <>
                                <ReactAudioPlayer
                                  className=" mt-3"
                                  src={splitaudio}
                                  playbackRate={playbackRate}
                                  // autoPlay

                                  // controls
                                  // onPlay={() => {
                                  //   // alert('playing')
                                  //   setIsAudioPlaying(true)
                                  // }}
                                  onPause={() => {
                                    // alert('paused')
                                    setIsAudioPlaying(false)
                                  }}
                                  style={{
                                    backgroundColor: '#b0c4de',
                                    padding: '15px',
                                    width: '100%',
                                    borderRadius: '10px',
                                  }}
                                />
                                <div>
                                  {' '}
                                  <span
                                    onClick={() => {
                                      setViewSentence(!viewSentence)
                                      setViewNum(fileNum)
                                    }}
                                    className="btn btn-info"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      size="1x"
                                      color="black"
                                    />{' '}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    border: 0,
                                    backgroundColor: 'white',
                                    marginBottom: '0px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    color: 'navy',
                                  }}
                                >
                                  {viewSentence && viewNum == fileNum && (
                                    <span
                                      type="text"
                                      // value={newScript}
                                      dangerouslySetInnerHTML={{
                                        __html: newScript,
                                      }}
                                      value="html"
                                      id="search_para"
                                      style={{
                                        border: 0,
                                        backgroundColor: 'white',
                                        marginBottom: '0px',
                                        paddingLeft: '10px',
                                        paddingRight: '10px',
                                        color: 'navy',
                                        fontSize: '18px',
                                      }}
                                    />
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="col-lg-8 text-left mb-1 mt-1">
                            {thisAllAnswer?.map((val2, key2) => {
                              if (val2.dictationStatus == 'give-up') {
                                var dictationStatusGiveup = '[GIVE UP]'
                                var bgcolor = '#F96053'
                              } else if (
                                val2.dictationStatus == 'Right Answer'
                              ) {
                                var dictationStatus = '[CORRECT]'
                                var bgcolor = '#4AE10E'
                              }
                              var your_sentence = val2.your_sentence.trim()
                              if (val2.sentenceOrder == val.sentenceOrder) {
                                if (val2.dictationStatus != '再開') {
                                  return (
                                    <>
                                      <table
                                        className="table"
                                        style={{ width: '100%' }}
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style={{
                                                textAlign: 'right',
                                                width: '15%',
                                              }}
                                            >
                                              {' '}
                                              <b>
                                                {dictationStatusGiveup && (
                                                  <span
                                                    style={{ color: 'red' }}
                                                  >
                                                    {dictationStatusGiveup}
                                                  </span>
                                                )}
                                                {dictationStatus && (
                                                  <span
                                                    style={{ color: 'green' }}
                                                  >
                                                    {dictationStatus}
                                                  </span>
                                                )}
                                              </b>
                                            </td>
                                            <td
                                              className="pl-3"
                                              style={{
                                                width: '85%',
                                                textAlign: 'left',
                                                backgroundColor: [bgcolor],
                                                paddingLeft: 0,
                                              }}
                                            >
                                              {dictationStatusGiveup && (
                                                <>
                                                  <span
                                                    style={{ color: 'white' }}
                                                  >
                                                    [original] {newScript}
                                                  </span>
                                                  <br />
                                                </>
                                              )}
                                              [student] {your_sentence}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </>
                                  )
                                }
                              }
                            })}

                            <hr style={{ border: '0.001em solid #BAB8B2' }} />
                          </div>
                        </div>
                      </>
                    )
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
