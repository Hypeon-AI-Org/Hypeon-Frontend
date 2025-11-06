"use client";

import { motion } from "framer-motion";
import styles from "../../styles/AboutUs.css";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className={styles.container}>
     

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Predict What’s Next. <br />
          <span>Build What Sells.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Hypeon AI is building the reverse-trend engine for digital commerce.
          We’re solving one question every D2C founder asks:{" "}
          <b>What to sell, how to sell it, and when?</b>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Image
            src="/images/hypeonai_logo.jpg"
            alt="Hypeon AI"
            width={400}
            height={400}
            className={styles.heroImage}
          />
        </motion.div>
      </section>

      {/* ===== STORY ===== */}
      <section className={styles.story}>
        <h2>Our Story</h2>
        <div className={styles.storyGrid}>
          <div className={styles.box}>
            <p>
              After 5 years in eCommerce, we realized most ad tests fail not
              because of bad creatives — but because the product was never going
              to work in the first place.
            </p>
          </div>
          <div className={styles.box}>
            <p>
              Existing tools gave us backward-looking data: ad libraries,
              keyword planners, and SEO trends. None told us <b>what’s next</b>.
            </p>
          </div>
          <div className={styles.box}>
            <p>
              So we built what we wished existed — an AI-powered prediction
              engine that forecasts which products and angles will trend before
              they blow up.
            </p>
          </div>
        </div>
      </section>

      {/* ===== OUR VISION ===== */}
      <section className={styles.story}>
        <h2>Our Vision</h2>
        <div className={styles.storyGrid}>
          <div className={styles.box}>
            <p>
              Our vision is to build the most trusted <b>AI Copilot</b> for
              product and marketing decisions — not just to analyze trends, but
              to anticipate them before anyone else does.
            </p>
          </div>
          <div className={styles.box}>
            <p>
              We’re building a platform where marketers, founders, and creators
              can spot rising demand, craft content that rides the wave, and
              launch faster — with higher confidence.
            </p>
          </div>
          <div className={styles.box}>
            <p>
              Our goal is simple: make <b>product–market fit predictable</b>.
              Helping every D2C brand know exactly what to sell, how to sell it,
              and when to launch it.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className={styles.timeline}>
        <h2>Where We’re Headed</h2>
        <ul>
          <li>
            <span>2025:</span> Building and testing our MVP — launching at
            /function1 AI Conference, Dubai.
          </li>
          <li>
            <span>2026:</span> Expanding dataset across TikTok, Pinterest,
            Reddit, YouTube, and Shopify stores.
          </li>
          <li>
            <span>2027:</span> AI Copilot for every D2C brand — predicting
            demand, creatives, and timing.
          </li>
        </ul>
      </section>

      {/* ===== STATS ===== */}
      <section className={styles.stats}>
        <h2>Platform Insights</h2>
        <div className={styles.statsGrid}>
          <div>
            <h3>10M+</h3>
            <p>Data signals analyzed daily</p>
          </div>
          <div>
            <h3>6+</h3>
            <p>Platform integrations</p>
          </div>
          <div>
            <h3>50+</h3>
            <p>Beta partners</p>
          </div>
          <div>
            <h3>100%</h3>
            <p>AI-driven insights</p>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className={styles.team}>
        <h2>Our Global Team</h2>
        <div className={styles.teamGrid}>
          <div>
            <Image
              src="/team/founder.png"
              alt="Founder"
              width={150}
              height={150}
            />
            <h4>kumar</h4>
            <p>Founder & CEO</p>
          </div>
          <div>
            <Image
              src="/team/data-scientist.png"
              alt="Data Scientist"
              width={150}
              height={150}
            />
            <h4>Priya Sharma</h4>
            <p>Lead Data Scientist</p>
          </div>
          <div>
            <Image
              src="/team/designer.png"
              alt="Designer"
              width={150}
              height={150}
            />
            <h4>Marcus Eriksson</h4>
            <p>Product Designer</p>
          </div>
          
        </div>
      </section>

      {/* ===== CTA ===== */}
<section className={styles.cta}>
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    Join the Future of eCommerce Intelligence Today
  </motion.h2>

  <p className={styles.ctaText}>
    Whether you're a Shopify founder, TikTok seller, or growth marketer — Hypeon AI helps you 
    predict demand, create viral campaigns, and launch winning products faster.
  </p>

  <div className={styles.buttons}>
    <button className={styles.primaryBtn}>Join Beta</button>
    <button className={styles.secondaryBtn}>Partner with Us</button>
    <button className={styles.investBtn}>Invest Early</button>
  </div>
</section>
      
    </div>
  );
}
