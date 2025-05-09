import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-red-700 py-8">
      <div className="container mx-auto">
        <nav>
          <ul className="flex justify-between gap-8">
            <Link className="text-white" to="/">
              Home
            </Link>
            <Link className="text-white" to="/carrinho">
              <img src="/carrinho-de-compras.png" alt="" />
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
