import { OpenInFull } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'

const Stopwatch = ({ watchStatus }) => {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  useEffect(() => {
    let interval
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else if (!running) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [running])

  useEffect(() => {
    if (watchStatus == 'start') {
      setRunning(true)
    } else if (watchStatus == 'stop') {
      setRunning(false)
    } else if (watchStatus == 'restart') {
      setTime(0)
      setRunning(true)
    }
  }, [watchStatus])

  return (
    <div className="stopwatch">
      <div className="numbers">
        <h2>
          {/* <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span> */}
          <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
        </h2>
      </div>
      {/* <div className="buttons">
        <span className="btn btn-primary mr-2" onClick={() => setRunning(true)}>
          Start
        </span>
        <span
          className="btn btn-primary mr-2"
          onClick={() => setRunning(false)}
        >
          Stop
        </span>
        <span className="btn btn-primary" onClick={() => setTime(0)}>
          Reset
        </span>
      </div> */}
    </div>
  )
}

export default Stopwatch
