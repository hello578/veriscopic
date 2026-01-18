// lib/analytics/track.ts
export function track(event: string) {
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.va?.track(event)
  }
}
