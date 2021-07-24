import "@testing-library/jest-dom"

// Manually mock next/dynamic as the next.js (7.0.2) babel plugin will compile to Webpack
// lazy imports (require.resolveWeak) who're conflicting with the Node module system.
jest.mock("next/dynamic", () => () => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = "LoadableComponent"
  DynamicComponent.preload = jest.fn()
  return DynamicComponent
})
