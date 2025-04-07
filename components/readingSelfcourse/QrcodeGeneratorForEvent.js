import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
import QRCode from 'react-qr-code'
import { QRCodeSVG } from 'qrcode.react'

const QrcodeGeneratorForEvent = ({ url, title, size }) => {
  return (
    <div>
      <QRCode value={url} size={size} level="L" />
      {/* <QRCodeSVG value={url} size="100" level="M" /> */}
    </div>
  )
}

export default QrcodeGeneratorForEvent
