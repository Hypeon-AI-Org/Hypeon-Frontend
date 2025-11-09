"use client";
import Image from "next/image";
import "../../styles/features.css";

import step1 from "@/public/images/step1.png";
import step2 from "@/public/images/step2.png";
import step3 from "@/public/images/step3.jpg";

export default function FeaturesPage() {
  return (
    <div className="features-container">
      
      {/* ===== Header Section ===== */}
      <header className="features-header fade-in">
        <h1 className="gradient-title">hypeon.ai Features</h1>
        <p className="gradient-subtitle">
          21.4M+ data points analyzed daily to predict viral trends
        </p>
      </header>

      {/* ===== Steps Section ===== */}
      <section className="steps-section fade-in-up">
        <div className="step-card step1 float">
          <div className="image-wrapper">
            <Image
              src={step1}
              alt="Step 1"
              width={300}
              height={180}
            />
          </div>
          <h3>Step 1</h3>
          <p>Access precise data for trending products in your niche</p>
        </div>

        <div className="step-card step2 float-delay">
          <div className="image-wrapper">
            <Image
              src={step2}
              alt="Step 2"
              width={300}
              height={180}
            />
          </div>
          <h3>Step 2</h3>
          <p>See the connected searchwords they are ranking on</p>
        </div>

        <div className="step-card step3 float-delay2">
          <div className="image-wrapper">
            <Image
              src={step3}
              alt="Step 3"
              width={300}
              height={180}
            />
          </div>
          <h3>Step 3</h3>
          <p>Find the best performing ad creatives for each product</p>
        </div>
      </section>

      {/* ===== Content Section ===== */}
      <section className="content-box fade-in-up-delay">
        <h2>Products: Trend Identification (Current & Future)</h2>
        <p>
          Our product feature showcases two types of products: first, spotting
          current trending products that are experiencing current demand to
          capture immediate sales.
        </p>
        <p>
          The second product feature is accurately forecasting future trending
          products to inform long-term strategy, secure optimal inventory, and
          gain a first-mover advantage.
        </p>
        <p>
          Both trend prediction products use data analysis of sales velocity,
          search volume, and social media buzz to categorize items, ensuring
          that ecommerce shops can align their product catalog with both
          established and emerging consumer desires for different products.
        </p>

        <h2>Keywords: Trending keywords per product</h2>
        <p>
          Keywords are the linguistic bridge connecting consumers to a product,
          and identifying the right trending ones is crucial for visibility.
          This feature isolates the most searched and relevant terms for a
          specific product, enabling ecommerce shops to optimize their product
          titles, descriptions, and Pay-Per-Click (PPC) campaigns.
        </p>
        <p>
          By focusing on trending keywords with high purchase intent, businesses
          can significantly increase their product’s organic search ranking and
          ad relevance, driving targeted traffic that converts into sales.
        </p>

        <h2>Ad Creatives: Winning ad creatives per product</h2>
        <p>
          Ad creatives are the visual and narrative elements that ultimately
          persuade a customer to purchase. Finding the winning ad creatives
          involves analyzing which images, videos, headlines, and
          calls-to-action (CTAs) are currently performing best across various
          platforms.
        </p>
        <p>
          Trend prediction products provide insights into high-converting
          formats such as short, authentic video ads or user-generated content
          (UGC) styles, helping advertisers replicate successful strategies,
          reduce testing costs, and quickly scale campaigns for the identified
          trending products.
        </p>
      </section>
 
    </div>
  );
}
