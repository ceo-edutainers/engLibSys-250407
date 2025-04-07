import React, { useState, useEffect } from 'react'
import NavbarEnglib_Admin from '@/components/_App/NavbarEnglib_Admin'
import PageBanner from '@/components/Common/PageBanner'
import AboutUsContentTwo from '@/components/About/AboutUsContentTwo'
import FunFacts from '@/components/Common/FunFacts'
import Testimonials from '@/components/Common/Testimonials'
import CourseAdvisor from '@/components/Common/CourseAdvisor'
import Partner from '@/components/Common/Partner'
// import Footer from '../components/_App/Footer';
import axios from 'axios'

const RegYoutubeScriptTime = () => {
  const [timeScript, setTimeScript] = useState('')
  const [arrayTimeScript, setArrayTimeScript] = useState([])
  const DB_CONN_URL = process.env.DB_CONN_URL

  useEffect(() => {
    scriptSplit(timeScript)
  }, [timeScript])

  function scriptSplit(value) {
    //var res = str.substring(0, 5) //get first 5 chars

    // var str = 'Hello Folks!'
    // var firstStringChar = str.charAt(0) //H
    //alert(value)

    var result = timeScript.split(':')
    //alert(result.length)

    var arr = []
    for (let i = 0; i < result.length; i++) {
      var nowScript = result[i] + '###'
      console.log('result:', nowScript)
      arr.push(nowScript)
    }
    console.log('arr', arr)
    setArrayTimeScript(arr)

    return arrayTimeScript
  }
  function regScriptTime() {
    axios
      .post(DB_CONN_URL + '/reg-youtube-time-script', {
        timeScript: timeScript,
      })
      .then((response) => {
        //alert(response.data)
        setYoutubeList(response.data)
        console.log('setYoutubeList', youtubeList)
        console.log('response.data', response.data)
      })
  }
  //https://www.youtube.com/embed/w6JFRi0Qm_s

  return (
    <React.Fragment>
      {/* <NavbarEnglib_Admin /> */}
      array:
      {arrayTimeScript.map((val, key) => {
        {
          val + '<br/>'
        }
      })}
      <div>
        <textarea
          className="form-control"
          style={{ width: '80%', height: '500px', backgroundColor: '#dedede' }}
          onChange={(e) => {
            setTimeScript(e.target.value)
          }}
        ></textarea>
        {timeScript}
        {/* <button onClick={regScriptTime()}></button> */}
      </div>
      {/* <AboutUsContentTwo />
      <FunFacts />
      <Testimonials />
      <CourseAdvisor /> */}
      <Partner />
      {/* <Footer /> */}
    </React.Fragment>
  )
}

export default RegYoutubeScriptTime
