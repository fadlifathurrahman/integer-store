import { GiGalaxy } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <GiGalaxy size={24} />
        <div>IntegerStore</div>
      </Link>
    </header>
  );
}
