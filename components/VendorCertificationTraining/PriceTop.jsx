import React from 'react'
import Link from 'next/link'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const PrictTop = () => {
  return (
    <div className="features-area pt-70 pb-30">
      <div className="container">
        <div
          className="section-title"
          style={{ paddingBottom: 0, marginBottom: 10 }}
        >
          <span className="sub-title">
            母子家庭支援・兄弟割引・その他奨学金有
          </span>
          <h2>料金について​</h2>
        </div>
        <div className="courses-info">
          {/* <MediaQuery query="(min-width: 767px)"> */}
          <Link href="/englibPrice">
            <a className="default-btn" style={{ backgroundColor: '#4a9dfe' }}>
              オンラインレッスン料金の詳細はこちらから
            </a>
          </Link>
          {/* </MediaQuery> */}
        </div>

        <div className="row">
          <div className="col-lg-3 col-sm-6 col-md-6">
            <div className="single-features-box">
              <div className="icon">
                <i className="flaticon-brain-process"></i>
              </div>

              <h5>
                <b>入会金</b>
              </h5>
              <Link href="/">
                <a className="link-btn">
                  今なら体験無料
                  <br />
                  英語塾乗り換え入会金¥0
                </a>
              </Link>
              <h1 style={{ color: 'skyblue', fontWeight: 900 }}>
                ¥10,000<p>(税込 ¥11,000)</p>
              </h1>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6">
            <div className="single-features-box">
              <div className="icon">
                <i className="flaticon-computer"></i>
              </div>

              <h5>
                <b>インプット</b>
              </h5>
              {/* <h7>Intensive&Extensive Reading </h7> */}
              <Link href="/">
                <a className="link-btn">
                  1対1/30分/年45回
                  <br />
                  バイリンガル講師
                </a>
              </Link>
              <h1 style={{ color: 'skyblue', fontWeight: 900 }}>
                ¥11,200<p>(税込/月々&nbsp;¥12,320)</p>
              </h1>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6">
            <div className="single-features-box">
              <div className="icon">
                <i className="flaticon-shield-1"></i>
              </div>
              <h5>
                <b>アウトプット</b>
              </h5>
              {/* <h7>Show & Tell/ Discussion</h7> */}

              <Link href="/">
                <a className="link-btn">
                  1対1/30・60分/月2回から
                  <br />
                  ネイティブ講師
                </a>
              </Link>
              <h1 style={{ color: 'skyblue', fontWeight: 900 }}>
                ¥7,800〜<p>(税込/月々&nbsp;¥8,580~)</p>
              </h1>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6 pb-0">
            <div className="single-features-box pb-4">
              <div className="icon">
                <i className="flaticon-world"></i>
              </div>
              <h5>
                <b>課題システム利用料</b>
              </h5>

              <Link href="/">
                <a className="link-btn">
                  英語習慣作りをサポート
                  {/* <br />
                  全コース/複数受講は二つ目¥0 */}
                </a>
              </Link>
              <h1
                style={{
                  color: 'skyblue',
                  fontWeight: 900,
                }}
              >
                <span style={{ textDecoration: 'line-through 2px double red' }}>
                  ¥4,000
                </span>
                <span style={{ textDecoration: 'line-through 2px solid red' }}>
                  <p>(税込/月々 ¥4,400)</p>
                </span>
              </h1>
              {/* <h5
                style={{
                  color: 'red',
                  // borderBottom: '1px double red',
                  borderWidth: '3px',
                }}
              > */}
              <span
                className="mt-0 mb-0 pt-2 pb-2 pl-3 pr-3"
                style={{
                  width: 'auto',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  backgroundColor: '#F44D5A',
                }}
              >
                今ならずっと&nbsp;<b>¥1,500</b>
              </span>
            </div>
            <div>
              <center>
                {/* <MediaQuery query="(max-width: 767px)">
                  <Link href="/englibPrice">
                    <a
                      className="default-btn"
                      style={{ backgroundColor: '#4a9dfe', fontSize: '25px' }}
                    >
                      料金の詳細はこちらから
                    </a>
                  </Link>
                </MediaQuery> */}
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrictTop
