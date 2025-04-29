export interface Product {
    name: string,
    calories: number,
    unit_name: string,
    image_src: string;
  }
  
  export interface ProductArray extends Array<Product> { }
  
  export interface Recipe extends Product {
    instructions: string,
    ingredients: Map<Product, String>,
  }
  
  export interface RecipeArray extends Array<Recipe> { }