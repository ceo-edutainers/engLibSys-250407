import react, { useState, useContext } from 'react'

//import Link from 'next/link'
import Link from '@/utils/ActiveLink'
import axios from 'axios'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

import Router, { useRouter } from 'next/router'

const HowToApplyTaiken = () => {
  //for insert info
  const [studentName, setStudentName] = useState('')
  const [studentNameEng, setStudentNameEng] = useState('')
  const [parentName, setParentName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const router = useRouter() //使い方：router.replace('/')
  const DB_CONN_URL = process.env.DB_CONN_URL
  const addMemInfo = () => {
    const fetchData = async () => {
      // alert(studentName)
      // alert(studentNameEng)
      // alert(parentName)
      // alert(email)
      // alert(tel)
      // alert(gender)
      try {
        axios
          .post(DB_CONN_URL + '/first-try-reg', {
            name: studentName,
            name_eng: studentNameEng,
            parent_name: parentName,
            email: email,
            gender: gender,
          })
          .then((response) => {
            if (!response.data.status) {
              alert(response.data.message)
            } else {
              localStorage.setItem('TRYstudentName', studentName)
              localStorage.setItem('TRYstudentNameEng', studentNameEng)
              localStorage.setItem('TRYgender', gender)
              localStorage.setItem('TRYparentName', parentName)
              localStorage.setItem('TRYemail', email)
              // alert(response.data.message)
              router.replace('/try-reg') // ここでリダイレクト
            }
          })
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
    fetchData()
  }

  // const getMemInfo = () => {
  //   axios.get(DB_CONN_URL + '1/member_list').then((response) => {
  //     // var newResponse = []
  //     // newResponse = response.data
  //     setMembersList(response.data)
  //     console.log(response.data)
  //   })
  // }

  // const updateMemInfo = (id) => {
  //   axios
  //     .put(DB_CONN_URL + '/update', { tel: newTel, id: id })
  //     .then((response) => {
  //       alert('update alert')
  //     })
  // }
  // const displayInfo = () => {
  //   console.log('displayInfo')
  // }
  return (
    <div className="information-area ptb-70">
      <div className="container">
        <div
          className="row align-items-center"
          style={{
            // border: '1px solid #ececec',
            paddingRight: 0,
          }}
        >
          <div className="col-lg-6 col-md-12">
            <div className="information-content">
              <span className="sub-title">HOW TO START</span>
              <h2>
                1分で簡単無料体験登録
                {/* <p style={{ fontSize: 20, fontWeight: 800 }}>
                  たった3つのステップで凄さ体験！
                </p> */}
                {/* <span className="sub-title" style={{ color: 'darkgrey' }}>
                  最短12時間以内に無料体験が受けれる！
                </span> */}
              </h2>

              <ul className="apply-details">
                <li style={{ marginBottom: '50px' }}>
                  <div className="icon">
                    <i className="flaticon-checkmark"></i>
                  </div>
                  <h5
                    style={{
                      color: 'black',
                      fontWeight: '600',
                      paddingBottom: 0,
                      marginBottom: 0,
                    }}
                  >
                    スケジュール確認・調整・確定
                  </h5>
                  <p>
                    マイページから無料体験スケジュールを確認・調整・確定をします。
                  </p>
                </li>

                <li style={{ marginBottom: '50px' }}>
                  <div className="icon">
                    <i className="flaticon-checkmark"></i>
                  </div>
                  <h5
                    style={{
                      color: 'black',
                      fontWeight: '600',
                      paddingBottom: 0,
                      marginBottom: 0,
                    }}
                  >
                    無料レベルテストを受ける
                  </h5>
                  <p>
                    [オプション]英検５級以上のレベルの子・正確なアドバイスを受けるためにレベルテストを受けることをお勧めします。
                  </p>
                </li>

                <li style={{ marginBottom: '50px' }}>
                  <div className="icon">
                    <i className="flaticon-checkmark"></i>
                  </div>
                  <h5
                    style={{
                      color: 'black',
                      fontWeight: '600',
                      paddingBottom: 0,
                      marginBottom: 0,
                    }}
                  >
                    レッスン当日
                  </h5>
                  <p>
                    パソコンとマイク付ヘッドセットを用意し、クラスリンクをクリックするだけでレッスンに参加できます。
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="contact-form">
              <div
              // className="free-trial-form"
              >
                <span className="sub-title" style={{ fontWeight: 'bold' }}>
                  ただ今100人追加募集中！
                  <br />
                  今なら入会金も、体験も無料！
                </span>
                <h2 style={{ fontSize: 26, marginBottom: 10, color: 'black' }}>
                  無料体験登録フォーム
                </h2>
                {/* <MediaQuery query="(min-width: 767px)"> */}
                <p style={{ fontSize: 15, paddingBottom: 0 }}>
                  年長〜大学生・英語初心者〜帰国子女まで。
                  <br /> 日本国内・海外在住者のお子様・どなたでも受けられます。
                </p>
                {/* </MediaQuery> */}
                {/* <MediaQuery query="(max-width: 767px)">
                  <p style={{ fontSize: 13, paddingBottom: 0 }}>
                    年長〜大学生・英語初心者〜帰国子女まで。
                    日本国内・海外在住者のお子様・どなたでも受けられます。
                  </p>
                </MediaQuery> */}

                {/* <form> */}
                <div className="form-group">
                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setStudentName(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    placeholder="生徒の氏名 *"
                  />
                </div>
                <div className="form-group">
                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setStudentNameEng(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    placeholder="生徒の名前 [アルファベット名] *"
                  />
                </div>
                <div className="form-group">
                  <label
                    className="form-check-label"
                    style={{
                      paddingRight: 20,
                      color: 'white',
                      fontWeight: '600',
                    }}
                  >
                    性別*
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="female"
                      onClick={(e) => {
                        setGender(e.target.value)
                      }}
                    />

                    <label
                      className="form-check-label"
                      for="inlineRadio1"
                      style={{ color: 'white', fontWeight: '600' }}
                    >
                      女
                    </label>
                  </div>
                  <div
                    className="form-check form-check-inline"
                    style={{ paddingLeft: '20px' }}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      value="male"
                      onClick={(e) => {
                        setGender(e.target.value)
                      }}
                    />

                    <label
                      className="form-check-label"
                      style={{ color: 'white', fontWeight: '600' }}
                    >
                      男
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setParentName(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    placeholder="保護者さま氏名 *"
                  />
                </div>
                {/* <div className="form-group">
                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setTel(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    placeholder="TEL *"
                  />
                </div> */}
                <div className="form-group">
                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    type="email"
                    className="form-control"
                    placeholder="Email*"
                  />
                </div>

                {/* <Link href="/try-reg" activeClassName="active">
                    <a className="nav-link"> */}
                <button
                  className="btn btn-primary"
                  onClick={addMemInfo}
                  // onClick={nextStep}
                  style={{ fontSize: 20, fontWeight: 500 }}
                >
                  無 料 体 験 登 録 へ
                </button>
                {/* </a>
                  </Link> */}
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToApplyTaiken
