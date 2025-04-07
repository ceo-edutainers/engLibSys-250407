import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
import QRCode from 'react-qr-code'
import { QRCodeSVG } from 'qrcode.react'

const QrcodeGenerator = ({ url, title }) => {
  return (
    <div>
      <QRCode value={url} size="100" level="L" />
      {/* <QRCodeSVG value={url} size="100" level="M" /> */}
    </div>
  )
}

export default QrcodeGenerator
