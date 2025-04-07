import React from 'react'
import Link from 'next/link'

const CommentArea = () => {
  return (
    <div className="comments-area mt-0 pt-0">
      <ol className="comment-list">
        <li className="comment">
          <div className="comment-body">
            <div className="comment-meta">
              <div className="comment-author vcard">
                <img src="/images/user1.jpg" className="avatar" alt="image" />
                <b className="fn">John Jones</b>
                <span className="says">says:</span>
              </div>

              <div className="comment-metadata">
                <span>April 24, 2019 at 10:59 am</span>
              </div>
            </div>

            <div className="comment-content">
              <p>
                Lorem Ipsum has been the industry’s standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen.
              </p>
            </div>

            <div className="reply">
              <Link href="#">
                <a className="comment-reply-link">Reply</a>
              </Link>
            </div>
          </div>
        </li>

        <li className="comment">
          <div className="comment-body">
            <div className="comment-meta">
              <div className="comment-author vcard">
                <img src="/images/user4.jpg" className="avatar" alt="image" />
                <b className="fn">John Doe</b>
                <span className="says">says:</span>
              </div>

              <div className="comment-metadata">
                <span>April 24, 2019 at 10:59 am</span>
              </div>
            </div>

            <div className="comment-content">
              <p>
                Lorem Ipsum has been the industry’s standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen.
              </p>
            </div>

            <div className="reply">
              <Link href="#">
                <a className="comment-reply-link">Reply</a>
              </Link>
            </div>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default CommentArea
