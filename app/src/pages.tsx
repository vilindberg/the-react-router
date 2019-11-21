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
        <li onClick={(e) => navigation.navigate('/products/1', { name: 'Product 1', color: '#8CC646', from: { x: e.clientX, y: e.clientY } })}>Product 1</li>
        <li onClick={(e) => navigation.navigate('/products/2', { name: 'Product 2', color: '#FCD17E', from: { x: e.clientX, y: e.clientY } })}>Product 2</li>
        <li onClick={(e) => navigation.navigate('/products/3', { name: 'Product 2', color: '#3957BD', from: { x: e.clientX, y: e.clientY } })}>Product 3</li>
      </ul>
    </div>
  )
}

export const ProductPage = () => {
  const navigation = useNavigation<{ id: string }, { name: string, color: string, from: { x: number, y: number } }>()
  const { color, name, from } = navigation.state.routeState || {}

  return (
    <div>
      <h3>Product number (from url): {navigation.params.id}</h3>
      <h4><span style={{ borderRadius: 10, display: 'inline-block', width: 20, height: 20, backgroundColor: color }} />{name}</h4>
      {from && <p>You clicked at x: {from.x}, y: {from.y}</p>}
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
