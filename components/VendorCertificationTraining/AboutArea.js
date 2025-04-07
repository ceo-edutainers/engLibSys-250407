import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const ModalVideo = dynamic(import('react-modal-video'))

const AboutArea = () => {
  const [display, setDisplay] = React.useState(false)

  React.useEffect(() => {
    setDisplay(true)
  }, [])

  // Popup Video
  const [isOpen, setIsOpen] = React.useState(true)
  const openModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <React.Fragment>
      <div className="about-area-two bg-fffaf3 pt-70 pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12">
              <div className="about-content-box">
                <span className="sub-title">Learning Innovation at engLib</span>
                {/* <MediaQuery query="(min-width: 767px)"> */}{' '}
                <h2 style={{ fontSize: 25 }}>
                  知ることと知らないことの気づきから行動をする子供を育つイングリブのメタ認知式英語学習方法の特徴
                </h2>
                {/* </MediaQuery> */}
                {/* <MediaQuery query="(max-width: 767px)">
                  <h2 style={{ fontSize: 20 }}>
                    知ることと知らないことの気づきから行動をする子供を育つイングリブのメタ認知式英語学習方法の特徴
                  </h2>
                </MediaQuery> */}
                <p>
                  Want to learn and earn PDUs or CEUs on your schedule —
                  anytime, anywhere? Or, pick up a new skill quickly like,
                  project team leadership or agile? Browse our most popular
                  online courses.
                </p>
                <p>
                  <strong>
                    あなたのお子さんの未来が変わるかもしれない！
                    <br />
                    この1分間のビデオ、是非ご覧になってください！
                  </strong>
                </p>
                <Link href="/contact">
                  <a className="link-btn">
                    Explore engLib's English Learning プログラムをもっと見る！
                  </a>
                </Link>
              </div>
            </div>

            <div className="col-lg-7 col-md-12">
              <div className="about-video-box">
                <div className="image">
                  <img src="/images/about-img5.jpg" alt="image" />
                </div>

                <Link href="#play-video">
                  <a
                    onClick={(e) => {
                      e.preventDefault()
                      openModal()
                    }}
                    className="video-btn popup-youtube"
                  >
                    <i className="flaticon-play"></i>
                  </a>
                </Link>

                <div className="shape10">
                  <img src="/images/shape9.png" alt="image" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
        <div className="shape3">
          <img src="/images/shape3.png" alt="image" />
        </div>
        <div className="shape4">
          <img src="/images/shape4.png" alt="image" />
        </div>
        <div className="shape2">
          <img src="/images/shape2.png" alt="image" />
        </div>

        {/* If you want to change the video need to update videoID */}
        {display ? (
          <ModalVideo
            channel="youtube"
            isOpen={!isOpen}
            videoId="bk7McNUjWgw"
            onClose={() => setIsOpen(!isOpen)}
          />
        ) : (
          ''
        )}
      </div>
    </React.Fragment>
  )
}

export default AboutArea
