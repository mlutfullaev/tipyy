import cls from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { changeSettings } from '@/store.js'

const Header = () => {
  const {settings} = useSelector(state => state.slice)
  const dispatch = useDispatch()

  useEffect(() => {
  }, [])
  return (
    <header className={cls.header}>
      {Object.keys(settings).map(setting => (
        <button
          key={setting}
          className={settings[setting] ? cls.active : ''}
          onClick={() => dispatch(changeSettings({[setting]: !settings[setting]}))}
        >
          {setting}
        </button>
      ))}
    </header>
  )
}

export default Header
