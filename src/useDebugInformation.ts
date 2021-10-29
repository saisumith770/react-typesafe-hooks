import { useEffect, useRef } from "react"
import useRenderCount from "./useRenderCount"

/**
 * @param componentName
 * @param props
 * @returns ReactComponentRenderInformation
 * @description
 * Hook that takes in the component and returns it debug information.
 * @example
 * export default function DebugInformationComponent() {
  const [boolean, toggle] = useToggle(false)
  const [count, setCount] = useState(0)

  return (
    <>
      <ChildComponent boolean={boolean} count={count} />
      <!--Component-->
    </>
  )
}

function ChildComponent(props) {
  const info = useDebugInformation("ChildComponent", props)

  return (<!--Component-->)
}
 */
export default function useDebugInformation(componentName: string, props: Record<string, any>) {
  const count = useRenderCount()
  const changedProps = useRef<typeof props>({})
  const previousProps = useRef(props)
  const lastRenderTimestamp = useRef(Date.now())

  const propKeys = Object.keys({ ...props, ...previousProps })
  changedProps.current = propKeys.reduce((obj, key) => {
    if (props[key] === previousProps.current[key]) return obj
    return {
      ...obj,
      [key]: { previous: previousProps.current[key], current: props[key] },
    }
  }, {})
  const info = {
    count,
    changedProps: changedProps.current,
    timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
    lastRenderTimestamp: lastRenderTimestamp.current,
  }

  useEffect(() => {
    previousProps.current = props
    lastRenderTimestamp.current = Date.now()
    console.log("[debug-info]", componentName, info)
  })

  return info
}