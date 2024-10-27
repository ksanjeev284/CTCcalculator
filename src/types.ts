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
  epf: number;
  pt: number;
  esi: number;
  tax: number;
  totalDeductions: number;
  netSalary: number;
}