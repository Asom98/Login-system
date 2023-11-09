import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import App from './component/App'
import { AuthProvider } from '../src/context/authProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>

)