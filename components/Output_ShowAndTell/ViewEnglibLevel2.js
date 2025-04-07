import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'

const ViewEnglibLevel = ({ mbn, courseName }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [englibLevelAllInfo, setEnglibLevelAllInfo] = useState([])
  const [levelView, setLevelView] = useState(false) //IdeaView
  const [englibLevel, setEnglibLevel] = useState()
  const [courseLevel, setCourseLevel] = useState()
  const [textBookName, setTextBookName] = useState()
  const [viewLevelCourseA, setViewLevelCourseA] = useState(false)
  const [viewLevelCourseB, setViewLevelCourseB] = useState(false)
  const [viewLevelCourseZ, setViewLevelCourseZ] = useState(false)
  const [englibLevelColor, setEnglibLevelColor] = useState()

  useEffect(() => {
    if (courseName.indexOf('CourseA') !== -1) {
      setViewLevelCourseA(true)
    } else if (courseName.indexOf('CourseB') !== -1) {
      setViewLevelCourseB(true)
    } else if (courseName.indexOf('CourseZ') !== -1) {
      setViewLevelCourseZ(true)
    }
  }, [])

  useEffect(() => {
    var url =
      DB_CONN_URL + '/get-sys_member_lesson_set_BtoB_for_tutor_lesson_page/'
    var Url = url + mbn

    const fetchData1 = async () => {
      try {
        axios.get(Url).then((response) => {
          // alert('level-status' + response.data.status)
          if (!response.data.status) {
          } else {
            //  alert(response.data.message)
            setEnglibLevel(response.data.response[0].englibLevel)
            console.log('englibLevel', response.data.response[0].englibLevel)
            setCourseLevel(response.data.response[0].courseLevel)
            console.log('courseLevel', response.data.response[0].courseLevel)
            setTextBookName(response.data.response[0].textbookName)
            console.log('textbookname', response.data.response[0].textbookName)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData1()
    // }
  }, [])

  useEffect(() => {
    getInfo()
  }, [])
  function getInfo() {
    const fetchData1 = async () => {
      var url = DB_CONN_URL + '/get-englib-level-info'
      try {
        const response = await axios.get(url)

        if (response.data.response.length > 0) {
          setEnglibLevelAllInfo(response.data.response)

          console.log('englibLevelAllInfo', englibLevelAllInfo)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData1()
  }
  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <center>
        {/**Reading Triumphs */}
        <div
          className="col-lg-12 col-md-12 mt-5 mb-5"
          style={{
            textAlign: 'center',
            width: '500px',
            display: viewLevelCourseA ? 'block' : 'none',
          }}
        >
          {englibLevelAllInfo.map((val, key) => {
            return (
              <>
                {val.englib_reading_level == englibLevel ? (
                  <p
                    style={{
                      backgroundColor: val.level_color,
                      marginBottom: 1,
                      color: 'black',
                      fontSize: '12px',
                      padding: '6px',
                      // width: '60%',
                    }}
                    data-balloon-visible
                    aria-label="あなたのリーディングレベル"
                    data-balloon-pos="right"
                    data-balloon-length="fit"
                  >
                    {setEnglibLevelColor(val.color)}
                    {val.englib_reading_level}
                    {val.eiken_level !== ''
                      ? ' | 英検' + val.eiken_level
                      : ' | Starter'}
                  </p>
                ) : (
                  <p
                    style={{
                      backgroundColor: val.level_color,
                      marginBottom: 1,
                      color: 'black',
                      fontSize: '12px',
                      padding: '6px',
                      // width: '60%',
                    }}
                  >
                    {val.englib_reading_level}
                    {val.eiken_level !== ''
                      ? ' | 英検' + val.eiken_level
                      : ' | Starter'}
                  </p>
                )}
              </>
            )
          })}
        </div>

        {/**Blackcat */}

        <div
          className="col-lg-12 col-md-12  mt-5 mb-5"
          style={{
            textAlign: 'center',
            width: '500px',
            display: viewLevelCourseB ? 'block' : 'none',
          }}
        >
          {englibLevelAllInfo?.map((val, key) => {
            var sLevel = "STUDENT'S LEVEL: " + textBookName + '/' + courseLevel
            return (
              <>
                {val.englib_reading_level == englibLevel ? (
                  <>
                    <p
                      style={{
                        backgroundColor: val.level_color,
                        marginBottom: 1,
                        color: 'black',
                        fontSize: '12px',
                        padding: '6px',
                        // width: '60%',
                      }}
                      data-balloon-visible
                      aria-label={sLevel}
                      data-balloon-pos="left"
                      data-balloon-length="large"
                    >
                      {/* {setEnglibLevelColor(val.color)} */}
                      {val.englib_reading_level}
                      {val.eiken_level !== ''
                        ? ' | Eiken' + val.eiken_level
                        : ' | Starter'}
                    </p>
                    <p style={{ backgroundColor: 'white', padding: '10px' }}>
                      {val.ex1}
                    </p>
                  </>
                ) : (
                  <p
                    style={{
                      backgroundColor: val.level_color,
                      marginBottom: 1,
                      color: 'black',
                      fontSize: '12px',
                      padding: '6px',
                      // width: '60%',
                    }}
                  >
                    {val.englib_reading_level}
                    {val.eiken_level !== ''
                      ? ' | Eiken' + val.eiken_level
                      : ' | Starter'}
                  </p>
                )}
              </>
            )
          })}
        </div>

        <div
          className="col-lg-12 col-md-12  mt-5 mb-5"
          style={{
            textAlign: 'center',
            width: '500px',
            display: viewLevelCourseZ ? 'block' : 'none',
          }}
        >
          {englibLevelAllInfo?.map((val, key) => {
            var sLevel = "STUDENT'S LEVEL: " + textBookName + '/' + courseLevel
            return (
              <>
                {val.englib_reading_level == englibLevel ? (
                  <>
                    <p
                      style={{
                        backgroundColor: val.level_color,
                        marginBottom: 1,
                        color: 'black',
                        fontSize: '12px',
                        padding: '6px',
                        // width: '60%',
                      }}
                      data-balloon-visible
                      aria-label={sLevel}
                      data-balloon-pos="left"
                      data-balloon-length="large"
                    >
                      {/* {setEnglibLevelColor(val.color)} */}
                      {val.englib_reading_level}
                      {val.eiken_level !== ''
                        ? ' | Eiken' + val.eiken_level
                        : ' | Starter'}
                    </p>
                    <p style={{ backgroundColor: 'white', padding: '10px' }}>
                      {val.ex1}
                    </p>
                  </>
                ) : (
                  <p
                    style={{
                      backgroundColor: val.level_color,
                      marginBottom: 1,
                      color: 'black',
                      fontSize: '12px',
                      padding: '6px',
                      // width: '60%',
                    }}
                  >
                    {val.englib_reading_level}
                    {val.eiken_level !== ''
                      ? ' | Eiken' + val.eiken_level
                      : ' | Starter'}
                  </p>
                )}
              </>
            )
          })}
        </div>
      </center>
    </>
  )
}

export default ViewEnglibLevel
