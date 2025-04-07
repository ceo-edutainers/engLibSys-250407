import React from 'react'
// import Navbar from '../components/_App/Navbar';
//import PageBanner from '../components/Common/PageBanner'
// import Footer from '../components/_App/Footer';
import Link from 'next/link'

const Metacognition = () => {
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      {/* <PageBanner
        pageTitle="Courses List 01"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Courses List 01"
      /> */}
      {/* <div className="feedback-with-bg-image ptb-70 jarallax"> */}
      <div
        className="courses-area ptb-70"
        style={{ backgroundColor: '#ffcc66' }}
      >
        <div className="container">
          <div className="section-title mb-3" style={{ marginBottom: 0 }}>
            <span className="sub-title">
              engLib's Metacognition Study Method
            </span>
            <h2 style={{ color: '#333300' }}>メタ認知式英感習得メソッド</h2>
          </div>
          <div>
            <p style={{ color: '#333300' }}>
              「メタ認知式学習法」をご存知ですか？生徒が自分自身を客観視することで、間違いや知らなかったことに気づき、理解し、行動していくことを促す教育法です。イングリブでは、この理念を大切にし、長年の経験と研究を通して、私たちがたどり着いた最適なカリキュラム『メタ認知式英感習得メソッド』を提唱しています。独自開発のイングリブオンライン学習システムを基盤とした『インプットプログラム』と『アウトプットプログラム』において、それぞれの生徒の「メタ認知力」に働きかける様々な仕組みを取り入れています。
            </p>
          </div>

          <div className="edemy-grid-sorting row align-items-center"></div>

          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  {/* <div className="col-lg-2 col-md-4">
                    <div className="courses-image">
                      <img
                        src="/images/success-people/success-people1.jpg"
                        alt="image"
                      />

                      <Link href="#">
                        <a className="link-btn"></a>
                      </Link>
                    </div>
                  </div> */}

                  <div className="col-lg-12 col-md-12">
                    <div className="courses-content">
                      {/* <a href="#" className="fav">
                        <i className="flaticon-heart"></i>
                      </a> */}

                      <h3 style={{ fontWeight: 500, color: 'red' }}>
                        英感を育てるため英語知識の絶対量を正しく楽しく増やす『インプットプログラム』
                      </h3>
                      <span>
                        正しい英語感覚を身につけるための基礎である、正しい音源を聞きながら自分のレベルに合った本を音読する（インテンシブリーディング）習慣をつけます。生徒はリーディングを通して、新しい単語や表現に出会い、習慣化することで英語感覚を得ていきます。また、シャドーイングも取り入れ、生徒は発音やイントネーションの真似をすることが楽しくなり、日本語にない母音も自然に吸収していきます。また、毎週のレッスンでは、イングリブの『メタ認知式教育法』を熟知したバイリンガルの先生が生徒自身の気づきを促すような問いかけをすることにより、インプットを確実にしていきます。また、英語初心者の生徒さんにはフォニックスからスタートし、簡単な本がすぐに読めるようになります。
                      </span>
                      {/* <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i> Input Course Z
                          受講中
                        </li>
                        <li>
                          <i className="flaticon-people"></i> read more
                        </li>
                      </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  {/* <div className="col-lg-2 col-md-4">
                    <div className="courses-image">
                      <img
                        src="/images/success-people/success-people2.jpg"
                        alt="image"
                      />

                      <Link href="#">
                        <a className="link-btn"></a>
                      </Link>
                    </div>
                  </div> */}

                  <div className="col-lg-12 col-md-12">
                    <div className="courses-content">
                      {/* <a href="#" className="fav">
                        <i className="flaticon-heart"></i>
                      </a> */}

                      <h3 style={{ fontWeight: 500, color: 'red' }}>
                        十分なインプット量になったらアカデミックな英語力を目指そう『アウトプットプログラム』
                      </h3>
                      <span>
                        インプットしてきた知識を使って自分自身の文章を作成してアウトプットしていきます。『アウトプットプログラム』初心者の生徒さんは、Show
                        and
                        Tellコースで、自分が話してみたいトピックを選び、マインドマップ、アウトライン、作文を作成していきます。週1回ネイティブの先生と１対１レッスンで自分の作品を発表し、先生と一緒にリアルタイム添削で直していきます。また、少しレベルが高い生徒さんには、Discussionコースを用意しています。Discussionコースでは、世界的に有名なTED
                        EDUCATIONの教育ビデオを教材として使用し、毎週生徒さんが選択した1本のビデオについてネイティブの先生と英語のみで自分の考え方を発表し、リアルタイム添削をしてもらいます。
                      </span>
                      {/* <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i> Input Course A
                          受講中
                        </li>
                        <li>
                          <i className="flaticon-people"></i> read more
                        </li>
                      </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  {/* <div className="col-lg-2 col-md-4">
                    <div className="courses-image">
                      <img
                        src="/images/success-people/success-people3.jpg"
                        alt="image"
                      />

                      <Link href="#">
                        <a className="link-btn"></a>
                      </Link>
                    </div>
                  </div> */}

                  <div className="col-lg-12 col-md-12">
                    <div className="courses-content">
                      {/* <a href="#" className="fav">
                        <i className="flaticon-heart"></i>
                      </a> */}

                      <h3 style={{ fontWeight: 500, color: 'red' }}>
                        生徒の積極的学習習慣を促すイングリブ独自開発オンライン学習システム
                      </h3>
                      <span>
                        『メタ認知式教育法』を基本として、生徒の学習行動を促進するオンライン学習システムを独自開発しています。これは、生徒の学習モチベーションを高める様々な仕組み、メタ認知に働きかけて正しい知識を生徒の脳に長期記憶としてインプットする仕組みなど、課題やレッスンの際に使用するプラットフォームです。
                      </span>
                      {/* <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i> Input Course B
                          受講中
                        </li>
                        <li>
                          <i className="flaticon-people"></i> read more
                        </li>
                      </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <center>
            <Link href="/authentication">
              <a className="default-btn" style={{ backgroundColor: '#96be25' }}>
                <i className="flaticon-user"></i>
                サクセスストーリーをもっと見る<span></span>
              </a>
            </Link>
          </center> */}
        </div>
      </div>

      {/* <Footer /> */}
    </React.Fragment>
  )
}

export default Metacognition
