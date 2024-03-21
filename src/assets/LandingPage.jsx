import { Link } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Correct the path to Navbar component
import Hero from './Components/Hero';
import Footer from './Components/Footer';
import Filter from './Components/Filter';
import NoticeBoard from './Components/NoticeBoard';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="p-20">
        <Filter />
        <NoticeBoard />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
