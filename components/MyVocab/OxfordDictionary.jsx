import { React, useState } from 'react'
import axios from 'axios'

import { FaSearch } from 'react-icons/fa'
import { FcSpeaker } from 'react-icons/fc'
function App() {
  // Setting up the initial states using react hook 'useState'
  const [data, setData] = useState('')
  const [searchWord, setSearchWord] = useState('')
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
    <div className="App">
      <h1>Free Dictionary</h1>
      <div className="searchBox">
        // Taking user input
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchWord(e.target.value)
          }}
        />
        <button
          onClick={() => {
            getMeaning()
          }}
        >
          <FaSearch size="20px" />
        </button>
      </div>
      {data && (
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
          <h4>Parts of speech:</h4>

          <p>{data.meanings[0].partOfSpeech}</p>

          <h4>Definition:</h4>

          <p>{data.meanings[0].definitions[0].definition}</p>

          <h4>Example:</h4>

          <p>{data.meanings[0].definitions[0].example}</p>

          {data && (
            <div className="dictionaryBox pb-3">
              <h6>
                <FontAwesomeIcon icon={faDotCircle} size="1x" color="black" />
                &nbsp; Oxford Dictionary
              </h6>
              <hr />
              <p>{data.meanings[0].partOfSpeech}</p>
              <h4>Definition:</h4>
              <p>count:{data.meanings[0].definitions.length}</p>
              {/* {data.meanings[0].definitions.length == 1 && (
                        <p>{data.meanings[0].definitions[0].definition}</p>
                      )} */}
              meaning-count:{data.meanings.length}
              <br />
              {data.meanings.map((val1, key1) => {
                {
                  data.meanings[key1].definitions.map((val, key) => {
                    return (
                      <>
                        count2:{data.meanings[key1].definitions.length}
                        {key + 1}.[{data.meanings[key1].partOfSpeech}]
                        {data.meanings[key1].definitions[key].definition}
                        <br />
                      </>
                    )
                  })
                }
              })}
              {data.meanings[0].definitions.map((val, key) => {
                return (
                  <>
                    {key + 1}.[{data.meanings[0].partOfSpeech}]
                    {data.meanings[0].definitions[key].definition}
                    <br />
                  </>
                )
              })}
              <p>{data.meanings[0].definitions[0].definition}</p>
              <h4>Example:</h4>
              <p>{data.meanings[0].definitions[0].example}</p>
              <hr />
              [米/英]{data.phonetics[0].text}
              {/* {data.phonetics.length == 2 && (
                        <>
                          [米]{data.phonetics[1].text}&nbsp;/&nbsp;[英]
                          {data.phonetics[0].text}
                        </>
                      )}
                      {data.phonetics.length == 1 && (
                        <>[米/英]{data.phonetics[0].text}</>
                      )} */}
              <hr />
              <h1 style={{ fontSize: '21px', fontWeight: '800' }}>
                <FontAwesomeIcon
                  icon={faAssistiveListeningSystems}
                  size="1x"
                  color="black"
                />
                {/* &nbsp;&nbsp;{searchWord} */}
                &nbsp;&nbsp;{data.word}
                <span
                  onClick={() => {
                    playAudio()
                  }}
                >
                  <FcSpeaker size="26px" />
                </span>
              </h1>
              <p
                style={{
                  color: '#808B96',
                  fontStyle: 'italic',
                  marginLeft: '30px',
                  fontSize: '12px',
                }}
              >
                {data.meanings[0].partOfSpeech}
                <br />
                {data.meanings[0].definitions[0].definition}
              </p>
              <p style={{ color: '#2C3E50', marginLeft: '20px' }}>
                <b>英英</b>&nbsp;&nbsp;
                {/* {data.meanings.map((val, key) => {
                          return <>{val.definitions[key]}</>
                        })} */}
                {/* {data.meanings[0].definitions[0].definition}
                        <br />
                        {data.meanings[0].definitions[1].definition} */}
              </p>
              <p style={{ color: '#2C3E50', marginLeft: '20px' }}>
                <b>英日</b>&nbsp;&nbsp;
              </p>
              <p style={{ color: '#2C3E50', marginLeft: '20px' }}>
                <b>例</b>&nbsp;&nbsp;
                {data.meanings[0].definitions[0].example}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default App
