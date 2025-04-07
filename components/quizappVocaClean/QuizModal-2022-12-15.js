import React, { useState, useEffect } from 'react'
import axios from 'axios'
//csv mydodal.css
import { myfun_weekdayToJapanese } from '@/components/FunctionComponent'
function QuizModal({ closeModal, oneClickWords }) {
  const [hurikaeDetail, setHurikaeDetail] = useState([])

  return (
    <>
      <div className="modalBackground" style={{ opacity: '100%' }}>
        <div className="titleCloseBtn" style={{ opacity: '100%' }}></div>
        <div className="modalContainer" style={{ maxWidth: '600px' }}>
          {/* メインQuiz部分 */}
          <div style={{ textAlign: 'right' }}>
            <span
              className="btn btn-danger"
              style={{ width: '50px' }}
              onClick={() => closeModal(false)}
            >
              X
            </span>
          </div>
          <div
            className="title-align-center text-center"
            style={{ opacity: '100%' }}
          >
            {oneClickWords.map((val, key) => {
              return val
            })}
            <h5>
              <p>VOCA QUIZ</p>
            </h5>
          </div>

          <div className="body"></div>
          <div className="footer">
            <button onClick={() => closeModal(false)} id="cancalBtn">
              やめる
            </button>
            {/* <button>H.W SET</button>
            <button>ClassLink</button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizModal
