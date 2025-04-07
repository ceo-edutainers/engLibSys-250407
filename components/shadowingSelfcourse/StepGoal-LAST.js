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
        {/* <h6 style={{ color: 'white', paddingBottom: 0, marginBottom: 0 }}>
          次のステップまで
        </h6> */}
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

          {(pageView == 'Step1' ||
            pageView == 'StepSH1' ||
            pageView == 'Step1B' ||
            pageView == 'Step1Z') && (
            // <span
            //   dangerouslySetInnerHTML={{
            //     __html: '<ruby>初回<rt>しょかい</rt></ruby>',
            //   }}
            // ></span>
            <span>
              <ruby>
                初回<rt>しょかい</rt>
              </ruby>
            </span>
          )}
          <span
            style={{ color: 'yellow', fontWeight: '900', fontSize: '40px' }}
          >
            {leastRecordCount}
          </span>
          {pageView == 'Step1' ||
          pageView == 'StepSH1' ||
          pageView == 'Step1B' ||
          pageView == 'Step1Z' ? (
            // <span
            //   dangerouslySetInnerHTML={{
            //     __html: '<ruby>回録音<rt>かいろくおん</rt></ruby>',
            //   }}
            // ></span>
            <span>
              <ruby>
                回録音<rt>かいろくおん</rt>
              </ruby>
            </span>
          ) : (
            // <span
            //   dangerouslySetInnerHTML={{
            //     __html: '<ruby>回以上録音<rt>かいいじょうろくおん</rt></ruby>',
            //   }}
            // ></span>
            <span>
              <ruby>
                回以上録音<rt>かいいじょうろくおん</rt>
              </ruby>
            </span>
          )}
        </h4>
      </div>
    </>
  )
}

export default StepGoal
