import react, { useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import SidebarLeft from '@/components/MyVocab/SidebarLeft'
import SidebarRight from '@/components/MyVocab/SidebarRight'
import Link from 'next/link'
import { VocaContext } from '@/components/MyVocab/Contexts'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { FaSearch } from 'react-icons/fa'
import { FcSpeaker } from 'react-icons/fc'
import SweetAlert from 'react-bootstrap-sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAssistiveListeningSystems,
  faCircle,
  faCircleNotch,
  faDotCircle,
  faMicrophone,
  faKeyboard,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

const SingleCourses = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const { myMbn, setMyMbn, userName, setUserName, searchWord, setSearchWord } =
    useContext(VocaContext)
  const [cantFindWord, SetCantFindWord] = useState(false)
  const inputRef = useRef()
  const [vocaSearchView, setVocaSearchView] = useState(false)
  const [selectedWords, setSelectedWords] = useState([])
  const [rapidWord, setRapidWord] = useState()
  const [data, setData] = useState('')
  //  const [dataJson, setDataJson] = useState([])
  const [searchedWord, setSearchedWord] = useState('happy')
  const [noWordAlert, setNoWordAlert] = useState(false)
  // useEffect(() => {
  //   //Rapid API
  //   const options = {
  //     method: 'GET',
  //     url: `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/hasTypes`,
  //     headers: {
  //       'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
  //       'X-RapidAPI-Key': '5baf635461msh0fa89bc13e33a6dp1b51a7jsnb710ab831d31',
  //     },
  //   }
  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       setRapidWord(response.data)
  //       console.log('rapidWord', response.data)
  //     })
  //     .catch(function (error) {
  //       console.error(error)
  //     })
  // }, [])
  useEffect(() => {
    wordListView()
  }, [])

  function wordListView() {
    // var url = DB_CONN_URL + '/memory-word-list/' //<- eiken new dbにあるものだけ持ってくる
    //以下はこの課題で生徒が保存した全ての単語リストを持ってくる

    var url = DB_CONN_URL + '/get-word-from-dictionary/'
    if (!searchWord) {
      var Url = url + 'happy'
    } else {
      var Url = url + searchWord
    }
    // alert(HWID)
    const fetchData3 = async () => {
      try {
        const response = await axios.get(Url)
        console.log('length', response.data.length)
        if (response.data.length > 0) {
          setNoWordAlert(false)
          setSelectedWords(response.data)
        } else {
          // SetCantFindWord(true)
          setNoWordAlert(true)
        }
      } catch (error) {
        alert('wordListView Error 1')
      }
    }
    fetchData3()
  }

  //FREE Dictionary
  // Setting up the initial states using react hook 'useState'

  // Function to fetch information on button
  // click, and set the data accordingly
  function getMeaning() {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`)
      .then((response) => {
        setData(response.data[0])
        console.log('data', response.data[0])
      })
  }
  // function getMeaning() {
  //   axios
  //     .get(`https://api.dictionaryapi.dev/api/v2/entries/ja/${searchWord}`)
  //     .then((response) => {
  //       setDataJp(response.data[0])
  //       console.log('dataJP', response.data[0])
  //     })
  // }
  // Function to play and listen the
  // phonetics of the searched word
  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio)
    audio.play()
  }

  const handleKeyPress = (event, word) => {
    if (event.key === 'Enter') {
      setSearchWord(word)
      wordListView(word)
      setSearchedWord(word)
      setVocaSearchView(!vocaSearchView)
      // alert('anter key' + word)
      // console.log('enter press here! ')
    }
  }

  //Sidebar Right
  const [myVocaList, setMyVocaList] = useState([])

  useEffect(() => {
    // alert('myMbn1' + myMbn)
    wordListView2()
  }, [])
  function wordListView2() {
    // var url = DB_CONN_URL + '/memory-word-list/' //<- eiken new dbにあるものだけ持ってくる
    //以下はこの課題で生徒が保存した全ての単語リストを持ってくる

    var url = DB_CONN_URL + '/memory-word-list-by-member/'

    var Url = url + myMbn
    // alert(myMbn)
    const fetchData3 = async () => {
      try {
        const response = await axios.get(Url)

        // alert(response.data.length)
        if (response.data.length > 0) {
          setMyVocaList(response.data)
        }
      } catch (error) {
        alert('wordListView Error2')
      }
    }
    fetchData3()
  }
  function handleRegWordDel(autoid) {
    var url = DB_CONN_URL + '/memory-word-del-by-autoid/'

    var Url = url + homework_id + '&' + autoid
    // var Url = url + homework_id + '&' + word
    axios.put(Url).then((response) => {
      //errorの場合

      wordListView2()
    })
  }
  return (
    <react.Fragment>
      <div className="VocaHeader">
        <div className="col-lg-12 col-md-12">
          <div className="row">
            <div className="col-lg-3 col-md-12" style={{ textAlign: 'right' }}>
              <FontAwesomeIcon icon={faKeyboard} size="3x" color="black" />
            </div>
            <div className="col-lg-5 col-md-12" style={{ textAlign: 'center' }}>
              <input
                type="text"
                ref={inputRef}
                placeholder="Search here"
                onChange={(e) => (
                  setSearchWord(e.target.value),
                  setVocaSearchView(!vocaSearchView)
                )}
                onClick={(e) => (
                  (e.target.value = ''), setVocaSearchView(!vocaSearchView)
                  // ,
                  // wordListView(e.target.value)
                )}
                onKeyPress={(e) => {
                  e.key === 'Enter' && (e.target.value = '')
                  // handleKeyPress(e.target.value)
                }}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleKeyPress(e, e.target.value)
                }
              />
              {/* <div>
                <div className="">{vocaSearchView && <>ここを見せる</>}</div>
              </div> */}
            </div>
            <div
              className="filterButton col-lg-1 col-md-12 m-0 p-0"
              style={{ textAlign: 'left' }}
            >
              {/* <button
                onClick={() => {
                  getMeaning()
                }}
              >
                SEARCH
              </button> */}
              <input className="filterButton" placeholder="filter" />
            </div>
            <div
              className="col-lg-3 col-md-12"
              style={{ textAlign: 'right' }}
            ></div>
          </div>
        </div>
      </div>
      <div className="courses-details-area ptb-4">
        {/* <div className="container"> */}
        <div className="row">
          <div className="col-lg-1 col-md-12"></div>
          <div className="col-lg-2 col-md-12">
            <SidebarLeft />
          </div>
          <div className="col-lg-6 col-md-12 mt-0 pt-0">
            <div>
              {/* {data && (
                <div className="showResults">
                  <h2>
                    {data.word}{' '}
                    <button
                      onClick={() => {
                        playAudio()
                      }}
                    >
                      <FcSpeaker size="26px" />
                    </button>
                  </h2>
                </div>
              )} */}
            </div>
            <div className="courses-details-desc-style-two">
              {noWordAlert ? (
                <h6 style={{ color: 'black' }}>
                  探している単語
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'red',
                      fontSize: '30px',
                    }}
                  >
                    {searchWord}
                  </span>
                  が見つかりません。
                </h6>
              ) : (
                <>
                  {/* <h6>
                    イングリブのセンテンスから&nbsp;
                    <span
                      style={{
                        fontWeight: 'bold',
                        color: 'red',
                        fontSize: '30px',
                      }}
                    >
                      &nbsp;{searchWord}
                      &nbsp; {data.word}
                    </span>
                    が含まれている単語を探しました。
                  </h6> */}
                </>
              )}

              <div className="middleBody">
                <div className="courses-curriculum p-0">
                  <p
                    style={{
                      color: 'red',
                      fontWeight: '500',
                      textAlign: 'left',
                      marginLeft: '10px',
                    }}
                  >
                    関連語
                  </p>
                  {/* <h1>{selectedWords.length}</h1> */}

                  {selectedWords.map((val, key) => {
                    var imgurl =
                      'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/'
                    var img1 = imgurl + val.img_ex1
                    var img2 = imgurl + val.img_ex2
                    var img3 = imgurl + val.img_ex3
                    return (
                      <>
                        <div className="dictionaryBox">
                          <h6>
                            <FontAwesomeIcon
                              icon={faDotCircle}
                              size="1x"
                              color="black"
                            />
                            &nbsp; engLib Dictionary
                          </h6>
                          <hr />

                          <h1 style={{ fontSize: '21px', fontWeight: '800' }}>
                            <FontAwesomeIcon
                              icon={faAssistiveListeningSystems}
                              size="1x"
                              color="black"
                            />
                            &nbsp;&nbsp;{val.word}
                            {/* <span
                              onClick={() => {
                                playAudio()
                              }}
                            >
                              <FcSpeaker size="26px" />
                            </span> */}
                          </h1>
                          <p
                            style={{
                              color: '#808B96',
                              fontStyle: 'italic',
                              marginLeft: '30px',
                              fontSize: '15spx',
                            }}
                          >
                            {/* {data.meanings[0].partOfSpeech} */}
                            {val.form}
                          </p>
                          <p style={{ color: '#2C3E50', marginLeft: '20px' }}>
                            {/* {data.meanings[0].definitions[0].definition} */}
                          </p>
                          <p style={{ color: '#2C3E50', marginLeft: '20px' }}>
                            {val.meaning_jp1
                              ? val.meaning_jp1
                              : val.coreMeaning}
                          </p>
                          <p style={{ color: '#2C3E50', marginLeft: '20px' }}>
                            {/* {data.meanings[0].definitions[0].example} */}
                          </p>
                          {(val.ex1 || val.ex2 || val.ex3) && <hr />}

                          <div className="row">
                            <div className="col-lg-4 col-md-12">
                              {val.ex1 && (
                                <>
                                  <img
                                    src={img1}
                                    style={{
                                      border: '0.01em solid #ececec',
                                      borderRadius: '10px',
                                    }}
                                  />
                                  <p style={{ textAlign: 'center' }}>
                                    {val.ex1}
                                  </p>
                                </>
                              )}
                            </div>
                            <div className="col-lg-4 col-md-12">
                              {val.ex1 && (
                                <>
                                  <img
                                    src={img2}
                                    style={{
                                      border: '0.01em solid #ececec',
                                      borderRadius: '10px',
                                    }}
                                  />
                                  <p style={{ textAlign: 'center' }}>
                                    {val.ex2}
                                  </p>
                                </>
                              )}
                            </div>
                            <div className="col-lg-4 col-md-12">
                              {val.ex1 && (
                                <>
                                  <img
                                    src={img3}
                                    style={{
                                      border: '0.01em solid #ececec',
                                      borderRadius: '10px',
                                    }}
                                  />
                                  <p style={{ textAlign: 'center' }}>
                                    {val.ex3}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })}

                  {/* <ul>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          Python Introduction
                        </span>
                        <div className="courses-meta">
                          <span className="questions">5 questions</span>
                          <span className="duration">01 Hour</span>
                          <span className="status">Preview</span>
                        </div>
                      </a>
                    </li>
                  </ul> */}
                </div>
              </div>

              <div className="courses-reviews">
                <h3>Course Rating</h3>

                {/* <div className="rating">
                  <span className="bx bxs-star checked"></span>
                  <span className="bx bxs-star checked"></span>
                  <span className="bx bxs-star checked"></span>
                  <span className="bx bxs-star checked"></span>
                  <span className="bx bxs-star"></span>
                </div> */}

                <div className="rating-count">
                  <h1 style={{ fontSize: '25px', fontWeight: '600' }}>
                    私が知っている単語
                  </h1>
                </div>

                <div className="row">
                  <div className="side">
                    <div>英検5級</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-5"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>
                      <span className="btn btn-secondary">Quiz</span>
                    </div>
                  </div>
                  <div className="side">
                    <div>英検4級</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-4"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <span className="btn btn-secondary">Quiz</span>
                  </div>
                  <div className="side">
                    <div>英検3級</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-3"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <span className="btn btn-secondary">Quiz</span>
                  </div>
                  <div className="side">
                    <div>英検準2級</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-2"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <span className="btn btn-secondary">Quiz</span>
                  </div>
                  <div className="side">
                    <div>英検2級</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-1"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <span className="btn btn-secondary">Quiz</span>
                  </div>
                  <div className="side">
                    <div>英検準1級</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-1"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <span className="btn btn-secondary">Quiz</span>
                  </div>
                  <div className="side">
                    <div>英検1級</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-1"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <span className="btn btn-secondary">Quiz</span>
                  </div>
                  <div className="side">
                    <div>その他</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-1"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <span className="btn btn-secondary">Quiz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-12">
            {/* <SidebarRight /> */}
            <div className="courses-sidebar-sticky ml-0 pl-0">
              <div className="courses-sidebar-information">
                <div className="btn-box  mb-3 ">
                  <Link href="#">
                    <a className="default-btn">
                      {/* <i className="flaticon-shopping-cart"></i> */}
                      My Vocab
                      <span></span>
                    </a>
                  </Link>
                </div>
                <ul className="info">
                  {myVocaList.map((val2, key2) => {
                    return (
                      <>
                        <li style={{ paddingLeft: 0, marginLeft: 0 }}>
                          <div className="d-flex justify-content-between align-items-left pl-0 ml-0">
                            <span style={{ textAlign: 'left' }}>
                              <FontAwesomeIcon
                                icon={faTrash}
                                size="1x"
                                color="darkorange"
                                className="mr-1"
                                onClick={() => {
                                  handleRegWordDel(val2.autoid)
                                }}
                              />
                              &nbsp; {val2.word}
                              <span>
                                <p style={{ fontSize: '14px' }}>
                                  {val2.form && <>nbsp;[{val2.form}] &nbsp;</>}

                                  {val2.meaning_jp1
                                    ? val2.meaning_jp1
                                    : val2.coreMeaning}
                                </p>
                              </span>
                            </span>
                          </div>
                        </li>
                      </>
                    )
                  })}
                </ul>

                {/* <div className="courses-share">
          <div className="share-info">
            <span>
              Share This Course <i className="flaticon-share"></i>
            </span>

            <ul className="social-link">
              <li>
                <a href="#" className="d-block" target="_blank">
                  <i className="bx bxl-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="d-block" target="_blank">
                  <i className="bx bxl-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" className="d-block" target="_blank">
                  <i className="bx bxl-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="d-block" target="_blank">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div> */}
              </div>
            </div>
          </div>
          <div className="col-lg-1 col-md-12"></div>
        </div>
        {/* </div> */}
      </div>
      <SweetAlert
        title="単語が見つかりません。"
        show={cantFindWord}
        onConfirm={() => SetCantFindWord(false)}
        onCancel={() => {
          SetCantFindWord(false)
        }}
        confirmBtnText="OK"
        // cancelBtnText="OK"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px', backgroundColor: '#afeeee' }}
      >
        <p>単語登録のリクエストが管理者に送信されました。</p>
      </SweetAlert>
    </react.Fragment>
  )
}

export default SingleCourses
