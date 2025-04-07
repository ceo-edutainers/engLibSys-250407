import React, { useContext, useEffect } from 'react'
// import { QuizContext } from './Contexts'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import Floater from 'react-floater'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
const StepImportantWordstep1 = ({ stepWords1, stepWords2, stepWords3 }) => {
  return (
    <>
      <center>
        <div className="col-lg-12 col-md-12">
          <Floater
            content={
              <div style={{ textAlign: 'left', lineHeight: '1.8em' }}>
                ①テキストとヘッドセットを用意します。
                <br />
                ②録音ボタン{' '}
                <FontAwesomeIcon
                  icon={faMicrophone}
                  size="1x"
                  color="red"
                  spin
                />
                を押します。
                <br />
                ③ 音源ボタンを押して、テキストを見ながら音読する。
                <br />④ 音読が終わったらストップボタンを押す。
                <br />
                ⑤ 知らない単語があったら画面の左下のボタンから登録する。
                <br />⑥
                音読練習を数回繰り返し、すべて終わったら「Step3」に進む。
              </div>
            }
            footer=""
            offset={0}
            event="click"
            placement="left-end"
            styles={{
              floater: {
                filter: 'none',
              },
              container: {
                backgroundColor: '#36454F',
                borderRadius: 5,
                color: '#fff',
                filter: 'none',
                minHeight: 'none',
                maxWidth: 400,
                padding: 10,
                textAlign: 'center',
              },
              arrow: {
                color: '#000',
                length: 8,
                spread: 10,
              },
            }}
            title={
              <>
                <h3
                  style={{
                    margin: '0 0 5px',
                    lineHeight: 1,
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  このステップの練習の順番{' '}
                  <span aria-label="Smile with Sunglasses" role="img">
                    😎
                  </span>{' '}
                  <hr style={{ border: '0.000000001em solid white' }} />
                </h3>
              </>
            }
          >
            <img src="/images/animated-icons/arrow-down.gif" width="50px" />
            <p
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '100%',
                // backgroundColor: '#cc0000',
                marginRight: '5px',
                marginTop: '0px',
                marginBottom: '5px',
                borderRadius: '10px',
                // color: 'white',
                backgroundColor: 'white',
                border: '1px solid #cc0000',
                color: '#cc0000',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: '10px 0px 10px 10px',
              }}
              dangerouslySetInnerHTML={{ __html: stepWords1 }}
            >
              {/* <FontAwesomeIcon icon={faHandPointer} size="1x" color="white" />
              &nbsp; */}
            </p>
          </Floater>

          <Floater
            content={
              <div
                style={{
                  textAlign: 'left',
                  lineHeight: '1.8em',
                  color: 'white',
                  fontSize: '18px',
                }}
              >
                ① 大きい声を出す。 <br />
                ② 英語らしい発音を真似する。
                <br />③ 意味を考えながら。
              </div>
            }
            footer=""
            offset={0}
            event="click"
            placement="left-end"
            styles={{
              floater: {
                filter: 'none',
              },
              container: {
                backgroundColor: '#F94545',
                borderRadius: 5,
                color: 'black',
                filter: 'none',
                minHeight: 'none',
                maxWidth: 400,
                padding: 10,
                textAlign: 'right',
              },
              arrow: {
                color: '#000',
                length: 8,
                spread: 10,
              },
            }}
            title={
              <>
                <h3
                  style={{
                    margin: '0 0 5px',
                    lineHeight: 1,
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#000',
                  }}
                >
                  気をつけよう{' '}
                  <span aria-label="Smile with Sunglasses" role="img">
                    😎
                  </span>{' '}
                  <hr style={{ border: '0.000000001em solid white' }} />
                </h3>
              </>
            }
          >
            <p
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '100%',
                // backgroundColor: '#cc0000',

                marginRight: '5px',
                marginTop: '5px',
                marginBottom: '5px',

                borderRadius: '10px',
                // color: 'white',
                backgroundColor: 'white',
                border: '1px solid #cc0000',
                color: '#cc0000',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: '10px 0px 10px 10px',
              }}
              dangerouslySetInnerHTML={{ __html: stepWords2 }}
            >
              {/* <FontAwesomeIcon icon={faHandPointer} size="1x" color="white" />
              &nbsp; */}
            </p>
          </Floater>
          <Floater
            content={
              <div
                style={{
                  textAlign: 'center',
                  lineHeight: '1.5em',
                  fontSize: '17px',
                }}
              >
                正しい発音をマネしていくことで自分の間違った読み方やイントネーションなどに気づき、発音を改善しようとする意識を持つことができます。{' '}
              </div>
            }
            footer=""
            offset={0}
            event="click"
            placement="left-end"
            styles={{
              floater: {
                filter: 'none',
              },
              container: {
                backgroundColor: '#463BF7',
                borderRadius: 5,
                color: '#fff',
                filter: 'none',
                minHeight: 'none',
                maxWidth: 400,
                padding: 10,
                textAlign: 'right',
              },
              arrow: {
                color: '#000',
                length: 8,
                spread: 10,
              },
            }}
            title={
              <>
                <h3
                  style={{
                    margin: '0 0 5px',
                    lineHeight: 1,
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  気づきポイント{' '}
                  <span aria-label="Smile with Sunglasses" role="img">
                    😎
                  </span>{' '}
                  <hr style={{ border: '0.000000001em solid white' }} />
                </h3>
              </>
            }
          >
            <p
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '100%',
                // backgroundColor: '#cc0000',
                marginRight: '5px',
                marginTop: '5px',
                marginBottom: '5px',
                borderRadius: '10px',
                // color: 'white',
                backgroundColor: 'white',
                border: '1px solid #cc0000',
                color: '#cc0000',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: '10px 0px 10px 10px',
              }}
              dangerouslySetInnerHTML={{ __html: stepWords3 }}
            >
              {/* <FontAwesomeIcon icon={faHandPointer} size="1x" color="white" />
              &nbsp; */}
            </p>
          </Floater>
        </div>
      </center>
    </>
  )
}

export default StepImportantWordstep1
