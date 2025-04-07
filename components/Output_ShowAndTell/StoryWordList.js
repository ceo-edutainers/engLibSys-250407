import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'

import {
  myFun_replaceSpecialChar,
  myFun_noDuplicateInArray,
} from '@/components/FunctionComponent'

const StoryWordList = ({
  bookStory,
  seriesName,
  readingLevel,
  storyNum,
  bookNum,
  homework_id,
  mbn,
  tbn,
}) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [clearBookWord, setClearBookWord] = useState([]) //必要のない文字は全部消すかSpaceに変える, Wordのabc準

  // useEffect(() => {
  //   getScript()
  // }, [seriesName != ''])
  // function getScript() {
  //   // if (seriesName == 'Reading Triumphs') {
  //   //   var url = DB_CONN_URL + '/get-reading-story-Reading-Triumphs/'
  //   // } else if (seriesName == 'Blackcat Series') {
  //   //   var url = DB_CONN_URL + '/get-reading-story-Blackcat/'
  //   // } else if (seriesName == 'Blackcat Series') {
  //   //   var url = DB_CONN_URL + '/get-reading-story-ORT/'
  //   // }

  //   var url = DB_CONN_URL + '/get-reading-story-Reading-Triumphs/'
  //   var Url =
  //     url + seriesName + '&' + readingLevel + '&' + bookNum + '&' + storyNum

  //   // console.log('seriesName', seriesName)
  //   // console.log('readingLevel', readingLevel)
  //   // console.log('bookNum', bookNum)
  //   // console.log('storyNum', storyNum)
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(Url)

  //       // getWordEach(response.data.response[0].script)
  //       // alert(response.data.status)
  //       getWordEach(response.data[0].story)
  //       getStoryToWordEach(response.data[0].story)
  //     } catch (error) {
  //       // alert(error)
  //     }
  //   }

  //   fetchData()
  // }

  useEffect(() => {
    getWordEach(bookStory)
    // getStoryToWordEach(bookStory)
  }, [])

  function getWordEach(bookStory) {
    var parts = []
    parts = myFun_replaceSpecialChar(bookStory, ' ')
    parts = parts.split(' ')

    // var noDupData = myFun_noDuplicateInArray(parts) //重複を削除
    var b = parts
      .sort((a, b) => a.localeCompare(b))
      .filter(function (x, i, self) {
        return self.indexOf(x) === i
      })

    setClearBookWord(b)

    //console.log('setClearBookWord', setClearBookWord)
  }

  //Storyのまま見せて、wordがクリックできるようにする。。

  function getStoryToWordEach(bookStory) {
    parts = bookStory
    parts = parts.split(/[\s,]+/)
    const listItems = parts.map((val) => (
      <a
        onClick={() => {
          handleViewWordMeaning(val)
        }}
      >
        {val}&nbsp;
      </a>
    ))
    // console.log('listItems', listItems)
    //本の全てのスクリプト
    return <div>{listItems}</div>
  }
  //この課題で登録されてない単語をチェックして登録する
  function handleWordClick(word) {
    word = word.replace(':', '')
    var url =
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
        const response = await axios.get(url)

        var msg = response.data.message

        regAlert(msg)

        // alert('handleWordClick')
        // if(msg =="今回の課題ですでに登録されている単語です。"){

        // }else if (msg == '登録完了!') {
        // }

        wordListView()
      } catch (error) {
        alert('handleWordClick Error1')
      }
    }

    fetchData2()

    //alert('Registered Successfully!')
  }
  return (
    <>
      <div
        className="col-lg-12 col-md-12"
        style={{
          textAlign: 'left',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            backgroundColor: '#F5B7B1',
            color: 'black',
            marginTop: '10px',
            marginBottom: 0,
            marginLeft: '4px',
            paddingTop: '8px',
            paddingBottom: '7px',
            fontWeight: '600',
            textAlign: 'center',
            border: '1px solid #dedede',
            borderRadius: '5px',
          }}
        >
          <span>Words Of This Story&nbsp;[{clearBookWord.length}]</span>
          <p style={{ fontSize: '10px', fontWeight: '200', color: 'black' }}>
            クリックして下の単語帳に登録
          </p>
        </p>
        <div
          style={{
            marginTop: 15,
            paddingTop: 0,

            backgroundColor: 'lightblue',
            height: '150px',
            width: '100%',
            overflowY: 'auto',
            overflowX: 'auto',
          }}
        >
          {clearBookWord?.map((val, key) => {
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
      </div>
    </>
  )
}

export default StoryWordList
