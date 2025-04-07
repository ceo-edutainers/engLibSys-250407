import React from 'react, react-nextjs-record'
import react, { useStyles } from 'react'
import {
  ShowRecord, //component used to show audio result
  ProcessRecord, //component contains state to deal with logic when recording
} from 'react-record-audio'

export default function App(props) {
  const classes = useStyles()
  const progressClasses = progressStyle()
  let {
    blobURL,
    readyRecording,
    isRecording,
    completeRecording,
    startRecording,
    reStartRecording,
    stopRecording,
    onStop,
  } = ProcessRecord()
  return (
    <>
      <div>
        <div>
          {isRecording && (
            <>
              <div>Recording...</div>
              <div>
                <button onClick={stopRecording}>End record process</button>
              </div>
            </>
          )}
          {completeRecording && (
            <>
              <div>Complete</div>
              <div>
                <div>0:00</div>
                <button onClick={reStartRecording}>Record again</button>
              </div>
            </>
          )}
        </div>
        {readyRecording && <button onClick={startRecording}>Record now</button>}
      </div>
      <div>
        <ShowRecord />
        {/*Only appears when recording process finishes to show result*/}
      </div>
    </>
  )
}
