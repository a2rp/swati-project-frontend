import { createElement } from "react";
import { FiCode, FiCoffee, FiFacebook, FiGithub, FiGlobe, FiHeart, FiLinkedin, FiMail, FiYoutube } from "react-icons/fi";
import styles from "./footer.module.scss";

const links = [
    ["Portfolio", "https://www.ashishranjan.net/", FiGlobe],
    ["GitHub", "https://github.com/a2rp", FiGithub],
    ["CodePen", "https://codepen.io/ash1198", FiCode],
    ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", FiLinkedin],
    ["Facebook", "https://www.facebook.com/theash.ashish/", FiFacebook],
    ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", FiYoutube],
    ["Support", "https://a2rp-donation-page.netlify.app/", FiHeart],
    ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", FiCoffee],
    ["Patreon", "https://patreon.com/a2rp", FiHeart],
    ["Email", "mailto:ash.ranjan09@gmail.com", FiMail],
];

const Footer = () => (
    <footer className={styles.footer}>
        <p>
            Copyright &copy; {new Date().getFullYear()}{" "}
            <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">
                Ashish Ranjan
            </a>
        </p>
        <div className={styles.footerLinks} aria-label="Social and support links">
            {links.map(([label, href, Icon]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    {createElement(Icon, { "aria-hidden": true })}
                </a>
            ))}
        </div>
    </footer>
);

export default Footer;