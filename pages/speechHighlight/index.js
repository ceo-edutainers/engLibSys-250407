// pages/index.js

import React from 'react'

import VoiceRecognition from '@/components/SpeechHighlight/VoiceRecognition'

//文字認識だけでsun難語の色を赤くするー色が変わらない時が多い。
// import VoiceRecognition from '@/components/SpeechHighlight/VoiceRecognition2'

const Home = () => {
  return (
    <div>
      <VoiceRecognition />
    </div>
  )
}

export default Home
