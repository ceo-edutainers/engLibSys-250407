import React, { useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import Check_Sending_Book from '@/components/Admin/Check_Sending_Book'
import Check_Zaiko_Unter_Two from '@/components/Admin/Check_Zaiko_Unter_Two'
import Check_Zaiko_Unter_One from '@/components/Admin/Check_Zaiko_Unter_One'
import Check_Zaiko_Under_Zero from '@/components/Admin/Check_Zaiko_Under_Zero'
import Mail_Subscription from '@/components/Admin/Mail_Subscription'
import Student_Trial from '@/components/Admin/Student_Trial'
import Student_Level_Change_Reading from '@/components/Admin/Student_Level_Change_Reading'
import Student_Level_Change_Shadowing from '@/components/Admin/Student_Level_Change_Shadowing'
import Check_Event_Attender from '@/components/Admin/Check_Event_Attender'
import Check_Showandtell_HW_Not_Set from '@/components/Admin/Check_Showandtell_HW_Not_Set'

const AlertTop2 = () => {
  const [howTutorLessonChk, setHowTutorLessonChk] = useState()

  function handleChangeTutorChk(val) {
    setHowTutorLessonChk(val)
  }
  return (
    <>
      <div
        className="courses-details-desc-style-two pb-2 pt-2 pl-3 pr-3 ml-0 mr-0"
        style={{ backgroundColor: '#dedede' }}
      >
        <h2 style={{ fontWeight: '600' }}>スケジュール管理</h2>
        {/* <p>
          <strong>
            Hi! Welcome to Photography Crash Course for Photographer, the only
            course you need to become a BI Analyst.
          </strong>
        </p>
        <p>
          Here are some more details of what you get with The Business
          Intelligence Analyst Course:
        </p> */}
      </div>
      <div className="courses-meta ml-3 mr-3">
        <div className="row">
          <div
            className="col-lg-2 col-md-12 pt-3 text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            スケジュール変更
            <br />
            Tutor & Date
          </div>
          <div className="col-lg-10 col-md-12">
            <input
              className="mr-2"
              type="radio"
              name="TutorChangeChk"
              value="temp"
              onClick={(e) => {
                setHowTutorLessonChk(e.target.value)
              }}
            />{' '}
            1回のみ変更&nbsp;{' '}
            <input
              className="mr-2"
              type="radio"
              name="TutorChangeChk"
              value="forever"
              onClick={(e) => {
                setHowTutorLessonChk(e.target.value)
              }}
            />{' '}
            担当変更&nbsp;
          </div>
        </div>
      </div>
      <hr />
      <div className="courses-meta ml-3 mr-3">
        <div className="row">
          <div
            className="col-lg-2 col-md-12 pt-3 text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            レッスン追加
          </div>
          <div className="col-lg-10 col-md-12">
            <ul>
              <li>
                <i className="bx bx-folder-open"></i>
                <span>システム不具合</span>
                <Link href="#">
                  <a>0</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="courses-meta ml-3 mr-3">
        <div className="row">
          <div
            className="col-lg-2 col-md-12 pt-3 text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            レッスン追加
          </div>
          <div className="col-lg-10 col-md-12">
            <ul>
              <li>
                <i className="bx bx-folder-open"></i>
                <span>システム不具合</span>
                <Link href="#">
                  <a>0</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}

export default AlertTop2
