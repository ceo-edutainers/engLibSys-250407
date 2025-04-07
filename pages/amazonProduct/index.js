import React, { useState, useEffect } from 'react'

const ProductComponent = () => {
  const [products, setProducts] = useState([]) // 상품 정보를 저장할 상태
  const [error, setError] = useState(null) // 에러를 저장할 상태

  useEffect(() => {
    fetchProducts()
  }, []) // 컴포넌트가 마운트 될 때 fetchProducts를 호출

  const fetchProducts = async () => {
    try {
      const DB_CONN_URL = process.env.DB_CONN_URL
      const response = await fetch('http://localhost:3001/products') // Node.js 서버의 엔드포인트
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setProducts(data) // 상품 데이터로 상태 업데이트
    } catch (error) {
      setError(error.message) // 에러 발생시 상태 업데이트
    }
  }

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductComponent
