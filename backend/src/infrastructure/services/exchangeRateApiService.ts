import axios from "axios";
import { IExchangeRateService } from "../../application/interfaces/service/exchangeRateService";
import { configEnv } from "../../config/envConfig";

interface ExchangeRateApiResponse {
  result: "success" | "error";
  documentation?: string;
  terms_of_use?: string;
  time_last_update_unix?: number;
  time_last_update_utc?: string;
  time_next_update_unix?: number;
  time_next_update_utc?: string;
  base_code?: string;
  conversion_rates?: Record<string, number>;
  "error-type"?: string;
}

export class ExchangeRateApiService implements IExchangeRateService {
  async getRate(base: string, target: string): Promise<number> {
    try {
      const normalizedBase = base.toUpperCase().trim();
      const normalizedTarget = target.toUpperCase().trim();

      if (!normalizedBase || !normalizedTarget) {
        throw new Error("Base and target currencies are required");
      }

      if (normalizedBase === normalizedTarget) {
        return 1;
      }

      const apiKey = configEnv.EXCHANGE_RATE_API_KEY;

      if (!apiKey) {
        throw new Error(
          "EXCHANGE_RATE_API_KEY is missing in environment variables",
        );
      }

      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${normalizedBase}`;

      const response = await axios.get<ExchangeRateApiResponse>(url, {
        timeout: 5000,
      });

      if (response.data.result === "error") {
        throw new Error(
          response.data["error-type"] || "Exchange rate API returned an error",
        );
      }

      const rate = response.data.conversion_rates?.[normalizedTarget];

      if (typeof rate !== "number") {
        throw new Error(
          `Rate not found for ${normalizedBase} -> ${normalizedTarget}`,
        );
      }

      return rate;
    } catch (error) {
      console.error("Exchange rate fetch failed:", error);
      throw new Error("Failed to fetch exchange rate");
    }
  }
}
