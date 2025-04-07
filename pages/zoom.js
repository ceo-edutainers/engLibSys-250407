import React, { useState, useContext, useEffect } from 'react'

import Zoom from '@/components/Zoom/Zoom'

function App() {
  const [joinMeeting, setJoinMeeting] = useState(false)

  return (
    <>
      <div>
        {joinMeeting ? (
          <Zoom />
        ) : (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => setJoinMeeting(true)}
            >
              Join Meeting
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default App
