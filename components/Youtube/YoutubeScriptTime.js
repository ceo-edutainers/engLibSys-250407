import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'
import { FaPause, FaPlay } from 'react-icons/fa'

export default function YoutubeScriptTime({ yID }) {
  const [youtubeID, setYoutubeID] = useState(yID)
  const [youtubeList, setYoutubeList] = useState([])
  const [pauseState, setPauseState] = useState(true)
  //const [inputValue, setInputValue] = useState('')
  const [url, setUrl] = useState('https://www.youtube.com/embed/' + youtubeID)
  const [playStatus, setPlayStatus] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [subTitleStatus, setSubTitleStatus] = useState(false)
  //for Loop Button
  const [playLoop, setPlayLoop] = useState(true)
  const [labelColorLoop, setLabelColorLoop] = useState('Looping...')
  const [btnColorLoop, setBtnColorLoop] = useState('btn btn-dark ml-2 mr-2')
  const [speedBar, setSpeedBar] = useState(1)

  //for filtering
  const inputRef = useRef()
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    console.log('youtubeID', youtubeID)

    axios
      .post(DB_CONN_URL + '/get-youtube-time-script', {
        youtubeID: youtubeID,
      })
      .then((response) => {
        //alert(response.data)
        setYoutubeList(response.data)
        console.log('setYoutubeList', youtubeList)
        console.log('response.data', response.data)
      })
  }, [])

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
  function handleStartFromFirst() {
    setUrl('https://www.youtube.com/embed/' + youtubeID + '&start=0')
    setPlayStatus(true)
    setPauseState(false)
  }

  function handleLoop(value) {
    if (playLoop != true) {
      // alert(playLoop)
      setPlayLoop(value)
      setLabelColorLoop('Looping...')
      setBtnColorLoop('btn btn-dark ml-2 mr-2')
    } else {
      setPlayLoop(value)
      setLabelColorLoop('No Loop')
      setBtnColorLoop('btn btn-light border border-dark ml-2 mr-2')
    }
  }

  function handleRewind(reWind, nowRate) {
    var nowRates = parseInt(nowRate)
    var reWinds = parseInt(reWind)
    var howMany = nowRates - reWinds
    if (howMany < 0) {
      howMany = parseInt(0)
    }
    console.log('test:', reWinds, '-', nowRates, '-', howMany)
    setUrl('https://www.youtube.com/embed/' + youtubeID + '&start=' + howMany)
    setPlayStatus(true)
    setPauseState(false)
  }

  return (
    <>
      <div
        className="col-sm-12 mb-2 mt-2 p-2"
        style={{
          position: 'fixed',
          top: '10px',
          marginTop: 20,
          zIndex: 1,
          backgroundColor: '#ececec',
          border: '1px solid #dedede',
          textAlign: 'center',
        }}
      >
        <ReactPlayer
          url={url}
          playing={playStatus}
          controls={true}
          playbackRate={playbackRate}
          loop={playLoop}
          width="100%"
          //contentWindow="false"
          style={{ marginBottom: '10px' }}
          onReady={() => {
            console.log('onReady')
          }}
          onStart={() => {
            console.log('onStart')
          }}
          onPause={() => {
            console.log('onPause')
          }}
          onEnded={() => {
            console.log('onEnded')
          }}
          onError={() => {
            console.log('onError')
          }}
        />

        <div className="row">
          <div className="col-sm-12 text-center">
            <button
              className={btnColorLoop}
              onClick={() => {
                handleLoop(!playLoop)
              }}
            >
              {labelColorLoop}
            </button>

            {playStatus != true && (
              <button
                className="btn btn-danger ml-2 mr-2"
                onClick={() => {
                  handleStart()
                }}
              >
                <FaPlay />
              </button>
            )}

            {/* <button
              className="btn btn-danger ml-2 mr-2"
              onClick={() => {
                handleStart()
              }}
            >
              <FaPlay />
            </button> */}

            {!pauseState ? (
              <button
                className="btn btn-danger mr-2"
                onClick={() => {
                  handlePause()
                  setPauseState(true)
                }}
              >
                <FaPause />
              </button>
            ) : (
              <button
                className="btn btn-danger mr-2"
                onClick={() => {
                  handleStart()
                  setPauseState(false)
                }}
              >
                <FaPause />
              </button>
            )}
          </div>

          <div className="col-lg-12 text-center">
            {playbackRate == 0.75 ? (
              <button
                className="btn btn-danger m-2"
                onClick={() => {
                  setPlaybackRate(0.75)
                }}
              >
                x0.75
              </button>
            ) : (
              <button
                className="btn btn-light border border-1-dark m-2"
                onClick={() => {
                  setPlaybackRate(0.75)
                }}
              >
                x0.75
              </button>
            )}

            {playbackRate == 0.8 ? (
              <button
                className="btn btn-danger m-2"
                onClick={() => {
                  setPlaybackRate(0.8)
                }}
              >
                x0.8
              </button>
            ) : (
              <button
                className="btn btn-light border border-1-dark m-2"
                onClick={() => {
                  setPlaybackRate(0.8)
                }}
              >
                x0.8
              </button>
            )}

            {playbackRate == 0.9 ? (
              <button
                className="btn btn-danger m-2"
                onClick={() => {
                  setPlaybackRate(0.9)
                }}
              >
                x0.9
              </button>
            ) : (
              <button
                className="btn btn-light border border-1-dark m-2"
                onClick={() => {
                  setPlaybackRate(0.9)
                }}
              >
                x0.9
              </button>
            )}

            {playbackRate == 1 ? (
              <button
                className="btn btn-danger m-2"
                onClick={() => {
                  setPlaybackRate(1)
                }}
              >
                x1
              </button>
            ) : (
              <button
                className="btn btn-light border border-1-dark m-2"
                onClick={() => {
                  setPlaybackRate(1)
                }}
              >
                x1
              </button>
            )}

            {playbackRate == 1.25 ? (
              <button
                className="btn btn-danger m-2"
                onClick={() => {
                  setPlaybackRate(1.25)
                }}
              >
                x1.25
              </button>
            ) : (
              <button
                className="btn btn-light border border-1-dark m-2"
                onClick={() => {
                  setPlaybackRate(1.25)
                }}
              >
                x1.25
              </button>
            )}
            {playbackRate == 1.5 ? (
              <button
                className="btn btn-danger m-2"
                onClick={() => {
                  setPlaybackRate(1.5)
                }}
              >
                x1.5
              </button>
            ) : (
              <button
                className="btn btn-light border border-1-dark m-2"
                onClick={() => {
                  setPlaybackRate(1.5)
                }}
              >
                x1.5
              </button>
            )}

            {playbackRate == 1.75 ? (
              <button
                className="btn btn-danger m-2"
                onClick={() => {
                  setPlaybackRate(1.75)
                }}
              >
                x1.75
              </button>
            ) : (
              <button
                className="btn btn-light border border-1-dark m-2"
                onClick={() => {
                  setPlaybackRate(1.75)
                }}
              >
                x1.75
              </button>
            )}

            {playbackRate == 2 ? (
              <button
                className="btn btn-danger m-2"
                onClick={() => {
                  setPlaybackRate(2)
                }}
              >
                x2
              </button>
            ) : (
              <button
                className="btn btn-light border border-1-dark m-2"
                onClick={() => {
                  setPlaybackRate(2)
                }}
              >
                x2
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className="col-lg-12 col-md-6 mb-2"
        style={{
          position: 'fixed',
          top: '10px',
          marginTop: 500,
          marginBottom: 0,
          paddingBottom: 0,
          zIndex: 1,
          backgroundColor: 'white',
          textAlign: 'center',
        }}
      >
        <input
          className="form-control-md mb-2"
          style={{ width: '100%' }}
          ref={inputRef}
          type="text"
          placeholder="Word Search..."
          onChange={(e) => {
            setSearchWord(e.target.value)
          }}
        />
      </div>
      <div className="row">
        <div
          className="col-lg-8  mb-3 text-left "
          style={{
            // position: 'absolute',
            top: '10px',
            marginTop: '550px',
            width: '100%',
            backgroundColor: 'white',
            paddingLeft: '20px',
            // zIndex: -1,
          }}
        >
          [00:00]&nbsp;
          <button
            style={{
              border: 0,
              backgroundColor: '#ececec',
              marginBottom: '10px',
              color: 'red',
              fontWeight: '900',
            }}
            onClick={() => {
              handleChange(
                'https://www.youtube.com/embed/' + youtubeID + '&start=0'
              )
              setPauseState(false)
            }}
            //href={url}
          >
            Beginning of the Video
          </button>
          <br />
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
                //var newScript = script.replace(pattern, `<mark>${sWord}</mark>`)
                //document.getElementById('search_para').innerHTML = newScript
              }
              var videoTime = val.time.split(':')

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

              var sec = parseInt(sec_1) + parseInt(sec_2)

              var rand = 1 + Math.random() * (1000000 - 1)

              var url =
                'https://www.youtube.com/embed/' +
                val.youtubeID +
                '?start=' +
                sec +
                '&a=' +
                rand

              return (
                <>
                  [{val.time}]&nbsp;
                  <span
                    dangerouslySetInnerHTML={{ __html: newScript }}
                    value="html"
                    id="search_para"
                    style={{
                      border: 0,
                      backgroundColor: '#ececec',
                      marginBottom: '10px',
                      paddingLeft: '5px',
                      color: 'navy',
                      fontSize: '18px',
                    }}
                    onClick={() => {
                      handleChange(url)
                      setPauseState(false)
                    }}
                  />
                  {/* {newScript}
                </span> */}
                  <p></p>
                </>
              )
            })}
        </div>
        <div
          className="col-lg-4  mb-3 text-left pl-2"
          style={{
            // position: 'absolute',
            top: '10px',
            marginTop: '550px',
            width: '100%',
            // zIndex: -1,
            borderLeft: '1px solid #dedede',
          }}
        >
          test
        </div>
      </div>
    </>
  )
}
