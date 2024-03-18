import React, {useState} from 'react';
import cls from './styles.module.scss'
import Text from "../../components/Text/Text.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addCustom} from "../../store.js";
const Index = () => {
  const [custom, setCustom] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const changeState = () => {
    const toType = custom.split('')
    navigate('/')
    dispatch(addCustom(toType))
  }

  return (
    <div className={`app ${cls.custom}`}>
      <textarea className={cls['custom-input']} placeholder={'Enter your custom text here'} value={custom} onChange={(e)=> setCustom(e.target.value)}/>
      <button className={cls['custom-button']} onClick={()=> changeState()}>Accept</button>
    </div>
  );
};

export default Index;