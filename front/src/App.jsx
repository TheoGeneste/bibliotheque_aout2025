import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login';
import Register from './Pages/Register';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './Context/AuthContext';
import NavBar from './Components/NavBar';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
