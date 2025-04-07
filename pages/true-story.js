import React from 'react'
// import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner'
import IntroVideo from '../components/SuccessStory/IntroVideoTrueStory'
import SuccessfulVideo from '@/components/VendorCertificationTraining/SuccessfulVideo'
// import Footer from '../components/_App/Footer';
import Link from 'next/link'

const SuccessStory = () => {
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <PageBanner
        pageTitle="英語教育の間違いをズバリ語る"
        homePageUrl="/"
        homePageText="Home"
        activePageText=" 英語教育の間違いをズバリ語る"
      />

      <IntroVideo />
      <SuccessfulVideo />

      <div className="our-story-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <div className="our-story-title">
                <h3 style={{ color: 'black' }}>
                  <span className="number">1</span> Inspirational stories are
                  less about success
                </h3>
              </div>
            </div>

            <div className="col-lg-8 col-md-12">
              <div className="our-story-content">
                <p>
                  <Link href="#">
                    <a>eDdemy.com</a>
                  </Link>{' '}
                  began in 2005. After years in the web hosting industry, we
                  realized that it was near impossible for the average Jane or
                  Joe to create their own website. Traditional web hosting
                  services were simply too complicated, time consuming, and
                  expensive to manage.
                </p>
                <p>
                  After seeing an increased need for eCommerce solutions, we
                  developed one of the only fully-featured, free and
                  commission-free online store builders, allowing business
                  owners to launch their online business.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="our-story-title">
                <h3 style={{ color: 'black' }}>
                  <span className="number">2</span> Academic Excellence and
                  Cultural Diversity
                </h3>
              </div>
            </div>

            <div className="col-lg-8 col-md-12">
              <div className="our-story-content">
                <p>
                  We created the{' '}
                  <Link href="#">
                    <a>eDdemy.com</a>
                  </Link>{' '}
                  Site Builder with the user's perspective in mind. We wanted to
                  offer a platform that would require no coding skills or design
                  experience. We keep it simple, so users can focus on creating
                  an amazing website that reflects their brand. Best of all -
                  it's free. You can get online, showcase your brand, or start
                  selling products right away.
                </p>
                <p>
                  After seeing an increased need for eCommerce solutions, we
                  developed one of the only fully-featured, free and
                  commission-free online store builders, allowing business
                  owners to launch their online business.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="our-story-title">
                <h3 style={{ color: 'black' }}>
                  <span className="number">3</span> A classNameical Education
                  for the Future
                </h3>
              </div>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="our-story-content">
                <p>
                  <Link href="#">
                    <a>eDdemy.com</a>
                  </Link>{' '}
                  began in 2005. After years in the web hosting industry, we
                  realized that it was near impossible for the average Jane or
                  Joe to create their own website. Traditional web hosting
                  services were simply too complicated, time consuming, and
                  expensive to manage.
                </p>
                <p>
                  After seeing an increased need for eCommerce solutions, we
                  developed one of the only fully-featured, free and
                  commission-free online store builders, allowing business
                  owners to launch their online business.
                </p>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="our-story-image">
                <img src="/images/story-img.jpg" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </React.Fragment>
  )
}

export default SuccessStory
