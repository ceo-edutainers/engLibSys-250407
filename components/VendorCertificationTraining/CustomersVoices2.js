import React from 'react'
// import Navbar from '../components/_App/Navbar';
//import PageBanner from '../components/Common/PageBanner'
// import Footer from '../components/_App/Footer';
import Link from 'next/link'
import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

const CustomersVoices2 = () => {
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      {/* <PageBanner
        pageTitle="Courses List 01"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Courses List 01"
      /> */}
      <div className="feedback-with-bg-image ptb-70 jarallax">
        {/* <div className="courses-area ptb-70 bg-f5f7fa"> */}
        <div className="container">
          <div className="section-title" style={{ marginBottom: 0 }}>
            <span className="sub-title">engLib's Successful Students</span>
            <h2 style={{ color: 'white' }}>サクセスストーリー</h2>
            <p style={{ color: 'white' }}>
              英語初心者から帰国子女まで様々なバックグラウンドやレベルの生徒さんがイングリブで成功ストーリを作っています。
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

                      <h5 style={{ fontWeight: 500, color: 'red' }}>
                        日本で生まれ育ち、海外経験がないのに、帰国子女に間違われました。
                      </h5>
                      <span>
                        娘は日本で生まれ育ち、公立学校に通っていますが、嬉しかったのは、生徒さんたちと音読の練習をしていた時に他の保護者から帰国子女と間違われたことです。イングリブが提唱している「言語習得に重要な子供時代を逃さず正しく効率的にインプット量を増やす」をできたおかげだと思っています。子供の貴重な時期を逃さず、イングリブのカリキュラムに沿って正しい音を聞きながら音読やシャドーイングの練習を続けているうちに発音がネイティブのようになり、その効果に驚いています。
                      </span>
                      <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i>Miyu保護者
                          公立小学校４年生（イングリブ歴：年長〜）
                        </li>
                        {/* <li>
                          <i className="flaticon-people"></i> read more
                        </li> */}
                      </ul>
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

                      <h5 style={{ fontWeight: 500, color: 'red' }}>
                        英検３級合格しても英語ができていると感じなかった。イングリブで最適な英語学習法にたどり着きました。
                      </h5>
                      <span>
                        小学６年生の時に英検の試験対策本を勉強して３級に合格しましたが、英語を使えるようになった訳ではなかった。イングリブのカリキュラムを通して正しい音を聞きながら楽しくリーディングの練習をするようになり、これまで聞き取れなかったことがいつの間にか理解できるようになった。それと同時に自分でもその表現を使ってみたいと思うようになり、今ではアウトプットプログラムを通して自分自身の意見や考え方を発表する力がついてきていると感じている。
                      </span>
                      <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i>
                          本人、私立中学校３年生（イングリブ歴：中学１年〜）
                        </li>
                        {/* <li>
                          <i className="flaticon-people"></i> read more
                        </li> */}
                      </ul>
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

                      <h5 style={{ fontWeight: 500, color: 'red' }}>
                        アメリカから帰国後、英会話スクールでは進歩せず
                      </h5>
                      <span>
                        息子が幼稚園の時、２年間ほどアメリカに住んでいました。帰国後、公立小学校に通わせながら２年間英会話教室に毎週2回通わせていましたが、日常会話程度の語彙力を維持しているだけで進歩していないことに気がつきました。イングリブでは、普通の英語教室とは違い、アメリカの小学校の国語の授業でも使用している本を使い、子供のレベルに合った形で圧倒的な量の文章や表現を自分のものにしていきました。２年経った今、息子は英検２級にもすんなり合格し、リーディングレベルB2-1で毎週1回新しい題材になるサイエンスビデオのシャドーイングを楽しみにやっています。
                      </span>
                      <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i>
                          Yuki保護者　公立小学校５年生（イングリブ歴：小学校３年生〜）
                        </li>
                        {/* <li>
                          <i className="flaticon-people"></i> read more
                        </li> */}
                      </ul>
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
                        src="/images/success-people/success-people4.jpg"
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

                      <h5 style={{ fontWeight: 500, color: 'red' }}>
                        毎日、本を読む習慣ができたことで英検は自然に受かるものだとイングリブでわかりました。
                      </h5>
                      <span>
                        小学校１年生からイングリブでフォニックスから始めました。すぐに簡単な本が読めるようになり、もっと難しい本が読めるようになりたいと思い、イングリブのプログラムの通りに多読多聴を続けていたら、試し受けてみた英検にすんなり受かってびっくりしました。
                      </span>
                      <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i> Ken保護者
                          公立小学校４年生（イングリブ歴：小学校１年生〜）
                        </li>
                        {/* <li>
                          <i className="flaticon-people"></i> read more
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  <div className="col-lg-12 col-md-12">
                    <div className="courses-content">
                      {/* <a href="#" className="fav">
                        <i className="flaticon-heart"></i>
                      </a> */}

                      <h5 style={{ fontWeight: 500, color: 'red' }}>
                        中学１年生からイングリブを始めて、大学生の今ではTed
                        Educationのビデオで議論ができるまでに。
                      </h5>
                      <span>
                        中学１年生の時にイングリブに出会い、それまで英会話教室や英語塾を転々としていた時間は無駄だったと後悔している。イングリブが推奨しているインプット量を増やす方法は一番効果的で、大学生になった今ではアウトプットプログラムを通して表現力を磨いていて、今ではネイティブの先生との議論の中で説得力のある意見を言えるまでになった。イングリブで小さいお子さんがネイティブ並みの発音で音読練習をしている姿を見て、小学生の時にイングリブに出会っていたらと思う。
                      </span>
                      <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i>
                          本人、大学２年生（イングリブ歴：中学１年〜）
                          Discussion 受講中
                        </li>
                        {/* <li>
                          <i className="flaticon-people"></i> read more
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  <div className="col-lg-12 col-md-12">
                    <div className="courses-content">
                      {/* <a href="#" className="fav">
                        <i className="flaticon-heart"></i>
                      </a> */}

                      <h5 style={{ fontWeight: 500, color: 'red' }}>
                        インターのクラスで一番英語が苦手だったのが、イングリブ開始１年後にはリーディングレベルが学年トップになりました。
                      </h5>
                      <span>
                        幼稚園からインターナショナルスクールに通っていますが、ずっとESLクラスに入っていました。イングリブを始めるようになってから、どんどん本が読めるようになり、3ヶ月後にはESLを卒業し、今では帰国子女の友達のリーディングレベルを超えて学年1番になりました。{' '}
                      </span>
                      <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i>
                          Yumi
                          インタナショナルスクール４年生（イングリブ歴：小学校２年〜）
                        </li>
                        {/* <li>
                          <i className="flaticon-people"></i> read more
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  <div className="col-lg-12 col-md-12">
                    <div className="courses-content">
                      {/* <a href="#" className="fav">
                        <i className="flaticon-heart"></i>
                      </a> */}

                      <h5 style={{ fontWeight: 500, color: 'red' }}>
                        動画のシャドーイングが楽しくて娘と競争しています。
                      </h5>
                      <span>
                        動物の動画を観ながらシャドーイングを始めたばかりの時は、ネイティブの言葉が速すぎて何を言っているのか全くわかリませんでした。毎日練習を続けていると、１ヶ月ほどで音の速さにもなれ、音の真似をするのが楽しくなりました。娘は、動画に出てくるネイティブの話し手のジェスチャーまで真似するようになり、本物のネイティブのような発音やイントネーションで発声するようになり、今では、私も娘と一緒にシャドーイングの練習を楽しみ、二人で競争しながら毎日楽しく練習しています。{' '}
                      </span>
                      <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i>
                          Hazuki保護者　公立小学校３年生（イングリブ歴：年長〜）
                        </li>
                        {/* <li>
                          <i className="flaticon-people"></i> read more
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  <div className="col-lg-12 col-md-12">
                    <div className="courses-content">
                      {/* <a href="#" className="fav">
                        <i className="flaticon-heart"></i>
                      </a> */}

                      <h5 style={{ fontWeight: 500, color: 'red' }}>
                        イングリブの先生は、英語を学ぶことだけは大好きなADHDを持つ娘に上手にしっかり向き合ってくれます。
                      </h5>
                      <span>
                        ADHDを持っている娘は元々英語を学ぶことが大好きだったのですが、娘のサポートができる英語塾が見つからず、どうしたらいいのか迷っていたところ、ようやくイングリブに出会えました。毎日イングリブのカリキュラムを通じてインプット量を増やしながら、週一回のオンラインレッスンが待ちきれない様子です。娘の「好き」を大切に成長させてくれるイングリブに感謝しています。これからの娘の未来が楽しみです。{' '}
                      </span>
                      <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i>
                          Ayako保護者　公立小学校4年生（イングリブ歴：小学校２年生〜）
                        </li>
                        {/* <li>
                          <i className="flaticon-people"></i> read more
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  <div className="col-lg-12 col-md-12">
                    <div className="courses-content">
                      {/* <a href="#" className="fav">
                        <i className="flaticon-heart"></i>
                      </a> */}

                      <h5 style={{ fontWeight: 500, color: 'red' }}>
                        英検に受かることで英語が自然にできるようになるものと思っていましたが、全く逆でした。本物の英語を習得することで自然な形で英検には合格できるのだと痛感しました。
                      </h5>
                      <span>
                        私たち親世代の英語教育は英検などの試験に合格することが英語力というような考え方だったと思います。説明会で、ミンジェ先生から私たち親世代の英語教育の間違いを自分の子供にもさせてしまうのかと問われた時、ハッとしました。英語は本来楽しく学びながらどんどんインプットしていくことで本物の英語感覚が身に付き、英検は自然に受かるものと伺い、初めは信じられませんでした。娘は、毎日の課題であるリーディングとシャドーイングを練習する習慣がつき、本を読めることが嬉しくて好循環に入り、気がつくと本を読んでいることが増えました。試しにという軽い気持ちで受けさせた英検に軽々合格しました。その後も自然な形で英検に合格するようになり、最近では準二級に合格しました。
                      </span>
                      <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i>
                          Keigo保護者　私立小学校５年生（イングリブ歴：小学校３年生〜）
                        </li>
                        {/* <li>
                          <i className="flaticon-people"></i> read more
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="single-courses-item">
                <div className="row align-items-center">
                  <div className="col-lg-12 col-md-12">
                    <div className="courses-content">
                      {/* <a href="#" className="fav">
                        <i className="flaticon-heart"></i>
                      </a> */}

                      <h5 style={{ fontWeight: 500, color: 'red' }}>
                        このカリキュラムの内容でこの値段を提供してくれるイングリブに出会えてよかったです。{' '}
                      </h5>
                      <span>
                        東京都内の英語塾で週一回ブラックキャットシリーズの本で英語を習っていましたが、英語学習の習慣がつかないまま月5万円もするお月謝を払うことがいつも気になっていたところ、友達の紹介でイングリブに出会えました。イングリブでは、娘が好きなブラックキャットシリーズの本を使用しているだけでなく、レベル別に扱っている本の数が圧倒的に多く、子供が本を選ぶ楽しみも増えました。多読多聴カリキュラムやシステムがしっかりしているのに、毎月のお月謝は４分の１になりました。今は下の子も一緒にイングリブのオンラインプログラムに参加しています。一番嬉しいのは毎日の英語学習の習慣が身についたことです。{' '}
                      </span>
                      <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                        <li>
                          <i className="flaticon-agenda"></i>
                          Seiya保護者
                          帰国子女・公立小学校５年生（イングリブ歴：小学３年生〜）
                        </li>
                        {/* <li>
                          <i className="flaticon-people"></i> read more
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* // */}
          </div>
          <center>
            <MediaQuery query="(min-width: 767px)">
              <Link href="/interview">
                <a
                  className="default-btn"
                  style={{ backgroundColor: '#96be25' }}
                >
                  成功体験インタビューを見る
                </a>
              </Link>
            </MediaQuery>
            <MediaQuery query="(max-width: 767px)">
              <Link href="/interview">
                <a
                  className="default-btn"
                  style={{ backgroundColor: '#96be25', fontSize: '25px' }}
                >
                  成功体験インタビューへ
                </a>
              </Link>
            </MediaQuery>
          </center>
        </div>
      </div>

      {/* <Footer /> */}
    </React.Fragment>
  )
}

export default CustomersVoices2
