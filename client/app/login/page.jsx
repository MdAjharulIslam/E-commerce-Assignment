'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function AuthPage() {
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  try {
    if (isLogin) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`,
        { email, password }
      )

      if (res.data.success) {
        
        localStorage.setItem('token', res.data.token)

       
         window.location.href = '/' 
        toast.success('Login successful 🎉')
        router.push('/')
      }else{
        toast.error('Invalid Email or password')
      }
    } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`,
        { name, email, password }
      )

      if (res.data.success) {
        
        localStorage.setItem('token', res.data.token)

        
          window.location.href = '/' 
        toast.success('Registration successful 🎉')
        router.push('/')
      }else{
        toast.error('All Field Are Required')
      }
    }
  } catch (err) {
    toast.error(err.response?.data?.message || 'Something went wrong ❌')
  } finally {
    setLoading(false)
  }
}
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white transition-colors ${
              isLogin
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading
              ? 'Processing...'
              : isLogin
              ? 'Login'
              : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-black text-sm">
          {isLogin
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline font-medium"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>

        {isLogin && (
          <p className="mt-2 text-center text-sm">
            <Link
              href="/admin-login"
              className="text-red-600 hover:underline"
            >
              Admin Login
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}