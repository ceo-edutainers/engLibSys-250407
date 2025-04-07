import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'

const BookZaikoInfo = ({ mbn, tbn, teacher_name }) => {
  console.log('this-mbn', mbn)
  console.log('this-tbn', tbn)
  console.log('this-teacher_name', teacher_name)
  const [viewBookStock, setViewBookStock] = useState(false)
  const [zaikoInfo, setZaikoInfo] = useState([])
  const [zaikoInfoLength, setZaikoInfoLength] = useState()
  const [chooseZaiko, setChooseZaiko] = useState(false)
  const [orderedBook, setOrderedBook] = useState(false)
  const [sorryOrderBook, setSorryOrderBook] = useState(false)
  const [selectedZaikoAutoid, setSelectedZaikoAutoid] = useState()

  const [seriesName, setSeriesName] = useState()
  const [readingLevel, setReadingLevel] = useState()
  const [bookTitle, setBookTitle] = useState()

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    checkZaiko()
  }, [])

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

  function chooseZaikoFunc(book_autoid, seriesName, readingLevel, bookTitle) {
    checkZaiko()
    setSelectedZaikoAutoid(book_autoid)
    setSeriesName(seriesName)
    setReadingLevel(readingLevel)
    setBookTitle(bookTitle)
    // if (selectedZaikoAutoid != '' && selectedZaikoAutoid != null) {
    setChooseZaiko(true)
    // }
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
                checkZaiko()
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
      {/* <MediaQuery query="(min-width: 767px)"> */}
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
    </>
  )
}

export default BookZaikoInfo
