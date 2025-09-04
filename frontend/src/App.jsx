import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LeadForm from './components/LeadForm'
import LeadList from './components/LeadList'
import LeadStats from './components/LeadStats'

function App() {

  return (
    <div className='' >

      <div className=''>

        <div className='bg-white shadow-xl py-8 '  >
          <h1 className='text-3xl max-w-[1250px] mx-auto px-5' >Lead Management</h1>
        </div>

        <div className='max-w-[1250px] mx-auto px-5'>
          <div className='mt-10' >
            <LeadStats />
          </div>

          <div className='grid md:grid-cols-2 md:gap-10' >
            <LeadForm />
            <LeadList />
          </div>
        </div>


      </div>

    </div>
  )
}

export default App
