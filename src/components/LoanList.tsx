import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, Edit, Trash2, MoreHorizontal, CheckCircle, History } from "lucide-react";
import { Loan } from "./types";
import { LoanForm } from "./LoanForm";

interface LoanListProps {
  loans: Loan[];
  onUpdate: (loan: Loan) => void;
  onDelete: (id: number) => void;
}

const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "secondary";
    case "overdue": return "destructive";
    case "closed": return "outline";
    default: return "secondary";
  }
};

export const LoanList = ({ loans, onUpdate, onDelete }: LoanListProps) => {
  const [editingLoan, setEditingLoan] = useState<Loan | null>(null);

  const handleMarkAsPaid = (loan: Loan) => {
    onUpdate({ ...loan, status: "closed", remainingBalance: 0 });
  };

  const handleViewPaymentHistory = (loan: Loan) => {
    // Placeholder for payment history functionality
    console.log(`Viewing payment history for loan ID: ${loan.id}`);
    // In a real app, this could open a modal or navigate to a payment history page
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {loans[0]?.type === "lending" ? "Money Lent" : "Money Borrowed"}
        </h2>
        
        {editingLoan && (
          <LoanForm
            type={editingLoan.type}
            initialData={editingLoan}
            onSubmit={(updatedLoan) => {
              onUpdate({ ...updatedLoan, id: editingLoan.id });
              setEditingLoan(null);
            }}
            onCancel={() => setEditingLoan(null)}
          />
        )}

        <div className="space-y-3">
          {loans.map((loan) => (
            <Dialog key={loan.id}>
              <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      loan.status === "active" ? "bg-secondary" :
                      loan.status === "overdue" ? "bg-destructive" : "bg-muted"
                    }`}></div>
                    <div>
                      <h3 className="font-semibold">{loan.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Principal: {formatCurrency(loan.principal)}</span>
                        <span>Rate: {loan.interestRate}%</span>
                        <span>Due: {loan.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(loan.remainingBalance)}</p>
                      <Badge variant={getStatusColor(loan.status)} className="text-xs">
                        {loan.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setEditingLoan(loan)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onDelete(loan.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleMarkAsPaid(loan)}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Paid
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewPaymentHistory(loan)}>
                            <History className="w-4 h-4 mr-2" />
                            View Payment History
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Loan Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <strong>Name:</strong> {loan.name}
                  </div>
                  <div>
                    <strong>Type:</strong> {loan.type === "lending" ? "Lending" : "Borrowing"}
                  </div>
                  <div>
                    <strong>Principal:</strong> {formatCurrency(loan.principal)}
                  </div>
                  <div>
                    <strong>Remaining Balance:</strong> {formatCurrency(loan.remainingBalance)}
                  </div>
                  <div>
                    <strong>Interest Rate:</strong> {loan.interestRate}%
                  </div>
                  <div>
                    <strong>Interest Type:</strong> {loan.isCompoundInterest ? "Compound" : "Flat"}
                  </div>
                  <div>
                    <strong>Start Date:</strong> {loan.startDate}
                  </div>
                  <div>
                    <strong>Due Date:</strong> {loan.dueDate}
                  </div>
                  <div>
                    <strong>Repayment Schedule:</strong> {loan.schedule}
                  </div>
                  <div>
                    <strong>Status:</strong> {loan.status}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </Card>
  );
};