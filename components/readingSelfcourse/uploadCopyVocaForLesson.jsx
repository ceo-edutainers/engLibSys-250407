import React, { useRef, useState, useContext, useEffect } from 'react'
import S3 from 'react-aws-s3'
import SweetAlert from 'react-bootstrap-sweetalert'
import axios from 'axios'
import { QuizContext } from '@/components/readingSelfcourse/ContextsB'
import Router, { useRouter } from 'next/router'
import QRCode from 'react-qr-code'
import QrcodeGenerator from '@/components/readingSelfcourse/QrcodeGenerator'
function Upload({ currentStep, stepStatus, pointKeyNum, homework_id, copyHW }) {
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
    englibLevel,
    setEnglibLevel,
    qrLinkOtherHW,
    setQrLinkOtherHW,
    qrLinkBookQuestion,
    setQrLinkBookQuestion,
    thisSubject,
    englibLevelColor,
    setEnglibLevelColor,
    setThisSubject,
    leastRecordCount_step2,
    setLeastRecordCount_step2,
    leastRecordCount_step3,
    setLeastRecordCount_step3,
    bookCoverImgUrl,
    setBookCoverImgUrl,
    bookImgUrl,
    setBookImgUrl,
    bookAudioUrl,
    setBookAudioUrl,
    bookIntroAudioUrl,
    setBookIntroAudioUrl,
    bookIntro2AudioUrl,
    setBookIntro2AudioUrl,
    bookAuthorAudioUrl,
    setBookAuthorAudioUrl,
    bookAudio2Url,
    setBookAudio2Url,
    bookAudio2TitleUrl,
    setBookAudio2TitleUrl,
    bookAudio3TitleUrl,
    setBookAudio3TitleUrl,
    bookAudio3Url,
    setBookAudio3Url,
    bookAudio4TitleUrl,
    setBookAudio4TitleUrl,
    bookAudio4Url,
    setBookAudio4Url,
    bookAudio5TitleUrl,
    setBookAudio5TitleUrl,
    bookAudio5Url,
    setBookAudio5Url,
    bookAudio6TitleUrl,
    setBookAudio6TitleUrl,
    bookAudio6Url,
    setBookAudio6Url,
    bookAudio7TitleUrl,
    setBookAudio7TitleUrl,
    bookAudio7Url,
    setBookAudio7Url,
    seriesName,
    setSeriesName,
    bookStory,
    setBookStory,
    readingLevel,
    setReadingLevel,
    bookTitle,
    setBookTitle,
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
    storyTitle,
    setStoryTitle,
    storyStartPage,
    setStoryStartPage,
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
    answerFile,
    setAnswerFile,
  } = useContext(QuizContext)
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')
  const fileInput = useRef()
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isPermettedFile, setIsPermettedFile] = useState(false)
  const [isFileAru, setIsFileAru] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [fileDetail, setFileDetail] = useState('BookQuestion')
  const [isFileSelected, setIsFileSenected] = useState(false)
  const [qrcodeUrl, setQrCodeUrl] = useState()
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
          setIsFileAru(false)
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
      ext !== 'PNG'
    ) {
      setIsPermettedFile(true)
      return false
    }

    var dateVariable = new Date()
    var nowDate = dateVariable.getDate()
    var nowTime = dateVariable.getTime()
    var fileTime = nowDate + nowTime

    let newfilename =
      'readingCourse_' + HWID + '_' + i + '_' + fileTime + '.' + ext
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
        insertPointToDB()

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
                border: '1px solid #b0c4de',
                borderRadius: '10px',
                padding: '10px',
                width: '100%',
              }}
            >
              <div
                className="col-lg-12 col-md-12 pt-2"
                style={{ textAlign: 'center' }}
              >
                <center>
                  <h1
                    style={{
                      color: '#5719E5',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      marginBottom: 0,
                    }}
                  >
                    あなたに出されたアップロードする課題{' '}
                  </h1>
                  <h5 style={{ color: 'red' }}>
                    <ruby>
                      単語帳<rt>たんごちょう</rt>
                    </ruby>
                    ・
                    {copyHW == 'ok' && (
                      <span>
                        <ruby>
                          本<rt>ほん</rt>
                        </ruby>
                        のコピー・
                      </span>
                    )}
                    {courseName == 'CourseB' && (
                      <span>
                        チャプターの
                        <ruby>
                          終 <rt>お</rt>
                        </ruby>
                        わりの
                        <ruby>
                          問題<rt>もんだい</rt>
                        </ruby>
                        の
                        <ruby>
                          手書<rt>てが</rt>
                        </ruby>
                        き
                        <ruby>
                          課題<rt>かだい</rt>
                        </ruby>
                      </span>
                    )}
                  </h5>
                  <p>
                    <ruby>
                      課題<rt>かだい</rt>
                    </ruby>
                    が
                    <ruby>
                      終<rt>お</rt>
                    </ruby>
                    わったらアップロードしてください。
                  </p>

                  <a
                    href="https://myenglib.com/onlesson/online_material/homeworksheet/Voca6-online.pdf"
                    target="_blank"
                  >
                    <span className="btn btn-info pt-2 mb-1">
                      <ruby>
                        単語帳<rt>たんごちょう</rt>
                      </ruby>
                      6
                    </span>
                  </a>
                  <a
                    href="https://myenglib.com/onlesson/online_material/homeworksheet/Voca10-online.pdf"
                    target="_blank"
                  >
                    <span className="btn btn-info ml-2 pt-2 mb-1">
                      <ruby>
                        単語帳<rt>たんごちょう</rt>
                      </ruby>
                      10
                    </span>
                  </a>
                  <a
                    href="https://myenglib.com/onlesson/online_material/homeworksheet/Voca20-online.pdf"
                    target="_blank"
                  >
                    <span className="btn btn-info ml-2 pt-2 mb-1">
                      <ruby>
                        単語帳<rt>たんごちょう</rt>
                      </ruby>
                      20
                    </span>
                  </a>
                </center>
              </div>
              <div
                className="col-lg-6 col-md-12 pt-2 pb-2"
                style={{ textAlign: 'center' }}
              >
                <center>
                  <p
                    style={{
                      border: '0.1em solid #b0c4de',
                      borderRadius: '10px',
                      padding: '10px',
                    }}
                  >
                    {/* <p>{qrLinkBookQuestion}</p> */}

                    <QrcodeGenerator
                      url={qrLinkBookQuestion}
                      title="課題アップロード"
                    />
                    <p style={{ color: 'blue', fontSize: '14px' }}>
                      スマホ
                      <ruby>
                        用<rt>よう</rt>
                      </ruby>
                      の
                      <ruby>
                        課題<rt>かだい</rt>
                      </ruby>
                      アップロード
                      <br />
                      (QRコードをスマホにかざす.)
                    </p>
                  </p>
                  {/* <p style={{ color: 'red', fontSize: '12px' }}>
                    1枚アップロードで5Pointゲットできますので、
                    課題提出をお勧めします。
                  </p> */}
                </center>
              </div>

              <div
                className="col-lg-6 col-md-12 pt-2 pb-2"
                style={{
                  // border: '0.1em solid #b0c4de',
                  // borderRadius: '10px',
                  // paddingTop: '100px',
                  // paddingLeft: '100px',
                  // paddingRight: '100px',
                  // paddingBottom: '0px',
                  width: '100%',
                  textAlign: 'center',
                }}
                // style={{ textAlign: 'center' }}
              >
                <p
                  style={{
                    border: '0.1em solid #b0c4de',
                    borderRadius: '10px',
                    padding: '25px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'black',
                      paddingTop: '20px',
                      paddingBottom: 0,
                      marginBottom: 0,
                      lineHeight: 1.5,
                      marginTop: 0,
                    }}
                  >
                    1ページ アップロードで
                  </p>
                  <h1
                    style={{
                      color: 'red',
                      fontWeight: '800',
                      fontSize: '25px',
                    }}
                  >
                    ５ポイント
                  </h1>
                </p>
              </div>
              {/* <div className="single-courses-item-box  mr-0 pr-0">
                    <div
                      className="courses-image mt-3  mr-0 pr-0 pt-70"
                      aria-label="１ページアップロードで５ポイントゲット！"
                      data-balloon-pos="right"
                      data-balloon-length="medium"
                    >
                      <div
                        className="price shadow  mr-0 pr-0"
                        style={{
                          lineHeight: 1,
                          width: '120px',
                          height: '120px',
                          // marginTop: '100px',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '14px',
                            color: 'black',
                            paddingTop: '20px',
                            paddingBottom: 0,
                            marginBottom: 0,
                            lineHeight: 1.5,
                            marginTop: 0,
                          }}
                        >
                          1ページ
                          <br />
                          アップロードで
                        </p>
                        ５ポイント
                      </div>
                    </div>
                  </div> */}

              <div
                className="col-lg-6 col-md-12 pt-3"
                style={{ textAlign: 'center' }}
              >
                <label
                  className="btn btn-warning"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    fontAlign: 'center',
                    width: '100%',
                    height: '80px',
                    paddingTop: '2px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    fontWeight: '600',
                  }}
                >
                  <ruby>
                    課題<rt>かだい</rt>
                  </ruby>
                  の
                  <ruby>
                    写真<rt>しゃしん</rt>
                  </ruby>
                  を
                  <ruby>
                    選択<rt>せんたく</rt>
                  </ruby>
                  <br />(
                  <ruby>
                    複数<rt>ふくすう</rt>
                  </ruby>
                  <ruby>
                    選択<rt>せんたく</rt>
                  </ruby>
                  <ruby>
                    可<rt>か</rt>
                  </ruby>
                  )
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
                className="col-lg-6 col-md-12 "
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
                        color: 'white',
                        fontSize: '18px',

                        border: '1px solid white',
                        borderRadius: '10px',
                        backgroundColor: 'red',
                        verticalAlign: 'middle',
                        width: '100%',

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
                ) : (
                  <>
                    <button
                      style={{
                        fontWeight: '600',
                        padding: '10px',
                        color: 'black',
                        fontSize: '18px',
                        border: '1px solid violet',
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
