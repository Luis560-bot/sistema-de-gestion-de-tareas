import React from 'react'

/* se importan los componentes necesarios para el enrutamiento, como BrowserRouter, Routes y Route desde react-router-dom. */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './assets/Pages/Homepage'
import Taskform from './assets/Pages/Taskform'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/tasks/:id' element={<Taskform />} />
        <Route path="/tasks/new" element={<Taskform />} />
      </Routes>
    </Router>
  )
}

export default App
