export interface Forecast {
  readonly name: string;
  readonly personOfContact: string;
  readonly telephoneNumber: string;
  readonly location: string;
  readonly numberOfEmployees: number;
  readonly rainDates?: string[];
  readonly rainInFiveDays?: boolean;
}
