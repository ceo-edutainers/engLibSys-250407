import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import { Rnd } from 'react-rnd'
import Link from '@/utils/ActiveLink'
import Ranking from '@/components/Tutor/Ranking'
import PointBar from '@/components/Tutor/PointBar'
import MonsterGet from '@/components/Tutor/MonsterGet'
import MyCalendarFromScratch from '@/components/MyCalendarFromScratch/MyCalendarFromScratch'
const RndStudyHistory = ({ homework_id, mbn, courseName }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [bookUrl, setBookUrl] = useState()

  const [rndSwWidth1, setRndSwWidth1] = useState(300)
  const [rndSwHeight1, setRndSwHeight1] = useState(60)
  const [defaultSwX, setDefaultSwX] = useState(20)
  const [defaultSwY, setDefaultSwY] = useState(60)
  const [rndSwZIndex, setRndSwZIndex] = useState(2) //-1 後ろ

  const [totalLastPoint, setTotalLastPoint] = useState()
  const [firstLastRecording, setFirstLastRecording] = useState([])
  const [firstRecordFile, setFirstRecordFile] = useState()
  const [lastRecordFile, setLastRecordFile] = useState()
  const [firstLastRecordingSH, setFirstLastRecordingSH] = useState([])
  const [firstRecordFileSH, setFirstRecordFileSH] = useState()
  const [lastRecordFileSH, setLastRecordFileSH] = useState()

  function rndStudentWorkResize(width, height, x, y, zIndex) {
    setRndSwWidth1(width)
    setRndSwHeight1(height)
    setDefaultSwX(x)
    setDefaultSwY(y)
    setRndSwZIndex(zIndex)
  }

  useEffect(() => {
    getYourAudioFirstAndLastForReadingSH()
  }, [mbn])
  const getYourAudioFirstAndLastForReadingSH = () => {
    // var mbn = localStorage.getItem('MypageMbn')
    //console.log('StepSH3/myMbn:', myMbn)
    // alert(mbn)
    var url = DB_CONN_URL + '/record-select-first-and-last-for-shadowing/'
    var Url = url + mbn

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        var awsUrl =
          'https://englib.s3.ap-northeast-1.amazonaws.com/uploadrecording/' +
          response.data[0].filaname

        // alert(response.data.message)
        setFirstLastRecordingSH(response.data)
        setFirstRecordFileSH(awsUrl + response.data[0].filename)
        setLastRecordFileSH(awsUrl + response.data[1].filename)
        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  useEffect(() => {
    getYourAudioFirstAndLastForReading()
  }, [mbn])
  const getYourAudioFirstAndLastForReading = () => {
    // var mbn = localStorage.getItem('MypageMbn')
    //console.log('StepSH3/myMbn:', myMbn)

    var url = DB_CONN_URL + '/record-select-first-and-last-for-reading/'
    var Url = url + homework_id

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        var awsUrl =
          'https://englib.s3.ap-northeast-1.amazonaws.com/uploadrecording/' +
          response.data[0].filaname

        // alert(response.data.length)
        setFirstLastRecording(response.data)
        // setFirstRecordFile(awsUrl + response.data[0].filename)
        // setLastRecordFile(awsUrl + response.data[1].filename)
        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }
  return (
    <>
      <Rnd
        default={{
          x: defaultSwX,
          y: defaultSwY,
          width: rndSwWidth1,
          height: rndSwHeight1,
        }}
        size={{
          width: rndSwWidth1,
          height: rndSwHeight1,
        }}
        onResize={(e, direction, ref, delta, position) => {
          setRndSwWidth1(ref.style.width)
          setRndSwHeight1(ref.style.height)
        }}
        style={{
          //display: 'flex',
          //display: 'flex',
          //alignItems: 'top',
          overflow: 'scroll',
          justifyContent: 'left',
          paddingTop: '10px',
          paddingLeft: '5px',
          paddingRight: '5px',

          border: 'solid 1px #dedede',
          borderRadius: '10px',
          background: '#ececec',
          border: '1px solid darkgray',
          //overflow: 'auto',
          zIndex: rndSwZIndex,
        }}
        minWidth={300}
        minHeight={50}
        // bounds="window"
      >
        <a
          className="btn btn-light ml-2 mr-2"
          onClick={() => {
            // rndStudentWorkResize(300, 800, 0, -50, 4)
            rndStudentWorkResize(600, 800, 0, -50, 3)
            getYourAudioFirstAndLastForReadingSH()
            getYourAudioFirstAndLastForReading()
            //alert(rndWidth1)
          }}
        >
          STUDY HISTORY /REFRESH
        </a>

        <a
          className="btn btn-light"
          style={{ color: 'red' }}
          onClick={() => {
            rndStudentWorkResize(300, 60, 0, -50, 3)

            //alert(rndWidth1)
          }}
        >
          X
        </a>
        <div
          className="box mt-3"
          style={{
            margin: 0,
            backgroundColor: '#fdf8f1',
            paddingLeft: '10px',
            paddingRight: '10px',
            border: '2px solid #darkgray',
            // borderRadius: '25px',
          }}
        >
          {(courseName == 'CourseA' ||
            courseName == 'CourseB' ||
            courseName == 'CourseZ') && (
            <>
              <div className="col-lg-12 col-md-12 mt-3 pt-3">
                <h6>
                  <b>READING</b>
                </h6>
                {firstLastRecording.map((val, key) => {
                  // var diff = totalLastPoint - cutlinePointToNextStory

                  var audioFile =
                    'https://englib.s3.ap-northeast-1.amazonaws.com/uploadrecording/' +
                    val.filename
                  return (
                    <>
                      <h6>
                        {/* {key == 0 ? '1.' : '2.'} */}
                        <audio
                          src={audioFile}
                          controls="controls"
                          style={{
                            alignItems: 'center',
                            height: '25px',
                            paddingTop: '10px',
                            width: '100%',
                            textAlign: 'center',
                          }}
                        />
                      </h6>
                    </>
                  )
                })}
              </div>
              <hr />
            </>
          )}

          <div className="col-lg-12 col-md-12 mt-3">
            <h6>
              <b>SHADOWING</b>
            </h6>
            {firstLastRecordingSH.map((val, key) => {
              // var diff = totalLastPoint - cutlinePointToNextStory

              var audioFile =
                'https://englib.s3.ap-northeast-1.amazonaws.com/uploadrecording/' +
                val.filename
              return (
                <>
                  <h6>
                    {/* {key == 0 ? '1.' : '2.'} */}
                    <audio
                      src={audioFile}
                      controls="controls"
                      style={{
                        alignItems: 'center',
                        height: '25px',
                        paddingTop: '10px',
                        width: '100%',
                        textAlign: 'center',
                      }}
                    />
                  </h6>
                </>
              )
            })}
          </div>
          {/* {rndSwZIndex == 3 && ( */}
          <div className="mt-2 pl-3 pr-3">
            <hr />
            <h6>
              <b>POINT</b>
            </h6>
            <PointBar HWID={homework_id} mbn={mbn} />
            <hr />
            {/* <h6>
              <b>MONSTER</b>
            </h6> */}
            <MonsterGet mbn={mbn} homework_id={homework_id} />
            <hr />
            {/* <Ranking
              // youtubeID={youtubeID}
              homework_id={homework_id}
            />
            <hr /> */}
            <MyCalendarFromScratch
              onDayClick={(e, day) => onDayClick(e, day)}
            />
          </div>
        </div>
        {/* )} */}
      </Rnd>
    </>
  )
}

export default RndStudyHistory
