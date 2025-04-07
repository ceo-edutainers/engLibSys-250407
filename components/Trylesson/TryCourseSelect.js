import React, { useState, useEffect } from 'react'
//import EPubViewer from '@/components/EPubViewer/EPubViewer'
import Router, { useRouter } from 'next/router'
import AllPages from '@/components/PdfViewer/allPages'
import SinglePage from '@/components/PdfViewer/singlePage'
import PdfViewer from '@/components/PdfViewer/PdfViewer'

//import Link from 'next/link'
import axios from 'axios'
import Link from 'next/link'
import LevelTest from '@/components/LevelTest/LevelTest'

const TryCourseSelect = () => {
  const router = useRouter() //使い方：router.replace('/')

  const [book1, setBook1] = useState('/files/book1.pdf')
  const [book1View, setBook1View] = useState(false)
  const [book2, setBook2] = useState('./book-pdf/book2.pdf')
  const [book2View, setBook2View] = useState(false)
  const [book3, setBook3] = useState('./book-pdf/book3.pdf')
  const [book3View, setBook3View] = useState(false)
  const [book4, setBook4] = useState('./book-pdf/book4.pdf')
  const [book4View, setBook4View] = useState(false)
  const [book5, setBook5] = useState('./book-pdf/book5.pdf')
  const [book5View, setBook5View] = useState(false)
  const regBtnMessage =
    'サンプル本がすらすら読めなかったらこのボタンを押して無料体験を申し込む'

  const [tryCourse, setTryCourse] = useState('') //input or output
  const [tryCourseName, setTryCourseName] = useState('') //input or output
  const [tryLevel, setTryLevel] = useState('') // book level

  function nextPage(course, courseName, level) {
    setTryCourse(course)
    setTryCourseName(courseName)
    setTryLevel(level)
    localStorage.setItem('tryCourse', course)
    localStorage.setItem('tryCourseName', courseName)
    localStorage.setItem('tryLevel', level)
    router.replace('/try-reg') // ここでリダイレクト
  }

  return (
    <React.Fragment>
      {/* <Navbar /> */}
      {/* <PageBanner
        pageTitle="Courses List 01"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Courses List 01"
      /> */}

      {/* <EPubViewer epubUrl="https://gerhardsletten.github.io/react-reader/files/alice.epub" /> */}

      <div
        className="courses-area ptb-100 bg-f5f7fa"
        style={{ padding: '50px 15px' }}
      >
        <div className="container">
          <div className="edemy-grid-sorting row align-items-center">
            <div className="col-lg-12 col-md-6" style={{ textAlign: 'center' }}>
              <div className="courses-content">
                <h2 style={{ fontWeight: 900 }}>インプットコースの体験登録</h2>

                <p>
                  年齢や学校に関係なく英語力で当てはまるボックスをクリックして登録に進んでください。
                  <br />
                  よく分からない場合には、サンプル本を読んでから判断してください。
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  <div
                    className="col-lg-2 col-md-2"
                    style={{ padding: '15px' }}
                  >
                    <div className="courses-image">
                      <img
                        src="/images/courses-small/courses-small2.jpg"
                        alt="image"
                      />
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-5 pl-3">
                    <h6>
                      <i className="flaticon-heart"></i>&nbsp;
                      英語を習ったことが一度もない
                    </h6>
                    <h6>
                      <i className="flaticon-heart"></i>&nbsp;
                      英語学習経験1年未満で、簡単な絵本がまだ読めない
                    </h6>
                    <h6 style={{ marginTop: '10px' }}>
                      <i className="flaticon-heart"></i>&nbsp;
                      次のサンプル本がすらすら読めない
                    </h6>
                  </div>
                  <div
                    className="col-lg-2 col-md-2 mt-1 mb-1"
                    style={{ textAlign: 'center' }}
                  >
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setBook1View(!book1View)
                      }}
                    >
                      サンプル本を読む
                    </button>
                  </div>
                  <div
                    className="col-lg-3 col-md-3 mt-1 mb-1 pb-2"
                    style={{ textAlign: 'center' }}
                  >
                    <button
                      onClick={() => {
                        nextPage('Input', 'CourseRT', 'Level1')
                      }}
                      className="btn-lg btn-primary"
                      style={{ fontSize: '12px' }}
                    >
                      {regBtnMessage}
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="single-courses-item"
                style={{ display: book1View == false ? 'none' : '' }}
              >
                <SinglePage pdf={book1} />
              </div>
              <div className="col-lg-12" style={{ textAlign: 'center' }}>
                <h7 style={{ fontWeight: '600', color: 'darkgreen' }}>
                  サンプルの本がすらすら読めたら下のレベルをチャレンジしてね！
                </h7>
                <h1 style={{ fontWeight: '600', color: 'darkgreen' }}>
                  &#9759;
                </h1>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  <div
                    className="col-lg-2 col-md-2"
                    style={{ padding: '15px' }}
                  >
                    <div className="courses-image">
                      <img
                        src="/images/courses-small/courses-small2.jpg"
                        alt="image"
                      />
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-5 pl-3">
                    <h6>
                      <i className="flaticon-heart"></i>&nbsp;
                      英検５級に受かってる
                    </h6>

                    <h6 style={{ marginTop: '10px' }}>
                      <i className="flaticon-heart"></i>&nbsp;
                      次のサンプル本がすらすら読めない
                    </h6>
                  </div>
                  <div
                    className="col-lg-2 col-md-2 mt-1 mb-1"
                    style={{ textAlign: 'center' }}
                  >
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setBook2View(!book2View)
                      }}
                    >
                      サンプル本を読む
                    </button>
                  </div>
                  <div
                    className="col-lg-3 col-md-3 mt-1 mb-1 pb-2"
                    style={{ textAlign: 'center' }}
                  >
                    <a href="">
                      <button
                        className="btn-lg btn-primary"
                        style={{ fontSize: '12px' }}
                      >
                        {regBtnMessage}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div style={{ display: book2View == false ? 'none' : '' }}>
                ここが見える
              </div>
              <div
                className="single-courses-item"
                style={{ display: book2View == false ? 'none' : '' }}
              >
                <SinglePage pdf={book2} />
              </div>
              <div className="col-lg-12" style={{ textAlign: 'center' }}>
                <h7 style={{ fontWeight: '600', color: 'darkgreen' }}>
                  サンプルの本がすらすら読めたら下のレベルをチャレンジしてね！
                </h7>
                <h1 style={{ fontWeight: '600', color: 'darkgreen' }}>
                  &#9759;
                </h1>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  <div
                    className="col-lg-2 col-md-2"
                    style={{ padding: '15px' }}
                  >
                    <div className="courses-image">
                      <img
                        src="/images/courses-small/courses-small2.jpg"
                        alt="image"
                      />
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-5 pl-3">
                    <h6>
                      <i className="flaticon-heart"></i>&nbsp;
                      英検４〜３級に受かってる
                    </h6>

                    <h6 style={{ marginTop: '10px' }}>
                      <i className="flaticon-heart"></i>&nbsp;
                      次のサンプル本がすらすら読めない
                    </h6>
                  </div>
                  <div
                    className="col-lg-2 col-md-2 mt-1 mb-1"
                    style={{ textAlign: 'center' }}
                  >
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setBook3View(!book3View)
                      }}
                    >
                      サンプル本を読む
                    </button>
                  </div>
                  <div
                    className="col-lg-3 col-md-3 mt-1 mb-1 pb-2"
                    style={{ textAlign: 'center' }}
                  >
                    <a href="">
                      <button
                        className="btn-lg btn-primary"
                        style={{ fontSize: '12px' }}
                      >
                        {regBtnMessage}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="single-courses-item"
                style={{ display: book3View == false ? 'none' : '' }}
              >
                <SinglePage pdf={book3} />
              </div>
              <div className="col-lg-12" style={{ textAlign: 'center' }}>
                <h7 style={{ fontWeight: '600', color: 'darkgreen' }}>
                  サンプルの本がすらすら読めたら下のレベルをチャレンジしてね！
                </h7>
                <h1 style={{ fontWeight: '600', color: 'darkgreen' }}>
                  &#9759;
                </h1>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  <div
                    className="col-lg-2 col-md-2"
                    style={{ padding: '15px' }}
                  >
                    <div className="courses-image">
                      <img
                        src="/images/courses-small/courses-small2.jpg"
                        alt="image"
                      />
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-5 pl-3">
                    <h6>
                      <i className="flaticon-heart"></i>&nbsp;
                      英検3級〜準２級レベルに受かってる
                    </h6>

                    <h6 style={{ marginTop: '10px' }}>
                      <i className="flaticon-heart"></i>&nbsp;
                      次のサンプル本がすらすら読めない
                    </h6>
                  </div>
                  <div
                    className="col-lg-2 col-md-2 mt-1 mb-1"
                    style={{ textAlign: 'center' }}
                  >
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setBook4View(!book4View)
                      }}
                    >
                      サンプル本を読む
                    </button>
                  </div>
                  <div
                    className="col-lg-3 col-md-3 mt-1 mb-1 pb-2"
                    style={{ textAlign: 'center' }}
                  >
                    <a href="">
                      <button
                        className="btn-lg btn-primary"
                        style={{ fontSize: '12px' }}
                      >
                        {regBtnMessage}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="single-courses-item"
                style={{ display: book4View == false ? 'none' : '' }}
              >
                <SinglePage pdf={book4} />
              </div>
              <div className="col-lg-12" style={{ textAlign: 'center' }}>
                <h7 style={{ fontWeight: '600', color: 'darkgreen' }}>
                  サンプルの本がすらすら読めたら下のレベルをチャレンジしてね！
                </h7>
                <h1 style={{ fontWeight: '600', color: 'darkgreen' }}>
                  &#9759;
                </h1>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  <div
                    className="col-lg-2 col-md-2"
                    style={{ padding: '15px' }}
                  >
                    <div className="courses-image">
                      <img
                        src="/images/courses-small/courses-small2.jpg"
                        alt="image"
                      />
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-5 pl-3">
                    <h6>
                      <i className="flaticon-heart"></i>&nbsp;
                      英検2級に受かってる
                    </h6>

                    <h6 style={{ marginTop: '10px' }}>
                      <i className="flaticon-heart"></i>&nbsp;
                      次のサンプル本がすらすら読めない
                    </h6>
                  </div>
                  <div
                    className="col-lg-2 col-md-2 mt-1 mb-1"
                    style={{ textAlign: 'center' }}
                  >
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setBook5View(!book5View)
                      }}
                    >
                      サンプル本を読む
                    </button>
                  </div>
                  <div
                    className="col-lg-3 col-md-3 mt-1 mb-1 pb-2"
                    style={{ textAlign: 'center' }}
                  >
                    <a href="">
                      <button
                        className="btn-lg btn-primary"
                        style={{ fontSize: '12px' }}
                      >
                        {regBtnMessage}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="single-courses-item"
                style={{ display: book5View == false ? 'none' : '' }}
              >
                <SinglePage pdf={book5} />
              </div>
              <div className="col-lg-12" style={{ textAlign: 'center' }}>
                <h7 style={{ fontWeight: '600', color: 'darkgreen' }}>
                  サンプルの本がすらすら読めたらアウトプットコースをお勧めします！
                </h7>
                <h1 style={{ fontWeight: '600', color: 'darkgreen' }}>
                  &#9759;
                </h1>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  <div
                    className="col-lg-2 col-md-2"
                    style={{ padding: '15px' }}
                  >
                    <div className="courses-image">
                      <img
                        src="/images/courses-small/courses-small2.jpg"
                        alt="image"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 pl-3">
                    <h6 style={{ fontWeight: '600' }}>
                      <i className="flaticon-heart"></i>&nbsp;
                      英検準１級〜１級に受かってる
                    </h6>
                    <h7 style={{ fontSize: '13px', fontWeight: '500' }}>
                      このレベルの生徒さんはインプットコースを受けるより、
                      最初からアウトプットコースの体験を申し込むことをお勧めします。
                    </h7>
                  </div>

                  <div
                    className="col-lg-6 col-md-6 mt-1 mb-1 pb-2"
                    style={{ textAlign: 'right' }}
                  >
                    <a href="">
                      <button
                        className="btn-lg btn-info"
                        style={{
                          fontSize: '24px',
                          height: '100px',
                          paddingRight: '20px',
                          paddingLeft: '20px',
                          fontWeight: '500',
                        }}
                      >
                        アウトプットコースの体験を申し込む
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  )
}

export default TryCourseSelect
