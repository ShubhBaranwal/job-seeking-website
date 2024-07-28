import React, { useContext } from 'react'
import { Context } from '../Context/context'
import HeroSection from './HeroSection'
import HowItWorks from './HowItWorks'
import PopularCategories from './PopularCategories'
import PopularCompany from './PopularCompany'

const Home = () => {


  return (
    <div className='container-fluid'>
      <HeroSection/>
      <HowItWorks/>
      <PopularCategories/>
      <PopularCompany/>
    </div>
  )
}

export default Home
