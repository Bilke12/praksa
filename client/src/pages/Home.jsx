import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import PopisPraksa from '../components/PopisPraksa'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
        <Navbar/>
        <Hero />
        <PopisPraksa />
        <Footer/>
    </div>
  )
}

export default Home