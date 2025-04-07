import React from 'react'
import Link from 'next/link'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const BookTitleImg = () => {
  return (
    <div>
      <div className="courses-area pt-1 bg-white">
        <div className="container">
          <div className="section-title" style={{ marginBottom: 0 }}>
            <span className="sub-title">engLib's Input Program</span>

            {/* <MediaQuery query="(min-width: 767px)"> */}
            <h2 style={{ fontSize: '30px' }}>
              1:1インプット・プログラムの教材
            </h2>
            {/* </MediaQuery> */}

            {/* <MediaQuery query="(max-width: 767px)">
              <h2 style={{ fontSize: '22px' }}>
                1:1インプット・プログラムの教材
              </h2>
            </MediaQuery> */}
            <p>
              英語が初めての生徒さんから帰国子女まで、自分のレベルの中から好きな本を選んで、正しい音源を聴きながら音読をしていくことで英語力をつけていきます。
            </p>
          </div>
          <center>
            {/* <MediaQuery query="(min-width: 767px)"> */}{' '}
            <Link href="/englibPrice#input">
              <a
                className="default-btn mt-3 mb-3"
                style={{ backgroundColor: '#96be25' }}
              >
                <i className="flaticon-user"></i>
                イングリブプログラム・教材の詳細をみる
              </a>
            </Link>
            {/* </MediaQuery> */}
            {/* <MediaQuery query="(max-width: 767px)">
              <Link href="/englibPrice#input">
                <a
                  className="default-btn mt-3 mb-0"
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
      <div className="slogan-area mtb-100 bg-fffaf3 ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-12">
              <div className="slogan-image">
                <img src="/images/book-title-img1.jpg" alt="image" />
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="slogan-image">
                <img src="/images/book-title-img2.jpg" alt="image" />
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="slogan-image">
                <img src="/images/book-title-img3.jpg" alt="image" />
              </div>
            </div>
          </div>
        </div>

        <div className="divider2"></div>
        <div className="divider3"></div>
      </div>
    </div>
  )
}

export default BookTitleImg
