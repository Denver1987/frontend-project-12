import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLogin } from './pages/Login.jsx';
import { PageRegister } from './pages/Register.jsx';
import { PageChat } from './pages/Chat.jsx';
import { Page404 } from './pages/Page404.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<PageChat />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/register" element={<PageRegister />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
