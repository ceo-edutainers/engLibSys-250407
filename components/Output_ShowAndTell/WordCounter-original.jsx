import react, { useState, useContext, useEffect, useMemo } from 'react'
import axios from 'axios'
import { QuizContext } from './Contexts'
const WordCounter = () => {
  const [firstValue, setFirstValue] = useState('')
  const [numberOfCharacters, setNumberOfCharacters] = useState('')
  const [withoutWhiteSpace, setWithoutWhiteSpace] = useState('')
  const [numberOfWords, setNumberOfWords] = useState('')
  const [linesCount, setLinesCount] = useState('')
  const [wordSelectionCount, setWordSelectionCount] = useState('')

  const firstHandle = (event) => {
    var input = event.target.value

    const text = document.getElementById('textarea').value
    const linesCount = text.split('/\r|\r\n|\n/').length

    const numberOfCharacters = input === '' ? 0 : input.split('').length
    const withoutWhiteSpace =
      input === '' ? 0 : input.split('').filter((char) => char !== ' ').length
    const words =
      input === '' ? 0 : input.split(' ').filter((word) => word.trim()).length
    const lines = input === '' ? 1 : input.split(/\n/g).length

    setFirstValue(input)
    setNumberOfCharacters(numberOfCharacters)
    setWithoutWhiteSpace(withoutWhiteSpace)
    setNumberOfWords(words)
    setLinesCount(lines)
    setWordSelectionCount('')
  }

  // This function is responsible for the word counting

  const wordCounter = (e) => {
    e.preventDefault()
    var keys = []
    var counts = {}
    // const input = this.state.firstValue
    const input = firstValue
      .replace(/\W/g, ' ')
      .replace(/[0-9]/g, ' ')
      .split(' ')
      .filter((word) => word.trim())
    for (let i = 0; i < input.length; i++) {
      var word = input[i]
      if (counts[word] === undefined) {
        counts[word] = 1
        keys.push(word)
      } else {
        counts[word] += 1
        keys.push(word)
        // console.log(keys);
      }
      keys.sort()

      for (let i = 0; i < keys.length; i++) {
        var key = keys[i]
        var result = key + ' - ' + counts[key]
        console.log(result)
      }
      // this.setState({
      //   wordSelectionCount: result,
      // })
      setWordSelectionCount(result)
    }
  }

  var words = numberOfWords
  var lines = linesCount
  var wordCounts = wordSelectionCount
  // console.log(wordCounts)

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <h1>Character Counter</h1>
          <p>
            Characters <span>{numberOfCharacters}</span> Without White Space{' '}
            <span>{withoutWhiteSpace}</span> Words <span>{numberOfWords}</span>{' '}
            Lines <span>{linesCount}</span>
          </p>
          <textarea
            id="textarea"
            type="text"
            placeholder="Please type some text..."
            value={firstValue}
            onChange={(e) => {
              firstHandle(e)
            }}
          />
          <h1>Word Counting</h1>
          {/* This button calls the wordCounter Method which should display all the Word listings */}
          <button
            className="btn"
            onClick={(e) => {
              wordCounter(e.target.value)
            }}
          >
            Words Count
          </button>
          <p>
            <span>{wordCounts}</span>
          </p>
        </form>
      </header>
    </div>
  )
}

export default WordCounter
