import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

const SpeechToText = ({ mbn, isrecording }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  //for VoiceRecorderToS3ForSelfLessonPage Only START
  if (isrecording == true) {
    useEffect(() => {
      // alert(isrecording)
      SpeechRecognition.startListening
    }, [])
  }
  if (!isrecording) {
    useEffect(() => {
      // alert(isrecording)
      SpeechRecognition.stopListening
    }, [])
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
export default SpeechToText
