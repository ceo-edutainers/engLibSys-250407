import React from 'react'
import PageBanner from '@/components/SingleCourses/PageBanner'
import StaticCoursesDetailsSidebar from '@/components/SingleCourses/StaticCoursesDetailsSidebar'
import YouMightLikeTheCourses from '@/components/Courses/YouMightLikeTheCourses'
import { resetIdCounter, Tab, Tabs, TabList, TabPanel } from 'react-tabs'
// import NavbarEnglib from '@/components/_App/NavbarEnglib'
resetIdCounter()

const SingleCourses = () => {
  return (
    <React.Fragment>
      {/* <PageBanner
        pageTitle="Python for Finance: Investment Fundamentals & Data Analytics"
        homePageUrl="/"
        homePageText="Home"
        innerPageUrl="/courses-1"
        innerPageText="Courses"
        activePageText="Python for Finance: Investment Fundamentals & Data Analytics"
      /> */}
      {/* <NavbarEnglib /> */}

      <div className="courses-details-area pb-3">
        {/* <div className="courses-details-image">
          <img src="/images/courses/course-details.jpg" alt="image" />
        </div> */}

        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="courses-details-desc">
                <Tabs>
                  <center>
                    <TabList>
                      <Tab
                        style={{ marginLeft: '100px', marginRight: '100px' }}
                      >
                        <a href="#input">
                          Input Program<p>インプットプログラム</p>
                        </a>
                      </Tab>
                      <Tab
                        style={{ marginLeft: '100px', marginRight: '100px' }}
                      >
                        <a href="#output">
                          Output Program <p>アウトプットプログラム</p>
                        </a>
                      </Tab>
                      <Tab
                        style={{ marginLeft: '100px', marginRight: '100px' }}
                      >
                        <a href="#support">
                          Support Program <p>サポートプログラム</p>
                        </a>
                      </Tab>
                    </TabList>
                  </center>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <YouMightLikeTheCourses />
    </React.Fragment>
  )
}

export default SingleCourses
