import React from 'react'
import Link from 'next/link'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const OutputTitleImg = () => {
  return (
    <div>
      <div className="courses-area pt-100  bg-white">
        <div className="container">
          <div className="section-title" style={{ marginBottom: 0 }}>
            <span className="sub-title">engLib's Output Program</span>
            {/* <MediaQuery query="(min-width: 767px)"> */}
            <h2 style={{ fontSize: '30px' }}>
              1:1アウトプットプログラムの特徴
            </h2>
            {/* </MediaQuery> */}

            {/* <MediaQuery query="(max-width: 767px)">
              <h2 style={{ fontSize: '22px' }}>
                1:1アウトプットプログラムの特徴
              </h2>
            </MediaQuery> */}

            <p>
              インプットプログラムでの実力をベースにネイティブ並みのアウトプットを目指すプログラム。帰国子女枠の受験生や海外留学を目指す生徒さんも多く受講しています。
            </p>
          </div>
          <center>
            {/* <MediaQuery query="(min-width: 767px)"> */}
            <Link href="/englibPrice#output">
              <a
                className="default-btn mt-3"
                style={{ backgroundColor: '#96be25' }}
              >
                <i className="flaticon-user"></i>
                イングリブプログラム・教材の詳細をみる
              </a>
            </Link>
            {/* </MediaQuery> */}
            {/* <MediaQuery query="(max-width: 767px)">
              <Link href="/englibPrice#output">
                <a
                  className="default-btn mt-3"
                  style={{ backgroundColor: '#96be25', fontSize: '25px' }}
                >
                  イングリブプログラム
                  <br />
                  教材の詳細をみる
                </a>
              </Link>
            </MediaQuery> */}
          </center>
        </div>
      </div>
      <div className="slogan-area mb-100 bg-fffaf3 pb-100 ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="slogan-image-output">
                <img src="/images/output-title-img1.jpg" alt="image" />
              </div>
            </div>
            {/* <div className="col-lg-4 col-md-12">
              <div className="slogan-image">
                <img src="/images/book-title-img2.jpg" alt="image" />
              </div>
            </div> */}
            <div className="col-lg-6 col-md-12">
              <div className="slogan-image-output">
                <img src="/images/output-title-img2.jpg" alt="image" />
              </div>
            </div>
          </div>
        </div>

        <div className="divider2"></div>
        <div className="divider3"></div>
        {/* <div className="shape2">
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
        </div> */}
      </div>
    </div>
  )
}

export default OutputTitleImg
