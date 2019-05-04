import { createElement, Fragment, memo, useCallback, useContext, useEffect, useState } from 'react'
import { RouterContext, routerInitialState, RouterProvider } from './context'
import { RouterEvents } from './events'
import {
  ComponentType,
  MatchedRoute,
  Navigate,
  Route,
  RouterParams,
  RouterState,
  RouterType,
  RouteSettings,
  RoutesType,
  UseNavigation,
} from './types'
import { matchRoutes } from './utils'

export const routerEvents = new RouterEvents()

export function createRouter(settings: RouteSettings): [RouterType, RoutesType] {
  const Router = memo(function Router({ children }: { children: React.ReactNode }) {
    const [routerState, setRouterState] = useState(() => {
      const state = routerInitialState
      const matchedRoutes = matchRoutes(settings.routes, state.url)
      const params = matchedRoutes.reduce((_params, route) => ({ ..._params, ...route.params }), {})
      return {
        state,
        matchedRoutes,
        params,
      }
    })

    useEffect(() => {
      const onPopState = () => {
        handleRouteChange(window.location.pathname, window.location.hash)
      }
      window.addEventListener('popstate', onPopState)
      return () => window.removeEventListener('popstate', onPopState)
    }, [])

    useEffect(() => {
      window.scrollTo(0, 0)
      routerEvents.dispatch({ ...routerState.state, params: routerState.params })
    }, [routerState.state.url])

    const handleRouteChange = useCallback(
      (url: string, hash: string = '') => {
        const matchedRoutes = matchRoutes(settings.routes, url)
        const params = matchedRoutes.reduce(
          (_params, route) => ({ ..._params, ...route.params }),
          {}
        )
        setRouterState(routerState => ({
          state: { ...routerState.state, url, hash },
          matchedRoutes,
          params,
        }))
      },
      [settings.routes]
    )

    const navigate = useCallback(
      (url: string) => {
        handleRouteChange(url)
        window.history.pushState(null, '', url)
      },
      [handleRouteChange]
    )

    return createElement(
      RouterProvider,
      {
        value: {
          state: routerState.state,
          navigate,
          matchedRoutes: routerState.matchedRoutes,
          params: routerState.params,
        },
      },
      [children]
    )
  })

  const Routes = memo(function Routes({ children }: { children?: React.ReactNode }) {
    const context = useContext(RouterContext)
    if (!context || !context.navigate) {
      throw new Error('The <Routes>-component needs to be wrapped inside a <Router>-component')
    }

    const HAS_MATCHES = context.matchedRoutes.length > 0
    const childrenToRender = HAS_MATCHES
      ? createElements(context.matchedRoutes)
      : createElement(settings.fallback, { key: 'fallback' })

    return createElement(Fragment, null, [children, childrenToRender])
  })

  return [Router, Routes]
}

function createElements(matchedRoutes: MatchedRoute[]) {
  return matchedRoutes.map((route, idx) =>
    createElement(route.component, {
      key: idx,
    })
  )
}

function useNavigation<PropsType = any>(): UseNavigation<PropsType> {
  const context = useContext(RouterContext)
  if (!context || !context.navigate) {
    throw new Error(
      'In order to use useNavigation, the component needs to be a child to the <Router>-component'
    )
  }
  return {
    navigate: context.navigate,
    state: context.state,
    params: context.params,
  }
}

export {
  Route,
  RouterState,
  Navigate,
  RouterParams,
  RouteSettings,
  MatchedRoute,
  ComponentType,
  useNavigation,
}
