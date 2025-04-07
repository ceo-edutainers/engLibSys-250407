import React from 'react'
import Link from 'next/link'

const UpcomingEvents = () => {
  return (
    <div className="events-area bg-fffaf3 pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">子供英語教育・メタ認知学習方など</span>
          <h2>無料レッスン・セミナー・イベント</h2>
          <p>
            親が知ることで子供を正しくサポートすることができます。engLibの創業者/CEO・ミンジェさんが伝える親のための無料オンラインセミナーが
            毎週Zoomで開かれます。
          </p>
          <div className="courses-info">
            <Link href="/categories">
              <a className="default-btn" style={{ backgroundColor: '#4a9dfe' }}>
                <i className="flaticon-user"></i> 全てのセミナー・イベントを見る
                <span></span>
              </a>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-sm-6 col-md-6">
            <div className="single-events-box">
              <div className="image">
                <span className="dateTop_apply">第1期募集中</span>
                <Link href="#">
                  <a className="d-block">
                    <img src="/images/events/events1.jpg" alt="image" />
                  </a>
                </Link>
                <span className="date">毎週 月水金 午後3時半〜20分間</span>
              </div>

              <div className="content">
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>
                  <Link href="#">
                    <a>親子フォニックスオンライン無料講座</a>
                  </Link>
                </h3>
                <p>
                  小学校低学年まで英語の本が読めない子供がいない日本を作ることを目標にしてます。
                  まだレッスンに参加できない年齢の子供や、いつかイングリブのレッスンに参加したいと
                  思っている英語初心者(小学生まで)のための無料フォニックスのグループレッスンを毎週３回やっています。
                  親子で参加する20分の無料レッスンで我が子が英語の本が読めるようになる奇跡を体験してください。
                </p>
                <span className="location">
                  <i className="bx bx-map"></i> 対象：親子参加(4歳〜小6)
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 col-md-6">
            <div className="single-events-box">
              <div className="image">
                <span className="dateTop_zoom">zoom live</span>
                <Link href="#">
                  <a className="d-block">
                    <img src="/images/events/events2.jpg" alt="image" />
                  </a>
                </Link>
                <span className="date">毎火曜 夜8時~(約１時間)</span>
              </div>

              <div className="content">
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>
                  <Link href="#">
                    <a>
                      いつか我が子にイングリブを始めさせたいと考える親のための説明会
                    </a>
                  </Link>
                </h3>
                <span className="location">
                  <i className="bx bx-map"></i>対象：ママ・パパ
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 col-md-6">
            <div className="single-events-box">
              <div className="image">
                <span className="dateTop_zoom">zoom live</span>
                <Link href="#">
                  <a className="d-block">
                    <img src="/images/events/events4.jpg" alt="image" />
                  </a>
                </Link>
                <span className="date">毎水曜 夜8時~(約１時間)</span>
              </div>

              <div className="content">
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>
                  <Link href="#">
                    <a>これだけ知りたい！アウトプットコース専用の説明会</a>
                  </Link>
                </h3>
                <span className="location">
                  <i className="bx bx-map"></i>対象：ママ・パパ
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-md-6">
            <div className="single-events-box">
              <div className="image">
                <span className="dateTop_zoom">zoom live</span>
                <Link href="#">
                  <a className="d-block">
                    <img src="/images/events/events3.jpg" alt="image" />
                  </a>
                </Link>
                <span className="date">毎水曜 夜8時~(約１時間)</span>
              </div>

              <div className="content">
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>
                  <Link href="#">
                    <a>成績上位１％の秘密：メタ認知学習法の秘密をばらす会！</a>
                  </Link>
                </h3>
                <span className="location">
                  <i className="bx bx-map"></i>対象：ママ・パパ
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 col-md-6">
            <div className="single-events-box">
              <div className="image">
                <span className="dateTop_video">video</span>
                <Link href="#">
                  <a className="d-block">
                    <img src="/images/events/events7.jpg" alt="image" />
                  </a>
                </Link>
                <span className="date">2021・10/17 土曜日 午後8時〜</span>
              </div>

              <div className="content">
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>
                  <a href="#">
                    これだけ知っとくと、我が子の英語教育に失敗はなし！
                  </a>
                </h3>

                <span className="location">
                  <i className="bx bx-map"></i>対象：ママ・パパ
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 col-md-6">
            <div className="single-events-box">
              <div className="image">
                <span className="dateTop_zoom">zoom live</span>
                <Link href="#">
                  <a className="d-block">
                    <img src="/images/events/events5.jpg" alt="image" />
                  </a>
                </Link>
                <span className="date">2021・10/17 土曜日 午後8時〜</span>
              </div>

              <div className="content">
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>
                  <Link href="#">
                    <a>洋書の絵本読み聞かせ会</a>
                  </Link>
                </h3>

                <span className="location">
                  <i className="bx bx-map"></i>対象：親子
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 col-md-6">
            <div className="single-events-box">
              <div className="image">
                <span className="dateTop_zoom">zoom live</span>
                <Link href="#">
                  <a className="d-block">
                    <img src="/images/events/events6.jpg" alt="image" />
                  </a>
                </Link>
                <span className="date">2021・10/17 土曜日 午後8時〜</span>
              </div>

              <div className="content">
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>
                  <Link href="#">
                    <a>
                      CEOミンジェさんに直接聞く・我が子の英語習得なんでも質問会
                    </a>
                  </Link>
                </h3>
                <span className="location">
                  <i className="bx bx-map"></i>対象：ママ、パパ
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 col-md-6">
            <div className="single-events-box">
              <div className="image">
                <span className="dateTop_blog">CEO blog</span>
                <Link href="#">
                  <a className="d-block">
                    <img src="/images/events/events6.jpg" alt="image" />
                  </a>
                </Link>
                <span className="date">2021・10/17 土曜日 午後8時〜</span>
              </div>

              <div className="content">
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>
                  <Link href="#">
                    <a>
                      CEOミンジェさんに直接聞く・我が子の英語習得なんでも質問会
                    </a>
                  </Link>
                </h3>
                <span className="location">
                  <i className="bx bx-map"></i>対象：ママ、パパ
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 col-md-6">
            <div className="single-events-box">
              <div className="image">
                <span className="dateTop_blog">engLib blog</span>
                <Link href="#">
                  <a className="d-block">
                    <img src="/images/events/events6.jpg" alt="image" />
                  </a>
                </Link>
                <span className="date">2021・10/17 土曜日 午後8時〜</span>
              </div>

              <div className="content">
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>
                  <Link href="#">
                    <a>
                      CEOミンジェさんに直接聞く・我が子の英語習得なんでも質問会
                    </a>
                  </Link>
                </h3>
                <span className="location">
                  <i className="bx bx-map"></i>対象：ママ、パパ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingEvents
