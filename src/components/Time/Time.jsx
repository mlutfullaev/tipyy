import React, { useEffect, useRef, useState } from 'react'
import cls from './Time.module.scss'

const Time = ({start, results}) => {
  const [time, setTime] = useState(0)
  const timeout = useRef(null)

  useEffect(() => {
    if (!start) {
      if (time) {
        results(time)
        setTime(0)
      }
      return
    }
    timeout.current = setInterval(() => {
      setTime(time => time + 1)
    }, 1000)

    return () => {
      clearTimeout(timeout.current)
    }
  }, [start])
  return (
    <div>
      {time ? <p className={cls.time}>{time}</p> : null}
    </div>
  )
}

export default Time
