// CSS myVocab.css
import React, { useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import { VocaContext } from '@/components/MyVocab/Contexts'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router'
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
  faKeyboard,
} from '@fortawesome/free-solid-svg-icons'

function App() {
  const { myMbn, setMyMbn, userName, setUserName, searchWord, setSearchWord } =
    useContext(VocaContext)
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const inputRef = useRef()
  const [vocaSearchView, setVocaSearchView] = useState(false)

  const router = useRouter() //使い方：router.replace('/')

  //今日がレッスン日なのかをチェック

  let logOut = () => {
    // setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
    localStorage.removeItem('userName', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginGroup')
  }

  //Oxford Dictionary
  // Setting up the initial states using react hook 'useState'
  const [data, setData] = useState('')
  // const [searchWord, setSearchWord] = useState('')
  // Function to fetch information on button
  // click, and set the data accordingly
  function getMeaning() {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`)
      .then((response) => {
        setData(response.data[0])
      })
  }
  // Function to play and listen the
  // phonetics of the searched word
  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio)
    audio.play()
  }

  return (
    <React.Fragment>
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
                )}
              />
              {/* <div>
                <div className="">{vocaSearchView && <>ここを見せる</>}</div>
              </div> */}
            </div>
            <div
              className="filterButton col-lg-1 col-md-12 m-0 p-0"
              style={{ textAlign: 'left' }}
            >
              <button
                onClick={() => {
                  getMeaning()
                }}
              ></button>
              {/* <input className="filterButton" placeholder="filter" /> */}
            </div>
            <div
              className="col-lg-3 col-md-12"
              style={{ textAlign: 'right' }}
            ></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
