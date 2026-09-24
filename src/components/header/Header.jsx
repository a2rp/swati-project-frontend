import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiLogIn, FiLogOut, FiMenu, FiSearch, FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(() => window.localStorage.getItem("token") || "");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsMenuOpen(false);
        setToken(window.localStorage.getItem("token") || "");
    }, [location.pathname]);

    const handleLogout = () => {
        window.localStorage.clear();
        setToken("");
        setIsMenuOpen(false);
        navigate("/login");
    };

    const navClass = ({ isActive }) =>
        isActive ? styles.navlink + " " + styles.active : styles.navlink;

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerInner}>
                <NavLink className={styles.brand} to="/" aria-label="Swati frontend home">
                    <img src={process.env.PUBLIC_URL + "/logo.png"} alt="" />
                    <span>
                        <strong>Swati Frontend</strong>
                        <small>Search and account workspace</small>
                    </span>
                </NavLink>
                <button
                    type="button"
                    className={styles.menuButton}
                    onClick={() => setIsMenuOpen((open) => !open)}
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-navigation"
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                >
                    {isMenuOpen ? <FiX /> : <FiMenu />}
                </button>
                <nav
                    id="primary-navigation"
                    className={isMenuOpen ? styles.navigation + " " + styles.open : styles.navigation}
                    aria-label="Primary navigation"
                >
                    <NavLink className={navClass} to="/">
                        <FiHome aria-hidden="true" />
                        <span>Home</span>
                    </NavLink>
                    {token ? (
                        <>
                            <NavLink className={navClass} to="/search">
                                <FiSearch aria-hidden="true" />
                                <span>Search</span>
                            </NavLink>
                            <button type="button" className={styles.navButton} onClick={handleLogout}>
                                <FiLogOut aria-hidden="true" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <NavLink className={navClass} to="/login">
                            <FiLogIn aria-hidden="true" />
                            <span>Login</span>
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;