import react, { useState, useEffect } from 'react'
import { ClassNames } from '@emotion/core'
import Modal from 'react-modal'
import ReactAudioPlayer from 'react-audio-player'
export default function App() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [audioUrl, setAudioUrl] = useState('/sound/greatsound1.wav')

  const [audio] = useState(typeof Audio !== 'undefined' && new Audio(audioUrl))

  useEffect(() => {
    openModal()
    audio.play()
  }, [])

  function openModal(word, autoid) {
    // setModalWord(word)
    // setModalWordAutoid(autoid)
    // setViewInsertWord(false)

    setIsOpen(true)
  }
  return (
    <div className="App">
      {/* <button onClick={() => setIsOpen(true)}>Open Modal</button> */}
      <ClassNames>
        {({ css, cx }) => (
          <Modal
            audioUrl={audioUrl}
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            overlayClassName={{
              base: 'overlay-base',
              afterOpen: 'overlay-after',
              beforeClose: 'overlay-before',
            }}
            className={{
              base: 'content-base',
              afterOpen: 'content-after',
              beforeClose: 'content-before',
            }}
            closeTimeoutMS={500}
            portalClassName={css`
              .overlay-base {
                padding: 1rem;
                position: fixed;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0);
                opacity: 0;
                transition-property: background-color, opacity;
                transition-duration: 500ms;
                transition-timing-function: ease-in-out;
                border: 1px solid;
                border-radius: 20px;
                outline: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1;
              }

              .overlay-after {
                background-color: rgba(0, 0, 0, 0.8);
                opacity: 1;
              }

              .overlay-before {
                background-color: rgba(0, 0, 0, 0);
                opacity: 0;
              }

              .content-base {
                position: relative;
                border: 1px solid;
                border-radius: 20px;
                top: auto;
                left: auto;
                right: auto;
                bottom: auto;
                margin: 0 auto;

                outline: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 0%;
                width: 0%;
                background-color: transparent;
                transition-property: background-color, width, height;
                transition-duration: 500ms;
                transition-timing-function: ease-in-out;
              }

              .content-after {
                width: 70%;
                height: 40%;
                background-color: #f1c40f;
              }

              .content-before {
                width: 0%;
                height: 0%;
                background-color: transparent;
              }
            `}
          >
            <div className="row">
              <div
                className="col-lg-12 col-md-12"
                style={{
                  textAlign: 'center',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                }}
              >
                <ReactAudioPlayer
                  src={audioUrl}
                  autoPlay={true}
                  controls
                  style={{ opacity: 100 }}
                  volume={0.3}
                />
                <h1>
                  Congratulation!!!
                  <br />
                  You Got 20 Point!
                </h1>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}>Close Modal</button>
          </Modal>
        )}
      </ClassNames>
    </div>
  )
}
