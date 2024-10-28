import React, { useState } from 'react';
import { Calculator as CalcIcon, HelpCircle, Download } from 'lucide-react';
import { CTCBreakdown } from './CTCBreakdown';
import { InfoPanel } from './InfoPanel';
import { downloadSummary } from '../utils/downloadSummary';
import type { SalaryStructure } from '../types';

export function Calculator() {
  const [ctc, setCTC] = useState<number | ''>('');
  const [frequency, setFrequency] = useState<'monthly' | 'yearly'>('yearly');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [valueType, setValueType] = useState<'percentage' | 'value'>('percentage');
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
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('old');
  const [isMetroCity, setIsMetroCity] = useState<boolean>(true);

  const calculateIncomeTax = (annualIncome: number) => {
    let tax = 0;

    if (taxRegime === 'new') {
      // New Tax Regime FY 2024-25
      if (annualIncome <= 300000) {
        tax = 0;
      } else if (annualIncome <= 700000) {
        tax = (annualIncome - 300000) * 0.05;
        // Tax rebate if income <= 700000
        if (annualIncome <= 700000) {
          tax = Math.max(0, tax - 25000);
        }
      } else if (annualIncome <= 1000000) {
        tax = 20000 + (annualIncome - 700000) * 0.1;
      } else if (annualIncome <= 1200000) {
        tax = 50000 + (annualIncome - 1000000) * 0.15;
      } else if (annualIncome <= 1500000) {
        tax = 80000 + (annualIncome - 1200000) * 0.2;
      } else {
        tax = 140000 + (annualIncome - 1500000) * 0.3;
      }
    } else {
      // Old Tax Regime FY 2024-25
      if (annualIncome <= 250000) {
        tax = 0;
      } else if (annualIncome <= 500000) {
        tax = (annualIncome - 250000) * 0.05;
      } else if (annualIncome <= 1000000) {
        tax = 12500 + (annualIncome - 500000) * 0.2;
      } else {
        tax = 112500 + (annualIncome - 1000000) * 0.3;
      }
    }

    // Add 4% Health and Education Cess
    tax = tax * 1.04;

    return tax;
  };

  const getComponentValue = (percentage: number) => {
    if (valueType === 'percentage') return percentage;
    const baseAmount = frequency === 'monthly' ? (Number(ctc) || 0) / 12 : (Number(ctc) || 0);
    return (percentage / 100) * baseAmount;
  };

  const setComponentValue = (key: keyof SalaryStructure, value: number) => {
    if (valueType === 'percentage') {
      setStructure({ ...structure, [key]: value });
    } else {
      const baseAmount = frequency === 'monthly' ? (Number(ctc) || 0) / 12 : (Number(ctc) || 0);
      const percentage = baseAmount ? (value / baseAmount) * 100 : 0;
      setStructure({ ...structure, [key]: percentage });
    }
  };

  const calculateSalaryComponents = () => {
    const monthly = frequency === 'monthly';
    const baseAmount = monthly ? Number(ctc) / 12 : Number(ctc);

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
    const tax = calculateIncomeTax(grossSalary * (monthly ? 12 : 1)) / (monthly ? 12 : 1);
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
    downloadSummary(calculateSalaryComponents(), frequency, Number(ctc));
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
                  onChange={(e) => setCTC(e.target.value === '' ? '' : Number(e.target.value))}
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Customize Components</h3>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setValueType('percentage')}
                      className={`px-3 py-1 rounded-md text-sm ${
                        valueType === 'percentage'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Percentage
                    </button>
                    <button
                      onClick={() => setValueType('value')}
                      className={`px-3 py-1 rounded-md text-sm ${
                        valueType === 'value'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Value
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-gray-600">Basic Salary {valueType === 'percentage' ? '(%)' : ''}</span>
                    <input
                      type="number"
                      value={getComponentValue(structure.basic)}
                      onChange={(e) => setComponentValue('basic', Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">HRA {valueType === 'percentage' ? '(%)' : ''}</span>
                    <input
                      type="number"
                      value={getComponentValue(structure.hra)}
                      onChange={(e) => setComponentValue('hra', Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">DA {valueType === 'percentage' ? '(%)' : ''}</span>
                    <input
                      type="number"
                      value={getComponentValue(structure.da)}
                      onChange={(e) => setComponentValue('da', Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">LTA {valueType === 'percentage' ? '(%)' : ''}</span>
                    <input
                      type="number"
                      value={getComponentValue(structure.lta)}
                      onChange={(e) => setComponentValue('lta', Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">Special Allowance {valueType === 'percentage' ? '(%)' : ''}</span>
                    <input
                      type="number"
                      value={getComponentValue(structure.specialAllowance)}
                      onChange={(e) => setComponentValue('specialAllowance', Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">Performance Bonus {valueType === 'percentage' ? '(%)' : ''}</span>
                    <input
                      type="number"
                      value={getComponentValue(structure.performanceBonus)}
                      onChange={(e) => setComponentValue('performanceBonus', Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">City Type</span>
                    <select
                      value={isMetroCity ? 'metro' : 'non-metro'}
                      onChange={(e) => setIsMetroCity(e.target.value === 'metro')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="metro">Metro</option>
                      <option value="non-metro">Non-Metro</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">Tax Regime</span>
                    <select
                      value={taxRegime}
                      onChange={(e) => setTaxRegime(e.target.value as 'old' | 'new')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="old">Old Tax Regime</option>
                      <option value="new">New Tax Regime</option>
                    </select>
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
