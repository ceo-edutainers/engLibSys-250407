//quizapp_big_deesign.css
import react, { useState, useEffect } from 'react'
import axios from 'axios'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import SweetAlert from 'react-bootstrap-sweetalert'
const MonsterGet = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [getMonsterInfo, setGetMonsterInfo] = useState([])
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx)
  }
  var imgarray = range(1, 234)
  const [imgArray, setImgArray] = useState(imgarray)

  //fireView
  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')

      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-history-monster/'
          var Url = url + mbn

          const response = await axios.get(Url)

          setGetMonsterInfo(response.data)
        } catch (error) {
          console.log(error)
        }
      }

      fetchData2()
    }
  }, [])

  return (
    <>
      <div
        className="QuizBigShowandtell mt-2 pb-0 mb-0"
        style={{ backgroundColor: 'white', border: 0 }}
      >
        {/* <MediaQuery query="(min-width: 767px)"> */}
        <div
          className="row align-items-center"
          aria-label="横にスクロールすると全てのモンスターが見えます! リーディングとシャドーイングコースで７日間学習を続けるとモンスターを一個ゲットできます。！ゲットしたモンスターには色がつきます。"
          data-balloon-pos="down"
          data-balloon-length="large"
        >
          <div
            className="col-lg-12 col-md-12 p-0"
            style={{
              textAlign: 'left',
              justifyContent: 'left',
              alignItems: 'left',
              margin: '4px, 4px',
              padding: '4px',
              backgroundColor: 'white',
              width: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap',
              fontColor: 'black',
            }}
          >
            {/* <div className="single-features-box"> */}
            {imgArray.map((val, key) => {
              var fileNum = key + 1
              var monster = 'Monster' + fileNum
              var fileImgLink =
                'https://englib.s3.ap-northeast-1.amazonaws.com/monster/' +
                fileNum +
                '.png'
              if (getMonsterInfo[key]) {
                var myMonster = getMonsterInfo[key]
              } else {
                var myMonster = '0'
              }

              {
                return (
                  <>
                    {myMonster == 0 ? (
                      <>
                        <img
                          src={fileImgLink}
                          width="40px"
                          height="40px"
                          style={{
                            filter: 'grayscale(1)',
                            opacity: '50%',
                          }}
                          className="img-bigger"
                          onClice={() => {
                            setIsOpenBackMypage(true)
                          }}
                        />
                        &nbsp;
                      </>
                    ) : (
                      <>
                        <img
                          src={fileImgLink}
                          width="40px"
                          height="40px"
                          style={{
                            filter: 'grayscale(0)',
                            opacity: '100%',
                          }}
                          className="img-bigger"
                          onClice={() => {
                            setIsOpenBackMypage(true)
                          }}
                        />
                        &nbsp;
                      </>
                    )}
                  </>
                )
              }
            })}
            {/* map val */}
          </div>
        </div>
        {/* </MediaQuery> */}

        {/* <MediaQuery query="(max-width: 767px)">
        <div
          className="row"
          aria-label="横にスクロールすると全てのモンスターが見えます! ポイントをゲットしてモンスターを増やそう！ゲットしたモンスターには色がつきます。"
          data-balloon-pos="down"
          data-balloon-length="large"
        >
          <center>
            <div
              className="col-lg-12 col-md-12 p-0"
              style={{
                // textAlign: 'center',
                // justifyContent: 'center',
                // alignItems: 'center',
                margin: '4px, 4px',
                padding: '4px',
                backgroundColor: 'white',
                width: '40%',
                overflowX: 'auto',
                overflowY: 'hidden',
                whiteSpace: 'nowrap',
                fontColor: 'black',
              }}
            >
             

              {imgArray.map((val, key) => {
                var fileNum = key + 1
                var fileName =
                  'https://englib.s3.ap-northeast-1.amazonaws.com/monster/' +
                  fileNum +
                  '.png'

                return (
                  <>
                    {key == 0 || key == 1 || key == 2 ? (
                      <img
                        src={fileName}
                        width="40px"
                        height="40px"
                        style={{
                          filter: 'grayscale(0)',
                          opacity: '100%',
                        }}
                        className="img-bigger"
                      />
                    ) : (
                      <img
                        src={fileName}
                        width="40px"
                        height="40px"
                        style={{
                          filter: 'grayscale(1)',
                          opacity: '50%',
                        }}
                        className="img-bigger"
                      />
                    )}
                    &nbsp;&nbsp;
                  </>
                )
              })}
            </div>

           
          </center>
        </div>
        </MediaQuery> */}

        <div className="container">
          <SweetAlert
            title="７日間学習を続けて一つのモンスタをゲットしよう！"
            show={isOpenBackMypage}
            onConfirm={() => setIsOpenBackMypage(false)}
            onCancel={() => {
              setIsOpenBackMypage(false)
            }}
            confirmBtnText="OK"
            cancelBtnText=""
            showCancel={false}
            reverseButtons={true}
            style={{ width: '600px' }}
          >
            <p>234個のモンスターを全部ゲットしよう！</p>
          </SweetAlert>
        </div>
      </div>
    </>
  )
}

export default MonsterGet
