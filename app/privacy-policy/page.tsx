import { PageLayout } from "@/components/page-layout"

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="fantasy-card p-6">
          <h1 className="text-3xl font-cinzel font-bold mb-6 text-white">Privacy Policy</h1>

          <div className="prose prose-invert max-w-none font-fondamento">
            <p className="mb-4 text-gray-300">Last updated: May 2, 2024</p>

            <h2 className="text-2xl font-cinzel font-semibold mt-6 mb-4 text-white">1. Introduction</h2>
            <p className="mb-4 text-gray-300">
              Welcome to DiceRyn. We respect your privacy and are committed to protecting your personal data. This
              privacy policy will inform you about how we look after your personal data when you visit our website and
              tell you about your privacy rights and how the law protects you.
            </p>

            <h2 className="text-2xl font-cinzel font-semibold mt-6 mb-4 text-white">2. Data We Collect</h2>
            <p className="mb-4 text-gray-300">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped
              together as follows:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Identity Data: includes username, email address</li>
              <li>Profile Data: includes your preferences, achievements, and completed projects</li>
              <li>Usage Data: includes information about how you use our website and services</li>
              <li>
                Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and
                location, operating system and platform
              </li>
            </ul>

            <h2 className="text-2xl font-cinzel font-semibold mt-6 mb-4 text-white">3. How We Use Your Data</h2>
            <p className="mb-4 text-gray-300">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal
              data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>To register you as a new user</li>
              <li>To provide and improve our services</li>
              <li>To manage your relationship with us</li>
              <li>To personalize your experience</li>
            </ul>

            <h2 className="text-2xl font-cinzel font-semibold mt-6 mb-4 text-white">4. Data Security</h2>
            <p className="mb-4 text-gray-300">
              We have put in place appropriate security measures to prevent your personal data from being accidentally
              lost, used or accessed in an unauthorized way, altered or disclosed.
            </p>

            <h2 className="text-2xl font-cinzel font-semibold mt-6 mb-4 text-white">5. Your Legal Rights</h2>
            <p className="mb-4 text-gray-300">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data,
              including the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h2 className="text-2xl font-cinzel font-semibold mt-6 mb-4 text-white">6. Contact Us</h2>
            <p className="mb-4 text-gray-300">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
              <br />
              Email: contact@rynverse.com
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
