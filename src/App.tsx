import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Onboarding from '@/pages/Onboarding';
import Home from '@/pages/Home';
import MeetingRoom from '@/pages/MeetingRoom';
import GlobalStyle from '@/style/GlobalStyle';
import KakaoLogin from '@/pages/KakaoLogin';
import RoomCreate from '@/pages/RoomCreate';
import SearchRoom from '@/pages/SearchRoom';
import LocationPicker from '@/pages/LocationPicker';
import ParticipantEvaluation from './pages/ParticipantEvaluation';
import My from './pages/My';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my" element={<My/>} />
        <Route path="/create-room" element={<RoomCreate />} />
        <Route path="/search-room" element={<SearchRoom />} />
        <Route path="/meeting-room" element={<MeetingRoom />} />
        <Route path="/participant-evaluation" element={<ParticipantEvaluation />} />
        <Route path="/kakaoLogin" element={<KakaoLogin />} />
        <Route path="/create-room/location" element={<LocationPicker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
