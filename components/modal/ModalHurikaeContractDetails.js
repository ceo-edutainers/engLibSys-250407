import React, { useState, useEffect } from 'react'
import axios from 'axios'
//csv mydodal.css
import { myfun_weekdayToJapanese } from '@/components/FunctionComponent'
function ModalHurikaeModalDetails({ closeModal }) {
  const [hurikaeDetail, setHurikaeDetail] = useState([])

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => closeModal(false)}>X</button>
          </div>
          <div className="title-align-center text-center">
            <h2>振替・休み関連規約</h2>
            <h5>
              <p>以下の振替・休みの規約を必ずご確認ください。</p>
            </h5>
          </div>

          <div className="body">
            <ul className="list-group text-left">
              <li className="list-group-item list-group-item-dark">
                円満な振替調整のために、先生と時間が合わない場合、6ヶ月間使用可能な振替切符として保存されます。
              </li>
              <li className="list-group-item list-group-item-dark">
                24時間以内にスタートするレッスンに対して振替を申し込むことはできません。但し、急な病気などに対しては病院の照明や照明できるものを提出した場合、振替切符として保存できます。
              </li>
              <li className="list-group-item list-group-item-dark">
                無断欠席に関しましては振替できませんのでご注意ください。
              </li>
            </ul>
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

export default ModalHurikaeModalDetails
