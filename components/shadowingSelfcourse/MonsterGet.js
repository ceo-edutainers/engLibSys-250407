//quizapp_big_deesign.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import { EcoSharp } from '@material-ui/icons'
import SweetAlert from 'react-bootstrap-sweetalert'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MonsterGet = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [getMonsterInfo, setGetMonsterInfo] = useState([])
  const [getMonsterInfoRaw, setGetMonsterInfoRaw] = useState([])
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)

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
      <div>
        {/* <MediaQuery query="(min-width: 767px)"> */}
        <div
          className="row align-items-center"
          aria-label="クリックしてみてね！"
          data-balloon-pos="down"
          data-balloon-length="large"
        >
          <div
            className="col-lg-12 col-md-12 p-0 mt-0 mb-0"
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
        </div>
        {/* </MediaQuery> */}

        <div className="container"></div>
      </div>
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
    </>
  )
}

export default MonsterGet
