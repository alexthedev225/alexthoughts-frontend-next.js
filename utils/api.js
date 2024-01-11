import { apiUrl } from "@/config/api";

// api.js
export default async function fetchData () {
    try {
      const response = await fetch(`${apiUrl}/api/articles`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
  

  