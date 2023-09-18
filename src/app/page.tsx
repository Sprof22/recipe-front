"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


const spoonacularApiKey = process.env.SPOONACULAR_API_KEY;
console.log(spoonacularApiKey);

interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  usedIngredients: Ingredient[];
}

export interface Ingredient {
  id: number;
  name: string;
  image: string;
}

export interface SavedRecipe {
  id: number;
  title: string;
  image: string;
  instructions: string; // Assuming this property exists in your model
}

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:4243/recipes'); // Adjust the URL as per your backend setup
      console.log(response, "this is response")
      setSavedRecipes(response.data.recipes); // Assuming the response has a 'recipes' property containing an array of saved recipes
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&ranking=2&apiKey=35cd120e3fd040a3aa3f63ab6f7a0fa3`);

      console.log(response, "this is the response")
  
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
   
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-black">Recipe Finder</h1>
      <div className="mb-4 flex">
        <button
          className="bg-blue-500 text-white py-2 px-4 mr-2 rounded hover:bg-blue-700"
          // onClick={handleSignup}
        >
          Signup
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          // onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <div className="mb-4 flex">
        <input
          type="text"
          className="w-full py-2 px-4 border border-gray-300 rounded text-black"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma separated)"
          />
        <button
          className="bg-blue-500 text-white py-2 px-4 ml-2 rounded hover:bg-blue-700"
          onClick={handleSearch}
          >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2 text-green-800">{recipe.title}</h2>
            <img className="mb-2" src={recipe.image} alt={recipe.title} />
            <Link href={`/recipe/${recipe.id}?missedIngredients=${JSON.stringify(recipe.missedIngredients)}&usedIngredients=${JSON.stringify(recipe.usedIngredients)}`}>
              <button className="text-blue-500">View Details</button>
            </Link>
            {/* <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
              onClick={() => handleSaveRecipe(recipe)}
            >
              Save
            </button> */}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Saved Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {savedRecipes.map((recipe) => (
      <div key={recipe.id} className="border p-4">
        <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
        <img className="mb-2" src={recipe.image} alt={recipe.title} />
      </div>
    ))}
  </div>
      </div>
    </div>
  );
}
