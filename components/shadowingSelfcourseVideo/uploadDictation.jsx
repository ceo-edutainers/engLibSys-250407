import React, { useRef, useState, useContext, useEffect } from 'react'
import S3 from 'react-aws-s3'
import SweetAlert from 'react-bootstrap-sweetalert'
import { QuizContext } from '@/components/shadowingSelfcourseVideo/Contexts'
import Router, { useRouter } from 'next/router'
import QRCode from 'react-qr-code'
import axios from 'axios'
function Upload({
  currentStep,
  stepStatus,
  pointKeyNum,
  homework_id,
  qrLinkVideoDictation,
}) {
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    youtubeID,
    setYoutubeID,
    dictationMin,
    setDictationMin,
    shadowingSpeed,
    setShadowingSpeed,
    dictationHow,
    setDictationHow,
    lessonOrder,
    setLessonOrder,
    thisSubject,
    setThisSubject,
    leastRecordCount_ondoku,
    setLeastRecordCount_ondoku,
    leastRecordCount_shadowing,
    setLeastRecordCount_shadowing,
    bookCoverImgUrl,
    setBookCoverImgUrl,
    bookImgUrl,
    setBookImgUrl,
    shadowingLevel,
    setShadowingLevel,
    storyTitle,
    setStoryTitle,
    storyStartPage,
    setStoryStartPage,
    dictationStart,
    setDictationStart,
    movieNum,
    setMovieNum,
    youtubeURL,
    setYoutubeURL,
    shadowingTitle,
    setShadowingTitle,
    practiceTempId,
    setPracticeTempId,
    audioOnOff,
    setAudioOnOff,
    course,
    setCourse,
    courseName,
    setCourseName,
    pageView,
    setPageView,
    courseLevel,
    setCourseLevel,
    textbook,
    setTextbook,
    eikenLevel,
    setEikenLevel,
    userName,
    setUserName,
    point,
    setPoint,
    totalQuestion,
    setTotalQuestion,
  } = useContext(QuizContext)
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')
  const fileInput = useRef()
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isPermettedFile, setIsPermettedFile] = useState(false)
  const [isFileAru, setIsFileAru] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [fileDetail, setFileDetail] = useState('Dictation')
  const [isFileSelected, setIsFileSenected] = useState(false)
  const [qrcodeUrl, setQrCodeUrl] = useState(qrLinkVideoDictation)
  const insertPointToDB = () => {
    var mbn = localStorage.getItem('MypageMbn')
    var pointStep = currentStep
    // alert(pointKeyNum)
    var url = DB_CONN_URL + '/sys-point-member-history-insert'
    axios
      .post(url, {
        mbn: mbn,
        homework_id: HWID,
        pointKeyNum: pointKeyNum,
        pointStep: pointStep,
        practiceTempId: practiceTempId,
      })
      .then((response) => {
        if (!response.data.status) {
          // alert(response.data.message) //for test
          //alert('ポイントゲット!!!')
          // console.log('##pointKeyNum', pointKeyNum)
          // console.log('##HWID', HWID)
          // console.log('##currentStep', currentStep)
          // console.log('##practiceTempId', practiceTempId)
        } else {
          //alert(response.data.message)
        }
      })
  }

  const handleClick = (event) => {
    event.preventDefault()
    let newArr = fileInput.current.files
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i], i)
    }
    //何枚、何回アップロードしても、同じ宿題では一回のみポイントを上げる,20Point
    setIsFileAru(false)
    insertPointToDB()
  }

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
      ext !== 'JPEG'
    ) {
      setIsPermettedFile(true)
      return false
    }

    var dateVariable = new Date()
    var nowDate = dateVariable.getDate()
    var nowTime = dateVariable.getTime()
    var fileTime = nowDate + nowTime

    let newfilename =
      'shadowingSelfcourseVideo_Dictation_' +
      HWID +
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
      console.log('fileDetail:', fileDetail)
      if (data.status === 204) {
        hwHistoryUpdate(
          currentStep,
          stepStatus,
          HWID,
          practiceTempId,
          thisSubject,
          newfilename,
          fileDetail
        )
        setIsOpenBackMypage(true)
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
    HWID,
    practiceTempId,
    thisSubject,
    newFileName,
    fileDetail
  ) => {
    // console.log('test;', currentStep)

    var mbn = localStorage.getItem('MypageMbn')

    // alert(newFileName)
    var url = DB_CONN_URL + '/update-sys-hw-history-uploadFile/'
    axios

      .put(
        url +
          mbn +
          '&' +
          homework_id +
          '&' +
          practiceTempId +
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
        // router.reload('/readingSelfcourseB')
      })
  }

  return (
    <>
      <div>
        <center>
          <form className="upload-steps" onSubmit={handleClick}>
            <div
              className="row mt-3  mb-3"
              style={{
                border: '1px solid black',
                borderRadius: '10px',
                padding: '10px',
                width: '100%',
              }}
            >
              {/* {' '}
              <br />
              <br />
              <br />
              <p>{qrcodeUrl}</p> */}
              <div
                className="col-lg-2 col-md-12 pt-1"
                style={{ textAlign: 'center' }}
              >
                <QRCode value={qrcodeUrl} size="100" />
              </div>
              <div
                className="col-lg-6 col-md-12 pt-2"
                style={{ textAlign: 'center' }}
              >
                <label
                  className="btn btn-warning"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    fontAlign: 'center',
                    width: '80%',
                    height: '90px',
                    paddingTop: '2px',
                    fontSize: '13px',
                    borderRadius: '10px',
                    fontWeight: '600',
                  }}
                >
                  ディクテーションやシャドーイングの 単語帳の写真ファイルを選択
                  <br />
                  （複数選択可）
                  <input
                    type="file"
                    ref={fileInput}
                    accept=".jpg, .jpeg, .png"
                    onChange={() => {
                      setIsFileAru(true)
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      margin: 0,
                      padding: 0,
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
              </div>
              <div
                className="col-lg-4 col-md-12 "
                style={{
                  margin: 'auto',
                  width: '100%',
                  // border: '1px solid violet',
                  // borderRadius: '10px',
                  padding: '10px',
                  textAlign: 'left',
                }}
              >
                {isFileAru ? (
                  <>
                    <button
                      style={{
                        fontWeight: '600',
                        padding: '10px',
                        color: 'black',
                        fontSize: '18px',
                        borderRadius: '10px',
                        backgroundColor: 'red',
                        verticalAlign: 'middle',
                        width: '100%',
                        marginLeft: 0,
                        marginRight: 0,
                        cursor: 'pointer',
                      }}
                    >
                      <img
                        src="/images/homework-upload.png"
                        style={{ height: '50px', width: 'auto' }}
                      />
                      アップロード
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
                        borderRadius: '10px',
                        backgroundColor: '#F0E5F7',
                        verticalAlign: 'middle',
                        width: '100%',
                        marginLeft: 0,
                        marginRight: 0,
                        cursor: 'pointer',
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
              </div>
            </div>
          </form>
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
          <p>
            アップロード可能なファイルは、jpg/jpeg/png/pdfファイルのみです。
          </p>
        </SweetAlert>

        <SweetAlert
          title="ファイルを選択してください。"
          font-ize="15px"
          show={isFileSelected}
          onConfirm={() => setIsFileSenected(false)}
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
      </div>
    </>
  )
}

export default Upload
