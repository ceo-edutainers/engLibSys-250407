import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import { Rnd } from 'react-rnd'
import Link from '@/utils/ActiveLink'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'

const RndHomeworkShadowing = ({ homework_id }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [hwInfo, setHwInfo] = useState([])
  const [rndWidth1, setRndWidth1] = useState(300)
  const [rndHeight1, setRndHeight1] = useState(60)
  const [defaultX, setDefaultX] = useState(600)
  const [defaultY, setDefaultY] = useState(0)
  const [rndZIndex, setRndZIndex] = useState(2) //-1 後ろ

  function rndResize(width, height, x, y, zIndex) {
    setRndWidth1(width)
    setRndHeight1(height)
    setDefaultX(x)
    setDefaultY(y)
    setRndZIndex(zIndex)
  }

  //無限ループしない
  const bar2 = {}
  useEffect(() => {
    // console.log('newLesson', newLesson)
    if (localStorage.getItem('T_loginStatus') == 'true') {
      var Url = DB_CONN_URL + '/get-hw-main-course-shadowing/' + homework_id
      // alert(Url)
      const fetchData2 = async () => {
        try {
          axios.get(Url).then((response) => {
            // alert('length' + response.data.length)
            if (response.data.length > 0) {
              // alert(response.data)
              setHwInfo(response.data)
            }
          })
        } catch (error) {
          // alert('error1' + error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }, [])
  return (
    <>
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

        <div className="mt-3 p-4" style={{ overflow: 'scroll' }}>
          {hwInfo.map((val, key) => {
            var imgSrc =
              'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' +
              val.fileName
            return (
              <>
                {' '}
                <p>
                  <img src={imgSrc} />
                </p>
              </>
            )
          })}
        </div>
      </Rnd>
    </>
  )
}

export default RndHomeworkShadowing
