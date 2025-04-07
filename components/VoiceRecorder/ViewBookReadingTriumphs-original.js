import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'

const ViewBookReadingTriumphs = ({
  readingLevel,
  storyTitle,
  storyNum,
  seriesName,
  bookNum,
}) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [bookUrl, setBookUrl] = useState()
  const [localFile, setLocalFile] = useState()
  const [webFileUrl, setWebFileUrl] = useState()

  //Reading Triuphs H.W Autoid Info
  function getRTurl(rL, bN, sN) {
    var Url = DB_CONN_URL + '/get-rt-autoid-info/' + rL + '&' + bN + '&' + sN

    const fetchData = async () => {
      try {
        axios.get(Url).then((response) => {
          if (response.data.length > 0) {
            var fsl =
              'https://www.myenglib.com/onlesson/pdfviewer.php?sort=reading_triumphs&file=' +
              response.data[0].pdf1 +
              '&readingLevel=' +
              rL

            setBookUrl(fsl)
            var localurl =
              '/files/myenglib/Reading Triumphs/' + response.data[0].pdf1
            setLocalFile(localurl)
            var webfile =
              'https://www.myenglib.com/myenglib/materials/reading/Reading_Triumphs/G5/book/' +
              response.data[0].pdf1
            setWebFileUrl(webfile)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function getBKurl(rL, bN, sN) {
    function getBlackStoryAutoid(rL, bN, sN) {
      var Url =
        DB_CONN_URL + '/get-blackcat-autoid-info/' + rL + '&' + bN + '&' + sN
      // alert('Url:' + Url)

      const fetchData = async () => {
        try {
          axios.get(Url).then((response) => {
            // alert('length' + response.data.length)

            if (response.data.length > 0) {
              if (sN.indexOf('_Story') !== -1) {
                if (
                  rL == 'A2' ||
                  rL == 'B1_1' ||
                  rL == 'B1_2' ||
                  rL == 'B1_1' ||
                  rL == 'B2_1' ||
                  rL == 'B2_2' ||
                  rL == 'C1'
                ) {
                  var rC = 'BCat_RTraining'
                } else {
                  var rC = 'BCat_GreenApple'
                }
                var fsl =
                  'https://www.myenglib.com/onlesson/pdfviewer.php?sort=blackcat&file=' +
                  pdf1 +
                  '&readingLevel=' +
                  rL +
                  '&readingCourse=' +
                  rC +
                  '&bookNum=' +
                  bN

                setBookUrl(fsl)
                var localurl =
                  '/files/myenglib/Reading Triumphs/' + response.data[0].pdf1
                setLocalFile(localurl)

                var webfile =
                  'https://www.myenglib.com/myenglib/materials/reading/Reading_Triumphs/G5/book/' +
                  response.data[0].pdf1
                setWebFileUrl(webfile)
              }
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }
  }

  function getBookUrl() {
    var sN = storyNum
    var rL = readingLevel
    var bN = bookNum

    if (seriesName == 'Reading Triumphs') {
      getRTurl(rL, bN, sN)
    } else if (seriesName == 'Blackcat Series') {
      getBKurl(rL, bN, sN)
    } else {
      bookUrl = 'no'
    }
  }

  useEffect(() => {
    getBookUrl()
  }, [])

  return (
    <>
      {/* <div className="w-full h-screen flex justify-center items-center">
        <Document file={bookUrl}>
          <Page pageNumber={1} />
        </Document>
      </div> */}
      {/* <p>{bookUrl}</p> */}
      <center>
        {/* <div className="row pt-4" style={{ backgroundColor: 'red' }}>
          <object
            data={localFile}
            style={{
              width: '100%',
              height: '300px',
              border: '1px solid white',
              borderRadius: '10px',
              backgroundColor: 'white',
              margin: 0,
              padding: 0,
            }}
          />
        </div> */}
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <object
            data={localFile}
            type="application/pdf"
            style={{
              width: '100%',
              height: '500px',
              border: '1px solid white',
              borderRadius: '10px',
              backgroundColor: 'white',
              margin: 0,
              padding: 0,
            }}
          />
        </div>
        {/* <iframe
          src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
            webFileUrl
          )}`}
          style={{
            width: '100%',
            height: '500px',
            border: '1px solid white',
            borderRadius: '10px',
            backgroundColor: 'white',
            overflowX: 'auto',
          }}
        ></iframe> */}
      </center>
    </>
  )
}

export default ViewBookReadingTriumphs
