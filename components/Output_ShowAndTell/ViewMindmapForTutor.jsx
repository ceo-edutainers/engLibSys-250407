import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import ReactPanZoom from 'react-image-pan-zoom-rotate'
function ViewMindmapForTutor({
  mbn,
  homework_id,
  thisOsusumeLetterSumScript,
  thisOsusumeLetterSumOutline,
}) {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [fileMindmap, setFileMindmap] = useState('')
  const [newFileName, setNewFileName] = useState('')

  ///outline
  const [osusumeLetterSum, setOsusumeLetterSum] = useState(
    thisOsusumeLetterSumOutline
  )
  const [osusumeLetterSumScript, setOsusumeLetterSumScript] = useState(
    thisOsusumeLetterSumScript
  )
  const [outlineTopic, setOutlineTopic] = useState('')
  const [outlineIntroduction, setOutlineIntroduction] = useState('')
  const [outlineBody, setOutlineBody] = useState('')
  const [outlineConclusion, setOutlineConclusion] = useState('')

  const [outlineTopicWordLength, setOutlineTopicWordLength] = useState(0)
  const [outlineIntroductionWordLength, setOutlineIntroductionWordLength] =
    useState(0)
  const [outlineBodyWordLength, setOutlineBodyWordLength] = useState(0)
  const [outlineConclusionWordLength, setOutlineConclusionWordLength] =
    useState(0)

  const [wholeScript, setWholeScript] = useState()
  const [wholeScriptSum, setWholeScriptSum] = useState()
  const [wordsum, setWordsum] = useState()

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
        {/* <div
          id="navbar"
          className="navbar-area mt-5 pt-0"
          style={{ height: '50px', backgroundColor: '#ececec' }}
        >
          <div className="edemy-nav mt-5 pt-0">
            <div className="container-fluid mt-5 pt-0">
              <div className="navbar navbar-expand-lg navbar-light mt-5  pt-0">
                <div className="col-lg-12 col-md-12 pt-0">
                  <button
                    className="btn btn-primary"
                    style={{ width: '30%', color: 'white', fontWeight: '600' }}
                  >
                    <a href="#mindmap">Mindmap</a>
                  </button>{' '}
                  <button
                    className="btn btn-primary "
                    style={{ width: '30%', fontWeight: '600' }}
                  >
                    <a href="#outline">Outline</a>
                  </button>{' '}
                  <button
                    className="btn btn-primary "
                    style={{ width: '30%', fontWeight: '600' }}
                  >
                    <a href="#script">Script</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <center>
          <div className="col-lg-12 col-md-12 ">
            <h1>MINDMAP</h1>
            {/* {(fileMindmap || newFileName) && ( */}
            <>
              <p style={{ marginBottom: 0, paddingBottom: 0, color: 'red' }}>
                {/* <br />
                    更新するためには、新たにアップロードしてください。 */}
              </p>

              {fileMindmap && (
                <ReactPanZoom image={fileMindmap} alt="mindmap" />

                // <img
                //   src={fileMindmap}
                //   style={{
                //     paddingTop: 0,
                //     marginTop: 0,
                //     border: '1px solid #dedede',
                //   }}
                // />
              )}
            </>
            {/* )} */}
          </div>
          <span id="outline"></span>
          <div className="col-lg-12 col-md-12  pt-3 ">
            <hr />
            <h1>OUTLINE</h1>
            <h5>
              <font>Total</font>
              <font style={{ color: 'red', fontSize: '40px' }}>
                <b>{wordsum}</b>
              </font>
              <font>words</font>&nbsp;/&nbsp;
              <font size="8px" color="darkgreen">
                <p> Goal:over{thisOsusumeLetterSumOutline}words</p>
              </font>
            </h5>
            <label
              for="story"
              style={{
                display: 'block',
                marginBottom: '10px',
                textAlign: 'left',
              }}
            >
              <h5>
                <b>TOPIC</b>&nbsp;
                <font color="darkgreen">
                  <b>{outlineTopicWordLength}words</b>
                  {/* /total:{wordsum} */}
                </font>
              </h5>
            </label>
            <textarea
              spellcheck="false"
              id="story"
              name="outline_topic"
              rows="2"
              cols="33"
              style={{
                fontSize: '.8rem',
                letterSpacing: '1px',
                padding: '10px',
                width: '100%',
                maxWidth: '100%',
                lineHeight: '1.5',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: '1px 1px 1px #999',
                fontSize: '20px',
              }}
              value={outlineTopic}
              onChange={(e) => {
                setOutlineTopic(
                  e.target.value.replace('  ', ' ').replace('　', ' ')
                )
                setOutlineTopicWordLength(e.target.value.split(' ').length)

                wordTotalSum()
              }}
            ></textarea>
            {/* {outlineTopicWordLength} */}
            <label
              for="story"
              style={{
                display: 'block',
                marginBottom: '5px',
                textAlign: 'left',
                marginTop: '20px',
              }}
            >
              <h5>
                <b>INTRODUCTION</b>&nbsp;
                <font color="darkgreen">
                  <b>{outlineIntroductionWordLength}words</b>
                  {/* /total:
                  {wordsum} */}
                </font>
              </h5>
            </label>
            <textarea
              spellcheck="false"
              id="story"
              name="outline_introduction"
              rows="10"
              cols="33"
              style={{
                fontSize: '.8rem',
                letterSpacing: '1px',
                padding: '10px',
                width: '100%',
                maxWidth: '100%',
                lineHeight: '1.5',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: '1px 1px 1px #999',
                fontSize: '20px',
                paddingTop: 0,
                backgroundColor: 'white',
                overflowY: 'auto',
                overflowX: 'auto',
              }}
              value={outlineIntroduction}
              onChange={(e) => {
                setOutlineIntroduction(
                  e.target.value.replace('  ', ' ').replace('　', ' ')
                )
                setOutlineIntroductionWordLength(
                  e.target.value.split(' ').length
                )
                wordTotalSum()
              }}
            ></textarea>
            <label
              for="story"
              style={{
                display: 'block',
                marginBottom: '5px',
                textAlign: 'left',
                marginTop: '20px',
              }}
            >
              <h5>
                <b>BODY</b>&nbsp;
                <font color="darkgreen">
                  <b>{outlineBodyWordLength}words</b>
                  {/* /total:{wordsum} */}
                </font>
              </h5>
            </label>
            <textarea
              spellcheck="false"
              id="story"
              name="outline_introduction"
              rows="30"
              cols="33"
              style={{
                fontSize: '.8rem',
                letterSpacing: '1px',
                padding: '10px',
                width: '100%',
                maxWidth: '100%',
                lineHeight: '1.5',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: '1px 1px 1px #999',
                fontSize: '20px',
              }}
              value={outlineBody}
              onChange={(e) => {
                setOutlineBody(
                  e.target.value.replace('  ', ' ').replace('　', ' ')
                )
                setOutlineBodyWordLength(e.target.value.split(' ').length)
                wordTotalSum()
              }}
            ></textarea>{' '}
            <label
              for="story"
              style={{
                display: 'block',
                marginBottom: '5px',
                textAlign: 'left',
                marginTop: '20px',
              }}
            >
              <h5>
                <b>CONCLUSION</b>&nbsp;
                <font color="darkgreen">
                  <b>{outlineConclusionWordLength}words</b>
                  {/* /total:
                  {wordsum} */}
                </font>
              </h5>
            </label>
            <textarea
              spellcheck="false"
              id="story"
              name="outline_introduction"
              rows="10"
              cols="33"
              style={{
                fontSize: '.8rem',
                letterSpacing: '1px',
                padding: '10px',
                width: '100%',
                maxWidth: '100%',
                lineHeight: '1.5',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: '1px 1px 1px #999',
                fontSize: '20px',
              }}
              value={outlineConclusion}
              onChange={(e) => {
                setOutlineConclusion(
                  e.target.value.replace('  ', ' ').replace('　', ' ')
                )
                setOutlineConclusionWordLength(e.target.value.split(' ').length)
                wordTotalSum()
              }}
            ></textarea>
          </div>
          <span id="script"></span>

          <div className="col-lg-12 col-md-12 mt-3 pt-3 ">
            <hr />
            <h1>SCRIPT</h1>
            <h5>
              <font>Total</font>
              <font style={{ color: 'red', fontSize: '40px' }}>
                <b>{wholeScriptSum}</b>
              </font>
              <font>words</font>&nbsp;/&nbsp;
              <font size="8px" color="darkgreen">
                <p> Goal:over{thisOsusumeLetterSumScript}words</p>
              </font>
            </h5>

            <textarea
              spellcheck="false"
              id="story"
              name="wholeScript"
              rows="40"
              cols="33"
              style={{
                fontSize: '.8rem',
                letterSpacing: '1px',
                padding: '10px',
                width: '100%',
                maxWidth: '100%',
                lineHeight: '1.5',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: '1px 1px 1px #999',
                fontSize: '20px',
                paddingTop: 0,
                backgroundColor: '#FDEDEC',
                overflowY: 'auto',
                overflowX: 'auto',
              }}
              value={wholeScript}
            ></textarea>
          </div>
        </center>
      </div>
    </>
  )
}

export default ViewMindmapForTutor
