'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import ProductCard from './ProductCard'
import Link from 'next/link'

export default function LatestProduct() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/latest-product`
        )
        if (res.data.success) {
          setProducts(res.data.latestProducts)
        }
      } catch (error) {
        toast.error('Failed to fetch latest products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="relative w-full py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-6 shadow-xl" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-gray-800 bg-clip-text text-transparent mb-2">
              Loading Fresh Arrivals
            </h2>
            <p className="text-xl text-slate-600">Discovering latest products...</p>
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="relative w-full py-20 bg-gradient-to-br from-slate-50 via-blue-50/50 to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center py-24 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <span className="text-4xl">🆕</span>
            </div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 bg-clip-text text-transparent mb-4">
              No New Products Yet
            </h2>
            <p className="text-xl text-slate-700 max-w-md mx-auto leading-relaxed">
              Fresh arrivals will appear here soon. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full py-20 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-blue-50/20 overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-3xl blur-xl -rotate-6 translate-x-8 shadow-2xl" />
        <div className="absolute bottom-24 left-16 w-24 h-24 bg-gradient-to-r from-blue-300/30 to-indigo-300/30 rounded-full blur-2xl translate-y-4 shadow-xl" />
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-2xl blur-lg rotate-12 shadow-lg" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-emerald-200/50 text-sm font-bold tracking-wide">
            <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mr-2 shadow-sm animate-pulse"></span>
            <span className="bg-gradient-to-r from-emerald-700 to-blue-800 bg-clip-text text-transparent">🆕 JUST ARRIVED</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 bg-clip-text text-transparent mb-6 leading-none drop-shadow-2xl tracking-tight">
            Latest Products
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-slate-800/95 drop-shadow-lg max-w-2xl mx-auto leading-relaxed tracking-wide">
            Discover our freshest arrivals - added just for you!
          </p>
        </div>

        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {products.slice(0, 8).map((product, index) => (
            <Link href={`/allProducts/${product._id}`} key={product._id || index} className="group">
              <ProductCard 
                product={product} 
                rank={index + 1}
                isNewArrival={true}
              />
            </Link>
          ))}
        </div>

        
        {products.length > 0 && (
          <div className="text-center">
            <Link href="/allProducts">
              <button className="group relative bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white px-12 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 border-0 overflow-hidden backdrop-blur-md mx-auto">
                <span className="relative z-10 flex items-center justify-center">
                  View All Products
                  <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
