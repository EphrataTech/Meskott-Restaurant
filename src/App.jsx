import React from 'react'
import './App.css'
import Navbar from '../src/components/Navbar'
import Hero from '../src/components/Hero'
import Footer from './components/Footer'

export default function App() {
    return(
       <>
       <Navbar />
       <Hero/>
       <Footer/>
       </>
    )
}