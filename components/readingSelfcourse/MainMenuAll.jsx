/** @format */
import react, { useContext, useState, useEffect } from 'react'
import { QuizContext } from '@/components/readingSelfcourse/ContextsB'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import BookContents from '@/components/readingSelfcourse/BookContents'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import UploadHWReading from '@/components/readingSelfcourse/UploadHWReading'
// import QrcodeGenerator from '@/components/readingSelfcourse/QrcodeGenerator'
// import Upload from '@/components/readingSelfcourse/uploadBookQuestion'
// import ViewBookQuestionFile from '@/components/readingSelfcourse/viewBookQuestionFileB'

function MainMenuB() {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [englibLevelAllInfo, setEnglibLevelAllInfo] = useState([])
  const [viewMyLevel, setViewMyLevel] = useState(false)
  const {
    readingHWAmount,
    setReadingHWAmount,
    copyHW,
    setCopyHW,
    HWbookInfo,
    setHWbookInfo,
    audioDurtaionFromDB,
    setAudioDurtaionFromDB,
    qrLinkOtherHW,
    setQrLinkOtherHW,
    qrLinkBookQuestion,
    setQrLinkBookQuestion,
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
    englibLevel,
    setEnglibLevel,
    thisSubject,
    englibLevelColor,
    setEnglibLevelColor,
    setThisSubject,
    leastRecordCount_step2,
    setLeastRecordCount_step2,
    leastRecordCount_step3,
    setLeastRecordCount_step3,
    bookCoverImgUrl,
    setBookCoverImgUrl,
    bookImgUrl,
    setBookImgUrl,
    // bookAudioUrl,
    // setBookAudioUrl,
    // bookIntroAudioUrl,
    // setBookIntroAudioUrl,
    // bookIntro2AudioUrl,
    // setBookIntro2AudioUrl,
    // bookAuthorAudioUrl,
    // setBookAuthorAudioUrl,
    // bookAudio2Url,
    // setBookAudio2Url,
    // bookAudio2TitleUrl,
    // setBookAudio2TitleUrl,
    // bookAudio3TitleUrl,
    // setBookAudio3TitleUrl,
    // bookAudio3Url,
    // setBookAudio3Url,
    // bookAudio4TitleUrl,
    // setBookAudio4TitleUrl,
    // bookAudio4Url,
    // setBookAudio4Url,
    // bookAudio5TitleUrl,
    // setBookAudio5TitleUrl,
    // bookAudio5Url,
    // setBookAudio5Url,
    // bookAudio6TitleUrl,
    // setBookAudio6TitleUrl,
    // bookAudio6Url,
    // setBookAudio6Url,
    // bookAudio7TitleUrl,
    // setBookAudio7TitleUrl,
    // bookAudio7Url,
    // setBookAudio7Url,
    seriesName,
    setSeriesName,
    bookStory,
    setBookStory,
    readingLevel,
    setReadingLevel,
    bookTitle,
    setBookTitle,
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
    storyTitle,
    setStoryTitle,
    storyStartPage,
    setStoryStartPage,
    practiceTempId,
    setPracticeTempId,
    audioOnOff,
    setAudioOnOff,
    course,
    setCourse,
    courseName,
    setCourseName,
    pageView,
    setPageView,
    courseLevel,
    setCourseLevel,
    textbook,
    setTextbook,
    eikenLevel,
    setEikenLevel,
    userName,
    setUserName,
    point,
    setPoint,
    totalQuestion,
    setTotalQuestion,
    answerFile,
    setAnswerFile,
  } = useContext(QuizContext)

  useEffect(() => {
    getInfo()
  }, [])
  function getInfo() {
    const fetchData1 = async () => {
      var url = DB_CONN_URL + '/get-englib-level-info'
      try {
        const response = await axios.get(url)

        if (response.data.response.length > 0) {
          setEnglibLevelAllInfo(response.data.response)

          console.log('englibLevelAllInfo', englibLevelAllInfo)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData1()
  }

  const nextStepCheck = (nStep) => {
    //次のstep1のsys_hw_historyテーブルのstatusがendになっている場合は、step2にいく。
    //왜냐하면, step1은 처음 한번만 하는 step이므로.
    var homework_id = HWID
    // var nextStep = 'Step1b'
    var nextStep = nStep //Step1b
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
                  var thisStep = 'Step2B'
                  practiceStart(thisStep)
                  console.log('thisStep2:', thisStep)
                }
              } else {
                var thisStep = 'Step2B'
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
        } else {
          //step1をまだ終わってない場合。
          //아직 아무런 history가 들어 있지 않을 경우 (처음으로 이  스토리를 공부하는 경우)
          var thisStep = 'Step1B'
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

  const practiceStart = (nextStep) => {
    localStorage.removeItem('holdTempId', '')
    //次のstep1Bのsys_hw_historyテーブルのstepStatusがendになっている場合は、step2にいく。
    //왜냐하면, step1B은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
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
            // if (!response.data.status) {
            // } else {
            // if (response.data.length > 0) {
            // alert(response.data.status)
            if (response.data.status) {
              setPageView(nextStep)
            } else {
              setPageView('Step1B')
            }
            // }
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  return (
    <>
      {/* <h1>
        {readingLevel}/{bookNum}/{answerFile}
      </h1> */}
      <div
        className="MenuBig p-3"
        style={{
          // backgroundColor: englibLevelColor,
          color: 'white',
          height: 'auto',
          border: '10px solid #dedede',
          borderRadius: '20px',
        }}
      >
        <div className="container">
          <div className="row">
            <div
              className="col-lg-12 col-md-12"
              style={{ textAlign: 'center' }}
            >
              <Link href="/mytopGroup">
                <span
                  className="btn btn-info pt-1"
                  style={{
                    fontWeight: '900',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  トップページへ
                </span>
              </Link>

              <span
                className="btn btn-danger pt-1 ml-3"
                style={{
                  fontWeight: '900',
                  color: 'white',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setViewMyLevel(!viewMyLevel)
                }}
              >
                {!viewMyLevel ? '私のレベルを見る' : '私のレベルを隠す'}
              </span>

              <Link href="#homework">
                <span
                  className="btn btn-primary pt-1 ml-3"
                  style={{
                    fontWeight: '900',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  課題アップロード
                </span>
              </Link>
              {/* <span
                className="ml-3"
                style={{ color: 'black', fontWeight: 'bold' }}
              >
                {userName}
              </span> */}
            </div>

            <div
              className="col-lg-12 col-md-12 pt-2 pb-2"
              style={{
                display: viewMyLevel ? 'block' : 'none',
                textAlign: 'center',
              }}
            >
              <center>
                <div className="col-lg-3 col-md-12 pt-5">
                  <h6>
                    <b>レベル表</b>
                    <p>英検の目安レベル</p>
                  </h6>
                  {englibLevelAllInfo?.map((val, key) => {
                    return (
                      <>
                        {val.englib_reading_level == englibLevel ? (
                          <p
                            style={{
                              backgroundColor: val.level_color,
                              marginBottom: 1,
                              color: 'black',
                              fontSize: '12px',
                              padding: '6px',
                              maxWidth: '200px',
                              // width: '60%',
                            }}
                            data-balloon-visible
                            aria-label="あなたのリーディングレベル"
                            data-balloon-pos="left"
                            data-balloon-length="medium"
                          >
                            {setEnglibLevelColor(val.color)}
                            {val.englib_reading_level}
                            {val.eiken_level !== ''
                              ? ' | 英検' + val.eiken_level
                              : ' | Starter'}
                          </p>
                        ) : (
                          <p
                            style={{
                              backgroundColor: val.level_color,
                              marginBottom: 1,
                              color: 'black',
                              fontSize: '12px',
                              padding: '6px',
                              // width: '60%',
                            }}
                          >
                            {val.englib_reading_level}
                            {val.eiken_level !== ''
                              ? ' | 英検' + val.eiken_level
                              : ' | Starter'}
                          </p>
                        )}
                      </>
                    )
                  })}
                </div>
              </center>
            </div>

            <table className="table table-borderless">
              <tr>
                <td style={{ width: '50%' }}>
                  {' '}
                  <h1 className="mb-1" style={{ fontWeight: '900' }}>
                    {seriesName}
                  </h1>
                  {courseName != 'CourseZ' &&
                    courseName != 'CourseZN' &&
                    courseName != 'CourseZ_SC' && (
                      <h2
                        className="mb-1"
                        style={{ color: 'black', fontWeight: '900' }}
                      >
                        {readingLevel}
                      </h2>
                    )}
                  {(courseName == 'CourseB' ||
                    courseName == 'CourseBN' ||
                    courseName == 'CourseB_SC') && <BookContents />}
                  <h2
                    className="mb-1"
                    style={{
                      color: 'black',
                      fontWeight: '900',
                      marginBottom: '15px',
                    }}
                  >
                    {readingLevel == 'Stage1plus' && 'Level1plus'}
                    {readingLevel == 'Stage2' && 'Level2'}
                    {readingLevel == 'Stage3' && 'Level3'}
                    {readingLevel == 'Stage4' && 'Level4'}
                    {readingLevel == 'Stage5' && 'Level5'}
                    {readingLevel == 'Stage6' && 'Level6'}
                    {readingLevel == 'Stage7' && 'Level7'}
                    {readingLevel == 'Stage8' && 'Level8'}
                    {readingLevel == 'Stage9' && 'Level9'}
                  </h2>
                  <img
                    src={bookCoverImgUrl}
                    className="mr-2 mb-3"
                    style={{
                      border: '4px solid #dedede',
                      width: '150px',
                      height: '200px',
                    }}
                  />
                  {courseName != 'CourseZ' &&
                    courseName != 'CourseZN' &&
                    courseName != 'CourseZ_SC' && (
                      <img
                        src={bookImgUrl}
                        className="mb-3"
                        style={{
                          border: '4px solid #dedede',
                          width: '150px',
                          height: '200px',
                        }}
                      />
                    )}
                  <h5>{storyTitle}</h5>
                  {courseName == 'CourseZ' ||
                  courseName == 'CourseZN' ||
                  courseName == 'CourseZ_SC' ? (
                    <>
                      <p
                        style={{
                          border: '1px solid #dedede',
                          borderRadius: '10px',
                          padding: 10,
                        }}
                      >
                        <a
                          href="https://www.oxfordreadingclub.jp/my/bookshelf"
                          target="_blank"
                        >
                          <span
                            className="btn btn-primary"
                            style={{ cursor: 'pointer', maxWidth: '200px' }}
                          >
                            <img src="/images/orc-logo.png" />
                          </span>
                        </a>
                        <p>
                          {/* ①上記のボタンを押して「Oxford Reading
                          Club」にログインします。
                          <br />
                          ②この画面の上に見える本のタイトルを「Oxford Reading
                          Club」で検索し、
                          <img src="/images/orc-view.png" width="20px" />
                          を押してそのタイトルのストーリーが見える状態にします。
                          <br />
                          ③ */}
                          <br />
                          <br />
                          以下の「Start
                          Reading」ボタンを押して学習をスタートします。
                        </p>
                      </p>
                    </>
                  ) : (
                    <h5 style={{ fontWeight: 'bold' }}>
                      {storyNum}
                      <br />
                      <ruby>
                        教材
                        <rt>きょうざい</rt>
                      </ruby>
                      の{storyStartPage}ページから
                    </h5>
                  )}
                  {readingHWAmount == 'first half' && (
                    <>
                      {' '}
                      <h4 className="mb-0 pb-0" style={{ color: 'green' }}>
                        <ruby>
                          今回<rt>こんかい</rt>
                        </ruby>
                        の
                        <ruby>
                          課題<rt>かだい</rt>
                        </ruby>
                        ：ストーリの
                        <ruby>
                          前半分<rt>まえはんぶん</rt>
                        </ruby>
                      </h4>
                    </>
                  )}
                  {readingHWAmount == 'second half' && (
                    <>
                      {' '}
                      <h4 className="mb-0 pb-0" style={{ color: 'green' }}>
                        <ruby>
                          今回<rt>こんかい</rt>
                        </ruby>
                        の
                        <ruby>
                          課題<rt>かだい</rt>
                        </ruby>
                        ：ストーリの
                        <ruby>
                          後<rt>うし</rt>
                        </ruby>
                        ろ
                        <ruby>
                          半分<rt>はんぶん</rt>
                        </ruby>{' '}
                      </h4>
                    </>
                  )}
                  {courseName == 'CourseB' && (
                    <>
                      <span
                        className="btn btn-warning"
                        style={{
                          fontSize: '20px',
                          color: 'white',
                          marginBottom: '10px',
                        }}
                      >
                        <a href={answerFile} target="_blank">
                          解答をダウンロード
                        </a>
                      </span>
                      <br />
                    </>
                  )}
                  {courseName == 'CourseZ' ? (
                    <button
                      // className="startBtnBig"
                      className="btn btn-danger pt-4 pb-4 mt-0"
                      onClick={() => {
                        nextStepCheck('Step1B')
                      }}
                      style={{
                        fontSize: '30px',
                        fontWeigh: 'bold',
                      }}
                    >
                      Start Reading
                      <p style={{ color: 'white' }}>{userName}</p>
                    </button>
                  ) : (
                    <button
                      // className="startBtnBig mt-5"
                      className="btn btn-danger mt-5 pt-4 pb-4 mt-0"
                      style={{
                        fontSize: '30px',
                        fontWeigh: 'bold',
                      }}
                      onClick={() => {
                        nextStepCheck('Step1B')
                      }}
                    >
                      Start Reading
                      <p style={{ color: 'white' }}>{userName}</p>
                    </button>
                  )}
                </td>
                {/* <td>
                  <h6>
                    <b>レベル表</b>
                    <p>英検の目安レベル</p>
                  </h6>
                  {englibLevelAllInfo?.map((val, key) => {
                    return (
                      <>
                        {val.englib_reading_level == englibLevel ? (
                          <p
                            style={{
                              backgroundColor: val.level_color,
                              marginBottom: 1,
                              color: 'black',
                              fontSize: '12px',
                              padding: '6px',
                              maxWidth: '200px',
                              // width: '60%',
                            }}
                            data-balloon-visible
                            aria-label="あなたのリーディングレベル"
                            data-balloon-pos="left"
                            data-balloon-length="medium"
                          >
                            {setEnglibLevelColor(val.color)}
                            {val.englib_reading_level}
                            {val.eiken_level !== ''
                              ? ' | 英検' + val.eiken_level
                              : ' | Starter'}
                          </p>
                        ) : (
                          <p
                            style={{
                              backgroundColor: val.level_color,
                              marginBottom: 1,
                              color: 'black',
                              fontSize: '12px',
                              padding: '6px',
                              // width: '60%',
                            }}
                          >
                            {val.englib_reading_level}
                            {val.eiken_level !== ''
                              ? ' | 英検' + val.eiken_level
                              : ' | Starter'}
                          </p>
                        )}
                      </>
                    )
                  })}
                </td> */}
              </tr>
            </table>

            {/* <div
              className="col-lg-12 col-md-12 p-3"
              style={{
                border: '5px solid #E59866',
                borderRadius: '10px',
                color: '#2C3E50',
                textAlign: 'left',
              }}
            >
              <center>
                <h1
                  style={{
                    color: 'blue',
                    fontSize: '30px',
                    fontWeight: 'bold',
                    marginBottom: 0,
                  }}
                >
                  問題課題提出&nbsp;&nbsp;
              
                  <span
                    className="btn btn-warning"
                    style={{ fontSize: '20px', color: 'white' }}
                  >
                    <a href={answerFile} target="_blank">
                      答えをダウンロード
                    </a>
                  </span>
                </h1>
                <p style={{ color: 'red', fontSize: '12px' }}>
                  1枚アップロードで5Pointゲットできます。
                </p>
              </center>
              お手元のテキストの中の問題(本によってはチャプター毎の終わり、または本の巻末にまとめてあります)は、
              ある程度ストーリー自体を理解できるようになったらテキストに直接書いてください。問題を解いた後は、間違えを赤ペンで必ず直し、その写真を撮ってアップロードしてください。
              <Upload
                // mbn={myMbn}
                // homework_id={HWID}
                currentStep="Endscreen"
                stepStatus="BookQuestion"
                pointKeyNum="RR-4"
                homework_id={HWID}

                // practiceTempId={practiceTempId}
                // thisSubject={thisSubject}
              />
             
              <ViewBookQuestionFile
                currentStep="Endscreen"
                stepStatus="BookQuestion"
              />
            </div> */}
          </div>
        </div>
      </div>
      <div
        className="MenuBig p-3"
        style={{
          // backgroundColor: englibLevelColor,
          color: 'white',
          height: 'auto',
          border: '10px solid #dedede',
          borderRadius: '20px',
        }}
      >
        <UploadHWReading
          copyHW={copyHW}
          currentStep="Endscreen"
          stepStatus="BookQuestion"
          pointKeyNum="RR-4"
          homework_id={HWID}
        />
      </div>
      <span id="homework"></span>
      <CopyrightFooter />
    </>
  )
}

export default MainMenuB
