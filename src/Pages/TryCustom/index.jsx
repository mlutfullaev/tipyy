import React, {useState} from 'react';
import cls from './styles.module.scss'
import Text from "../../components/Text/Text.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addCustom} from "../../store.js";
const Index = () => {
  const [custom, setCustom] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const changeState = (e) => {
    e.stopPropagation()
    if (!custom.length) {
      return setError(true)
    }
    const toType = custom.split('')
    navigate('/')
    dispatch(addCustom(toType))
  }

  const close = () => {
    navigate('/')
  }

  return (
    <div className={`app ${cls.custom}`} onClick={close}>
      <textarea className={`${cls['custom-input']} ${error && !custom.length ? cls['error'] : ''}`} onClick={(e) => e.stopPropagation()} placeholder={'Enter your custom text here'} value={custom} onChange={(e)=> setCustom(e.target.value)}/>
      <button className={cls['custom-button']} onClick={changeState}>Accept</button>
    </div>
  );
};

export default Index;