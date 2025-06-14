
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, X, Clock, Users, Star } from "lucide-react";

interface Recipe {
  id: number;
  name: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  ingredients: string[];
  instructions: string[];
  image: string;
  cuts: string[];
}

interface RecipeSuggestionsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCuts: string[];
}

const RecipeSuggestions = ({ isOpen, onClose, selectedCuts }: RecipeSuggestionsProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const recipes: Recipe[] = [
    {
      id: 1,
      name: "Spicy Goat Curry",
      cookTime: "45 min",
      servings: 4,
      difficulty: "Medium",
      rating: 4.5,
      image: "/placeholder.svg",
      cuts: ["curry-cut"],
      ingredients: [
        "500g Goat curry cut",
        "2 onions, chopped",
        "4 tomatoes, chopped",
        "Ginger-garlic paste",
        "Red chili powder",
        "Turmeric powder",
        "Garam masala",
        "Coconut oil"
      ],
      instructions: [
        "Heat oil in a heavy-bottomed pan",
        "Add onions and sauté until golden",
        "Add ginger-garlic paste and spices",
        "Add goat meat and cook until browned",
        "Add tomatoes and cook until soft",
        "Add water and simmer for 30 minutes",
        "Garnish with fresh coriander"
      ]
    },
    {
      id: 2,
      name: "Goat Biryani",
      cookTime: "90 min",
      servings: 6,
      difficulty: "Hard",
      rating: 4.8,
      image: "/placeholder.svg",
      cuts: ["biryani-cut", "marinated"],
      ingredients: [
        "1kg Marinated goat biryani cut",
        "500g Basmati rice",
        "Saffron soaked in milk",
        "Fried onions",
        "Mint leaves",
        "Yogurt",
        "Whole spices",
        "Ghee"
      ],
      instructions: [
        "Marinate goat meat with yogurt and spices",
        "Cook rice with whole spices until 70% done",
        "Cook marinated meat until tender",
        "Layer rice and meat alternatively",
        "Top with fried onions, mint, and saffron milk",
        "Cook on dum for 45 minutes",
        "Serve hot with raita"
      ]
    },
    {
      id: 3,
      name: "Grilled Goat Chops",
      cookTime: "30 min",
      servings: 2,
      difficulty: "Easy",
      rating: 4.3,
      image: "/placeholder.svg",
      cuts: ["boneless"],
      ingredients: [
        "250g Boneless goat chunks",
        "Lemon juice",
        "Olive oil",
        "Garlic paste",
        "Black pepper",
        "Rosemary",
        "Salt",
        "Red chili flakes"
      ],
      instructions: [
        "Cut meat into chop-sized pieces",
        "Mix all marinades in a bowl",
        "Marinate meat for 20 minutes",
        "Preheat grill to medium-high",
        "Grill for 4-5 minutes each side",
        "Rest for 5 minutes before serving",
        "Serve with grilled vegetables"
      ]
    }
  ];

  const filteredRecipes = recipes.filter(recipe => 
    selectedCuts.length === 0 || recipe.cuts.some(cut => selectedCuts.includes(cut))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChefHat className="w-5 h-5 text-red-600" />
            <CardTitle className="text-xl text-red-700">Recipe Suggestions</CardTitle>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4">
          {selectedRecipe ? (
            // Recipe Detail View
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedRecipe(null)}
                  className="mb-4"
                >
                  ← Back to Recipes
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-2xl font-bold mb-2">{selectedRecipe.name}</h2>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{selectedRecipe.cookTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{selectedRecipe.servings} servings</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{selectedRecipe.rating}</span>
                    </div>
                    <Badge variant={
                      selectedRecipe.difficulty === 'Easy' ? 'secondary' :
                      selectedRecipe.difficulty === 'Medium' ? 'default' : 'destructive'
                    }>
                      {selectedRecipe.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Ingredients</h3>
                  <ul className="space-y-1 mb-6">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Instructions</h3>
                <ol className="space-y-2">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="text-sm flex">
                      <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            // Recipe List View
            <div>
              {filteredRecipes.length === 0 ? (
                <div className="text-center py-12">
                  <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No recipes found for selected cuts</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRecipes.map((recipe) => (
                    <Card 
                      key={recipe.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow border-red-100"
                      onClick={() => setSelectedRecipe(recipe)}
                    >
                      <CardContent className="p-4">
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                        <h3 className="font-semibold mb-2">{recipe.name}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{recipe.cookTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{recipe.servings}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span>{recipe.rating}</span>
                          </div>
                        </div>
                        <Badge variant={
                          recipe.difficulty === 'Easy' ? 'secondary' :
                          recipe.difficulty === 'Medium' ? 'default' : 'destructive'
                        }>
                          {recipe.difficulty}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeSuggestions;
