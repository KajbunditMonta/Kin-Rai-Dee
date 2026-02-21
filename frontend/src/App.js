import LoginRegister from './pages/LoginRegister.js';
import ForgotPassword from './pages/ForgotPassword.js';
import Register from './pages/Register.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LoginRegister />} />
        <Route path = "/ForgotPassword" element = {<ForgotPassword />} />
        <Route path = "/Register" element = {<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
