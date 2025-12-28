import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Developer.css";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (e) => {
      const container = menuRef.current;
      if (!container) return;
      if (container.contains(e.target)) return;
      setIsMenuOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div className="header-nav">
      <Link className="header-logo" to="/home">
        <img src="/images/logo.png" alt="Disney+" />
      </Link>

      <div className="header-navmenu">
        <Link to="/home">
          <img src="/images/home-icon.svg" alt="HOME" />
          <span>HOME</span>
        </Link>
      </div>

      <div className="header-signout" ref={menuRef}>
        <button
          type="button"
          className="header-profilebtn"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <img
            className="header-userimg"
            src="/images/group-icon.png"
            alt="Profile"
          />
        </button>

        <div
          className={`header-dropdown ${isMenuOpen ? "open" : ""}`}
          role="menu"
        >
          <Link
            className="header-dropdownitem"
            to="/profile"
            role="menuitem"
            onClick={() => setIsMenuOpen(false)}
          >
            My Profile
          </Link>
          <Link
            className="header-dropdownitem"
            to="/settings"
            role="menuitem"
            onClick={() => setIsMenuOpen(false)}
          >
            Settings
          </Link>
          <button
            type="button"
            className="header-dropdownitem header-dropdownbtn"
            role="menuitem"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
