import { apiUrl, localApiUrl } from "@/config/api";

const fetchArticleDetails = async (id) => {
  try {
    const response = await fetch(`${localApiUrl}/api/articles/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de l'article :",
      error
    );
  }
};

const Page = async ({ params }) => {
    const id = params.id;
    try {
      const data = await fetchArticleDetails(id);
      console.log('Data:', data);
      if (data && data.title) {
        return (
          <>
                     <p>{data.title}</p>

          </>
        );
      } else {
        return <p>Les données ne sont pas disponibles.</p>;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de l'article :", error);
    }
  };
  
export default Page;
