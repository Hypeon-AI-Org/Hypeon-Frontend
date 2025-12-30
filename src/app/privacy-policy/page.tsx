import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-24">
        <section className="max-w-4xl mx-auto px-6 py-16 bg-white text-slate-600 leading-relaxed">

          <h1 className="text-3xl font-semibold text-slate-900">
            Privacy <span className="text-brand-600">Policy</span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Last updated: 29 December 2025
          </p>

          <p className="mt-6">
            Hypeon AI (“Hypeon,” “we,” “our,” or “us”) respects your privacy and is
            committed to protecting your personal data. This Privacy Policy
            explains how we collect, use, disclose, and safeguard information
            when you visit our website, use our products, or interact with our
            services.
          </p>

          <p className="mt-4">
            If you do not agree with the terms of this Privacy Policy, please do
            not access or use our services.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            1. Company Information
          </h2>

          <p className="mt-3"><strong>Legal Entity:</strong> HYPEON INC</p>
          <p className="mt-2">
            <strong>Address:</strong><br />
            28 Geary St, Ste 650<br />
            Suite #167<br />
            San Francisco, CA 94108<br />
            United States
          </p>
          <p className="mt-2">
            <strong>Contact Email:</strong> info@hypeon.ai
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            2. Scope of This Policy
          </h2>

          <p className="mt-3">This Privacy Policy applies to:</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Our website (hypeon.ai)</li>
            <li>Hypeon AI products and platforms</li>
            <li>Any related services, tools, analytics dashboards, or AI-powered features</li>
            <li>Marketing, sales, and support communications</li>
          </ul>

          <p className="mt-3">
            It does not apply to third-party websites or services that may be
            linked from our platform.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            3. Information We Collect
          </h2>

          <h3 className="mt-4 font-medium text-slate-800">
            3.1 Information You Provide Directly
          </h3>

          <p className="mt-2">
            We may collect personal information that you voluntarily provide,
            including:
          </p>

          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Company name</li>
            <li>Job title</li>
            <li>Billing and payment details</li>
            <li>Account credentials</li>
            <li>Messages, inquiries, or feedback submitted to us</li>
          </ul>

          <h3 className="mt-6 font-medium text-slate-800">
            3.2 Information Collected Automatically
          </h3>

          <p className="mt-2">
            When you access or use our services, we may automatically collect:
          </p>

          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Operating system</li>
            <li>Pages visited and time spent</li>
            <li>Referring URLs</li>
            <li>Usage patterns and interaction data</li>
          </ul>

          <p className="mt-3">
            This data helps us understand how our platform is used and improve
            performance and reliability.
          </p>

          <h3 className="mt-6 font-medium text-slate-800">
            3.3 Cookies and Tracking Technologies
          </h3>

          <p className="mt-2">We use cookies and similar technologies to:</p>

          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Enable essential site functionality</li>
            <li>Remember preferences</li>
            <li>Analyze traffic and usage trends</li>
            <li>Improve user experience</li>
          </ul>

          <p className="mt-3">
            You can control or disable cookies through your browser settings.
            Disabling cookies may affect certain features of the platform.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            4. How We Use Your Information
          </h2>

          <p className="mt-2">We use collected information to:</p>

          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Provide, operate, and maintain our services</li>
            <li>Create and manage user accounts</li>
            <li>Deliver AI-driven insights and analytics</li>
            <li>Improve product performance and features</li>
            <li>Process payments and transactions</li>
            <li>Communicate with you regarding updates, support, or marketing (where permitted)</li>
            <li>Detect and prevent fraud, abuse, or security issues</li>
            <li>Comply with legal obligations</li>
          </ul>

          <p className="mt-3">We do not sell your personal data.</p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            5. AI & Data Processing
          </h2>

          <p className="mt-3">
            Hypeon AI uses artificial intelligence and machine learning models to
            analyze aggregated and structured data for insights related to
            products, keywords, pricing, and advertising performance.
          </p>

          <p className="mt-3">Important clarifications:</p>

          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>We do not train our models on personally identifiable user data without consent</li>
            <li>Customer-specific data is logically isolated</li>
            <li>Any third-party AI models are used under contractual and security safeguards</li>
          </ul>

        {/* 6 */}
<h2 className="mt-12 text-xl font-medium text-slate-900">
  6. Data Sharing and Disclosure
</h2>

