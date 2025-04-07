import React from 'react'
import Head from 'next/head'
import { ToastProvider } from 'react-toast-notifications'
import { Toaster } from 'react-hot-toast'
import Router from 'next/router'
import GoTop from './GoTop'
// import Navbar from './Navbar'
// import NavbarEnglib from './NavbarEnglib'
import Footer from './Footer'
import StudentNavbar from './StudentNavbar'
import AdminNavbar from './AdminNavbar'
import Preloader from './Preloader'

const Layout = ({ children, user }) => {
  const [loader, setLoader] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])

  Router.events.on('routeChangeStart', () => {
    setLoader(true)
  })
  Router.events.on('routeChangeComplete', () => {
    setLoader(false)
  })
  Router.events.on('routeChangeError', () => {
    setLoader(false)
  })

  const isStudent = user && user.role === 'student'
  const isAdmin = user && user.role === 'admin'
  const isTeacher = user && user.role === 'teacher'

  return (
    <React.Fragment>
      <Head>
        <title>engLib - 1:1 Online English Tutoring </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="engLib - 1:1 Online English Tutoring "
        />
        <meta
          name="og:title"
          property="og:title"
          content="engLib - 1:1 Online English Tutoring "
        ></meta>
        <meta
          name="twitter:card"
          content="engLib - 1:1 Online English Tutoring "
        ></meta>
        {/* <link rel="canonical" href="https://edemy-react.envytheme.com/"></link> */}
      </Head>

      {loader && <Preloader />}

      <Toaster position="top-left" reverseOrder={false} />

      <ToastProvider
        placement="bottom-left"
        autoDismissTimeout={10000}
        autoDismiss
      >
        {/* {isStudent ? (
                    <StudentNavbar user={user} />
                ) : (isAdmin || isTeacher) ? (
                    <AdminNavbar user={user} />
                ) : (
                    <NavbarEnglib user={user} />  
                )}
         */}
        {children}

        <GoTop scrollStepInPx="100" delayInMs="10.50" />

        {/* <Footer /> */}
      </ToastProvider>
    </React.Fragment>
  )
}

export default Layout
