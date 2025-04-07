const { createPool } = require('mysql')
const pool = createPool({
  //heroku
  user: 'b73b198253b803',
  host: 'us-cdbr-east-04.cleardb.com',
  password: 'fc217baf',
  database: 'heroku_1e04cc87a563ca8',
  port: '3306',
})
mysql: pool.getConnection((err) => {
  if (err) {
    console.log('Error connection to db...')
  }
  console.log('Connected to db...')
})

const executeQuery = (query, arraParms) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arraParms, (err, data) => {
        if (err) {
          console.log('errror in excuting the query')
          reject(err)
        }
        resolve(data)
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = { executeQuery }
