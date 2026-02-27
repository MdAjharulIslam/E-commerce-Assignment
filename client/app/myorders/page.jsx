'use client'

import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

 
  const fetchOrders = useCallback(async (savedToken) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/myorders`,
        { headers: { Authorization: `Bearer ${savedToken}` } }
      )
      if (res.data.success) {
        setOrders(res.data.orders)
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token')
      setToken(savedToken)
      
      if (!savedToken) {
        toast.error('You must be logged in')
        setLoading(false)
        return
      }

      fetchOrders(savedToken)
    }

    
  }, [fetchOrders]) 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-purple-600">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <span className="text-4xl">📦</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            You haven't placed any orders. Start shopping!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map(order => (
            <div
              key={order._id}
              className="p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50 border border-purple-100/50 backdrop-blur-sm"
            >
              <div>
                <h2 className="text-xl font-bold text-purple-800 mb-3 truncate pr-2">
                  {order.product?.name || 'Product removed'}
                </h2>

                <p className="text-gray-700 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {order.product?.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.product?.stock > 0
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : 'bg-red-100 text-red-800 border-red-200'
                    } border`}
                  >
                    {order.product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200">
                    Qty: {order.stock || 1}
                  </span>
                </div>

                <div className="space-y-1 mb-6">
                  <p className="text-2xl font-black text-purple-700">
                    ${((order.product?.price || 0) * (order.stock || 1)).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Remaining: {order.product?.stock || 0}
                  </p>
                </div>

                <div className="text-sm space-y-1 mb-4">
                  <p><span className="font-semibold text-gray-800">Phone:</span> {order.phone}</p>
                </div>
              </div>

              <p className="text-gray-500 text-xs mt-auto pt-4 border-t border-purple-100">
                Ordered: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
