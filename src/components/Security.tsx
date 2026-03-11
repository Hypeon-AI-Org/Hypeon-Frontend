"use client";
import React from "react";

export default function SecuritySection() {
    return (
        <section className="bg-[oklch(0.988_0.0041_91.45)] py-16 px-6 font-sans">
            <div className="max-w-4xl mx-auto text-center">

                {/* Badges Image */}
                <div className="flex justify-center mb-10">
                    <img
                        src="/images/security.png"
                        alt="Security Certifications"
                        className="w-64 md:w-96 object-contain"
                    />
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
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