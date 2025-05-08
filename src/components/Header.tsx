import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-red-700 py-8">
      <div className="container mx-auto">
        <nav>
          <ul className="flex gap-8">
            <Link to="/">Home</Link>
            <Link to="/carrinho">Carrinho</Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
