import React from 'react'
// import NavbarEnglib from '../components/_App/NavbarEnglib'
import PageBanner from '../components/Common/PageBanner'
import Link from 'next/link'
import axios from 'axios'

// import Footer from '../components/_App/Footer';

const Blog3 = () => {
  return (
    <React.Fragment>
      {/* <NavbarEnglib /> */}
      <PageBanner
        pageTitle="Blog Grid (Full Width)"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Blog Grid (Full Width)"
      />

      <div className="blog-area ptb-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/single-blog-1">
                    <a className="d-block">
                      <img src="/images/blog/blog1.jpg" alt="image" />
                    </a>
                  </Link>
                </div>
                <div className="post-content">
                  <Link href="#">
                    <a className="category">Education</a>
                  </Link>
                  <h3>
                    <Link href="/single-blog-1">
                      <a>It’s Time To Think Differently About Homeschooling</a>
                    </Link>
                  </h3>
                  <ul className="post-content-footer d-flex justify-content-between align-items-center">
                    <li>
                      <div className="post-author d-flex align-items-center">
                        <img
                          src="/images/user1.jpg"
                          className="rounded-circle"
                          alt="image"
                        />
                        <span>Alex Morgan</span>
                      </div>
                    </li>
                    <li>
                      <i className="flaticon-calendar"></i> April 30, 2020
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/single-blog-1">
                    <a className="d-block">
                      <img src="/images/blog/blog2.jpg" alt="image" />
                    </a>
                  </Link>
                </div>
                <div className="post-content">
                  <Link href="#">
                    <a className="category">Online</a>
                  </Link>
                  <h3>
                    <Link href="/single-blog-1">
                      <a>What Is The MLB Summer Slugger Program?</a>
                    </Link>
                  </h3>
                  <ul className="post-content-footer d-flex justify-content-between align-items-center">
                    <li>
                      <div className="post-author d-flex align-items-center">
                        <img
                          src="/images/user2.jpg"
                          className="rounded-circle"
                          alt="image"
                        />
                        <span>Sarah Taylor</span>
                      </div>
                    </li>
                    <li>
                      <i className="flaticon-calendar"></i> April 29, 2020
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/single-blog-1">
                    <a className="d-block">
                      <img src="/images/blog/blog3.jpg" alt="image" />
                    </a>
                  </Link>
                </div>
                <div className="post-content">
                  <Link href="#">
                    <a className="category">Learning</a>
                  </Link>
                  <h3>
                    <Link href="/single-blog-1">
                      <a>28 Student-Centered Instructional Strategies</a>
                    </Link>
                  </h3>
                  <ul className="post-content-footer d-flex justify-content-between align-items-center">
                    <li>
                      <div className="post-author d-flex align-items-center">
                        <img
                          src="/images/user3.jpg"
                          className="rounded-circle"
                          alt="image"
                        />
                        <span>David Warner</span>
                      </div>
                    </li>
                    <li>
                      <i className="flaticon-calendar"></i> April 28, 2020
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/single-blog-1">
                    <a className="d-block">
                      <img src="/images/blog/blog7.jpg" alt="image" />
                    </a>
                  </Link>
                </div>
                <div className="post-content">
                  <Link href="#">
                    <a className="category">Education</a>
                  </Link>
                  <h3>
                    <Link href="/single-blog-1">
                      <a>4 Steps To Quality Training In Times Of Urgency</a>
                    </Link>
                  </h3>
                  <ul className="post-content-footer d-flex justify-content-between align-items-center">
                    <li>
                      <div className="post-author d-flex align-items-center">
                        <img
                          src="/images/user1.jpg"
                          className="rounded-circle"
                          alt="image"
                        />
                        <span>Alex Morgan</span>
                      </div>
                    </li>
                    <li>
                      <i className="flaticon-calendar"></i> April 28, 2020
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/single-blog-1">
                    <a className="d-block">
                      <img src="/images/blog/blog8.jpg" alt="image" />
                    </a>
                  </Link>
                </div>
                <div className="post-content">
                  <Link href="#">
                    <a className="category">Online</a>
                  </Link>
                  <h3>
                    <Link href="/single-blog-1">
                      <a>100 Blended Learning Resources For Teachers</a>
                    </Link>
                  </h3>
                  <ul className="post-content-footer d-flex justify-content-between align-items-center">
                    <li>
                      <div className="post-author d-flex align-items-center">
                        <img
                          src="/images/user2.jpg"
                          className="rounded-circle"
                          alt="image"
                        />
                        <span>Sarah Taylor</span>
                      </div>
                    </li>
                    <li>
                      <i className="flaticon-calendar"></i> April 28, 2020
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/single-blog-1">
                    <a className="d-block">
                      <img src="/images/blog/blog9.jpg" alt="image" />
                    </a>
                  </Link>
                </div>
                <div className="post-content">
                  <Link href="#">
                    <a className="category">Learning</a>
                  </Link>
                  <h3>
                    <Link href="/single-blog-1">
                      <a>20 Examples Of Project-Based Learning</a>
                    </Link>
                  </h3>
                  <ul className="post-content-footer d-flex justify-content-between align-items-center">
                    <li>
                      <div className="post-author d-flex align-items-center">
                        <img
                          src="/images/user3.jpg"
                          className="rounded-circle"
                          alt="image"
                        />
                        <span>David Warner</span>
                      </div>
                    </li>
                    <li>
                      <i className="flaticon-calendar"></i> April 28, 2020
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/single-blog-1">
                    <a className="d-block">
                      <img src="/images/blog/blog10.jpg" alt="image" />
                    </a>
                  </Link>
                </div>
                <div className="post-content">
                  <Link href="#">
                    <a className="category">Education</a>
                  </Link>
                  <h3>
                    <Link href="/single-blog-1">
                      <a>Instructional Design And Adult Learners</a>
                    </Link>
                  </h3>
                  <ul className="post-content-footer d-flex justify-content-between align-items-center">
                    <li>
                      <div className="post-author d-flex align-items-center">
                        <img
                          src="/images/user1.jpg"
                          className="rounded-circle"
                          alt="image"
                        />
                        <span>Alex Morgan</span>
                      </div>
                    </li>
                    <li>
                      <i className="flaticon-calendar"></i> April 28, 2020
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/single-blog-1">
                    <a className="d-block">
                      <img src="/images/blog/blog11.jpg" alt="image" />
                    </a>
                  </Link>
                </div>
                <div className="post-content">
                  <Link href="#">
                    <a className="category">Online</a>
                  </Link>
                  <h3>
                    <Link href="/single-blog-1">
                      <a>Join ATD 2020 International Conference & EXPO</a>
                    </Link>
                  </h3>
                  <ul className="post-content-footer d-flex justify-content-between align-items-center">
                    <li>
                      <div className="post-author d-flex align-items-center">
                        <img
                          src="/images/user2.jpg"
                          className="rounded-circle"
                          alt="image"
                        />
                        <span>Sarah Taylor</span>
                      </div>
                    </li>
                    <li>
                      <i className="flaticon-calendar"></i> April 28, 2020
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="col-lg-12 col-md-12">
              <div className="pagination-area text-center">
                <a href="#" className="prev page-numbers">
                  <i className="bx bx-chevrons-left"></i>
                </a>
                <span className="page-numbers current" aria-current="page">
                  1
                </span>
                <a href="#" className="page-numbers">
                  2
                </a>
                <a href="#" className="page-numbers">
                  3
                </a>
                <a href="#" className="page-numbers">
                  4
                </a>
                <a href="#" className="next page-numbers">
                  <i className="bx bx-chevrons-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </React.Fragment>
  )
}

export default Blog3
