import ReactGA from "react-ga"
import { useEffect } from "react"
import { useRouter } from "next/dist/client/router"

export function useReactGA(id: string) {
  const router = useRouter()

  useEffect(() => {
    ReactGA.initialize(id)
  }, [])

  useEffect(() => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }, [router.route])
}

export function GoogleAnalytics({ id }) {
  useReactGA(id)
  return null
}
