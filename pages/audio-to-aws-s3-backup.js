import React, { useState } from 'react'
import axios from 'axios'
import MicRecorder from 'mic-recorder-to-mp3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
} from '@fortawesome/free-solid-svg-icons'

const audioRecorder = new MicRecorder({ bitRate: 160 })
const DB_CONN_URL = process.env.DB_CONN_URL
//128:radio quality,  160 or higher:CD, 256 kilobit- iTunes
// const [initRecording, setInitRecording] = useState()
// useEffect(() => {
//   setInitRecording(true)
// }, [])

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isblocked: false,
      blobUrl: '',
      isrecording: false,
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
        this.setState({ blobUrl, isrecording: false })
        var d = new Date()
        var file = new File([blob], d.valueOf(), { type: 'audio/wav' })
        console.log(file)
        this.handleaudiofile(file)
      })
      .catch((e) => console.log('We could not retrieve your message'))
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
            this.setState({ audio: url }, () => console.log(this.state.audio))
            alert('audio uploaded')
          })
          .catch((error) => {
            alert('ERROR ' + JSON.stringify(error))
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
                  className="start-button"
                  onClick={this.start}
                  disabled={this.state.isrecording}
                  type="button"
                >
                  <FontAwesomeIcon icon={faMicrophone} size="2x" />
                </button>
                <button
                  className="start-button"
                  onClick={this.stop}
                  type="button"
                  // className="btn btn-danger mr-3"
                >
                  <FontAwesomeIcon icon={faSave} size="2x" />
                </button>
              </div>
            </div>
            <div
              className="col-lg-12"
              style={{
                textAlign: 'center',
                marginTop: '20px',
              }}
            >
              {/* {this.state.isrecording && ( */}
              <audio src={this.state.blobUrl} controls="controls" />
              {/* )} */}
            </div>
            <div
              className="col-lg-12"
              style={{
                textAlign: 'center',
                marginTop: '20px',
              }}
            >
              <ul id="playlist"></ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App
