"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface Recipe {
  id: number;
  Title: string;
  Image: string;
  Instructions: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: MissedIngredient[];
}

interface MissedIngredient {
  id: number;
  name: string;
  image: string;
}

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null); // Initialize as null
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:4243/recipes/${id}`);
        console.log(response.data.recipe);
        setRecipe(response.data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }
  console.log(recipe, "this is the ins");
  return (
    <div>
      <Link href={"/"}>
        <button className="bg-slate-500 text-white py-2 px-4 mt-3 rounded hover:bg-blue-700">
          Go to Homepage
        </button>
      </Link>
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-4 text-black">{recipe.Title}</h1>
        <img className="mb-2" src={recipe.Image} alt={recipe.Title} />

        <h2 className="text-xl font-bold mb-2 text-green-800">Ingredients:</h2>

        <h2 className="text-xl font-bold mb-2 text-green-800">
          Cooking Steps:
        </h2>
        <div
          className="text-black"
          dangerouslySetInnerHTML={{ __html: recipe.Instructions }}
        />
      </div>
    </div>
  );
};

export default RecipeDetails;
