import React, { useState, useEffect } from 'react'

import TutorLoginFormNew from '@/components/Authentication/TutorLoginFormNew'

const Authentication = () => {
  //ログイン後戻るページ
  var after_login_redirect = 'upcoming?tbn='
  // var after_login_redirect = '/index2?'

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
