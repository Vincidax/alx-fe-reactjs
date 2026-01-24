import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import { useEffect } from "react";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  useEffect(() => {
    filterRecipes();
  }, [recipes, searchTerm, filterRecipes]);

  const displayedRecipes = searchTerm.length > 0 ? filteredRecipes : recipes;

  return (
    <div>
      <h2>Recipes</h2>

      {displayedRecipes.length === 0 && <p>No recipes found.</p>}

      {displayedRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
