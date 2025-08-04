export type LoanStatus = "active" | "overdue" | "closed";
export type LoanType = "lending" | "borrowing";
export type ScheduleType = "weekly" | "bi-weekly" | "monthly";

export interface Loan {
  id: number;
  type: LoanType;
  name: string;
  principal: number;
  interestRate: number;
  startDate: string;
  dueDate: string;
  status: LoanStatus;
  remainingBalance: number;
  schedule: ScheduleType;
  isCompoundInterest?: boolean;
}