import React, { useEffect, useRef, useState } from 'react'
import cls from './Text.module.scss'
import { createText } from '@/logics/creatingText.js'
import { useDispatch, useSelector } from 'react-redux'
import { toggleStart } from '@/store.js'

const ignoringTexts = [
  'Tab',
  'Delete',
  'Escape'
]

function Text()  {
  const { start, settings, length } = useSelector(state => state.slice)
  const dispatch = useDispatch()
  const [text, setText] = useState([])
  const [time, setTime] = useState(0)
  const [current, setCurrent] = useState(0)
  const [writed, setWrited] = useState('')
  const input = useRef(null)
  const [onFocus, setOnFocus] = useState(false)
  const timeout = useRef(null)

  const typing = () => {
    if (!start) dispatch(toggleStart())
    // if (e.altKey || e.ctrlKey || ignoringTexts.includes(e.key)) return

    // if (e.key === 'Backspace') {
    //   if (writed.length) {
    //     setWrited(writed => writed.slice(0, -1))
    //   }
    //   if (current) {
    //     setCurrent(current => current - 1)
    //   }
    //   return
    // }

    // setWrited(writedS => {
    //   const writed = [...writedS]
    //   writed.push(e.key)
    //   return writed
    // })
    // setCurrent(current => current + 1)
  }

  useEffect(() => {
    input.current.focus()
  }, [])

  useEffect(() => {
    setText(createText(settings, length))
    clearStates()
  }, [settings])

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

  function clearStates() {
    setWrited('')
    setCurrent(0)
    setTime(0)
  }

  return (
    <div
      className={cls.text}
      onClick={() => input.current.focus()}>
      <div className={`${cls.notFocused} ${!onFocus ? cls.notFocusedActive : ''}`}>Click here to start typing</div>
      <input
        ref={input}
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        onInput={(e) => setWrited(e.target.value)}
        value={writed}
        type="text"
        className={cls.input}
      />
      <p className={`${cls.placeholder} ${!onFocus ? cls.blur : ''}`}>
        {
          text === 'select' ? 'Select at least one parameter' :
          text.map((t, i) => (
            <span
              className={elClass(t, i)}
              key={i}
            >
              {t}
            </span>
          ))
        }
      </p>
      {time ? <p className={cls.time}>{time}</p> : null}
    </div>
  );
};

export default Text;
