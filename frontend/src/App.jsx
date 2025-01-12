import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLogin, Page404, PageChat } from './components/Pages';


import './App.css';


function App() {

  console.log(window.localStorage)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<PageChat />} />
        <Route path="/login" element={<PageLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
