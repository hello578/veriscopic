// lib/analytics/track.ts
export function track(event: string) {
  if (typeof window !== "undefined") {
    // @ts-expect-error analytics provider injected at runtime
    window.va?.track(event)
  }
}
