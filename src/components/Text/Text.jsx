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

  function restart () {
    setStart(false)
    setText(createText(slice))
    setWrited('')
    input.current.focus()
    setOnFocus(true)
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
        <div className={!onFocus ? cls.textBlur : ''}>
          <p className={cls.placeholder}>
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
        <button className={cls.restart} onClick={restart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={21}
            fill="none"
          >
            <mask
              id="a"
              width={24}
              height={24}
              x={-2}
              y={-2}
              maskUnits="userSpaceOnUse"
              style={{
                maskType: "luminance",
              }}
            >
              <path fill="#fff" d="M22-2H-2v24h24V-2Z" />
            </mask>
            <g mask="url(#a)">
              <path d="M16.364 1.058a.75.75 0 0 1 .75.75V6.05a.75.75 0 0 1-.75.75h-4.243a.75.75 0 0 1 0-1.5h2.36A7.251 7.251 0 0 0 4.34 15.53a.75.75 0 0 1-1.17.939A8.751 8.751 0 0 1 15.614 4.288v-2.48a.75.75 0 0 1 .75-.75Zm1.171 7.146a.75.75 0 0 1 .918.53A8.753 8.753 0 0 1 6.172 18.87a.75.75 0 0 1 .656-1.348 7.253 7.253 0 0 0 10.176-8.4.75.75 0 0 1 .531-.918Z" />
            </g>
          </svg>

        </button>
      </div>
      <Results results={results} close={() => setResults(null)}/>
    </>
  );
}

export default Text;
