import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import MicRecorder from 'mic-recorder-to-mp3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { myFun_addZero } from '../FunctionComponent'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import WaveAppLessonPage from '@/components/Wave/WaveAppLessonPage'
import { NavigateBeforeSharp } from '@material-ui/icons'
//128:radio quality,  160 or higher:CD, 256 kilobit- iTunes
// const [initRecording, setInitRecording] = useState()
// useEffect(() => {
//   setInitRecording(true)
// }, [])

export default function VoiceRecorderToS3ForLessonPage(mbn, homework_id) {
  //const audioRecorder = new MicRecorder({ bitRate: 160 })

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     isblocked: false,
  //     blobUrl: '',
  //     blob: '',
  //     isrecording: false,
  //     isdeleted: false,
  //     isRefreshBtn: false,
  //     audio: '',
  //     isLoading: false,
  //     isError: false,
  //     record_comment: '',
  //     mbn: this.props.mbn,
  //     homework_id: this.props.homework_id,
  //     recordFileList: [],
  //     recordListView: false,
  //   }

  var mbn = mbn
  var homework_id = homework_id
  const [isblocked, setIsblocked] = useState(false)
  const [blobUrl, setBlobUrl] = useState('')
  const [blob, setBlob] = useState('')
  const [isrecording, setIsrecording] = useState(false)
  const [isdeleted, setIsdeleted] = useState(false)
  const [isRefreshBtn, setIsRefreshBtn] = useState(false)
  const [audio, setAudio] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [record_comment, setRecord_comment] = useState('')
  const [recordFileList, setRecordFileList] = useState([])
  const [recordListView, setRecordListView] = useState(false)
  const DB_CONN_URL = process.env.DB_CONN_URL
  //const audioRecorder = new MicRecorder({ bitRate: 128 })

  const [audioRecorder, setAudioRecorder] = useState(
    new MicRecorder({ bitRate: 128 })
  )

  function start() {
    if (isblocked) {
      console.log('permission Denied')
    } else {
      audioRecorder
        .start()
        .then(() => {
          setIsrecording(true)
          setIsdeleted(false)
          setIsRefreshBtn(false)
        })
        .catch((e) => console.log(e))
    }
  }

  function stop() {
    audioRecorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobUrl = URL.createObjectURL(blob)
        // this.setState({
        //   blobUrl,
        //   isrecording: false,
        //   isdeleted: false,
        //   isRefreshBtn: true,
        // })
        setBlobUrl()
        setIsrecording(false)
        setIsdeleted(false)
        setIsRefreshBtn(true)
        var mbn = localStorage.getItem('MypageMbn')
        //var dv = new Date().valueOf() //637725481767

        const d = new Date()
        let y = d.getFullYear()
        let mt = d.getMonth() + 1
        let day = d.getDate()
        let h = myFun_addZero(d.getHours())
        let m = myFun_addZero(d.getMinutes())
        let s = myFun_addZero(d.getSeconds())
        let ms = myFun_addZero(d.getMilliseconds())
        let time =
          y + '-' + mt + '-' + day + '_' + h + ':' + m + ':' + s + ':' + ms

        var d2 = homework_id + '_' + time
        //hw番号も入れる

        var file = new File([blob], d2, { type: 'audio/wav' })
        console.log(file)
        handleaudiofile(file)
      })
      .catch((e) => console.log('We could not retrieve your message'))
  }

  function deleteAudio() {
    // alert('isdelete')
    // this.setState({
    //   blobUrl: '',
    //   blob: '',
    //   isdeleted: true,
    //   isRefreshBtn: false,
    // })
    setBlobUrl('')
    setBlob('')
    setIsdeleted(true)
    setIsRefreshBtn(false)
  }

  function handleaudiofile(ev) {
    const fetchData = async () => {
      let file = ev
      let fileName = ev.name
      let fileType = ev.type

      // console.log('fileName:', fileName)
      // console.log('fileType:', fileType)

      try {
        const response = await axios.post(DB_CONN_URL + '/sign_s3', {
          fileName: fileName,
          fileType: fileType,
        })

        var returnData = response.data.data.returnData
        var signedRequest = returnData.signedRequest
        var url = returnData.url
        var options = {
          headers: {
            'Content-Type': fileType,
          },
        }
        const fetchData2 = async () => {
          try {
            const result = await axios.put(signedRequest, file, options)
            // this.setState({ audio: url, isRefreshBtn: true })
            setAudio(url)
            setIsRefreshBtn(true)
            getFileFromAws(mbn, homework_id)
            //alert('宿題音声を送信しました！')
          } catch (error) {
            alert('error' + JSON.stringify(error))
            alert('送信エラーです。もう一度録音して下さい。1')
          }
          //Loding
        }
        fetchData2()
        // alert('koko')
      } catch (error) {
        // this.setState({
        //   isError: true,
        // })
        setIsError(true)
        alert('送信エラーです。もう一度録音して下さい。2')
      }
      // this.setState({
      //   isLoading: false,
      // })
      setIsLoading(false)
      // this.audioIntoDB(fileName)
      audioIntoDB(fileName)
    }

    fetchData()
  }

  function audioIntoDB(fileName) {
    var rc = record_comment
    //var Url = DB_CONN_URL + '/member-record/' + mbn + '&' + filename
    const fetchData3 = async () => {
      try {
        // var mbn = '200218100688'
        const response = await axios.post(DB_CONN_URL + '/member-record', {
          mbn: mbn,
          fileName: fileName,
          record_comment: rc,
          who_record: 'tutor', //tutor , student
          when_record: 'lesson', //homework'宿題時, 'lesson'=レッスン中, 'before-lesson'=レッスンの前, 'after-lesson'レッスンの後
        })
        if (!response.data.register) {
          alert(response.data.message) //for test
          // this.getFileFromAws
          // alert(recordFileList)
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert('db insert error')
      }
    }
    fetchData3()
  }

  function getFileFromAws(mbn, homework_id) {
    //homework_idを利用する
    axios
      .post(DB_CONN_URL + '/get-member-record-file', {
        // mbn: this.state.mbn,
        // homework_id: this.state.homework_id,
        mbn: mbn,
        homework_id: homework_id,
      })

      .then((response) => {
        //errorの場合
        if (!response.data.status) {
          alert(response.data.message) //for test
        } else {
          //alert(response.data.result)
          // this.setState({
          //   recordFileList: response.data.result,
          //   recordListView: true,
          // })
          setRecordFileList(response.data.result)
          setRecordListView(true)

          console.log('test1:', response.data.result)
        }
      })
  }

  function handleViewList(value) {
    // this.setState({
    //   recordListView: value,
    // })
    setRecordListView(value)
  }

  function handleFileDel(id, mbn, homework_id) {
    var Url = DB_CONN_URL + '/record-delete/' + id
    //console.log(Url)
    axios.get(Url).then((response) => {
      //errorの場合
      if (!response.data.status) {
        alert(response.data.message) //for test
        //alert('test')
      } else {
        alert('delete ok!')
        // this.setState({
        //   recordListView: true,
        // })
        getFileFromAws(mbn, homework_id)
      }
    })
  }

  useEffect(() => {
    getFileFromAws(mbn, homework_id)
  }, [])

  //if (this.state.isError) return <h1>Upload Error, try again!</h1>
  if (isLoading) {
    return <h5>recording....................</h5>
  }
  return (
    <>
      <div>
        <div className="containers">
          <div className="row">
            <div
              className="col-lg-12 mt-1 ml-3 mb-1"
              style={{
                textAlign: 'left',
                alignItems: 'center',
              }}
            >
              {/* {() => {
                  useEffect(() => {
                    this.getFileFromAws(this.state.mbn, this.state.homework_id)
                  }, [])
                }} */}

              {recordFileList.map((val, key) => {
                var audioFile =
                  'https://englib.s3.ap-northeast-1.amazonaws.com/' +
                  val.filename
                return (
                  <>
                    <div>
                      <audio
                        src={audioFile}
                        controls="controls"
                        style={{
                          alignItems: 'center',
                          height: '30px',
                          paddingTop: '10px',
                        }}
                      />
                      [{val.regdate}/{val.regtime}]
                      <button
                        className="btn-sm btn-danger ml-2"
                        onClick={() => {
                          this.handleFileDel(
                            val.autoid,
                            val.member_barcode_num,
                            val.filename
                          )
                        }}
                      >
                        del
                      </button>
                      {val.title != '' && <br />}
                      {val.title != '' && val.title}
                      <hr />
                    </div>
                  </>
                )
              })}
              {/* {this.state.recordFileList.length > 0 &&
                  this.state.recordListView &&
                  this.state.recordFileList.map((val, key) => {
                    var audioFile =
                      'https://englib.s3.ap-northeast-1.amazonaws.com/' +
                      val.filename
                    return (
                      <>
                        <div>
                          <audio
                            src={audioFile}
                            controls="controls"
                            style={{
                              alignItems: 'center',
                              height: '30px',
                              paddingTop: '10px',
                            }}
                          />
                          [{val.regdate}/{val.regtime}]
                          <button
                            className="btn-sm btn-danger ml-2"
                            onClick={() => {
                              this.handleFileDel(
                                val.autoid,
                                val.member_barcode_num,
                                val.filename
                              )
                            }}
                          >
                            del
                          </button>
                          {val.title != '' && <br />}
                          {val.title != '' && val.title}
                          <hr />
                        </div>
                      </>
                    )
                  })} */}

              {!isdeleted && !isrecording && (
                <textarea
                  placeholder="recording title"
                  style={{
                    width: '100%',
                    height: '30px',
                    marginTop: 10,
                    marginBottom: 0,
                    alignItems: 'center',
                    overflow: 'auto',
                  }}
                  onChange={(e) => {
                    //this.setState({ record_comment: e.target.value })
                    setRecord_comment(e.target.value)
                  }}
                />
              )}
              <button
                //className="btn btn-primary mr-3"
                className="start-button mr-3 "
                //onClick={this.start}
                onClick={start()}
                //disabled={this.state.isrecording}
                disabled={isrecording}
                type="button"
                title="録音スタート"
              >
                <FontAwesomeIcon icon={faMicrophone} size="2x" color="red" />
              </button>
              <button
                className="start-button mr-3"
                //onClick={this.stop}
                onClick={stop()}
                //disabled={!this.state.isrecording}
                disabled={!isrecording}
                type="button"
                title="録音ストップボタン"
                // className="btn btn-danger mr-3"
              >
                <FontAwesomeIcon icon={faSave} size="2x" />
              </button>

              {!isdeleted && !isrecording && (
                <>
                  <audio
                    //src={this.state.blobUrl}
                    src={blobUrl}
                    controls="controls"
                    style={{
                      alignItems: 'center',
                      height: '30px',
                      paddingTop: '10px',
                    }}
                  />
                  {!recordListView ? (
                    <button
                      className="btn-sm btn-info"
                      // style={{ marginBottom: '5px' }}
                      onClick={() => {
                        // this.getFileFromAws(
                        //   this.state.mbn,
                        //   this.state.homework_id
                        // )
                        getFileFromAws(mbn, homework_id)
                      }}
                    >
                      See/Refresh Lists
                    </button>
                  ) : (
                    <button
                      className="btn-sm btn-info"
                      onClick={() => {
                        //this.handleViewList(false)
                        handleViewList(false)
                      }}
                    >
                      Hide Lists
                    </button>
                  )}
                </>
              )}
              {record_comment != '' && isrecording && <p>{record_comment}</p>}
              {isrecording && (
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: 'red',
                    paddingTop: '0px',
                    marginTop: 0,
                  }}
                >
                  recording.....
                </span>
              )}
              {/* {this.state.isRefreshBtn && (
                

                  <button
                    onClick={this.deleteAudio}
                    type="button"
                    className="btn btn-danger ml-2 mt-0 pb-0"
                    style={{ alignItems: 'center' }}
                  >
                    やりなおす
                  </button>
                )} */}
              {!isrecording && (
                <div>
                  {/* <p style={{ color: 'red' }}>
                    音声を録音するためには、赤いマイクボタンを押して下さい。
                  </p>
                  <p>
                    録音したら音声を聞いてみて、自分の発音を確認しましょう。
                    <br />
                    今日一番最後に録音したファイルだけ今日の宿題として先生に提出されます。
                  </p> */}
                </div>
              )}
            </div>
          </div>
          {isrecording && (
            <div className="col-lg-12">
              <WaveAppLessonPage />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
