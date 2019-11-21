# the-react-router [![Build Status](https://travis-ci.org/Vieriksson/the-react-router.svg?branch=master)](https://travis-ci.org/Vieriksson/the-react-router)

Lightweight react router

## Demo
[Go to Sandbox](https://codesandbox.io/s/v6qln3yl43?from-embed)

## Install

#### yarn
```
$ yarn add the-react-router
```

#### npm
```
$ npm install the-react-router
```

## Usage

```tsx
import React from 'react'
import { createRouter, routerEvents } from 'the-react-router'
import { Navbar } from './navbar'
import { ProductsPage, ProductPage, HomePage, FallbackPage } from './pages'

// Listen to route changes
routerEvents.addListener(event => console.log(event))

// Specify routes and fallback
const routes = {
  fallback: FallbackPage,
  routes: [
    {
      path: '/',
      exact: true,
      component: HomePage
    },
    {
      path: '/products',
      component: ProductsPage
    },
    {
      path: '/products/:id',
      component: ProductPage
    }
  ]
}

// Router handles the url, params etc and provides the context
// Routes listenes to context changes and render the correct page
const [Router, Routes] = createRouter(routes)

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes />
    </Router>
  )
}
```

### Navigate using the hook
```tsx
  export const ProductsPage = () => {
    const { navigate } = useNavigation()
    return (
      <div>
        PRODUCTS
        <ul>
          <li onClick={() => navigate('/products/1')}>Product 1</li>
          <li onClick={() => navigate('/products/2')}>Product 2</li>
          <li onClick={() => navigate('/products/3')}>Product 3</li>
        </ul>
      </div>
    )
  }
```

#### Navigate with a custom state
```ts
navigate('/products/3', { name: 'Product 3', clickPos: { x, y } })
```

### Navigate using Link-component
```tsx
  function ProductsPage() {
    return <Link to="/products/1">Product 1</Link>
  }
```

#### Navigate with a custom state
```tsx
<Link to="/products/1" state={{ name: 'Product 1', clickPos: { x, y } }}>Product 1</Link>
```

### Read params
```tsx
  interface RouteState {
    name: string,
    clickPos: { x: number, y: number }
  }

  export const ProductPage = () => {
    const { params, state: { routeState } } = useNavigation<{ id: string }, RouteState>()

    return (
      <div>
        Product number: {params.id}
        Name from state: {routeState?.name}
        Pos from state: {routeState?.clickPos.x}, {routeState?.clickPos.y}
      </div>
    )
  }
```

## License

MIT