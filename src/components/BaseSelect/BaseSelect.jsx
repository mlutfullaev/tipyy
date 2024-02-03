import cls from './BaseSelect.module.scss'

const BaseSelect = ({data, label, change}) => {
  const onClick = (option) => {
    if (data.selected === option && !data.required) {
      change(false)
    } else {
      change(option)
    }
  }
  return (
    <div className={cls.baseSelect}>
      <p className={`${cls.label} ${data.selected ? cls.labelActive : ''}`}>{label}</p>
      <div className={cls.options}>
        {
          data.options.map(option => (
            <button
              onClick={() => onClick(option)}
              className={data.selected === option ? 'active' : ''}
            >{option}</button>
          ))
        }
      </div>
    </div>
  )
}

export default BaseSelect
