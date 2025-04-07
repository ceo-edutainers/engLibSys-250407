import React from 'react'
import 'regenerator-runtime/runtime'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/

const SpeechToText2 = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  )
}
export default SpeechToText2
