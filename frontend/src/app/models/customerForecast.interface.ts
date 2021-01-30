export interface CustomerForecast {
  name: string;
  personOfContact: string;
  telephoneNumber: string;
  location: string;
  numberOfEmployees: number;
  rainInFiveDays?: boolean;
  rainDates?: string[];
  rainTime?: string;
}
