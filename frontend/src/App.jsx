import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLogin, Page404 } from './components/Pages';
import axios from 'axios';
import './App.css';

function App() {
  axios.post('http://localhost:5001/api/v1/signup', { username: 'user1', password: '123456' }).then((response) => {
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
