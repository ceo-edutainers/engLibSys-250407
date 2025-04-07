import React, { useState } from 'react'
import GoogleDocCreator from '@/components/GoogleDoc/GoogleDocCreator'
//import ZapierForm from 'react-zapier-form'
var mbn = '200218100688'
var name_eng = 'Minjae Kato'
var homework_id = 'CourseDI_200218100688_20210310030489'
export default function googleDocCreator() {
  return (
    <GoogleDocCreator mbn={mbn} name_eng={name_eng} homework_id={homework_id} />
  )
}
