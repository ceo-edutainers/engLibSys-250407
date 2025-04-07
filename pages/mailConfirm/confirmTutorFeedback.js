import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'

const Confirm = () => {
  const router = useRouter()
  const { query } = useRouter()
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const [HWID, setHWID] = useState()
  const [mbn, setMbn] = useState()

  useEffect(() => {
    if (router.isReady) {
      setMbn(router.query.m)
      setHWID(router.query.hid)
    }
    // alert(router.query.m)
  }, [router.isReady])

  useEffect(() => {
    var Url = DB_CONN_URL + '/update-tutor-feedback-checked'

    const fetchData = async () => {
      try {
        axios
          .post(Url, {
            mbn: mbn,
            HWID: HWID,
          })
          .then((response) => {
            if (response.data.status) {
              alert(
                '既読の通知が先生の方に送信されました。BENのマイページからでも内容の確認ができます。'
              )
              console.log('status success')
              // router.push('/')
            } else {
              console.log('status failed')
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [HWID])

  function closeWindow() {
    window.open('about:blank', '_self')
    window.close()
  }

  return (
    <>
      {' '}
      <div
        className="col-lg-12 col-md-12 pt-2 pb-1 text-center"
        style={{ backgroundColor: '#dedede' }}
      >
        <h4>
          ページを閉じる{' '}
          <span className="btn btn-danger" onClick={() => closeWindow()}>
            X
          </span>
        </h4>
      </div>
    </>
  )
}
export default Confirm
