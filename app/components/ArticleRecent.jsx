import React from "react";
import styles from "../scss/ArticleRecent.module.scss";
import Link from "next/link";

import { Inter } from 'next/font/google'
import {apiUrl} from "@/config/api";
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const ArticleRecentComponent = async () => {
  const data = await fetchData();

  return (
    <div className={styles.articleContainer}>
      {Array.isArray(data) && data.length === 0 ? (
        <p>Chargement ...</p>
      ) : (
        <>
          {data && (
            <>
              <div className={styles.postLabel}>
                <p>POST À L&apos;AFFICHE</p>
              </div>
              <div className={styles.article}>
                <Link
                  href={`/mon-blog/articles/${data._id}`}
                  className={styles.link}
                >
                  <ImageComponent imageBuffer={data.image} />
                  <div className={styles.content}>
                    <div className={styles.timeInfo}>
                      <p className={styles.date}>
                        {formatDate(data.publishedAt)}
                      </p>
                      <div className={styles.middleDot}></div>
                      <p className={styles.readTime}>
                        {calculateReadTime(data.content)} min
                      </p>
                    </div>
                    <h2 className={styles.title}>{data.title}</h2>
                    <p className={styles.subtitle}>{data.subtitle}</p>
                  </div>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

const ImageComponent = ({ imageBuffer }) => {
  // Convertir le Buffer en une URL de données (data URL)
  const dataURL = `data:image/jpeg;base64,${Buffer.from(imageBuffer).toString(
    "base64"
  )}`;

  return <img className={styles.image} src={dataURL} alt="article image" />;
};
// Fonction pour formater la date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Fonction pour calculer le temps de lecture estimé
const calculateReadTime = (content) => {
  if (content) {
    const textContent = content.replace(/<[^>]*>/g, "");
    const words = textContent.split(/\s+/);
    const wordsPerMinute = 200; // ajustez selon votre audience
    const readTimeInMinutes = words.length / wordsPerMinute;
    return Math.round(readTimeInMinutes);
  }
  return 0;
};

const fetchData = async () => {
  try {
    const response = await fetch(
      `${apiUrl}/api/articles`
    );
    const result = await response.json();

    // Trie les articles par date de publication, du plus récent au plus ancien
    const sortedData = result.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
    const data = sortedData[0];
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
};
export default ArticleRecentComponent;
