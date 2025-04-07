// import React, { useEffect, Component } from 'react'
// import {
//   YoutubeCaptions,
//   getSubtitles,
//   getSubtitlesContent,
// } from 'youtube-captions-scraper'

// //Get Subtitles for Video
// getSubtitles({
//   videoID: 'YVfyYrEmzgM', // youtube video id
//   lang: 'en', // default: `en`
// }).then((captions) => {
//   console.log(captions)
// })

// //Get full transcription as one string
// //const subtitles = getSubtitlesContent({ videoID: 'YVfyYrEmzgM' })

// //let youtubeCaptions = new YoutubeCaptions('YVfyYrEmzgM' /*youtube video id*/)

// //retrieve caption tracks
// let captionTracks = youtubeCaptions.getCaptionTracks()

// //retrieve subtitles by language
// //let subtitles = youtubeCaptions.getSubtitles('en' /*optional language*/)

// export default function Youtube() {
//   return <div>{captionTracks}</div>
// }

var getYoutubeSubtitles = require('@joegesualdo/get-youtube-subtitles-node')

let videoId = 'YVfyYrEmzgM'

getYoutubeSubtitles(videoId, { type: 'nonauto' })
  .then((subtitles) => {
    console.log(subtitles)
  })
  .catch((err) => {
    console.log(err)
  })
