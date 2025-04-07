import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Home() {
  const [name, setName] = useState('')
  const [endDate, setEndDate] = useState(new Date())
  const [availableTimes, setAvailableTimes] = useState([
    { dayOfWeek: 'Mon', startTime: '', endTime: '' },
  ])
  const [schedule, setSchedule] = useState([])
  const [clickCount, setClickCount] = useState(0)
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedTimeRange, setSelectedTimeRange] = useState({
    start: -1,
    end: -1,
  })
  const [editingIndex, setEditingIndex] = useState(0)

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']

  const addTimeSlot = () => {
    setAvailableTimes([
      ...availableTimes,
      { dayOfWeek: 'Mon', startTime: '', endTime: '' },
    ])
  }

  const handleTimeChange = (index, field, value) => {
    const newTimes = [...availableTimes]
    newTimes[index][field] = value
    setAvailableTimes(newTimes)
  }

  const handleTimeSlotClick = (day, time) => {
    if (clickCount === 0) {
      const newTimes = [...availableTimes]
      newTimes[editingIndex] = {
        ...newTimes[editingIndex],
        dayOfWeek: day,
        startTime: formatTime(time),
        endTime: '',
      }
      setAvailableTimes(newTimes)
      setSelectedDay(day)
      setSelectedTimeRange({ start: time, end: -1 })
      setClickCount(1)
    } else if (clickCount === 1 && day === selectedDay) {
      const newTimes = [...availableTimes]
      newTimes[editingIndex].endTime = formatTime(time)
      setAvailableTimes(newTimes)
      setSelectedTimeRange({ start: selectedTimeRange.start, end: time })
      setClickCount(2)
    } else {
      resetSelection()
    }
  }

  const formatTime = (time) => {
    const hour = Math.floor(time / 2)
    const minute = (time % 2) * 30
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  }

  const resetSelection = () => {
    setClickCount(0)
    setSelectedDay('')
    setSelectedTimeRange({ start: -1, end: -1 })
    setEditingIndex(availableTimes.length - 1)
  }

  const handleSubmit = async (index) => {
    const timeSlot = availableTimes[index]
    const res = await fetch('/api/teachers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, availableTimes: [timeSlot] }),
    })
    const data = await res.json()
    console.log(data)
    updateSchedule([timeSlot])
    resetSelection()
  }

  const updateSchedule = (times) => {
    const newSchedule = daysOfWeek.map((day) => ({
      dayOfWeek: day,
      times: Array(48).fill(false),
    }))

    times.forEach((time) => {
      const dayIndex = newSchedule.findIndex(
        (d) => d.dayOfWeek === time.dayOfWeek
      )
      if (dayIndex !== -1) {
        const startHour = parseInt(time.startTime.split(':')[0])
        const startMinute = parseInt(time.startTime.split(':')[1])
        const endHour = parseInt(time.endTime.split(':')[0])
        const endMinute = parseInt(time.endTime.split(':')[1])
        const startIndex = startHour * 2 + (startMinute >= 30 ? 1 : 0)
        const endIndex = endHour * 2 + (endMinute >= 30 ? 1 : 0)

        for (let i = startIndex; i <= endIndex; i++) {
          newSchedule[dayIndex].times[i] = true
        }
      }
    })

    setSchedule(newSchedule)
  }

  useEffect(() => {
    updateSchedule(availableTimes)
  }, [availableTimes, endDate])

  const renderTimeSlots = (daySchedule, dayIndex) => {
    return daySchedule.times.map((isActive, index) => {
      const isSelected =
        selectedDay === daySchedule.dayOfWeek &&
        selectedTimeRange.start !== -1 &&
        ((selectedTimeRange.start <= selectedTimeRange.end &&
          selectedTimeRange.start <= index &&
          index <= selectedTimeRange.end) ||
          (selectedTimeRange.start > selectedTimeRange.end &&
            selectedTimeRange.end <= index &&
            index <= selectedTimeRange.start))
      return (
        <tr
          key={index}
          className={`time-slot ${isActive ? 'active' : ''} ${
            isSelected ? 'selected' : ''
          }`}
          onClick={() => handleTimeSlotClick(daySchedule.dayOfWeek, index)}
        >
          <td style={{ textAlign: 'center' }}>
            <span className="btn btn-info">
              {String(Math.floor(index / 2)).padStart(2, '0')}:
              {index % 2 === 0 ? '00' : '30'}
            </span>
            <hr style={{ margin: 0, padding: 1 }} />
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="AppBig pt-5">
      <h2>Teacher Availability Registration</h2>
      <form>
        <div>
          <label>Tutor Name</label>&nbsp;
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Until Date</label>&nbsp;
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
            required
          />
        </div>
        {availableTimes.map((time, index) => (
          <div key={index}>
            <label>Day of Week</label>&nbsp;
            <select
              value={time.dayOfWeek}
              onChange={(e) =>
                handleTimeChange(index, 'dayOfWeek', e.target.value)
              }
              required
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <label>Start Time</label>&nbsp;
            <input
              type="time"
              value={time.startTime}
              onChange={(e) =>
                handleTimeChange(index, 'startTime', e.target.value)
              }
              required
              onClick={() => setEditingIndex(index)}
            />
            <label>End Time</label>&nbsp;
            <input
              type="time"
              value={time.endTime}
              onChange={(e) =>
                handleTimeChange(index, 'endTime', e.target.value)
              }
              required
              onClick={() => setEditingIndex(index)}
            />
            <span
              className="btn btn-secondary ml-3"
              type="button"
              onClick={() => handleSubmit(index)}
            >
              Register
            </span>
          </div>
        ))}
        <button type="button" onClick={addTimeSlot}>
          Add Another Time Slot
        </button>
      </form>
      <div>
        <h2>Availability Schedule</h2>
        <div className="schedule">
          {schedule.map((day, index) => (
            <div key={index} className="day-schedule">
              <h3 style={{ color: 'black' }}>{day.dayOfWeek}</h3>
              <table className="time-slots">
                <tbody>{renderTimeSlots(day, index)}</tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .schedule {
          display: flex;
          flex-wrap: nowrap;
        }
        .day-schedule {
          margin: 10px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          width: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .time-slots {
          width: 100%;
          border-collapse: collapse;
        }
        .time-slot {
          background-color: #f0f0f0;
          padding: 5px;
          text-align: center;
          cursor: pointer;
          margin: 2px 0;
          border: 1px solid #ddd;
        }
        .time-slot.active {
          background-color: #0070f3;
          color: #fff;
        }
        .time-slot.selected {
          background-color: #ffa500;
          color: #fff;
        }
        .time-slot:hover {
          background-color: #ffa500;
          color: #fff;
        }
      `}</style>
    </div>
  )
}
