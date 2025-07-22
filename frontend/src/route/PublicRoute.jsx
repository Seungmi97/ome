import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/public/Login';
import Signup from '@/pages/public/Signup';
import PublicMain from '@/pages/public/Mainpage';
import RecipeDetail from '@/pages/public/RecipeDetail';
import PaymentPage from '@/pages/public/payments/PaymentPage';
import PaymentFail from '@/pages/public/payments/PaymentFail';

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicMain />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
      <Route path="/payments" element={<PaymentPage />} />
      <Route path="/payments/fail" element={<PaymentFail />} />
    </Routes>
  );
}