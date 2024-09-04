import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
import { Header } from './components/ui/header'
import { Hero } from './components/ui/hero'
import "./input.css"
import './App.css'
import newyorkImage from "../src/components/ui/newyork.jpg"; 
import { Planner } from './components/ui/planner'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-cover  bg-center'
    style={{ backgroundImage: `url(${newyorkImage})` }}>

   <Header/>
   <Hero/>
   
   </div>
   
  )
}

export default App
