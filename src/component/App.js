import '../css/App.css';
import { Register } from './Register';
import { Login } from './Login';
import { Admin } from './Admin';
import { Home } from './Home';
import {RequireAuth} from './RequireAuth';
import { Routes, Route } from 'react-router-dom';
import { Missing } from './Missing';
import {Unauthorized} from './Unauthorized';



function App() {
  return (
    <Routes>
      <Route path="/" >
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route element={<RequireAuth/>}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route path="home" element={<Home />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App;
