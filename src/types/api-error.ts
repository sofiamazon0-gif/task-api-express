export type FieldIssue = {
  field: string;
  message: string;
};

export type ApiErrorPayload = {
  code: string;
  message: string;
  details?: FieldIssue[];
  requestId?: string;
};
