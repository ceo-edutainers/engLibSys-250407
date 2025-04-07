import React from 'react'
const StepGoal = ({ leastRecordCount, pageView }) => {
  return (
    <>
      <div
        className="banner-content pt-2 "
        style={{
          backgroundColor: '#cc0000',
          borderRadius: '10px',
          paddingBottom: '1px',
        }}
      >
        <h4
          style={{
            color: 'white',
            fontWeight: '600',
            paddingTop: 5,
            marginTop: 0,
            paddingBottom: 10,
            marginBottom: 0,
          }}
        >
          {/* {pageView} */}

          <span
            style={{ color: 'yellow', fontWeight: '900', fontSize: '40px' }}
          >
            {leastRecordCount}
          </span>

          <span>
            <ruby>
              回以上録音<rt>かいいじょうろくおん</rt>
            </ruby>
          </span>
        </h4>
      </div>
    </>
  )
}

export default StepGoal
