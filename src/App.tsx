import './assets/index.css'
import DataProvider from './context/DataContext'
import About from './pages/About'
import Help from './pages/Help'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import { AnimatePresence } from 'framer-motion'
import Footer from './components/Footer'

export const motionInitial =  {
  opacity: 0,
}

export const motionAnimate = {
  opacity: 1,
  transition: {
    ease: 'linear',
    duration: 0.6,
  },
}


export const motionExit = {

}

export const motionVariant = {

}

function App() {
  return (
    <>
      <BrowserRouter>
        <DataProvider>
          <AnimatePresence>
            <Navigation />
            
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/help' element={<Help/>} />
            </Routes>

            <Footer/>
          </AnimatePresence>
        </DataProvider>
      </BrowserRouter>
    </>
  )
}

export default App
