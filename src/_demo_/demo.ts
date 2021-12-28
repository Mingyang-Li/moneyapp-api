// sample_responses
export const incomePaidBy = [
  {
    incomePaidBy: 'google',
    sum: 200000,
  },
  {
    incomePaidBy: 'amazon',
    sum: 100000,
  },
  {
    incomePaidBy: 'netflix',
    sum: 232000,
  },
  {
    incomePaidBy: 'microsoft',
    sum: 190280,
  },
  {
    incomePaidBy: 'metaverse',
    sum: 190280,
  },
];

export const incomeByPaymentMethod = [
  {
    incomePaymentMethod: 'cash',
    currency: 'NZD',
    sum: 2670000,
  },
  {
    incomePaymentMethod: 'stripe',
    currency: 'USD',
    sum: 108000,
  },
  {
    incomePaymentMethod: 'bitcoin',
    currency: 'BTC',
    sum: 232000,
  },
];

export const incomeType = [
  {
    incomeType: 'commission',
    sum: 2670000,
  },
  {
    incomeType: 'wage',
    sum: 108000,
  },
  {
    incomeType: 'investment cashout',
    sum: 232000,
  },
];

export const expenseType = [
  {
    expenseType: 'transport',
    sum: 1000,
  },
  {
    expenseType: 'sports',
    sum: 5000,
  },
  {
    expenseType: 'bills',
    sum: 900,
  },
];

export const expenseSubType = [
  {
    expenseSubType: 'food',
    sum: 1000,
  },
  {
    expenseSubType: 'running gears',
    sum: 5000,
  },
  {
    expenseSubType: 'pc accessories',
    sum: 900,
  },
];

export const expensePaymentType = [
  {
    expensePaymentType: 'cash',
    sum: 100000,
    currency: 'NZD',
  },
  {
    expensePaymentType: 'credit card',
    sum: 100000,
    currency: 'USD',
  },
  {
    expensePaymentType: 'bitcoin',
    sum: 100000,
    currency: 'BTC',
  },
];

export const incomeByCurrency = [
  {
    currency: 'NZD',
    sum: 100000,
  },
  {
    currency: 'USD',
    sum: 100000,
  },
  {
    currency: 'DOT',
    sum: 100000,
  },
];

export const incomeExistsInDb = {
  // if exists, return 1, else return 0
  _count: {
    notionId: 1,
  },
};
