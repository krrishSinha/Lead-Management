import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LeadForm from './components/LeadForm'
import LeadList from './components/LeadList'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Leads from './pages/Leads'

function App() {

  return (
    <div className='' >

      {/* navigation  */}
      <Navbar />

      <Routes>
        <Route path='/' element={<Leads />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>

    </div>
  )
}

export default App
