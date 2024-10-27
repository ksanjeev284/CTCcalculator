import { SalaryCalculation } from '../types';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const generateSummaryText = (
  calculation: SalaryCalculation,
  frequency: 'monthly' | 'yearly',
  ctc: number
) => {
  const summary = `
CTC CALCULATOR - SALARY BREAKDOWN
================================

Total CTC: ${formatCurrency(ctc)} per ${frequency === 'monthly' ? 'month' : 'year'}

EARNINGS
--------
Basic Salary: ${formatCurrency(calculation.basic)}
HRA: ${formatCurrency(calculation.hra)}
DA: ${formatCurrency(calculation.da)}
LTA: ${formatCurrency(calculation.lta)}
Special Allowance: ${formatCurrency(calculation.special)}
Performance Bonus: ${formatCurrency(calculation.bonus)}
Gross Salary: ${formatCurrency(calculation.grossSalary)}

DEDUCTIONS
----------
EPF: ${formatCurrency(calculation.epf)}
Professional Tax: ${formatCurrency(calculation.pt)}
ESI: ${formatCurrency(calculation.esi)}
Income Tax: ${formatCurrency(calculation.tax)}
Total Deductions: ${formatCurrency(calculation.totalDeductions)}

SUMMARY
-------
Net ${frequency === 'monthly' ? 'Monthly' : 'Annual'} Salary: ${formatCurrency(
    calculation.netSalary
  )}

Note: This is an estimated calculation. Actual figures may vary based on your specific 
situation, tax regime choice, and company policies.

Generated on: ${new Date().toLocaleDateString()}
`;

  return summary;
};

export const downloadSummary = (
  calculation: SalaryCalculation,
  frequency: 'monthly' | 'yearly',
  ctc: number
) => {
  const summary = generateSummaryText(calculation, frequency, ctc);
  const blob = new Blob([summary], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `salary-breakdown-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};