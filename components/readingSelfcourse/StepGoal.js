import React, { useContext, useEffect } from 'react'
import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const StepGoal = ({ leastRecordCount, pageView }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL

  return (
    <>
      {' '}
      <MediaQuery query="(max-width: 767px)">
        <div
          style={{
            backgroundColor: '',
            borderRadius: '10px',
            paddingBottom: '1px',
            width: '100%',
            height: '80px',
            textAlign: 'center',
          }}
        >
          <h4
            style={{
              color: 'black',
              fontWeight: '600',

              paddingTop: 5,
              marginTop: 0,
              paddingBottom: 10,
              marginBottom: 0,
            }}
          >
            {(pageView == 'Step1' ||
              pageView == 'StepSH1' ||
              pageView == 'Step1B' ||
              pageView == 'Step1Z') && (
              <span
                dangerouslySetInnerHTML={{
                  __html: '<ruby>初回<rt>しょかい</rt></ruby>',
                }}
              ></span>
            )}
            <span
              style={{ color: 'black', fontWeight: '900', fontSize: '40px' }}
            >
              {leastRecordCount}
            </span>
            {pageView == 'Step1' ||
            pageView == 'StepSH1' ||
            pageView == 'Step1B' ||
            pageView == 'Step1Z' ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: '<ruby>回録音<rt>かいろくおん</rt></ruby>',
                }}
              ></span>
            ) : (
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    '<ruby>回以上録音<rt>かいいじょうろくおん</rt></ruby>',
                }}
              ></span>
            )}
          </h4>
        </div>
      </MediaQuery>
      <MediaQuery query="(min-width: 767px)">
        <div
          className="banner-content pt-3 "
          style={{
            backgroundColor: '#cc0000',
            borderRadius: '10px',
            paddingBottom: '1px',

            height: '80px',
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

            {(pageView == 'Step1' ||
              pageView == 'StepSH1' ||
              pageView == 'Step1B' ||
              pageView == 'Step1Z') && (
              <span
                dangerouslySetInnerHTML={{
                  __html: '<ruby>初回<rt>しょかい</rt></ruby>',
                }}
              ></span>
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
              <span
                dangerouslySetInnerHTML={{
                  __html: '<ruby>回録音<rt>かいろくおん</rt></ruby>',
                }}
              ></span>
            ) : (
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    '<ruby>回以上録音<rt>かいいじょうろくおん</rt></ruby>',
                }}
              ></span>
            )}
          </h4>
        </div>
      </MediaQuery>
    </>
  )
}

export default StepGoal
