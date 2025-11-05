import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; // 👈 thêm useEffect ở đây
import { Layout } from './components/Layout';
import { Portfolio } from './pages/Portfolio';
import { PsyEdu } from './pages/PsyEdu';
import { Services } from './pages/Services';
import { Products } from './pages/Products';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const handleRegister = (email: string, name: string) => {
    setIsRegistered(true);
    setUserEmail(email);
    setUserName(name);

    // 🧠 Lưu lại vào localStorage để nhớ cho lần sau
    localStorage.setItem('isRegistered', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
  };

  const handleBooking = (
    name: string,
    email: string,
    message: string,
    wantsUpdates: boolean
  ) => {
    console.log('Consultation Booking:', { name, email, message, wantsUpdates });
    localStorage.setItem('bookingName', name);
    localStorage.setItem('bookingEmail', email);
    localStorage.setItem('bookingMessage', message);
    localStorage.setItem('wantsUpdates', wantsUpdates.toString());
  };

  // ✅ Dùng useEffect để chạy khi app load (mount)
  useEffect(() => {
    const registered = localStorage.getItem('isRegistered') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    const name = localStorage.getItem('userName') || '';

    if (registered) {
      setIsRegistered(true);
      setUserEmail(email);
      setUserName(name);
    }
  }, []); // 👈 dependency rỗng => chỉ chạy 1 lần khi app khởi động

  return (
    <Router>
      <Layout
        isRegistered={isRegistered}
        userEmail={userEmail}
        userName={userName}
        onRegister={handleRegister}
        onBooking={handleBooking}
      >
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/psyedu" element={<PsyEdu />} />
          <Route path="/services" element={<Services />} />
          <Route
            path="/products"
            element={
              <Products
                isRegistered={isRegistered}
                userEmail={userEmail}
              />
            }
          />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </Router>
  );
}
