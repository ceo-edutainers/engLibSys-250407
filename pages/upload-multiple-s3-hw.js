import React from 'react'
import UploadMultipleS3 from '@/components/upload/UploadMultipleS3'

function UploadMultiple(uploaddir) {
  return (
    <>
      <div className="App">
        <UploadMultipleS3 uploaddir="hw_upload" />
      </div>
    </>
  )
}

export default UploadMultiple
