"use client";
import styles from "../scss/Navbar.module.scss";
import facebookLogo from "../assets/facebook.png";
import instagramLogo from "../assets/instagram.png";
import twitterLogo from "../assets/twitter.png";
import { useEffect, useState } from "react";
import Link from "next/link";

const NavbarComponent = ({ onClick }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);

    // Ajoute ou supprime la classe 'no-scroll' au corps du document
    document.body.classList.toggle("no-scroll", !isMenuOpen);
  };

  useEffect(() => {
    // Nettoie la classe ajoutée lorsque le composant est démonté
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  return (
    <div className={styles.parentContainer}>
      <div className={styles.header}>
        <p className={styles.personalText}>
          TOUT EST PERSONNEL. Y COMPRIS CE BLOG.
        </p>
        <Link href="/">
          <h1 className={styles.blogTitle}>Train de la pensée</h1>
        </Link>
      </div>

      <div
        className={`${styles["menu-items"]} ${
          isMenuOpen ? styles["show-menu"] : ""
        }`}
      >
        <div className={styles["link-container"]}>
          <Link href="/" onClick={toggleMenu}>
            Accueil
          </Link>
          <Link href="/à-propos" onClick={toggleMenu}>
            À propos
          </Link>
          <Link href="/mon-blog" onClick={toggleMenu}>
            Mon blog
          </Link>
          <button
            onClick={() => {
              onClick();
              toggleMenu();
            }}
          >
            Contact
          </button>
        </div>
      </div>
      <div className={styles.navbarContainer}>
        <div className={styles.navigationLinks}>
          <Link href="/">Accueil</Link>
          <Link href="/à-propos">À propos</Link>
          <Link href="/mon-blog">Mon blog</Link>
          <button onClick={onClick} className={styles.contactLink}>
            Contact
          </button>
        </div>
        <div className={styles.socialLinks}>
          <a href="/" className={styles.socialLink}>
            <img src={facebookLogo.src} alt="facebook" height={20} width={20} />
          </a>
          <a href="/" className={styles.socialLink}>
            <img src={instagramLogo.src} alt="instagram" height={16} width={16} />
          </a>
          <a href="/" className={styles.socialLink}>
            <img src={twitterLogo.src} alt="twitter" height={20} width={20} />
          </a>
        </div>
        <button
          className={`${styles["burger-menu-button"]} ${
            isMenuOpen ? styles.close : ""
          }`}
          onClick={toggleMenu}
        >
          <div
            className={`${styles["burger-line"]} ${
              isMenuOpen ? styles.close : ""
            }`}
          ></div>
          <div
            className={`${styles["burger-line"]} ${
              isMenuOpen ? styles.close : ""
            }`}
          ></div>
          <div
            className={`${styles["burger-line"]} ${
              isMenuOpen ? styles.close : ""
            }`}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default NavbarComponent;
