import { useState, useEffect } from 'react'
import HearingIcon from '@mui/icons-material/Hearing'

export default function StoryPractice() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [recognizedText, setRecognizedText] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [mismatchedText, setMismatchedText] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [userTypedText, setUserTypedText] = useState('')
  const [hideSentence, setHideSentence] = useState(false) // 문장 숨김 상태

  const sentences = [
    'This is the first sentence.',
    "Let's practice shadowing.",
    "Keep going, you're doing great!",
  ]

  const speakSentence = (sentence) => {
    // 현재 재생 중인 소리 멈춤
    speechSynthesis.cancel()

    // 새 문장 재생
    const utterance = new SpeechSynthesisUtterance(sentence)
    speechSynthesis.speak(utterance)
  }

  const startRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert(
        'Speech Recognition API is not supported in this browser. Please use Google Chrome.'
      )
      return
    }

    setHideSentence(true) // 문장 숨기기
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = true

    setIsSpeaking(true)
    setRecognizedText('')
    setMismatchedText(null)

    recognition.start()

    recognition.onresult = (event) => {
      const finalTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ')
      setRecognizedText(finalTranscript)

      if (event.results[0].isFinal) {
        const finalResult = event.results[0][0].transcript
        checkAnswer(finalResult)
        setIsSpeaking(false)
        setHideSentence(false) // 문장 다시 표시
      }
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsSpeaking(false)
      setHideSentence(false) // 문장 다시 표시
    }

    recognition.onend = () => {
      setIsSpeaking(false)
      setAttempts((prev) => prev + 1)
      if (attempts >= 4) setIsTyping(true)
      setHideSentence(false) // 문장 다시 표시
    }
  }

  const checkAnswer = (spokenText) => {
    if (!spokenText) {
      console.error('checkAnswer: spokenText is undefined or null')
      return
    }

    const correctedRecognized = applyWordCorrections(
      normalizeNumbers(normalizeText(spokenText))
    )

    setRecognizedText(correctedRecognized)

    const normalizedSentence = normalizeNumbers(
      normalizeText(sentences[currentIndex])
    )

    console.log('test-Recognized (corrected):', correctedRecognized)
    console.log('test-Expected (normalized):', normalizedSentence)

    if (
      correctedRecognized.toLowerCase() === normalizedSentence.toLowerCase()
    ) {
      setIsCorrect(true)
      setMismatchedText(null)
      playSound('/sound/correct.mp3')

      // 일정 시간 후 정답 메시지 숨김
      setTimeout(() => {
        setIsCorrect(false)
      }, 1500) // 1.5초 동안 표시
    } else {
      setIsCorrect(false)

      const recognizedWords = correctedRecognized.split(' ')
      const originalWords = normalizedSentence.split(' ')
      const highlightedText = originalWords.map((word, index) => {
        if (recognizedWords[index]?.toLowerCase() !== word.toLowerCase()) {
          return (
            <span key={index} style={{ color: 'red' }}>
              {word}{' '}
            </span>
          )
        }
        return <span key={index}>{word} </span>
      })

      setMismatchedText(highlightedText)
      playSound('/sound/error.mp3')
    }
  }

  const handleTypingSubmit = () => {
    checkAnswer(userTypedText)
    setUserTypedText('')
  }

  const nextSentence = () => {
    // 현재 재생 중인 TTS 멈춤
    speechSynthesis.cancel()

    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsCorrect(false)
      setRecognizedText('')
      setMismatchedText(null)
      setAttempts(0)
      setIsTyping(false)

      // 새 문장 재생
      speakSentence(sentences[currentIndex + 1])
    }
  }

  useEffect(() => {
    speakSentence(sentences[currentIndex])
  }, [currentIndex])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h4 className="mb-3">センテンスを聞いて真似しましょう！</h4>
      <p>
        何回も聞いて練習しましょう！練習が終わったら「Speak」ボタンを押し、完璧に再現しましょう！
      </p>
      {!hideSentence && (
        <p>
          <span
            onClick={() => speakSentence(sentences[currentIndex])}
            style={{
              padding: '20px',
              margin: '10px',
              backgroundColor: 'blue',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            <HearingIcon style={{ color: '#2196F3', fontSize: '30px' }} />
          </span>

          <span style={{ fontSize: '20px' }}>{sentences[currentIndex]} </span>
        </p>
      )}

      <p className="mt-5" style={{ fontSize: '20px' }}>
        {' '}
        <span
          className="ml-2"
          onClick={startRecognition}
          style={{
            padding: '20px',
            margin: '10px',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          {isSpeaking ? 'Speaking...' : 'Speak'}
        </span>
        {recognizedText}
      </p>

      {isCorrect && (
        <p
          style={{
            color: 'green',
            fontSize: '18px',
            transition: 'opacity 0.5s',
          }}
        >
          Correct! 🎉
        </p>
      )}
      {!isCorrect && mismatchedText && (
        <p style={{ color: 'red' }}>{mismatchedText}</p>
      )}

      {attempts >= 5 && isTyping && (
        <div style={{ marginTop: '20px' }}>
          <textarea
            value={userTypedText}
            onChange={(e) => setUserTypedText(e.target.value)}
            placeholder="Type here...聞こえた文書を書いてみましょう。"
            rows="3"
            style={{ width: '100%', margin: '10px 0', padding: '10px' }}
          />
          <button
            onClick={handleTypingSubmit}
            style={{
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Compare
          </button>
        </div>
      )}
      <button
        onClick={nextSentence}
        style={{
          padding: '10px',
          marginTop: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Next Sentence
      </button>
    </div>
  )
}
