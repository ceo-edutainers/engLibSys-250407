import React, { useContext, useEffect, useState } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
const IdeaBox = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [mindmapView, setMindmapView] = useState(false) //IdeaView
  const [ideaBoxList, setIdeaBoxList] = useState([])

  useEffect(() => {
    // var Url = DB_CONN_URL + '/get-hw-show-and-tell-idea-box'
    var Url = DB_CONN_URL + '/get-hw-show-and-tell-idea-box'
    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setIdeaBoxList(response.data)

        //setAudioDurtaionFromDB(response.data[0].audioDuration)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <span style={{ cursor: 'pointer' }}>
        <h5
          style={{
            // width: '100%',
            width: '100',
            fontSize: '18px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#F9EBEA',
            marginTop: '20px',
            marginBottom: '15px',
            color: 'black',
            fontWeight: '600',
            border: '1px solid #FCD2CF',
          }}
          onClick={() => {
            setMindmapView(!mindmapView)
          }}
        >
          <img
            src="/images/icon-mouseclick.png"
            style={{ height: '40px', width: 'auto' }}
          />
          トピックアイディアボックスを
          {mindmapView ? '隠す' : '見る'}
          <p>Topicがまだ決まってない場合、アイディアボックスを見てみよう！</p>
        </h5>
      </span>
      <div
        className="col-lg-12 col-md-12"
        style={{ display: mindmapView ? 'block' : 'none' }}
      >
        {ideaBoxList.map((val, key) => {
          return (
            <>
              <div
                className="col-lg-12 col-md-12"
                style={{ textAlign: 'left' }}
              >
                <span>
                  <b>{val.bigCat}</b>
                </span>
                <span>{val.title}</span>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default IdeaBox
