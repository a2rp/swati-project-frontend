import { FiArrowRight, FiBookOpen, FiLock, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import styles from "./styles.module.scss";

const Home = () => (
    <div className={styles.page}>
        <Header />
        <main className={styles.homeContent}>
            <section className={styles.hero}>
                <div className={styles.heroCopy}>
                    <p className={styles.eyebrow}>FRONTEND WORKSPACE</p>
                    <h1>Search smarter. Browse with clarity.</h1>
                    <p className={styles.heroText}>
                        A polished client interface for account access and title
                        search, designed to connect with a dedicated API.
                    </p>
                    <div className={styles.actions}>
                        <Link className="button" to="/login">Sign in <FiArrowRight aria-hidden="true" /></Link>
                        <a className={styles.secondaryAction} href="#features">See features</a>
                    </div>
                </div>
                <div className={styles.heroPreview}>
                    <img src={process.env.PUBLIC_URL + "/preview.png"} alt="Swati frontend preview" />
                    <div className={styles.previewNote}>
                        <FiSearch aria-hidden="true" />
                        <span>Search workspace</span>
                    </div>
                </div>
            </section>
            <section className={styles.featureSection} id="features">
                <p className={styles.eyebrow}>BUILT FOR A SIMPLE FLOW</p>
                <div className={styles.featureGrid}>
                    <article className={styles.featureCard}>
                        <FiLock aria-hidden="true" />
                        <h2>Protected access</h2>
                        <p>Use the login route to establish a token for protected searches.</p>
                    </article>
                    <article className={styles.featureCard}>
                        <FiSearch aria-hidden="true" />
                        <h2>Focused search</h2>
                        <p>Search titles through the connected API and review useful details.</p>
                    </article>
                    <article className={styles.featureCard}>
                        <FiBookOpen aria-hidden="true" />
                        <h2>Readable results</h2>
                        <p>View summaries, genres, status, language, and schedules in cards.</p>
                    </article>
                </div>
            </section>
        </main>
    </div>
);

export default Home;