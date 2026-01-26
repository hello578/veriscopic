
// components/shared/final-cta.tsx

import Link from "next/link"

export function FinalCTA() {
  return (
    <section
      className="
        relative
        left-1/2
        right-1/2
        -ml-[50vw]
        -mr-[50vw]
        w-screen
        bg-slate-900
        text-white
        mb-10
        sm:mb-16
      "
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="py-20 sm:py-28 text-center">
          <h2 className="v-h2 v-h2-invert">Request a trustee briefing</h2>

          <p className="mx-auto mt-6 max-w-2xl text-slate-300">
            A short, exploratory conversation for trustees and senior leaders
            who want to understand how governance evidence works in practice.

          </p>

          {/* CTA stack */}
          <div className="mt-12 flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6">
            <div>
              <Link
                href="https://calendly.com/hello-veriscopic/30min"
                className="
                  v-btn
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  px-8
                  py-3.5
                  text-sm
                  font-semibold
                  bg-slate-900
                  text-white
                  shadow-sm
                  hover:bg-slate-950
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-slate-900
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-slate-900
                  w-full
                  max-w-[260px]
                "
              >
                Request a briefing
              </Link>
            </div>

            <div>
              <Link
                href="/evidence"
                className="
                  v-btn
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  px-8
                  py-3.5
                  text-sm
                  font-semibold
                  bg-slate-100
                  text-slate-900
                  border
                  border-slate-200
                  hover:bg-slate-200
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-slate-900
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-slate-900
                  w-full
                  max-w-[280px]
                "
              >
                View sample evidence pack
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* HARD FOOTER SEPARATION — DO NOT REMOVE */}
      <div aria-hidden className="h-32 sm:h-40" />
    </section>
  )
}
