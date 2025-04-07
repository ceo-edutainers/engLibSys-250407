import React from 'react'
import Link from 'next/link'

const CoursesDetailsSidebarTwo = () => {
  return (
    <div className="courses-sidebar-sticky">
      <div className="courses-sidebar-information">
        <ul className="info">
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-lock"></i>
                <h6
                  style={{
                    fontWeight: '550',
                    fontSize: '16px',
                  }}
                >
                  ランキング
                </h6>
              </span>
              <h1>26</h1>
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-teacher"></i>
                <h6
                  style={{
                    fontWeight: '550',
                    fontSize: '16px',
                  }}
                >
                  アウトプットコース体験
                </h6>
              </span>
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-time"></i>
                <h6
                  style={{
                    fontWeight: '550',
                    fontSize: '16px',
                  }}
                >
                  固定レッスン日変更
                </h6>
              </span>
              13
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-distance-learning"></i>
                <h6
                  style={{
                    fontWeight: '550',
                    fontSize: '16px',
                  }}
                >
                  振替設定
                </h6>
              </span>
              3 Lesson
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-web"></i>
                <h6
                  style={{
                    fontWeight: '550',
                    fontSize: '16px',
                  }}
                >
                  欠席設定
                </h6>
              </span>
              PRE-INTERMEDIATE
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-html"></i>
                <h6
                  style={{
                    fontWeight: '550',
                    fontSize: '16px',
                  }}
                >
                  教材変更
                </h6>
              </span>
              Japanese
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-caption"></i>
                <h6
                  style={{
                    fontWeight: '550',
                    fontSize: '16px',
                  }}
                >
                  コース変更
                </h6>
              </span>
              Japan
            </div>
          </li>

          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-quiz"></i>My Course
              </span>
              Input[ORT]
              <br />
              Output[Show and Tell]
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-certification"></i> Certificate
              </span>
              Yes
            </div>
          </li>
        </ul>

        <div className="btn-box">
          <Link href="#">
            <a className="default-btn">
              <i className="flaticon-shopping-cart"></i> 私の情報変更
              <span></span>
            </a>
          </Link>
        </div>

        <div className="courses-share">
          <div className="share-info">
            <span>
              Share This Course <i className="flaticon-share"></i>
            </span>

            <ul className="social-link">
              <li>
                <a href="#" className="d-block" target="_blank">
                  <i className="bx bxl-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="d-block" target="_blank">
                  <i className="bx bxl-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" className="d-block" target="_blank">
                  <i className="bx bxl-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="d-block" target="_blank">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursesDetailsSidebarTwo
