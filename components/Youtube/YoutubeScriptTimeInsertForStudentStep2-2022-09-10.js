import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'
import { FaCross, FaPause, FaPlay, FaXingSquare } from 'react-icons/fa'
import SweetAlert from 'react-bootstrap-sweetalert'

import WordListTedScript from '@/components/WordList/WordListTedScript' //単語リスト
import Floater from 'react-floater'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faTrash,
  faPause,
  faAudioDescription,
  faHeadset,
  faHeadphones,
  faEye,
  faCross,
  faNotEqual,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'

export default function YoutubeScriptTimeInsertForStudentStep2({
  yID,
  homework_id,
  mbn,
  tbn,
  shadowingSpeed,
  shadowingTitle,
  currentStep,
  practiceTempId,
  dictationStart,
  dictationSec,
  dictationHow,
}) {
  //const [youtubeID, setYoutubeID] = useState(youtubeID)
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [pauseState, setPauseState] = useState(true)
  const [dictText, setDictText] = useState([])
  const [viewNum, setViewNum] = useState('')
  const [viewSentence, setViewSentence] = useState(false)
  //const [inputValue, setInputValue] = useState('')
  const [scriptView, setScriptView] = useState(false)
  const [feelsWrong, setFeelsWrong] = useState(false)

  const [playStatus, setPlayStatus] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(shadowingSpeed)
  const [subTitleStatus, setSubTitleStatus] = useState(false)
  //for Loop Button
  const [playLoop, setPlayLoop] = useState(true)
  const [labelColorLoop, setLabelColorLoop] = useState('くりかえしプレイ...')
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

  const [thisRightAnswerAru, setThisRightAnswerAru] = useState([])
  useEffect(() => {
    getYoutubeTimeScript()
  }, [yID])

  function getYoutubeTimeScript() {
    const fetchData = async () => {
      if (yID) {
        // console.log('this', yID)
        let newUrl = 'https://www.youtube.com/embed/' + yID
        setUrl(newUrl)

        var Url = DB_CONN_URL + '/get-youtube-time-script/' + yID
        // alert(Url)
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
    }
    fetchData()
  }

  function handleChange(url) {
    setUrl(url)
    setPlayStatus(true)
  }

  function handlePause() {
    setPlayStatus(false)
  }

  function handleStart() {
    // setPlayStatus(true)
    // setPauseState(false)
  }

  function handleLoop(value) {
    if (playLoop != true) {
      // alert(playLoop)
      setPlayLoop(value)
      setLabelColorLoop('くりかえしプレイ...')
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

  // function handleWordClick(word) {
  //   //db-table: sys_memory_word
  //   // alert(tbn)
  //   var Url =
  //     DB_CONN_URL + '/insert-memory-word-from-student-video/' +
  //     word +
  //     '&' +
  //     homework_id +
  //     '&' +
  //     mbn

  //   const fetchData2 = async () => {
  //     try {
  //       const response = await axios.get(Url)
  //     } catch (error) {
  //       alert(error)
  //     }
  //   }
  //   //wordListView()
  //   fetchData2()

  //   //alert('Registered Successfully!')
  // }

  // function viewScript() {
  //   setScriptView(false)
  //   setViewSentence(true)
  //   setViewNum(viewNum)
  // }

  // const insertPointToDB = (viewNum) => {
  //   setScriptView(false)
  //   setViewSentence(true)
  //   setViewNum(viewNum)
  //   var mbn = localStorage.getItem('MypageMbn')
  //   var pointKeyNum = 'DIC-3'

  //   var url = DB_CONN_URL + '/sys-point-member-history-insert-for-dictation'

  //   axios
  //     .post(url, {
  //       mbn: mbn,
  //       homework_id: homework_id,
  //       pointKeyNum: pointKeyNum,
  //       pointStep: currentStep,
  //       practiceTempId: practiceTempId,
  //       forDictationSentenceOrder: viewNum,
  //     })
  //     .then((response) => {
  //       // alert(response.data.message)
  //       // alert(response.data.status)

  //       if (!response.data.status) {
  //       } else {
  //         historyUpdate()
  //       }
  //     })
  // }
  function historyUpdate() {
    //1pointあげる
    // alert('historyUpdate')

    setScriptView(false)
    setViewSentence(true)
    setViewNum(viewNum)

    const fetchData = async () => {
      var mbn = localStorage.getItem('MypageMbn')

      var dictationStatus = 'completed'
      var pointKeyNum = 'DIC-3'
      // alert(mbn)
      // alert(yID)
      // alert(homework_id)
      // alert(dictationStatus)
      // alert(viewNum)
      // alert(practiceTempId)
      // alert(currentStep)
      // alert(pointKeyNum)
      try {
        var url = DB_CONN_URL + '/update-sys-video-dictation-history'
        // alert(url)
        axios
          .post(url, {
            mbn: mbn,
            youtubeID: yID,
            homework_id: homework_id,
            dictationStatus: dictationStatus,
            sentenceOrder: viewNum,
            practiceTempId: practiceTempId,
            pointStep: currentStep,
            pointKeyNum: pointKeyNum,
          })
          .then((response) => {
            // alert(response.data.message)
            // alert(response.data.status)
            // alert('here')
            getYoutubeTimeScript()
          })
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }

  function wrongScriptSend(viewNum) {
    setFeelsWrong(false)
    const fetchData = async () => {
      var mbn = localStorage.getItem('MypageMbn')
      var dictationStatus = 'completed-FeelsWrong'
      try {
        var url =
          DB_CONN_URL +
          '/update-sys-video-dictation-history-completed-FeelsWrong'
        // alert(mbn)
        // alert(homework_id)
        // alert(dictationStatus)
        // alert(viewNum)
        axios
          .post(url, {
            mbn: mbn,
            homework_id: homework_id,
            dictationStatus: dictationStatus,
            sentenceOrder: viewNum,
          })
          .then((response) => {
            // alert(response.data.message)
            getYoutubeTimeScript()
          })
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }

  function checkDicFinished(thisSentenceOrder) {
    const fetchData = async () => {
      var mbn = localStorage.getItem('MypageMbn')
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
            console.log(
              'BBBB:' + thisSentenceOrder + '/' + response.data.message
            )
          })
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }

  useEffect(() => {
    // function funcSplitInfo() {
    //  console.log('SplitHWbookInfo:', SplitHWbookInfo)
    youtubeList.map((val, key) => {
      console.log('AAAA:', key + 1)
      checkDicFinished(key + 1)
    })
    // }
  }, [youtubeList])
  return (
    <>
      {/* <div className="row"> */}
      <div
        className="col-sm-12 mb-2 pt-0"
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
          <div className="col-sm-12 mb-0 mt-0">
            <ReactPlayer
              url={url}
              playing={playStatus}
              textTracks={false}
              controls={true}
              playbackRate={playbackRate}
              // loop={playLoop}
              // playbackRate={1.4}

              //textTracks={subTitleStatus}
              volume="1"
              // width="100%"
              // height="400px"
              width="0"
              height="0"
              style={{
                marginBottom: '10px',
                // border: '10px solid #ececec'
              }}
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
          </div>
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

      <div
        className="col-lg-12 mb-0 pl-3 text-left"
        style={{
          width: '100%',
          paddingLeft: 0,
        }}
      >
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
              <div className="containers p-0">
                <div className="row p-0">
                  <div className="col-lg-12 text-left mb-0 mt-0 pt-0">
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
                            <span style={{ color: 'black' }}>{val.script}</span>
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

        {/* <Floater
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
                  あなたのリスニングの
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
                  あなたのリスニング速度
                  <span aria-label="Smile with Sunglasses" role="img">
                    😎
                  </span>{' '}
                  <hr style={{ border: '0.000000001em solid white' }} />
                </h3>
              </>
            }
          >
            <a className="btn btn-primary text-white mr-2 mb-2 mt-0">
              あなたのリスニング速度 &nbsp;[{shadowingSpeed}倍速]
            </a>
            &nbsp;&nbsp;
          </Floater>{' '} */}
      </div>
      <div
        className="col-lg-12 col-md-12 p-3 mt-0 mb-0"
        style={{
          textAlign: 'center',
          backgroundColor: '#F9E79F',
          border: '1px solid #F9E79F',
          borderRadius: '10px',
        }}
      >
        <span
          style={{
            border: 0,
            marginBottom: '10px',
            color: 'red',
            fontSize: '15px',
          }}
        >
          ノートを
          <ruby>
            用意<rt>ようい</rt>
          </ruby>
          し、
          <ruby>
            以下<rt>いか</rt>
          </ruby>
          の&nbsp;
          {/* <FontAwesomeIcon icon={faPlay} size="2x" color="black" /> */}
          <button
            className="btn btn-outline-secondary"
            style={{ width: '50px', backgrouncColor: '#555555' }}
            onClick={() => {
              // handleChange(url)
              handleChange(nowurl)
              setPauseState(false)
            }}
          >
            <FontAwesomeIcon
              icon={faPlay}
              size="lg"
              className="font-upload"
              onClick={() => {
                // handleChange(url)
              }}
            />
          </button>
          を
          <ruby>
            押<rt>お</rt>
          </ruby>
          して、ディクテーションを
          <ruby>
            始<rt>はじめ</rt>
          </ruby>
          めて
          <ruby>
            下<rt>くだ</rt>
          </ruby>
          さい。{' '}
          <a
            href="https://www.myenglib.com/myenglib/materials/howto/howto_dictation.pdf"
            target="_blank"
            className="btn btn-outline-info text-black mt-0 ml-0"
            style={{
              // border: '5px solid #555555',

              fontWeight: 'bold',

              // backgroundColor: '#555555',
            }}
          >
            課題サンプル
          </a>
          <br />
          <ruby>
            次<rt>つぎ</rt>
          </ruby>
          のレッスンまでに
          <ruby>
            指定
            <rt>してい</rt>
          </ruby>
          された
          <ruby>
            長<rt>なが</rt>
          </ruby>
          さのディクテーションを
          <ruby>
            終<rt>お</rt>
          </ruby>
          わらせるために、
          <ruby>
            毎日
            <rt>まいにち</rt>
          </ruby>
          <ruby>
            少<rt>すこ</rt>
          </ruby>
          しずつでもディクテーションを
          <ruby>
            進<rt>すす</rt>
          </ruby>
          めてください。(１セットで
          <ruby>
            全<rt>す</rt>
          </ruby>
          ての
          <ruby>
            量<rt>りょう</rt>
          </ruby>
          をやる
          <ruby>
            必要
            <rt>ひつよう</rt>
          </ruby>
          はありません）
          <ruby>
            指定
            <rt>してい</rt>
          </ruby>
          <ruby>
            量<rt>りょう</rt>
          </ruby>
          が
          <ruby>
            終<rt>お</rt>
          </ruby>
          わったら
          <ruby>
            写真
            <rt>しゃしん</rt>
          </ruby>
          を
          <ruby>
            撮<rt>と</rt>
          </ruby>
          ってアップロードしてください。
        </span>
        <p
          style={{
            color: 'green',
            paddingTop: '20px',
            paddingLeft: 20,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          あなたが
          <ruby>
            書<rt>か</rt>
          </ruby>
          いた
          <ruby>
            文章<rt>ぶんしょう</rt>
          </ruby>
          と
          <ruby>
            比較<rt>ひかく</rt>
          </ruby>
          して、
          <ruby>
            間違<rt>まちが</rt>
          </ruby>
          ったところを
          <span
            style={{
              color: 'red',
              fontSize: '25px',
              fontWeight: 'bold',
            }}
          >
            <ruby>
              自分<rt>じぶん</rt>
            </ruby>
            で
          </span>
          <ruby>
            赤<rt>あか</rt>
          </ruby>
          ペンで
          <ruby>
            直<rt>なお</rt>
          </ruby>
          しましょう！
        </p>
        <hr />
        <h6 style={{ fontSize: '15px', color: '#F33F2D' }}>
          <ruby>
            各<rt>かく</rt>
          </ruby>
          スクリプトの
          <ruby>
            最後
            <rt>さいご</rt>
          </ruby>
          の
          <ruby>
            単語
            <rt>たんご</rt>
          </ruby>
          の
          <ruby>
            音<rt>おと</rt>
          </ruby>
          が
          <ruby>
            少<rt>すこ</rt>
          </ruby>
          し
          <ruby>
            切<rt>き</rt>
          </ruby>
          れる
          <ruby>
            場合
            <rt>ばあい</rt>
          </ruby>
          がありますが、
          <ruby>
            次<rt>つぎ</rt>
          </ruby>
          の
          <ruby>
            番号
            <rt>ばんごう</rt>
          </ruby>
          の
          <ruby>
            音源
            <rt>おんげん</rt>
          </ruby>
          とつながっていますので、
          <ruby>
            音<rt>おと</rt>
          </ruby>
          が
          <ruby>
            切<rt>き</rt>
          </ruby>
          れた
          <ruby>
            場合
            <rt>ばあい</rt>
          </ruby>
          は
          <ruby>
            次<rt>つぎ</rt>
          </ruby>
          の
          <ruby>
            番号
            <rt>ばんごう</rt>
          </ruby>
          の
          <ruby>
            音源
            <rt>おんげん</rt>
          </ruby>
          から
          <ruby>
            確認
            <rt>かくにん</rt>
          </ruby>
          してください。
        </h6>
        <hr />
        <span
          className="mt-2"
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
        Dictation完了番号&nbsp;&nbsp;&nbsp;
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
        何回聴いてもよくわからなかった文章番号
      </div>
      <div
        className="col-lg-12 text-left mt-3 pl-3 pr-2 pt-3 "
        style={{
          width: '100%',

          backgroundColor: '#dedede',
          border: '1px solid #dedede',
          borderRadius: '10px',
        }}
      >
        <center>
          <h5>
            <strong>{shadowingTitle}</strong>
          </h5>

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
        </center>
        <hr />
        <div className="p-2" style={{ backgroundColor: 'white' }}>
          <h7 style={{ fontSize: '13px' }}>
            あなたのリスニングのデフォルトスピードは
            <a className="btn btn-danger border border-1-dark pt-0 pb-0 mr-1 ml-1">
              x{shadowingSpeed}
            </a>
            です。ビデオの
            <ruby>
              音源<rt>おんげん</rt>
            </ruby>
            が
            <ruby>
              遅<rt>おそ</rt>
            </ruby>
            かったり、
            <ruby>
              早<rt>はや</rt>
            </ruby>
            かったりする
            <ruby>
              場合<rt>ばあい</rt>
            </ruby>
            、
            <ruby>
              上<rt>うえ</rt>
            </ruby>
            のスピードボタンでスピードを
            <ruby>
              調整<rt>ちょうせい</rt>
            </ruby>
            して下さい。 このページのデフォルトスピードはレッスン
            <ruby>
              時<rt>じ</rt>
            </ruby>
            に
            <ruby>
              先生<rt>せんせい</rt>
            </ruby>
            に
            <ruby>
              相談<rt>そうだん</rt>
            </ruby>
            して
            <ruby>
              変更<rt>へんこう</rt>
            </ruby>
            できます。
          </h7>
        </div>
        <hr />

        {/* [00:00]&nbsp;
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
        <br /> */}

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
            //dictationやったリストをCheck

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
            //   rand +
            //   '&cc_load_policy=0'
            var nowurl =
              'https://www.youtube.com/embed/' +
              val.youtubeID +
              '?start=' +
              sec +
              '?end=' +
              secEnd +
              '&a=' +
              rand +
              '&cc_load_policy=0'

            //  +
            // '&rel=0' +
            // '&loop=1'

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
                {/* {url} */}
                {/* {ra}/{raWrong} */}
                <span
                  style={{
                    // fontSize: '32px',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    padding: '8px',
                    // background: '#fff',
                    background: roundColor,
                    color: fontColor,
                    border: '2px solid #666',

                    textAlign: 'center',
                    font: '20px Arial, sans-serif',
                    verticalAlign: 'baseline',
                  }}
                >
                  {fileNumCicle}
                </span>
                &nbsp;&nbsp; &nbsp;&nbsp;
                {/* {thisRightAnswerAru.indexOf(ra) > -1 && (
                  <span
                    style={{
                      paddingTop: '10px',
                      backgroundColor: '#ececec',
                      color: 'blue',
                    }}
                  >
                    課題済
                  </span>
                )}
                {thisRightAnswerAru.indexOf(raWrong) > -1 && (
                  <span
                    style={{
                      paddingTop: '10px',
                      backgroundColor: '#ececec',
                      color: 'red',
                    }}
                  >
                    よくわからない
                  </span>
                )} */}
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: '100',
                    color: 'darkblue',
                  }}
                >
                  [{val.startTimeSec}]〜&nbsp;
                </span>
                &nbsp;&nbsp; &nbsp;&nbsp;
                {/* {!pauseState ? (
                  <FontAwesomeIcon
                    icon={faPlay}
                    size="2x"
                    color="black"
                    onClick={() => {
                      handleChange(url)
                      setPauseState(false)
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlay}
                    size="2x"
                    color="black"
                    onClick={() => {
                      handleChange(url)
                      setPauseState(false)
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                )} */}
                {/* <span className="tab upload-icon"> */}
                <button
                  className="btn btn-outline-secondary"
                  style={{ width: '50px', backgrouncColor: '#555555' }}
                  onClick={() => {
                    handleChange(nowurl)
                    setPauseState(false)
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    size="lg"
                    className="font-upload"
                    onClick={() => {
                      handleChange(nowurl)
                      setPauseState(false)
                    }}
                  />
                </button>
                {/* </span> */}
                {/* <FontAwesomeIcon
                  icon={faPlay}
                  size="1x"
                  color="black"
                  onClick={() => {
                    // handleChange(url)
                    handleChange(nowurl)
                    setPauseState(false)
                  }}
                  style={{ cursor: 'pointer' }}
                /> */}
                &nbsp;&nbsp; &nbsp;&nbsp;
                {/* {viewSentence ? 'true' : 'false'}/{viewNum} */}
                {/* <FontAwesomeIcon
                  icon={faEye}
                  size="2x"
                  color="red"
                  onClick={() => {
                    setScriptView(true)
                    // setViewSentence(!viewSentence)
                    // setViewSentence(true)
                    setViewNum(fileNum)
                  }}
                  style={{ cursor: 'pointer' }}
                /> */}
                {/* {scriptView == true && viewNum == fileNum */}
                <span
                  className="btn btn-info"
                  onClick={() => {
                    setViewNum(fileNum)
                    setScriptView(true)
                    setViewSentence(false)
                    // setViewSentence(true)
                    // setPlayStatus(false)
                  }}
                >
                  スクリプトを見る
                </span>
                &nbsp;&nbsp;<strong>&larr;</strong>
                <span style={{ color: 'darkslategray', fontSize: '12px' }}>
                  このボタンはノートに
                  <ruby>
                    書<rt>か</rt>
                  </ruby>
                  いた
                  <ruby>
                    後<rt>あと</rt>
                  </ruby>
                  に
                  <ruby>
                    押<rt>お</rt>
                  </ruby>
                  す
                </span>
                {/* {viewSentence && viewNum == fileNum && (
                  <FontAwesomeIcon
                    icon={faEye}
                    size="2x"
                    color="gray"
                    onClick={() => {
                      setViewSentence(false)
                      setViewNum()
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                )} */}
                &nbsp;&nbsp; &nbsp;&nbsp;
                {/* <input
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
                /> */}
                {viewSentence && viewNum == fileNum && (
                  <>
                    <p
                      dangerouslySetInnerHTML={{ __html: newScript }}
                      value="html"
                      id="search_para"
                      style={{
                        paddingTop: 10,
                        paddingLeft: 10,
                        border: 0,
                        backgroundColor: '#dedede',
                        marginBottom: '0px',

                        color: 'navy',
                        fontSize: '18px',
                        // cursor: 'pointer',
                      }}
                      // onClick={() => {
                      //   handleChange(url)
                      //   setPauseState(false)
                      // }}
                    />

                    <center>
                      <span
                        className="btn btn-danger mt-2"
                        onClick={() => {
                          //wrongScriptSend(viewNum)
                          setFeelsWrong(true)
                        }}
                      >
                        何回聞いても聞こえない単語がある時にクリック。
                      </span>
                    </center>
                  </>
                )}
                <hr style={{ border: '0.001em solid #BAB8B2' }} />
              </>
            )
          })}
      </div>
      <SweetAlert
        title="書き終わりましたか？"
        show={scriptView}
        // onConfirm={() => insertPointToDB(viewNum)}
        onConfirm={() => historyUpdate()}
        onCancel={() => {
          setScriptView(false)
        }}
        confirmBtnText="はい！書き終わりました。"
        cancelBtnText="いいえ、まだ。"
        showCancel={true}
        reverseButtons={false}
        style={{ width: '600px', backgroundColor: '#afeeee' }}
      >
        <p>ノートに書き終わってから「はい！」ボタンを押して下さい。</p>
      </SweetAlert>
      <SweetAlert
        title="先生に報告しました。"
        show={feelsWrong}
        onConfirm={() => wrongScriptSend(viewNum)}
        onCancel={() => {
          setFeelsWrong(false)
        }}
        confirmBtnText="OK"
        cancelBtnText="NO"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px', backgroundColor: '#afeeee' }}
      >
        <p>次のレッスン時に先生と一緒に確認してみましょう！</p>
      </SweetAlert>
    </>
  )
}
