import React, { useState } from 'react'
import axios from 'axios'
// import S3 from 'react-aws-s3'
import SweetAlert from 'react-bootstrap-sweetalert'
import getBlobDuration from 'get-blob-duration'
// import Recorder from 'recorder-js'
import StepGoal from '@/components/readingSelfcourse/StepGoal'
import { myFun_addZero } from '../FunctionComponent'
import 'balloon-css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faStopCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

import WaveAppLessonPage from '@/components/Wave/WaveAppLessonPage'
import ViewBookReadingTriumphs from './ViewBookReadingTriumphs'

//new recorder module setting
import MicRecorder from 'mic-recorder-to-mp3'

const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

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
      courseName: this.props.courseName,
      readingHWAmount: this.props.readingHWAmount,
      showWaitingPopup: false,
      readingLevel: this.props.readingLevel,
      storyTitle: this.props.storyTitle,
      storyNum: this.props.storyNum,
      seriesName: this.props.seriesName,
      bookNum: this.props.bookNum,
      isOpenBackMypage: false, // 🔒 반드시 초기 false 설정
    }

    // this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    // this.recorder = new Recorder(this.audioContext)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.handleaudiofile = this.handleaudiofile.bind(this)

    //new recording 2025-04-16 added
    // 96-팟캐스트, YouTube 음성 수준
    //64-음성 학습에 적당, 저장 공간 절약
    this.recorder = new MicRecorder({ bitRate: 96 }) // 💡 비트레이트 낮게 설정
  }
  applyAudioFilters = (stream) => {
    const source = this.audioContext.createMediaStreamSource(stream)
    const highPassFilter = this.audioContext.createBiquadFilter()
    highPassFilter.type = 'highpass'
    highPassFilter.frequency.value = 200

    const lowPassFilter = this.audioContext.createBiquadFilter()
    lowPassFilter.type = 'lowpass'
    lowPassFilter.frequency.value = 8000

    source.connect(highPassFilter)
    highPassFilter.connect(lowPassFilter)
  }

  handleCalAudioDurationFromDB(audioDurationFromDB, YourFileDuration, Wari) {
    var audioMin = parseInt(audioDurationFromDB.split(':')[0])
    var audioSec = parseInt(audioDurationFromDB.split(':')[1])
    var totalMinToSec = audioMin * 60

    var totalSec =
      this.props.readingHWAmount === 'first half' ||
      this.props.readingHWAmount === 'second half'
        ? parseInt(totalMinToSec + audioSec) / 3
        : parseInt(totalMinToSec) + parseInt(audioSec)

    var totalSecWari = parseInt(totalSec * Wari)

    // if (totalSecWari > YourFileDuration) {
    //   this.setState({
    //     isOpenBackMypage: true,
    //     isrecording: false,
    //   })
    //   return false
    // } else {
    //   return true
    // }
  }

  insertPointToDB() {
    var { mbn, pointKeyNum, homework_id, pointStep, practiceTempId } =
      this.state
    var url = DB_CONN_URL + '/sys-point-member-history-insert'
    axios.post(url, {
      mbn,
      homework_id,
      pointKeyNum,
      pointStep,
      practiceTempId,
    })
  }

  //2025-04-16-backup  -昔の容量の大きいVersion
  // start = () => {
  //   if (this.state.isblocked) {
  //     console.log('permission Denied')
  //   } else {
  //     navigator.mediaDevices
  //       .getUserMedia({
  //         audio: {
  //           noiseSuppression: true,
  //           echoCancellation: true,
  //           sampleRate: 44100, //44100->original 고용량 CD음질 ->16000
  //         },
  //       })
  //       .then((stream) => {
  //         this.applyAudioFilters(stream)
  //         this.recorder.init(stream)
  //         this.recorder.start().then(() => {
  //           this.setState({
  //             isrecording: true,
  //             isdeleted: false,
  //             isRefreshBtn: false,
  //           })
  //         })
  //       })
  //       .catch((e) => console.log(e))
  //   }
  // }

  //new recording module 2025-04-16 added
  start = () => {
    this.recorder
      .start()
      .then(() => {
        this.setState({ isrecording: true })
      })
      .catch((e) => console.error('녹음 시작 실패:', e))
  }

  //new recording module 2025-04-16 added
  stop = () => {
    this.setState({ showWaitingPopup: true })
    this.recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobUrl = URL.createObjectURL(blob)
        getBlobDuration(blobUrl).then((dur) => {
          const duration = parseInt(dur)

          //25分以下の長さの場合、再度録音する
          if (duration < 3) {
            const utterance = new SpeechSynthesisUtterance(
              '録音時間が短すぎます。再度録音をしてください。'
            )
            utterance.lang = 'ja-JP'
            speechSynthesis.speak(utterance)

            this.setState({
              isrecording: false,
              showWaitingPopup: false,
              isOpenBackMypage: true,
            })
            return
          }

          const now = new Date()
          const timeStr = `${now.getFullYear()}-${
            now.getMonth() + 1
          }-${now.getDate()}_${myFun_addZero(now.getHours())}:${myFun_addZero(
            now.getMinutes()
          )}:${myFun_addZero(now.getSeconds())}`
          const fileName = `${this.state.homework_id}_${timeStr}`
          const file = new File([blob], fileName, { type: 'audio/mp3' })

          this.handleaudiofile(file, duration)
          this.insertPointToDB()
          this.setState({ isrecording: false, showWaitingPopup: false })
        })
      })
      .catch((e) => {
        console.error('녹음 중단 실패:', e)
        this.setState({ isrecording: false, showWaitingPopup: false })
      })
  }

  //2025-04-16 backup  -昔の容量の大きいVersion
  // stop = () => {
  //   this.setState({ showWaitingPopup: true })
  //   this.recorder
  //     .stop()
  //     .then(({ blob, buffer }) => {
  //       const blobUrl = URL.createObjectURL(blob)
  //       getBlobDuration(blobUrl).then((dur) => {
  //         const duration = dur.toFixed(0)

  //         //✅ 25초 미만이면 경고 띄우고 중단
  //         if (parseInt(duration) < 25) {
  //           // 🔊 음성 안내 추가
  //           const utterance = new SpeechSynthesisUtterance(
  //             '録音時間が短すぎます。再度録音をしてください。'
  //           )
  //           utterance.lang = 'ja-JP'
  //           speechSynthesis.speak(utterance)

  //           this.setState({
  //             isrecording: false,
  //             showWaitingPopup: false,
  //             isOpenBackMypage: true,
  //           })
  //           return
  //         }

  //         var aud =
  //           localStorage.getItem('MODE') === 'TEST'
  //             ? '0:5'
  //             : this.props.audioDurationFromDB

  //         var compareAudioDuration = this.handleCalAudioDurationFromDB(
  //           aud,
  //           duration,
  //           0.7
  //         )
  //         if (compareAudioDuration === false) {
  //           return
  //         }

  //         this.setState({
  //           blobUrl,
  //           isrecording: false,
  //           isdeleted: false,
  //           isRefreshBtn: true,
  //         })

  //         const d = new Date()
  //         let y = d.getFullYear()
  //         let mt = d.getMonth() + 1
  //         let day = d.getDate()
  //         let h = myFun_addZero(d.getHours())
  //         let m = myFun_addZero(d.getMinutes())
  //         let s = myFun_addZero(d.getSeconds())
  //         let ms = myFun_addZero(d.getMilliseconds())
  //         let time = `${y}-${mt}-${day}_${h}:${m}:${s}:${ms}`
  //         var d2 = `${this.state.homework_id}_${time}`
  //         var file = new File([blob], d2, { type: 'audio/mp3' })

  //         this.handleaudiofile(file, duration)
  //         this.insertPointToDB()
  //         // setTimeout(() => {
  //         //   this.setState({ showWaitingPopup: false })
  //         // }, 2000) // Change the timeout value as per your requirement
  //       })
  //     })
  //     .catch((error) => console.error('stop error', error))
  // }

  deleteAudio = () => {
    this.setState({
      blobUrl: '',
      blob: '',
      isdeleted: true,
      isRefreshBtn: false,
    })
  }

  handleaudiofile(file, duration) {
    const fetchData = async () => {
      try {
        const fileName = file.name
        const fileType = 'audio/mpeg' // 명시적으로 설정 (안전)

        // ① presigned URL 요청
        const response = await axios.post(DB_CONN_URL + '/r2/sign-url', {
          fileName,
          fileType,
        })

        const { signedUrl, key, publicUrl } = response.data.data

        // ② R2에 업로드
        await axios.put(signedUrl, file, {
          headers: {
            'Content-Type': fileType,
          },
        })

        // ③ 상태 업데이트
        this.setState({ audio: publicUrl, isRefreshBtn: true })

        // ④ DB에 저장 완료 후 → 리스트 다시 불러오기
        await this.audioIntoDB(fileName, duration)
        this.getFileFromAws(
          this.state.mbn,
          this.state.homework_id,
          this.state.practiceTempId,
          this.state.pointStep
        )

        this.setState({ showWaitingPopup: false })
      } catch (error) {
        console.error('업로드 에러:', error)
        alert('送信エラーです。もう一度録音して下さい---')
        this.setState({ isError: true, showWaitingPopup: false })
      }
    }

    fetchData()
  }
  audioIntoDB = async (fileName, duration) => {
    try {
      await axios.post(DB_CONN_URL + '/member-record', {
        mbn: this.state.mbn,
        fileName,
        homework_id: this.state.homework_id,
        practiceTempId: this.state.practiceTempId,
        step: this.state.pointStep,
        record_comment: this.state.record_comment,
        who_record: 'student',
        when_record: 'homework',
        length_second: duration,
      })
    } catch (error) {
      console.error('DB 저장 실패:', error)
      alert('録音情報をデータベースに保存できませんでした。')
    }
  }

  getFileFromAws = (mbn, homework_id, practiceTempId, pointStep) => {
    const fetchData4 = async () => {
      try {
        var url = DB_CONN_URL + '/get-member-record-file'
        const response = await axios.post(url, {
          mbn,
          homework_id,
          practiceTempId,
          who_record: 'student',
          currentStep: pointStep,
        })
        // alert(url + ' / ' + mbn + ' / ' + homework_id + ' / ' + practiceTempId)

        console.log('🎯 TEST-서버 응답:', response.data)

        if (!response.data.status) {
          alert('⚠️ TEST-서버 응답 오류: ' + response.data.message)
        } else {
          this.setState({
            recordFileList: response.data.result,
            recordListView: true,
          })
          console.log('📋 TEST-받아온 리스트:', response.data.result)
        }
      } catch (error) {
        alert('❌ API 호출 에러 발생')
        console.error('🧨 getFileFromAws 에러:', error)
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
    const fetchData = async () => {
      try {
        await axios.get(Url)
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
        await axios.get(Url).then((response) => {
          this.setState({ deleteFileName: response.data.result[0].filename })
          this.handleDelFileR2(response.data.result[0].filename)
        })
        this.getFileFromAws(
          this.state.mbn,
          this.state.homework_id,
          this.state.practiceTempId,
          this.state.pointStep
        )
      } catch (error) {
        alert('select error!!! in Reading Voice Recorder/' + '   ID:' + id)
      }
    }
    fetchData()
  }

  // handleDelFileS3 = (value) => {
  //   const config = {
  //     bucketName: S3_BUCKET,
  //     region: REGION,
  //     accessKeyId: ACCESS_KEY,
  //     secretAccessKey: SECRET_ACCESS_KEY,
  //   }
  //   const ReactS3Client = new S3(config)
  //   const filename = value
  //   ReactS3Client.deleteFile(filename)
  //     .then((response) => console.error(response))
  //     .catch((err) => console.error('s3 delete failed', err))
  // }

  handleDelFileR2 = async (filename) => {
    try {
      const res = await fetch(`${DB_CONN_URL}/r2/delete-uploadrecording`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
      })

      if (res.ok) {
        const result = await res.json()
        console.log('deleted!!!!:', result)
      } else {
        console.error('Failed!!!:', await res.text())
      }
    } catch (err) {
      console.error('Connection Error!!!:', err)
    }
  }

  componentDidMount() {
    this.getFileFromAws(
      this.state.mbn,
      this.state.homework_id,
      this.state.practiceTempId,
      this.state.pointStep
    )
  }

  render() {
    if (this.state.isLoading) {
      return <h5>recording....................</h5>
    }
    return (
      <>
        <div>
          <div style={{ textAlign: 'center' }}>
            {this.state.isrecording &&
              this.props.readingHWAmount !== 'first half' &&
              this.props.readingHWAmount !== 'second half' && (
                <center>
                  <div
                    className="col-lg-12 col-md-12"
                    style={{
                      textAlign: 'center',
                      padding: '30px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: 'red',
                        paddingTop: '0px',
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      recording..... <br /> <b>！</b>
                      <ruby>
                        必<rt>かなら</rt>
                      </ruby>
                      ず
                      <ruby>
                        課題<rt>かだい</rt>
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
                        録音<rt>ろくおん</rt>
                      </ruby>
                      をしてください。
                    </p>
                  </div>
                </center>
              )}
          </div>

          {this.state.recordListView &&
            this.state.recordFileList.map((val, key) => {
              // var audioFile =
              //   'https://englib.s3.ap-northeast-1.amazonaws.com/uploadrecording/' +
              //   val.filename

              // R2의 Public Worker 도메인 기반으로 바꾸기
              const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN
              var audioFile = `https://${PUBLIC_R2_DOMAIN}/uploadrecording/${val.filename}`
              return (
                <div key={key} className="row align-items-center">
                  <div className="col-lg-2 col-md-12"></div>
                  <div className="col-lg-8 col-md-12">
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
                        {key == 0 && '最新順 latest-order'}
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
                  </div>
                  <div
                    className="col-lg-2 col-md-12"
                    style={{ textAlign: 'left' }}
                  >
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
              )
            })}

          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12 mb-3 mt-0">
              {this.props.seriesName === 'Reading Triumphs' && (
                <ViewBookReadingTriumphs
                  readingLevel={this.props.readingLevel}
                  storyTitle={this.props.storyTitle}
                  storyNum={this.props.storyNum}
                  seriesName={this.props.seriesName}
                  bookNum={this.props.bookNum}
                />
              )}

              {this.props.audioDurationFromDB && (
                <h6 style={{ color: 'black' }}>
                  ストーリー
                  <ruby>
                    全体<rt>ゼンタイ</rt>
                  </ruby>
                  の
                  <ruby>
                    録音予想時間<rt>ろくおんよそうじかん</rt>
                  </ruby>
                  {this.props.audioDurationFromDB}
                  <font style={{ fontSize: '12px' }}>(分:秒)</font>
                </h6>
              )}
              {this.props.readingHWAmount === 'first half' && (
                <h5 className="mb-0 pb-0" style={{ color: 'green' }}>
                  <ruby>
                    今回<rt>こんかい</rt>
                  </ruby>
                  の
                  <ruby>
                    課題<rt>かだい</rt>
                  </ruby>
                  ：ストーリの
                  <ruby>
                    前半分<rt>まえはんぶん</rt>
                  </ruby>
                </h5>
              )}
              {this.props.readingHWAmount === 'second half' && (
                <h5 className="mb-0 pb-0" style={{ color: 'green' }}>
                  <ruby>
                    今回<rt>こんかい</rt>
                  </ruby>
                  の
                  <ruby>
                    課題<rt>かだい</rt>
                  </ruby>
                  ：ストーリの
                  <ruby>
                    後<rt>うし</rt>
                  </ruby>
                  ろ
                  <ruby>
                    半分<rt>はんぶん</rt>
                  </ruby>
                </h5>
              )}
            </div>
            <div
              className="col-lg-12 col-md-12 mb-1 mt-2"
              style={{ textAlign: 'center' }}
            >
              <div className="banner-content">
                <span
                  className="start-button mr-5"
                  style={{
                    color: 'white',
                    backgroundColor: 'white',
                    textAlign: 'right',
                    cursor: 'pointer',
                  }}
                  onClick={this.start}
                  disabled={this.state.isrecording}
                >
                  {this.state.isrecording ? (
                    <FontAwesomeIcon
                      icon={faMicrophone}
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
                      color="red"
                      style={{
                        fontSize: '80px',
                        fontWeight: 'normal',
                        backgroundColor: 'white',
                      }}
                    />
                  )}
                </span>

                <span
                  className="start-button"
                  onClick={this.stop}
                  disabled={!this.state.isrecording}
                  style={{
                    color: 'white',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                  }}
                >
                  {this.state.isrecording ? (
                    <FontAwesomeIcon
                      icon={faStopCircle}
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
            </div>
            {/* <div
              className="col-lg-1 col-md-12"
              style={{ backgroundColor: '#dedede' }}
            ></div>
            <div
              className="col-lg-4 col-md-12 pt-1 pb-1 mt-0"
              style={{
                backgroundColor: '#white',
                height: '70px',
                textAlign: 'center',
              }}
            >
              <StepGoal
                leastRecordCount={this.state.leastRecordCount}
                pageView={this.state.pageView}
              />
            </div> */}
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

          {this.state.showWaitingPopup && (
            <SweetAlert
              title="Please wait"
              onConfirm={() => {}}
              showConfirm={false}
            >
              <p>
                録音ファイルを生成中...
                <br />
                Recording file is being generated...
              </p>
            </SweetAlert>
          )}

          <SweetAlert
            title="録音時間が十分でないため保存できませんでした。"
            show={this.state.isOpenBackMypage}
            onConfirm={() =>
              this.setState({
                isOpenBackMypage: false,
              })
            }
            confirmBtnText="もう一度やり直す"
            showCancel={false}
            reverseButtons={true}
            style={{ width: '600px', backgroundColor: '#afeeee' }}
          >
            <p>必ず決まった分量の録音をして下さい。</p>
          </SweetAlert>
        </div>
      </>
    )
  }
}
