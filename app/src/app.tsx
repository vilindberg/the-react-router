import React from 'react'
import { createRouter, routerEvents } from 'the-react-router'
import { Navbar } from './navbar'
import { AboutPage, FallbackPage, HomePage, ProductPage, ProductsPage } from './pages'

routerEvents.addListener(event => console.log(event))

export const routes = {
  fallback: FallbackPage,
  routes: [
    {
      path: '/',
      exact: true,
      component: HomePage,
    },
    {
      path: '/about',
      component: AboutPage,
    },
    {
      path: '/products',
      exact: true,
      component: ProductsPage,
    },
    {
      path: '/products/:id',
      component: ProductPage,
    },
  ],
}

const [Router, Routes] = createRouter(routes)

export const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </div>
  )
}
