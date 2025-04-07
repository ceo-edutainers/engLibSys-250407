import React from 'react'
import Link from 'next/link'

const AlertTop1 = () => {
  return (
    <>
      <div
        className="courses-details-desc-style-two pb-2 pt-2 pl-3 pr-3"
        style={{ backgroundColor: '#dedede' }}
      >
        <h2 style={{ fontWeight: '600' }}>
          Lesson Trouble{' '}
          <span style={{ marginLeft: '100px', fontSize: '20px' }}>
            今の時間:
          </span>
          18:31
        </h2>
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
      <div className="col-lg-12 col-md-12">
        <div className="courses-details-desc-style-two">
          <div className="courses-curriculum pt-0">
            <ul>
              <li>
                <a
                  href="#"
                  className="d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: '#CECECE' }}
                >
                  <span className="courses-name">
                    <strong>[Tutor] Noriko Sato</strong> /{' '}
                    <strong>[Student] 個人:Minato Taguchi</strong>
                    <br />
                    <span className="btn btn-danger ml-2">
                      生徒が来ない
                      <br />
                      16:32
                    </span>
                    <span className="btn btn-danger ml-2">
                      生徒の顔が見えない <br />
                      16:34
                    </span>
                    <span className="btn btn-danger ml-2">
                      生徒の声が聞こえない
                      <br />
                      16:35
                    </span>
                    <span className="btn btn-primary ml-2">
                      先生の声が再起動中
                      <br />
                      16:40
                    </span>
                  </span>

                  <div className="courses-meta">
                    <span
                      className="duration"
                      style={{ backgroundColor: 'white' }}
                    >
                      3m 30s 経過
                    </span>
                    <span className="status locked">対応中(Misako Gurol)</span>
                    {/* <span className="status locked">
                      未解決
                      <i className="flaticon-password"></i>
                    </span> */}
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: '#ececec' }}
                >
                  <span className="courses-name">
                    <strong>[Tutor] Keiko Kamegai</strong> /{' '}
                    <strong>[Student] 個人: Yuto Uchida</strong>{' '}
                    <button className="btn btn-info" style={{ width: '150px' }}>
                      Zoom参加
                    </button>{' '}
                    <button
                      className="btn btn-warning"
                      style={{ width: '150px' }}
                    >
                      生徒に電話する
                    </button>{' '}
                    <button className="btn btn-info" style={{ width: '150px' }}>
                      先生に電話する
                    </button>
                    <br />
                    <span className="btn btn-danger ml-2">
                      生徒が来ない
                      <br />
                      16:32
                    </span>
                    <span className="btn btn-danger ml-2">
                      生徒の顔が見えない <br />
                      16:34
                    </span>
                    <span className="btn btn-danger ml-2">
                      生徒の声が聞こえない
                      <br />
                      16:35
                    </span>
                    <span className="btn btn-primary ml-2">
                      先生の声が再起動中
                      <br />
                      16:40
                    </span>
                  </span>

                  <div className="courses-meta">
                    <span
                      className="duration"
                      style={{ backgroundColor: 'white' }}
                    >
                      3m 30s 経過
                    </span>
                    <br />
                    <br />
                    <span
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '5px',
                        marginTop: '30px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      対応開始する
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlertTop1
