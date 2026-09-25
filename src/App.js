import { lazy, Suspense, useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import loadingGIF from "./assets/images/loading-gif.gif";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Search = lazy(() => import("./pages/search"));

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (process.env.NODE_ENV !== "test") {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
    }, [pathname]);

    return null;
};

const LoadingScreen = () => (
    <div className="loadingScreen" role="status" aria-live="polite">
        <img src={loadingGIF} alt="" />
        <span>Loading page...</span>
    </div>
);

function App() {
    const [showGoTop, setShowGoTop] = useState(false);

    useEffect(() => {
        const updateGoTop = () => {
            setShowGoTop(window.scrollY > 420);
        };

        window.addEventListener("scroll", updateGoTop, { passive: true });
        updateGoTop();

        return () => window.removeEventListener("scroll", updateGoTop);
    }, []);

    return (
        <div className="App">
            <ScrollToTop />
            <div className="routesContainer">
                <Suspense fallback={<LoadingScreen />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/search" element={<Search />} />
                    </Routes>
                </Suspense>
            </div>
            <Footer />
            <button
                className={"goTopButton" + (showGoTop ? " isVisible" : "")}
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Go to top"
                title="Go to top"
            >
                <FiArrowUp aria-hidden="true" />
            </button>
        </div>
    );
}

export default App;
