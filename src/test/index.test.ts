import { routerEvents } from '../'

test('should call listeners on dispatch', () => {
  // Arrange
  const mock = jest.fn()
  routerEvents.addListener(() => {
    mock()
  })

  // Act
  routerEvents.dispatch({ url: '' })

  // Assert
  expect(mock.mock.calls.length).toBe(1)
})

test('should pass state as props to listeners on dispatch', () => {
  // Arrange
  const mock = jest.fn()
  routerEvents.addListener(state => {
    mock(state)
  })

  // Act
  routerEvents.dispatch({ url: 'b' })

  // Assert
  expect(mock.mock.calls[0][0].url).toBe('b')
})

test('should be able to call multiple listeners', () => {
  // Arrange
  const mock1 = jest.fn()
  const mock2 = jest.fn()
  routerEvents.addListener(() => {
    mock1()
  })
  routerEvents.addListener(() => {
    mock2()
  })

  // Act
  routerEvents.dispatch({ url: '' })

  // Assert
  expect(mock1.mock.calls.length).toBe(1)
  expect(mock2.mock.calls.length).toBe(1)
})
