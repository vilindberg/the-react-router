import React, { ComponentType } from 'react'
import { RouterProvider, routerInitialState, RouterConsumer } from './context'
import { RouterEvents } from './events'
import { MatchedRoute, RouteSettings, RouterParams } from './types'
import { matchRoutes } from './utils'

export const routerEvents = new RouterEvents()

export const createRouter = (settings: RouteSettings) => {
  return class extends React.Component {
    state = routerInitialState

    componentDidMount() {
      this.dispatchState()
      window.addEventListener('popstate', () =>
        this.updateState(state => ({
          ...state,
          url: window.location.pathname,
          hash: window.location.hash
        }))
      )
    }

    navigate = (url: string) =>
      this.updateState(
        state => ({ ...state, url }),
        () => window.history.pushState(null, '', url)
      )

    updateState = (updateFn, callback?) => {
      this.setState(updateFn, () => {
        callback && callback()
        this.dispatchState()
      })
    }

    dispatchState() {
      routerEvents.dispatch({
        ...this.state
      })
    }

    render() {
      const { fallback, routes } = settings
      const { url } = this.state

      const matchedRoutes = matchRoutes(routes, url)
      const HAS_MATCHES = matchedRoutes.length > 0

      let childrenToRender = HAS_MATCHES
        ? createElements(matchedRoutes, {
            state: this.state,
            navigate: this.navigate
          })
        : React.createElement(fallback, { key: 'fallback' })

      return React.createElement(
        RouterProvider,
        {
          value: {
            state: this.state,
            navigate: this.navigate
          }
        },
        [this.props.children, childrenToRender]
      )
    }
  }
}

export const withNavigation = (Component: ComponentType) => props =>
  React.createElement(
    RouterConsumer,
    null,
    ({ state, navigate }: RouterParams) =>
      React.createElement(Component, { state, navigate, ...props })
  )

function createElements(matchedRoutes: MatchedRoute[], props: RouterParams) {
  return matchedRoutes.map((route, idx) =>
    React.createElement(route.component, {
      key: idx,
      params: route.params,
      ...props
    })
  )
}
