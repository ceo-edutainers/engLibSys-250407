import React from 'react'
import Link from 'next/link'

const Footer_Tutor = () => {
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
              <a style={{ color: 'white' }}>英感熟®イングリブ・engLib</a>

              <p>
                <a>
                  英語図書館でのオフラインレッスンのお問い合わせはこちらから。(Baytown
                  in Chiba-City)
                </a>
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
                  <Link href="/about-1">
                    <a>英語学習方セミナー</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>無料体験</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about-1">
                    <a>入塾説明会</a>
                  </Link>
                </li>
                <li>
                  <Link href="/courses-1">
                    <a>イベント</a>
                  </Link>
                </li>

                <li>
                  <Link href="/contact">
                    <a>親コース</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <h3>About</h3>
              <ul className="footer-links-list">
                <li>
                  <Link href="#">
                    <a>採用案内</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>英語図書館</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>奨学金</a>
                  </Link>
                </li>

                <li>
                  <Link href="#">
                    <a>会社概要</a>
                  </Link>
                </li>
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
                  261-0013 Patios 20-104, Utase 3-4, Mihama, Chiba-City, JAPAN
                </li>
                <li>
                  <i className="bx bx-phone-call"></i>
                  <a href="tel:+44587154756">+81 (50) 3690 1440</a>
                </li>
                <li>
                  <i className="bx bx-envelope"></i>
                  <a href="mailto:hello@edemy.com">englib@edutainers.jp</a>
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

export default Footer_Tutor
