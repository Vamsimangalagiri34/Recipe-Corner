import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function RecipeDetails() {
  const location = useLocation();
  const { mealUrl } = location.state || {}; // Access mealUrl (meal ID) from state
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [loading, setLoading] = useState(true); // Adding loading state
  const [error, setError] = useState(null); // Error handling state

  useEffect(() => {
    if (!mealUrl) return;

    setLoading(true);
    setError(null);

    // Fetching detailed recipe information by mealId (not mealUrl)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealUrl}`)
      .then((response) => response.json())
      .then((data) => {
        const meal = data.meals ? data.meals[0] : null;
        if (meal) {
          setRecipeDetail(meal);
        } else {
          setError("Recipe not found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error);
        setError("An error occurred while fetching recipe details.");
        setLoading(false);
      });
  }, [mealUrl]);

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Loading recipe details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <p>{error}</p>
      </div>
    );
  }

  // Get ingredients and their images dynamically
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeDetail[`strIngredient${i}`];
    if (ingredient && ingredient.trim() !== "") {
      const imageUrl = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
      ingredients.push({ name: ingredient, image: imageUrl });
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{recipeDetail.strMeal}</h2>
      <img
        src={recipeDetail.strMealThumb}
        alt={recipeDetail.strMeal}
        style={{ width: "25rem", height: "20rem", borderRadius: "10px" }}
      />
      <h3>Ingredients</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "20px",
        }}
      >
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <img
              src={ingredient.image}
              alt={ingredient.name}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
                borderRadius: "5px",
              }}
            />
            <p style={{ fontSize: "14px", margin: "5px 0" }}>{ingredient.name}</p>
          </div>
        ))}
      </div>
      <h3>Instructions</h3>
      <p>{recipeDetail.strInstructions
       
        }</p>
    </div>
  );
}

export default RecipeDetails;
