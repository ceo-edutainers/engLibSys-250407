import { useState, useEffect } from 'react'
import { toWords } from 'number-to-words'
import HearingIcon from '@mui/icons-material/Hearing'

// applyWordCorrections 함수 정의 (컴포넌트 외부)
const applyWordCorrections = (recognizedText) => {
  const corrections = {
    hair: 'Hare', // 잘못된 단어 -> 올바른 단어
    fairy: 'fair',
    goats: "Goat's",
  }

  let correctedText = recognizedText
  Object.keys(corrections).forEach((wrongWord) => {
    const regex = new RegExp(`\\b${wrongWord}\\b`, 'gi') // 단어 전체를 대소문자 구분 없이 매칭
    correctedText = correctedText.replace(regex, corrections[wrongWord])
  })

  return correctedText
}

const speakSentence = (sentence) => {
  // 현재 재생 중인 소리 멈춤
  speechSynthesis.cancel()

  // 새 문장 재생
  const utterance = new SpeechSynthesisUtterance(sentence)
  speechSynthesis.speak(utterance)
}

const wordToNumber = (word) => {
  const correctWords = {
    hair: 'hare', // 교정 대상 단어
  }

  const wordsToNumbers = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
  }
  return wordsToNumbers[word.toLowerCase()] ?? word
}

// const normalizeNumbers = (text) => {
//   if (!text || typeof text !== 'string') {
//     console.error('normalizeNumbers: text is undefined or invalid', text)
//     return ''
//   }

//   return text
//     .split(' ')
//     .map((word) => {
//       if (!isNaN(word)) {
//         return toWords(Number(word))
//       }
//       return wordToNumber(word)
//     })
//     .join(' ')
// }

const normalizeNumbers = (text) => {
  if (!text || typeof text !== 'string') {
    console.error('normalizeNumbers: text is undefined or invalid', text)
    return ''
  }

  return text
    .split(' ')
    .map((word) => {
      // 숫자인 경우 단어로 변환
      if (!isNaN(word)) {
        return toWords(Number(word)) // 예: 3 -> "three"
      }
      // 단어가 숫자 텍스트인 경우 숫자로 변환
      const wordsToNumbers = {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        twelve: 12,
        thirteen: 13,
        fourteen: 14,
        fifteen: 15,
        sixteen: 16,
        seventeen: 17,
        eighteen: 18,
        nineteen: 19,
        twenty: 20,
      }

      return wordsToNumbers[word.toLowerCase()] ?? word
    })
    .join(' ')
}

const playSound = (sound) => {
  const audio = new Audio(sound)
  audio.play()
}

const normalizeText = (text) => {
  const contractions = {
    "i'm": 'i am',
    "you're": 'you are',
    "he's": 'he is',
    "she's": 'she is',
    "it's": 'it is',
    "we're": 'we are',
    "they're": 'they are',
    "i'll": 'i will',
    "you'll": 'you will',
    "he'll": 'he will',
    "she'll": 'she will',
    "it'll": 'it will',
    "we'll": 'we will',
    "they'll": 'they will',
    "i've": 'i have',
    "you've": 'you have',
    "we've": 'we have',
    "they've": 'they have',
    "isn't": 'is not',
    "aren't": 'are not',
    "wasn't": 'was not',
    "weren't": 'were not',
    "can't": 'cannot',
    "couldn't": 'could not',
    "don't": 'do not',
    "doesn't": 'does not',
    "didn't": 'did not',
    "won't": 'will not',
    "wouldn't": 'would not',
    "shouldn't": 'should not',
    "mightn't": 'might not',
    "mustn't": 'must not',
    "let's": 'let us',
  }

  let normalized = text.toLowerCase()

  Object.keys(contractions).forEach((key) => {
    const regex = new RegExp(`\\b${key}\\b`, 'g')
    normalized = normalized.replace(regex, contractions[key])
  })

  normalized = normalized
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"]/g, '')
    .replace(/["“”‘’]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return normalized
}

const story = `
“What will I make for the fair?" Hare asked herself. She looked at Goat's rug. "That is nice, Goat," said Hare. "I will make a picture of it. Maybe then I will get an idea."
Hare hopped home and hung her picture. Then she sat in a chair and stared at it. "I hope I will get an idea," said Hare. But she did not.Then she told the news. “In three weeks we will hold an Art and Craft Fair!" yelled Hare. Hare blew her horn. 
`

const sentences = story.match(/[^.!?]+[.!?]/g)

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

  const speakSentence = (sentence) => {
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

    // // 음성 인식 결과에 교정 로직 적용
    // const correctedRecognized = applyWordCorrections(
    //   normalizeNumbers(normalizeText(spokenText))
    // )

    // 1. 음성 인식 결과에 교정 로직 적용
    const correctedRecognized = applyWordCorrections(
      normalizeNumbers(normalizeText(spokenText)),
      normalizeText(spokenText) // 대소문자 및 구두점 제거
    )

    // 2. recognizedText를 교정된 텍스트로 업데이트
    setRecognizedText(correctedRecognized)

    // 3. 원문 문장을 정규화
    const normalizedSentence = normalizeText(sentences[currentIndex])

    console.log('test-Recognized (corrected):', correctedRecognized)
    console.log('test-Expected (normalized):', normalizedSentence)

    // 4. 교정된 텍스트와 원문 비교 (소문자로 변환하여 비교)
    if (
      correctedRecognized.toLowerCase() === normalizedSentence.toLowerCase()
    ) {
      setIsCorrect(true)
      setMismatchedText(null)
      playSound('/sound/correct.mp3')
    } else {
      setIsCorrect(false)

      // 틀린 단어 강조 처리
      const recognizedWords = correctedRecognized.split(' ')
      const originalWords = normalizedSentence.split(' ')
      const highlightedText = originalWords.map((word, index) => {
        if (
          recognizedWords[index]?.toLowerCase() !== word.toLowerCase() // 대소문자 무시 비교
        ) {
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

  // const nextSentence = () => {
  //   if (currentIndex < sentences.length - 1) {
  //     setCurrentIndex(currentIndex + 1)
  //     setIsCorrect(false)
  //     setRecognizedText('')
  //     setMismatchedText(null)
  //     setAttempts(0)
  //     setIsTyping(false)
  //   }
  // }

  const nextSentence = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsCorrect(false)
      setRecognizedText('')
      setMismatchedText(null)
      setAttempts(0)
      setIsTyping(false)
    } else {
      // 마지막 문장일 경우 동작 설정
      alert('You have reached the end of the story!')
    }
  }

  const restartStory = () => {
    setCurrentIndex(0)
    setIsCorrect(false)
    setRecognizedText('')
    setMismatchedText(null)
    setAttempts(0)
    setIsTyping(false)
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
              // backgroundColor: 'transparent',
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

      {/* <strong>My Voice:</strong>  */}

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

      {isCorrect && <p style={{ color: 'green' }}>Correct! 🎉</p>}
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
      {/* <button
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
      </button> */}
      {/* <button
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
        {currentIndex < sentences.length - 1 ? 'Next Sentence' : 'END'}
      </button> */}
      {currentIndex < sentences.length - 1 ? (
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
      ) : (
        <>
          <button
            onClick={restartStory}
            style={{
              padding: '10px',
              marginTop: '20px',
              backgroundColor: '#FF5722',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Restart
          </button>
          <button
            onClick={nextSentence}
            style={{
              padding: '10px',
              marginTop: '20px',
              backgroundColor: '#9E9E9E',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            END
          </button>
        </>
      )}
    </div>
  )
}
