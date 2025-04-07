import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'

//const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
const YOUTUBE_API_KEY = 'AIzaSyCuAz_--w8caZEqa6d9ObKUR50Wc7gr5xs'
export default function App() {
  const [videos, setVideos] = useState([])
  const [videos2, setVideos2] = useState()
  const [keyword, setKeyword] = useState('Create-React-APP')
  // const ReactPlayer_youtubeFrame = 'https://www.youtube.com/watch?v='
  //test-YVfyYrEmzgM
  useEffect(() => {
    //const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${keyword}&maxResults=3&key=${YOUTUBE_API_KEY}`
    //const url = `https://video.google.com/timedtext?type=track&v=YVfyYrEmzgM&id=0&lang=en&key=${YOUTUBE_API_KEY}`
    const url = `https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.captions.list?part=snippet&videoId=PRU2ShMzQRg&key=${YOUTUBE_API_KEY}`
    https: axios
      .get(url)
      .then((response) => {
        //setVideos(response.data.items)
        setVideos2(response.data)
        // console.log(response.data.items)
      })
      .catch(() => {
        console.log('通信に失敗しました')
      })
  }, [])

  return (
    <div>
      {/* {videos.map((val, key) => {
        var url = 'https://www.youtube.com/watch?v=' + `${val.id.videoId}`

        return (
          <div>
            youtube:{val.id.videoId} <br />
            {/* Channel-title:{val.snippet.channelTitle} */}
      {/* <br /> */}
      {/* title:{val.snippet.title} */}
      {/* <br /> */}
      {/* detail:{val.snippet.description} */}
      {/* <br /> */}
      {/* script:{val.kind.video} */}
      {/* {val.id.captions} */}
      {/* <ReactPlayer url={url} /> */}
      {/* </div> */}
      {/* )
        })} */}
    </div>
  )
}
