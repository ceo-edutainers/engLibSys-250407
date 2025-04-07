import React, { useContext, useEffect, useState, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'

const App = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [dataInfo, setDataInfo] = useState([])
  const [dataInfoLength, setDataInfoLength] = useState()
  useEffect(() => {
    var Url = DB_CONN_URL + '/check-showandtell-hw-not-set'

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
        {/* <h1>{dataInfoLength}</h1> */}
        {dataInfo?.map((val, key) => {
          return (
            <p>
              <h6>{val.autoid}</h6>
            </p>
          )
        })}
      </div>
    </>
  )
}

export default App
