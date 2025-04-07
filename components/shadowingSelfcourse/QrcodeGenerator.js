import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
import QRCode from 'react-qr-code'

const QrcodeGenerator = ({ url }) => {
  return (
    <div>
      <QRCode value={url} size="50" />
    </div>
  )
}

export default QrcodeGenerator
