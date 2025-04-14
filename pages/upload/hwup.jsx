import React, { useState, useEffect, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function App() {
  // 상태 변수 정의
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false) // 상태 변수 추가
  const [mbn, setMyMbn] = useState()
  const [homework_id, setHomework_id] = useState()
  const [thisSubject, setThisSubject] = useState()
  const [practiceTempId, setPracticeTempId] = useState()
  const [currentStep, setCurrentStep] = useState()
  const [stepStatus, setStepStatus] = useState()
  const [pointKeyNum, setPointKeyNum] = useState()
  const [fileDetail, setFileDetail] = useState()
  const [fileBookQuestion, setFileBookQuestion] = useState([])
  const [isFileDeleted, setIsFileDeleted] = useState(false)
  const [FileLength, setFileLength] = useState()

  const router = useRouter()
  const { query } = useRouter()

  useEffect(() => {
    if (router.isReady) {
      // URL 파라미터 값 받아오기
      setMyMbn(router.query.m)
      setHomework_id(router.query.hid)
      setThisSubject(router.query.sb)
      setPracticeTempId(router.query.pti)
      setCurrentStep(router.query.cstep)
      setStepStatus(router.query.sS)
      setPointKeyNum(router.query.pntKN)
      setFileDetail(router.query.fD)
    }
  }, [router.isReady])

  // 기타 상태 변수 및 useEffect
  const [pti, setPti] = useState()

  useEffect(() => {
    if (practiceTempId == '') {
      setPti('from mobile')
    } else {
      setPti(practiceTempId)
    }
  }, [practiceTempId])

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const fileInput = useRef()
  const [isPermettedFile, setIsPermettedFile] = useState(false)
  const [isFileAru, setIsFileAru] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [isFileSelected, setIsFileSelected] = useState(false)
  const [afterFileSelected, setAfterFileSelected] = useState(false)
  const [expiredHW, setExpiredHW] = useState(false)

  function closeWindow() {
    window.open('about:blank', '_self')
    window.close()
  }

  useEffect(() => {
    if (router.isReady) {
      setMyMbn(router.query.m)
      setHomework_id(router.query.hid)

      var Url =
        DB_CONN_URL +
        '/check-hw-finished/' +
        router.query.m +
        '&' +
        router.query.hid

      const fetchData2 = async () => {
        try {
          axios.get(Url).then((response) => {
            if (response.data.message == 'expired hw') {
              // 이미 끝난 과제이거나 기간이 만료된 링크
              setExpiredHW(true)
            }
          })
        } catch (error) {
          console.log(error)
        }
      }

      fetchData2()
    }
  }, [router.isReady])

  const insertPointToDB = () => {
    var url = DB_CONN_URL + '/sys-point-member-history-insert'

    axios
      .post(url, {
        mbn: mbn,
        homework_id: homework_id,
        pointKeyNum: pointKeyNum,
        pointStep: currentStep,
        practiceTempId: pti,
      })
      .then((response) => {
        if (!response.data.status) {
          // 실패시 처리
        } else {
          // 성공시 처리
        }
      })
  }

  const handleClick = (event) => {
    event.preventDefault()
    let newArr = fileInput.current.files
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i], i)
    }
  }

  const handleUpload = async (file, i) => {
    const ext = file.name.split('.').pop().toLowerCase()

    // 확장자가 jpg, jpeg, png 인지 확인
    if (!['jpg', 'jpeg', 'png'].includes(ext)) {
      setIsPermettedFile(true)
      return
    }

    // 파일 이름 생성
    const date = new Date()
    const fileTime = date.getDate() + date.getTime()
    const newfilename = `readingCourse_${fileDetail}_${homework_id}_${i}_${fileTime}.${ext}`
    setNewFileName(newfilename)

    try {
      // ① presigned URL 요청
      let mimeType = ''
      if (ext === 'jpg' || ext === 'jpeg') {
        mimeType = 'image/jpeg'
      } else if (ext === 'png') {
        mimeType = 'image/png'
      } else {
        alert('jpg, jpeg, png 形式のみ許可されます。')
        return
      }

      // ② R2 presigned URL 요청
      const response = await axios.post(`${DB_CONN_URL}/r2/sign-url`, {
        fileName: `${newfilename}`, // 경로를 'uploadhw/'로 설정
        fileType: file.type,
      })

      // const response = await axios.post(`${DB_CONN_URL}/r2/sign-url`, {
      //   fileName: `${file.name}`, // 경로를 uploadhw로 변경
      //   fileType: file.type,
      // })

      const { signedUrl, key, publicUrl } = response.data.data

      // ③ presigned URL로 파일 업로드
      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': mimeType,
        },
      })

      // ④ DB 기록 및 상태 업데이트
      hwHistoryUpdate(
        currentStep,
        stepStatus,
        homework_id,
        pti,
        thisSubject,
        newfilename,
        fileDetail
      )

      // ⑤ 상태 업데이트
      setIsOpenBackMypage(true)
      setAfterFileSelected(false)
      insertPointToDB()
    } catch (error) {
      console.error('업로드 실패:', error)
      alert('ファイルのアップロードに失敗しました。もう一度お試しください。')
    }
  }

  const hwHistoryUpdate = (
    currentStep,
    stepStatus,
    homework_id,
    pti,
    thisSubject,
    newFileName,
    fileDetail
  ) => {
    const mbn = localStorage.getItem('MypageMbn') // ← 이 부분도 필요합니다
    const url = DB_CONN_URL + '/update-sys-hw-history-uploadFile'

    axios
      .post(url, {
        mbn: mbn,
        homework_id: homework_id,
        practiceTempId: pti,
        currentStep: currentStep,
        stepStatus: stepStatus,
        thisSubject: thisSubject,
        newfilename: newFileName,
        fileDetail: fileDetail,
      })
      .then((response) => {
        console.log('XXX-:', response.data.message)
        localStorage.setItem('rediriectPageView', 'finished')
        reloadImage()
      })
      .catch((error) => {
        console.error('❌ HW Upload Failed:', error)
      })
  }

  const reloadImage = () => {
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-upload-file-sys-hw-history/'
        var Url =
          url + mbn + '&' + thisSubject + '&' + homework_id + '&' + fileDetail
        const response = await axios.get(Url)
        if (!response.data.length) {
          setIsFileAru(false)
        } else {
          setIsFileAru(true)
          setFileBookQuestion(response.data.response)
          setFileLength(response.data.length)
        }
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }

    fetchData2()
  }

  return (
    <>
      <div>
        <center>
          {!expiredHW ? (
            <>
              {mbn}
              <form className="upload-steps" onSubmit={handleClick}>
                <div
                  className="col-lg-12 col-md-12 pt-2 pb-1"
                  style={{ backgroundColor: '#dedede' }}
                >
                  <h4>
                    課題アップロード{' '}
                    <span
                      className="btn btn-danger"
                      onClick={() => closeWindow()}
                    >
                      X
                    </span>
                  </h4>
                </div>
                <div className="col-lg-12 col-md-12 pt-2">
                  <h1 style={{ color: 'red', fontWeight: 'bold' }}>
                    {thisSubject}
                  </h1>
                  <p>
                    このリンクは
                    <span style={{ color: 'red' }}>
                      今回の課題のみ使えるリンク
                    </span>
                    です。次回の課題をアップロードするためには、QRコードを新たに読み込む必要があります。
                  </p>
                  <hr />
                </div>
                <div className="row mt-3  mb-1">
                  <div
                    className="col-lg-6 col-md-12"
                    style={{ textAlign: 'center' }}
                  >
                    <label className="btn btn-warning">
                      ファイルを選択(複数選択可能)
                      <input
                        type="file"
                        ref={fileInput}
                        accept=".jpg, .jpeg, .png"
                        onChange={() => {
                          setIsFileAru(true)
                          setAfterFileSelected(true)
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          margin: 0,
                          padding: 0,
                          border: '1px solid orange',
                          borderRadius: '10px',
                          fontSize: '20px',
                          cursor: 'pointer',
                          opacity: 0,
                        }}
                        multiple
                      />
                      <p style={{ fontSize: '10px', color: 'black' }}>
                        jpg/png/形式のみ
                      </p>
                    </label>
                    <p style={{ color: 'red', fontWeight: 'bold' }}>
                      {afterFileSelected && 'ファイル選択済み'}
                    </p>
                  </div>
                  <div
                    className="col-lg-5 col-md-12 mt-2 pt-0"
                    style={{ margin: 'auto' }}
                  >
                    <center>
                      {afterFileSelected ? (
                        <button className="upload-button">
                          <img
                            src="/images/homework-upload.png"
                            style={{ height: '50px', width: 'auto' }}
                          />
                          アップロード
                          <p style={{ color: 'white' }}>最後にここをクリック</p>
                        </button>
                      ) : (
                        <button className="upload-button-disabled">
                          <img
                            src="/images/homework-upload.png"
                            style={{ height: '50px', width: 'auto' }}
                          />
                          アップロード
                        </button>
                      )}
                    </center>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className="mt-4 p-3">
              <strong>
                すでに終了している課題のリンクです。QRコードは課題ことに一回のみ有効です。
                <br />
                今の課題のファイルをアップロードするためには、パソコンのページからもう一度QRCodeを読み込んでください。
              </strong>
              <p className="mt-2">
                <span className="btn btn-danger" onClick={() => closeWindow()}>
                  CLOSE
                </span>
              </p>
            </div>
          )}
        </center>
        <SweetAlert
          title="ファイルをアップロードしました。"
          show={isOpenBackMypage}
          onConfirm={() => setIsOpenBackMypage(false)}
          confirmBtnText="OK"
          showCancel={false}
        />
        <SweetAlert
          title="許可されてないファイル形式です。"
          show={isPermettedFile}
          onConfirm={() => setIsPermettedFile(false)}
          confirmBtnText="OK"
          showCancel={false}
        >
          <p>アップロード可能なファイルは、jpg/jpeg/pngファイルのみです。</p>
        </SweetAlert>

        <SweetAlert
          title="ファイルを選択してください。"
          show={isFileSelected}
          onConfirm={() => setIsFileSelected(false)}
          confirmBtnText="OK"
          showCancel={false}
        />
        <SweetAlert
          title="削除完了"
          show={isFileDeleted}
          onConfirm={() => setIsFileDeleted(false)}
          confirmBtnText="OK"
          showCancel={false}
        >
          <p>削除すると、アップロード時に獲得したポイントも消えます。</p>
        </SweetAlert>
        <CopyrightFooter />
      </div>
    </>
  )
}

export default App
