import React, { useState, useEffect, useContext } from 'react'
import Router, { useRouter } from 'next/router'
//import Link from 'next/link'
import axios from 'axios'
import { push } from 'next-pwa/cache'
import { SelectPref, SelectNationality } from '../FormData/FormSelectData'
import emailjs from 'emailjs-com'
import SweetAlert from 'react-bootstrap-sweetalert'

const TryRegisterFormEnter = () => {
  ////////////////////////////////////////////////////
  //もし全ページで登録した内容を変更する場合ここに入れる。START
  useEffect(() => {
    var TRYstudentName = localStorage.getItem('TRYstudentName')
    var TRYstudentNameEng = localStorage.getItem('TRYstudentNameEng')
    var TRYgender = localStorage.getItem('TRYgender')
    var TRYparentName = localStorage.getItem('TRYparentName')
    var TRYemail = localStorage.getItem('TRYemail')
    var TRYtel = localStorage.getItem('TRYtel')
    setStudentName(TRYstudentName)
    setStudentNameEng(TRYstudentNameEng)
    setGender(TRYgender)
    setParentName(TRYparentName)
    setEmail(TRYemail)
    setTel(TRYtel)
  }, [])
  const [studentName, setStudentName] = useState('')
  const [studentNameEng, setStudentNameEng] = useState('')
  const [gender, setGender] = useState('')
  const [parentName, setParentName] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [mobilephone, setMobilephone] = useState('')

  //もし全ページで登録した内容を変更する場合ここに入れる。END
  ////////////////////////////////////////////////////
  const [englishHistory, setEnglishHistory] = useState('')
  const [parentNameKana, setParentNameKana] = useState('')
  const [password, setPassword] = useState('')
  const [birth_y, setBirthY] = useState('')
  const [birth_m, setBirthM] = useState('')
  const [birth_d, setBirthD] = useState('')
  const [motherTongue, setMotherTongue] = useState('')

  const [zip, setZip] = useState('')
  const [pref, setPref] = useState('')
  const [city, setCity] = useState('')
  const [addr, setAddr] = useState('')
  const [learnType, setLearnType] = useState('')
  const [school_name, setSchoolName] = useState('')
  const [grade, setGrade] = useState('')
  // const [residentCountryName, setResidentCountryName] = useState('日本')

  const [nationality, setNationality] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('JP/Japan')
  const [countryNameList, setCountryNameList] = useState([])
  const [selectedCountryCode, setSelectedCountryCode] = useState('')
  const [selectedCountryName, setSelectedCountryName] = useState('')
  const [timezoneCountryCode, setTimezoneCountryCode] = useState()
  const [timezoneCountryName, setTimezoneCountryName] = useState()

  //alert
  const [isGoNextPage, setIsGoNextPage] = useState(false)

  // //For TEST
  // useEffect(() => {
  //   setStudentName('河東聖水')
  //   setStudentNameEng('Kato Kiyomi')
  //   setGender('male')
  //   setParentName('河東ミンジェ')
  //   setParentNameKana('カトウ　ミンジェ')
  //   setEmail('minjaekato@gmail.com')
  //   setTel('032-1111-2222')
  //   setMobilephone('080-5288-1440')
  //   setEnglishHistory('3年間アメリカ滞在')
  //   setPassword('minedcom')
  //   setBirthY('2007')
  //   setBirthM('8')
  //   setBirthD('25')
  //   setMotherTongue('韓国語')
  //   setZip('153-0063')
  //   setPref('東京都')
  //   setCity('目黒区目黒')
  //   setAddr('1-2-19')
  //   setLearnType('ホームスクリング')
  //   setSchoolName('MIS')
  //   setGrade('中２')
  //   setNationality('韓国')
  //   setSelectedCountry('JP/Japan')
  //   setCountryNameList([])
  //   setSelectedCountryCode('JP')
  //   setSelectedCountryName('日本')
  //   setTimezoneCountryCode('test')
  //   setTimezoneCountryName('test')
  // }, [])
  //TEST END
  // const [timezoneCity, setTimezoneCity] = useState()
  // const [timezoneUTC, setTimezoneUTC] = useState()

  // const [timeZone, setTimeZone] = useState('')
  // const [country, setCountry] = useState('')

  // //for listing
  // const [membersList, setMembersList] = useState([])
  // //for update
  // const [newTel, setNewTel] = useState('')

  const router = useRouter() //使い方：router.replace('/')
  const [memberInfo, setMemberInfo] = useState([])

  if (typeof window !== 'undefined') {
    var gettryCourse = localStorage.getItem('tryCourse')
    var gettryCourseName = localStorage.getItem('tryCourseName')
    var gettryLevel = localStorage.getItem('tryLevel')
  }

  // const [tryCourse, setTryCourse] = useState(gettryCourse) //input or output
  // const [tryCourseName, setTryCourseName] = useState(gettryCourseName) //CourseRT
  // const [tryLevel, setTryLevel] = useState(gettryLevel) // try level

  // useEffect(() => {
  //   var cc = selectedCountry.split('/')
  //   setSelectedCountryCode(cc[0])
  //   setSelectedCountryName(cc[1])
  // }, [selectedCountry])

  function birthYear() {
    let birthYear = []
    for (let i = 1990; i < 2021; i++) {
      birthYear.push(<option value={i}>{i}年</option>)
    }
    // console.log('birthYear: ', birthYear)
    return birthYear
  }

  function birthMonth() {
    let birthMonth = []
    for (let i = 1; i < 13; i++) {
      birthMonth.push(<option value={i}>{i}月</option>)
    }
    // console.log('birthYear: ', birthYear)
    return birthMonth
  }

  function birthDay() {
    let birthDay = []
    for (let i = 1; i <= 31; i++) {
      birthDay.push(<option value={i}>{i}日</option>)
    }
    // console.log('birthYear: ', birthYear)
    return birthDay
  }

  //input value check

  const addMemInfo = () => {
    if (studentName == '') {
      alert('名前は必ず入力してください。')
      return false
    }
    if (studentNameEng == '') {
      alert('生徒さんのアフファベット名は必ず入力してください。')
      return false
    }
    if (parentName == '') {
      alert('保護者様の名前は必ず入力してください。')
      return false
    }
    if (parentNameKana == '') {
      alert('保護者様の名前の読みかなは必ず入力してください。')
      return false
    }
    if (motherTongue == '') {
      alert('母国語は必ず入力してください。')
      return false
    }
    if (nationality == '') {
      alert('国籍は必ず入力してください。')
      return false
    }
    if (birth_y == '') {
      alert('生年月日は必ず入力してください。')
      return false
    }
    if (birth_m == '') {
      alert('生年月日は必ず入力してください。')
      return false
    }
    if (birth_d == '') {
      alert('生年月日は必ず入力してください。')
      return false
    }

    if (learnType == '') {
      alert('学校タイプは必ず入力してください。')
      return false
    }

    if (grade == '') {
      alert('学年は必ず入力してください。')
      return false
    }

    if (selectedCountry == '') {
      alert('レッスンを受ける(お住まいの)国は必ず入力してください。')
      return false
    }

    if (zip == '') {
      alert('郵便番号は必ず入力してください。')
      return false
    }
    if (selectedCountry == 'JP/Japan' && pref == '') {
      alert('お住まいが日本(Japan)の場合都道府県は必ず入力してください。')
      return false
    }

    if (city == '') {
      alert('市区町村(city)は必ず入力してください。')
      return false
    }

    if (addr == '') {
      alert('住所は必ず入力してください。')
      return false
    }
    if (mobilephone == '') {
      alert('携帯番号は必ず入力してください。')
      return false
    }

    if (email == '') {
      alert('emailは必ず入力してください。')
      return false
    }

    if (password == '') {
      alert('パスワードは必ず入力してください。')
      return false
    }

    if (tel == '') {
      setTel('なし')
    }

    if (englishHistory == '') {
      setEnglishHistory('入力なし')
    }
    if (school_name == '') {
      setSchoolName('入力なし')
    }

    //timezoneCountryCode
    var timezoneCountryCode = selectedCountry.split('/')[0] //例)JP
    var timezoneCountryName = selectedCountry.split('/')[1] //例)Japan
    // alert(timezoneCountryCode)
    // alert(timezoneCountryName)

    axios
      .post(DB_CONN_URL + '/try-reg', {
        name: studentName,
        name_eng: studentNameEng,
        parent_name: parentName,
        parent_name_kana: parentNameKana,
        email: email,
        tel: tel,
        mobilephone: mobilephone,
        password: password,
        nationality: nationality,
        gender: gender,
        birth_y: birth_y,
        birth_m: birth_m,
        birth_d: birth_d,
        motherTongue: motherTongue,
        learnType: learnType,
        school_name: school_name,
        grade: grade,
        timezoneCountryCode: timezoneCountryCode,
        timezoneCountryName: timezoneCountryName,
        zip: zip,
        pref: pref,
        city: city,
        addr: addr,
        englishHistory: englishHistory,
      })
      .then((response) => {
        //console.log(response.data.message)
        if (!response.data.status) {
          alert(response.data.message)
        } else {
          localStorage.setItem('TryRegisterFormEnter', 'end')
          // alert(response.data.message)
          sendEmailtoTrialStudent()
          setIsGoNextPage(true)
        }
      })
  }

  const nextStep = () => {
    router.replace('/') // ここでリダイレクト
  }
  const sendEmailtoTrialStudent = () => {
    if (gender == 'male') {
      var gender_jp = '男'
    } else if (gender == 'female') {
      var gender_jp = '女'
    }
    var birth = birth_y + '年' + birth_m + '月' + birth_d + '日'
    var school = learnType + '/' + school_name
    var address = pref + city + addr

    var templateParams = {
      to_email: email,
      to_name: parentName,
      name: studentName,
      name_eng: studentNameEng,
      parent_name: parentName,
      parent_name_kana: parentNameKana,
      email: email,
      tel: tel,
      mobilephone: mobilephone,
      password: password,
      nationality: nationality,
      gender_jp: gender_jp,
      birth: birth,
      motherTongue: motherTongue,
      school: school,
      grade: grade,
      zip: zip,
      address: address,
      englishHistory: englishHistory,
      reply_to: 'no-reply',
      from_name: 'engLib-support',
    }

    // env環境設定=next.config.js
    const YOUR_SERVICE_ID = process.env.REACT_APP_YOUR_SERVICE_ID
    const YOUR_USER_ID = process.env.REACT_APP_YOUR_USER_ID
    const YOUR_TEMPLATE_ID_to_student = 'template_s1hxpb8'
    const YOUR_TEMPLATE_ID_to_admin = 'template_c0rzill'

    emailjs.init(YOUR_USER_ID)
    emailjs
      .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID_to_student, templateParams)
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        function (error) {
          console.log('FAILED...', error)
          return false
        }
      )
    emailjs
      .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID_to_admin, templateParams)
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        function (error) {
          console.log('FAILED...', error)
          return false
        }
      )
  }

  const getMemInfo = () => {
    axios.get(DB_CONN_URL + '/member_list').then((response) => {
      // var newResponse = []
      // newResponse = response.data
      setMembersList(response.data)
      console.log(response.data)
    })
  }

  const updateMemInfo = (id) => {
    axios
      .put(DB_CONN_URL + '/update', { tel: newTel, id: id })
      .then((response) => {
        alert('update alert')
      })
  }
  const displayInfo = () => {
    console.log('displayInfo')
  }

  const tutorTimezone = () => {
    axios.get(DB_CONN_URL + '/select-timezone-country').then((response) => {
      // var newResponse = []
      // newResponse = response.data
      setCountryNameList(response.data)
      console.log(response.data)
    })
  }
  useEffect(() => {
    tutorTimezone()
  }, [])

  return (
    // <div className="container">
    <div className="row">
      <center>
        <div className="col-lg-12 col-md-12">
          <div
            className="free-trial-form"
            style={{ paddingBottom: 0, textAlign: 'center' }}
          >
            {/* {selectedCountryCode}/{selectedCountryName}
              selectedCountry:{selectedCountry} */}
            <span className="sub-title">
              今なら入会金１万円が０円！
              <br />
              英語塾乗換えでさらに５千円クーポンゲット
            </span>
            <h2 style={{ fontSize: 26, marginBottom: 10 }}>
              無料体験登録フォーム
            </h2>
            <p style={{ fontSize: 15, paddingBottom: 0 }}>
              年長〜18歳・英語初心者〜帰国子女まで。
              <br />
              日本国内・海外在住者のお子様・どなたでも体験レッスンを受けられます。
            </p>
            <p>すでに会員場合無料体験は受けられません。</p>
            <hr />
            {/* <form> */}
            {/* <div className="form-row"> */}
            <div className="col-lg-12 col-md-12  pb-5">
              <div className="contact-form">
                <div className="form-group">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    生徒の氏名
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>

                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setStudentName(e.target.value)
                    }}
                    id="inputname"
                    type="text"
                    className="form-control"
                    value={studentName}
                  />
                </div>

                <div className="form-group ">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    アルファベット名
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>

                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setStudentNameEng(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    value={studentNameEng}
                  />
                </div>
                <div className="form-group ">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    保護者指名
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>

                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setParentName(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    value={parentName}
                  />
                </div>
                <div className="form-group ">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    保護者指名(読みかな)
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>
                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setParentNameKana(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    value={parentNameKana}
                  />
                </div>

                <div className="form-group ">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    生徒の母国語(mother tongue)
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>
                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setMotherTongue(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    value={motherTongue}
                  />
                  {/* <select
                        className="form-control  form-control-sm"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => {
                          setNationality(e.target.value)
                        }}
                      >
                        <SelectNationality nation="日本" />
                      </select> */}

                  {/* <select
                        className="form-control form-control-sm"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => {
                          setNationality(e.target.value)
                        }}
                      >
                        {countryNameList.map((val, key) => {
                          return (
                            <option
                              value={val.country_name}
                              selected={
                                val.country_name == 'Japan' && 'selected'
                              }
                            >
                              {val.country_name}
                            </option>
                          )
                        })}
                      </select> */}
                </div>
                <div className="form-group ">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    国籍(Nationality)
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>
                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setNationality(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    value={nationality}
                  />
                </div>
                <div
                  className="form-group "
                  style={{
                    paddingLeft: '20px',
                    paddingTop: 20,
                    textAlign: 'left',
                  }}
                >
                  <label
                    className="form-check-label"
                    style={{
                      paddingRight: 20,
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    性別<span style={{ color: 'yellow' }}>【必須】</span>
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
                      checked={gender == 'female' && `"checked"`}
                    />

                    <label
                      className="form-check-label"
                      for="inlineRadio1"
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}
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
                      checked={gender == 'male' && `"checked"`}
                    />

                    <label
                      className="form-check-label"
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      男
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group mr-2">
                    <label
                      style={{
                        fontSize: '14px',
                        paddingLeft: '10px',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      生年
                      <span style={{ color: 'yellow' }}>【必須】</span>
                    </label>
                    <select
                      className="form-control  form-control-sm"
                      style={{
                        backgroundColor: 'white',
                        width: '150px',
                        marginLeft: '5px',
                      }}
                      onChange={(e) => {
                        setBirthY(e.target.value)
                      }}
                    >
                      <option selected>&nbsp;</option>
                      {birthYear()}
                    </select>
                  </div>
                  <div className="form-group mr-2">
                    <label
                      style={{
                        fontSize: '14px',
                        paddingLeft: '10px',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      生月
                      <span style={{ color: 'yellow' }}>【必須】</span>
                    </label>
                    <select
                      className="form-control  form-control-sm"
                      style={{
                        backgroundColor: 'white',
                        width: '150px',
                      }}
                      onChange={(e) => {
                        setBirthM(e.target.value)
                      }}
                    >
                      <option selected>&nbsp;</option>
                      {birthMonth()}
                    </select>
                  </div>
                  <div className="form-group mr-2">
                    <label
                      style={{
                        fontSize: '14px',
                        paddingLeft: '10px',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      生日
                      <span style={{ color: 'yellow' }}>【必須】</span>
                    </label>
                    <select
                      className="form-control  form-control-sm"
                      style={{ backgroundColor: 'white', width: '150px' }}
                      onChange={(e) => {
                        setBirthD(e.target.value)
                      }}
                    >
                      <option selected>&nbsp;</option>
                      {birthDay()}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    学校タイプ
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>
                  <select
                    className="form-control  form-control-sm"
                    style={{ backgroundColor: 'white' }}
                    onChange={(e) => {
                      setLearnType(e.target.value)
                    }}
                  >
                    <option selected>&nbsp;</option>
                    <option
                      value="公立"
                      selected={learnType == '公立' && 'selected'}
                    >
                      公立
                    </option>
                    <option
                      value="私立"
                      selected={learnType == '私立' && 'selected'}
                    >
                      私立
                    </option>
                    <option
                      value="インターナショナルスクール"
                      selected={
                        learnType == 'インターナショナルスクール' && 'selected'
                      }
                    >
                      インターナショナルスクール
                    </option>
                    <option
                      value="ホームスクーリング"
                      selected={learnType == 'ホームスクーリング' && 'selected'}
                    >
                      ホームスクーリング
                    </option>
                    <option
                      value="不登校"
                      selected={learnType == '不登校' && 'selected'}
                    >
                      不登校
                    </option>
                    <option
                      value="その他"
                      selected={learnType == 'その他' && 'selected'}
                    >
                      その他
                    </option>
                  </select>
                </div>
                {/* <div className="form-group ">
                      <label
                        style={{
                          fontSize: '14px',
                          paddingLeft: '10px',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        学校名
                        {learnType == 'ホームスクーリング' ||
                        learnType == '不登校' ||
                        learnType == 'その他' ? (
                          ''
                        ) : (
                          <span style={{ color: 'yellow' }}>【必須】</span>
                        )}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          backgroundColor: 'white',
                        }}
                        onChange={(e) => {
                          setSchoolName(e.target.value)
                        }}
                        // disabled={
                        //   (learnType == 'ホームスクーリング' ||
                        //     learnType == '不登校') &&
                        //   'disabled'
                        // }
                        placeholder={
                          learnType == 'ホームスクーリング' ||
                          learnType == '不登校' ||
                          learnType == 'その他'
                            ? '学校以外通う所がある場合のみ入力'
                            : ''
                        }
                      />
                    </div> */}
                <div className="form-group">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    学校名
                    {/* <span style={{ color: 'yellow' }}>【必須】</span> */}
                  </label>
                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setSchoolName(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={school_name}
                  />
                </div>
                <div className="form-group">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    学年<span style={{ color: 'yellow' }}>【必須】</span>
                  </label>
                  <select
                    className="form-control  form-control-sm"
                    style={{ backgroundColor: 'white' }}
                    onChange={(e) => {
                      setGrade(e.target.value)
                    }}
                  >
                    <option selected>&nbsp;</option>
                    <option
                      value="年少"
                      selected={grade == '年少' && 'selected'}
                    >
                      年中
                    </option>
                    <option
                      value="年中"
                      selected={grade == '年中' && 'selected'}
                    >
                      年中
                    </option>
                    <option
                      value="年長"
                      selected={grade == '年長' && 'selected'}
                    >
                      年長
                    </option>
                    <option value="小1" selected={grade == '小1' && 'selected'}>
                      小1
                    </option>
                    <option value="小2" selected={grade == '小2' && 'selected'}>
                      小2
                    </option>
                    <option value="小3" selected={grade == '小3' && 'selected'}>
                      小3
                    </option>
                    <option value="小4" selected={grade == '小4' && 'selected'}>
                      小4
                    </option>
                    <option value="小5" selected={grade == '小5' && 'selected'}>
                      小5
                    </option>
                    <option value="小6" selected={grade == '小6' && 'selected'}>
                      小6
                    </option>
                    <option value="中1" selected={grade == '中1' && 'selected'}>
                      中1
                    </option>
                    <option value="中2" selected={grade == '中2' && 'selected'}>
                      中2
                    </option>
                    <option value="中3" selected={grade == '中3' && 'selected'}>
                      中3
                    </option>
                    <option value="高1" selected={grade == '高1' && 'selected'}>
                      高1
                    </option>
                    <option value="高2" selected={grade == '高2' && 'selected'}>
                      高2
                    </option>
                    <option value="高3" selected={grade == '高3' && 'selected'}>
                      高3
                    </option>
                    <option
                      value="高卒"
                      selected={grade == '高卒' && 'selected'}
                    >
                      高卒
                    </option>
                    <option
                      value="大学1年"
                      selected={grade == '大学1年' && 'selected'}
                    >
                      大学(専門学校)1年
                    </option>
                    <option
                      value="大学2年"
                      selected={grade == '大学2年' && 'selected'}
                    >
                      大学(専門学校)2年
                    </option>
                    <option
                      value="大学3年"
                      selected={grade == '大学3年' && 'selected'}
                    >
                      大学(専門学校)3年
                    </option>
                    <option
                      value="大学4年"
                      selected={grade == '大学4年' && 'selected'}
                    >
                      大学(専門学校)4年
                    </option>
                    <option
                      value="該当なし"
                      selected={grade == '該当なし' && 'selected'}
                    >
                      該当なし
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  {/* {selectedCountry} */}
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    お住まいの国
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>
                  {/* <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setResidentCountryName(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={residentCountryName}
                  /> */}
                  <select
                    className="form-control form-control-sm"
                    style={{ backgroundColor: 'white' }}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value)
                    }}
                  >
                    {countryNameList.map((val, key) => {
                      return (
                        <option
                          value={val.country_code + '/' + val.country_name}
                          selected={val.country_code == 'JP' && 'selected'}
                        >
                          {val.country_name}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    郵便番号(zip)
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>
                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setZip(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={zip}
                  />
                </div>
                <div className="form-group">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    都道府県(pref)
                    <span style={{ color: 'yellow' }}>
                      【日本お住まい方必須】
                    </span>
                  </label>
                  {selectedCountry == 'JP/Japan' ? (
                    <select
                      className="form-control  form-control-sm"
                      style={{ backgroundColor: 'white' }}
                      onChange={(e) => {
                        setPref(e.target.value)
                      }}
                    >
                      <option>&nbsp;</option>
                      <SelectPref pref="" />
                    </select>
                  ) : (
                    <input
                      style={{
                        backgroundColor: 'white',
                      }}
                      onChange={(e) => {
                        setPref(e.target.value)
                      }}
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={pref}
                    />
                  )}
                </div>
                <div className="form-group">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    市区町村(city)
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>
                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setCity(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={city}
                  />
                </div>
                <div className="form-group">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    番地・建物名・部屋番号
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>
                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setAddr(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={addr}
                  />
                </div>

                <div className="form-group">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    e-mail<span style={{ color: 'yellow' }}>【必須】</span>
                  </label>

                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    type="email"
                    className="form-control"
                    placeholder="email *"
                    value={email}
                  />
                </div>
                <div className="form-group ">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    電話番号(tel)
                  </label>

                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setTel(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    value={tel}
                  />
                </div>

                <div className="form-group ">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    携帯番号(mobile phone)
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>

                  <input
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setMobilephone(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    value={mobilephone}
                  />
                </div>

                <div className="form-group ">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    英語学習歴
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>

                  <textarea
                    style={{
                      backgroundColor: 'white',
                      height: '200px',
                    }}
                    onChange={(e) => {
                      setEnglishHistory(e.target.value)
                    }}
                    type="text"
                    className="form-control"
                    placeholder="英語を習ったことがある場合、今までの英語学習歴をご記入ください。"
                    value={englishHistory}
                  />
                </div>
                <div className="form-group">
                  <label
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    password
                    <span style={{ color: 'yellow' }}>【必須】</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    min="6"
                    max="20"
                    style={{
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                    placeholder=" 6文字以上"
                  />
                </div>

                <div
                  className="form-group"
                  style={{
                    padding: 0,
                    paddingBottom: '10px',
                    textAlign: 'center',
                  }}
                >
                  <hr />
                  <button
                    className="btn btn-primary"
                    onClick={addMemInfo}
                    style={{ fontSize: 20, fontWeight: 500, width: '100%' }}
                  >
                    無料体験を申し込む
                  </button>
                </div>
                {/* </form> */}
              </div>

              {/* ============
            <div>
              <button onClick={getMemInfo}>Show Members</button>
              <div>
                {membersList.map((val, key) => {
                  return (
                    <div>
                      <h3>
                        key:{key}/name:
                        {val.name}
                      </h3>
                      <h3>{val.email}</h3>/{val.name_eng}/{val.email}/{val.tel}/
                      {val.password}
                      
                    </div>
                  )
                })}
              </div>
              <br />
            
            </div> */}
            </div>
          </div>
        </div>
        <SweetAlert
          title="登録が完了されました。"
          show={isGoNextPage}
          onConfirm={() => nextStep()}
          // onCancel={() => {
          //   setIsGoNextPage(false)
          // }}
          confirmBtnText="OK"
          // cancelBtnText="NO"
          showCancel={false}
          reverseButtons={true}
          style={{ width: '500px' }}
        >
          {/* <p></p> */}
        </SweetAlert>
      </center>
    </div>
    // </div>
  )
}

export default TryRegisterFormEnter
