import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'
import { FaPause, FaPlay } from 'react-icons/fa'
import RndHomeworkShadowing from '@/components/Output_ShowAndTell/RndHomeworkShadowing'

import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})
import EditorShadowingScript from '@/components/Output_ShowAndTell/EditorShadowingScript'
import WordListTedScript from '@/components/WordList/WordListTedScript' //単語リスト
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faTrash,
  faPause,
} from '@fortawesome/free-solid-svg-icons'

export default function YoutubeScriptTimeInsertForShadowing({
  yID,
  homework_id,
  mbn,
  tbn,
  teacher_name,
  shadowingSpeed,
  dictationStart,
  dictationSecond,
  shdaowingLevel,
}) {
  //const [youtubeID, setYoutubeID] = useState(youtubeID)
  const DB_CONN_URL = process.env.DB_CONN_URL
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

  //無限ループしない
  const bar2 = {}
  useEffect(() => {
    getCourseShadowing()
  }, [homework_id])

  function getCourseShadowing() {
    // console.log('newLesson', newLesson)
    if (localStorage.getItem('T_loginStatus') == 'true') {
      var Url = DB_CONN_URL + '/get-hw-main-course-shadowing/' + homework_id
      // alert(Url)
      const fetchData2 = async () => {
        try {
          axios.get(Url).then((response) => {
            // alert('length' + response.data.length)
            console.log('###test', homework_id)
            if (response.data.length > 0) {
              // alert(response.data)
              setHwInfo(response.data)
            }
          })
        } catch (error) {
          // alert('error1' + error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }

  //無限ループしない
  const bar = {}

  useEffect(() => {
    getYoutubeTimeScript()
    // }, [])
  }, [yID])

  function getYoutubeTimeScript() {
    const fetchData = async () => {
      let newUrl = 'https://www.youtube.com/embed/' + yID + '&cc_load_policy=0'
      setUrl(newUrl)

      var Url = DB_CONN_URL + '/get-youtube-time-script/' + yID

      try {
        // await axios.get(Url).then((response) => {
        const response = await axios.get(Url)

        if (response.data.length > 0) {
          setYoutubeList(response.data)
        }
        // console.log(response.data)
        // console.log('setYoutubeList', youtubeList)
        // console.log('response.data', response.data)
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }

  function handleChange(url) {
    //setInputValue(url)
    //alert(url)

    setUrl(url)
    setPlayStatus(true)
  }

  function handlePause() {
    setPlayStatus(false)
  }

  function handleStart() {
    setPlayStatus(true)
    setPauseState(false)
  }

  function handleLoop(value) {
    if (playLoop != true) {
      // alert(playLoop)
      setPlayLoop(value)
      setLabelColorLoop('Looping...')
      setBtnColorLoop('btn btn-dark text-white ml-2 mr-2')
    } else {
      setPlayLoop(value)
      setLabelColorLoop('No Loop')
      setBtnColorLoop('btn btn-light border border-dark ml-2 mr-2')
    }
  }

  //checked script save

  const [scriptChecked, setScriptChecked] = useState([])

  function scriptCheckboxDelete(scriptToDelete) {
    setScriptChecked(
      scriptChecked.filter((val) => {
        return val !== scriptToDelete
      })
    )
  }

  function handleWordClick(word) {
    //db-table: sys_memory_word
    // alert(tbn)
    var Url =
      DB_CONN_URL +
      '/insert-memory-word-from-teacher/' +
      word +
      '&' +
      homework_id +
      '&' +
      mbn +
      '&' +
      tbn

    const fetchData2 = async () => {
      try {
        const response = await axios.get(Url)
      } catch (error) {
        alert(error)
      }
    }
    //wordListView()
    fetchData2()

    //alert('Registered Successfully!')
  }
  const changeShadowingSpeed = (val) => {
    var shadowingSp = val
    setShadowingSp(shadowingSp)
    var url = DB_CONN_URL + '/change-shadowing-speed/'
    axios.get(url + mbn + '&' + shadowingSp).then((response) => {
      alert('set shadowing speed to ' + val)
    })
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

  useEffect(() => {
    // function funcSplitInfo() {
    //  console.log('SplitHWbookInfo:', SplitHWbookInfo)
    youtubeList.map((val, key) => {
      // console.log('AAAA:', key + 1)
      checkDicFinished(key + 1)
    })
    // }
  }, [youtubeList])

  function checkDicFinished(thisSentenceOrder) {
    const fetchData = async () => {
      var mbn = localStorage.getItem('mbn')
      // var dictationStatus = 'completed-FeelsWrong'
      try {
        var url = DB_CONN_URL + '/check-video-dictation-history-completed'
        // alert(mbn)
        // alert(homework_id)
        // alert(yID)
        // alert(thisSentenceOrder)
        axios
          .post(url, {
            mbn: mbn,
            homework_id: homework_id,
            sentenceOrder: thisSentenceOrder,
            youtubeID: yID,
          })
          .then((response) => {
            setThisRightAnswerAru((thisRightAnswerAru) => [
              ...thisRightAnswerAru,
              response.data.message,
            ])
            // console.log(
            //   'BBBB:' + thisSentenceOrder + '/' + response.data.message
            // )
          })
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }

  return (
    <>
      {/* <div className="row"> */}
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
          <div className="col-lg-6 mb-2 pt-3">
            <ReactPlayer
              url={url}
              // url="https://youtu.be/3jmp5yF5rYM"
              playing={playStatus}
              //textTracks={false}
              controls={true}
              playbackRate={playbackRate}
              // loop={playLoop}
              //textTracks={subTitleStatus}
              volume={null}
              width="100%"
              height="400px"
              //contentWindow="false"
              style={{ marginBottom: '10px' }}
              onReady={() => {
                // console.log('onReady')
              }}
              onStart={() => {
                // console.log('onStart')
              }}
              onPause={() => {
                // console.log('onPause')
              }}
              onEnded={() => {
                // console.log('onEnded')
              }}
              onError={() => {
                // console.log('onError')
              }}
            />
            <div className="col-lg-12">
              <center>
                <span
                  className="mr-2"
                  style={{ fontWeight: 'bold', color: 'red' }}
                >
                  {' '}
                  for the next h.w &#9654;
                </span>

                <span className="mr-2" style={{ fontWeight: 'bold' }}>
                  Shadowing Speed:&nbsp;
                  <select
                    onChange={(e) => {
                      changeShadowingSpeed(e.target.value)
                    }}
                  >
                    <option
                      value="0.8"
                      selected={shadowingSpeed == '0.8' && 'selected'}
                    >
                      x 0.8
                    </option>
                    <option
                      value="0.9"
                      selected={shadowingSpeed == '0.9' && 'selected'}
                    >
                      x 0.9
                    </option>
                    <option
                      value="1"
                      selected={shadowingSpeed == '1' && 'selected'}
                    >
                      x 1
                    </option>
                    <option
                      value="1.1"
                      selected={shadowingSpeed == '1.1' && 'selected'}
                    >
                      x 1.1
                    </option>
                    <option
                      value="1.2"
                      selected={shadowingSpeed == '1.2' && 'selected'}
                    >
                      x 1.2
                    </option>
                    <option
                      value="1.3"
                      selected={shadowingSpeed == '1.3' && 'selected'}
                    >
                      x 1.3
                    </option>
                    <option
                      value="1.4"
                      selected={shadowingSpeed == '1.4' && 'selected'}
                    >
                      x 1.4
                    </option>
                    <option
                      value="1.5"
                      selected={shadowingSpeed == '1.5' && 'selected'}
                    >
                      x 1.5
                    </option>
                  </select>
                </span>
                <span className="mr-2" style={{ fontWeight: 'bold' }}>
                  &nbsp; Dictation:&nbsp;
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
                  <span className="mr-2" style={{ fontWeight: 'bold' }}>
                    &nbsp; Dictation Length:&nbsp;
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
                {/* {!pauseState ? (
                  <a
                    className="btn btn-danger text-white mr-2"
                    onClick={() => {
                      handlePause()
                      setPauseState(true)
                    }}
                  >
                    <FaPause />
                  </a>
                ) : (
                  <a
                    className="btn btn-danger mr-2 text-white"
                    onClick={() => {
                      handleStart()
                      setPauseState(false)
                    }}
                  >
                    <FaPause />
                  </a>
                )} */}
              </center>
            </div>

            <div className="col-lg-12">
              {playbackRate == 0.8 ? (
                <a
                  className="btn btn-danger m-2"
                  onClick={() => {
                    setPlaybackRate(0.8)
                    handleStart()
                  }}
                >
                  x0.8
                </a>
              ) : (
                <a
                  className="btn btn-light border border-1-dark m-2"
                  onClick={() => {
                    setPlaybackRate(0.8)
                    handleStart()
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
                    handleStart()
                  }}
                >
                  x0.9
                </a>
              ) : (
                <a
                  className="btn btn-light border border-1-dark m-2"
                  onClick={() => {
                    setPlaybackRate(0.9)
                    handleStart()
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
                    handleStart()
                  }}
                >
                  x1
                </a>
              ) : (
                <a
                  className="btn btn-light border border-1-dark m-2"
                  onClick={() => {
                    setPlaybackRate(1)
                    handleStart()
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
                    handleStart()
                  }}
                >
                  x1.1
                </a>
              ) : (
                <a
                  className="btn btn-light border border-1-dark m-2"
                  onClick={() => {
                    setPlaybackRate(1.1)
                    handleStart()
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
                    handleStart()
                  }}
                >
                  x1.2
                </a>
              ) : (
                <a
                  className="btn btn-light border border-1-dark m-2"
                  onClick={() => {
                    setPlaybackRate(1.2)
                    handleStart()
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
                    handleStart()
                  }}
                >
                  x1.3
                </a>
              ) : (
                <a
                  className="btn btn-light border border-1-dark m-2"
                  onClick={() => {
                    setPlaybackRate(1.3)
                    handleStart()
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
                    handleStart()
                  }}
                >
                  x1.4
                </a>
              ) : (
                <a
                  className="btn btn-light border border-1-dark m-2"
                  onClick={() => {
                    setPlaybackRate(1.4)
                    handleStart()
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
            </div>
          </div>
          <div
            className="col-lg-6 mb-2 pt-0"
            style={{
              textAlign: 'left',
              padding: 0,
              margin: 0,
              overflow: 'scroll',
              height: '540px',
            }}
          >
            {/* {yID} */}
            {yID && teacher_name && tbn && shdaowingLevel && homework_id && (
              <EditorShadowingScript
                yID={yID}
                teacher_name={teacher_name}
                tbn={tbn}
                shdaowingLevel={shdaowingLevel}
                homework_id={homework_id}
              />
            )}
          </div>
        </div>
      </div>

      {/* <div className="row"> */}

      <div
        className="col-lg-12  mb-1 text-left"
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
        <div className="pt-5">
          {scriptChecked.map((val, key) => {
            var videoTime = val.startTimeSec.split(':')

            var min_first = videoTime[0].charAt(0)
            if (min_first == 0) {
              var sec_1 = videoTime[0].charAt(1) * 60
            } else {
              var sec_1 = videoTime[0] * 60
            }

            var sec_first = videoTime[1].charAt(0)
            if (sec_first == 0) {
              var sec_2 = videoTime[1].charAt(1)
            } else {
              var sec_2 = videoTime[1]
            }

            var sec = parseFloat(sec_1) + parseFloat(sec_2)

            //endtime
            if (val.endTimeSec != '') {
              var videoTimeEnd = val.endTimeSec.split(':')

              var min_first2 = videoTimeEnd[0].charAt(0)
              if (min_first2 == 0) {
                var secend_1 = videoTimeEnd[0].charAt(1) * 60
              } else {
                var secend_1 = videoTimeEnd[0] * 60
              }

              var sec_first2 = videoTimeEnd[1].charAt(0)
              if (sec_first2 == 0) {
                var secend_2 = videoTimeEnd[1].charAt(1)
              } else {
                var secend_2 = videoTimeEnd[1]
              }
              // var secEnd = parseInt(secend_1) + parseInt(secend_2)
              var secEnd = parseFloat(secend_1) + parseFloat(secend_2)
            }
            var rand = 1 + Math.random() * (1000000 - 1)

            // var url =
            //   'https://www.youtube.com/embed/' +
            //   val.youtubeID +
            //   '?start=' +
            //   sec +
            //   '&a=' +
            //   rand

            var url =
              'https://www.youtube.com/embed/' +
              val.youtubeID +
              '?start=' +
              sec +
              '?end=' +
              secEnd +
              '&a=' +
              rand

            return (
              <>
                <div className="containers">
                  <div className="row">
                    <div className="col-lg-12 text-left mb-1 mt-0">
                      <table style={{ width: '100%' }}>
                        <tr>
                          <td style={{ width: '20px' }}>
                            <a
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setScriptChecked(
                                  scriptChecked.filter((value) => {
                                    return value.autoid !== val.autoid
                                  })
                                )
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                size="1x"
                                color="red"
                              />
                            </a>
                          </td>
                          <td style={{ width: 'auto' }}>
                            <a
                              id={val.autoid}
                              onClick={() => {
                                handleChange(url)
                                setPauseState(false)
                              }}
                              style={{
                                backgroundColor: 'lightskyblue',
                                cursor: 'pointer',

                                height: '30px',
                                fontSize: '20px',
                              }}
                            >
                              <span style={{ color: 'red' }}>[{val.time}]</span>
                              &nbsp;
                              <span style={{ color: 'black' }}>
                                {val.script}
                              </span>
                            </a>
                            &nbsp; &nbsp;
                            <a
                              style={{
                                cursor: 'pointer',
                                color: 'darkblue',
                                paddingTop: '0px',
                                fontSize: '20px',
                              }}
                              onClick={() => {
                                handlePause()
                                setPauseState(true)
                              }}
                            >
                              <FontAwesomeIcon icon={faPause} color="blue" />
                            </a>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        <div className="row">
          <div className="col-lg-12 text-left mb-5 mt-1">
            [00:00]&nbsp;
            <a
              style={{
                border: 0,
                backgroundColor: '#ececec',
                marginBottom: '10px',
                color: 'red',
                fontWeight: '900',
                cursor: 'pointer',
                fontSize: '18px',
              }}
              onClick={() => {
                handleChange(
                  'https://www.youtube.com/embed/' +
                    yID +
                    '&start=0' +
                    '&cc_load_policy=0'
                )

                setPauseState(false)
              }}
              //href={url}
            >
              Beginning of the Video
            </a>
            {/* <div
              className="col-lg-12 col-md-6 mb-2 ml-0 pl-0"
              style={{
                // position: 'fixed',
                // top: '80px',
                // width: '1200px',
                textAlign: 'right',
                // marginTop: 500,
                marginBottom: 0,
                paddingBottom: 0,
                marginRight: 0,
                // marginLeft: 400,
                paddingRight: 0,
                paddingLeft: 0,
                // zIndex: 1,
                // backgroundColor: 'white',
              }}
            > */}
            <input
              className="form-control-md ml-4 mr-1"
              style={{ width: '200px' }}
              ref={inputRef}
              type="text"
              value={searchWord}
              placeholder="Word Search for Video..."
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
            {/* <a
              style={{ width: '15%', cursor: 'pointer', color: 'white' }}
              className="btn-sm btn-danger"
              onClick={() => {
                handleWordClick(searchWord)
              }}
            >
              add word
            </a> */}
            {/* </div> */}
            <hr style={{ border: '0.001em solid #BAB8B2' }} />
            <center>
              <span
                style={{
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
              The number of sentence that your student finished
              dictation&nbsp;&nbsp;
              <span
                style={{
                  // fontSize: '32px',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  padding: '8px',
                  // background: '#fff',
                  background: 'red',
                  border: '2px solid #666',
                  color: 'red',
                  textAlign: 'center',
                  font: '20px Arial, sans-serif',
                  verticalAlign: 'baseline',
                }}
              >
                01
              </span>{' '}
              The number of sentence that your student could not understand
              after listening multiple times.
            </center>
            <hr />
            <div
              style={{
                width: '100%' /* 원하는 너비로 설정 */,
                height: '500px' /* 원하는 높이로 설정 */,
                overflowY: 'scroll' /* 세로 스크롤을 추가 */,
                border: '1px solid #ccc' /* 경계선 추가 (선택 사항) */,
              }}
            >
              {youtubeList
                .filter((val) => {
                  if (searchWord == '') {
                    return val //everything data
                  } else if (
                    val.script.toLowerCase().includes(searchWord.toLowerCase())
                  ) {
                    return val
                  }
                })
                .map((val, key) => {
                  var newScript = val.script

                  //word highlight
                  var sWord = searchWord
                  if (sWord) {
                    var script = val.script.toString()

                    var pattern = new RegExp('(' + sWord + ')', 'gi')
                    var newScript = script.replace(
                      pattern,
                      '<mark>' + sWord + '</mark>'
                    )
                  }
                  var videoTime = val.startTimeSec.split(':')

                  var min_first = videoTime[0].charAt(0)
                  if (min_first == 0) {
                    var sec_1 = videoTime[0].charAt(1) * 60
                  } else {
                    var sec_1 = videoTime[0] * 60
                  }

                  var sec_first = videoTime[1].charAt(0)
                  if (sec_first == 0) {
                    var sec_2 = videoTime[1].charAt(1)
                  } else {
                    var sec_2 = videoTime[1]
                  }

                  // var sec = parseInt(sec_1) + parseInt(sec_2)
                  var sec = parseFloat(sec_1) + parseFloat(sec_2)
                  var rand = 1 + Math.random() * (1000000 - 1)

                  //endtime
                  if (val.endTimeSec != '') {
                    var videoTimeEnd = val.endTimeSec.split(':')

                    var min_first2 = videoTimeEnd[0].charAt(0)
                    if (min_first2 == 0) {
                      var secend_1 = videoTimeEnd[0].charAt(1) * 60
                    } else {
                      var secend_1 = videoTimeEnd[0] * 60
                    }

                    var sec_first2 = videoTimeEnd[1].charAt(0)
                    if (sec_first2 == 0) {
                      var secend_2 = videoTimeEnd[1].charAt(1)
                    } else {
                      var secend_2 = videoTimeEnd[1]
                    }
                    // var secEnd = parseInt(secend_1) + parseInt(secend_2)
                    var secEnd = parseFloat(secend_1) + parseFloat(secend_2)
                  }
                  // var url =
                  //   'https://www.youtube.com/embed/' +
                  //   val.youtubeID +
                  //   '?start=' +
                  //   sec +
                  //   '&a=' +
                  //   rand +
                  //   '&cc_load_policy=0'
                  var fileNum = parseInt(key + 1)
                  if (fileNum < 10) {
                    var fileNumCicle = '0' + fileNum
                  } else {
                    var fileNumCicle = fileNum
                  }

                  var url =
                    'https://www.youtube.com/embed/' +
                    val.youtubeID +
                    '?start=' +
                    sec +
                    '?end=' +
                    secEnd +
                    '&a=' +
                    rand +
                    '&cc_load_policy=0'

                  var fileNum = parseInt(key + 1)
                  if (fileNum < 10) {
                    var fileNumCicle = '0' + fileNum
                  } else {
                    var fileNumCicle = fileNum
                  }
                  var num = key + 1
                  var raWrong = num + 'completed-FeelsWrong'
                  var ra = num + 'completed'
                  if (thisRightAnswerAru.indexOf(raWrong) > -1) {
                    var roundColor = 'red'
                    var fontColor = 'white'
                  } else if (thisRightAnswerAru.indexOf(ra) > -1) {
                    var roundColor = '#17a2b8'
                    var fontColor = 'white'
                  } else {
                    var roundColor = 'white'
                    var fontColor = '#666'
                  }

                  return (
                    <>
                      <div className="row">
                        <div className="col-lg-4 text-left mb-1 mt-2">
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
                          &nbsp; &nbsp;&nbsp; [{val.startTimeSec}]-[
                          {val.endTimeSec}]&nbsp; &nbsp;&nbsp;
                          {/* <input
                            type="checkbox"
                            value={val.autoid}
                            style={{
                              width: '20px',
                              height: '20px',
                              verticalAlign: 'middle',
                            }}
                            onClick={(e) => {
                              if (e.target.checked) {
                                setScriptChecked((scriptChecked) => [
                                  ...scriptChecked,
                                  {
                                    autoid: val.autoid,
                                    youtubeID: val.youtubeID,
                                    time: val.time,
                                    startTimeSec: val.startTimeSec,
                                    endTimeSec: val.endTimeSec,
                                    script: val.script,
                                  },
                                ])
                              } else {
                                //delete item
                                setScriptChecked(
                                  scriptChecked.filter((value) => {
                                    return value.autoid !== val.autoid
                                  })
                                )
                              }
                            }}
                          /> */}
                        </div>
                        <div className="col-lg-8 text-left mb-1 mt-1">
                          &nbsp;&nbsp; &nbsp;
                          {/* <span
                          className="btn"
                          style={{
                            backgroundColor: '#fffaf0',
                            fontSize: '12px',
                            padding: '2px',
                            width: '20px',
                            border: '1px solid #fffaf0',
                            borderRadius: '10px',
                            color: 'gray',
                          }}
                        >
                          X
                        </span>
                        &nbsp;&nbsp; */}
                          <input
                            type="checkbox"
                            value={val.autoid}
                            style={{
                              width: '20px',
                              height: '20px',
                              verticalAlign: 'middle',
                            }}
                            onClick={(e) => {
                              if (e.target.checked) {
                                setScriptChecked((scriptChecked) => [
                                  ...scriptChecked,
                                  {
                                    autoid: val.autoid,
                                    youtubeID: val.youtubeID,
                                    time: val.time,
                                    startTimeSec: val.startTimeSec,
                                    endTimeSec: val.endTimeSec,
                                    script: val.script,
                                  },
                                ])
                              } else {
                                //delete item
                                setScriptChecked(
                                  scriptChecked.filter((value) => {
                                    return value.autoid !== val.autoid
                                  })
                                )
                              }
                            }}
                          />
                          <span
                            type="text"
                            // value={newScript}
                            dangerouslySetInnerHTML={{ __html: newScript }}
                            value="html"
                            id="search_para"
                            style={{
                              width: '70%',
                              border: 0,
                              // backgroundColor: 'white',
                              marginBottom: '0px',
                              paddingLeft: '10px',
                              color: 'navy',
                              fontSize: '18px',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              handleChange(url)
                              setPauseState(false)
                            }}
                          />
                          <hr style={{ border: '0.001em solid #BAB8B2' }} />
                        </div>
                      </div>
                    </>
                  )
                })}
            </div>
          </div>
          {/* <div
            className="col-lg-6 text-left mb-1 mt-1"
            style={{
              backgroundColor: 'white',
              overflow: 'scroll',
              height: '1000px',
            }}
          >
            {hwInfo.map((val, key) => {
              var imgSrc =
                'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' +
                val.fileName
              return (
                <>
                  {' '}
                  <p>
                    <img src={imgSrc} />
                  </p>
                </>
              )
            })}
          </div> */}
          {/* <RndHomeworkShadowing homework_id={homework_id} /> */}
        </div>
      </div>
    </>
  )
}
