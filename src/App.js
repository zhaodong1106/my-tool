
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BasicLayout from './pages/BasicLayout';
import IpQuery from './pages/IpQuery';
import Captcha from './components/captcha/Captcha';
import JsonPage from './pages/JsonPage';
import HttpOnlinePage from './pages/HttpOnlinePage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<BasicLayout />}>
          <Route index element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/captcha' element={<Captcha />} />
          <Route path='/ipQuery' element={<IpQuery />} />
          <Route path='/json' element={<JsonPage />} />
          <Route path='/httpOnline' element={<HttpOnlinePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

function NotFound(){
  return (
    <div>
      NOT FOUND
    </div>
  )
}
export default App;
