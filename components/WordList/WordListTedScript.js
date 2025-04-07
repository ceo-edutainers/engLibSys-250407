import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {
  myFun_replaceSpecialChar,
  myFun_noDuplicateInArray,
} from '@/components/FunctionComponent'

import { Rnd } from 'react-rnd'
import ImageVocaPopup from './ImageVocaPopup'

export default function WordListTedScript({
  youtubeID,
  homework_id,
  mbn,
  tbn,
}) {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [rndWidth1, setRndWidth1] = useState(400)
  const [rndHeight1, setRndHeight1] = useState(500)
  const [defaultX, setDefaultX] = useState(-400)
  const [defaultY, setDefaultY] = useState(-50)
  const [rndZIndex, setRndZIndex] = useState(3) //-1 後ろ
  const [rndWord, setRndWord] = useState('')

  function rndResize(width, height, x, y, zIndex, word) {
    setRndWidth1(width)
    setRndHeight1(height)
    setDefaultX(x)
    setDefaultY(y)
    setRndZIndex(zIndex)
    setRndWord(word)
  }

  const [imageVocaInfo, setImageVocaInfo] = useState([])

  const [tedData, setTedData] = useState([])
  const [clearTedData, setClearTedData] = useState([]) //必要のない文字は全部消すかSpaceに変える

  function handleWordClick(word) {
    //db-table: sys_memory_word
    // console.log('$$$word', word)
    // console.log('$$$homework_id', homework_id)
    // console.log('$$$mbn', mbn)
    // console.log('$$tbn', tbn)
    var Url =
      DB_CONN_URL +
      '/insert-memory-word-from-teacher/' +
      word +
      '&' +
      homework_id +
      '&' +
      mbn +
      '&' +
      tbn

    const fetchData2 = async () => {
      try {
        const response = await axios.get(Url)
      } catch (error) {
        alert('handleWordClick Error')
      }
    }
    wordListView()
    fetchData2()

    //alert('Registered Successfully!')
  }

  const [selectedWords, setSelectedWords] = useState([])

  useEffect(() => {
    wordListView()
  }, [selectedWords])

  function wordListView() {
    var HWID = homework_id
    // alert('homework_id' + homework_id)
    // alert('HWID' + HWID)
    var Url2 = DB_CONN_URL + '/memory-word-list/' + HWID
    const fetchData3 = async () => {
      // alert('1')
      try {
        const response = await axios.get(Url2)
        // alert('response.data.response' + response.data.response)
        // alert('length' + response.data.length)
        if (response.data.length > 0) {
          setSelectedWords(response.data)
        } else {
        }
      } catch (error) {
        alert('wordListView Error1')
      }
    }
    fetchData3()
  }

  function handleRegWordDel(word) {
    var Url =
      DB_CONN_URL + '/memory-word-del-by-word/' + homework_id + '&' + word
    axios.put(Url).then((response) => {
      //errorの場合

      wordListView()
    })
  }

  function handleViewWordMeaning(WordValue) {
    getTalkstationWord(WordValue)
    rndResize('400px', '400px', 0, -50, 3, WordValue)
  }

  const [isLoading4, setLoading4] = useState(false)
  const [isError4, setError4] = useState(false)

  function getTalkstationWord(WordValue) {
    var UrlTalk = DB_CONN_URL + '/voca-talkstation-by-word/' + WordValue
    //alert(UrlTalk)
    //alert(WordValue)
    const fetchData4 = async () => {
      setError4(false)
      setLoading4(true)

      try {
        const response = await axios.get(UrlTalk)
        //alert(response.data.response[0])
        setImageVocaInfo(response.data.response)
      } catch (error) {
        alert('getTalkstationWord Error')
        setError4(true)
      }
      setLoading4(false)
    }
    fetchData4()
  }
  function getWordEach(script) {
    var parts = []
    parts = myFun_replaceSpecialChar(script, ' ')
    parts = parts.split(' ')
    var noDupData = myFun_noDuplicateInArray(parts) //重複を削除

    setClearTedData(noDupData)
  }
  //無限ループしない
  const bar = {}
  const bar3 = {}

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  useEffect(() => {
    getTedWord(youtubeID)
  }, [])

  function getTedWord(youtubeID) {
    // alert(youtubeID)
    var Url = DB_CONN_URL + '/get-ted-word/' + youtubeID

    const fetchData = async () => {
      setError(false)
      setLoading(true)
      try {
        const response = await axios.get(Url)
        console.log('youtubeID:', youtubeID)
        console.log(
          'response.data.response[0].script',
          response.data.response[0].script
        )
        console.log('response.data.response[0]', response.data.response[0])
        if (response.data.response.length > 0) {
          setTedData(response.data.response[0])
          getWordEach(response.data.response[0].script)
        }
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }

  return (
    <>
      {/* <ImageVocaPopup /> */}
      <div
        style={{
          marginTop: 0,
          paddingTop: 0,
          backgroundColor: 'lightblue',
          height: '170px',
          width: '100%',
          overflowY: 'auto',
          overflowX: 'auto',
        }}
      >
        {/* word_count:{clearTedData.length} */}
        <p
          style={{
            backgroundColor: 'lightblue',
            color: 'black',
            marginBottom: 0,
          }}
        >
          &nbsp;<span>Total Vocab:{clearTedData.length}</span>
        </p>
        {clearTedData.map((val, key) => {
          if (val * 0 == 0) {
            //数字はリストから見せない
          } else if (val.length < 2) {
            //1文字はリストから見せない
          } else {
            return (
              <p
                style={{
                  fontSize: '18px',
                  paddingBottom: '1px',
                  paddingLeft: '5px',
                  marginBottom: '1px',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                }}
                onClick={() => {
                  handleWordClick(val)
                }}
              >
                {val}
              </p>
            )
          }
        })}
      </div>
      <div
        style={{
          marginTop: 15,
          paddingTop: 0,
          backgroundColor: 'lightblue',
          height: '170px',
          width: '100%',
          overflowY: 'auto',
          overflowX: 'auto',
        }}
      >
        <p
          style={{
            backgroundColor: 'lightpink',
            color: 'black',
            marginBottom: 0,
          }}
        >
          &nbsp;
          <span>Registered:{selectedWords ? selectedWords.length : 0}</span>
        </p>
        {selectedWords &&
          selectedWords.map((val2, key2) => {
            return (
              <>
                <p
                  style={{
                    fontSize: '18px',
                    paddingBottom: '1px',
                    paddingLeft: '5px',
                    marginBottom: '1px',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                  }}
                >
                  <span
                    style={{ color: 'red', fontWeight: '900' }}
                    onClick={() => {
                      handleRegWordDel(val2.word)
                    }}
                  >
                    X
                  </span>
                  {/* <span style={{ color: 'red', fontWeight: '900' }}>V</span> */}
                  &nbsp;
                  <a
                    onClick={() => {
                      handleViewWordMeaning(val2.word)
                    }}
                  >
                    {val2.word}
                  </a>
                </p>
              </>
            )
          })}
      </div>
    </>
  )
}
