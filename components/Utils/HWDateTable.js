// DateTable.js
import React from 'react'
import { getLastSevenDays } from '@/components/Utils/DateUtils'
import FireViewDaily from '@/components/Utils/FireViewDaily'
const DateTable = ({ mbn, homework_id }) => {
  const days = getLastSevenDays()

  return (
    <div style={{ padding: '5px' }}>
      <table
        border="1"
        cellPadding="10"
        style={{
          width: '300px',
          textAlign: 'center',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            {days.map((item, index) => (
              <th
                key={index}
                style={{ width: '14%', padding: '10px', fontSize: '12px' }}
              >
                {item.date.split('-').slice(1).join('-')}
                <br />({item.day})
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {days.map((_, index) => (
              <td
                key={index}
                style={{ width: '10%', padding: '10px', height: 'auto' }}
              >
                <FireViewDaily thisSubject="READING" mbn={mbn} date={_.date} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DateTable
