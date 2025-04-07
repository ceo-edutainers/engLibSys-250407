import React, { useEffect, useState, useRef } from 'react'

// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
const ViewTrouble = ({ mbn }) => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [endView, setEndView] = useState(false)

  const [isNoShow, setIsNoShow] = useState(false)
  const [newLesson, setNewLesson] = useState(false)

  const [Tutor_Cat01_Opt01, setTutor_Cat01_Opt01] =
    useState('他のミーティング中')
  const [ViewTutor_Cat01_Opt01, setViewTutor_Cat01_Opt01] = useState(false)

  const [Tutor_Cat02_Opt01, setTutor_Cat02_Opt01] = useState('')
  const [ViewTutor_Cat02_Opt01, setViewTutor_Cat02_Opt01] = useState(false)

  const [Tutor_Cat03_Opt01, setTutor_Cat03_Opt01] =
    useState('生徒の声が聞こえない')
  const [ViewTutor_Cat03_Opt01, setViewTutor_Cat03_Opt01] = useState(false)

  const [Tutor_Cat04_Opt01, setTutor_Cat04_Opt01] =
    useState('生徒の顔が見えない')
  const [ViewTutor_Cat04_Opt01, setViewTutor_Cat04_Opt01] = useState(false)

  const [Tutor_Cat05_Opt01, setTutor_Cat05_Opt01] =
    useState('生徒のパソコンの不具合')
  const [ViewTutor_Cat05_Opt01, setViewTutor_Cat05_Opt01] = useState(false)

  const [Tutor_Cat06_Opt01, setTutor_Cat06_Opt01] =
    useState('生徒のwifi調子が悪い')
  const [ViewTutor_Cat06_Opt01, setViewTutor_Cat06_Opt01] = useState(false)

  const [Student_Cat01_Opt01, setStudent_Cat01_Opt01] =
    useState('Zoomリンクが切れてる')
  const [ViewStudent_Cat01_Opt01, setViewStudent_Cat01_Opt01] = useState(false)

  const [Student_Cat02_Opt01, setStudent_Cat02_Opt01] = useState('先生が来ない')
  const [ViewStudent_Cat02_Opt01, setViewStudent_Cat02_Opt01] = useState(false)

  const [Student_Cat03_Opt01, setStudent_Cat03_Opt01] =
    useState('先生の声が聞こえない')
  const [ViewStudent_Cat03_Opt01, setViewStudent_Cat03_Opt01] = useState(false)

  const [Student_Cat04_Opt01, setStudent_Cat04_Opt01] =
    useState('先生の顔が見えない')
  const [ViewStudent_Cat04_Opt01, setViewStudent_Cat04_Opt01] = useState(false)

  const [Student_Cat05_Opt01, setStudent_Cat05_Opt01] =
    useState('先生のパソコンの不具合')
  const [ViewStudent_Cat05_Opt01, setViewStudent_Cat05_Opt01] = useState(false)

  const [Student_Cat06_Opt01, setStudent_Cat06_Opt01] =
    useState('先生のwifi調子が悪い')
  const [ViewStudent_Cat06_Opt01, setViewStudent_Cat06_Opt01] = useState(false)

  const [Action_Cat01_Opt01, setAction_Cat01_Opt01] = useState('')
  const [ViewAction_Cat01_Opt01, setViewAction_Cat01_Opt01] = useState('')

  const [Action_Cat02_Opt01, setAction_Cat02_Opt01] = useState('待機中')
  const [ViewAction_Cat02_Opt01, setViewAction_Cat02_Opt01] = useState(false)

  const [Action_Cat03_Opt01_01, setAction_Cat03_Opt01_01] =
    useState('ヘッドセットチェック中')
  const [ViewAction_Cat03_Opt01_01, setViewAction_Cat03_Opt01_01] =
    useState(false)

  const [Action_Cat03_Opt01_02, setAction_Cat03_Opt01_02] =
    useState('Zoom入り直し中')
  const [ViewAction_Cat03_Opt01_02, setViewAction_Cat03_Opt01_02] =
    useState(false)

  const [Action_Cat04_Opt01_01, setAction_Cat04_Opt01_01] =
    useState('ヘッドセットチェック中')
  const [ViewAction_Cat04_Opt01_01, setViewAction_Cat04_Opt01_01] =
    useState(false)

  const [Action_Cat04_Opt01_02, setAction_Cat04_Opt01_02] =
    useState('Zoom入り直し中')
  const [ViewAction_Cat04_Opt01_02, setViewAction_Cat04_Opt01_02] =
    useState(false)

  const [Action_Cat05_Opt01_01, setAction_Cat05_Opt01_01] =
    useState('パソコン再起動中')
  const [ViewAction_Cat05_Opt01_01, setViewAction_Cat05_Opt01_01] =
    useState(false)

  // const [Action_Cat05_Opt01_02, setAction_Cat05_Opt01_02] =
  //   useState('生徒：パソコン再起動中')

  const [ViewAction_Cat05_Opt01_02, setViewAction_Cat05_Opt01_02] =
    useState(false)

  const [Action_Cat06_Opt01_01, setAction_Cat06_Opt01_01] =
    useState('Wifi再起動中')
  const [ViewAction_Cat06_Opt01_01, setViewAction_Cat06_Opt01_01] =
    useState(false)

  // const [Action_Cat06_Opt01_02, setAction_Cat06_Opt01_02] =
  //   useState('生徒：Wifi再起動中')

  const [ViewAction_Cat06_Opt01_02, setViewAction_Cat06_Opt01_02] =
    useState(false)

  const [Result_Cat01_OK, setResult_Cat01_OK] = useState('&#9711;')
  const [ViewResult_Cat01_OK, setViewResult_Cat01_OK] = useState(false)
  const [Result_Cat01_NOBUTSTART, setResult_Cat01_NOBUTSTART] =
    useState('&#9651;')
  const [ViewResult_Cat01_NOBUTSTART, setViewResult_Cat01_NOBUTSTART] =
    useState(false)
  const [Result_Cat01_NO, setResult_Cat01_NO] = useState('&#10005;')
  const [ViewResult_Cat01_NO, setViewResult_Cat01_NO] = useState(false)

  const [Result_Cat02_OK, setResult_Cat02_OK] = useState('&#9711;')
  const [ViewResult_Cat02_OK, setViewResult_Cat02_OK] = useState(false)
  const [Result_Cat02_NO, setResult_Cat02_NO] = useState('&#10005;')
  const [ViewResult_Cat02_NO, setViewResult_Cat02_NO] = useState(false)

  const [Result_Cat02_NOBUTSTART, setResult_Cat02_NOBUTSTART] =
    useState('&#9651;')
  const [ViewResult_Cat02_NOBUTSTART, setViewResult_Cat02_NOBUTSTART] =
    useState(false)
  const [Result_Cat02_EndWaiting, setResult_Cat02_EndWaiting] =
    useState('待機後終了 No Show')
  const [ViewResult_Cat02_EndWaiting, setViewResult_Cat02_EndWaiting] =
    useState(false)

  const [Result_Cat03_OK, setResult_Cat03_OK] = useState('&#9711;')
  const [ViewResult_Cat03_OK, setViewResult_Cat03_OK] = useState(false)
  const [Result_Cat03_NO, setResult_Cat03_NO] = useState('&#10005;')
  const [ViewResult_Cat03_NO, setViewResult_Cat03_NO] = useState(false)
  const [Result_Cat03_NOBUTSTART, setResult_Cat03_NOBUTSTART] =
    useState('&#9651;')
  const [ViewResult_Cat03_NOBUTSTART, setViewResult_Cat03_NOBUTSTART] =
    useState(false)

  const [Result_Cat04_OK, setResult_Cat04_OK] = useState('&#9711;')
  const [ViewResult_Cat04_OK, setViewResult_Cat04_OK] = useState(false)
  const [Result_Cat04_NO, setResult_Cat04_NO] = useState('&#10005;')
  const [ViewResult_Cat04_NO, setViewResult_Cat04_NO] = useState(false)
  const [Result_Cat04_NOBUTSTART, setResult_Cat04_NOBUTSTART] =
    useState('&#9651;')
  const [ViewResult_Cat04_NOBUTSTART, setViewResult_Cat04_NOBUTSTART] =
    useState(false)

  const [Result_Cat05_OK, setResult_Cat05_OK] = useState('&#9711;')
  const [ViewResult_Cat05_OK, setViewResult_Cat05_OK] = useState(false)
  const [Result_Cat05_NO, setResult_Cat05_NO] = useState('&#10005;')
  const [ViewResult_Cat05_NO, setViewResult_Cat05_NO] = useState(false)
  const [Result_Cat05_NOBUTSTART, setResult_Cat05_NOBUTSTART] =
    useState('&#9651;')
  const [ViewResult_Cat05_NOBUTSTART, setViewResult_Cat05_NOBUTSTART] =
    useState(false)

  const [Result_Cat06_OK, setResult_Cat06_OK] = useState('&#9711;')
  const [ViewResult_Cat06_OK, setViewResult_Cat06_OK] = useState(false)
  const [Result_Cat06_NO, setResult_Cat06_NO] = useState('&#10005;')
  const [ViewResult_Cat06_NO, setViewResult_Cat06_NO] = useState(false)
  const [Result_Cat06_NOBUTSTART, setResult_Cat06_NOBUTSTART] =
    useState('&#9651;')
  const [ViewResult_Cat06_NOBUTSTART, setViewResult_Cat06_NOBUTSTART] =
    useState(false)
  const functionFinishThisLesson = (newstatus) => {
    // alert(nextnextWeekday('MON'))
    setNewLesson(true)
    setIsFinishThisLesson(false)

    var url = DB_CONN_URL + '/finish-show-and-tell-lesson-year-plan/'

    var newstatus = newstatus
    var Url = url + mbn + '&' + homework_id + '&' + newstatus

    const fetchData = async () => {
      try {
        // alert('1')
        axios.get(Url).then((response) => {
          // alert('2')
          // alert(response.data.status)
          // alert(response.data.message)
          // alert('weekday' + response.data.weekday)
          // alert(response.data.new_homework_id)
          // alert(response.data.mbn)
          // alert(response.data.name_eng)
          // alert(response.data.teacher_barcode_num)
          // alert(response.data.teacher_name_eng)
          // alert(response.data.showandtell_outline_limit_words)
          // alert(response.data.showandtell_script_limit_words)
          // alert('next_weekdate' + response.data.next_weekdate)
          // alert(response.data.newYoyakuTime)
          // alert(response.data.duringTime)
          // alert(response.data.NowRegdate)
          // alert(response.data.NowRegtime)
          // alert('next_weekdate' + response.data.next_weekdate)
          // alert('newYoyakuTime' + response.data.newYoyakuTime)
        })
      } catch (error) {
        console.log(error)
        alert('error1')
      }
    }

    fetchData()
    if (newstatus == 'finished') {
      setIsSuccessSetNewLesson(true)
    } else if (newstatus == 'no show') {
      setIsNoshowAndSuccessSetNewLesson(true)
    }
  }

  return (
    <>
      {/* <MediaQuery query="(min-width: 767px)"> */}
      <center>
        <div
          className="col-lg-12 col-md-12"
          style={{ backgroundColor: 'white', fontSize: '20px' }}
        >
          <div>
            <span className="btn btn-info ml-2 mt-2 mb-3">All Fine</span>
            &nbsp;&nbsp;
            <span
              className="btn btn-info ml-2 mt-2 mb-3"
              onClick={() => {
                setEndView(!endView)
              }}
            >
              解決できずレッスンを終了する
            </span>
            &nbsp;&nbsp;
            <span
              className="btn btn-info ml-2 mt-2 mb-3"
              // style={{ fontSize: '18px' }}
              onClick={() => {
                // setViewResult_Cat02_EndWaiting(!ViewResult_Cat02_EndWaiting)
                setIsNoShow(true)
                setNewLesson(true)
              }}
              dangerouslySetInnerHTML={{
                __html: Result_Cat02_EndWaiting,
              }}
            >
              {/* 待機後終了 */}
            </span>
            <div
              className="col-lg-12 col-md-12 p-3"
              style={{
                width: '100%',
                display: endView ? 'block' : 'none',
              }}
            >
              <textarea
                row="10"
                style={{ width: '500px' }}
                placeholder=" 終了理由"
              >
                test
              </textarea>
              <br />
              <button className="btn btn-danger">管理者へ報告</button>
            </div>
          </div>
          <table className="table table-bordered table-dark">
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th scope="col" style={{ width: '10%' }}>
                  <span
                    className="btn btn-primary"
                    style={{ fontSize: '17px' }}
                  >
                    状況更新
                  </span>
                </th>
                <th scope="col">Student</th>
                <th scope="col">Tutor</th>
                <th scope="col">先生/管理者の対策</th>
                <th scope="col" style={{ width: '12%' }}>
                  結果報告
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Zoomに入れない</th>
                <td>
                  <span
                    className="btn btn-info ml-2"
                    style={{ fontSize: '20px' }}
                    onClick={(setViewTutor_Cat01_Opt01) => {
                      !ViewTutor_Cat01_Opt01
                    }}
                  >
                    {Tutor_Cat01_Opt01}
                  </span>
                </td>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    Zoomリンクが切れてる
                  </span>
                </td>
                <td>
                  <span
                    className="btn btn-danger ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    管理者が確認中
                  </span>
                </td>
                <th scope="col">
                  {/* ###1 */}
                  {ViewResult_Cat01_OK ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{
                        width: '50px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                      onClick={() => {
                        setViewResult_Cat01_OK(!ViewResult_Cat01_OK)
                      }}
                      dangerouslySetInnerHTML={{ __html: Result_Cat01_OK }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{
                        width: '50px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                      onClick={() => {
                        setViewResult_Cat01_OK(!ViewResult_Cat01_OK)
                      }}
                      dangerouslySetInnerHTML={{ __html: Result_Cat01_OK }}
                    ></span>
                  )}
                  &nbsp;
                  {ViewResult_Cat01_NOBUTSTART ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{
                        width: '50px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                      onClick={() => {
                        setViewResult_Cat01_NOBUTSTART(
                          !ViewResult_Cat01_NOBUTSTART
                        )
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat01_NOBUTSTART,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{
                        width: '50px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                      onClick={() => {
                        setViewResult_Cat01_NOBUTSTART(
                          !ViewResult_Cat01_NOBUTSTART
                        )
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat01_NOBUTSTART,
                      }}
                    ></span>
                  )}
                  &nbsp;
                  {ViewResult_Cat01_NO ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{
                        width: '50px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                      onClick={() => {
                        setViewResult_Cat01_NO(!ViewResult_Cat01_NO)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat01_NO,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{
                        width: '50px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                      onClick={() => {
                        setViewResult_Cat01_NO(!ViewResult_Cat01_NO)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat01_NO,
                      }}
                    ></span>
                  )}
                </th>
              </tr>
              <tr>
                <th scope="row">生徒が来ない</th>
                <td> </td>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    生徒が来ない/待機中
                  </span>
                </td>
                <td>
                  <span
                    className="btn btn-danger ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    管理者が連絡中
                  </span>
                </td>
                <th scope="col">
                  {/* ###2 */}
                  {ViewResult_Cat02_OK ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat02_OK(!ViewResult_Cat02_OK)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat02_OK,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat02_OK(!ViewResult_Cat02_OK)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat02_OK,
                      }}
                    ></span>
                  )}
                  &nbsp;
                  {ViewResult_Cat02_NOBUTSTART ? (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat02_NOBUTSTART(
                          !ViewResult_Cat02_NOBUTSTART
                        )
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat02_NOBUTSTART,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat02_NOBUTSTART(
                          !ViewResult_Cat02_NOBUTSTART
                        )
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat02_NOBUTSTART,
                      }}
                    ></span>
                  )}
                  &nbsp;
                  {ViewResult_Cat02_NO ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat02_NO(!ViewResult_Cat02_NO)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat02_NO,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat02_NO(!ViewResult_Cat02_NO)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat02_NO,
                      }}
                    ></span>
                  )}
                </th>
              </tr>

              <tr>
                <th scope="row">声が聞こえない</th>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    生徒の声が聞こえない
                  </span>
                </td>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    先生の声が聞こえない
                  </span>
                </td>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    ヘッドセットチェック中
                  </span>
                  <br />
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    Zoom入り直し中
                  </span>
                </td>
                <th scope="col">
                  {/* ###3 */}
                  {ViewResult_Cat03_OK ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat03_OK(!ViewResult_Cat03_OK)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat03_OK,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat03_OK(!ViewResult_Cat03_OK)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat03_OK,
                      }}
                    ></span>
                  )}
                  &nbsp;
                  {ViewResult_Cat03_NOBUTSTART ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat03_NOBUTSTART(
                          !ViewResult_Cat03_NOBUTSTART
                        )
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat03_NOBUTSTART,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat03_NOBUTSTART(
                          !ViewResult_Cat03_NOBUTSTART
                        )
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat03_NOBUTSTART,
                      }}
                    ></span>
                  )}
                  &nbsp;
                  {ViewResult_Cat03_NO ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat03_NO(!ViewResult_Cat03_NO)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat03_NO,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat03_NO(!ViewResult_Cat03_NO)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat03_NO,
                      }}
                    ></span>
                  )}
                </th>
              </tr>
              <tr>
                <th scope="row">顔が見えない</th>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    生徒の顔が見えない
                  </span>
                </td>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    先生の顔が見えない
                  </span>
                </td>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    ヘッドセットチェック中
                  </span>
                  <br />
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    Zoom入り直し中
                  </span>
                </td>
                <th scope="col">
                  {/* ###4 */}
                  {ViewResult_Cat04_OK ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat04_OK(!ViewResult_Cat04_OK)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat04_OK,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat04_OK(!ViewResult_Cat04_OK)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat04_OK,
                      }}
                    ></span>
                  )}
                  &nbsp;
                  {ViewResult_Cat04_NOBUTSTART ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat04_NOBUTSTART(
                          !ViewResult_Cat04_NOBUTSTART
                        )
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat04_NOBUTSTART,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat04_NOBUTSTART(
                          !ViewResult_Cat04_NOBUTSTART
                        )
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat04_NOBUTSTART,
                      }}
                    ></span>
                  )}
                  &nbsp;
                  {ViewResult_Cat04_NO ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat04_NO(!ViewResult_Cat04_NO)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat04_NO,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat04_NO(!ViewResult_Cat04_NO)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat04_NO,
                      }}
                    ></span>
                  )}
                </th>
              </tr>
              <tr>
                <th scope="row">パソコンの不具合</th>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    生徒のパソコンの不具合
                  </span>
                </td>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    先生のパソコンの不具合
                  </span>
                </td>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    パソコン再起動中
                  </span>
                </td>
                <th scope="col">
                  {/* ###5 */}
                  {ViewResult_Cat05_OK ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat05_OK(!ViewResult_Cat05_OK)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat05_OK,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat05_OK(!ViewResult_Cat05_OK)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat05_OK,
                      }}
                    ></span>
                  )}
                  &nbsp;
                  {ViewResult_Cat05_NOBUTSTART ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat05_NOBUTSTART(
                          !ViewResult_Cat05_NOBUTSTART
                        )
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat05_NOBUTSTART,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat05_NOBUTSTART(
                          !ViewResult_Cat05_NOBUTSTART
                        )
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat05_NOBUTSTART,
                      }}
                    ></span>
                  )}
                  &nbsp;
                  {ViewResult_Cat05_NO ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat05_NO(!ViewResult_Cat05_NO)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat05_NO,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat05_NO(!ViewResult_Cat05_NO)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat05_NO,
                      }}
                    ></span>
                  )}
                </th>
              </tr>
              <tr>
                <th scope="row">Wifi問題</th>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    生徒のwifi調子が悪い
                  </span>
                </td>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    先生のwifi調子が悪い
                  </span>
                </td>
                <td>
                  <span
                    className="btn btn-info ml-2 mt-1"
                    style={{ fontSize: '20px' }}
                  >
                    Wifi 再起動中
                  </span>
                </td>
                <th scope="col">
                  {/* ###6 */}
                  {ViewResult_Cat06_OK ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat06_OK(!ViewResult_Cat06_OK)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat06_OK,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat06_OK(!ViewResult_Cat06_OK)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat06_OK,
                      }}
                    ></span>
                  )}
                  &nbsp;
                  {ViewResult_Cat06_NOBUTSTART ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat06_NOBUTSTART(
                          !ViewResult_Cat06_NOBUTSTART
                        )
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat06_NOBUTSTART,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat06_NOBUTSTART(
                          !ViewResult_Cat06_NOBUTSTART
                        )
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat06_NOBUTSTART,
                      }}
                    ></span>
                  )}
                  &nbsp;
                  {ViewResult_Cat06_NO ? (
                    <span
                      className="btn btn-danger ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat06_NO(!ViewResult_Cat06_NO)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat06_NO,
                      }}
                    ></span>
                  ) : (
                    <span
                      className="btn btn-info ml-2 mt-1"
                      style={{ width: '50px', fontSize: '20px' }}
                      onClick={() => {
                        setViewResult_Cat06_NO(!ViewResult_Cat06_NO)
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Result_Cat06_NO,
                      }}
                    ></span>
                  )}
                </th>
              </tr>
            </tbody>
          </table>
          <span
            className="btn btn-danger ml-1 mt-3 mb-3"
            style={{ fontSize: '20px' }}
          >
            [緊急ボタン] その他解決できない不具合の場合にクリック
          </span>
        </div>
      </center>
      <SweetAlert
        title="[No Show] Press yes to confirm"
        show={isNoShow}
        onConfirm={() => functionFinishThisLesson('no show')}
        onCancel={() => {
          setIsNoShow(false)
        }}
        confirmBtnText="Yes"
        cancelBtnText="No"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      ></SweetAlert>
    </>
  )
}

export default ViewTrouble
