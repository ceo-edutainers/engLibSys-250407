import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
  loop: true,
  nav: true,
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
      items: 1,
    },
    768: {
      items: 2,
    },
    992: {
      items: 3,
    },
  },
}

const LatestNews = () => {
  const [display, setDisplay] = React.useState(false)

  React.useEffect(() => {
    setDisplay(true)
  }, [])
  return (
    <div className="blog-area ptb-100">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">News</span>
          <h2>Check Out Our Latest Blog</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* {display ? <OwlCarousel 
                    className="blog-slides owl-carousel owl-theme"
                    {...options}
                >
                    <div className="single-blog-post-box">
                        <div className="post-image">
                            <Link href="/single-blog-1">
                                <a className="d-block">
                                    <img src="/images/blog/blog1.jpg" alt="image" />
                                </a>
                            </Link>
                        </div>
                        <div className="post-content">
                            <Link href="#">
                                <a className="category">Education</a>
                            </Link>
                            <h3>
                                <Link href="/single-blog-1">
                                    <a>University Admissions Could Face Emergency Controls</a>
                                </Link>
                            </h3>
                            <ul className="post-content-footer d-flex justify-content-between align-items-center">
                                <li>
                                    <div className="post-author d-flex align-items-center">
                                        <img src="/images/user1.jpg" className="rounded-circle" alt="image" />
                                        <span>Alex Morgan</span>
                                    </div>
                                </li>
                                <li>
                                    <i className='flaticon-calendar'></i> April 30, 2020
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="single-blog-post-box">
                        <div className="post-image">
                            <Link href="/single-blog-1">
                                <a className="d-block">
                                    <img src="/images/blog/blog2.jpg" alt="image" />
                                </a>
                            </Link>
                        </div>
                        <div className="post-content">
                            <Link href="#">
                                <a className="category">Online</a>
                            </Link>
                            <h3>
                                <Link href="/single-blog-1">
                                    <a>Online Learning Can Prepare Students For A Fast</a>
                                </Link>
                            </h3>
                            <ul className="post-content-footer d-flex justify-content-between align-items-center">
                                <li>
                                    <div className="post-author d-flex align-items-center">
                                        <img src="/images/user2.jpg" className="rounded-circle" alt="image" />
                                        <span>Sarah Taylor</span>
                                    </div>
                                </li>
                                <li>
                                    <i className='flaticon-calendar'></i> April 29, 2020
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="single-blog-post-box">
                        <div className="post-image">
                            <Link href="/single-blog-1">
                                <a className="d-block">
                                    <img src="/images/blog/blog3.jpg" alt="image" />
                                </a>
                            </Link>
                        </div>
                        <div className="post-content">
                            <Link href="#">
                                <a className="category">Learning</a>
                            </Link>
                            <h3>
                                <Link href="/single-blog-1">
                                    <a>As Learning Moves Online, Trigger Warnings Must Too</a>
                                </Link>
                            </h3>
                            <ul className="post-content-footer d-flex justify-content-between align-items-center">
                                <li>
                                    <div className="post-author d-flex align-items-center">
                                        <img src="/images/user3.jpg" className="rounded-circle" alt="image" />
                                        <span>David Warner</span>
                                    </div>
                                </li>
                                <li>
                                    <i className='flaticon-calendar'></i> April 28, 2020
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="single-blog-post-box">
                        <div className="post-image">
                            <Link href="/single-blog-1">
                                <a className="d-block">
                                    <img src="/images/blog/blog2.jpg" alt="image" />
                                </a>
                            </Link>
                        </div>
                        <div className="post-content">
                            <Link href="#">
                                <a className="category">Learning</a>
                            </Link>
                            <h3>
                                <Link href="/single-blog-1">
                                    <a>As Learning Moves Online, Trigger Warnings Must Too</a>
                                </Link>
                            </h3>
                            <ul className="post-content-footer d-flex justify-content-between align-items-center">
                                <li>
                                    <div className="post-author d-flex align-items-center">
                                        <img src="/images/user3.jpg" className="rounded-circle" alt="image" />
                                        <span>David Warner</span>
                                    </div>
                                </li>
                                <li>
                                    <i className='flaticon-calendar'></i> April 28, 2020
                                </li>
                            </ul>
                        </div>
                    </div>
                </OwlCarousel> : ''} */}

        <div className="blog-post-info">
          <p>
            Get into details now?​{' '}
            <Link href="/blog-4">
              <a>View all posts</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LatestNews
