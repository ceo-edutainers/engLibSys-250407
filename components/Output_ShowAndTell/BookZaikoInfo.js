import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'

import emailjs from 'emailjs-com'

const BookZaikoInfo = ({ mbn, tbn, teacher_name }) => {
  const [orderInfo, setOrderInfo] = useState([])
  const [canceled, setCanceled] = useState(false)
  console.log('this-mbn', mbn)
  console.log('this-tbn', tbn)
  console.log('this-teacher_name', teacher_name)
  const [viewBookStock, setViewBookStock] = useState(false)
  const [zaikoInfo, setZaikoInfo] = useState([])
  const [memberReadingLevelInfo, setMemberReadingLevelInfo] = useState([])
  const [zaikoInfoLength, setZaikoInfoLength] = useState()
  const [chooseZaiko, setChooseZaiko] = useState(false)
  const [orderedBook, setOrderedBook] = useState(false)
  const [sorryOrderBook, setSorryOrderBook] = useState(false)
  const [selectedZaikoAutoid, setSelectedZaikoAutoid] = useState()
  const [differentLevel, setDifferentLevel] = useState(false)

  //for email to student
  const [memberInfo, setMemberInfo] = useState([])
  const [memberMbn, setMemberMbn] = useState()
  const [emailStudent, setEmailStudent] = useState()
  const [studentName, setStudentName] = useState()
  const [zip, setZip] = useState()
  const [pref, setPref] = useState()
  const [city, setCity] = useState()
  const [addr, setAddr] = useState()
  const [phone, setPhone] = useState()
  const [seriesName, setSeriesName] = useState()
  const [readingLevel, setReadingLevel] = useState()
  const [bookTitle, setBookTitle] = useState()

  const [previouslyOrderedAlert, setPreviouslyOrderedAlert] = useState(false)

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    orderdNewBook()
  }, [mbn, tbn])

  function orderdNewBook() {
    var Url = DB_CONN_URL + '/ordered-book/' + mbn + '&' + tbn

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)
        setOrderInfo(response.data)
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
    fetchData()
  }

  useEffect(() => {
    checkZaiko()
    memberInfoFunc(mbn)
  }, [mbn, tbn])

  function checkZaiko() {
    var Url = DB_CONN_URL + '/check-zaiko/'

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setZaikoInfo(response.data)
        setZaikoInfoLength(response.data.length)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  function checkPreviouslyOrdered(
    seriesName,
    readingLevel,
    bookTitle,
    book_autoid
  ) {
    var Url =
      DB_CONN_URL +
      '/check-previously-ordered/' +
      mbn +
      '&' +
      seriesName +
      '&' +
      readingLevel +
      '&' +
      bookTitle

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)
        // alert(response.data.message)
        console.log('test:', response.data)
        if (response.data.message == 'already-ordered') {
          //すでに注文をしたので、Alertを出す。
          setPreviouslyOrderedAlert(true)
        } else {
          setSelectedZaikoAutoid(book_autoid)
          setSeriesName(seriesName)
          setReadingLevel(readingLevel)
          setBookTitle(bookTitle)

          setChooseZaiko(true) //SweetAlert : Do you choose it for the next book?
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  const [tutorInfoName, setTutorInfoName] = useState()
  const [tutorInfoEmail, setTutorInfoEmail] = useState()

  function handleGetTutorList(tbn) {
    var Url = DB_CONN_URL + '/tutor_all_info_tbn'
    axios
      .post(Url, {
        tbn: tbn,
      })
      .then((response) => {
        // setTutorInfo(response.data)
        setTutorInfoEmail(response.data.response[0].email)
        // console.log('TEST-email:', response.data.response[0].email)

        setTutorInfoName(response.data.response[0].first_name)
      })
  }

  function memberInfoFunc(mbn) {
    var Url = DB_CONN_URL + '/member_info_mbn'
    // alert('memberMbn' + memberMbn)

    axios
      .post(Url, {
        mbn: mbn,
      })
      .then((response) => {
        if (!response.data.status) {
          // alert(response.data.message) //for test
        } else {
          setMemberInfo(response.data.response)
          setEmailStudent(response.data.response[0].email)

          // if (response.data.response[0].email_urgent1 != '') {
          //   setEmailUrgent(response.data.response[0].email_urgent1)
          // }
          setStudentName(response.data.response[0].name_eng)
          setZip(response.data.response[0].zip)

          setPref(response.data.response[0].pref)
          setCity(response.data.response[0].city)
          setAddr(response.data.response[0].addr)
          setPhone(response.data.response[0].mobilephone)
        }
      })
  }

  //orderした時には管理者へのみメールを送る。生徒さんにはShippedのみ送るから、ここでは送らなくて大丈夫。
  function sendingEmail() {
    handleGetTutorList(tbn)
    //email to Admin, Admin2(Julia), Student
    var email_admin = 'ceo@edutainers.jp'
    // var bcc_email = 'ramakropolis2012@googlemail.com'
    // var email_admin2 = 'minjaekato@gmail.com'
    var email_student = emailStudent
    var name_eng = studentName
    var zipcode = zip
    var address = pref + city + ', ' + addr
    var tel = phone

    //email to Admin
    var templateParams = {
      to_email: email_admin,
      to_student_name: name_eng,
      reply_to: 'no-reply',
      from_name: 'engLib',
      // bcc_email: bcc_email,
      zipcode: zipcode,
      address: address,
      tel: tel,
      seriesName: seriesName,
      readingLevel: readingLevel,
      bookTitle: bookTitle,
    }
    var YOUR_SERVICE_ID = 'service_nu801ay'
    var YOUR_TEMPLATE_ID = 'template_4cyw8o7'
    var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
    emailjs.init(YOUR_USER_ID)
    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text, email_admin)
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )

    //email to Teacher
    var templateParams = {
      to_email: tutorInfoEmail,
      to_student_name: name_eng,
      to_tutor_name: tutorInfoName,
      reply_to: 'no-reply',
      from_name: 'engLib',
      // bcc_email: bcc_email,
      // zipcode: zipcode,
      // address: address,
      // tel: tel,
      seriesName: seriesName,
      readingLevel: readingLevel,
      bookTitle: bookTitle,
    }
    var YOUR_SERVICE_ID = 'service_nu801ay'
    var YOUR_TEMPLATE_ID = 'template_k412zvm'
    var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
    emailjs.init(YOUR_USER_ID)
    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text, tutorInfoEmail)
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )
  }

  function chooseZaikoFunc(book_autoid, seriesName, readingLevel, bookTitle) {
    // memberInfoFunc()
    checkZaiko()

    checkPreviouslyOrdered(seriesName, readingLevel, bookTitle, book_autoid)

    // readingLevelCheck(seriesName, readingLevel, book_autoid, bookTitle)
  }

  function orderNewBook() {
    //book_autoid: Zaiko DBのautoid,
    //book_count: 現在の在庫
    setChooseZaiko(false)
    var book_autoid = selectedZaikoAutoid
    // alert(book_autoid)
    var Url = DB_CONN_URL + '/update-minus-zaiko'

    const fetchData = async () => {
      try {
        const response = await axios
          .post(Url, {
            mbn: mbn,
            tbn: tbn,
            teacher_name: teacher_name,
            book_autoid: book_autoid,
            // book_count: book_count,
          })
          .then((response) => {
            // alert(response.data.message)
            if (response.data.status) {
              if (response.data.message == 'ordered successfully') {
                // alert(response.data.thisSeriesName)
                setSeriesName(response.data.thisSeriesName)
                setReadingLevel(response.data.readingLevel)
                setBookTitle(response.data.bookTitle)
                setOrderedBook(true)
                orderdNewBook()
                checkZaiko()
                sendingEmail()
                alert(response.data.message)
              } else if (response.data.message == 'no stock') {
                // alert(
                //   'We are sorry. Another order came in just a bit sooner, so the stock ran out before we could notify you. Please choose another item. / 申し訳ございません。他の注文が少しだけ早く入ったため、お知らせする間もなく在庫がなくなってしまいました。他の教材をお選び下さい。'
                // )

                setSorryOrderBook(true)
              }
            } else {
              //  alert(response.data.status)
            }
          })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  return (
    <>
      <div>
        {orderInfo?.map((val, key) => {
          var thisStatus = val.status
          if (thisStatus == 'Ordered') {
            var thisDate = val.orderedDate
          } else if (thisStatus == 'Seal Issued') {
            var thisDate = val.sealedDate
          } else if (thisStatus == 'Shipped') {
            var thisDate = val.shippedDate
          } else if (thisStatus == 'Arrived') {
            var thisDate = val.arrivedDate
          } else if (thisStatus == 'Returned') {
            var thisDate = val.returnedDate
          } else if (thisStatus == 'Reshipped') {
            var thisDate = val.reshippedDate
          }
          return (
            <>
              {val.length == 0 ? (
                <>no order data(from February,10,2024)</>
              ) : (
                <p>
                  <h4>
                    Last book you ordered for this student.&nbsp;
                    <span style={{ color: 'blue', fontSize: '15px' }}>
                      [{val.orderedDate}
                      &nbsp;{val.orderedTime}]
                    </span>
                  </h4>
                  {val.bookTitle}&nbsp;
                  <span style={{ fontWeight: 200, color: 'red' }}>
                    status：{val.status}&nbsp;[{thisDate}]
                  </span>
                  &nbsp;
                  <hr />
                </p>
              )}
            </>
          )
        })}
      </div>
      <div>
        {zaikoInfo?.map((val, key) => {
          return (
            <>
              <p>
                {val.seriesName}&nbsp;&nbsp;[{val.readingLevel}
                ]&nbsp;&nbsp;
                {val.zaiko < 1 ? (
                  <span
                    style={{
                      fontSize: '15',
                      fontWeight: 'bold',
                      color: 'red',
                    }}
                  >
                    [{val.zaiko}]
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: '15',
                      fontWeight: 'bold',
                      color: 'green',
                    }}
                  >
                    [{val.zaiko}]
                  </span>
                )}
                &nbsp;&nbsp;{val.bookTitle}
                {val.zaiko == 0 ? (
                  <>
                    {' '}
                    &nbsp;&nbsp;
                    <span
                      className="btn-sm btn-warning "
                      style={{ pointerEvents: 'none' }}
                    >
                      out of stock
                    </span>
                  </>
                ) : (
                  <>
                    {' '}
                    &nbsp;&nbsp;
                    <span
                      className="btn-sm btn-info "
                      onClick={() => {
                        chooseZaikoFunc(
                          val.autoid,
                          val.seriesName,
                          val.readingLevel,
                          val.bookTitle
                        )
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      order this book
                    </span>
                  </>
                )}
              </p>
            </>
          )
        })}
      </div>
      <SweetAlert
        title="Do you choose it for the next book?"
        show={chooseZaiko}
        onConfirm={() => orderNewBook()}
        onCancel={() => {
          setChooseZaiko(false)
        }}
        confirmBtnText="Yes"
        cancelBtnText="No"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          {seriesName}&nbsp;|&nbsp;
          {readingLevel}&nbsp;|&nbsp; {bookTitle}
        </p>
        <p>Press 'Yes' to place the order.</p>
      </SweetAlert>

      <SweetAlert
        title="Your order has been completed."
        show={orderedBook}
        onConfirm={() => setOrderedBook(false)}
        // onCancel={() => {
        //   setChooseZaiko(false)
        // }}
        confirmBtnText="OK"
        cancelBtnText="No"
        // showCancel={true}
        // reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          {seriesName}&nbsp;|&nbsp;
          {readingLevel}&nbsp;|&nbsp; {bookTitle}
        </p>
        <p>We plan to ship this book within a week.</p>
      </SweetAlert>

      <SweetAlert
        title="We are sorry. Another order came in just a bit sooner, so the stock ran out before we could notify you. Please choose another item. "
        show={sorryOrderBook}
        onConfirm={() => setSorryOrderBook(false)}
        // onCancel={() => {
        //   setChooseZaiko(false)
        // }}
        confirmBtnText="OK"
        cancelBtnText="No"
        // showCancel={true}
        // reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          申し訳ございません。他の注文が少しだけ早く入ったため、お知らせする間もなく在庫がなくなってしまいました。他の教材をお選び下さい。
        </p>
      </SweetAlert>
      <SweetAlert
        title="Do you want to cancel this order?"
        show={canceled}
        onConfirm={() => cancelFunc(false)}
        onCancel={() => {
          setCanceled(false)
        }}
        confirmBtnText="Yes"
        cancelBtnText="No"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>Press 'Yes' to cancel.</p>
      </SweetAlert>

      {/* <SweetAlert
        title="Because the material type or level assigned to this student is different, you cannot order this book.
        この生徒さんに設定されている教材の種類やレベルが異なるため、この本を注文することはできません。"
        show={differentLevel}
        onConfirm={() => setDifferentLevel(false)}
        // onCancel={() => {
        //   setDifferentLevel(false)
        // }}
        confirmBtnText="OK"
        // cancelBtnText="No"
        // showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          If you wish to order this book, please update the student’s material
          type and level correctly in advance.
        </p>
        <p>
          この本を注文するには、事前に会員の教材の種類やレベルを正しく更新してください。
        </p>
      </SweetAlert> */}

      <SweetAlert
        title="This book has already been sent to this student before. この本はすでにこの生徒さんに発送された履歴があります。"
        show={previouslyOrderedAlert}
        onConfirm={() => setPreviouslyOrderedAlert(false)}
        confirmBtnText="OK"
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          Please verify once again to ensure it does not result in a duplicate
          order.
        </p>
        <p>重複注文とならないよう、もう一度ご確認をお願いいたします。</p>
      </SweetAlert>
    </>
  )
}

export default BookZaikoInfo
