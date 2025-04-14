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
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.recorder = new Recorder(this.audioContext)
    console.log('TEST-tbn:', props.tbn)
    console.log('TEST-tutorNameEng:', props.tutorNameEng)
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
      var tutorNE = this.state.tutorNameEng
      const response = await axios.post(
        DB_CONN_URL + '/tutor-record-during-lesson',
        {
          mbn: this.state.mbn,
          tbn: this.state.tbn,
          tutorNameEng: tutorNE,
          fileName: fileName,
          homework_id: this.state.homework_id,
          length_second: duration,
        }
      )

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
  // handleFileDel = (id) => {
  //   const fetchData = async () => {
  //     try {
  //       console.log('🧹 파일 삭제 시작:', id)

  //       // 1. DB에서 filename 조회
  //       const selectUrl = `${DB_CONN_URL}/record-select-during-lesson/${id}`
  //       let selectRes
  //       try {
  //         selectRes = await axios.get(selectUrl)
  //         console.log('📁 파일 조회 성공:', selectRes.data)
  //       } catch (err) {
  //         console.error('❌ [1] record-select 실패:', err)
  //         alert('ファイル名取得中にエラーが発生しました。')
  //         return
  //       }

  //       const filename = selectRes.data.result?.[0]?.filename
  //       if (!filename) {
  //         alert('⚠️ filename이 존재하지 않습니다')
  //         return
  //       }

  //       // 2. R2에서 파일 삭제
  //       try {
  //         const r2Del = await fetch('/r2/delete-uploadrecording', {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({ filename }),
  //         })
  //         const r2Result = await r2Del.json()
  //         console.log('🗑️ R2 삭제 응답:', r2Result)

  //         if (!r2Del.ok) {
  //           alert(
  //             'Cloudflare R2のファイル削除に失敗しました。' +
  //               r2Result.data.message
  //           )
  //           return
  //         }
  //       } catch (err) {
  //         console.error('❌ [2] R2 삭제 실패:', err)
  //         alert(
  //           '録音ファイルのサーバー削除中にエラーが発生しました。' +
  //             r2Result.data.message
  //         )
  //         return
  //       }

  //       // 3. DB 레코드 삭제
  //       try {
  //         const dbDel = await axios.get(
  //           `${DB_CONN_URL}/record-delete-during-lesson/${id}`
  //         )
  //         console.log('🧾 DB 삭제 응답:', dbDel.data)

  //         if (!dbDel.data.status) {
  //           alert('DB削除に失敗しました: ' + dbDel.data.message)
  //           return
  //         }
  //       } catch (err) {
  //         console.error('❌ [3] DB 삭제 실패:', err)
  //         alert('DBからのファイル削除中にエラーが発生しました。')
  //         return
  //       }

  //       // 4. 리스트 다시 가져오기
  //       this.getFileFromAws()
  //     } catch (err) {
  //       console.error('❌ [전체 실패] 예외:', err)
  //       alert('ファイル削除中に予期しないエラーが発生しました。ID: ' + id + '/')
  //     }
  //   }

  //   fetchData()
  // }

  // handleFileDel = (id) => {
  //   const fetchData = async () => {
  //     try {
  //       const selectUrl = `${DB_CONN_URL}/record-select-during-lesson/${id}`
  //       const selectRes = await axios.get(selectUrl)
  //       const filename = selectRes.data.result[0].filename
  //       await fetch('/r2/delete', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ filename }),
  //       })
  //       await axios.get(`${DB_CONN_URL}/record-delete-during-lesson//${id}`)
  //       this.getFileFromAws()
  //     } catch (err) {
  //       alert('ファイル削除中にエラーが発生しました。' + id)
  //     }
  //   }
  //   fetchData()
  // }

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
