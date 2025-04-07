import React, { useContext, useEffect, useState } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
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
const viewUploadFile = ({
  mbn,
  currentStep,
  stepStatus,
  HWID,
  thisSubject,
  fileDetail,
}) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [mindmapView, setMindmapView] = useState(false) //IdeaView
  const [fileBookQuestion, setFileBookQuestion] = useState([])
  const [isFileAru, setIsFileAru] = useState(false)
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

  const deleteFileInfo = (id, fileName) => {
    var homework_id = HWID
    var pointStep = currentStep
    var url = DB_CONN_URL + '/upload-reading-file-delete/'
    var Url = url + id + '&' + homework_id + '&' + pointStep
    //console.log(Url)
    const fetchData = async () => {
      try {
        await axios.get(Url).then((response) => {})
      } catch (error) {
        alert('delete error!')
      }
    }
    // s3download(params)
    setIsFileDeleted(true)
    fetchData()
    reloadImage()
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

  const reloadImage = () => {
    // alert(HWID)
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-upload-file-sys-hw-history/'
        var Url =
          url +
          mbn +
          '&' +
          thisSubject +
          '&' +
          HWID +
          '&' +
          currentStep +
          '&' +
          fileDetail

        const response = await axios.get(Url)
        // alert(response.data.length)
        if (!response.data.length) {
          setIsFileAru(false)
        } else {
          // alert(response.data.response)
          setIsFileAru(true)
          setFileBookQuestion(response.data.response)
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
      <span style={{ cursor: 'pointer' }}>
        <h5
          style={{
            // width: '100%',
            width: '100%',
            fontSize: '18px',
            padding: '10px',
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
          <img
            src="/images/icon-mouseclick.png"
            style={{ height: '40px', width: 'auto' }}
          />
          アップロードファイルを更新
          {/* {mindmapView ? '隠す' : '更新して見る'} */}
        </h5>
      </span>
      <div
        className="col-lg-12 col-md-12"
        // style={{ display: mindmapView ? 'block' : 'none' }}
      >
        <h5>
          <strong>TOTAL:{fileLength}</strong>
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
                    style={{ color: 'red', fontWeight: '900' }}
                    onClick={() => {
                      setFileName(val.fileName)
                      deleteFileInfo(val.autoid, val.fileName)
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
          })
        }
        <h6>{!isFileAru && 'アップロードされたファイルがありません。'}</h6>
      </div>
      <SweetAlert
        title="削除完了"
        font-ize="15px"
        show={isFileDeleted}
        onConfirm={() => setIsFileDeleted(false)}
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
    </>
  )
}

export default viewUploadFile
