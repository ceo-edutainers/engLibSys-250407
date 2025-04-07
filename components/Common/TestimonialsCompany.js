import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
// const OwlCarousel = dynamic(import('react-owl-carousel3'))

const options = {
  loop: true,
  nav: false,
  dots: true,
  autoplayHoverPause: true,
  autoplay: true,
  animateOut: 'fadeOut',
  items: 1,
  navText: [
    "<i className='bx bx-chevron-left'></i>",
    "<i className='bx bx-chevron-right'></i>",
  ],
}

const TestimonialsCompany = () => {
  const [display, setDisplay] = React.useState(false)

  React.useEffect(() => {
    setDisplay(true)
  }, [])

  return (
    <div className="testimonials-area ptb-100">
      <div className="container">
        <div className="section-title">
          <h2>COMPANY</h2>
          <span className="sub-title" style={{ fontWeight: '500' }}>
            会社概要
          </span>
          <br />
          <img
            src="/images/logo.png"
            // className="client-img"
            alt="image"
            style={{ width: '150px' }}
          />
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p> */}
        </div>

        <div className="single-testimonials-item">
          <h6 className="mt-5" style={{ fontSize: '16px' }}>
            <ul>
              <li style={{ marginBottom: '18px' }}>
                会社名：株式会社 EDUTAINERS
              </li>
              <li style={{ marginBottom: '18px' }}>設立：平成25年9月</li>
              <li style={{ marginBottom: '18px' }}>代表取締役：河東ミンジェ</li>
              <li style={{ marginBottom: '18px' }}>
                所在地： 〒150-0002 <br />
                東京都渋谷区渋谷2-19-15 宮益坂ビルディング609
              </li>
              <li style={{ marginBottom: '10px' }}>
                事業内容：子供・大人向けのオンライン英語学習サポート事業
                <br />
                エデュケーションテクノロジーシステム分野のシステム開発事業
                <br />
                子供のためのオンラインプログラミング教育事業
              </li>
            </ul>
          </h6>

          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum ultrices gravida. Risus commodo viverra maecenas accumsan
            lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed tempor incididunt ut labore et dolore.
          </p> */}

          <div className="shape-img">
            <img src="/images/shape4.png" className="shape-1" alt="image" />
            <img src="/images/shape14.png" className="shape-2" alt="image" />
            <img src="/images/shape7.png" className="shape-3" alt="image" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsCompany
