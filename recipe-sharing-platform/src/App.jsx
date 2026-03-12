import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import AddRecipeForm from "./components/AddRecipeForm";
import recipesData from "./data.json";

function App() {
  // State to hold recipes dynamically
  const [recipes, setRecipes] = useState(recipesData);

  // Handler to add a new recipe from the form
  const handleAddRecipe = (newRecipe) => {
    // Give new recipe a unique ID
    const id = recipes.length ? recipes[recipes.length - 1].id + 1 : 1;
    setRecipes([...recipes, { id, ...newRecipe }]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage recipes={recipes} />} />

          {/* Recipe Detail Page */}
          <Route
            path="/recipe/:id"
            element={<RecipeDetail recipes={recipes} />}
          />

          {/* Add Recipe Form Page */}
          <Route
            path="/add-recipe"
            element={<AddRecipeForm onAdd={handleAddRecipe} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
