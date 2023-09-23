
import './App.css';
import Registration from './components/Register';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from './components/Profile';
import { AuthProvider } from './AuthContext'; // Import your authentication context
import UpdateProfile from './components/UpdateProfile';


function App() {
  return (
    <>
    <BrowserRouter>
          {/* <Navbar /> */}
          <div className="container">
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/Register" element={<Registration />} />
              <Route exact path="/Profile" element={<Profile/>} />
              <Route exact path="/UpdateProfile" element={<UpdateProfile/>} />
            </Routes>
           </AuthProvider>
          </div>
        </BrowserRouter>
    </>
  );
}

export default App;
