import React, { useContext, useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import { DriveEtaOutlined } from '@material-ui/icons'
// import S3 from 'react-aws-s3'
const ViewGrammraTerms = ({ currentStep, stepStatus }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [grammraTermView, setGrammarTermView] = useState([])

  const [isFileAru, setIsFileAru] = useState(false)
  const [grammarView, setGrammarView] = useState(false) //IdeaView
  const inputRef = useRef()
  const [searchTermName, setSearchTermName] = useState('')
  const [clearBtn, setClearBtn] = useState('')
  const handleClear = () => {
    setSearchTermName('')
    setClearBtn('clear')
    inputRef.current.value = ''
  }
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')

    // alert(HWID)
    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-grammar-term'
        var Url = url

        const response = await axios.get(Url)

        if (!response.data.length) {
          setIsFileAru(false)
        } else {
          // alert(response.data.response)
          setIsFileAru(true)
          setGrammarTermView(response.data.response)

          // console.log('fileBookQuestion:', fileBookQuestion)
        }
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }

    fetchData2()
  }, [])
  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <center>
        <span
          style={{
            // width: '100%',
            width: '100%',
            fontSize: '15px',
            padding: '5px',
            // borderRadius: '10px',
            // marginBottom: '15px',
            color: 'black',
            fontWeight: '600',
            // border: '1px solid #FCD2CF',
          }}
        >
          <input
            className="form-control-md mb-2"
            style={{ width: '50%' }}
            ref={inputRef}
            type="text"
            placeholder="文法用語..."
            onClick={() => {
              setGrammarView(!grammarView)
            }}
            onChange={(e) => {
              setClearBtn('')
              setSearchTermName(e.target.value)
            }}
          />

          {/* <button
            className="btn-sm btn-primary "
            onClick={() => {
              setGrammarView(true)
              // handleClear()
            }}
            style={{ width: '100px' }}
          >
            open
          </button>{' '} */}
          <button
            className="btn-sm btn-primary "
            onClick={() => {
              setGrammarView(false)
              // handleClear()
            }}
            style={{ width: '30px' }}
          >
            x
          </button>
        </span>
        <p style={{ fontSize: '12px', fontWeight: '400' }}>
          noun,adjectiveなど検索
        </p>
        <div
          className="col-lg-12 col-md-12"
          style={{ display: grammarView ? 'block' : 'none' }}
        >
          {grammarView &&
            // grammraTermView.map((val, key) => {
            grammraTermView
              .filter((val) => {
                //For Two Item search
                if (searchTermName == '') {
                  return val //everything data
                } else if (
                  val.title_eng
                    .toLowerCase()
                    .includes(searchTermName.toLowerCase())
                ) {
                  return val
                }
              })
              .map((val, key) => {
                return (
                  <>
                    <p style={{ padding: 0, margin: 0 }}>
                      <span
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        }}
                      >
                        {val.title_eng}&nbsp;&nbsp;
                      </span>
                      <span
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        }}
                      >
                        {val.title_jp}
                      </span>
                    </p>
                    {/* {val.memo1 && (
                      <p
                        style={{
                          border: '1px solid #2C3E50',
                          borderRadius: '10px',
                          padding: '10px',
                          width: '500px',
                        }}
                      >
                        {val.memo1}
                      </p>
                    )} */}
                  </>
                )
              })}
        </div>
      </center>
    </>
  )
}

export default ViewGrammraTerms
