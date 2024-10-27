import React from 'react';

interface CTCBreakdownProps {
  calculation: {
    basic: number;
    hra: number;
    da: number;
    lta: number;
    special: number;
    bonus: number;
    grossSalary: number;
    epf: number;
    pt: number;
    esi: number;
    tax: number;
    totalDeductions: number;
    netSalary: number;
  };
  frequency: 'monthly' | 'yearly';
}

export function CTCBreakdown({ calculation, frequency }: CTCBreakdownProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Salary Breakdown</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Earnings</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Basic Salary</span>
              <span className="font-medium">{formatCurrency(calculation.basic)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">HRA</span>
              <span className="font-medium">{formatCurrency(calculation.hra)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">DA</span>
              <span className="font-medium">{formatCurrency(calculation.da)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">LTA</span>
              <span className="font-medium">{formatCurrency(calculation.lta)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Special Allowance</span>
              <span className="font-medium">{formatCurrency(calculation.special)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Performance Bonus</span>
              <span className="font-medium">{formatCurrency(calculation.bonus)}</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Deductions</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">EPF</span>
              <span className="font-medium text-red-600">
                -{formatCurrency(calculation.epf)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Professional Tax</span>
              <span className="font-medium text-red-600">
                -{formatCurrency(calculation.pt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ESI</span>
              <span className="font-medium text-red-600">
                -{formatCurrency(calculation.esi)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Income Tax</span>
              <span className="font-medium text-red-600">
                -{formatCurrency(calculation.tax)}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Gross Salary</span>
              <span className="font-medium">{formatCurrency(calculation.grossSalary)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Deductions</span>
              <span className="font-medium text-red-600">
                -{formatCurrency(calculation.totalDeductions)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-gray-900">Net {frequency === 'monthly' ? 'Monthly' : 'Annual'} Salary</span>
              <span className="text-green-600">{formatCurrency(calculation.netSalary)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}