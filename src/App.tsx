import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { Homepage } from './pages/homepage'
import { User } from './pages/User'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path="/dashboard" element={<User/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
