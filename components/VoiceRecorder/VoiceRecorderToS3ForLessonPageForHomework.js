import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MicRecorder from 'mic-recorder-to-mp3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { myFun_addZero } from '../FunctionComponent'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import WaveAppLessonPage from '@/components/Wave/WaveAppLessonPage'
const audioRecorder = new MicRecorder({ bitRate: 128 })
const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
//128:radio quality,  160 or higher:CD, 256 kilobit- iTunes
// const [initRecording, setInitRecording] = useState()
// useEffect(() => {
//   setInitRecording(true)
// }, [])

export default class VoiceRecorderToS3ForLessonPageForHomework extends React.Component {
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
      mbn: this.props.mbn,
      homework_id: this.props.homework_id,
    }
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.handleaudiofile = this.handleaudiofile.bind(this)
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
    audioRecorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobUrl = URL.createObjectURL(blob)
        this.setState({
          blobUrl,
          isrecording: false,
          isdeleted: false,
          isRefreshBtn: true,
        })
        var mbn = localStorage.getItem('MypageMbn')
        //var dv = new Date().valueOf() //637725481767

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

        var file = new File([blob], d2, { type: 'audio/wav' })
        console.log(file)
        this.handleaudiofile(file)
      })
      .catch((e) => console.log('We could not retrieve your message'))
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

      // console.log('fileName:', fileName)
      // console.log('fileType:', fileType)

      try {
        const response = await axios.post(DB_CONN_URL + '/sign_s3', {
          fileName: fileName,
          fileType: fileType,
        })

        var returnData = response.data.data.returnData
        var signedRequest = returnData.signedRequest
        var url = returnData.url
        var options = {
          headers: {
            'Content-Type': fileType,
          },
        }
        const fetchData2 = async () => {
          try {
            const result = await axios.put(signedRequest, file, options)
            this.setState({ audio: url, isRefreshBtn: true })
            //alert('宿題音声を送信しました！')
          } catch (error) {
            alert('error' + JSON.stringify(error))
            alert('送信エラーです。もう一度録音して下さい。1')
          }
          //Loding
        }
        fetchData2()
        // alert('koko')
      } catch (error) {
        this.setState({
          isError: true,
        })
        alert('送信エラーです。もう一度録音して下さい。2')
      }
      this.setState({
        isLoading: false,
      })
      this.audioIntoDB(fileName)
    }

    fetchData()
  }

  audioIntoDB(fileName) {
    //var Url = DB_CONN_URL + '/member-record/' + mbn + '&' + filename
    const fetchData3 = async () => {
      try {
        // var mbn = '200218100688'
        const response = await axios.post(DB_CONN_URL + '/member-record', {
          mbn: this.state.mbn,
          fileName: fileName,
          who_record: 'student', //tutor , student
          when_tutor_record: 'homework', //homework'宿題時, 'lesson'=レッスン時, 'before-lesson'=レッスンの前, 'after-lesson'レッスンの後
        })
        if (!response.data.register) {
          alert(response.data.message) //for test
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert('db insert error')
      }
    }
    fetchData3()
  }

  render() {
    //if (this.state.isError) return <h1>Upload Error, try again!</h1>
    if (this.state.isLoading)
      return <h1>{youtubeID}saving....................</h1>
    return (
      <>
        <div>
          <div className="containers">
            <div className="row">
              <div
                className="col-lg-12 mt-1 ml-3 mb-1"
                style={{
                  textAlign: 'left',
                  alignItems: 'center',
                }}
              >
                <button
                  //className="btn btn-primary mr-3"
                  className="start-button mr-3 "
                  onClick={this.start}
                  disabled={this.state.isrecording}
                  type="button"
                  title="録音スタート"
                >
                  <FontAwesomeIcon icon={faMicrophone} size="2x" color="red" />
                </button>
                <button
                  className="start-button mr-5"
                  onClick={this.stop}
                  disabled={!this.state.isrecording}
                  type="button"
                  title="録音ストップボタン"
                  // className="btn btn-danger mr-3"
                >
                  <FontAwesomeIcon icon={faSave} size="2x" />
                </button>

                {!this.state.isdeleted && !this.state.isrecording && (
                  <audio
                    src={this.state.blobUrl}
                    controls="controls"
                    style={{
                      alignItems: 'center',
                      height: '30px',
                      paddingTop: '10px',
                    }}
                  />
                )}

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
