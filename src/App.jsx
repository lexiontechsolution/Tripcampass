import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DestinationsPage from './pages/DestinationsPage';
import HolidaysPage from './pages/HolidaysPage';
import AboutPage from './pages/AboutPage';
import PlanTripPage from './pages/PlanTripPage';
import AdminPage from './pages/AdminPage';
import PackageDetailPage from './pages/PackageDetailPage';
import CategoryPage from './pages/CategoryPage';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.toLowerCase().startsWith('/admin');

  return (
    <div className="app">
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/holidays" element={<HolidaysPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/plan-my-trip" element={<PlanTripPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/package/:id" element={<PackageDetailPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;
