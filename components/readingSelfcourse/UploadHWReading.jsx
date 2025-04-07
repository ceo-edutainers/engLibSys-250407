import react, { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'

import { QuizContext } from '@/components/readingSelfcourse/ContextsB'

import next from 'next'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Upload from '@/components/readingSelfcourse/uploadCopyVocaForLesson'
import ViewBookQuestionFile from '@/components/readingSelfcourse/viewBookQuestionFileB'
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/

const UploadHWReading = ({}) => {
  const { qrLinkBookQuestion, setQrLinkBookQuestion, HWID, setHWID, copyHW } =
    useContext(QuizContext)

  return (
    <>
      <div
        className="row"
        style={{
          border: '1px solid white',
          borderRadius: '10px',
          padding: '10px',
          width: '100%',
        }}
      >
        <div className="col-lg-12 col-md-12">
          {/* <p>
            {qrLinkBookQuestion}
            <br />
            {HWID}
            <br />
            {copyHW}
            <br />
          </p> */}

          <Upload
            // mbn={myMbn}
            // homework_id={HWID}
            copyHW={copyHW}
            currentStep="Endscreen"
            stepStatus="BookQuestion"
            pointKeyNum="RR-4"
            homework_id={HWID}
            qrLinkBookQuestion={qrLinkBookQuestion}
            // practiceTempId={practiceTempId}
            // thisSubject={thisSubject}
          />

          {/* <b>注意事項：</b>
                巻末問題の課題はどのタイミングでもアップロードすることができますが、ステップ１から３までのリーディングの課題目標ポイント合計が
                {cutlinePointToNextStory}ポイントに
                達成していない場合、次のストーリーに行けません。 */}
        </div>
        <div className="col-lg-12 col-md-12">
          <ViewBookQuestionFile
            currentStep="Endscreen"
            stepStatus="BookQuestion"
          />
        </div>
      </div>
    </>
  )
}

export default UploadHWReading
