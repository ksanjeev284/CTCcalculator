import { Mail, AlertCircle } from 'lucide-react';
import { Layout } from '../components/Layout';

export function Contact() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center mb-6">
            <Mail className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="h-6 w-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">Get in Touch</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                We'd love to hear from you! If you have any questions, feedback, or concerns, 
                please don't hesitate to reach out.
              </p>
              
              <a
                href="mailto:ksanjeev284@gmail.com"
                className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 
                         rounded-md hover:bg-indigo-600 hover:text-white transition-colors duration-200"
              >
                <Mail className="h-4 w-4 mr-2" />
                ksanjeev284@gmail.com
              </a>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="h-6 w-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-800">Report Technical Issues</h2>
              </div>
              
              <p className="text-gray-600 mb-4">When reporting technical issues, please include:</p>
              
              <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-6">
                <li>Browser type and version</li>
                <li>Device type</li>
                <li>Description of the issue</li>
                <li>Screenshots (if possible)</li>
              </ul>
              
              <p className="text-sm text-gray-500">
                <strong>Note:</strong> For urgent matters, please include "URGENT" in your email subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}