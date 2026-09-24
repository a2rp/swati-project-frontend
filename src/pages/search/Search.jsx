import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import styles from "./styles.module.scss";

const Search = () => {
    const navigate = useNavigate();
    const [token] = useState(() => window.localStorage.getItem("token") || "");
    const [searchInput, setSearchInput] = useState("");
    const [tvData, setTvData] = useState({});
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [navigate, token]);

    const results = useMemo(
        () => (Array.isArray(tvData) ? tvData : Object.values(tvData || {})),
        [tvData],
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!searchInput.trim()) {
            setResponse("Enter a title to search.");
            return;
        }

        setIsLoading(true);
        setTvData({});
        setResponse("");

        try {
            const result = await axios.post(
                "http://localhost:1198/api/search?title=" +
                    encodeURIComponent(searchInput.trim()),
                {},
                { headers: { Authorization: token } },
            );
            setTvData(result.data.message || {});
        } catch (error) {
            setResponse(
                error.response?.data?.message ||
                    "Unable to connect to the search service.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.content}>
                <div className={styles.headingRow}>
                    <div>
                        <p className={styles.eyebrow}>PROTECTED SEARCH</p>
                        <h1>Find a title.</h1>
                        <p className={styles.description}>Search the connected catalog and review the details returned by the API.</p>
                    </div>
                    <div className={styles.headingIcon}><FiSearch aria-hidden="true" /></div>
                </div>

                <form className={styles.searchForm} onSubmit={handleSubmit}>
                    <label htmlFor="search-title">Title</label>
                    <div className={styles.searchControls}>
                        <input id="search-title" type="search" placeholder="Try a show title" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
                        <button className="button" type="submit" disabled={isLoading}>
                            {isLoading ? "Searching..." : "Search"}
                        </button>
                    </div>
                </form>

                {response && <p className="errorMessage">{response}</p>}

                <div className={styles.resultsHeader}>
                    <h2>Results</h2>
                    <span>{results.length} found</span>
                </div>

                {isLoading && <p className="statusMessage">Loading results...</p>}
                {!isLoading && !response && results.length === 0 && (
                    <p className="statusMessage">No results yet. Search for a title to begin.</p>
                )}

                <div className={styles.resultsGrid}>
                    {results.map((item, index) => {
                        const show = item.show || item;
                        return (
                            <article className={styles.resultCard} key={show.id || index}>
                                {show.image?.medium ? (
                                    <img src={show.image.medium} alt={show.name + " poster"} />
                                ) : (
                                    <div className={styles.imagePlaceholder}>No image</div>
                                )}
                                <div className={styles.resultBody}>
                                    <h3>{show.name || "Untitled"}</h3>
                                    {show.summary && <div className={styles.summary}>{parse(show.summary)}</div>}
                                    <dl>
                                        <div><dt>Type</dt><dd>{show.type || "Not available"}</dd></div>
                                        <div><dt>Language</dt><dd>{show.language || "Not available"}</dd></div>
                                        <div><dt>Genre</dt><dd>{show.genres?.join(", ") || "Not available"}</dd></div>
                                        <div><dt>Status</dt><dd>{show.status || "Not available"}</dd></div>
                                        <div><dt>Schedule</dt><dd>{show.schedule ? Object.values(show.schedule).join(" - ") : "Not available"}</dd></div>
                                    </dl>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default Search;