// ✅ Cloudflare R2 버전 (DB 저장 정상 작동하도록 수정)
import React, { useState, useEffect, useRef } from 'react'
import Link from '@/utils/ActiveLink'
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
  const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN
  const router = useRouter()

  useEffect(() => {
    if (router.isReady && router.query) {
      const { m, hid, sb, pti, cstep, sS, pntKN, fD } = router.query

      setMyMbn(m)
      setHomework_id(hid)
      setThisSubject(sb)
      setPracticeTempId(pti)
      setCurrentStep(cstep)
      setStepStatus(sS)
      setPointKeyNum(pntKN)
      setFileDetail(fD)

      reloadImage(m, sb, hid, cstep)

      const checkExpiredHW = async () => {
        try {
          const url = `${DB_CONN_URL}/check-hw-finished/${m}&${hid}`
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

  const handleUpload = async (file, i) => {
    const ext = file.name.split('.').pop().toLowerCase()
    if (!['jpg', 'jpeg', 'png'].includes(ext)) {
      setIsPermettedFile(true)
      return
    }

    const date = new Date()
    const fileTime = date.getDate() + date.getTime()
    const newfilename = `showandtell_Mindmap_${homework_id}_${fileTime}.${ext}`
    setNewFileName(newfilename)

    try {
      const response = await axios.post(`${DB_CONN_URL}/r2/sign-url`, {
        fileName: `${newfilename}`,
        fileType: file.type,
      })

      const { signedUrl } = response.data.data

      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      })

      await hwHistoryUpdate(
        currentStep,
        stepStatus,
        homework_id,
        pti,
        thisSubject,
        newfilename,
        fileDetail
      )
      await insertPointToDB()

      setIsOpenBackMypage(true)
      setAfterFileSelected(false)
    } catch (err) {
      console.error('Upload failed:', err)
    }
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
        // console.log('TEST-point insert:', response.data.message)
        if (!response.data.status) {
        } else {
        }
      })
  }

  const hwHistoryUpdate = async (
    currentStep,
    stepStatus,
    homework_id,
    pti,
    thisSubject,
    newfilename,
    fileDetail
  ) => {
    try {
      const response = await axios.post(
        `${DB_CONN_URL}/update-sys-hw-history-uploadFile`,
        {
          mbn,
          homework_id,
          practiceTempId: pti,
          currentStep,
          stepStatus,
          thisSubject,
          newfilename,
          fileDetail,
        }
      )

      if (response.data.status) {
        console.log('✅ DB insert success:', response.data.message)
        reloadImage(mbn, thisSubject, homework_id, currentStep)
      } else {
        console.warn('⚠️ DB insert failed:', response.data.message)
      }
    } catch (error) {
      console.error('❌ Failed to update homework history:', error)
    }
  }

  const reloadImage = (mbn, thisSubject, homework_id, currentStep) => {
    const url = `${DB_CONN_URL}/get-mindmap-sys-hw-history/${mbn}&${thisSubject}&${homework_id}&${currentStep}`
    axios.get(url).then((response) => {
      const filemindmapArray =
        response.data.response
          ?.map(
            (item) =>
              item?.fileName && {
                fileName: item.fileName,
                autoid: item.autoid,
                homework_id: item.homework_id,
              }
          )
          .filter(Boolean) || []
      setFileMindmap(filemindmapArray)
      setFileLength(filemindmapArray.length)
    })
  }

  const handleClick = (e) => {
    e.preventDefault()
    let files = fileInput.current.files
    for (let i = 0; i < files.length; i++) handleUpload(files[i], i)
  }

  const deleteFileInfo = (id, homework_id, pointStep) => {
    const url = `${DB_CONN_URL}/upload-reading-file-delete/${id}&${homework_id}&${pointStep}`
    axios.get(url)
    setIsFileDeleted(true)
    reloadImage(mbn, thisSubject, homework_id, currentStep)
  }

  const closeWindow = () => {
    window.open('about:blank', '_self')
    window.close()
  }

  return (
    <div>
      <form className="upload-steps pt-5 pl-2 pr-2" onSubmit={handleClick}>
        <input
          type="file"
          ref={fileInput}
          accept=".jpg,.jpeg,.png"
          multiple
          onChange={() => setAfterFileSelected(true)}
        />
        <button type="submit">UPLOAD</button>
      </form>
      <div className="upload-steps pt-2 pl-2 pr-2">
        {fileMindmap.map((val, key) => {
          const uploadfile = `https://${PUBLIC_R2_DOMAIN}/uploadhw/${val.fileName}`
          return (
            <div key={key}>
              <img src={uploadfile} style={{ width: '300px' }} />
              <button
                onClick={() =>
                  deleteFileInfo(val.autoid, val.homework_id, currentStep)
                }
              >
                Delete
              </button>
            </div>
          )
        })}
      </div>
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
  )
}

export default App
