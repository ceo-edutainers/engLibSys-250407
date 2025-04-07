import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const ModalVideo = dynamic(import('react-modal-video'))

const SuccessfulVideo = () => {
  const [display, setDisplay] = React.useState(false)

  React.useEffect(() => {
    setDisplay(true)
  }, [])
  // Popup Video
  const [isOpen1, setIsOpen1] = React.useState(true)
  const [isOpen2, setIsOpen2] = React.useState(true)
  const [isOpen3, setIsOpen3] = React.useState(true)
  const [isOpen4, setIsOpen4] = React.useState(true)
  const [isOpen5, setIsOpen5] = React.useState(true)
  const [isOpen6, setIsOpen6] = React.useState(true)
  const openModal1 = () => {
    setIsOpen1(!isOpen1)
  }
  const openModal2 = () => {
    setIsOpen2(!isOpen2)
  }
  const openModal3 = () => {
    setIsOpen3(!isOpen3)
  }
  const openModal4 = () => {
    setIsOpen4(!isOpen4)
  }
  const openModal5 = () => {
    setIsOpen5(!isOpen5)
  }
  const openModal6 = () => {
    setIsOpen6(!isOpen6)
  }
  return (
    <React.Fragment>
      <div className="start-with-success-area pt-100 bg-f8f9f8 pb-70">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">English Education For Everyone</span>
            <h2>ミンジェさんが語る英語教育の真実</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="start-with-success-box">
                <div className="video-box mt-0">
                  <div className="image">
                    <img
                      src="/images/success-story.jpg"
                      className="shadow"
                      alt="image"
                    />
                  </div>

                  <Link href="#play-video">
                    <a
                      onClick={(e) => {
                        e.preventDefault()
                        openModal1()
                      }}
                      className="video-btn popup-youtube"
                    >
                      <i className="flaticon-play"></i>
                    </a>
                  </Link>
                </div>

                <div className="content">
                  <Link href="#">
                    <a className="link-btn">
                      <i className="flaticon-right"></i>
                    </a>
                  </Link>
                  <h6>engLibのCEO・ミンジェさん</h6>
                  <span style={{ fontWeight: '400' }}>
                    英検が早く受かる方法を探してますか？
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="start-with-success-box">
                <div className="video-box mt-0">
                  <div className="image">
                    <img
                      src="/images/success-story.jpg"
                      className="shadow"
                      alt="image"
                    />
                  </div>

                  <Link href="#play-video">
                    <a
                      onClick={(e) => {
                        e.preventDefault()
                        openModal2()
                      }}
                      className="video-btn popup-youtube"
                    >
                      <i className="flaticon-play"></i>
                    </a>
                  </Link>
                </div>

                <div className="content">
                  <Link href="#">
                    <a className="link-btn">
                      <i className="flaticon-right"></i>
                    </a>
                  </Link>
                  <h6>engLibのCEO・ミンジェさん</h6>
                  <span style={{ fontWeight: '400' }}>
                    なぜ我が子は英語が早く調達できないかとあせてませんか？
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="start-with-success-box">
                <div className="video-box mt-0">
                  <div className="image">
                    <img
                      src="/images/success-story.jpg"
                      className="shadow"
                      alt="image"
                    />
                  </div>

                  <Link href="#play-video">
                    <a
                      onClick={(e) => {
                        e.preventDefault()
                        openModal3()
                      }}
                      className="video-btn popup-youtube"
                    >
                      <i className="flaticon-play"></i>
                    </a>
                  </Link>
                </div>

                <div className="content">
                  <Link href="#">
                    <a className="link-btn">
                      <i className="flaticon-right"></i>
                    </a>
                  </Link>
                  <h6>engLibのCEO・ミンジェさん</h6>
                  <span style={{ fontWeight: '400' }}>
                    値段で子供の英語塾を決めていませんか？
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="start-with-success-box">
                <div className="video-box mt-0">
                  <div className="image">
                    <img
                      src="/images/success-story.jpg"
                      className="shadow"
                      alt="image"
                    />
                  </div>

                  <Link href="#play-video">
                    <a
                      onClick={(e) => {
                        e.preventDefault()
                        openModal4()
                      }}
                      className="video-btn popup-youtube"
                    >
                      <i className="flaticon-play"></i>
                    </a>
                  </Link>
                </div>

                <div className="content">
                  <Link href="#">
                    <a className="link-btn">
                      <i className="flaticon-right"></i>
                    </a>
                  </Link>
                  <h6>engLibのCEO・ミンジェさん</h6>
                  <span style={{ fontWeight: '400' }}>
                    ママ友の話は聞き流して！
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="start-with-success-box">
                <div className="video-box mt-0">
                  <div className="image">
                    <img
                      src="/images/success-story.jpg"
                      className="shadow"
                      alt="image"
                    />
                  </div>

                  <Link href="#play-video">
                    <a
                      onClick={(e) => {
                        e.preventDefault()
                        openModal5()
                      }}
                      className="video-btn popup-youtube"
                    >
                      <i className="flaticon-play"></i>
                    </a>
                  </Link>
                </div>

                <div className="content">
                  <Link href="#">
                    <a className="link-btn">
                      <i className="flaticon-right"></i>
                    </a>
                  </Link>
                  <h6>engLibのCEO・ミンジェさん</h6>
                  <span style={{ fontWeight: '400' }}>Designer</span>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="start-with-success-box">
                <div className="video-box mt-0">
                  <div className="image">
                    <img
                      src="/images/success-story.jpg"
                      className="shadow"
                      alt="image"
                    />
                  </div>

                  <Link href="#play-video">
                    <a
                      onClick={(e) => {
                        e.preventDefault()
                        openModal6()
                      }}
                      className="video-btn popup-youtube"
                    >
                      <i className="flaticon-play"></i>
                    </a>
                  </Link>
                </div>

                <div className="content">
                  <Link href="#">
                    <a className="link-btn">
                      <i className="flaticon-right"></i>
                    </a>
                  </Link>
                  <h6>engLibのCEO・ミンジェさん</h6>
                  <span style={{ fontWeight: '400' }}>Writer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* If you want to change the video need to update videoID */}
      {display ? (
        <ModalVideo
          channel="youtube"
          isOpen={!isOpen1}
          videoId="bk7McNUjWgw"
          onClose={() => setIsOpen1(!isOpen1)}
        />
      ) : (
        ''
      )}

      {display ? (
        <ModalVideo
          channel="youtube"
          isOpen={!isOpen2}
          videoId="bk7McNUjWgw"
          onClose={() => setIsOpen2(!isOpen2)}
        />
      ) : (
        ''
      )}

      {display ? (
        <ModalVideo
          channe="youtube"
          isOpen={!isOpen3}
          videoId="bk7McNUjWgw"
          onClose={() => setIsOpen3(!isOpen3)}
        />
      ) : (
        ''
      )}

      {display ? (
        <ModalVideo
          channe="youtube"
          isOpen={!isOpen4}
          videoId="bk7McNUjWgw"
          onClose={() => setIsOpen4(!isOpen4)}
        />
      ) : (
        ''
      )}

      {display ? (
        <ModalVideo
          channe="youtube"
          isOpen={!isOpen5}
          videoId="bk7McNUjWgw"
          onClose={() => setIsOpen5(!isOpen5)}
        />
      ) : (
        ''
      )}

      {display ? (
        <ModalVideo
          channe="youtube"
          isOpen={!isOpen6}
          videoId="bk7McNUjWgw"
          onClose={() => setIsOpen6(!isOpen6)}
        />
      ) : (
        ''
      )}
    </React.Fragment>
  )
}

export default SuccessfulVideo
