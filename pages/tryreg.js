import React from 'react'
// import NavbarEnglib from '../components/_App/NavbarEnglib'
import Footer from '@/components/_App/Footer'
import PageBanner from '../components/Common/PageBanner'
import Features from '../components/Common/Features'
import AboutUsContentThree from '../components/About/AboutUsContentThree'
import FeedbackSlider from '../components/OnlineTrainingSchool/FeedbackSlider'
import CoursesAreaStyleTwo from '../components/Common/CoursesAreaStyleTwo'
import FunFactsTwo from '../components/Common/FunFactsTwo'
import PremiumAccessTwo from '../components/Common/PremiumAccessTwo'
// import Footer from '../components/_App/Footer';

const About3 = () => {
  return (
    <React.Fragment>
      {/* <NavbarEnglib /> */}
      <PageBanner
        pageTitle="About Us"
        homePageUrl="/"
        homePageText="Home"
        activePageText="About Us"
      />
      <Features />
      <AboutUsContentThree />
      <FeedbackSlider />
      <CoursesAreaStyleTwo />
      <FunFactsTwo />

      <div className="ptb-100">
        <PremiumAccessTwo />
      </div>

      <Footer />
    </React.Fragment>
  )
}

export default About3
