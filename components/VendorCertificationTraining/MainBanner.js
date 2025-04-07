import React from 'react'
import Link from 'next/link'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const MainBanner = () => {
  return (
    <div className="banner-section mt-0 pt-2 mb- pb-4 ">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-12 ">
            <div className="banner-content">
              {/* <MediaQuery query="(min-width: 767px)"> */}
              <img
                src="/images/logo-white.png"
                alt="logo"
                style={{
                  width: 100,
                }}
              />
              <h2
                style={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 35,
                  marginTop: 0,
                  paddingTop: 0,
                  // lineHeight: 1.5,
                }}
              >
                <span style={{ fontWeight: 500, fontSize: 18 }}>
                  5,000冊音声付洋書保有の
                </span>
                <br />
                英語図書館の多読多聴
                <br />
                カリキュラムから生まれた
                <br />
                <font color="yellow">メタ認知</font>式&nbsp;
                <font color="yellow">英</font>語<font color="yellow">感</font>
                覚習得
                <br />
                1対1オンラインプログラム
              </h2>
              <p>
                はじめての英語から帰国子女まで
                {/* <br />
                ABCからTOEFL満点まで */}
                <br /> 年長から大学生まで <br />
              </p>

              <Link href="/#event">
                <a
                  className="default-btn pl-4"
                  style={{ backgroundColor: '#96be25', fontSize: '25px' }}
                >
                  入会説明会
                </a>
              </Link>

              <Link href="/#trial">
                <a
                  className="default-btn  pl-4 ml-4"
                  style={{ backgroundColor: '#4a9dfe', fontSize: '25px' }}
                >
                  無料体験へ
                </a>
              </Link>
              {/* </MediaQuery> */}

              {/* <MediaQuery query="(max-width: 767px)">
                <img
                  src="/images/logo-white.png"
                  alt="logo"
                  style={{
                    width: 100,
                    marginTop: '25px',
                  }}
                />
                <h2
                  style={{
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 25,
                    marginTop: 0,
                    paddingTop: 0,
                    // lineHeight: 1.5,
                  }}
                >
                  <span style={{ fontWeight: 500, fontSize: 18 }}>
                    5,000冊音声付洋書保有の
                  </span>
                  <br />
                  英語図書館の多読多聴
                  <br />
                  カリキュラムから生まれた
                  <br />
                  <font color="yellow">メタ認知</font>式&nbsp;
                  <font color="yellow">英</font>語<font color="yellow">感</font>
                  覚習得
                  <br />
                  1対1オンラインプログラム
                </h2>
                <p>
                  はじめての英語から帰国子女まで
                 
                  <br /> 年長から大学生まで <br />
                </p>

                <Link href="/#event">
                  <a
                    className="default-btn pl-4"
                    style={{ backgroundColor: '#96be25', fontSize: '20px' }}
                  >
                    入会説明会
                  </a>
                </Link>

                <Link href="/#trial">
                  <a
                    className="default-btn  pl-4 ml-4"
                    style={{ backgroundColor: '#4a9dfe', fontSize: '20px' }}
                  >
                    無料体験へ
                  </a>
                </Link>
              </MediaQuery> */}
            </div>
          </div>

          <div className="col-lg-7 col-md-12">
            <div className="banner-image">
              <img src="/images/banner-img1.png" alt="image" />

              <div className="banner-shape4">
                <img src="/images/banner-shape4.png" alt="image" />
              </div>
              <div className="banner-shape5">
                <img src="/images/banner-shape5.png" alt="image" />
              </div>
              <div className="banner-shape6">
                <img src="/images/banner-shape6.png" alt="image" />
              </div>
              <div className="banner-shape7">
                <img src="/images/banner-shape7.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <img src="/images/main-book-lists.png" /> */}
      {/* <img src="/images/book-blackcat-twoside.png" /> */}
    </div>
  )
}

export default MainBanner
