import React from 'react'
import NavBar from '../components/NavBar'
import HomeBanner from '../components/HomeBanner'
import HomeAbout from '../components/HomeAbout'
import HomeGallery from '../components/HomeGallery'
import Footer from '../components/Footer'
import HomeEvents from '../components/HomeEvents'


function Home() {
  return (
    <div>
        <NavBar/>
        <HomeBanner/>
        <HomeAbout/>
        <HomeGallery/>
        <HomeEvents/>
        <Footer/>
    </div>
  )
}

export default Home