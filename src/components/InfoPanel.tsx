import React from 'react';
import { HelpCircle } from 'lucide-react';

export function InfoPanel() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="flex items-center text-lg font-medium text-blue-900 mb-2">
          <HelpCircle className="h-5 w-5 mr-2" />
          Understanding Your CTC
        </h3>
        <div className="space-y-4 text-sm text-blue-800">
          <p>
            Cost to Company (CTC) is the total amount your employer spends on you annually,
            including all benefits and contributions.
          </p>
          <p>
            Your take-home salary will be lower than your CTC due to various deductions and
            the fact that some components are non-monetary benefits.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer list-none">
            <span className="text-gray-900 font-medium">What is Basic Salary?</span>
            <span className="transition group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shape-rendering="geometricPrecision"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </summary>
          <p className="text-gray-600 mt-2">
            Basic salary is the fixed amount paid before any additional allowances or
            deductions. It typically forms 40-50% of your CTC and is the base for calculating
            various other components.
          </p>
        </details>

        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer list-none">
            <span className="text-gray-900 font-medium">Understanding HRA</span>
            <span className="transition group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shape-rendering="geometricPrecision"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </summary>
          <p className="text-gray-600 mt-2">
            House Rent Allowance (HRA) is a component of salary that an employer provides to
            employees to meet their rental expenses. It's typically 40-50% of basic salary
            for metro cities.
          </p>
        </details>

        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer list-none">
            <span className="text-gray-900 font-medium">Tax Benefits</span>
            <span className="transition group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shape-rendering="geometricPrecision"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </summary>
          <p className="text-gray-600 mt-2">
            Components like HRA, LTA, and EPF contributions can help reduce your taxable
            income. Consult a tax professional to understand how to maximize your tax
            benefits.
          </p>
        </details>
      </div>

      <div className="bg-yellow-50 rounded-lg p-6">
        <h4 className="text-yellow-800 font-medium mb-2">Important Note</h4>
        <p className="text-sm text-yellow-700">
          This calculator provides estimates based on standard deductions and tax rates.
          Actual figures may vary based on your specific situation, tax regime choice, and
          company policies.
        </p>
      </div>
    </div>
  );
}