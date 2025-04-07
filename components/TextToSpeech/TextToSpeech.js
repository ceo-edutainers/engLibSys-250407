import React, { useState, useEffect } from 'react'
import SpeechTts from 'speak-tts' // es6
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'

//voiceIndex
// en-US - Alex-0
// en-US - Fred-11
// en-US - Victoria-41
// en-US - Samantha-33
// en-GB - Daniel-7
// en - Fiona-10
// en-US - Google US English-49
// en-AU - Karen-17
// en-IE - Moira-28
// en-IN - Rishi-32
// en-ZA - Tessa-37
// en-IN - Veena-40

// en-GB - Google UK English Female-50
// en-GB - Google UK English Male-51
// ja-JP - Kyoko-18
// ja-JP - Google 日本語-58
// ko-KR - Google 한국의-59
// zh-CN - Google 普通话（中国大陆）-64
// zh-HK - Google 粤語（香港）-65
// zh-TW - Google 國語（臺灣）-66

// it-IT - Alice-1
// sv-SE - Alva-2
// fr-CA - Amelie-3
// de-DE - Anna-4
// he-IL - Carmit-5
// id-ID - Damayanti-6
// es-AR - Diego-8
// nl-BE - Ellen-9
// ro-RO - Ioana-12
// pt-PT - Joana-13
// es-ES - Jorge-14
// es-MX - Juan-15
// th-TH - Kanya-16
// sk-SK - Laura-19
// hi-IN - Lekha-20
// it-IT - Luca-21
// pt-BR - Luciana-22
// ar-SA - Maged-23
// hu-HU - Mariska-24
// zh-TW - Mei-Jia-25
// el-GR - Melina-26
// ru-RU - Milena-27
// es-ES - Monica-29
// nb-NO - Nora-30
// es-MX - Paulina-31
// da-DK - Sara-34
// fi-FI - Satu-35
// zh-HK - Sin-ji-36
// fr-FR - Thomas-38
// zh-CN - Ting-Ting-39
// nl-NL - Xander-42
// tr-TR - Yelda-43
// ko-KR - Yuna-44
// ru-RU - Yuri-45
// pl-PL - Zosia-46
// cs-CZ - Zuzana-47
// de-DE - Google Deutsch-48
// es-ES - Google español-52
// es-US - Google español de Estados Unidos-53
// fr-FR - Google français-54
// hi-IN - Google हिन्दी-55
// id-ID - Google Bahasa Indonesia-56
// it-IT - Google italiano-57
// nl-NL - Google Nederlands-60
// pl-PL - Google polski-61
// pt-BR - Google português do Brasil-62
// ru-RU - Google русский-63

const TextToSpeech = ({ word, btnSize }) => {
  // alert(word)
  const [voca, setVoca] = useState(word)
  const speech = new SpeechTts()
  if (speech.hasBrowserSupport()) {
  }
  useEffect(() => {
    yomiage(word)
  }, [word])

  function yomiage(word) {
    setVoca(word)
    speech.setLanguage('en-US')
    speech.setVoice('Samantha')
    speech.setRate(0.8)
    speech.setPitch(1)
    speech
      .speak({
        text: word,
        queue: false, // current speech will be interrupted,
        listeners: {
          onstart: () => {
            console.log('Start utterance')
          },
          onend: () => {
            console.log('End utterance')
          },
          onresume: () => {
            console.log('Resume utterance')
          },
          onboundary: (event) => {
            console.log(
              event.name +
                ' boundary reached after ' +
                event.elapsedTime +
                ' milliseconds.'
            )
          },
        },
      })
      .then(() => {
        console.log('Success !')
      })
      .catch((e) => {
        console.error('An error occurred :', e)
      })
  }
  return (
    <FontAwesomeIcon
      icon={faHeadphones}
      size={btnSize}
      color="blue"
      className="ml-2 mt-1"
      onClick={() => {
        yomiage(voca)
      }}
    />
  )
}

export default TextToSpeech
