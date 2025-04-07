import RecorderControls from '@/components/VoiceRecorder/recorder-controls'
import RecordingsList from '@/components/VoiceRecorder/recordings-list'
import useRecorder from '/hooks/useRecorder'

export default function App() {
  const { recorderState, ...handlers } = useRecorder()
  const { audio } = recorderState

  return (
    <section className="voice-recorder">
      <h1 className="title">Voice Recorder</h1>
      <div className="recorder-container">
        <RecorderControls recorderState={recorderState} handlers={handlers} />
        <RecordingsList audio={audio} />
      </div>
    </section>
  )
}
