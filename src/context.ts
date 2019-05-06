import { createContext } from 'react'
import { RouterParams } from './types'

export const routerInitialState = {
  url: window.location.pathname,
  hash: window.location.hash,
}

const Context = createContext<RouterParams>({
  state: routerInitialState,
} as any)

const { Provider, Consumer } = Context

export { Provider as RouterProvider, Consumer as RouterConsumer, Context as RouterContext }
