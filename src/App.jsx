import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DisplayQR from './displayQR'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DisplayQR/>
    </>
  )
}

export default App
