import React, { useState, useEffect } from 'react'

import TutorLoginFormNew from '@/components/Authentication/TutorLoginFormNew'

const Authentication = () => {
  //ログイン後戻るページ
  var after_login_redirect = 'upcoming?tbn='
  // var after_login_redirect = '/index2?'
  const [url, setUrl] = useState('')
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!base) {
      console.error(
        'FRONT:환경변수 NEXT_PUBLIC_API_BASE_URL이 정의되지 않았습니다.'
      )
      return
    } else {
      console.log('NEXT_PUBLIC_API_BASE_URL OK')
    }
    setUrl(base + '/t_login')
    console.log('FRONT； API Base URL:', base + '/t_login')
  }, [])
  return (
    <React.Fragment>
      <div className="profile-authentication-area ptb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <TutorLoginFormNew after_login_redirect={after_login_redirect} />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer_Tutor /> */}
    </React.Fragment>
  )
}

export default Authentication
