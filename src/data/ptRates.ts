import { PTState } from '../types';

export const ptRates: PTState[] = [
  {
    id: 'tn',
    name: 'Tamil Nadu',
    monthlyRate: 200,
    annualLimit: 2400
  },
  {
    id: 'ka',
    name: 'Karnataka',
    monthlyRate: 200,
    annualLimit: 2400
  },
  {
    id: 'mh',
    name: 'Maharashtra',
    monthlyRate: 200,
    annualLimit: 2500
  },
  {
    id: 'ts',
    name: 'Telangana',
    monthlyRate: 200,
    annualLimit: 2400
  },
  {
    id: 'wb',
    name: 'West Bengal',
    monthlyRate: 200,
    annualLimit: 2400
  },
  {
    id: 'custom',
    name: 'Custom',
    monthlyRate: 0,
    annualLimit: 0
  }
];