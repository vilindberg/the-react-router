import React from 'react'
import { Link, useNavigation } from 'the-react-router'

export const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/about">Go to about</Link>
    </div>
  )
}

export const AboutPage = () => {
  return (
    <div>
      <h1>About</h1>
    </div>
  )
}

export const ProductsPage = () => {
  const navigation = useNavigation()

  return (
    <div>
      <h1>Products</h1>
      <ul>
        <li onClick={() => navigation.navigate('/products/1')}>Product 1</li>
        <li onClick={() => navigation.navigate('/products/2')}>Product 2</li>
        <li onClick={() => navigation.navigate('/products/3')}>Product 3</li>
      </ul>
    </div>
  )
}

export const ProductPage = () => {
  const navigation = useNavigation<{ id: string }>()

  return (
    <div>
      <h3>Product number: {navigation.params.id}</h3>
    </div>
  )
}

export const FallbackPage = () => {
  return (
    <div>
      <h1>FALLBACK</h1>
    </div>
  )
}
