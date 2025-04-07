import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import S3 from 'react-aws-s3'
import SweetAlert from 'react-bootstrap-sweetalert'
import getBlobDuration from 'get-blob-duration'
import MicRecorder from 'mic-recorder-to-mp3'
import StepGoal from '@/components/readingSelfcourse/StepGoal'
import { myFun_addZero } from '../FunctionComponent'
import SpeechToText from '@/components/voice-to-text/SpeechToText'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
// import CountUp from 'react-countup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faStopCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

import WaveAppLessonPage from '@/components/Wave/WaveAppLessonPage'
import { NavigateBeforeSharp } from '@material-ui/icons'

const audioRecorder = new MicRecorder({ bitRate: 128 })
const limitDuration = '5' //録音音声が指定した数字の秒以上にならないと登録されない
const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

//128:radio quality,  160 or higher:CD, 256 kilobit- iTunes
// const [initRecording, setInitRecording] = useState()
// useEffect(() => {
//   setInitRecording(true)
// }, [])
const S3_BUCKET = process.env.S3_REACT_APP_DIR_NAME
const REGION = process.env.S3_REACT_APP_REGION
const ACCESS_KEY = process.env.S3_REACT_APP_ACCESS_ID
const SECRET_ACCESS_KEY = process.env.S3_REACT_APP_ACCESS_KEY

