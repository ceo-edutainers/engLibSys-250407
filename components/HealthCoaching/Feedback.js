import React from 'react'
import dynamic from 'next/dynamic'
// const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
  loop: true,
  nav: false,
  dots: true,
  autoplayHoverPause: true,
  autoplay: true,
  items: 1,
  navText: [
    "<i className='bx bx-chevron-left'></i>",
    "<i className='bx bx-chevron-right'></i>",
  ],
}

const Feedback = () => {
  const [display, setDisplay] = React.useState(false)

  React.useEffect(() => {
    setDisplay(true)
  }, [])
  return (
    <div className="health-coaching-feedback-area">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="health-coaching-feedback-image">
              <img src="/images/woman.jpg" alt="image" />
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="health-coaching-inner">
              <h2 className="playfair-display-font">
                More Than 200,000 People Agree That We are Different
              </h2>

              {/* {display ? <OwlCarousel 
                                className="feedback-slides owl-carousel owl-theme"
                                {...options}
                            >
                                <div className="feedback-quote">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>

                                    <div className="client-info">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img src="/images/user1.jpg" alt="image" />
                                            <div className="title">
                                                <h3>John Smith</h3>
                                                <span>Python Developer</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="object1">
                                        <img src="/images/object1.png" alt="image" />
                                    </div>
                                    <div className="object2">
                                        <img src="/images/object2.png" alt="image" />
                                    </div>
                                    <div className="object3">
                                        <img src="/images/object3.png" alt="image" />
                                    </div>
                                    <div className="object4">
                                        <img src="/images/object4.png" alt="image" />
                                    </div>
                                </div>

                                <div className="feedback-quote">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>

                                    <div className="client-info">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img src="/images/user1.jpg" alt="image" />
                                            <div className="title">
                                                <h3>John Smith</h3>
                                                <span>Python Developer</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="object1">
                                        <img src="/images/object1.png" alt="image" />
                                    </div>
                                    <div className="object2">
                                        <img src="/images/object2.png" alt="image" />
                                    </div>
                                    <div className="object3">
                                        <img src="/images/object3.png" alt="image" />
                                    </div>
                                    <div className="object4">
                                        <img src="/images/object4.png" alt="image" />
                                    </div>
                                </div>

                                <div className="feedback-quote">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>

                                    <div className="client-info">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img src="/images/user1.jpg" alt="image" />
                                            <div className="title">
                                                <h3>John Smith</h3>
                                                <span>Python Developer</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="object1">
                                        <img src="/images/object1.png" alt="image" />
                                    </div>
                                    <div className="object2">
                                        <img src="/images/object2.png" alt="image" />
                                    </div>
                                    <div className="object3">
                                        <img src="/images/object3.png" alt="image" />
                                    </div>
                                    <div className="object4">
                                        <img src="/images/object4.png" alt="image" />
                                    </div>
                                </div>
                            </OwlCarousel> : ''} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback
