import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLogin } from './pages/Login.jsx';
import { PageRegister } from './pages/Register.jsx';
import { PageChat } from './pages/Chat.jsx';
import { Page404 } from './pages/Page404.jsx';
import { Provider, ErrorBoundary } from '@rollbar/react';
import './App.css';

const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  environment: 'production',
};

function TestError() {
  const a = null;
  return a.hello();
}

function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Page404 />} />
            <Route path="/" element={<PageChat />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/singup" element={<PageRegister />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  )
}

export default App;
