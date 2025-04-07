import React, { useState } from 'react'
import axios from 'axios'
import MicRecorder from 'mic-recorder-to-mp3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import WaveApp from '@/components/Wave/WaveApp'
const audioRecorder = new MicRecorder({ bitRate: 160 })
//128:radio quality,  160 or higher:CD, 256 kilobit- iTunes
// const [initRecording, setInitRecording] = useState()
// useEffect(() => {
//   setInitRecording(true)
// }, [])
const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
class App extends React.Component {
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
        var d = new Date().valueOf()

        var d2 = mbn + '_' + d
        //hw番号も入れる
        console.log('mbn', mbn)
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
    let file = ev
    let fileName = ev.name
    let fileType = ev.type

    console.log('fileName:', fileName)
    console.log('fileType:', fileType)

    axios
      .post(DB_CONN_URL + '/sign_s3', {
        fileName: fileName,
        fileType: fileType,
      })
      .then((response) => {
        var returnData = response.data.data.returnData
        var signedRequest = returnData.signedRequest
        var url = returnData.url
        var options = {
          headers: {
            'Content-Type': fileType,
          },
        }
        axios
          .put(signedRequest, file, options)
          .then((result) => {
            this.setState({ audio: url, isRefreshBtn: true }, () =>
              console.log(this.state.audio)
            )
            alert('宿題音声を送信しました！')
          })
          .catch((error) => {
            //alert('ERROR ' + JSON.stringify(error))
            alert('送信エラーです。もう一度録音して下さい。')
          })
      })

      .catch((error) => {
        alert(JSON.stringify(error))
      })
  }

  render() {
    return (
      <>
        <div>
          <div className="containers">
            <div className="row">
              <div
                className="col-lg-12"
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                }}
              >
                <button
                  //className="btn btn-primary mr-3"
                  className="start-button mr-3"
                  onClick={this.start}
                  disabled={this.state.isrecording}
                  type="button"
                  title="録音スタート"
                >
                  <FontAwesomeIcon icon={faMicrophone} size="3x" color="red" />
                </button>
                <button
                  className="start-button"
                  onClick={this.stop}
                  disabled={!this.state.isrecording}
                  type="button"
                  title="録音ストップボタン"
                  // className="btn btn-danger mr-3"
                >
                  <FontAwesomeIcon icon={faSave} size="3x" />
                </button>
                {/* <button
                  // className="start-button"
                  onClick={this.stop}
                  type="button"
                  className="btn btn-danger mr-3"
                >
                  Save & Upload
                </button> */}
              </div>
            </div>
            <div
              className="col-lg-12"
              style={{
                textAlign: 'center',
                marginTop: '20px',
                alignitems: 'center',
              }}
            >
              {!this.state.isdeleted && !this.state.isrecording && (
                <audio
                  src={this.state.blobUrl}
                  controls="controls"
                  style={{ alignItems: 'center' }}
                />
              )}

              {this.state.isRefreshBtn && (
                // <button
                //   className="delete-button"
                //   title="Delete this audio"
                //   onClick={this.deleteAudio}
                // >
                //   <FontAwesomeIcon icon={faTrashAlt} size="2x" />
                // </button>

                <button
                  onClick={this.deleteAudio}
                  type="button"
                  className="btn btn-danger ml-3 pt-1 pb-1 mt-2"
                  style={{ alignItems: 'center', marginBottom: '50px' }}
                >
                  やりなおす
                </button>
              )}

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

            {this.state.isrecording && (
              <div className="col-lg-12">
                <WaveApp />
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default App
