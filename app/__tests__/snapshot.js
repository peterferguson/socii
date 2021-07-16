/**
 * @jest-environment jsdom
 */

import React from "react"
import { create, act } from "react-test-renderer"
import Home from "../pages/index"

it("renders homepage unchanged", () => {
  let root
  act(() => {
    root = create(<Home />)
  })
  const tree = root.toJSON()
  expect(tree).toMatchSnapshot()
})
