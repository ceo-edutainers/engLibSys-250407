import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'
import { FaPause, FaPlay } from 'react-icons/fa'
import { MdReplay5, MdReplay10, MdReplay30 } from 'react-icons/md'
import { SettingsOverscan } from '@material-ui/icons'
import { HtmlContext } from 'next/dist/shared/lib/utils'
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

export default function ReadingView({
  mbn,
  homework_id,
  name_eng,
  google_doc_link,
  courseName,
}) {
  const [pauseState, setPauseState] = useState(true)
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  //let newUrl = 'https://www.youtube.com/embed/' + yID + '&cc_load_policy=0'
  const [url, setUrl] = useState(newUrl)

  const [playStatus, setPlayStatus] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  //const [subTitleStatus, setSubTitleStatus] = useState(false)
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

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [youtubeList, setYoutubeList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setError(false)
      setLoading(true)

      var Url = DB_CONN_URL + '/get-reading-hw/' + yID

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

  if (isError) return <h1>Error, try again!</h1>
  if (isLoading) return <h1>Loading Video.............</h1>
  return (
    <>
      {/* <div className="row"> */}
      <div
        className="col-sm-12 mb-2 pt-3"
        style={{
          position: 'fixed',
          top: '64px',
          width: '750px',
          zIndex: 1,
          backgroundColor: '#dedede',
          // border: '1px solid #dedede',
          textAlign: 'center',
        }}
      >
        <ReactPlayer
          url={url}
          playing={playStatus}
          textTracks={false}
          controls={true}
          playbackRate={playbackRate}
          loop={playLoop}
          //textTracks={subTitleStatus}

          width="100%"
          contentWindow="false"
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
          {/* <button
            className={btnColorLoop}
            onClick={() => {
              handleLoop(!playLoop)
            }}
          >
            {labelColorLoop}
          </button> */}
          <a
            className={btnColorLoop}
            onClick={() => {
              handleLoop(!playLoop)
            }}
          >
            {labelColorLoop}
          </a>

          {playStatus != true && (
            // <button
            //   className="btn btn-danger ml-2 mr-2"
            //   onClick={() => {
            //     handleStart()
            //   }}
            // >
            //   <FaPlay />
            // </button>
            <a
              className="btn btn-danger text-white ml-2 mr-2"
              onClick={() => {
                handleStart()
              }}
            >
              <FaPlay />
            </a>
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
            // <button
            //   className="btn btn-danger mr-2"
            //   onClick={() => {
            //     handlePause()
            //     setPauseState(true)
            //   }}
            // >
            //   <FaPause />
            // </button>

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
            // <button
            //   className="btn btn-danger mr-2"
            //   onClick={() => {
            //     handleStart()
            //     setPauseState(false)
            //   }}
            // >
            //   <FaPause />
            // </button>
            <a
              className="btn btn-danger mr-2 text-white"
              onClick={() => {
                handleStart()
                setPauseState(false)
              }}
            >
              <FaPause />
            </a>
          )}
        </div>

        <div className="col-lg-12 text-center">
          {playbackRate == 0.75 ? (
            <a
              className="btn btn-danger m-2"
              onClick={() => {
                setPlaybackRate(0.75)
              }}
            >
              x0.75
            </a>
          ) : (
            <a
              className="btn btn-light border border-1-dark m-2"
              onClick={() => {
                setPlaybackRate(0.75)
              }}
            >
              x0.75
            </a>
          )}

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

          {playbackRate == 1.25 ? (
            <a
              className="btn btn-danger m-2"
              onClick={() => {
                setPlaybackRate(1.25)
              }}
            >
              x1.25
            </a>
          ) : (
            <a
              className="btn btn-light border border-1-dark m-2"
              onClick={() => {
                setPlaybackRate(1.25)
              }}
            >
              x1.25
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

          {playbackRate == 1.75 ? (
            <a
              className="btn btn-danger m-2"
              onClick={() => {
                setPlaybackRate(1.75)
              }}
            >
              x1.75
            </a>
          ) : (
            <a
              className="btn btn-light border border-1-dark m-2"
              onClick={() => {
                setPlaybackRate(1.75)
              }}
            >
              x1.75
            </a>
          )}
        </div>
        {/* </div> */}
      </div>
      {/* <div className="row"> */}
      <div
        className="col-lg-12 col-md-6 mb-2 ml-0 pl-0"
        style={{
          position: 'fixed',
          top: '70px',
          width: '400px',
          textAlign: 'left',
          marginTop: 480,
          marginBottom: 0,
          paddingBottom: 0,
          marginRight: 0,
          marginLeft: 0,
          paddingRight: 0,
          paddingLeft: 0,
          zIndex: 1,
          // backgroundColor: 'white',
          textAlign: 'left',
        }}
      >
        <input
          className="form-control-md ml-0 mr-1"
          style={{ width: '300px' }}
          ref={inputRef}
          type="text"
          value={searchWord}
          placeholder="Word Search..."
          onChange={(e) => {
            setSearchWord(e.target.value)
          }}
        />
        <a
          style={{ width: '15%', cursor: 'pointer', color: 'white' }}
          className="btn-sm btn-primary"
          onClick={() => {
            setSearchWord('')
          }}
        >
          CLEAR
        </a>

        {/* <a
          style={{ width: '15%', cursor: 'pointer', color: 'white' }}
          className="btn-sm btn-primary"
          onClick={() => {
            setScriptChecked([]), setCheckedboxClear('checked')
          }}
        >
          RESET
        </a> */}
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
        <div className="pt-4">
          {scriptChecked.map((val, key) => {
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
                <div className="containers">
                  <div className="row">
                    <div className="col-lg-12 text-left mb-1">
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
                          <td>
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
          <hr />
        </div>
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
              rand +
              '&cc_load_policy=0'

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
                &nbsp;&nbsp;
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
                {/* [{val.autoid}] */}
                <p></p>
              </>
            )
          })}
      </div>
      {/* </div> */}
    </>
  )
}
