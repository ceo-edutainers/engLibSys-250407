import react, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'
import SweetAlert from 'react-bootstrap-sweetalert'

export default function ViewReadingLevel() {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [viewLevel, setViewLevel] = useState(false)
  const [englibLevelAllInfo, setEnglibLevelAllInfo] = useState([])
  const [englibLevel, setEnglibLevel] = useState('')
  const [isNotReady, setIsNotReady] = useState(false)

  useEffect(() => {
    var url = DB_CONN_URL + '/get-englib-level-info'

    const fetchData1 = async () => {
      try {
        axios.get(url).then((response) => {
          setEnglibLevelAllInfo(response.data.response)
          // alert(response.data.response)
          console.log('englibLevelAllInfo', englibLevelAllInfo)
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData1()
  }, [])

  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    console.log('mbnhere', mbn)
    var subject = 'SELF READING'
    var url = DB_CONN_URL + '/get-sys_member_lesson_set_BtoB_for_mytopGroup/'
    var Url = url + mbn + '&' + subject

    const fetchData2 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert(response.data.response[0].englibLevel)
          setEnglibLevel(response.data.response[0].englibLevel)
          // setEnglibLevelColor(response.data.response[0].level_color)
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }, [englibLevelAllInfo])

  return (
    <>
      <span
        style={{
          backgroundColor: '#F7DC6F',
          width: '400px',
          border: '1px solid #cc99ff',
          borderRadius: '10px',
          margin: '0px',
          padding: '10px',
          fontSize: '20px',
          fontWeight: 'normal',
          color: 'black',
          textAlign: 'center',
        }}
        onClick={() => {
          // setViewLevel(!viewLevel)
          setIsNotReady(true)
        }}
      >
        <FontAwesomeIcon icon={faHandPointer} size="1x" color="black" />
        友達の宿題を
        {viewLevel ? '隠す' : '覗いて見る'}
      </span>

      <span style={{ display: viewLevel ? 'block' : 'none', width: '100%' }}>
        <br />
        <br />
        <p>
          <h5>ただ今機能準備中です。</h5>
        </p>
        {/* {englibLevelAllInfo &&
          englibLevelAllInfo.map((val, key) => {
            return (
              <>
                {val.englib_reading_level == englibLevel ? (
                  <p
                    style={{
                      backgroundColor: val.level_color,
                      marginBottom: 1,
                      color: 'black',
                      fontSize: '12px',
                      padding: '6px',
                      // width: '60%',
                    }}
                    data-balloon-visible
                    aria-label="あなたのリーディングレベル"
                    data-balloon-pos="right"
                    data-balloon-length="medium"
                  >
              
                    {val.englib_reading_level}
                    {val.eiken_level !== ''
                      ? ' | 英検' + val.eiken_level
                      : ' | Starter'}
                  </p>
                ) : (
                  <p
                    style={{
                      backgroundColor: val.level_color,
                      marginBottom: 1,
                      color: 'black',
                      fontSize: '12px',
                      padding: '6px',
                      // width: '60%',
                    }}
                  >
                    {val.englib_reading_level}
                    {val.eiken_level !== ''
                      ? ' | 英検' + val.eiken_level
                      : ' | Starter'}
                  </p>
                )}
              </>
            )
          })} */}
      </span>
      <p style={{ color: '#212F3D', fontSize: '15px', marginTop: 10 }}>
        みんなはどのようにし課題をやってる？気になったら少し覗いてみよう！
      </p>
      <SweetAlert
        title="サービス準備中です。"
        timer={2000}
        show={isNotReady}
        onConfirm={() => setIsNotReady(false)}
        onCancel={() => {
          setIsNotReady(false)
        }}
        confirmBtnText="OK"
        // cancelBtnText="戻る"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>近日中にサービス開始予定です。</p>
      </SweetAlert>
    </>
  )
}
