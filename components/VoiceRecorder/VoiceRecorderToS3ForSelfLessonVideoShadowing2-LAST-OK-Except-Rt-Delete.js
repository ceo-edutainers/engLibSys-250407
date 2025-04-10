// 디자인 복원 버전 - 삭제 로직 및 리팩터링 유지

import React from 'react'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import getBlobDuration from 'get-blob-duration'
import Recorder from 'recorder-js'
import { myFun_addZero } from '../FunctionComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faStopCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN

export default class VoiceRecorderToS3ForSelfLessonVideoShadowing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mbn: props.mbn,
      homework_id: props.homework_id,
      practiceTempId: props.practiceTempId,
      pointStep: props.pointStep,
      recordFileList: [],
      recordListView: false,
      isrecording: false,
      showWaitingPopup: false,
    }
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.recorder = new Recorder(this.audioContext)
  }

  start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    this.recorder.init(stream)
    await this.recorder.start()
    this.setState({ isrecording: true })
  }

  stop = async () => {
    this.setState({ showWaitingPopup: true })
    const { blob } = await this.recorder.stop()
    const blobUrl = URL.createObjectURL(blob)
    const duration = Math.round(await getBlobDuration(blobUrl))
    const d = new Date()
    const time = `${d.getFullYear()}-${
      d.getMonth() + 1
    }-${d.getDate()}_${myFun_addZero(d.getHours())}:${myFun_addZero(
      d.getMinutes()
    )}:${myFun_addZero(d.getSeconds())}:${myFun_addZero(d.getMilliseconds())}`
    const fileName = `${this.state.homework_id}_${time}`
    const file = new File([blob], fileName, { type: 'audio/mpeg' })
    await this.uploadAndSave(file, duration)
    this.setState({ showWaitingPopup: false, isrecording: false })
  }

  uploadAndSave = async (file, duration) => {
    const res = await axios.post(DB_CONN_URL + '/r2/sign-url', {
      fileName: file.name,
      fileType: 'audio/mpeg',
    })
    await axios.put(res.data.data.signedUrl, file, {
      headers: { 'Content-Type': 'audio/mpeg' },
    })
    await axios.post(DB_CONN_URL + '/member-record', {
      mbn: this.state.mbn,
      fileName: file.name,
      homework_id: this.state.homework_id,
      practiceTempId: this.state.practiceTempId,
      step: this.state.pointStep,
      who_record: 'student',
      when_record: 'homework',
      length_second: duration,
    })
    this.getFileFromAws()
  }

  getFileFromAws = async () => {
    const res = await axios.post(DB_CONN_URL + '/get-member-record-file', {
      mbn: this.state.mbn,
      homework_id: this.state.homework_id,
      practiceTempId: this.state.practiceTempId,
      who_record: 'student',
      currentStep: this.state.pointStep,
    })
    if (res.data.status) {
      this.setState({ recordFileList: res.data.result, recordListView: true })
    }
  }

  handleFileDel = (id) => {
    const fetchData = async () => {
      try {
        const selectUrl = `${DB_CONN_URL}/record-select/${id}`
        const selectRes = await axios.get(selectUrl)
        const filename = selectRes.data.result[0].filename
        await fetch('/r2/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename }),
        })
        await axios.get(`${DB_CONN_URL}/record-delete/${id}`)
        this.getFileFromAws()
      } catch (err) {
        alert('ファイル削除中にエラーが発生しました。')
      }
    }
    fetchData()
  }

  componentDidMount() {
    this.getFileFromAws()
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          {this.state.isrecording && (
            <center>
              <span
                style={{ fontSize: '20px', fontWeight: '600', color: 'red' }}
              >
                recording..... <br />
                <ruby>
                  必<rt>かなら</rt>
                </ruby>
                ず
                <ruby>
                  最初<rt>さいしょ</rt>
                </ruby>
                から
                <ruby>
                  最後<rt>さいご</rt>
                </ruby>
                まで全て録音してください。
              </span>
            </center>
          )}
        </div>

        {this.state.recordListView &&
          this.state.recordFileList.map((val, key) => {
            const audioFile = `https://${PUBLIC_R2_DOMAIN}/uploadrecording/${val.filename}`
            return (
              <div key={key} className="row align-items-center">
                <div className="col-lg-2 col-md-12"></div>
                <div className="col-lg-8 col-md-12">
                  <div className="banner-content">
                    <font style={{ fontWeight: 'bold', color: 'black' }}>
                      {key === 0 && '最新順 latest-order'}
                    </font>
                    <audio src={audioFile} controls style={{ width: '95%' }} />
                  </div>
                </div>
                <div
                  className="col-lg-2 col-md-12"
                  style={{ textAlign: 'left' }}
                >
                  <div className="banner-content">
                    <a
                      className="btn-sm btn-danger ml-2"
                      onClick={() => this.handleFileDel(val.autoid)}
                      style={{ textAlign: 'center' }}
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

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span
            onClick={this.start}
            disabled={this.state.isrecording}
            style={{ cursor: 'pointer', marginRight: '20px' }}
          >
            <FontAwesomeIcon
              icon={faMicrophone}
              color={this.state.isrecording ? '#ececec' : 'red'}
              style={{ fontSize: '80px' }}
              spin={this.state.isrecording}
            />
          </span>
          <span
            onClick={this.stop}
            disabled={!this.state.isrecording}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon
              icon={faStopCircle}
              color={this.state.isrecording ? 'red' : '#dedede'}
              style={{ fontSize: '80px' }}
            />
          </span>
        </div>

        {this.state.showWaitingPopup && (
          <SweetAlert title="Please wait" showConfirm={false}>
            <p>
              録音ファイルを生成中...
              <br />
              Recording file is being generated...
            </p>
          </SweetAlert>
        )}
      </div>
    )
  }
}
