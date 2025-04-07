import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import S3 from 'react-aws-s3'
import SweetAlert from 'react-bootstrap-sweetalert'
import getBlobDuration from 'get-blob-duration'
import MicRecorder from 'mic-recorder-to-mp3'
// import StepGoal from '@/components/readingSelfcourse/StepGoal'
import { myFun_addZero } from '../FunctionComponent'
import SpeechToText from '@/components/voice-to-text/SpeechToText'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
      thisDeleteFile: '',
      isFileDelete: false,
      isrecording: false,
      isdeleted: false,
      isRefreshBtn: false,
      audio: '',
      isLoading: false,
      isError: false,
      record_comment: '',
      mbn: this.props.mbn,
      tbn: this.props.tbn,
      tutorNameEng: this.props.tutorNameEng,
      homework_id: this.props.homework_id,
      // practiceTempId: this.props.practiceTempId,
      pointKeyNum: this.props.pointKeyNum,
      // pointStep: this.props.pointStep,
      recordFileList: [],
      recordListView: false,
      deleteFileName: '',
      // audioDurationFromDB: this.props.audioDurationFromDB,
      audioDurationFromDBTxt: '',
      totalRecordTime: 0,
      leastRecordCount: this.props.leastRecordCount,
      pageView: this.props.pageView,
      courseName: this.props.courseName,
      readingHWAmount: this.props.readingHWAmount,
      // isAudioPlaying: this.props.isAudioPlaying,

      // s3_DIR: 'hw_rec'
    }

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.handleaudiofile = this.handleaudiofile.bind(this)
  }

  // handleCalAudioDurationFromDB(audioDurationFromDB, YourFileDuration, Wari) {
  //   // var ad = audioDurationFromDB
  //   var audioMin = parseInt(audioDurationFromDB.split(':')[0])
  //   var audioSec = parseInt(audioDurationFromDB.split(':')[1])

  //   var totalMinToSec = audioMin * 60

  //   if (
  //     this.props.readingHWAmount == 'first half' ||
  //     this.props.readingHWAmount == 'second half'
  //   ) {
  //     var totalSec = parseInt(parseInt(totalMinToSec) + parseInt(audioSec)) / 3
  //   } else {
  //     var totalSec = parseInt(totalMinToSec) + parseInt(audioSec)
  //   }

  //   var totalSecWari = parseInt(totalSec * Wari)

  //   console.log('totalSecWari:', totalSecWari)
  //   console.log('YourFileDuration', YourFileDuration)
  //   if (totalSecWari > YourFileDuration) {
  //     this.setState({
  //       isOpenBackMypage: true,
  //       isrecording: false,
  //     })
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  // insertPointToDB() {
  //   var mbn = this.state.mbn
  //   var pointKeyNum = this.state.pointKeyNum
  //   var homework_id = this.state.homework_id
  //   var pointStep = this.state.pointStep
  //   var practiceTempId = this.state.practiceTempId
  //   var url = DB_CONN_URL + '/sys-point-member-history-insert'
  //   axios
  //     .post(url, {
  //       mbn: mbn,
  //       homework_id: homework_id,
  //       pointKeyNum: pointKeyNum,
  //       pointStep: pointStep,
  //       practiceTempId: practiceTempId,
  //     })
  //     .then((response) => {
  //       if (!response.data.status) {
  //       } else {
  //       }
  //     })
  // }

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
        console.log('blobUrl:', blobUrl)

        //blob duration : audio Fileの長さ
        const dur = await getBlobDuration(blobUrl)
        console.log(' dur:', dur)

        const duration = dur.toFixed(0) //4.596843の場合5になる
        console.log('duration:', duration)
        //DB audioと自分が録音した長さを比較して、短い場合はエラーを出す。(例：0.5はDB audioの半分の長さ以下の場合エラーを出す)
        // var testmode = localStorage.getItem('MODE')

        var aud = '0:1' //TEST用 5秒
        // var aud = this.props.audioDurationFromDB //実践用
        console.log('aud', aud)
        console.log('test0:')
        this.setState({
          blobUrl,
          isrecording: false,
          isdeleted: false,
          isRefreshBtn: true,
        })

        console.log('test1:')
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

        var d2 = this.props.homework_id + '_' + time
        console.log('test2:')
        //hw番号も入れる
        // var file = new File([blob], d2, { type: 'audio/mp3' }) //original:audio/wav
        var file = new File([blob], d2, { type: 'audio/mp3' }) //original:audio/wav
        // console.log(file)
        console.log('d2:', d2)
        console.log('file:', file)
        console.log('duration:', duration)
        this.handleaudiofile(file, duration)
        // this.insertPointToDB()
      } catch (error) {
        error('stop error')
        console.log('test3:')
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
      //console test OK 2024-01-17
      console.log('ev', ev)
      console.log('ev-fileName:', fileName)
      console.log('ev-fileType:', fileType)
      console.log('ev-duration:', duration)

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
          // console.log('testfile1-practiceTempId:', this.props.practiceTempId)
          // console.log('testfile1-mbn:', this.props.mbn)
          // console.log('testfile1-homework_id:', this.props.homework_id)

          try {
            const result = await axios.put(signedRequest, file, options)
            this.setState({ audio: url, isRefreshBtn: true })
            this.getFileFromAws(this.props.mbn, this.props.homework_id)
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

    // console.log('insert-test-mbn', this.props.mbn)
    // console.log('insert-test-fileName', fileName)
    // console.log('insert-test-homework_id', this.props.homework_id)
    // console.log('insert-test-practiceTempId', this.props.practiceTempId)
    // console.log('insert-test-rc', rc)
    // console.log('insert-test-length_second', this.state.duration)

    const fetchData3 = async () => {
      try {
        // alert(this.state.practiceTempId)
        var url = DB_CONN_URL + '/tutor-record-during-lesson'
        const response = await axios.post(url, {
          mbn: this.props.mbn,
          fileName: fileName,
          homework_id: this.props.homework_id, //add 2022-03-28
          // practiceTempId: this.props.practiceTempId,
          // step: this.state.pointStep,
          // record_comment: rc,
          record_comment: 'test',
          tbn: this.props.tbn, //tutor , student
          tutorNameEng: this.props.tutorNameEng,
          when_record: 'during-lesson', //homework'宿題時, 'lesson'=レッスン中, 'before-lesson'=レッスンの前, 'after-lesson'レッスンの後
          length_second: duration, //add 2022-03-29
        })
        if (!response.data.register) {
          console.log('Audio File DB 登録成功')
          alert(response.data.message)
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert(response.data.message)
        alert('db insert error audioIntoDB')
      }
    }

    fetchData3()
  }

  getFileFromAws = (mbn, homework_id) => {
    const fetchData4 = async () => {
      try {
        // alert(this.state.practiceTempId)
        var url = DB_CONN_URL + '/get-tutor-record-file-during-lesson'
        const response = await axios.post(url, {
          mbn: mbn,
          homework_id: homework_id,
          tbn: this.props.tbn,
          // practiceTempId: practiceTempId,
          // currentStep: pointStep,
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
        alert('db insert error 1')
      }
    }

    fetchData4()
  }

  handleViewList = (value) => {
    this.setState({
      recordListView: value,
    })
  }

  handleFileDel = () => {
    var id = this.state.thisDeleteFile
    this.handleFileSelect(id)
    var url = DB_CONN_URL + '/record-delete-during-lesson/'
    var Url = url + id
    //console.log(Url)
    const fetchData = async () => {
      try {
        await axios.get(Url).then((response) => {
          //alert('deleted')
          this.setState({
            isFileDelete: false,
          })
        })
      } catch (error) {
        alert('delete error!')
      }
    }

    fetchData()
  }

  handleFileSelect = (id) => {
    var url = DB_CONN_URL + '/record-select-during-lesson/'
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
        this.getFileFromAws(this.props.mbn, this.props.homework_id)
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

  componentDidMount() {
    // Runs after the first render() lifecycle

    this.getFileFromAws(this.props.mbn, this.props.homework_id)

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
          {' '}
          [Latest order]
          {() => {
            this.getFileFromAws(this.props.mbn, this.props.homework_id)
          }}
          {this.state.recordListView &&
            this.state.recordFileList.map((val, key) => {
              var audioFile =
                'https://englib.s3.ap-northeast-1.amazonaws.com/uploadrecording/' +
                val.filename

              return (
                <>
                  <div className="row align-items-center">
                    {/* <div className="col-lg-2 col-md-12"></div> */}
                    <div
                      className="col-lg-8 col-md-12"
                      style={{ textAlign: 'right' }}
                    >
                      <div className="banner-content">
                        [{val.regdate}&nbsp; {val.regtime}] &nbsp;
                        <audio
                          src={audioFile}
                          controls="controls"
                          style={{
                            alignItems: 'center',
                            height: '25px',
                            paddingTop: '10px',
                            paddingRight: 0,
                            marginRight: 0,
                            width: '50%',
                            maxWidth: '95%',
                            textAlign: 'center',
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="col-lg-4 col-md-12 "
                      style={{ textAlign: 'left' }}
                    >
                      <div className="banner-content">
                        <a
                          className="btn-sm btn-danger ml-0"
                          onClick={() => {
                            this.setState({
                              isFileDelete: true,
                              thisDeleteFile: val.autoid,
                            })
                          }}
                          style={{ textAlign: 'left' }}
                          aria-label="Delete file"
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
          <div className="row align-items-center">
            <div
              className="col-lg-12 col-md-12 mb-1 mt-2 mb-2"
              style={{ textAlign: 'center' }}
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
                    <>
                      <FontAwesomeIcon
                        icon={faMicrophone}
                        color="red"
                        // size="3x"
                        style={{
                          fontSize: '80px',
                          fontWeight: 'normal',
                          backgroundColor: 'white',
                        }}
                      />
                    </>
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
                      color="red"
                      style={{
                        fontSize: '80px',
                        fontWeight: 'normal',
                        backgroundColor: 'white',
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faStopCircle}
                      // size="3x"
                      color="#dedede"
                      style={{
                        fontSize: '80px',
                        fontWeight: 'normal',
                        backgroundColor: 'white',
                      }}
                    />
                  )}
                </span>
              </div>
              <span style={{ fontSize: '12', color: 'blue' }}>
                You can send multiple files to your student.
              </span>
            </div>
            <div
              className="col-lg-1 col-md-12"
              style={{ backgroundColor: '#dedede' }}
            ></div>

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
          <SweetAlert
            title="録音時間が十分でないため保存できませんでした。"
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
            <p>必ず決まった分量の録音をして下さい。</p>
          </SweetAlert>
          <SweetAlert
            title="Do you want to delete this file?"
            show={this.state.isFileDelete}
            onConfirm={() => this.handleFileDel()}
            onCancel={() => {
              this.setState({
                isFileDelete: false,
              })
            }}
            confirmBtnText="delete"
            cancelBtnText="no"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '600px' }}
          ></SweetAlert>
        </div>
      </>
    )
  }
}
