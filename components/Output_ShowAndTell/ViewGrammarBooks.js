import React, { useContext, useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import PdfViewer from '@/components/PdfViewer/PdfViewer'
import { DriveEtaOutlined } from '@material-ui/icons'
// import S3 from 'react-aws-s3'
const ViewGrammarBooks = ({ currentStep, stepStatus }) => {
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

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <div className="row">
        <div
          className="col-lg-12 col-md-12 pr-0 mr-0"
          style={{ textAlign: 'center' }}
        >
          <span
            className="btn btn-primary"
            onClick={() => {
              setGrammarView(!grammarView)
            }}
          >
            Grammar Book
          </span>
          <div
            className="col-lg-12 col-md-12"
            style={{ display: grammarView ? 'block' : 'none' }}
          >
            <object
              data="https://www.myenglib.com/onlesson/pdfviewerg.php"
              style={{
                width: '100%',
                height: '820px',
                border: '1px solid white',
                borderRadius: '20px',
                backgroundColor: 'white',
                margin: 0,
                padding: 0,
              }}
            />
          </div>
        </div>
      </div>

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
          placeholder="Grammar Term Search..."
          onClick={() => {
            setGrammarView(!grammarView)
          }}
          onChange={(e) => {
            setClearBtn('')
            setSearchTermName(e.target.value)
          }}
        />
        <button
          className="btn-sm btn-primary "
          onClick={() => {
            setGrammarView(false)
            // handleClear()
          }}
          style={{ width: '100px' }}
        >
          close
        </button>{' '}
      </span> */}

      {/* <div
        className="col-lg-12 col-md-12"
        style={{ display: grammarView ? 'block' : 'none' }}
      >
        <iframe
          file="https://www.myenglib.com/onlesson/pdfviewerg.php"
          width="700px"
        />
        {grammarView &&
          // grammraTermView.map((val, key) => {
          grammraTermView
            .filter((val) => {
              //For Two Item search
              if (searchTermName == '') {
                return val //everything data
              } else if (
                val.grammarUse
                  .toLowerCase()
                  .includes(searchTermName.toLowerCase())
              ) {
                return val
              }
            })
            .map((val, key) => {
              var file =
                'https://englib-materials.s3.ap-northeast-1.amazonaws.com/grammar/GrammarJuice/' +
                val.book +
                '_' +
                val.unit +
                '.pdf'
              var allfile =
                'https://englib-materials.s3.ap-northeast-1.amazonaws.com/grammar/GrammarJuice/ALL-LEVEL.pdf'

              return (
                <>
                  <p style={{ textAlign: 'left' }}>
                    <span
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: '18px',
                      }}
                    >
                      {val.grammarUse}&nbsp;&nbsp;
                    </span>
                    <span
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: '18px',
                      }}
                    >
                      {val.grammarTitle}
                    </span>
                    &nbsp;|&nbsp;
                    <span
                      style={{
                        color: 'blue',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}
                    >
                      {val.japanese}
                    </span>
                  </p>
                </>
              )
            })}
      </div> */}
    </>
  )
}

export default ViewGrammarBooks
