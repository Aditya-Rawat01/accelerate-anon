import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { Homepage } from './pages/homepage'
import { User } from './pages/User'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {RecoilRoot} from 'recoil'
function App() {
 
  const queryClient= new QueryClient()
  return (
    <BrowserRouter>
    <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path="/dashboard" element={<User/>}/>
      </Routes>
      </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
