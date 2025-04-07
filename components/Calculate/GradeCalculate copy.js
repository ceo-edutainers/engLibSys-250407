import React, { useState, useEffect } from 'react'
import axios from 'axios'
const GradeCalculator = ({ mbn }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [birthDate, setBirthDate] = useState('')
  const [grade, setGrade] = useState(null)

  const handleCalculateGrade = (birthDate) => {
    const calculatedGrade = calculateGrade(birthDate)
    setGrade(calculatedGrade)
  }
  useEffect(() => {
    getMemberInfo(mbn)
  }, [mbn])

  const getMemberInfo = (mbn) => {
    var url = DB_CONN_URL + '/member_info_mbn'
    axios
      .post(url, {
        mbn: mbn,
      })
      .then((response) => {
        if (!response.data.status) {
        } else {
          setBirthDate(
            response.data.response[0].birth_y +
              '/' +
              response.data.response[0].birth_m +
              '/' +
              response.data.response[0].birth_d
          )

          var birthDate =
            response.data.response[0].birth_y +
            '/' +
            response.data.response[0].birth_m +
            '/' +
            response.data.response[0].birth_d
          if (response.data.response[0].birth_y == '') {
            var birthDate = 'no'
          }
          handleCalculateGrade(birthDate)
        }
      })
  }

  return (
    <div>
      {grade !== null && (
        <div>
          <h5>{grade}</h5>
          <p>birthd:&nbsp;{birthDate}</p>
        </div>
      )}
    </div>
  )
}
const calculateGrade = (birthDate) => {
  if (birthDate === 'no') {
    return 'no info'
  } else {
    const birth = new Date(birthDate)
    const now = new Date()

    // 現在の年
    const currentYear = now.getFullYear()

    // 基準日：4月2日
    const cutoffDate = new Date(currentYear, 3, 2)

    // 学年の計算
    let grade
    if (birth <= cutoffDate) {
      grade = currentYear - birth.getFullYear() - 6
    } else {
      grade = currentYear - birth.getFullYear() - 5
    }

    if (grade < 0) {
      if (grade === -1) return '年長'
      if (grade === -2) return '年中'
      if (grade === -3) return '年少'
      return 'まだ学校に入学していません'
    } else {
      if (grade >= 0 && grade <= 6) {
        const gradeName = '小'
        if (grade == 0) {
          const newgrade = grade + 1
          return `${gradeName}${newgrade}年`
        } else {
          const newgrade = grade
          return `${gradeName}${newgrade}年`
        }
      } else if (grade >= 7 && grade <= 9) {
        const gradeName = '中'
        const newgrade = grade - 6
        return `${gradeName}${newgrade}年`
      } else if (grade >= 10 && grade <= 12) {
        const gradeName = '高'
        const newgrade = grade - 9
        return `${gradeName}`
      } else {
        return '大人'
      }
    }
  }
}

// const calculateGrade = (birthDate) => {
//   if (birthDate == 'no') {
//     return 'no info'
//   } else {
//     const birth = new Date(birthDate)
//     const now = new Date()

//     // 現在の年
//     const currentYear = now.getFullYear()

//     // 基準日：4月2日
//     const cutoffDate = new Date(currentYear, 3, 2)

//     // 学年の計算
//     let grade
//     if (birth <= cutoffDate) {
//       grade = currentYear - birth.getFullYear() - 6
//     } else {
//       grade = currentYear - birth.getFullYear() - 5
//     }

//     // let grade
//     // if (birth > cutoffDate) {
//     //   grade = currentYear - birth.getFullYear() - 6
//     // } else {
//     //   grade = currentYear - birth.getFullYear() - 5
//     // }

//     if (grade < 0) {
//       if (grade === -1) return '年長'
//       if (grade === -2) return '年中'
//       if (grade === -3) return '年少'
//       return 'まだ学校に入学していません'
//     } else {
//       if (grade >= 0 && grade <= 6) {
//         var gradeName = '小'
//         if (grade == 0) {
//           var newgrade = grade + 1
//           return `${gradeName}${newgrade}`
//         } else {
//           return `${gradeName}${grade}`
//         }
//       } else if (grade >= 7 && grade <= 9) {
//         var gradeName = '中'
//         var newgrade = grade - 6
//         return `${gradeName}${newgrade}/${grade}`
//       } else if (grade >= 10 && grade <= 12) {
//         var gradeName = '高'
//         var newgrade = grade - 9
//         return `${gradeName}${newgrade}/${grade}`
//       } else {
//         var newgrade = grade
//         var gradeName = '大人'
//         return `${gradeName}/${newgrade}`
//       }
//     }
//   }
// }

export default GradeCalculator
