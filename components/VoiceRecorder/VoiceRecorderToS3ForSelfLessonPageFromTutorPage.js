// 디자인 복원 버전 - 삭제 로직 및 리팩터링 유지

import React from 'react'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import getBlobDuration from 'get-blob-duration'
// import Recorder from 'recorder-js'
import { myFun_addZero } from '../FunctionComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faStopCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

//new recorder module setting
import MicRecorder from 'mic-recorder-to-mp3'

const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN

export default class VoiceRecorderToS3ForSelfLessonVideoShadowing extends React.Component {
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
      practiceTempId: props.practiceTempId,
      pointStep: props.pointStep,
      recordListView: false,
      showWaitingPopup: false,
      pointKeyNum: props.pointKeyNum,
    }
    // this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    // this.recorder = new Recorder(this.audioContext)

    //new recording 2025-04-16 added
    // 96-팟캐스트, YouTube 음성 수준
    //64-음성 학습에 적당, 저장 공간 절약
    this.recorder = new MicRecorder({ bitRate: 96 }) // 💡 비트레이트 낮게 설정
  }

  // start = async () => {
  //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  //   this.recorder.init(stream)
  //   await this.recorder.start()
  //   this.setState({ isrecording: true })
  // }

  start = () => {
    this.recorder
      .start()
      .then(() => {
        this.setState({ isrecording: true })
      })
      .catch((e) => {
        console.error('🎤 start error:', e)
        alert(
          '録音を開始できませんでした。マイクのアクセス権限を確認してください。'
        )
      })
  }

  // stop = async () => {
  //   this.setState({ showWaitingPopup: true })

  //   try {
  //     const { blob } = await this.recorder.stop()
  //     const blobUrl = URL.createObjectURL(blob)
  //     const duration = Math.round(await getBlobDuration(blobUrl))

  //     const d = new Date()
  //     const time = `${d.getFullYear()}-${
  //       d.getMonth() + 1
  //     }-${d.getDate()}_${myFun_addZero(d.getHours())}:${myFun_addZero(
  //       d.getMinutes()
  //     )}:${myFun_addZero(d.getSeconds())}:${myFun_addZero(d.getMilliseconds())}`

  //     const fileName = `${this.state.homework_id}_${time}`
  //     const file = new File([blob], fileName, { type: 'audio/mpeg' })

  //     await this.uploadAndSave(file, duration, fileName)
  //   } catch (error) {
  //     console.error('❌ stop failed:', error)

  //     alert('録音処理中にエラーが発生しました。')
  //   } finally {
  //     this.setState({ showWaitingPopup: false, isrecording: false })
  //   }
  // }
  stop = async () => {
    this.setState({ showWaitingPopup: true })

    try {
      const [buffer, blob] = await this.recorder.stop().getMp3()
      const blobUrl = URL.createObjectURL(blob)
      const duration = Math.round(await getBlobDuration(blobUrl))

      // 🔔 40초 미만일 경우 경고
      // if (duration < 40) {
      //   const utterance = new SpeechSynthesisUtterance(
      //     '録音時間が短すぎます。再度録音をしてください。'
      //   )
      //   utterance.lang = 'ja-JP'
      //   speechSynthesis.speak(utterance)

      //   this.setState({
      //     isrecording: false,
      //     showWaitingPopup: false,
      //     isOpenBackMypage: true,
      //   })
      //   return
      // }

      const d = new Date()
      const time = `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()}_${myFun_addZero(d.getHours())}:${myFun_addZero(
        d.getMinutes()
      )}:${myFun_addZero(d.getSeconds())}:${myFun_addZero(d.getMilliseconds())}`

      const fileName = `${this.state.homework_id}_${time}`
      const file = new File([blob], fileName, { type: 'audio/mpeg' })

      await this.uploadAndSave(file, duration, fileName)
    } catch (error) {
      console.error('❌ stop failed:', error)
      alert('録音処理中にエラーが発生しました。')
    } finally {
      this.setState({ showWaitingPopup: false, isrecording: false })
    }
  }

  uploadAndSave = async (file, duration, fileName) => {
    try {
      // 🔹 ① R2에 presigned URL 요청

      const res = await axios.post(DB_CONN_URL + '/r2/sign-url', {
        fileName: file.name,
        fileType: 'audio/mpeg',
      })

      // 🔹 ② 실제 파일 업로드
      await axios.put(res.data.data.signedUrl, file, {
        headers: { 'Content-Type': 'audio/mpeg' },
      })

      // 🔹 ③ DB에 insert 요청
      // alert(this.state.tutorNameEng)
      console.log(this.state.tutorNameEng)

      // if (this.state.tutorNameEng != '') {
      const response = await axios.post(
        DB_CONN_URL + '/tutor-record-during-lesson',
        {
          mbn: this.state.mbn,
          tbn: this.state.tbn,
          tutorNameEng: this.state.tutorNameEng,
          fileName: fileName,
          homework_id: this.state.homework_id,
          length_second: duration,
        }
      )
      // }

      // ✅ 백엔드 응답 확인
      console.log('📥 tutor-record-during-lesson 응답:', response.data)
      console.log('📥 tutor-record-during-lesson 응답:', response.data)

      // 실패한 경우 메시지 출력
      if (!response.data.status) {
        console.warn('⚠️ DB 등록 실패:', response.data.message)
        alert('DB 등록에 실패했습니다: ' + response.data.message)
        return
      }

      // 🔄 성공 시 파일 목록 갱신
      this.getFileFromAws()
    } catch (err) {
      console.error('❌ uploadAndSave 실패:', err)

      // 📛 에러 응답 상세 출력
      console.log('📛 서버 응답:', err.response?.data)
      console.log('📛 상태값 확인:', {
        mbn: this.state.mbn,
        tbn: this.state.tbn,
        tutorNameEng: this.state.tutorNameEng,
        fileName,
        homework_id: this.state.homework_id,
        length_second: duration,
      })

      alert(
        '녹음 파일 업로드 중 오류 발생: ' +
          (err.response?.data?.message || '알 수 없는 에러')
      )
    }
  }

  getFileFromAws = async () => {
    try {
      const res = await axios.post(
        DB_CONN_URL + '/get-tutor-record-file-during-lesson',
        {
          mbn: this.state.mbn,
          homework_id: this.state.homework_id,
          tbn: this.state.tbn,
          // practiceTempId: this.state.practiceTempId,
          // who_record: 'tutor',
          // currentStep: this.state.pointStep,
        }
      )
      console.log('📥 getFileFromAws 응답:', res.data) // <-- 이걸 추가해보자

      if (res.data.status) {
        this.setState({
          recordFileList: res.data.result,
          recordListView: true,
        })
      } else {
        console.warn('⚠️ 파일 목록 응답 실패:', res.data.message)
      }
    } catch (error) {
      console.error('❌ getFileFromAws failed:', error)
      alert('録音ファイルの取得に失敗しました。')
    }
  }

  handleFileDel = (id) => {
    const fetchData = async () => {
      try {
        const selectUrl = `${DB_CONN_URL}/record-select-during-lesson/${id}`
        const selectRes = await axios.get(selectUrl)
        const filename = selectRes.data.result[0].filename
        await fetch(`${DB_CONN_URL}/r2/delete-uploadrecording`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename }),
        })

        await axios.get(`${DB_CONN_URL}/record-delete-during-lesson/${id}`)
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
