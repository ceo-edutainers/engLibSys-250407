import React, { useState, useEffect, useRef } from 'react'
import { Rnd } from 'react-rnd'
const ImageVocaPopup = () => {
  const [rndWidth1, setRndWidth1] = useState(400)
  const [rndHeight1, setRndHeight1] = useState(500)
  const [defaultX, setDefaultX] = useState(-400)
  const [defaultY, setDefaultY] = useState(-50)
  const [rndZIndex, setRndZIndex] = useState(3) //-1 後ろ
  const [rndWord, setRndWord] = useState('')
  const [imageVocaInfo, setImageVocaInfo] = useState([])
  function rndResize(width, height, x, y, zIndex, word) {
    setRndWidth1(width)
    setRndHeight1(height)
    setDefaultX(x)
    setDefaultY(y)
    setRndZIndex(zIndex)
    setRndWord(word)
  }
  return (
    <div>
      <Rnd
        default={{
          x: defaultX,
          y: defaultY,
          width: rndWidth1,
          height: rndHeight1,
        }}
        style={{
          //display: 'flex',
          //display: 'flex',
          //alignItems: 'top',
          // position: 'absolute',
          justifyContent: 'left',
          paddingTop: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
          textAlign: 'center',
          //border: 'solid 1px #dedede',
          background: '#ececec',
          border: '1px solid darkgray',
          //overflow: 'auto',
          zIndex: rndZIndex,
        }}
        minWidth={300}
        minHeight={350}
        // bounds="window"
      >
        {/* <b>MultiQ</b> */}

        <span
          style={{ fontSize: '30px', fontWeight: '900', textAlign: 'center' }}
          className="ml-2 mr-2"
          onClick={() => {
            rndResize('400px', '800px', -200, 100, 3, rndWord)
            //alert(rndWidth1)
          }}
        >
          {rndWord}
        </span>
        <a
          className="btn btn-light mb-2"
          style={{ color: 'red' }}
          onClick={() => {
            rndResize('0px', '0px', 0, 100, -1, rndWord)
            //alert(rndWidth1)
          }}
        >
          X
        </a>

        {rndZIndex == 3 && (
          <div style={{ textAlign: 'center' }}>
            {imageVocaInfo != '' ? (
              imageVocaInfo.map((val, key) => {
                var img1 =
                  'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/' +
                  val.img_ex1
                return (
                  <>
                    <img
                      src={img1}
                      style={{ width: '300px', height: 'auto' }}
                    />
                    <p
                      style={{
                        fontSize: '18px',
                        color: 'black',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      [{val.voca_form}]
                    </p>
                    <p
                      style={{
                        fontSize: '18px',
                        color: 'red',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      {val.ex1}
                    </p>
                  </>
                )
              })
            ) : (
              <p>no info</p>
            )}

            {/* <DiscussionMultiQuestionBox
                youtubeID={youtubeID}
                homework_id={homework_id}
              /> */}
          </div>
        )}
      </Rnd>
    </div>
  )
}
export default ImageVocaPopup
