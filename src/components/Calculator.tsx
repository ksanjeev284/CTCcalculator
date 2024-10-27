import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, HelpCircle, Download } from 'lucide-react';
import { CTCBreakdown } from './CTCBreakdown';
import { InfoPanel } from './InfoPanel';
import { downloadSummary } from '../utils/downloadSummary';
import type { SalaryStructure, SalaryCalculation } from '../types';

export function Calculator() {
  const [ctc, setCTC] = useState<number>(1200000);
  const [frequency, setFrequency] = useState<'monthly' | 'yearly'>('yearly');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [structure, setStructure] = useState<SalaryStructure>({
    basic: 40,
    hra: 20,
    da: 10,
    lta: 5,
    specialAllowance: 15,
    performanceBonus: 10,
    epf: 12,
    professionalTax: 2.5,
    esi: 1.75,
    incomeTax: 10,
  });

  const calculateSalaryComponents = () => {
    const monthly = frequency === 'monthly';
    const baseAmount = monthly ? ctc / 12 : ctc;

    const basic = (baseAmount * structure.basic) / 100;
    const hra = (baseAmount * structure.hra) / 100;
    const da = (baseAmount * structure.da) / 100;
    const lta = (baseAmount * structure.lta) / 100;
    const special = (baseAmount * structure.specialAllowance) / 100;
    const bonus = (baseAmount * structure.performanceBonus) / 100;

    const grossSalary = basic + hra + da + lta + special + bonus;

    const epf = (basic * structure.epf) / 100;
    const pt = (grossSalary * structure.professionalTax) / 100;
    const esi = (grossSalary * structure.esi) / 100;
    const tax = (grossSalary * structure.incomeTax) / 100;

    const totalDeductions = epf + pt + esi + tax;
    const netSalary = grossSalary - totalDeductions;

    return {
      basic,
      hra,
      da,
      lta,
      special,
      bonus,
      grossSalary,
      epf,
      pt,
      esi,
      tax,
      totalDeductions,
      netSalary,
    };
  };

  const handleDownload = () => {
    const calculation = calculateSalaryComponents();
    downloadSummary(calculation, frequency, ctc);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-medium">Cost to Company (CTC)</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  value={ctc}
                  onChange={(e) => setCTC(Number(e.target.value))}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your CTC"
                />
              </div>
            </label>

            <div className="flex space-x-4">
              <button
                onClick={() => setFrequency('monthly')}
                className={`flex-1 py-2 px-4 rounded-md ${
                  frequency === 'monthly'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setFrequency('yearly')}
                className={`flex-1 py-2 px-4 rounded-md ${
                  frequency === 'yearly'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yearly
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Advanced Settings</span>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-indigo-600 hover:text-indigo-700"
              >
                {showAdvanced ? 'Hide' : 'Show'}
              </button>
            </div>

            {showAdvanced && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">Customize Components (%)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-gray-600">Basic Salary</span>
                    <input
                      type="number"
                      value={structure.basic}
                      onChange={(e) =>
                        setStructure({ ...structure, basic: Number(e.target.value) })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">HRA</span>
                    <input
                      type="number"
                      value={structure.hra}
                      onChange={(e) =>
                        setStructure({ ...structure, hra: Number(e.target.value) })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          <CTCBreakdown calculation={calculateSalaryComponents()} frequency={frequency} />
        </div>

        <InfoPanel />
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={handleDownload}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Summary
        </button>
      </div>
    </div>
  );
}