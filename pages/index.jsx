import react, { useState, useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

const Index1 = () => {
  const router = useRouter() //使い方：router.replace('/')
  useEffect(() => {
    router.push('/loginGroup')
  }, [])

  return <></>
}

export default Index1
