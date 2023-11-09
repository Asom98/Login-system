import { Register } from './Register';
import { Login } from './Login';
import { Admin } from './Admin';
import { Home } from './Home';
import '../css/App.css';
import { Routes, Route } from 'react-router-dom';
import { Missing } from './Missing';




function App() {
  return (
    <Routes>
      <Route path="/" >
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App;
