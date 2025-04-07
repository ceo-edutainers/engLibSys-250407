// CSS mypage_for_adult.css

import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { VocaContext } from '@/components/MyVocab/Contexts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchHeader from '@/components/MyVocab/SearchHeader'
import SearchBody from '@/components/MyVocab/SearchBody'
import FireViewReading from '@/components/readingSelfcourse/FireView'
import FireViewShadowing from '@/components/shadowingSelfcourse/FireView'
import AnimatedModal from '@/components/AnimatedModal/PointModal'
import OxfordDictionary from '@/components/MyVocab/OxfordDictionary'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faDoorOpen,
  faChartBar,
  faTrash,
  faPenSquare,
  faFileAudio,
  faHeadphones,
  faCubes,
  faLaptop,
  faFile,
  faHandPointer,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function App() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [searchWord, setSearchWord] = useState('')
  // const MySwal = withReactContent(Swal)

  // Swal.fire({
  //   // position: 'top-end',
  //   showConfirmButton: false,
  //   timer: 3000,
  //   timerProgressBar: true,
  //   html: '<h1><b>おめでとう！</b></h1><br/><br/><h5>20ポイントゲット！</h5>',
  //   // title: '20ポイントゲット！',
  //   width: '600px',
  //   height: '600px',
  //   opacity: 0,
  //   padding: '3em',
  //   border: '1px solid #F1C40F',
  //   borderRadius: '20px',
  //   color: '#F1C40F',
  //   background: '#F1C40F',
  //   // imageUrl: 'https://unsplash.it/400/200',
  //   // imageWidth: 400,
  //   // imageHeight: 200,
  //   // imageAlt: 'Custom image',
  //   // background: '#fff url(/images/about-img5.jpg)',
  //   backdrop: `
  //   rgba(0,0,123,0.4)
  //   url("/images/animated-icons/bf6.gif")
  //   center top
  //   no-repeat
  // `,
  // })

  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const [myMbn, setMyMbn] = useState('')
  const router = useRouter() //使い方：router.replace('/')
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isNotReady, setIsNotReady] = useState(false)
  const [myCourseList, setMyCourseList] = useState([])

  const [practiceTempId, setPracticeTempId] = useState('')

  const [userName, setUserName] = useState('')
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    setMyMbn(mbn)
  }, [])
  return (
    <>
      <div className="AppBig">
        {/* <h1>{myMbn}</h1> */}
        <VocaContext.Provider
          value={{
            myMbn,
            setMyMbn,
            userName,
            setUserName,
            searchWord,
            setSearchWord,
          }}
        >
          {/* <OxfordDictionary /> */}
          {/* <SearchHeader /> */}
          <SearchBody />
        </VocaContext.Provider>
        <CopyrightFooter />
      </div>
    </>
  )
}

export default App
