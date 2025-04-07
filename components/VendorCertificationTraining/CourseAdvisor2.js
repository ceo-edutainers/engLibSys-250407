import Link from 'next/link'
import React from 'react'
import dynamic from 'next/dynamic'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

// const OwlCarousel = dynamic(import('react-owl-carousel3'))

const options = {
  loop: true,
  nav: false,
  dots: true,
  autoplayHoverPause: true,
  autoplay: true,
  margin: 30,
  navText: [
    "<i className='bx bx-chevron-left'></i>",
    "<i className='bx bx-chevron-right'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 2,
    },
    992: {
      items: 3,
    },
  },
}

const CourseAdvisor2 = () => {
  const [display, setDisplay] = React.useState(false)

  React.useEffect(() => {
    setDisplay(true)
  }, [])

  return (
    <div className="advisor-area bg-f9f9f9 pt-70">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">Meet Our World-class Tutor</span>
          {/* <MediaQuery query="(min-width: 767px)"> */}{' '}
          <h2 style={{ fontSize: 28 }}>
            チューター教育担当・チューターアドバイザーが語るイングリブのチューター像
          </h2>
          {/* </MediaQuery> */}
          {/* <MediaQuery query="(max-width: 767px)">
            <h2 style={{ fontSize: 19 }}>
              チューター教育担当・チューターアドバイザーが語るイングリブのチューター像
            </h2>
          </MediaQuery> */}
          <p>
            ただの英語講師ではありません。ネイティブの先生でさえengLibの講師育成プログラムを通して”イングリブチューター”として生まれ変わります。世界基準の英語力と子供の学びを正しく導き出す講師がイングリブチューターです。
          </p>
        </div>

        {/* {display ? (
          <OwlCarousel
            className="advisor-slides-two owl-carousel owl-theme"
            {...options}
          >
            <div className="single-advisor-item">
              <div className="advisor-image">
                <img src="/images/advisor/advisor1.jpg" alt="image" />
              </div>

              <div className="advisor-content">
                <h3>
                  <Link href="/profile">
                    <a>Misako A.</a>
                  </Link>
                </h3>
                <span style={{ marginTop: 0, marginBottom: 10 }}>
                  Human Resource Manager & Tutor Advisor
                </span>

                <p
                  style={{
                    textAlign: 'left',
                    display: 'block',
                    lineHeight: '1.4em',
                  }}
                >
                  ”イングリブチューター”の教育を担当しております。イングリブでは、バイリンガル、ネイティブ、大学生など様々な年齢層や経験を持つ選び抜かれた講師が在籍しています。講師そのものの能力はもちろんのこと、イングリブ独自の英語教育カリキュラムに沿った定期的な講師教育により、生徒の『メタ認知力』を刺激しながら正しい英語知識のインプット量を確実に増やすことのできる”イングリブチューター”を生み出しています。レッスンが最大の効果を生み出すために、”イングリブチューター”は、常に生徒に自分の間違いに気づかせ、それをどう直したら良いのかを、自分自身で導き出すことを促すノウハウを理解し、実践しています。
                </p>
          
              </div>
            </div>
            <div className="single-advisor-item">
              <div className="advisor-image">
                <img src="/images/advisor/advisor5.jpg" alt="image" />

              </div>

              <div className="advisor-content">
                <h3>
                  <Link href="/profile">
                    <a>Ceren S.G. </a>
                  </Link>
                </h3>
                <span style={{ marginTop: 0, marginBottom: 10 }}>
                  Output Program Tutor Advisor
                </span>
                <p
                  style={{
                    textAlign: 'left',
                    display: 'block',
                    lineHeight: '1.8em',
                  }}
                >
                  フランスに住みながらイングリブチューターを始めて2年になります。
                  <br />
                  これまで様々なフランスの英語教育機関で英語講師をやってきましたが、会話のみでレッスン内容が定まっておらず、生徒さんにとって本当に効果ある学びになっているのか疑問でした。
                  <br />
                  イングリブでは、英語ネイティブではない生徒さんのために斬新的で効果的な英語教育カリキュラムが組まれており、生徒が自発的に毎日の練習をしてくるため、レッスンで新しい知識が生徒の長期記憶にしっかりと定着します。
                 </p>
               
              </div>
            </div>

            <div className="single-advisor-item">
              <div className="advisor-image">
                <img src="/images/advisor/advisor3.jpg" alt="image" />

              </div>

              <div className="advisor-content">
                <h3>
                  <Link href="/profile">
                    <a>Rina S. </a>
                  </Link>
                </h3>
                <span
                  style={{
                    marginTop: 0,
                    marginBottom: 10,
                    lineHeight: '2.0em',
                  }}
                >
                  College Tutor Advisor
                </span>
                <p style={{ textAlign: 'left', display: 'block' }}>
                  現在、カナダのToronto大学に在籍しながら、イングリブの講師をしています。イングリブでは、私のような英語を母国語とした多くの現役大学生が講師を務め、私たちの経験などを交えながら一生ものの英語を学ぶ意義を生徒さん自身に感じて欲しいと考えています。また、レッスン内では、さまざまな形で質問を投げかけ、答えを直球で与えず、生徒さん自身が答えを生み出すことを常に心がけながらレッスンをやっています。自分が教えている生徒さんたちが、英語をツールにして、様々な分野での可能性を広げていく姿を見ることがとても楽しみです。
                 </p>
         
              </div>
            </div>
          </OwlCarousel>
        ) : (
          ''
        )} */}
      </div>
    </div>
  )
}

export default CourseAdvisor2
