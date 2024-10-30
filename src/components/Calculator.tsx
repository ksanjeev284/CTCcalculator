import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, HelpCircle, Download } from 'lucide-react';
import { CTCBreakdown } from './CTCBreakdown';
import { InfoPanel } from './InfoPanel';
import { downloadSummary } from '../utils/downloadSummary';
import { ptRates } from '../data/ptRates';
import type { SalaryStructure, TaxDeductions, PTState } from '../types';

export function Calculator() {
  const [ctc, setCTC] = useState<string>('');
  const [frequency, setFrequency] = useState<'monthly' | 'yearly'>('yearly');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedState, setSelectedState] = useState<PTState>(ptRates[0]);
  const [customPT, setCustomPT] = useState<string>('200');
  const [isPTApplicable, setIsPTApplicable] = useState(true);
  const [isEPFApplicable, setIsEPFApplicable] = useState(true);
  const [structure, setStructure] = useState<Record<keyof SalaryStructure, string>>({
    basic: '40',
    hra: '20',
    da: '10',
    lta: '5',
    specialAllowance: '15',
    performanceBonus: '10',
    epf: '12',
    professionalTax: '2.5',
    esi: '1.75',
    incomeTax: '10',
  });
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('old');
  const [deductions, setDeductions] = useState<Record<keyof TaxDeductions, string>>({
    section80C: '',
    section80D: '',
    section80TTA: '',
    homeLoanInterest: '',
    rentPaid: '',
    otherDeductions: '',
  });

  const handleCTCChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (frequency === 'monthly') {
      setCTC(numericValue === '' ? '' : String(Number(numericValue) * 12));
    } else {
      setCTC(numericValue);
    }
  };

  const getDisplayCTC = () => {
    if (ctc === '') return '';
    return frequency === 'monthly' ? Math.round(Number(ctc) / 12).toString() : ctc;
  };

  const handleStructureChange = (key: keyof SalaryStructure, value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setStructure(prev => ({
      ...prev,
      [key]: numericValue
    }));
  };

  const handleDeductionChange = (key: keyof TaxDeductions, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setDeductions(prev => ({
      ...prev,
      [key]: numericValue
    }));
  };

  const calculateIncomeTax = (annualIncome: number) => {
    let taxableIncome = annualIncome;
    
    if (taxRegime === 'old') {
      taxableIncome -= (
        Number(deductions.section80C) +
        Number(deductions.section80D) +
        Number(deductions.section80TTA) +
        Number(deductions.homeLoanInterest) +
        Math.min(Number(deductions.rentPaid) * 0.1, 60000) +
        Number(deductions.otherDeductions)
      );
    }

    let tax = 0;

    if (taxRegime === 'new') {
      if (taxableIncome <= 300000) {
        tax = 0;
      } else if (taxableIncome <= 600000) {
        tax = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 900000) {
        tax = 15000 + (taxableIncome - 600000) * 0.1;
      } else if (taxableIncome <= 1200000) {
        tax = 45000 + (taxableIncome - 900000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        tax = 90000 + (taxableIncome - 1200000) * 0.2;
      } else {
        tax = 150000 + (taxableIncome - 1500000) * 0.3;
      }
    } else {
      if (taxableIncome <= 250000) {
        tax = 0;
      } else if (taxableIncome <= 500000) {
        tax = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        tax = 12500 + (taxableIncome - 500000) * 0.2;
      } else {
        tax = 112500 + (taxableIncome - 1000000) * 0.3;
      }
    }

    tax = tax * 1.04; // 4% Health and Education Cess
    return tax;
  };

  const calculateSalaryComponents = () => {
    if (!ctc) return null;

    const monthly = frequency === 'monthly';
    const baseAmount = monthly ? Number(ctc) / 12 : Number(ctc);

    const basic = (baseAmount * Number(structure.basic)) / 100;
    const hra = (baseAmount * Number(structure.hra)) / 100;
    const da = (baseAmount * Number(structure.da)) / 100;
    const lta = (baseAmount * Number(structure.lta)) / 100;
    const special = (baseAmount * Number(structure.specialAllowance)) / 100;
    const bonus = (baseAmount * Number(structure.performanceBonus)) / 100;

    const grossSalary = basic + hra + da + lta + special + bonus;

    // EPF Calculation (12% each from employee and employer)
    const epfEmployee = isEPFApplicable ? (basic * Number(structure.epf)) / 100 : 0;
    const epfEmployer = epfEmployee;

    // ESI Calculation
    const esiApplicable = (basic + da) <= 21000;
    const esiEmployee = esiApplicable ? (grossSalary * Number(structure.esi)) / 100 : 0;
    const esiEmployer = esiApplicable ? (grossSalary * 3.25) / 100 : 0;

    // Professional Tax based on selected state
    const pt = isPTApplicable ? 
      (selectedState.id === 'custom' ? Number(customPT) : selectedState.monthlyRate) : 0;

    const tax = calculateIncomeTax(grossSalary * (monthly ? 12 : 1)) / (monthly ? 12 : 1);
    
    const totalDeductions = epfEmployee + (esiApplicable ? esiEmployee : 0) + pt + tax;
    const netSalary = grossSalary - totalDeductions;

    return {
      basic,
      hra,
      da,
      lta,
      special,
      bonus,
      grossSalary,
      epf: {
        employee: epfEmployee,
        employer: epfEmployer,
        total: epfEmployee + epfEmployer,
        applicable: isEPFApplicable
      },
      pt,
      esi: {
        employee: esiEmployee,
        employer: esiEmployer,
        total: esiEmployee + esiEmployer,
        applicable: esiApplicable
      },
      tax,
      totalDeductions,
      netSalary,
    };
  };

  const handleDownload = () => {
    const calculation = calculateSalaryComponents();
    if (calculation) {
      downloadSummary(calculation, frequency, Number(ctc));
    }
  };

  const calculation = calculateSalaryComponents();

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-medium">Cost to Company (CTC)</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={getDisplayCTC()}
                  onChange={(e) => handleCTCChange(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder={`Enter your ${frequency} CTC`}
                />
              </div>
            </label>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setFrequency('monthly');
                  if (ctc) {
                    setCTC(String(Number(ctc)));
                  }
                }}
                className={`flex-1 py-2 px-4 rounded-md ${
                  frequency === 'monthly'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => {
                  setFrequency('yearly');
                  if (ctc) {
                    setCTC(String(Number(ctc)));
                  }
                }}
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-gray-600">Basic Salary (%)</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={structure.basic}
                      onChange={(e) => handleStructureChange('basic', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">HRA (%)</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={structure.hra}
                      onChange={(e) => handleStructureChange('hra', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">DA (%)</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={structure.da}
                      onChange={(e) => handleStructureChange('da', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">LTA (%)</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={structure.lta}
                      onChange={(e) => handleStructureChange('lta', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">Special Allowance (%)</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={structure.specialAllowance}
                      onChange={(e) => handleStructureChange('specialAllowance', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">Performance Bonus (%)</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={structure.performanceBonus}
                      onChange={(e) => handleStructureChange('performanceBonus', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>

                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isEPFApplicable}
                        onChange={(e) => setIsEPFApplicable(e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-600">Opt-in for EPF (12% of Basic)</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isPTApplicable}
                        onChange={(e) => setIsPTApplicable(e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-600">Apply Professional Tax</span>
                    </label>
                  </div>

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

                  <label className="block">
                    <span className="text-sm text-gray-600">Professional Tax State</span>
                    <select
                      value={selectedState.id}
                      onChange={(e) => {
                        const state = ptRates.find(s => s.id === e.target.value) || ptRates[0];
                        setSelectedState(state);
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {ptRates.map(state => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  {selectedState.id === 'custom' && (
                    <label className="block">
                      <span className="text-sm text-gray-600">Custom PT Amount</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={customPT}
                        onChange={(e) => setCustomPT(e.target.value.replace(/[^0-9]/g, ''))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </label>
                  )}

                  {taxRegime === 'old' && (
                    <div className="col-span-2 space-y-4 border-t pt-4">
                      <h4 className="font-medium text-gray-900">Tax Deductions (Old Regime)</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                          <span className="text-sm text-gray-600">Section 80C</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={deductions.section80C}
                            onChange={(e) => handleDeductionChange('section80C', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm text-gray-600">Section 80D (Health Insurance)</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={deductions.section80D}
                            onChange={(e) => handleDeductionChange('section80D', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm text-gray-600">Home Loan Interest</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={deductions.homeLoanInterest}
                            onChange={(e) => handleDeductionChange('homeLoanInterest', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm text-gray-600">Rent Paid (Annual)</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={deductions.rentPaid}
                            onChange={(e) => handleDeductionChange('rentPaid', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {calculation && (
            <div className="bg-indigo-50 rounded-lg p-4 text-center">
              <p className="text-sm text-indigo-600 font-medium">
                {frequency === 'yearly' ? 'Monthly' : 'Annual'} Equivalent
              </p>
              <p className="text-2xl font-bold text-indigo-700">
                ₹{new Intl.NumberFormat('en-IN').format(
                  frequency === 'yearly' 
                    ? Math.round(calculation.netSalary / 12)
                    : Math.round(calculation.netSalary * 12)
                )}
              </p>
            </div>
          )}

          {calculation && <CTCBreakdown calculation={calculation} frequency={frequency} />}
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