import React, { Component } from 'react'
import Clock from 'react-live-clock'

const App = ({ timeZone }) => {
  return <Clock format={'HH:mm:ss A'} ticking={true} timezone={timeZone} />
}

export default App
