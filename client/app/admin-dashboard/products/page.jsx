'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AdminProductsPage() {
  const router = useRouter()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
  })

  
  const fetchProducts = async (authToken) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      )

      if (res.data.success) {
        setProducts(res.data.products)
      }
    } catch (err) {
      toast.error('Failed to fetch products')
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
    fetchProducts(savedToken)
  }, [])

  
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      toast.success('Product deleted')

      setProducts(prev =>
        prev.filter(product => product._id !== id)
      )
    } catch {
      toast.error('Delete failed')
    }
  }

  
  const handleEditClick = (product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    })
  }

  
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products/${selectedProduct._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (res.data.success) {
        toast.success('Product updated')

        setProducts(prev =>
          prev.map(product =>
            product._id === selectedProduct._id
              ? res.data.product
              : product
          )
        )

        setSelectedProduct(null)
      }
    } catch {
      toast.error('Update failed')
    }
  }

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg font-medium text-gray-600">
        Loading products...
      </p>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Admin Product Management
      </h1>

      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product._id}
            className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-xl font-bold text-purple-700 mb-2">
              {product.name}
            </h2>

            <p className="text-gray-700 mb-2 line-clamp-2">
              {product.description}
            </p>

            <p className="font-semibold text-indigo-700">
              Price: ${product.price}
            </p>

            <p className="mb-4">
              Stock:
              <span
                className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold ${
                  product.stock > 0
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                }`}
              >
                {product.stock}
              </span>
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => handleEditClick(product)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg shadow"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
            <h2 className="text-xl font-bold mb-4 text-indigo-600">
              Update Product
            </h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full mb-3 p-2 border rounded"
              value={formData.name}
              onChange={e =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price"
              className="w-full mb-3 p-2 border rounded"
              value={formData.price}
              onChange={e =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Stock"
              className="w-full mb-3 p-2 border rounded"
              value={formData.stock}
              onChange={e =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              className="w-full mb-4 p-2 border rounded"
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <div className="flex justify-between">
              <button
                onClick={() => setSelectedProduct(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}