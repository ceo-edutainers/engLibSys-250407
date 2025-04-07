import React, { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'

function YouTubePlayer() {
  const [playing, setPlaying] = useState(true)
  const playerRef = useRef(null)

  // 정확한 시작 시간 및 종료 시간 (밀리초 단위)
  // const startTime = 3.236 // 초 단위
  // const endTime = 4.437 // 초 단위
  const [startTime, setStartTime] = useState(3.236)
  const [endTime, setEndTime] = useState(4.437)

  // 비디오가 준비되면 시작 시간으로 이동
  useEffect(() => {
    const seekToStart = () => {
      if (playerRef.current) {
        playerRef.current.seekTo(startTime)
      }
    }

    if (playerRef.current) {
      seekToStart()
    }

    // 종료 시간에 도달하면 비디오를 멈춤
    const interval = setInterval(() => {
      if (playerRef.current) {
        const playedSeconds = playerRef.current.getCurrentTime()
        if (playedSeconds >= endTime) {
          setPlaying(false)
          setStartTime()
          setEndTime()
          clearInterval(interval)
        }
      }
    }, 100) // 0.1초 간격으로 시간 확인

    return () => clearInterval(interval)
  }, [playing, endTime, startTime])

  //when play button click
  const toggleVideoPlay = (startT, endT) => {
    // setPlaying(!playing) // 현재 재생 상태를 반전시킵니다.
    setPlaying(true)
    setStartTime(startT)
    setEndTime(endT)
  }
  return (
    <div>
      <hr />
      <ReactPlayer
        ref={playerRef}
        url="https://www.youtube.com/watch?v=X3uT89xoKuc"
        playing={playing}
        controls={true}
        onReady={() => setPlaying(true)}
      />
      <button
        onClick={() => {
          toggleVideoPlay(3.236, 4.437)
        }}
      >
        {playing ? 'Pause' : 'Play'} Video
      </button>
    </div>
  )
}

export default YouTubePlayer
