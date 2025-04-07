import React from 'react'
// import Navbar from '../components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner'
import Link from 'next/link'
// import Footer from '../components/_App/Footer';
import BlogSidebar from '@/components/Blog/BlogSidebar'
// import CommentArea from '@/components/Blog/CommentFormEnglib'
import dynamic from 'next/dynamic'
// import NavbarEnglib from '@/components/_App/NavbarEnglib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
// const OwlCarousel = dynamic(import('react-owl-carousel3'))

const options = {
  loop: true,
  nav: true,
  dots: false,
  autoplayHoverPause: true,
  autoplay: true,
  animateOut: 'fadeOut',
  items: 1,
  navText: [
    "<i className='flaticon-chevron'></i>",
    "<i className='flaticon-right-arrow'></i>",
  ],
}

const BlogDetails = () => {
  const [display, setDisplay] = React.useState(false)

  React.useEffect(() => {
    setDisplay(true)
  }, [])

  return (
    <React.Fragment>
      {/* <NavbarEnglib /> */}

      <div className="blog-details-area pt-100">
        <div className="container">
          <div className="section-title">
            <h2>成功体験インタビュー</h2>
            <span className="sub-title" style={{ fontWeight: '500' }}>
              Interview for Success Story
            </span>
            <br />
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="blog-details-desc">
                <div className="article-content">
                  <blockquote
                    className="block-quote mb-5"
                    style={{
                      backgroundColor: '#F2D8E1',
                      textAlign: 'left',
                    }}
                  >
                    <h1 style={{ fontSize: '20px', fontWeight: '600' }}>
                      インターナショナルスクール小学３年生保護者（イングリブ歴：小学１年生〜）
                    </h1>
                    <h4 style={{ fontSize: '16px' }}>
                      <p>
                        <b>英語学習歴</b>
                      </p>

                      <ul>
                        <li>
                          年少〜現在：海外在住経験なしインターナショナルスクール
                        </li>
                        <li>小学１年〜イングリブのインプットプログラム</li>
                      </ul>
                    </h4>
                  </blockquote>
                </div>

                <div className="comments-area mt-0 pt-0">
                  <ol className="comment-list">
                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-meta">
                          <div className="comment-author vcard">
                            <img
                              src="/images/icon-a-discussion.png"
                              className="avatar"
                              alt="image"
                            />
                            <b className="fn">
                              イングリブを始めたきっかけは何ですか？
                            </b>
                          </div>
                        </div>

                        <div className="comment-content">
                          <p>
                            よく英語のシャワーを浴びると自然に英語ができるようになると言うので、年少からインターナショナルスクールに通わせはじめました。始めの頃は子供も少し喋れるようになったと感じたのですが、年長になった頃から本を読める子との差が出始めました。学校では子供がどんなレベルの本を読んでいるのか、よくわからずにいました。そんな時、5000冊以上の子供向け洋書と音源を所有する英語図書館を運営していたイングリブを見つけました。イングリブでまず自分の子供のレベルをチェックしてもらい、そのレベルに合った本を紹介してもらいました。それがきっかけでインプットプログラムでインテンシブ・リーディングとシャドーイングの学習をするようになり、小学３年生になった今も続けています。ちなみに娘はイングリブを始めて3ヶ月で学校のESLコースを卒業することができ、今ではチャプターブックを読み、学年トップのリーディングレベルと評されています。
                          </p>
                        </div>
                      </div>
                    </li>

                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-meta">
                          <div className="comment-author vcard">
                            <img
                              src="/images/icon-a-discussion.png"
                              className="avatar"
                              alt="image"
                            />
                            <b className="fn">
                              イングリブではどのような学習をしていますか？
                            </b>
                          </div>
                        </div>

                        <div className="comment-content">
                          <p>
                            インターナショナルスクールで音を聞き取る力はある程度あったのですが、インプットプログラムでインターナショナルスクールで使用している教材を読んだり書いたりすることでリーディングレベルがアップしました。また、サイエンスビデオのディクテーションもやるようになり、そこで自分自身の間違いを発見したことで、学校の課題で自分の意見を書く際にも文章力がついたと先生から褒められるようになりました。
                          </p>
                        </div>
                      </div>
                    </li>

                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-meta">
                          <div className="comment-author vcard">
                            <img
                              src="/images/icon-a-discussion.png"
                              className="avatar"
                              alt="image"
                            />
                            <b className="fn">
                              イングリブを続けていて良かったと思ったことは何ですか？
                            </b>
                          </div>
                        </div>

                        <div className="comment-content">
                          <p>
                            イングリブでは、日本にいながら耳と目から正しい英語感覚を生徒それぞれのレベルに合った内容で効率的にインプットしていき、ただの英語のシャワーで終わらないことです。子供にとって少し難しいと感じるレベルの単語や表現をどんどんインプットしていくことで語彙力、表現力が確実に磨かれていると感じています。インターで日常会話レベルだった娘が、友達が知らないような単語も知っていることが自信となり、積極的にクラスで自分の考えを発言するようにもなりました。どんな環境でも正しくインプットし続けることで子供は成長するのだとイングリブから教えてもらえました。
                          </p>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>

                {/* 2番目 */}
                <div className="article-content">
                  <blockquote
                    className="wp-block-quote mb-5"
                    style={{ backgroundColor: '#D8DFF2', textAlign: 'left' }}
                  >
                    <h1 style={{ fontSize: '20px', fontWeight: '600' }}>
                      公立小学校小学６年生保護者（イングリブ歴：小学３年生〜）
                    </h1>
                    <h4 style={{ fontSize: '16px' }}>
                      <p>
                        <b>英語学習歴</b>
                      </p>

                      <ul>
                        <li>年少〜週1回英会話教室 年長〜英語塾</li>
                        <li> 小学３年生〜イングリブのインプットプログラム</li>
                      </ul>
                    </h4>
                  </blockquote>
                </div>
                <div className="comments-area mt-2 pt-0">
                  <ol className="comment-list">
                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-meta">
                          <div className="comment-author vcard">
                            <img
                              src="/images/icon-a-discussion.png"
                              className="avatar"
                              alt="image"
                            />
                            <b className="fn">
                              イングリブを始めたきっかけは何ですか？
                            </b>
                          </div>
                        </div>

                        <div className="comment-content">
                          <p>
                            イングリブの説明会に参加して、代表のミンジェ先生のお話しに刺激を受け、うちの子もできるかもしれないと思うようになったことがきっかけです。説明会で、先生は、言語習得に重要な子供の貴重なこの時期に正しい情報をインプットし、その量を圧倒的に増やしていくことで普通の公立校に通っている日本人の子供でもバイリンガルになり得ると話してくれました。私たち夫婦は普通の日本の教育を受け、使える英語を学べてこなかったという後悔もあり、子供に同じ思いをさせたくないと英語塾や英会話教室を転々とさせていました。しかし、それでは全くその場凌ぎでした。本当に使える英語感覚を身につけるための効果あるノウハウをイングリブは持っています。始めてすぐに子供が綺麗な発音で音読をし始めたときはびっくりしました。
                          </p>
                        </div>
                      </div>
                    </li>

                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-meta">
                          <div className="comment-author vcard">
                            <img
                              src="/images/icon-a-discussion.png"
                              className="avatar"
                              alt="image"
                            />
                            <b className="fn">
                              イングリブではどのような学習をしていますか？
                            </b>
                          </div>
                        </div>

                        <div className="comment-content">
                          <p>
                            イングリブはこれまでの英会話教室や英語塾とは違い、本を読むこと、音の真似をすることから始める斬新な英語教育法を提供してくれます。自分一人でただ頑張っていくのとは違い、子供のレベルと状況に応じた学習カリキュラムを先生が提案してくれ、またそれを子供自身がモチベーションを保ってやっていくための細やかな仕組みが提供され、週一回の担当の先生とのレッスンの後は、子供は新しい語彙を覚えて嬉しそうにしています。過去３年間インプットプログラムで語彙力をつけ、今後はアウトプットプログラムでインプットしてきたものを自分の言葉で文章にすることにもチャレンジさせていくつもりです。
                          </p>
                        </div>
                      </div>
                    </li>

                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-meta">
                          <div className="comment-author vcard">
                            <img
                              src="/images/icon-a-discussion.png"
                              className="avatar"
                              alt="image"
                            />
                            <b className="fn">
                              イングリブを続けていて良かったと思ったことは何ですか？
                            </b>
                          </div>
                        </div>

                        <div className="comment-content">
                          <p>
                            イングリブでは、子供にたくさん間違えさせ、その間違いに気づき、それを直すために行動することを勧めていて、子供自身が自分の間違いをどう直していくのかが学びのチャンスになるという捉え方をしてくれます。これをメタ認知力と言うそうですが、子供自身の積極的な姿勢を促すために、毎日の学習を支える様々な仕組みを提供してくれています。週一回の先生とのレッスンを子供は楽しみにしています。また、また、先生と相談をさせてもらい試しに受けさせた英検にも自然な形で合格し、子供の自信にもつながりました。今では、私も子供と一緒にシャドーイングの練習を競争してやるようになり楽しんでいます。私自身も少し発音が上手になったように感じ、英語を学ぶことが楽しくなりました。
                          </p>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="article-content">
                  <blockquote
                    className="wp-block-quote mb-5"
                    style={{ backgroundColor: '#DBF2D8', textAlign: 'left' }}
                  >
                    <h1 style={{ fontSize: '20px', fontWeight: '600' }}>
                      私立大学２年生（イングリブ歴中学１年生〜）
                    </h1>
                    <h4 style={{ fontSize: '16px' }}>
                      <p>
                        <b>英語学習歴</b>
                      </p>

                      <ul>
                        <li>中学１年生〜イングリブのインプットプログラム</li>
                        <li>
                          {' '}
                          高校１年生〜イングリブのインプットプログラム＋アウトプットプログラム（Show
                          and Tellコース)月2回
                        </li>
                        <li>
                          {' '}
                          高校３年生〜イングリブのアウトプットプログラム（Discussion)月4回
                        </li>
                      </ul>
                    </h4>
                  </blockquote>
                </div>
                <div className="comments-area mt-0 pt-0">
                  <ol className="comment-list">
                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-meta">
                          <div className="comment-author vcard">
                            <img
                              src="/images/icon-a-discussion.png"
                              className="avatar"
                              alt="image"
                            />
                            <b className="fn">
                              イングリブを始めたきっかけは何ですか？
                            </b>
                          </div>
                        </div>

                        <div className="comment-content">
                          <p>
                            中学生になり、英語学習を意識するようになったけれど、どうやったら英語を話せるようになるかを考えていました。そんな時、英語の本を綺麗な発音で読んでいるイングリブの小学生に会う機会がありました。その子は海外経験がなくて普通の公立小学校に通っていて、小学校１年生からイングリブで英語学習をしていると言うことでした。私はその姿を目の当たりにして、中学生の私には遅すぎるかもしれないと少し諦めかけていた時、ミンジェ先生がこれからたくさんの文章や表現を音と一緒にインプットしていけばできるようになると言ってくれたのがインプットプログラムに入ったきっかけです。{' '}
                          </p>
                        </div>
                      </div>
                    </li>

                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-meta">
                          <div className="comment-author vcard">
                            <img
                              src="/images/icon-a-discussion.png"
                              className="avatar"
                              alt="image"
                            />
                            <b className="fn">
                              イングリブではどのような学習をしていますか？
                            </b>
                          </div>
                        </div>

                        <div className="comment-content">
                          <p>
                            私は英語を読むことが全くの初めてだったので、フォニックスからスタートしました。フォニックスを始めてすぐに様々な単語が読めるようになり、アメリカの小学生が使っていると言うReading
                            Triumphsの一番簡単な本もすぐに読めるようになりました。音の真似をしながら読めるので、発音がどんどん良くなりました。その後、レベルが上がるにつれて難易度の高いBlack
                            Catシリーズの本を読めるようになり、高校１年生の時はブラックキャットのB2-1まで上がりました。その後は毎週のインプットプログラムでインプット量を増やしながら、月2回自分が話してみたい題材について文章を作成し、ネイティブの先生と25分間１対１で話し合いながら表現を修正してもらうShow
                            and
                            Tellコースを並行して受講しました。高校三年生からは、もっと高度な内容の話題で議論できるようになりたいと思い、ディスカッションコースを月4回受講するようになりました。ディスカッションコースは、一つのトピックビデオを選定してそれについてネイティブの先生と50分間１対１の英語オンリーで議論します。Show
                            and Tell
                            とDiscussionはいずれも、これまでインプットしてきた知識を元に自分自身の考え方を文章にして発表する形でアウトプットするアウトプットプログラムです。レッスン内では自分が発表した内容を先生がリアルタイム添削をしてくれ、自分の間違いをそこで確認し、より良い発表ができる訓練になっています。
                          </p>
                        </div>
                      </div>
                    </li>

                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-meta">
                          <div className="comment-author vcard">
                            <img
                              src="/images/icon-a-discussion.png"
                              className="avatar"
                              alt="image"
                            />
                            <b className="fn">
                              イングリブを続けていて良かったと思ったことは何ですか？
                            </b>
                          </div>
                        </div>

                        <div className="comment-content">
                          <p>
                            私は中一から現在大学１年生になるまでの過去６年間イングリブでお世話になっています。イングリブのカリキュラムはとても効率的に組まれていて、それに沿ってインプットしてきたことで今ではネイティブの方たちと対等に議論をすることもできるようになりました。インプットプログラムのみを受講していた時も、自分自身の間違いを認識して、それを直すと言う一連の過程を学ぶことができ、正しい学習方法も見出すことができ、これによって大学受験への取り組み方も大きく影響を受けたと感じています。現在アウトプットプログラムを月4回受講していますが、新しい表現を先生に提案していただいたり、先生と英語だけで議論ができている、自分の英語がアカデミックに通用していることを実感できていて、自分の自信にもつながりました。中学一年生の時に心配していた発音も、ネイティブの方たちからとても褒められるようになりました。ゆくゆくはアメリカの大学でも自分を試してみたいと思っています。
                          </p>
                        </div>
                      </div>
                    </li>
                  </ol>
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

export default BlogDetails
