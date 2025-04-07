import React, { useState } from 'react'

import Modal from '@/components/modal/Modal'

function ModalPage() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="MyModal">
      <h1>THis is Modal</h1>
      <button
        className="openModalBtn"
        onClick={() => {
          setOpenModal(true)
        }}
      >
        Open
      </button>
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          mbn={localStorage.getItem('mbn')}
          tbn={localStorage.getItem('tbn')}
          email={localStorage.getItem('email')}
          T_email={localStorage.getItem('T_email')}
        />
      )}
    </div>
  )
}

export default ModalPage
