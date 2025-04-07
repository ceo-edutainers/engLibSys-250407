import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'

export default function ReadingStudentWorkBox({ youtubeID, homework_id }) {
  const [multiQuestion, setMultiQuestion] = useState([])

  //for Calendar Handling
  const onDayClick = (e, day) => {
    //alert(day)
  }
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    multipleQuestion()
  }, [])

  function multipleQuestion() {
    console.log('youtubeID', youtubeID)

    axios
      .post(DB_CONN_URL + '/get-member-discuss-multiple-question/', {
        youtubeID: youtubeID,
        homework_id: homework_id,
      })
      .then((response) => {
        if (!response.data.status) {
          alert(response.data.message) //for test
        } else {
          setMultiQuestion(response.data.response)
        }
      })
  }

  return (
    <div
      className="box"
      style={{
        margin: 0,
        backgroundColor: '#fdf8f1',
        paddingLeft: '10px',
        paddingRight: '10px',
        border: '2px solid #darkgray',
        // borderRadius: '25px',
      }}
    >
      <article className="media">
        <div className="media-center"></div>
        <div className="media-content">
          <div
            className="content text-center"
            style={{ paddingTop: '10px', textAlign: 'center' }}
          >
            <h6 style={{ fontWeight: '900' }}>
              This Week's Ranking
              <p style={{ fontWeight: '900', color: 'red', fontSize: '20px' }}>
                &nbsp;10位
              </p>
            </h6>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fa fa-reply" />
                </span>
              </a>
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fa fa-retweet" />
                </span>
              </a>
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fa fa-heart" />
                </span>
              </a>
            </div>
          </nav>
          <div style={{ marginBottom: '15px' }}></div>
        </div>
      </article>
    </div>
  )
}
