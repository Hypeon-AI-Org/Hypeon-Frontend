"use client";
import React from "react";
import Image from "next/image";

export default function SecuritySection() {
    return (
        <section className="bg-[#ffffff] py-16 px-6 font-sans">
            <div className="max-w-4xl mx-auto text-center">

                {/* Badges Image */}
                <div className="flex justify-center items-center gap-8 md:gap-12 mb-10">

  {/* First Image */}
  <Image
    src="/images/security1.webp"
    alt="EU GDPR"
    width={200}
    height={200}
    className="w-28 md:w-36 object-contain"
  />

  {/* Second Image - slightly smaller */}
  <Image
    src="/images/security2.webp"
    alt="STAR Level One"
    width={190}
    height={190}
    className="w-28 md:w-36 object-contain"
  />

</div>
                {/* Heading */}
                <h2 className="text-2xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tighter">
                    Built with enterprise-grade security
                </h2>

                {/* Text */}
                <p className="text-[15px] text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    HypeOn meets the highest security standards, including GDPR, CCPA,
                    SOC 2, and ISO 27001.
                </p>

                <p className="text-[15px] text-gray-600 max-w-3xl mx-auto mt-3 leading-relaxed">
                    With dedicated security leadership, external audits, and data region
                    choice, we ensure your marketing data is protected and compliant at all times.
                </p>

            </div>
        </section>
    );
}