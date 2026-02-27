'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AddProductPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
   const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !description || !price || !stock) {
      return toast.error('All fields are required ❌')
    }

    setLoading(true)

    try {
      
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('stock', stock)
       formData.append('image', image)

      const token = localStorage.getItem('adminToken')

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.data.success) {
        toast.success('Product added successfully 🎉')
        router.push('/admin-dashboard/products')
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Something went wrong ❌')
    } finally {
      setLoading(false)
    }
  }

 
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md max-w-lg mx-auto space-y-4"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
          required
        />

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
          required
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
          required
        />

         <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
          required
        /> 

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  )
}