import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLogin, Page404 } from './components/Pages';
import axios from 'axios';
import './App.css';

function App() {
  const axios1 = axios.create({baseURL: 'http://127.0.0.1:5101/',});
  axios1.post('api/v1/login', { username: 'admin', password: 'admin' }).then((response) => {
    console.log(response.data); // => { token: ..., username: 'admin' }
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<PageLogin />} />
        <Route path="/login" element={<PageLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
