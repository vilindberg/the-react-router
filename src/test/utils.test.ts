import { matchRoutes } from '../utils'

test('if exact, should only match if path === url', () => {
  // Arrange
  const routes = [
    {
      path: '/',
      exact: true
    },
    {
      path: '/123',
      exact: true
    }
  ] as any

  // Act
  const matches = matchRoutes(routes, '/')

  // Assert
  expect(matches.length).toBe(1)
})

test('if not exact, should match if url starts with path', () => {
  // Arrange
  const routes = [
    {
      path: '/'
    },
    {
      path: '/123'
    }
  ] as any

  // Act
  const matches = matchRoutes(routes, '/123')

  // Assert
  expect(matches.length).toBe(2)
})

test('should receive params with same property name as in path', () => {
  // Arrange
  const routes = [
    {
      path: '/test/:id'
    }
  ] as any

  // Act
  const matches = matchRoutes(routes, '/test/123')

  // Assert
  expect(matches[0].params.id).toBe('123')
})