<p className="mt-3">
  We may share information only in the following cases:
</p>

<ul className="mt-2 list-disc list-inside space-y-1">
  <li>
    <strong>Service Providers:</strong> Trusted vendors who help us operate the
    platform (hosting, analytics, payments)
  </li>
  <li>
    <strong>Legal Requirements:</strong> When required by law, regulation, or
    legal process
  </li>
  <li>
    <strong>Business Transfers:</strong> In connection with a merger,
    acquisition, or asset sale
  </li>
  <li>
    <strong>With Consent:</strong> When you explicitly authorize us to share
    data
  </li>
</ul>

<p className="mt-3">
  All third parties are required to protect your information and use it only
  for authorized purposes.
</p>

{/* 7 */}
<h2 className="mt-12 text-xl font-medium text-slate-900">
  7. Data Security
</h2>

<p className="mt-3">
  We implement appropriate technical and organizational security measures to
  protect your data, including:
</p>

<ul className="mt-2 list-disc list-inside space-y-1">
  <li>Secure cloud infrastructure</li>
  <li>Access controls and authentication</li>
  <li>Encryption where appropriate</li>
  <li>Regular monitoring for vulnerabilities</li>
</ul>

<p className="mt-3">
  However, no system is 100% secure. You use our services at your own risk.
</p>

{/* 8 */}
<h2 className="mt-12 text-xl font-medium text-slate-900">
  8. Data Retention
</h2>

<p className="mt-3">
  We retain personal data only for as long as necessary to:
</p>

<ul className="mt-2 list-disc list-inside space-y-1">
  <li>Fulfill the purposes outlined in this policy</li>
  <li>Comply with legal and regulatory obligations</li>
  <li>Resolve disputes and enforce agreements</li>
</ul>

<p className="mt-3">
  You may request deletion of your data, subject to legal requirements.
</p>

{/* 9 */}
<h2 className="mt-12 text-xl font-medium text-slate-900">
  9. Your Rights
</h2>

<p className="mt-3">
  Depending on your location, you may have rights to:
</p>

<ul className="mt-2 list-disc list-inside space-y-1">
  <li>Access your personal data</li>
  <li>Correct inaccurate information</li>
  <li>Request deletion of your data</li>
  <li>Object to or restrict processing</li>
  <li>Withdraw consent where applicable</li>
</ul>

<p className="mt-3">
  To exercise these rights, contact us at info@hypeon.ai.
</p>

{/* 10 */}
<h2 className="mt-12 text-xl font-medium text-slate-900">
  10. International Data Transfers
</h2>

<p className="mt-3">
  Hypeon AI operates globally. Your information may be transferred to and
  processed in countries outside your jurisdiction, including the United
  States.
</p>

<p className="mt-3">
  We take steps to ensure appropriate safeguards are in place for international
  transfers.
</p>

{/* 11 */}
<h2 className="mt-12 text-xl font-medium text-slate-900">
  11. Children’s Privacy
</h2>

<p className="mt-3">
  Hypeon AI is not intended for individuals under the age of 18. We do not
  knowingly collect personal data from children.
</p>

<p className="mt-3">
  If you believe a child has provided us with personal data, please contact us
  immediately.
</p>

{/* 12 */}
<h2 className="mt-12 text-xl font-medium text-slate-900">
  12. Third-Party Links
</h2>

<p className="mt-3">
  Our platform may contain links to third-party websites or services. We are
  not responsible for the privacy practices or content of those third parties.
</p>

{/* 13 */}
<h2 className="mt-12 text-xl font-medium text-slate-900">
  13. Changes to This Privacy Policy
</h2>

<p className="mt-3">
  We may update this Privacy Policy from time to time. Changes will be posted
  on this page with an updated revision date.
</p>

<p className="mt-3">
  Continued use of our services after changes constitutes acceptance of the
  updated policy.
</p>

{/* 14 */}
<h2 className="mt-12 text-xl font-medium text-slate-900">
  14. Contact Us
</h2>

<p className="mt-3">
  If you have questions, concerns, or requests related to this Privacy Policy,
  please contact us:
</p>

<p className="mt-3">
   info@hypeon.ai
</p>

<p className="mt-3">
   HYPEON INC<br />
  28 Geary St, Ste 650<br />
  Suite #167<br />
  San Francisco, CA 94108
</p>


        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
