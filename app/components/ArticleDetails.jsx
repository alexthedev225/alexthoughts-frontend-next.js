import { apiUrl } from "@/config/api";
import styles from "../scss/ArticleDetails.module.scss";

const fetchArticleDetails = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/api/articles/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de l'article :",
      error
    );
  }
};

const ArticleDetails = async ({id}) => {
  const data = await fetchArticleDetails(id);
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

  // Fonction pour transformer les éléments se terminant par ":" en h3

  const transformToHeading = (content) => {
    if (content) {
      const transformedContent = content.replace(
        /([^\n]*:\s*)/g,
        "<h3>$1</h3>"
      );
      return (
        <div
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: transformedContent }}
        ></div>
      );
    }
    return null;
  };

  const ImageComponent = ({ imageBuffer }) => {
    // Convertir le Buffer en une URL de données (data URL)
    const dataURL = `data:image/jpeg;base64,${Buffer.from(imageBuffer).toString(
      "base64"
    )}`;

    return (
      <img className={styles.articleImage} src={dataURL} alt="article image" />
    );
  };

  return (
    <div className={styles.articleDetailsContainer}>
      {data.article ? (
        <div>
          <div className={styles.timeInfo}>
            <p className={styles.date}>{formatDate(data.article.publishedAt)}</p>
            <div className={styles.middleDot}></div>
            <p className={styles.readTime}>
              {calculateReadTime(data.article.content)} min de lecture
            </p>
          </div>
          <p className={styles.articleTitle}>{data.article.title}</p>
          <p className={styles.articleSubtitle}>{data.article.subtitle}</p>
          <ImageComponent imageBuffer={data.article.image} />

          <div className={styles.articleContent}>
            {" "}
            {transformToHeading(data.article.content)}
          </div>
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
};

export default ArticleDetails;
