import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/public/Login';
import Signup from '@/pages/public/Signup';
import PublicMain from '@/pages/public/Mainpage';

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicMain />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}