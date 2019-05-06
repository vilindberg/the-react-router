import React from 'react'
import { useNavigation } from 'the-react-router'

export const HomePage = () => {
  return <div>HOME</div>
}

export const AboutPage = () => {
  return <div>ABOUT</div>
}

export const ProductsPage = () => {
  const navigation = useNavigation()

  return (
    <div>
      PRODUCTS
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

  return <div>Product number: {navigation.params.id}</div>
}

export const FallbackPage = () => {
  return <div>FALLBACK</div>
}
