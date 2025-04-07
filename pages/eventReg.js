import React, { Component, useState, useEffect } from 'react'
import RecurSchedule from '@/components/Calendar/RecurSchedule'
// import NavbarEnglib from '@/components/_App/NavbarEnglib'
import TryRegisterFormEnter from '@/components/Authentication/TryRegisterFormEnter'
import Router, { useRouter } from 'next/router'

const style = {
  position: 'relative',
  margin: '50px auto',
}

// const Events = () => {
function Events() {
  const router = useRouter() //使い方：router.replace('/')

  // useEffect(() => {
  //   if (localStorage.getItem('loginStatus') == 'true') {
  //     router.replace('/try-schedule') // ここでリダイレクト
  //   }
  // })
  return (
    <React.Fragment>
      {/* <NavbarEnglib /> */}
      <div className="events-area pt-100 pb-70">
        <div className="container">
          <TryRegisterFormEnter />
          {/* <RecurSchedule /> */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Events
