import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import Swal from 'sweetalert2'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'

function regAlert(msg) {
  const MySwal = withReactContent(Swal)

  Swal.fire({
    // position: 'top-end',
    showConfirmButton: false,
    timer: 700,
    timerProgressBar: true,
    //  html: '',
    title: msg,
    width: '600px',
    height: '600px',
    opacity: 0,
    padding: '3em',
    border: '1px solid #F1C40F',
    borderRadius: '20px',
    color: '#F1C40F',
    background: '#F1C40F',
    // imageUrl: 'https://unsplash.it/400/200',
    // imageWidth: 400,
    // imageHeight: 200,
    // imageAlt: 'Custom image',
    // background: '#fff url(/images/about-img5.jpg)',
    //    backdrop: `
    //   rgba(0,0,123,0.4)
    //   url("/images/animated-icons/bf6.gif")
    //   center top
    //   no-repeat
    // `,
  })
}
const IdiomList = ({
  seriesName,
  storyNum,
  bookNum,
  readingLevel,
  homework_id,
  mbn,
  practiceTempId,
  userName,
  thisSubject,
  bookTitle,
}) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
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

  //この課題で登録されてない単語をチェックして登録する
  function handleWordClick(word) {
    word = word.replace(':', '')
    console.log('insert ' + word + 'into my wordbook')
    var url = DB_CONN_URL + '/insert-memory-word-from-student/'

    //ここでwordをいろんな形で変換？
    // alert(word)
    // alert(homework_id)
    // alert(mbn)
    // alert(practiceTempId)
    // alert(userName)
    // alert(thisSubject)
    // alert(seriesName)
    // alert(readingLevel)
    // alert(bookTitle)
    // alert(bookNum)
    // alert(storyNum)
    const fetchData2 = async () => {
      try {
        const response = await axios.post(url, {
          word: word,
          HWID: homework_id,
          mbn: myMbn,
          practiceTempId: practiceTempId,
          userName: userName,
          thisSubject: thisSubject,
          seriesName: seriesName,
          readingLevel: readingLevel,
          bookTitle: bookTitle,
          bookNum: bookNum,
          storyNum: storyNum,
        })
        var msg = response.data.message
        regAlert(msg)
        // alert('handleWordClick')
        // if(msg =="今回の課題ですでに登録されている単語です。"){

        // }else if (msg == '登録完了!') {
        // }

        wordListView()
        // alert(response.data.message)
      } catch (error) {
        alert('handleWordClick Error')
      }
    }

    fetchData2()

    //alert('Registered Successfully!')
  }

  useEffect(() => {
    wordListView()
  }, [])

  function wordListView() {
    // var url = DB_CONN_URL + '/memory-word-list/' //<- eiken new dbにあるものだけ持ってくる
    //以下はこの課題で生徒が保存した全ての単語リストを持ってくる
    var HWID = homework_id
    var url = DB_CONN_URL + '/memory-word-list-from-only-wordlist/'

    var Url = url + HWID
    // alert(HWID)
    const fetchData3 = async () => {
      // alert('2')
      try {
        // alert('3')
        const response = await axios.get(Url)
        // alert('4')

        if (response.data.length > 0) {
          // alert('1')
          setSelectedWords(response.data)
        }
        // alert('2')
      } catch (error) {
        alert('wordListView Error')
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
          {seriesName}/{readingLevel}/{storyNum}
          <br />
          <span>Voca/Idiom[熟語]&nbsp;[{idiomListCount}]</span>
          <p style={{ fontSize: '10px', fontWeight: '200', color: 'black' }}>
            クリックして下の単語帳に登録
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
                      handleWordClick(val.word)
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
