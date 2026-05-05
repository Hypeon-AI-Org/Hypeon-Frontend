import Link from "next/link";

export default function ProductsCTA() {
  return (
    <section className="py-20 bg-black text-white text-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tighter reveal">
        Turn intelligence into winning decisions
      </h2>

      <Link
        href="https://app.hypeon.ai/hub/login"
        className="inline-block mt-6 rounded-xl bg-white px-6 py-3 text-black text-sm font-medium reveal"
      >
        Get the demo
      </Link>
    </section>
  );
}
