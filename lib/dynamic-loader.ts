// This file handles dynamic loading of content to optimize performance

export const loadLanguageData = async () => {
  // Dynamically import language data only when needed
  const additionalLanguagesModule = await import("./additional-languages-two")
  return additionalLanguagesModule.additionalLanguagesTwo
}

export const loadBadgeSystem = async () => {
  // Dynamically import badge system components
  const badgeSystemModule = await import("../components/badge-system")
  return badgeSystemModule.BadgeSystem
}

// Function to preload data in the background after initial page load
export const preloadAdditionalData = () => {
  // Use requestIdleCallback to load data when the browser is idle
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    ;(window as any).requestIdleCallback(() => {
      loadLanguageData()
      loadBadgeSystem()
    })
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      loadLanguageData()
      loadBadgeSystem()
    }, 2000) // Wait 2 seconds after page load
  }
}
