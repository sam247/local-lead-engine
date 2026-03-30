import { TrustStrip } from "engine";

/** Lightweight single-row trust line directly under the homepage hero. */
export function HomePostHeroTrust() {
  return (
    <section className="border-b border-border bg-background py-4 sm:py-5" aria-label="Trust signals">
      <div className="container">
        <TrustStrip className="justify-center sm:justify-between" />
      </div>
    </section>
  );
}
