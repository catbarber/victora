import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import BookSeries from './pages/BookSeries';
import Donation from './pages/Donation';
import DonationSuccess from './pages/DonationSuccess';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book-series" element={<BookSeries />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/donation-success" element={<DonationSuccess />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;