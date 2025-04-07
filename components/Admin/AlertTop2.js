import React from 'react'
import Link from 'next/link'
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
  return (
    <>
      <div
        className="courses-details-desc-style-two pb-2 pt-2 pl-3 pr-3"
        style={{ backgroundColor: '#dedede' }}
      >
        <h2 style={{ fontWeight: '600' }}>新規アラート </h2>
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
            className="col-lg-1 col-md-12 pt-3 text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            お問合せ
            <br />
            Tutorから
          </div>
          <div className="col-lg-11 col-md-12">
            <ul>
              <li>
                <i className="bx bx-folder-open"></i>
                <span>システム不具合</span>
                <Link href="#">
                  <a>0</a>
                </Link>
              </li>
              <li>
                <i className="bx bx-folder-open"></i>
                <span>Tutor SHOW AND TELL H.W-SETしてない</span>
                <Link href="#">
                  <Check_Showandtell_HW_Not_Set />
                </Link>
              </li>
              <li>
                <i className="bx bx-folder-open"></i>
                <span>意見</span>
                <Link href="#">
                  <a>0</a>
                </Link>
              </li>

              <li>
                <i className="bx bx-calendar"></i>
                <span>生徒関連</span>
                <Link href="#">
                  <a>0</a>
                </Link>
              </li>

              <li>
                <i className="bx bx-calendar"></i>
                <span>給料関連</span>
                <Link href="#">
                  <a>0</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="courses-meta ml-3 mr-3">
        <div className="row">
          <div
            className="col-lg-1 col-md-12 pt-3 text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            お問合せ
            <br />
            Studentから
          </div>
          <div className="col-lg-11 col-md-12">
            <ul>
              <li>
                <i className="bx bx-folder-open"></i>
                <span>レベル調節(Reading)</span>
                <Link href="#">
                  <Student_Level_Change_Reading />
                </Link>
              </li>
              <li>
                <i className="bx bx-folder-open"></i>
                <span>レベル調節(Shadowing)</span>
                <Link href="#">
                  <Student_Level_Change_Shadowing />
                </Link>
              </li>
              {/* <li>
                <i className="bx bx-group"></i>
                <span>退会申込</span>
                <Link href="#">
                  <a>3</a>
                </Link>
              </li> */}

              <li>
                <i className="bx bx-calendar"></i>
                <span>お問い(Formから)</span>
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
            className="col-lg-1 col-md-12 pt-2 text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            新規登録
          </div>
          <div className="col-lg-11 col-md-12">
            <ul>
              <li>
                <i className="bx bx-group"></i>
                <span>先生エントリー</span>
                <Link href="#">
                  <Mail_Subscription />
                </Link>
              </li>

              <li>
                <i className="bx bx-group"></i>
                <span>体験申込み</span>
                <Link href="#">
                  <Student_Trial />
                </Link>
              </li>
              <li>
                <i className="bx bx-calendar"></i>
                <span>メルマガ新規</span>
                <Link href="#">
                  <Mail_Subscription />
                </Link>
              </li>

              <li>
                <i className="bx bx-group"></i>
                <span>イベント参加</span>
                <Link href="#">
                  <Check_Event_Attender />
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
            className="col-lg-1 col-md-12 pt-2 text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            お金関連
          </div>
          <div className="col-lg-11 col-md-12">
            <ul>
              <li>
                <i className="bx bx-calendar"></i>
                <span>未入金</span>
                <Link href="#">
                  <a>10</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="courses-meta ml-3 mr-3">
        <div className="row">
          <div
            className="col-lg-1 col-md-12 pt-2 text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            在庫関連
          </div>
          <div className="col-lg-11 col-md-12">
            <ul>
              <li>
                <i className="bx bx-calendar"></i>
                <span>本の発送</span>
                <Link href="#">
                  <Check_Sending_Book />
                </Link>
              </li>
              <li>
                <i className="bx bx-calendar"></i>
                <span>在庫2個</span>
                <Link href="#">
                  <Check_Zaiko_Unter_Two />
                </Link>
              </li>
              <li>
                <i className="bx bx-calendar"></i>
                <span>在庫1個</span>
                <Link href="#">
                  <Check_Zaiko_Unter_One />
                </Link>
              </li>
              <li>
                <i className="bx bx-calendar"></i>
                <span>在庫0個</span>
                <Link href="#">
                  <Check_Zaiko_Under_Zero />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlertTop2
