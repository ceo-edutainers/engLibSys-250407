import React, { useState, useEffect, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import S3 from 'react-aws-s3'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
// import ViewUploadFile from '@/components/readingSelfcourse/viewUploadFile'
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
  const { query } = useRouter()
  const mbn = query.m
  const homework_id = query.hid
  const thisSubject = query.sb

  const practiceTempId = query.pti

  const currentStep = query.cstep
  const stepStatus = query.sS
  const pointKeyNum = query.pntKN
  const fileDetail = query.fD

  const [pti, setPti] = useState()

  // const refreshLink =
  //   'localhost:3005/upload/hwup?m=' +
  //   mbn +
  //   '&sb=' +
  //   thisSubject +
  //   '&hid=' +
  //   homework_id +
  //   '&pti=' +
  //   '&cstep=' +
  //   currentStep +
  //   '&sS=' +
  //   stepStatus +
  //   '&pntKN=' +
  //   pointKeyNum +
  //   '&fD=' +
  //   fileDetail
  const refreshLink =
    '/upload/hwup?m=' +
    mbn +
    '&sb=' +
    thisSubject +
    '&hid=' +
    homework_id +
    '&pti=' +
    '&cstep=' +
    currentStep +
    '&sS=' +
    stepStatus +
    '&pntKN=' +
    pointKeyNum +
    '&fD=' +
    fileDetail

  // const [uploadCompleted, setUploadCompleted] = useState(false)
  useEffect(() => {
    if (practiceTempId == '') {
      setPti('from mobile')
    } else {
      setPti(practiceTempId)
    }
  }, [])
  // const fileName = query.fN

  //  sys_hw_history_fileupload
  //           member_barcode_num subject homework_id practiceTempId step
  //           fileDetail fileName regDate regTime

  const DB_CONN_URL = process.env.DB_CONN_URL
  const router = useRouter() //使い方：router.replace('/')
  const fileInput = useRef()
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
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

  //無限ループしない
  const bar2 = {}
  useEffect(() => {
    // alert(mbn)
    // alert(homework_id)
    var Url = DB_CONN_URL + '/check-hw-finished/' + mbn + '&' + homework_id

    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('length' + response.data.length)
          if (response.data.message == 'expired hw') {
            //すでに終わっている宿題/期間切れのリンク
            setExpiredHW(true)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }, [bar2])

  // const insertPointToDB = () => {
  //   // var pointStep = currentStep

  //   // alert(mbn)
  //   // alert(homework_id)
  //   // alert(pointKeyNum)
  //   // alert(currentStep)
  //   // alert(pti)
  //   var url = DB_CONN_URL + '/sys-point-member-history-insert'

  //   axios
  //     .post(url, {
  //       mbn: mbn,
  //       homework_id: homework_id,
  //       pointKeyNum: pointKeyNum,
  //       pointStep: currentStep,
  //       practiceTempId: pti,
  //     })
  //     .then((response) => {
  //       if (!response.data.status) {
  //         // alert(response.data.message) //for test
  //         // alert('ポイントゲット!!!')
  //         // console.log('##pointKeyNum', pointKeyNum)
  //         // console.log('##HWID', HWID)
  //         // console.log('##currentStep', currentStep)
  //         // console.log('##practiceTempId', practiceTempId)
  //       } else {
  //         //alert(response.data.message)
  //       }
  //     })
  // }

  const handleClick = (event) => {
    event.preventDefault()
    let newArr = fileInput.current.files
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i], i)
    }
  }
  // const handleUpload = (file) => {
  //   let newFileName = file.name.replace(/\..+$/, '')
  //   const ReactS3Client = new S3(config)
  //   ReactS3Client.uploadFile(file, newFileName).then((data) => {
  //     if (data.status === 204) {
  //       console.log('success')
  //     } else {
  //       console.log('fail')
  //     }
  //   })
  // }
  const handleUpload = (file, i) => {
    // event.preventDefault()

    // let file = fileInput.current.files[0]

    // if (!file) {
    //   setIsFileSenected(true)
    //   // alert('no file')
    //   return false
    // }
    //ファイル名から拡張子を取得する関数
    // console.log('fileInput.current.files:', fileInput.current.files[0].name)  //これが本当のファイル名
    var parts = []
    parts = fileInput.current.files[0].name.split('.')
    var ext = parts[1]
    // alert('ext' + ext)
    if (
      ext !== 'jpg' &&
      ext !== 'jpeg' &&
      ext !== 'png' &&
      ext !== 'JPG' &&
      ext !== 'JPEG' &&
      ext != 'PNG'
    ) {
      setIsPermettedFile(true)
      return false
    }

    var dateVariable = new Date()
    var nowDate = dateVariable.getDate()
    var nowTime = dateVariable.getTime()
    var fileTime = nowDate + nowTime

    let newfilename =
      'readingSelfCourse_' +
      fileDetail +
      '_' +
      homework_id +
      '_' +
      i +
      '_' +
      fileTime +
      '.' +
      ext
    setNewFileName(newfilename)
    console.log('newFileName:', newFileName)

    //let newFileName = fileInput.current.files[0].name.replace(/\..+$/, '')

    const config = {
      bucketName: process.env.S3_REACT_APP_BUCKET_NAME /**いつもenglib */,
      dirName: process.env.S3_REACT_APP_DIR_NAME2 /* optional */,
      region: process.env.S3_REACT_APP_REGION,
      accessKeyId: process.env.S3_REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.S3_REACT_APP_ACCESS_KEY,
    }

    const ReactS3Client = new S3(config)
    ReactS3Client.uploadFile(file, newfilename).then((data) => {
      // console.log(data)
      //正常の場合
      // console.log('fileDetail:', fileDetail)
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
        // setUploadCompleted(true)
        // insertPointToDB()

        // console.log('success')
      } else {
        // console.log('fail')
      }
    })
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
    // alert(newFileName)
    // alert(currentStep)
    // alert(stepStatus)
    // alert(homework_id)
    // alert(practiceTempId)
    // alert(thisSubject)
    // alert(newFileName)
    // alert(fileDetail)

    var url = DB_CONN_URL + '/update-sys-hw-history-uploadFile/'
    axios

      .put(
        url +
          mbn +
          '&' +
          homework_id +
          '&' +
          pti +
          '&' +
          currentStep +
          '&' +
          stepStatus +
          '&' +
          thisSubject +
          '&' +
          newFileName +
          '&' +
          fileDetail
      )

      .then((response) => {
        // reloadImage()
        // if (stepStatus == 'giveup') {
        //   router.reload('/outputShowAndTellCourse') // ここでリロード
        // } else if (stepStatus == 'end') {
        //   setPageView(nextStep)
        // }

        localStorage.setItem('rediriectPageView', 'finished')
        reloadImage()
        // router.reload('/readingSelfcourseB')
      })
  }

  //viewUploadFile Here

  const [mindmapView, setMindmapView] = useState(false) //IdeaView
  const [fileBookQuestion, setFileBookQuestion] = useState([])
  const [qrLinkOtherHW, setQrLinkOtherHW] = useState([])
  const [fileName, setFileName] = useState()
  const [isFileDeleted, setIsFileDeleted] = useState(false)
  const [fileLength, setFileLength] = useState()
  // const s3 = new AWS.S3({
  //   accessKeyId: process.env.S3_REACT_APP_ACCESS_ID,
  //   secretAccessKey: process.env.S3_REACT_APP_ACCESS_KEY,
  //   Bucket: process.env.S3_REACT_APP_BUCKET_NAME,
  //   dirName: process.env.S3_REACT_APP_DIR_NAME2 /* optional */,
  // })

  // const params = {
  //   Bucket: process.env.S3_REACT_APP_BUCKET_NAME,
  //   Key: fileName,
  // }

  // const config = {
  //   bucketName: process.env.S3_REACT_APP_BUCKET_NAME /**いつもenglib */,
  //   dirName: process.env.S3_REACT_APP_DIR_NAME2 /* optional */,
  //   region: process.env.S3_REACT_APP_REGION,
  //   accessKeyId: process.env.S3_REACT_APP_ACCESS_ID,
  //   secretAccessKey: process.env.S3_REACT_APP_ACCESS_KEY,
  // }

  // const ReactS3Client = new S3(config)
  const refreshPage = () => {
    window.location.reload()
  }
  const deleteFileInfo = (id, homework_id, pointStep) => {
    var homework_id = homework_id
    var pointStep = currentStep
    // alert(id)
    // alert(homework_id)

    var url = DB_CONN_URL + '/upload-reading-file-delete/'
    var Url = url + id + '&' + homework_id + '&' + pointStep
    //console.log(Url)

    const fetchData = async () => {
      try {
        await axios.get(Url).then((response) => {})
      } catch (error) {
        // alert('delete error!')
      }
    }
    // s3download(params)

    if (fileLength == 1) {
      setIsFileDeleted(true)
      refreshPage()
    } else {
      reloadImage()
      setIsFileDeleted(true)
    }
    fetchData()
  }

  // const s3download = function (params) {
  //   return new Promise((resolve, reject) => {
  //     ReactS3Client.createBucket(
  //       {
  //         Bucket:
  //           process.env.S3_REACT_APP_BUCKET_NAME /* Put your bucket name */,
  //       },
  //       function () {
  //         ReactS3Client.deleteObject(fileName, function (err, data) {
  //           if (err) console.log(err)
  //           else alert('Successfully deleted file from bucket')
  //           console.log(data)
  //         })
  //       }
  //     )
  //   })
  // }

  const afterDeleteImgReload = () => {
    // alert('test')
    setIsFileDeleted(false)
    reloadImage()
  }

  useEffect(() => {
    reloadImage()
  }, [])
  function reloadImage() {
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-upload-file-sys-hw-history/'
        var Url =
          url + mbn + '&' + thisSubject + '&' + homework_id + '&' + fileDetail

        const response = await axios.get(Url)
        // alert(response.data.length)
        if (!response.data.length) {
          setIsFileAru(false)
        } else {
          // alert(response.data.response)
          setIsFileAru(true)
          setFileBookQuestion(response.data.response)
          setQrLinkOtherHW(response.data.response)
          setFileLength(response.data.length)

          // console.log('fileBookQuestion:', fileBookQuestion)
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
                  <p>
                    このリンクは今回の課題のみ使えるリンクです。次回の課題をアップロードするためには、QRコードを新たに読み込む必要があります。
                  </p>
                  <hr />
                </div>
                <div
                  className="row mt-3  mb-1"
                  style={{
                    // border: '1px solid #b0c4de',
                    // borderRadius: '10px',
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
                        height: '70px',
                        paddingTop: '14px',
                        fontSize: '18px',
                        border: '1px solid orange',
                        borderRadius: '10px',
                        fontWeight: '600',
                      }}
                    >
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
                            <p style={{ color: 'white' }}>
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
                          </button>
                        </>
                      )}
                    </center>
                  </div>
                </div>
              </form>

              {/* <ViewUploadFile
                currentStep={currentStep}
                stepStatus={stepStatus}
                HWID={homework_id}
                thisSubject={thisSubject}
                fileDetail={fileDetail}
                mbn={mbn}
              /> */}
              <span style={{ cursor: 'pointer' }}>
                <h5
                  style={{
                    // width: '100%',
                    width: '100%',
                    fontSize: '18px',
                    padding: '20px',
                    // border: '1px solid #FCD2CF',
                    // borderRadius: '10px',
                    backgroundColor: '#F9EBEA',
                    marginTop: '20px',
                    marginBottom: '15px',
                    color: 'black',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    reloadImage()
                    setMindmapView(!mindmapView)
                  }}
                >
                  {/* <img
                    src="/images/icon-mouseclick.png"
                    style={{ height: '40px', width: 'auto' }}
                  /> */}
                  アップロードされたファイル
                  {/* {mindmapView ? '隠す' : '更新して見る'} */}
                </h5>
              </span>
              <div
                className="col-lg-12 col-md-12"
                // style={{ display: mindmapView ? 'block' : 'none' }}
              >
                <h5>
                  <strong>TOTAL:{fileLength > 0 ? fileLength : 0}</strong>
                </h5>
                {
                  // mindmapView &&
                  //   isFileAru &&
                  fileBookQuestion?.map((val, key) => {
                    var uploadfile =
                      'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' +
                      val.fileName
                    return (
                      <>
                        <p>
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
                            {/* {currentStep} */}
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
                  })
                }
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
        >
          {/* <p>
            次のステップに行く前に途中でやめると、このステップでゲットしたポイントは消えてしまいます。
          </p> */}
        </SweetAlert>

        <SweetAlert
          title="許可されてないファイル形式です。"
          show={isPermettedFile}
          onConfirm={() => setIsPermettedFile(false)}
          // onCancel={() => {
          //   setIsPermettedFile(false)
          // }}
          confirmBtnText="OK"
          // cancelBtnText="NO"
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
          // onCancel={() => {
          //   setIsPermettedFile(false)
          // }}
          confirmBtnText="OK"
          // cancelBtnText="NO"
          showCancel={false}
          reverseButtons={true}
          style={{ width: '500px' }}
        >
          {/* <p>
            アップロード可能なファイルは、jpg/jpeg/png/pdfファイルのみです。
          </p> */}
        </SweetAlert>
        <SweetAlert
          title="削除完了"
          font-ize="15px"
          show={isFileDeleted}
          onConfirm={() =>
            // setIsFileDeleted(false)
            afterDeleteImgReload()
          }
          // onCancel={() => {
          //   setIsPermettedFile(false)
          // }}
          confirmBtnText="OK"
          // cancelBtnText="NO"
          showCancel={false}
          reverseButtons={true}
          style={{ width: '500px' }}
        >
          {/* <p>
            アップロード可能なファイルは、jpg/jpeg/png/pdfファイルのみです。
          </p> */}
        </SweetAlert>
        <CopyrightFooter />
      </div>
    </>
  )
}

export default App
