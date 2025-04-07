import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faTrash,
  faLockOpen,
  faArrowCircleRight,
  faArrowAltCircleRight,
  faCircle,
  faArrowCircleDown,
} from '@fortawesome/free-solid-svg-icons'
const YouMightLikeTheCourses = () => {
  return (
    <div className="courses-area bg-f8f9f8 pt-70 pb-70">
      <span id="input"></span>
      <div className="container">
        <div className="section-title">
          <h2>インプットプログラムの詳細</h2>
          <p>Input Program</p>
          <div className="section-sub-title pt-2 ">
            <center>
              <h5>
                英語のベースを作るための基本プログラム・まずはこのプログラムから
              </h5>
              <FontAwesomeIcon icon={faArrowCircleDown} size="3x" color="red" />
            </center>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="single-courses-box">
              <div className="courses-image">
                <Link href="/single-courses-1">
                  <a className="d-block image">
                    <img src="/images/courses/courses1.jpg" alt="image" />
                  </a>
                </Link>

                <div
                  className="price shadow"
                  style={{ width: '170px', backgroundColor: '#18AAF5' }}
                >
                  ¥12,320
                  <span
                    style={{
                      fontSize: '14px',
                    }}
                  >
                    (税込)
                  </span>
                </div>
              </div>
              <div className="courses-content pt-5">
                <div className="course-author d-flex align-items-center">
                  <img
                    src="/images/book-round-blackcat1.jpg"
                    className="rounded-circle"
                    alt="image"
                  />
                  <span>ブラックキャット名作シリーズ</span>
                </div>
                <h3 className="mb-0 pb-0">
                  <Link href="/single-courses-1">
                    <a>
                      <h5>
                        <b>インプットプログラム</b>
                      </h5>
                      <h1
                        style={{
                          color: 'red',
                          fontWeight: '900',
                          fontSize: '30px',
                        }}
                      >
                        READING A
                      </h1>
                    </a>
                  </Link>
                </h3>
                <i
                  className="flaticon-people "
                  style={{ color: 'red', fontSize: '12px' }}
                ></i>
                &nbsp; 1:1 Online 25分：月3~4回(年45回)
                <hr />
                <ul style={{ paddingLeft: 0, fontSize: '12px' }}>
                  <li>対象：英語初心者〜英検4級程度の生徒さん</li>
                  <li>年齢：年中〜中学生[おすすめ]</li>
                  <li>レッスン日：年間45回(月3~4回)の25分レッスン</li>
                  <li>[その他費用]&nbsp;教材費: 月々(約800~1,000円程度)</li>
                  <li>
                    [その他費用]&nbsp;課題システム利用料：{' '}
                    <span
                      style={{
                        textDecoration: 'line-through 1px solid red',
                      }}
                    >
                      ¥4,400(月々)
                    </span>
                    <br />
                    <font color="red">(今ならずっと¥1,500)</font>
                  </li>
                </ul>
                <hr />
                <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                  <b>特徴</b>
                  <br />
                  ここに特徴を書きます。
                </p>
                <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                  <b>どんな生徒さんが受ける？</b>
                  <br />
                  インプットコースを受けながらアウトプットも同時にやっていきたい生徒さん。月2回なのでリーディングコースを受けながら課題も問題なくこなすことができます。
                </p>
                <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                  <li>
                    <i className="flaticon-agenda"></i> このプログラムの詳細
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-courses-box">
              <div className="courses-image">
                <Link href="/single-courses-1">
                  <a className="d-block image">
                    <img src="/images/courses/courses2.jpg" alt="image" />
                  </a>
                </Link>

                <div
                  className="price shadow"
                  style={{ width: '170px', backgroundColor: '#A63AF4' }}
                >
                  ¥12,320
                  <span
                    style={{
                      fontSize: '14px',
                    }}
                  >
                    (税込)
                  </span>
                </div>
              </div>
              <div className="courses-content pt-5">
                <div className="course-author d-flex align-items-center">
                  <img
                    src="/images/book-round-rt1.jpg"
                    className="rounded-circle"
                    alt="image"
                  />
                  <span>アメリカリーディング教科書</span>
                </div>
                <h3 className="mb-0 pb-0">
                  <Link href="/single-courses-1">
                    <a>
                      <h5>
                        <b>インプットプログラム</b>
                      </h5>
                      <h1
                        style={{
                          color: 'red',
                          fontWeight: '900',
                          fontSize: '30px',
                        }}
                      >
                        READING B
                      </h1>
                    </a>
                  </Link>
                </h3>
                <i
                  className="flaticon-people "
                  style={{ color: 'red', fontSize: '12px' }}
                ></i>
                &nbsp; 1:1 Online 25分：月3~4回(年45回)
                <hr />
                <ul style={{ paddingLeft: 0, fontSize: '12px' }}>
                  <li>対象：英語初心者〜英検4級程度の生徒さん</li>
                  <li>年齢：年中〜中学生[おすすめ]</li>
                  <li>レッスン日：年間45回(月3~4回)の25分レッスン</li>
                  <li>[その他費用]&nbsp;教材費: 月々(約800~1,000円程度)</li>
                  <li>
                    [その他費用]&nbsp;課題システム利用料：{' '}
                    <span
                      style={{
                        textDecoration: 'line-through 1px solid red',
                      }}
                    >
                      ¥4,400(月々)
                    </span>
                    <br />
                    <font color="red">(今ならずっと¥1,500)</font>
                  </li>
                </ul>
                <hr />
                <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                  <b>特徴</b>
                  <br />
                  ここに特徴を書きます。
                </p>
                <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                  <b>どんな生徒さんが受ける？</b>
                  <br />
                  インプットコースを受けながらアウトプットも同時にやっていきたい生徒さん。月2回なのでリーディングコースを受けながら課題も問題なくこなすことができます。
                </p>
                <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                  <li>
                    <i className="flaticon-agenda"></i> このプログラムの詳細
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-courses-box">
              <div className="courses-image">
                <Link href="/single-courses-1">
                  <a className="d-block image">
                    <img src="/images/courses/courses2.jpg" alt="image" />
                  </a>
                </Link>

                <div
                  className="price shadow"
                  style={{ width: '170px', backgroundColor: '#FB2988' }}
                >
                  ¥12,320
                  <span
                    style={{
                      fontSize: '14px',
                    }}
                  >
                    (税込)
                  </span>
                </div>
              </div>
              <div className="courses-content pt-5">
                <div className="course-author d-flex align-items-center">
                  <img
                    src="/images/book-round-ort1.jpg"
                    className="rounded-circle"
                    alt="image"
                  />
                  <span>Oxford Reading Tree</span>
                </div>
                <h3 className="mb-0 pb-0">
                  <Link href="/single-courses-1">
                    <a>
                      <h5>
                        <b>インプットプログラム</b>
                      </h5>
                      <h1
                        style={{
                          color: 'red',
                          fontWeight: '900',
                          fontSize: '30px',
                        }}
                      >
                        READING Z
                      </h1>
                    </a>
                  </Link>
                </h3>
                <i
                  className="flaticon-people "
                  style={{ color: 'red', fontSize: '12px' }}
                ></i>
                &nbsp; 1:1 Online 25分：月3~4回(年45回)
                <hr />
                <ul style={{ paddingLeft: 0, fontSize: '12px' }}>
                  <li>対象：英語初心者〜英検4級程度の生徒さん</li>
                  <li>年齢：年中〜中学生[おすすめ]</li>
                  <li>[その他費用]&nbsp;レッスン日：年間45回の25分レッスン</li>
                  <li>
                    [その他費用]&nbsp;教材費：¥990円(月々)-eBook(千冊収録)
                  </li>
                  <li>
                    課題システム利用料：{' '}
                    <span
                      style={{ textDecoration: 'line-through 1px solid red' }}
                    >
                      ¥2,200(月々)
                    </span>
                    <br />
                    <font color="red">(今ならずっと¥550)</font>
                  </li>
                </ul>
                <hr />
                <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                  <b>特徴</b>
                  <br />
                  ここに特徴を書きます。
                </p>
                <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                  <b>どんな生徒さんが受ける？</b>
                  <br />
                  インプットコースを受けながらアウトプットも同時にやっていきたい生徒さん。月2回なのでリーディングコースを受けながら課題も問題なくこなすことができます。
                </p>
                <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                  <li>
                    <i className="flaticon-agenda"></i> このプログラムの詳細
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* アウトプットプログラム START */}
        <span id="output"></span>
        <div
          className="courses-area bg-f8f9f8 pt-100 pb-0"
          //   style={{ backgroundColor: 'white' }}
        >
          <div className="container">
            <div className="section-title pt-5">
              <h2>アウトプットプログラムの詳細</h2>
              <p>Output Program</p>
              <div className="section-sub-title pt-2 ">
                <center>
                  <h5>
                    今までのインプットをベースに上手に話したい・書きたいと思う方はこちら
                  </h5>
                  <FontAwesomeIcon
                    icon={faArrowCircleDown}
                    size="3x"
                    color="red"
                  />
                </center>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="single-courses-box">
                  <div className="courses-image">
                    <Link href="/single-courses-1">
                      <a className="d-block image">
                        <img src="/images/courses/courses2.jpg" alt="image" />
                      </a>
                    </Link>

                    <div
                      className="price shadow"
                      style={{ width: '170px', backgroundColor: '#18AAF5' }}
                    >
                      ¥8,580~
                      <span
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        (税込)
                      </span>
                    </div>
                  </div>
                  <div className="courses-content pt-5">
                    {/* <div className="course-author d-flex align-items-center">
                      <img
                        src="/images/output-price-icon-showandtell.jpg"
                        className="rounded-circle"
                        alt="image"
                      />

                      <span>SHOW AND TELL</span>
                    </div> */}
                    <h3 className="mb-0 pb-0">
                      <Link href="/single-courses-1">
                        <a>
                          <h5>
                            <b> アウトプットプログラム</b>
                          </h5>

                          <h1
                            style={{
                              color: 'red',
                              fontWeight: '900',
                              fontSize: '26px',
                              marginBottom: 0,
                              paddingBottom: 0,
                            }}
                          >
                            SHOW AND TELL-25
                          </h1>
                        </a>
                      </Link>
                    </h3>
                    <p style={{ fontSize: '12px' }}>ショーアンドテル</p>
                    <p>
                      <i
                        className="flaticon-people "
                        style={{ color: 'red', fontSize: '12px' }}
                      ></i>
                      &nbsp; 1:1 Online <b>25分</b>：月2回から4回
                      <hr />
                    </p>
                    <ul style={{ paddingLeft: 0, fontSize: '12px' }}>
                      <li>対象：対象：英検３級以上の生徒さん</li>
                      <li>年齢：年中〜中学生[おすすめ]</li>
                      <li>レッスン日：月2回25分レッスン</li>
                      <li>[その他費用]&nbsp;教材費: なし</li>
                      <li>
                        [その他費用]&nbsp;課題システム利用料：{' '}
                        <span
                          style={{
                            textDecoration: 'line-through 1px solid red',
                          }}
                        >
                          ¥4,400(月々)
                        </span>
                        <br />
                        <font color="red">(今ならずっと¥1,500)</font>
                      </li>
                    </ul>
                    <hr />
                    <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                      <b>特徴</b>
                      <br />
                      ここに特徴を書きます。
                    </p>
                    <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                      <b>どんな生徒さんが受ける？</b>
                      <br />
                      インプットコースを受けながらアウトプットも同時にやっていきたい生徒さん。月2回なのでリーディングコースを受けながら課題も問題なくこなすことができます。
                    </p>
                    <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                      <li>
                        <i className="flaticon-agenda"></i> このプログラムの詳細
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="single-courses-box">
                  <div className="courses-image">
                    <Link href="/single-courses-1">
                      <a className="d-block image">
                        <img src="/images/courses/courses2.jpg" alt="image" />
                      </a>
                    </Link>

                    <div
                      className="price shadow"
                      style={{ width: '170px', backgroundColor: '#A63AF4' }}
                    >
                      ¥14,520~
                      <span
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        (税込)
                      </span>
                    </div>
                  </div>
                  <div className="courses-content pt-5">
                    {/* <div className="course-author d-flex align-items-center text-center">
                      <img
                        src="/images/output-price-icon-showandtell.jpg"
                        className="rounded-circle"
                        alt="image"
                      />
                      <span>SHOW AND TELL</span>
                    </div> */}
                    <h3 className="mb-0 pb-0">
                      <Link href="/single-courses-1">
                        <a>
                          <h5>
                            <b> アウトプットプログラム</b>
                          </h5>

                          <h1
                            style={{
                              color: 'red',
                              fontWeight: '900',
                              fontSize: '26px',
                            }}
                          >
                            SHOW AND TELL-50
                          </h1>
                        </a>
                      </Link>
                    </h3>{' '}
                    <p style={{ fontSize: '12px' }}>ショーアンドテル</p>
                    <p>
                      <i
                        className="flaticon-people "
                        style={{ color: 'red', fontSize: '12px' }}
                      ></i>
                      &nbsp; 1:1 Online <b>50分</b>：月2回から4回
                      <hr />
                    </p>
                    <ul style={{ paddingLeft: 0, fontSize: '12px' }}>
                      <li>対象：対象：英検３級以上の生徒さん</li>
                      <li>年齢：年中〜中学生[おすすめ]</li>
                      <li>レッスン日：月4回25分レッスン</li>
                      <li>[その他費用]&nbsp;教材費: なし</li>
                      <li>
                        [その他費用]&nbsp;課題システム利用料：{' '}
                        <span
                          style={{
                            textDecoration: 'line-through 1px solid red',
                          }}
                        >
                          ¥4,400(月々)
                        </span>
                        <br />
                        <font color="red">(今ならずっと¥1,500)</font>
                      </li>
                    </ul>
                    <hr />
                    <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                      <b>特徴</b>
                      <br />
                      ここに特徴を書きます。
                    </p>
                    <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                      <b>どんな生徒さんが受ける？</b>
                      <br />
                      インプットコースを受けながらアウトプットも同時にやっていきたい生徒さん。月2回なのでリーディングコースを受けながら課題も問題なくこなすことができます。
                    </p>
                    <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                      <li>
                        <i className="flaticon-agenda"></i> このプログラムの詳細
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="single-courses-box">
                  <div className="courses-image">
                    <Link href="/single-courses-1">
                      <a className="d-block image">
                        <img src="/images/courses/courses2.jpg" alt="image" />
                      </a>
                    </Link>

                    <div
                      className="price shadow"
                      style={{ width: '170px', backgroundColor: '#FB2988' }}
                    >
                      ¥17,050~
                      <span
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        (税込)
                      </span>
                    </div>
                  </div>
                  <div className="courses-content pt-5">
                    {/* <div className="course-author d-flex align-items-center">
                      <img
                        src="/images/output-price-icon-discussion.jpg"
                        className="rounded-circle"
                        alt="image"
                      />
                      <span>TED-Ed DISCUSSION</span>
                    </div> */}
                    <h3 className="mb-0 pb-0">
                      <Link href="/single-courses-1">
                        <a>
                          <h5>
                            <b> アウトプットプログラム</b>
                          </h5>

                          <h1
                            style={{
                              color: 'red',
                              fontWeight: '900',
                              fontSize: '26px',
                            }}
                          >
                            DISCUSSION
                          </h1>
                        </a>
                      </Link>
                    </h3>{' '}
                    <p style={{ fontSize: '12px' }}>ディスカッション</p>
                    <p>
                      <i
                        className="flaticon-people "
                        style={{ color: 'red', fontSize: '12px' }}
                      ></i>
                      &nbsp; 1:1 Online <b>50分</b>：月2回から4回
                      <hr />
                    </p>
                    <ul style={{ paddingLeft: 0, fontSize: '12px' }}>
                      <li>対象：対象：英検３級以上の生徒さん</li>
                      <li>年齢：年中〜中学生[おすすめ]</li>
                      <li>レッスン日：月4回25分レッスン</li>
                      <li>特典：洋書千冊のOxford-ORC-eBookシステム無料利用</li>
                      <li>[その他費用]&nbsp;教材(無料): TED Education Video</li>
                      <li>
                        [その他費用]&nbsp;課題システム利用料：{' '}
                        <span
                          style={{
                            textDecoration: 'line-through 1px solid red',
                          }}
                        >
                          ¥4,400(月々)
                        </span>
                        <br />
                        <font color="red">(今ならずっと¥1,500)</font>
                      </li>
                    </ul>
                    <hr />
                    <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                      <b>特徴</b>
                      <br />
                      ここに特徴を書きます。
                    </p>
                    <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                      <b>どんな生徒さんが受ける？</b>
                      <br />
                      インプットコースを受けながらアウトプットも同時にやっていきたい生徒さん。月2回なのでリーディングコースを受けながら課題も問題なくこなすことができます。
                    </p>
                    <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                      <li>
                        <i className="flaticon-agenda"></i> このプログラムの詳細
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* サポートプログラム START */}
        <div
          className="courses-area bg-f8f9f8 pt-100 pb-70"
          //   style={{ backgroundColor: 'white' }}
        >
          <div className="container">
            <div className="section-title pt-5">
              <span id="support"></span>
              <h2>サポートプログラムの詳細</h2>
              <p>Support Program</p>
              <div className="section-sub-title pt-2 ">
                <center>
                  <h5>自分の弱いところをもっと強化したい方はこちらへ</h5>
                  <FontAwesomeIcon
                    icon={faArrowCircleDown}
                    size="3x"
                    color="red"
                  />
                </center>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="single-courses-box">
                  <div className="courses-image">
                    <Link href="/single-courses-1">
                      <a className="d-block image">
                        <img src="/images/courses/courses2.jpg" alt="image" />
                      </a>
                    </Link>

                    <div
                      className="price shadow"
                      style={{ width: '170px', backgroundColor: '#18AAF5' }}
                    >
                      ¥8,580~
                      <span
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        (税込)
                      </span>
                    </div>
                  </div>
                  <div className="courses-content pt-5">
                    {/* <div className="course-author d-flex align-items-center">
                      <img
                        src="/images/output-price-icon-showandtell.jpg"
                        className="rounded-circle"
                        alt="image"
                      />

                      <span>SHOW AND TELL</span>
                    </div> */}
                    <h3 className="mb-0 pb-0">
                      <Link href="/single-courses-1">
                        <a>
                          <h5>
                            <b> サポートプログラム</b>
                          </h5>

                          <h1
                            style={{
                              color: 'red',
                              fontWeight: '900',
                              fontSize: '26px',
                              marginBottom: 0,
                              paddingBottom: 0,
                            }}
                          >
                            <span
                              style={{ fontWeight: '600', fontSize: '20px' }}
                            >
                              英検サポート
                            </span>
                          </h1>
                        </a>
                      </Link>
                    </h3>
                    <p style={{ fontSize: '12px' }}>EIKEN SUPPORT</p>
                    <p>
                      <i
                        className="flaticon-people "
                        style={{ color: 'red', fontSize: '12px' }}
                      ></i>
                      &nbsp; 1:1 Online <b>25分</b>：年45回
                      <hr />
                    </p>
                    <ul style={{ paddingLeft: 0, fontSize: '12px' }}>
                      <li>対象：対象：英検３級以上の生徒さん</li>
                      <li>年齢：年中〜中学生[おすすめ]</li>
                      <li>レッスン日：年45回・25分レッスン</li>
                      <li>[その他費用]&nbsp;教材費: なし</li>
                    </ul>
                    <hr />
                    <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                      <b>特徴</b>
                      <br />
                      ここに特徴を書きます。
                    </p>
                    <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                      <b>どんな生徒さんが受ける？</b>
                      <br />
                      インプットコースを受けながらアウトプットも同時にやっていきたい生徒さん。月2回なのでリーディングコースを受けながら課題も問題なくこなすことができます。
                    </p>
                    <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                      <li>
                        <i className="flaticon-agenda"></i> このプログラムの詳細
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="single-courses-box">
                  <div className="courses-image">
                    <Link href="/single-courses-1">
                      <a className="d-block image">
                        <img src="/images/courses/courses2.jpg" alt="image" />
                      </a>
                    </Link>

                    <div
                      className="price shadow"
                      style={{ width: '170px', backgroundColor: '#A63AF4' }}
                    >
                      ¥14,520~
                      <span
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        (税込)
                      </span>
                    </div>
                  </div>
                  <div className="courses-content pt-5">
                    {/* <div className="course-author d-flex align-items-center text-center">
                      <img
                        src="/images/output-price-icon-showandtell.jpg"
                        className="rounded-circle"
                        alt="image"
                      />
                      <span>SHOW AND TELL</span>
                    </div> */}

                    <h3 className="mb-0 pb-0">
                      <Link href="/single-courses-1">
                        <a>
                          <h5>
                            <b> サポートプログラム</b>
                          </h5>

                          <h1
                            style={{
                              color: 'red',
                              fontWeight: '900',
                              fontSize: '26px',
                              marginBottom: 0,
                              paddingBottom: 0,
                            }}
                          >
                            <span
                              style={{ fontWeight: '600', fontSize: '20px' }}
                            >
                              学校英語サポート
                            </span>
                          </h1>
                        </a>
                      </Link>
                    </h3>
                    <p style={{ fontSize: '12px' }}>SCHOOL ENGLISH SUPPORT</p>

                    <p>
                      <i
                        className="flaticon-people "
                        style={{ color: 'red', fontSize: '12px' }}
                      ></i>
                      &nbsp; 1:1 Online <b>25分</b>：年45回
                      <hr />
                    </p>
                    <ul style={{ paddingLeft: 0, fontSize: '12px' }}>
                      <li>対象：対象：英検３級以上の生徒さん</li>
                      <li>年齢：年中〜中学生[おすすめ]</li>
                      <li>レッスン日：年45回(月3~4回)25分レッスン</li>
                      <li>[その他費用]&nbsp;教材費: 別途(¥千円程度)</li>
                    </ul>
                    <hr />
                    <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                      <b>特徴</b>
                      <br />
                      ここに特徴を書きます。
                    </p>
                    <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                      <b>どんな生徒さんが受ける？</b>
                      <br />
                      インプットコースを受けながらアウトプットも同時にやっていきたい生徒さん。月2回なのでリーディングコースを受けながら課題も問題なくこなすことができます。
                    </p>
                    <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                      <li>
                        <i className="flaticon-agenda"></i> このプログラムの詳細
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="single-courses-box">
                  <div className="courses-image">
                    <Link href="/single-courses-1">
                      <a className="d-block image">
                        <img src="/images/courses/courses2.jpg" alt="image" />
                      </a>
                    </Link>

                    <div
                      className="price shadow"
                      style={{ width: '170px', backgroundColor: '#FB2988' }}
                    >
                      ¥17,050~
                      <span
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        (税込)
                      </span>
                    </div>
                  </div>
                  <div className="courses-content pt-5">
                    {/* <div className="course-author d-flex align-items-center">
                      <img
                        src="/images/output-price-icon-discussion.jpg"
                        className="rounded-circle"
                        alt="image"
                      />
                      <span>TED-Ed DISCUSSION</span>
                    </div> */}
                    <h3 className="mb-0 pb-0">
                      <Link href="/single-courses-1">
                        <a>
                          <h5>
                            <b> サポートプログラム</b>
                          </h5>

                          <h1
                            style={{
                              color: 'red',
                              fontWeight: '900',
                              fontSize: '26px',
                              marginBottom: 0,
                              paddingBottom: 0,
                            }}
                          >
                            <span
                              style={{ fontWeight: '600', fontSize: '20px' }}
                            >
                              英文法サポート
                            </span>
                          </h1>
                        </a>
                      </Link>
                    </h3>

                    <p style={{ fontSize: '12px' }}>GRAMMAR SUPPORT</p>
                    <p>
                      <i
                        className="flaticon-people "
                        style={{ color: 'red', fontSize: '12px' }}
                      ></i>
                      &nbsp; 1:1 Online <b>25分</b>：年45回
                      <hr />
                    </p>
                    <ul style={{ paddingLeft: 0, fontSize: '12px' }}>
                      <li>対象：対象：英検３級以上の生徒さん</li>
                      <li>年齢：年中〜中学生[おすすめ]</li>
                      <li>レッスン日：月4回(月3~4回)25分レッスン</li>
                      <li>[その他費用]&nbsp;教材(無料): TED Education Video</li>
                    </ul>
                    <hr />
                    <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                      <b>特徴</b>
                      <br />
                      ここに特徴を書きます。
                    </p>
                    <p style={{ fontSize: '12px', paddingLeft: 0 }}>
                      <b>どんな生徒さんが受ける？</b>
                      <br />
                      インプットコースを受けながらアウトプットも同時にやっていきたい生徒さん。月2回なのでリーディングコースを受けながら課題も問題なくこなすことができます。
                    </p>
                    <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                      <li>
                        <i className="flaticon-agenda"></i> このプログラムの詳細
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <center>
          <div className="courses-info">
            <Link href="#input">
              <a className="default-btn" style={{ backgroundColor: '#4a9dfe' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/* <i className="flaticon-top"></i> */}
                TOPへ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </a>
            </Link>
          </div>
          <div className="courses-info">
            <Link href="/">
              <a className="default-btn" style={{ backgroundColor: '#4a9dfe' }}>
                <i className="flaticon-home"></i> ホームページへ
              </a>
            </Link>
          </div>
        </center>
      </div>
    </div>
  )
}

export default YouMightLikeTheCourses
