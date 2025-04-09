import React, { useState, useEffect, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { myFun_addZero } from '../FunctionComponent'
import withReactContent from 'sweetalert2-react-content'

function App() {
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

  useEffect(() => {
    if (router.isReady) {
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
    }
  }, [router.isReady])

  const [pti, setPti] = useState()

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

  // Presigned URL을 사용해 파일 업로드
  const handleClick = (event) => {
    event.preventDefault()
    let newArr = fileInput.current.files
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i], i)
    }
  }

  const handleUpload = (file, i) => {
    var parts = file.name.split('.')
    var ext = parts[1]

    // 확장자 검사
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

    // R2 Presigned URL 요청
    const fetchPresignedURL = async () => {
      const response = await axios.post(`${DB_CONN_URL}/r2/sign-url`, {
        fileName: newfilename,
        fileType: file.type,
      })

      const { signedUrl, key } = response.data.data

      // Presigned URL로 파일 업로드
      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      })

      // 파일 업로드 후 DB 업데이트
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
    }

    fetchPresignedURL()
  }

  // sys_hw_history 업로드 파일 정보 업데이트
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
        `${url}${mbn}&${homework_id}&${pti}&${currentStep}&${stepStatus}&${thisSubject}&${newFileName}&${fileDetail}`
      )
      .then((response) => {
        localStorage.setItem('rediriectPageView', 'finished')
        reloadImage()
      })
  }

  // DB에 점수 추가
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
          //alert(response.data.message)
        }
      })
  }

  // 업로드된 파일 목록을 업데이트
  const reloadImage = () => {
    const fetchData2 = async () => {
      try {
        var url = `${DB_CONN_URL}/get-upload-file-sys-hw-history/`
        var Url = `${url}${mbn}&${thisSubject}&${homework_id}&${fileDetail}`
        const response = await axios.get(Url)
        if (!response.data.length) {
          setIsFileAru(false)
        } else {
          setIsFileAru(true)
          setFileBookQuestion(response.data.response)
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
      {/* 기존 내용 유지 */}
      {/* 파일 업로드 버튼 및 관련 UI */}
      <form className="upload-steps" onSubmit={handleClick}>
        <input type="file" ref={fileInput} accept=".jpg, .jpeg, .png" />
        <button>파일 업로드</button>
      </form>
      {/* 기타 UI 구성 요소들 */}
      <CopyrightFooter />
    </>
  )
}

export default App
