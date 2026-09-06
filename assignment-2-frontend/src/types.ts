export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url?: string;
  features?: string[];
}

export interface User {
  id: number;
  email: string;
  full_name?: string;
  is_admin: boolean;
}
