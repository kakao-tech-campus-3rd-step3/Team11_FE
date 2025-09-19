import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import MeetingRoom from './pages/MeetingRoom';
import GlobalStyle from './style/GlobalStyle';
import KakaoLogin from './pages/KakaoLogin';
function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/meeting-room" element={<MeetingRoom />} />
        <Route path="/kakaoLogin" element={<KakaoLogin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
