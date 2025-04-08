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
import IdiomList from '../Output_ShowAndTell/IdiomList'
import StoryWordList from '../Output_ShowAndTell/StoryWordList'
import DifficultWords from '../Output_ShowAndTell/DifficultWords'

export default function WordListReadingBookAForTutor({
  homework_id,
  mbn,
  tbn,
  // practiceTempId,
  // userName,
  seriesName,
  readingLevel,
  // bookTitle,
  bookNum,
  storyNum,
  bookStory,
}) {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const inputRef = useRef()
  const [flashCardView, setFlashCardView] = useState(true)

  const [rndWidth1, setRndWidth1] = useState(400)
  const [rndHeight1, setRndHeight1] = useState(560)
  const [defaultX, setDefaultX] = useState(-420)
  const [defaultY, setDefaultY] = useState(-400)
  const [rndZIndex, setRndZIndex] = useState(3) //-1 後ろ
  const [rndWord, setRndWord] = useState('')
  const [callWord, setCallWord] = useState()
  const [bookStoryInfo, setBookStoryInfo] = useState([])

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

  // useEffect(() => {
  //   getWordForm()
  // }, [])
  // function getWordForm() {
  //   var url = DB_CONN_URL + '/get-word-form-set/'
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(url)

  //       setWordFormList(response.data)
  //       //console.log('wordFormList', wordFormList)
  //     } catch (error) {
  //       alert('WordFormList Error-E')
  //     }
  //   }
  //   fetchData()
  // }

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
        alert('wordListView Error-J')
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
        {/* seriesName={seriesName}
        <br />
        storyNum={storyNum}
        <br />
        bookNum={bookNum}
        <br />
        readingLevel={readingLevel}
        <br /> */}
        {seriesName && bookNum && storyNum && readingLevel && (
          <IdiomList
            seriesName={seriesName}
            storyNum={storyNum}
            bookNum={bookNum}
            readingLevel={readingLevel}
          />
        )}

        {mbn && (
          <DifficultWords
            homework_id={homework_id}
            mbn={mbn}
            tbn={tbn}
            bookStory={bookStory}
          />
        )}
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
