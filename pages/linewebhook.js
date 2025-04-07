import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'

function App() {
  const { LineClient } = require('messaging-api-line')

  // get accessToken and channelSecret from LINE developers website

  const client = new LineClient({
    accessToken:
      'JpJto5Awb9t+DO/mK0QR0W+vUQ196N5YoECvo0UPlD7egQRLTXwDnyFoobSEhdaaZn651pHU52RHZez7D8QMZFNnkEV18/M++XS14RLSHGYiMMiIFiyQki3PboWK2lhhpnrSUEcAws7RdVIcF3dxQwdB04t89/1O/w1cDnyilFU=',
    channelSecret: '9df443b4dc750efcf08321ab7f752823',
  })
  // Error Handling
  // client.replyText(token, text).catch((error) => {
  //   console.log(error) // formatted error message
  //   console.log(error.stack) // error stack trace
  //   console.log(error.config) // axios request config
  //   console.log(error.request) // HTTP request
  //   console.log(error.response) // HTTP response
  // })

  useEffect(() => {
    var userId = 'funtoread'
    // alert('here')
    // client.push(USER_ID, [
    //   {
    //     type: 'text',
    //     text: 'Hello!',
    //   },
    // ])

    client.pushText(userId, 'Hello World').then(() => {
      console.log('pushed')
    })
  }, [])
  return <></>
}

export default App
