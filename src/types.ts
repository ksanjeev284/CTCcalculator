export interface SalaryStructure {
  basic: number;
  hra: number;
  da: number;
  lta: number;
  specialAllowance: number;
  performanceBonus: number;
  epf: number;
  professionalTax: number;
  esi: number;
  incomeTax: number;
}

export interface SalaryCalculation {
  basic: number;
  hra: number;
  da: number;
  lta: number;
  special: number;
  bonus: number;
  grossSalary: number;
  epf: {
    employee: number;
    employer: number;
    total: number;
  };
  pt: number;
  esi: {
    employee: number;
    employer: number;
    total: number;
    applicable: boolean;
  };
  tax: number;
  totalDeductions: number;
  netSalary: number;
}

export interface PTState {
  id: string;
  name: string;
  monthlyRate: number;
  annualLimit: number;
}

export interface TaxDeductions {
  section80C: number;
  section80D: number;
  section80TTA: number;
  homeLoanInterest: number;
  rentPaid: number;
  otherDeductions: number;
}export interface SalaryStructure {
  basic: number;
  hra: number;
  da: number;
  lta: number;
  specialAllowance: number;
  performanceBonus: number;
  epf: number;
  professionalTax: number;
  esi: number;
  incomeTax: number;
}

export interface SalaryCalculation {
  basic: number;
  hra: number;
  da: number;
  lta: number;
  special: number;
  bonus: number;
  grossSalary: number;
  epf: {
    employee: number;
    employer: number;
    total: number;
  };
  pt: number;
  esi: {
    employee: number;
    employer: number;
    total: number;
    applicable: boolean;
  };
  tax: number;
  totalDeductions: number;
  netSalary: number;
}

export interface PTState {
  id: string;
  name: string;
  monthlyRate: number;
  annualLimit: number;
}

export interface TaxDeductions {
  section80C: number;
  section80D: number;
  section80TTA: number;
  homeLoanInterest: number;
  rentPaid: number;
  otherDeductions: number;
}