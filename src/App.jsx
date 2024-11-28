import React from 'react';
import LoginUser from './components/login';
import RegisterUser from './components/register';
import Dashboard from './Pages/dashboard';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
function App() {
    return (
    <>
     <Router>
        <Routes>
            <Route path='/' element={<RegisterUser />}/>
            <Route path='/login' element={<LoginUser />}/>
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
     </Router>
    </>
  )
}

export default App
