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

export default function YoutubeScriptTimeInsertForStudentStep3({
  yID,
  homework_id,
  mbn,
  tbn,
  shadowingSpeed,
  shadowingTitle,
  dictationStart,
  dictationSec,
  dictationHow,
}) {
  //const [youtubeID, setYoutubeID] = useState(youtubeID)
  const [pauseState, setPauseState] = useState(true)
  //const [inputValue, setInputValue] = useState('')
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [videoRefresh, setVideoRefresh] = useState(false)
  const [playStatus, setPlayStatus] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(shadowingSpeed)
  const [subTitleStatus, setSubTitleStatus] = useState(false)
  //for Loop Button
  const [playLoop, setPlayLoop] = useState(true)
  const [labelColorLoop, setLabelColorLoop] = useState('くりかえしプレイ')
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
  const [urlKids, setUrlKids] = useState()

  useEffect(() => {
    getYoutubeTimeScript()
  }, [yID])

  function getYoutubeTimeScript() {
    const fetchData = async () => {
      let newUrl = 'https://www.youtube.com/embed/' + yID
      // let newUrl = 'https://www.youtube.com/embed/' + yID + '&cc_load_policy=0'
      // let newUrl =
      //   'https://www.youtube.com/embed/' +
      //   yID +
      //   '&hl=eng&rel=0&cc_load_policy=0&modestbranding=1&autohide=1&showinfo=0&controls=0&amp&nologo=1'

      setUrl(newUrl)

      let urlkids = 'https://www.youtubekids.com/watch?v=' + yID

      setUrlKids(urlkids)

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

  function handleStartFromFirst() {
    setUrl(url)
    setPauseState(false)
    setPlayStatus(true)
  }

  function handleLoop(value) {
    if (playLoop != true) {
      // alert(playLoop)
      setPlayLoop(value)
      setLabelColorLoop('くりかえしプレイ')
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
              // loop={playLoop}
              //textTracks={subTitleStatus}
              // width="0"
              // height="0"
              // width="100px"
              // height="50px"
              style={{
                marginBottom: '10px',
                // border: '20px solid black',
                // borderRadius: '20px',
              }}
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
            />{' '}
            <br />
            <a
              href={urlKids}
              target="_blank"
              style={{
                borderRadius: '5px',
                border: '2px solid green',
                padding: '5px',
                fontSize: '14px',
              }}
            >
              YouTube
              Kidsの制限により上記の動画が表示されない場合は、こちらをクリック
            </a>
            {/* <h6>ビデオの字幕を消してから練習をスタートして下さい。</h6> */}
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
          {/* {url} */}
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

          {playStatus != true && (
            <>
              {playbackRate == 0.8 && (
                <a
                  className="btn btn-danger text-white ml-2 mr-2"
                  onClick={() => {
                    setPlaybackRate(0.8)
                    handleStart()
                  }}
                >
                  プレイ
                  <FaPlay />
                </a>
              )}
              {playbackRate == 0.9 && (
                <a
                  className="btn btn-danger text-white ml-2 mr-2"
                  onClick={() => {
                    setPlaybackRate(0.9)
                    handleStart()
                  }}
                >
                  プレイ
                  <FaPlay />
                </a>
              )}
              {playbackRate == 1 && (
                <a
                  className="btn btn-danger text-white ml-2 mr-2"
                  onClick={() => {
                    setPlaybackRate(1)
                    handleStart()
                  }}
                >
                  プレイ
                  <FaPlay />
                </a>
              )}
              {playbackRate == 1.1 && (
                <a
                  className="btn btn-danger text-white ml-2 mr-2"
                  onClick={() => {
                    setPlaybackRate(1.1)
                    handleStart()
                  }}
                >
                  プレイ
                  <FaPlay />
                </a>
              )}
              {playbackRate == 1.2 && (
                <a
                  className="btn btn-danger text-white ml-2 mr-2"
                  onClick={() => {
                    setPlaybackRate(1.2)
                    handleStart()
                  }}
                >
                  プレイ
                  <FaPlay />
                </a>
              )}
              {playbackRate == 1.3 && (
                <a
                  className="btn btn-danger text-white ml-2 mr-2"
                  onClick={() => {
                    setPlaybackRate(1.3)
                    handleStart()
                  }}
                >
                  プレイ
                  <FaPlay />
                </a>
              )}
              {playbackRate == 1.4 && (
                <a
                  className="btn btn-danger text-white ml-2 mr-2"
                  onClick={() => {
                    setPlaybackRate(1.4)
                    handleStart()
                  }}
                >
                  プレイ
                  <FaPlay />
                </a>
              )}
              {playbackRate == 1.5 && (
                <a
                  className="btn btn-danger text-white ml-2 mr-2"
                  onClick={() => {
                    setPlaybackRate(1.5)
                    handleStart()
                  }}
                >
                  プレイ
                  <FaPlay />
                </a>
              )}
            </>
          )}

          {!pauseState ? (
            <a
              className="btn btn-secondary text-white mr-2"
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
              {/* <a
                className="btn btn-danger mr-2 text-white"
                onClick={() => {
                  handleStart()
                  setPauseState(false)
                }}
              >
                <FaPause />
              </a> */}
            </>
          )}
          {/* <a
            className={btnColorLoop}
            onClick={() => {
              handleLoop(!playLoop)
            }}
          >
            {labelColorLoop}
          </a> */}
        </div>
        {/* {playbackRate}/{shadowingSpeed} */}
        <div className="col-lg-12 text-left">
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
          <center>
            <Floater
              content={
                <div
                  style={{
                    textAlign: 'center',
                    lineHeight: '1.8em',
                    color: 'white',
                    fontSize: '18px',

                    cursor: 'pointer',
                  }}
                >
                  <hr />
                  <h7>
                    あなたのシャドーイングの
                    <br />
                    指定速度は
                    <a className="btn btn-danger border border-1-dark pt-0 pb-0 mr-2 ml-2">
                      x{shadowingSpeed}
                    </a>
                    です。
                    <br />
                    ビデオの音声が遅かったり、早かったりする場合、上記のボタンでスピードを調整して下さい。
                    <br />
                    指定速度はレッスン時に先生に相談して変更して下さい。
                  </h7>
                  <hr />
                </div>
              }
              footer=""
              offset={0}
              event="hover"
              placement="right-end"
              styles={{
                floater: {
                  filter: 'none',
                },
                container: {
                  backgroundColor: '#463BF7',
                  borderRadius: 5,
                  color: 'black',
                  filter: 'none',
                  minHeight: 'none',
                  maxWidth: 400,
                  padding: 10,
                  textAlign: 'right',
                },
                arrow: {
                  color: '#000',
                  length: 8,
                  spread: 10,
                },
              }}
              title={
                <>
                  <h3
                    style={{
                      margin: '10px 0 5px',
                      lineHeight: 1,
                      fontSize: '18px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: 'white',
                    }}
                  >
                    私のシャドーイング速度
                    <span aria-label="Smile with Sunglasses" role="img">
                      😎
                    </span>{' '}
                    <hr style={{ border: '0.000000001em solid white' }} />
                  </h3>
                </>
              }
            >
              {/* <a className="btn btn-primary text-white mr-2 mb-2 mt-0">
                私のシャドーイング速度 &nbsp;[{shadowingSpeed}倍速]
              </a> */}
            </Floater>
          </center>
        </div>
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
        className="col-lg-12 mb-3 text-left "
        style={{
          // position: 'absolute',
          // top: '10px',
          // marginTop: '510px',
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
              val.endTimeSec +
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
            // var url =
            //   'https://www.youtube.com/embed/' +
            //   val.youtubeID +
            //   '?start=' +
            //   sec +
            //   '&a=' +
            //   rand +
            //   '&cc_load_policy=0'
            var url =
              'https://www.youtube.com/embed/' +
              val.youtubeID +
              '?start=' +
              sec +
              '?end=' +
              val.endTimeSec +
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
