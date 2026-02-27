'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function OrderPage() {
  const router = useRouter()
  const { id: productId } = useParams() 
  const [quantity, setQuantity] = useState(1)
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token')
      setToken(savedToken)
      if (!savedToken) {
        toast.error('You must be logged in to place an order')
        router.push('/login') 
      }
    }
  }, [])

  const handleOrder = async (e) => {
    e.preventDefault()
    if (!quantity || quantity <= 0 || !phone) {
      return toast.error('Please enter quantity and phone number')
    }

    if (!token) return

    setLoading(true)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/add/${productId}`,
        { quantity, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.data.success) {
        toast.success('Order placed successfully!')
        router.push('/myorders')
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-16 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Place Your Order</h1>

      <form onSubmit={handleOrder} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700transition-colors py-2 rounded-md disabled:opacity-50"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  )
}