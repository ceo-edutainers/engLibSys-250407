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

export default class VoiceRecorderToS3ForSelfLessonPage5Times extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isrecording: false,
      isFileDelete: false,
      isOpenBackMypage: false,
      showWaitingPopup: false,
      recordFileList: [],
      recordListView: false,
      thisDeleteFile: '',
      deleteFileName: '',
      audio: '',
      mbn: props.mbn,
      tbn: props.tbn,
      tutorNameEng: props.tutorNameEng,
      homework_id: props.homework_id,
      pointKeyNum: props.pointKeyNum,
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

    try {
      const { blob } = await this.recorder.stop()
      const blobUrl = URL.createObjectURL(blob)

      const duration = Math.round(await getBlobDuration(blobUrl))
      if (!duration || isNaN(duration)) {
        alert('録音時間の取得に失敗しました。もう一度試してください。')
        this.setState({ isrecording: false, showWaitingPopup: false })
        return
      }

      const d = new Date()
      const time = `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()}_${myFun_addZero(d.getHours())}:${myFun_addZero(
        d.getMinutes()
      )}:${myFun_addZero(d.getSeconds())}:${myFun_addZero(d.getMilliseconds())}`
      const fileName = `${this.state.homework_id}_${time}`

      const file = new File([blob], fileName, { type: 'audio/mpeg' })

      // 콘솔 찍어서 디버깅 확인
      console.log('✅ stop()에서 파일 생성:', file.name, 'duration:', duration)

      this.handleaudiofile(file, duration)
    } catch (err) {
      console.error('❌ stop() 에러:', err)
      alert('送信エラーです。もう一度録音して下さい。 stop')
      this.setState({ isrecording: false, showWaitingPopup: false })
    }
  }

  handleaudiofile = async (file, duration) => {
    console.log('✅ handleaudiofile() 실행됨')
    try {
      const response = await axios.post(DB_CONN_URL + '/r2/sign-url', {
        fileName: file.name,
        fileType: 'audio/mpeg',
      })

      console.log('📦 받은 signedUrl 응답:', response.data)

      const signedRequest = response?.data?.data?.signedUrl
      const url = response?.data?.data?.publicUrl

      if (!signedRequest || !url) {
        alert('サーバーから署名付きURLを取得できませんでした。')
        this.setState({ isrecording: false, showWaitingPopup: false })
        return
      }

      await axios.put(signedRequest, file, {
        headers: { 'Content-Type': 'audio/mpeg' },
      })

      this.setState({ audio: url, isrecording: false, showWaitingPopup: false })
      this.getFileFromAws(this.state.mbn, this.state.homework_id)

      this.audioIntoDB(file, duration)
    } catch (error) {
      console.error('❌ handleaudiofile 에러:', error)
      alert('送信エラーです。もう一度録音して下さい。')
      this.setState({ isrecording: false, showWaitingPopup: false })
    }
  }

  audioIntoDB = (fileName, duration) => {
    console.log('TEST-fileName:', fileName)
    console.log('TEST-duration:', duration)
    console.log('TEST-fileName:', fileName)
    console.log('TEST-homework_id:', this.state.homework_id)
    console.log('TEST-tbn:', this.state.tbn)
    console.log('TEST-tutorNameEng:', this.state.tutorNameEng)

    const fetchData = async () => {
      try {
        const response = await axios.post(
          DB_CONN_URL + '/tutor-record-during-lesson',
          {
            mbn: this.state.mbn,
            tbn: this.state.tbn,
            tutorNameEng: this.state.tutorNameEng,
            fileName: fileName,
            homework_id: this.state.homework_id,
            when_record: 'during-lesson',
            record_comment: 'ok',
            length_second: duration,
          }
        )
        console.log('TEST-response', response.data.message)
        console.log('TEST-status', response.data.status)
        if (response.data.status) {
          console.log('TEST-Audio THis File DB Siccess!!!')
        } else {
          console.log('TEST-Audio This File DB 登録 Fail!!!')
          console.log('TEST-Regdate:', response.data.NowRegdate)
          console.log('TEST-Regtime:', response.data.NowRegtime)
        }
      } catch (error) {
        console.error('TEST-DB insert error audioIntoDB:', error.message, error)
      }
    }
    fetchData()
  }

  getFileFromAws = (mbn, homework_id) => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          DB_CONN_URL + '/get-tutor-record-file-during-lesson',
          {
            mbn: mbn,
            homework_id: homework_id,
            tbn: this.state.tbn,
          }
        )
        if (response.data.status) {
          this.setState({
            recordFileList: response.data.result,
            recordListView: true,
          })
        }
      } catch (err) {
        console.error('ファイル取得エラー', err)
        alert('ファイル取得エラー')
      }
    }
    fetchData()
  }

  handleFileDel = () => {
    const id = this.state.thisDeleteFile
    this.handleFileSelect(id)
    const url = DB_CONN_URL + '/record-delete-during-lesson/' + id
    const fetchData = async () => {
      try {
        await axios.get(url)
        this.setState({ isFileDelete: false })
      } catch (error) {
        alert('delete error!')
      }
    }
    fetchData()
  }

  handleFileSelect = (id) => {
    const url = DB_CONN_URL + '/record-select-during-lesson/' + id
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        const filename = response.data.result[0].filename
        this.setState({ deleteFileName: filename })
        await fetch('/r2/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename }),
        })
        this.getFileFromAws(this.state.mbn, this.state.homework_id)
      } catch (error) {
        alert('ファイル取得エラー')
      }
    }
    fetchData()
  }

  componentDidMount() {
    this.getFileFromAws(this.state.mbn, this.state.homework_id)
  }

  render() {
    return (
      <div>
        {this.state.recordListView &&
          this.state.recordFileList.map((val, key) => {
            const audioFile = `https://${PUBLIC_R2_DOMAIN}/uploadrecording/${val.filename}`
            return (
              <div key={key} className="row align-items-center">
                <div
                  className="col-lg-8 col-md-12"
                  style={{ textAlign: 'right' }}
                >
                  <div className="banner-content">
                    [{val.regdate}&nbsp;{val.regtime}]&nbsp;
                    <audio src={audioFile} controls style={{ width: '50%' }} />
                  </div>
                </div>
                <div
                  className="col-lg-4 col-md-12"
                  style={{ textAlign: 'left' }}
                >
                  <div className="banner-content">
                    <a
                      className="btn-sm btn-danger ml-0"
                      onClick={() =>
                        this.setState({
                          isFileDelete: true,
                          thisDeleteFile: val.autoid,
                        })
                      }
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
            style={{ cursor: 'pointer', marginRight: '20px' }}
          >
            <FontAwesomeIcon
              icon={faMicrophone}
              color={this.state.isrecording ? '#ececec' : 'red'}
              style={{ fontSize: '80px' }}
              spin={this.state.isrecording}
            />
          </span>
          <span onClick={this.stop} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon
              icon={faStopCircle}
              color={this.state.isrecording ? 'red' : '#dedede'}
              style={{ fontSize: '80px' }}
            />
          </span>
        </div>

        <SweetAlert
          title="録音時間が十分でないため保存できませんでした。"
          show={this.state.isOpenBackMypage}
          onConfirm={() => this.setState({ isOpenBackMypage: false })}
          confirmBtnText="もう一度やり直す"
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
          onCancel={() => this.setState({ isFileDelete: false })}
          confirmBtnText="delete"
          cancelBtnText="no"
          showCancel={true}
          reverseButtons={true}
          style={{ width: '600px' }}
        ></SweetAlert>

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
