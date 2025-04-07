const path = require('path')
// const withPWA = require('next-pwa')

const withPWA = require('next-pwa')({
  dest: 'public',
})

const prod = process.env.NODE_ENV === 'production'
module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    // dest: 'public',
    register: true,
    sw: '/sw.js',
  },

  env: {
    DB_CONN_URL: process.env.DB_CONN_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    SENDGRID_KEY: process.env.SENDGRID_KEY,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    CLOUDINARY_VIDEO_URL: process.env.CLOUDINARY_VIDEO_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    REACT_APP_YOUR_SERVICE_ID: process.env.REACT_APP_YOUR_SERVICE_ID,
    REACT_APP_YOUR_USER_ID: process.env.REACT_APP_YOUR_USER_ID,
    S3_REACT_APP_BUCKET_NAME: process.env.S3_REACT_APP_BUCKET_NAME,
    S3_REACT_APP_BUCKET_NAME2: process.env.S3_REACT_APP_BUCKET_NAME2,
    S3_REACT_APP_BUCKET_NAME3: process.env.S3_REACT_APP_BUCKET_NAME3,
    S3_REACT_APP_DIR_NAME: process.env.S3_REACT_APP_DIR_NAME,
    S3_REACT_APP_DIR_NAME2: process.env.S3_REACT_APP_DIR_NAME2,
    S3_REACT_APP_DIR_NAME3: process.env.S3_REACT_APP_DIR_NAME3,
    S3_REACT_APP_REGION: process.env.S3_REACT_APP_REGION,
    S3_REACT_APP_ACCESS_ID: process.env.S3_REACT_APP_ACCESS_ID,
    S3_REACT_APP_ACCESS_KEY: process.env.S3_REACT_APP_ACCESS_KEY,
  },
})
