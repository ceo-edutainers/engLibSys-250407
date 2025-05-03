import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Rnd } from 'react-rnd'
import ReactPanZoom from 'react-image-pan-zoom-rotate'
import EXIF from 'exif-js'

const RndHomeworkShadowing = ({ homework_id }) => {
  const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN
  const [hwInfo, setHwInfo] = useState([])
  const [rotations, setRotations] = useState({}) // { fileName: degree, ... }
  const [rndWidth1, setRndWidth1] = useState(300)
  const [rndHeight1, setRndHeight1] = useState(60)
  const [defaultX, setDefaultX] = useState(600)
  const [defaultY, setDefaultY] = useState(0)
  const [rndZIndex, setRndZIndex] = useState(2) //-1 後ろ

  // 데이터 fetch
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-hw-main-course-shadowing/${homework_id}`
      )
      .then((res) => setHwInfo(res.data))
      .catch(console.error)
  }, [homework_id])

  function rndResize(width, height, x, y, zIndex) {
    setRndWidth1(width)
    setRndHeight1(height)
    setDefaultX(x)
    setDefaultY(y)
    setRndZIndex(zIndex)
  }
  // EXIF から初期回転角度をセット
  useEffect(() => {
    hwInfo.forEach((item) => {
      const img = new Image()
      img.src = `https://${PUBLIC_R2_DOMAIN}/uploadhw/${item.fileName}`
      img.onload = () => {
        EXIF.getData(img, function () {
          const ori = EXIF.getTag(this, 'Orientation')
          const deg = ori === 3 ? 180 : ori === 6 ? 90 : ori === 8 ? 270 : 0
          setRotations((prev) => ({ ...prev, [item.fileName]: deg }))
        })
      }
    })
  }, [hwInfo, PUBLIC_R2_DOMAIN])

  // ボタンで回転角度を 90° 足す関数
  const rotateImage = (fileName) => {
    setRotations((prev) => ({
      ...prev,
      [fileName]: ((prev[fileName] || 0) + 90) % 360,
    }))
  }

  return (
    <div className="mt-3 p-4">
      <Rnd
        default={{
          x: defaultX,
          y: defaultY,
          width: rndWidth1,
          height: rndHeight1,
        }}
        size={{
          width: rndWidth1,
          height: rndHeight1,
        }}
        onResize={(e, direction, ref, delta, position) => {
          setRndWidth1(ref.style.width)
          setRndHeight1(ref.style.height)
        }}
        style={{
          // display: 'flex',
          alignItems: 'top',
          overflow: 'scroll',
          justifyContent: 'left',
          paddingTop: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
          border: 'solid 1px #dedede',
          borderRadius: '10px',
          background: '#C11201',
          border: '1px solid #C11201',
          //overflow: 'auto',
          zIndex: rndZIndex,
        }}
        minWidth={300}
        minHeight={50}
        // bounds="window"
      >
        {' '}
        {/* <b>MultiQ</b> */}
        <a
          className="btn btn-light ml-2 mr-2"
          //width, height, x, y, zIndex
          onClick={() => {
            rndResize(700, 800, 0, -50, 4)
            //alert(rndWidth1)
          }}
        >
          DICTATION H.W
        </a>
        <a
          className="btn btn-light"
          style={{ color: 'red' }}
          onClick={() => {
            rndResize(300, 60, 0, -50, 3)
            //alert(rndWidth1)
          }}
        >
          X
        </a>
        <br />
        <br />
        {hwInfo.map((val) => {
          const src = `https://${PUBLIC_R2_DOMAIN}/uploadhw/${val.fileName}`
          const deg = rotations[val.fileName] || 0

          return (
            <div
              key={val.fileName}
              style={{
                position: 'relative',
                marginBottom: '1rem',
                border: '1px solid #ddd',
                padding: '4px',
              }}
            >
              {/* 回転ボタン */}
              {/* <button
                onClick={() => rotateImage(val.fileName)}
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  zIndex: 10,
                  background: 'rgba(255,255,255,0.8)',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
                title="Rotate 90°"
              >
                ↻
              </button> */}

              {/* ReactPanZoom は image prop で渡す */}
              <ReactPanZoom
                image={src}
                alt={val.fileName}
                style={{
                  width: '100%',
                  transform: `rotate(${deg}deg)`,
                  transformOrigin: 'center center',
                }}
              />
            </div>
          )
        })}
      </Rnd>
    </div>
  )
}

export default RndHomeworkShadowing
