//quizapp_big_design.css
import react, { useState, useContext, useEffect, useMemo } from 'react'
import axios from 'axios'

const YourSelect = ({ stitle, syouttitle, slevel }) => {
  return (
    <>
      <div
        className="col-lg-12 col-md-12 mt-3 mb-3 pt-2"
        style={{ display: stitle ? 'block' : 'none' }}
      >
        <h5
          style={{
            textAlign: 'center',
            width: '100%',
            fontSize: '18px',
            padding: '10px',
            marginTop: '20px',
            marginBottom: '15px',
            color: 'black',
            fontWeight: '600',
            border: '1px solid #FCD2CF',
            borderRadius: '10px',
            backgroundColor: '#ffebcd',
          }}
        >
          <span style={{ fontWeight: 'bold', color: 'red' }}>
            あなたが選んだトピック{' '}
          </span>
          <hr />[{slevel}] <br />
          {stitle}
          <p>{syouttitle}</p>
        </h5>
      </div>
    </>
  )
}

export default YourSelect
