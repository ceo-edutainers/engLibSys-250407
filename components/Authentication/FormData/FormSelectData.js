import React, { useState, useEffect } from 'react'

import axios from 'axios'

export const SelectCountryTest = () => {
  const [selectedCountryName, setSelectedCountryName] = useState()
  const [selectedCountryCode, setSelectedCountryCode] = useState()
  const [countryNameList, setCountryNameList] = useState([])

  const tutorTimezone = () => {
    axios
      .get('http://localhost:3001/select-timezone-country')
      .then((response) => {
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
    <select
      className="form-control form-control-sm"
      style={{ backgroundColor: 'white' }}
      onChange={(e) => {
        selectedCountryCode(e.target.value)
      }}
    >
      <option>お住まいの国</option>
      {countryNameList.map((val, key) => {
        return <option value={val.country_code}>{val.country_name}</option>
      })}
    </select>
  )
}

export const SelectPref = (pref) => {
  const pf = pref
  // console.log(pf.pref)
  return (
    <>
      <option value="北海道">北海道</option>
      <option value="青森県">青森県</option>
      <option value="岩手県">岩手県</option>
      <option value="宮城県">宮城県</option>
      <option value="秋田県">秋田県</option>
      <option value="山形県">山形県</option>
      <option value="福島県">福島県</option>
      <option value="茨城県">茨城県</option>
      <option value="栃木県">栃木県</option>
      <option value="群馬県">群馬県</option>
      <option value="埼玉県">埼玉県</option>
      <option value="千葉県">千葉県</option>
      <option value="東京都">東京都</option>
      <option value="神奈川県">神奈川県</option>
      <option value="新潟県">新潟県</option>
      <option value="富山県">富山県</option>
      <option value="石川県">石川県</option>
      <option value="福井県">福井県</option>
      <option value="山梨県">山梨県</option>
      <option value="岐阜県">岐阜県</option>
      <option value="静岡県">静岡県</option>
      <option value="愛知県">愛知県</option>
      <option value="三重県">三重県</option>
      <option value="滋賀県">滋賀県</option>
      <option value="京都府">京都府</option>
      <option value="大阪府">大阪府</option>
      <option value="兵庫県">兵庫県</option>
      <option value="奈良県">奈良県</option>
      <option value="和歌山県">和歌山県</option>
      <option value="鳥取県">鳥取県</option>
      <option value="島根県">島根県</option>
      <option value="岡山県">岡山県</option>
      <option value="広島県">広島県</option>
      <option value="山口県">山口県</option>
      <option value="徳島県">徳島県</option>
      <option value="香川県">香川県</option>
      <option value="愛媛県">愛媛県</option>
      <option value="高知県">高知県</option>
      <option value="福岡県">福岡県</option>
      <option value="佐賀県">佐賀県</option>
      <option value="長崎県">長崎県</option>
      <option value="熊本県">熊本県</option>
      <option value="大分県">大分県</option>
      <option value="宮崎県">宮崎県</option>
      <option value="鹿児島県">鹿児島県</option>
      <option value="沖縄県">沖縄県</option>
    </>
  )
}

export const SelectNationality = (nation) => {
  const nt = nation
  // console.log(pf.pref)
  return (
    <>
      <option
        value="日本"
        selected={(e) => {
          nt.nation == '日本' ? 'selected' : ''
        }}
      >
        日本
      </option>
      <option value="韓国">韓国</option>
      <option value="香港">香港</option>
      <option value="シンガポール">シンガポール</option>
      <option value="台湾">台湾</option>
      <option value="インド">インド</option>
      <option value="マレーシア">マレーシア</option>
      <option value="インドネシア">インドネシア</option>
      <option value="その他">その他</option>
    </>
  )
}
