import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'

export default function DiscussionMultiQuestionBox({ youtubeID, homework_id }) {
  const [multiQuestion, setMultiQuestion] = useState([])

  useEffect(() => {
    multipleQuestion()
  }, [])

  function multipleQuestion() {
    console.log('youtubeID', youtubeID)
    const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
    axios
      .post(DB_CONN_URL + '/get-member-discuss-multiple-question/', {
        youtubeID: youtubeID,
        homework_id: homework_id,
      })
      .then((response) => {
        //errorの場合

        if (response.data.status) {
          if (response.data.response.length > 0) {
            setMultiQuestion(response.data.response)
          } else {
          }
        } else {
        }
      })
  }

  return (
    <div
      className="box"
      style={{
        margin: 0,
        backgroundColor: 'white',
        paddingLeft: '10px',
        paddingRight: '10px',

        border: '2px solid #darkgray',
        // borderRadius: '25px',
      }}
    >
      <article className="media">
        <hr />
        <div className="media-left"></div>
        <div className="media-content">
          {multiQuestion.length == 0 && (
            <div
              style={{
                textAlign: 'left',
                marginLeft: 0,
                backgroundColor: 'pink',
              }}
            >
              not submitted yet
            </div>
          )}
          <div className="content text-left">
            {multiQuestion &&
              multiQuestion.map((val, key) => {
                return (
                  <div>
                    <strong>
                      Q{key + 1}.{val.question}
                    </strong>

                    {val.autoid}
                    {val.a1 != '' && (
                      <p>
                        1){val.a1}
                        {val.answer == '1' && (
                          <span style={{ color: 'red' }}>&nbsp;&#9733;</span>
                        )}
                        {val.your_answer == '1' && (
                          <span style={{ color: 'blue' }}>
                            &nbsp;your answer
                          </span>
                        )}
                      </p>
                    )}
                    {val.a2 != '' && (
                      <p>
                        2){val.a2}
                        {val.answer == '2' && (
                          <span style={{ color: 'red' }}>&nbsp;&#9733;</span>
                        )}
                        {val.your_answer == '2' && (
                          <span style={{ color: 'blue' }}>
                            &nbsp;your answer
                          </span>
                        )}
                      </p>
                    )}
                    {val.a3 != '' && (
                      <p>
                        3){val.a3}
                        {val.answer == '3' && (
                          <span style={{ color: 'red' }}>&nbsp;&#9733;</span>
                        )}
                        {val.your_answer == '3' && (
                          <span style={{ color: 'blue' }}>
                            &nbsp;your answer
                          </span>
                        )}
                      </p>
                    )}
                    {val.a4 != '' && (
                      <p>
                        4){val.a4}
                        {val.answer == '4' && (
                          <span style={{ color: 'red' }}>&nbsp;&#9733;</span>
                        )}
                        {val.your_answer == '4' && (
                          <span style={{ color: 'blue' }}>
                            &nbsp;your answer
                          </span>
                        )}
                      </p>
                    )}
                    {val.a5 != '' && (
                      <p>
                        5){val.a5}
                        {val.answer == '5' && (
                          <span style={{ color: 'red' }}>&nbsp;&#9733;</span>
                        )}
                        {val.your_answer == '5' && (
                          <span style={{ color: 'blue' }}>
                            &nbsp;your answer
                          </span>
                        )}
                      </p>
                    )}
                    {val.a6 != '' && (
                      <p>
                        6){val.a6}
                        {val.answer == '6' && (
                          <span style={{ color: 'red' }}>&nbsp;&#9733;</span>
                        )}
                        {val.your_answer == '6' && (
                          <span style={{ color: 'blue' }}>
                            &nbsp;your answer
                          </span>
                        )}
                      </p>
                    )}
                    <hr />
                  </div>
                )
              })}
            {/* {() => {
              myAnswer.map((val, key) => {
                multipleQuestion(val.question_autoid)
                multiQuestion.map((val1, key1) => {
                  return (
                    <div>
                      <h2>an:{val.your_answer}</h2>
                      <p>
                        {key1}.{val1.title}
                      </p>
                    </div>
                  )
                })
              })
            }} */}
            {/* <p>
              <strong></strong>
              <small>@test</small> <small>31m</small>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              efficitur sit amet massa fringilla egestas. Nullam condimentum
              luctus turpis.
            </p> */}
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
        </div>
      </article>
    </div>
  )
}
