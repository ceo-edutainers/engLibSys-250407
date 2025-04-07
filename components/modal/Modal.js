import React from 'react'
//csv mydodal.css
function Modal({ closeModal, mbn, tbn, email, T_email }) {
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => closeModal(false)}>X</button>
          </div>
          <div className="title">
            <h1>Are you sure You want to continus?</h1>
            <h3>mbn:{mbn}</h3>
            <h3>tbn:{tbn}</h3>
            <h3>email:{email}</h3>
            <h3>T_email:{T_email}</h3>
          </div>
          <div className="body">
            <p>
              The next page is awesome! You should move forward, you will enjoy
              it.
            </p>
          </div>
          <div className="footer">
            <button onClick={() => closeModal(false)} id="cancalBtn">
              Cancel
            </button>
            <button>Continue</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
