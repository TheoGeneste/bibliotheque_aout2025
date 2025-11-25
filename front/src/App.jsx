import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login';
import Register from './Pages/Register';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './Context/AuthContext';
import NavBar from './Components/NavBar';
import Profile from './Pages/Profile';
import AuthWrapper from './Wrappers/AuthWrapper';
import Admin from './Pages/Admin';
import AdminWrapper from './Wrappers/AdminWrapper';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin' element={<AdminWrapper><Admin /></AdminWrapper>} />
            <Route path='/profile' element={<AuthWrapper><Profile /></AuthWrapper>} />
            <Route path='*' element={<NotFound />} />
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
