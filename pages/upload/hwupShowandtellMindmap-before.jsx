import React, { useState, useEffect, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import S3 from 'react-aws-s3'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
// import ViewUploadFile from '@/components/readingSelfcourse/viewUploadFile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import IdeaBox from '@/components/Output_ShowAndTell/IdeaBox'
function App() {
  const [fileMindmap, setFileMindmap] = useState([])

  const [mbn, setMyMbn] = useState()
  const [homework_id, setHomework_id] = useState()
  const [thisSubject, setThisSubject] = useState()
  const [practiceTempId, setPracticeTempId] = useState()
  const [currentStep, setCurrentStep] = useState()
  const [stepStatus, setStepStatus] = useState()
  const [pointKeyNum, setPointKeyNum] = useState()
  const [fileDetail, setFileDetail] = useState()

  const router = useRouter()
  const { query } = useRouter()

  // useEffect(() => {
  //   if (router.isReady) {
  //     // Code using query
  //     console.log('router.query', router.query)
  //     setMyMbn(router.query.m)
  //     setHomework_id(router.query.hid)
  //     setThisSubject(router.query.sb)
  //     setPracticeTempId(router.query.pti)
  //     setCurrentStep(router.query.cstep)
  //     setStepStatus(router.query.sS)
  //     setPointKeyNum(router.query.pntKN)
  //     setFileDetail(router.query.fD)
  //     console.log('###mbn', router.query.m)
  //     console.log('###hid', router.query.hid)
  //   }
  // }, [router.isReady])

  useEffect(() => {
    if (router.isReady && router.query) {
      // Code using query
      console.log('router.query', router.query)
      setMyMbn(router.query.m)
      setHomework_id(router.query.hid)
      setThisSubject(router.query.sb)
      setPracticeTempId(router.query.pti)
      setCurrentStep(router.query.cstep)
      setStepStatus(router.query.sS)
      setPointKeyNum(router.query.pntKN)
      setFileDetail(router.query.fD)
      console.log('###mbn', router.query.m)
      console.log('###hid', router.query.hid)
      console.log('###thisSubject', router.query.sb) // 추가된 디버깅용 콘솔 로그
    }
  }, [router.isReady, router.query]) // 의존성 배열에 router.query 추가

  console.log('###mbn'.mbn)
  console.log('###hwid', homework_id)

  const [pti, setPti] = useState()

  const refreshLink =
    '/upload/hwupShowandtellMindmap?m=' +
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

  useEffect(() => {
    if (practiceTempId == '') {
      setPti('from mobile')
    } else {
      setPti(practiceTempId)
    }
  }, [])

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
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
        } else {
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

  const hwHistoryUpdate = (
    currentStep,
    stepStatus,
    homework_id,
    pti,
    thisSubject,
    newFileName,
    fileDetail
  ) => {
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
        localStorage.setItem('rediriectPageView', 'finished')
        reloadImage()
      })
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
    }
  }, [router.isReady])

  const handleUpload = (file, i) => {
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
      'showandtell_Mindmap_' +
      homework_id +
      '_' + //readingSelfCourse_
      fileTime +
      '.' +
      ext
    setNewFileName(newfilename)
    console.log('newFileName:', newFileName)

    const config = {
      bucketName: process.env.S3_REACT_APP_BUCKET_NAME /**いつもenglib */,
      dirName: process.env.S3_REACT_APP_DIR_NAME2 /* optional */,
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
        // setUploadCompleted(true)
        insertPointToDB()
      } else {
      }
    })
  }

  const [mindmapView, setMindmapView] = useState(false) //IdeaView
  // const [fileBookQuestion, setFileBookQuestion] = useState([])
  const [fileName, setFileName] = useState()
  const [isFileDeleted, setIsFileDeleted] = useState(false)
  const [fileLength, setFileLength] = useState()

  const refreshPage = () => {
    window.location.reload()
  }
  const deleteFileInfo = (id, homework_id, pointStep) => {
    var homework_id = homework_id
    var pointStep = currentStep

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

  const afterDeleteImgReload = () => {
    // alert('test')
    setIsFileDeleted(false)
    reloadImage()
  }

  // useEffect(() => {
  //   reloadImage()
  // }, [])

  // useEffect(() => {
  //   if (router.isReady && router.query) {
  //     // Code using query
  //     console.log('router.query', router.query)
  //     setMyMbn(router.query.m)
  //     setHomework_id(router.query.hid)
  //     setThisSubject(router.query.sb)
  //     setPracticeTempId(router.query.pti)
  //     setCurrentStep(router.query.cstep)
  //     setStepStatus(router.query.sS)
  //     setPointKeyNum(router.query.pntKN)
  //     setFileDetail(router.query.fD)
  //     console.log('###mbn', router.query.m)
  //     console.log('###hid', router.query.hid)
  //     console.log('###thisSubject', router.query.sb)

  //     // 모든 상태 값이 설정된 후에 reloadImage 호출
  //     reloadImage(
  //       router.query.m,
  //       router.query.sb,
  //       router.query.hid,
  //       router.query.cstep
  //     )
  //   }
  // }, [router.isReady, router.query])

  useEffect(() => {
    if (router.isReady && router.query) {
      // 상태 값 설정
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

      console.log('###mbn', myMbn)
      console.log('###hid', myHomeworkId)
      console.log('###thisSubject', myThisSubject)

      // 모든 상태 값이 설정된 후에 reloadImage 호출
      reloadImage(myMbn, myThisSubject, myHomeworkId, myCurrentStep)
    }
  }, [router.isReady, router.query])

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

          alert(Url)
          const response = await axios.get(Url)

          // 데이터 구조를 디버깅하기 위한 로그
          console.log('response.data:', response.data)

          if (!response.data.length) {
            setFileMindmap([])
          } else {
            console.log('response.data.response:', response.data.response) // 응답 데이터 구조 확인

            const filemindmapArray = response.data.response
              .map((item) => {
                console.log('item:', item) // 각 항목의 구조 확인
                if (!item.fileName) {
                  console.error('Missing fileName in item:', item)
                  return null
                }
                return (
                  'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' +
                  item.fileName
                )
              })
              .filter(Boolean) // null 값 제거

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

  // const reloadImage = (mbn, thisSubject, homework_id, currentStep) => {
  //   if (localStorage.getItem('loginStatus') === 'true') {
  //     const fetchData2 = async () => {
  //       try {
  //         const url = DB_CONN_URL + '/get-mindmap-sys-hw-history/'
  //         const Url =
  //           url +
  //           mbn +
  //           '&' +
  //           thisSubject +
  //           '&' +
  //           homework_id +
  //           '&' +
  //           currentStep

  //         alert(Url)
  //         const response = await axios.get(Url)

  //         // 데이터 구조를 디버깅하기 위한 로그
  //         console.log('response.data:', response.data)

  //         if (!response.data.length) {
  //           setFileMindmap([])
  //         } else {
  //           const filemindmapArray = response.data.response
  //             .map((item) => {
  //               if (!item.fileName) {
  //                 console.error('Missing fileName in item:', item)
  //                 return null
  //               }
  //               return (
  //                 'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' +
  //                 item.fileName
  //               )
  //             })
  //             .filter(Boolean) // null 값 제거

  //           if (filemindmapArray.length === 0) {
  //             console.error(
  //               'No valid file names found in response:',
  //               response.data.response
  //             )
  //             setFileMindmap([])
  //           } else {
  //             setFileMindmap(filemindmapArray)
  //             console.log('fileMindmap:', filemindmapArray)
  //           }
  //         }
  //       } catch (error) {
  //         console.log(error)
  //         alert(error)
  //       }
  //     }

  //     fetchData2()
  //   }
  // }

  // const reloadImage = (mbn, thisSubject, homework_id, currentStep) => {
  //   if (localStorage.getItem('loginStatus') == 'true') {
  //     const fetchData2 = async () => {
  //       try {
  //         var url = DB_CONN_URL + '/get-mindmap-sys-hw-history/'
  //         var Url =
  //           url +
  //           mbn +
  //           '&' +
  //           thisSubject +
  //           '&' +
  //           homework_id +
  //           '&' +
  //           currentStep

  //         // alert('url' + Url)
  //         const response = await axios.get(Url)
  //         if (!response.data.length) {
  //           setFileMindmap([])
  //         } else {
  //           var filemindmap =
  //             'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' +
  //             response.data.response[0].fileName
  //           setFileMindmap([filemindmap]) // 배열로 설정
  //           console.log('fileMindmap:', fileMindmap)
  //         }
  //       } catch (error) {
  //         console.log(error)
  //         alert(error)
  //       }
  //     }

  //     fetchData2()
  //   }
  // }

  // const reloadImage = () => {
  //   if (localStorage.getItem('loginStatus') == 'true') {
  //     var mbn = localStorage.getItem('MypageMbn')
  //     const fetchData2 = async () => {
  //       try {
  //         var url = DB_CONN_URL + '/get-mindmap-sys-hw-history/'
  //         var Url =
  //           url +
  //           mbn +
  //           '&' +
  //           thisSubject +
  //           '&' +
  //           homework_id +
  //           '&' +
  //           currentStep

  //         alert(Url)
  //         const response = await axios.get(Url)
  //         if (!response.data.length) {
  //           setFileMindmap([])
  //         } else {
  //           var filemindmap =
  //             'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' +
  //             response.data.response[0].fileName
  //           setFileMindmap([filemindmap]) // 배열로 설정
  //           console.log('fileMindmap:', fileMindmap)
  //         }
  //       } catch (error) {
  //         console.log(error)
  //         alert(error)
  //       }
  //     }

  //     fetchData2()
  //   }
  // }
  return (
    <>
      <div>
        <center>
          {/* expiredHW:{expiredHW ? 'true' : 'false'} */}
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
                    {/* {thisSubject} */}
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
                      ファイルを選択
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
              <div className="col-lg-12 col-md-12">
                {/* <h5>
                  <strong>TOTAL:{fileLength > 0 ? fileLength : 0}</strong>
                </h5> */}
                {
                  // mindmapView &&
                  //   isFileAru &&
                  fileMindmap?.map((val, key) => {
                    var uploadfile =
                      'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' +
                      val.fileName
                    return (
                      <>
                        {' '}
                        {uploadfile}
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
          <p>削除すると、アップロード時に獲得したポイントも消えます。</p>
        </SweetAlert>
        <CopyrightFooter />
      </div>
    </>
  )
}

export default App
