//quizapp_big_deesign.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import SweetAlert from 'react-bootstrap-sweetalert'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import HWDataTable from '@/components/Utils/HWDateTable'

const MonsterGet = ({ mbn, homework_id }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [getMonsterInfo, setGetMonsterInfo] = useState([])
  const [getThisMonsterInfo, setGetThisMonsterInfo] = useState([])
  const [getMonsterInfoRaw, setGetMonsterInfoRaw] = useState([])
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [howManyMonster, setHowManyMonster] = useState('0')

  const [getThisFireInfo, setGetThisFireInfo] = useState([])
  function viewMonster(imageUrl) {
    // alert(imageUrl)
    const MySwal = withReactContent(Swal)
    Swal.fire({
      // position: 'top-end',
      // showConfirmButton: false,
      // timer: 4000,
      timerProgressBar: true,
      html: '<h4><b>一週間毎日学習を続けてモンスターを一個ゲットしよう！</b></h4><p>横にスクロールすると全てのモンスターが見えます! リーデインングとシャドーイング学習を７日間続けるとモンスターを一個ゲットできます。！ゲットしたモンスターには色がつきます</p>',
      title: 'モンスター234個を全部ゲット！',
      width: '600px',
      height: '300px',
      padding: '3em',
      border: '1px solid #F1C40F',
      borderRadius: '30px',
      // color: '#F1C40F',
      // background: '#F1C40F',
      imageUrl: imageUrl,
      imageWidth: 'auto',
      imageHeight: 300,
      // imageAlt: 'Custom image',
      // background: '#fff url(/images/about-img5.jpg)',
      backdrop: `
    rgba(0,0,0,0.5) 
    url("/images/nyan-cat.gif")
    center top
    no-repeat
  `,
    })
  }
  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx)
  }
  var imgarray = range(1, 234)
  const [imgArray, setImgArray] = useState(imgarray)

  //fireView
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-history-monster/'
        var Url = url + mbn

        const response = await axios.get(Url)
        // alert(response.data.length)

        setGetMonsterInfo(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }, [mbn])

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        // var url = DB_CONN_URL + '/get-hw-history-monster-this-hw/'
        //  var Url = url + mbn + '&' + homework_id
        var url = DB_CONN_URL + '/get-hw-history-monster-for-7days/'
        var Url = url + mbn

        const response = await axios.get(Url)

        setGetThisMonsterInfo(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }, [mbn])

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-history-fire-for-7days/'
        var Url = url + mbn + '&' + homework_id
        // alert(Url)
        const response = await axios.get(Url)

        // alert(response.data.message)

        setGetThisFireInfo(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }, [mbn, homework_id])

  return (
    <>
      <div>
        {/* <MediaQuery query="(min-width: 767px)"> */}
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12 pt-2 pl-2 pr-2 pb-0 mt-2">
            <center>
              <p
                style={{
                  fontWeight: 'bold',
                  color: 'red',
                  paddingBottom: 0,
                  marginBottom: 0,
                  fontSize: '18px',
                }}
              >
                This Week's Monsters
              </p>
              <p
                style={{
                  fontSize: '12px',
                  color: 'gray',

                  padding: 0,
                  margin: 0,
                }}
              >
                Get 1 monster by practicing for 7 consecutive days.
              </p>
            </center>
          </div>
          <div
            className="col-lg-12 col-md-12 pt-2 pl-2 pr-2 pb-0 mt-2"
            style={{
              textAlign: 'left',
              justifyContent: 'left',
              alignItems: 'left',
              margin: '4px, 4px',
              // backgroundColor: 'white',
              width: '60%',
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap',
              fontColor: 'black',
            }}
          >
            <div>
              <HWDataTable mbn={mbn} homework_id={homework_id} />
            </div>
          </div>
          <div
            className="col-lg-12 col-md-12 pt-2 pl-2 pr-2 pb-0 mt-2"
            style={{
              textAlign: 'left',
              justifyContent: 'left',
              alignItems: 'left',
              margin: '4px, 4px',
              // backgroundColor: 'white',
              width: '60%',
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap',
              fontColor: 'black',
            }}
          >
            <center>
              {getThisMonsterInfo.length > 0 ? (
                getThisMonsterInfo.map((val, key) => {
                  // var itemnum = getNumbersFromString(val.Item)

                  const itemnum = (val.Item || '').replace(/\D/g, '')
                  var fileLink = '/images/monster/' + itemnum + '.png'
                  var noMonsterFileLink = '/images/monster/no-monster.png'
                  return (
                    <>
                      <img
                        src={fileLink}
                        width="60px"
                        height="60px"
                        style={{
                          filter: 'grayscale(0)',
                          opacity: '100%',
                          marginTop: '10px',
                        }}
                        className="mr-3 img-bigger"
                        onClick={() => {
                          viewMonster(fileLink)
                        }}
                      />
                    </>
                  )
                })
              ) : (
                <img
                  src="/images/monster/no-monster.png"
                  width="120px"
                  height="120px"
                  style={{
                    filter: 'grayscale(0)',
                    opacity: '100%',
                    marginTop: '10px',
                  }}
                  className="img-bigger"
                />
              )}
              {/* {!getThisMonsterInfo && 'No monster'} */}
              <hr />
              <span style={{ padding: 0, margin: 0 }}>
                Total Monsters:{' '}
                {!getMonsterInfo.length ? 0 : getMonsterInfo.length}
              </span>
            </center>
          </div>
          <center>
            <div
              className="col-lg-12 col-md-12 pt-0 pl-2 pr-2 mt-2"
              style={{
                textAlign: 'left',
                justifyContent: 'left',
                alignItems: 'left',
                margin: '4px, 4px',
                // backgroundColor: 'black',
                width: '100%',
                overflowX: 'auto',
                overflowY: 'hidden',
                whiteSpace: 'nowrap',
                fontColor: 'black',
              }}
            >
              {imgArray.map((val, key) => {
                var fileNum = key + 1
                var monster = 'Monster' + fileNum
                // var fileImgLink =
                //   'https://englib.s3.ap-northeast-1.amazonaws.com/monster/' +
                //   fileNum +
                //   '.png'
                var fileImgLink = '/images/monster/' + fileNum + '.png'
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
                              paddingRight: '10px',
                            }}
                            className="img-bigger"
                            onClick={() => {
                              //setIsOpenBackMypage(true)
                              viewMonster(fileImgLink)
                            }}
                            // onMouseOver={() => {
                            //   //setIsOpenBackMypage(true)
                            //   viewMonster(fileImgLink)
                            // }}
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
                            onClick={() => {
                              // setIsOpenBackMypage(true)
                              viewMonster(fileImgLink)
                            }}
                            // onMouseOver={() => {
                            //   //setIsOpenBackMypage(true)
                            //   viewMonster(fileImgLink)
                            // }}
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
          </center>
        </div>
      </div>
    </>
  )
}

export default MonsterGet
