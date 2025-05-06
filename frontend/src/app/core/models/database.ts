export interface Product {
    name: string,
    calories: number,
    unit_name: string,
    image_src: string;
  }  
  export interface Recipe extends Product {
    instructions: string,
    ingredients: Map<Product, String>,
  }