import React from 'react'
import Link from 'next/link'

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
      <div className="courses-meta">
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
                  <a>1</a>
                </Link>
              </li>
              <li>
                <i className="bx bx-folder-open"></i>
                <span>意見</span>
                <Link href="#">
                  <a>1</a>
                </Link>
              </li>
              <li>
                <i className="bx bx-group"></i>
                <span>イベント参加</span>
                <Link href="#">
                  <a>10</a>
                </Link>
              </li>

              <li>
                <i className="bx bx-calendar"></i>
                <span>生徒関連</span>
                <Link href="#">
                  <a>01/14/2020</a>
                </Link>
              </li>

              <li>
                <i className="bx bx-calendar"></i>
                <span>給料関連</span>
                <Link href="#">
                  <a>01/14/2020</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="courses-meta">
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
                <span>レベル調節</span>
                <Link href="#">
                  <a>1</a>
                </Link>
              </li>

              <li>
                <i className="bx bx-group"></i>
                <span>退会申込</span>
                <Link href="#">
                  <a>3</a>
                </Link>
              </li>

              <li>
                <i className="bx bx-calendar"></i>
                <span>お問い</span>
                <Link href="#">
                  <a>01/14/2020</a>
                </Link>
              </li>
              <li>
                <i className="bx bx-calendar"></i>
                <span>お月謝関連</span>
                <Link href="#">
                  <a>01/14/2020</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="courses-meta">
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
                <span>Tutor Apply</span>
                <Link href="#">
                  <a>541,214</a>
                </Link>
              </li>

              <li>
                <i className="bx bx-group"></i>
                <span>Student Apply</span>
                <Link href="#">
                  <a>541,214</a>
                </Link>
              </li>

              <li>
                <i className="bx bx-group"></i>
                <span>イベント参加</span>
                <Link href="#">
                  <a>10</a>
                </Link>
              </li>
              <li>
                <i className="bx bx-calendar"></i>
                <span>メルマガ登録</span>
                <Link href="#">
                  <a>01/14/2020</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="courses-meta">
        <div className="row">
          <div
            className="col-lg-1 col-md-12 pt-2 text-center"
            style={{ backgroundColor: '#dedede', fontWeight: 'bold' }}
          >
            チェック必要
          </div>
          <div className="col-lg-11 col-md-12">
            <ul>
              <li>
                <i className="bx bx-calendar"></i>
                <span>本の発送</span>
                <Link href="#">
                  <a>4</a>
                </Link>
              </li>
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
    </>
  )
}

export default AlertTop2
