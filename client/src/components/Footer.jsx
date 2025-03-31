import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-center gap-4 py-3 mt-20'>
        <img width={160} src={assets.logo} alt="" />
        <p className='border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright © 2025 Sveučilište u Mostaru | Sva prava pridržana | Razvio i dizajnirao Matej Bilinovac</p>
    </div>
  )
}

export default Footer
