import React, { useState, useEffect, useRef } from 'react'

// スクリプトを定義
const script = `Preparing for the journey Argus the shipbuilder had a dream one night.`

const VoiceRecognition = () => {
  const [transcript, setTranscript] = useState('')
  const [highlightedIndices, setHighlightedIndices] = useState([])
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const recognitionRef = useRef(null)

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

  useEffect(() => {
    // ブラウザがWeb Speech APIをサポートしているか確認
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

        // スクリプト内の単語と一致する単語をハイライト
        const words = script
          .toLowerCase()
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
          .split(/\s+/)
        const currentWords = currentTranscript
          .toLowerCase()
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
          .split(/\s+/)

        const newHighlightedIndices = []

        let wordIndex = 0
        currentWords.forEach((currentWord) => {
          for (let i = wordIndex; i < words.length; i++) {
            if (words[i] === currentWord) {
              newHighlightedIndices.push(i)
              wordIndex = i + 1
              break
            }
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
    }
  }, [])

  return (
    <div>
      <h1>Voice Recognition Demo</h1>
      <p>
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
      <button onClick={startRecognition} disabled={isRecognizing && !isPaused}>
        Start
      </button>
      <button
        onClick={togglePauseRecognition}
        disabled={!isRecognizing && !isPaused}
      >
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <button onClick={stopRecognition} disabled={!isRecognizing && !isPaused}>
        Stop
      </button>
      <button onClick={resetRecognition}>Reset</button>
    </div>
  )
}

export default VoiceRecognition
