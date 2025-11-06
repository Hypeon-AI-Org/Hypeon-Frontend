"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-purple-900 via-purple-800 to-pink-600 text-white px-8 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold text-pink-300">
        <Link href="/">hypeon.ai</Link>
      </div>

      <ul className="flex space-x-8 text-base">
        <li>
          <Link href="/features" className="hover:text-pink-200 transition-colors">
            Features
          </Link>
        </li>
        <li>
          <Link href="/pricing" className="hover:text-pink-200 transition-colors">
            Pricing
          </Link>
        </li>
        <li>
          <Link href="/Aboutus" className="hover:text-pink-200 transition-colors">
            About Us
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="hover:text-pink-200 transition-colors">
            Dashboard
          </Link>
        </li>
      </ul>

      <Link
        href="/login"
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold px-5 py-2 rounded-xl hover:opacity-90 transition"
      >
        Login
      </Link>
    </nav>
  );
}
