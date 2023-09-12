const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Product {
  id: number;
  product_name: string;
  product_category: string;
  product_description: string;
  product_price: number;
  product_stock: number;
  product_image: string;
}

interface CreateOrder {
  email: string;
  products: Array<{ product_id: number; quantity: number }>;
}

interface Order {
  id: number;
  order_date: Date;
  customer_email: string;
  total: number;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductDetails(
  product_id: number
): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/products/${product_id}`);
    if (!response.ok) throw new Error('Failed to fetch product details');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
