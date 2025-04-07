import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize'
import SweetAlert from 'react-bootstrap-sweetalert'
import emailjs from 'emailjs-com'
import { response } from 'express'

const ViewToMomAdd = ({
  mbn,
  name_eng,
  tbn,
  teacher_name,
  homework_id,
  subject,
}) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const inputRef = useRef()
  // const [grammarView, setGrammarView] = useState(false) //IdeaView
  const [memoInfo, setMemoInfo] = useState([])

  const [momMessage, setMomMessage] = useState([])
  const [isSentMessage, setIsSentMessage] = useState(false)
  // const [viewVerb, setViewVerb] = useState(false)
  // const [searchTermName, setSearchTermName] = useState('')
  // const [clearBtn, setClearBtn] = useState('')
  const [checkAlreadyMomChecked, setCheckAlreadyMomChecked] = useState('')

  useEffect(() => {
    getMessageInfo()
  }, [])
  function getMessageInfo() {
    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-info/'
        axios.get(url + mbn + '&' + homework_id)

        if (response.data.status) {
          if (response.data.respons[0].chkMemo == 'ok') {
            setCheckAlreadyMomChecked('ok')
          } else {
            setCheckAlreadyMomChecked('no')
          }
        }
      } catch (error) {
        // alert('error1' + error)
        console.log(error)
      }
    }
    fetchData()
  }

  function sendMessage() {
    // alert(mbn)
    // alert(homework_id)
    // alert(momMessage)

    const fetchData = async () => {
      if (checkAlreadyMomChecked == 'ok') {
        alert('The message has already been checked and cannot be modified.')
      }
      try {
        var url = DB_CONN_URL + '/add-message-to-mom-test'

        axios
          .post(url, {
            mbn: mbn,
            homework_id: homework_id,
            memo: momMessage,
          })
          .then((response) => {
            //email to mom
            sendEmailtoStudent()
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function sentSuccess() {
    setMomMessage()
    setIsSentMessage(false)
  }

  const sendEmailtoStudent = () => {
    // alert('1')
    const fetchData1 = async () => {
      try {
        var url = DB_CONN_URL + '/get-member-info-joined/'
        var Url = url + mbn + '&' + homework_id

        axios.get(Url).then((response) => {
          // alert(response.data.message)
          // alert(response.data.response[0].email1)
          // alert(response.data.response[0].email2)
          // alert(response.data.response[0].course)
          // alert(response.data.response[0].courseName)
          // alert(response.data.response[0].yoyakuWeekday)
          // alert(response.data.response[0].yoyakuDate)
          // alert(response.data.response[0].yoyakuTime)
          // alert(response.data.response[0].teacher_name)

          var email1 = response.data.response[0].email1

          if (response.data.response[0].email2 == '') {
            var email2 = ''
          } else {
            var email2 = response.data.response[0].email2
          }

          var name_eng = response.data.response[0].name_eng
          var course = response.data.response[0].course
          var courseName = response.data.response[0].courseName
          var yoyakuWeekday = response.data.response[0].yoyakuWeekday
          var yoyakuDate = response.data.response[0].yoyakuDate
          var yoyakuTime = response.data.response[0].yoyakuTime
          var teacherNameEng = response.data.response[0].teacher_name
          var ok_link =
            'https://www.myben.app/mailConfirm/confirmTutorFeedback?m=' +
            mbn +
            '&hid=' +
            homework_id

          //もし緊急メール(email2)があればそれも同時に送る。
          if (email2 != '') {
            var templateParams = {
              to_email: email2,
              to_student_name: name_eng,
              reply_to: 'no-reply',
              from_name: 'engLib',
              course: course,
              courseName: courseName,
              courseSubject: subject,
              yoyakuWeekday: yoyakuWeekday,
              yoyakuDate: yoyakuDate,
              yoyakuTime: yoyakuTime,
              tutor_name: teacherNameEng,
              tutor_memo: momMessage,
              ok_link: ok_link,
            }
            var YOUR_SERVICE_ID = 'service_nu801ay'
            var YOUR_TEMPLATE_ID = 'template_ufgqwhd'
            var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
            emailjs.init(YOUR_USER_ID)
            emailjs
              .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams)
              .then(
                function (response) {
                  console.log(
                    'SUCCESS!',
                    response.status,
                    response.text,
                    email2
                  )
                },
                function (error) {
                  console.log('FAILED...', error)
                }
              )
          }

          var templateParams = {
            to_email: email1,
            to_student_name: name_eng,
            reply_to: 'no-reply',
            from_name: 'engLib',
            course: course,
            courseName: courseName,
            courseSubject: subject,
            yoyakuWeekday: yoyakuWeekday,
            yoyakuDate: yoyakuDate,
            yoyakuTime: yoyakuTime,
            tutor_name: teacherNameEng,
            tutor_memo: momMessage,
            ok_link: ok_link,
          }
          var YOUR_SERVICE_ID = 'service_nu801ay'
          var YOUR_TEMPLATE_ID = 'template_ufgqwhd'
          var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
          emailjs.init(YOUR_USER_ID)
          emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
            function (response) {
              console.log('SUCCESS!', response.status, response.text, email1)
              //1個目のメールは誰にでも行くので、それが成功したら成功メッセージを送る
              setIsSentMessage(true)
            },
            function (error) {
              alert('Delivery failed. Please contact your administrator.')
              console.log('FAILED...', error)
            }
          )
        })
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
        <br />
        <h2>Message to Mom</h2>
        <h7>
          You can send additional messages after setting up a new homework.
          <br />
          <br />
          <h6 style={{ fontWeight: 'bold', color: 'red' }}>[Caution]</h6>
          It is not possible to modify a message that has already been checked.
        </h7>

        <div
          className="col-lg-8 col-md-12 mt-2 pt-5 mb-5"
          style={{
            textAlign: 'center',
            overflow: 'scroll',
            backgroundColor: 'white',
            fontSize: '14px',
          }}
        >
          {checkAlreadyMomChecked && (
            <>
              <TextareaAutosize
                className="tour-step2 tour-step5 mb-3 p-2"
                aria-label="minimum height"
                minRows={10}
                onChange={(e) => {
                  setMomMessage(e.target.value)
                }}
                type="text"
                style={{ width: '60%', verticalAlign: 'middle' }}
                disabled={checkAlreadyMomChecked == 'ok' && 'disabled'}
                // placeholder=""
              />
              <br />
              <span
                className="btn btn-outline-danger mb-3"
                onClick={() => {
                  sendMessage()
                }}
              >
                Send Message to Mom(Student)
              </span>
            </>
          )}
        </div>
        <SweetAlert
          title="Your message has been sent successfully"
          show={isSentMessage}
          // onConfirm={() => saveNewHW('new')}
          onConfirm={
            () => sentSuccess()

            // setIsSentMessage(false)
          }
          // onCancel={() => {
          //   setIsFinishThisLesson(false)
          // }}
          // confirmBtnText="OK"
          // cancelBtnText="NO"
          showCancel={false}
          reverseButtons={true}
          style={{ width: '600px' }}
        ></SweetAlert>
      </center>
    </>
  )
}

export default ViewToMomAdd
