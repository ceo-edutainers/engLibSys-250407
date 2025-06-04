import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import QrcodeGeneratorForEvent from '@/components/readingSelfcourse/QrcodeGeneratorForEvent'

const ViewBookReadingTriumphs = ({
  readingLevel,
  storyNum,
  seriesName,
  bookNum,
}) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [webFileUrl, setWebFileUrl] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [onlineBookStudent, setOnlineBookStudent] = useState(false)
  const modalRef = useRef(null)

  // A4 비율: width : height = 1 : 1.414
  const A4_RATIO = 1.414
  const DEFAULT_WIDTH = 800

  const [modalStyle, setModalStyle] = useState({
    width: DEFAULT_WIDTH, // 기본 너비
    height: DEFAULT_WIDTH * A4_RATIO, // A4 비율 적용한 높이
    top: 100,
    left: 100,
  })

  var mbn = localStorage.getItem('MypageMbn')

  useEffect(() => {
    checkOnlineBookStudent(mbn)
  }, [mbn])

  function checkOnlineBookStudent(mbn) {
    const fetchData = async () => {
      const Url = DB_CONN_URL + '/check-onlinebook-student'
      try {
        const response = await axios.post(Url, {
          mbn: mbn,
          textbookName: 'Reading Triumphs',
        })

        if (response.data && response.data.length > 0) {
          setOnlineBookStudent(true)
        } else {
          setOnlineBookStudent(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  useEffect(() => {
    getBookUrl()
  }, [])

  function getBookUrl() {
    var rL = readingLevel
    var bN = bookNum
    var sN = storyNum

    if (seriesName === 'Reading Triumphs') {
      getRTurl(rL, bN, sN)
    } else if (seriesName === 'Blackcat Series') {
      getBKurl(rL, bN, sN)
    }
  }

  function getRTurl(rL, bN, sN) {
    var Url = `${DB_CONN_URL}/get-rt-autoid-info/${rL}&${bN}&${sN}`

    axios.get(Url).then((response) => {
      if (response.data.length > 0) {
        var webfile =
          'https://www.myenglib.com/myenglib/materials/reading/Reading_Triumphs/' +
          rL +
          '/book/' +
          response.data[0].pdf1
        setWebFileUrl(webfile)
      }
    })
  }

  function getBKurl(rL, bN, sN) {
    var Url = `${DB_CONN_URL}/get-blackcat-autoid-info/${rL}&${bN}&${sN}`

    axios.get(Url).then((response) => {
      if (response.data.length > 0) {
        let folderName =
          rL === 'A1_Starter' || rL === 'A2_Step1' || rL === 'A2_Step2'
            ? 'BCat_GreenApple'
            : 'BCat_RTraining'

        var webfile =
          'https://www.myenglib.com/myenglib/materials/reading/' +
          folderName +
          '/' +
          rL +
          '/book/' +
          response.data[0].pdf1
        setWebFileUrl(webfile)
      }
    })
  }

  // 모달 드래그 기능 추가
  const handleMouseDown = (e) => {
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const startLeft = modalStyle.left
    const startTop = modalStyle.top

    const handleMouseMove = (e) => {
      const newLeft = startLeft + (e.clientX - startX)
      const newTop = startTop + (e.clientY - startY)
      setModalStyle((prev) => ({ ...prev, left: newLeft, top: newTop }))
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // 모달 크기 조절 기능 (A4 비율 유지)
  const handleResizeMouseDown = (e) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = modalStyle.width

    const handleResizeMouseMove = (e) => {
      const newWidth = Math.max(400, startWidth + (e.clientX - startX))
      const newHeight = newWidth * A4_RATIO // A4 비율 유지

      // 최대 높이를 화면 90%로 제한
      const maxHeight = window.innerHeight * 0.9
      if (newHeight > maxHeight) return

      setModalStyle({ ...modalStyle, width: newWidth, height: newHeight })
    }

    const handleResizeMouseUp = () => {
      document.removeEventListener('mousemove', handleResizeMouseMove)
      document.removeEventListener('mouseup', handleResizeMouseUp)
    }

    document.addEventListener('mousemove', handleResizeMouseMove)
    document.addEventListener('mouseup', handleResizeMouseUp)
  }

  return (
    <>
      {onlineBookStudent && webFileUrl && (
        <>
          <div className="mb-2">
            {/* <button
              onClick={() => setIsModalOpen(true)}
              style={{
                width: 'auto',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              オンライン教材を読む
            </button> */}
            <QrcodeGeneratorForEvent
              url={webFileUrl}
              title="別の機械で読む"
              size="100"
            />
          </div>
        </>
      )}

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: modalStyle.top,
            left: modalStyle.left,
            width: modalStyle.width,
            height: modalStyle.height,
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            resize: 'both',
            overflow: 'hidden',
          }}
          ref={modalRef}
        >
          {/* 모달 상단 바 (드래그 가능) */}
          <div
            style={{
              cursor: 'move',
              padding: '10px',
              backgroundColor: '#333',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
            }}
            onMouseDown={handleMouseDown}
          >
            PDF Viewer
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>

          {/* PDF 파일 표시 (A4 비율 적용) */}
          <object
            data={webFileUrl}
            type="application/pdf"
            style={{
              width: '100%',
              height: 'calc(100% - 40px)',
              border: 'none',
              backgroundColor: 'white',
            }}
          />

          {/* 크기 조절 핸들러 */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '20px',
              height: '20px',
              backgroundColor: 'gray',
              cursor: 'nwse-resize',
            }}
            onMouseDown={handleResizeMouseDown}
          ></div>
        </div>
      )}
    </>
  )
}

export default ViewBookReadingTriumphs
