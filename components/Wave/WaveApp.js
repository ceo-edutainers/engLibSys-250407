import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Wave from 'react-wavify'
import styled from '@emotion/styled'

const WaveContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: -5px;
  height: ${(props) => props.level + 'vh'};
  height: 25vh;
  display: flex;
  z-index: -1;
  transform: rotate(180deg);
`

function WaveApp() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h4 style={{ color: 'white', fontWeight: '900' }}>Recording...</h4>
      <WaveContainer level={90}>
        <Wave
          fill="#00b6ad"
          paused={false}
          opacity="0.30"
          options={{
            height: 20,
            amplitude: 10,
            speed: 0.2,
            points: 3,
          }}
        />
      </WaveContainer>
      <WaveContainer level={90}>
        <Wave
          fill="#00959e"
          opacity="0.80"
          paused={false}
          options={{
            height: 75,
            amplitude: 20,
            speed: 0.3,
            points: 2,
          }}
        />
      </WaveContainer>
      <WaveContainer level={90}>
        <Wave
          fill="#01838a"
          paused={false}
          opacity="0.5"
          options={{
            height: 45,
            amplitude: 30,
            speed: 0.1,
            points: 4,
          }}
        />
      </WaveContainer>
    </div>
  )
}
export default WaveApp
