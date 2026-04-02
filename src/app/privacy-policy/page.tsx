import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mailto = "mailto:info@hypeon.ai";

function ContactEmail() {
  return (
    <a href={mailto} className="text-brand-600 hover:underline">
      info@hypeon.ai
    </a>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />

      <main className="flex-1 pt-24 pb-24">
        <section className="max-w-4xl mx-auto px-6 py-16 bg-[oklch(0.988_0.0041_91.45)] text-slate-600 leading-relaxed">
          <h1 className="text-3xl font-semibold text-slate-900">
            Privacy <span className="text-brand-600">Policy</span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            <strong className="font-medium text-slate-700">
              Last Updated: April 2, 2026
            </strong>
            <br />
            <strong className="font-medium text-slate-700">
              Effective Date: April 2, 2026
            </strong>
          </p>

          <p className="mt-6">
            Hypeon AI (&quot;Hypeon,&quot; &quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;) is committed to protecting the privacy and security
            of your personal data. This Privacy Policy provides a comprehensive
            explanation of how we collect, use, process, store, share, and
            safeguard your information when you access our website, use our
            products, or interact with our services.
          </p>

          <p className="mt-4">
            This Privacy Policy has been drafted to comply with applicable data
            protection laws, including the General Data Protection Regulation
            (GDPR), the California Consumer Privacy Act (CCPA) as amended by the
            California Privacy Rights Act (CPRA), and other relevant privacy
            regulations.
          </p>

          <p className="mt-4">
            By accessing or using our services, you acknowledge that you have read,
            understood, and agree to the practices described in this Privacy
            Policy. If you do not agree, you must discontinue use of our services
            immediately.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            1. About Us
          </h2>

          <p className="mt-3">
            <strong>Legal Entity:</strong> HYPEON INC
          </p>
          <p className="mt-2">
            <strong>Registered Address:</strong>
            <br />
            28 Geary St, Ste 650, Suite #167
            <br />
            San Francisco, CA 94108
            <br />
            United States
          </p>
          <p className="mt-2">
            <strong>Data Protection Contact:</strong> <ContactEmail />
          </p>
          <p className="mt-3">
            For the purposes of the GDPR and other applicable data protection
            laws, Hypeon AI acts as the <strong>Data Controller</strong> for
            personal data collected through our website and services, unless
            otherwise specified in a separate data processing agreement.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            2. Definitions
          </h2>
          <p className="mt-3">
            To ensure clarity, the following terms are used throughout this
            policy:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-2">
            <li>
              <strong>&quot;Personal Data&quot;</strong> means any information
              that identifies, relates to, describes, or could reasonably be
              linked to a particular individual or household.
            </li>
            <li>
              <strong>&quot;Processing&quot;</strong> means any operation
              performed on Personal Data, including collection, recording,
              storage, modification, retrieval, use, disclosure, or deletion.
            </li>
            <li>
              <strong>&quot;Data Subject&quot;</strong> means any identified or
              identifiable natural person whose Personal Data is processed.
            </li>
            <li>
              <strong>&quot;Services&quot;</strong> means our website,
              platform, products, tools, APIs, dashboards, and all related
              features.
            </li>
            <li>
              <strong>&quot;Third Party&quot;</strong> means any entity other
              than the Data Subject, the Data Controller, or authorized Data
              Processors.
            </li>
          </ul>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            3. Scope of This Policy
          </h2>
          <p className="mt-3">This Privacy Policy applies to:</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Our website located at{" "}
              <a
                href="https://hypeon.ai"
                className="text-brand-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                hypeon.ai
              </a>{" "}
              and any subdomains
            </li>
            <li>All Hypeon AI products, platforms, tools, and APIs</li>
            <li>
              AI-powered features, analytics dashboards, and reporting tools
            </li>
            <li>
              Marketing, sales, customer support, and onboarding communications
            </li>
            <li>
              Data collected through forms, surveys, events, and integrations
            </li>
          </ul>
          <p className="mt-3">
            This policy does <strong>not</strong> apply to:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Third-party websites, applications, or services linked from our
              platform
            </li>
            <li>
              Data collected by third-party integrations you connect
              independently
            </li>
            <li>
              Information collected by partners or vendors under their own
              privacy policies
            </li>
          </ul>
          <p className="mt-3">
            We encourage you to review the privacy policies of all third parties
            you interact with through or alongside our Services.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            4. Information We Collect
          </h2>

          <h3 className="mt-4 font-medium text-slate-800">
            4.1 Information You Provide Directly
          </h3>
          <p className="mt-2">
            When you register for an account, subscribe to a plan, make a
            purchase, submit a form, or communicate with us, you may voluntarily
            provide:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>Identity Data:</strong> Full name, username, or similar
              identifier
            </li>
            <li>
              <strong>Contact Data:</strong> Email address, phone number,
              mailing address
            </li>
            <li>
              <strong>Professional Data:</strong> Company name, job title,
              department, industry
            </li>
            <li>
              <strong>Financial Data:</strong> Billing address, payment card
              details, bank account information (processed through secure
              third-party payment processors)
            </li>
            <li>
              <strong>Account Data:</strong> Login credentials, account
              preferences, and settings
            </li>
            <li>
              <strong>Communication Data:</strong> Messages, inquiries,
              feedback, support tickets, and survey responses
            </li>
            <li>
              <strong>Content Data:</strong> Files, documents, or data you
              upload to our platform
            </li>
          </ul>

          <h3 className="mt-6 font-medium text-slate-800">
            4.2 Information Collected Automatically
          </h3>
          <p className="mt-2">
            When you access or use our Services, we automatically collect certain
            technical and usage data, including:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>Network Data:</strong> IP address, internet service
              provider, and general geolocation (city/region level)
            </li>
            <li>
              <strong>Device Data:</strong> Device type, model, unique device
              identifiers, operating system, and screen resolution
            </li>
            <li>
              <strong>Browser Data:</strong> Browser type, version, language
              preference, and plug-in details
            </li>
            <li>
              <strong>Usage Data:</strong> Pages visited, features accessed,
              actions taken, click paths, session duration, frequency of use, and
              timestamps
            </li>
            <li>
              <strong>Referral Data:</strong> Referring URLs, search terms, and
              exit pages
            </li>
            <li>
              <strong>Performance Data:</strong> Page load times, errors
              encountered, and diagnostic data
            </li>
          </ul>

          <h3 className="mt-6 font-medium text-slate-800">
            4.3 Cookies and Tracking Technologies
          </h3>
          <p className="mt-2">
            We use cookies, web beacons, pixels, local storage, and similar
            technologies to collect information and enhance your experience. Our
            tracking technologies fall into the following categories:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-2">
            <li>
              <strong>Strictly Necessary Cookies:</strong> Essential for the
              operation of our website. These cannot be disabled without
              breaking core functionality. They enable services such as
              authentication, security, and session management.
            </li>
            <li>
              <strong>Performance and Analytics Cookies:</strong> Help us
              understand how visitors interact with our platform by collecting
              aggregated, anonymized usage data. We use tools such as Google
              Analytics and similar services.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Remember your preferences,
              settings, and choices (such as language or region) to provide a
              more personalized experience.
            </li>
            <li>
              <strong>Marketing and Advertising Cookies:</strong> Used to deliver
              relevant advertisements and track the effectiveness of marketing
              campaigns. These may be set by us or third-party advertising
              partners.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Managing Cookies:</strong> You can manage your cookie
            preferences through your browser settings or through any cookie
            consent banner we provide. Please note that disabling certain
            cookies may limit the functionality of our platform. For more
            information on specific cookies we use, contact us at{" "}
            <ContactEmail />.
          </p>

          <h3 className="mt-6 font-medium text-slate-800">
            4.4 Information from Third Parties
          </h3>
          <p className="mt-2">
            We may receive information about you from third-party sources,
            including:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Business partners, resellers, and referral programs</li>
            <li>Marketing and analytics providers</li>
            <li>Publicly available databases and directories</li>
            <li>
              Social media platforms (when you interact with our profiles or use
              social login)
            </li>
          </ul>
          <p className="mt-3">
            We combine this information with data we collect directly to
            improve the accuracy and relevance of our Services.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            5. Legal Bases for Processing (GDPR)
          </h2>
          <p className="mt-3">
            Where the GDPR applies, we process your Personal Data on one or more
            of the following legal bases:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-2">
            <li>
              <strong>Consent:</strong> You have given clear, informed consent
              for specific processing activities (e.g., marketing emails,
              optional analytics).
            </li>
            <li>
              <strong>Contractual Necessity:</strong> Processing is necessary to
              perform or enter into a contract with you (e.g., account creation,
              service delivery, billing).
            </li>
            <li>
              <strong>Legitimate Interest:</strong> Processing is necessary for
              our legitimate business interests, provided those interests are not
              overridden by your rights and freedoms (e.g., platform improvement,
              fraud prevention, security monitoring).
            </li>
            <li>
              <strong>Legal Obligation:</strong> Processing is necessary to
              comply with applicable laws, regulations, or legal proceedings.
            </li>
          </ul>
          <p className="mt-3">
            You may withdraw your consent at any time by contacting us at{" "}
            <ContactEmail />. Withdrawal of consent does not affect the lawfulness
            of processing carried out prior to withdrawal.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            6. How We Use Your Information
          </h2>
          <p className="mt-3">
            We use the information we collect for the following purposes:
          </p>

          <h3 className="mt-4 font-medium text-slate-800">
            6.1 Service Delivery and Operations
          </h3>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Providing, operating, and maintaining our platform and Services
            </li>
            <li>Creating and managing your user account</li>
            <li>Processing transactions, subscriptions, and billing</li>
            <li>
              Delivering AI-driven insights, analytics, reports, and
              recommendations
            </li>
            <li>Providing customer support and responding to inquiries</li>
          </ul>

          <h3 className="mt-6 font-medium text-slate-800">
            6.2 Improvement and Development
          </h3>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Analyzing usage patterns to improve platform performance, features,
              and user experience
            </li>
            <li>
              Conducting research and development for new products and
              capabilities
            </li>
            <li>Testing and debugging our software and infrastructure</li>
            <li>
              Training and improving our AI models using aggregated, anonymized
              data
            </li>
          </ul>

          <h3 className="mt-6 font-medium text-slate-800">6.3 Communication</h3>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Sending transactional messages (account confirmations, password
              resets, billing receipts)
            </li>
            <li>
              Providing product updates, feature announcements, and service
              notifications
            </li>
            <li>
              Sending marketing and promotional communications (only where you
              have opted in or where permitted by law)
            </li>
            <li>Requesting feedback through surveys or user research</li>
          </ul>

          <h3 className="mt-6 font-medium text-slate-800">
            6.4 Security and Compliance
          </h3>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Detecting, investigating, and preventing fraud, abuse,
              unauthorized access, and security threats
            </li>
            <li>Enforcing our Terms of Service and other agreements</li>
            <li>
              Complying with applicable laws, regulations, tax requirements, and
              legal processes
            </li>
            <li>Responding to lawful requests from government authorities</li>
          </ul>

          <p className="mt-4 font-medium text-slate-900">
            We do not sell your Personal Data to any third party, and we never
            will.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            7. AI and Data Processing
          </h2>
          <p className="mt-3">
            Hypeon AI uses artificial intelligence and machine learning
            technologies to analyze structured and aggregated data, generating
            insights related to products, keywords, pricing trends, and
            advertising performance.
          </p>

          <h3 className="mt-4 font-medium text-slate-800">
            7.1 How AI Processes Your Data
          </h3>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Our AI models analyze aggregated datasets to identify patterns,
              trends, and opportunities.
            </li>
            <li>
              Customer-specific data is logically isolated within our systems and
              is not shared across customer accounts.
            </li>
            <li>
              AI outputs (such as insights and recommendations) are generated
              based on patterns in data, not by exposing raw Personal Data.
            </li>
          </ul>

          <h3 className="mt-6 font-medium text-slate-800">
            7.2 Model Training Practices
          </h3>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              We do <strong>not</strong> use personally identifiable information
              to train our AI models without your explicit, informed consent.
            </li>
            <li>
              Where applicable, data used for model training is anonymized or
              aggregated to remove personally identifying characteristics.
            </li>
            <li>
              We conduct regular audits of our AI systems for accuracy, bias,
              and privacy compliance.
            </li>
          </ul>

          <h3 className="mt-6 font-medium text-slate-800">
            7.3 Third-Party AI Services
          </h3>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Any third-party AI models or services we use operate under strict
              contractual agreements, including data processing agreements (DPAs)
              that enforce confidentiality, security, and data protection
              standards.
            </li>
            <li>
              Third-party AI providers are prohibited from using your data for
              their own purposes, including training their own models, unless
              explicitly disclosed and authorized.
            </li>
          </ul>

          <h3 className="mt-6 font-medium text-slate-800">
            7.4 Automated Decision-Making
          </h3>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Our platform may use automated processing to deliver insights and
              recommendations.
            </li>
            <li>
              We do not engage in fully automated decision-making that produces
              legal or similarly significant effects on individuals without
              appropriate safeguards and the right to human review.
            </li>
            <li>
              If you have concerns about automated processing, you may contact us
              to request human review of any decision.
            </li>
          </ul>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            8. Data Sharing and Disclosure
          </h2>
          <p className="mt-3">
            We do not sell, rent, or lease your Personal Data. We share your
            information only in the following limited circumstances:
          </p>

          <h3 className="mt-4 font-medium text-slate-800">
            8.1 Service Providers and Processors
          </h3>
          <p className="mt-2">
            We engage trusted third-party vendors to help us operate and improve
            our Services, including providers of cloud hosting, payment
            processing, email delivery, analytics, customer support tools, and
            security monitoring. These providers act as Data Processors under
            contractual obligations that require them to protect your data,
            process it only as instructed, and delete it upon termination of the
            relationship.
          </p>

          <h3 className="mt-6 font-medium text-slate-800">
            8.2 Legal Requirements
          </h3>
          <p className="mt-2">
            We may disclose your information when we believe in good faith that
            disclosure is necessary to comply with applicable laws, regulations,
            legal processes, subpoenas, court orders, or enforceable government
            requests.
          </p>

          <h3 className="mt-6 font-medium text-slate-800">
            8.3 Business Transfers
          </h3>
          <p className="mt-2">
            In the event of a merger, acquisition, reorganization, bankruptcy, or
            sale of all or a portion of our assets, your Personal Data may be
            transferred as part of that transaction. We will notify you of any
            such change and ensure the receiving entity is bound by the terms of
            this Privacy Policy or an equally protective one.
          </p>

          <h3 className="mt-6 font-medium text-slate-800">
            8.4 Protection of Rights
          </h3>
          <p className="mt-2">
            We may disclose information where we believe it is necessary to
            protect the rights, property, or safety of Hypeon AI, our users, or
            the public — including exchanging information with other companies
            and organizations for the purposes of fraud protection and credit
            risk reduction.
          </p>

          <h3 className="mt-6 font-medium text-slate-800">
            8.5 With Your Consent
          </h3>
          <p className="mt-2">
            We may share your information with specific third parties when you
            have provided explicit, informed consent to do so.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            9. Data Security
          </h2>
          <p className="mt-3">
            We implement comprehensive technical and organizational security
            measures to protect your Personal Data against unauthorized access,
            alteration, disclosure, or destruction:
          </p>

          <h3 className="mt-4 font-medium text-slate-800">
            9.1 Technical Safeguards
          </h3>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>Encryption:</strong> Data is encrypted in transit using
              TLS 1.2+ and at rest using AES-256 or equivalent standards.
            </li>
            <li>
              <strong>Access Controls:</strong> Role-based access control (RBAC)
              ensures that only authorized personnel with a legitimate need can
              access Personal Data.
            </li>
            <li>
              <strong>Authentication:</strong> Multi-factor authentication (MFA)
              is enforced for all internal systems and administrative access.
            </li>
            <li>
              <strong>Infrastructure:</strong> Our platform is hosted on secure,
              SOC 2-compliant cloud infrastructure with redundancy and failover
              capabilities.
            </li>
          </ul>

          <h3 className="mt-6 font-medium text-slate-800">
            9.2 Organizational Safeguards
          </h3>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              All employees and contractors with access to Personal Data are
              bound by confidentiality agreements.
            </li>
            <li>
              We conduct regular security awareness training for our team.
            </li>
            <li>
              We perform periodic risk assessments, vulnerability scans, and
              penetration tests.
            </li>
            <li>
              We maintain an incident response plan to address data breaches
              promptly and effectively.
            </li>
          </ul>

          <h3 className="mt-6 font-medium text-slate-800">
            9.3 Breach Notification
          </h3>
          <p className="mt-2">
            In the event of a data breach that poses a risk to your rights and
            freedoms, we will notify the relevant supervisory authority within 72
            hours (where required by the GDPR) and notify affected individuals
            without undue delay, providing information about the nature of the
            breach, the data affected, and the steps we are taking to address it.
          </p>
          <p className="mt-3">
            Despite our best efforts, no method of electronic transmission or
            storage is 100% secure. While we strive to protect your data, we
            cannot guarantee absolute security. You acknowledge and accept this
            inherent risk when using our Services.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            10. Data Retention
          </h2>
          <p className="mt-3">
            We retain your Personal Data only for as long as necessary to fulfill
            the purposes described in this policy, subject to the following
            principles:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>Active Accounts:</strong> We retain your data for the
              duration of your active account or business relationship with us.
            </li>
            <li>
              <strong>Post-Termination:</strong> After account closure, we may
              retain certain data for a reasonable period to comply with legal
              obligations, resolve disputes, enforce agreements, and maintain
              business records.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Specific Retention Periods:</strong>
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Account and identity data: retained for the duration of the
              account plus 3 years after closure
            </li>
            <li>
              Financial and billing records: retained for 7 years to comply with
              tax and accounting obligations
            </li>
            <li>
              Usage and analytics data: retained in anonymized form for up to 3
              years
            </li>
            <li>
              Marketing preferences: retained until you withdraw consent or
              unsubscribe
            </li>
            <li>
              Support communications: retained for 2 years after resolution
            </li>
          </ul>
          <p className="mt-3">
            Once data is no longer required, we securely delete or irreversibly
            anonymize it. You may request early deletion at any time, subject to
            applicable legal requirements.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            11. Your Privacy Rights
          </h2>

          <h3 className="mt-4 font-medium text-slate-800">
            11.1 Rights Under GDPR (European Economic Area, United Kingdom, and
            Switzerland)
          </h3>
          <p className="mt-2">
            If you are located in the EEA, UK, or Switzerland, you have the
            following rights under the GDPR:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>Right of Access:</strong> Request a copy of the Personal
              Data we hold about you.
            </li>
            <li>
              <strong>Right to Rectification:</strong> Request correction of
              inaccurate or incomplete data.
            </li>
            <li>
              <strong>
                Right to Erasure (&quot;Right to Be Forgotten&quot;):
              </strong>{" "}
              Request deletion of your Personal Data, subject to legal
              exceptions.
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> Request that we limit
              how we use your data in certain circumstances.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> Receive your Personal
              Data in a structured, commonly used, machine-readable format and
              transmit it to another controller.
            </li>
            <li>
              <strong>Right to Object:</strong> Object to processing based on
              legitimate interests or direct marketing.
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> Withdraw consent at any
              time where processing is based on consent.
            </li>
            <li>
              <strong>Right to Lodge a Complaint:</strong> File a complaint with
              your local data protection supervisory authority.
            </li>
          </ul>

          <h3 className="mt-6 font-medium text-slate-800">
            11.2 Rights Under CCPA/CPRA (California Residents)
          </h3>
          <p className="mt-2">
            If you are a California resident, you have the following rights under
            the CCPA as amended by the CPRA:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>Right to Know:</strong> Request disclosure of the categories
              and specific pieces of Personal Data we have collected about you,
              the sources, the purposes, and the third parties with whom we have
              shared it.
            </li>
            <li>
              <strong>Right to Delete:</strong> Request deletion of your Personal
              Data, subject to legal exceptions.
            </li>
            <li>
              <strong>Right to Correct:</strong> Request correction of inaccurate
              Personal Data.
            </li>
            <li>
              <strong>Right to Opt-Out of Sale or Sharing:</strong> We do not
              sell or share your Personal Data for cross-context behavioral
              advertising. If this practice changes, we will provide a clear
              opt-out mechanism.
            </li>
            <li>
              <strong>Right to Limit Use of Sensitive Personal Information:</strong>{" "}
              Request limitations on how we use sensitive data categories.
            </li>
            <li>
              <strong>Right to Non-Discrimination:</strong> We will not
              discriminate against you for exercising any of your privacy rights.
            </li>
          </ul>
          <p className="mt-3">
            <strong>
              Categories of Personal Information Collected (preceding 12 months):
            </strong>{" "}
            Identifiers, commercial information, internet/electronic activity,
            professional information, and inferences drawn from the above.
          </p>
          <p className="mt-2">
            <strong>Categories of Personal Information Sold or Shared:</strong>{" "}
            None.
          </p>

          <h3 className="mt-6 font-medium text-slate-800">
            11.3 Exercising Your Rights
          </h3>
          <p className="mt-2">
            To exercise any of the above rights, contact us at <ContactEmail />.
            We will verify your identity before processing your request. We aim
            to respond within 30 days (or within the timeframe required by
            applicable law). If we need additional time, we will notify you of
            the delay and the reason.
          </p>
          <p className="mt-3">
            You may also designate an authorized agent to make requests on your
            behalf, provided you supply written authorization and we can verify
            your identity.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            12. International Data Transfers
          </h2>
          <p className="mt-3">
            Hypeon AI is based in the United States. Your information may be
            transferred to, stored in, and processed in the United States or
            other countries where our service providers operate.
          </p>
          <p className="mt-3">
            Where we transfer Personal Data outside the EEA, UK, or Switzerland,
            we ensure appropriate safeguards are in place, including:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>Standard Contractual Clauses (SCCs)</strong> approved by
              the European Commission
            </li>
            <li>
              <strong>UK International Data Transfer Agreements (IDTAs)</strong>{" "}
              where applicable
            </li>
            <li>
              <strong>Data Processing Agreements (DPAs)</strong> with all
              sub-processors
            </li>
            <li>
              <strong>Adequacy decisions</strong> where the destination country
              has been recognized as providing adequate protection
            </li>
          </ul>
          <p className="mt-3">
            If you have questions about the specific mechanisms we use to
            safeguard international transfers, please contact us at{" "}
            <ContactEmail />.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            13. Children&apos;s Privacy
          </h2>
          <p className="mt-3">
            Our Services are not directed at or intended for individuals under
            the age of 18. We do not knowingly collect, solicit, or process
            Personal Data from children.
          </p>
          <p className="mt-3">
            If we become aware that we have collected Personal Data from a child
            without verified parental or guardian consent, we will take immediate
            steps to delete that data from our systems.
          </p>
          <p className="mt-3">
            If you believe that a child has provided us with Personal Data,
            please contact us immediately at <ContactEmail />.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            14. Third-Party Links and Integrations
          </h2>
          <p className="mt-3">
            Our platform may contain links to third-party websites, plugins,
            applications, or services that are not operated or controlled by
            Hypeon AI. We are not responsible for the privacy practices,
            security, or content of these third parties.
          </p>
          <p className="mt-3">
            When you leave our platform or interact with third-party services,
            this Privacy Policy no longer applies. We strongly recommend
            reviewing the privacy policies of any third-party services before
            providing them with your Personal Data.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            15. Do Not Track Signals
          </h2>
          <p className="mt-3">
            Some browsers offer a &quot;Do Not Track&quot; (DNT) feature that
            sends a signal to websites you visit indicating that you do not wish
            to be tracked. There is currently no universally accepted standard
            for how companies should respond to DNT signals.
          </p>
          <p className="mt-3">
            At this time, our Services do not respond to DNT signals. However,
            you can manage your tracking preferences through our cookie settings
            or your browser configuration.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            16. Email and Marketing Communications
          </h2>
          <p className="mt-3">
            We may send you promotional or marketing communications if you have
            opted in or where permitted by applicable law. Every marketing email
            we send includes an unsubscribe link. You may opt out at any time by
            clicking that link or by contacting us at <ContactEmail />.
          </p>
          <p className="mt-3">
            Please note that even if you opt out of marketing communications, we
            may still send you transactional or service-related messages (such
            as account confirmations, security alerts, and billing
            notifications).
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            17. Changes to This Privacy Policy
          </h2>
          <p className="mt-3">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technologies, legal requirements, or
            business operations.
          </p>
          <p className="mt-3">When we make material changes, we will:</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Revise the &quot;Last Updated&quot; date at the top of this page
            </li>
            <li>Post the updated policy on our website</li>
            <li>
              Where required by law, notify you via email or an in-platform
              notification before the changes take effect
            </li>
          </ul>
          <p className="mt-3">
            We encourage you to review this Privacy Policy periodically. Your
            continued use of our Services after any changes constitutes your
            acceptance of the revised policy.
          </p>

          <h2 className="mt-12 text-xl font-medium text-slate-900">
            18. Contact Us
          </h2>
          <p className="mt-3">
            If you have any questions, concerns, complaints, or requests regarding
            this Privacy Policy or our data practices, please contact us:
          </p>
          <p className="mt-3">
            <strong>Email:</strong> <ContactEmail />
          </p>
          <p className="mt-3">
            <strong>Mail:</strong>
            <br />
            HYPEON INC
            <br />
            28 Geary St, Ste 650, Suite #167
            <br />
            San Francisco, CA 94108
            <br />
            United States
          </p>
          <p className="mt-3">
            We aim to respond to all inquiries within 30 days. If you are
            unsatisfied with our response, you have the right to lodge a
            complaint with your local data protection supervisory authority.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
