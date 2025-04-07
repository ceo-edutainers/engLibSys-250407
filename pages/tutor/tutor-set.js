import React, { useState, useEffect } from 'react'
import NavbarEnglib_Tutor from '@/components/_App/NavbarEnglib_Tutor'
//import Link from 'next/link'
import axios from 'axios'
import { push } from 'next-pwa/cache'
import {
  SelectPref,
  SelectNationality,
} from '@/components/FormData/FormSelectData'
import { useHistory } from 'react-router-dom'

const TryRegisterFormEnter = () => {
  const history = useHistory()

  const [acceptTryLesson, setAcceptTryLesson] = useState()
  const [nameFirst, setNameFirst] = useState('')
  const [nameMiddle, setNameMiddle] = useState('')
  const [nameLast, setNameLast] = useState('')
  //for insert info

  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [gender, setGender] = useState('')
  const [birth_y, setBirthY] = useState('')
  const [birth_m, setBirthM] = useState('')
  const [birth_d, setBirthD] = useState('')
  const [password, setPassword] = useState('')
  const [nationality, setNationality] = useState('')
  //const [timezoneCountryCode, setTimezoneCountryCode] = useState()
  //const [timezoneCountryName, setTimezoneCountryName] = useState()
  // const [timezoneCity, setTimezoneCity] = useState()
  // const [timezoneUTC, setTimezoneUTC] = useState()

  // const timezoneCountryName = req.body.timezoneCountryName
  // const timezoneCity = req.body.timezoneCity
  // const timezoneUTC = req.body.timezoneUTC

  //const [timeZone, setTimeZone] = useState('')
  //const [country, setCountry] = useState('')
  const [zip, setZip] = useState('')
  const [pref, setPref] = useState('')
  const [city, setCity] = useState('')
  const [addr, setAddr] = useState('')
  const [learnType, setLearnType] = useState('')
  const [school_name, setSchoolName] = useState('')
  const [grade, setGrade] = useState('')

  //for listing
  const [membersList, setMembersList] = useState([])
  //for update
  const [newTel, setNewTel] = useState('')

  const [selectedCountry, setSelectedCountry] = useState('JP/Japan')
  const [countryNameList, setCountryNameList] = useState([])

  const [selectedCountryCode, setSelectedCountryCode] = useState('')
  const [selectedCountryName, setSelectedCountryName] = useState('')

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    var cc = selectedCountry.split('/')
    setSelectedCountryCode(cc[0])
    setSelectedCountryName(cc[1])
  }, [selectedCountry])

  function birthYear() {
    let birthYear = []
    for (let i = 1990; i < 2021; i++) {
      birthYear.push(<option value={i}>{i}</option>)
    }
    // console.log('birthYear: ', birthYear)
    return birthYear
  }

  function birthMonth() {
    let birthMonth = []
    for (let i = 1; i < 13; i++) {
      birthMonth.push(<option value={i}>{i}</option>)
    }
    // console.log('birthYear: ', birthYear)
    return birthMonth
  }

  function birthDay() {
    let birthDay = []
    for (let i = 1; i < 31; i++) {
      birthDay.push(<option value={i}>{i}</option>)
    }
    // console.log('birthYear: ', birthYear)
    return birthDay
  }

  //input value check
  const handleInputCheck = () => {}
  const addMemInfo = () => {
    if (name == '') {
      alert('名前は必ず入力してください。')
      return false
    }
    if (name_eng == '') {
      alert('アルファベット名は必ず入力してください。')
      return false
    }
    if (email == '') {
      alert('emailは必ず入力してください。')
      return false
    }
    if (tel == '') {
      alert('お電話番号は必ず入力してください。')
      return false
    }
    if (password == '') {
      alert('パスワードは必ず入力してください。')
      return false
    }
    if (birth_y == '' || birth_m == '' || birth_d == '') {
      alert('生年月日は必ず入力してください。')
      return false
    }
    if (learnType == '') {
      alert('学校タイプは必ず入力してください。')
      return false
    }

    if (
      school_name == '' &&
      learnType != 'ホームスクーリング' &&
      learnType != '不登校' &&
      learnType != 'その他'
    ) {
      alert('学校名は必ず入力してください。')
      return false
    }
    if (grade == '') {
      alert('学年は必ず入力してください。')
      return false
    }

    axios
      .post(DB_CONN_URL + '/try-reg', {
        name: name,
        name_eng: name_eng,
        email: email,
        tel: tel,
        password: password,
        gender: gender,
        birth_y: birth_y,
        birth_m: birth_m,
        birth_d: birth_d,
        nationality: nationality,
        timezoneCountryCode: selectedCountryCode,
        timezoneCountryName: selectedCountryName,
        zip: zip,
        pref: pref,
        city: city,
        addr: addr,
        learnType: learnType,
        school_name: school_name,
        grade: grade,
      })
      .then((response) => {
        //console.log(response.data.message)
        if (response.data.register == 'false') {
          alert(response.data.message)
          return false
        } else if (response.data.register == 'true') {
          localStorage.setItem('TryRegisterFormEnter', 'end')
          alert(response.data.message)
          window.location.reload()
        }
      })
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
    <React.Fragment>
      <NavbarEnglib_Tutor />
      <div className="information-area pt-0 pb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12">
              <div
                className="free-trial-form"
                style={{ paddingBottom: 0, textAlign: 'center' }}
              >
                {/* {selectedCountryCode}/{selectedCountryName}
              selectedCountry:{selectedCountry} */}

                <h2 style={{ fontSize: 26, marginBottom: 10 }}>
                  Tutor's Information
                </h2>
                <p style={{ fontSize: 15, paddingBottom: 0 }}>
                  [先生SET項目-とにかく書こう]
                  <p>
                    Accept-try-lesson / 対応コース / レッスン場所 / 学校履歴更新
                    / schedule(どうしてもできない日付)/
                  </p>
                </p>
                <hr />
                {/* <form> */}
                <div className="form-row">
                  <div
                    className="form-group col-md-3"
                    style={{
                      paddingLeft: '20px',
                      paddingTop: 20,
                      textAlign: 'left',
                    }}
                  >
                    <label
                      className="form-check-label"
                      style={{ paddingRight: 20 }}
                    >
                      Accept try-lesson
                    </label>
                  </div>
                  <div
                    className="form-group col-md-9"
                    style={{
                      paddingLeft: '20px',
                      paddingTop: 20,
                      textAlign: 'left',
                    }}
                  >
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="ok"
                        onClick={(e) => {
                          setAcceptTryLesson(e.target.value)
                        }}
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        Accept
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
                        value="no"
                        onClick={(e) => {
                          setAcceptTryLesson(e.target.value)
                        }}
                      />
                      <label className="form-check-label">No</label>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div
                    className="form-group col-md-3"
                    style={{
                      paddingLeft: '20px',
                      paddingTop: 20,
                      textAlign: 'left',
                    }}
                  >
                    <label
                      className="form-check-label"
                      style={{ paddingRight: 20 }}
                    >
                      Courses that you are taught
                    </label>
                  </div>
                  <div
                    className="form-group col-md-9"
                    style={{
                      paddingLeft: '20px',
                      paddingTop: 20,
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ color: 'red' }}>*</span>Course that need
                    tutor's Japanese skill
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input mr-0"
                        type="checkbox"
                        name="mycourse"
                        id="inlineRadio1"
                        value="input_reading"
                        onClick={(e) => {
                          setAcceptTryLesson(e.target.value)
                        }}
                        disabled
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        <span style={{ color: 'red' }}>*</span>Input
                        Course(Reading)
                      </label>
                    </div>
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input mr-0"
                        type="checkbox"
                        name="mycourse"
                        id="inlineRadio1"
                        value="extra_eiken"
                        onClick={(e) => {
                          setAcceptTryLesson(e.target.value)
                        }}
                        disabled
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        <span style={{ color: 'red' }}>*</span>Extra
                        Course(Eiken)
                      </label>
                    </div>
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input mr-0"
                        type="checkbox"
                        name="mycourse"
                        id="inlineRadio1"
                        value="extra_MiddleSchoolGrammarSupport"
                        onClick={(e) => {
                          setAcceptTryLesson(e.target.value)
                        }}
                        disabled
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        <span style={{ color: 'red' }}>*</span>Extra
                        Course(Middle School Grammar Support)
                      </label>
                    </div>
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input mr-0"
                        type="checkbox"
                        name="mycourse"
                        id="inlineRadio1"
                        value="extra_grammar"
                        onClick={(e) => {
                          setAcceptTryLesson(e.target.value)
                        }}
                        disabled
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        &nbsp;Extra Course(English Only Grammar)
                      </label>
                    </div>
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input mr-0"
                        type="checkbox"
                        name="mycourse"
                        id="inlineRadio1"
                        value="output_verbalwriting"
                        onClick={(e) => {
                          setAcceptTryLesson(e.target.value)
                        }}
                        disabled
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        <span style={{ color: 'red' }}>*</span>Output(Verbal
                        Writing)
                      </label>
                    </div>
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input mr-0"
                        type="checkbox"
                        name="mycourse"
                        id="inlineRadio1"
                        value="output_freeconversation"
                        onClick={(e) => {
                          setAcceptTryLesson(e.target.value)
                        }}
                        disabled
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        &nbsp;Output(Free Conversation)
                      </label>
                    </div>
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input mr-0"
                        type="checkbox"
                        name="mycourse"
                        id="inlineRadio1"
                        value="output_showandtell"
                        onClick={(e) => {
                          setAcceptTryLesson(e.target.value)
                        }}
                        disabled
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        &nbsp;Output(Show and Tell)
                      </label>
                    </div>
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input mr-0"
                        type="checkbox"
                        name="mycourse"
                        id="inlineRadio1"
                        value="output_discussion"
                        onClick={(e) => {
                          setAcceptTryLesson(e.target.value)
                        }}
                        disabled
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        &nbsp;Output(Discussion)
                      </label>
                    </div>
                  </div>
                </div>

                <hr />
                <div className="form-row">
                  <div className="form-group col-md-4">
                    {' '}
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      First Name
                    </label>
                    <input
                      style={{
                        backgroundColor: 'white',
                      }}
                      onChange={(e) => {
                        setNameFirst(e.target.value)
                      }}
                      type="text"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      Middle Name
                    </label>

                    <input
                      style={{
                        backgroundColor: 'white',
                      }}
                      onChange={(e) => {
                        setNameMiddle(e.target.value)
                      }}
                      id="inputname"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      Last Name
                    </label>

                    <input
                      style={{
                        backgroundColor: 'white',
                      }}
                      onChange={(e) => {
                        setNameLast(e.target.value)
                      }}
                      id="inputname"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      TEL
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
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      Nationality
                    </label>

                    <select
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
                            selected={val.country_name == 'Japan' && 'selected'}
                          >
                            {val.country_name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div
                    className="form-group col-md-6"
                    style={{
                      paddingLeft: '20px',
                      paddingTop: 20,
                      textAlign: 'left',
                    }}
                  >
                    <label className="form-check-label">Gender</label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input ml-3"
                        type="radio"
                        name="gender"
                        id="inlineRadio1"
                        value="female"
                        onClick={(e) => {
                          setGender(e.target.value)
                        }}
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        female
                      </label>
                    </div>
                    <div
                      className="form-check form-check-inline"
                      style={{ paddingLeft: '20px' }}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="male"
                        onClick={(e) => {
                          setGender(e.target.value)
                        }}
                      />
                      <label className="form-check-label">male</label>
                    </div>
                  </div>
                  <div className="form-group col-md-2">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      BirthY
                    </label>
                    <select
                      className="form-control  form-control-sm"
                      style={{ backgroundColor: 'white' }}
                      onChange={(e) => {
                        setBirthY(e.target.value)
                      }}
                    >
                      <option selected>&nbsp;</option>
                      {birthYear()}
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      BirthM
                    </label>
                    <select
                      className="form-control  form-control-sm"
                      style={{ backgroundColor: 'white' }}
                      onChange={(e) => {
                        setBirthM(e.target.value)
                      }}
                    >
                      <option selected>&nbsp;</option>
                      {birthMonth()}
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      BirthD
                    </label>
                    <select
                      className="form-control  form-control-sm"
                      style={{ backgroundColor: 'white' }}
                      onChange={(e) => {
                        setBirthD(e.target.value)
                      }}
                    >
                      <option selected>&nbsp;</option>
                      {birthDay()}
                    </select>
                  </div>
                </div>
                <hr />
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      test
                    </label>
                    <select
                      className="form-control  form-control-sm"
                      style={{ backgroundColor: 'white' }}
                      onChange={(e) => {
                        setLearnType(e.target.value)
                      }}
                    >
                      <option selected>&nbsp;</option>
                      <option value="公立">公立</option>
                      <option value="私立">私立</option>
                      <option value="インターナショナルスクール">
                        インターナショナルスクール
                      </option>
                      <option value="ホームスクーリング">
                        ホームスクーリング
                      </option>
                      <option value="不登校">不登校</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>

                  <div className="form-group col-md-8">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      学校履歴更新
                    </label>
                    <input className="form-control bg-white"></input>
                  </div>
                </div>
                <hr />
                <div className="form-row">
                  <div className="form-group col-md-3">
                    {/* {selectedCountry} */}
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      Resident Country
                    </label>
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
                  <div className="form-group col-md-3">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      Zipcode
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
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      Pref
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
                      />
                    )}
                  </div>
                  <div className="form-group col-md-3">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      City
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
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12">
                    <label
                      style={{
                        fontSize: '14px',
                        paddingLeft: '10px',
                      }}
                    >
                      Address
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
                    />
                  </div>
                </div>
                <hr />
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      e-mail<span style={{ color: 'red' }}>【必須】</span>
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
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label style={{ fontSize: '14px', paddingLeft: '10px' }}>
                      password<span style={{ color: 'red' }}>【必須】</span>
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
                </div>
                <div
                  className="form-group col-md-12"
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
                    Modify Information
                  </button>
                  <label style={{ fontSize: '14px', paddingTop: '5px' }}>
                    次のページでご希望の体験の日付を複数ご登録可能です。
                  </label>
                  <span className="sub-title">
                    今なら入会金１万円が０円！
                    英語塾乗換えでさらに５千円クーポンゲット
                  </span>
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
      </div>
    </React.Fragment>
  )
}

export default TryRegisterFormEnter
