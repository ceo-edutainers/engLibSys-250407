import React, { useEffect } from 'react'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const StepImportantWords2 = ({ stepWords1, stepWords2, stepWords3 }) => {
  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <center>
        <div className="col-lg-12 col-md-12">
          <p
            style={{
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
              width: '100%',
              backgroundColor: '#cc0000',
              marginRight: '5px',
              marginTop: '5px',
              marginBottom: '5px',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              fontSize: '17px',
              fontWeight: 'bold',
            }}
            // dangerouslySetInnerHTML={{
            //   __html: stepWords1,
            // }}
          >
            {stepWords1}
            <br />
            {stepWords2}
            {/* <p>{stepWords2}</p> */}
          </p>
        </div>
      </center>
      {/* </MediaQuery> */}

      {/* <MediaQuery query="(max-width: 767px)">
        <center>
          <div className="col-lg-12 col-md-12 mb-0">
            <p
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '50%',
                backgroundColor: '#cc0000',
                // marginRight: '5px',
                marginTop: '5px',
                marginBottom: '5px',
                padding: '5px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '17px',
                fontWeight: 'bold',
              }}
            >
              {stepWords1}
            </p>
          </div>
        </center>
        <hr />
      </MediaQuery> */}
    </>
  )
}

export default StepImportantWords2
