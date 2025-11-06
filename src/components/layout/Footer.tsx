"use client";

import Link from "next/link";
import "../../styles/footer.css"; 

export default function Footer() {
  return (
    <footer className="footer-bg text-gray-300 mt-20 py-12 relative overflow-hidden">
      {/* Animated gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-pink-700 to-indigo-800 opacity-70 animate-gradient"></div>

      <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-10 z-10">
        {/* About */}
        <div>
          <h3 className="text-2xl font-semibold text-pink-300 mb-4">About Hypeon AI</h3>
          <p className="leading-relaxed">
            Your AI-powered engine to predict viral products, insights, and growth strategies for the next-gen e-commerce brands.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold text-pink-300 mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link href="/" className="hover:text-white transition-colors duration-300">Home</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors duration-300">Pricing</Link></li>
            <li><Link href="/signup" className="hover:text-white transition-colors duration-300">Sign Up</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors duration-300">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-semibold text-pink-300 mb-4">Contact</h3>
          <p>Email: <a href="mailto:support@hypeon.ai" className="hover:text-white">support@hypeon.ai</a></p>
          <p>Phone: +91 123 456 7890</p>
          <div className="flex space-x-5 mt-5">
            <Link href="#" className="hover:text-white transition-transform transform hover:scale-110">Twitter</Link>
            <Link href="#" className="hover:text-white transition-transform transform hover:scale-110">LinkedIn</Link>
            <Link href="#" className="hover:text-white transition-transform transform hover:scale-110">Instagram</Link>
          </div>
        </div>
      </div>

      <div className="relative text-center mt-10 border-t border-gray-700 pt-4 text-sm z-10">
        &copy; {new Date().getFullYear()} Hypeon AI. All rights reserved.
      </div>
    </footer>
  );
}

