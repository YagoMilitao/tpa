import React from 'react'

// Minimal mock for framer-motion's motion.* components to stabilize tests
// It renders basic HTML elements and passes through props/children.
export const motion: any = new Proxy(
  {},
  {
    get: (_target, prop: string) => {
      const tag = prop as keyof JSX.IntrinsicElements
      return ({ children, ...rest }: any) => {
        const Component: any = tag in (React as any).DOM ?? tag
        return React.createElement(tag as any, rest, children)
      }
    },
  }
)

export default {}
