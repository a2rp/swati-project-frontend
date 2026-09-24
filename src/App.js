import "./App.css";
import { lazy, Suspense, useEffect } from "react";
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
        </div>
    );
}

export default App;