import React from 'react';
import { Layout } from '../components/Layout';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-6">
                  Have questions about our CTC Calculator? We're here to help. Fill out the form
                  and we'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-3" />
                    <span>ksanjeev284@gmail.com</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-3" />
                    <span>+91 (123) 456-7890</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3" />
                    <span>Bangalore, India</span>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}