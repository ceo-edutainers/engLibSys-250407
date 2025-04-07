import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment-timezone'
function ResidentCountrySelectorAuto() {
  const [countryList, setCountryList] = useState([])
  const [cityList, setCityList] = useState([])
  const [selectedCountryCode, setSelectedCountryCode] = useState()
  const [selectedTimezoneCity, setSelectedTimezoneCity] = useState()
  const [citySelectboxView, setCitySelectboxView] = useState()
  const [timezoneDefaultSet, setTimezoneDefaultSet] = useState('default')

  const getTimezoneCountryInfo = () => {
    axios
      .get('http://localhost:3001/select-timezone-country')
      .then((response) => {
        setCountryList(response.data)
        //console.log('getTimezoneCountryInfo:', response.data)
      })
  }
  useEffect(() => {
    getTimezoneCountryInfo()
  }, [])

  //console.log('timezoneDefaultSet:', timezoneDefaultSet)
  function getTimezoneCityInfo(cd) {
    axios
      .post('http://localhost:3001/select-timezone-city', {
        country_code: cd,
      })
      .then((response) => {
        setCityList(response.data)
      })
  }

  return (
    <>
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">Resident Country</label>
        <div className="col-sm-9">
          <select
            className="form-control"
            onChange={(e) => {
              setSelectedCountryCode(e.target.value),
                getTimezoneCityInfo(e.target.value),
                setCitySelectboxView('ok')
              setTimezoneDefaultSet('default')
            }}
          >
            <option value="">Select Resident Country</option>
            {countryList.map((val, key) => {
              return (
                <option value={val.country_code}>
                  {val.country_name}&nbsp;[{val.country_code}]
                </option>
              )
            })}
          </select>
          {/* {selectedCountryCode} */}
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">TimeZone</label>
        <div className="col-sm-9">
          {citySelectboxView == 'ok' ? (
            <>
              <select
                onChange={(a) => {
                  setSelectedTimezoneCity(a.target.value)
                  setTimezoneDefaultSet('')
                  //console.log('ttt:', a.target.value)
                }}
                className="form-control"
              >
                <option
                  value=""
                  selected={timezoneDefaultSet == 'default' && 'selected'}
                >
                  Select Timezone
                </option>
                {cityList.map((val, key) => {
                  return <option value={val.zone_name}>{val.zone_name}</option>
                })}
              </select>
              <p
                style={{
                  color: 'blue',
                  paddingLeft: '5px',
                  marginBottom: '0',
                }}
              ></p>
              <p
                style={{
                  color: 'blue',
                  paddingLeft: '5px',
                }}
              >
                {/* *Selected Timezone:{selectedTimezoneCity} */}
              </p>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}

export default ResidentCountrySelectorAuto
