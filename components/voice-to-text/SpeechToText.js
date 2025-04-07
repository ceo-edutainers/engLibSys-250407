import { EcoSharp } from '@material-ui/icons'
import { eachHourOfInterval } from 'date-fns'
import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime' //これがないと react-speech-recognitionはnextjsでエラーになる。
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import isFQDN from 'validator/lib/isFQDN'
//import './speech-to-text.css'
/*
Afrikaans af
Basque eu
Bulgarian bg
Catalan ca
Arabic (Egypt) ar-EG
Arabic (Jordan) ar-JO
Arabic (Kuwait) ar-KW
Arabic (Lebanon) ar-LB
Arabic (Qatar) ar-QA
Arabic (UAE) ar-AE
Arabic (Morocco) ar-MA
Arabic (Iraq) ar-IQ
Arabic (Algeria) ar-DZ
Arabic (Bahrain) ar-BH
Arabic (Lybia) ar-LY
Arabic (Oman) ar-OM
Arabic (Saudi Arabia) ar-SA
Arabic (Tunisia) ar-TN
Arabic (Yemen) ar-YE
Czech cs
Dutch nl-NL
English (Australia) en-AU
English (Canada) en-CA
English (India) en-IN
English (New Zealand) en-NZ
English (South Africa) en-ZA
English(UK) en-GB
English(US) en-US
Finnish fi
French fr-FR
Galician gl
German de-DE
Greek el-GR
Hebrew he
Hungarian hu
Icelandic is
Italian it-IT
Indonesian id
Japanese ja
Korean ko
Latin la
Mandarin Chinese zh-CN
Taiwanese zh-TW
Cantonese zh-HK
Malaysian ms-MY
Norwegian no-NO
Polish pl
Pig Latin xx-piglatin
Portuguese pt-PT
Portuguese (Brasil) pt-br
Romanian ro-RO
Russian ru
Serbian sr-SP
Slovak sk
Spanish (Argentina) es-AR
Spanish (Bolivia) es-BO
Spanish (Chile) es-CL
Spanish (Colombia) es-CO
Spanish (Costa Rica) es-CR
Spanish (Dominican Republic) es-DO
Spanish (Ecuador) es-EC
Spanish (El Salvador) es-SV
Spanish (Guatemala) es-GT
Spanish (Honduras) es-HN
Spanish (Mexico) es-MX
Spanish (Nicaragua) es-NI
Spanish (Panama) es-PA
Spanish (Paraguay) es-PY
Spanish (Peru) es-PE
Spanish (Puerto Rico) es-PR
Spanish (Spain) es-ES
Spanish (US) es-US
Spanish (Uruguay) es-UY
Spanish (Venezuela) es-VE
Swedish sv-SE
Turkish tr
Zulu zu
*/
const SpeechToText = ({ mbn, isrecording }) => {
  // const SpeechToText = (isrecording) => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const [lang, setLang] = useState('en-US')

  const [nowListeningText, setNowListeningText] = useState('') //minjae
  const [savedText, setSavedText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(e.target.text.value)
  }

  var savedGetText = localStorage.getItem('savedText')
  //for VoiceRecorderToS3ForSelfLessonPage Only START
  // if (isrecording == true) {
  //   useEffect(() => {
  //     // alert(isrecording)
  //     handleStart()
  //   }, [])
  // }
  // if (!isrecording) {
  //   useEffect(() => {
  //     // alert(isrecording)
  //     console.log('transcript-stop:', transcript)
  //     handleStop()
  //   }, [])
  // }

  //for VoiceRecorderToS3ForSelfLessonPage Only END

  function handleStart() {
    localStorage.setItem('savedText', '')
    resetTranscript
    SpeechRecognition.startListening({ language: lang })
    SpeechRecognition.startListening({ continuous: true })
    console.log('Now listening...')
    setNowListeningText('ing') //minjae
    // return () => {
    //   SpeechRecognition.stopListening()

    //   console.log('Stopped Listening')
    //   //setNowListeningText('Stopped Listening')//minjae
    // }
  }

  function handleStop() {
    setNowListeningText('')
    localStorage.setItem('savedText', transcript)
    SpeechRecognition.stopListening()

    //SpeechRecognition.stopListening()
    //alert(transcript)
    // resetTranscript()
  }

  // function handleRestart() {
  //   SpeechRecognition.resumeListening()
  //   // SpeechRecognition.startListening({ language: lang })
  //   // SpeechRecognition.startListening()
  // }

  function handlePause() {
    //SpeechRecognition.stopListening()
    SpeechRecognition.abortListening()
  }

  function handleReset() {
    resetTranscript
    setNowListeningText('')
    localStorage.setItem('savedText', '')
  }
  const browerAlert =
    'このブラウザーはこの機能をサポートしません。Chrome Browserをダウンロードして下さい。'
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    //alert(browerAlert)
  }
  return (
    // <div style={{ textAlign: 'center', width: '100%' }}>
    <div className="row align-items-center">
      <form
        onSubmit={handleSubmit}
        className="form-control"
        style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <div className="col-lg-12 col-md-12">
          {nowListeningText == 'ing' && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              Now Listening......
            </p>
          )}
        </div>

        {/* <MediaQuery query="(min-width: 767px)"> */}
        <div className="col-lg-12 col-md-12" style={{ textAlign: 'center' }}>
          <p>
            {savedGetText !== '' && transcript == ''
              ? savedGetText
              : transcript}
          </p>
        </div>
        {/* </MediaQuery> */}
        {/* <MediaQuery query="(max-width: 767px)">
          <center>
            <div
              className="col-lg-12 col-md-12"
              style={{
                textAlign: 'center',
                color: '#4d4d4d',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                width: '55%',
              }}
            >
              <p
                style={{
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'break-word',
                  width: '100%',
                }}
              >
                {savedGetText !== '' && transcript == ''
                  ? savedGetText
                  : transcript}
              </p>
            </div>
          </center>
        </MediaQuery> */}

        <div className="col-lg-12 col-md-12">
          <div className="btn-container mb-2 mt-2 p-2">
            {nowListeningText == '' && (
              <span
                onClick={handleStart}
                className="btn btn-primary tooltip-big-text p-1"
                data-balloon-length="fit"
                aria-label="このボタンをクリックすると、自分の音声をテキストで変換することができ、間違った発音などを確認することができます。録音しながらでも可能です。"
                data-balloon-pos="up"
              >
                自分の声をテキストで変換する(Start/Reset)
              </span>
            )}

            {nowListeningText == 'ing' && (
              <span onClick={handleStop} className="btn btn-secondary p-1 w-50">
                テキスト変換を止める
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default SpeechToText
