import { useState } from 'react'

import './App.css'
import { useLocation } from 'react-router-dom'
import { Header } from './common/Header/Header'
import { Body } from './pages/Body/Body'

function App() {
  
  const location = useLocation()
  return (
    <>
     <Header />
      <Body />
    </>
  )
}

export default App
