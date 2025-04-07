import React, { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import axios from 'axios'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import { FaPause, FaPlay } from 'react-icons/fa'

function YouTubePlayer() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [playing, setPlaying] = useState(true)
  const playerRef = useRef(null)

  // 정확한 시작 시간 및 종료 시간 (밀리초 단위)
  // const startTime = 3.236 // 초 단위
  // const endTime = 4.437 // 초 단위
  const [startTime, setStartTime] = useState(0.0)
  const [endTime, setEndTime] = useState(0.001)

  const [youtubeList, setYoutubeList] = useState([])
  const [youtubeID, setYoutubeID] = useState()
  const [shadowingAllInfo, setShadowingAllInfo] = useState([])
  const [shadowingView, setShadowingView] = useState(false)
  const [url, setUrl] = useState()

  function youID(url) {
    var yID = myFun_getYoutubeID(url)
    setYoutubeID(yID)

    var url = 'https://www.youtube.com/watch?v='
    var url = url + yID
    setUrl(url)
  }

  useEffect(() => {
    getYoutubeTimeScript()

    // }, [])
  }, [url])

  function getYoutubeTimeScript() {
    const fetchData = async () => {
      let newUrl =
        'https://www.youtube.com/embed/' +
        youtubeID +
        '&cc_load_policy=0&cc_lang_pref=en'

      setUrl(newUrl)

      var Url = DB_CONN_URL + '/get-youtube-time-script2/' + youtubeID

      try {
        // await axios.get(Url).then((response) => {
        const response = await axios.get(Url)
        // alert(response.data)
        if (response.data.length > 0) {
          // alert(response.data)
          setYoutubeList(response.data)
        }
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }
  const convertToSeconds = (timeStr) => {
    // const parts = timeStr.split(':') // "HH:MM:SS.mmm" 형식 분리
    // const hours = parseInt(parts[0], 10) // 시간 추출 및 정수 변환
    // const minutes = parseInt(parts[1], 10) // 분 추출 및 정수 변환
    // const secondsAndMillis = parseFloat(parts[2]) // 초 및 밀리초 추출 및 부동소수점 변환

    // // 전체 초 계산: 시간을 초로 변환, 분을 초로 변환, 초 및 밀리초
    // const totalSeconds = hours * 3600 + minutes * 60 + secondsAndMillis
    // return totalSeconds
    const parts = timeStr.split(':') // "HH:MM:SS.mmm" 형식 분리
    const hours = parseInt(parts[0], 10) // 시간 추출 및 정수 변환
    const minutes = parseInt(parts[1], 10) // 분 추출 및 정수 변환
    const secondsAndMillis = parseFloat(parts[2]) // 초 및 밀리초 추출 및 부동소수점 변환

    // 전체 초 계산: 시간을 초로 변환, 분을 초로 변환, 초 및 밀리초
    const totalSeconds = hours * 3600 + minutes * 60 + secondsAndMillis

    // 소수점 셋째 자리까지의 정확도를 유지하여 문자열로 반환
    return totalSeconds.toFixed(3)
  }

  useEffect(() => {
    var status = 'ok'
    var Url = DB_CONN_URL + '/select-shadowing-all/' + status

    setFileNumCircleAfter() //초기화

    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          setShadowingAllInfo(response.data)
        })
      } catch (error) {
        alert('error1' + error)
      }
    }
    fetchData2()
  }, [])

  // 비디오가 준비되면 시작 시간으로 이동
  useEffect(() => {
    const seekToStart = () => {
      if (playerRef.current) {
        playerRef.current.seekTo(startTime)
      }
    }

    if (playerRef.current) {
      seekToStart()
    }

    // 종료 시간에 도달하면 비디오를 멈춤
    const interval = setInterval(() => {
      if (playerRef.current) {
        const playedSeconds = playerRef.current.getCurrentTime()
        if (playedSeconds >= endTime) {
          setPlaying(false)
          setStartTime()
          setEndTime()
          clearInterval(interval)
        }
      }
    }, 100) // 0.1초 간격으로 시간 확인

    return () => clearInterval(interval)
  }, [playing, endTime, startTime])

  //when play button click
  const toggleVideoPlay = (startT, endT) => {
    // setPlaying(!playing) // 현재 재생 상태를 반전시킵니다.
    setPlaying(true)
    setStartTime(startT)
    setEndTime(endT)
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

  //스크립트 변경시,
  const [changeScript, setChangeScript] = useState()
  const [changedScript, setChangedScript] = useState(false)

  const [inputStyleChange, setInputStyleChange] = useState({
    width: '500px',
    backgroundColor: 'lightblue',
  })
  const [inputStyleChanged, setInputStyleChanged] = useState({
    width: '500px',
    backgroundColor: 'lightpink',
  })

  const [fileNumCircleAfter, setFileNumCircleAfter] = useState()

  //script 변경시
  const changeScriptFun = (autoid, fileNumCircle) => {
    const fetchData = async () => {
      var tbn = localStorage.getItem('tbn')
      if (tbn == '' || tbn == null) {
        tbn = '150108200111'
      }
      try {
        var url = DB_CONN_URL + '/update-sys-shadowing-script-time-from-admin2'
        var url =
          //  DB_CONN_URL + '/update-sys-shadowing-script-time-from-admin2'
          axios
            .post(url, {
              autoid: autoid,
              script: changeScript,
              tbn: tbn,
            })
            .then((response) => {
              // alert('changed! ' + fileNumCircle)
              getYoutubeTimeScript()
              setFileNumCircleAfter(fileNumCircle)
              setChangeScript('')
            })
      } catch (error) {}
    }
    fetchData()
  }

  // 변경시
  const changeDeleteFun = (autoid) => {
    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/update-sys-shadowing-script-line-del'
        var url =
          //  DB_CONN_URL + '/update-sys-shadowing-script-time-from-admin2'
          axios
            .post(url, {
              autoid: autoid,
            })
            .then((response) => {
              getYoutubeTimeScript()
              alert('successfully deleted!')
            })
      } catch (error) {}
    }
    fetchData()
  }
  //startTime,endTime 변경시
  const [changeSec, setChangeSec] = useState(false)
  const [changeSecEnd, setChangeSecEnd] = useState(false)
  const [changeSecValue, setChangeSecValue] = useState()
  const [changeSecEndValue, setChangeSecEndValue] = useState()
  const [changedSec, setChangedSec] = useState()
  const [inputStyleChangeSec, setInputStyleChangeSec] = useState({
    width: '100px',
    backgroundColor: 'lightblue',
  })
  const [inputStyleChangedSec, setInputStyleChangedSec] = useState({
    width: '100px',
    backgroundColor: 'lightpink',
  })

  //  val.autoid, e.target.value, fileNumCircle, 'secEnd'
  const changeSecFun = (autoid, fileNumCircle, sort) => {
    // alert(autoid + '/' + fileNumCircle + '/' + sort)
    if (sort == 'sec') {
      setChangeSec(true)
      var sec = changeSecValue
    } else if (sort == 'secEnd') {
      setChangeSecEnd(true)
      var sec = changeSecEndValue
    }

    const fetchData = async () => {
      var tbn = localStorage.getItem('tbn')
      if (tbn == '' || tbn == null) {
        tbn = '150108200111'
      }

      var newSec = formatTime(sec)

      try {
        var url = DB_CONN_URL + '/update-sys-shadowing-time-change'
        axios
          .post(url, {
            autoid: autoid,
            sec: newSec,
            sort: sort, //sec or secEnd
            tbn: tbn,
          })
          .then((response) => {
            // alert('changed! ' + fileNumCircle)
            setFileNumCircleAfter(fileNumCircle)
            if (sort == 'sec') {
              setChangeSec(false)
            } else if (sort == 'secEnd') {
              setChangeSecEnd(false)
            }
            getYoutubeTimeScript()
          })
      } catch (error) {}
    }
    fetchData()
  }

  function formatTime(sec) {
    // 소수점 이하의 밀리세컨드를 포함하여 전체 시간을 문자열로 변환
    const secAsString = sec.toString()
    const parts = secAsString.split('.')
    const totalSeconds = parseInt(parts[0], 10)
    const milliseconds =
      parts.length > 1 ? parseInt((parts[1] + '000').substring(0, 3), 10) : 0

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const hoursFormatted = hours < 10 ? `0${hours}` : hours
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes
    const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds
    const millisecondsFormatted =
      milliseconds < 10
        ? `00${milliseconds}`
        : milliseconds < 100
        ? `0${milliseconds}`
        : milliseconds

    return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}.${millisecondsFormatted}`
  }

  //checkboxをクリックしたらどうなるかを決める。
  const [scriptChecked, setScriptChecked] = useState([])
  function scriptCheckboxDelete(scriptToDelete) {
    setScriptChecked(
      scriptChecked.filter((val) => {
        return val !== scriptToDelete
      })
    )
  }

  return (
    <>
      <div className="funfacts-and-feedback-area ptb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12">
              <hr />
              <ReactPlayer
                ref={playerRef}
                // url="https://www.youtube.com/watch?v=X3uT89xoKuc"
                url={url}
                playing={playing}
                controls={true}
                onReady={() => setPlaying(true)}
              />
              <button
                onClick={() => {
                  toggleVideoPlay(3.236, 4.437)
                }}
              >
                {playing ? 'Pause' : 'Play'} Video
              </button>
              <hr />
            </div>
            <div>
              <div className="col-lg-12 col-md-12">
                <div> {youtubeID}</div>
                <select
                  className="mb-3"
                  onChange={(e) => {
                    setShadowingView(true)
                    youID(e.target.value)
                  }}
                >
                  <option>SELECT VIDEO</option>
                  {shadowingAllInfo?.map((val, key) => {
                    return (
                      <>
                        <option value={val.youtubeURL}>
                          [{val.shadowingLevel}]{val.shadowingTitle}
                        </option>
                      </>
                    )
                  })}{' '}
                </select>
              </div>

              <div>
                {youtubeList.map((val, key) => {
                  var newScript = val.script

                  var sec = convertToSeconds(val.startTimeSec)

                  var secEnd = convertToSeconds(val.endTimeSec)

                  var fileNum = parseInt(key + 1)
                  if (fileNum < 10) {
                    var fileNumCircle = '0' + fileNum
                  } else {
                    var fileNumCircle = fileNum
                  }

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
                        {fileNumCircle}
                      </span>
                      &nbsp;&nbsp;
                      <span
                        style={{
                          cursor: 'pointer',
                          backgroundColor: '#DBEEEE',
                        }}
                        onClick={() => copyToClipBoard(sec)}
                      >
                        {sec}
                      </span>
                      -
                      <span
                        style={{
                          cursor: 'pointer',
                          backgroundColor: '#EEE3DB',
                        }}
                        onClick={() => copyToClipBoard(secEnd)}
                      >
                        {secEnd}
                      </span>
                      &nbsp;&nbsp;
                      <input
                        type="text"
                        style={
                          fileNumCircle == fileNumCircleAfter
                            ? inputStyleChangedSec
                            : inputStyleChangeSec
                        }
                        onChange={(e) => {
                          setChangeSecValue(e.target.value)
                        }}
                      />{' '}
                      {/* {changeSecValue} */}
                      <span
                        className="btn btn-primary ml-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          changeSecFun(val.autoid, fileNumCircle, 'sec')
                        }}
                      >
                        変更
                      </span>{' '}
                      -{' '}
                      <input
                        type="text"
                        style={
                          fileNumCircle == fileNumCircleAfter
                            ? inputStyleChangedSec
                            : inputStyleChangeSec
                        }
                        onChange={(e) => {
                          setChangeSecEndValue(e.target.value)
                        }}
                      />
                      {/* {changeSecEndValue} */}
                      <span
                        className="btn btn-primary ml-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          changeSecFun(val.autoid, fileNumCircle, 'secEnd')
                        }}
                      >
                        変更
                      </span>{' '}
                      <div style={{ marginTop: '10px' }}>
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
                            toggleVideoPlay(sec, secEnd)
                          }}
                        >
                          <FaPlay />
                        </span>{' '}
                        <span
                          type="text"
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
                        <br />
                        <span
                          className="btn btn-danger ml-2"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            changeScriptFun(val.autoid, fileNumCircle)
                          }}
                        >
                          変更
                          {/* {val.changedScript == 'ok' ? '済' : '変更'} */}
                        </span>{' '}
                        <input
                          type="text"
                          // value={newScript}
                          style={
                            fileNumCircle == fileNumCircleAfter
                              ? inputStyleChanged
                              : inputStyleChange
                          }
                          onChange={(e) => {
                            setChangeScript(e.target.value)
                          }}
                        />{' '}
                        <span
                          className="btn btn-danger ml-2"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            changeDeleteFun(val.autoid)
                          }}
                        >
                          DEL
                          {/* {val.changedScript == 'ok' ? '済' : '変更'} */}
                        </span>{' '}
                      </div>
                      <hr style={{ border: '0.001em solid #BAB8B2' }} />
                    </>
                  )
                })}
              </div>
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>
    </>
  )
}

export default YouTubePlayer
