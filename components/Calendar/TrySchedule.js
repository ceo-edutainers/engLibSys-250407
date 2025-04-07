import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment-timezone'
import 'react-datepicker/dist/react-datepicker.css'
import { formatToTimeZone } from 'date-fns-timezone'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import axios from 'axios'
import { ImportantDevices, Today } from '@material-ui/icons'
import { map } from 'next-pwa/cache'
import { beforeToday } from './dayStyles'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
//import ResidentCountrySelectorAuto from './ResidentCountrySelectorAuto'

function TrySchedule() {
  return <div>Try Schedule</div>
}
export default TrySchedule
