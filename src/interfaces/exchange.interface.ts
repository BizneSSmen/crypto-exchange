interface Currency {
  name: string;
  code: string;
}

interface FinancialInstitution {
  id: number;
  name: string;
  currencyName: string;
  type: string;
}

interface CourseExchange {
  sourceCurrencyId: number;
  targetCurrencyId: number;
  exchangeRate: number;
  sourceCurrency: Currency;
  targetCurrency: Currency;
}

export interface Exchange {
  displayedExchangeRateId?: number;
  priority?: number;
  sourceFinancial?: FinancialInstitution;
  targetFinancial?: FinancialInstitution;
  courseExchange?: CourseExchange;
}
