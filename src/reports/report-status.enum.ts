export const report_status = [
  'draft',
  'in_progress',
  'review',
  'validated',
  'approved',
  'rejected',
  'scheduled',
  'sent',
  'canceled',
  'ready',
  'flagged'
] as const;

export type ReportStatus = typeof report_status[number];
