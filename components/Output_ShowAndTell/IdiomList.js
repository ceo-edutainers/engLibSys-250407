import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'

import { myFun_getYoutubeID } from '@/components/FunctionComponent'

const IdiomList = ({ seriesName, storyNum, bookNum, readingLevel }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [idiomList, setIdiomList] = useState([])
  const [idiomListCount, setIdiomListCount] = useState()

  useEffect(() => {
    idiomListView()
  }, [])

  const idiomListView = () => {
    // alert('seriesName' + seriesName)
    // alert('readingLevel' + readingLevel)
    // alert('storyNum' + storyNum)

    var url = DB_CONN_URL + '/idiom-voca-list/'
    var Url = url + seriesName + '&' + readingLevel + '&' + storyNum
    // alert(Url)
    const fetchData3 = async () => {
      try {
        const response = await axios.get(Url)
        // alert(response.data.message)
        // alert(response.data.response.length)
        // alert(response.data.seriesName)
        // alert(response.data.readingLevel)
        // alert(response.data.storyNum)
        if (response.data.response.length > 0) {
          setIdiomList(response.data.response)
          setIdiomListCount(response.data.response.length)
        }
      } catch (error) {
        // alert('idiomListView Error')
        console.log('idiomListView Error')
      }
    }
    fetchData3()
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
          {/* {seriesName}/{readingLevel}/{storyNum} */}
          {/* <br /> */}
          <span>Vocab/Idioms&nbsp;[{idiomListCount}]</span>
          <p style={{ fontSize: '10px', fontWeight: '200', color: 'black' }}>
            CLICK TO ADD WORDS BELOW
          </p>
        </p>
        <div
          style={{
            marginTop: 15,
            paddingTop: 0,

            backgroundColor: 'lightblue',
            height: '300px',
            width: '100%',
            overflowY: 'auto',
            overflowX: 'auto',
          }}
        >
          {idiomList &&
            idiomList.map((val, key) => {
              // if (val * 0 == 0) {
              //   //数字はリストから見せない
              // } else if (val.length < 2) {
              //   //1文字はリストから見せない
              // } else {
              return (
                <>
                  <p
                    style={{
                      fontSize: '15px',
                      paddingBottom: '1px',
                      paddingLeft: '5px',
                      marginBottom: '1px',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      color: 'black',
                    }}
                    onClick={() => {
                      // handleWordClick(val)
                    }}
                  >
                    <strong>[{key + 1}]</strong>&nbsp;
                    <span
                      style={{
                        fontSize: '18px',
                        color: 'red',
                        fontWeight: 'bold',
                      }}
                    >
                      {val.word}
                    </span>{' '}
                    &nbsp;
                    {val.meaning_kids == ''
                      ? val.meaning_adult
                      : val.meaning_kids}
                  </p>
                </>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default IdiomList
