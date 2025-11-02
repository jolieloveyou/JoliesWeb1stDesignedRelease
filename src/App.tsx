import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
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
    // In a real app, this would save to backend/Supabase
    localStorage.setItem('isRegistered', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
  };

  // Check localStorage on mount
  useState(() => {
    const registered = localStorage.getItem('isRegistered') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    const name = localStorage.getItem('userName') || '';
    if (registered) {
      setIsRegistered(true);
      setUserEmail(email);
      setUserName(name);
    }
  });

  return (
    <Router>
      <Layout 
        isRegistered={isRegistered} 
        userEmail={userEmail}
        userName={userName}
        onRegister={handleRegister}
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
