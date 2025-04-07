import React, { useContext, useEffect, useState, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'

const App = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [dataInfo, setDataInfo] = useState([])
  const [dataInfoLength, setDataInfoLength] = useState()
  useEffect(() => {
    var limitBookCount = '0'
    var Url = DB_CONN_URL + '/check-zaiko-under-two/' + limitBookCount

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setDataInfo(response.data)
        setDataInfoLength(response.data.length)
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
        <h1>{dataInfoLength}</h1>
        {/* {dataInfo &&
          dataInfo.map((val, key) => {
            return (
              <p>
                本の発送準備：
                <h1>{dataInfo.length}</h1>件
              </p>
            )
          })} */}
      </div>
    </>
  )
}

export default App
