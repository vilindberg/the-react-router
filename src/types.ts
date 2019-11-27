export type RouterState<T = any> = {
  url: string
  hash?: string
  routeState?: T
}

export type Navigate = (url: string, state?: any) => void

export type RouterParams = {
  state: RouterState
  navigate: Navigate
  matchedRoutes: MatchedRoute[]
  params: any
}

export type Route = {
  path: string
  component: ComponentType<RouterParams>
  exact?: boolean
}

export type RouteSettings = {
  fallback: ComponentType<{}>
  routes: Route[]
}

export type MatchedRoute = {
  component: ComponentType<any>
  match: any
  keys?: any
  params?: any
}

export type ComponentType<P> = React.ComponentClass<P> | ((props: P) => JSX.Element | null)

export type RouterType = React.NamedExoticComponent<{
  children: React.ReactNode
}>

export type RoutesType = React.NamedExoticComponent<{
  children?: React.ReactNode
}>
export type UseNavigation<PropsType = any, StateType = any> = {
  navigate: Navigate
  state: RouterState<StateType>
  params: PropsType
}

export type NavigationActionType = 'historyPop' | 'navigate' | 'initNavigation';
