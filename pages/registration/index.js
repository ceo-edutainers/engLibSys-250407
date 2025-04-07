import React from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'

import AlertTop from '@/components/Registration/AlertTop'

const RegisterationMember = () => {
  return (
    <React.Fragment>
      <div className="courses-details-area pb-100 ">
        <div className="container">
          <div className="courses-details-header">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12">
                <AlertTop />

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default RegisterationMember
