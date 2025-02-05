import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cards from './components/Cards';
import './App.css';
import Sidebar from './components/Sidebar';
import NewsCard from './components/NewsCard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<NewsCard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
