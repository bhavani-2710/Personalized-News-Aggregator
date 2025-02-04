import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Cards from './components/Cards';
import './App.css'
import Sidebar from './components/Sidebar'
import NewsCard from './components/NewsCard'



function App() {
  return (
  <>
  <Navbar />
  <Sidebar />
  <NewsCard />
  </>
  )
}

export default App
