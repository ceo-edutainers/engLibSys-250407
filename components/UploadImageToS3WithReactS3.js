import React, { useState } from 'react'
import { uploadFile } from 'react-s3'

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

const UploadImageToS3WithReactS3 = () => {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <div>React S3 File Upload</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
  )
}

export default UploadImageToS3WithReactS3
