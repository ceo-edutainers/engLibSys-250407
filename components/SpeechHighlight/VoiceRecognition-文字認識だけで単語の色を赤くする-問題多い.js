import React, { useState, useEffect, useRef } from 'react'

// スクリプトを定義
// const script = `Preparing for the journey Argus the shipbuilder had a dream one night. In his dream, he was in Pagasae, a town on the coast near Iolkos in Thessaly. He was walking along the beach. There was a beautiful big ship in the sea. The name of the ship was the Argo. Then he woke up. 'This is a message from the gods,' he thought. 'I must go to Iolkos immediately.' He got up, got dressed, put his bag on his back and left his house.
//  Jason also had a dream that night. In his dream, Hera told him to go to the city gates in the morning.
//   'A man with a bag on his back will be there,' she said. 'His name is Argus. He will build your ship.
//   ' The next morning Jason went to the city gates. When he saw Argus, he went up to him and said,
//   'I need a ship. A strong ship with fifty oars. Can you build me one?' 'I'll build you a ship,' Argus said.
//   'It will be the strongest and the most beautiful ship in Greece. Its name will be the Argo.' The goddess Athene was at the city gates too.
//    `

const script = `Clip, clip! Matt is sad. Clip, clip! It is good. Matt is glad! `
const VoiceRecognition = () => {
  const [transcript, setTranscript] = useState('')
  const [highlightedIndices, setHighlightedIndices] = useState([])
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const recognitionRef = useRef(null)
  const utteranceRef = useRef(null)

  const startRecognition = () => {
    if (recognitionRef.current && !isRecognizing) {
      try {
        recognitionRef.current.start()
        setIsRecognizing(true)
        setIsPaused(false)
      } catch (error) {
        console.error('Failed to start recognition:', error)
      }
    }
  }

  const togglePauseRecognition = () => {
    if (recognitionRef.current) {
      if (isRecognizing && !isPaused) {
        recognitionRef.current.stop()
        setIsPaused(true)
        setIsRecognizing(false)
      } else if (isPaused) {
        setIsPaused(false)
        startRecognition()
      }
    }
  }

  const stopRecognition = () => {
    if (recognitionRef.current && isRecognizing) {
      recognitionRef.current.stop()
      setIsRecognizing(false)
      setIsPaused(false)
    }
  }

  const resetRecognition = () => {
    stopRecognition()
    setTranscript('')
    setHighlightedIndices([])
    startRecognition()
  }

  const handleReadAloud = () => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel()
    }
    const utterance = new SpeechSynthesisUtterance(script)
    utterance.lang = 'en-US'
    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const handleShadowing = () => {
    handleReadAloud()
    startRecognition()
  }

  const pauseSpeech = () => {
    window.speechSynthesis.pause()
    setIsPaused(true)
  }

  const resumeSpeech = () => {
    window.speechSynthesis.resume()
    setIsPaused(false)
  }

  const stopSpeech = () => {
    window.speechSynthesis.cancel()
    setIsPaused(false)
  }

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('')

        setTranscript(currentTranscript)

        const words = script
          .split(' ')
          .map((word) => word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''))
        const currentWords = currentTranscript
          .trim()
          .split(' ')
          .map((word) => word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''))
        const newHighlightedIndices = []

        currentWords.forEach((currentWord, index) => {
          const scriptIndex = words.findIndex(
            (word) => word.toLowerCase() === currentWord.toLowerCase()
          )
          if (
            scriptIndex !== -1 &&
            !newHighlightedIndices.includes(scriptIndex)
          ) {
            newHighlightedIndices.push(scriptIndex)
          }
        })

        setHighlightedIndices(newHighlightedIndices)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error detected: ' + event.error)
      }

      recognitionRef.current.onstart = () => {
        console.log('Speech recognition service has started')
      }

      recognitionRef.current.onend = () => {
        console.log('Speech recognition service disconnected')
        if (!isPaused) {
          setIsRecognizing(false)
        }
      }

      startRecognition()
    } else {
      console.log('Web Speech API is not supported in this browser.')
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (utteranceRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Voice Recognition Demo</h1>
      <p style={{ maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
        {script.split(' ').map((word, index) => (
          <span
            key={index}
            style={{
              color: highlightedIndices.includes(index) ? 'red' : 'black',
            }}
          >
            {word}{' '}
          </span>
        ))}
      </p>
      <p>
        <strong>Transcript:</strong> {transcript}
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        <button
          onClick={startRecognition}
          disabled={isRecognizing && !isPaused}
        >
          Start
        </button>
        <button
          onClick={togglePauseRecognition}
          disabled={!isRecognizing && !isPaused}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={stopRecognition}
          disabled={!isRecognizing && !isPaused}
        >
          Stop
        </button>
        <button onClick={resetRecognition}>Reset</button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        <button onClick={handleReadAloud}>読み始める</button>
        <button onClick={handleShadowing}>シャドーイング</button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        <button onClick={pauseSpeech}>Pause</button>
        <button onClick={resumeSpeech}>Resume</button>
        <button onClick={stopSpeech}>Stop</button>
      </div>
    </div>
  )
}

export default VoiceRecognition