export default class VoiceRecorder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isblocked: false,
      blobUrl: '',
      blob: '',
      isrecording: false,
      isdeleted: false,
      isRefreshBtn: false,
      audio: '',
      isLoading: false,
      isError: false,
      // record_comment: '',
      mbn: this.props.mbn,
      quizTempId: this.props.quizTempId,
      qNum: this.props.qNum,
      currentQuestion: this.props.currentQuestion,
      // homework_id: this.props.homework_id,
      // practiceTempId: this.props.practiceTempId,
      // pointKeyNum: this.props.pointKeyNum,
      // pointStep: this.props.pointStep,
      recordFileList: [],
      recordListView: false,
      deleteFileName: '',
      // audioDurationFromDB: this.props.audioDurationFromDB,
      totalRecordCount: 0,
      leastRecordCount: this.props.leastRecordCount,
      // isAudioPlaying: this.props.isAudioPlaying,

      // s3_DIR: 'hw_rec'
    }
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.handleaudiofile = this.handleaudiofile.bind(this)

    //console.log('audioDurationFromDB', this.props.audioDurationFromDB) //5:25
  }

  // handleCalAudioDurationFromDB(audioDurationFromDB, YourFileDuration, Wari) {
  //   // var ad = audioDurationFromDB
  //   var audioMin = parseInt(audioDurationFromDB.split(':')[0])
  //   var audioSec = parseInt(audioDurationFromDB.split(':')[1])

  //   var totalMinToSec = audioMin * 60
  //   var totalSec = parseInt(totalMinToSec) + parseInt(audioSec)
  //   console.log('audioMin', audioMin)
  //   console.log('audioSec', audioSec)
  //   console.log('totalMinToSec', totalMinToSec)
  //   console.log('totalSec', totalSec)
  //   //DBのAudioのWari(例:0.5 半分の長さ)の長さを知る: 生徒が録音したファイルの長さが、元々のDB Audio Fileの半分以上の長さにならないとエラーを足すために
  //   var totalSecWari = parseInt(totalSec * Wari)

  //   console.log('totalSecWari:', totalSecWari)
  //   console.log('YourFileDuration', YourFileDuration)
  //   if (totalSecWari > YourFileDuration) {
  //     alert('音声の長さが短いです。全てのストーリを録音してください。')
  //     console.log('短い totalSecHalf', totalSecWari)
  //     console.log('短い YourFileDuration', YourFileDuration)
  //     this.setState({
  //       isrecording: false,
  //     })
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  start = () => {
    if (this.state.isblocked) {
      console.log('permission Denied')
    } else {
      this.setState({
        //録音された回数を数える
        totalRecordCount: parseInt(this.state.totalRecordCount) + parseInt(1),
      })

      //alert(this.state.totalRecordCount)
      audioRecorder
        .start()
        .then(() => {
          this.setState({
            isrecording: true,
            isdeleted: false,
            isRefreshBtn: false,
          })
        })
        .catch((e) => console.log(e))
    }
  }

  stop = () => {
    const fetchAudioData = async () => {
      try {
        const [buffer, blob] = await audioRecorder.stop().getMp3()
        // .then(([buffer, blob]) => {
        const blobUrl = URL.createObjectURL(blob)

        //blob duration : audio Fileの長さ
        const dur = await getBlobDuration(blobUrl)
        //console.log(' original duration:', dur)
        const duration = dur.toFixed(0) //4.596843の場合5になる

        //DB audioと自分が録音した長さを比較して、短い場合はエラーを出す。(例：0.5はDB audioの半分の長さ以下の場合エラーを出す)
        //var aud = '30' //TEST用 5秒
        // var aud = this.state.audioDurationFromDB //実践用
        // var compareAudioDuration = this.handleCalAudioDurationFromDB(
        //   aud,
        //   duration,
        //   0.9
        // )
        // if (compareAudioDuration == false) {
        //   return false
        // }

        this.setState({
          blobUrl,
          isrecording: false,
          isdeleted: false,
          isRefreshBtn: true,
        })

        // var mbn = localStorage.getItem('MypageMbn')

        const d = new Date()
        let y = d.getFullYear()
        let mt = d.getMonth() + 1
        let day = d.getDate()
        let h = myFun_addZero(d.getHours())
        let m = myFun_addZero(d.getMinutes())
        let s = myFun_addZero(d.getSeconds())
        let ms = myFun_addZero(d.getMilliseconds())
        let time =
          y + '-' + mt + '-' + day + '_' + h + ':' + m + ':' + s + ':' + ms

        var d2 =
          this.state.mbn + '_' + this.state.quizTempId + '_' + this.state.qNum
        //hw番号も入れる

        var file = new File([blob], d2, { type: 'audio/mp3' }) //original:audio/wav
        // console.log(file)

        this.handleaudiofile(file, duration)
        // this.insertPointToDB()
      } catch (error) {
        error('stop error')
      }

      // .catch((e) => console.log('We could not retrieve your message'))
    }
    fetchAudioData()
  }

  deleteAudio = () => {
    // alert('isdelete')

    this.setState({
      blobUrl: '',
      blob: '',
      isdeleted: true,
      isRefreshBtn: false,
    })
  }

  handleaudiofile(ev, dur) {
    const fetchData = async () => {
      let file = ev
      let fileName = ev.name
      let fileType = ev.type
      let duration = dur
      console.log('ev', ev)
      console.log('ev.size', ev.size)
      console.log('ev.time', ev.time)
      console.log('fileName:', fileName)
      console.log('fileType:', fileType)

      try {
        // alert('1')

        const response = await axios.post(DB_CONN_URL + '/sign_s3', {
          fileName: fileName,
          fileType: fileType,
        })

        // alert('2')
        var returnData = response.data.data.returnData
        var signedRequest = returnData.signedRequest
        var url = returnData.url
        var options = {
          statusCode: 200,
          headers: {
            'Content-Type': fileType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,PUT',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }

        // console.log('signedRequest', signedRequest)
        const fetchData2 = async () => {
          try {
            const result = await axios.put(signedRequest, file, options)
            this.setState({ audio: url, isRefreshBtn: true })
            this.getFileFromAws(
              this.state.mbn,
              this.state.qNum,
              this.state.quizTempId
            )
          } catch (error) {
            alert('error' + JSON.stringify(error))
            alert('送信エラーです。もう一度録音して下さい。1')
          }

          //Loding
        }

        fetchData2()
        //alert('宿題音声を送信しました！') //ここではないと、音声ファイルの長さが 最初は0に見える
        // alert('koko')
      } catch (error) {
        this.setState({
          isError: true,
        })
        alert('送信エラーです。もう一度録音して下さい。2')

        alert(error)
        return false
      }

      this.setState({
        isLoading: false,
      })
      this.audioIntoDB(fileName, duration)
    }

    fetchData()
  }

  audioIntoDB = (fileName, duration) => {
    //duration= audio file's 長さ
    var rc = this.state.record_comment

    const fetchData3 = async () => {
      try {
        // alert(this.state.practiceTempId)
        const response = await axios.post(DB_CONN_URL + '/member-test-record', {
          mbn: this.state.mbn,
          fileName: fileName,
          qNum: this.state.qNum, //add 2022-03-28
          quizTempId: this.state.quizTempId,
          length_second: duration, //add 2022-03-29
        })
        if (!response.data.register) {
          console.log('Audio File DB 登録成功')
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert('db insert error')
      }
    }

    fetchData3()
  }

  getFileFromAws = (mbn, qNum, quizTempId) => {
    const fetchData4 = async () => {
      try {
        // alert(mbn)
        // alert(this.state.practiceTempId)
        // alert(this.state.qNum)
        console.log('************************')
        console.log('************************')
        console.log('****mbn:', mbn)
        console.log('****qNum:', qNum)
        console.log('****quizTempId:', quizTempId)
        const response = await axios.post(
          DB_CONN_URL + '/get-test-record-file',
          {
            mbn: mbn,
            qNum: qNum,
            quizTempId: quizTempId,
          }
        )

        if (!response.data.status) {
          alert(response.data.message) //for test
        } else {
          this.setState({
            recordFileList: response.data.result,
          })
          // alert('length')
          // alert(response.data.length)
          if (response.data.length == 0) {
            console.log('$$$ :0')
            this.setState({
              // recordFileList: response.data.result,
              recordListView: false,
            })
          } else {
            console.log('$$$ :1以上')
            this.setState({
              // recordFileList: response.data.result,
              recordListView: true,
            })
          }
        }
      } catch (error) {
        alert(error)
      }
    }

    fetchData4()
  }

  // getFileFromAws = (mbn, qNum, quizTempId) => {
  //   axios
  //     .post(DB_CONN_URL + '/get-test-record-file', {
  //       mbn: mbn,
  //       qNum: qNum,
  //       quizTempId: quizTempId,
  //     })
  //     .then((response) => {
  //       if (!response.data.status) {
  //         alert(response.data.message) //for test
  //       } else {
  //         this.setState({
  //           recordFileList: response.data.result,
  //           recordListView: true,
  //         })
  //       }
  //     })
  // }

  handleViewList = (value) => {
    this.setState({
      recordListView: value,
    })
  }

  handleFileDel = (id) => {
    this.handleFileSelect(id)
    var Url = DB_CONN_URL + '/record-delete-test/' + id
    //console.log(Url)
    const fetchData = async () => {
      try {
        await axios.get(Url).then((response) => {
          //alert('deleted')
        })
      } catch (error) {
        alert('delete error!')
      }
    }
    fetchData()
  }

  handleFileSelect = (id) => {
    var Url = DB_CONN_URL + '/record-select-test/' + id

    const fetchData = async () => {
      try {
        // const response =
        await axios.get(Url).then((response) => {
          //削除したファイル名をdeleteFileName変数に入れる
          this.setState({ deleteFileName: response.data.result[0].filename })
          this.handleDelFileS3(response.data.result[0].filename)
        })
        //audio listing
        this.getFileFromAws(
          this.state.mbn,
          this.state.qNum,
          this.state.quizTempId
        )
      } catch (error) {
        alert('select error!')
      }
    }
    fetchData()
  }

  handleDelFileS3 = (value) => {
    const config = {
      bucketName: S3_BUCKET,
      region: REGION,
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    }
    const ReactS3Client = new S3(config)
    const filename = value
    // const filename = 'keysessay.jpg' //for test
    // alert(filename)
    console.log('filename:', filename)

    ReactS3Client.deleteFile(filename)
      .then((response) => {
        console.error(response)
        console.log(response)
      })
      .catch((err) => {
        console.error(err)
        console.log('s3 delete failed')
      })
  }

  // FuntotalRecordSum = () => {
  //   if (this.state.recordFileList != '') {
  //     var sum = this.state.recordFileList
  //       .map((val, key) => val.length_second)
  //       .reduce((a, b) => a + b)

  //     this.setState({
  //       totalRecordTime: sum,
  //     })

  //     return this.state.totalRecordTime
  //   }
  // }

  // componentDidUpdate() {
  //   this.FuntotalRecordSum()
  //   // navigator.getUserMedia(
  //   //   { audio: true, video: false },
  //   //   () => {
  //   //     console.log('Permission Granted')
  //   //     this.setState({ isblocked: false })
  //   //   },
  //   //   () => {
  //   //     console.log('Permission Denied')
  //   //     this.setState({ isblocked: true })
  //   //   }
  //   // )
  // }
  componentDidMount() {
    // Runs after the first render() lifecycle

    this.getFileFromAws(this.state.mbn, this.state.qNum, this.state.quizTempId)

    //最初にRecordingエラーになることを防ぐためにテスト的に入れてみる。
    this.start
    this.stop
  }

  render() {
    //if (this.state.isError) return <h1>Upload Error, try again!</h1>
    if (this.state.isLoading) {
      return (
        <h5>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recording....................
        </h5>
      )
    }
    return (
      <>
        <div>
          <div style={{ textAlign: 'center' }}>
            {this.state.isrecording && (
              <center>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: 'red',
                    paddingTop: '0px',
                    marginTop: 0,
                    marginBottom: 0,
                    paddingLeft: '60px',
                  }}
                >
                  recording.....
                </span>
              </center>
            )}{' '}
          </div>

          {() => {
            this.getFileFromAws(
              this.state.mbn,
              this.state.qNum,
              this.state.quizTempId
            )
          }}

          {this.state.recordListView &&
            this.state.recordFileList.map((val, key) => {
              var audioFile =
                'https://englib.s3.ap-northeast-1.amazonaws.com/' + val.filename

              return (
                <>
                  <div>
                    {/* <div className="single-features-box m-0 p-0  bg-white "> */}
                    <div
                      className="col-lg-12 col-md-12 "
                      style={{ textAlign: 'center' }}
                    >
                      {/* <MediaQuery query="(max-width: 767px)"> */}
                      <div className="banner-content">
                        <font
                          style={{
                            fontWeight: 'bold',
                            color: 'black',
                            paddingTop: 0,
                            paddingBottom: 5,
                          }}
                        >
                          {/* {key + 1}. &nbsp; */}
                        </font>
                        {val.qNum == this.state.qNum && (
                          <audio
                            src={audioFile}
                            controls="controls"
                            style={{
                              alignItems: 'center',
                              height: '25px',
                              paddingTop: '10px',
                              width: '40%',
                              textAlign: 'center',
                            }}
                          />
                        )}
                      </div>
                      {/* </MediaQuery> */}
                      {/* <MediaQuery query="(min-width: 767px)">
                        <div className="banner-content">
                          <font
                            style={{
                              fontWeight: 'bold',
                              color: 'black',
                              paddingTop: 0,
                              paddingBottom: 5,
                            }}
                          >
                         
                          </font>

                          {val.qNum == this.state.qNum && (
                            <audio
                              src={audioFile}
                              controls="controls"
                              style={{
                                alignItems: 'center',
                                height: '25px',
                                paddingTop: '10px',
                                paddingRight: 0,
                                marginRight: 0,
                                width: '80%',
                                textAlign: 'center',
                              }}
                            />
                          )}
                        </div>
                      </MediaQuery> */}
                    </div>
                    {/* <div
                      className="col-lg-2 col-md-12 "
                      style={{ textAlign: 'left' }}
                    >
                      <div className="banner-content">
                        <a
                          className="btn-sm btn-danger ml-2"
                          onClick={() => {
                            this.handleFileDel(val.autoid)
                          }}
                          style={{ textAlign: 'center' }}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="1x"
                            color="#ececec"
                          />
                          &nbsp;
                        </a>
                      </div>
                    </div> */}
                  </div>
                </>
              )
            })}
          {/* <hr /> */}

          <div className="row">
            <div
              className="col-lg-12 col-md-12 mb-1 mt-2"
              style={{ textAlign: 'center' }}
            >
              <div className="banner-content">
                {this.state.totalRecordCount < 1 && (
                  <button
                    // className="btn mr-3"
                    className="start-button mr-5"
                    style={{
                      color: 'white',
                      backgroundColor: 'white',
                      textAlign: 'right',
                    }}
                    onClick={this.start}
                    disabled={
                      this.state.isrecording
                      //  || !this.state.isAudioPlaying
                    }
                    type="button"
                    aria-label="録音スタート"
                    data-balloon-pos="up"
                  >
                    {this.state.isrecording ? (
                      <FontAwesomeIcon
                        icon={faMicrophone}
                        size="3x"
                        color="#ececec"
                        spin
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faMicrophone}
                        size="3x"
                        color="red"
                      />
                    )}
                  </button>
                )}
                <button
                  className="start-button "
                  onClick={this.stop}
                  disabled={!this.state.isrecording}
                  style={{ color: 'white', backgroundColor: 'white' }}
                  type="button"
                  aria-label="録音ストップ"
                  data-balloon-pos="up"
                  pointerEvent="none"
                >
                  {this.state.isrecording ? (
                    <FontAwesomeIcon
                      icon={faStopCircle}
                      size="3x"
                      color="red"
                    />
                  ) : (
                    <>
                      {/* <FontAwesomeIcon
                        icon={faStopCircle}
                        size="3x"
                        color="#dedede"
                      /> */}
                    </>
                  )}
                </button>
              </div>
            </div>

            <div
              className="col-lg-2 col-md-12"
              style={{ backgroundColor: '#dedede' }}
            ></div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-2 col-md-12">
              <div className="banner-content"></div>
            </div>

            <div className="col-lg-2 col-md-12">
              <div className="banner-content"></div>
            </div>
          </div>

          {!this.state.isrecording && (
            <div>
              <SpeechToText mbn={this.state.mbn} />
            </div>
          )}
          {this.state.isrecording && (
            <div className="col-lg-12">
              <WaveAppLessonPage />
              <SpeechToText isrecording={true} mbn={this.state.mbn} />
            </div>
          )}
        </div>
      </>
    )
  }
}
