import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { QuizContext } from '@/components/readingSelfcourse/Contexts'
// import TextToSpeech from '@/components/TextToSpeech/TextToSpeech'
import {
  myFun_replaceSpecialChar,
  myFun_noDuplicateInArray,
} from '@/components/FunctionComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { Rnd } from 'react-rnd'
import { NavigateBeforeSharp } from '@material-ui/icons'
// import { config } from 'server/config/db' //これで tlsエラーになったから削除すること

export default function WordListReadingBook({
  youtubeID,
  homework_id,
  mbn,
  tbn,
}) {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [rndWidth1, setRndWidth1] = useState(250)
  const [rndHeight1, setRndHeight1] = useState(750)
  const [defaultX, setDefaultX] = useState(-400)
  const [defaultY, setDefaultY] = useState(-50)
  const [rndZIndex, setRndZIndex] = useState(3) //-1 後ろ
  const [rndWord, setRndWord] = useState('')
  const [callWord, setCallWord] = useState()
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    bookCoverImgUrl,
    setBookCoverImgUrl,
    bookImgUrl,
    setBookImgUrl,
    bookAudioUrl,
    setBookAudioUrl,
    seriesName,
    setSeriesName,
    bookStory,
    setBookStory,
    readingLevel,
    setReadingLevel,
    bookTitle,
    setBookTitle,
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
    storyTitle,
    setStoryTitle,
    practiceTempId,
    setPracticeTempId,
    audioOnOff,
    setAudioOnOff,
    course,
    setCourse,
    courseName,
    setCourseName,
    pageView,
    setPageView,
    courseLevel,
    setCourseLevel,
    textbook,
    setTextbook,
    eikenLevel,
    setEikenLevel,
    userName,
    setUserName,
    point,
    setPoint,
    totalQuestion,
    setTotalQuestion,
  } = useContext(QuizContext)

  function rndResize(width, height, x, y, zIndex, word) {
    setRndWidth1(width)
    setRndHeight1(height)
    setDefaultX(x)
    setDefaultY(y)
    setRndZIndex(zIndex)
    var WordValue = word
    WordValue = WordValue.replace('.', '')
    WordValue = WordValue.replace('?', '')
    WordValue = WordValue.replace('!', '')
    WordValue = WordValue.replace('"', '')
    WordValue = WordValue.replace('“', '')
    WordValue = WordValue.replace('”', '')
    WordValue = WordValue.replace('(', '')
    WordValue = WordValue.replace(')', '')
    WordValue = WordValue.toLowerCase()
    // setRndWord(WordValue)
  }

  const [imageVocaInfo, setImageVocaInfo] = useState([])

  // const [tedData, setTedData] = useState([])
  // const [clearTedData, setClearTedData] = useState([]) //必要のない文字は全部消すかSpaceに変える
  const [clearBookWord, setClearBookWord] = useState([]) //必要のない文字は全部消すかSpaceに変える, Wordのabc準
  // const [clearBookStoryWord, setClearBookStoryWord] = useState()
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  //3個のimageを入れる
  const [img1, setImg1] = useState()
  const [img2, setImg2] = useState()
  const [img3, setImg3] = useState()
  const [wordForm, setWordForm] = useState()
  const [wordMeaning, setWordMeaning] = useState()

  const [noImg, setNoImg] = useState(
    'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/noimage.png'
  )

  useEffect(() => {
    getWordEach(bookStory)
    getStoryToWordEach(bookStory)
  }, [])

  function getWordEach(script) {
    var parts = []
    parts = myFun_replaceSpecialChar(script, ' ')
    parts = parts.split(' ')
    var noDupData = myFun_noDuplicateInArray(parts) //重複を削除

    setClearBookWord(noDupData)
    console.log('setClearBookWord', setClearBookWord)
  }

  //Storyのまま見せて、wordがクリックできるようにする。。
  function getStoryToWordEach(script) {
    var parts = []
    //var conLower = script.toLowerCase()
    parts = script
    //parts = script.replace(/[\W_]/g, ' ')
    // parts = script.replace(/[\s,]+/)
    // parts = script.replace('   ', ' ')
    // parts = parts.replace('(', '')
    // parts = parts.replace(')', '')
    // parts = parts.replace('  ', ' ')
    // parts = parts.replace('.', '.<br/>')
    // parts = parts.replace('"', '" ')
    // parts = parts.replace('“', '“ ')
    // parts = parts.replace('”', '” ')
    // parts = parts.replace(',', ', ')

    // parts = parts.split(/[\s,]+/)

    const listItems = parts.map((val) => (
      <a
        onClick={() => {
          handleViewWordMeaning(val)
        }}
      >
        {val}&nbsp;
      </a>
    ))
    //console.log('listItems', listItems)
    return <div>{listItems}</div>
  }

  function wordFormTranslation(wordForm) {
    var wordForm = wordForm
    var wordFormJp = ''

    if (wordForm == 'adjective') {
      wordFormJp = '形容詞'
    } else if (wordForm == 'adverb') {
      wordFormJp = '副詞'
    } else if (wordForm == 'article') {
      wordFormJp = '冠詞'
    } else if (wordForm == 'auxiliary verb') {
      wordFormJp = '助動詞'
    } else if (wordForm == 'collocation') {
      wordFormJp = '連語'
    } else if (wordForm == 'conjunction') {
      wordFormJp = '接続詞'
    } else if (wordForm == 'idiom') {
      wordFormJp = '熟語'
    } else if (wordForm == 'interjection') {
      wordFormJp = '間投詞'
    } else if (wordForm == 'interrogative') {
      wordFormJp = '疑問詞'
    } else if (wordForm == 'noun') {
      wordFormJp = '名詞'
    } else if (wordForm == 'noun/adjective') {
      wordFormJp = '名詞/形容詞'
    } else if (wordForm == 'preposition') {
      wordFormJp = '前置詞'
    } else if (wordForm == 'pronoun') {
      wordFormJp = '代名詞'
    } else if (wordForm == 'relative') {
      wordFormJp = '関係詞'
    } else if (wordForm == 'superlative') {
      wordFormJp = '最上級'
    } else if (wordForm == 'verb') {
      wordFormJp = '動詞'
    } else if (wordForm == 'abbreviation') {
      wordFormJp = '省略形'
    }
    return wordFormJp
  }

  const [isLoading2, setLoading2] = useState(false)
  const [isError2, setError2] = useState(false)
  function handleWordClick(word) {
    //db-table: sys_memory_word
    // alert(tbn)
    var url = DB_CONN_URL + '/insert-memory-word-from-student/'
    var Url = url + word + '&' + HWID + '&' + myMbn

    const fetchData2 = async () => {
      setError2(false)
      setLoading2(true)

      try {
        const response = await axios.get(Url)
      } catch (error) {
        alert('handleWordClick Error')
        setError2(true)
      }
      setLoading2(false)
    }
    wordListView()
    fetchData2()

    //alert('Registered Successfully!')
  }

  const [selectedWords, setSelectedWords] = useState([])
  const [isLoading3, setLoading3] = useState(false)
  const [isError3, setError3] = useState(false)

  useEffect(() => {
    wordListView()
  }, [selectedWords])

  function wordListView() {
    var homework_id = HWID
    var url = DB_CONN_URL + '/memory-word-list/'
    var Url = url + homework_id
    const fetchData3 = async () => {
      setError3(false)
      setLoading3(true)

      try {
        const response = await axios.get(Url)
        //alert('2')
        //alert(response.data.response)
        setSelectedWords(response.data.response)
      } catch (error) {
        alert('wordListView Error')
        setError3(true)
      }
      setLoading3(false)
    }
    fetchData3()
  }

  function handleRegWordDel(word) {
    var homework_id = HWID
    var url = DB_CONN_URL + '/memory-word-del/'
    var Url = url + homework_id + '&' + word
    axios.put(Url).then((response) => {
      //errorの場合

      wordListView()
    })
  }

  const [isLoading4, setLoading4] = useState(false)
  const [isError4, setError4] = useState(false)

  function handleViewWordMeaning(Word) {
    // alert('test')
    // setCallWord(WordValue)
    getTalkstationWord(Word)

    rndResize('auto', 'auto', 0, -50, 3, Word) //400px,400px
  }
  // useEffect(() => {
  //   getTalkstationWord(callWord)
  // }, [callWord])

  function getTalkstationWord(Word) {
    var WordValue = Word
    WordValue = WordValue.toLowerCase()
    WordValue = WordValue.replace('.', '')
    WordValue = WordValue.replace('?', '')
    WordValue = WordValue.replace('!', '')
    WordValue = WordValue.replace('"', '')
    WordValue = WordValue.replace('“', '')
    WordValue = WordValue.replace('”', '')
    WordValue = WordValue.replace('(', '')
    WordValue = WordValue.replace(')', '')
    setImg1('')
    setImg2('')
    setImg3('')
    var url = DB_CONN_URL + '/voca-talkstation-by-word/'
    var Url = url + WordValue

    const fetchData4 = async () => {
      setImg1('')
      setImg2('')
      setImg3('')
      setError4(false)
      setLoading4(true)

      try {
        const response = await axios.get(Url)
        //alert(response.data.response[0])
        alert(response.data.message)
        if (response.data.message == 'no word') {
          //探すwordがない場合setImageVocaInfo는 설ㅓㅇ
          setRndWord(WordValue) //イメージの上に表示するWord
          setImageVocaInfo(response.data.response)
          setImg1('')
          setImg2('')
          setImg3('')
        } else {
          handleWordClick(WordValue)
          setImageVocaInfo(response.data.response)
          setRndWord(response.data.response[0].word)
          setWordForm(response.data.response[0].form)
          if (response.data.response[0].coreMeaning == '') {
            setWordMeaning(response.data.response[0].meaning_jp1)
          } else {
            setWordMeaning(response.data.response[0].coreMeaning)
          }
          if (response.data.response[0].img_ex1 != '') {
            setImg1(
              'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/' +
                response.data.response[0].img_ex1
            )
          } else {
            setImg1('no img')
          }
          if (response.data.response[0].img_ex2 != '') {
            setImg2(
              'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/' +
                response.data.response[0].img_ex2
            )
          } else {
            setImg2('no img')
          }
          if (response.data.response[0].img_ex3 != '') {
            setImg3(
              'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/' +
                response.data.response[0].img_ex3
            )
          } else {
            setImg3('no img')
          }
        }
      } catch (error) {
        //探す単語がなくて、DBから戻ってきてない場合
        //alert('getTalkstationWord Error')
        setRndWord(WordValue) //イメージの上に表示するWord
        setImageVocaInfo([])
        setError4(true)
      }

      setLoading4(false)
    }

    fetchData4()
    setRndWord(imageVocaInfo.word)
  }

  if (isError) return <h1>Error, try again!</h1>
  if (isLoading) return <h1>Loading Question..........................</h1>

  return (
    <>
      {/* <div>
        <Rnd
          default={{
            x: defaultX,
            y: defaultY,
            width: rndWidth1,
            height: rndHeight1,
          }}
          style={{
            justifyContent: 'left',
            paddingTop: '10px',
            paddingLeft: '10px',
            paddingRight: '10px',
            textAlign: 'center',

            background: 'white',
            border: '10px solid #ececec',
            borderRadius: '20px',
            overflow: 'auto',
            zIndex: rndZIndex,
          }}
          minWidth={300}
          minHeight={350}
        >
          <span
            style={{
              fontSize: '30px',
              fontWeight: '900',
              textAlign: 'center',
              color: 'black',
            }}
            className="ml-2 mr-2"
            onClick={() => {
              rndResize('auto', 'auto', -200, 100, 3, rndWord) //400px,800px
            }}
          >
            {rndWord}
          </span>
          <a
            className="btn btn-light mb-2"
            style={{ color: 'red' }}
            onClick={() => {
              rndResize('0px', '0px', 0, 100, -1, rndWord)
            }}
          >
            X
          </a>
          <p>
            <b>
              [{wordForm}/{wordFormTranslation(wordForm)}]
            </b>
            <br />
            {wordMeaning}
          </p>
          <hr />

          {imageVocaInfo != '' ? (
            imageVocaInfo.map((val, key) => {
              return (
                <div style={{ textAlign: 'center' }}>
                  {key == 0 &&
                    (img1 == '' || img1 == 'no img' ? (
                      <></>
                    ) : (
                      <img
                        src={img1}
                        style={{ width: '200px', height: 'auto' }}
                      />
                    ))}

                  {key == 1 &&
                    (img2 == '' || img2 == 'no img' ? (
                      <></>
                    ) : (
                      <img
                        src={img2}
                        style={{ width: '200px', height: 'auto' }}
                      />
                    ))}

                  {key == 2 &&
                    (img3 == '' || img3 == 'no img' ? (
                      <></>
                    ) : (
                      <img
                        src={img3}
                        style={{ width: '200px', height: 'auto' }}
                      />
                    ))}

                  <p
                    style={{
                      fontSize: '18px',
                      color: 'red',
                      paddingBottom: 0,
                      marginBottom: 0,
                      marginLeft: '5px',
                    }}
                  >
                    &nbsp;
                    {key == 0 && val.ex1}
                    {key == 1 && val.ex2}
                    {key == 2 && val.ex3}
                  </p>

                  <hr />
                </div>
              )
            })
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p>辞書に登録されてない単語です。</p>
              <p>名前の可能性もあります。</p>
              <button className="btn btn-danger" style={{ width: '200px' }}>
                単語登録をお願いする
              </button>
            </div>
          )}
        </Rnd>
      </div> */}

      <div className="row">
        <div
          className="col-lg-6 col-md-12"
          style={{
            textAlign: 'left',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <span  className="banner-content"> */}
          <p
            style={{
              backgroundColor: 'lightblue',
              color: 'black',
              marginBottom: 0,
              padding: 7,
              fontWeight: '600',
            }}
          >
            &nbsp;
            <span>
              このストーリに出る全ての単語:&nbsp;{clearBookWord.length}
              &nbsp;個
            </span>
          </p>
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
            {clearBookWord.map((val, key) => {
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
        <div
          className="col-lg-6 col-md-12"
          style={{
            textAlign: 'left',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              backgroundColor: 'darkorange',
              color: 'black',
              marginBottom: 0,
              padding: 7,
              fontWeight: '600',
            }}
          >
            &nbsp;
            <span>
              保存された知らない単語:&nbsp;{selectedWords.length}&nbsp;個
            </span>
          </p>
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
            {selectedWords.map((val2, key2) => {
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
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="1x"
                        color="darkorange"
                        className="mr-1"
                      />
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
        </div>
      </div>
      <div className="row mt-5">
        <div
          className="col-lg-12 col-md-12"
          style={{
            overflowWrap: 'break-word',
            wordWrap: 'break-word',

            textAlign: 'left',
          }}
        >
          <p
            style={{
              fontWeight: '600',
              fontSize: '20px',
              color: 'green',
              cursor: 'pointer',
              overflowWrap: 'break-word',
              wordWrap: 'break-word',
              whiteSpace: 'pre-line',
              borderRadius: '8px',
              border: '1px solid black',
              padding: '15px',
              overflow: 'scroll',
              height: '500px',
            }}
          >
            {getStoryToWordEach(bookStory)}
          </p>
        </div>
      </div>
    </>
  )
}
