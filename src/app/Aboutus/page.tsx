"use client";

import { motion } from "framer-motion";
import styles from "../../styles/AboutUs.module.css";

import Image from "next/image";


//  Static imports from /public

import storyImg from "@/public/images/story.png";
import visionImg from "@/public/images/vision.png";
import yashImg from "@/public/images/yash2.jpeg";
import kajratanImg from "@/public/images/kajratan.png";
import shankarImg from "@/public/images/shankar.png";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Predict What’s Next Build What Sells.
            <span></span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Hypeon AI is building the reverse-trend engine for digital commerce.
            We’re solving one question every D2C founder asks: <b>What to sell, how to sell it, and when?</b>
          </motion.p>

          <motion.div className={styles.heroCta} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
            <button className={styles.primaryBtn}></button>
          </motion.div>
        </div>

        <motion.div className={styles.heroImageWrapper} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}>
          
        </motion.div>
      </section>

      {/* ===== OUR STORY ===== */}
     
<section className={styles.splitSection}>
  <motion.div
    className={styles.splitContent}
    initial={{ opacity: 0, x: 80 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
    viewport={{ once: true }}
  >
    <h2>Our Story</h2>
    <p>
      After 5 years in eCommerce, we realized most ad tests fail not because of bad creatives — but because the product was never going to work in the first place.
    </p>
    <p>
      Existing tools gave us backward-looking data: ad libraries, keyword planners, and SEO trends. None told us <b>what’s next</b>.
    </p>
    <p>
      So we built what we wished existed — an AI-powered prediction engine that forecasts which products and angles will trend before they blow up.
    </p>
  </motion.div>

  <motion.div
    className={styles.splitImage}
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <Image
      src={storyImg}
      alt="Our story"
      className={styles.splitImageImg}
      sizes="(max-width: 1024px) 90vw, 500px"
      placeholder="blur"
    />
  </motion.div>
</section>

      {/* ===== OUR VISION ===== */}
      <section className={styles.visionSection}>
        <motion.div className={styles.visionImage} initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
          <Image
            src={visionImg}
            alt="Our Vision"
            sizes="(max-width: 1024px) 90vw, 500px"
            placeholder="blur"
          />
        </motion.div>

        <motion.div className={styles.visionContent} initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}>
          <h2>Our Vision</h2>
          <p>
            Our vision is to build the most trusted <b>AI Copilot</b> for product and marketing decisions — not just to analyze trends, but to anticipate them before anyone else does.
          </p>
          <p>
            We’re building a platform where marketers, founders, and creators can spot rising demand, craft content that rides the wave, and launch faster — with higher confidence.
          </p>
          <p>
            Our goal is simple: make <b>product–market fit predictable</b>. Helping every D2C brand know exactly what to sell, how to sell it, and when to launch it.
          </p>
        </motion.div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className={styles.timeline}>
        <h2>Where We’re Headed</h2>
        <ul>
          <li><span>2025:</span> Building and testing our MVP — launching at /function1 AI Conference, Dubai.</li>
          <li><span>2026:</span> Expanding dataset across TikTok, Pinterest, Reddit, YouTube, and Shopify stores.</li>
          <li><span>2027:</span> AI Copilot for every D2C brand — predicting demand, creatives, and timing.</li>
        </ul>
      </section>

      {/* ===== TEAM ===== */}
      <section className={styles.team}>
        <h2>Our Founding Team</h2>
        <div className={styles.teamGrid}>
          <div>
            <Image src={yashImg} alt="Founder" width={150} height={150} />
            <h4>Yash Kumar</h4>
            <p>Founder & CEO</p>
            <span>5+ years of experience in  Growth Marketing</span>
          </div>
          <div>
            <Image src={kajratanImg} alt="Co-Founder & COO" width={150} height={150} />
            <h4>Kjartan Monstad</h4>
            <p>Co-Founder & COO</p>
            <span>2+ years of experience  working in Top Nordic Banks</span>
          </div>
          <div>
            <Image src={shankarImg} alt="Designer" width={150} height={150} />
            <h4>Dr.Sankar Mukherjee</h4>
            <p>CTO</p>
            
            <span>10+ years of experience in  AII and  ML applications</span>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.cta}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Join the Future of eCommerce Intelligence Today
        </motion.h2>

        <p className={styles.ctaText}>
          Whether you're a Shopify founder, TikTok seller, or growth marketer — Hypeon AI helps you predict demand, create viral campaigns, and launch winning products faster.
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
