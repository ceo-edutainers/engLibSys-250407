import react, { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'

import { QuizContext } from './Contexts'

import next from 'next'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Upload from '@/components/shadowingSelfcourseVideo/uploadDictation'
import ViewDictationFile from '@/components/shadowingSelfcourseVideo/viewDictationFile'
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/

const UploadHWShadowing = () => {
  const {
    qrLinkVideoDictation,
    setQrLinkVideoDictation,
    HWID,
    setHWID,
    dictationStart,
    setDictationStart,
  } = useContext(QuizContext)

  return (
    <>
      <div
        className="row mt-3 mb-3"
        style={{
          border: '5px solid white',
          borderRadius: '10px',
          padding: '10px',
          width: '100%',
        }}
      >
        <div className="col-lg-12 col-md-12">
          <h5 style={{ fontWeight: 'bold' }}>
            ディクテーションやシャドーイング単語帳の写真をアップロード
          </h5>
          <hr />
          {dictationStart != 'ok' ? (
            <h6 style={{ color: 'blue' }}>
              あなたには、ディクテーションの課題は現在ありません。ディクテーションをやってみたい場合は、次のStep2で少しチャレンジした後、写真を撮ってアップロードしてください。
            </h6>
          ) : (
            <p>用意できたらアップロードしてください。</p>
          )}

          <Upload
            currentStep="StepSH2"
            stepStatus="Dictation Upload"
            pointKeyNum="DIC-4"
            homework_id={HWID}
            qrLinkVideoDictation={qrLinkVideoDictation}
          />
        </div>
        <div className="col-lg-12 col-md-12">
          <ViewDictationFile
            currentStep="StepSH2"
            stepStatus="Dictation Upload"
          />
        </div>
      </div>
    </>
  )
}

export default UploadHWShadowing
