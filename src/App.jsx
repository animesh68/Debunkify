// --- Corrected App.jsx ---
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './header.jsx';
import Static from './static.jsx';
import Home from './home.jsx';
import Rabbithole from './rabbithole.jsx';
import Tinfoil from './tinfoil.jsx';
import Footer from './footer.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Static />} />
    
        <Route path="/rabbithole" element={<Rabbithole />} />
        
        <Route path="/tinfoil" element={<Tinfoil />} />
        
        <Route path="/home" element={<Home />} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;