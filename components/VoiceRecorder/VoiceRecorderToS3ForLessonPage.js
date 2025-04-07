import React, { useState, useEffect } from 'react'
import axios from 'axios'
import S3 from 'react-aws-s3'

import MicRecorder from 'mic-recorder-to-mp3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { myFun_addZero } from '../FunctionComponent'

import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import WaveAppLessonPage from '@/components/Wave/WaveAppLessonPage'
import { NavigateBeforeSharp } from '@material-ui/icons'
const audioRecorder = new MicRecorder({ bitRate: 160 })
//128:radio quality,  160 or higher:CD, 256 kilobit- iTunes
// const [initRecording, setInitRecording] = useState()
// useEffect(() => {
//   setInitRecording(true)
// }, [])

const S3_BUCKET = process.env.S3_REACT_APP_DIR_NAME
const REGION = process.env.S3_REACT_APP_REGION
const ACCESS_KEY = process.env.S3_REACT_APP_ACCESS_ID
const SECRET_ACCESS_KEY = process.env.S3_REACT_APP_ACCESS_KEY

const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export default class VoiceRecorderToS3ForLessonPage extends React.Component {
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
      record_comment: '',
      mbn: this.props.mbn,
      homework_id: this.props.homework_id,
      recordFileList: [],
      recordListView: false,
      deleteFileName: '',
      // s3_DIR: 'hw_rec'
    }
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.handleaudiofile = this.handleaudiofile.bind(this)
  }

  // componentDidUpdate() {
  //   navigator.getUserMedia(
  //     { audio: true, video: false },
  //     () => {
  //       console.log('Permission Granted')
  //       this.setState({ isblocked: false })
  //     },
  //     () => {
  //       console.log('Permission Denied')
  //       this.setState({ isblocked: true })
  //     }
  //   )
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
        this.handleaudiofile(file)
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

  handleaudiofile(ev) {
    const fetchData = async () => {
      let file = ev
      let fileName = ev.name
      let fileType = ev.type

      console.log('fileName:', fileName)
      console.log('fileType:', fileType)

      try {
        // alert('1')
        //ここからエラー
        var url = DB_CONN_URL + '/sign_s3'

        const response = await axios.post(url, {
          fileName: fileName,
          fileType: fileType,
        })
        //ここまでエラー

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
            this.getFileFromAws(this.state.mbn, this.state.homework_id)
          } catch (error) {
            alert('error' + JSON.stringify(error))
            alert('送信エラーです。もう一度録音して下さい。1')
          }

          //Loding
        }

        fetchData2()
        alert('宿題音声を送信しました！') //ここではないと、音声ファイルの長さが 最初は0に見える
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
      this.audioIntoDB(fileName)
    }

    fetchData()
  }

  audioIntoDB = (fileName) => {
    var rc = this.state.record_comment

    const fetchData3 = async () => {
      try {
        // var mbn = '200218100688'
        console.log('thisstatembn:', this.state.mbn)
        var url = DB_CONN_URL + '/member-record'
        const response = await axios.post(url, {
          mbn: this.state.mbn,
          fileName: fileName,
          homework_id: this.state.homework_id, //add 2022-03-28
          record_comment: rc,
          who_record: 'tutor', //tutor , student
          when_record: 'lesson', //homework'宿題時, 'lesson'=レッスン中, 'before-lesson'=レッスンの前, 'after-lesson'レッスンの後
          // length_second: length_second, //add 2022-03-29
        })
        if (!response.data.register) {
          //alert('DB 登録 成功') //for test
          console.log('Audio File DB 登録成功')
          // this.getFileFromAws
          // alert(recordFileList)
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert('db insert error')
      }
      this.getFileFromAws(this.state.mbn, this.state.homework_id)
    }
    fetchData3()
  }

  getFileFromAws = (mbn, homework_id) => {
    //homework_idを利用する
    var url = DB_CONN_URL + '/get-member-record-file'
    axios
      .post(url, {
        mbn: mbn,
        homework_id: homework_id,
        who_record: 'tutor',
      })
      .then((response) => {
        if (!response.data.status) {
          alert(response.data.message) //for test
        } else {
          this.setState({
            recordFileList: response.data.result,
            recordListView: true,
          })
          console.log('test1:', response.data.result)
        }
      })
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

        //this.getFileFromAws(this.state.mbn, this.state.homework_id)
      } catch (error) {
        alert('delete error!')
      }

      // this.getFileFromAws(this.state.mbn, this.state.homework_id)
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
        this.getFileFromAws(this.state.mbn, this.state.homework_id)
      } catch (error) {
        alert('select error!')
      }

      // this.getFileFromAws(this.state.mbn, this.state.homework_id)
    }
    fetchData()
  }

  //filename=deleteFileName s3のファイルを削除
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
    //alert(filename)

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
    this.getFileFromAws(this.state.mbn, this.state.homework_id)

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
          <div className="containers">
            <div className="row">
              {/* filename{this.state.deleteFileName} */}
              <div
                className="col-lg-12 mt-1 ml-3 mb-1"
                style={{
                  textAlign: 'left',
                  alignItems: 'center',
                }}
              >
                {/* {() => {
                  useEffect(() => {
                    this.getFileFromAws(this.state.mbn, this.state.homework_id)
                  }, [])
                }} */}

                {() => {
                  this.getFileFromAws(this.state.mbn, this.state.homework_id)
                }}

                {this.state.recordListView &&
                  this.state.recordFileList.reverse().map((val, key) => {
                    var audioFile =
                      'https://englib.s3.ap-northeast-1.amazonaws.com/' +
                      val.filename

                    // {this.fileExistCheck(audioFile) &&
                    return (
                      <>
                        <div>
                          <audio
                            src={audioFile}
                            controls="controls"
                            style={{
                              alignItems: 'center',
                              height: '25px',
                              paddingTop: '10px',
                              marginLeft: '20px',
                              width: '85%',
                            }}
                          />

                          <a
                            className="btn-sm btn-danger ml-2"
                            onClick={() => {
                              this.handleFileDel(
                                val.autoid,
                                val.member_barcode_num,
                                val.filename
                              )
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              size="1x"
                              color="#ececec"
                            />
                          </a>
                        </div>
                        <div className="ml-4 text-center">
                          {val.title != '' && val.title}
                          {val.title != '' && <br />}
                          <hr
                            style={{
                              marginBottom: '5px',
                              marginTop: '3px',
                            }}
                          />
                        </div>
                      </>
                    )
                  })}

                <div className="mt-2 text-center">
                  {!this.state.recordListView ? (
                    <a
                      className="btn-sm btn-info text-white"
                      // style={{ marginBottom: '5px' }}
                      onClick={() => {
                        this.getFileFromAws(
                          this.state.mbn,
                          this.state.homework_id
                        )
                      }}
                    >
                      Show Recording Lists
                    </a>
                  ) : (
                    this.state.recordFileList.length > 0 && (
                      // <button
                      //   className="btn-sm btn-info"
                      //   onClick={() => {
                      //     this.handleViewList(false)
                      //   }}
                      // >
                      //   Hide Recording Lists
                      // </button>
                      <a
                        className="btn-sm btn-info text-white"
                        onClick={() => {
                          this.handleViewList(false)
                        }}
                      >
                        Hide Recording Lists
                      </a>
                    )
                  )}
                </div>
                <div>
                  <table style={{ width: '100%' }}>
                    <tr>
                      <td style={{ width: '79%' }}>
                        {!this.state.isdeleted && !this.state.isrecording && (
                          <textarea
                            placeholder="recording memo"
                            style={{
                              width: '97%',
                              height: '35px',
                              marginTop: '10px',
                              marginBottom: '0px',
                              textAlign: 'left',
                              overflow: 'auto',
                              paddingLeft: '10px',
                              border: '1px solid #dedede',
                              borderRadius: '5px',
                            }}
                            onChange={(e) => {
                              this.setState({ record_comment: e.target.value })
                            }}
                          />
                        )}
                        {this.state.isrecording && (
                          <center>
                            {/* {this.state.record_comment != '' &&
                              this.state.isrecording && (
                                <p>{this.state.record_comment}</p>
                              )} */}
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
                              recording.....
                            </span>
                          </center>
                        )}
                      </td>
                      <td style={{ width: '21%', textAlign: 'left' }}>
                        <button
                          //className="btn btn-primary mr-3"
                          className="start-button mr-3 "
                          onClick={this.start}
                          disabled={this.state.isrecording}
                          // type="button"
                          // title="録音スタート"
                        >
                          <FontAwesomeIcon
                            icon={faMicrophone}
                            size="2x"
                            color="red"
                          />
                        </button>

                        <button
                          className="start-button mr-3"
                          onClick={this.stop}
                          disabled={!this.state.isrecording}
                          // type="button"
                          // title="録音ストップボタン"

                          // className="btn btn-danger mr-3"
                        >
                          <FontAwesomeIcon icon={faSave} size="2x" />
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>
                {/* {!this.state.isdeleted && !this.state.isrecording && (
                  <>
                    <audio
                      //src={this.state.blobUrl}
                      controls="controls"
                      style={{
                        width: '100px',
                        alignItems: 'center',
                        height: '30px',
                        paddingTop: '10px',
                      }}
                    />
                  </>
                )} */}

                {/* {this.state.isRefreshBtn && (
                

                  <button
                    onClick={this.deleteAudio}
                    type="button"
                    className="btn btn-danger ml-2 mt-0 pb-0"
                    style={{ alignItems: 'center' }}
                  >
                    やりなおす
                  </button>
                )} */}
                {!this.state.isrecording && (
                  <div>
                    {/* <p style={{ color: 'red' }}>
                    音声を録音するためには、赤いマイクボタンを押して下さい。
                  </p>
                  <p>
                    録音したら音声を聞いてみて、自分の発音を確認しましょう。
                    <br />
                    今日一番最後に録音したファイルだけ今日の宿題として先生に提出されます。
                  </p> */}
                  </div>
                )}
              </div>
            </div>
            {this.state.isrecording && (
              <div className="col-lg-12">
                <WaveAppLessonPage />
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}
