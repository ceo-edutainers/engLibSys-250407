import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from './ContextsB'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
// import S3 from 'react-aws-s3'
const ViewBookQuestionFile = ({ currentStep, stepStatus }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN
  const [mindmapView, setMindmapView] = useState(false) //IdeaView
  const [fileBookQuestion, setFileBookQuestion] = useState([])
  const [isFileAru, setIsFileAru] = useState(false)
  const [fileName, setFileName] = useState()
  const [isFileSelected, setIsFileSelected] = useState(false)
  const [isFileDeleted, setIsFileDeleted] = useState(false)
  const [fileLength, setFileLength] = useState()
  const { myMbn, setMyMbn, HWID, setHWID, thisSubject, setThisSubject } =
    useContext(QuizContext)

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
        alert('delete error!')
      }
    }
    // s3download(params)
    // reloadImage()

    setIsFileDeleted(true)
    reloadImage()
    if (fileLength == 1) setMindmapView(false)
    fetchData()
  }

  const reloadImage = () => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')

      // alert(HWID)
      const fetchData2 = async () => {
        try {
          var fileDetail = 'BookQuestion'
          // alert(thisSubject)
          var url = DB_CONN_URL + '/get-upload-file-sys-hw-history/'
          var Url =
            url + mbn + '&' + thisSubject + '&' + HWID + '&' + fileDetail
          // alert(Url)
          // var url = DB_CONN_URL + '/get-book-question-sys-hw-history/'
          // var Url =
          //   url + mbn + '&' + thisSubject + '&' + HWID + '&' + currentStep

          const response = await axios.get(Url)
          // alert(response.data.length)
          if (!response.data.length) {
            setIsFileAru(false)
            alert('no data')
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
  }
  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <span style={{ cursor: 'pointer' }}>
        <h5
          style={{
            // width: '100%',
            width: '100',
            fontSize: '18px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#F9EBEA',
            marginTop: '20px',
            marginBottom: '15px',
            color: 'black',
            fontWeight: '600',
            border: '1px solid #FCD2CF',
          }}
          onClick={() => {
            setMindmapView(!mindmapView)
            reloadImage()
          }}
        >
          <img
            src="/images/icon-mouseclick.png"
            style={{ height: '40px', width: 'auto' }}
          />

          {mindmapView
            ? 'ファイルを隠す'
            : '<リーディング> アップロード済みのファイルを確認する'}
        </h5>
      </span>
      <div
        className="col-lg-12 col-md-12"
        style={{ display: mindmapView ? 'block' : 'none' }}
      >
        {mindmapView &&
          isFileAru &&
          fileBookQuestion.map((val, key) => {
            var uploadfile = `https://${PUBLIC_R2_DOMAIN}/uploadhw/${val.fileName}`
            return (
              <>
                <p style={{ textAlign: 'center' }}>
                  {/* {uploadfile} */}
                  <img
                    src={uploadfile}
                    style={{
                      paddingTop: 0,
                      marginTop: 0,
                      border: '1px solid #dedede',
                    }}
                  />{' '}
                  <br />
                  <span
                    style={{
                      color: 'red',
                      fontWeight: '900',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setFileName(val.fileName)
                      deleteFileInfo(val.autoid, val.homework_id, currentStep)
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
        <h6> {!isFileAru && 'アップロードされたファイルがありません。'}</h6>
      </div>
      <SweetAlert
        title="削除完了"
        font-ize="15px"
        show={isFileDeleted}
        onConfirm={
          () => setIsFileDeleted(false)
          // afterDeleteImgReload()
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
    </>
  )
}

export default ViewBookQuestionFile
