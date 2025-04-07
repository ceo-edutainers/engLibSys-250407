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

import ViewMemberList from '@/components/Admin/ViewMemberList'

const AlertTop2 = () => {
  const [memberListView, setMemberListView] = useState(false)
  const [groupmemberListView, setGroupMemberListView] = useState(false)

  const styleVerticalBtn = {
    cursor: 'pointer',
    margin: 0,
    position: 'absolute',
    top: '50%',
    msTransform: 'translateX(50%)',
    transform: 'translateY(-50%)',
  }

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
        <h2 style={{ fontWeight: '600' }}>会員/先生管理</h2>
        <p>
          <strong>
            Hi! Welcome to Photography Crash Course for Photographer, the only
            course you need to become a BI Analyst.
          </strong>
        </p>
        <p>
          Here are some more details of what you get with The Business
          Intelligence Analyst Course:
        </p>
      </div>

      <div className="courses-meta ml-3 mr-3">
        <div className="row">
          <div
            className="col-lg-2 col-md-12 p-2   text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            個別生徒管理 <br />
            Personal Member
          </div>
          <div className="col-lg-10 col-md-12   mt-2 ">
            <span
              className="btn-sm btn-danger p-2 mr-2 "
              // style={styleVerticalBtn}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setMemberListView(!memberListView)
                setGroupMemberListView(false)
              }}
            >
              {memberListView ? '個別会員リストを隠す' : '個別会員リストを見る'}
            </span>
            <span
              className="btn-sm btn-danger p-2 mr-2 "
              // style={styleVerticalBtn}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setGroupMemberListView(!groupmemberListView)
                setMemberListView(false)
              }}
            >
              {groupmemberListView
                ? '法人会員リストを隠す'
                : '法人会員リストを見る'}
            </span>
            <br />
            <div
              style={{
                display: memberListView ? 'block' : 'none',
              }}
            >
              <ViewMemberList sort="PERSONAL" />
            </div>
            <div
              style={{
                display: groupmemberListView ? 'block' : 'none',
              }}
            >
              <ViewMemberList sort="COMPANY" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="courses-meta ml-3 mr-3">
        <div className="row">
          <div
            className="col-lg-2 col-md-12  p-2 text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            法人生徒管理
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
