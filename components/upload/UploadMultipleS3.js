import React, { useRef } from 'react'
import S3 from 'react-aws-s3'

function UploadMultipleS3({ uploaddir }) {
  console.log('uploaddir:', uploaddir)
  const fileInput = useRef()

  const S3_BUCKET = process.env.S3_REACT_APP_DIR_NAME
  const REGION = process.env.S3_REACT_APP_REGION
  const ACCESS_KEY = process.env.S3_REACT_APP_ACCESS_ID
  const SECRET_ACCESS_KEY = process.env.S3_REACT_APP_ACCESS_KEY

  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  }

  const handleClick = (event) => {
    event.preventDefault()

    let newArr = fileInput.current.files
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i])
    }
  }

  const handleUpload = (file) => {
    let newFileName = file.name.replace(/\..+$/, '')

    const ReactS3Client = new S3(config)

    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      console.log(data)
      if (data.status === 204) {
        console.log('success')
        //alert('upload success')
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
      <div className="App">
        <h1>Multiple Form</h1>
        <form className="upload-steps" onSubmit={handleClick}>
          <label>
            Upload file:
            <input type="file" ref={fileInput} multiple />
          </label>
          <br />
          <button type="submit">Upload</button>
        </form>
      </div>
    </>
  )
}

export default UploadMultipleS3
