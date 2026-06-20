"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Sparkles } from "lucide-react";

/* ============================================================
   Floating ad-card showcase — recreated from "ads section.mp4".
   • light bg, narrow TALL centered column, white-matte-framed cards
   • CONTINUOUS scroll parallax: scroll DOWN → cards hover UP,
     scroll UP → cards hover DOWN (reverses with scroll, every time).
     Each card moves at its own depth for a layered "hover" feel.
   • magenta "Try For Free Now" pill on top.
============================================================ */

type Card = { x: number; top: number; w: number; ar: number; z?: number; img: string };

// x/top/w in % of the cluster bbox (450×875); ar = width/height. Measured exact.
const CARDS: Card[] = [
    { x: 82.2, top: 0.0, w: 17.6, ar: 0.60, img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=75" }, // purple perfume
    { x: 0.0, top: 1.6, w: 22.9, ar: 1.03, img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=75" }, // red budget
    { x: 25.5, top: 0.8, w: 15.0, ar: 0.80, img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop&q=75" }, // fills the top-left gap
    { x: 42.2, top: 7.4, w: 26.4, ar: 1.13, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&auto=format&fit=crop&q=75" }, // COTY beauty
    { x: 80.0, top: 15.1, w: 19.8, ar: 0.99, img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&auto=format&fit=crop&q=75" }, // DYNAMIC FIT
    { x: 11.3, top: 22.2, w: 17.6, ar: 1.32, z: 2, img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&auto=format&fit=crop&q=75" }, // drink (on adidas)
    { x: 53.6, top: 23.1, w: 23.3, ar: 1.13, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=75" }, // espresso
    { x: 80.5, top: 28.5, w: 16.5, ar: 0.95, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=75" }, // fills the right-middle gap
    { x: 1.3, top: 25.6, w: 36.4, ar: 1.55, z: 1, img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=700&auto=format&fit=crop&q=75" }, // adidas (wide)
    { x: 34.4, top: 37.7, w: 23.3, ar: 1.05, img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&auto=format&fit=crop&q=75" }, // AirPods
    { x: 74.0, top: 43.4, w: 26.0, ar: 1.08, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=75" }, // skincare
    { x: 0.2, top: 44.0, w: 23.3, ar: 0.74, img: "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?w=400&auto=format&fit=crop&q=75" }, // jumpsuit
    { x: 43.3, top: 56.6, w: 26.2, ar: 0.69, img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&auto=format&fit=crop&q=75" }, // Revolutionizes AI
    { x: 77.3, top: 57.7, w: 18.2, ar: 0.66, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=75" }, // DEWALT
    { x: 0.2, top: 60.2, w: 23.8, ar: 1.16, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop&q=75" }, // adventure
    { x: 0.2, top: 76.8, w: 23.3, ar: 1.27, img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=75" }, // dental
    { x: 37.3, top: 79.9, w: 34.4, ar: 2.04, img: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=700&auto=format&fit=crop&q=75" }, // Legacy (wide)
    { x: 72.9, top: 87.4, w: 22.2, ar: 1.18, z: 2, img: "https://images.unsplash.com/photo-1469827160215-9d29e96e72f4?w=400&auto=format&fit=crop&q=75" }, // %52 (on banner)
    { x: 19.1, top: 89.9, w: 62.7, ar: 3.20, z: 1, img: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=900&auto=format&fit=crop&q=75" }, // 699 banner (wide)
];

function AdCard({ c, i, progress }: { c: Card; i: number; progress: MotionValue<number> }) {
    // each card a different depth → layered hover; reverses with scroll direction
    const depth = 0.6 + ((i * 7) % 6) * 0.28;
    const y = useSpring(useTransform(progress, [0, 1], [depth * 120, -depth * 120]), {
        stiffness: 70, damping: 18, mass: 0.4,
    });
    return (
        <motion.div
            style={{ left: `${c.x}%`, top: `${c.top}%`, width: `${c.w}%`, zIndex: c.z ?? 1, y }}
            className="absolute rounded-2xl bg-white p-1.5 shadow-[0_12px_30px_rgba(40,20,60,0.12)] will-change-transform"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.img} alt="" loading="lazy" style={{ aspectRatio: c.ar }} className="block w-full rounded-lg object-cover" />
        </motion.div>
    );
}

export default function AdsShowcase() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    return (
        <section className="relative overflow-hidden bg-[oklch(0.988_0.0041_91.45)] pb-16 pt-2 sm:pb-24 sm:pt-4">
            <div ref={ref} className="flex flex-col items-center px-4">
                {/* cluster — cards hover up/down with scroll direction */}
                <div className="relative aspect-[450/875] w-[min(96vw,840px)]">
                    {CARDS.map((c, i) => (
                        <AdCard key={i} c={c} i={i} progress={scrollYProgress} />
                    ))}
                </div>

                {/* magenta CTA pill — below the cluster */}
                <motion.a
                    href="https://app.hypeon.ai/hub/login"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="z-20 mt-14 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                >
                    Try For Free Now <Sparkles className="h-4 w-4" />
                </motion.a>
            </div>
        </section>
    );
}
