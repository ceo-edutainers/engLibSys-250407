import react, { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import Link from 'next/link'

const AlertTop1 = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const [chapterInfo, setChapterInfo] = useState([])
  const [bookInfo, setBookInfo] = useState([])
  const [bookChapterInfo, setBookChapterInfo] = useState([])
  useEffect(() => {
    if (localStorage.getItem('G_loginStatus') == 'true') {
      var cbn = localStorage.getItem('cbm')
      var url = DB_CONN_URL + '/get-member-book-chapter-history-total/'
      var Url = url + cbn

      const fetchData = async () => {
        try {
          const response = await axios.get(Url)

          setBookChapterInfo(response.data.response)

          // alert('message2' + response.data.message)
          // alert('totalBook' + response.data.totalBook)
          // alert('length' + response.data.length)
          // console.log('bookinfo:', response.data.response)
        } catch (error) {
          alert(error)
        }
      }
      fetchData()
    }
  }, [])
  // useEffect(() => {
  //   if (localStorage.getItem('G_loginStatus') == 'true') {
  //     var cbn = localStorage.getItem('cbm')
  //     var url = DB_CONN_URL + '/get-member-chapter-history-total/'
  //     var Url = url + cbn

  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(Url)

  //         setChapterInfo(response.data.response)

  //         // alert('message2' + response.data.message)
  //         // alert('totalBook' + response.data.totalBook)
  //         // alert('length' + response.data.length)
  //         // console.log('bookinfo:', response.data.response)
  //       } catch (error) {
  //         alert(error)
  //       }
  //     }
  //     fetchData()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (localStorage.getItem('G_loginStatus') == 'true') {
  //     var cbn = localStorage.getItem('cbm')
  //     var url = DB_CONN_URL + '/get-member-book-total/'
  //     var Url = url + cbn

  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(Url)

  //         setBookInfo(response.data.response)

  //         // alert('message2' + response.data.message)
  //         // alert('totalBook' + response.data.totalBook)
  //         // alert('length' + response.data.length)
  //         // console.log('bookinfo:', response.data.response)
  //       } catch (error) {
  //         alert(error)
  //       }
  //     }
  //     fetchData()
  //   }
  // }, [])
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
        <h2 style={{ fontWeight: '600' }}>Books read so far</h2>
        <hr />
        <b>
          {' '}
          <span style={{ color: 'green' }}>本一冊あたり平均7~10チャプター</span>
        </b>

        <table className="table table-striped text-right mt-3">
          <thead>
            <tr>
              {/* <th style={{ width: '15px' }}>#</th> */}
              <th scope="col">Start Date</th>
              <th scope="col">Name</th>
              <th scope="col">Total Book</th>
              <th scope="col">Total Chapter</th>
              {/* <th scope="col" style={{ width: '10%', textAlign: 'center' }}>
                詳細
              </th> */}
            </tr>
          </thead>
          <tbody>
            {bookChapterInfo &&
              bookChapterInfo.map((val, key) => {
                var totalChapter = val.totalChapter - 1
                return (
                  <>
                    <tr>
                      {/* <th style={{ width: '15px' }}> {key + 1}.</th> */}
                      <td
                        style={{
                          width: '15%px',
                        }}
                      >
                        {val.regdate}
                      </td>
                      <td
                        style={{
                          width: '40%px',
                        }}
                      >
                        {val.name_eng}
                      </td>
                      <td
                        style={{
                          width: '20%px',
                          textAlign: 'center',
                        }}
                      >
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                          {val.totalBook.toLocaleString()}
                        </span>
                      </td>
                      <td
                        style={{
                          width: '25%px',
                          textAlign: 'center',
                        }}
                      >
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                          {totalChapter.toLocaleString()}
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
                        >
                          詳細
                        </a>
                      </td> */}
                    </tr>
                  </>
                )
              })}{' '}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AlertTop1
