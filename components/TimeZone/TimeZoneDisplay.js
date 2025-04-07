import React, { useEffect, useState } from 'react'

const TimeZoneDisplay = ({ lDate, lTime }) => {
  const [localTime, setLocalTime] = useState('')

  // 원본 레슨 시간 (2024-09-25 18:30) 형태의 문자열

  // const lessonTime = '2024-09-25 18:30';
  const lessonTime = lDate + ' ' + lTime

  // 공백을 'T'로 바꾸고 초를 추가하여 ISO 8601 형식으로 변환
  const lessonTimeInJapan = lessonTime.replace(' ', 'T') + ':00'

  useEffect(() => {
    // 일본의 UTC 오프셋은 +9 (즉, UTC+9)
    const japanUtcOffset = 9

    // 사용자 로컬 컴퓨터의 UTC 오프셋 (분 단위로 반환되므로 시간을 계산하려면 60으로 나눔)
    const localUtcOffsetInMinutes = new Date().getTimezoneOffset()
    const localUtcOffset = -localUtcOffsetInMinutes / 60 // 부호 반전해서 UTC+/-로 만듦

    // 지정된 일본 시간 (lessonTimeInJapan)을 Date 객체로 변환
    const japanDate = new Date(lessonTimeInJapan)

    // UTC 기준 시간 계산
    const utcTime = japanDate.getTime() - japanUtcOffset * 3600000 // 일본 시간에서 UTC 시간으로 변환

    // UTC 시간을 로컬 시간으로 변환
    const localDate = new Date(utcTime + localUtcOffset * 3600000) // 로컬 시간으로 변환

    // 포맷팅하여 출력
    const localTimeFormatted = localDate.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      // second: '2-digit',
      hour12: false,
    })

    // 상태 업데이트
    setLocalTime(localTimeFormatted)
  }, [lessonTimeInJapan])

  return (
    <div>
      <h5>
        {localStorage.getItem('memberTimezone')}
        {localTime}〜
      </h5>
      {/* <h5>Current Time in Japan (UTC+9): {japanTime}</h5> */}
    </div>
  )
}

export default TimeZoneDisplay
