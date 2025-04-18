import React, { useState, useEffect } from 'react'
import ZapierForm from 'react-zapier-form'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import GoogleDoc from '@/components/GoogleDoc/GoogleDoc'
export default function GoogleDocCreatorCourseST({
  mbn,
  // tbn,
  homework_id,
  name_eng,

  // youtubeID,
}) {
  // const [questionList, setQuestionList] = useState([])
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [googleUrl, setGoogleUrl] = useState()
  const [googleView, setGoogleView] = useState('')
  const [showandtellHWLIST, setShowandtellHWLIST] = useState([])
  const [outlineTitle, setOutlineTitle] = useState()
  const [outlineIntroduction, setOutlineIntroduction] = useState()
  const [outlineBody, setOutlineBody] = useState()
  const [outlineConclusion, setOutlineConclusion] = useState()
  const [wholeScript, setWholeScript] = useState('')

  //구글 도큐 링크 가져올 때 '로드 완료 상태'를 따로 관리한다
  const [isGoogleUrlLoaded, setIsGoogleUrlLoaded] = useState(false)

  //useEffectの複数run防止
  const bar = {}
  const bar2 = {}

  useEffect(() => {
    if (!mbn || !homework_id) return // 값이 없으면 실행하지 않음
    getGoogleUrl()
  }, [mbn, homework_id]) // dependency 추가

  function getGoogleUrl() {
    if (!mbn) return

    const url = `${DB_CONN_URL}/get-hw-show-and-tell-info-first-page/${mbn}`

    axios
      .get(url)
      .then((response) => {
        // alert(response.data.result[0].google_doc_link)
        if (
          response.data.status &&
          response.data.result?.[0]?.google_doc_link
        ) {
          setGoogleUrl(response.data.result[0].google_doc_link)
        } else {
          console.warn('No data or google_doc_link:', response.data.message)
        }
      })
      .catch((err) => {
        console.error('Network Error:', err)
      })
      .finally(() => {
        // 요청이 끝나면 무조건 로딩 완료로 표시
        setIsGoogleUrlLoaded(true)
      })
  }

  // useEffect(() => {
  //   showandtellGetScript()
  // }, [bar2])
  useEffect(() => {
    var url = DB_CONN_URL + '/get-member-showandtell-script/' + homework_id
    axios.get(url).then((response) => {
      // console.log('TTT2:' + url)
      if (response.data.length > 0) {
        setWholeScript(response.data[0].script)

        // console.log('wholeScript:', response.data[0].script)
      } else {
        setWholeScript('not yet submitted')
      }
    })
  }, [])

  return (
    <>
      <ZapierForm action="https://hooks.zapier.com/hooks/catch/11324272/bk6pjex">
        {({ error, loading, success }) => {
          if (success) {
          }

          return (
            <div style={{ textAlign: 'center' }}>
              {/* {!success && !loading && ( */}
              {/* {!success && !loading && !googleUrl && ( */}
              {isGoogleUrlLoaded && !success && !loading && !googleUrl && (
                <>
                  <div className="col-lg-12 col-md-12">
                    <input
                      type="hidden"
                      name="mbn"
                      value={mbn}
                      placeholder={mbn}
                    />
                    <input type="hidden" name="name_eng" value={name_eng} />
                    <input
                      type="hidden"
                      name="courseTitle"
                      value="SHOW AND TELL"
                    />

                    {wholeScript != '' ? (
                      <input
                        type="hidden"
                        name="wholeScript"
                        value={wholeScript}
                      />
                    ) : (
                      <input
                        type="hidden"
                        name="wholeScript"
                        value="no script"
                      />
                    )}

                    <input
                      type="hidden"
                      name="homework_id"
                      value={homework_id}
                    />
                    <button className="btn btn-danger p-3">
                      <h3>
                        {/* {wholeScript} */}
                        Click here if you can't see the google-doc for this
                        lesson....
                      </h3>
                    </button>
                  </div>
                </>
              )}

              {/* {loading && <div>Loading...</div>} */}
              {!isGoogleUrlLoaded && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '20px',
                  }}
                >
                  <h3 style={{ color: 'black', paddingTop: '50px' }}>
                    Now Loading...
                  </h3>
                </div>
              )}
              {error && (
                <div>
                  Something went wrong. Please try again later.
                  <br />
                  <button className="btn btn-danger ml-2">
                    クリックして、スクリプト作成用の
                    <br />
                    Googleドキュメントを作る
                  </button>
                </div>
              )}
              <div style={{ height: '800px' }}>
                {success && !googleUrl && (
                  <>
                    {/* <h1>Created Google Doc Succefully!</h1> */}

                    {!googleUrl && (
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          getGoogleUrl()
                        }}
                        style={{ width: '90%' }}
                      >
                        Google's making a new document.
                        <br /> It may take some time to generate the document on
                        Google side.
                        <br />
                        If you don't see the document below, click this button
                        after 5~10 seconds.
                      </button>
                    )}
                  </>
                )}
                {/* {success && googleUrl != '' && ( */}
                {/* {success && googleUrl !== '' && (
                 */}

                {googleUrl && isGoogleUrlLoaded && (
                  <>
                    <GoogleDoc embedUrl={googleUrl} />
                  </>
                )}
              </div>
            </div>
          )
        }}
      </ZapierForm>
    </>
  )
}
