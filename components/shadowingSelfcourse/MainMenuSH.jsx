/** @format */
import react, { useContext, useState, useEffect } from 'react'
import { QuizContext } from '@/components/shadowingSelfcourse/Contexts'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import UploadHWShadowing from '@/components/shadowingSelfcourseVideo/UploadHWShadowingBook'

function MainMenuSH() {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const {
    qrLinkVideoDictation,
    setQrLinkVideoDictation,
    dictationHow,
    setDictationHow,
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    // lessonOrder,
    // setLessonOrder,
    thisSubject,
    setThisSubject,
    // leastRecordCount_ondoku,
    // setLeastRecordCount_ondoku,
    // leastRecordCount_shadowing,
    // setLeastRecordCount_shadowing,
    // bookCoverImgUrl,
    // setBookCoverImgUrl,
    // bookImgUrl,
    // setBookImgUrl,
    // bookAudioUrl,
    // setBookAudioUrl,
    // seriesName,
    // setSeriesName,
    // bookStory,
    setBookStory,
    shadowingLevel,
    setShadowingLevel,
    bookTitle,
    setBookTitle,
    storyStartPage,
    setStoryStartPage,
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
    // storyTitle,
    // setStoryTitle,
    dictationStart,
    setDictationStart,
    practiceTempId,
    setPracticeTempId,
    // audioOnOff,
    // setAudioOnOff,
    // course,
    // setCourse,
    // courseName,
    // setCourseName,
    pageView,
    setPageView,
    // courseLevel,
    // setCourseLevel,
    // textbook,
    // setTextbook,
    // eikenLevel,
    // setEikenLevel,
    userName,
    setUserName,
    // point,
    // setPoint,
    // totalQuestion,
    // setTotalQuestion,
  } = useContext(QuizContext)

  const nextStepCheck = (nStep) => {
    //次のstep1のsys_hw_historyテーブルのstatusがendになっている場合は、step2にいく。
    //왜냐하면, step1은 처음 한번만 하는 step이므로.
    var homework_id = HWID
    // var nextStep = 'Step1b'
    var nextStep = nStep //Step1b
    // alert('nextStep')
    // alert(nextStep)

    //Step1bのstepStatus==endなのかをチェック

    const fetchData = async () => {
      //Server側で、step1 AND stepStatus='end'もチェックする
      var url = DB_CONN_URL + '/get-step-sys-hw-history/'
      var Url =
        url + myMbn + '&' + homework_id + '&' + nextStep + '&' + thisSubject

      try {
        const response = await axios.get(Url)
        //alert(response.data.message)
        //stepStatus='end'があるものがあるのあk
        if (response.data.length > 0) {
          //step1をすでに終わった場合
          //step1bの stepStatus==endがある場合 最後のデーター(response[0]が Step1B、stepStatus=endの場合)、つまりこの宿題でStep1Bを終わらせた場合は
          //いつもstep2からスタートする
          // if (response.data.response[0].step == 'Step1B') {
          //最後のhw-historyデーターのstepStatus==holdingの場合をチェック

          //step1が終わったら、次はどのstepにいけばいい？ここから。
          //その１）step2へ行く。
          //その２）holdingをチェックしてあったらそのstepに行く
          var url = DB_CONN_URL + '/get-step-sys-hw-history-holding/'
          var Url = url + myMbn + '&' + homework_id + '&' + thisSubject

          const fetchData2 = async () => {
            try {
              const response = await axios.get(Url)

              //alert(response.data.response[0].stepStatus)
              if (response.data.length > 0) {
                if (response.data.response[0].stepStatus == 'holding') {
                  //alert(response.data.response[0].stepStatus)
                  var thisStep = response.data.response[0].step
                  practiceStart(thisStep)
                  console.log('thisStep1:', thisStep)
                } else {
                  //holdingではない場合、Step1は終わってるので、step2へへ行く。
                  var thisStep = 'StepSH2'
                  practiceStart(thisStep)
                  console.log('thisStep2:', thisStep)
                }
              } else {
                var thisStep = 'StepSH2'
                practiceStart(thisStep)
                console.log('thisStep3:', thisStep)
              }
              // practiceStart(thisStep)
              // console.log('thisStep4:', thisStep)
            } catch (error) {
              console.log(error)
            }
          }
          fetchData2()
          // } else {
          //   // step1が endではない場合、
          //   var thisStep = 'Step1B'
          //   practiceStart(thisStep)
          //   console.log('thisStep-no-step1-end:', thisStep)
          // }
        } else {
          //step1をまだ終わってない場合。
          //아직 아무런 history가 들어 있지 않을 경우 (처음으로 이  스토리를 공부하는 경우)
          var thisStep = 'StepSH1'
          practiceStart(thisStep)
          console.log('thisStep-no-history2:', thisStep)
        }

        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  // const nextStepCheck = (nStep) => {
  //   //次のStepSH1のsys_hw_historyテーブルのstatusがendになっている場合は、step2にいく。
  //   //왜냐하면, StepSH1은 처음 한번만 하는 step이므로.
  //   // alert(HWID)
  //   var homework_id = HWID
  //   // var nextStep = 'StepSH1'
  //   var nextStep = nStep
  //   var url = DB_CONN_URL + '/get-step-sys-hw-history/'
  //   var Url =
  //     url + myMbn + '&' + homework_id + '&' + nextStep + '&' + thisSubject

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(Url)

  //       if (response.data.length > 0) {
  //         //StepSH1の stepStatus==endがある場合
  //         if (response.data.response[0].step == 'StepSH1') {
  //           //alert('first')
  //           var thisStep = 'StepSH2'
  //           //console.log('thisStep-first:', thisStep)
  //         } else {
  //           var thisStep = response.data.response[0].step
  //           //alert('second')

  //           // console.log('thisStep-second:', thisStep)
  //         }
  //       } else {
  //         //아직 아무런 history가 들어 있지 않을 경우 (처음으로 이  스토리를 공부하는 경우)

  //         var thisStep = 'StepSH1'
  //         // alert('3')
  //         // console.log('###-3:', thisStep)
  //       }

  //       practiceStart(thisStep)
  //       console.log('thisStep:', thisStep)

  //       //setTotalQuestion(response.data.response.length)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  // }

  const practiceStart = (nextStep) => {
    localStorage.removeItem('holdTempIdSH', '')
    //次のStepSH1のsys_hw_historyテーブルのstepStatusがendになっている場合は、step2にいく。
    //왜냐하면, StepSH1은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
        // alert(nextStep)
        // alert('testend')
        var homework_id = HWID
        var step = nextStep
        var pti = practiceTempId
        var url = DB_CONN_URL + '/reg-sys-hw-history'
        axios
          .post(url, {
            mbn: myMbn,
            homework_id: homework_id,
            step: step,
            practiceTempId: pti,
            thisSubject: thisSubject,
          })
          .then((response) => {
            if (!response.data.status) {
            } else {
              setPageView(nextStep)
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  useEffect(() => {
    var url = DB_CONN_URL + '/get-hw-and-Shadowing-info-split-concat/'
    var Url = url + bookTitle + '&' + bookNum + '&' + storyNum

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)
        let arr = []
        arr = response.data

        const sentences = arr.map(({ sentence }) => sentence).join('')

        // alert('sentences' + sentences)
        setBookStory(sentences)

        // getWordEach(sentences)
        // getStoryToWordEach(sentences)
        // var parts = []
        // parts = sentences
        // parts = parts.split(/[\s,]+/)

        // const listItems = parts.map((val) => (
        //   <a
        //     onClick={() => {
        //       handleViewWordMeaning(val)
        //     }}
        //   >
        //     {val}&nbsp;
        //   </a>
        // ))

        // console.log('listItems', listItems)
        // //本の全てのスクリプト
        // setListItems('<div>' + listItems + '</div>')
        // alert(listItems)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])
  return (
    <>
      <div
        className="MenuBig p-5"
        style={{ backgroundColor: '#ccc777', color: 'black', height: 'auto' }}
      >
        {/* {HWID}/{bookTitle}
        
        <br /> */}
        <h1 className="mb-1" style={{ fontWeight: '900' }}>
          SHADOWING & DICTATION
        </h1>
        <p>{userName}</p>
        <hr
          style={{
            border: '0.0001em solid white',
            width: '100%',
            marginTop: 0,
            paddingTop: 0,
          }}
        />
        <h1 className="mb-1" style={{ fontWeight: '900', fontSize: '30px' }}>
          {bookTitle}
          {/* {seriesName} */}
        </h1>
        {/* <h3
          className="mb-3 mt-0"
          style={{ color: 'black', fontWeight: 'bold' }}
        >
          {courseLevel}
        </h3> */}
        <h5>
          {/* <b>{bookTitle}</b> */}
          {/* <br />
          <b>{storyTitle}</b>
          <br /> */}
          <b>
            {storyNum}&nbsp;&nbsp;|&nbsp;&nbsp; 教材の{storyStartPage}
            page~
          </b>
        </h5>
        {/* <div className="col-lg-12 col-md-12 mt-2 ">
        <img
          src={bookCoverImgUrl}
          width="150px"
          className="mr-2 mb-3"
          style={{ border: '4px solid #dedede' }}
        />
        <img
          src={bookImgUrl}
          width="150px"
          className="mb-3"
          style={{ border: '4px solid #dedede' }}
        />
      </div> */}
        {/* <div className="col-lg-12 col-md-12 mt-2 ">
          <h5 style={{ fontWeight: 'bold' }}>
            {storyNum}
            <br />
            教材の{storyStartPage}ページから
          </h5>
        </div> */}
        <button
          className="startBtnBig mt-4 mb-3"
          onClick={() => {
            nextStepCheck('StepSH1')
          }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ fontWeight: 'bold', color: 'black', fontSize: '27px' }}>
            シャドーイング
            <br />
            1セットをスタートする
          </p>
        </button>
        <div
          style={{
            border: '1px solid white',
            borderRadius: '10px',
            padding: '10px',
            marginTop: '10px',
            marginLeft: '30px',
            marginRight: '30px',
          }}
        >
          <p style={{ color: 'black', textAlign: 'justify' }}>
            <h5>
              <center>
                <b>[注意]</b>
              </center>
            </h5>
            1セットはStep1〜Step4までのことを意味します。
            毎日のFireの数を増やすためには、 少なくとも毎日
            Step1〜Step4までの一セットを終了する必要があります。
            リーディングとシャドーイングのFireを増やす仕組みは連動しませんので、ご注意ください。
          </p>
        </div>

        {/* {dictationHow}/{qrLinkVideoDictation}/<br />
        {HWID} */}
        {/* {(qrLinkVideoDictation !== '' || qrLinkVideoDictation !== null) && */}
        {(qrLinkVideoDictation !== '' || qrLinkVideoDictation !== null) &&
          dictationHow !== 'Typing' && (
            <>
              <div
                className="col-lg-12 col-md-12 mt-3"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid white',
                  borderRadius: '10px',
                }}
              >
                <UploadHWShadowing
                  dictationStart={dictationStart}
                  currentStep="StepSH2"
                  stepStatus="Dictation Upload"
                  pointKeyNum="DIC-4"
                  HWID={HWID}
                  qrLinkVideoDictation={qrLinkVideoDictation}
                />
              </div>
            </>
          )}
        <Link href="/mytopGroup">
          <button
            className="btn btn-danger mt-4"
            style={{ fontWeight: '900', color: 'white', marginTop: '10px' }}
          >
            BEN TOPへ
          </button>
        </Link>
      </div>
      <CopyrightFooter />
    </>
  )
}

export default MainMenuSH
