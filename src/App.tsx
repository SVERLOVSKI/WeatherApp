import { BrowserRouter as Router, Route, Routes } from 'react-router'
import { useState } from 'react'
import MainPage from './pages/mainPage'
import SingleForecastPage from './pages/singleForecastPage'
import './App.css'


function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  return (
    <Router basename='/SkyWatch'>
      <Routes>
        <Route path="/" element={<MainPage darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
        <Route path="/forecast/:date" element={<SingleForecastPage darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
      </Routes>
    </Router>
  )
}

export default App
