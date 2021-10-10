declare global {
  interface EventTarget {
    state: any
  }
}

export const updateServiceWorker = (
  serviceWorkerRegistration: ServiceWorkerRegistration
) => {
  const registrationWaiting = serviceWorkerRegistration.waiting
  if (registrationWaiting) {
    registrationWaiting.postMessage({ type: "SKIP_WAITING" })
    registrationWaiting.addEventListener(
      "statechange",
      (e) => e.target.state === "activated" && window.location.reload()
    )
  }
}
