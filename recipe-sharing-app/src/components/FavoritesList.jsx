import { useRecipeStore } from "./recipeStore";

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favoriteIds = useRecipeStore((state) => state.favorites);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  // Map favorite IDs to recipes safely (avoid infinite loop)
  const favorites = favoriteIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean); // remove undefined if recipe was deleted

  if (favorites.length === 0) return <p>No favorites yet.</p>;

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <button onClick={() => removeFavorite(recipe.id)}>
            Remove from Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
