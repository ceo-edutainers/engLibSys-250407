import React, { useEffect } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const Subpage = ({
  firstOrder,
  secondOrder,
  thirdOrder,
  fourthOrder,
  fifthOrder,
  subpageTitle,
  // whyThisStepTitle,
  // whyThisStep,
}) => {
  const restartQuiz = () => {
    setPoint(0)
    var tempid = Math.floor(Math.random() * 999999999999999)
    setPracticeTempId(tempid)
    setPageView('menu')
  }

  useEffect(() => {
    function endSoundPlay() {
      if (audioOnOff == 'on') {
        let audioEndAlert = new Audio(
          'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/complete.mp3'
        )
        audioEndAlert.play()
      }
    }
  }, [])

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      {/* <div className="container"> */}
      <div className="row align-items-center m-0 p-0">
        <div
          className="col-lg-12 col-md-6 mt-0 mb-3"
          style={{
            backgroundColor: '#ececec',
            padding: '15px',
            color: 'black',
            borderRadius: '10px',
            textAlign: 'center',
            fontSize: '15px',
            border: '1px solid #dedede',
          }}
        >
          <b dangerouslySetInnerHTML={{ __html: subpageTitle }}></b>
          <br />
          {firstOrder && (
            <div dangerouslySetInnerHTML={{ __html: firstOrder }}></div>
          )}
          {secondOrder && (
            <div dangerouslySetInnerHTML={{ __html: secondOrder }}></div>
          )}
          {thirdOrder && (
            <div dangerouslySetInnerHTML={{ __html: thirdOrder }}></div>
          )}
          {fourthOrder && (
            <div dangerouslySetInnerHTML={{ __html: fourthOrder }}></div>
          )}
          {fifthOrder && (
            <div dangerouslySetInnerHTML={{ __html: fifthOrder }}></div>
          )}
        </div>

        {/* </div> */}
        {/* </div> */}
      </div>
      {/* </MediaQuery> */}
      {/* <MediaQuery query="(max-width: 767px)">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-6 mt-0 mb-3">
              <center>
                <p
                  style={{
                    width: '50%',
                    fontSize: '16px',
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: '#ffe4e1',
                    color: 'black',
                    textAlign: 'center',
                  }}
                >
                  <b dangerouslySetInnerHTML={{ __html: subpageTitle }}></b>
                  <br />

                  {firstOrder && (
                    <div dangerouslySetInnerHTML={{ __html: firstOrder }}></div>
                  )}
                  {secondOrder && (
                    <div
                      dangerouslySetInnerHTML={{ __html: secondOrder }}
                    ></div>
                  )}
                  {thirdOrder && (
                    <div dangerouslySetInnerHTML={{ __html: thirdOrder }}></div>
                  )}
                  {fourthOrder && (
                    <div
                      dangerouslySetInnerHTML={{ __html: fourthOrder }}
                    ></div>
                  )}
                  {fifthOrder && (
                    <div dangerouslySetInnerHTML={{ __html: fifthOrder }}></div>
                  )}
                 
                </p>
              </center>
            </div>
          </div>
        </div>
      </MediaQuery> */}
    </>
  )
}

export default Subpage
