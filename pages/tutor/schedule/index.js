import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [availableTimes, setAvailableTimes] = useState([
    { startTime: '', endTime: '' },
  ])

  const addTimeSlot = () => {
    setAvailableTimes([...availableTimes, { startTime: '', endTime: '' }])
  }

  const handleTimeChange = (index, field, value) => {
    const newTimes = [...availableTimes]
    newTimes[index][field] = value
    setAvailableTimes(newTimes)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/teachers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, availableTimes }),
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <div>
      <h1>Teacher Availability Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {availableTimes.map((time, index) => (
          <div key={index}>
            <label>Start Time</label>
            <input
              type="datetime-local"
              value={time.startTime}
              onChange={(e) =>
                handleTimeChange(index, 'startTime', e.target.value)
              }
              required
            />
            <label>End Time</label>
            <input
              type="datetime-local"
              value={time.endTime}
              onChange={(e) =>
                handleTimeChange(index, 'endTime', e.target.value)
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={addTimeSlot}>
          Add Another Time Slot
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
