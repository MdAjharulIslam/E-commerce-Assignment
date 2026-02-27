'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, DollarSign, ShoppingBag, Users, ArrowRight } from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  
  const fetchDashboard = async (token) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/dashboard`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (res.data.success) {
        setStats(res.data.stats)
      }
    } catch (err) {
      toast.error('Failed to load dashboard stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      toast.error('Please login first')
      router.push('/admin-login')
      return
    }

    setAdminLoggedIn(true)
    fetchDashboard(token)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    toast.success('Admin logged out successfully 👋')
    router.push('/admin-login')
  }

  if (!adminLoggedIn) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="backdrop-blur-xl bg-white/80 border-b border-white/50 shadow-xl sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
               MyShop Admin
              </h1>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin-dashboard"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 border border-gray-200/50 hover:shadow-md"
            >
              Dashboard
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-7xl mx-auto px-6 py-12 pb-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent mb-4">
            Welcome Back, Admin 👋
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta hic fugit repudiandae ut porro temporibus inventore quasi vel. Impedit, delectus! Perspiciatis odit nisi consectetur molestias error soluta mollitia, non tempore?
          </p>
        </motion.div>

        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="inline-block w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4" />
              <p className="text-gray-600 text-lg font-medium">Loading dashboard stats...</p>
            </motion.div>
          ) : stats ? (
            <>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl">↗️</span>
                  </div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">Total Orders</h3>
                  <p className="text-4xl font-black text-gray-900">
                    {stats.totalOrders}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl">↗️</span>
                  </div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">Total Revenue</h3>
                  <p className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                    ${stats.totalRevenue}
                  </p>
                </motion.div>

                {stats.topProducts?.length > 0 && (
                  <>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 md:col-span-2 lg:col-span-1"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Car className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl">⭐</span>
                      </div>
                      <h3 className="text-gray-900 font-semibold text-lg mb-2">Top Products</h3>
                      <p className="text-2xl font-black text-gray-900">
                        {stats.topProducts[0]?.name || 'N/A'}
                      </p>
                      <p className="text-sm text-emerald-600 font-semibold mt-1">
                        {stats.topProducts[0]?.totalSold || 0} bookings
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 md:col-span-2 lg:col-span-1 hidden lg:block"
                    >
                      <h3 className="text-gray-900 font-semibold text-lg mb-4">Top 3 Products</h3>
                      <div className="space-y-2">
                        {stats.topProducts.slice(0, 3).map((product, index) => (
                          <div key={product.productId} className="flex items-center justify-between py-2 px-3 bg-white/50 rounded-xl">
                            <span className="font-bold text-sm">#{index + 1}</span>
                            <span className="text-sm font-medium">{product.name}</span>
                            <span className="text-emerald-600 font-bold text-sm">{product.totalSold}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>

              
            <motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
>
  <h3 className="text-3xl font-black text-gray-900 mb-12 text-center">
    🛒 Quick Actions
  </h3>
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    {[
      { href: '/admin-dashboard/addProducts', label: '➕ Add Products', icon: '📦' },
      { href: '/admin-dashboard/orders', label: '📦 View Orders', icon: '🛒' },
      { href: '/admin-dashboard/products', label: '📋 Manage Products', icon: '📱' },
      { href: '/', label: '🌐 Live Store', icon: '👁️' }
    ].map((action, index) => (
      <motion.div
        key={action.href}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      >
        <Link
          href={action.href}
          className="group relative bg-white shadow-xl hover:shadow-2xl border border-gray-100 hover:border-gray-200 p-10 rounded-3xl hover:-translate-y-3 transition-all duration-500 block h-full text-center"
        >
          
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-8 group-hover:scale-110 transition-all duration-400 text-4xl">
            <span>{action.icon}</span>
          </div>
          
          <h4 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
            {action.label}
          </h4>
          
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-blue-100">
              →
            </div>
          </div>
        </Link>
      </motion.div>
    ))}
  </div>
</motion.section>

            </>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  )
}
