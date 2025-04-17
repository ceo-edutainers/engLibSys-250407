import React, { useState } from 'react'
import axios from 'axios'

function PollyTest() {
  const [text, setText] = useState('')
  const [audioUrl, setAudioUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSynthesize = async () => {
    if (!text) {
      alert('Please enter some text!')
      return
    }

    setLoading(true)

    try {
      // const response = await axios.post(
      //   'http://localhost:5001/synthesize',
      //   {
      //     text,
      //     voiceId: 'Joanna', // 선택적으로 다른 음성 ID를 사용할 수 있음
      //   },
      //   {
      //     responseType: 'arraybuffer', // 서버에서 오디오 파일을 binary로 받을 때 필요
      //   }
      // )

      const response = await axios.post(
        'http://localhost:3001/synthesize',
        {
          // text: 'Hello, this is a test',
          text,
          voiceId: 'Joanna', // 유효한 VoiceId를 지정
        },
        {
          responseType: 'arraybuffer', // 서버에서 오디오 파일을 binary로 받을 때 필요
        }
      )

      // 서버에서 받은 binary 데이터를 Blob으로 변환
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)

      setAudioUrl(audioUrl)
    } catch (error) {
      console.error('Error synthesizing speech:', error)
      alert('Failed to synthesize speech. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Amazon Polly Test</h2>
      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to synthesize"
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button
        onClick={handleSynthesize}
        disabled={loading}
        style={{ padding: '10px 20px' }}
      >
        {loading ? 'Loading...' : 'Synthesize'}
      </button>

      {audioUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Generated Audio:</h3>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  )
}

export default PollyTest
