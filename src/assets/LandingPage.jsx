import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import Filter from "./Components/Filter";
import NoticeBoard from "./Components/NoticeBoard";
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
