
import Link from "next/link";
import styles from "../scss/CategorieArticleList.module.scss"; // Assure-toi d'ajuster le chemin selon l'emplacement de ton fichier CSS module.
import fetchData from "../../utils/api";


const PhilosophieArticleList = async () => {

   const data = await fetchData();

  // Filtrer les articles par catégorie
  const filterByCategory = (category) => {
    return data.filter((article) => article.category === category);
  };
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

  const ImageComponent = ({ imageBuffer }) => {
    // Convertir le Buffer en une URL de données (data URL)
    const dataURL = `data:image/jpeg;base64,${Buffer.from(imageBuffer).toString(
      "base64"
    )}`;

    return <img className={styles.articleImage} src={dataURL} alt="article image" />;
  };
  
  return (
    <div className={styles.articleListContainer}>
      <ul className={styles.articleList}>
        {filterByCategory("Philosophie").map((article) => (
          <li key={article._id} className={styles.articleListItem}>
            <Link
              href={`/mon-blog/articles/${article._id}`}
              className={styles.articleLink}
            >
             <ImageComponent imageBuffer={article.image} />
              <div className={styles.articleInfoContainer}>
                <div className={styles.timeInfo}>
                  <p className={styles.date}>
                    {formatDate(article.publishedAt)}
                  </p>
                  <div className={styles.middleDot}></div>
                  <p className={styles.readTime}>
                    {calculateReadTime(article.content)} min de lecture
                  </p>
                </div>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <p className={styles.articleSubtitle}>{article.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhilosophieArticleList;
