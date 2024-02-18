import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './assets/LandingPage';
import ScholarshipList from './assets/ScholarshipList';
import Home from './assets/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scholarship" element={<ScholarshipList />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
