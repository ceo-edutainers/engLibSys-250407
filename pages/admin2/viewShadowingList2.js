import React, { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import axios from 'axios'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import YoutubeScriptTimeInsertForShadowing3 from '@/components/Admin/YoutubeScriptTimeInsertForShadowing3'
import { FaPause, FaPlay } from 'react-icons/fa'

function YouTubePlayer() {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [shadowingAllInfo, setShadowingAllInfo] = useState([])
  const [shadowingView, setShadowingView] = useState(false)
  const [youtubeID, setYoutubeID] = useState()
  const [url, setUrl] = useState()
  const [pauseState, setPauseState] = useState(true)

  const [youtubeList, setYoutubeList] = useState([])

  useEffect(() => {
    var status = 'ok'
    var Url = DB_CONN_URL + '/select-shadowing-all/' + status

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

  function youID(url) {
    var yID = myFun_getYoutubeID(url)
    setYoutubeID(yID)

    var url = 'https://www.youtube.com/watch?v='
    var url = url + yID
    setUrl(url)
  }

  //다른페이지에서 가져옴////////////////////////////////
  //for filtering
  const inputRef = useRef()
  const [ready, setReady] = useState(false)
  const [searchWord, setSearchWord] = useState('')
  const [currentTime, setCurrentTime] = useState('00:00:00.000')

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

      var Url = DB_CONN_URL + '/get-youtube-time-script-new/' + youtubeID

      try {
        // await axios.get(Url).then((response) => {
        const response = await axios.get(Url)
        // alert(response.data)
        if (response.data.length > 0) {
          setYoutubeList(response.data)
        }
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }
  const convertToSeconds = (timeStr) => {
    const parts = timeStr.split(':') // "HH:MM:SS.mmm" 형식 분리
    const hours = parseInt(parts[0], 10) // 시간 추출 및 정수 변환
    const minutes = parseInt(parts[1], 10) // 분 추출 및 정수 변환
    const secondsAndMillis = parseFloat(parts[2]) // 초 및 밀리초 추출 및 부동소수점 변환

    // 전체 초 계산: 시간을 초로 변환, 분을 초로 변환, 초 및 밀리초
    const totalSeconds = hours * 3600 + minutes * 60 + secondsAndMillis
    return totalSeconds
  }
  //checked script save

  const [scriptChecked, setScriptChecked] = useState([])
  const [changeScript, setChangeScript] = useState()

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //여기부터 추가코드
  const [playing, setPlaying] = useState(true)
  const playerRef = useRef(null)

  // 정확한 시작 시간 및 종료 시간 설정
  // const startTime = 62.629 // 밀리초 단위
  // const endTime = 65.532 // 밀리초 단위
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  //00:01:02.629
  //00:01:05.532

  //비디오가 준비되면 시작 시간으로 이동
  // useEffect(() => {
  //   //이 코드 조각은 ReactPlayer 컴포넌트를 사용하여 비디오 재생을 특정 시작 시간(startTime)으로 이동시키기 위한 로직을 담고 있습니다.
  //   //seekToStart라는 함수를 정의하고 있으며, 이 함수는 주어진 startTime으로 비디오를 이동시키는 역할을 합니다.
  //   //이 로직은 ReactPlayer의 ref를 사용하여 비디오 플레이어 인스턴스에 접근합니다.

  //   //seekToStart 함수 정의:
  //   //이 함수는 playerRef.current 객체가 존재할 경우, 즉 ReactPlayer 컴포넌트가 마운트되어 있고 사용 가능한 상태일 때 실행됩니다.
  //   //playerRef.current.seekTo(startTime): seekTo 메서드는 ReactPlayer의 메서드 중 하나로, 인자로 받은 시간(startTime)으로 비디오의 재생 위치를 이동시킵니다.
  //   //여기서 startTime은 비디오를 시작할 시간(초 단위)을 나타냅니다.
  //   const seekToStart = () => {
  //     if (playerRef.current) {
  //       playerRef.current.seekTo(startTime)
  //     }
  //   }

  //   //seekToStart 함수 호출:
  //   //if(playerRef.current) 조건을 사용하여, playerRef가 현재 유효한 참조인지 확인합니다.
  //   //이는 ReactPlayer 컴포넌트가 실제로 마운트되어 있고 사용할 준비가 되었는지를 검사합니다.//
  //   //seekToStart()를 호출하여 ReactPlayer 컴포넌트의 비디오를 startTime으로 이동시킵니다.
  //   if (playerRef.current) {
  //     seekToStart()
  //   }

  //   // 종료 시간에 도달하면 비디오를 멈춤
  //   // 이 코드는 React 환경에서 setInterval을 사용하여 특정 조건을 주기적으로 체크하고, 조건에 맞을 때 특정 동작을 수행하는 예입니다.
  //   // 코드의 주요 목적은 YouTube 비디오가 사용자가 지정한 endTime에 도달했는지를 확인하고, 도달했다면 비디오를 정지하는 것입니다.
  //   // 이 코드는 비디오의 재생 시간을 정밀하게 모니터링하여 특정 시점에 비디오를 정지하고, 주기적인 검사를 중단하는 기능을 제공합니다.
  //   //이런 방식은 비디오 콘텐츠에서 사용자가 지정한 특정 부분만 보여주고 싶을 때 유용하게 사용될 수 있습니다.

  //   // setInterval 함수:
  //   //setInterval은 주어진 함수를 매 100밀리초(0.1초)마다 반복적으로 실행합니다.
  //   //이 함수는 비디오의 현재 재생 시간을 확인하고, 그 시간이 endTime 이상인지를 판단합니다.

  //   //조건 검사:
  //   // if (playerRef.current): playerRef는 ReactPlayer 컴포넌트에 대한 참조를 저장하는 ref입니다.
  //   //playerRef.current가 존재하는지 확인하는 이유는 컴포넌트가 아직 마운트되어 있고 접근 가능한 상태인지를 보장하기 위함입니다.
  //   // const playedSeconds = playerRef.current.getCurrentTime(): getCurrentTime 메소드를 호출하여 비디오의 현재 재생 시간(초)을 가져옵니다.

  //   //endTime 도달 확인:
  //   // if (playedSeconds >= endTime): 현재 재생 시간이 사용자가 설정한 종료 시간 endTime 이상인지 확인합니다. 만약 이 조건이 참이라면 두 가지 동작을 수행합니다.
  //   // setPlaying(false): setPlaying은 React의 상태 업데이트 함수로, playing 상태를 false로 설정하여 비디오 재생을 멈춥니다.

  //   const interval = setInterval(() => {
  //     if (playerRef.current) {
  //       const playedSeconds = playerRef.current.getCurrentTime()
  //       if (playedSeconds >= endTime) {
  //         //현재 재생 시간이 사용자가 설정한 종료 시간 endTime 이상인지 확인합니다. 만약 이 조건이 참이라면 두 가지 동작을 수행합니다.
  //         setPlaying(false) //setPlaying(false): setPlaying은 React의 상태 업데이트 함수로, playing 상태를 false로 설정하여 비디오 재생을 멈춥니다.
  //         clearInterval(interval) //clearInterval을 사용하여 setInterval에 의해 설정된 타이머를 정지합니다. 이는 더 이상의 불필요한 함수 호출을 방지하고 리소스를 절약하기 위함입니다.
  //       }
  //     }
  //   }, 100) // 100밀리초(0.1초)간격으로 시간 확인(반복적으로 실행합니다)

  //   return () => clearInterval(interval)
  // }, [endTime, startTime])

  function startVideo(startTime, endTime) {
    // setReady(true)
    // setPlaying(true) // 먼저 재생을 시작합니다.
    // setTimeout(() => {
    //   // 재생이 시작된 후 seekTo를 호출합니다.
    //   if (playerRef.current) {
    //     playerRef.current.seekTo(startTime)
    //   }
    // }, 500) // 500ms 후에 실행

    const interval = setInterval(() => {
      if (playerRef.current && playing) {
        playerRef.current.seekTo(startTime)
        const playedSeconds = playerRef.current.getCurrentTime()
        if (playedSeconds >= endTime) {
          setPlaying(false)
          setPauseState(false) //test
          clearInterval(interval)
        }
      }
    }, 100) // 0.1초 간격으로 시간 확인

    return () => clearInterval(interval)
  }

  useEffect(() => {
    //여기서 startTime은 비디오를 시작할 시간(초 단위)을 나타냅니다.
    const seekToStart = () => {
      if (playerRef.current) {
        playerRef.current.seekTo(startTime)
      }
    }

    if (playerRef.current) {
      seekToStart()
    }
    const interval = setInterval(() => {
      if (playerRef.current && playing) {
        playerRef.current.seekTo(startTime)
        const playedSeconds = playerRef.current.getCurrentTime()
        if (playedSeconds >= endTime) {
          setPlaying(false)
          setEndTime()
          setPauseState(false) //test
          clearInterval(interval)
        }
      }
    }, 100) // 0.1초 간격으로 시간 확인

    return () => clearInterval(interval)
  }, [playing, endTime])
  // }, [playing, endTime])

  // useEffect(() => {
  //   if (playing && playerRef.current) {
  //     playerRef.current.seekTo(startTime)
  //   }
  // }, [playing]) // playing 상태가 변경될 때마다 실행

  //test
  // 버튼 클릭 이벤트 핸들러
  const toggleVideoPlay = (startT, endT) => {
    // setPlaying(!playing) // 현재 재생 상태를 반전시킵니다.
    setPlaying(true)
    setStartTime(startT)
    setEndTime(endT)
  }
  return (
    <div>
      <div className="courses-details-area pb-100 ">
        <div className="container">
          <div className="courses-details-header">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12">
                {/* 비디오 제어: ref를 통해 ReactPlayer 인스턴스에 접근하면, seekTo, play, pause 등과 같은 메서드를 호출할 수 있습니다. 
                이를 통해 비디오의 재생 위치를 조정하거나, 재생과 일시 정지를 프로그램적으로 제어할 수 있습니다.
                현재 재생 시간 가져오기: getCurrentTime 메서드를 호출하여 비디오의 현재 재생 시간을 가져올 수 있습니다. 
                이 정보는 비디오가 특정 지점에서 자동으로 멈추도록 구현하는 등의 기능에 활용됩니다.
                비디오 상태 확인: getDuration 메서드를 사용하여 비디오의 전체 길이를 가져오거나, 다른 상태 정보를 조회할 수 있습니다.
                ref={playerRef}: ReactPlayer 컴포넌트에 useRef 훅을 사용하여 생성된 playerRef를 할당합니다. 
                이렇게 설정하면, playerRef.current를 통해 ReactPlayer 인스턴스에 접근할 수 있게 됩니다.
                onReady: ReactPlayer 로딩이 완료되고 비디오가 재생 준비가 완료되었을 때 호출됩니다. 
                여기서는 비디오를 자동으로 재생하도록 setPlaying(true)를 호출합니다.
                ref의 사용은 React 컴포넌트 내에서 비디오의 세밀한 제어가 필요할 때 매우 유용합니다. 
                특히 외부 라이브러리 컴포넌트를 다룰 때 직접적인 DOM 접근이 필요한 경우에 자주 사용됩니다. */}

                {/* <ReactPlayer
                  url={url}
                  // playing={playing}
                  controls={true}
                  width="100%"
                  height="100%"
                  // onReady={() => setPlaying(true)}
                /> */}

                <ReactPlayer
                  ref={playerRef}
                  // url="https://www.youtube.com/watch?v=X3uT89xoKuc"
                  url={url}
                  playing={playing}
                  controls={true}
                  // onReady={() => setPlaying(true)} //onReady->비디오 로딩이 끝나면, setPlaying(true)-> 비디오를 자동 재생한다.
                  // onStart={() => {
                  //   if (playerRef.current) {
                  //     playerRef.current.seekTo(startTime)
                  //   }
                  // }}
                />

                <button onClick={toggleVideoPlay}>
                  {playing ? 'Pause' : 'Play'} Video
                </button>
                <span
                  onClick={() => startVideo(1.034, 2.001)}
                  // onClick={(() => setStartTime(1.034), setEndTime(2.001))}
                  style={{ cursor: 'pointer' }}
                >
                  https://www.youtube.com/embed/X3uT89xoKuc?start=1.034&end=2.001&a=635969.2807674207&cc_load_policy=0
                </span>

                <hr />
                <div className="col-lg-12 col-md-12">
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
                <div
                  style={{
                    width: '100%',
                    display: shadowingView ? 'block' : 'none',
                  }}
                >
                  {youtubeID}
                  {/* <YoutubeScriptTimeInsertForShadowing3 yID={youtubeID} /> */}
                </div>

                <hr />
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
                        val.script
                          .toLowerCase()
                          .includes(searchWord.toLowerCase())
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

                      var sec = convertToSeconds(val.startTimeSec)

                      var secEnd = convertToSeconds(val.endTimeSec)

                      var rand = 1 + Math.random() * (1000000 - 1)
                      var url =
                        'https://www.youtube.com/embed/' +
                        val.youtubeID +
                        '?start=' +
                        sec +
                        '&end=' +
                        secEnd +
                        '&a=' +
                        rand +
                        '&cc_load_policy=0'

                      var newUrl =
                        'https://www.youtube.com/embed/' + val.youtubeID
                      var fileNum = parseInt(key + 1)
                      if (fileNum < 10) {
                        var fileNumCicle = '0' + fileNum
                      } else {
                        var fileNumCicle = fileNum
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
                              // handleChange(url)
                              // // handleChange(newUrl)
                              setPauseState(false)
                              // setStartTime(sec)
                              // setEndTime(secEnd)
                              setReady(true)

                              startVideo(sec, secEnd)
                            }}
                          >
                            <FaPlay />
                            {/* {url} */}
                            {sec}-{secEnd}
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
                          {/* <button
                      style={{ width: '100px' }}
                      onClick={handlePlayPause}
                    >
                      {playing ? 'Pause' : '再生'}
                    </button>
                    <button style={{ width: '100px' }} onClick={handleStop}>
                      ストップ
                    </button> */}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default YouTubePlayer
