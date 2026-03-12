import { useParams, Link } from "react-router-dom";

const RecipeDetail = ({ recipes }) => {
  const { id } = useParams();
  const recipe = recipes.find((item) => item.id === parseInt(id));

  if (!recipe) {
    return <div className="text-center mt-10">Recipe not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg"
        />

        <h1 className="text-3xl font-bold mt-4">{recipe.title}</h1>
        <p className="text-gray-600 mt-2">{recipe.summary || recipe.title}</p>

        {/* Ingredients */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside space-y-1">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Cooking Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <Link
          to="/"
          className="inline-block mt-6 text-blue-500 hover:underline"
        >
          ← Back to Recipes
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
