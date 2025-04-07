import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import MyCalendarFromScratch from '@/components/MyCalendarFromScratch/MyCalendarFromScratch'

export default function DiscussionStudentWorkBox({ youtubeID, homework_id }) {
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
        <hr />
        <div className="media-left"></div>
        <div className="media-content">
          <div className="content text-left" style={{ paddingTop: '10px' }}>
            <p>Taking Reading(4) & Discussion(2) course per month.</p>
            <h5>
              Week's Ranking:
              <span style={{ fontWeight: '900', color: 'red' }}>3rd</span>
            </h5>
            <hr style={{ margin: 0, padding: 0 }} />
            <h5>
              H.W Point:
              <span style={{ fontWeight: '900', color: 'red' }}>30</span>
            </h5>
            <h5>
              Self-study Point:
              <span style={{ fontWeight: '900', color: 'red' }}>20</span>
              <p>engLib Support Videoなどを自分の意思で見る場合</p>
            </h5>
            <h5>
              Self-study Video History:
              <p>
                *Grammar- be-Verb
                <br />
                *Idiom- let down
                <br />
                *Pronounciation- s/sh
              </p>
            </h5>
            <hr style={{ margin: 0, padding: 0 }} />
            <h5>EverydayWork</h5>
            <div style={{ marginBottom: '15px' }}>
              <MyCalendarFromScratch
                onDayClick={(e, day) => onDayClick(e, day)}
              />
            </div>
            <hr style={{ margin: 0, padding: 0 }} />
            <h5>前回の復習</h5>
            <p>Phonics:ph</p>
            <p>Pronunciation:s-sh</p>
            <p>word:again/with/fammily..</p>
            <hr style={{ margin: 0, padding: 0 }} />
            <h5>Word Quiz</h5>
            <p>Wrong Words[5]</p>
            <p>Right Words[15]</p>
            <hr style={{ margin: 0, padding: 0 }} />
            <h5>Reading-Recording</h5>
            <audio
              src=""
              controls="controls"
              style={{
                alignItems: 'center',
                height: '25px',
                paddingTop: '10px',
                marginLeft: '20px',
                width: '85%',
              }}
            />
            <audio
              src=""
              controls="controls"
              style={{
                alignItems: 'center',
                height: '25px',
                paddingTop: '10px',
                marginLeft: '20px',
                width: '85%',
              }}
            />
            <p>平均word-per-min:120</p>
            <p>Reading Record:3回</p>
            <hr style={{ margin: 0, padding: 0 }} />
            <h5>Shdaowing-Recording</h5>
            <audio
              src=""
              controls="controls"
              style={{
                alignItems: 'center',
                height: '25px',
                paddingTop: '10px',
                marginLeft: '20px',
                width: '85%',
              }}
            />
            <audio
              src=""
              controls="controls"
              style={{
                alignItems: 'center',
                height: '25px',
                paddingTop: '10px',
                marginLeft: '20px',
                width: '85%',
              }}
            />
            <p>Shadowing Record:10回</p>
            <hr style={{ margin: 0, padding: 0 }} />
            <h5>Dictation Result</h5>
            <p>
              <span style={{ fontWeight: '900', color: 'red' }}>X</span>{' '}
              <a>[00:27]everything in a computer's memory takes</a>
            </p>
            <p>
              <span style={{ fontWeight: '900', color: 'red' }}>X</span>{' '}
              <a>[00:27]everything in a computer's memory takes</a>
            </p>
            <p>
              <span style={{ fontWeight: '900', color: 'blue' }}>O</span>
              <a>[00:35]Each of these is stored in a memory cell</a>
            </p>
            <p>
              <span style={{ fontWeight: '900', color: 'blue' }}>O</span>
              <a>[00:35]Each of these is stored in a memory cell</a>
            </p>
            <hr style={{ margin: 0, padding: 0 }} />
            {multiQuestion.map((val, key) => {
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
                        <span style={{ color: 'blue' }}>&nbsp;your answer</span>
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
                        <span style={{ color: 'blue' }}>&nbsp;your answer</span>
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
                        <span style={{ color: 'blue' }}>&nbsp;your answer</span>
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
                        <span style={{ color: 'blue' }}>&nbsp;your answer</span>
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
                        <span style={{ color: 'blue' }}>&nbsp;your answer</span>
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
                        <span style={{ color: 'blue' }}>&nbsp;your answer</span>
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
