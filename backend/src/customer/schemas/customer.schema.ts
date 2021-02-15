import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  name: String,
  personOfContact: String,
  telephoneNumber: String,
  location: String,
  numberOfEmployees: Number,
});

CustomerSchema.virtual('id').get(function () {
  return this._id;
});

CustomerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});
