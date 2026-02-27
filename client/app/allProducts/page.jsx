'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import ProductCard from '../../components/ProductCard';

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/all`); 
        setProducts(response.data.products || []);
      } catch (err) {
        console.error('Fetch Products Error:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-xl font-medium">Loading products...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600 text-lg font-medium">{error}</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product._id} href={`/allProducts/${product._id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}