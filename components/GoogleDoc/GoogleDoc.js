import React, { Component, useState, useEffect } from 'react'

function GoogleDoc({ embedUrl }) {
  // const embedUrl =
  //   'https://docs.google.com/document/d/1jmX3125JNX6ip3ysRqV9_hWph-AwH7VxEBtazbXywCg/edit?usp=sharing'
  useEffect(() => {
    getGoogleDoc()
  }, [])

  function getGoogleDoc() {
    return (
      <>
        <h1>SCRIPT</h1>
        <iframe
          style={{ border: 0, width: '100%', height: '1200px' }}
          src={embedUrl}
        ></iframe>
      </>
    )
  }

  return (
    <>
      {getGoogleDoc()}
      {/* <iframe
        style={{ border: 0, width: '100%', height: '100%' }}
        src={embedUrl}
      ></iframe> */}
    </>
  )
}

export default GoogleDoc
