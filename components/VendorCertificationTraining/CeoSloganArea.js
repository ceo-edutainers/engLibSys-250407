import React from 'react'
import Link from 'next/link'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const CeoSloganArea = () => {
  return (
    <div className="slogan-area mtb-100 bg-fffaf3 ptb-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-12">
            <div className="slogan-image">
              <img src="/images/man2.jpg" alt="image" />
            </div>
          </div>

          <div className="col-lg-7 col-md-12">
            <div className="slogan-content">
              {/* <h3 style={{ marginBottom: 30 }}>CEOメッセージ</h3> */}
              <p style={{ fontSize: 17, fontWeight: 600 }}>
                {/* 我が子のために作った５千冊音声付き絵本の英語図書館から生まれたプログラムが日本全国そして世界国々の日本の子供達にオンラインを通じて届くようになりました！ */}
                ホームスクーリングで育てていた我が子のために始めた音源付き
                <b>5000</b>冊の子供向け洋書保有の英語図書館
                <b>『FUN TO READ CLUB』</b>
                から生まれた英語感覚育成プログラムが日本全国だけでなく世界各国に住む日本の子供たちにオンラインで届くようになりました！
              </p>
              {/* <h3
                style={{
                  fontSize: 23,
                  fontWeight: 600,
                  color: 'red',
                  paddingBottom: 20,
                }}
              >
                子供の英語に悩む日本のママたちへ！
              </h3> */}
              <h3>
                <span className="sub-title" style={{ fontSize: 18 }}>
                  ミンジェ、CEO at engLib
                </span>
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: '#636369',
                  fontWeight: 100,
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                元々システムエンジニアだった私が海外経験が全くない子供たちの英語教育で悩んでいた時、英語教育先進国のアジアの国々では、子供達が多読多聴により英語力を習得していることを知りました。迷うことなく、すぐに子供向けの英語の絵本を集め始め、長男に多読をスタートさせたのがイングリブの前身の英語図書館創立のきっかけです。現在14歳の次男は、私が独自開発してきたプログラムを続けてきた結果、発音はアメリカ人と間違われるまでになり、既にアメリカの大学生水準の英語力を持っています。また、多読を進めてきたことで、息子たちは本を読むことが好きになり、自分の興味のある分野の知識を深めたいという気持ちから更に専門性の高い本を読むようになり、また幅広い分野への興味も広がるといった学びの好循環も経験しました。息子達の英語力は、彼らの将来の夢を更に大きなものにしてくれることは間違いないと本人達も実感しています。このような私たちの体験を、身近な地域の子供達、そして日本中、世界中の子供達に広げていくことを楽しみにしています。
              </p>
              {/* <MediaQuery query="(min-width: 767px)"> */}{' '}
              <Link href="/true-story">
                <a
                  className="default-btn"
                  style={{ backgroundColor: '#96be25' }}
                >
                  <i className="flaticon-user"></i>
                  英語教育の間違いをズバリ語る
                  <span></span>
                </a>
              </Link>
              {/* </MediaQuery> */}
              {/* <MediaQuery query="(max-width: 767px)">
                {' '}
                <Link href="/true-story">
                  <a
                    className="default-btn"
                    style={{ backgroundColor: '#96be25', fontSize: '20px' }}
                  >
                    <i className="flaticon-user"></i>
                    英語教育の間違いをズバリ語る
                    <span></span>
                  </a>
                </Link>
              </MediaQuery> */}
              {/* <div className="single-footer-widget">
                <ul className="social-link">
                  <li>
                    CEO
                    <a
                      href="https://www.instagram.com/kiandmimom"
                      className="d-block"
                      target="_blank"
                    >
                      <i className="bx bxl-instagram"></i>
                    </a>
                  </li>
                  <li>
                    ENGLIB
                    <a
                      href="https://www.instagram.com/myenglib"
                      className="d-block"
                      target="_blank"
                    >
                      <i className="bx bxl-instagram"></i>
                    </a>
                  </li> */}
              {/* <li>
                    <a href="#" className="d-block" target="_blank">
                      <i className="bx bxl-youtube"></i>
                    </a>
                  </li> */}
              {/* <li>
                    <a href="#" className="d-block" target="_blank">
                      <i className="bx bxl-twitter"></i>
                    </a>
                  </li> */}
              {/* <li>
                    <a href="#" className="d-block" target="_blank">
                      <i className="bx bxl-blogger"></i>
                    </a>
                  </li> */}
              {/* </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="divider2"></div>
      <div className="divider3"></div>
      <div className="shape2">
        <img src="/images/shape2.png" alt="image" />
      </div>
      <div className="shape3">
        <img src="/images/shape3.png" alt="image" />
      </div>
      <div className="shape4">
        <img src="/images/shape4.png" alt="image" />
      </div>
      <div className="shape9">
        <img src="/images/shape8.svg" alt="image" />
      </div>
    </div>
  )
}

export default CeoSloganArea
