import React from 'react'
import dynamic from 'next/dynamic'
import IntoVideo2 from '@/components/VendorCertificationTraining/IntoVideo2'

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

const FeedbackSlider2 = () => {
  const [display, setDisplay] = React.useState(false)

  React.useEffect(() => {
    setDisplay(true)
  }, [])
  return (
    <div className="feedback-with-bg-image ptb-70 jarallax">
      <div className="container  slider-container">
        {/* {display ? (
          <OwlCarousel {...options}>
            <div className="single-feedback-item-box">
              <div className="row">
                <div className="col-lg-8 col-sm-6 col-md-6">
                  <IntoVideo2 />
                </div>
                <div
                  className="col-lg-4 col-sm-6 col-md-6"
                  style={{ paddingLeft: 0, marginLeft: 0 }}
                >
                  <div className="client-info d-flex align-items-left">
              
                    <div className="title">
                      <h3 style={{ fontSize: '25px', fontWeight: 600 }}>
                        英語の小説が読めるまで
                        <p>
                          &nbsp;インプットコース
                          <br />
                          &nbsp;Intensive Reading Course <br />
                          &nbsp;英検は自然に受かる
                        </p>
                        <hr></hr>
                      </h3>

                      <p>
                        最大の効果を生み出すメタ認知式英感習得方法と毎日の習慣を作りをサポートする独自のシステムを通じて、オフラインそれ以上のオンラインレッスンができるようになりました。イングリブのメソッドをコツコツやることで英検１級までスムーズに受かることができるプログラムです。
                      </p>
                      <h6>
                        <b>参加可能なレベル</b>
                        <br />
                        はじめての英語〜英検準1級レベルの生徒
                        <br />
                        (年長〜大学生)
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </OwlCarousel>
        ) : (
          ''
        )} */}
      </div>
      <div className="container  slider-container">
        {/* {display ? (
          <OwlCarousel
            style={{ marginTop: 50 }}
           
            {...options}
          >
            <div
              className="single-feedback-item-box"
              style={{ backgroundColor: '#4a9dfe' }}
             
            >
             
              <div className="row">
                <div className="col-lg-8 col-sm-6 col-md-6">
                  <IntoVideo2 />
                </div>
                <div
                  className="col-lg-4 col-sm-6 col-md-6"
                  style={{ paddingLeft: 0, marginLeft: 0 }}
                >
                  <div className="client-info d-flex align-items-left">
                   
                    <div className="title">
                      <h3 style={{ fontSize: '22px', fontWeight: 600 }}>
                        ネイティブのようなアウトプット
                        <p>
                          &nbsp;アウトプットコース
                          <br />
                          &nbsp;Show & Tell / Discussion Course <br />
                        </p>
                        <hr></hr>
                      </h3>

                      <p>
                        アウトプットコースでは生徒さんがネイティブのような表現力を身につけて、英語で考えて書く・話す力を育つことができます。
                      </p>
                      <h6>
                        <b>参加可能なレベル</b>
                        <br />
                        英検3級〜１級レベルの生徒(小2年〜大学生まで)
                        <br />
                        帰国子女枠受験、インターの生徒、海外留学を目指す生徒さんも多数参加しています。
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

            
            </div>
          </OwlCarousel>
        ) : (
          ''
        )} */}
      </div>
    </div>
  )
}

export default FeedbackSlider2
