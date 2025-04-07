import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import PageBanner from '@/components/SingleCoursesTwo/PageBanner'
import AdminTopRight from '@/components/GAdmin/AdminTopRight'
import AdminTopLeft from '@/components/GAdmin/AdminTopLeft'
import RankingPoint from '@/components/GAdmin/RankingPoint'
import RankingMonster from '@/components/GAdmin/RankingMonster'
import CancelRate from '@/components/GAdmin/CancelRate'
import HowManyBook from '@/components/GAdmin/HowManyBook'
import HowManyChapter from '@/components/GAdmin/HowManyChapter'
import AlertTop1 from '@/components/GAdmin/AlertTop1'
import AlertTop2 from '@/components/GAdmin/AlertTop2'
import Link from 'next/link'
import NavbarEnglib_GAdmin from '@/components/_App/NavbarEnglib_GAdmin'
const SingleCourses = () => {
  return (
    <React.Fragment>
      <NavbarEnglib_GAdmin />
      <hr />
      <div id="boxContainerContainer">
        <div id="boxContainer">
          <div id="box1">
            <RankingPoint />
          </div>
          <div id="box2">
            <RankingMonster />
          </div>
        </div>
        <div id="boxContainer">
          <div id="box1">
            {' '}
            <HowManyBook />
          </div>
          <div id="box2">
            <HowManyChapter />
          </div>
        </div>
        <div id="boxContainer">
          <div id="box1">
            {' '}
            <CancelRate />
          </div>
          <div id="box2"></div>
        </div>
      </div>
      {/* <div className="courses-details-area pb-100 ">
        <div className="container p-0">
          <div className="courses-details-header">
            <div className="row align-items-center"></div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-12">
              <AdminTopLeft />
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="courses-details-desc-style-two">
                <h3>Description</h3>
                <p>
                  <strong>
                    Hi! Welcome to Photography Crash Course for Photographer,
                    the only course you need to become a BI Analyst.
                  </strong>
                </p>
                <p>
                  Here are some more details of what you get with The Business
                  Intelligence Analyst Course:
                </p>

                <h3 style={{ color: 'black' }}>Courses Video</h3>
                <div className="courses-curriculum">
                  <h3>Python Introduction</h3>
                  <ul>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          Python Introduction
                        </span>
                        <div className="courses-meta">
                          <span className="questions">5 questions</span>
                          <span className="duration">01 Hour</span>
                          <span className="status">Preview</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <h3>Stepping into the World of Python</h3>
                  <ul>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">NumPy Introduction</span>
                        <div className="courses-meta">
                          <span className="duration">15 Min</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          NumPy Getting Started
                        </span>
                        <div className="courses-meta">
                          <span className="duration">30 Min</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          NumPy Creating Arrays
                        </span>
                        <div className="courses-meta">
                          <span className="duration">45 Min</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          NumPy Array Indexing
                        </span>
                        <div className="courses-meta">
                          <span className="questions">4 questions</span>
                          <span className="duration">1 Hour</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          NumPy Array Slicing
                        </span>
                        <div className="courses-meta">
                          <span className="duration">1.5 Hour</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                  </ul>

                  <h3>Python MySQL</h3>
                  <ul>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">Python MySQL</span>
                        <div className="courses-meta">
                          <span className="duration">01 Hour</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          Python MySQL Create Database
                        </span>
                        <div className="courses-meta">
                          <span className="questions">3 questions</span>
                          <span className="duration">1.1 Hour</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="courses-name">
                          Python MySQL Create Table
                        </span>
                        <div className="courses-meta">
                          <span className="duration">1.5 Hour</span>
                          <span className="status locked">
                            <i className="flaticon-password"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>

                <h3>What you'll learn</h3>
                <div className="why-you-learn">
                  <ul>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Become an expert in Statistics
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Boost your resume with skills
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Gather, organize, data
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Use data for improved
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Present information KPIs
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Perform quantitative
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Analyze current data
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Discover how to find trends
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Understand the fundamentals
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="flaticon-tick"></i>
                        Use SQL to create, design
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div> */}
    </React.Fragment>
  )
}

export default SingleCourses
