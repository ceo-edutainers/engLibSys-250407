import { createMuiTheme, TextField, ThemeProvider } from '@material-ui/core'
import React from 'react'
// import './DictionaryHeader.css'
import MenuItem from '@material-ui/core/MenuItem'
import countries from '../../data/category'
import { debounce } from 'lodash'

const Header = ({
  category,
  setCategory,
  setWord,
  word,
  setMeanings,
  LightTheme,
}) => {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: LightTheme ? '#000' : '#fff',
      },
      type: LightTheme ? 'light' : 'dark',
    },
  })

  const handleChange = (e) => {
    setCategory(e.target.value)
    setWord('')
    setMeanings([])
  }

  const handleText = debounce((text) => {
    setWord(text)
  }, 500)

  return (
    <div
      className="header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        height: '35vh',
        width: '100%',
      }}
    >
      <span
        className="title"
        style={{
          fontSize: '7vw',
          textTransform: 'uppercase',
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {word ? word : 'Word Hunt'}
      </span>
      <div
        className="inputs"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            id="filled-basic"
            // value={word}
            label="Search a Word"
            onChange={(e) => handleText(e.target.value)}
            style={{ width: '43%' }}
          />
          <TextField
            select
            label="Language"
            value={category}
            onChange={(e) => handleChange(e)}
            className="select"
            style={{ width: '43%' }}
          >
            {countries.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  )
}

export default Header
