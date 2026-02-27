'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AdminOrdersPage() {
  const router = useRouter()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  const fetchOrders = async (authToken) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      )

      if (res.data.success) {
        setOrders(res.data.orders)
      }
    } catch (err) {
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken')

    if (!savedToken) {
      toast.error('Admin login required')
      router.push('/login')
      return
    }

    setToken(savedToken)
    fetchOrders(savedToken)
  }, [])

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg font-medium text-gray-600">
        Loading orders...
      </p>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">
        Admin Orders Management
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">
          No orders found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => {
            const totalPrice =
              (order.product?.price || 0) * (order.stock || 0)

            return (
              <div
                key={order._id}
                className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-purple-700 mb-3">
                  {order.product?.name || 'Product Removed'}
                </h2>

                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Customer:</span>{' '}
                    {order.customer?.name || 'Unknown'}
                  </p>

                  <p>
                    <span className="font-semibold">Email:</span>{' '}
                    {order.customer?.email || 'N/A'}
                  </p>

                  <p>
                    <span className="font-semibold">Phone:</span>{' '}
                    {order.phone}
                  </p>

                  <p>
                    <span className="font-semibold">Quantity:</span>{' '}
                    {order.stock}
                  </p>

                  <p className="text-indigo-700 font-bold text-lg">
                    Total: ${totalPrice}
                  </p>

                  <p>
                    <span className="font-semibold">Remaining Stock:</span>{' '}
                    {order.product?.stock ?? 0}
                  </p>
                </div>

                <div className="mt-4">
                  <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold">
                    Ordered
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Ordered at:{' '}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}