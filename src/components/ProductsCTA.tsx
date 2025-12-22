import Link from "next/link";

export default function ProductsCTA() {
  return (
    <section className="py-20 bg-black text-white text-center">
      <h2 className="text-2xl font-display reveal">
        Turn intelligence into winning decisions
      </h2>

      <Link
        href="/signup"
        className="inline-block mt-6 rounded-xl bg-white px-6 py-3 text-black text-sm reveal"
      >
        Start Using HypeOn
      </Link>
    </section>
  );
}
