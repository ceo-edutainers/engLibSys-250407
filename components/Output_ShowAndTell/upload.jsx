import React, { useRef, useState, useEffect } from 'react'
import S3 from 'react-aws-s3'
import SweetAlert from 'react-bootstrap-sweetalert'
import axios from 'axios'
import QrcodeGenerator from '@/components/readingSelfcourse/QrcodeGenerator'

function Upload({
  currentStep,
  stepStatus,
  pointKeyNum,
  HWID,
  practiceTempId,
  thisSubject,
}) {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN

  const [fileMindmap, setFileMindmap] = useState('')
  const fileInput = useRef()
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isPermettedFile, setIsPermettedFile] = useState(false)
  const [isFileAru, setIsFileAru] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [fileDetail, setFileDetail] = useState('Mindmap')
  const [isFileSelected, setIsFileSenected] = useState(false)

  const [qrLinkBookQuestion, setQrLinkBookQuestion] = useState('')

  useEffect(() => {
    // function getQrLinkBookQuestion(HWID) {

    var mbn = localStorage.getItem('MypageMbn')
    var pointkey = 'ST-1'
    var fileDetail = 'Mindmap'
    var ql =
      'https://myben.app/upload/hwupShowandtellMindmap?m=' +
      mbn +
      '&sb=' +
      'SHOW AND TELL' +
      '&hid=' +
      HWID +
      '&pti=' +
      practiceTempId +
      '&cstep=' +
      'Step1OST' +
      '&sS=' +
      'Mindmap' +
      '&pntKN=' +
      pointkey +
      '&fD=' +
      fileDetail

    setQrLinkBookQuestion(ql)

    // }
  }, [HWID])

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
          console.log('##pointKeyNum', pointKeyNum)
          console.log('##HWID', HWID)
          console.log('##currentStep', currentStep)
          console.log('##practiceTempId', practiceTempId)
        } else {
          //alert(response.data.message)
        }
      })
  }

  const handleClick = (event) => {
    event.preventDefault()

    let file = fileInput.current.files[0]

    if (!file) {
      setIsFileSenected(true)
      // alert('no file')
      return false
    }
    //ファイル名から拡張子を取得する関数
    // console.log('fileInput.current.files:', fileInput.current.files[0].name)  //これが本当のファイル名
    var parts = []
    parts = fileInput.current.files[0].name.split('.')
    var ext = parts[1]

    if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
      setIsPermettedFile(true)
      return false
    }

    var dateVariable = new Date()
    var nowDate = dateVariable.getDate()
    var nowTime = dateVariable.getTime()
    var fileTime = nowDate + nowTime

    let newfilename = 'showandtell_Mindmap_' + HWID + '_' + fileTime + '.' + ext
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

  // const hwHistoryUpdate = (
  //   currentStep,
  //   stepStatus,
  //   HWID,
  //   practiceTempId,
  //   thisSubject,
  //   newFileName,
  //   fileDetail
  // ) => {
  //   console.log('TEST-;', currentStep)
  //   console.log('TEST-HWID;', HWID)

  //   var mbn = localStorage.getItem('MypageMbn')
  //   var homework_id = HWID
  //   // alert(newFileName)

  //   var url = DB_CONN_URL + '/update-sys-hw-history-uploadFile/'
  //   axios
  //     .put(
  //       url +
  //         mbn +
  //         '&' +
  //         homework_id +
  //         '&' +
  //         practiceTempId +
  //         '&' +
  //         currentStep +
  //         '&' +
  //         stepStatus +
  //         '&' +
  //         thisSubject +
  //         '&' +
  //         newFileName +
  //         '&' +
  //         fileDetail
  //     )

  //     .then((response) => {

  //       reloadImage()
  //     })
  // }

  const hwHistoryUpdate = (
    currentStep,
    stepStatus,
    HWID,
    practiceTempId,
    thisSubject,
    newFileName,
    fileDetail
  ) => {
    console.log('TEST-;', currentStep)
    console.log('TEST-HWID;', HWID)

    const mbn = localStorage.getItem('MypageMbn')
    const url = DB_CONN_URL + '/update-sys-hw-history-uploadFile'

    axios
      .post(url, {
        mbn: mbn,
        homework_id: HWID,
        practiceTempId: practiceTempId,
        currentStep: currentStep,
        stepStatus: stepStatus,
        thisSubject: thisSubject,
        newfilename: newFileName,
        fileDetail: fileDetail,
      })
      .then((response) => {
        console.log('📥 HW Upload Success:', response.data)
        reloadImage()
      })
      .catch((error) => {
        console.error('❌ HW Upload Failed:', error)
      })
  }

  // const imgRe
  const reloadImage = () => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      // alert(HWID)
      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-mindmap-sys-hw-history/'
          var Url =
            url + mbn + '&' + thisSubject + '&' + HWID + '&' + currentStep

          const response = await axios.get(Url)
          // alert('there')
          if (!response.data.length) {
            setFileMindmap('')
          } else {
            // var filemindmap =
            //   'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' +
            //   response.data.response[0].fileName
            const filemindmap = `https://${PUBLIC_R2_DOMAIN}/uploadhw/${response.data.response[0].fileName}`

            // imgRefresh(filemindmap)
            setFileMindmap(filemindmap)
            console.log('fileMindmap:', fileMindmap)
          }
        } catch (error) {
          console.log(error)
          alert(error)
        }
      }

      fetchData2()
    }
  }
  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      // alert(HWID)
      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-mindmap-sys-hw-history/'
          var Url =
            url + mbn + '&' + thisSubject + '&' + HWID + '&' + currentStep

          const response = await axios.get(Url)
          // alert('there')
          if (!response.data.length) {
            //alert('here1')
            // alert(response.data.length)
            // alert(response.data.message)
            setFileMindmap('')
          } else {
            //alert('here')
            //alert(response.data.response[0].fileName)
            // alert(response.data.message)
            // alert(response.data.length)

            // var filemindmap =
            //   'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' +
            //   response.data.response[0].fileName

            const filemindmap = `https://${PUBLIC_R2_DOMAIN}/uploadhw/${response.data.response[0].fileName}`

            // imgRefresh(filemindmap)
            setFileMindmap(filemindmap)
            console.log('fileMindmap:', fileMindmap)
          }
        } catch (error) {
          console.log(error)
          alert(error)
        }
      }

      fetchData2()
    }
  }, [])
  // }, [newFileName])

  return (
    <>
      <div>
        <center>
          <form className="upload-steps" onSubmit={handleClick}>
            <div
              className="col-lg-12 col-md-12 "
              // dangerouslySetInnerHTML={{
              //   __html: imgRefresh(fileMindmap),
              // }}
            >
              {(fileMindmap || newFileName) && (
                <>
                  <p
                    style={{ marginBottom: 0, paddingBottom: 0, color: 'red' }}
                  >
                    ↓↓↓ 最後に更新されたマインドマップ↓↓↓
                    {/* <br />
                    更新するためには、新たにアップロードしてください。 */}
                  </p>
                  {/* {fileMindmap} */}
                  <img
                    src={fileMindmap}
                    style={{
                      paddingTop: 0,
                      marginTop: 0,
                      border: '1px solid #dedede',
                    }}
                  />
                </>
              )}
            </div>
            <div
              className="row "
              style={{
                border: '1px solid #b0c4de',
                borderRadius: '10px',
                padding: '10px',
                width: '100%',
              }}
            >
              <div
                className="col-lg-12 col-md-12 "
                style={{ textAlign: 'center' }}
              >
                <center>
                  <p
                    style={{
                      border: '0.1em solid #b0c4de',
                      borderRadius: '10px',
                      padding: '4px',
                    }}
                  >
                    <QrcodeGenerator
                      url={qrLinkBookQuestion}
                      title="課題アップロード"
                    />
                    {/* {qrLinkBookQuestion} */}
                    <p style={{ color: 'blue', fontSize: '13px' }}>
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
          <p>アップロード可能なファイルは、jpg/jpeg/pngファイルのみです。</p>
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
