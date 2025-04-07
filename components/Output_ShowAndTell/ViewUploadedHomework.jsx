import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import ReactPanZoom from 'react-image-pan-zoom-rotate'
function ViewUploadedHomework({
  mbn,
  homework_id,
  // thisOsusumeLetterSumScript,
  // thisOsusumeLetterSumOutline,
}) {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [fileMindmap, setFileMindmap] = useState('')
  const [newFileName, setNewFileName] = useState('')

  //useEffectの複数run防止
  const bar = {}
  const bar2 = {}
  const bar3 = {}

  useEffect(() => {
    // function viewMindmap() {
    if (localStorage.getItem('T_loginStatus') == 'true') {
      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-mindmap-sys-hw-history2/'
          var Url = url + homework_id
          console.log('homework_id:', homework_id)
          const response = await axios.get(Url)

          if (response.data.length > 0) {
            console.log('fileName:', response.data.response[0].fileName)
            console.log('message', response.data.message)
            console.log('length', response.data.length)
            // if (response.data.response[0].fileName != '') {
            //'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/showandtell_Mindmap_undefined_1652239665351.jpg
            https: var filemindmap =
              'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' +
              response.data.response[0].fileName
            // imgRefresh(filemindmap)
            setFileMindmap(filemindmap)
            //alert('here')
            //alert(response.data.response[0].fileName)
            console.log('fileMindmap:', fileMindmap)
            // } else {
            //   alert(here2)
            //   setFileMindmap()
            // }
          } else {
            //alert(here2)
            setFileMindmap('')
          }
        } catch (error) {
          console.log(error)
          alert(error)
        }
      }
      fetchData2()
    }
  }, [bar])
  // }

  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる

  useEffect(() => {
    // function viewOutline() {
    var url = DB_CONN_URL + '/get-hw-show-and-tell-writing-info2-Step2OST/'
    var Url = url + mbn + '&' + homework_id

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        // alert(response.data.length)
        if (response.data.length > 0) {
          //setHWWritingInfo(response.data)
          setOutlineTopic(response.data[0].outline_topic.trim())
          // alert('1')
          // setOutlineTopic(response.data[0].outline_topic.trim())
          setOutlineIntroduction(response.data[0].outline_introduction.trim())
          setOutlineBody(response.data[0].outline_body.trim())
          setOutlineConclusion(response.data[0].outline_conclusion.trim())
          // alert('here2')
          setOutlineTopicWordLength(
            response.data[0].outline_topic.trim().split(' ').length
          )
          setOutlineIntroductionWordLength(
            response.data[0].outline_introduction.trim().split(' ').length
          )
          setOutlineBodyWordLength(
            response.data[0].outline_body.trim().split(' ').length
          )
          setOutlineConclusionWordLength(
            response.data[0].outline_conclusion.trim().split(' ').length
          )

          var sum = parseInt(
            response.data[0].outline_topic.trim().split(' ').length +
              response.data[0].outline_introduction.trim().split(' ').length +
              response.data[0].outline_body.trim().split(' ').length +
              response.data[0].outline_conclusion.trim().split(' ').length
          )

          if (
            response.data[0].outline_topic.trim() == '' &&
            response.data[0].outline_introduction.trim() == '' &&
            response.data[0].outline_body.trim() == '' &&
            response.data[0].outline_conclusion.trim() == ''
          ) {
            // alert('here1')
            setWordsum(0)
          } else {
            // alert('here2')
            setWordsum(sum)
          }
        } else {
          setOutlineTopic('')

          // setOutlineTopic(response.data[0].outline_topic.trim())
          setOutlineIntroduction('')
          setOutlineBody('')
          setOutlineConclusion('')
          // alert('here2')
          setOutlineTopicWordLength(0)
          setOutlineIntroductionWordLength(0)
          setOutlineBodyWordLength(0)
          setOutlineConclusionWordLength(0)
          setWordsum(0)
        }
        // alert(sum)
      } catch (error) {}
    }
    fetchData()
    // }
  }, [bar2])

  useEffect(() => {
    // function viewOutline() {
    var url = DB_CONN_URL + '/get-hw-show-and-tell-writing-info2-Step3OST/'
    var Url = url + mbn + '&' + homework_id

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        // alert(response.data.length)
        if (response.data.length > 0) {
          //setHWWritingInfo(response.data)

          setWholeScript(response.data[0].script)
          setWholeScriptSum(response.data[0].script.trim().split(' ').length)
        } else {
          // setWordsum(0)
        }
        // alert(sum)
      } catch (error) {}
    }
    fetchData()
    // }
  }, [bar3])
  return (
    <>
      <div style={{ overflow: 'scroll', height: '1300px' }}>
        <span id="mindmap"></span>

        <center>
          <div className="col-lg-12 col-md-12 ">
            <h1>HOMEWORK</h1>
            {/* {(fileMindmap || newFileName) && ( */}
            <>
              <p
                style={{ marginBottom: 0, paddingBottom: 0, color: 'red' }}
              ></p>

              {fileMindmap && (
                <ReactPanZoom image={fileMindmap} alt="mindmap" />
              )}
            </>
          </div>
        </center>
      </div>
    </>
  )
}

export default ViewUploadedHomework
