import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import PopisPraksa from '../components/PopisPraksa'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <PopisPraksa />
        <div className="flex-grow"></div>
        <Footer />
    </div>
  )
}

export default Home
