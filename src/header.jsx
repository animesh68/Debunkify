
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header_div">
        <Link to="/" className="home">
        <h1 className="title">
          RabbitHole.AI
        </h1>
        </Link>
        <nav className="nav">
          <Link to="/home" className="home">
            Home
          </Link>
          <Link to="/rabbithole" className="rhole">
            RabbitHole
          </Link>
          <Link to="/tinfoil" className="tinfoil">
            TinFoil
          </Link>
        </nav>
      </div>
    </header>
  );
}
export default Header;