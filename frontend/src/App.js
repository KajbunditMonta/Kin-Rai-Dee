import LoginRegister from './pages/LoginRegister.js';
import ForgotPassword from './pages/ForgotPassword.js';
import NewPassword from './pages/NewPassword.js';
import RegisterRole from './pages/RegisterRole.js';
import RegisterCustomer from './pages/RegisterCustomer.js';
import RegisterRestaurant from './pages/RegisterRestaurant.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LoginRegister />} />
        <Route path = "/ForgotPassword" element = {<ForgotPassword />} />
        <Route path = "/NewpassWord" element = {<NewPassword />}/>
        <Route path = "/RegisterCustomer" element = {<RegisterCustomer />} />
        <Route path = "/RegisterRole" element = {<RegisterRole />} />\
        <Route path = "/RegisterRestaurant" element = {<RegisterRestaurant />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
