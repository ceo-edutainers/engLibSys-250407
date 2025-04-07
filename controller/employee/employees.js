import { values } from 'next-pwa/cache'
import { executeQuery } from '../../config/db'

const getAllTable = async (req, res) => {
  try {
    let tableData = await executeQuery('select * from sys_member', [])
    res.status(200).json(tableData)
    //res.json(tableData[0].email)
    return (
      <div>
        test
        {json(tableData).map((val, key) => {
          return (
            <>
              <p>{val.email}</p>
              <br />
              ======
              <br />
            </>
          )
        })}
      </div>
    )
  } catch (err) {
    res.status(500).json(err)
  }
}
const getTableByEmail = async (req, res) => {
  let email = req.query.email
  try {
    let tableData = await executeQuery(
      `select * from sys_member where email=${email}`,
      []
    )
    res.status(200).json(tableData)
  } catch (err) {
    res.status(500).json(err)
  }
}
const deleteTableByEmail = async (req, res) => {
  let email = req.query.email
  try {
    let tableData = await executeQuery('delete from sys_member where email=?', [
      id,
    ])
  } catch (err) {
    res.status(500).json(err)
  }
}

const saveTable = async (req, res) => {
  console.log(req.body)
  let name_eng = req.body.name_eng
  let email = req.body.email
  let member_barcode_num = req.body.member_barcode_num
  try {
    let tableData = await executeQuery(
      'insert into sys_member(name_eng, email, member_barcode_num) values(?,?,?)',
      [name_eng, email, member_barcode_num]
    )
    tableData = await executeQuery(
      `select * from sys_member where email = ${tableData.email}`
    )
    res.status(201).json(tableData)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateTable = async (req, res) => {
  //let email = req.query.email
  const { name_eng, email, member_barcode_num } = req.body
  try {
    let tableData = await executeQuery(
      'select * from sys_member where email = ?',
      [email]
    )

    if (tableData.length > 0) {
      tableData = await executeQuery(
        'update sys_member set name_eng=?, email=?, member_barcode_num=? where email=?',
        [name_eng, email, member_barcode_num, email]
      )
      res.status(200).json(tableData)
    } else {
      res.status(400).json(`sys_member not found on this id=${id}`)
    }
  } catch (err) {
    res.status(400).json(err)
  }
}

export {
  getAllTable,
  getTableByEmail,
  deleteTableByEmail,
  saveTable,
  updateTable,
}
