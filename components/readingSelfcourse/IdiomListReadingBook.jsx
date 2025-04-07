import React, { useState, useEffect, useContext, useRef } from 'react'
import axios from 'axios'
// import TextToSpeech from '@/components/TextToSpeech/TextToSpeech'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import GrammarTermView from '@/components/readingSelfcourse/ViewTerms'
import { Rnd } from 'react-rnd'
import { NavigateBeforeSharp } from '@material-ui/icons'
import { borderRadius } from '@mui/system'
// import FlashcardApp from '@/components/readingSelfcourse/FlashcardApp'
// import { config } from 'server/config/db' //これで tlsエラーになったから削除すること

import withReactContent from 'sweetalert2-react-content'
import IdiomListForStudent from '../Output_ShowAndTell/IdiomListForStudent'
import StoryWordList from '../Output_ShowAndTell/StoryWordList'
import DifficultWordsForStudent from '../Output_ShowAndTell/DifficultWordsForStudent'
import Swal from 'sweetalert2'
export default function WordListReadingBookAForTutor({
  homework_id,
  mbn,
  tbn,
  practiceTempId,
  userName,
  seriesName,
  readingLevel,
  thisSubject,
  bookTitle,
  bookNum,
  storyNum,
  bookStory,
}) {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const inputRef = useRef()
  const [flashCardView, setFlashCardView] = useState(true)
  const [clearBookWord, setClearBookWord] = useState([]) //必要のない文字は全部消すかSpaceに変える, Wordのabc準

  const [viewInsertWord, setViewInsertWord] = useState(true)
  const [searchWord, setSearchWord] = useState('')
  const [searchWordMeaning, setSearchWordMeaning] = useState('')

  const [rndWidth1, setRndWidth1] = useState(400)
  const [rndHeight1, setRndHeight1] = useState(560)
  const [defaultX, setDefaultX] = useState(-420)
  const [defaultY, setDefaultY] = useState(-400)
  const [rndZIndex, setRndZIndex] = useState(3) //-1 後ろ
  const [rndWord, setRndWord] = useState('')
  const [callWord, setCallWord] = useState()
  const [bookStoryInfo, setBookStoryInfo] = useState([])
  const [idiomList, setIdiomList] = useState([])
  const [idiomListCount, setIdiomListCount] = useState('')

  function regAlert(msg, bgcolor, textcolor) {
    const MySwal = withReactContent(Swal)
    if (msg == '登録完了!') {
      var timerLength = 700
    } else {
      var timerLength = 1200
    }
    Swal.fire({
      // position: 'top-end',
      showConfirmButton: false,
      timer: timerLength,
      timerProgressBar: true,
      //  html: '',
      title: msg,
      width: '600px',
      height: '600px',
      opacity: 0,
      padding: '3em',
      border: '1px solid #F1C40F',
      borderRadius: '20px',
      color: textcolor,
      background: bgcolor,
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
        // alert(response.data.response.length)
        // // alert(response.data.message)
        // // alert(response.data.response.length)
        // alert(response.data.seriesName)
        // alert(response.data.readingLevel)
        // alert(response.data.storyNum)
        // alert(response.data.response.length)
        if (response.data.response.length > 0) {
          setIdiomList(response.data.response)
          // alert(response.data.response.length)
          // setIdiomListCount(response.data.response.length)
        }
      } catch (error) {
        // alert('idiomListView Error')
        console.log('idiomListView Error')
      }
    }
    fetchData3()
  }
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
  // const [clearBookWord, setClearBookWord] = useState([]) //必要のない文字は全部消すかSpaceに変える, Wordのabc準

  // const [clearBookStoryWord, setClearBookStoryWord] = useState()
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  //3個のimageを入れる
  const [img1, setImg1] = useState()
  const [img2, setImg2] = useState()
  const [img3, setImg3] = useState()
  const [wordForm, setWordForm] = useState()
  const [wordMeaning, setWordMeaning] = useState()

  const [bookBlackcatStory, setBookBlackcatStory] = useState()
  const [wordFormList, setWordFormList] = useState([])
  const [yourMeaningJP, setYourMeaningJP] = useState('')
  const [yourMeaningENG, setYourMeaningENG] = useState('')
  const [yourFormJP, setYourFormJP] = useState('')
  const [yourSentence1, setYourSentence1] = useState('')
  const [yourSentence2, setYourSentence2] = useState('')
  const [yourSynonym, setYourSynonym] = useState('')
  const [yourAntonym, setYourAntonym] = useState('')
  const [yourMemo, setYourMemo] = useState('')

  //Difficult Words List
  const [selectedWords, setSelectedWords] = useState([])
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
        //console.log('wordFormList', wordFormList)
      } catch (error) {
        alert('WordFormList Error')
      }
    }
    fetchData()
  }

  //memory-word-get-info-word-henkan-get-meaning/
  // my word listに登録されている単語の意味を持ってくる
  function getWordMeaningForEachWord(word) {
    //voca-talkstation-by-word-with-my-voca-list
    var url = DB_CONN_URL + '/memory-word-get-info-word-henkan-get-meaning/'
    var Url = url + word
    // alert(HWID)
    const fetchData3 = async () => {
      // alert('2')
      try {
        // alert('3')
        const response = await axios.get(Url)
        // alert('4')
        // alert(response.data.length)
        if (response.data.length > 0) {
          // alert('1')
          setSelectedWordsMeaning(response.data)
        } else {
          // setSelectedWordsMeaning({ meaning_jp1: 'no-data' })
        }
        // alert('2')
      } catch (error) {
        alert('wordListView Error 1')
      }
    }

    fetchData3()
  }

  function handleMeaningInsert() {
    // word = word.replace(':', '')
    // console.log('change meaning ' + modalWord + 'into my wordbook')
    var url = DB_CONN_URL + '/change-memory-word-from-student/'

    console.log('modalWord', modalWord)
    console.log('autoid', modalWordAutoid)
    console.log('homework_id', homework_id)
    console.log('yourFormJP', yourFormJP)
    console.log('yourSynonym', yourSynonym)
    console.log('yourAntonym', yourAntonym)
    console.log('yourMeaningJP', yourMeaningJP)
    console.log('yourMeaningENG', yourMeaningENG)
    console.log('yourSentence1', yourSentence1)
    console.log('yourSentence2', yourSentence2)
    console.log('yourMemo', yourMemo)

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
        // alert('handleWordClick')
        //alert(response.data.message)
        // alert('登録完了2')

        wordListView()
      } catch (error) {
        alert('handleWordClick Error2')
      }
    }

    fetchData2()
    closeModal()
    //alert('Registered Successfully!')
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
    console.log('WordValue:', WordValue)
    var HWID = homework_id
    var practiceTempId = 'notempid'
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

  //この課題で登録されてない単語をチェックして登録する
  function handleIdiomVocaClick(autoid) {
    // word = word.replace(':', '')
    // console.log('insert ' + word + 'into my wordbook')
    var url = DB_CONN_URL + '/insert-memory-idiom-voca-from-student/'

    const fetchData2 = async () => {
      try {
        const response = await axios.post(url, {
          autoid: autoid,
          HWID: homework_id,
          mbn: mbn,
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
        // alert(msg)
        wordListView()
        if (msg == '登録完了!') {
          var bgcolor = '#F1BE0F'
          var color = 'black'
        } else {
          var bgcolor = '#F15A0F'
          var color = 'white'
        }

        regAlert(msg, bgcolor, color)
        // alert('handleWordClick')
        // if(msg =="今回の課題ですでに登録されている単語です。"){

        // }else if (msg == '登録完了!') {
        // }

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
    //sys_hw_lesson_memory_word
    var url = DB_CONN_URL + '/memory-word-list-from-only-memoryword-list/'
    var HWID = homework_id
    var Url = url + HWID
    // alert(Url)
    // alert(HWID)
    const fetchData3 = async () => {
      // alert('2')
      try {
        // alert('3')
        const response = await axios.get(Url)
        // alert('4')

        if (response.data.length > 0) {
          alert(response.data.length)
          setSelectedWords(response.data)
        }
        // alert('2')
      } catch (error) {
        alert('wordListView Error difficult words')
      }
    }
    fetchData3()
  }

  function handleRegWordDel(autoid) {
    var url = DB_CONN_URL + '/memory-word-del-by-autoid/'

    var Url = url + homework_id + '&' + autoid
    // var Url = url + homework_id + '&' + word
    // alert(Url)
    axios.put(Url).then((response) => {
      //errorの場合
      // alert(autoid)
      alert('削除しました。')
      wordListView()
    })
  }

  //この課題で登録されてない単語をチェックして登録する
  function handleWordAddDirect(word) {
    if (searchWordMeaning == '' || word == '') {
      if (word == '') {
        alert('単語を入力してください。')
      } else {
        alert('意味を入力してください。')
      }
    } else {
      // word = word.replace(':', '')
      // console.log('insert ' + word + 'into my wordbook')
      var url = DB_CONN_URL + '/insert-direct-memory-idiom-voca-from-student/'
      // alert(url)
      //ここでwordをいろんな形で変換？
      // alert(word)
      // alert(searchWordMeaning)
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

      axios
        .post(url, {
          word: word,
          meaning: searchWordMeaning,
          HWID: homework_id,
          mbn: mbn,
          practiceTempId: practiceTempId,
          userName: userName,
          thisSubject: thisSubject,
          seriesName: seriesName,
          readingLevel: readingLevel,
          bookTitle: bookTitle,
          bookNum: bookNum,
          storyNum: storyNum,
        })
        .then((response) => {
          // alert(response.data.message)

          var msg = response.data.message
          // alert(msg)
          wordListView()
          if (msg == '登録完了!') {
            var bgcolor = '#F1BE0F'
            var color = 'black'
          } else {
            var bgcolor = '#F15A0F'
            var color = 'white'
          }

          regAlert(msg, bgcolor, color)

          setSearchWord('') //Reset
          setSearchWordMeaning('') //Reset
        })
    }

    //alert('Registered Successfully!')
  }
  //この課題で登録されてない単語をチェックして登録する

  // function getTalkstationWord(Word) {
  //   var WordValue = Word
  //   WordValue = WordValue.toLowerCase()
  //   WordValue = WordValue.replace('.', '')
  //   WordValue = WordValue.replace('?', '')
  //   WordValue = WordValue.replace('!', '')
  //   WordValue = WordValue.replace('"', '')
  //   WordValue = WordValue.replace('“', '')
  //   WordValue = WordValue.replace('”', '')
  //   WordValue = WordValue.replace('(', '')
  //   WordValue = WordValue.replace(')', '')
  //   setImg1('')
  //   setImg2('')
  //   setImg3('')
  //   console.log('WordValue:', WordValue)
  //   var url = DB_CONN_URL + '/voca-talkstation-by-word/'
  //   var Url = url + WordValue + '&' + HWID + '&' + practiceTempId

  //   const fetchData4 = async () => {
  //     setImg1('')
  //     setImg2('')
  //     setImg3('')
  //     setError4(false)
  //     setLoading4(true)

  //     try {
  //       // const response = await axios.get(Url)

  //       console.log('Message from Server:', response.data.message)
  //       if (response.data.message == 'no word') {
  //         console.log(WordValue, '有りません。')

  //         setRndWord(WordValue) //イメージの上に表示するWord
  //         setImageVocaInfo(response.data.response)
  //         setImg1('')
  //         setImg2('')
  //         setImg3('')

  //         // handleWordClick(WordValue)
  //       } else {
  //         // handleWordClick(WordValue)
  //         setImageVocaInfo(response.data.response)
  //         setRndWord(response.data.response[0].word)
  //         setWordForm(response.data.response[0].form)
  //         if (response.data.response[0].coreMeaning == '') {
  //           setWordMeaning(response.data.response[0].meaning_jp1)
  //         } else {
  //           setWordMeaning(response.data.response[0].coreMeaning)
  //         }
  //         if (response.data.response[0].img_ex1 != '') {
  //           setImg1(
  //             'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/' +
  //               response.data.response[0].img_ex1
  //           )
  //         } else {
  //           setImg1('no img')
  //         }
  //         if (response.data.response[0].img_ex2 != '') {
  //           setImg2(
  //             'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/' +
  //               response.data.response[0].img_ex2
  //           )
  //         } else {
  //           setImg2('no img')
  //         }
  //         if (response.data.response[0].img_ex3 != '') {
  //           setImg3(
  //             'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/' +
  //               response.data.response[0].img_ex3
  //           )
  //           // alert(WordValue + ' 単語完了')
  //           console.log(WordValue, ' 単語完了')
  //         } else {
  //           setImg3('no img')
  //         }
  //       }
  //       handleWordClick(WordValue)
  //     } catch (error) {
  //       //探す単語がなくて、DBから戻ってきてない場合
  //       //alert('getTalkstationWord Error')
  //       setRndWord(WordValue) //イメージの上に表示するWord
  //       setImageVocaInfo([])
  //       setError4(true)
  //     }

  //     setLoading4(false)
  //   }

  //   fetchData4()
  //   handleWordClick(WordValue)
  //   setRndWord(imageVocaInfo.word)
  // }
  // if (isError) return <h1>Error, try again!</h1>
  // if (isLoading) return <h1>Loading Question..........................</h1>

  return (
    <>
      {/* <div className="row">
        <div
          className="col-lg-12 col-md-6 mb-2 ml-0 pl-0"
          style={{
            position: 'fixed',
            top: '0',
            width: '100%',
            marginTop: 600,

            marginBottom: 0,
            paddingBottom: 0,
            marginRight: 0,
            marginLeft: 0,
            paddingRight: 0,
            paddingLeft: 0,
            zIndex: 1,
            // backgroundColor: 'white',
            textAlign: 'left',
            display: viewInsertWord ? 'block' : 'none',
          }}
        >
          <Rnd
            default={{
              x: defaultX,
              y: defaultY,
              width: rndWidth1,
              height: rndHeight1,
            }}
            style={{
              //display: 'flex',
              //display: 'flex',
              //alignItems: 'top',
              // position: 'absolute',
              marginRight: 0,
              justifyContent: 'right',
              paddingTop: '10px',
              paddingLeft: '10px',
              paddingRight: '10px',
              textAlign: 'center',
              //border: 'solid 1px #dedede',
              background: 'white',
              // border: '10px solid #ececec',
              // borderRadius: '20px',
              overflow: 'auto',
              zIndex: rndZIndex,
            }}
            minWidth={300}
            minHeight={350}
            // bounds="window"
          >
            <div
              style={{
                width: '100%',
                height: '70px',
                paddingTop: '5px',
                boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.3)',
                backgroundColor: '#ececec',
                transformStyle: 'preserve-3d',
                cursor: 'pointer',
                // transition: '150ms',
                color: '#273746',
                fontSize: '20px',
              }}
            >
              Flash Card <br />
              <span
                className="btn btn-warning pt-1 pb-1"
                onClick={() => {
                  setFlashCardView(!flashCardView)
                }}
              >
                Flash Cardを更新(2回クリック)
              </span>
            </div>
            {flashCardView && <><FlashcardApp HWID={HWID} /></>}
          </Rnd>
        </div>
      </div> */}

      <div className="row">
        <div
          className="col-lg-12 col-md-12"
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'blue',
          }}
        >
          単語クイズとフラッシュカードは、近日中開始予定
        </div>
        <div className="col-lg-6 col-md-6 mb-2 ml-0 pl-0">
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
              {/* {seriesName}/{readingLevel}/{storyNum}
              <br /> */}
              <span>
                <ruby>
                  重要<rt>じゅうよう</rt>
                </ruby>
                な
                <ruby>
                  単語<rt>たんご</rt>
                </ruby>
                と
                <ruby>
                  熟語<rt>じゅくご</rt>
                </ruby>
                リスト &nbsp;{idiomListCount > 0 && [{ idiomListCount }]}
              </span>
              <p
                style={{ fontSize: '12px', fontWeight: '500', color: 'black' }}
              >
                <ruby>
                  下<rt>した</rt>
                </ruby>
                のリストから
                <ruby>
                  知<rt>し</rt>
                </ruby>
                らない
                <ruby>
                  単語<rt>たんご</rt>
                </ruby>
                をクリックして
                <br />
                <ruby>
                  右<rt>みぎ</rt>
                </ruby>
                の
                <ruby>
                  単語帳<rt>たんごちょう</rt>
                </ruby>
                に
                <ruby>
                  登録<rt>とうろく</rt>
                </ruby>
                しよう
              </p>
            </p>
            <div
              style={{
                marginTop: 15,
                paddingTop: 0,

                backgroundColor: 'lightblue',
                height: '350px',
                width: '100%',
                overflowY: 'auto',
                overflowX: 'auto',
              }}
            >
              {idiomList?.map((val, key) => {
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
                        // handleWordClick(val.word)
                        handleIdiomVocaClick(val.autoid)
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
          {/* {' '}
          <IdiomListForStudent
            mbn={mbn}
            seriesName={seriesName}
            storyNum={storyNum}
            bookNum={bookNum}
            readingLevel={readingLevel}
            homework_id={homework_id}
            practiceTempId={practiceTempId}
            userName={userName}
            thisSubject={thisSubject}
            bookTitle={bookTitle}
          /> */}
        </div>
        <div className="col-lg-6 col-md-6 mb-2 ml-0 pl-0">
          {/* <DifficultWordsForStudent
            homework_id={homework_id}
            mbn={mbn}
            tbn={tbn}
            bookStory={bookStory}
          /> */}
          <div
            className="col-lg-12 col-md-12"
            style={{
              textAlign: 'left',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* <p
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
            > */}
            <p
              style={{
                backgroundColor: '#E1BEE7',
                color: 'black',
                marginBottom: 0,
                marginLeft: '4px',
                marginTop: '10px',
                padding: '7px',
                fontWeight: '600',
                textAlign: 'center',
                border: '1px solid #dedede',
                borderRadius: '5px',
              }}
            >
              {/* <span>Difficult Words &nbsp;[{selectedWords.length}]</span>
              <br /> */}
              <span>
                <ruby>
                  私<rt>わたし</rt>
                </ruby>
                の
                <ruby>
                  知<rt>し</rt>
                </ruby>
                らない
                <ruby>
                  単語<rt>たんご</rt>
                </ruby>
                リスト&nbsp;[{selectedWords.length}]
              </span>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: '200',
                  color: 'black',
                }}
              >
                {/* Student's Difficult Word List */}
                <ruby>
                  左<rt>ひだり</rt>
                </ruby>
                のリストにない
                <ruby>
                  単語<rt>たんご</rt>
                </ruby>
                でもストーリーの
                <ruby>
                  中<rt>なか</rt>
                </ruby>
                で
                <ruby>
                  知<rt>し</rt>
                </ruby>
                らない
                <ruby>
                  単語<rt>たんご</rt>
                </ruby>
                があったら
                <ruby>
                  直接下<rt>ちょくせつした</rt>
                </ruby>
                の
                <ruby>
                  空欄<rt>くうらん</rt>
                </ruby>
                に
                <ruby>
                  書<rt>か</rt>
                </ruby>
                き
                <ruby>
                  加<rt>くわ</rt>
                </ruby>
                えよう
                {/* 複数の意味を持つ単語は、全てリストに表示されます。 */}
              </p>
            </p>
          </div>
          <div
            className="col-lg-12 col-md-6 mt-2 mb-2 "
            style={{
              // position: 'fixed',
              // top: '50px',
              width: '100%',

              // marginTop: 500,
              marginBottom: 0,
              paddingBottom: 0,
              // marginRight: 0,
              // marginLeft: -100,
              // paddingRight: 0,
              // paddingLeft: 0,
              // zIndex: 1,
              // backgroundColor: 'white',
              textAlign: 'left',
              display: viewInsertWord ? 'block' : 'none',
            }}
          >
            <input
              className="form-control-md ml-3 mr-1"
              style={{
                width: '28%',
                height: '30px',
                backgroundColor: '#FCF3CF',
                border: '1px solid #566573',
                borderRadius: '5px',
              }}
              ref={inputRef}
              type="text"
              value={searchWord}
              placeholder="たんご"
              onChange={(e) => {
                setSearchWord(e.target.value)
              }}
              // onKeyPress={(e) => {
              //   e.key == 'Enter' && handleWordClick(searchWord)
              // }}
            />

            <input
              className="form-control-md mr-1"
              style={{
                width: '38%',
                height: '30px',
                backgroundColor: '#FCF3CF',
                border: '1px solid #566573',
                borderRadius: '5px',
              }}
              ref={inputRef}
              type="text"
              value={searchWordMeaning}
              placeholder="いみ"
              onChange={(e) => {
                setSearchWordMeaning(e.target.value)
              }}
              // onKeyPress={(e) => {
              //   e.key == 'Enter' && handleWordClick(searchWord)
              // }}
            />
            <span
              style={{
                width: '15%',
                cursor: 'pointer',
                color: 'white',
                height: '50px',
                paddingTop: '9px',
              }}
              className="btn-sm btn-danger mr-1"
              onClick={() => {
                handleWordAddDirect(searchWord)
                setSearchWord('')
                setSearchWordMeaning('')
              }}
            >
              <ruby>
                &#9733;直接追加<rt>ちょくせつついか</rt>
              </ruby>
            </span>
            {/* <a
              style={{ width: '15%', cursor: 'pointer', color: 'white' }}
              className="btn-sm btn-primary"
              onClick={() => {
                setSearchWord('')
                setSearchWordMeaning('')
              }}
            >
              CLEAR
            </a> */}

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
            style={{
              marginTop: 15,
              paddingTop: 0,
              backgroundColor: 'lightblue',
              height: '300px',
              width: '100%',
              overflowY: 'auto',
              overflowX: 'auto',
              textAlign: 'left',
            }}
          >
            {selectedWords?.map((val2, key2) => {
              if (val2.directInsert == 'direct') {
                var wordColor = 'red'
                // var isDirect = '[&#9733;]'
              } else {
                var wordColor = 'green'
                // var isDirect = ''
              }
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
                        handleRegWordDel(val2.autoid)
                        // handleRegWordDel(val2.delid)
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
                      onClick={() => {
                        // handleViewWordMeaning(val2.word)
                      }}
                    >
                      {val2.directInsert == 'direct' && (
                        <span
                          style={{
                            color: wordColor,
                            fontSize: '15px',
                          }}
                        >
                          &#9733;&nbsp;
                        </span>
                      )}
                      <span style={{ color: 'green', fontWeight: 'bold' }}>
                        {val2.word}
                      </span>
                      <span
                        style={{
                          color: 'black',
                          // fontWeight: 'bold',
                          fontSize: '15px',
                        }}
                      >
                        &nbsp;{val2.meaning}
                      </span>
                    </a>
                  </p>
                </>
              )
            })}
          </div>
        </div>
        <div
          className="col-lg-12 col-md-6 mt-2 mb-2"
          style={{ color: 'black' }}
        >
          <strong>*SB</strong>:somebody(人)&nbsp;&nbsp;<strong>*STH</strong>
          :something(もの)&nbsp;&nbsp;<strong>*V</strong>:
          <ruby>
            動詞<rt>どうし</rt>
          </ruby>
        </div>
        {/* seriesName={seriesName}
        <br />
        storyNum={storyNum}
        <br />
        bookNum={bookNum}
        <br />
        readingLevel={readingLevel}
        <br /> */}

        {/* {bookStory && (
          <StoryWordList
            homework_id={homework_id}
            bookStory={bookStory}
            seriesName={seriesName}
            readingLevel={readingLevel}
            storyNum={storyNum}
            bookNum={bookNum}
            mbn={mbn}
            tbn={tbn}
          />
        )} */}
      </div>
      {/* <div className="row mt-2">
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
        </div>
      </div> */}
    </>
  )
}
