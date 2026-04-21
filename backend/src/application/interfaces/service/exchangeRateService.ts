export interface IExchangeRateService {
  getRate(base: string, target: string): Promise<number>;
}
