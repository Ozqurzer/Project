import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";

import { AuthProvider } from "./context/authContext";


function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/task' element={<h1>task</h1>} />

      </Routes>
    </BrowserRouter>
    </AuthProvider>

  )
}

export default App;
