import React, { useState, useEffect, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import S3 from 'react-aws-s3'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faTrash,
  faLockOpen,
  faArrowCircleRight,
  faArrowAltCircleRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'
import IdeaBox from '@/components/Output_ShowAndTell/IdeaBox'

function App() {
  const [fileMindmap, setFileMindmap] = useState([])
  const [mbn, setMyMbn] = useState('')
  const [homework_id, setHomework_id] = useState('')
  const [thisSubject, setThisSubject] = useState('')
  const [practiceTempId, setPracticeTempId] = useState('')
  const [currentStep, setCurrentStep] = useState('')
  const [stepStatus, setStepStatus] = useState('')
  const [pointKeyNum, setPointKeyNum] = useState('')
  const [fileDetail, setFileDetail] = useState('')
  const [pti, setPti] = useState('')
  const [expiredHW, setExpiredHW] = useState(false)
  const fileInput = useRef(null)
  const [afterFileSelected, setAfterFileSelected] = useState(false)
  const [isFileAru, setIsFileAru] = useState(false)
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isPermettedFile, setIsPermettedFile] = useState(false)
  const [isFileSelected, setIsFileSelected] = useState(false)
  const [isFileDeleted, setIsFileDeleted] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileLength, setFileLength] = useState(0)
  const [mindmapView, setMindmapView] = useState(false)

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter()
  const { query } = useRouter()

  useEffect(() => {
    if (router.isReady && router.query) {
      const myMbn = router.query.m
      const myHomeworkId = router.query.hid
      const myThisSubject = router.query.sb
      const myPracticeTempId = router.query.pti
      const myCurrentStep = router.query.cstep
      const myStepStatus = router.query.sS
      const myPointKeyNum = router.query.pntKN
      const myFileDetail = router.query.fD

      setMyMbn(myMbn)
      setHomework_id(myHomeworkId)
      setThisSubject(myThisSubject)
      setPracticeTempId(myPracticeTempId)
      setCurrentStep(myCurrentStep)
      setStepStatus(myStepStatus)
      setPointKeyNum(myPointKeyNum)
      setFileDetail(myFileDetail)

      // 모든 상태 값이 설정된 후에 reloadImage 호출
      reloadImage(myMbn, myThisSubject, myHomeworkId, myCurrentStep)

      // 숙제가 만료되었는지 확인하는 코드 추가
      const checkExpiredHW = async () => {
        try {
          const url = `${DB_CONN_URL}/check-hw-finished/${myMbn}&${myHomeworkId}`
          const response = await axios.get(url)
          if (response.data.message === 'expired hw') {
            setExpiredHW(true)
          }
        } catch (error) {
          console.log(error)
        }
      }

      checkExpiredHW()
    }
  }, [router.isReady, router.query])

  const closeWindow = () => {
    window.open('about:blank', '_self')
    window.close()
  }
  const afterDeleteImgReload = () => {
    setIsFileDeleted(false)
    reloadImage(mbn, thisSubject, homework_id, currentStep)
  }

  useEffect(() => {
    if (practiceTempId === '') {
      setPti('from mobile')
    } else {
      setPti(practiceTempId)
    }
  }, [practiceTempId])

  const handleClick = (event) => {
    event.preventDefault()
    let newArr = fileInput.current.files
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i], i)
    }
  }

  const insertPointToDB = () => {
    const url = `${DB_CONN_URL}/sys-point-member-history-insert`
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
          console.error('Failed to insert point to DB')
        } else {
          console.log('Point inserted to DB successfully')
        }
      })
      .catch((error) => {
        console.error('Error inserting point to DB:', error)
      })
  }

  const hwHistoryUpdate = (
    currentStep,
    stepStatus,
    homework_id,
    pti,
    thisSubject,
    newfilename,
    fileDetail
  ) => {
    const url = `${DB_CONN_URL}/update-sys-hw-history-uploadFile/${mbn}&${homework_id}&${pti}&${currentStep}&${stepStatus}&${thisSubject}&${newfilename}&${fileDetail}`
    axios
      .put(url)
      .then((response) => {
        localStorage.setItem('rediriectPageView', 'finished')
        reloadImage()
      })
      .catch((error) => {
        console.error('Failed to update homework history:', error)
      })
  }

  const handleUpload = (file, i) => {
    var parts = file.name.split('.')
    var ext = parts[1]

    if (
      ext !== 'jpg' &&
      ext !== 'jpeg' &&
      ext !== 'png' &&
      ext !== 'JPG' &&
      ext !== 'JPEG' &&
      ext !== 'PNG'
    ) {
      setIsPermettedFile(true)
      return false
    }

    var dateVariable = new Date()
    var fileTime = nowDate + nowTime
    var nowDate = dateVariable.getDate()
    var nowTime = dateVariable.getTime()

    let newfilename =
      'showandtell_Mindmap_' + homework_id + '_' + fileTime + '.' + ext

    setNewFileName(newfilename)

    const config = {
      bucketName: process.env.S3_REACT_APP_BUCKET_NAME,
      dirName: process.env.S3_REACT_APP_DIR_NAME2,
      region: process.env.S3_REACT_APP_REGION,
      accessKeyId: process.env.S3_REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.S3_REACT_APP_ACCESS_KEY,
    }

    const ReactS3Client = new S3(config)
    ReactS3Client.uploadFile(file, newfilename).then((data) => {
      if (data.status === 204) {
        hwHistoryUpdate(
          currentStep,
          stepStatus,
          homework_id,
          pti,
          thisSubject,
          newfilename,
          fileDetail
        )

        setIsOpenBackMypage(true)
        setAfterFileSelected(false)
        insertPointToDB()
      } else {
        console.error('Failed to upload file:', data)
      }
    })
  }

  const reloadImage = (mbn, thisSubject, homework_id, currentStep) => {
    if (localStorage.getItem('loginStatus') === 'true') {
      const fetchData2 = async () => {
        try {
          const url = DB_CONN_URL + '/get-mindmap-sys-hw-history/'
          const Url =
            url +
            mbn +
            '&' +
            thisSubject +
            '&' +
            homework_id +
            '&' +
            currentStep

          // alert(Url)
          const response = await axios.get(Url)

          console.log('response.data:', response.data)

          if (!response.data.length) {
            setFileMindmap([])
          } else {
            console.log('response.data.response:', response.data.response)

            const filemindmapArray = response.data.response
              .map((item) => {
                console.log('item:', item)
                if (!item.fileName) {
                  console.error('Missing fileName in item:', item)
                  return null
                }
                return {
                  fileName: item.fileName,
                  autoid: item.autoid,
                  homework_id: item.homework_id,
                }
              })
              .filter(Boolean)

            if (filemindmapArray.length === 0) {
              console.error(
                'No valid file names found in response:',
                response.data.response
              )
              setFileMindmap([])
            } else {
              setFileMindmap(filemindmapArray)
              console.log('fileMindmap:', filemindmapArray)
            }
          }
        } catch (error) {
          console.log(error)
          alert(error)
        }
      }

      fetchData2()
    }
  }

  const deleteFileInfo = (id, homework_id, pointStep) => {
    var homework_id = homework_id
    var pointStep = currentStep

    var url = DB_CONN_URL + '/upload-reading-file-delete/'
    var Url = url + id + '&' + homework_id + '&' + pointStep

    const fetchData = async () => {
      try {
        await axios.get(Url).then((response) => {})
      } catch (error) {
        // alert('delete error!')
      }
    }

    if (fileLength === 1) {
      setIsFileDeleted(true)
      refreshPage()
    } else {
      reloadImage()
      setIsFileDeleted(true)
    }
    fetchData()
  }

  return (
    <>
      <div>
        <center>
          {!expiredHW ? (
            <>
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
                  <h1
                    style={{
                      color: 'red',
                      fontSize: '20px',
                      fontWeight: 'bold',
                    }}
                  >
                    SHOW AND TELL
                  </h1>
                  <h5 style={{ color: 'red' }}>Mindmap Upload</h5>
                  <p>
                    このリンクは
                    <span style={{ color: 'red' }}>
                      今回の課題のみ使えるリンク
                    </span>
                    です。次回の課題をアップロードするためには、QRコードを新たに読み込む必要があります。
                  </p>
                  <hr />
                </div>
                <div
                  className="row mt-3  mb-1"
                  style={{
                    padding: '10px',
                    width: '100%',
                  }}
                >
                  <div
                    className="col-lg-6 col-md-12"
                    style={{ textAlign: 'center' }}
                  >
                    <label
                      className="btn btn-warning"
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        fontAlign: 'center',
                        width: '100%',
                        height: '100px',
                        paddingTop: '14px',
                        fontSize: '18px',
                        border: '1px solid orange',
                        borderRadius: '10px',
                        fontWeight: '600',
                      }}
                    >
                      ファイルを選択
                      <br />
                      (マインドマップは一枚にしてアップロードしてください)
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
                      <p
                        style={{
                          fontSize: '10px',
                          color: 'black',
                          paddingTop: 0,
                        }}
                      >
                        jpg/png/形式のみ
                      </p>
                    </label>
                    <p style={{ color: 'red', fontWeight: 'bold' }}>
                      {afterFileSelected && 'ファイル選択済み'}
                    </p>
                  </div>
                  <div
                    className="col-lg-5 col-md-12 mt-2 pt-0"
                    style={{
                      margin: 'auto',
                      width: '100%',
                      padding: '10px',
                      textAlign: 'left',
                    }}
                  >
                    <center>
                      {afterFileSelected ? (
                        <>
                          <button
                            style={{
                              fontWeight: '600',
                              padding: '10px',
                              color: 'white',
                              fontSize: '18px',

                              border: '1px solid white',
                              borderRadius: '10px',
                              backgroundColor: 'red',
                              verticalAlign: 'middle',
                              width: '70%',
                              marginLeft: 0,
                              marginRight: 0,
                              cursor: 'pointer',
                              marginTop: 0,
                            }}
                          >
                            <img
                              src="/images/homework-upload.png"
                              style={{ height: '50px', width: 'auto' }}
                            />
                            アップロード
                            <p style={{ color: 'black' }}>
                              最後にここをクリック
                            </p>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            style={{
                              fontWeight: '600',
                              padding: '10px',
                              color: 'black',
                              fontSize: '18px',
                              border: '1px solid orange',
                              borderRadius: '10px',
                              backgroundColor: '#ececec',
                              verticalAlign: 'middle',
                              width: '70%',
                              marginLeft: 0,
                              marginRight: 0,
                              cursor: 'pointer',
                              marginTop: 0,
                            }}
                          >
                            <img
                              src="/images/homework-upload.png"
                              style={{ height: '50px', width: 'auto' }}
                            />
                            アップロード
                            <p style={{ color: 'black' }}>
                              最後にここをクリック
                            </p>
                          </button>
                        </>
                      )}
                    </center>
                  </div>
                </div>
              </form>

              <span style={{ cursor: 'pointer' }}>
                <h5
                  style={{
                    width: '100%',
                    fontSize: '18px',
                    padding: '20px',
                    backgroundColor: '#F9EBEA',
                    marginTop: '20px',
                    marginBottom: '15px',
                    color: 'black',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    reloadImage(mbn, thisSubject, homework_id, currentStep)
                    setMindmapView(!mindmapView)
                  }}
                >
                  クリックしてアップロードされたファイルを見る
                </h5>
              </span>
              <div className="col-lg-12 col-md-12">
                <h5>
                  <strong>
                    TOTAL:{fileMindmap.length > 0 ? fileMindmap.length : 0}
                  </strong>
                </h5>
                {Array.isArray(fileMindmap) &&
                  fileMindmap.map((val, key) => {
                    var uploadfile =
                      'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' +
                      val.fileName
                    return (
                      <>
                        <p key={key}>
                          <img
                            src={uploadfile}
                            style={{
                              paddingTop: 0,
                              marginTop: 0,
                              border: '1px solid #dedede',
                              width: '95%',
                              maxWidth: '800px',
                            }}
                          />
                          <br />
                          <span
                            style={{
                              color: 'red',
                              fontWeight: '900',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              setFileName(val.fileName)
                              deleteFileInfo(
                                val.autoid,
                                val.homework_id,
                                currentStep
                              )
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              size="2x"
                              color="darkorange"
                              className="mr-1 mt-2"
                            />
                          </span>
                          <hr style={{ border: '0.001em solid black' }} />
                        </p>
                      </>
                    )
                  })}
                <h6>
                  {!isFileAru && 'アップロードされたファイルがありません。'}
                </h6>
              </div>
            </>
          ) : (
            <div className="mt-4 p-3">
              <strong>
                すでに終了している課題のリンクです。QRコードは課題ことに一回のみ有効です。
                <br />
                今の課題のファイルをアップロードするためには、
                パソコンのページからもう一度QRCodeを読み込んでください。
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
          onCancel={() => {
            setIsOpenBackMypage(false)
          }}
          confirmBtnText="OK"
          cancelBtnText=""
          showCancel={false}
          reverseButtons={false}
          style={{ width: '600px' }}
        ></SweetAlert>

        <SweetAlert
          title="許可されてないファイル形式です。"
          show={isPermettedFile}
          onConfirm={() => setIsPermettedFile(false)}
          confirmBtnText="OK"
          showCancel={false}
          reverseButtons={true}
          style={{ width: '500px' }}
        >
          <p>アップロード可能なファイルは、jpg/jpeg/pngファイルのみです。</p>
        </SweetAlert>

        <SweetAlert
          title="ファイルを選択してください。"
          font-ize="15px"
          show={isFileSelected}
          onConfirm={() => setIsFileSelected(false)}
          confirmBtnText="OK"
          showCancel={false}
          reverseButtons={true}
          style={{ width: '500px' }}
        ></SweetAlert>
        <SweetAlert
          title="削除完了"
          font-ize="15px"
          show={isFileDeleted}
          onConfirm={() => afterDeleteImgReload()}
          confirmBtnText="OK"
          showCancel={false}
          reverseButtons={true}
          style={{ width: '500px' }}
        >
          <p>削除すると、アップロード時に獲得したポイントも消えます。</p>
        </SweetAlert>
        <CopyrightFooter />
      </div>
    </>
  )
}

export default App
