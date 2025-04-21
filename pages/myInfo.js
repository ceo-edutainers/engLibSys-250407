// CSS mypage_for_adult.css

import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MyHeaderMenu from '@/components/MypageGroup/myHeaderMenu'
import { QuizContext } from '@/components/MypageGroup/Contexts'
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
} from '@fortawesome/free-solid-svg-icons'

// ['menu', 'playing', 'finished']

function App() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  //alert
  const [isGoNextPage, setIsGoNextPage] = useState(false)

  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const router = useRouter() //使い方：router.replace('/')
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isNotReady, setIsNotReady] = useState(false)

  const [memberInfo, setMemberInfo] = useState([])
  const [memberTestInfo, setMemberTestInfo] = useState([])

  const [username, setUsername] = useState()
  const [nowPassword, setNowPassword] = useState()
  const [password, setPassword] = useState()
  const [passwordCompare, setPasswordCompare] = useState()

  const [facePic, setFacePic] = useState()
  const [name, setName] = useState() //name
  const [nameKana, setNameKana] = useState() //name_kana
  const [firstName, setFirstName] = useState() //first_name
  const [lastName, setLastName] = useState() //last_name

  const [nameEng, setNameEng] = useState() //first_name + last_name

  const [birth_y, setBirthY] = useState()
  const [birth_m, setBirthM] = useState()
  const [birth_d, setBirthD] = useState()
  const [gender, setGender] = useState()

  const [learnType, setLearnType] = useState()
  const [schoolName, setSchoolName] = useState()
  const [grade, setGrade] = useState()

  const [nationality, setNationality] = useState()
  const [motherTongue, setMotherTongue] = useState()
  const [secondLanguage, setSecondLanguage] = useState()
  const [thirdLanguage, setThirdLanguage] = useState()

  const [mobilephone, setMobilephone] = useState()
  const [lessonEmergencyTel, setLessonEmergencyTel] = useState()
  const [tel, setTel] = useState()
  // const [fax, setFax] = useState()
  const [email, setEmail] = useState()
  const [emailUrgent, setEmailUrgent] = useState()

  const [residentCountry, setResidentCountry] = useState('') //Japan
  const [zip, setZip] = useState()
  const [pref, setPref] = useState()
  const [city, setCity] = useState()
  const [addr, setAddr] = useState()

  const [parentName, setParentName] = useState() //parent_name
  const [parentNameKana, setParentNameKana] = useState() //parent_name_kana
  const [englishHistory, setEnglishHistory] = useState() //parent_name

  const [firstLevelTest, setFirstLevelTest] = useState()
  const [schoolGrammarLevelTest, setSchoolGrammarLevelTest] = useState()
  const [whySelectUs, setWhySelectUs] = useState()
  const [whatWantToGetFromUs, setWhatWantToGetFromUs] = useState()
  const [introducer, setIntroducer] = useState()
  const [supportTeam, setSupportTeam] = useState()
  const [applyDate, setApplyDate] = useState()
  const [status, setStatus] = useState()
  const [refNum, setRefNum] = useState()

  const [selectedCountry, setSelectedCountry] = useState('JP/Japan') //JP/Japan
  const [countryNameList, setCountryNameList] = useState([])
  const [memberNationalityList, setMemberNationalityList] = useState([])

  const [timezoneCountryCode, setTimezoneCountryCode] = useState() //JP
  const [timezoneCountryName, setTimezoneCountryName] = useState() //Japan
  const [timezoneCity, setTimezoneCity] = useState() //Asia/Tokyo
  const [timezoneUTC, setTimeZoneUTC] = useState() //9
  // const [nowSummerTime, setNowSummerTime] = useState()

  const tutorTimezone = () => {
    var Url = DB_CONN_URL + '/select-timezone-country'
    axios.get(Url).then((response) => {
      // var newResponse = []
      // newResponse = response.data

      setMemberNationalityList(response.data)
      console.log(response.data)
    })
  }

  const memberNationality = () => {
    var Url = DB_CONN_URL + '/select-nationality-list'
    axios.get(Url).then((response) => {
      // var newResponse = []
      // newResponse = response.data

      setCountryNameList(response.data)
      console.log(response.data)
    })
  }
  useEffect(() => {
    tutorTimezone()
    memberNationality()
  }, [])

  function birthYear() {
    let birthYear = []
    for (let i = 1960; i < 2050; i++) {
      birthYear.push(
        <option value={i} selected={i == birth_y && 'selected'}>
          {i}年
        </option>
      )
    }
    // console.log('birthYear: ', birthYear)
    return birthYear
  }

  function birthMonth() {
    let birthMonth = []
    for (let i = 1; i < 13; i++) {
      birthMonth.push(
        <option value={i} selected={i == birth_m && 'selected'}>
          {i}月
        </option>
      )
    }
    // console.log('birthYear: ', birthYear)
    return birthMonth
  }

  function birthDay() {
    let birthDay = []
    for (let i = 1; i <= 31; i++) {
      birthDay.push(
        <option value={i} selected={i == birth_d && 'selected'}>
          {i}日
        </option>
      )
    }
    // console.log('birthYear: ', birthYear)
    return birthDay
  }

  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    var Url = DB_CONN_URL + '/get-member-info/' + mbn

    axios.get(Url).then((response) => {
      if (!response.data.status) {
        alert(response.data.message)
      } else {
        setMemberInfo(response.data.response)
        setNowPassword(response.data.response.password)
        setUsername(response.data.response[0].username)
        setNameEng(response.data.response[0].name_eng)

        setFacePic(response.data.response[0].face_pic)
        setName(response.data.response[0].name)
        setFirstName(response.data.response[0].first_name)
        setLastName(response.data.response[0].last_name)
        setNameKana(response.data.response[0].name_kana)

        // var name_eng=response.data.response[0].first_name + ' ' + response.data.response[0].last_name

        setBirthY(response.data.response[0].birth_y)
        setBirthM(response.data.response[0].birth_m)
        setBirthD(response.data.response[0].birth_d)
        setGender(response.data.response[0].gender)

        setLearnType(response.data.response[0].learnType)
        setSchoolName(response.data.response[0].school_name)
        setGrade(response.data.response[0].grade)

        setNationality(response.data.response[0].nationality)
        setMotherTongue(response.data.response[0].mother_tongue)
        setSecondLanguage(response.data.response[0].second_language)
        setThirdLanguage(response.data.response[0].third_language)

        setMobilephone(response.data.response[0].mobilephone)
        setLessonEmergencyTel(response.data.response[0].lesson_emergency_tel)
        setTel(response.data.response[0].tel)
        // setFax(response.data.response[0].fax)
        setEmail(response.data.response[0].email)

        setResidentCountry(response.data.response[0].residentCountry)
        setZip(response.data.response[0].zip)
        setPref(response.data.response[0].pref)
        setCity(response.data.response[0].city)
        setAddr(response.data.response[0].addr)

        setTimezoneCountryCode(response.data.response[0].timezoneCountryCode)
        setTimezoneCountryName(response.data.response[0].timezoneCountryName)
        setTimezoneCity(response.data.response[0].timezoneCity)
        setTimeZoneUTC(response.data.response[0].timezoneUTC)

        // setNowSummerTime(response.data.response[0].now_summer_time)

        setParentName(response.data.response[0].parent_name)
        setParentNameKana(response.data.response[0].parent_name_kana)
        setEnglishHistory(response.data.response[0].englishHistory)

        setFirstLevelTest(response.data.response[0].firstLevelTest)
        setSchoolGrammarLevelTest(
          response.data.response[0].schoolGrammarLevelTest
        )
        setWhySelectUs(response.data.response[0].whySelectUs)
        setWhatWantToGetFromUs(response.data.response[0].whatWantToGetFromUs)
        setIntroducer(response.data.response[0].introducer)
        setSupportTeam(response.data.response[0].supportTeam)
        setApplyDate(response.data.response[0].apply_date)
        setStatus(response.data.response[0].status)
        setRefNum(response.data.response[0].refNum)
      }
    })
  }, [])

  useEffect(() => {
    if (
      localStorage.getItem('loginStatus') !== 'true' ||
      !localStorage.getItem('loginStatus')
    ) {
      alert('先にログインしてください。')
      router.push('/loginGroup/')
    }
  }, [G_loginStatus])

  const [loginStatus, setLoginStatus] = useState(false) //login時
  let logOut = () => {
    setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('MypageMbn', '')
    localStorage.removeItem('name_eng', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginGroup')
  }

  const changeMemInfo = () => {
    if (firstName == '') {
      alert('生徒さんのアフファベットの名前は必ず入力してください。')
      return false
    }
    if (lastName == '') {
      alert('生徒さんのアフファベットの名字は必ず入力してください。')
      return false
    }

    // if (memberType) {
    //   if (parentName == '') {
    //     alert('保護者様の名前は必ず入力してください。')
    //     return false
    //   }
    //   if (parentNameKana == '') {
    //     alert('保護者様の名前の読みかなは必ず入力してください。')
    //     return false
    //   }

    //   if (learnType == '') {
    //     //公立/私立/インターナショナルスクール/ホームスクーリング/不登校/その他
    //     alert('学校タイプを必ずお選びください。')
    //     return false
    //   }

    //   if (grade == '') {
    //     alert('学年は必ず入力してください。')
    //     return false
    //   }
    // }
    if (password != comparePassword) {
      alert('パスワードが正しくありません。')
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

    if (zip == '') {
      alert('郵便番号は必ず入力してください。')
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
    var engName = firstName + ' ' + lastName
    if (memberType) {
      axios
        .post(DB_CONN_URL + '/modify-member-info', {
          username: username, //
          nameKana: nameKana, //
          nameKanji: nameKanji, //
          firstName: firstName, //
          lastName: lastName, //
          engName: engName, //
          parent_name: parentName,
          parent_name_kana: parentNameKana,
          email: email,
          emailUrgent: emailUrgent,
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
            // localStorage.setItem('TryRegisterFormEnter', 'end')
            // alert(response.data.message)
            sendEmailtoTrialStudent()
            setIsGoNextPage(true)
          }
        })
    } else {
      axios
        .post(DB_CONN_URL + '/try-reg-ref-adult', {
          eventID: eventID,
          eventName: eventName,
          oldNewPrice: oldNewPrice,
          refNum: refNum,
          refName: refName,
          name: studentName,
          name_eng: studentNameEng,
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
    if (memberType) {
      var memberT = '学生'
    } else {
      var memberT = '大人'
    }
    var templateParams = {
      memberT: memberT,
      refNum: refNum,
      refName: refName,
      eventID,
      eventID,
      to_email: email,
      to_name: studentName,
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
    const YOUR_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_YOUR_SERVICE_ID
    const YOUR_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_YOUR_USER_ID
    const YOUR_TEMPLATE_ID_to_student = 'template_sx9pyvp' //template_s1hxpb8
    const YOUR_TEMPLATE_ID_to_admin = 'template_csg8egn'

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

  return (
    <div className="AppBig">
      {/* <MonsterGet /> */}
      {/* <p> {practiceTempId}</p> */}

      <MyHeaderMenu />
      <div
        className="QuizMpa"
        style={{
          backgroundColor: 'white',
          border: '10px solid #EBEDEF',
          width: '90%',
          margin: '20px',
        }}
      >
        <div className="row">
          <div
            className="col-lg-12 col-md-12 mt-3 mb-3"
            style={{
              width: '100%',
              textAlign: 'center',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          >
            <p
              style={{
                backgroundColor: '#F7DC6F',
                width: '100%',
                border: '1px solid #dedede',
                borderRadius: '10px',
                margin: '0px',
                padding: '10px',
                fontSize: '20px',
                fontWeight: 'normal',
                color: 'black',
                textAling: 'center',
              }}
            >
              マイ情報＆変更
            </p>
          </div>
          <div className="col-lg-12 col-md-12 mt-3 mb-3">
            <span
              className="mt-5 pt-5"
              style={{ paddingTop: '20px', color: 'red', fontWeight: 'normal' }}
            >
              教材を発送する際には、登録された住所に配送されます。引っ越しや移転などで住所が変更された場合には、すぐに住所変更をお願い申し上げます。
            </span>
          </div>
          <div
            className="col-lg-12 col-md-12 mt-3 mb-3"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div className="free-trial-form">
              <table
                className="table"
                style={{
                  textAlign: 'left',
                  width: '800px',
                }}
              >
                {memberInfo &&
                  memberInfo.map((val, key) => {
                    return (
                      <>
                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            ログインID
                          </th>{' '}
                          <td>{username}</td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            パスワード
                          </th>{' '}
                          <td>
                            パスワードを変更したい時にお使いください。 &nbsp;
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setPassword(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value=""
                            />
                            <br />
                            パスワードをもう一度入力&nbsp;
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setPasswordCompare(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value=""
                            />
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            お名前(漢字){' '}
                            <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            {' '}
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setName(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={name}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            お名前(読みかな){' '}
                            <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            {' '}
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setNameKana(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={nameKana}
                            />
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            First Name(英語の名字){' '}
                            <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setFirstName(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={firstName}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            Last Name(英語の名前){' '}
                            <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setLastName(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={lastName}
                            />
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            メール{' '}
                            <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setEmail(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={email}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            緊急メール
                          </th>{' '}
                          <td>
                            連絡を受けたいメールを追加したい場合、ご記入ください。
                            <br />
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setEmailUrgent(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={emailUrgent}
                            />
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            携帯番号{' '}
                            <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setMobilephone(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={mobilephone}
                            />
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            レッスン時の緊急連絡先番号
                          </th>{' '}
                          <td>
                            緊急連絡を受けたい電話番号を追加したい場合、ご記入ください。
                            <br />
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setLessonEmergencyTel(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={lessonEmergencyTel}
                            />
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            自宅番号
                          </th>{' '}
                          <td>
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setTel(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={tel}
                            />
                          </td>
                        </tr>

                        {/* <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            FAX
                          </th>{' '}
                          <td>
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
                              value={fax}
                            />
                          </td>
                        </tr> */}

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            生年月日{' '}
                            <span style={{ color: 'red' }}>【必須】</span>
                          </th>
                          <td>
                            <select
                              className="form-control  form-control-sm"
                              style={{
                                backgroundColor: 'white',
                                width: '150px',
                              }}
                              onChange={(e) => {
                                setBirthY(e.target.value)
                              }}
                            >
                              <option>&nbsp;</option>
                              {birthYear()}
                            </select>

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
                              <option>&nbsp;</option>
                              {birthMonth()}
                            </select>

                            <select
                              className="form-control  form-control-sm"
                              style={{
                                backgroundColor: 'white',
                                width: '150px',
                              }}
                              onChange={(e) => {
                                setBirthD(e.target.value)
                              }}
                            >
                              <option>&nbsp;</option>
                              {birthDay()}
                            </select>
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            性別 <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setGender(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={gender}
                            />
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            学校タイプ
                            <span style={{ color: 'red' }}>
                              【学生の場合必須】
                            </span>
                          </th>{' '}
                          <td>
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
                                  learnType == 'インターナショナルスクール' &&
                                  'selected'
                                }
                              >
                                インターナショナルスクール
                              </option>
                              <option
                                value="ホームスクーリング"
                                selected={
                                  learnType == 'ホームスクーリング' &&
                                  'selected'
                                }
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
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            学校名(現在){' '}
                            <span style={{ color: 'red' }}>
                              【学生の場合必須】
                            </span>
                          </th>{' '}
                          <td>
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
                              value={schoolName}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            学年(現在){' '}
                            <span style={{ color: 'red' }}>
                              【学生の場合必須】
                            </span>
                          </th>{' '}
                          <td>
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setGrade(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={grade}
                            />
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            国籍 <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            複数の国籍をお持ち場合、一つのみご記入ください。
                            <br />
                            <select
                              className="form-control form-control-sm"
                              style={{ backgroundColor: 'white' }}
                              onChange={(e) => {
                                setNationality(e.target.value)
                              }}
                            >
                              {memberNationalityList.map((val, key) => {
                                return (
                                  <option
                                    value={val.nationality_eng}
                                    selected={
                                      val.nationality_eng == nationality &&
                                      'selected'
                                    }
                                  >
                                    {val.nationality_eng}
                                  </option>
                                )
                              })}
                            </select>
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            母国語{' '}
                            <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setMotherTongue(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={motherTongue}
                            />
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            第２言語
                          </th>{' '}
                          <td>
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setSecondLanguage(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={secondLanguage}
                            />
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            第３言語
                          </th>{' '}
                          <td>
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setThirdLanguage(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={thirdLanguage}
                            />
                          </td>
                        </tr>

                        <tr>
                          {' '}
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            現在滞在中の国{' '}
                            <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            {' '}
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
                                    selected={
                                      val.country_name == residentCountry &&
                                      'selected'
                                    }
                                  >
                                    {val.country_name}
                                  </option>
                                )
                              })}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          {' '}
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            郵便番号{' '}
                            <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            {' '}
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
                          </td>
                        </tr>

                        <tr>
                          {' '}
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            都道府県{' '}
                            <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            {' '}
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
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            市区町村{' '}
                            <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            {' '}
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
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            住所 <span style={{ color: 'red' }}>【必須】</span>
                          </th>{' '}
                          <td>
                            {' '}
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
                          </td>
                        </tr>

                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            保護者氏名
                            <br />
                            <span style={{ color: 'red' }}>
                              【18歳以下の生徒の場合：必須】
                            </span>
                          </th>{' '}
                          <td>
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setParentName(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={parentName}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            保護者氏名(読み仮名) <br />
                            <span style={{ color: 'red' }}>
                              【18歳以下の生徒の場合：必須】
                            </span>
                          </th>{' '}
                          <td>
                            <input
                              style={{
                                backgroundColor: 'white',
                              }}
                              onChange={(e) => {
                                setParentNameKana(e.target.value)
                              }}
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={parentNameKana}
                            />
                          </td>
                        </tr>

                        {/* <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            入会時のレベルテスト
                          </th>{' '}
                          <td>{firstLevelTest}</td>
                        </tr> */}

                        {/* <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            文法レベル
                          </th>{' '}
                          <td>{schoolGrammarLevelTest}</td>
                        </tr> */}

                        {/* <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            なぜイングリブを選びましたか？
                          </th>{' '}
                          <td>{whySelectUs}</td>
                        </tr> */}

                        {/* <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            イングリブから得られたいことは？
                          </th>{' '}
                          <td>{whatWantToGetFromUs}</td>
                        </tr> */}
                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            レファレンス番号
                          </th>{' '}
                          <td>
                            お友達の入会時にこの番号を教えると、入会が決まったら、あなたに割引クーポンが発行されます。
                            <br />
                            {refNum}
                          </td>
                        </tr>
                        {/* <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            サポートチーム名
                          </th>{' '}
                          <td>
                            あなたをサポートするイングリブのサポートチームは
                            <b>{supportTeam}</b>となります。
                          </td>
                        </tr> */}
                        <tr>
                          <th
                            scope="row"
                            style={{ width: '20%', textAlign: 'left' }}
                          >
                            イングリブの登録日
                          </th>{' '}
                          <td>{applyDate}</td>
                        </tr>

                        <tr>
                          {' '}
                          <td colSpan="2">
                            {/* <button type="submit">変更する</button> */}

                            <button
                              className="btn btn-primary"
                              onClick={changeMemInfo}
                              style={{
                                fontSize: 20,
                                fontWeight: 500,
                                width: '100%',
                              }}
                            >
                              変更する
                            </button>
                          </td>
                        </tr>
                      </>
                    )
                  })}
              </table>
            </div>
          </div>
        </div>
        <SweetAlert
          title="前のページに戻ることはできません。"
          show={isOpenBackMypage}
          onConfirm={() => setIsOpenBackMypage(false)}
          confirmBtnText="戻らない"
          cancelBtnText=""
          showCancel={false}
          reverseButtons={true}
          style={{ width: '600px' }}
        >
          <p>
            前のページに戻るとこのステップのポイントは無効になりますので、ご注意ください。
          </p>
        </SweetAlert>

        <SweetAlert
          title="会員情報が修正されました。"
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
          <p>
            教材を発送する際には、登録された住所に配送されます。引っ越しや移転などで住所が変更された場合には、すぐに住所変更をお願い申し上げます。
          </p>
        </SweetAlert>
      </div>

      <CopyrightFooter />
    </div>
  )
}

export default App
