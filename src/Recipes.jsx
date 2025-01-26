import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css"
function Recipes() {
  const location = useLocation();
  const { mealUrl } = location.state || {}; // Access mealUrl from state
  const [recipes, setRecipes] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();

  // Fetch the list of recipes
  useEffect(() => {
    if (!mealUrl)  return;

    setLoading(true); // Set loading to true before fetching
    fetch(mealUrl)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals || []);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        alert("no item listed")
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, [mealUrl]);

  // Fetch detailed information for each recipe
  useEffect(() => {
    if (recipes.length === 0) return;

    const fetchDetails = async () => {
      const detailedData = await Promise.all(
        recipes.map((recipe) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`)
            .then((response) => response.json())
            .then((data) => data.meals[0]) // Access the first meal from the response
            .catch((error) => {
              console.error("Error fetching recipe details:", error);
              return null;
            })
        )
      );
      setDetails(detailedData.filter((item) => item)); // Filter out null responses
    };

    fetchDetails();
  }, [recipes]);

  const fetchRecipe = (mealUrl) => {
    // Navigate to the instruction page with the mealUrl
    navigate("/recipe-details", { state: { mealUrl } });
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Skeleton Loader Effect */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-text" style={{ margin: "10px" }}></div>
              <div className="skeleton-text" style={{ width: "80%" }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }



  return (
    <> 
  


       <div style={{ padding: "20px" }}>
      {details.length === 0 ? (
        <p>Loading.....</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          
          {/* Actual Recipe Cards */}
          {details.map((detail, index) => (
            
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={detail.strMealThumb}
                alt={detail.strMeal}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "10px 0" }}>{detail.strMeal}</h3>
      
                <button
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#EF4F5F",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => fetchRecipe(detail.idMeal)} // Pass mealUrl (or any other unique identifier for the recipe)
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>

  );
}

export default Recipes;
