import { useState } from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <div className="flex-grow-1 container py-5 mt-5">

          <h1>Lamasan Restaurante Japonês</h1>
        </div>

        <Footer />
      </div>

    </>
  )
}

export default App
