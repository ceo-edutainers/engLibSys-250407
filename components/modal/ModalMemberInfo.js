import React, { useState, useEffect } from 'react'
import axios from 'axios'
//csv mydodal.css

function ModalMemberInfo({ closeModal, mbn, tbn, email, T_email }) {
  const [memberInfo, setMemberInfo] = useState([])
  useEffect(() => {
    // if (localStorage.getItem('T_loginStatus') == 'true') {
    axios
      .post(DB_CONN_URL + '/member_info_mbn', {
        mbn: mbn,
      })
      .then((response) => {
        if (!response.data.status) {
          //console.log('no information', response)
          alert(response.data.message) //for test
        } else {
          setMemberInfo(response.data.response[0])
          //alert('yes') //for test
          //console.log('mbn', response.data.response[0].member_barcode_num)
        }
      })
    // }
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
              <b>{memberInfo.name_eng}</b>
            </h5>
          </div>
          <div className="body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="body">
            <p>
              The next page is awesome! You should move forward, you will enjoy
              it.
            </p>
          </div>
          <div className="footer">
            <button onClick={() => closeModal(false)} id="cancalBtn">
              Close
            </button>
            <button>H.W SET</button>
            <button>ClassLink</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalMemberInfo
