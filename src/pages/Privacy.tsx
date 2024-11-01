import { Layout } from '../components/Layout';
import { Shield } from 'lucide-react';

export function Privacy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-indigo-600 mr-3" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
          </div>

          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-600 mb-6" aria-label="Last updated date">
              Last updated: March 14, 2024
            </p>

            <section className="mb-8" aria-labelledby="info-collect">
              <h2 id="info-collect" className="text-xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                We collect information that you voluntarily provide to us when you use our CTC Calculator,
                including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Salary information entered into the calculator</li>
                <li>Contact information when you reach out to us</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section className="mb-8" aria-labelledby="info-use">
              <h2 id="info-use" className="text-xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To provide and maintain our calculator service</li>
                <li>To improve user experience</li>
                <li>To respond to your inquiries and support requests</li>
                <li>To send you updates about our service (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8" aria-labelledby="data-security">
              <h2 id="data-security" className="text-xl font-semibold text-gray-800 mb-4">Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information.
                However, please note that no method of transmission over the internet or electronic
                storage is 100% secure.
              </p>
            </section>

            <section className="mb-8" aria-labelledby="your-rights">
              <h2 id="your-rights" className="text-xl font-semibold text-gray-800 mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section aria-labelledby="contact-us">
              <h2 id="contact-us" className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a 
                  href="mailto:ksanjeev284@gmail.com" 
                  className="text-indigo-600 hover:text-indigo-700"
                  aria-label="Email us at ksanjeev284@gmail.com"
                >
                  ksanjeev284@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
