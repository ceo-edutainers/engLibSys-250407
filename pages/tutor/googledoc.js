import React, { Component } from 'react'
import GoogleDoc from '@/components/GoogleDoc/GoogleDoc'

class Googledoc extends React.Component {
  render() {
    const path_to_file =
      'https://docs.google.com/document/d/1jmX3125JNX6ip3ysRqV9_hWph-AwH7VxEBtazbXywCg/edit?usp=sharing'

    return <GoogleDoc />
  }
}

export default Googledoc
