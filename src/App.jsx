import React from 'react'
import Text from '@/components/Text/Text.jsx'
import Header from '@/components/Header/Header.jsx'

const App = () => {
  return (
    <div className='app'>
      <Header />
      <Text />
      <p className="author">created by <a style={{ color: 'inherit'}} href="https://t.me/mlutfullaev">@mlutfullaev</a></p>
    </div>
  )
}

export default App
