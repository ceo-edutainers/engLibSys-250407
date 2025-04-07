import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {
  myFun_replaceSpecialChar,
  myFun_noDuplicateInArray,
} from '@/components/FunctionComponent'
import { spacing } from '@mui/system'

export default function Test() {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [bookData, setBookData] = useState([])
  const [clearBookData, setClearBookData] = useState([]) //必要のない文字は全部消すかSpaceに変える
  const [course, setCourse] = useState('')
  const [courseName, setCourseName] = useState('')
  const [readingTriumphsAutoid, setReadingTriumphsAutoid] = useState('196')

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  useEffect(() => {
    var Url = DB_CONN_URL + '/get-reading-word/' + readingTriumphsAutoid

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)
        setBookData(response.data.response[0])
        getWordEach(response.data.response[0].story)
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  function getWordEach(story) {
    var parts = []
    parts = myFun_replaceSpecialChar(story, ' ')
    parts = parts.split(' ')
    var noDupData = myFun_noDuplicateInArray(parts) //重複を削除

    setClearBookData(noDupData)
  }

  if (isError) return <h1>Error, try again!</h1>
  if (isLoading) return <h1>Loading Question..........................</h1>

  return (
    <>
      {/* <div>{clearBookData}</div> */}
      <div style={{ marginLeft: '50px' }}>
        word_count:{clearBookData.length}
        <br />
        {clearBookData.map((val, key) => {
          return (
            <>
              <span>{val}</span>
              <br />
            </>
          )
        })}
      </div>
    </>
  )
}
