import React, { useState, useEffect } from 'react'
import {
  LineChart,
  PieChart,
  ColumnChart,
  BarChart,
  AreaChart,
  ScatterChart,
} from 'react-chartkick'
// import 'chartkick/chart.js'

const ChartBalanceLineForMonster = ({ monsterInfo }) => {
  console.log('monsterInfo', monsterInfo)

  const [thisData, setThisData] = useState([])

  useEffect(() => {
    // alert('pointInfo' + pointInfo)

    monsterInfo.map((val, key) => {
      setThisData((thisData) => [
        ...thisData,
        [val.grouping_column, val.totalPoint],
      ])
    })

    // console.log('thisData', thisData)
  }, [monsterInfo])

  var d = ''
  var d = new Date()
  var Y = d.getFullYear()
  var M = d.getMonth() + 1
  var D = d.getDate()
  var h = d.getHours()
  var m = d.getMinutes()
  var s = d.getSeconds()
  // let ms = myFun_addZero(d.getMilliseconds())

  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }
  if (h < 10) {
    h = '0' + h
  }
  if (m < 10) {
    m = '0' + m
  }
  if (s < 10) {
    s = '0' + s
  }

  var NowMonth = Y + '-' + M

  var data = [
    // { name: 'Point', data: { '2021-01': 70, '2021-02': 40 } },
    // { name: 'Call parents', data: { '2021-01': 100, '2021-02': 30 } },

    {
      name: 'Monster',
      data: thisData,
      // colors: ['#b00', '#666']
      // color: '#b00',
    },
  ]

  // var data2 = [
  //   // { name: 'Point', data: { '2021-01': 70, '2021-02': 40 } },
  //   // { name: 'Call parents', data: { '2021-01': 100, '2021-02': 30 } },

  //   {
  //     name: 'Total-Point',
  //     data: thisData,
  //     color: '#b00',
  //   },
  //   {
  //     name: 'READING',
  //     data: readingData,
  //     color: '#002CE0',
  //   },
  //   {
  //     name: 'SHADOWING',
  //     data: shadowingData,
  //     color: '#F69C11',
  //   },
  //   {
  //     name: 'SHOW-AND-TELL',
  //     data: showandtellData,
  //     color: '#0BDB5A',
  //   },
  // ]
  return (
    <>
      {/* <LineChart data={{ '2021-01-01': 11, '2021-01-02': 6 }} /> */}
      {thisData && (
        <>
          <BarChart data={data} />
          <br />
          <br />
          <LineChart
            xtitle="Month"
            ytitle="Monster"
            colors={['#b00', '#666']}
            thousands=","
            empty="No data"
            dataset={{ borderWidth: 2 }}
            xmax={NowMonth}
            download={true}
            discrete={true}
            // data={thisData}
            data={data}
          />
          {/* <PieChart donut={true} data={thisData} />
          <ColumnChart data={thisData} />
          <AreaChart data={data} />
          <ScatterChart data={data} /> */}
        </>
      )}

      {/* // <LineChart
        data={[
          ['2023-01', 2],
          ['2022-02', 3],
          ['2022-03', 4],
          ['2022-04', 3],
        ]}
      // /> */}
    </>
  )
}

export default ChartBalanceLineForMonster
