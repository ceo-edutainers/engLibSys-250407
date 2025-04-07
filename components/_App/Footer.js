import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <Link href="/">
                <a className="logo">
                  <img
                    src="/images/logo-white.png"
                    alt="logo"
                    style={{ width: 150 }}
                  />
                </a>
              </Link>
              <a style={{ color: 'white' }}>英感育ち @イングリブ</a>
              <p>
                バイリンガルになる学習はハードルが高い・値段がが高い・うちの子は無理・と思い込んでる
                日本の親の考えをひっくり返したイングリブの英感カリキュラム。イングリブは長年にわたって言語習得理論に基づいた
                インプットとアウトプットカリキュラムを実行して、インターに通わなくてもバイリンガルになれることを
                証明してきました。5,000冊洋書の英語図書館から生まれたオンライン英感育ちプログラム
                @ イングリブ・engLib
              </p>

              <ul className="social-link">
                <li>
                  <a href="#" className="d-block" target="_blank">
                    <i className="bx bxl-instagram"></i>
                  </a>
                </li>

                <li>
                  <a href="#" className="d-block" target="_blank">
                    <i className="bx bxl-youtube"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="d-block" target="_blank">
                    <i className="bx bxl-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="d-block" target="_blank">
                    <i className="bx bxl-blogger"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="single-footer-widget pl-5">
              <h3>Explore</h3>
              <ul className="footer-links-list">
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/#event">
                    <a>イベント＆セミナー</a>
                  </Link>
                </li>
                <li>
                  <Link href="/#price">
                    <a>プログラム価格・詳細</a>
                  </Link>
                </li>
                <li>
                  <Link href="/#trial">
                    <a>無料体験</a>
                  </Link>
                </li>
                <li>
                  <Link href="/#interview">
                    <a>成功体験インタビュー</a>
                  </Link>
                </li>
                <li>
                  <Link href="/#event">
                    <a>入会説明会</a>
                  </Link>
                </li>

                {/* <li>
                  <Link href="/contact">
                    <a>親コース</a>
                  </Link>
                </li> */}
                {/* <li>
                  <Link href="/contact">
                    <a>大人コース</a>
                  </Link>
                </li> */}
                {/* <li>
                  <Link href="/contact">
                    <a>ビジネスコース</a>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <h3>About</h3>
              <ul className="footer-links-list">
                {/* <li>
                  <Link href="">
                    <a>採用案内</a>
                  </Link>
                </li> */}
                {/* <li>
                  <Link href="#">
                    <a>英語図書館</a>
                  </Link>
                </li> */}
                {/* <li>
                  <Link href="#">
                    <a>奨学金</a>
                  </Link>
                </li> */}

                <li>
                  <Link href="/company">
                    <a>会社概要</a>
                  </Link>
                </li>
                {/* <li>
                  <Link href="/member/">
                    <a className="btn btn-secondary">
                      <i className="flaticon-user"></i>Member
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/tutor/">
                    <a className="btn btn-info">
                      <i className="flaticon-user"></i>Tutor
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin2/">
                    <a className="btn btn-secondary">
                      <i className="flaticon-user"></i>Admin
                    </a>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <h3>Address</h3>
              <p>
                {' '}
                株式会社 EDUTAINERS
                <br />
              </p>
              <ul className="footer-contact-info">
                <li>
                  <i className="bx bx-map"></i>
                  〒150-0002 <br />
                  東京都渋谷区渋谷2-19-15
                  <br />
                  宮益坂ビルディング609
                </li>
                <li>
                  <i className="bx bx-phone-call"></i>
                  <a href="tel:+44587154756">+81 (50) 3690 1440</a>
                </li>
                <li>
                  <i className="bx bx-envelope"></i>
                  <a href="mailto:englib@edutainers.jp">
                    online-help@edutainers.jp
                  </a>
                </li>
                {/* <li>
                  <i className="bx bxs-inbox"></i>
                  <a href="tel:+557854578964">+55 785 4578964</a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom-area">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <p>
                <i className="bx bx-copyright"></i>
                {currentYear} engLib is Proudly Powered by{' '}
                <a target="_blank" href="./">
                  EDUTAINERS
                </a>
              </p>
            </div>

            <div className="col-lg-6 col-md-6">
              <ul>
                <li>
                  <Link href="/privacy-policy">
                    <a>プライバシーポリシー　Privacy Policy</a>
                  </Link>
                </li>
                {/* <li>
                  <Link href="/terms-of-service">
                    <a>Terms & Conditions</a>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </footer>
  )
}

export default Footer
