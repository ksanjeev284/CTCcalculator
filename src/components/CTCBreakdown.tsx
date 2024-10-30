import React from 'react';
import type { SalaryCalculation } from '../types';

interface CTCBreakdownProps {
  calculation: SalaryCalculation;
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
    <div className="bg-gray-50 rounded-lg p-4 md:p-6">
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
            <div className="flex justify-between font-medium pt-2 border-t">
              <span className="text-gray-700">Gross Salary</span>
              <span>{formatCurrency(calculation.grossSalary)}</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Deductions</h3>
          <div className="space-y-2">
            {calculation.epf.applicable ? (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">EPF (Employee)</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(calculation.epf.employee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">EPF (Employer)</span>
                  <span className="text-gray-500">
                    {formatCurrency(calculation.epf.employer)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <span className="text-gray-600">EPF</span>
                <span className="text-gray-500">Not Opted</span>
              </div>
            )}

            {calculation.esi.applicable ? (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">ESI (Employee)</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(calculation.esi.employee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">ESI (Employer)</span>
                  <span className="text-gray-500">
                    {formatCurrency(calculation.esi.employer)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <span className="text-gray-600">ESI</span>
                <span className="text-gray-500">Not Applicable</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-600">Professional Tax</span>
              {calculation.pt > 0 ? (
                <span className="font-medium text-red-600">
                  -{formatCurrency(calculation.pt)}
                </span>
              ) : (
                <span className="text-gray-500">Not Applicable</span>
              )}
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

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Cost to Company Breakup</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Gross Salary</span>
              <span className="font-medium">{formatCurrency(calculation.grossSalary)}</span>
            </div>
            {calculation.epf.applicable && (
              <div className="flex justify-between">
                <span className="text-gray-600">Employer EPF Contribution</span>
                <span className="font-medium">{formatCurrency(calculation.epf.employer)}</span>
              </div>
            )}
            {calculation.esi.applicable && (
              <div className="flex justify-between">
                <span className="text-gray-600">Employer ESI Contribution</span>
                <span className="font-medium">{formatCurrency(calculation.esi.employer)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}