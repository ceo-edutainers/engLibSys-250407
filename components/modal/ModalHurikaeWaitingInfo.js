import React, { useState, useEffect } from 'react'
import axios from 'axios'
//csv mydodal.css
import { myfun_weekdayToJapanese } from '@/components/FunctionComponent'
function ModalHurikaeWaitingInfo({
  closeModal,
  mbn,
  selectedLesson,
  courseSubject,
  courseName,
  absent_weekday,
  absent_date,
  absent_time,
}) {
  const [hurikaeDetail, setHurikaeDetail] = useState([])

  useEffect(() => {
    axios
      .get(
        DB_CONN_URL +
          '/select-hurikae-mbn-selectedLesson/' +
          mbn +
          '&' +
          selectedLesson
      )
      .then((response) => {
        console.log('response.data:', response.data)
        console.log('selectedLesson:', selectedLesson)
        console.log('mbn:', mbn)
        setHurikaeDetail(response.data)
      })
  }, [])

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => closeModal(false)}>X</button>
          </div>
          <div className="title-align-left">
            <h5>
              <p>
                <b>
                  {courseSubject}[{courseName}
                  ]&nbsp;コース
                </b>
                <br />
                <b>休む日&nbsp;:</b>[{myfun_weekdayToJapanese(absent_weekday)}]
                {absent_date}&nbsp;
                {absent_time}〜
              </p>
            </h5>
          </div>
          <div className="body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">希望日</th>
                  <th scope="col">時間</th>
                  <th scope="col">状態</th>
                </tr>
              </thead>
              <tbody>
                {hurikaeDetail.map((val, key) => {
                  return (
                    <tr>
                      <td>{val.hurikae_date}</td>
                      <td>{val.hurikae_start_time}</td>
                      <td>{val.status == 'waiting' && '待ち'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="body">
            {/* <p>
              The next page is awesome! You should move forward, you will enjoy
              it.
            </p> */}
          </div>
          <div className="footer">
            <button onClick={() => closeModal(false)} id="cancalBtn">
              Close
            </button>
            {/* <button>H.W SET</button>
            <button>ClassLink</button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalHurikaeWaitingInfo
