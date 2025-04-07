import React, { useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import ViewSubscriptingList from '@/components/Admin/ViewSubscriptingList'
import RegNewMember from '@/components/Registration/RegNewMember'
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
      <div className="courses-meta ml-3 mr-3 mt-5">
        <div className="row">
          <div
            className="col-lg-2 col-md-12 pt-3 text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            入会生徒追加
          </div>
          <div className="col-lg-10 col-md-12   mt-2 ">
            <RegNewMember />
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
