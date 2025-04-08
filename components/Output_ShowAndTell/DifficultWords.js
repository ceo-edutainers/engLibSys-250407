import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faDoorOpen,
  faChartBar,
  faTrash,
  faPenSquare,
  faFileAudio,
  faHeadphones,
  faCubes,
  faLaptop,
  faFile,
  faHandPointer,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons'
// import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import {
  myFun_replaceSpecialChar,
  myFun_noDuplicateInArray,
} from '@/components/FunctionComponent'
import Swal from 'sweetalert2'
const DifficultWords = ({ homework_id, mbn, tbn, bookStory }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [clearBookWord, setClearBookWord] = useState([]) //必要のない文字は全部消すかSpaceに変える, Wordのabc準

  const [viewInsertWord, setViewInsertWord] = useState(true)
  const [searchWord, setSearchWord] = useState('')
  const inputRef = useRef()
  const [wordFormList, setWordFormList] = useState([])
  const [selectedWords, setSelectedWords] = useState([])
  const [selectedWordsMeaning, setSelectedWordsMeaning] = useState([])
  const [modalWord, setModalWord] = useState('')
  const [modalWordAutoid, setModalWordAutoid] = useState('')

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
  function handleRegWordDel(autoid) {
    var url = DB_CONN_URL + '/memory-word-del-by-autoid/'

    var Url = url + homework_id + '&' + autoid
    // var Url = url + homework_id + '&' + word
    axios.put(Url).then((response) => {
      //errorの場合

      wordListView()
    })
  }

  useEffect(() => {
    wordListView()
  }, [])

  function wordListView() {
    // var url = DB_CONN_URL + '/memory-word-list/' //<- eiken new dbにあるものだけ持ってくる
    //以下はこの課題で生徒が保存した全ての単語リストを持ってくる
    var url = DB_CONN_URL + '/memory-word-list-from-only-wordlist/'
    var HWID = homework_id
    var Url = url + HWID
    // alert(HWID)
    const fetchData3 = async () => {
      // alert('2')
      try {
        // alert('3')
        const response = await axios.get(Url)
        // alert('4')
        // alert(response.data.length)
        if (response.data.length > 0) {
          setSelectedWords(response.data)
          console.log('selectedWords', response.data)
        }
        // alert('2')
      } catch (error) {
        alert('wordListView Error-B' + url)
      }
    }
    fetchData3()
  }

  useEffect(() => {
    getWordEach(bookStory)
    // getStoryToWordEach(bookStory)
  }, [])

  function getWordEach(bookStory) {
    // alert(bookStory)
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
        <div className="row">
          {/* <div
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
              <p
                style={{ fontSize: '10px', fontWeight: '200', color: 'black' }}
              >
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
          </div> */}
          <div
            className="col-lg-12 col-md-6 mb-2  pl-5"
            style={{
              position: 'fixed',
              top: '50px',
              width: '100%',

              marginTop: 500,

              marginBottom: 0,
              paddingBottom: 0,
              // marginRight: 0,
              marginLeft: -100,
              // paddingRight: 0,
              // paddingLeft: 0,
              zIndex: 1,
              // backgroundColor: 'white',
              textAlign: 'left',
              display: viewInsertWord ? 'block' : 'none',
            }}
          >
            {/* <input
              className="form-control-md ml-3 mr-1"
              style={{
                width: '150px',
                height: '30px',
                backgroundColor: '#FCF3CF',
                border: '1px solid #566573',
                borderRadius: '5px',
              }}
              ref={inputRef}
              type="text"
              value={searchWord}
              placeholder="単語を直接入力"
              onChange={(e) => {
                setSearchWord(e.target.value)
              }}
              // onKeyPress={(e) => {
              //   e.key == 'Enter' && handleWordClick(searchWord)
              // }}
            />
            <a
              style={{ width: '15%', cursor: 'pointer', color: 'white' }}
              className="btn-sm btn-primary mr-2"
              onClick={() => {
                setSearchWord('')
              }}
            >
              CLEAR
            </a>
            <a
              style={{ width: '15%', cursor: 'pointer', color: 'white' }}
              className="btn-sm btn-danger"
              onClick={() => {
                handleWordClick(searchWord)
                setSearchWord('')
              }}
            >
              単語追加
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
          <div className="col-lg-12 col-md-12">
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
                Student-Selected Unknown Words &nbsp;[{selectedWords.length}]
              </span>
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: '200',
                  color: 'black',
                }}
              >
                生徒の知らない単語リスト。
                <br />
                {/* 複数の意味を持つ単語は、全てリストに表示されます。 */}
              </p>
            </p>
          </div>
          {/* <div className="col-lg-4 col-md-12 pt-4">
              <GrammarTermView />
            </div> */}
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
          {selectedWords?.map((val2, key2) => {
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
                  {/* <span
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
                  &nbsp; */}
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
                      <span style={{ color: 'red' }}>*</span>
                    )}
                    <strong>{val2.word}</strong>
                  </a>
                  &nbsp;
                  <span style={{ fontSize: '14px' }}>
                    {val2.meaning}
                    {/* {val2.meaning_kids == ''
                      ? val2.meaning_adult
                      : val2.meaning_kids} */}
                  </span>
                  {/* <span style={{ fontSize: '14px' }}>
                    [{val2.form}] &nbsp;&nbsp;
                    {val2.meaning_jp1 ? val2.meaning_jp1 : val2.coreMeaning}
                  </span> */}
                  {/* <span
                      className="btn btn-danger"
                      onClick={() => {
                        getWordMeaningForEachWord(val2.word)
                      }}
                    >
                      意味
                    </span> */}
                  {/* &nbsp; */}
                  {/* {selectedWordsMeaning?.map((val3, key3) => {
                    return (
                      <>
                        {val2.word == val3.word ? (
                          <span style={{ color: 'red', fontSize: '10px' }}>
                            {val3.meaning_jp1
                              ? val3.meaning_jp1
                              : val3.coreMeaning}
                          </span>
                        ) : (
                          <span style={{ color: 'blue', fontSize: '10px' }}>
                            no-data
                          </span>
                        )}
                      </>
                    )
                  })} */}
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
                      {wordFormList?.map((val, key) => {
                        return (
                          <option value={val.form_name_jp}>
                            {val.form_name_jp}&nbsp;&nbsp;[{val.form_name_eng}]
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
    </>
  )
}

export default DifficultWords
