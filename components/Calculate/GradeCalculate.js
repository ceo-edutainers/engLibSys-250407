import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AgeCalculator = ({ mbn }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [dob, setDob] = useState('')
  const [age, setAge] = useState(null)

  useEffect(() => {
    getMemberInfo(mbn)
  }, [mbn])

  const getMemberInfo = (mbn) => {
    const url = `${DB_CONN_URL}/member_info_mbn`
    axios.post(url, { mbn }).then((response) => {
      if (!response.data.status) {
        // Handle error if needed
      } else {
        if (
          response.data.response[0].birthy == '' ||
          response.data.response[0].birthm == '' ||
          response.data.response[0].birthd == ''
        ) {
          handleCalculateAge('no')
          setDob('誕生日登録無')
        } else {
          const birthData = response.data.response[0]
          const dob = `${birthData.birth_y}/${birthData.birth_m}/${birthData.birth_d}`
          setDob(dob)
          handleCalculateAge(dob)
          // if (birthData.birth_y !== '') {
          //   handleCalculateAge(dob)
          // } else {
          //   handleCalculateAge('no')
          // }
        }
      }
    })
  }

  const handleCalculateAge = (dob) => {
    const calculatedAge = calculateAge(dob)
    setAge(calculatedAge)
  }

  return (
    <>
      <div>
        {age !== null && (
          <div>
            {!age ? <h5>no info</h5> : <h5>{age}歳</h5>}

            {/* <p>{dob}</p> */}
          </div>
        )}
      </div>
      {/* <div>
        {grade !== null && (
          <div>
            <h5>{grade}</h5>
            <p>birthd:&nbsp;{birthDate}</p>
          </div>
        )}
      </div> */}
    </>
  )
}

const calculateAge = (dob) => {
  if (dob === 'no') {
    return 'no info'
  } else {
    const birth = new Date(dob)
    const now = new Date()
    let age = now.getFullYear() - birth.getFullYear()
    const m = now.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
      age--
    }
    // if (age == 2) {
    //   var grade = '年小'
    // } else if (age == 3) {
    //   var grade = '年小〜年中'
    // } else if (age == 4) {
    //   var grade = '年中〜年長'
    // } else if (age == 5) {
    //   var grade = '年長〜小１'
    // } else if (age == 6) {
    //   var grade = '小1〜小2'
    // } else if (age == 7) {
    //   var grade = '小2〜小3'
    // } else if (age == 8) {
    //   var grade = '小3〜小4'
    // } else if (age == 9) {
    //   var grade = '小4〜小5'
    // } else if (age == 10) {
    //   var grade = '小5〜小6'
    // } else if (age == 11) {
    //   var grade = '小6〜中1'
    // } else if (age == 12) {
    //   var grade = '中1〜中2'
    // } else if (age == 13) {
    //   var grade = '中2〜中3'
    // } else if (age == 14) {
    //   var grade = '中3〜高1'
    // } else if (age == 15) {
    //   var grade = '高1〜高2'
    // } else if (age == 16) {
    //   var grade = '高2〜高3'
    // } else if (age == 17) {
    //   var grade = '高3〜高2'
    // } else if (age == 18) {
    //   var grade = '小1〜小2'
    // } else if (age == 19) {
    //   var grade = '小1〜小2'
    // }

    return age
  }
}

export default AgeCalculator
