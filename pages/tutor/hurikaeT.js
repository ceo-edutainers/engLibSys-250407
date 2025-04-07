import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import moment from 'moment-timezone'
import 'react-datepicker/dist/react-datepicker.css'
import { formatToTimeZone } from 'date-fns-timezone'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'

import Router, { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import HurikaeAskT from '@/components/Hurikae/HurikaeAskT'
import HurikaeProcessT from '@/components/Hurikae/HurikaeProcessT'
import NavbarEnglib_Tutor from '@/components/_App/NavbarEnglib_Tutor'
// import HowToApplyTaiken from '@/components/VendorCertificationTraining/HowToApplyTaiken'

const LessonHistory = () => {
  //For tab start
  const [value, setValue] = React.useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  //For tab end

  return (
    <React.Fragment>
      <NavbarEnglib_Tutor />

      <div className="container">
        <div className="row">
          {/* //tabstart */}
          <div
            className="col-lg-12 col-md-12"
            style={{ backgroundColor: '#ededed' }}
          >
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Makeup Lesson" value="1" />
                    <Tab label="Status" value="2" />
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  style={{
                    paddingTop: '20px',
                    paddingLeft: '5px',
                    paddingRight: '5px',
                  }}
                >
                  <HurikaeAskT />
                </TabPanel>
                <TabPanel value="2">
                  <HurikaeProcessT />
                </TabPanel>
              </TabContext>
            </Box>
          </div>

          {/* //tabend */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default LessonHistory
