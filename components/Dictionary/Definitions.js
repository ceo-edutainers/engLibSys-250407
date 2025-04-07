import React from 'react'
// import './Definitions.css'
import ReactAudioPlayer from 'react-audio-player'
const Definitions = ({ meanings, word, LightTheme, category }) => {
  var url = meanings[0].phonetics[0].audio
  return (
    <>
      {url != '' && (
        <div>
          <ReactAudioPlayer
            src={url}
            controls
            style={{
              padding: '0px',
              width: '50%',
              height: '70px',
              borderRadius: '10px',
            }}
          />
        </div>
      )}
      <div
        className="meanings"
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll',
          scrollbarWidth: 'thin',
          height: '55vh',
          border: '10px solid rgb(105, 105, 105)',
          borderRadius: '10px',
          padding: '10px 20px',
          overflowX: 'hidden',
        }}
      >
        {word === '' ? (
          <span
            className="subTitle"
            style={{ fontSize: '5vw', fontFamily: "'Montserrat', sans-serif" }}
          >
            Start by typing a word in search
          </span>
        ) : (
          meanings.map((mean) =>
            mean.meanings.map((item) =>
              item.definitions.map((def) => (
                <div
                  className="singleMean"
                  style={{
                    backgroundColor: LightTheme ? '#3b5360' : 'white',
                    color: LightTheme ? 'white' : 'black',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    margin: '10px 0',
                  }}
                >
                  <b>{def.definition}</b>
                  <hr style={{ backgroundColor: 'black', width: '100%' }} />
                  {def.example && (
                    <span>
                      <b>Example</b>[例]: {def.example}
                    </span>
                  )}
                  {def.synonyms && (
                    <span>
                      <b>Synonyms</b>[類語]: {def.synonyms.map((s) => `${s}, `)}
                    </span>
                  )}
                  {def.antonyms && (
                    <span>
                      <b>Antonyms</b>[反対語]:
                      {def.antonyms.map((s) => `${s}, `)}
                    </span>
                  )}
                </div>
              ))
            )
          )
        )}
      </div>
    </>
  )
}

export default Definitions
