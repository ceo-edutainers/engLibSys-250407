import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import S3 from 'react-aws-s3'
import SweetAlert from 'react-bootstrap-sweetalert'
import getBlobDuration from 'get-blob-duration'
import MicRecorder from 'mic-recorder-to-mp3'
// import StepGoal from '@/components/shadowingSelfCourse/StepGoal'
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
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
const DB_CONN_URL = process.env.DB_CONN_URL
const S3_BUCKET = process.env.S3_REACT_APP_DIR_NAME
const REGION = process.env.S3_REACT_APP_REGION
const ACCESS_KEY = process.env.S3_REACT_APP_ACCESS_ID
const SECRET_ACCESS_KEY = process.env.S3_REACT_APP_ACCESS_KEY
const audioRecorder = new MicRecorder({ bitRate: 160 })
const limitDuration = '5' //録音音声が指定した数字の秒以上にならないと登録されない

//128:radio quality,  160 or higher:CD, 256 kilobit- iTunes
// const [initRecording, setInitRecording] = useState()
// useEffect(() => {
//   setInitRecording(true)
// }, [])

export default class VoiceRecorderToS3ForSelfLessonPage5Times extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isblocked: false,
      blobUrl: '',
      blob: '',
      isOpenBackMypage: false,
      isrecording: false,
      isdeleted: false,
      isRefreshBtn: false,
      audio: '',
      isLoading: false,
      isError: false,
      record_comment: '',
      mbn: this.props.mbn,
      homework_id: this.props.homework_id,
      practiceTempId: this.props.practiceTempId,
      pointKeyNum: this.props.pointKeyNum,
      pointStep: this.props.pointStep,
      recordFileList: [],
      recordListView: false,
      deleteFileName: '',
      audioDurationFromDB: this.props.audioDurationFromDB,
      audioDurationFromDBTxt: '',
      totalRecordTime: 0,
      leastRecordCount: this.props.leastRecordCount,
      pageView: this.props.pageView,
      // isAudioPlaying: this.props.isAudioPlaying,

      // s3_DIR: 'hw_rec'
    }

    // Error
    // var audioMin = parseInt(this.props.audioDurationFromDB.split(':')[0])
    // var audioSec = parseInt(this.props.audioDurationFromDB.split(':')[1])
    // var durchkText = audioMin + '分' + audioSec + '秒'
    // this.setState({
    //   audioDurationFromDBTxt: durchkText,
    // })

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.handleaudiofile = this.handleaudiofile.bind(this)
  }

  handleCalAudioDurationFromDB(audioDurationFromDB, YourFileDuration, Wari) {
    // var ad = audioDurationFromDB
    var audioMin = parseInt(audioDurationFromDB.split(':')[0])
    var audioSec = parseInt(audioDurationFromDB.split(':')[1])
    // console.log('audioDurationFromDB', audioDurationFromDB)
    var totalMinToSec = audioMin * 60
    var totalSec = (parseInt(totalMinToSec) + parseInt(audioSec)) * 5
    // console.log('audioMin', audioMin)
    // console.log('audioSec', audioSec)
    // console.log('totalMinToSec', totalMinToSec)
    // console.log('totalSec', totalSec)
    //DBのAudioのWari(例:0.5 半分の長さ)の長さを知る: 生徒が録音したファイルの長さが、元々のDB Audio Fileの半分以上の長さにならないとエラーを足すために
    var totalSecWari = parseInt(totalSec * Wari)

    // console.log('totalSecWari:', totalSecWari)
    // console.log('YourFileDuration', YourFileDuration)
    // console.log('Wari', Wari)

    // if (totalSecWari > YourFileDuration) {
    //   // alert('音声の長さが短いです。全てのストーリーを録音してください。')

    //   this.setState({
    //     isOpenBackMypage: true,
    //     isrecording: false,
    //   })
    //   return false
    // } else {
    //   return true
    // }

    // this.setState({
    //   totalAudioSec: totalSec,
    // })
    // var ta = this.props.totalAudioSec
    // console.log('aduioMin:', audioMin)
    // console.log('audioSec:', audioSec)
    // console.log('totalMinToSec:', totalMinToSec)
    // console.log('totalSec:', totalSec)
  }

  insertPointToDB() {
    var mbn = this.state.mbn
    var pointKeyNum = this.state.pointKeyNum
    var homework_id = this.state.homework_id
    var pointStep = this.state.pointStep
    var practiceTempId = this.state.practiceTempId
    var url = DB_CONN_URL + '/sys-point-member-history-insert'
    axios
      .post(url, {
        mbn: mbn,
        homework_id: homework_id,
        pointKeyNum: pointKeyNum,
        pointStep: pointStep,
        practiceTempId: practiceTempId,
      })
      .then((response) => {
        if (!response.data.status) {
          //console.log('no information', response)
          //alert(response.data.message) //for test
          //alert('ポイントゲット!!!')
        } else {
          //alert(response.data.message)
          // setCurrentQuestion(currentQuestion + 1)
          // setNowClickedColor('')
        }
      })
    //alert(currentQuestion + 1)
  }

  start = () => {
    if (this.state.isblocked) {
      console.log('permission Denied')
    } else {
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
        var testmode = localStorage.getItem('MODE')
        if (
          this.props.mbn == '1111111111111' ||
          this.props.mbn == '1111111111112' ||
          this.props.mbn == '1111111111113' ||
          this.props.mbn == '1111111111114' ||
          this.props.mbn == '1111111111115' ||
          this.props.mbn == '1111111111116' ||
          this.props.mbn == '1111111111117' ||
          this.props.mbn == '1111111111118' ||
          this.props.mbn == '1111111111119' ||
          testmode == 'TEST'
        ) {
          var aud = '0:5' //TEST用 5秒
          // console.log('aud-test', aud)
        } else {
          var aud = this.props.audioDurationFromDB //実践用
          // console.log('aud', aud)
        }

        // alert(aud)
        // console.log('props', this.props.audioDurationFromDB)
        // console.log('state', this.state.audioDurationFromDB)
        var compareAudioDuration = this.handleCalAudioDurationFromDB(
          aud,
          duration,
          0.9
        )
        if (compareAudioDuration == false) {
          return false
        }

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

        var d2 = this.state.homework_id + '_' + time
        //hw番号も入れる

        var file = new File([blob], d2, { type: 'audio/mp3' }) //original:audio/wav
        // console.log(file)

        this.handleaudiofile(file, duration)
        this.insertPointToDB()
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
      // console.log('ev', ev)
      // console.log('ev.size', ev.size)
      // console.log('ev.time', ev.time)
      // console.log('fileName:', fileName)
      // console.log('fileType:', fileType)

      try {
        // alert('1')
        var url = DB_CONN_URL + '/sign_s3'
        const response = await axios.post(url, {
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
              this.state.homework_id,
              this.state.practiceTempId,
              this.state.pointStep
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
        var url = DB_CONN_URL + '/member-record'
        const response = await axios.post(url, {
          mbn: this.state.mbn,
          fileName: fileName,
          homework_id: this.state.homework_id, //add 2022-03-28
          practiceTempId: this.state.practiceTempId,
          step: this.state.pointStep,
          record_comment: rc,
          who_record: 'student', //tutor , student
          when_record: 'homework', //homework'宿題時, 'lesson'=レッスン中, 'before-lesson'=レッスンの前, 'after-lesson'レッスンの後
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

  getFileFromAws = (mbn, homework_id, practiceTempId, pointStep) => {
    const fetchData4 = async () => {
      try {
        // alert(this.state.practiceTempId)
        var url = DB_CONN_URL + '/get-member-record-file'
        const response = await axios.post(url, {
          mbn: mbn,
          homework_id: homework_id,
          practiceTempId: practiceTempId,
          who_record: 'student',
          currentStep: pointStep,
        })

        if (!response.data.status) {
          alert(response.data.message) //for test
        } else {
          this.setState({
            recordFileList: response.data.result,
            recordListView: true,
          })
        }
      } catch (error) {
        alert('db insert error')
      }
    }

    fetchData4()
  }

  handleViewList = (value) => {
    this.setState({
      recordListView: value,
    })
  }

  handleFileDel = (id, mbn, homework_id) => {
    this.handleFileSelect(id)
    var url = DB_CONN_URL + '/record-delete/'
    var Url = url + id
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
    var url = DB_CONN_URL + '/record-select/'
    var Url = url + id

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
          this.state.homework_id,
          this.state.practiceTempId,
          this.state.pointStep
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

    this.getFileFromAws(
      this.state.mbn,
      this.state.homework_id,
      this.state.practiceTempId,
      this.state.pointStep
    )

    //最初にRecordingエラーになることを防ぐためにテスト的に入れてみる。
    this.start
    this.stop
  }

  render() {
    //if (this.state.isError) return <h1>Upload Error, try again!</h1>
    if (this.state.isLoading) {
      return <h5>recording....................</h5>
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
                  }}
                >
                  <b>！</b>
                  <ruby>
                    必<rt>かなら</rt>
                  </ruby>
                  ず
                  <ruby>
                    本文<rt>ほんぶん</rt>
                  </ruby>
                  の
                  <ruby>
                    最初<rt>さいしょ</rt>
                  </ruby>
                  から
                  <ruby>
                    最後<rt>さいご</rt>
                  </ruby>
                  まで
                  <ruby>
                    全<rt>すべ</rt>
                  </ruby>
                  て
                  <ruby>
                    練習<rt>れんしゅう</rt>
                  </ruby>
                  (
                  <ruby>
                    録音<rt>ろくおん</rt>
                  </ruby>
                  )をしてください。
                  <br />
                  recording.....
                </span>
              </center>
            )}{' '}
          </div>

          {() => {
            this.getFileFromAws(
              this.state.mbn,
              this.state.homework_id,
              this.state.practiceTempId,
              this.state.pointStep
            )
          }}

          {this.state.recordListView &&
            this.state.recordFileList.map((val, key) => {
              var audioFile =
                'https://englib.s3.ap-northeast-1.amazonaws.com/uploadrecording/' +
                val.filename

              // const sum = this.state.recordFileList.reduce(
              //   (sum, { length_second }) => sum + parseInt(length_second),
              //   0
              // )
              // console.log('sum', sum)
              // this.setState({
              //   totalRecordTime: sum,
              // })

              // var lengthSum = this.state.recordFileList.reduce(
              //   (total, currentValue) =>
              //     (total = total + currentValue.length_second),
              //   0
              // )
              // console.log(
              //   'this.state.recordFileList',
              //   this.state.recordFileList
              // )
              // console.log('lengthSum', lengthSum)

              // {this.fileExistCheck(audioFile) &&
              return (
                <>
                  <div className="row align-items-center">
                    <div className="col-lg-2 col-md-12"></div>
                    <div className="col-lg-8 col-md-12">
                      {/* <div className="single-features-box m-0 p-0  bg-white "> */}

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
                          {key + 1}. &nbsp;
                        </font>

                        <audio
                          src={audioFile}
                          controls="controls"
                          style={{
                            alignItems: 'center',
                            height: '25px',
                            paddingTop: '10px',
                            paddingRight: 0,
                            marginRight: 0,
                            width: '95%',
                            textAlign: 'center',
                          }}
                        />
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
                            {key + 1}. &nbsp;
                          </font>
                          <audio
                            src={audioFile}
                            controls="controls"
                            style={{
                              alignItems: 'center',
                              height: '25px',
                              paddingTop: '10px',
                              paddingRight: 0,
                              marginRight: 0,
                              width: '95%',
                              textAlign: 'center',
                            }}
                          />
                        </div>
                      </MediaQuery> */}
                    </div>
                    <div
                      className="col-lg-2 col-md-12 "
                      style={{ textAlign: 'left' }}
                    >
                      {/* <div className="single-features-box  m-0 p-0 bg-white"> */}
                      <div className="banner-content">
                        <a
                          className="btn-sm btn-danger ml-2"
                          onClick={() => {
                            this.handleFileDel(
                              val.autoid,
                              val.member_barcode_num,
                              val.filename
                            )
                          }}
                          style={{ textAlign: 'center' }}
                          aria-label="間違って録音したファイルは削除してください。練習の音声以外の音声が入っているファイルを提出しないようにお願いします。
次のステップに行く前に必ずこのステップで必要な数以上のファイルは残してください。"
                          data-balloon-pos="up"
                          data-balloon-length="large"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="1x"
                            color="#ececec"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          {/* <hr /> */}

          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12 mb-3 mt-0 ">
              {/* <p style={{ fontSize: '12px', color: 'red' }}>
                ネット環境が良くない場合、録音がエラーになることがあります。
                <br />
                続けてエラーになる場合は、管理者にお問い合わせください。
              </p> */}
              {/* {this.props.audioDurationFromDB != '' && (
                <h4 style={{ color: 'black' }}>
                  1回録音予想時間 {this.props.audioDurationFromDB}
                  <font style={{ fontSize: '12px' }}>(分:秒)</font>
                </h4>
              )} */}
            </div>
            <div
              className="col-lg-5 col-md-12 mb-1 mt-2"
              style={{ textAlign: 'right' }}
            >
              <div className="banner-content">
                <span
                  // className="btn mr-3"
                  className="start-button mr-5"
                  style={{
                    color: 'white',
                    backgroundColor: 'white',
                    textAlign: 'right',
                    cursor: 'pointer',
                  }}
                  onClick={this.start}
                  disabled={
                    this.state.isrecording
                    //  || !this.state.isAudioPlaying
                  }
                  // type="button"
                  // aria-label="録音スタート"
                  // data-balloon-pos="up"
                >
                  {this.state.isrecording ? (
                    <FontAwesomeIcon
                      icon={faMicrophone}
                      // size="3x"
                      color="#ececec"
                      style={{
                        fontSize: '80px',
                        fontWeight: 'normal',
                        backgroundColor: 'white',
                      }}
                      spin
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faMicrophone}
                      // size="3x"
                      style={{
                        fontSize: '80px',
                        fontWeight: 'normal',
                        backgroundColor: 'white',
                      }}
                      color="red"
                    />
                  )}
                </span>

                <span
                  className="start-button "
                  onClick={this.stop}
                  disabled={!this.state.isrecording}
                  style={{
                    color: 'white',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                  }}
                  // type="button"
                  // aria-label="録音ストップ"
                  // data-balloon-pos="up"
                  // pointerEvent="none"
                >
                  {this.state.isrecording ? (
                    <FontAwesomeIcon
                      icon={faStopCircle}
                      // size="3x"
                      style={{
                        fontSize: '80px',
                        fontWeight: 'normal',
                        backgroundColor: 'white',
                      }}
                      color="red"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faStopCircle}
                      // size="3x"
                      style={{
                        fontSize: '80px',
                        fontWeight: 'normal',
                        backgroundColor: 'white',
                      }}
                      color="#dedede"
                    />
                  )}
                </span>
              </div>
            </div>
            <div
              className="col-lg-1 col-md-12"
              style={{ backgroundColor: '#dedede' }}
            ></div>
            <div
              className="col-lg-4 col-md-12 pt-1 pb-1 mt-0  "
              style={{
                backgroundColor: '#white',
                height: '70px',
                textAlign: 'center',
              }}
            >
              {/* <StepGoal
                leastRecordCount={this.state.leastRecordCount}
                pageView={this.state.pageView}
              /> */}
              <div
                className="banner-content pt-2 "
                style={{
                  backgroundColor: '#cc0000',
                  borderRadius: '10px',
                  paddingBottom: '1px',
                }}
              >
                <h4
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    paddingTop: 5,
                    marginTop: 0,
                    paddingBottom: 10,
                    marginBottom: 0,
                  }}
                >
                  {/* {pageView} */}

                  <span
                    style={{
                      color: 'yellow',
                      fontWeight: '900',
                      fontSize: '40px',
                    }}
                  >
                    {this.state.leastRecordCount}
                  </span>

                  <span>
                    <ruby>
                      回以上録音<rt>かいいじょうろくおん</rt>
                    </ruby>
                  </span>
                </h4>
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

          {/*

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
          )} */}
          <SweetAlert
            title="録音時間が十分でないため次へ進めません。"
            show={this.state.isOpenBackMypage}
            onConfirm={() =>
              this.setState({
                isOpenBackMypage: false,
              })
            }
            // onCancel={() => {
            //   setIsOpenBackMypage(false)
            // }}
            confirmBtnText="もう一度やり直す"
            // cancelBtnText="やめずに練習をする"
            showCancel={false}
            reverseButtons={true}
            style={{ width: '600px', backgroundColor: '#afeeee' }}
          >
            <p>全てのストーリーを録音してください。</p>
          </SweetAlert>
        </div>
      </>
    )
  }
}
