import React, { useContext, useState, useEffect, memo } from 'react'
import { routerInitialState, RouterContext, RouterProvider } from './context'
import { RouterEvents } from './events'
import {
  MatchedRoute,
  RouteSettings,
  RouterParams,
  Route,
  RouterState,
  Navigate
} from './types'
import { ComponentType } from './types'
import { matchRoutes } from './utils'

export const routerEvents = new RouterEvents()

export const createRouter = (settings: RouteSettings) => {
  return memo(function Router({ children }: { children?: any }) {
    const [routerState, setRouterState] = useState(routerInitialState)
    useEffect(() => {
      const onPopState = () =>
        setRouterState({
          ...routerState,
          url: window.location.pathname,
          hash: window.location.hash
        })
      window.addEventListener('popstate', onPopState)
      return () => window.removeEventListener('popstate', onPopState)
    }, [])
    useEffect(() => {
      window.scrollTo(0, 0)
      routerEvents.dispatch(routerState)
    }, [routerState.url])

    const navigate = (url: string) => {
      setRouterState({ ...routerState, url })
      window.history.pushState(null, '', url)
    }

    const matchedRoutes = matchRoutes(settings.routes, routerState.url)
    const HAS_MATCHES = matchedRoutes.length > 0

    const childrenToRender = HAS_MATCHES
      ? createElements(matchedRoutes)
      : React.createElement(settings.fallback, { key: 'fallback' })

    return React.createElement(
      RouterProvider,
      {
        value: {
          state: routerState,
          navigate: navigate
        }
      },
      [children, childrenToRender]
    )
  })
}

function createElements(matchedRoutes: MatchedRoute[]) {
  return matchedRoutes.map((route, idx) =>
    React.createElement(route.component, {
      key: idx,
      params: route.params
    })
  )
}

function useNavigation(): [Navigate, RouterState] {
  const { navigate, state } = useContext(RouterContext)
  return [navigate, state]
}

export {
  Route,
  RouterState,
  Navigate,
  RouterParams,
  RouteSettings,
  MatchedRoute,
  ComponentType,
  useNavigation
}
