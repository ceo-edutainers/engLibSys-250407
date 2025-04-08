import React, { useState, useEffect, useContext, useRef, useMemo } from 'react'
import axios from 'axios'
import { QuizContext } from './Contexts'
import {
  myFun_replaceSpecialChar,
  myFun_noDuplicateInArray,
} from '@/components/FunctionComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import GrammarTermView from '@/components/readingSelfcourse/ViewTerms'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
export default function WordListShadowingVideo({
  homework_id,
  mbn,
  // practiceTempId,
  // userName,
  // seriesName,
  // readingLevel,
  // bookTitle,
  // bookNum,
  // storyNum,
  // bookStory,
}) {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const inputRef = useRef()
  const [flashCardView, setFlashCardView] = useState(true)
  const [searchWord, setSearchWord] = useState('')
  const [rndWidth1, setRndWidth1] = useState(400)
  const [rndHeight1, setRndHeight1] = useState(560)
  const [defaultX, setDefaultX] = useState(-420)
  const [defaultY, setDefaultY] = useState(-400)
  const [rndZIndex, setRndZIndex] = useState(3) //-1 後ろ
  const [rndWord, setRndWord] = useState('')
  const [callWord, setCallWord] = useState()
  const [bookStoryInfo, setBookStoryInfo] = useState([])
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
    thisSubject,
    setThisSubject,
    leastRecordCount_ondoku,
    setLeastRecordCount_ondoku,
    leastRecordCount_shadowing,
    setLeastRecordCount_shadowing,
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
    shadowingLevel,
    setShadowingLevel,
    bookTitle,
    setBookTitle,
    storyStartPage,
    setStoryStartPage,
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
    WordValue = WordValue.replace(':', '')
    WordValue = WordValue.replace('?', '')
    WordValue = WordValue.replace('!', '')
    WordValue = WordValue.replace("'", '')

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

  const [viewInsertWord, setViewInsertWord] = useState(true)
  //3個のimageを入れる
  const [img1, setImg1] = useState()
  const [img2, setImg2] = useState()
  const [img3, setImg3] = useState()
  const [wordForm, setWordForm] = useState()
  const [wordMeaning, setWordMeaning] = useState()
  const [selectedWords, setSelectedWords] = useState([])
  const [selectedWordsMeaning, setSelectedWordsMeaning] = useState([])

  // const [bookBlackcatStory, setBookBlackcatStory] = useState()
  const [wordFormList, setWordFormList] = useState([])
  const [yourMeaningJP, setYourMeaningJP] = useState('')
  const [yourMeaningENG, setYourMeaningENG] = useState('')
  const [yourFormJP, setYourFormJP] = useState('')
  const [yourSentence1, setYourSentence1] = useState('')
  const [yourSentence2, setYourSentence2] = useState('')
  const [yourSynonym, setYourSynonym] = useState('')
  const [yourAntonym, setYourAntonym] = useState('')
  const [yourMemo, setYourMemo] = useState('')

  const [modalWord, setModalWord] = useState('')
  const [modalWordAutoid, setModalWordAutoid] = useState('')

  const [orderAbc, setOrderAbc] = useState(false)
  const [shadowingBookStory, setShadowingBookStory] = useState()
  ///////////////////////////////////////
  // Modal 単語登録START///////////////////////////
  let subtitle

  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal(word, autoid) {
    setModalWord(word)
    setModalWordAutoid(autoid)
    setViewInsertWord(false)
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
    setViewInsertWord(true)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      width: '500px',
      right: 'auto',
      bottom: 'auto',
      color: 'white',
      marginRight: '-50%',
      paddingTop: '30px',
      paddingBottom: '30px',
      transform: 'translate(-50%, -50%)',
      border: '10px solid #ececec',
      borderRadius: '20px',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  }
  // Modal END///////////////////////////
  ///////////////////////////////////////

  const [noImg, setNoImg] = useState(
    'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/noimage.png'
  )

  useEffect(() => {
    getWordForm()
  }, [])
  function getWordForm() {
    var url = DB_CONN_URL + '/get-word-form-set/'
    const fetchData = async () => {
      try {
        const response = await axios.get(url)

        setWordFormList(response.data)
        console.log('wordFormList', wordFormList)
      } catch (error) {
        alert('WordFormList Error-J')
      }
    }
    fetchData()
  }

  useEffect(() => {
    wordListView()
  }, [])

  function wordListView() {
    // var url = DB_CONN_URL + '/memory-word-list/' //<- eiken new dbにあるものだけ持ってくる
    //以下はこの課題で生徒が保存した全ての単語リストを持ってくる
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
        alert('wordListView Error-S')
      }
    }
    fetchData3()
  }

  //memory-word-get-info-word-henkan-get-meaning/
  // my word listに登録されている単語の意味を持ってくる
  function getWordMeaningForEachWord(word) {
    var url = DB_CONN_URL + '/memory-word-get-info-word-henkan-get-meaning/'
    var Url = url + word

    const fetchData3 = async () => {
      try {
        const response = await axios.get(Url)

        alert(response.data.length)
        if (response.data.length > 0) {
          setSelectedWordsMeaning(response.data)
        } else {
        }
      } catch (error) {
        alert('wordListView Error-T')
      }
    }

    fetchData3()
  }

  // function getScript() {
  //   var url = DB_CONN_URL + '/get-hw-and-Shadowing-info-split-concat/'
  //   var Url = url + bookTitle + '&' + bookNum + '&' + storyNum

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(Url)
  //       let arr = []
  //       arr = response.data

  //       const sentences = arr.map(({ sentence }) => sentence).join('')

  //       getWordEach(sentences)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-and-Shadowing-movie-script'
        axios
          .post(url, {
            movieNum: movieNum,
            youtubeURL: youtubeURL,
          })
          .then((response) => {
            getWordEach(response.data.script)
          })
      } catch (error) {}
    }
    fetchData()
  }, [])

  useEffect(() => {
    getScript()
  }, [])

  useEffect(() => {
    getWordEach(bookStory)
    getStoryToWordEach(bookStory)
  }, [])
  //Storyのまま見せて、wordがクリックできるようにする。。
  function getStoryToWordEach(script) {
    var parts = []
    parts = script
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

  function getWordEach(script) {
    var parts = []
    parts = myFun_replaceSpecialChar(script, ' ')
    parts = parts.split(' ')

    var noDupData = myFun_noDuplicateInArray(parts) //重複を削除

    setClearBookWord(noDupData)
  }

  //この課題で登録されてない単語をチェックして登録する
  function handleWordClick(word) {
    // alert(word)
    word = word.replace(':', '')
    console.log('insert ' + word + 'into my wordbook')
    var url =
      DB_CONN_URL + '/insert-memory-word-from-student-for-self-shadowing/'

    //ここでwordをいろんな形で変換？

    const fetchData2 = async () => {
      try {
        const response = await axios.post(url, {
          word: word,
          HWID: homework_id,
          mbn: mbn,
          practiceTempId: practiceTempId,
          userName: userName,
          thisSubject: thisSubject,
          seriesName: seriesName,
          shadowingLevel: shadowingLevel,
          // readingLevel: readingLevel,
          bookTitle: bookTitle,
          bookNum: bookNum,
          storyNum: storyNum,
        })
        var msg = response.data.message
        regAlert(msg)

        wordListView()
      } catch (error) {
        alert('handleWordClick Error')
      }
    }

    fetchData2()
  }

  function handleMeaningInsert() {
    var url = DB_CONN_URL + '/change-memory-word-from-student/'

    const fetchData2 = async () => {
      try {
        const response = await axios.post(url, {
          word: modalWord,
          autoid: modalWordAutoid,
          HWID: homework_id,
          yourFormJP: yourFormJP,
          yourSynonym: yourSynonym,
          yourAntonym: yourAntonym,
          yourMeaningJP: yourMeaningJP,
          yourMeaningENG: yourMeaningENG,
          yourSentence1: yourSentence1,
          yourSentence2: yourSentence2,
          yourMemo: yourMemo,
        })

        wordListView()
      } catch (error) {
        alert('handleWordClick Error')
      }
    }

    fetchData2()
    closeModal()
    //alert('Registered Successfully!')
  }

  function handleRegWordDel(autoid) {
    var url = DB_CONN_URL + '/memory-word-del-by-autoid/'
    var Url = url + homework_id + '&' + autoid
    axios.put(Url).then((response) => {
      wordListView()
    })
  }

  const [isLoading4, setLoading4] = useState(false)
  const [isError4, setError4] = useState(false)

  function handleViewWordMeaning(Word) {
    getTalkstationWord(Word)

    rndResize('auto', 'auto', 0, -50, 3, Word) //400px,400px
  }

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
    console.log('WordValue:', WordValue)
    var url = DB_CONN_URL + '/voca-talkstation-by-word/'
    var Url = url + WordValue + '&' + HWID + '&' + practiceTempId + '&' + mbn

    const fetchData4 = async () => {
      setImg1('')
      setImg2('')
      setImg3('')
      setError4(false)
      setLoading4(true)

      try {
        // const response = await axios.get(Url)

        console.log('Message from Server:', response.data.message)
        if (response.data.message == 'no word') {
          console.log(WordValue, '有りません。')

          setRndWord(WordValue) //イメージの上に表示するWord
          setImageVocaInfo(response.data.response)
          setImg1('')
          setImg2('')
          setImg3('')

          // handleWordClick(WordValue)
        } else {
          // handleWordClick(WordValue)
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
            // alert(WordValue + ' 単語完了')
            console.log(WordValue, ' 単語完了')
          } else {
            setImg3('no img')
          }
        }
        handleWordClick(WordValue)
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
    handleWordClick(WordValue)
    setRndWord(imageVocaInfo.word)
  }
  if (isError) return <h1>Error, try again!</h1>
  if (isLoading) return <h1>Loading Question..........................</h1>

  return (
    <>
      <div className="row">
        <div
          className="col-lg-12 col-md-6 mb-2  pl-5"
          style={{
            position: 'fixed',
            top: '50px',
            width: '100%',

            marginTop: 580,

            marginBottom: 0,
            paddingBottom: 0,
            // marginRight: 0,
            marginLeft: 0,
            // paddingRight: 0,
            // paddingLeft: 0,
            zIndex: 1,
            // backgroundColor: 'white',
            textAlign: 'left',
            display: viewInsertWord ? 'block' : 'none',
          }}
        >
          <input
            className="form-control-md ml-3 mr-1"
            style={{
              width: '270px',
              height: '30px',
              backgroundColor: '#FCF3CF',
              border: '1px solid #566573',
              borderRadius: '5px',
            }}
            ref={inputRef}
            type="text"
            value={searchWord}
            placeholder="単語帳に入れたい単語を直接入力"
            onChange={(e) => {
              setSearchWord(e.target.value)
            }}
            // onKeyPress={(e) => {
            //   e.key == 'Enter' && handleWordClick(searchWord)
            // }}
          />
          {/* <a
            style={{ width: '15%', cursor: 'pointer', color: 'white' }}
            className="btn-sm btn-primary mr-2"
            onClick={() => {
              setSearchWord('')
            }}
          >
            CLEAR
          </a> */}
          <a
            style={{ width: '15%', cursor: 'pointer', color: 'white' }}
            className="btn-sm btn-danger"
            onClick={() => {
              handleWordClick(searchWord)
              setSearchWord('')
            }}
          >
            単語追加
          </a>

          {/* <a
          style={{ width: '15%', cursor: 'pointer', color: 'white' }}
          className="btn-sm btn-primary"
          onClick={() => {
            setScriptChecked([]), setCheckedboxClear('checked')
          }}
        >
          RESET
        </a> */}
        </div>
        <div
          className="col-lg-3 col-md-12"
          style={{
            textAlign: 'left',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <span  className="banner-content"> */}
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
            <span>
              本文の単語:&nbsp;{clearBookWord.length}
              &nbsp;個
            </span>
            <p style={{ fontSize: '10px', fontWeight: '200', color: 'black' }}>
              クリックすると右側の単語帳に登録できます。
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
          className="col-lg-9 col-md-12"
          style={{
            textAlign: 'left',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <p
                style={{
                  backgroundColor: '#E1BEE7',
                  color: 'black',
                  marginBottom: 0,
                  marginTop: '10px',
                  padding: 7,
                  fontWeight: '600',
                  textAlign: 'center',
                  border: '1px solid #dedede',
                  borderRadius: '5px',
                }}
              >
                <span>
                  単語帳&nbsp;[保存単語:&nbsp;{selectedWords.length}&nbsp;個]
                </span>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: '200',
                    color: 'black',
                  }}
                >
                  保存された単語は単語Quizに出ます。(6月上旬からサービス開始)
                  <br />
                  複数意味が出てきた場合、全てリストされます。
                </p>
              </p>
            </div>
            <div className="col-lg-4 col-md-12 pt-4">
              <GrammarTermView />
            </div>
          </div>
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
            {/* <span
              onClick={() => {
                setOrderAbc(!orderAbc)
              }}
            >
              abc順
            </span>
            &nbsp;
            <span
              onClick={() => {
                setOrderAbc(orderAbc)
              }}
            >
              登録順
            </span> */}
            {/* {setOrderAbc && selectedWords.filter((val) => val.word)} */}
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
                        // handleRegWordDel(val2.autoid)
                        handleRegWordDel(val2.delid)
                        // handleRegWordDel(val2.word)
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="1x"
                        color="darkorange"
                        className="mr-1"
                      />
                    </span>
                    &nbsp;
                    {/* <button
                      className="btn btn-danger"
                      style={{
                        backgroundColor: '#d9534f',
                        width: '100px',
                        // height: '20px',
                        padding: '4px 0',
                        fontSize: '15px',
                        color: 'white',
                        border: '1px solid #dedede',
                        borderRadius: '5px',
                      }}
                      onClick={() => {
                        openModal(val2.word, val2.autoid)
                        // getTalkstationWord(val2.word)
                      }}
                    >
                      意味登録
                    </button> */}
                    <a
                    // onClick={() => {
                    //   handleViewWordMeaning(val2.word)
                    // }}
                    >
                      {val2.word}
                    </a>
                    &nbsp;
                    <span style={{ fontSize: '14px' }}>
                      &nbsp;[{val2.form}] &nbsp;
                      {/* {val2.meaning_jp1 ? val2.meaning_jp1 : val2.coreMeaning} */}
                      {val2.meaning_jp1 ? val2.meaning_jp1 : val2.coreMeaning}
                      {/* {val2.from30000_Commentary_JP
                        ? val2.from30000_Commentary_JP
                        : val2.meaning_jp1
                        ? val2.meaning_jp1
                        : val2.coreMeaning} */}
                    </span>
                    {/* <span
                      className="btn btn-danger"
                      onClick={() => {
                        getWordMeaningForEachWord(val2.word)
                      }}
                    >
                      意味
                    </span> */}
                    &nbsp;
                    {selectedWordsMeaning &&
                      selectedWordsMeaning.map((val3, key3) => {
                        return (
                          <>
                            {val2.word == val3.word ? (
                              <span style={{ color: 'red', fontSize: '10px' }}>
                                {val3.meaning_jp1
                                  ? val3.meaning_jp1
                                  : val3.coreMeaning}

                                {/* {val3.from30000_Commentary_JP
                                  ? val3.from30000_Commentary_JP
                                  : val3.meaning_jp1
                                  ? val3.meaning_jp1
                                  : val3.coreMeaning} */}
                              </span>
                            ) : (
                              <span style={{ color: 'blue', fontSize: '10px' }}>
                                no-data
                              </span>
                            )}
                          </>
                        )
                      })}
                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <div
                        style={{
                          fontAlign: 'right',
                          width: '100%',
                          paddingLeft: '75%',
                        }}
                      >
                        <button
                          className="btn btn-secondary"
                          style={{
                            width: '100px',
                            cursor: 'pointer',
                            fontSize: '20px',
                            color: 'white',
                            padding: '0px 5px',
                            border: '1px solid #dedede',
                            borderRadius: '5px',
                          }}
                          onClick={closeModal}
                        >
                          close
                        </button>
                      </div>
                      <div className="mb-2">
                        <p style={{ color: 'white' }}>
                          辞書に登録されている単語は以下のフォームに内容が入力されています。本文の意味などと内容が異なる場合や追加で内容を入れたい場合は、自分で修正してください。意味などが空欄になっている場合は、辞書で調べて本文にあう内容を登録してください。
                        </p>
                        <hr style={{ border: '0.01em solid white' }}></hr>
                        <center>
                          <p
                            style={{
                              color: 'white',
                              fontSize: '20px',
                              fontWeight: '400',
                            }}
                            ref={(_subtitle) => (subtitle = _subtitle)}
                          >
                            単語詳細登録&nbsp;
                          </p>
                        </center>
                      </div>
                      {/* {modalWordAutoid} */}
                      <input
                        className="form-control-lg  mr-1"
                        style={{
                          width: '100%',
                          height: '35px',
                          backgroundColor: 'white',
                          border: '1px solid #566573',
                          borderRadius: '5px',
                          paddingLeft: '5px',
                          color: 'black',
                        }}
                        ref={inputRef}
                        type="text"
                        value={modalWord}
                        // value={yourMeaning}
                        onChange={(e) => {
                          setModalWord(e.target.value)
                        }}
                      />
                      <p
                        style={{
                          color: 'yellow',
                          fontSize: '12px',
                          marginBottom: 0,
                        }}
                      >
                        *スペリングの変更も可能です。
                      </p>

                      <select
                        className="form-control-lg mt-2"
                        style={{
                          height: '35px',
                          width: '93%',
                          padding: 0,
                          border: '1px solid #2C3E50',
                          borderRadius: '5px',
                          fontSize: '14px',
                        }}
                        onChange={(e) => {
                          setYourFormJP(e.target.value)
                        }}
                      >
                        <option value="">選択</option>
                        {wordFormList.map((val, key) => {
                          return (
                            <option value={val.form_name_jp}>
                              {val.form_name_jp}&nbsp;&nbsp;[{val.form_name_eng}
                              ]
                            </option>
                          )
                        })}
                      </select>
                      <span
                        style={{
                          color: 'white',
                          fontWeight: '900',
                          backgroundColor: 'red',
                          marginLeft: '10px',
                          padding: '5px',
                          paddingTop: 0,
                          paddingBottom: 0,
                          width: '30px',
                          height: '30px',
                          cursor: 'pointer',
                          border: '1px solid darkred',
                          borderRadius: '3px',
                        }}
                      >
                        ?
                      </span>
                      <input
                        className="form-control-md mt-2 mr-1"
                        style={{
                          width: '100%',
                          height: '35px',
                          backgroundColor: 'white',
                          border: '1px solid #566573',
                          borderRadius: '5px',
                          paddingLeft: '5px',
                        }}
                        // ref={inputRef}
                        type="text"
                        // value={yourMeaning}
                        placeholder="日本語意味入力"
                        onChange={(e) => {
                          setYourMeaningJP(e.target.value)
                        }}
                      />
                      <input
                        className="form-control-md mt-2 mr-1"
                        style={{
                          width: '100%',
                          height: '35px',
                          backgroundColor: 'white',
                          border: '1px solid #566573',
                          borderRadius: '5px',
                          paddingLeft: '5px',
                        }}
                        ref={inputRef}
                        type="text"
                        // value={yourMeaning}
                        placeholder="English Meaning"
                        onChange={(e) => {
                          setYourMeaningENG(e.target.value)
                        }}
                      />
                      <input
                        className="form-control-md mt-2 mr-1"
                        style={{
                          width: '100%',
                          height: '35px',
                          backgroundColor: 'white',
                          border: '1px solid #566573',
                          borderRadius: '5px',
                          paddingLeft: '5px',
                        }}
                        ref={inputRef}
                        type="text"
                        // value={yourMeaning}
                        placeholder="類語 Synonym"
                        onChange={(e) => {
                          setYourSynonym(e.target.value)
                        }}
                      />
                      <input
                        className="form-control-md mt-2 mr-1"
                        style={{
                          width: '100%',
                          height: '35px',
                          backgroundColor: 'white',
                          border: '1px solid #566573',
                          borderRadius: '5px',
                          paddingLeft: '5px',
                        }}
                        ref={inputRef}
                        type="text"
                        // value={yourMeaning}
                        placeholder="反対語 Antonym"
                        onChange={(e) => {
                          setYourAntonym(e.target.value)
                        }}
                      />
                      <textarea
                        className="form-control-md mt-2 mb-0 mr-1"
                        style={{
                          width: '100%',
                          // height: '35px',
                          backgroundColor: 'white',
                          border: '1px solid #566573',
                          borderRadius: '5px',
                          paddingLeft: '5px',
                        }}
                        ref={inputRef}
                        type="text"
                        // value={yourMeaning}
                        placeholder="文章1 Sentence"
                        onChange={(e) => {
                          setYourSentence1(e.target.value)
                        }}
                      />
                      <textarea
                        className="form-control-md mt-0  mr-1"
                        style={{
                          width: '100%',
                          // height: '35px',
                          backgroundColor: 'white',
                          border: '1px solid #566573',
                          borderRadius: '5px',
                          paddingLeft: '5px',
                        }}
                        ref={inputRef}
                        type="text"
                        // value={yourMeaning}
                        placeholder="文章2 Sentence"
                        onChange={(e) => {
                          setYourSentence2(e.target.value)
                        }}
                      ></textarea>

                      <textarea
                        className="form-control-md mt-0 mr-1"
                        style={{
                          width: '100%',
                          // height: '35px',
                          backgroundColor: 'white',
                          border: '1px solid #566573',
                          borderRadius: '5px',
                          paddingLeft: '5px',
                        }}
                        ref={inputRef}
                        type="text"
                        // value={yourMeaning}
                        placeholder="メモ"
                        onChange={(e) => {
                          setYourMemo(e.target.value)
                        }}
                      ></textarea>

                      <center>
                        <a
                          className="btn btn-danger mt-2"
                          style={{
                            backgroundColor: '#d9534f',
                            width: '200px',
                            padding: '4px',
                            cursor: 'pointer',
                            fontSize: '15px',
                            color: 'white',
                            border: '1px solid #dedede',
                            borderRadius: '5px',
                            marginBottom: '10px',
                          }}
                          // className="btn-sm btn-danger"
                          onClick={() => {
                            setModalWordAutoid(val2.autoid)
                            // handleMeaningInsert(modalWord, modalWordAutoid)
                            handleMeaningInsert()
                            // setWordForm('')
                            // setYourMeaningJP('')
                            // setYourMeaningENG('')
                          }}
                        >
                          登録
                        </a>
                      </center>
                    </Modal>
                  </p>
                </>
              )
            })}
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-12 col-md-12 p-4">
          <p>
            以下のスクリプトから知らない単語を選択すると、単語帳に登録できます。
          </p>
        </div>
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
              height: '400px',
            }}
          >
            {getStoryToWordEach(bookStory)}
          </p>
          {/* {bookBlackcatStory} */}
        </div>
      </div>
    </>
  )
}
