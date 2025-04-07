import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import S3 from 'react-aws-s3'
import emailjs from 'emailjs-com'
import TextareaAutosize from 'react-textarea-autosize'
import {
  myfun_weekdayToJapanese,
  myfun_getdayofweek,
  myfun_getdayofweekEng,
  myfun_myRegDate,
  myfun_myRegTime,
  myfun_getMyDate,
} from '@/components/FunctionComponent'

import axios from 'axios'
import DatePicker from 'react-datepicker'
import moment from 'moment-timezone'
import 'react-datepicker/dist/react-datepicker.css'
import { formatToTimeZone } from 'date-fns-timezone'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router'
import Preloader from '@/components/Preloader/Preloader'

const HurikaeAskNormalTimeNew = () => {
  //Preloader
  const [loader, setLoader] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])
  const DB_CONN_URL = process.env.DB_CONN_URL
  const fileInput = useRef()
  const [isFileAru, setIsFileAru] = useState(false)
  const [isPermettedFile, setIsPermettedFile] = useState(false)
  const [isFileSelected, setIsFileSenected] = useState(false)
  const [newFileName, setNewFileName] = useState('')

  const [hospitalReceitFile, setHospitalReceitFile] = useState()

  const [needPreload, setNeedPreload] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  //For sweet alert
  const [isOpen, setIsOpen] = useState(false)

  const [isAlreadyWaiting, setIsAlreadyWaiting] = useState(false)

  const [isPassedDate, setIsPassedDate] = useState(false)

  const [myLessonList, setMyLessonList] = useState([])

  const [startRegDate, setStartRegDate] = useState(new Date())

  var startDate = startRegDate

  const [nameEng, setNameEng] = useState()

  const [teacherNameEng, setTeacherNameEng] = useState()
  const [course, setCourse] = useState()
  const [courseName, setCourseName] = useState()
  const [subject, setSubject] = useState()
  const [courseSubject, setCourseSubject] = useState()
  const [duringTime, setDuringTime] = useState()
  const [absentWeekday, setAbsentWeekday] = useState()
  const [absentDate, setAbsentDate] = useState('')
  const [homeworkId, setHomeworkId] = useState('')

  const [absentTime, setAbsentTime] = useState()

  // const [lessonDateEight2, setLessonDateEight2] = useState()
  const router = useRouter() //使い方：router.replace('/')

  function gotoTop() {
    router.replace('/mytopGroup') // ここでリダイレクト
  }

  useEffect(() => {
    //emailがない場合、ログアウトさせる。
    var email = localStorage.getItem('email')
    if (email == '') {
      alert(
        'セッションが切れましたので、もう一度ログインしてからやり直してください。'
      )
      logOut()
    }
  }, [])

  let logOut = () => {
    // setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('MypageMbn', '')
    localStorage.removeItem('userName', '')
    localStorage.removeItem('cbn', '')
    localStorage.removeItem('bbn', '')
    localStorage.removeItem('memberSort', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginGroup')
  }

  useEffect(() => {
    getLessonTime()
  }, [])

  //getLessonTime (レッスンの長さ:分を知る)
  function getLessonTime() {
    // handleAllHuriAddWaitingDelete()

    var mbn = localStorage.getItem('MypageMbn')

    axios
      .post(DB_CONN_URL + '/list-my-urgent-lesson-cancel-for-oneweek', {
        mbn: mbn,
      })
      .then((response) => {
        if (!response.data.status) {
          // alert('no' + response.data.message) //for test
        } else {
          setMyLessonList(response.data.response)
        }
      })
  }

  function goToMyTop() {
    router.replace('/mytopGroup') // ここでリダイレクト
  }

  const handleClick = (event) => {
    event.preventDefault()
    let newArr = fileInput.current.files
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i], i)
    }
  }

  const handleUpload = (file, i) => {
    var mbn = localStorage.getItem('MypageMbn')
    // alert('file' + file)
    var parts = []
    parts = fileInput.current.files[0].name.split('.')
    var ext = parts[1]
    // alert('ext' + ext)
    if (
      ext !== 'jpg' &&
      ext !== 'jpeg' &&
      ext !== 'png' &&
      ext !== 'JPG' &&
      ext !== 'JPEG' &&
      ext !== 'PNG' &&
      ext !== 'pdf'
    ) {
      setIsPermettedFile(true)
      return false
    }

    var dateVariable = new Date()
    var nowDate = dateVariable.getDate()
    var nowTime = dateVariable.getTime()
    var fileTime = nowDate + nowTime

    let newfilename =
      'urgentReceit' +
      '_' +
      mbn +
      '_' +
      homeworkId +
      '_' +
      nowDate +
      '_' +
      i +
      '_' +
      fileTime +
      '.' +
      ext
    setNewFileName(newfilename)
    setIsUploading(true)
    // alert(newfilename)
    console.log('newFileName:', newFileName)

    //let newFileName = fileInput.current.files[0].name.replace(/\..+$/, '')

    const config = {
      bucketName: process.env.S3_REACT_APP_BUCKET_NAME /**いつもenglib */,
      dirName: process.env.S3_REACT_APP_DIR_NAME2 /* optional */,
      region: process.env.S3_REACT_APP_REGION,
      accessKeyId: process.env.S3_REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.S3_REACT_APP_ACCESS_KEY,
    }

    const ReactS3Client = new S3(config)
    ReactS3Client.uploadFile(file, newfilename).then((data) => {
      // console.log(data)
      //正常の場合
      // console.log('fileDetail:', fileDetail)
      if (data.status === 204) {
        receitHistoryUpdate(newfilename)
        // setIsOpenBackMypage(true)
      } else {
        console.log('fail')
      }
    })
  }

  const receitHistoryUpdate = (newFileName) => {
    // console.log('test;', currentStep)

    var mbn = localStorage.getItem('MypageMbn')
    var fileUrl =
      'https://englib.s3.ap-northeast-1.amazonaws.com/uploadhw/' + newFileName
    // alert(newFileName)

    var homework_id = homeworkId
    var url = DB_CONN_URL + '/update-receit-upload/'
    axios
      .put(url + mbn + '&' + homework_id + '&' + fileUrl)

      .then((response) => {
        alert(response.data.message)
        setHospitalReceitFile(fileUrl)
        setNeedPreload(false)
        setIsFileAru(false)
      })
  }

  const sendEmailtoStudent = () => {
    var email = localStorage.getItem('email')

    // alert(email)

    //test//////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    // var email = 'minjaekato@gmail.com'//TEST
    var absentWeekdayJpn = myfun_getdayofweek(absentDate)

    var templateParams = {
      to_email: email,
      to_name: nameEng,
      reply_to: 'no-reply',
      from_name: 'engLib',
      course: course,
      courseName: courseName,
      courseSubject: courseSubject,
      absentWeekday: absentWeekdayJpn,
      absentDate: absentDate,
      absentTime: absentTime,
      duringTime: duringTime,
      teacherNameEng: teacherNameEng,
    }
    var YOUR_SERVICE_ID = 'service_nu801ay'
    var YOUR_TEMPLATE_ID = 'template_ne0700c'
    var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
    emailjs.init(YOUR_USER_ID)
    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
      function (response) {
        console.log(
          'SUCCESS STUDENT MAIL!',
          response.status,
          response.text,
          email
        )
      },
      function (error) {
        console.log('FAILED...STUDENT MAIL', error)
      }
    )
  }

  return (
    <>
      <div>
        {needPreload && <Preloader />}
        <div className="row p-0 m-0">
          <div
            className="col-sm-12 ml-0 mb-4"
            style={{
              border: '1px solid #cc99ff',
              borderRadius: '10px',
              padding: 10,
            }}
          >
            <h4>当日キャンセルレッスンの履歴</h4>
            <p style={{ color: '#696969', marginBottom: 0 }}>
              当日キャンセルリストから緊急に該当するレッスンを選んで領収書など証明書をアップロードすることができます。
              証明書はキャンセルされた当日の日付のみ可能です。当日キャンセルされたレッスン日が一週間以上過ぎた場合はリストに出ません。
            </p>
          </div>

          <div className="col-sm-12 mb-0 mt-0 ml-0 p-0">
            <h6 style={{ color: '#696969' }}>
              アップロードボタンを押して証明書をアップロードしてください。
              <br />
            </h6>
            <hr />
            <div
              className="col-lg-12 ml-0 mb-2"
              style={{
                textAlign: 'left',
                color: 'black',
                paddingLeft: '10%',
              }}
            >
              <div className="col-sm-12 ml-0 ">
                {myLessonList?.map((val, key) => {
                  //member_lesson_set & sys_member から持ってくる
                  return (
                    <>
                      <form className="upload-steps" onSubmit={handleClick}>
                        <div className="form-group row  mb-0">
                          <div className="form-check">
                            <label
                              className="form-check-label mb-2 font-weight-bold h6"
                              for="gridRadios1"
                            >
                              {val.subject}コース:&nbsp;[
                              {myfun_weekdayToJapanese(val.yoyakuWeekday)}]
                              {val.yoyakuDate}&nbsp;|&nbsp;
                              {val.yoyakuTime}〜 &nbsp;&nbsp; 担当先生：
                              {val.teacher_name}
                            </label>
                            {/* <span
                            className="btn btn-info mb-2 ml-2 pl-2 pr-2 h6 text-white font-weight-bold"
                            onClick={() => {
                              // handleAllHurikaeReg(homeworkId)
                            }}
                            style={{ fontWeight: 500 }}
                            disabled={hurikaeList2.length == 0 && 'disabled'}
                          >
                            ファイル選択
                          </span> */}
                            <label
                              className="btn btn-warning"
                              style={{
                                position: 'relative',
                                overflow: 'hidden',
                                fontAlign: 'center',
                                width: '100%',
                                height: '80px',
                                paddingTop: '2px',
                                fontSize: '16px',
                                borderRadius: '10px',
                                fontWeight: '600',
                              }}
                            >
                              ファイル選択
                              <input
                                type="file"
                                ref={fileInput}
                                accept=".jpg, .jpeg, .png, .pdf"
                                onChange={() => {
                                  setIsFileAru(true)
                                  setHomeworkId(val.homework_id)
                                }}
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  right: 0,
                                  margin: 0,
                                  padding: 0,
                                  fontSize: '20px',
                                  cursor: 'pointer',
                                  opacity: 0,
                                }}
                                multiple
                              />
                            </label>

                            {isFileAru ? (
                              <>
                                <button
                                  style={{
                                    fontWeight: '600',
                                    padding: '10px',
                                    color: 'white',
                                    fontSize: '18px',

                                    border: '1px solid white',
                                    borderRadius: '10px',
                                    backgroundColor: 'red',
                                    verticalAlign: 'middle',
                                    width: '100%',

                                    marginLeft: 0,
                                    marginRight: 0,
                                    cursor: 'pointer',
                                    marginTop: 0,
                                  }}
                                >
                                  <img
                                    src="/images/homework-upload.png"
                                    style={{ height: '50px', width: 'auto' }}
                                  />
                                  アップロード
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  style={{
                                    fontWeight: '600',
                                    padding: '10px',
                                    color: 'black',
                                    fontSize: '18px',
                                    border: '1px solid violet',
                                    borderRadius: '10px',
                                    backgroundColor: '#F0E5F7',
                                    verticalAlign: 'middle',
                                    width: '100%',
                                    marginLeft: 0,
                                    marginRight: 0,
                                    cursor: 'pointer',
                                  }}
                                >
                                  <img
                                    src="/images/homework-upload.png"
                                    style={{ height: '50px', width: 'auto' }}
                                  />
                                  アップロード
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </form>
                    </>
                  )
                })}
                <hr />
                <img
                  src={hospitalReceitFile}
                  style={{
                    paddingTop: 0,
                    marginTop: 0,
                    border: '1px solid #dedede',
                    width: '95%',
                    maxWidth: '800px',
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className="col-lg-12 col-md-12  p-0 mt-5"
            style={{
              textAlign: 'center',
            }}
          >
            <span
              className="btn btn-info mr-3 "
              style={{
                borderRadius: '10px',
                margin: 0,
                paddingLeft: 5,
                paddingRight: 5,

                fontSize: '20px',
                fontWeight: 'normal',
                color: 'white',
              }}
              onClick={() => {
                gotoTop()
              }}
            >
              BEN TOPへ戻る
            </span>
          </div>

          <div className="col-sm-12 mt-3 mb-0 text-center">
            {/* <SweetAlert
              success
              //custom //custom or success or warning or input//
              //customIcon="https://raw.githubusercontent.com/djorg83/react-bootstrap-sweetalert/master/demo/assets/thumbs-up.jpg"
              //showCancel
              //style={{ backgroundColor: 'white', color: 'white' }}
              show={isOpen} //Notice how we bind the show property to our component state
              confirmBtnText="OK"
              confirmBtnBsStyle={'danger'}
              //cancelBtnText="No"
              confirmBtnBsStyle="primary"
              //title="Are you sure?"
              title={
                <span>
                  リストに追加しました。<small></small>!
                </span>
              }
              onConfirm={() => setIsOpen(false)}
              // onCancel={() => {
              //   console.log('bye')
              //   setIsOpen(false) // Don't forget to close the modal
              // }}

              // focusCancelBtn
            >
              希望日はできるだけ多めに設定して下さい。
            </SweetAlert> */}
            <SweetAlert
              show={isOpen}
              confirmBtnText="OK"
              confirmBtnBsStyle={'danger'}
              //cancelBtnText="No"
              // confirmBtnBsStyle="primary"
              title="追加しました！"
              onConfirm={() => setIsOpen(false)}
              //onCancel={this.onCancel}
            />

            <SweetAlert
              title="ファイルをアップロードします。"
              show={isUploading}
              onConfirm={() => {
                setIsUploading(false)
                setNeedPreload(true)
              }}
              // onCancel={() => {
              //   setIsUploading(false)
              // }}
              // confirmBtnText="わかりました。"
              // cancelBtnText="しない"
              showCancel={false}
              reverseButtons={true}
              style={{ fontSize: '12px', width: '40%', minWidth: '200px' }}
            ></SweetAlert>
            <SweetAlert
              title="過ぎたレッスンです。新しい課題が設定されてないため、振替設定できません。"
              show={isPassedDate}
              onConfirm={() => goToMyTop()}
              onCancel={() => {
                setIsPassedDate(false)
              }}
              confirmBtnText="わかりました。"
              // cancelBtnText="しない"
              showCancel={false}
              reverseButtons={true}
              style={{ fontSize: '12px', width: '50%', minWidth: '200px' }}
            >
              <p style={{ color: 'black' }}>
                先生が次の課題を設定するまで少しお時間かかる場合があります。少々お待ちください。
              </p>
              <p style={{ color: 'red' }}>
                レッスン後5時間が過ぎても新しい課題が設定されない場合は、イングリブの窓口までお問い合わせください。online-help@edutainers.jp
              </p>
            </SweetAlert>
            <SweetAlert
              title="すでに振替申し込みをしているレッスンです。"
              show={isAlreadyWaiting}
              onConfirm={() => goToMyTop()}
              onCancel={() => {}}
              confirmBtnText="わかりました。"
              // cancelBtnText="しない"
              showCancel={false}
              reverseButtons={true}
              style={{ fontSize: '12px', width: '50%', minWidth: '200px' }}
            >
              <p style={{ color: 'red' }}>
                振替申し込み後、通常は24時間以内に先生から連絡が届きますので、少々お待ちください。先生の方で対応できない場合は、3ヶ月有効なチケットとして保存されます。
                申し込み後24時間以上時間が経っても振替申し込み結果メールが届かない場合は、イングリブの窓口までお問い合わせください。online-help@edutainers.jp
              </p>
            </SweetAlert>

            <SweetAlert
              title="許可されてないファイル形式です。"
              show={isPermettedFile}
              onConfirm={() => setIsPermettedFile(false)}
              // onCancel={() => {
              //   setIsPermettedFile(false)
              // }}
              confirmBtnText="OK"
              // cancelBtnText="NO"
              showCancel={false}
              reverseButtons={true}
              style={{ width: '500px' }}
            >
              <p>
                アップロード可能なファイルは、jpg/jpeg/png/pdfファイルのみです。
              </p>
            </SweetAlert>
            <SweetAlert
              title="ファイルを選択してください。"
              font-ize="15px"
              show={isFileSelected}
              onConfirm={() => setIsFileSenected(false)}
              // onCancel={() => {
              //   setIsPermettedFile(false)
              // }}
              confirmBtnText="OK"
              // cancelBtnText="NO"
              showCancel={false}
              reverseButtons={true}
              style={{ width: '500px' }}
            >
              {/* <p>
            アップロード可能なファイルは、jpg/jpeg/png/pdfファイルのみです。
          </p> */}
            </SweetAlert>
          </div>
        </div>
      </div>
    </>
  )
}

export default HurikaeAskNormalTimeNew
