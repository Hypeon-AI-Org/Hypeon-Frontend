'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Home } from 'lucide-react';

export default function LogoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-green-600/10 rounded-full mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-400" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-3">You've Been Logged Out</h1>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
            Thank you for using Hypeon AI. Your session has been successfully terminated.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
          
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-full py-3 px-6 bg-gray-800 text-white border border-gray-700 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Sign In Again
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm text-gray-500"
        >
          Need help? <a href="#" className="text-blue-400 hover:text-blue-300">Contact support</a>
        </motion.p>
      </motion.div>
    </div>
  );
}
