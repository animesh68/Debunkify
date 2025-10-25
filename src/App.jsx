import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './header.jsx';
import Static from './static.jsx';
import Home from './home.jsx';
import Rabbithole from './rabbithole.jsx';
import Tinfoil from './tinfoil.jsx';
import Footer from './footer.jsx';
function App() {
  return (<>
      <Header />
      <Static />
      <Home /> 
      <Rabbithole />
      <Tinfoil />
      <Footer />
    </>
  );
}

export default App;
