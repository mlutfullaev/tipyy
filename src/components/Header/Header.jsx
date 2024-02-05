import cls from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { changeLanguage, changeSettings, changeWords } from '@/store.js'
import BaseSelect from '@/components/BaseSelect/BaseSelect.jsx'

const Header = () => {
  const {settings, language, words} = useSelector(state => state.slice)
  const dispatch = useDispatch()

  useEffect(() => {
  }, [])

  return (
    <header className={cls.header}>
      {Object.keys(settings).map(setting => {
          if (typeof settings[setting] === 'boolean') return (
            <button
              key={setting}
              className={`${cls.button} ${settings[setting] ? cls.active : ''}`}
              onClick={() => dispatch(changeSettings({[setting]: !settings[setting]}))}
            >
              {setting}
            </button>
          )
          else return (
            <BaseSelect
              label={setting}
              data={settings[setting]}
              change={(option) => dispatch(changeSettings({[setting]: {...settings[setting], selected: option}}))}
            />
          )
        })
      }
      <div className={cls.line}></div>
      <BaseSelect
        label='language'
        data={language}
        change={(option) => dispatch(changeLanguage(option))}
      />
      <BaseSelect
        label='words'
        data={words}
        change={(option) => dispatch(changeWords(option))}
      />
    </header>
  )
}

export default Header
