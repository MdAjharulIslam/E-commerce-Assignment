'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`,
        { email, password } 
      )

      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token)
        toast.success('Admin login successful 🎉')

        
        window.location.href = '/admin-dashboard'
      } else {
        toast.error(res.data.message || 'Invalid email or password ❌')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong ❌')
      console.error('Admin Login Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
          Admin Login
        </h2>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  )
}