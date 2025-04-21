import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import KitchenDetailsPage from './pages/KitchenDetailsPage';
import { KitchenProvider } from './context/KitchenContext';

function App() {
  return (
    <KitchenProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-neutral-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/kitchen/:id" element={<KitchenDetailsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </KitchenProvider>
  );
}

export default App;