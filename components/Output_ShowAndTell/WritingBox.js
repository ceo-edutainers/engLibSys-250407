import React, { useContext, useEffect, useState } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
const IdeaBox = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [mindmapView, setMindmapView] = useState(false) //IdeaView
  const [writingBoxList, setWritingBoxList] = useState([])
  const [searchTermName, setSearchTermName] = useState()
  const [selectedWriting, setSelectedWriting] = useState()
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  useEffect(() => {
    var Url = DB_CONN_URL + '/get-hw-show-and-tell-writing-box'
    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setWritingBoxList(response.data)

        //setAudioDurtaionFromDB(response.data[0].audioDuration)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <span style={{ cursor: 'pointer' }}>
        <h5
          style={{
            // width: '100%',
            width: '100',
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
          onClick={() => {
            setMindmapView(!mindmapView)
          }}
        >
          <img
            src="/images/icon-mouseclick.png"
            style={{ height: '40px', width: 'auto' }}
          />
          課題トピックリストを
          {mindmapView ? '隠す' : '見る'}
          <p>
            課題トピックがまだ決まったら、左側のボタンをクリックして次のステップへ！
          </p>
        </h5>
      </span>
      <div
        className="col-lg-12 col-md-12 "
        style={{ display: mindmapView ? 'block' : 'none', textAlign: 'center' }}
      >
        {/* <span
          className="btn btn-warning mr-2"
          onClick={() => {
            setSearchTermName('level1')
          }}
          style={{ cursor: 'pointer' }}
        >
          Level-1
        </span>{' '} */}
        <span
          className="btn btn-warning mr-2"
          onClick={() => {
            setSearchTermName('level2')
          }}
          style={{ cursor: 'pointer' }}
        >
          Level-2
        </span>
        <span
          className="btn btn-warning mr-2"
          onClick={() => {
            setSearchTermName('level3')
          }}
          style={{ cursor: 'pointer' }}
        >
          Level-3
        </span>
        <span
          className="btn btn-warning mr-2"
          onClick={() => {
            setSearchTermName('level4')
          }}
          style={{ cursor: 'pointer' }}
        >
          Level-4
        </span>
        <span
          className="btn btn-warning mr-2"
          onClick={() => {
            setSearchTermName('level5')
          }}
          style={{ cursor: 'pointer' }}
        >
          Level-5
        </span>
        <span
          className="btn btn-warning"
          onClick={() => {
            setSearchTermName('level6')
          }}
          style={{ cursor: 'pointer' }}
        >
          Level-6
        </span>
      </div>{' '}
      <div
        className="col-lg-12 col-md-12 "
        style={{ display: mindmapView ? 'block' : 'none', textAlign: 'left' }}
      >
        <table className="table table mt-2">
          <thead>
            <tr>
              <th style={{ width: '5%' }}></th>
              <th style={{ width: '5%' }}>Level</th>
              <th style={{ width: '45%' }}>Title</th>
              <th style={{ width: '45%' }}>Japanese</th>
            </tr>
          </thead>
          {writingBoxList

            .filter((val) => {
              if (searchTermName == '' || searchTermName == null) {
                return val //everything data
              } else if (
                searchTermName !== '' &&
                val.level.toLowerCase().includes(searchTermName)
              ) {
                return val
              }
            })
            .map((val, key) => {
              return (
                <>
                  <tbody style={{ width: '100%' }}>
                    <tr>
                      {/* <th scope="row" style={{ width: '10px' }}>
                        {key + 1}
                      </th> */}
                      <td style={{ width: '5%' }}>
                        <input
                          type="radio"
                          name="selWriting"
                          onClick={() => {
                            setSelectedWriting(val.autoid)
                            setIsGoNextPage(true)
                          }}
                        />
                      </td>
                      <td style={{ width: '5%' }}>{val.level}</td>
                      <td style={{ width: '50%' }}>{val.title}</td>
                      <td style={{ width: '45%' }}>{val.title_japanese}</td>
                    </tr>
                    {/* {val.example_yes !== '' && (
                    <tr style={{ backgroundColor: 'skyblue' }}>
                      <td style={{ width: '5%' }}>サンプル</td>
                      <td style={{ width: '50%' }}>{val.example_yes}</td>
                      <td style={{ width: '45%' }}>
                        {val.example_no !== '' && val.example_no}
                      </td>
                    </tr>
                  )} */}
                  </tbody>
                </>
              )
            })}{' '}
        </table>
      </div>
      <SweetAlert
        title="次のステップに行きますか？"
        show={isGoNextPage}
        onConfirm={() => nextStep()}
        onCancel={() => {
          setIsGoNextPage(false)
        }}
        confirmBtnText="YES"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '500px' }}
      >
        {/* <p></p> */}
      </SweetAlert>
    </>
  )
}

export default IdeaBox
