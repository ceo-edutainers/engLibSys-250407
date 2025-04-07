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
import ViewSubscriptingList from '@/components/Admin/ViewSubscriptingList'
import RegNewMember from '@/components/Admin/RegNewMember'
import ViewTrialList from '@/components/Admin/ViewTrialList'
const AlertTop2 = () => {
  const [howTutorLessonChk, setHowTutorLessonChk] = useState()

  function handleChangeTutorChk(val) {
    setHowTutorLessonChk(val)
  }

  const [memberListView, setMemberListView] = useState(false)
  const [groupmemberListView, setGroupMemberListView] = useState(false)

  //入会管理
  const [addMemberFormView, setAddMemberFormView] = useState(false)
  const styleVerticalBtn = {
    cursor: 'pointer',
    margin: 0,
    position: 'absolute',
    top: '50%',
    msTransform: 'translateX(50%)',
    transform: 'translateY(-50%)',
  }

  const [ingMemberDateListView, setIngMemberDateListView] = useState(false)
  function regNewMember() {}
  return (
    <>
      <div
        className="courses-details-desc-style-two pb-2 pt-2 pl-3 pr-3 ml-0 mr-0"
        style={{ backgroundColor: '#dedede' }}
      >
        <h2 style={{ fontWeight: '600' }}>入会管理</h2>
      </div>
      <div className="courses-meta ml-3 mr-3">
        <div className="row">
          <div
            className="col-lg-2 col-md-12 pt-3 text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            Subscription管理
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
              {memberListView
                ? 'New-Subscriptionリストを隠す'
                : 'NewSubscriptionリストを見る'}
            </span>
          </div>
          <div
            style={{
              display: memberListView ? 'block' : 'none',
            }}
          >
            <ViewSubscriptingList sort="PERSONAL" />
          </div>
          <div
            style={{
              display: groupmemberListView ? 'block' : 'none',
            }}
          >
            <ViewSubscriptingList sort="COMPANY" />
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
            体験管理
          </div>
          <div className="col-lg-10 col-md-12">
            <div className="mb-3">
              <span
                className="btn-sm btn-danger p-2 mr-2 "
                // style={styleVerticalBtn}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIngMemberDateListView(!ingMemberDateListView)
                }}
              >
                {ingMemberDateListView
                  ? 'ing/date 体験リストを隠す'
                  : 'ing/date順 体験リストを隠す'}
              </span>
            </div>
            <div
              style={{
                display: ingMemberDateListView ? 'block' : 'none',
              }}
            >
              <ViewTrialList />
            </div>
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
            入会生徒追加
          </div>
          <div className="col-lg-10 col-md-12   mt-2 ">
            <span
              className="btn-sm btn-danger p-2 mr-2 "
              // style={styleVerticalBtn}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setAddMemberFormView(!addMemberFormView)
              }}
            >
              Add New Member
            </span>

            {addMemberFormView && <RegNewMember />}
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
            会員管理
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
