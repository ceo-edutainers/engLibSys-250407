import React, { useContext, useEffect, useState, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'

const App = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [sendingInfo, setSendingInfo] = useState([])
  const [sendingInfoLength, setSendingInfoLength] = useState()
  useEffect(() => {
    var Url = DB_CONN_URL + '/check-sending-book-info'

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setSendingInfo(response.data)
        setSendingInfoLength(response.data.length)
        // setAudioDurtaionFromDB(response.data[0].audioDuration)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="col-lg-12 col-md-12">
        <h1>{sendingInfoLength}</h1>
        {/* {sendingInfo &&
          sendingInfo.map((val, key) => {
            return (
              <p>
                本の発送準備：
                <h1>{sendingInfo.length}</h1>件
              </p>
            )
          })} */}
      </div>
    </>
  )
}

export default App
