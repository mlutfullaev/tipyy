import cls from './Results.module.scss'

const Results = ({results, close}) => {

  return (
    <div className={`${cls.results} ${results ? cls.active : null}`}>
      { results && <>
        <button className={cls.close} onClick={close}>&times;</button>
        <h2>Results:</h2>
        <p>wpm: {results.wpm}</p>
        <p>time: {results.time}</p>
        <p>mistakes: {results.mistakes}</p>
        <p>words: {results.corrects}</p>
      </>}
    </div>
  )
}

export default Results
