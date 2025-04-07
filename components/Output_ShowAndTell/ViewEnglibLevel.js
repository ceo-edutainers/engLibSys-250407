import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'

const ViewEnglibLevel = ({ mbn }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [englibLevelAllInfo, setEnglibLevelAllInfo] = useState([])
  const [levelView, setLevelView] = useState(false) //IdeaView
  const [englibLevel, setEnglibLevel] = useState()
  const [courseLevel, setCourseLevel] = useState()
  const [textBookName, setTextBookName] = useState()

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
    var url = DB_CONN_URL + '/get-englib-level-info'

    const fetchData1 = async () => {
      try {
        // alert('here')
        axios.get(url).then((response) => {
          // alert('level-status2' + response.data.status)
          setEnglibLevelAllInfo(response.data.response)

          console.log('englibLevelAllInfo', englibLevelAllInfo)
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData1()
  }, [])
  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <center>
        <span
          style={{
            // width: '100%',
            // width: '100',
            fontSize: '18px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#F9EBEA',
            marginTop: '20px',
            marginBottom: '15px',
            color: 'black',
            fontWeight: '600',
            border: '1px solid #FCD2CF',
          }}
        >
          <button
            className="btn-sm btn-warning "
            onClick={() => {
              setLevelView(!levelView)
              // handleClear()
            }}
            style={{ width: '200px' }}
          >
            student's reading level
          </button>{' '}
        </span>

        <div
          className="col-lg-12 col-md-12"
          style={{ width: '500px', display: levelView ? 'block' : 'none' }}
        >
          {englibLevelAllInfo.map((val, key) => {
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
