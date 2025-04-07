import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const ViewPastVerb = ({}) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const inputRef = useRef()
  const [grammarView, setGrammarView] = useState(false) //IdeaView
  const [verbInfo, setVerbInfo] = useState([])
  const [viewVerb, setViewVerb] = useState(false)
  const [searchTermName, setSearchTermName] = useState('')
  const [clearBtn, setClearBtn] = useState('')

  useEffect(() => {
    verbList()
  }, [])

  function verbList() {
    const fetchData2 = async () => {
      try {
        var Url = DB_CONN_URL + '/get-past-irregular-verb-info/'
        // alert('1')
        const response = await axios.get(Url)
        // alert(response.data.length)
        setVerbInfo(response.data)
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
        <h5>不規則動詞&nbsp;(irregular verbs)</h5>
        <span
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
        </span>
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
                  style={{ width: '5%', backgroundColor: '#DEDEDE' }}
                >
                  #
                </th>
                <th
                  scope="col"
                  style={{ width: '10%', backgroundColor: '#DEDEDE' }}
                >
                  意味
                </th>
                <th
                  scope="col"
                  style={{ width: '10%', backgroundColor: '#DEDEDE' }}
                >
                  原形
                </th>
                <th
                  scope="col"
                  style={{ width: '10%', backgroundColor: '#DEDEDE' }}
                >
                  過去
                </th>
                <th
                  scope="col"
                  style={{ width: '10%', backgroundColor: '#DEDEDE' }}
                >
                  過去分詞
                </th>
                <th
                  scope="col"
                  style={{ width: '45%', backgroundColor: '#DEDEDE' }}
                >
                  変化のルール
                </th>
              </tr>
            </thead>
            <tbody>
              {verbInfo
                .filter((val) => {
                  //For Two Item search
                  if (searchTermName == '') {
                    return val //everything data
                  } else if (
                    val.simple
                      .toLowerCase()
                      .includes(searchTermName.toLowerCase())
                  ) {
                    return val
                  }
                })
                .map((val, key) => {
                  var qnum = key + 1
                  return (
                    <>
                      <tr>
                        <th scope="row">{qnum}</th>
                        <td>{val.meaning}</td>
                        <td>
                          <strong style={{ fontSize: '24px' }}>
                            {val.simple}
                          </strong>
                        </td>
                        <td>
                          <strong style={{ fontSize: '24px' }}>
                            {val.past}
                          </strong>
                        </td>
                        <td>
                          <strong style={{ fontSize: '24px' }}>
                            {val.past_participle}
                          </strong>
                        </td>
                        <td>{val.sort}</td>
                      </tr>
                    </>
                  )
                })}
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
