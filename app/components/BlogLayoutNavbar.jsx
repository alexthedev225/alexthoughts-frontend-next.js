"use client";
import Link from "next/link";
import styles from "../scss/BlogLayout.module.scss"; // Assure-toi d'ajuster le chemin selon l'emplacement de ton fichier CSS module.
import { useRouter } from "next/navigation";

const BlogLayoutNavbarComponent = () => {
  const navigate = useRouter();

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    navigate.push(selectedValue);
  };
  return (
    <>
      <nav className={styles.selectNavbarContainer}>
        <select className={styles.dropdownSelect} onChange={handleSelectChange}>
          <option value={"/mon-blog"}>Tous les posts</option>
          <optgroup label="Catégories">
            <option value={"/mon-blog/categories/philosophie"}>
              Philosophie
            </option>
            <option value={"/mon-blog/categories/sport"}>Sport</option>
            <option value={"/mon-blog/categories/technologie"}>
              Technologie
            </option>
          </optgroup>
        </select>
      </nav>
      <nav className={styles.navbarContainer}>
        <ul className={styles.navbarList}>
          <Link href="/mon-blog" className={styles.navbarLink}>
            <li className={styles.navbarItem}>Tous les posts</li>
          </Link>
          <Link
            href="/mon-blog/categories/philosophie"
            className={styles.navbarLink}
          >
            <li className={styles.navbarItem}>Philosophie</li>
          </Link>
          <Link href="/mon-blog/categories/sport" className={styles.navbarLink}>
            <li className={styles.navbarItem}>Sport</li>
          </Link>
          <Link
            href="/mon-blog/categories/technologie"
            className={styles.navbarLink}
          >
            <li className={styles.navbarItem}>Technologie</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default BlogLayoutNavbarComponent;
