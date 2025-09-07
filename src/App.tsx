import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import MeetingRoom from '@/pages/MeetingRoom';
import GlobalStyle from '@/style/GlobalStyle';
function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/meeting-room" element={<MeetingRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
