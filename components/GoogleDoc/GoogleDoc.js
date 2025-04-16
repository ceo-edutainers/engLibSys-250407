import React, { Component, useState, useEffect } from 'react'

function GoogleDoc({ embedUrl }) {
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
