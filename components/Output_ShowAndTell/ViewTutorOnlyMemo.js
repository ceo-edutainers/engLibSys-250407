import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const ViewPastVerb = ({}) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const inputRef = useRef()
  // const [grammarView, setGrammarView] = useState(false) //IdeaView
  const [memoInfo, setMemoInfo] = useState([])
  // const [viewVerb, setViewVerb] = useState(false)
  // const [searchTermName, setSearchTermName] = useState('')
  // const [clearBtn, setClearBtn] = useState('')

  useEffect(() => {
    verbList()
  }, [])

  function verbList() {
    const fetchData2 = async () => {
      try {
        var mbn = localStorage.getItem('mbn')
        var Url = DB_CONN_URL + '/get-tutor-only-memo/' + mbn
        // alert(Url)

        const response = await axios.get(Url)

        // alert(response.data.status)
        // alert(response.data.status)
        if (response.data.length > 0) {
          // alert(response.data)
          setMemoInfo(response.data.response)

          // console.log('###2', response.data.response)
        } else {
          setMemoInfo()
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <center>
        <br />
        <h5>
          Tutor's Memo{' '}
          <span
            className="btn btn-danger ml-3"
            onClick={() => {
              verbList()
            }}
          >
            Refresh
          </span>
        </h5>
        {/* <span
          style={{
            // width: '100%',
            width: '100%',
            fontSize: '18px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#F9EBEA',
            marginTop: '20px',
            marginBottom: '15px',
            color: 'black',
            fontWeight: '600',
            border: '1px solid #FCD2CF',
          }}
        >
          <input
            className="form-control-md mb-2"
            style={{ width: '50%' }}
            ref={inputRef}
            type="text"
            placeholder="Search Word..."
            onClick={() => {
              setGrammarView(!grammarView)
            }}
            onChange={(e) => {
              setClearBtn('')
              setSearchTermName(e.target.value)
            }}
          />{' '}
        </span> */}
        <div className="col-lg-2 col-md-12 mt-2"></div>
        <div
          className="col-lg-8 col-md-12 mt-2"
          style={{
            textAlign: 'center',
            overflow: 'scroll',
            backgroundColor: 'white',
            fontSize: '14px',
          }}
        >
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th
                  scope="col"
                  style={{ width: '10%', backgroundColor: '#DEDEDE' }}
                >
                  Sent Date
                </th>
                <th
                  scope="col"
                  style={{ width: '10%', backgroundColor: '#DEDEDE' }}
                >
                  Tutor
                </th>
                <th
                  scope="col"
                  style={{ width: '10%', backgroundColor: '#DEDEDE' }}
                >
                  Student
                </th>
                <th
                  scope="col"
                  style={{ width: '30%', backgroundColor: '#DEDEDE' }}
                >
                  Message for Tutor
                </th>
                <th
                  scope="col"
                  style={{ width: '30%', backgroundColor: '#DEDEDE' }}
                >
                  Memo for Mom
                </th>
                <th
                  scope="col"
                  style={{ width: '10%', backgroundColor: '#DEDEDE' }}
                >
                  Checked
                </th>
              </tr>
            </thead>
            <tbody>
              {memoInfo?.map((val, key) => {
                // var qnum = key + 1
                return (
                  <>
                    <tr>
                      <td style={{ width: '10%' }}>
                        {val.lessonMemoForMom_senddatetime == '' ||
                        val.lessonMemoForMom_senddatetime == null
                          ? val.yoyakuDate
                          : val.lessonMemoForMom_senddatetime}
                      </td>
                      <td style={{ width: '10%' }}>{val.teacher_name}</td>
                      <td style={{ width: '10%' }}>
                        <b style={{ color: 'red' }}>{val.subject}</b>
                        <br />
                        {val.name_eng}
                      </td>
                      <td style={{ width: '30%' }}>
                        {val.lessonMemoOnlyTeacher}
                      </td>
                      <td style={{ width: '30%' }}>{val.lessonMemoForMom}</td>
                      <td style={{ width: '10%' }}>
                        {' '}
                        {val.chkMemo == 'ok' ? (
                          <>
                            {' '}
                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                              Checked{' '}
                            </span>
                            <br />
                            <span
                              style={{ color: 'black', fontWeight: 'bold' }}
                            >
                              {val.lessonMemoForMom_checkdatetime}
                            </span>
                          </>
                        ) : (
                          <span style={{ color: 'blue', fontWeight: 'bold' }}>
                            Not checked yet
                          </span>
                        )}
                      </td>
                    </tr>
                  </>
                )
              })}
              <tr>
                <td colspan="5">
                  {!memoInfo && <p>データーがありません。</p>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-lg-2 col-md-12 mt-2 mb-5"></div>
        {/* </div> */}
        {/* </div> */}
      </center>
    </>
  )
}

export default ViewPastVerb
