import React, { useState } from 'react'
import {
  Calendar as BigCalendar,
  momentLocalizer,
  globalizeLocalizer,
  Views,
} from 'react-big-calendar'
import moment from 'moment'
// import globalize from 'globalize'

// const localizer = globalizeLocalizer(globalize)
// import 'react-big-calendar/lib/css/react-big-calendar.css'

moment.locale('ja')

//momentLocalizer(moment);
const localizer = momentLocalizer(moment)

const events = [
  {
    id: 0,
    title: 'Reading:出席',
    start: new Date(2022, 8, 29, 9, 0, 0),
    end: new Date(2022, 8, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'Reading:終了',
    start: new Date(2022, 8, 29, 9, 0, 0),
    end: new Date(2022, 8, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 2,
    title: 'Shadowing:出席',
    start: new Date(2022, 8, 29, 9, 0, 0),
    end: new Date(2022, 8, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 3,
    title: 'Shadowing:終了',
    start: new Date(2022, 8, 29, 9, 0, 0),
    end: new Date(2022, 8, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2022, 0, 29, 14, 0, 0),
    end: new Date(2022, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2022, 0, 29, 8, 30, 0),
    end: new Date(2022, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2022, 0, 30, 7, 0, 0),
    end: new Date(2022, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
]

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

// styleを作成する関数
const eventStyle = (event, start, end, isSelected) => {
  let bgColor
  let fontColor
  if (event.id === 0 || event.id === 1) {
    bgColor = '#BF7A87'
    fontColor = 'aliceblue'
  } else {
    bgColor = '#386537'
    fontColor = 'white'
  }
  return {
    className: '',
    style: {
      backgroundColor: bgColor,
      color: fontColor,
    },
  }
}

const styles = {
  container: {
    width: '100%',
    height: 'auto',
    margin: '0',
    color: '#0000ff',
    fontSize: '15px',
  },
}

export default function CustomCalendar() {
  return (
    <div className="containers">
      <div className="row" style={{ textAlign: 'center' }}>
        <div
          className="col-lg-12 col-md-6 mt-3 mb-3"
          style={{
            // backgroundColor: 'red',
            textAlign: 'center',
            height: '1000px',
            width: '100%',
            maxWidth: '1300px',
            minWidth: '800px',
            color: '#545151',
            fontSize: '15px',
          }}
        >
          <BigCalendar
            selectable
            localizer={localizer}
            events={events}
            defaultView={Views.DAY}
            views={[Views.DAY, Views.WEEK, Views.MONTH]}
            steps={60}
            // defaultDate={new Date(2022, 0, 29)}
            defaultDate={new Date()}
            // resources={resourceMap}
            resourceIdAccessor="resourceId"
            resourceTitleAccessor="resourceTitle"
            style={styles}
            eventPropGetter={(event, start, end, isSelected) =>
              eventStyle(event, start, end, isSelected)
            }

            // toolbar
            // resizable
          />
        </div>
      </div>
    </div>
  )
}
