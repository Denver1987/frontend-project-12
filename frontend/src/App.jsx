import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';
import PageLogin from './pages/Login.jsx';
import PageRegister from './pages/Register.jsx';
import { PageChat } from './pages/Chat.jsx';
import Page404 from './pages/Page404.jsx';
import './App.css';

const rollbarConfig = {
  accessToken: '74a9b8c4a3ec43a48ae5d110670c29ba',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<PageChat />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/signup" element={<PageRegister />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);

export default App;
