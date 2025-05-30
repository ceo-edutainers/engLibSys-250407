import React from 'react'

var video = 'https://www.youtube.com/embed/1vB0gFi8uow'
const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading ...</div>
  }

  //const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`

  console.log(typeof video)
  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  )
}

export default VideoDetail
