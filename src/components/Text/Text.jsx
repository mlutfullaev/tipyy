import React, { useEffect, useRef, useState } from 'react'
import cls from './Text.module.scss'
import { createText } from '@/logics/creatingText.js'
import { useSelector } from 'react-redux'
import Time from '@/components/Time/Time.jsx'
import Results from '@/components/Results/Results.jsx'

const ignoringTexts = [
  'Tab',
  'Delete',
  'Escape'
]

function Text()  {
  const slice = useSelector(state => state.slice)
  const [text, setText] = useState([])
  const [writed, setWrited] = useState('')
  const input = useRef(null)
  const [onFocus, setOnFocus] = useState(false)
  const [hasSettings, setHasSettings] = useState(true)
  const [start, setStart] = useState(false)
  const [results, setResults] = useState(null)

  useEffect(() => {
    setText(createText(slice))
    setWrited('')
    setStart(false)
    let hasSettings = true
    Object.keys(slice.settings).forEach(key => {
      if (hasSettings) return
      const setting = slice.settings[key]
      hasSettings = typeof setting === 'boolean' ? setting : setting.selected
    })
    if (!hasSettings) {
      setHasSettings(false)
    }
  }, [slice.settings, slice.language, slice.words])

  useEffect(() => {
    if (writed.length === text.length && writed[writed.length - 1] === text[text.length - 1]) {
      setStart(false)
    }
  }, [writed])

  function elClass(t, i) {
    if (i === writed.length) return `${cls.placeholder} ${cls.active}`
    if (writed.length < i) return cls.placeholder

    if (i === writed.length - 1) {
      if (t === writed[i]) return `${cls.writed} ${cls.active} ${cls.gone}`
      else return `${cls.error} ${cls.active} ${cls.gone}`
    }
    if (t === writed[i]) return cls.writed
    else return cls.error
  }

  function getResults(time) {
    if (writed.length < text.length) return
    const minutes = time / 60
    let corrects = 0;
    let mistakes = 0;
    text.forEach((t, i) => {
      if (writed[i] === t) {
        corrects++
      } else {
        mistakes++
      }
    })
    const wpm = ((corrects / minutes) / 5).toFixed()
    const result = {
      wpm,
      mistakes,
      corrects,
      time
    }
    setResults(result)
    setTimeout(() => {
      setResults(null)
    }, 5000)
    setWrited('')
    setText(createText(slice))
  }

  return (
    <>
      <div
        className={cls.text}
        onClick={() => hasSettings ? input.current.focus() : null}>
        <div className={`${cls.notFocused} ${!onFocus ? cls.active : ''}`}>{hasSettings ? 'Click here to start typing' : 'Select at least one parameter'}</div>
        <input
          ref={input}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onInput={(e) => {
            setWrited(e.target.value)
            if (!start) setStart(true)
          }}
          value={writed}
          type="text"
          className={cls.input}
        />
        <p className={`${cls.placeholder} ${!onFocus ? cls.textBlur : ''}`}>
          {
            text.map((t, i) => (
              <span
                className={elClass(t, i)}
                key={i + t}
              >
              {t}
            </span>
            ))
          }
        </p>
        <Time start={start} results={getResults}/>
      </div>
      <Results results={results} close={() => setResults(null)}/>
    </>
  );
};

export default Text;
