import { Route, Routes} from 'react-router'
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import './App.css'

function App() {


  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/statistics' element={<Statistics />} />
      </Routes>
    </>
  )
}

export default App
