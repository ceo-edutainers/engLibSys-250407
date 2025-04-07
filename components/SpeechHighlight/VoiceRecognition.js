import React, { useState, useEffect, useRef } from 'react'

// スクリプトを定義
const script = `Jake has dogs named Spot and Big Bess. Bess’s name fits her size. Jake also has two cats. Kit is tan. Fluff is white. kit is smaller than Fluff. “Jake likes cats. Dogs are just okay,” Kit said. Fluff rolled on her back and gave a big smile. “I bet Jake likes dogs best. Let him decide,” said Spot. Just then, Jake came in to get the dogs. “Spot! Big Bess!” Jake yelled. “Let’s toss a ball.”  Spot got his red ball. Bess ran and Spot jumped. Fluff and kit gazed at Jake, Spot, and Big Bess. Kit was sad. “Jake likes dogs best,” said Kit. “Jake will like cats best. I have a plan,” hissed Fluff. (Fluff’s Plan) Kit and Fluff led the dogs to a crack in the wall. Mice liked to hide in it. Fluff and Kit hissed. Fluff stuck her paw inside. Five fast mice ran past. Jake used a trap and got the mice. “Find job!” Jake patted Kit and Fluff. Jake left. The cats grinned. Spot and Big Bess felt bad. “Jake likes cats more than dogs,” said Big Bess. Spot and Big Bess got up to go out back. Then Jake came in. He said, “Spot and Big Bess, you are fun dogs. kit and Fluff, you are fine cats. Let’s sit together.” They all sat. The dogs smiled at the cats. The cats smiled back. Not the cats and dogs are best pals. 
`

const VoiceRecognition = () => {
  const [transcript, setTranscript] = useState('')
  const [highlightedWords, setHighlightedWords] = useState([])
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const recognitionRef = useRef(null)
  const utteranceRef = useRef(null)

  const cleanWord = (word) =>
    word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g, '').toLowerCase()

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
    setHighlightedWords([])
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

  const findMatches = (words, currentWords) => {
    const matches = []
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < currentWords.length; j++) {
        if (cleanWord(words[i]) === cleanWord(currentWords[j])) {
          // Check the words before and after to improve matching accuracy
          if (
            (i === 0 ||
              j === 0 ||
              cleanWord(words[i - 1]) === cleanWord(currentWords[j - 1])) &&
            (i === words.length - 1 ||
              j === currentWords.length - 1 ||
              cleanWord(words[i + 1]) === cleanWord(currentWords[j + 1]))
          ) {
            matches.push(i)
          }
        }
      }
    }
    return matches
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

        const words = script.split(' ')
        const currentWords = currentTranscript.trim().split(' ')

        const newHighlightedWords = findMatches(words, currentWords)
        setHighlightedWords(newHighlightedWords)
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
              color: highlightedWords.includes(index) ? 'red' : 'black',
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
