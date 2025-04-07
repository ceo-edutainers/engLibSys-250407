/** @format */

import React, { useRef } from 'react'
import S3 from 'react-aws-s3'

function UploadOnefileS3({ uploaddir }) {
  const fileInput = useRef()
  const S3_BUCKET = process.env.S3_REACT_APP_DIR_NAME
  const REGION = process.env.S3_REACT_APP_REGION
  const ACCESS_KEY = process.env.S3_REACT_APP_ACCESS_ID
  const SECRET_ACCESS_KEY = process.env.S3_REACT_APP_ACCESS_KEY

  const handleClick = (event) => {
    event.preventDefault()
    let file = fileInput.current.files[0]
    let newFileName = fileInput.current.files[0].name

    const config = {
      bucketName: S3_BUCKET,
      region: REGION,
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    }

    const ReactS3Client = new S3(config)
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      console.log(data)
      if (data.status === 204) {
        console.log('success')
        alert('upload success')
      } else {
        console.log('fail')
        alert('upload fail')
      }
    })
    console.log(fileInput.current)
    //this will house our function to upload to s3
  }

  return (
    <>
      <form className="upload-steps" onSubmit={handleClick}>
        <label>
          Upload file:
          <input type="file" ref={fileInput} />
        </label>
        <br />
        <button type="submit">Upload</button>
      </form>
    </>
  )
}

export default UploadOnefileS3
