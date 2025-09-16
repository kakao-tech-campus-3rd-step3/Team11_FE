import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import MeetingRoom from '@/pages/MeetingRoom';
import GlobalStyle from '@/style/GlobalStyle';
import RoomCreate from '@/pages/RoomCreate';
import SearchRoom from '@/pages/SearchRoom';
import LocationPicker from '@/pages/LocationPicker';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-room" element={<RoomCreate />} />
        <Route path="/search-room" element={<SearchRoom />} />
        <Route path="/meeting-room" element={<MeetingRoom />} />
        <Route path="/create-room/location" element={<LocationPicker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
