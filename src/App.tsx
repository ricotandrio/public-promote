import './assets/index.css'
import DataProvider from './context/DataContext'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <DataProvider>
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </>
  )
}

export default App
