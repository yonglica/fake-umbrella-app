import { Document } from 'mongoose';

export interface Customer extends Document {
  readonly name: string;
  readonly personOfContact: string;
  readonly telephoneNumber: string;
  readonly location: string;
  readonly numberOfEmployees: number;
}
