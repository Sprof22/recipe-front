"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";


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
  const [recipe, setRecipe] = useState<Recipe | null>(null); 
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const missedIngredientsString = searchParams.get("missedIngredients");
  const usedIngredientsString = searchParams.get("usedIngredients");
  const missedIngredients = missedIngredientsString ? JSON.parse(missedIngredientsString) : [];
  const usedIngredients = usedIngredientsString ? JSON.parse(usedIngredientsString) : [];
 

  const handleSaveRecipe = async () => {
    if(recipe){
      try {
        const response = await axios.post(`http://localhost:4243/recipes`, {
          title: recipe.title,
          image: recipe.image,
          instructions: recipe.instructions,
        });
        if (response.status === 200) {
          alert('Recipe saved successfully!'); 
        }
      } catch (error) {
        console.error('Error saving recipe:', error);
      }
    }
   
  };  
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
  }, [id]); 

  if (!recipe) {
    return <div>Loading...</div>; 
  }
  console.log(recipe.instructions, "this is the ins")
  return (
    <div>
      <Link href={"/"}>
        <button className="bg-slate-500 text-white py-2 px-4 mt-3 rounded hover:bg-blue-700">
          Go to Homepage
        </button>
      </Link>
      <div className="container mx-auto px-4 py-8">
      
      <h1 className="text-3xl font-bold mb-4 text-black">{recipe.title}</h1>
      <img className="mb-2" src={recipe.image} alt={recipe.title} />

      <h2 className="text-xl font-bold mb-2 text-green-800">Ingredients:</h2>


      <h2 className="text-xl font-bold mb-2 text-green-800">Cooking Steps:</h2>
      <div className="text-black" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleSaveRecipe}>
  Save Recipe
</button>
      <div className="flex items-center"> 
        <h2 className="text-black bg-slate-500 p-2 m-0 rounded-md mr-2">Missing Ingredients: </h2> 
        <ul className="list-none p-0 m-0"> 
          {missedIngredients.map((ingredient: any) => (
            <li className="inline-block" key={ingredient.id}> 
              <button className="bg-red-500 p-2 m-2 rounded-md text-white">
                {ingredient.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center"> 
        <h2 className="text-black bg-slate-500 p-2 m-0 rounded-md mr-2">Used Ingredients: </h2> 
        <ul className="list-none p-0 m-0"> 
          {usedIngredients.map((ingredient: any) => (
            <li className="inline-block" key={ingredient.id}> 
              <button className="bg-green-500 p-2 m-2 rounded-md text-white">
                {ingredient.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    
  );
};

export default RecipeDetails;
