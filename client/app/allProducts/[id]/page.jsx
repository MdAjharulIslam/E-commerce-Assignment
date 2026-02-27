'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`
        );
        setProduct(res.data.product);
      } catch (err) {
        console.error("Fetch Product Error:", err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-lg text-gray-600 animate-pulse">Loading product...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-xl text-red-600 font-medium">{error}</div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-xl text-gray-500 font-medium">Product not found.</div>
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
       
        <Link
          href="/allProducts"
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors mb-12"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="group">
            <div className="relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50">
              <img
                src={product.image || "https://via.placeholder.com/600x400/6B7280/FFFFFF?text=No+Image"}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl"
              />
              {product.stock > 0 && (
                <div className="absolute top-6 right-6">
                  <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    In Stock
                  </span>
                </div>
              )}
            </div>
          </div>

          
          <div className="space-y-8">
            
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 shadow-md border">
                {product.category || "General"}
              </span>
            </div>

            
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
              {product.name}
            </h1>

            
            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl lg:text-6xl font-black text-emerald-600">
                  ${product.price}
                </span>
                <div className="flex items-center gap-1 text-emerald-500">
                  <span>⭐</span><span className="text-lg font-semibold">4.8</span>
                  <span className="text-sm text-gray-500">(127 reviews)</span>
                </div>
              </div>

              
              <div className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className={`font-semibold ${product.stock > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                  {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                </span>
              </div>
            </div>

            
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/40">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description || "No description available."}
              </p>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={`/allProducts/${id}/booking`}
                disabled={product.stock <= 0}
                className={`flex-1 py-5 px-8 rounded-3xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 ${
                  product.stock > 0
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white hover:-translate-y-1"
                    : "bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed"
                }`}
              >
                {product.stock > 0 ? (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4.5M7 13l-1.5 4.5M16 17l-1.5 4.5" />
                    </svg>
                    Add to Cart
                  </>
                ) : (
                  'Out of Stock'
                )}
              </Link>
              
              <Link href={`/allProducts/${id}/booking`} className="px-8 py-5  bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-gray-900 font-bold text-lg rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-gray-200">
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
