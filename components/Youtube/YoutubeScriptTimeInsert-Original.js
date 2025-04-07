import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'
import { FaPause, FaPlay } from 'react-icons/fa'

export default function YoutubeScriptTimeInsert({ yID }) {
  const [pauseState, setPauseState] = useState(true)

  const [url, setUrl] = useState('https://www.youtube.com/embed/' + yID)
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

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [youtubeList, setYoutubeList] = useState([])
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  useEffect(() => {
    const fetchData = async () => {
      setError(false)
      setLoading(true)

      var Url = DB_CONN_URL + '/get-youtube-time-script/' + yID

      try {
        //await axios.get(Url).then((response) => {

        const response = await axios.get(Url)
        setYoutubeList(response.data)
        console.log('setYoutubeList', youtubeList)
        console.log('response.data', response.data)
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
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

  if (isError) return <h1>Error, try again!</h1>
  if (isLoading) return <h1>Loading Video.............</h1>
  return (
    <>
      {/* <div className="row"> */}
      <div
        className="col-sm-12 mb-2 ml-0 pl-0"
        style={{
          position: 'fixed',
          top: '54px',
          width: '650px',
          zIndex: 1,
          backgroundColor: '#dedede',
          // border: '1px solid #dedede',
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

        {/* <div className="row"> */}
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
        </div>
        {/* </div> */}
      </div>
      {/* <div className="row"> */}
      <div
        className="col-lg-12 col-md-6 mb-2 ml-0 pl-1"
        style={{
          position: 'fixed',
          top: '70px',
          width: '300px',
          marginTop: 450,
          marginBottom: 0,
          paddingBottom: 0,
          marginRight: 0,
          paddingRight: 0,
          zIndex: 1,
          backgroundColor: 'white',
          textAlign: 'center',
        }}
      >
        <input
          className="form-control-md"
          style={{ width: '100%' }}
          ref={inputRef}
          type="text"
          placeholder="Word Search..."
          onChange={(e) => {
            setSearchWord(e.target.value)
          }}
        />
      </div>

      <div
        className="col-lg-12  mb-3 text-left "
        style={{
          // position: 'absolute',
          // top: '10px',
          marginTop: '510px',
          width: '100%',
          paddingLeft: 0,
          backgroundColor: '#ececec',
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
            handleChange('https://www.youtube.com/embed/' + yID + '&start=0')
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
                />
                <p></p>
              </>
            )
          })}
      </div>
      {/* </div> */}
    </>
  )
}
