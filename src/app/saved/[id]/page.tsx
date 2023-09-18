"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import axios from "axios";


interface Recipe {
  id: number;
  title: string;
  image: string;
  instructions: string;
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
  const id = params.id;


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=35cd120e3fd040a3aa3f63ab6f7a0fa3`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    if (id) {
      fetchRecipe(); // Call the fetch function when the id is available
    }
  }, [id]); // Add id as a dependency to the effect

  if (!recipe) {
    return <div>Loading...</div>; // Render a loading state while waiting for the data
  }
  console.log(recipe.instructions, "this is the ins")
  return (
    <div className="container mx-auto px-4 py-8">
      
      <h1 className="text-3xl font-bold mb-4 text-black">{recipe.title}</h1>
      <img className="mb-2" src={recipe.image} alt={recipe.title} />

      <h2 className="text-xl font-bold mb-2 text-green-800">Ingredients:</h2>
      {/* <ul> */}
        {/* {recipe.missedIngredients.map(ingredient => (
        <li key={ingredient.id}>{ingredient.name}</li>
      ))} */}
      {/* </ul> */}

      <h2 className="text-xl font-bold mb-2 text-green-800">Cooking Steps:</h2>
      <div className="text-black" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

    </div>
  );
};

export default RecipeDetails;
