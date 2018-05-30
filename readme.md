# the-react-router [![Build Status](https://travis-ci.org/Vieriksson/the-react-router.svg?branch=master)](https://travis-ci.org/Vieriksson/the-react-router)

## Install

```
$ npm install @vieriksson/the-react-router
```

## Usage

```jsx
import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'
import { createRouter, routerEvents, withNavigation } from '@vieriksson/the-react-router'

routerEvents.addListener(state => {
  console.log(state.url)
})

const routes = {
  fallback: () => <div>404 UNTZ</div>,
  routes: [
    {
      path: '/',
      exact: true,
      component: () => <div>HOME</div>
    },
    {
      path: '/omg',
      component: () => <div>OMG</div>
    },
    {
      path: '/omg/:id',
      component: withNavigation(({ params }) => <div>OMG {params.id}</div>)
    }
  ]
}

const Router = createRouter(routes)

const NavbarComponent = ({ navigate }) => (
  <Fragment>
    <button onClick={() => navigate('/')}>GO TO HOME</button>
    <button onClick={() => navigate('/omg')}>GO TO OMG</button>
    <button onClick={() => navigate('/omg/123')}>GO TO OMG 123</button>
    <button onClick={() => navigate('/janne')}>GO TO 404</button>
  </Fragment>
)

const Navbar = withNavigation(NavbarComponent)

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
      </Router>
    )
  }
}

const renderElement = document.createElement('div')
renderElement.id = 'root'
document.body.appendChild(renderElement)

render(<App />, document.getElementById('root'))

```

## License

MIT