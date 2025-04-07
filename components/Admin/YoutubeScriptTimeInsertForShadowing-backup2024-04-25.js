import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'
import { FaPause, FaPlay } from 'react-icons/fa'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})

import WordListTedScript from '@/components/WordList/WordListTedScript' //単語リスト
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faTrash,
  faPause,
} from '@fortawesome/free-solid-svg-icons'

export default function YoutubeScriptTimeInsertForShadowing({ yID }) {
  //const [youtubeID, setYoutubeID] = useState(youtubeID)
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [pauseState, setPauseState] = useState(true)
  //const [inputValue, setInputValue] = useState('')

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

  const bar = {}

  useEffect(() => {
    getYoutubeTimeScript()
    // }, [])
  }, [yID])

  function getYoutubeTimeScript() {
    const fetchData = async () => {
      let newUrl =
        'https://www.youtube.com/embed/' +
        yID +
        '&cc_load_policy=0&cc_lang_pref=en'

      setUrl(newUrl)

      var Url = DB_CONN_URL + '/get-youtube-time-script/' + yID

      try {
        // await axios.get(Url).then((response) => {
        const response = await axios.get(Url)

        if (response.data.length > 0) {
          setYoutubeList(response.data)
        }
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
    // setPlaying(!playing) //追加コード
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
  const [changeScript, setChangeScript] = useState()

  function scriptCheckboxDelete(scriptToDelete) {
    setScriptChecked(
      scriptChecked.filter((val) => {
        return val !== scriptToDelete
      })
    )
  }

  // your function to copy here

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe)
      // alert('Copied')
    } catch (err) {
      alert('Failed to copy!')
    }
  }

  const changeScriptFun = (autoid) => {
    const fetchData = async () => {
      var tbn = localStorage.getItem('tbn')
      try {
        var url = DB_CONN_URL + '/update-sys-shadowing-script-time-from-admin'
        axios
          .post(url, {
            autoid: autoid,
            script: changeScript,
            tbn: tbn,
          })
          .then((response) => {
            // alert('successfully changed!')
            setChangeScript('')
          })
      } catch (error) {}
    }
    fetchData()
  }

  //センテンス別に再生する時

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState('00:00:00.000')

  const handlePlayPause = () => {
    setPlaying(!playing)
  }

  const handleStop = () => {
    setPlaying(false)
    // alert(`Current Time: ${currentTime}`)
  }

  const handleProgress = (state) => {
    // Format the time to HH:MM:SS.SSS
    const seconds = Math.floor(state.playedSeconds)
    const milliseconds = (state.playedSeconds % 1) * 1000
    const formattedTime =
      new Date(seconds * 1000).toISOString().substr(11, 8) +
      '.' +
      Math.floor(milliseconds).toString().padStart(3, '0')
    setCurrentTime(formattedTime)
  }

  return (
    <>
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
              url={url} // url="https://youtu.be/3jmp5yF5rYM"
              // playing={playStatus} //前のコード
              playing={playing}
              controls={true}
              playbackRate={playbackRate}
              // loop={playLoop}
              //textTracks={subTitleStatus}
              onProgress={handleProgress}
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
            <div>
              <button onClick={handlePlayPause}>
                {playing ? 'Pause' : 'Play'}
              </button>
              <button onClick={handleStop}>Stop</button>
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
            className="col-lg-6 mb-2 pt-3"
            style={{
              textAlign: 'left',
              padding: 0,
              margin: 0,
              overflow: 'scroll',
              height: '540px',
            }}
          >
            {/* <h1>
              WordListTedScript:yID:{yID}
              <br />
              hwid{homework_id}
            </h1> */}
            {/* {yID} */}

            {/* <WordListTedScript
              // youtubeID={yID}
              youtubeID={yID}
              homework_id={homework_id}
              mbn={mbn}
              tbn={tbn}
            /> */}
          </div>
        </div>
      </div>

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
                    <div className="col-lg-12 text-left mb-1 mt-1">
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
          <div
            className="col-lg-12 text-left mb-1 mt-1"
            style={{ height: '1000px', overflow: 'scroll' }}
          >
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
                    '&cc_load_policy=0&cc_lang_pref=en'
                )

                setPauseState(false)
              }}
              //href={url}
            >
              Beginning of the Video
            </a>
            <hr style={{ border: '0.001em solid #BAB8B2' }} />
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              生徒がDictationをしたセンテンスの番号は赤く表示されます。
            </p>
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
                  '&cc_load_policy=1&cc_lang_pref=en'

                return (
                  <>
                    <span
                      style={{
                        // fontSize: '32px',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        padding: '8px',
                        background: '#fff',
                        border: '2px solid #666',
                        color: '#666',
                        textAlign: 'center',
                        font: '20px Arial, sans-serif',
                        verticalAlign: 'baseline',
                      }}
                    >
                      {fileNumCicle}
                    </span>
                    &nbsp;&nbsp; &nbsp;&nbsp; [{val.startTimeSec}]-[
                    {val.endTimeSec}]&nbsp; &nbsp;&nbsp;
                    <input
                      type="checkbox"
                      value={val.autoid}
                      style={{
                        width: '17px',
                        height: '17px',
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
                    &nbsp;&nbsp;
                    <span
                      type="text"
                      // value={newScript}
                      // dangerouslySetInnerHTML={{ __html: newScript }}
                      // value="html"
                      id="search_para"
                      style={{
                        width: '70%',
                        border: 0,
                        // backgroundColor: 'white',
                        marginBottom: '0px',
                        paddingLeft: 'px',
                        color: 'navy',
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                      onClick={() => copyToClipBoard(val.script)}
                    >
                      {val.script}
                    </span>
                    <span
                      type="text"
                      // dangerouslySetInnerHTML={{ __html: newScript }}
                      // value="html"
                      id="search_para"
                      style={{
                        border: 0,
                        backgroundColor: '#dedede',
                        marginBottom: '0px',
                        paddingLeft: 'px',
                        color: 'navy',
                        fontSize: '18px',

                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        handleChange(url)

                        setPauseState(false)
                      }}
                    >
                      <FaPlay />
                      {url}
                    </span>
                    <span
                      className="btn btn-danger ml-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        changeScriptFun(val.autoid)
                      }}
                    >
                      {val.changedScript == 'ok' ? '済' : '変更'}
                    </span>
                    &nbsp;
                    <button
                      style={{ width: '100px' }}
                      onClick={handlePlayPause}
                    >
                      {playing ? 'Pause' : '再生'}
                    </button>
                    <button style={{ width: '100px' }} onClick={handleStop}>
                      ストップ
                    </button>
                    {currentTime}
                    <br />
                    {url}
                    <input
                      type="text"
                      // value={newScript}
                      style={{ width: '500px' }}
                      onChange={(e) => {
                        setChangeScript(e.target.value)
                      }}
                    />
                    {changeScript}
                    <hr style={{ border: '0.001em solid #BAB8B2' }} />
                  </>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
