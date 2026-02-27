'use client'
import { useRouter } from 'next/navigation' 
import Link from 'next/link'

export default function ProductCard({ product, isBestSeller, rank }) {
  const router = useRouter()
  const { name, price, stock, image, totalSold } = product

  const handleBooking = (e) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/allProducts/${product._id}/booking`)
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group relative cursor-pointer"
         onClick={() => router.push(`/allProducts/${product._id}`)}>
      
     
      {isBestSeller && rank && (
        <div className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-xl text-sm font-bold shadow-lg flex items-center space-x-1">
          <span>🏆 #{rank}</span>
        </div>
      )}

      
      <div className="h-48 bg-gray-200 flex items-center justify-center relative overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-4xl text-gray-400">📦</span>
        )}
      </div>

     
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 truncate text-gray-900">{name}</h3>
        
        <p className="text-blue-600 font-bold text-xl mb-2">${price?.toFixed(2) || '0.00'}</p>
        
       
        <p className={`mb-4 font-medium text-sm ${
          stock > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {stock > 0 ? `In Stock: ${stock}` : 'Out of Stock'}
        </p>

      
        {isBestSeller && totalSold && (
          <div className="mb-4 p-2 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-emerald-700 font-semibold text-sm">
              {totalSold.toLocaleString()} sold
            </p>
          </div>
        )}

        
        <div className="mt-auto">
          {stock > 0 ? (
            <button
              onClick={handleBooking}
              className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:scale-110 text-white py-2 px-4 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              🛒 Book Now
            </button>
          ) : (
            <button disabled className="w-full bg-gray-400 text-white py-2 px-4 rounded-xl font-medium cursor-not-allowed">
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
