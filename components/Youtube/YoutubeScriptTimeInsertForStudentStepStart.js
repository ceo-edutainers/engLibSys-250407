import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'
import { FaFastBackward, FaFastForward, FaPause, FaPlay } from 'react-icons/fa'
import Floater from 'react-floater'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

export default function YoutubeScriptTimeInsertForStudent({
  yID,
  homework_id,
  mbn,
  shadowingLevel,
}) {
  //const [youtubeID, setYoutubeID] = useState(youtubeID)
  const [pauseState, setPauseState] = useState(true)
  //const [inputValue, setInputValue] = useState('')

  const [playStatus, setPlayStatus] = useState(false)
  const [playbackRate, setPlaybackRate] = useState()
  const [subTitleStatus, setSubTitleStatus] = useState(false)
  //for Loop Button
  const [playLoop, setPlayLoop] = useState(false)
  const [labelColorLoop, setLabelColorLoop] = useState('くりかえしプレイ...')
  const [btnColorLoop, setBtnColorLoop] = useState(
    'btn btn-dark text-white ml-2 mr-2'
  )
  const [speedBar, setSpeedBar] = useState(1)
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  //for filtering
  const inputRef = useRef()
  const [searchWord, setSearchWord] = useState('')

  const [checkedboxClear, setCheckedboxClear] = useState('')

  const [youtubeList, setYoutubeList] = useState([])
  const [url, setUrl] = useState()

  useEffect(() => {
    getYoutubeTimeScript()
  }, [yID])

  function getYoutubeTimeScript() {
    const fetchData = async () => {
      // let newUrl = 'https://www.youtube.com/embed/' + yID + '&cc_load_policy=0'
      let newUrl =
        'https://www.youtube.com/embed/' +
        yID +
        '&hl=eng&rel=0&cc_load_policy=0&modestbranding=1&autohide=1&showinfo=0&controls=0&amp&nologo=1'

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
      setLabelColorLoop('くりかえしプレイ...')
      setBtnColorLoop('btn btn-dark text-white ml-2 mr-2')
    } else {
      setPlayLoop(value)
      setLabelColorLoop('1回ずつプレイ')
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
      '/insert-memory-word-from-student-video/' +
      word +
      '&' +
      homework_id +
      '&' +
      mbn

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

  return (
    <>
      {/* <div className="row"> */}
      <div
        className="col-sm-12 mb-2 pt-3"
        style={{
          // position: 'fixed',
          // top: '64px',
          width: '750px',
          // zIndex: 1,
          // backgroundColor: '#dedede',
          // border: '1px solid #dedede',
          textAlign: 'center',
        }}
      >
        <div className="row">
          <div className="col-sm-12 mb-2 pt-3">
            {/* {url} */}

            <ReactPlayer
              url={url}
              playing={playStatus}
              textTracks={false}
              controls={true}
              playbackRate={playbackRate}
              // playbackRate={1.4}
              loop={playLoop}
              //textTracks={subTitleStatus}
              volume={1}
              width="100%"
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
          </div>
          {/* <div
            className="col-sm-2 mb-2 pt-3"
            style={{ textAlign: 'left', padding: 0, margin: 0 }}
          >
            <WordListTedScript
              youtubeID={yID}
              homework_id={homework_id}
              mbn={mbn}
              tbn={tbn}
            />
          </div> */}
        </div>
        {/* <div className="row"> */}
        <div className="col-sm-12 text-center">
          {shadowingLevel == 'START' ? (
            <p style={{ fontWeight: 'bold' }}></p>
          ) : (
            <p style={{ fontWeight: 'bold' }}>
              シャドーイングをする時は字幕を消してください。
            </p>
          )}

          {/* <a
            className={btnColorLoop}
            onClick={() => {
              handleLoop(!playLoop)
            }}
          >
            {labelColorLoop}
          </a> */}

          {playStatus != true && (
            <>
              {/* <a
                className="btn btn-danger text-white ml-2 mr-2"
                onClick={() => {
                  handleChange(
                    'https://www.youtube.com/embed/' +
                      yID +
                      '&start=0' +
                      '&cc_load_policy=0'
                  )
                  setPauseState(false)
                }}
              >
                最初へ <FaFastBackward />
              </a> */}
              <a
                className="btn btn-danger text-white ml-2 mr-2 mb-2"
                onClick={() => {
                  handleStart()
                }}
              >
                プレイ <FaPlay />
              </a>
            </>
          )}

          {/* {!pauseState ? ( */}
          {!pauseState ? (
            <a
              className="btn btn-danger text-white mr-2"
              onClick={() => {
                handlePause()
                setPauseState(true)
              }}
            >
              とめる
              <FaPause />
            </a>
          ) : (
            <>
              {/* // <a
            //   className="btn btn-danger mr-2 text-white"
            //   onClick={() => {
            //     handleStart()
            //     setPauseState(false)
            //   }}
            // >
            //   とめる
            //   <FaPause />
            // </a> */}
            </>
          )}
        </div>
        {/* {playbackRate}/{shadowingSpeed} */}
      </div>

      {/* <div
        className="col-lg-12 col-md-6 mb-2 ml-0 pl-0"
        style={{
          position: 'fixed',
          top: '80px',
          width: '400px',
          textAlign: 'left',
          marginTop: 500,
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
          style={{ width: '250px' }}
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
          className="btn-sm btn-primary mr-2"
          onClick={() => {
            setSearchWord('')
          }}
        >
          CLEAR
        </a>
        <a
          style={{ width: '15%', cursor: 'pointer', color: 'white' }}
          className="btn-sm btn-danger"
          onClick={() => {
            handleWordClick(searchWord)
          }}
        >
          add word
        </a>
      </div> */}

      {/* <div
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
        <div className="pt-5">
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
                <p></p>
              </>
            )
          })}
      </div> */}
    </>
  )
}
