// src/reports/schemas/report.schema.ts
import { Schema, Document } from 'mongoose';

// Define the Report schema
export const ReportSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    client_id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    account_manager: { type: String, required: true },
    status: { type: String, enum: ['sent', 'pending', 'draft'], required: true },
    report_date: { type: Date, required: true },
    // Add other necessary fields
  },
  { timestamps: true }
);

// Define the Report interface that extends Document
export interface Report extends Document {
  _id: string;
  client_id: string;
  name: string;
  account_manager: string;
  status: string;
  report_date: Date;
  // Add other necessary fields
}
