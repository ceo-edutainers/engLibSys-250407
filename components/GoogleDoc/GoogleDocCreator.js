import React, { useState, useEffect } from 'react'
import ZapierForm from 'react-zapier-form'
import axios from 'axios'
import Link from '@/utils/ActiveLink'

export default function GoogleDocCreator({
  mbn,
  tbn,
  homework_id,
  name_eng,
  youtubeID,
}) {
  const [questionList, setQuestionList] = useState([])
  const [qList, setQList] = useState([])

  const [qSummary, setQSummary] = useState('')
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [q3, setQ3] = useState('')
  const [q4, setQ4] = useState('')
  const [q5, setQ5] = useState('')

  const [aSummary, setASummary] = useState('')
  const [a1, setA1] = useState('')
  const [a2, setA2] = useState('')
  const [a3, setA3] = useState('')
  const [a4, setA4] = useState('')
  const [a5, setA5] = useState('')

  useEffect(() => {
    discussQuestion()
  }, [])

  function discussQuestion() {
    console.log('*****youtubeID', youtubeID)
    console.log('*****homework_id', homework_id)

    axios
      .post(DB_CONN_URL + '/get-member-discuss-question/', {
        youtubeID: youtubeID,
        homework_id: homework_id,
      })
      .then((response) => {
        //alert(response.data.response.length)
        //errorの場合
        if (!response.data.status) {
          alert(response.data.message) //for test
        } else {
          //alert(response.data.response)
          setQuestionList(response.data.response)

          console.log('setQuestionList:', questionList)
        }
      })
  }

  return (
    <ZapierForm action="https://hooks.zapier.com/hooks/catch/11324272/bdlyoys">
      {({ error, loading, success }) => {
        if (success) {
        }

        return (
          <div style={{ textAlign: 'left' }}>
            {questionList
              // .filter((val) => {
              //   if (val.question_sort != 'question') {
              //     return val
              //   }
              // })
              .map((val, key) => {
                var question = 'Q:' + val.question
                var your_answer = val.your_answer

                if (val.question != '' && key == '0') {
                  setQ1(question)
                }

                if (val.question != '' && key == '1') {
                  setQ2(question)
                }

                if (val.question != '' && key == '2') {
                  setQ3(question)
                }

                if (val.question != '' && key == '3') {
                  setQ4(question)
                }

                if (val.question != '' && key == '4') {
                  setQ5(question)
                }

                if (val.question_sort == 'summary') {
                  if (val.your_answer != '') {
                    setQSummary('Summary Homework')
                    setASummary(your_answer)
                  }
                  setQSummary('Summary Homework')
                  setASummary('No summary answer')
                }

                if (
                  val.question_sort != 'summary' &&
                  val.question != '' &&
                  key == 0
                ) {
                  if (val.your_answer != '') setA1(your_answer)
                  else setA1('No answer')
                }

                if (
                  val.question_sort != 'summary' &&
                  val.question != '' &&
                  key == 1
                ) {
                  if (val.your_answer != '') setA2(your_answer)
                  else setA2('No answer')
                }

                if (
                  val.question_sort != 'summary' &&
                  val.question != '' &&
                  key == 2
                ) {
                  if (val.your_answer != '') setA3(your_answer)
                  else setA3('No answer')
                }

                if (
                  val.question_sort != 'summary' &&
                  val.question != '' &&
                  key == 3
                ) {
                  if (val.your_answer != '') setA4(your_answer)
                  else setA4('No answer')
                }

                if (
                  val.question_sort != 'summary' &&
                  val.question != '' &&
                  key == 4
                ) {
                  if (val.your_answer != '') setA5(your_answer)
                  else setA5('No answer')
                }
                console.log('q1', q1)
                console.log('a1', a1)
                console.log('q2', q2)
                console.log('a2', a2)
                console.log('q3', q3)
                console.log('a3', a3)
                console.log('q4', q4)
                console.log('a4', a4)
                console.log('q5', q5)
                console.log('a5', a5)
                return (
                  <div>
                    <br />
                    <b>
                      Q{key + 1}.&nbsp;{val.question}
                    </b>
                    <br />
                    {val.your_answer}
                    <br />
                    <br />
                    {qList}
                    <br />
                    <br />
                  </div>
                )
              })}

            {!success && !loading && (
              <div>
                {/* <input type="hidden" name="question" value={qList} /> */}
                <input type="hidden" name="qSummary" value={qSummary} />
                <input type="hidden" name="aSummary" value={aSummary} />
                <input type="hidden" name="q1" value={q1} />
                <input type="hidden" name="q2" value={q2} />
                <input type="hidden" name="q3" value={q3} />
                <input type="hidden" name="q4" value={q4} />
                <input type="hidden" name="q5" value={q5} />

                <input type="hidden" name="a1" value={a1} />
                <input type="hidden" name="a2" value={a2} />
                <input type="hidden" name="a3" value={a3} />
                <input type="hidden" name="a4" value={a4} />
                <input type="hidden" name="a5" value={a5} />
                <input type="hidden" name="mbn" value={mbn} placeholder={mbn} />
                <input type="hidden" name="name_eng" value={name_eng} />

                <input type="hidden" name="homework_id" value={homework_id} />
                <input type="hidden" name="youtubeID" value={youtubeID} />

                {/* <textarea name="Message" placeholder="Your message" /> */}
                <button className="btn btn-danger ml-2">Create Doc</button>
              </div>
            )}
            {loading && <div>Loading...</div>}
            {error && <div>Something went wrong. Please try again later.</div>}
            {success && (
              <div>
                {/* {() => {
                  returnData
                }} */}
                Created Google Doc Succefully!
                {/* <Link href="/tutor/panel/discussion">
                  <button className="btn btn-Info">View GoogleDoc</button>
                </Link> */}
              </div>
            )}
          </div>
        )
      }}
    </ZapierForm>
  )
}
