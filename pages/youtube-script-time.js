import React, { useEffect, useState } from 'react'
import axios from 'axios'
import YoutubeScriptTime from '@/components/Youtube/YoutubeScriptTime'

export default function Youtubescripttime(yID) {
  return (
    <div>
      <YoutubeScriptTime yID="w6JFRi0Qm_s" />
    </div>
  )
}
