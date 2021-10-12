// - Source: https://betterprogramming.pub/let-users-know-when-you-have-updated-your-service-worker-in-create-react-app-b0c2701995b3

interface Config {
  onUpdate?: (registration: ServiceWorkerRegistration) => void
  onSuccess?: (registration: ServiceWorkerRegistration) => void
}

export const registerValidSW = (swUrl: string, config: Config) => {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing
        if (installingWorker == null) return

        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                "New content is available and will be used when all " +
                  "tabs for this page are closed."
              )

              if (config && config.onUpdate) config.onUpdate(registration)
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log("Content is cached for offline use.")

              if (config && config.onSuccess) config.onSuccess(registration)
            }
          }
        }
      }
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error)
    })
}
