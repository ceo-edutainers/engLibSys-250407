import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import { Rnd } from 'react-rnd'
import Link from '@/utils/ActiveLink'
import { myFun_getYoutubeID } from '@/components/FunctionComponent'
import TextareaAutosize from 'react-textarea-autosize'
const RndStudyFeedback = (homework_id) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [bookUrl, setBookUrl] = useState()
  //For Feedback
  const [feedbackPronounciation, setFeedbackPronounciation] = useState()
  const [feedbackPhonics, setFeedbackPhonics] = useState()
  const [feedbackGrammar, setFeedbackGrammar] = useState()
  const [feedbackProblemTechnical, setFeedbackProblemTechnical] = useState()
  const [feedbackProblemLessonContrate, setFeedbackProblemLessonContrate] =
    useState()
  const [feedbackProblemHW, setFeedbackProblemHW] = useState()
  const [feedbackMemoToMom, setFeedbackMemoToMom] = useState()

  const [rndSwWidth2, setRndSwWidth2] = useState(300)
  const [rndSwHeight2, setRndSwHeight2] = useState(60)
  const [defaultSwX2, setDefaultSwX2] = useState(1100)
  const [defaultSwY2, setDefaultSwY2] = useState(60)
  const [rndSwZIndex2, setRndSwZIndex2] = useState(2) //-1 後ろ

  function rndFeedbackResize(width, height, x, y, zIndex) {
    setRndSwWidth2(width)
    setRndSwHeight2(height)
    setDefaultSwX2(x)
    setDefaultSwY2(y)
    setRndSwZIndex2(zIndex)
  }

  return (
    <>
      <Rnd
        default={{
          x: defaultSwX2,
          y: defaultSwY2,
          width: rndSwWidth2,
          height: rndSwHeight2,
        }}
        size={{
          width: rndSwWidth2,
          height: rndSwHeight2,
        }}
        // position={{ x: defaultSwX2, y: defaultSwY2 }}
        style={{
          //display: 'flex',
          //display: 'flex',
          //alignItems: 'top',
          overflow: 'scroll',
          justifyContent: 'left',
          paddingTop: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',

          border: 'solid 1px #dedede',
          borderRadius: '10px',
          background: '#F7DC6F',
          border: '1px solid darkgray',
          //overflow: 'auto',
          zIndex: rndSwZIndex2,
        }}
        minWidth={300}
        minHeight={50}
        // bounds="window"
      >
        <a
          className="btn btn-light ml-2 mr-2"
          onClick={() => {
            rndFeedbackResize(500, 1000, 0, 500, 4)
            //alert(rndWidth1)
          }}
        >
          Feedback
        </a>

        <a
          className="btn btn-light"
          style={{ color: 'red' }}
          onClick={() => {
            rndFeedbackResize(300, 60, 0, 500, 3)
            //alert(rndWidth1)
          }}
        >
          X
        </a>
        {/* {rndWidth1} */}
        <br />
        {/* {rndSwZIndex2 == 3 && ( */}
        <div
        // style={{ overflow: 'scroll' }}
        >
          <hr />
          <h1 className="p-0" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Message to Mom
            <p style={{ fontSize: '12px', fontWeight: '500' }}>
              親にメッセージ
            </p>
            <TextareaAutosize
              row="3"
              style={{
                width: '90%',
                height: '50px',
                margin: 0,
                color: 'black',
                border: '1px solid #dedede',
                borderRadius: '5px',
                fontSize: '15px',
              }}
            />
          </h1>
          <hr />{' '}
          <h1 className="p-0" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            レベル・コース提案
          </h1>
          <div
            style={{
              overflow: 'scroll',
              height: '100px',
              backgroundColor: 'green',
              textAlign: 'left',
              color: 'white',
              padding: 5,
            }}
          >
            <input type="checkbox" selected />
            &nbsp;教材の変更をお勧めします。
            <br />
            <input type="checkbox" selected />
            &nbsp;本のレベルを下げます。
            <br />
            <input type="checkbox" selected />
            &nbsp;本のレベルを上げます。
            <br />
            <input type="checkbox" selected />
            &nbsp;本のレベルの変更なし
            <br />
            <input type="checkbox" selected />
            &nbsp;文法クラスを提案します
            <br />
            <input type="checkbox" selected />
            &nbsp;学校サポートクラスを提案します。
            <br />
            <input type="checkbox" selected />
            &nbsp;リーディングクラスに戻ることを提案します。
          </div>
          <hr />
          <h1 className="p-0" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Pronounciation Rules
            <p style={{ fontSize: '12px', fontWeight: '500' }}>発音ルール</p>
          </h1>
          <div
            style={{
              overflow: 'scroll',
              height: '200px',
              backgroundColor: 'green',
              color: 'white',
              padding: 5,
              textAlign: 'left',
            }}
          >
            <input type="checkbox" selected />
            {/* */}
            &nbsp; 子音＋母音のリンキング
            <br />
            pick up | picked up //check in | checked in //send out | sent out//
            stop it | stopped it //pick it up | picked it up
            {/* */}
            <br />
            <input type="checkbox" selected />
            &nbsp;アクセントのある「A」/ӕ/
            <br />
            cat, apple, ask
            <br />
            <input type="checkbox" selected />
            &nbsp;アクセントの無い母音(shuwaサウンと/ə/)
            <br />
            Adam, Atom, memorial
            <br />
            <input type="checkbox" selected />
            &nbsp;子音＋母音(put it up)
            <br />
            <input type="checkbox" selected />
            &nbsp;弱くなる「T」「D」(wanted to/twenty)
            <br />
            photo meeting waiting computer water better bitter waiter cheating
            <br />
            not at all /a lot of money/ I got to (gotta) go/ bread and butter
            /what do you do? /I don’t know /You didn’t know? /He doesn’t know.
            <br />
            <input type="checkbox" selected />
            &nbsp;「N」の次に来る「T」(wanted to/twenty)
            <br />
            center winter gentleman Santa Clause entertain plenty twenty
            internet I wanted to I want to
            <br />
            <input type="checkbox" selected />
            &nbsp;「TH」/ð/that, the, this
            <br />
            <input type="checkbox" selected />
            &nbsp;R(run) vs R(car)
            <br />
            run round rest right read rice pray
            <br />
            <input type="checkbox" selected />
            &nbsp;R(run) vs W(want)
            <br />
            <input type="checkbox" selected />
            &nbsp;S(sing) vs TH(thing)
            <br />
            sing - thing/sigh - thigh/mass - math
            <br />
            <input type="checkbox" selected />
            &nbsp;S(snake) vs SH(sheep)
            <br />
            see - she /self - shelf /save - shave /sell - shell /sort - short
            <br />
            <input type="checkbox" selected />
            &nbsp;音の出し方：Z(zebra)
            <br />
            <input type="checkbox" selected />
            &nbsp;O(stop) vs O(robot)
            <br />
            <input type="checkbox" selected />
            &nbsp;アクセントのある「O」は/お/ではない
            <br />
            no go so ago old cold bold fold sold rose
            <br />
            <input type="checkbox" selected />
            &nbsp;V(voice) & F(face)
            <br />
            <input type="checkbox" selected />
            &nbsp;dr(drink) & tr(train)
            <br />
            dream drink drive drug drawing drag
            <br />
            truck try tree trunk trust trial triple
            <br />
            <input type="checkbox" selected />
            &nbsp;機能語の「of 」の/v/は発音しない
            <br />
            I’m kind of tired./ a piece of cake./ a lot of time.
            <br />
            <input type="checkbox" selected />
            &nbsp;機能語の最初の「h」は発音しない。
            <br />I hate him./ I asked him./ I pushed him./ I wrote her./ I
            called her.
            <br />
            <input type="checkbox" selected />
            &nbsp; 子音の音が三つ一緒になった時、 真ん中の音は発音しない。
            <br />
            asked exactly correctly perfectly restless
            <br />
            <input type="checkbox" selected />
            &nbsp; 最初の単語の最後の子音が p,t,k,b,d,gの場合、発音しない
            <br />
            tap dance /stop sign /good plan /cook dinner /keep quite /backpack
            <br />
            <input type="checkbox" selected />
            &nbsp; 二つの単語が同じ子音で始まって終わる場合。
            <br />
            bus stop /hot tea/ gas station /short tower/ at twelve/ big guy/ bad
            dream
            <br />
          </div>
          <hr />
          <h1
            className="p-0"
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            Concentration Problem
            <p style={{ fontSize: '12px', fontWeight: '500' }}>集中力問題</p>
          </h1>
          <div
            style={{
              overflow: 'scroll',
              height: '150px',
              backgroundColor: 'green',
              color: 'white',
              textAlign: 'left',
              padding: 5,
            }}
          >
            <input type="checkbox" selected />
            &nbsp;周りに気が散るもの(おもちゃなど)がある
            <br />
            <input type="checkbox" selected />
            &nbsp;動き回る
            <br />
            <input type="checkbox" />
            &nbsp;周りの音がうるさくて集中が切れる
            <br />
            <input type="checkbox" />
            &nbsp;親が話しかける時が多くて、先生と１：１のレッスンにならない
            <br />
            <input type="checkbox" />
            &nbsp;パソコンで他のをことを見てる気がする
            <br />
            <input type="checkbox" />
            &nbsp;適切なヘッドセットがなく、生徒の発音がよく聞こえない
          </div>
          <hr />
          <h1 className="p-0" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            H.W Feedback
          </h1>
          <div
            style={{
              overflow: 'scroll',
              height: '100px',
              backgroundColor: 'green',
              textAlign: 'left',
              color: 'white',
              padding: 5,
            }}
          >
            <input type="checkbox" selected />
            &nbsp;キャピタル文字エラー
            <br />
            <input type="checkbox" selected />
            &nbsp;Dictationで自分で丸付をしてない
            <br />
            <input type="checkbox" selected />
            &nbsp;.をつけない時が多い
            <br />
            <input type="checkbox" selected />
            &nbsp;文字を丁寧に書かない
            <br />
            <input type="checkbox" selected />
            &nbsp;音を聞く回数が少ない
            <br />
            <input type="checkbox" selected />
            &nbsp;練習量が足りない
            <br />
            <input type="checkbox" selected />
            &nbsp;知らない単語を選んでない
            <br />
            <input type="checkbox" selected />
            &nbsp;単語の理解が足りない
            <br />
            <input type="checkbox" selected />
            &nbsp;すらすら読めるけど、意味を考えながら読まない
          </div>
          <hr />
          <h1 className="p-0" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Technical Problem
            <p style={{ fontSize: '12px', fontWeight: '500' }}>
              テクニカル問題
            </p>
          </h1>
          <div
            style={{
              overflow: 'scroll',
              height: '100px',
              backgroundColor: 'green',
              textAlign: 'left',
              color: 'white',
              padding: 5,
            }}
          >
            <input type="checkbox" />
            &nbsp;ヘッドセット用意。
            <br />
            <input type="checkbox" />
            &nbsp;レッスンの前にパソコン再起動
          </div>
        </div>
        {/* )} */}
      </Rnd>
    </>
  )
}

export default RndStudyFeedback
