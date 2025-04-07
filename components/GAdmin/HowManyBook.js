import react, { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import Link from 'next/link'

const AlertTop1 = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [bookInfo, setBookInfo] = useState([])
  const [bookCounts, setBookCounts] = useState([])
  const [myBookCount, setMyBookCount] = useState()
  // useEffect(() => {
  //   if (localStorage.getItem('G_loginStatus') == 'true') {
  //     var cbn = localStorage.getItem('cbm')
  //     var url = DB_CONN_URL + '/get-sys_member_lesson_set_GroupAdmin/'
  //     var Url = url + cbn
  //     const fetchData1 = async () => {
  //       try {
  //         axios.get(Url).then((response) => {
  //           if (!response.data.status) {
  //           } else {
  //             setBasicInfo(response.data.response)
  //           }
  //         })
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }

  //     fetchData1()
  //   }
  // }, [])

  useEffect(() => {
    if (localStorage.getItem('G_loginStatus') == 'true') {
      var cbn = localStorage.getItem('cbm')
      var url = DB_CONN_URL + '/get-member-book-history-total/'
      var Url = url + cbn

      const fetchData = async () => {
        try {
          const response = await axios.get(Url)

          setBookInfo(response.data.response)
          // alert('message1' + response.data.message)
          // alert('totalBook' + response.data.totalBook)
          // alert('length' + response.data.length)
          console.log('bookinfo:', response.data.response)
        } catch (error) {
          alert(error)
        }
      }
      fetchData()
    }
  }, [])

  useEffect(() => {
    var cbn = localStorage.getItem('cbm')
    var url = DB_CONN_URL + '/get-member-book-count-total/'
    var Url = url + cbn

    const fetchData2 = async () => {
      try {
        const response = await axios.get(Url)

        setBookCounts(response.data)
        console.log('setBookCount', response.data)
      } catch (error) {
        alert(error)
      }
    }
    fetchData2()
  }, [bookInfo])
  // function howManyBook(mbn) {
  //   var url = DB_CONN_URL + '/get-member-book-count-total/'
  //   var Url = url + mbn
  //   console.log('###Url', Url)
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(Url)
  //       // alert('totalBook' + response.data.response.totalBook)
  //       // alert('message1' + response.data.message)
  //       setBookCount(response.data.totalBook)
  //       var bc = response.data.totalBook

  //       // alert('totalBook' + response.data.totalBook)
  //       // alert('length' + response.data.length)
  //       console.log('###totalbook:', response.data.totalBook)
  //     } catch (error) {
  //       alert(error)
  //     }

  //     return bc
  //   }

  //   fetchData()
  // }

  return (
    <>
      <div
        className=" pb-2 pt-3 pl-3 pr-3"
        style={{
          backgroundColor: '#F7F7F7',
          border: '1px solid #dedede',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontWeight: '600' }}> New Book Order</h2>
        <hr />
        <b>
          {' '}
          <span style={{ color: 'green' }}>１０ Latest Orders</span>{' '}
          <a
            className="btn btn-danger ml-2"
            // href={detailRankingPoint}
            // target="_blank"
            onClick={() => {
              setIsNotReady(true)
            }}
            style={{ color: 'white' }}
          >
            more
          </a>
        </b>
        {/* <hr />
        {bookInfo &&
          bookInfo.map((val, key) => {
            var tp = parseInt(val.totalBook / 3)
            // var bc = howManyBook(val.member_barcode_num)
            var member_barcode_num = val.member_barcode_num
            var bookTitle = val.bookTitle
            return (
              <>
                <p>
                  <span className="btn btn-info pt-0 pb-0 mr-2">詳細</span>
                  <strong>
                    {val.name_eng}&nbsp;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{ color: 'red' }}>
                      &nbsp;[{val.readingLevel}]&nbsp;{val.bookTitle}
                    </span>
                    {bookCounts.map((val1, key1) => {
                      var count = 1
                      count = 1 + key1
                      return (
                        <>
                          {member_barcode_num == val1.member_barcode_num &&
                            bookTitle == val1.bookTitle && (
                              <span>[{val1.regdate}]</span>
                              // {val1.bookTitle}[{count}]
                            )}
                        </>
                      )
                    })}
                    <br />
                  </strong>
                </p>
              </>
            )
          })} */}

        <table className="table table-striped text-right mt-3">
          <thead>
            <tr>
              {/* <th style={{ width: '15px' }}>#</th> */}
              <th scope="col">Order</th>
              <th scope="col">Name</th>
              <th scope="col">Level</th>
              <th scope="col" style={{ textAlign: 'left' }}>
                BookTitle
              </th>

              {/* <th scope="col" style={{ width: '10%', textAlign: 'center' }}>
                詳細
              </th> */}
            </tr>
          </thead>
          <tbody>
            {bookCounts.slice(0, 10).map((val1, key1) => {
              return (
                <>
                  {/* {member_barcode_num == val1.member_barcode_num && ( */}
                  <tr>
                    {/* <th style={{ width: '15px' }}> {key + 1}.</th> */}

                    <td
                      style={{
                        width: '20%',
                      }}
                    >
                      {val1.regdate}
                    </td>
                    <td
                      style={{
                        width: '25%',
                      }}
                    >
                      {val1.name_eng}
                    </td>
                    <td
                      style={{
                        width: '15%',
                      }}
                    >
                      <span
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        {val1.readingLevel}
                      </span>
                    </td>
                    <td
                      style={{
                        width: '30%',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        <span style={{ color: 'green' }}>{val1.bookTitle}</span>
                      </span>
                    </td>
                    {/* <td
                      style={{
                        width: '10%',
                        fontSize: '15px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      <a
                        className="btn btn-primary"
                        // href={detailRankingPoint}
                        // target="_blank"
                        onClick=" setIsNotReady(true)"
                        style={{ color: 'white' }}
                      >
                        詳細
                      </a>
                    </td> */}
                  </tr>
                  {/* <p>
                    <strong>
                      *&nbsp; {val1.name_eng}&nbsp;
                      <span style={{ color: 'red' }}>
                        [{val1.readingLevel}]&nbsp;
                      </span>
                      <span style={{ color: 'green' }}>{val1.bookTitle}</span>
                    </strong>{' '}
                    [{val1.regdate}]
                  </p> */}
                  {/* )} */}
                </>
              )
            })}{' '}
          </tbody>
        </table>
        {/* {bookCount &&
          bookCount.map((val, key) => {
            var tp = parseInt(val.totalBook / 3)
            return (
              <>
                <p>
                  <span className="btn btn-info pt-0 pb-0 mr-2">詳細</span>
                  <strong>
                    {val.name_eng}&nbsp;[{val.regdate}]&nbsp;[{tp}
                    ]冊目
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{ color: 'red' }}>
                      &nbsp;[{val.readingLevel}]&nbsp;{val.bookTitle}
                    </span>
                  </strong>
                </p>
              </>
            )
          })} */}
      </div>
    </>
  )
}

export default AlertTop1
