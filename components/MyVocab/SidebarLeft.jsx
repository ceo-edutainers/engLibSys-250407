import react, { useState, useContext, useEffect, useRef } from 'react'
import Link from 'next/link'
import { VocaContext } from '@/components/MyVocab/Contexts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faAssistiveListeningSystems,
  faCircle,
  faCircleNotch,
  faDotCircle,
  faMicrophone,
} from '@fortawesome/free-solid-svg-icons'
const SidebarLeft = () => {
  const { myMbn, setMyMbn, userName, setUserName, searchWord, setSearchWord } =
    useContext(VocaContext)
  return (
    <div className="courses-sidebar-sticky">
      <div className="courses-sidebar-information">
        <div className="btn-box mb-3">
          <Link href="#">
            <a className="default-btn" style={{ backgroundColor: '#2196F3' }}>
              {/* <i className="flaticon-shopping-cart"></i> */}
              覚えた単語
              <span></span>
            </a>
          </Link>
        </div>
        <ul className="info">
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-tick"></i>
                &nbsp; Instructor
              </span>
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-tick"></i>
                &nbsp; Instructor
              </span>
            </div>
          </li>{' '}
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-tick"></i>
                &nbsp; Instructor
              </span>
            </div>
          </li>
        </ul>

        {/* <div className="courses-share">
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
        </div> */}
      </div>
    </div>
  )
}

export default SidebarLeft
