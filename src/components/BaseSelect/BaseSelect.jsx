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
      <p className={`${cls.label} ${data.selected && !data.required? cls.labelActive : ''}`}>{label}</p>
      <div className={cls.options}>
        {
          data.options.map(option => (
            <button
              key={option}
              onClick={() => onClick(option)}
              className={data.selected === option ? 'active' : ''}
            >{option}</button>
          ))
        }
        {
          data.selected && !data.required && <button onClick={() => change(false)}>off</button>
        }
      </div>
    </div>
  )
}

export default BaseSelect
