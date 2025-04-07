import React, { useContext, useEffect } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const StepTitle = ({ pageTitle, pageTitleSub }) => {
  return (
    <>
      <div className="col-lg-12 col-md-12 mt-4 mb-0">
        {/* <MediaQuery query="(min-width: 767px)"> */}
        <center>
          <p
            style={{
              // width: '100%',
              width: '100%',
              fontSize: '16px',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: 'white',
              marginBottom: 0,
              color: 'black',
            }}
          >
            <h3
              style={{
                fontWeight: '600',
                color: 'black',
                paddingRight: '10px',
                paddingLeft: '10px',
                paddingTop: '10px',
              }}
              dangerouslySetInnerHTML={{ __html: pageTitle }}
            ></h3>
            <h6
              style={{ fontWeight: '600' }}
              dangerouslySetInnerHTML={{ __html: pageTitleSub }}
            ></h6>
          </p>
        </center>
        {/* </MediaQuery> */}
        {/* <MediaQuery query="(max-width: 767px)">
          <center>
            <p
              style={{
                // width: '100%',
                width: '50%',
                fontSize: '16px',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: 'white',

                color: 'black',
              }}
            >
              <h3
                style={{
                  fontWeight: '600',
                  color: 'black',
                  paddingRight: '10px',
                  paddingLeft: '10px',
                  paddingTop: '10px',
                }}
                dangerouslySetInnerHTML={{ __html: pageTitle }}
              ></h3>
              <h6
                style={{ fontWeight: '600' }}
                dangerouslySetInnerHTML={{ __html: pageTitleSub }}
              ></h6>
            </p>
          </center>
        </MediaQuery> */}
      </div>
    </>
  )
}

export default StepTitle
